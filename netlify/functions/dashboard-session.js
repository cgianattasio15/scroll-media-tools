// dashboard-session.js
// Validates a dashboard session token and returns user info

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const authHeader = event.headers?.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token || token.length < 32) {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ valid: false }) };
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('dashboard-sessions');
    const session = await store.get(`session-${token}`, { type: 'json' });

    if (!session) {
      return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ valid: false, reason: 'not_found' }) };
    }

    if (new Date(session.expires) < new Date()) {
      await store.delete(`session-${token}`);
      return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ valid: false, reason: 'expired' }) };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        valid: true,
        role: session.role,
        name: session.name,
        am: session.am,
        email: session.email,
      }),
    };
  } catch (err) {
    console.error('Session validation error:', err);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ valid: false, reason: 'error' }) };
  }
};
