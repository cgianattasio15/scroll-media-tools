#!/usr/bin/env node
/**
 * Built Different — idempotent Kit V4 build.
 *
 * Re-runnable: finds-or-creates the tag and the sequence BY NAME, and upserts
 * the 10 emails BY POSITION (so re-running edits in place, never duplicates).
 *
 * Auth: reads the key from the KIT_V4_API_KEY environment variable only. The key
 * is never written to disk and never logged.
 *
 *   KIT_V4_API_KEY=… node scripts/built-different/build.js          # live build
 *   node scripts/built-different/build.js --previews                # no key; just
 *                                                                     write local
 *                                                                     HTML previews
 *   KIT_V4_API_KEY=… node scripts/built-different/build.js --verify # build, then
 *                                                                     read back &
 *                                                                     print check
 */

const fs = require("fs");
const path = require("path");
const { SEQUENCE_NAME, TAG_NAME, SCHEDULE, emails } = require("./emails");
const { mdToHtml } = require("./md-to-html");

const KIT_BASE = "https://api.kit.com/v4";
const API_KEY = process.env.KIT_V4_API_KEY || "";
const PREVIEWS_ONLY = process.argv.includes("--previews");
const VERIFY = process.argv.includes("--verify");

const WEEKDAY = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// ── HTTP helper (never logs the key) ────────────────────────────────────────
async function kit(method, p, body) {
  const res = await fetch(KIT_BASE + p, {
    method,
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": API_KEY },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (_) {}
  return { ok: res.ok, status: res.status, json, text };
}

function fail(msg, detail) {
  console.error("\n✗ " + msg);
  if (detail) console.error("  " + (typeof detail === "string" ? detail : JSON.stringify(detail)));
  process.exit(1);
}

// ── Local previews (no network) ─────────────────────────────────────────────
function writePreviews() {
  const dir = path.join(__dirname, "previews");
  fs.mkdirSync(dir, { recursive: true });
  for (const e of emails) {
    const inner = mdToHtml(e.body);
    // Wrapper is for local viewing ONLY — it is NOT sent to Kit. The Kit
    // `content` field receives `inner` exactly.
    const page = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Built Different — Email ${e.position}: ${e.subject}</title>
<style>
  body{margin:0;background:#f4f4f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a1a2e;}
  .meta{max-width:600px;margin:0 auto;padding:16px 24px;color:#666;font-size:13px;border-bottom:1px solid #e3e3e3;background:#fff;}
  .mail{max-width:600px;margin:0 auto;padding:24px;background:#fff;font-size:16px;line-height:1.6;}
  .mail p{margin:0 0 1em;} .mail ul,.mail ol{margin:0 0 1em;padding-left:1.4em;} .mail li{margin:0 0 .4em;}
</style></head>
<body>
  <div class="meta"><strong>Email ${e.position}</strong> · delay ${e.delay_value} day(s) · Fri ${SCHEDULE.send_hour}:00 ${SCHEDULE.time_zone}<br>
  <strong>Subject:</strong> ${e.subject}<br><strong>Preview:</strong> ${e.preview_text}</div>
  <div class="mail">
${inner}
  </div>
</body></html>`;
    fs.writeFileSync(path.join(dir, `email-${String(e.position).padStart(2, "0")}.html`), page);
  }
  console.log("  wrote " + emails.length + " preview files to scripts/built-different/previews/");
}

// ── Encoding / em-dash sanity scan ──────────────────────────────────────────
function scanCopy() {
  const findings = [];
  for (const e of emails) {
    const html = mdToHtml(e.body);
    const hay = e.subject + " " + e.preview_text + " " + e.body;
    if (/[—]/.test(hay)) findings.push(`Email ${e.position}: em-dash (—) present in copy`);
    if (/[–]/.test(hay)) findings.push(`Email ${e.position}: en-dash (–) present in copy`);
    if (/Ã|Â|â€|�/.test(html)) findings.push(`Email ${e.position}: possible mojibake in HTML`);
    if (/_/.test(html.replace(/[^_]/g, "_").length ? "" : "")) {} // no underscores expected from converter
    if (/\*/.test(html)) findings.push(`Email ${e.position}: stray asterisk survived conversion`);
    if (/<u>|text-decoration:\s*underline/i.test(html)) findings.push(`Email ${e.position}: underline emitted`);
  }
  return findings;
}

// ── Paginated finders ───────────────────────────────────────────────────────
async function findByName(resource, key, name, eq) {
  let after = null;
  do {
    const q = `/${resource}?per_page=100` + (after ? `&after=${encodeURIComponent(after)}` : "");
    const r = await kit("GET", q);
    if (!r.ok) fail(`GET /${resource} failed (status ${r.status})`, r.json || r.text);
    const list = (r.json && r.json[key]) || [];
    const hit = list.find((x) => eq(x, name));
    if (hit) return hit;
    const pg = r.json && r.json.pagination;
    after = pg && pg.has_next_page ? pg.end_cursor : null;
  } while (after);
  return null;
}

async function ensureTag() {
  const existing = await findByName("tags", "tags", TAG_NAME,
    (t, n) => (t.name || "").toLowerCase() === n.toLowerCase());
  if (existing) { console.log(`  tag "${TAG_NAME}" exists (id ${existing.id})`); return existing; }
  const c = await kit("POST", "/tags", { name: TAG_NAME });
  if (!c.ok && c.status !== 201 && c.status !== 200) fail("create tag failed", c.json || c.text);
  const tag = c.json && c.json.tag;
  console.log(`  tag "${TAG_NAME}" created (id ${tag && tag.id})`);
  return tag;
}

async function ensureSequence() {
  let seq = await findByName("sequences", "sequences", SEQUENCE_NAME, (s, n) => s.name === n);
  if (seq) {
    console.log(`  sequence "${SEQUENCE_NAME}" exists (id ${seq.id})`);
  } else {
    const c = await kit("POST", "/sequences", { name: SEQUENCE_NAME });
    if (!c.ok) fail("create sequence failed", c.json || c.text);
    seq = c.json && c.json.sequence;
    console.log(`  sequence "${SEQUENCE_NAME}" created (id ${seq && seq.id})`);
  }
  // Apply schedule (Friday mornings, ET) + activate. Idempotent.
  const upd = await kit("PUT", `/sequences/${seq.id}`, {
    send_days: SCHEDULE.send_days,
    send_hour: SCHEDULE.send_hour,
    time_zone: SCHEDULE.time_zone,
    active: true,
  });
  if (!upd.ok) fail("update sequence schedule failed", upd.json || upd.text);
  console.log(`  schedule set: ${SCHEDULE.send_days.join(",")} @ ${SCHEDULE.send_hour}:00 ${SCHEDULE.time_zone}, active`);
  return seq;
}

async function listSequenceEmails(seqId) {
  // Primary path; fall back to the flat resource if the nested one 404s.
  let r = await kit("GET", `/sequences/${seqId}/emails?per_page=100`);
  if (r.status === 404) r = await kit("GET", `/sequence-emails?sequence_id=${seqId}&per_page=100`);
  if (!r.ok) fail("list sequence emails failed", r.json || r.text);
  return (r.json && (r.json.sequence_emails || r.json.emails)) || [];
}

async function upsertEmail(seqId, def, existing) {
  const payload = {
    subject: def.subject,
    preview_text: def.preview_text,
    content: mdToHtml(def.body),
    delay_value: def.delay_value,
    delay_unit: "days",
    position: def.position,
    published: true,
  };
  if (existing) {
    const r = await kit("PUT", `/sequence-emails/${existing.id}`, payload);
    if (!r.ok) fail(`update email pos ${def.position} failed`, r.json || r.text);
    return { action: "updated", id: existing.id };
  }
  let r = await kit("POST", `/sequences/${seqId}/emails`, payload);
  if (r.status === 404) r = await kit("POST", `/sequence-emails`, Object.assign({ sequence_id: seqId }, payload));
  if (!r.ok) fail(`create email pos ${def.position} failed`, r.json || r.text);
  const created = r.json && (r.json.sequence_email || r.json.email);
  return { action: "created", id: created && created.id };
}

// ── Main ────────────────────────────────────────────────────────────────────
(async function main() {
  console.log(`\nBuilt Different — Kit build  (${new Date().toISOString()})`);

  console.log("\n[0] Copy / encoding scan");
  const findings = scanCopy();
  if (findings.length) findings.forEach((f) => console.log("  ⚠ " + f));
  else console.log("  clean: no em-dashes, no mojibake, no stray markdown, no underlines");

  console.log("\n[1] Local previews");
  writePreviews();

  if (PREVIEWS_ONLY) { console.log("\n--previews: done (no API calls made).\n"); return; }

  if (!API_KEY) fail("KIT_V4_API_KEY is not set. Run with the key in env, or use --previews.");

  console.log("\n[2] Tag");
  await ensureTag();

  console.log("\n[3] Sequence");
  const seq = await ensureSequence();

  console.log("\n[4] Emails (upsert by position)");
  const current = await listSequenceEmails(seq.id);
  for (const def of emails) {
    const existing = current.find((x) => Number(x.position) === def.position);
    const res = await upsertEmail(seq.id, def, existing);
    console.log(`  pos ${def.position}: ${res.action} (id ${res.id}) — "${def.subject}"`);
  }

  if (VERIFY) {
    console.log("\n[5] Verify (read-back)");
    const after = (await listSequenceEmails(seq.id)).slice().sort((a, b) => a.position - b.position);
    console.log(`  ${after.length} emails on sequence ${seq.id}`);
    for (const e of after) {
      const d = e.delay_unit ? `${e.delay_value} ${e.delay_unit}` : `${e.delay_value}`;
      console.log(`   #${e.position}  delay=${d}  pub=${e.published}  "${e.subject}"  | preview="${e.preview_text}"`);
    }
  }

  console.log("\n✓ Build complete.\n");
})().catch((e) => fail("unhandled error", e && e.stack ? e.stack : String(e)));
