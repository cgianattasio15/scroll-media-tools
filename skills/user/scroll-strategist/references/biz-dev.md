This reference covers the full business development system, from lead generation to closing a new client. It includes the campaign architecture, pricing, and proposal creation process.

### Campaign Funnel Architecture (v3 — 3-Campaign System)

Three parallel campaigns all feed into the same core funnel. Campaigns #1 (cold outreach) and #2 (IG content + ManyChat) both start with the Instagram Maturity Quiz. Campaign #3 (client referrals) is a direct, high-touch track — referred contacts are NOT automated into the quiz sequence.

1.  **Top of Funnel (Cold Traffic):**
    *   **Asset:** Instagram Maturity Quiz (`instagram_maturity_quiz.html`)
    *   **Traffic Source:** Cold email outreach, social media CTAs (pre-launch content).
    *   **Goal:** Capture email address in exchange for a valuable, personalized result.

2.  **Nurture & Qualification (Quiz Takers):**
    *   **Asset:** 4-part email drip sequence (in Kit, triggered on quiz completion).
    *   **Goal:** Build trust, deliver value, and segment prospects by their maturity stage.
    *   **Primary CTA:** Push to the Audience-to-Action Playbook ($87).

3.  **Low-Ticket Conversion (Playbook Buyers):**
    *   **Asset:** Audience-to-Action Playbook (`audience-to-action.html`)
    *   **Price:** $87
    *   **Goal:** Convert nurtured leads into paying customers, tag them as `playbook-buyer`.
    *   **Secondary CTA:** Push to the Instagram Growth Blueprint ($997).

4.  **Mid-Ticket Conversion (Blueprint Buyers):**
    *   **Asset:** Instagram Growth Blueprint (`instagram-growth-blueprint.html`)
    *   **Price:** $997 (credited toward Signature Package)
    *   **Goal:** Convert playbook buyers or high-intent prospects into a done-for-you strategy session.
    *   **CTA:** Book a 30-min discovery call (Calendly).

5.  **High-Ticket Conversion (Signature Package Clients):**
    *   **Asset:** Signature Package (`signature-package.html`)
    *   **Price:** Starts at $2,750/mo (Essential) / $3,000/mo (Growth)
    *   **Goal:** Convert qualified discovery call leads into retainer clients.
    *   **CTA:** Book a 30-min discovery call (Calendly).

### Key Pricing & Offer Updates (March 2026)

- **Signature Package Essential Tier:** Price increased from $2,500/mo to **$2,750/mo**.
- **Signature Package Growth Tier:** Differentiated with more value (QBR, priority support, more content) for only a $250/mo price difference.
- **Audience-to-Action Playbook:** Price standardized to **$87** across all pages.
- **Instagram Growth Blueprint:** Price is **$997**, with the full amount credited to the first month of a Signature Package engagement.

### Proposal Creation Process

Step 1 — Build the Proposal. CRITICAL: Never generate proposal HTML from scratch. Always clone the template. If you have the template file available, clone scroll-proposals/_template/proposal-template.html and replace all {{PLACEHOLDER}} values with intake data. If you do NOT have the template file, stop and ask the user to provide either the template file or carlsdeli-proposal-final.html as the canonical example. Do not attempt to recreate the design from memory or description. A proposal built from scratch will have the wrong font, wrong nav, wrong components, and wrong layout. Canonical visual reference: decks.scrollmedia.co/carlsdeli/april2026/ — every proposal must be pixel-identical in structure to this page.

2.  **Maturity Stage Assessment:** Use the SPARK → LIFT → RISE → THRIVE framework to determine the prospect's stage.
3.  **Build the 15-Section Proposal:** Follow the exact page architecture, customizing each section with the prospect's specific context.
4.  **Deploy:** Push the final HTML file to the `scroll-proposals` GitHub repo. The URL will be `https://decks.scrollmedia.co/[prospect-slug]/[monthyear]/`.
