/**
 * Netlify Function: check-subscriber.js
 * Checks if an email already exists in Kit and returns their tags.
 * Used by guide gate forms to determine routing before subscribing.
 *
 * GET /api/check-subscriber?email=user@example.com
 *
 * Response:
 *   { exists: false }
 *   { exists: true, subscriber_id: "123", tags: ["sequence: medspa-biz-dev", "niche: medspa"] }
 */

const KIT_BASE = "https://api.kit.com/v4";

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  const email = event.queryStringParameters && event.queryStringParameters.email;
  if (!email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "email parameter required" }) };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email address" }) };
  }

  const KIT_API_KEY = process.env.KIT_API_KEY;
  if (!KIT_API_KEY) {
    // Fail open — if we can't check, treat as new subscriber
    return { statusCode: 200, headers, body: JSON.stringify({ exists: false, reason: "config-error" }) };
  }

  try {
    // Look up subscriber by email
    const res = await fetch(
      `${KIT_BASE}/subscribers?email_address=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": KIT_API_KEY
        }
      }
    );

    const data = await res.json();

    // Kit returns { subscribers: [...] } — check if any match
    const subscribers = data && data.subscribers;
    if (!subscribers || subscribers.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ exists: false })
      };
    }

    const subscriber = subscribers[0];
    const subscriberId = subscriber.id;

    // Fetch this subscriber's tags
    const tagsRes = await fetch(
      `${KIT_BASE}/subscribers/${subscriberId}/tags`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": KIT_API_KEY
        }
      }
    );

    const tagsData = await tagsRes.json();
    const tags = (tagsData && tagsData.tags)
      ? tagsData.tags.map(function(t) { return t.name || ""; })
      : [];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        exists: true,
        subscriber_id: subscriberId,
        tags: tags
      })
    };

  } catch (error) {
    console.error("check-subscriber error:", error);
    // Fail open — treat as new subscriber so the gate always unlocks
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ exists: false, reason: "server-error" })
    };
  }
};
