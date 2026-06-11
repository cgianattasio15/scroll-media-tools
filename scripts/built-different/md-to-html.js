/**
 * Deterministic Markdown -> email HTML for the Built Different sequence.
 *
 * Fixed mapping (and ONLY this mapping):
 *   blank-line-separated block            -> <p>...</p>
 *   block of lines starting "- "          -> <ul><li>...</li></ul>
 *   block of lines starting "1. " "2. "   -> <ol><li>...</li></ol>
 *   **bold**                              -> <strong>...</strong>
 *   *italic*                              -> <em>...</em>
 *
 * No underline is ever emitted. Output is plain-text-forward: bare <p>/<ul>/<ol>,
 * no banner, no buttons, no inline styles. & < > are HTML-escaped; curly quotes
 * and apostrophes pass through untouched (UTF-8).
 */

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  let out = escapeHtml(s);
  // Bold first (** … **), then italic (* … *). Spans never contain a literal *.
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

function mdToHtml(md) {
  const blocks = md.trim().split(/\n\s*\n/);
  const html = [];
  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.replace(/\s+$/, ""));
    if (lines.every((l) => /^- /.test(l))) {
      html.push(
        "<ul>" +
          lines.map((l) => "<li>" + inline(l.replace(/^- /, "")) + "</li>").join("") +
          "</ul>"
      );
    } else if (lines.every((l) => /^\d+\.\s/.test(l))) {
      html.push(
        "<ol>" +
          lines.map((l) => "<li>" + inline(l.replace(/^\d+\.\s/, "")) + "</li>").join("") +
          "</ol>"
      );
    } else {
      html.push("<p>" + inline(lines.join(" ")) + "</p>");
    }
  }
  return html.join("\n");
}

module.exports = { mdToHtml, inline, escapeHtml };
