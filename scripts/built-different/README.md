# Built Different — Kit V4 build

Idempotent build of the **Built Different** evergreen sequence in Kit (ConvertKit), via the V4 API.

## Files
- `emails.js` — verbatim copy for all 10 issues (subject, preview text, body Markdown, delays). Source of truth: `built_different_issues_final.md`.
- `md-to-html.js` — deterministic Markdown→email-HTML converter (`**`→`<strong>`, `*`→`<em>`, `- `→`<ul><li>`, `1. `→`<ol><li>`, blocks→`<p>`). No underline, no template chrome.
- `build.js` — the runner. Idempotent: finds-or-creates the tag and sequence **by name**, upserts emails **by position**.
- `previews/` — local HTML renders for eyeballing (generated; not sent to Kit).

## Run
```bash
# Local previews + copy/encoding scan only (no key, no network):
node scripts/built-different/build.js --previews

# Live build (key via env only — never committed, never logged):
KIT_V4_API_KEY=… node scripts/built-different/build.js --verify
```
Re-running is safe: the tag/sequence are reused by name and each email is updated in place by position (no duplicates).

## What the API build does
1. Tag `built-different-nurture` — create if absent.
2. Sequence `Built Different` — create if absent; set schedule `send_days=[friday]`, `send_hour=8`, `time_zone=America/New_York`, `active=true`.
3. 10 emails, positions 1–10, `published=true`, `delay_unit=days`, delays `0` then `21×9`. Subject = recommended line; `preview_text` set manually; `content` = converted HTML.

## NOT done by the API — wire these in the Kit UI
These have **no V4 API endpoint**; they are manual:
1. **Entry automation:** Visual Automation → trigger "Tag added: `built-different-nurture`" → action "Subscribe to sequence: Built Different."
2. **Upstream link:** at the end of the intro nurture sequence, add the action that applies the `built-different-nurture` tag (this is what feeds the automation above).
3. **A/B subject variants:** the sequence-email schema has a single `subject` field — alternates can't be loaded as A/B via API. Add in UI if desired.
4. **Subscriber-local send time:** the sequence schedule is a single account `time_zone` (set to ET here). If you want true subscriber-local Friday-morning sends, toggle it in the UI.
5. **Test sends + mobile QA:** there is no API endpoint to send a test/preview of a sequence email. Use Kit's per-email **Preview / Send test** to mail Email 1 and Email 6 to a seed address and check on mobile.

## Double-enrollment
Kit does not re-add an active subscriber who is already in a sequence, so the automation won't double-enroll. Confirm in the UI after wiring (Settings → the sequence's "exclude" / re-entry behavior).
