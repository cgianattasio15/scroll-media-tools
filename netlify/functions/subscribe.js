/**
 * Netlify Function: subscribe.js
 * Handles email capture for industry guide gate pages + simple sequence enrollment.
 *
 * POST /api/subscribe
 *
 * Two modes:
 *
 * 1. mode: "sequence" — direct upsert + sequence enrollment.
 *    Used by lead-magnet pages and the maturity quiz. No niche-specific
 *    tagging, no scenario branching. Just subscribe and enroll.
 *    Body: { mode: "sequence", first_name, email, sequence_id, fields? }
 *
 * 2. mode unset / mode: "guide" — medspa guide-gate routing (default).
 *    Body: { first_name, email, guide, niche, utm_source, utm_campaign,
 *            is_existing, current_tags, sequence_id (override) }
 *    Routing:
 *      - Net new: subscribe + tag + enroll in niche sequence
 *      - Already in niche biz-dev sequence: tag as guide-accessed only
 *      - In other sequence (quiz, different niche): tag + flag for manual review
 */

const KIT_BASE = "https://api.kit.com/v4";

// Tag name -> Kit tag ID mapping
// Create these tags in Kit first, then add IDs as Netlify env vars.
const TAG_IDS = {
  "source: medspa-guide-gate":  process.env.KIT_TAG_MEDSPA_GUIDE_GATE    || null,
  "niche: medspa":              process.env.KIT_TAG_NICHE_MEDSPA          || null,
  "guide-accessed: medspa":     process.env.KIT_TAG_GUIDE_ACCESSED_MEDSPA || null,
  "sequence: medspa-biz-dev":   process.env.KIT_TAG_SEQ_MEDSPA_BIZ_DEV   || null,
  "flag: manual-review":        process.env.KIT_TAG_MANUAL_REVIEW         || null,
};

// Sequence IDs - set in Netlify env vars after creating sequences in Kit
const SEQUENCE_IDS = {
  "medspa-biz-dev": process.env.KIT_SEQ_MEDSPA_BIZ_DEV || null,
};

// ─── New-lead inbox alert (via Resend) ───────────────────────────────────────
// Kit's built-in "You gained a new subscriber!" email only fires for FORM
// signups, not the V4 API path used by mode:"sequence". To keep an inbox alert
// for API-captured leads (e.g. the IG Maturity Quiz), we send our own via
// Resend — the same provider/keys already used by stripe-webhook.js. Entirely
// best-effort: a missing key or a send failure must never break lead capture.
const RESEND_API_KEY = process.env.RESEND_API_KEY || null;
const ALERT_FROM_EMAIL = "Scroll Leads <hello@scrollmedia.co>";
const ALERT_TO_EMAIL = process.env.LEAD_ALERT_EMAIL || "chase@scrollmedia.co";

/**
 * Send a "new lead" notification email to the team via Resend.
 * Best-effort: returns a status string, never throws into the caller.
 */
async function sendLeadAlert(lead) {
  if (!RESEND_API_KEY) {
    console.warn("sendLeadAlert: RESEND_API_KEY not set — skipping inbox alert.");
    return "skipped-no-key";
  }

  const firstName = lead.first_name || "(no name)";
  const tagsLine = Array.isArray(lead.tags) && lead.tags.length ? lead.tags.join(", ") : "—";
  const sourceLabel = lead.source || "New lead";
  const esc = function(s) {
    return String(s == null ? "" : s).replace(/[&<>]/g, function(c) {
      return c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;";
    });
  };

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 20px;"><tr><td>
    <table width="560" align="center" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">
      <tr><td style="background:#0c3387;padding:24px 32px;">
        <p style="margin:0;color:#c8f135;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Scroll Media · New Lead</p>
        <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:800;">${esc(sourceLabel)}</h1>
      </td></tr>
      <tr><td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#1a1a2e;">
          <tr><td style="padding:6px 0;color:#666;width:110px;">Name</td><td style="padding:6px 0;font-weight:700;">${esc(firstName)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;font-weight:700;">${esc(lead.email)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Tags</td><td style="padding:6px 0;">${esc(tagsLine)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Kit ID</td><td style="padding:6px 0;">${esc(lead.subscriber_id)}</td></tr>
        </table>
        <p style="margin:24px 0 0;color:#999;font-size:12px;line-height:1.6;">Auto-sent when a lead enters a Kit sequence via the site API. Subscriber is already active and enrolled.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: ALERT_FROM_EMAIL,
        to: [ALERT_TO_EMAIL],
        subject: `🎯 New lead: ${firstName} — ${sourceLabel}`,
        html
      })
    });
    if (!res.ok) {
      const err = await res.text().catch(function() { return ""; });
      console.error("sendLeadAlert: Resend error " + res.status + ": " + err);
      return "send-failed:" + res.status + ":" + String(err).slice(0, 200);
    }
    return "sent";
  } catch (e) {
    console.error("sendLeadAlert: exception:", e);
    return "send-error";
  }
}

/**
 * Apply existing Kit tags to a subscriber by tag NAME.
 * Kit's V4 tag endpoint keys on tag ID, so we page through GET /tags to build
 * a name->id map (case-insensitive), then POST each match. Tags that don't
 * exist are reported as "not-found" rather than failing the whole request —
 * the subscriber upsert + sequence enrollment must stand regardless.
 */
async function applyTagsByName(tagNames, subscriberId, kitHeaders) {
  const results = [];
  const nameToId = {};
  try {
    let url = `${KIT_BASE}/tags?per_page=100`;
    while (url) {
      const res = await fetch(url, { headers: kitHeaders });
      const data = await res.json();
      (data && data.tags ? data.tags : []).forEach(function(t) {
        if (t && t.name) nameToId[String(t.name).toLowerCase()] = t.id;
      });
      const p = data && data.pagination;
      url = (p && p.has_next_page && p.end_cursor)
        ? `${KIT_BASE}/tags?per_page=100&after=${encodeURIComponent(p.end_cursor)}`
        : null;
    }
  } catch (e) {
    console.error("applyTagsByName: failed to list tags:", e);
    return tagNames.map(function(n) { return { tag: n, status: "lookup-error" }; });
  }

  for (const name of tagNames) {
    const tagId = nameToId[String(name).toLowerCase()];
    if (!tagId) {
      console.warn('applyTagsByName: tag not found in Kit: "' + name + '"');
      results.push({ tag: name, status: "not-found" });
      continue;
    }
    try {
      const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({ id: subscriberId })
      });
      results.push({ tag: name, status: tagRes.ok ? "applied" : "failed" });
    } catch (e) {
      results.push({ tag: name, status: "error", error: e.message });
    }
  }
  return results;
}

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const {
    first_name,
    email,
    guide = "unknown",
    niche = "unknown",
    utm_source = "direct",
    utm_campaign = "",
    is_existing = false,
    current_tags = [],
    sequence_id: override_sequence_id,
    mode,
    fields: extra_fields,
    tags: tag_names
  } = body;

  if (!first_name || !email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "first_name and email are required" }) };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email address" }) };
  }

  const KIT_V4_API_KEY = process.env.KIT_V4_API_KEY;
  if (!KIT_V4_API_KEY) {
    console.error("KIT_V4_API_KEY not set");
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "config-error" }) };
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": KIT_V4_API_KEY
  };

  // ─── MODE: SEQUENCE (direct enrollment, no niche routing) ───
  if (mode === "sequence") {
    if (!override_sequence_id) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "sequence_id is required for mode: sequence" }) };
    }

    try {
      const subBody = { first_name, email_address: email };
      if (extra_fields && typeof extra_fields === "object") {
        subBody.fields = extra_fields;
      }

      let subRes = await fetch(`${KIT_BASE}/subscribers`, {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify(subBody)
      });
      let subData = await subRes.json();

      // If custom fields tripped a 4xx, retry without fields so enrollment still lands.
      if (!subRes.ok && subBody.fields) {
        console.warn("Sequence-mode subscriber upsert failed with fields; retrying without. Status: " + subRes.status + " Response:", JSON.stringify(subData));
        subRes = await fetch(`${KIT_BASE}/subscribers`, {
          method: "POST",
          headers: kitHeaders,
          body: JSON.stringify({ first_name, email_address: email })
        });
        subData = await subRes.json();
      }

      if (subRes.status === 401 || subRes.status === 403) {
        console.error("Sequence-mode: Kit V4 auth failed (status " + subRes.status + "). Response:", JSON.stringify(subData));
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "auth-failed" }) };
      }

      const subscriberId = subData && subData.subscriber && subData.subscriber.id;
      if (!subscriberId) {
        console.error("Sequence-mode: no subscriber ID from Kit. Status: " + subRes.status + " Response:", JSON.stringify(subData));
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "no-subscriber-id" }) };
      }

      const seqRes = await fetch(`${KIT_BASE}/sequences/${override_sequence_id}/subscribers`, {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({ id: subscriberId })
      });
      const seqData = await seqRes.json().catch(function() { return null; });

      console.log("Sequence-mode enroll | subscriber " + subscriberId + " | sequence " + override_sequence_id + " | ok=" + seqRes.ok);

      // Apply any source/funnel tags by name (e.g. lead-source-ig-maturity-quiz,
      // quiz-lead). Optional — absence or failure never blocks enrollment.
      let tagResults = null;
      if (Array.isArray(tag_names) && tag_names.length) {
        tagResults = await applyTagsByName(tag_names, subscriberId, kitHeaders);
        console.log("Sequence-mode tags | subscriber " + subscriberId + " | " + JSON.stringify(tagResults));
      }

      // Fire a best-effort inbox alert (Kit's native one doesn't fire for the
      // V4 API path). Derive a human label from the source tag when present.
      let sourceLabel = "New quiz / lead-magnet signup";
      if (Array.isArray(tag_names)) {
        const src = tag_names.find(function(t) { return String(t).indexOf("lead-source-") === 0; });
        if (src) sourceLabel = String(src).replace(/^lead-source-/, "").replace(/-/g, " ");
      }
      const alertStatus = await sendLeadAlert({
        first_name, email, subscriber_id: subscriberId, tags: tag_names, source: sourceLabel
      });
      console.log("Sequence-mode lead alert | subscriber " + subscriberId + " | " + alertStatus);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          subscriber_id: subscriberId,
          sequence: { id: override_sequence_id, status: seqRes.ok ? "enrolled" : "failed", data: seqData },
          tags_applied: tagResults,
          alert: alertStatus
        })
      };
    } catch (error) {
      console.error("Sequence-mode subscribe error:", error);
      // Always 200 to client - calling page must not break on Kit errors.
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "server-error" }) };
    }
  }

  try {
    // Step 1: Upsert subscriber in Kit
    const subRes = await fetch(`${KIT_BASE}/subscribers`, {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({
        first_name,
        email_address: email,
        fields: { guide_source: guide, utm_source, utm_campaign }
      })
    });
    const subData = await subRes.json();

    if (subRes.status === 401 || subRes.status === 403) {
      console.error("Default-mode: Kit V4 auth failed (status " + subRes.status + "). Response:", JSON.stringify(subData));
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "auth-failed" }) };
    }

    const subscriberId = subData && subData.subscriber && subData.subscriber.id;

    if (!subscriberId) {
      console.error("No subscriber ID from Kit. Status: " + subRes.status + " Response:", JSON.stringify(subData));
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "no-subscriber-id" }) };
    }

    // Step 2: Determine routing scenario
    const tagNames = Array.isArray(current_tags)
      ? current_tags.map(function(t) { return String(t).toLowerCase(); })
      : [];
    const inMedspaBizDev = tagNames.some(function(t) { return t.indexOf("medspa-biz-dev") !== -1; });
    const inAnySequence  = tagNames.some(function(t) { return t.indexOf("sequence:") === 0; });
    const inQuizFunnel   = tagNames.some(function(t) { return t.indexOf("quiz") !== -1; });

    let scenario;
    if (inMedspaBizDev) {
      scenario = "existing-in-sequence";
    } else if (inAnySequence || inQuizFunnel) {
      scenario = "existing-other-sequence";
    } else {
      scenario = "net-new";
    }

    console.log("Subscriber " + subscriberId + " | scenario: " + scenario + " | tags: [" + tagNames.join(", ") + "]");

    // Step 3: Determine tags to apply
    const tagsToApply = ["source: medspa-guide-gate", "niche: medspa", "guide-accessed: medspa"];
    if (scenario === "net-new") tagsToApply.push("sequence: medspa-biz-dev");
    if (scenario === "existing-other-sequence") tagsToApply.push("flag: manual-review");

    const tagResults = [];
    for (const tagName of tagsToApply) {
      const tagId = TAG_IDS[tagName];
      if (!tagId) {
        console.warn("Tag ID not configured for: \"" + tagName + "\" - skipping");
        tagResults.push({ tag: tagName, status: "skipped-no-id" });
        continue;
      }
      try {
        const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
          method: "POST",
          headers: kitHeaders,
          body: JSON.stringify({ id: subscriberId })
        });
        tagResults.push({ tag: tagName, status: tagRes.ok ? "applied" : "failed" });
      } catch (e) {
        tagResults.push({ tag: tagName, status: "error", error: e.message });
      }
    }

    // Step 4: Enroll in sequence (net-new only)
    // The medspa-biz-dev sequence does not exist in Kit. When no sequence is
    // configured (override_sequence_id absent AND SEQUENCE_IDS["medspa-biz-dev"]
    // unset), skip enrollment cleanly. Subscriber upsert + tagging still happen.
    let sequenceResult = null;
    let mode = "subscriber-and-sequence";
    if (scenario === "net-new") {
      const seqId = override_sequence_id || SEQUENCE_IDS["medspa-biz-dev"];
      if (seqId) {
        try {
          const seqRes = await fetch(`${KIT_BASE}/sequences/${seqId}/subscribers`, {
            method: "POST",
            headers: kitHeaders,
            body: JSON.stringify({ id: subscriberId })
          });
          const seqData = await seqRes.json();
          sequenceResult = { status: seqRes.ok ? "enrolled" : "failed", data: seqData };
        } catch (e) {
          sequenceResult = { status: "error", error: e.message };
        }
      } else {
        console.log("Default-mode: no sequence configured (override absent, KIT_SEQ_MEDSPA_BIZ_DEV unset) — subscriber upserted and tagged, sequence enrollment intentionally skipped. subscriber=" + subscriberId);
        sequenceResult = { status: "skipped-no-sequence-configured" };
        mode = "subscriber-only";
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        routed: true,
        mode,
        subscriber_id: subscriberId,
        scenario,
        tags_applied: tagResults,
        sequence: sequenceResult
      })
    };

  } catch (error) {
    console.error("Subscribe function error:", error);
    // Always 200 to client - guide must unlock regardless
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "server-error" }) };
  }
};
