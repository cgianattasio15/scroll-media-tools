---
name: scroll-web-design
description: Master design system and build instructions for all Scroll Media HTML pages, including proposals and dashboards. Use for any web design, UI/UX, or HTML build task. ALL proposals must clone the template — never generate from scratch.
---

# Scroll Media Web Design & UI/UX Skill

## CRITICAL BUILD RULE — READ FIRST

NEVER generate proposal HTML from scratch. Every Scroll Media proposal must be built by cloning the master template. Generating from scratch produces the wrong font, wrong nav, wrong components, and wrong layout — even with a detailed prompt.

Proposal build method (non-negotiable): Step 1 — Obtain the template file: scroll-proposals/_template/proposal-template.html. Step 2 — Clone it and rename to [client-slug]-proposal-[monthyear].html. Step 3 — Replace all {{PLACEHOLDER}} values with client-specific content. Step 4 — Never change fonts, CSS tokens, component structure, or layout. Step 5 — Run div balance check before deploy: python3 -c "c=open('file.html').read(); print(c.count('<div'), c.count('</div>'))" — both numbers must match.

If you are in a new conversation without the template file: Stop. Ask the user to provide the template file or the Carl's Deli canonical file (carlsdeli-proposal-final.html) before proceeding. Do not attempt to recreate it from memory or description.

Canonical reference: decks.scrollmedia.co/carlsdeli/april2026/ — every proposal must look identical to this page in design, layout, and component structure. Only the content changes.

## Design System Overview

This skill is the single source of truth for all Scroll Media public-facing HTML pages. Use for any task involving creating or modifying HTML/CSS for Scroll Media pages, building new client proposals, auditing existing pages for brand compliance, or any web design task for Scroll Media.

## Core Workflow

For proposals: Clone the template per the Critical Build Rule above. For other pages: Read references/design_system.md before writing any code. Validate before deploy: run the div balance check — both numbers must match. Deploy and dashboard card: every proposal deploy includes a card in the tools.scrollmedia.co Prospect Proposals section in the same task.

## Proposal Design Specifications (non-negotiable)

Font: Source Sans 3 via Google Fonts — never Inter, Roboto, or any other font. Color scheme: Scheme B light — Ghost #fafdff background, Shadow #151516 text, Azure #0c3387 accents. Nav: Fixed position, glass blur, progress bar above, all sections in nav and scroll-spy. Footer: Always var(--porcelain) / #f2f3f4 background — NEVER dark. Section order (9 sections): What We Heard → Strategy → Social SEO → Content Ideas → Scope → Timeline → What We Need → Investment → Next Steps. Brand Inspiration: Never a standalone section — always folded into Content Ideas as a subsection. Hero: Always includes the How We Work pill linking to decks.scrollmedia.co/how-we-work/. RFP or no-call proposals: Rename "What We Heard" to "What We Found."

## Mobile Standards (every HTML page)

All tables: overflow-x:auto wrapper plus min-width on table. All calendars: overflow-x:auto wrapper plus min-width:480px on inner element. All 3-plus column grids: @media(max-width:640px) and @media(max-width:480px) rules required. Nav breakpoint: 900px for 8 or fewer items, 1020px for 9 or more items. Font minimums: 16px body, 11px labels. Tap targets: 44px minimum height. Test at: 360px, 375px, 640px, 768px, 1280px.

## Key Principles

Consistency is non-negotiable — all proposals must look identical in structure. Clone, do not create — the template exists for this reason. Every deploy includes a dashboard card — never a separate step.

## Bundled Resources

references/design_system.md contains the full color palette, typography, component library, CTA flows, build standards, and Section 12 covering the proposal system.

---
