// stripe-webhook.js
// Receives Stripe checkout.session.completed webhook
// Generates a unique access token, stores it, and emails the buyer

const crypto = require('crypto');

// ─── Environment Variables Required ──────────────────────────────────────────
// STRIPE_WEBHOOK_SECRET  — from Stripe Dashboard > Webhooks > signing secret
// SENDGRID_API_KEY       — from SendGrid
// SENDGRID_FROM_EMAIL    — verified sender email (e.g. hello@scrollmedia.co)
// TOKEN_STORE_SECRET     — any random 32-char string for HMAC token signing
// SITE_URL               — https://tools.scrollmedia.co
// ─────────────────────────────────────────────────────────────────────────────

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@scrollmedia.co';
const TOKEN_STORE_SECRET = process.env.TOKEN_STORE_SECRET;
const SITE_URL = process.env.SITE_URL || 'https://tools.scrollmedia.co';

// ─── Token Storage ────────────────────────────────────────────────────────────
// Tokens are stored in Netlify Blobs (built-in KV store, no extra service needed)
// Each token entry: { email, created_at, used_count, order_id }
// ─────────────────────────────────────────────────────────────────────────────

async function storeToken(token, data) {
  const { getStore } = await import('@netlify/blobs');
  const store = getStore('access-tokens');
  await store.setJSON(token, {
    ...data,
    created_at: new Date().toISOString(),
    used_count: 0,
  });
}

// ─── Stripe Signature Verification ───────────────────────────────────────────
function verifyStripeSignature(payload, signature, secret) {
  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).split('=')[1];
  const v1 = parts.find(p => p.startsWith('v1=')).split('=')[1];

  // Reject if timestamp is older than 5 minutes
  const tolerance = 300;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > tolerance) {
    throw new Error('Webhook timestamp too old');
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  if (expectedSig !== v1) {
    throw new Error('Invalid Stripe signature');
  }
}

// ─── Generate Secure Token ────────────────────────────────────────────────────
function generateToken(email, orderId) {
  // UUID v4 + HMAC for tamper-evidence
  const uuid = crypto.randomUUID();
  const hmac = crypto
    .createHmac('sha256', TOKEN_STORE_SECRET)
    .update(`${uuid}:${email}:${orderId}`)
    .digest('hex')
    .slice(0, 8);
  return `${uuid}-${hmac}`;
}

// ─── Send Access Email via SendGrid ──────────────────────────────────────────
async function sendAccessEmail(email, customerName, token) {
  const accessUrl = `${SITE_URL}/access/audience-to-action-playbook.html?token=${token}`;

  const emailBody = {
    personalizations: [
      {
        to: [{ email, name: customerName || 'there' }],
        subject: 'Your Audience-to-Action Playbook — Access Inside',
      },
    ],
    from: {
      email: SENDGRID_FROM_EMAIL,
      name: 'Chase @ Scroll Media',
    },
    content: [
      {
        type: 'text/html',
        value: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr>
      <td>
        <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#0c3387;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#c8f135;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Scroll Media</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:800;">You're in.</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#1a1a2e;font-size:16px;line-height:1.6;">Hey ${customerName ? customerName.split(' ')[0] : 'there'},</p>
              <p style="margin:0 0 16px;color:#1a1a2e;font-size:16px;line-height:1.6;">Your copy of the <strong>Audience-to-Action Playbook</strong> is ready. This is your personal access link — bookmark it, don't share it.</p>
              <p style="margin:0 0 32px;color:#1a1a2e;font-size:16px;line-height:1.6;">Inside you'll find the Format-Funnel Framework, 50+ CTA scripts, the 3-Message DM Script, and the 30-Day Execution Challenge.</p>
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${accessUrl}" style="display:inline-block;background:#c8f135;color:#0c3387;font-size:16px;font-weight:800;padding:16px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Access Your Playbook →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0;color:#666;font-size:13px;line-height:1.6;">Or copy this link into your browser:<br><span style="color:#0c3387;word-break:break-all;">${accessUrl}</span></p>
              <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
              <p style="margin:0;color:#999;font-size:12px;line-height:1.6;">This link is unique to your purchase. It cannot be transferred. If you have any issues accessing your playbook, reply to this email and we'll sort it out immediately.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} Scroll Media. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      },
    ],
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid error ${response.status}: ${errorText}`);
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const signature = event.headers['stripe-signature'];
  if (!signature) {
    return { statusCode: 400, body: 'Missing Stripe signature' };
  }

  // Verify webhook authenticity
  try {
    verifyStripeSignature(event.body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Signature verification failed:', err.message);
    return { statusCode: 401, body: `Unauthorized: ${err.message}` };
  }

  let stripeEvent;
  try {
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Only process completed checkout sessions
  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'Event ignored' };
  }

  const session = stripeEvent.data.object;
  const email = session.customer_details?.email;
  const customerName = session.customer_details?.name || '';
  const orderId = session.id;

  if (!email) {
    console.error('No email found in session:', orderId);
    return { statusCode: 200, body: 'No email — skipped' };
  }

  // Generate unique access token
  const token = generateToken(email, orderId);

  // Store token
  try {
    await storeToken(token, {
      email,
      customer_name: customerName,
      order_id: orderId,
      product: 'audience-to-action-playbook',
    });
  } catch (err) {
    console.error('Token storage failed:', err.message);
    return { statusCode: 500, body: 'Token storage failed' };
  }

  // Send access email
  try {
    await sendAccessEmail(email, customerName, token);
    console.log(`Access email sent to ${email} with token ${token.slice(0, 8)}...`);
  } catch (err) {
    console.error('Email send failed:', err.message);
    // Don't fail the webhook — token is stored, we can resend manually
    // Log for manual follow-up
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, token_issued: true }),
  };
};
