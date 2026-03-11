# Scroll Media — Biz Dev Campaign Launch Strategy
**Goal:** 1–2 new clients signed within 30 days  
**Target Launch Date:** End of week of March 11, 2026  
**Primary Funnel:** Audience-to-Action Playbook ($87) → Instagram Growth Blueprint ($997) → Signature Package ($3K+/mo)  
**Last Updated:** March 11, 2026

---

## Campaign Status Dashboard

| Item | Status | Notes |
|---|---|---|
| Playbook Sales Page (`audience-to-action.html`) | **LIVE — FINAL** | Two-card decision CTA, wordmark logo |
| Playbook Product Page (`audience-to-action-playbook.html`) | **LIVE — FINAL** | SM avatar, token-gated |
| Purchase Success Page (`purchase-success.html`) | **LIVE — FINAL** | Logo fixed, favicon added |
| Blueprint Sales Page (`instagram-growth-blueprint.html`) | **LIVE — PENDING** | CTA structure not yet finalized (see below) |
| Signature Package Sales Page (`signature-package.html`) | **LIVE — REVIEW** | Full rebuild complete, deployed |
| Stripe Payment Link (Playbook) | **CONFIGURED** | Test with `4242 4242 4242 4242` |
| Stripe Webhook (Netlify Function) | **CONFIGURED** | `stripe-webhook.js` deployed |
| Resend Access Email | **CONFIGURED** | Token delivery on purchase |
| Kit Email Sequence (3 emails) | **DRAFTED** | See `KIT-EMAIL-SEQUENCE.md` — needs activation |
| Prospect List | **PENDING** | Score and prioritize before launch |
| Instagram Launch Content | **PENDING** | 4 posts + daily Stories needed |
| Bio Link Update | **PENDING** | Point to `tools.scrollmedia.co/audience-to-action` |

---

## Open Item: Blueprint CTA Structure

**Decision needed before Blueprint page is locked as FINAL.**

**Recommended approach:** Calendly intake link (15–20 min) as primary CTA.  
**Agreed flow:**
1. Prospect clicks CTA → Calendly intake (15–20 min slot)
2. Intake form captures: business type, Instagram handle, primary goal, biggest challenge
3. Contract auto-sends on intake submission (HoneyBook / Dubsado / DocuSign)
4. Signature triggers master onboarding form
5. Onboarding form submission → Kickoff call scheduled
6. Work begins; invoice sent on delivery ($997)

**Action required:** Drop your Calendly link → CTA gets wired in → Blueprint page locked.

---

## The Funnel Logic

```
$87 Playbook → $997 Blueprint → Signature Package ($3K+/mo)
```

The Playbook is the trust mechanism — it filters for people serious enough to pay for strategy at $87, making them dramatically higher-quality leads for the Blueprint and retainer. The real goal of the $87 product isn't revenue. **It's lead qualification.**

---

## Pre-Launch Checklist (Complete Before Going Live)

### Technical
- [ ] Run end-to-end test purchase with Stripe test card `4242 4242 4242 4242`
- [ ] Confirm access email arrives with working token link
- [ ] Confirm Kit tags buyer as `playbook-buyer`
- [ ] Confirm Kit email sequence activates on tag
- [ ] Wire Blueprint CTA to Calendly link (pending Chase's link)
- [ ] Update Blueprint page status to FINAL

### Content
- [ ] Write and schedule Instagram launch announcement post
- [ ] Write and schedule 3 follow-up posts (see content plan below)
- [ ] Prepare 14 days of Story content
- [ ] Update Instagram bio link to `tools.scrollmedia.co/audience-to-action`

### Outreach
- [ ] Build and score prospect list (use prioritization framework below)
- [ ] Draft 15–20 personalized outreach messages
- [ ] Identify 2–3 former clients for direct Blueprint pitch

---

## Phase 1: Direct Outreach (Days 1–7)
**Goal:** 1 signed client from warm network

### Who to Contact First

Prioritize in this order:
1. **Former clients** not currently on retainer — they trust you, know your work, have a reason to come back
2. **Warm prospects** who've engaged with content, been referred, or had a previous conversation that didn't close
3. **Local Cincinnati businesses** in core niches (med spas, fitness studios, real estate, coaches, interior designers) active on Instagram but clearly not strategic

### Outreach Messages

**Version A — Warm prospects who know you:**

> Hey [Name] — I just launched something I think would be genuinely useful for you. It's an $87 playbook that covers the exact CTA system and DM-to-booking script we use with every client. I built it because I kept seeing the same conversion problems across accounts. If you want the link, happy to send it over — or if you're at the point where you'd rather just have us build the whole system for you, I have 2 Blueprint spots open this month.

**Version B — Former clients:**

> Hey [Name] — hope things are going well. I've been building out some new strategy resources and wanted to reach out directly before I push them publicly. I have an $87 playbook that covers the CTA framework and DM system we used when we worked together — and I'm also taking on 2 Blueprint engagements this month where we build the full 90-day strategy. Wanted to give you first access before I open it up. Interested?

**Version C — Cold-ish local business (Instagram DM):**

> Hey [Name] — I've been following [Business] for a while. Your content is solid but I noticed your CTAs aren't doing the conversion work they could be. I run a social media strategy agency in Cincinnati and just launched an $87 playbook specifically for service businesses like yours — it covers the exact CTA system and DM script that books consultations from Instagram. Happy to send you the link if you want to check it out.

### Volume Target

Send **15–20 personalized outreach messages** in the first 3 days. Not blasted — actually personalized. Reference something specific about their business or your prior relationship.

---

## Phase 2: Content-Driven Awareness (Days 1–14)
**Goal:** Drive organic traffic to the sales page and build authority

### Instagram Content Plan (2 posts/week for 2 weeks)

**Post 1 — Launch Announcement (Day 1)**  
Hook: "I just packaged the exact CTA system we use with every client into an $87 playbook."  
Format: Carousel or talking-head Reel  
CTA: "Link in bio to get instant access"

**Post 2 — Problem/Pain Post (Day 3)**  
Hook: "Your Instagram isn't a reach problem. It's a conversion problem."  
Format: Carousel — walk through the 3 signs your CTAs aren't working  
CTA: "Save this. And if you want the fix, the playbook is linked in bio."

**Post 3 — Social Proof / Results (Day 7)**  
Hook: "What happens when you stop posting for engagement and start posting for conversion"  
Format: Before/after or client result story  
CTA: "DM me 'SYSTEM' and I'll send you the playbook link directly"

**Post 4 — Education Post (Day 10)**  
Hook: "The 3-message DM script that books consultations from Instagram comments"  
Format: Carousel — tease Part 3 of the playbook (the DM-to-Booking System)  
CTA: "The full script + 50+ CTAs are inside the playbook — link in bio"

### Story Strategy (Daily)

- Day 1: "Just launched something — link in bio"
- Day 2–3: Poll — "Do you have a system for converting Instagram followers into clients?" Yes/No
- Day 4: Share the No responses — "If you voted no, this is for you"
- Day 5–7: Behind-the-scenes of the playbook content (screenshot of Part 2 or Part 3)
- Day 8–10: Testimonials or client results
- Day 11–14: "2 Blueprint spots open this month" — direct pitch

---

## Phase 3: Blueprint Conversion (Days 7–30)
**Goal:** Convert 1–2 Playbook buyers or warm leads into Blueprint clients

### The Conversion Path

**Playbook buyers** → receive the 3-email Kit sequence (Days 2, 5, 10) → Email 3 pitches the Blueprint  
**Warm leads who didn't buy the Playbook** → direct Blueprint pitch via DM or email

### Blueprint Pitch (Direct Outreach — Day 7+)

> Hey [Name] — I'm taking on 2 Blueprint clients this month. It's a 3-week engagement where I build your complete Instagram strategy — content pillars, CTA architecture, offer positioning, and a 90-day execution roadmap. $997, and if you decide to continue with us as a retainer client, the full amount is credited to Month 1. I have 2 spots. Want to talk about whether it's the right fit?

---

## Phase 4: Prospect List Activation (Days 3–14)
**Goal:** Systematically work through the prospect list

### Prioritization Framework

Score each prospect on 3 criteria (1–3 scale):
- **Budget signal** — Do they have an active business with revenue? (1 = unclear, 3 = obvious)
- **Pain signal** — Are they posting inconsistently or without a clear strategy? (1 = unclear, 3 = obvious)
- **Relationship** — How warm is the connection? (1 = cold, 3 = prior relationship)

**Total score 7–9:** Reach out with Blueprint pitch directly  
**Total score 4–6:** Reach out with Playbook offer, nurture toward Blueprint  
**Total score 1–3:** Follow on Instagram, engage with content for 1–2 weeks before outreach

### Daily Outreach Cadence

- **Days 1–3:** 5–7 outreach messages/day (warm network first)
- **Days 4–7:** 3–5 messages/day (second tier prospects)
- **Days 8–14:** Follow-up messages to anyone who didn't respond
- **Days 15–30:** Ongoing follow-up + new prospects from inbound

---

## Tracking & Metrics

Track these weekly:

| Metric | Week 1 Target | Week 2 Target | Week 3–4 Target |
|---|---|---|---|
| Outreach messages sent | 20 | 15 | 10 |
| Responses received | 5+ | 4+ | 3+ |
| Playbook sales | 3–5 | 3–5 | 2–3 |
| Blueprint inquiries | 1–2 | 1–2 | 1–2 |
| Blueprint closes | 0–1 | 1 | 0–1 |

**Revenue target:** 2 Blueprint closes = $1,994 + Playbook sales = ~$2,500–$3,000 total

---

## The Non-Negotiables

1. **Personalize every outreach message.** Reference something specific. Generic DMs get ignored.
2. **Follow up once.** If someone doesn't respond to your first message, send one follow-up 3–5 days later. Then move on.
3. **Don't pitch the retainer first.** The funnel exists for a reason. Playbook → Blueprint → Signature Package. Let the product do the qualification work.
4. **Reply to every Story response and comment within 2 hours.** This is where the real conversations happen.
5. **Build the Kit sequence before you launch.** The post-purchase nurture is where Blueprint conversions will come from. Don't skip it.

---

## Launch Day Checklist

- [ ] Post launch announcement on Instagram (feed + Stories)
- [ ] Send first wave of outreach messages (10–15)
- [ ] Confirm bio link is live: `tools.scrollmedia.co/audience-to-action`
- [ ] Monitor Stripe for purchases
- [ ] Monitor Resend for email delivery
- [ ] Respond to all DMs and comments within 2 hours

---

## Onboarding Flow (Post-Blueprint Conversion)

Once a Blueprint client is signed, the process is:

1. **Intake form submitted** (Calendly booking captures initial info)
2. **Contract auto-sends** (HoneyBook / Dubsado / DocuSign) — fixed scope, no negotiation needed
3. **Signature triggers master onboarding form** — one form serves both Blueprint and Signature Package clients
4. **Onboarding form submitted** → Kickoff call scheduled
5. **Work begins** — 90-day strategy document delivered in 3 weeks
6. **Invoice sent on delivery** — $997 due within 7 days of receiving strategy document

**Master Onboarding Form Structure:**
- Section 1: Business Fundamentals (both offers)
- Section 2: Audience & Positioning (both offers)
- Section 3: Current State (both offers)
- Section 4: Goals & KPIs (both offers)
- Section 5: Brand Voice & Content (both offers)
- Section 6: Execution Preferences (Signature Package only — conditional logic)

Recommended tool: **Typeform** (conditional logic native) or HoneyBook/Dubsado built-in questionnaire.

---

*This strategy is designed to generate 1–2 Blueprint clients within 30 days. The Playbook is the trust mechanism. The outreach is the accelerant. The Kit sequence is the conversion engine. The Signature Package is the destination.*
