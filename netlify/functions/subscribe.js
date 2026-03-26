/**
 * Netlify Function: subscribe.js
 * Handles email capture for industry guide gate pages.
 * Subscribes the user to a Kit (ConvertKit) sequence and returns success.
 *
 * POST /api/subscribe
 * Body: { first_name, email, sequence_id, guide, utm_source, utm_campaign }
 */

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://tools.scrollmedia.co',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const { first_name, email, sequence_id, guide, utm_source, utm_campaign } = body;

  // Validate required fields
  if (!first_name || !email) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'first_name and email are required' })
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid email address' })
    };
  }

  const KIT_API_KEY = process.env.KIT_API_KEY;
  const KIT_SEQUENCE_ID = sequence_id || process.env.KIT_DEFAULT_SEQUENCE_ID;

  if (!KIT_API_KEY) {
    console.error('KIT_API_KEY environment variable not set');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    // Step 1: Add/update subscriber in Kit
    const subscriberResponse = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': KIT_API_KEY
      },
      body: JSON.stringify({
        first_name: first_name,
        email_address: email,
        fields: {
          guide_source: guide || 'unknown',
          utm_source: utm_source || 'direct',
          utm_campaign: utm_campaign || ''
        }
      })
    });

    const subscriberData = await subscriberResponse.json();
    console.log('Kit subscriber response:', JSON.stringify(subscriberData));

    if (!subscriberResponse.ok && subscriberResponse.status !== 200) {
      // Kit returns 200 even for existing subscribers
      console.error('Kit subscriber error:', subscriberData);
    }

    // Get subscriber ID from response
    const subscriberId = subscriberData?.subscriber?.id;

    // Step 2: Add subscriber to sequence
    if (subscriberId && KIT_SEQUENCE_ID) {
      const sequenceResponse = await fetch(`https://api.kit.com/v4/sequences/${KIT_SEQUENCE_ID}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': KIT_API_KEY
        },
        body: JSON.stringify({
          id: subscriberId
        })
      });

      const sequenceData = await sequenceResponse.json();
      console.log('Kit sequence response:', JSON.stringify(sequenceData));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Subscribed successfully'
      })
    };

  } catch (error) {
    console.error('Subscribe function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Subscription failed. Please try again.' })
    };
  }
};
