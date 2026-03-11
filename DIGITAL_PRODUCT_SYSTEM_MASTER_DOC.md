# Digital Product System — Master Documentation

**Last Updated:** March 11, 2026

This document serves as the master reference for the entire token-gated digital product system. It is designed to be both a comprehensive SOP for human contributors and a detailed instruction set for AI agents.

---

## 1. System Architecture Overview

The system is designed to automate the sale, delivery, and access control for digital products. It uses a combination of Stripe for payments, Netlify for hosting and serverless functions, Resend for transactional email, and ConvertKit for marketing automation.

### 1.1. Core Components

| Component | Service/Tech | Purpose |
|---|---|---|
| **Sales Page** | Netlify (HTML) | Public-facing page to sell the product. |
| **Payment Link** | Stripe | Handles the checkout process. |
| **Purchase Success Page** | Netlify (HTML) | Confirmation page shown to the user after successful payment. |
| **Stripe Webhook** | Netlify Function | Listens for `checkout.session.completed` event from Stripe. |
| **Token Generation** | Netlify Function | Generates a unique UUID token for each purchase. |
| **Token Storage** | Netlify Blobs | Stores the generated tokens to validate access. |
| **Access Email** | Resend | Sends the unique access link (with token) to the buyer. |
| **Marketing Tagging** | ConvertKit API | Tags the buyer in ConvertKit for follow-up sequences. |
| **Product Page** | Netlify (HTML) | The actual digital product content. |
| **Token Gate** | JavaScript | A script on the product page that validates the token. |

### 1.2. User Purchase Flow

1.  **Purchase:** User clicks the buy button on the sales page and completes checkout via the Stripe Payment Link.
2.  **Redirect:** Stripe redirects the user to the `purchase-success.html` page.
3.  **Webhook Trigger:** Simultaneously, Stripe sends a `checkout.session.completed` webhook event to the Netlify serverless function.
4.  **Token Generation & Delivery:**
    *   The Netlify function validates the webhook signature.
    *   It generates a unique UUID as an access token.
    *   It stores the token in a Netlify Blob store.
    *   It calls the Resend API to email the buyer their unique access link: `.../product-page.html?token=UNIQUE_TOKEN`.
    *   It calls the ConvertKit API to tag the buyer (e.g., `playbook-buyer`).
5.  **Access:** The buyer clicks the link in their email. The JavaScript token gate on the product page validates the `token` URL parameter against the Netlify Blob store. If valid, the content is displayed. If invalid, a purchase blocker overlay is shown.

---

## 2. File & Asset Inventory

All files are located in the `cgianattasio15/scroll-media-tools` GitHub repository, deployed on Netlify.

| File/Asset | Path |
|---|---|
| **Sales Page** | `audience-to-action.html` |
| **Product Page** | `access/audience-to-action-playbook.html` |
| **Purchase Success Page** | `purchase-success.html` |
| **Dashboard** | `index.html` |
| **Stripe Webhook Function** | `netlify/functions/stripe-webhook.js` |
| **Token Validation Function** | `netlify/functions/validate-token.js` |
| **Netlify Config** | `netlify.toml` |
| **Package Dependencies** | `package.json` |
| **Kit Email Sequence Copy** | `KIT-EMAIL-SEQUENCE.md` |
| **This Document** | `DIGITAL_PRODUCT_SYSTEM_MASTER_DOC.md` |

---

## 3. Environment Variables

These variables must be configured in the Netlify project settings (`Project configuration > Build & Deploy > Environment`).

| Variable | Description | Example Value |
|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | The signing secret for the Stripe webhook endpoint. | `whsec_...` |
| `RESEND_API_KEY` | API key for the Resend account used to send access emails. | `re_...` |
| `SENDGRID_FROM_EMAIL` | The verified "from" email address for access emails. | `hello@scrollmedia.co` |
| `KIT_API_KEY` | The **API Secret** (not the public key) for the ConvertKit account. | `tgnI3...` |
| `TOKEN_STORE_SECRET` | A 32-character random string used to secure the token store. | `a1b2c3...` |
| `SITE_URL` | The primary URL of the site. | `https://tools.scrollmedia.co` |
| `SECRETS_SCAN_OMIT_KEYS` | Comma-separated list of keys to omit from Netlify's secret scanning. | `SITE_URL,KIT_API_KEY` |

---

## 4. Internal Testing & Preview

To bypass the token gate for internal review, use the following URL parameter:

`?preview=sm-internal-2026`

**Example Bookmark URL:**
`https://tools.scrollmedia.co/access/audience-to-action-playbook.html?preview=sm-internal-2026`

This parameter is checked in the `validateToken` function on the product page and will immediately show the content, skipping the purchase blocker overlay.

---

## 5. Process for Creating a New Digital Product

1.  **Create Sales & Product Pages:** Duplicate `audience-to-action.html` and `access/audience-to-action-playbook.html` as templates.
2.  **Create New Stripe Product & Price:** In the Stripe Dashboard, create a new product and a one-time price for it.
3.  **Create New Stripe Payment Link:** Create a new payment link associated with the new product/price. Configure the success URL to point to a new success page (e.g., `new-product-success.html`).
4.  **Update Webhook:** The current webhook handles all products. You may need to add logic to differentiate products if the post-purchase actions (e.g., ConvertKit tags) differ.
5.  **Update Dashboard:** Add a new accordion dropdown to `index.html` for the new product, linking to all its associated pages (sales, gate, internal preview, success).
6.  **Create Marketing Automation:** In ConvertKit, create a new tag and a new follow-up sequence for buyers of the new product.

