# Audience-to-Action Playbook — Security Setup Guide

This document walks you through the one-time setup required to activate the token-based access system.

---

## Overview

**How it works:**
1. Buyer pays on Stripe → Stripe fires a webhook to your Netlify function
2. Netlify function generates a unique UUID token, stores it, and emails the buyer their access URL
3. Product page checks the token on load — valid token shows content, no/invalid token shows purchase gate

**Files involved:**
- `netlify/functions/stripe-webhook.js` — receives Stripe webhook, generates token, sends email
- `netlify/functions/validate-token.js` — validates tokens on page load
- `netlify.toml` — Netlify routing and headers config
- `access/audience-to-action-playbook.html` — product page with token gate
- `purchase-success.html` — post-purchase confirmation page

---

## Step 1: Deploy to Netlify

### 1a. Create a Netlify account
Go to [netlify.com](https://netlify.com) and sign up (free tier is sufficient).

### 1b. Connect your GitHub repo
1. In Netlify dashboard → **Add new site** → **Import an existing project**
2. Connect to GitHub → select `cgianattasio15/scroll-media-tools`
3. Build settings:
   - **Base directory:** (leave blank)
   - **Build command:** (leave blank)
   - **Publish directory:** `.`
4. Click **Deploy site**

### 1c. Add your custom domain
1. In Netlify → **Domain management** → **Add a domain** → enter `tools.scrollmedia.co`
2. Netlify will give you a CNAME target (e.g., `your-site.netlify.app`)
3. Go to your DNS provider (wherever `scrollmedia.co` is managed) and update the CNAME record:
   - **Name:** `tools`
   - **Value:** `your-site.netlify.app` (use the value Netlify gives you)
   - **TTL:** 300
4. Back in Netlify, click **Verify DNS** — this can take up to 24 hours but usually under 30 minutes
5. Enable **Force HTTPS** once DNS is verified

> **Note:** Remove the `CNAME` file from the repo root (it was for GitHub Pages). Netlify handles the domain differently.

---

## Step 2: Set Environment Variables in Netlify

Go to **Site settings → Environment variables** and add these:

| Variable | Value | Where to get it |
|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe Dashboard → Webhooks → your webhook → Signing secret |
| `SENDGRID_API_KEY` | `SG.xxx...` | SendGrid → Settings → API Keys → Create API Key (Mail Send permission) |
| `SENDGRID_FROM_EMAIL` | `hello@scrollmedia.co` | Must be a verified sender in SendGrid |
| `TOKEN_STORE_SECRET` | Any 32+ char random string | Generate at: [randomkeygen.com](https://randomkeygen.com) |
| `SITE_URL` | `https://tools.scrollmedia.co` | Your domain |

---

## Step 3: Set Up SendGrid

1. Create a free account at [sendgrid.com](https://sendgrid.com) (free tier = 100 emails/day)
2. Go to **Settings → Sender Authentication** → verify `hello@scrollmedia.co` as a sender
3. Go to **Settings → API Keys** → create a key with **Mail Send** permission only
4. Add the key as `SENDGRID_API_KEY` in Netlify (Step 2)

---

## Step 4: Create the Stripe Webhook

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. **Endpoint URL:** `https://tools.scrollmedia.co/api/stripe-webhook`
4. **Events to listen to:** `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it as `STRIPE_WEBHOOK_SECRET` in Netlify (Step 2)

---

## Step 5: Update Stripe Payment Link Success URL

1. Go to [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links)
2. Find your Audience-to-Action Playbook payment link
3. Edit it → **After payment** → set **Confirmation page** to:
   - **Redirect to your website**
   - URL: `https://tools.scrollmedia.co/purchase-success.html`
4. Save

---

## Step 6: Enable Netlify Blobs (Token Storage)

Netlify Blobs is automatically available on all Netlify plans. No setup needed — it activates when the function first runs.

To verify it's working after your first test purchase, go to:
**Netlify Dashboard → Your site → Blobs** (may be under the Functions tab)

---

## Step 7: Test the Full Flow

1. Make a test purchase using a [Stripe test card](https://stripe.com/docs/testing#cards): `4242 4242 4242 4242`
2. Confirm you're redirected to `purchase-success.html`
3. Check the email address you used — access email should arrive within 60 seconds
4. Click the link in the email — product page should load with full content
5. Try visiting `https://tools.scrollmedia.co/access/audience-to-action-playbook.html` without a token — purchase gate should appear

---

## Troubleshooting

**Email not arriving:**
- Check Netlify function logs: Dashboard → Functions → stripe-webhook → Recent invocations
- Verify SendGrid sender is authenticated
- Check spam folder

**Token gate showing for valid purchasers:**
- Confirm `STRIPE_WEBHOOK_SECRET` matches the webhook signing secret in Stripe
- Check function logs for errors

**DNS not resolving:**
- DNS propagation can take up to 24 hours
- Use [dnschecker.org](https://dnschecker.org) to monitor propagation

---

## Manual Token Generation (Fallback)

If you need to manually grant access (e.g., for a refund/reissue), you can generate a token by calling the webhook function directly or by creating a simple admin script. Contact the developer for a manual token generation script.

---

*Last updated: March 2026*
