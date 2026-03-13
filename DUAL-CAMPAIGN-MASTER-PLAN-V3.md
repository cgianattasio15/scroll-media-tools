# Scroll Media Biz Dev — 3-Campaign Master Plan (v3)

**Last Updated:** March 12, 2026
**Status:** Final Plan for March 13 Launch
**Author:** Manus AI (Chief Strategist)

---

## 1. Executive Summary

This document is the single source of truth for the March 2026 business development initiative. It runs three parallel campaigns designed to generate new retainer clients from three distinct audiences: cold prospects, existing Instagram followers, and current clients.

**The Core Funnel (Campaigns #1 and #2):**
`Instagram Maturity Quiz` → `Unified Nurture Sequence` → `$87 A2A Playbook` → `$997 Blueprint` → `$2,750/mo Signature Package`

**Campaign #3 operates on a separate track:** a direct referral ask to current clients, with a one-time invoice discount as the incentive for a successful referral.

| Campaign | Audience | Entry Point | Goal |
|---|---|---|---|
| **#1 — Cold Outreach** | Cold ICP prospects (prospect list) | Cold email → Quiz | 1-2 new discovery calls |
| **#2 — IG Content + DM Automation** | Instagram followers + organic traffic | Content/ManyChat → Quiz | Ongoing lead flow from existing audience |
| **#3 — Client Referral** | Current retainer clients | Direct email ask | 1-2 warm referrals |

---

## 2. Email & Subscriber Management (Deduplication)

Campaigns #1 and #2 both feed into the same email sequence. The system below ensures no prospect ever receives the same sequence twice.

### 2.1. The Unified Nurture Sequence

A single 4-email sequence fires for anyone who takes the quiz, regardless of whether they came from a cold email, an Instagram post, or a ManyChat DM.

- **Sequence Name in Kit:** Unified Quiz Nurture (v2)
- **Trigger:** Subscriber is tagged `quiz-taker`

### 2.2. Deduplication Logic

1. **Create a tag:** `[System] In Sequence`
2. **Automation entry condition:** Tag added = `quiz-taker` **AND** subscriber does NOT have tag `[System] In Sequence`
3. **First action in automation:** Add tag `[System] In Sequence` (blocks re-entry)
4. **Last action in automation:** Remove tag `[System] In Sequence` (resets for future campaigns)

This is the simplest, most reliable deduplication approach in Kit. A subscriber can only be in one sequence at a time, and the system self-resets after completion.

### 2.3. Source Tracking Tags

Apply these tags at the point of quiz submission to track which campaign is driving conversions:

- Cold outreach → `source-cold-outreach`
- Instagram content/ManyChat → `source-ig-content`
- Referral (if the referred prospect takes the quiz) → `source-referral`

### 2.4. Revised Email 4 (Updated Offers)

The existing "Authority Engine" sequence (Emails 1–3) is strong — keep it as-is. Only Email 4 needs updating to reflect current pricing and offers.

**Email 4 — Revised closing section:**

> If you're ready to stop guessing and want an expert to build that engine for you, I have two ways I can help:
>
> - **The $87 Audience-to-Action Playbook:** 50+ conversion-focused CTAs and the DM-to-booking system, ready to use today. [Get the Playbook →](https://tools.scrollmedia.co/audience-to-action.html)
> - **The $997 Instagram Growth Blueprint:** A 3-week deep-dive where we build your entire Instagram strategy from the ground up. [Book a free Blueprint call →](https://calendly.com/scrollmedia/scrollmedia-blueprint-discovery)
>
> Either way, I'm glad you took the quiz.
>
> Cheers,
> Chase

---

## 3. Campaign #1: Cold Outreach

**Objective:** Get high-ICP cold prospects to take the quiz and enter the nurture sequence.

**Audience:** `CG-ScrollPropsectingList.xlsx`

**Email Copy:** Locked. See `FINAL-CAMPAIGN-PLAN-AND-EMAIL-COPY-V2.md`, Section 1.

**Flow:**
1. Send cold email → single CTA to quiz
2. Prospect takes quiz → submits email
3. Kit fires: adds `quiz-taker` + `source-cold-outreach` → Unified Quiz Nurture begins

**Instagram Bio Update (supports both Campaign #1 and #2):**

Update the link in bio to a simple 2-link page (Linktree or a custom `/link-in-bio.html` on Netlify):
- **Take the Free Instagram Quiz** → `https://tools.scrollmedia.co/instagram_maturity_quiz.html`
- **About Scroll Media** → `https://decks.scrollmedia.co/pitch/`

---

## 4. Campaign #2: Instagram Content + ManyChat DM Automation

**Objective:** Convert existing followers and organic traffic into quiz leads using content and automated DMs.

### 4.1. Weekly Content Rhythm

Every piece of content in this campaign has one job: get people to take the quiz.

- **1x Value Reel or Carousel:** Diagnoses a pain point the quiz addresses (e.g., "3 reasons your content isn't converting," "Fix your bio in 60 seconds"). CTA: `"Comment 'QUIZ' and I'll send you the link."`
- **2-3x Story Sequences:** Polls, question stickers, and engagement prompts tied to quiz themes. CTA: `"Reply 'QUIZ' to get the link."`
- **1x Founder POV Post:** Chase's perspective on the journey from stuck to scaling. CTA: `"Link in bio if you want to know where you stand."`

### 4.2. ManyChat Automation Setup

**Automation #1 — Post/Reel Comment Trigger**

- Trigger: User comments keyword `QUIZ` on a designated post or Reel
- Public reply: `"Just sent it to your DMs! 👇"`
- Private DM:
  > Hey {{firstName}}! Here's the free Instagram Maturity Quiz — takes about 3 minutes and tells you the #1 thing to focus on right now:
  >
  > https://tools.scrollmedia.co/instagram_maturity_quiz.html
  >
  > Lmk what you get!

**Automation #2 — Story Reply Trigger**

- Trigger: User replies to any active campaign story with keyword `QUIZ`
- Private DM: Same as above

**Note on ManyChat setup:** ManyChat connects to your Instagram business account via Meta. You'll need a free ManyChat account at manychat.com. The keyword trigger automations are available on the free plan. Setup takes about 20 minutes.

### 4.3. Lead Capture Flow

1. User gets quiz link via ManyChat DM
2. Takes quiz → submits email
3. Kit fires: adds `quiz-taker` + `source-ig-content` → Unified Quiz Nurture begins

---

## 5. Campaign #3: Client Referral Program

**Objective:** Activate current retainer clients as a referral channel. One email, one ask, one clear incentive.

**Audience:** All current Scroll Media retainer clients.

**Incentive:** A one-time discount on their next invoice if a referred contact converts to a paying retainer client. Suggested discount: **$250 off their next month's invoice.**

**This campaign does NOT feed into the quiz funnel.** Referred contacts are warm and should be handled directly by Chase (a personal intro call or email), not dropped into a cold nurture sequence.

### 5.1. Referral Email Copy

**Subject:** a quick favor (and something in it for you)

---

Hey {{firstName}},

Quick one.

We're in growth mode at Scroll Media and I'm looking to bring on a couple of new clients over the next few weeks.

If you know a business owner who's been frustrated with their Instagram — posting without results, not sure what's working, or just not making it a priority — I'd love an intro.

If they end up signing on as a client, I'll take **$250 off your next invoice**. No strings, no weird referral program to sign up for. Just a thank you.

The kind of businesses we work best with:

- Service-based (med spas, home builders, coaches, real estate, fitness studios, etc.)
- Owner-operated or founder-led
- Ready to invest in their marketing, not just dabble

If someone comes to mind, just reply to this email with their name and I'll take it from there. Or feel free to forward this email directly to them — I'll make sure to mention you sent them.

Either way, I appreciate you. Thanks for being a great client.

Cheers,
Chase

Founder, Scroll Media

---

### 5.2. Referral Tracking

Keep it simple — no software needed at this stage.

- When a client replies with a referral name, log it in a simple spreadsheet: `Referrer | Referred Contact | Date | Status | Invoice Credit Applied`
- When the referred contact converts, manually apply the $250 credit on their next Stripe invoice
- Send the referring client a quick "thank you" email confirming the credit has been applied

### 5.3. What Happens to the Referred Contact

The referred contact should **not** be added to the quiz drip sequence. They came in warm, through a trusted relationship. The right move is a personal touch:

1. Chase sends a brief personal email or DM intro (mention the client who referred them)
2. Direct them to the Signature Package page or the Blueprint page depending on their stage
3. Book a discovery call directly

If they want to take the quiz first, that's fine — but don't automate them into a cold sequence. Treat them like a warm lead.

---

## 6. Full Launch Checklist for March 13

### System Setup (Do First)

- [ ] Kit: Create tag `[System] In Sequence`
- [ ] Kit: Update the "Authority Engine" sequence automation to include the deduplication tag logic
- [ ] Kit: Update Email 4 with revised offer copy (correct pricing + Calendly links)
- [ ] Calendly: Create Blueprint Discovery Call (30 min)
- [ ] Calendly: Create Signature Discovery Call (30 min)
- [ ] HTML: Update `instagram-growth-blueprint.html` with Blueprint Calendly link
- [ ] HTML: Update `signature-package.html` with Signature Calendly link
- [ ] Instagram: Update link in bio (quiz URL + pitch page)

### Campaign #1 — Cold Outreach

- [ ] Finalize prospect list (`CG-ScrollPropsectingList.xlsx`)
- [ ] Send cold email to full list

### Campaign #2 — IG Content + ManyChat

- [ ] ManyChat: Create account at manychat.com, connect Instagram business account
- [ ] ManyChat: Set up Automation #1 (Post/Reel comment trigger, keyword: QUIZ)
- [ ] ManyChat: Set up Automation #2 (Story reply trigger, keyword: QUIZ)
- [ ] Instagram: Publish first campaign Reel or Carousel with "Comment QUIZ" CTA

### Campaign #3 — Client Referral

- [ ] Build client email list (all current retainer clients)
- [ ] Send referral email
- [ ] Create referral tracking spreadsheet

---

## 7. Success Metrics (30-Day View)

| Campaign | Key Metric | Target |
|---|---|---|
| #1 Cold Outreach | Quiz click rate from cold email | >10% |
| #1 Cold Outreach | Quiz email submission rate | >40% of clickers |
| #2 IG Content | ManyChat DM triggers per week | 10+ |
| #2 IG Content | Quiz completions from IG | 20+ in 30 days |
| Unified Funnel | A2A Playbook purchases | 5+ in 30 days |
| Unified Funnel | Blueprint discovery calls booked | 2-3 in 30 days |
| Unified Funnel | Signature discovery calls booked | 1-2 in 30 days |
| #3 Referral | Referral replies from clients | 2+ |
| #3 Referral | Referral conversions | 1 in 60 days |
