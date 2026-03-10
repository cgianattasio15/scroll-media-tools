// validate-token.js
// Called by the product page on load to verify a token is valid
// Returns: { valid: true/false, email: (masked) }

exports.handler = async (event) => {
  // CORS headers — only allow from our domain
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://tools.scrollmedia.co',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = event.queryStringParameters?.token;

  if (!token || token.length < 36) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ valid: false, reason: 'missing_token' }),
    };
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('access-tokens');
    const data = await store.get(token, { type: 'json' });

    if (!data) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ valid: false, reason: 'invalid_token' }),
      };
    }

    // Increment usage count (for analytics — not used for blocking)
    await store.setJSON(token, {
      ...data,
      used_count: (data.used_count || 0) + 1,
      last_accessed: new Date().toISOString(),
    });

    // Return masked email for display
    const email = data.email || '';
    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        valid: true,
        email: maskedEmail,
        product: data.product,
      }),
    };
  } catch (err) {
    console.error('Token validation error:', err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ valid: false, reason: 'server_error' }),
    };
  }
};
