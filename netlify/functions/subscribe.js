/**
 * Netlify Function: subscribe.js
 * Handles email capture for industry guide gate pages.
 *
 * POST /api/subscribe
 * Body: {
 *   first_name, email, guide, niche, utm_source, utm_campaign,
 *   is_existing, current_tags, sequence_id (optional override)
 * }
 *
 * Routing Logic:
 *   - Net new: subscribe + tag + enroll in niche sequence
 *   - Already in niche biz-dev sequence: tag as guide-accessed only
 *   - In other sequence (quiz, different niche): tag + flag for manual review
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
    sequence_id: override_sequence_id
  } = body;

  if (!first_name || !email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "first_name and email are required" }) };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email address" }) };
  }

  const KIT_API_KEY = process.env.KIT_API_KEY;
  if (!KIT_API_KEY) {
    console.error("KIT_API_KEY not set");
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, routed: false, reason: "config-error" }) };
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": KIT_API_KEY
  };

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
    const subscriberId = subData && subData.subscriber && subData.subscriber.id;

    if (!subscriberId) {
      console.error("No subscriber ID from Kit:", JSON.stringify(subData));
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
    let sequenceResult = null;
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
        console.warn("KIT_SEQ_MEDSPA_BIZ_DEV not set - subscriber tagged but not enrolled");
        sequenceResult = { status: "skipped-no-sequence-id" };
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
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
