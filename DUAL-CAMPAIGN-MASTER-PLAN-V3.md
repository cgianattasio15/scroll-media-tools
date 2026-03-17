# Scroll Media Biz Dev — 3-Campaign Master Plan (v4)

**Last Updated:** March 13, 2026
**Status:** Infrastructure Complete — Pending Operational Launch
**Author:** Manus AI (Chief Strategist)

---

## 1. Executive Summary

This document is the single source of truth for the March 2026 business development initiative. It runs three parallel campaigns designed to generate new retainer clients from three distinct audiences: cold prospects, existing Instagram followers, and current clients.

**The Core Funnel (Campaigns #1 and #2):**
`Instagram Maturity Quiz` → `Unified Nurture Sequence` → `$87 A2A Playbook` → `$997 Blueprint` → `$2,750/mo Signature Package`

**Campaign #3 operates on a separate track:** a direct referral ask to current clients, with a one-time invoice discount as the incentive for a successful referral.

| Campaign | Audience | Entry Point | Goal |
|---|---|---|---|
| **#1 — Cold Outreach** | Cold ICP prospects (205-prospect list) | Cold email → Quiz | 1-2 new discovery calls |
| **#2 — IG Content + DM Automation** | Instagram followers + organic traffic | Content/ManyChat → Quiz | Ongoing lead flow from existing audience |
| **#3 — Client Referral** | Current retainer clients | Direct email ask | 1-2 warm referrals |

---

## 2. Current Status (as of March 13, 2026)

### Infrastructure — COMPLETE ✅

| Asset | Status | URL |
|---|---|---|
| Instagram Maturity Quiz | Live | tools.scrollmedia.co/instagram_maturity_quiz.html |
| Profile Optimization Guide (Email 1 gift) | Live | tools.scrollmedia.co/ig-profile-guide.html |
| Formats Library Google Sheet (Email 2 gift) | Live | docs.google.com/spreadsheets/d/1qZD1bTtNk5Lsy_QrUZ6clKQgCAlu-tRh4eA6BSW-oCo |
| A2A Playbook sales page (Email 3 CTA) | Live | tools.scrollmedia.co/audience-to-action |
| A2A Playbook product (token-gated) | Live | tools.scrollmedia.co/access/audience-to-action-playbook.html |
| Blueprint sales page (Email 4 CTA) | Live | tools.scrollmedia.co/instagram-growth-blueprint |
| Signature Package sales page (Email 4 CTA) | Live | tools.scrollmedia.co/signature-package |
| Blueprint Calendly link | Live + embedded | calendly.com/scrollmedia/scrollmedia-blueprint-discovery |
| Signature Calendly link | Live + embedded | calendly.com/scrollmedia/scroll-media-signature-discovery |
| Stripe payment + webhook system | Live | — |
| 4-email nurture sequence copy | Locked + loaded in Kit | See Section 4 |

### Open Items — MUST COMPLETE BEFORE LAUNCH 🔴

| # | Item | Owner | Est. Time |
|---|---|---|---|
| 1 | Kit: Set up deduplication tags (`[System] In Sequence`) | Chase (guided) | 30 min |
| 2 | Referral email: Send to current clients | Chase | 15 min |
| 3 | Warm/Hot prospects: Send personal outreach emails | Chase | 30 min |
| 4 | Cold email: Send quiz CTA to 131 ICP prospects with emails | Chase | 1 hr |
| 5 | ManyChat: Set up 2 automations (comment + story reply triggers) | Chase (guided) | 45 min |
| 6 | Instagram: Update link in bio to quiz URL | Chase | 5 min |

---

## 3. Prospect List Summary

**File:** `ScrollMediaProspectList-CG-12.16.25-CGList.csv`
**Total prospects:** 205

| Segment | Count | Priority |
|---|---|---|
| ICP-aligned service niches | 141 | HIGH — primary outreach targets |
| Non-ICP (product/food/F&B) | 64 | LOW — deprioritize |
| Has direct email | 131 | Ready for cold email campaign |
| IG DM or contact form only | 74 | Secondary — DM outreach |
| Warm or Hot status | 8 | URGENT — personal email today |
| Cold | 196 | Sequence outreach |

**Top ICP niches in list:** Real Estate (27), Fitness Studio (26), Med Spa (19), Interior Design (17), Home Builders (15), Coaching Services (14), Physical Therapist (11)

**Warm/Hot prospects (personal outreach first, NOT the cold sequence):**
- Sloane Boutique (Warm/High) — shop@sloaneboutique.com — AG knows her
- Vinology (Hot/High) — michelle@vinology.club — AG knows her, prev prospect
- Carls Deli (Warm/High) — sydneymturnbull@gmail.com — prev prospect, budget concern
- Amy Brenner MD (Warm/High) — contact form — EK referral
- Hyde Park Wellness (Cold/High) — aarnett1984@gmail.com — prev prospect
- 12th St Pilates (Cold/High) — 12thstreetpilates@gmail.com — prev prospect
- Inner Vision Pilates (Cold/High) — taylorberling@gmail.com — prev prospect

---

## 4. Email & Subscriber Management (Deduplication)

Campaigns #1 and #2 both feed into the same email sequence. The system below ensures no prospect ever receives the same sequence twice.

### 4.1. The Unified Nurture Sequence

A single 4-email sequence fires for anyone who takes the quiz, regardless of whether they came from a cold email, an Instagram post, or a ManyChat DM.

- **Sequence Name in Kit:** Unified Quiz Nurture
- **Trigger:** Subscriber is tagged `quiz-taker`

### 4.2. Deduplication Logic (MUST SET UP IN KIT BEFORE LAUNCH)

1. **Create a tag:** `[System] In Sequence`
2. **Automation entry condition:** Tag added = `quiz-taker` **AND** subscriber does NOT have tag `[System] In Sequence`
3. **First action in automation:** Add tag `[System] In Sequence` (blocks re-entry)
4. **Last action in automation:** Remove tag `[System] In Sequence` (resets for future campaigns)

**Step-by-step Kit setup:**
1. Go to Kit → Subscribers → Tags → Create tag: `[System] In Sequence`
2. Go to Automations → Find the "Unified Quiz Nurture" automation
3. Edit the entry trigger: change from "Tag added: quiz-taker" to "Tag added: quiz-taker AND does NOT have tag: [System] In Sequence"
4. Add first step in automation: "Add tag: [System] In Sequence"
5. Add final step in automation: "Remove tag: [System] In Sequence"

### 4.3. Source Tracking Tags

Apply these tags at the point of quiz submission to track which campaign is driving conversions:
- Cold outreach → `source-cold-outreach`
- Instagram content/ManyChat → `source-ig-content`
- Referral (if the referred prospect takes the quiz) → `source-referral`

---

## 5. Locked Nurture Sequence (v5)

All 4 emails are loaded in Kit. For full copy, see `DUAL-CAMPAIGN-MASTER-PLAN-V3.md` (this file) or the email-copywriter skill's `references/email_examples.md`.

| Email | Subject | Pain Point | Offer | Send |
|---|---|---|---|---|
| 1 | Your profile is losing you clients | #5 — Profile trust | Profile Guide (free) | Immediately |
| 2 | why your best content isn't converting | #3 — Content positioning | Formats Library (free) | Day 3 |
| 3 | the line that turns followers into clients | #1 — No clients from posting | A2A Playbook ($87) | Day 5 |
| 4 | stop guessing what content works | #2 — No measurement system | Blueprint ($997) + Signature ($2,750+) | Day 7 |

**Proprietary frameworks used in sequence:**
- **The Signal Method** (Email 4): Scroll Media's content testing framework. "Find the signal in the noise — identify what's actually working — and build your entire strategy around it." Do NOT use the name "Accordion Method" — that is a third-party term.

---

## 6. Campaign #1: Cold Outreach

**Objective:** Get high-ICP cold prospects to take the quiz and enter the nurture sequence.

**Audience:** `ScrollMediaProspectList-CG-12.16.25-CGList.csv` — 131 prospects with direct emails, ICP-aligned niches only.

**Cold Email Copy (LOCKED):**

**Subject:** Your Instagram, in 3 minutes

Hi {{firstName}},

Most social media advice is generic. It doesn't account for your industry, your audience size, or how much time you actually have.

I built a 10-question, 3-minute quiz that tells you exactly which of the 4 stages of Instagram maturity your business is in — and what the single most important thing you should do next is.

It's free, it's fast, and it's the same framework we use to build strategies for our $2,750/mo clients.

[Take the Instagram Maturity Quiz →](https://tools.scrollmedia.co/instagram_maturity_quiz.html)

Best,
Chase

**Flow:**
1. Send cold email → single CTA to quiz
2. Prospect takes quiz → submits email
3. Kit fires: adds `quiz-taker` + `source-cold-outreach` → Unified Quiz Nurture begins

---

## 7. Campaign #2: Instagram Content + ManyChat DM Automation

**Objective:** Convert existing followers and organic traffic into quiz leads using content and automated DMs.

**Status:** ManyChat account exists. Automations NOT yet set up.

### 7.1. Weekly Content Rhythm

Every piece of content in this campaign has one job: get people to take the quiz.

- **1x Value Reel or Carousel:** Diagnoses a pain point the quiz addresses. CTA: `"Comment 'QUIZ' and I'll send you the link."`
- **2-3x Story Sequences:** Polls, question stickers, engagement prompts tied to quiz themes. CTA: `"Reply 'QUIZ' to get the link."`
- **1x Founder POV Post:** Chase's perspective on the journey from stuck to scaling. CTA: `"Link in bio if you want to know where you stand."`

### 7.2. ManyChat Automation Setup (PENDING)

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

**ManyChat setup steps:**
1. Log into manychat.com → connect Instagram business account (if not already done)
2. Go to Automation → New Flow → name it "QUIZ Comment Trigger"
3. Set trigger: Instagram Comments → keyword = "QUIZ"
4. Add action: Send Public Reply → "Just sent it to your DMs! 👇"
5. Add action: Send Private DM → paste the DM copy above
6. Repeat for Story Reply trigger (Automation #2)
7. Activate both automations

---

## 8. Campaign #3: Client Referral Program

**Objective:** Activate current retainer clients as a referral channel.
**Status:** Email copy locked. Not yet sent.

**Incentive:** $250 off their next invoice for a successful referral conversion.

**Referral Email Copy (LOCKED):**

**Subject:** a quick favor (and something in it for you)

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

**Referral tracking:** Log in a simple spreadsheet: `Referrer | Referred Contact | Date | Status | Invoice Credit Applied`

**Note:** Referred contacts should NOT be dropped into the cold nurture sequence. Treat them as warm leads — personal email or DM intro, direct to Blueprint or Signature page, book a discovery call directly.

---

## 9. Full Launch Checklist

### System Setup (MUST DO FIRST)
- [ ] Kit: Create tag `[System] In Sequence`
- [ ] Kit: Update automation with deduplication tag logic (see Section 4.2)
- [ ] Instagram: Update link in bio to quiz URL

### Campaign #1 — Cold Outreach
- [ ] Send cold email to 131 ICP-aligned prospects with direct emails
- [ ] Send personal outreach to 8 warm/hot prospects (NOT the cold sequence)

### Campaign #2 — IG Content + ManyChat
- [ ] ManyChat: Set up Automation #1 (Post/Reel comment trigger, keyword: QUIZ)
- [ ] ManyChat: Set up Automation #2 (Story reply trigger, keyword: QUIZ)
- [ ] Instagram: Publish first campaign Reel or Carousel with "Comment QUIZ" CTA

### Campaign #3 — Client Referral
- [ ] Build client email list (all current retainer clients)
- [ ] Send referral email
- [ ] Create referral tracking spreadsheet

---

## 10. Success Metrics (30-Day View)

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
