# Scroll Media Design System — Master Reference

**Version:** 2.3
**Last Updated:** March 13, 2026
**Source of Truth for:** All Scroll Media HTML pages, proposals, dashboards, and client-facing deliverables.

This document is fully self-contained. Any AI agent, developer, or contributor with zero prior context can read it and build, maintain, or extend any Scroll Media web asset correctly.

---

## 1. Brand Philosophy

Scroll Media is a social-first growth and content agency built on the philosophy of **Simplifying Social Media**.

**Tagline:** "Media is the new word of mouth"

**Core Priorities (in order):**
- Clarity over complexity
- Strategy before tactics
- Retention over reach
- Consistency over virality
- Long-term brand building over short-term hacks

**Positioning:** Strategic partners, not content vendors.

---

## 2. Visual Identity

### Logo

- **Primary:** Full "scroll media" stacked wordmark (lowercase, custom rounded typeface with distinctive double-L design)
- **Wordmark:** "Scroll" only (for compact spaces)
- **Wordmark Full Name:** "Scroll Media" (horizontal)
- **Monogram:** "sm" script mark (for icons, social avatars, watermarks)
- **Brand Illustration:** The Scroll Dog — line-drawn dog representing approachability, loyalty, and companionship. Use in marketing materials and social content. Accent color: Azure Blue (#0c3387).
- **File references:** Always use `scroll-media-logo.svg` and `scroll-favicon.svg` — never base64 encoded strings.

---

## 3. Color System

There are two distinct color schemes. Use the correct one based on the page type.

### Scheme A — Primary (Dark / Authority)

**Use for:** Sales pages, product pages, landing pages, quiz pages. This is the default for all public-facing web pages.

| Token | Hex | Usage |
|---|---|---|
| Shadow | `#151516` | Primary text, headers, dark backgrounds. Authority and sophistication. |
| Azure | `#0c3387` | Primary brand color. CTAs, buttons, section headers, key focal points. |
| Lucid Dreams | `#cbe9ff` | Secondary backgrounds, gradients, softer highlights. **Never use as text color.** |
| Highlighter | `#e2ed7a` | Accent for badges, highlights, visual interest. Use sparingly. |
| Porcelain | `#f2f3f4` | Neutral card and surface backgrounds. |
| Ghost | `#fafdff` | Off-white page backgrounds. |

**Dark mode pattern:** Deep navy/black background (`#151516`) with Azure CTAs, Highlighter accents, and Ghost/Porcelain card surfaces. This is the aesthetic of `instagram-growth-blueprint.html` and all primary sales pages.

### Scheme B — Secondary (Light / Pitch)

**Use for:** Proposals, pitch decks, client-facing strategy documents, and the pitch page (`decks.scrollmedia.co/pitch/`). Cleaner, more professional, less aggressive.

| Token | Hex | Usage |
|---|---|---|
| Ghost | `#fafdff` | Primary page background |
| Shadow | `#151516` | Primary text and headers |
| Azure | `#0c3387` | Accent, CTAs, section dividers |
| Porcelain | `#f2f3f4` | Card backgrounds |
| Lucid Dreams | `#cbe9ff` | Subtle section backgrounds, gradients |
| Highlighter | `#e2ed7a` | Use even more sparingly than Scheme A |

**Light mode pattern:** Clean white/off-white background with dark text and Azure accents. Professional and readable. This is the aesthetic of `decks.scrollmedia.co/pitch/`.

### When to Use Which Scheme

| Page Type | Scheme |
|---|---|
| Sales pages (Blueprint, Signature, Playbook) | A — Dark/Authority |
| Quiz pages | A — Dark/Authority |
| Tools dashboard | A — Dark/Authority |
| Pitch deck / proposals | B — Light/Pitch |
| Client strategy documents | B — Light/Pitch |
| Discovery decks | B — Light/Pitch |

---

## 4. Typography

- **Primary Typeface:** Visby CF — Bold, modern, confident. Use for headlines, section headers, and brand elements.
- **Secondary Typeface:** Circular or Source Sans Pro — Clean and highly readable. Use for body copy, paragraphs, and supporting text.
- **Fallback Stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

| Element | Style |
|---|---|
| Headers (H1-H4) | Visby CF Bold/Heavy, 48–64px |
| Subheaders | Visby CF Bold, 24–32px |
| Body | Circular or Source Sans Pro Regular, 14–18px |
| Captions | Circular or Source Sans Pro Regular, 12–14px |

---

## 5. Design Principles

1. **Clarity First** — Every element should improve clarity, not add complexity. If it doesn't serve a clear purpose, remove it.
2. **Professional Minimalism** — Clean layouts, generous whitespace, and strategic color create sophistication without clutter.
3. **Hierarchy & Scannability** — Use size, weight, and color to guide attention. Readers should grasp key points in seconds.
4. **Consistency Across Touchpoints** — Maintain visual coherence across all pages, documents, slides, and client deliverables.

---

## 6. Page Architecture (Scheme A — Sales Pages)

Every public-facing sales or product page must follow this 20-section structure in this exact order. The canonical reference is `instagram-growth-blueprint.html`.

1. **Progress Bar** — 3px gradient bar fixed to top, tracks scroll depth.
2. **Sticky Nav** — Blurred glass background, wordmark logo, section links, primary CTA button.
3. **Hero Section** — Radial gradient background, Highlighter badge, gradient headline, problem/solution statement, dual CTAs (primary + secondary).
4. **Client Logo Ticker** — Scrolling ticker of client logos for social proof.
5. **Proof Bar** — 3-column section with key stats (Clients Served, 5-Star Reputation, Years Experience).
6. **Problem Section** — Clearly articulates the pain point the product solves.
7. **Testimonials Section** — 3-column grid of client testimonials. Must be white-labeled (no real names).
8. **What's Included (Scope Grid)** — Detailed grid of all deliverables.
9. **How It Works** — Numbered or step-by-step process overview.
10. **Who It's For** — Defines the ideal customer profile for the offer.
11. **Approach/KPI Section** — Explains the strategic framework and the metrics that matter.
12. **Offer Comparison Table** — Compares the current offer to the next tier up.
13. **Examples/Use Cases** — Accordion or tabbed section showing real-world applications.
14. **Process Overview** — Visual timeline or step-by-step graphic of the client journey.
15. **Recognition/As Seen In** — Logos of publications or podcasts.
16. **Pricing Section** — Clear pricing, scarcity signal (if applicable), primary CTA.
17. **Decision Section** — Two-card layout presenting the choice between current offer and next-tier offer.
18. **FAQ Section** — Accordion-style FAQ to address common objections.
19. **Final CTA Section** — Full-width, high-contrast section with a final, urgent call to action.
20. **Footer** — Wordmark logo, cross-links, standard legal copy.

### Quiz Page Specifics

- Footer must be white background (`#FFFFFF`) with dark text (`#151516`).
- Logo must use the SVG file reference, never base64.
- Supports `?preview=` URL parameter to bypass quiz and view result pages directly (e.g., `?preview=spark`).

---

## 6b. Page Architecture (Scheme B — Discovery Decks)

Discovery decks are pre-call preparation documents sent to prospects before a discovery call. They are **not** sales pages — they are client-specific research and conversation-starting tools. Use Scheme B (Light/Pitch).

**Canonical reference:** `tools.scrollmedia.co/discovery/carlsdeli/`
**Deploy path pattern:** `tools.scrollmedia.co/discovery/[clientslug]/`
**Repo:** `cgianattasio15/scroll-media-tools`
**Dashboard:** Root `index.html` in `scroll-media-tools` repo — public at `https://tools.scrollmedia.co/`

> ⚠️ Do NOT use `decks.scrollmedia.co` for discovery decks. That domain is for proposals and pitch pages only. Discovery decks always deploy to `tools.scrollmedia.co`.

### Required Global Elements

- **Progress Bar** — 3px gradient (`var(--azure)` → `var(--hi)`), fixed to top (z-index 1001), JS scroll-driven width.
- **Sticky Nav** — `rgba(250,253,255,.94)` background with `backdrop-filter:blur(14px)`. Logo links to `decks.scrollmedia.co/pitch/`. Nav links use `data-section` attributes for scroll-spy. Active link gets `background:var(--azure-lt); color:var(--azure)` via JS. Hides on mobile (≤820px).
- **Scroll-Spy** — JS `IntersectionObserver` or scroll listener updates `.active` class on nav links as sections enter viewport. Offset: 80px from top.
- **Footer** — Dark (`var(--shadow)`) background. Logo inverted white. Links to `scrollmedia.co` and `hello@scrollmedia.co`.

### Asset Paths (absolute, never relative)

| Asset | URL |
|---|---|
| Logo SVG | `https://tools.scrollmedia.co/scroll-media-logo.svg` |
| Favicon | `https://tools.scrollmedia.co/scroll-favicon.svg` |

**Never use relative paths for logos/favicons in discovery decks.** The deploy path varies by client; relative paths will break.

### Required Section Order

1. **Hero** — Client × Scroll Media header chip, headline ("This isn't a pitch. It's a conversation."), 1-sentence sub, meta pills (Business, Market, Niche, Session Type).
2. **Client Profile** — 2×2 grid: Business Overview (key-value list), Differentiators (arrow list), Pain Points (arrow list), Primary Goals (TOFU/MOFU/BOFU funnel list).
3. **Social Media Audit** — One expandable card per Instagram account. Each card: handle, stats (followers · posts · following), maturity stage badge, What's Working / Where to Improve columns, stage bar (Spark → Lift → Rise → Thrive). Closes with insight callout on strategic recommendation.
4. **Observations** — 3 numbered observation cards (icon circle + heading + 2–3 sentence explanation + tags). Closes with full-width opportunity callout (Azure gradient).
5. **Content Ideation** — TOFU / MOFU / BOFU funnel blocks. Each block: funnel header bar (color-coded), 2×2 idea grid. Each idea card: format tag (Reel/Carousel/Stories), pillar label, hook (italic), execution brief, "Why it works" rationale.
6. **How We Work** — Stats row (3 boxes) + 3-phase execution cards (Month 1 Foundation / Months 2–3 Execution / Month 4+ Optimization). This section replaces separate "Who We Are" and "How We Work" sections — keep them merged.
7. **Investment** — 2-column card grid: Featured (Blueprint $997, "Recommended Starting Point" ribbon) + Standard (Signature $2,975+). Both cards link to live product pages.
8. **Next Steps** — 3-column step cards (Custom Proposal → Proposal Review → Contract & Kickoff).

### Section Reduction Rules

- **No separate "Who We Are" section.** Credentials (stats + phases) belong in a single "How We Work" section.
- **No content pillars grid in Observations.** The Content Ideation section handles this; avoid duplication.
- **Nav should have 6 items maximum.** If sections are merged, nav items merge accordingly.
- **Section sub-copy max 1 sentence.** Discovery decks are conversation tools, not sales pages. Keep sub-copy tight.

### Content Ideation Section — Format Tags

| Tag | CSS Class | Color |
|---|---|---|
| Reel | `.reel` | Azure background tint |
| Carousel | `.carousel` | Highlighter background tint |
| Stories | `.stories` | Warm amber background tint |

Each idea card must include: format tag, pillar name, hook (italic, 14px bold), execution brief (13px), "Why it works" rationale separated by a border-top.

### Maturity Stage Badges

| Stage | CSS Class | Color |
|---|---|---|
| Spark | `.badge-spark` | Highlighter tint, dark green text |
| Lift | `.badge-lift` | Azure tint, Azure text |
| Rise | `.badge-rise` | Azure mid tint |
| Thrive | `.badge-thrive` | Azure dark tint |

Stage bars inside account cards use `.seg` base class with `.on-spark` or `.on-lift` modifier for the active stage.

### Customization Per Client

For each new discovery deck, update:
- Hero meta pills (Business, Market, Niche)
- Client Profile section (all 4 cards)
- Both account audit cards (handle, stats, stage, working/improve points)
- All 12 content ideation ideas (TOFU × 4, MOFU × 4, BOFU × 4)
- Insight callouts (audit recommendation, ideation closing note)
- Page `<title>` tag

## 7. Key URLs & Page Inventory

| Page | URL |
|---|---|
| Tools Dashboard (password: `scrollies`) | `https://tools.scrollmedia.co` |
| Primary Pitch Page | `https://decks.scrollmedia.co/pitch/` |
| Decks & Assets Dashboard (proposals/pitch) | `https://decks.scrollmedia.co/` |
| Discovery Deck Dashboard | `https://tools.scrollmedia.co/` (root index.html in scroll-media-tools) |
| Instagram Maturity Quiz | `https://tools.scrollmedia.co/instagram_maturity_quiz.html` |
| Audience-to-Action Playbook ($87) | `https://tools.scrollmedia.co/audience-to-action.html` |
| Instagram Growth Blueprint ($997) | `https://tools.scrollmedia.co/instagram-growth-blueprint.html` |
| Signature Package ($2,750+/mo) | `https://tools.scrollmedia.co/signature-package.html` |
| Discovery Deck — Carl's Deli | `https://tools.scrollmedia.co/discovery/carlsdeli/` |
| Discovery Deck path pattern | `tools.scrollmedia.co/discovery/[clientslug]/` |

---

## 8. CTA & Onboarding Flows

These are non-negotiable. Do not deviate.

### Blueprint ($997)
1. CTA → short intake form (Typeform or Calendly)
2. Intake form captures: business type, IG handle, goal, timeline, source
3. Contract sent automatically on intake submission
4. Onboarding form sent automatically on contract signature
5. Kickoff call booking unlocked after onboarding form submission

### Signature Package ($2,750+/mo)
1. CTA → Calendly discovery call (30 min)
2. Discovery call qualifies prospect
3. Custom proposal sent post-call
4. Contract sent on proposal acceptance
5. Onboarding form sent on contract signature
6. Kickoff call booking unlocked after onboarding form submission

### Master Onboarding Form
Single form with conditional logic for both offers:
- Sections 1–5 (All clients): Business Fundamentals, Audience & Positioning, Current State, Goals & KPIs, Brand Voice & Content
- Section 6 (Signature only): Execution Preferences

---

## 9. Brand Voice & Copywriting Rules

**Voice characteristics:**
- Direct, not academic
- Strategic, not fluffy
- Confident, not hype-driven
- Human, not corporate

**Copywriting rules:**
1. The first line matters more than everything else. Earn attention in 1–2 seconds.
2. Clarity beats cleverness.
3. Specific beats generic.
4. Fewer words > more words.
5. If it can be tighter, sharper, or more engaging — rewrite it without hesitation.

**Avoid:**
- Corporate jargon ("synergy," "leverage," "circle back")
- Buzzwords without substance ("disruptive," "game-changing")
- Emojis, exclamation points, forced enthusiasm
- Hedging language ("I think," "maybe," "hopefully")
- Overly polished "agency-speak"

---

## 10. Build & Deployment Standards

- **Repo:** `cgianattasio15/scroll-media-tools` on GitHub
- **Hosting:** Netlify, `scroll-media-tools` project
- **Deployment:** Push to `main` branch → automatic deploy
- **Testing:** All pages must pass the Python validation script (broken links, missing assets) before any commit
- **Logo/Favicon:** Always use absolute URL references, never relative paths, never base64

### Domain Split — Critical Distinction

| Asset Type | Repo | Live Domain |
|---|---|---|
| Discovery decks / prospect audits | `scroll-media-tools` | `tools.scrollmedia.co/discovery/{slug}/` |
| Proposals / pitch pages | Separate proposal workflow | `decks.scrollmedia.co/` |

**Never deploy a discovery deck to `decks.scrollmedia.co`.** These are different asset classes with different repos and dashboards.

### Dashboard Maintenance

Both dashboards are **manually maintained** — new pages never auto-appear.

**Discovery deck dashboard:** Root `index.html` in `scroll-media-tools` → public at `https://tools.scrollmedia.co/`

**Proposal/pitch dashboard:** Separate file → public at `https://decks.scrollmedia.co/`

Every deployment must include two commits:
1. The new page file at its deploy path
2. The updated dashboard index with the new card added

**Dashboard card required fields:**
- Initials badge (2 letters)
- Deck type label
- Client name
- 1-sentence description
- Month/Year
- Direct link to the correct live URL

### Required Deployment Verification

Before closing any discovery deck deployment, confirm:
1. Live page loads at `https://tools.scrollmedia.co/discovery/{slug}/`
2. Dashboard at `https://tools.scrollmedia.co/` contains the new card
3. Dashboard card links to the same `tools.scrollmedia.co` URL

---

## 11. Portable LLM Prompt (For Use in ChatGPT, Claude, Gemini, etc.)

Copy and paste this block at the start of any prompt in any LLM to enforce Scroll Media brand compliance:

```
You are creating this document/deliverable for Scroll Media, a social-first growth and content agency. Follow these brand guidelines exactly:

BRAND PHILOSOPHY:
- Core belief: Simplifying social media into clear, repeatable actions
- Positioning: Strategic partners, not content vendors
- Priorities: Clarity over complexity, strategy before tactics, retention over reach, consistency over virality, long-term brand building over short-term hacks

VISUAL IDENTITY:
- Primary Color Scheme (sales pages, dark mode): Shadow #151516 (backgrounds/text), Azure #0c3387 (CTAs/accents), Lucid Dreams #cbe9ff (secondary backgrounds), Highlighter #e2ed7a (badges/accents, use sparingly), Porcelain #f2f3f4 (cards), Ghost #fafdff (page backgrounds)
- Secondary Color Scheme (pitch/proposals, light mode): Ghost #fafdff (background), Shadow #151516 (text), Azure #0c3387 (accents/CTAs), Porcelain #f2f3f4 (cards)
- Typography: Primary = Visby CF (headlines), Secondary = Circular or Source Sans Pro (body), Fallback = -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Design Principles: Clarity first, professional minimalism, strong hierarchy, consistency across touchpoints

BRAND VOICE:
- Direct, not academic
- Strategic, not fluffy
- Confident, not hype-driven
- Human, not corporate

AVOID:
- Corporate jargon ("synergy," "leverage," "circle back")
- Buzzwords without substance ("disruptive," "game-changing")
- Emojis, exclamation points, forced enthusiasm
- Hedging language ("I think," "maybe," "hopefully")
- Overly polished "agency-speak"

COPYWRITING RULES:
- The first line matters more than everything else
- Clarity beats cleverness
- Specific beats generic
- Fewer words > more words
- If it can be tighter, sharper, or more engaging, rewrite it

Apply these guidelines to create [DESCRIBE THE SPECIFIC DELIVERABLE YOU NEED].
```
---
## 12. Proposal System & Build Standards
**Last updated:** April 2026
**Canonical example:** carlsdeli-proposal-final.html (decks.scrollmedia.co/carlsdeli/april2026/)
### Template Location
- Repo: cgianattasio15/scroll-proposals
- Path: _template/proposal-template.html
- Clone this for every new client. Never rebuild from scratch.
### Required Proposal Section Order (9 sections)
Hero → What We Heard → Strategy → Social SEO → Content Ideas → Scope → Timeline → What We Need From You → Investment/Next Steps
### Non-Negotiable Rules
- All 9 sections must be in BOTH nav links AND scroll-spy sections array
- Brand Inspiration is NEVER a standalone section — fold into Content Ideas as "Content Inspiration" subsection
- "What We Need From You" is required on every proposal and must be navigable
- Footer: always var(--porcelain) background, var(--ink-soft) text. Never dark.
- Cross-links: hero pill → how-we-work; ideation callout → how-we-work; framework CTA → pitch page
### Mobile Standards (apply to ALL HTML pages)
- Tables: wrap in overflow-x:auto container, min-width set on table element
- Calendars: wrap in overflow-x:auto container, min-width:480px on inner element
- Grids (3+ col): @media(max-width:640px) + @media(max-width:480px) rules required
- Nav breakpoint: 900px for ≤8 items, 1020px for 9+ items
- Minimum font: 16px body, 11px labels
- Minimum tap target: 44px
- Test breakpoints: 360px, 375px, 768px, 1280px
### Div Balance Check (required before every deploy)
python3 -c "c=open('file.html').read(); print(c.count('<div'), c.count('</div>'))"
Both numbers must match. If they don't, find and fix before deploying.
### Framework Page
- URL: decks.scrollmedia.co/how-we-work/
- Generic and reusable — never client-specific content or URLs
- CTA always points to: decks.scrollmedia.co/pitch/
- 9 nav items, 1020px mobile breakpoint
### Cross-System Update Protocol
After every completed deliverable:
1. Update Claude memory in Scroll Media Chief Strategist project
2. Update Scroll Media Knowledge Base in Scroll Media Notion workspace
3. Update relevant skill files in this repo
All three are required. Manus executes steps 2 and 3.
Commit message: "skill update: proposal system, mobile standards, cross-system protocol — April 2026"
