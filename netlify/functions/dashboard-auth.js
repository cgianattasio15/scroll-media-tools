// dashboard-auth.js
// Handles login for the internal performance dashboard
// Users: Chase (Executive) + 3 AMs (Riley, Emily, Rachel)
// Returns a session token stored in Netlify Blobs

const USERS = {
  // Executive
  'chase@getscrollmedia.com': {
    password: process.env.DASHBOARD_PASS_CHASE,
    role: 'executive',
    name: 'Chase',
    am: null, // sees all accounts
  },
  // Account Managers
  'riley@getscrollmedia.com': {
    password: process.env.DASHBOARD_PASS_RILEY,
    role: 'am',
    name: 'Riley Walker',
    am: 'Riley Walker',
  },
  'emily@getscrollmedia.com': {
    password: process.env.DASHBOARD_PASS_EMILY,
    role: 'am',
    name: 'Emily Krintz',
    am: 'Emily Krintz',
  },
  'rachel@getscrollmedia.com': {
    password: process.env.DASHBOARD_PASS_RACHEL,
    role: 'am',
    name: 'Rachel Dina',
    am: 'Rachel Dina',
  },
};

function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, password } = body;

  if (!email || !password) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Email and password required' }) };
  }

  const user = USERS[email.toLowerCase()];

  if (!user || !user.password || user.password !== password) {
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    };
  }

  // Generate session token
  const token = generateToken();
  const sessionData = {
    email: email.toLowerCase(),
    role: user.role,
    name: user.name,
    am: user.am,
    created: new Date().toISOString(),
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
  };

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('dashboard-sessions');
    await store.setJSON(`session-${token}`, sessionData);
  } catch (err) {
    console.error('Blob store error:', err);
    // Fall through — token still returned, session won't persist across cold starts
    // but will work for the current request context
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      token,
      role: user.role,
      name: user.name,
      am: user.am,
      expires: sessionData.expires,
    }),
  };
};
