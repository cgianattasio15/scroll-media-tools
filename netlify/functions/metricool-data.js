// metricool-data.js
// Netlify serverless function: fetches Metricool data for all client accounts
// Returns structured JSON with KPI values, pacing, and 4-week trend data

const METRICOOL_TOKEN = process.env.METRICOOL_TOKEN;
const METRICOOL_USER_ID = 3745914;
const BASE_URL = 'https://app.metricool.com/api';

// ── CLIENT ROSTER ──────────────────────────────────────────────────────────
const CLIENTS = [
  { name: 'Skin by Brownlee', blogId: 5408849, am: 'Riley Walker', stage: 'Rise',  instagram: '@skinbybrownleeandco', niche: 'Med Spas / Aesthetics' },
  { name: 'Launch Party',     blogId: 5321935, am: 'Riley Walker', stage: 'Lift',  instagram: '@shoplaunchparty',     niche: 'Indie Beauty Retail' },
  { name: 'MEAS Active',      blogId: 5321975, am: 'Riley Walker', stage: 'Lift',  instagram: '@meas_active',         niche: 'Activewear' },
  { name: 'Plas Dentistry',   blogId: 5506229, am: 'Riley Walker', stage: 'Spark', instagram: '@plasdentistry',       niche: 'Dentistry' },
  { name: 'DEFINE Oakley',    blogId: 5321970, am: 'Emily Krintz', stage: 'Lift',  instagram: '@defineoakley',        niche: 'Fitness Studios' },
  { name: 'Ombre Gallery',    blogId: 5321966, am: 'Emily Krintz', stage: 'Lift',  instagram: '@theombregallery',     niche: 'Jewelry / Retail' },
  { name: 'Up & Running',     blogId: 5506230, am: 'Rachel Dina',  stage: 'Spark', instagram: '@upandrunningoh',      niche: 'Running / Retail' },
  { name: 'Lane & Kate',      blogId: 5321978, am: 'Rachel Dina',  stage: 'Lift',  instagram: '@laneandkate',         niche: 'Fine Jewelry' },
  { name: 'Holos House',      blogId: 5321974, am: 'Rachel Dina',  stage: 'Spark', instagram: '@holoehouseohio',      niche: 'Wellness Community' },
];

// ── KPI TARGETS BY TIER ────────────────────────────────────────────────────
const KPI_TARGETS = {
  Spark: {
    reach:      { floor: 300,   ceiling: 1200,  label: 'Avg Daily Reach' },
    views:      { floor: 10000, ceiling: 40000, label: 'Total Views' },
    saves:      { floor: 20,    ceiling: 80,    label: 'Total Saves' },
    shares:     { floor: 15,    ceiling: 60,    label: 'Total Shares' },
    comments:   { floor: 15,    ceiling: 75,    label: 'Total Comments' },
    retention:  { floor: 35,    ceiling: 50,    label: 'Reel Retention %' },
    followers:  { floor: 40,    ceiling: 90,    label: 'New Followers' },
  },
  Lift: {
    reach:      { floor: 1500,  ceiling: 5000,   label: 'Avg Daily Reach' },
    views:      { floor: 40000, ceiling: 150000, label: 'Total Views' },
    saves:      { floor: 80,    ceiling: 400,    label: 'Total Saves' },
    shares:     { floor: 60,    ceiling: 300,    label: 'Total Shares' },
    comments:   { floor: 75,    ceiling: 250,    label: 'Total Comments' },
    retention:  { floor: 50,    ceiling: 65,     label: 'Reel Retention %' },
    followers:  { floor: 100,   ceiling: 270,    label: 'New Followers' },
  },
  Rise: {
    reach:      { floor: 5000,   ceiling: 20000,  label: 'Avg Daily Reach' },
    views:      { floor: 150000, ceiling: 800000, label: 'Total Views' },
    saves:      { floor: 300,    ceiling: 2500,   label: 'Total Saves' },
    shares:     { floor: 200,    ceiling: 2000,   label: 'Total Shares' },
    comments:   { floor: 250,    ceiling: 900,    label: 'Total Comments' },
    retention:  { floor: 65,     ceiling: 80,     label: 'Reel Retention %' },
    followers:  { floor: 300,    ceiling: 2500,   label: 'New Followers' },
  },
};

// ── CLIENT GOALS (TOFU / MOFU / BOFU) ─────────────────────────────────────
const CLIENT_GOALS = {
  'Skin by Brownlee': {
    tofu: 'Establish Sylvia as the Perimenopause Skin Authority & Drive New Audience Discovery',
    mofu: 'Build Trust Through Education & Drive Skin Quiz Completions',
    bofu: 'Drive Skin Quiz Completions & E-Commerce Product Sales',
  },
  'Lane & Kate': {
    tofu: 'Boost Local Discoverability & Establish Engagement Ring Authority',
    mofu: 'Increase Community Participation & Build Purchase Confidence',
    bofu: 'Drive Qualified Consultation Bookings',
  },
  'Up & Running': {
    tofu: 'Build Regional Brand Presence & Grow Wellness Partnership Visibility',
    mofu: 'Build Trust Through Expertise & Improve Customer Retention',
    bofu: 'Drive E-Commerce Shop Traffic & In-Store Fit Bookings',
  },
  'Ombre Gallery': {
    tofu: 'Expand Artist Advocacy Reach & Build a Worldwide Audience',
    mofu: 'Build Trust Through Education & Drive Newsletter Sign-Ups',
    bofu: 'Drive Qualified E-Commerce Traffic & Newsletter Subscriber Growth',
  },
  'Launch Party': {
    tofu: 'Grow Digital Community & Drive Brand Discovery',
    mofu: 'Build Trust Through Education & Deepen Community Connection',
    bofu: 'Drive E-Commerce Sales & In-Store Traffic',
  },
  'MEAS Active': {
    tofu: 'Grow New Audience & Build Brand Identity Around the MEAS Mission',
    mofu: 'Nurture Community & Convert Followers into Email Subscribers',
    bofu: 'Drive E-Commerce Shop Traffic & Email List Sign-Ups',
  },
  'DEFINE Oakley': {
    tofu: 'Drive New Audience Discovery & Brand Awareness',
    mofu: 'Build Trust & Deepen Community Connection',
    bofu: 'Drive Class Bookings & New Member Sign-Ups',
  },
  'Plas Dentistry': {
    tofu: 'Build Local Awareness & Establish Dental Authority',
    mofu: 'Educate & Build Trust with Prospective Patients',
    bofu: 'Drive Appointment Bookings & New Patient Inquiries',
  },
  'Holos House': {
    tofu: 'Build Community Awareness & Introduce the Holos Mission',
    mofu: 'Deepen Community Connection & Showcase Programming',
    bofu: 'Drive Event Attendance & Membership Inquiries',
  },
};

// ── HELPERS ────────────────────────────────────────────────────────────────
function getDateRange(weeksAgo = 0) {
  const now = new Date();
  // Current month start/end
  if (weeksAgo === 0) {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = now;
    return {
      start: start.toISOString().split('T')[0] + 'T00:00:00',
      end: end.toISOString().split('T')[0] + 'T23:59:59',
      label: 'This Month',
      daysElapsed: now.getDate(),
      daysInMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    };
  }
  // Weekly ranges for trend data
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() - (weeksAgo - 1) * 7);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);
  return {
    start: startDate.toISOString().split('T')[0] + 'T00:00:00',
    end: endDate.toISOString().split('T')[0] + 'T23:59:59',
    label: `W-${weeksAgo}`,
  };
}

async function fetchMetricool(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      'X-Mc-Auth': METRICOOL_TOKEN,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) return null;
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('json')) return null;
  return res.json();
}

async function fetchInstagramStats(blogId, startISO, endISO) {
  const [reels, posts, stories] = await Promise.all([
    fetchMetricool(`/v2/analytics/reels/instagram?userId=${METRICOOL_USER_ID}&blogId=${blogId}&from=${startISO}&to=${endISO}&timezone=America/New_York`),
    fetchMetricool(`/v2/analytics/posts/instagram?userId=${METRICOOL_USER_ID}&blogId=${blogId}&from=${startISO}&to=${endISO}&timezone=America/New_York`),
    fetchMetricool(`/v2/analytics/stories/instagram?userId=${METRICOOL_USER_ID}&blogId=${blogId}&from=${startISO}&to=${endISO}&timezone=America/New_York`),
  ]);

  const reelList = reels?.data || [];
  const postList = posts?.data || [];
  const storyList = stories?.data || [];

  // Aggregate metrics
  let totalViews = 0, totalSaves = 0, totalShares = 0, totalComments = 0;
  let totalRetention = 0, retentionCount = 0;
  let totalReach = 0, reachCount = 0;

  for (const r of reelList) {
    totalViews += r.plays || r.views || 0;
    totalSaves += r.saved || r.saves || 0;
    totalShares += r.shares || 0;
    totalComments += r.comments || 0;
    if (r.retention != null) { totalRetention += r.retention; retentionCount++; }
    if (r.reach != null) { totalReach += r.reach; reachCount++; }
  }
  for (const p of postList) {
    totalViews += p.impressions || p.reach || 0;
    totalSaves += p.saved || p.saves || 0;
    totalShares += p.shares || 0;
    totalComments += p.comments || 0;
    if (p.reach != null) { totalReach += p.reach; reachCount++; }
  }

  const avgRetention = retentionCount > 0 ? Math.round(totalRetention / retentionCount) : null;

  return {
    views: totalViews,
    saves: totalSaves,
    shares: totalShares,
    comments: totalComments,
    retention: avgRetention,
    reelCount: reelList.length,
    postCount: postList.length,
    storyCount: storyList.length,
    totalPosts: reelList.length + postList.length,
  };
}

function scoreKPI(value, floor, ceiling) {
  if (value === null || value === undefined) return 'unknown';
  if (value >= ceiling) return 'above';
  if (value >= floor) return 'on-track';
  return 'below';
}

function buildKPICard(key, value, targets, daysElapsed, daysInMonth) {
  const t = targets[key];
  if (!t) return null;

  // Prorate monthly targets
  const pct = daysElapsed / daysInMonth;
  const proratedFloor = Math.round(t.floor * pct);
  const proratedCeiling = Math.round(t.ceiling * pct);

  const status = scoreKPI(value, proratedFloor, proratedCeiling);
  const progress = value != null && t.ceiling > 0
    ? Math.min(100, Math.round((value / t.ceiling) * 100))
    : 0;

  return {
    key,
    label: t.label,
    value,
    floor: t.floor,
    ceiling: t.ceiling,
    proratedFloor,
    proratedCeiling,
    status, // 'above' | 'on-track' | 'below' | 'unknown'
    progress,
  };
}

// ── MAIN HANDLER ──────────────────────────────────────────────────────────
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

  // Auth check — validate session token from Netlify Blobs
  const authHeader = event.headers?.authorization || '';
  const sessionToken = authHeader.replace('Bearer ', '').trim();
  let sessionAM = null;
  let sessionRole = null;

  if (sessionToken && sessionToken.length >= 32) {
    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore('dashboard-sessions');
      const session = await store.get(`session-${sessionToken}`, { type: 'json' });
      if (!session || new Date(session.expires) < new Date()) {
        return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Session expired or invalid' }) };
      }
      sessionAM = session.am;
      sessionRole = session.role;
    } catch (blobErr) {
      console.warn('Blob store unavailable, skipping session check:', blobErr.message);
    }
  } else {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // AM users can only see their own accounts; exec sees all
  const queryAM = event.queryStringParameters?.am || null;
  const amFilter = sessionRole === 'am' ? sessionAM : queryAM;
  const clients = amFilter
    ? CLIENTS.filter(c => c.am.toLowerCase() === amFilter.toLowerCase())
    : CLIENTS;

  try {
    const currentRange = getDateRange(0);
    const weekRanges = [1, 2, 3, 4].map(w => getDateRange(w));

    const results = await Promise.all(clients.map(async (client) => {
      // Current month stats
      const current = await fetchInstagramStats(client.blogId, currentRange.start, currentRange.end);

      // 4-week trend data
      const trends = await Promise.all(
        weekRanges.map(r => fetchInstagramStats(client.blogId, r.start, r.end))
      );

      const targets = KPI_TARGETS[client.stage] || KPI_TARGETS.Spark;
      const { daysElapsed, daysInMonth } = currentRange;

      // Build KPI cards
      const kpis = {};
      const kpiKeys = ['views', 'saves', 'shares', 'comments', 'retention'];
      for (const key of kpiKeys) {
        kpis[key] = buildKPICard(key, current[key], targets, daysElapsed, daysInMonth);
      }

      // Trend sparklines: views over 4 weeks
      const sparkline = trends.map(t => t.views || 0);

      // Overall health score (0-100)
      const statuses = Object.values(kpis).map(k => k?.status);
      const above = statuses.filter(s => s === 'above').length;
      const onTrack = statuses.filter(s => s === 'on-track').length;
      const below = statuses.filter(s => s === 'below').length;
      const total = statuses.filter(s => s !== 'unknown').length || 1;
      const healthScore = Math.round(((above * 1.0 + onTrack * 0.6) / total) * 100);

      return {
        ...client,
        goals: CLIENT_GOALS[client.name] || { tofu: '', mofu: '', bofu: '' },
        current,
        kpis,
        sparkline,
        healthScore,
        daysElapsed,
        daysInMonth,
        lastUpdated: new Date().toISOString(),
      };
    }));

    // Agency-level summary
    const avgHealth = Math.round(results.reduce((s, c) => s + c.healthScore, 0) / results.length);
    const totalViews = results.reduce((s, c) => s + (c.current.views || 0), 0);
    const totalSaves = results.reduce((s, c) => s + (c.current.saves || 0), 0);
    const aboveCount = results.filter(c => c.healthScore >= 70).length;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        generated: new Date().toISOString(),
        period: { start: currentRange.start, end: currentRange.end, daysElapsed: currentRange.daysElapsed },
        agency: { avgHealth, totalViews, totalSaves, aboveCount, totalClients: results.length },
        clients: results,
      }),
    };
  } catch (err) {
    console.error('Dashboard error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error', message: err.message }),
    };
  }
};
