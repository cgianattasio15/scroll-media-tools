# Scroll Media — Public URL Standards & Link Restrictions
Version: 1.1 | May 20, 2026

## Trunk Rule — NEVER Hyperlink tools.scrollmedia.co from Public Surfaces
The entire `tools.scrollmedia.co/*` trunk is link-restricted from any public-facing surface, regardless of subpath. This includes the root, every sub-path (`/services-catalog`, `/scroll-system/`, `/growth-manual/`, `/instagram-audit-cincinnati/`, every product page, every discovery deck, every client Homebase), and every future page deployed under this domain.

NEVER hyperlink any `tools.scrollmedia.co/*` URL from: public HTML pages, proposals, pitch decks, emails, footer navigation, social bios, lead-magnet body content, or any other prospect-facing surface. Internal-only and public surfaces share a URL trunk; treating the entire domain as link-restricted prevents accidental discovery of internal paths via crawlers, link-scraping, or visitor curiosity.

Embeds (images, iframes, objects) sourced from `tools.scrollmedia.co/*` are acceptable on public surfaces as long as the source URL is not exposed as a clickable hyperlink. Pages can still be deployed under this trunk and shared directly (DM, email, discovery call) — the restriction is on hyperlinking from public surfaces, not on the existence of public pages there.

The dashboard at the trunk root remains internal-only, password-protected (`scrollies`), and must never be referenced in public surfaces in any form.

## Dashboard Card Standard
Every new HTML page deployed to tools.scrollmedia.co must have a dashboard card added in the same commit. No page goes live without it. Dashboard sections: Lead Gen, Digital Products, Work With Us, Prospect Proposals, Internal Resources, Client Accounts.

## Canonical Public CTAs
Only two URLs are valid hyperlink targets from public-facing surfaces:

Book a Discovery Call (primary): https://calendly.com/scrollmedia/discovery
Learn More About Scroll Media: https://decks.scrollmedia.co/pitch/

All `tools.scrollmedia.co/*` URLs listed in prior versions of this doc (services catalog, signature package, growth blueprint, A2A playbook, Instagram quiz, etc.) remain valid deployment destinations but are NOT valid hyperlink targets from public surfaces. Share them via DM, email, or direct discovery-call context only.

## CTA Hierarchy — Free Resource Pages
1. Primary: Book a Discovery Call → https://calendly.com/scrollmedia/discovery
2. Secondary / Footer: Learn More About Scroll Media → https://decks.scrollmedia.co/pitch/

No `tools.scrollmedia.co/*` URL belongs in a public CTA slot. The previous "View Services" secondary CTA pointing at `/services-catalog` is retired.

## Footer Standard — All Public Pages
Two links maximum: Book a Discovery Call | Learn More About Scroll Media
No internal tools, no product pages, no dashboard links, no `tools.scrollmedia.co/*` URLs of any kind.

## Source of Truth
This doc syncs to CLAUDE.md §5 (Scroll Media OS). If anything here conflicts with CLAUDE.md §5, CLAUDE.md §5 wins and this doc gets updated to match.
