// metricool-data.js — Scroll Media Internal Dashboard Backend
// Full KPI set (14 metrics), date range support, TOFU/MOFU/BOFU mapping
// Per-client goals, tier-based targets, 4-week trend data

const METRICOOL_TOKEN = process.env.METRICOOL_TOKEN;
const METRICOOL_USER_ID = 3745914;
const BASE_URL = 'https://app.metricool.com/api';

// ── CLIENT ROSTER ──────────────────────────────────────────────────────────
const CLIENTS = [
  { name: 'Skin by Brownlee', slug: 'skin-by-brownlee', blogId: 5408849, am: 'Riley Walker', stage: 'Rise',  instagram: '@skinbybrownleeandco', niche: 'Med Spas / Aesthetics' },
  { name: 'Launch Party',     slug: 'launch-party',     blogId: 5321935, am: 'Riley Walker', stage: 'Lift',  instagram: '@shoplaunchparty',     niche: 'Indie Beauty Retail' },
  { name: 'MEAS Active',      slug: 'meas-active',      blogId: 5321975, am: 'Riley Walker', stage: 'Lift',  instagram: '@meas_active',         niche: 'Activewear' },
  { name: 'Plas Dentistry',   slug: 'plas-dentistry',   blogId: 5506229, am: 'Riley Walker', stage: 'Spark', instagram: '@plasdentistry',       niche: 'Dentistry' },
  { name: 'DEFINE Oakley',    slug: 'define-oakley',    blogId: 5321970, am: 'Emily Krintz', stage: 'Lift',  instagram: '@defineoakley',        niche: 'Fitness Studios' },
  { name: 'Ombre Gallery',    slug: 'ombre-gallery',    blogId: 5321966, am: 'Emily Krintz', stage: 'Lift',  instagram: '@theombregallery',     niche: 'Jewelry / Retail' },
  { name: 'Up & Running',     slug: 'up-running',       blogId: 5506230, am: 'Rachel Dina',  stage: 'Spark', instagram: '@upandrunningoh',      niche: 'Running / Retail' },
  { name: 'Lane & Kate',      slug: 'lane-kate',        blogId: 5321978, am: 'Rachel Dina',  stage: 'Lift',  instagram: '@laneandkate',         niche: 'Fine Jewelry' },
  { name: 'Holos House',      slug: 'holos-house',      blogId: 5321974, am: 'Rachel Dina',  stage: 'Spark', instagram: '@holoehouseohio',      niche: 'Wellness Community' },
];

// ── KPI DEFINITIONS WITH FUNNEL STAGE ─────────────────────────────────────
// All 14 KPIs from the KPI Target Ranges Framework
const KPI_DEFS = [
  // TOFU — Authority & Awareness
  { key: 'followers',       label: 'Total Followers',          funnel: 'TOFU', platform: 'IG Insights', unit: 'count',   priority: 'baseline' },
  { key: 'avgReachPerDay',  label: 'Avg Reach Per Day',        funnel: 'TOFU', platform: 'Metricool',   unit: 'count',   priority: 'high' },
  { key: 'newFollowers',    label: 'New Followers',            funnel: 'TOFU', platform: 'IG Insights', unit: 'count',   priority: 'high' },
  { key: 'shares',          label: 'Shares (Total)',           funnel: 'TOFU', platform: 'Metricool',   unit: 'count',   priority: 'high' },
  { key: 'views',           label: 'Views (Total)',            funnel: 'TOFU', platform: 'Metricool',   unit: 'count',   priority: 'high' },
  // MOFU — Education & Engagement
  { key: 'comments',        label: 'Comments (Total)',         funnel: 'MOFU', platform: 'Metricool',   unit: 'count',   priority: 'high' },
  { key: 'profileVisits',   label: 'Profile Visits (Total)',   funnel: 'MOFU', platform: 'IG Insights', unit: 'count',   priority: 'high' },
  { key: 'retention',       label: 'Reel Retention % (Avg)',   funnel: 'MOFU', platform: 'Metricool',   unit: 'percent', priority: 'high' },
  { key: 'watchTime',       label: 'Reel Watch Time (Avg)',    funnel: 'MOFU', platform: 'Metricool',   unit: 'seconds', priority: 'high' },
  { key: 'saves',           label: 'Saves (Total)',            funnel: 'MOFU', platform: 'Metricool',   unit: 'count',   priority: 'high' },
  // BOFU — Consideration & Conversion
  { key: 'ctr',             label: 'Click Through Rate',       funnel: 'BOFU', platform: 'Custom',      unit: 'percent', priority: 'high' },
  { key: 'linkTaps',        label: 'External Link Taps',       funnel: 'BOFU', platform: 'IG Insights', unit: 'count',   priority: 'high' },
  { key: 'profileConvRate', label: 'Profile Conversion Rate',  funnel: 'BOFU', platform: 'Custom',      unit: 'percent', priority: 'high' },
];

// ── KPI TARGETS BY TIER ────────────────────────────────────────────────────
const KPI_TARGETS = {
  Spark: {
    followers:      { floor: 0,    ceiling: 2500,  label: 'Total Followers' },
    avgReachPerDay: { floor: 300,  ceiling: 1200,  label: 'Avg Reach Per Day' },
    newFollowers:   { floor: 40,   ceiling: 90,    label: 'New Followers' },
    shares:         { floor: 15,   ceiling: 60,    label: 'Shares (Total)' },
    views:          { floor: 10000,ceiling: 40000, label: 'Views (Total)' },
    comments:       { floor: 15,   ceiling: 75,    label: 'Comments (Total)' },
    profileVisits:  { floor: 50,   ceiling: 500,   label: 'Profile Visits' },
    retention:      { floor: 35,   ceiling: 50,    label: 'Reel Retention %', isPercent: true },
    watchTime:      { floor: 3,    ceiling: 6,     label: 'Reel Watch Time (s)' },
    saves:          { floor: 20,   ceiling: 80,    label: 'Saves (Total)' },
    ctr:            { floor: 3,    ceiling: 8,     label: 'Click Through Rate', isPercent: true },
    linkTaps:       { floor: 5,    ceiling: 40,    label: 'External Link Taps' },
    profileConvRate:{ floor: 10,   ceiling: 18,    label: 'Profile Conversion Rate', isPercent: true },
  },
  Lift: {
    followers:      { floor: 2500,  ceiling: 10000,  label: 'Total Followers' },
    avgReachPerDay: { floor: 1500,  ceiling: 5000,   label: 'Avg Reach Per Day' },
    newFollowers:   { floor: 100,   ceiling: 270,    label: 'New Followers' },
    shares:         { floor: 60,    ceiling: 300,    label: 'Shares (Total)' },
    views:          { floor: 40000, ceiling: 150000, label: 'Views (Total)' },
    comments:       { floor: 75,    ceiling: 250,    label: 'Comments (Total)' },
    profileVisits:  { floor: 300,   ceiling: 2000,   label: 'Profile Visits' },
    retention:      { floor: 50,    ceiling: 65,     label: 'Reel Retention %', isPercent: true },
    watchTime:      { floor: 6,     ceiling: 10,     label: 'Reel Watch Time (s)' },
    saves:          { floor: 80,    ceiling: 400,    label: 'Saves (Total)' },
    ctr:            { floor: 3,     ceiling: 6,      label: 'Click Through Rate', isPercent: true },
    linkTaps:       { floor: 30,    ceiling: 180,    label: 'External Link Taps' },
    profileConvRate:{ floor: 10,    ceiling: 16,     label: 'Profile Conversion Rate', isPercent: true },
  },
  Rise: {
    followers:      { floor: 10000,  ceiling: 100000, label: 'Total Followers' },
    avgReachPerDay: { floor: 5000,   ceiling: 20000,  label: 'Avg Reach Per Day' },
    newFollowers:   { floor: 300,    ceiling: 2500,   label: 'New Followers' },
    shares:         { floor: 200,    ceiling: 2000,   label: 'Shares (Total)' },
    views:          { floor: 150000, ceiling: 800000, label: 'Views (Total)' },
    comments:       { floor: 250,    ceiling: 900,    label: 'Comments (Total)' },
    profileVisits:  { floor: 1500,   ceiling: 10000,  label: 'Profile Visits' },
    retention:      { floor: 65,     ceiling: 80,     label: 'Reel Retention %', isPercent: true },
    watchTime:      { floor: 10,     ceiling: 15,     label: 'Reel Watch Time (s)' },
    saves:          { floor: 300,    ceiling: 2500,   label: 'Saves (Total)' },
    ctr:            { floor: 2,      ceiling: 5,      label: 'Click Through Rate', isPercent: true },
    linkTaps:       { floor: 350,    ceiling: 3000,   label: 'External Link Taps' },
    profileConvRate:{ floor: 8,      ceiling: 14,     label: 'Profile Conversion Rate', isPercent: true },
  },
};

// ── CLIENT GOALS (TOFU / MOFU / BOFU) ─────────────────────────────────────
const CLIENT_GOALS = {
  'Skin by Brownlee': {
    tofu: { title: 'Establish Sylvia as the Perimenopause Skin Authority & Drive New Audience Discovery', desc: 'Build awareness among women 40–60 experiencing hormonal skin changes. Position Sylvia as the most credible, relatable expert in perimenopause skincare.' },
    mofu: { title: 'Build Trust Through Education & Drive Skin Quiz Completions', desc: 'Nurture discovered audience. Educate on perimenopause skin science. Drive saves, profile visits, and Skin Quiz completions as the primary MOFU signal.' },
    bofu: { title: 'Drive Skin Quiz Completions & E-Commerce Product Sales', desc: 'Convert engaged followers into Skin Quiz completions and e-commerce buyers. Skin Quiz is the primary conversion mechanism.' },
  },
  'Lane & Kate': {
    tofu: { title: 'Boost Local Discoverability & Establish Engagement Ring Authority', desc: 'Build awareness among Cincinnati-area couples and early-stage ring researchers. Position L&K as the trusted local boutique alternative to big-box retailers.' },
    mofu: { title: 'Increase Community Participation & Build Purchase Confidence', desc: 'Nurture the audience actively researching engagement rings. Educate on the ring-buying process. Drive saves, profile visits, and repeat engagement.' },
    bofu: { title: 'Drive Qualified Consultation Bookings', desc: 'Convert engaged followers into booked consultation appointments via ring-specific content, testimonials, and direct booking CTAs.' },
  },
  'Up & Running': {
    tofu: { title: 'Build Regional Brand Presence & Grow Wellness Partnership Visibility', desc: 'Build awareness among runners and on-your-feet workers in the Dayton-Cincinnati region. Introduce the expert fitting process and community differentiators.' },
    mofu: { title: 'Build Trust Through Expertise & Improve Customer Retention', desc: 'Activate 20+ years of expertise as the single biggest trust asset. Deepen loyalty through community-driven content, run group recaps, and member spotlights.' },
    bofu: { title: 'Drive E-Commerce Shop Traffic & In-Store Fit Bookings', desc: 'Convert warm followers into online customers or in-store fitting appointments. Make the fitting process the conversion differentiator.' },
  },
  'Ombre Gallery': {
    tofu: { title: 'Expand Artist Advocacy Reach & Build a Worldwide Audience', desc: 'Build awareness among art collectors and values-aligned buyers nationally and internationally. Position Jenna as a trusted curator and artist advocate.' },
    mofu: { title: 'Build Trust Through Education & Drive Newsletter Sign-Ups', desc: 'Educate on contemporary art jewelry. Deepen community connection. Drive newsletter sign-ups as the primary MOFU conversion signal.' },
    bofu: { title: 'Drive Qualified E-Commerce Traffic & Newsletter Subscriber Growth', desc: 'Convert engaged followers into e-commerce buyers and newsletter subscribers. Pop-up events are a secondary conversion driver.' },
  },
  'Launch Party': {
    tofu: { title: 'Grow Digital Community & Drive Brand Discovery', desc: 'Build awareness among Cincinnati urban women who value indie beauty. Position Launch Party as the go-to indie beauty boutique in OTR.' },
    mofu: { title: 'Build Trust Through Education & Deepen Community Connection', desc: 'Nurture the audience evaluating whether to buy online or visit in-store. Educate on ingredients, brand stories, and how to build a clean beauty routine.' },
    bofu: { title: 'Drive E-Commerce Sales & In-Store Traffic', desc: 'Convert engaged followers into paying customers. Drive clicks to shoplaunchparty.com through product-specific content and social proof.' },
  },
  'MEAS Active': {
    tofu: { title: 'Grow New Audience & Build Brand Identity Around the MEAS Mission', desc: 'Build awareness among active women nationally. Lead with the origin story (Cambodia mission, MEAS as "gold") as the single most powerful differentiator.' },
    mofu: { title: 'Nurture Community & Convert Followers into Email Subscribers', desc: 'Showcase brand values and community. Funnel warm followers into the email list — highest-value MOFU conversion for repeat purchase flow.' },
    bofu: { title: 'Drive E-Commerce Shop Traffic & Email List Sign-Ups', desc: 'Convert warm followers and email subscribers into online buyers. Grow the email list as the primary BOFU conversion mechanism.' },
  },
  'DEFINE Oakley': {
    tofu: { title: 'Drive New Audience Discovery & Brand Awareness', desc: 'Build awareness among Cincinnati busy women and moms. Introduce the 30:30 format, Bounce class, and childcare differentiator to cold audiences.' },
    mofu: { title: 'Build Trust & Deepen Community Connection', desc: 'Demonstrate the value of the 30:30 format through education and social proof. Address objections around cost, intimidation, and childcare logistics.' },
    bofu: { title: 'Drive Class Bookings & New Member Sign-Ups', desc: 'Convert engaged followers into paying members. Drive clicks to the booking page through class-specific content and first-timer offers.' },
  },
  'Plas Dentistry': {
    tofu: { title: 'Build Local Awareness & Establish Dental Authority', desc: 'Build awareness in the local market. Position Plas Dentistry as the trusted, expert dental practice in the community.' },
    mofu: { title: 'Educate & Build Trust with Prospective Patients', desc: 'Nurture prospective patients through educational content. Address objections and showcase expertise and patient outcomes.' },
    bofu: { title: 'Drive Appointment Bookings & New Patient Inquiries', desc: 'Convert engaged followers into booked appointments through direct CTAs and social proof.' },
  },
  'Holos House': {
    tofu: { title: 'Build Community Awareness & Introduce the Holos Mission', desc: 'Build awareness among wellness-oriented audiences. Introduce the Holos House mission, programming, and community-first approach.' },
    mofu: { title: 'Deepen Community Connection & Showcase Programming', desc: 'Nurture the audience by showcasing events, classes, and the community experience. Build the emotional connection that drives membership consideration.' },
    bofu: { title: 'Drive Event Attendance & Membership Inquiries', desc: 'Convert warm followers into event attendees and membership inquirers through direct CTAs and community-driven content.' },
  },
};

// ── HELPERS ────────────────────────────────────────────────────────────────
async function fetchMetricool(path) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'X-Mc-Auth': METRICOOL_TOKEN, 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('json')) return null;
    return res.json();
  } catch {
    return null;
  }
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

  let totalViews = 0, totalSaves = 0, totalShares = 0, totalComments = 0;
  let totalRetention = 0, retentionCount = 0;
  let totalWatchTime = 0, watchTimeCount = 0;
  let totalReach = 0, reachCount = 0;
  let totalImpressions = 0;

  for (const r of reelList) {
    totalViews += r.plays || r.views || 0;
    totalSaves += r.saved || r.saves || 0;
    totalShares += r.shares || 0;
    totalComments += r.comments || 0;
    if (r.retention != null && r.retention > 0) { totalRetention += r.retention * 100; retentionCount++; }
    if (r.avgWatchTime != null) { totalWatchTime += r.avgWatchTime; watchTimeCount++; }
    else if (r.watchTime != null) { totalWatchTime += r.watchTime; watchTimeCount++; }
    if (r.reach != null) { totalReach += r.reach; reachCount++; }
    totalImpressions += r.impressions || r.plays || r.views || 0;
  }
  for (const p of postList) {
    totalViews += p.impressions || p.reach || 0;
    totalSaves += p.saved || p.saves || 0;
    totalShares += p.shares || 0;
    totalComments += p.comments || 0;
    if (p.reach != null) { totalReach += p.reach; reachCount++; }
    totalImpressions += p.impressions || p.reach || 0;
  }

  const avgRetention = retentionCount > 0 ? Math.round(totalRetention / retentionCount) : null;
  const avgWatchTime = watchTimeCount > 0 ? Math.round((totalWatchTime / watchTimeCount) * 10) / 10 : null;

  // Build daily trend data (views per day) for chart rendering
  const dailyViews = {};
  for (const r of reelList) {
    const d = (r.publishedAt || r.date || '').substring(0, 10);
    if (d) dailyViews[d] = (dailyViews[d] || 0) + (r.plays || r.views || 0);
  }
  for (const p of postList) {
    const d = (p.publishedAt || p.date || '').substring(0, 10);
    if (d) dailyViews[d] = (dailyViews[d] || 0) + (p.impressions || p.reach || 0);
  }

  return {
    views: totalViews,
    saves: totalSaves,
    shares: totalShares,
    comments: totalComments,
    retention: avgRetention,
    watchTime: avgWatchTime,
    reelCount: reelList.length,
    postCount: postList.length,
    storyCount: storyList.length,
    totalPosts: reelList.length + postList.length,
    dailyViews,
    // Derived metrics (require IG Insights — set to null if unavailable)
    avgReachPerDay: reachCount > 0 ? Math.round(totalReach / reachCount) : null,
    followers: null,       // requires IG Insights endpoint
    newFollowers: null,    // requires IG Insights endpoint
    profileVisits: null,   // requires IG Insights endpoint
    linkTaps: null,        // requires IG Insights endpoint
    ctr: null,             // derived: linkTaps / profileVisits
    profileConvRate: null, // derived: follows / profileVisits
  };
}

function scoreKPI(value, floor, ceiling, isPercent) {
  if (value === null || value === undefined) return 'unknown';
  const v = isPercent ? value : value;
  if (v >= ceiling) return 'above';
  if (v >= floor) return 'on-track';
  return 'below';
}

function buildKPICard(kpiDef, value, targets, daysElapsed, daysInMonth) {
  const t = targets[kpiDef.key];
  if (!t) return null;

  const isPercent = kpiDef.unit === 'percent';
  const isSeconds = kpiDef.unit === 'seconds';
  const isBaseline = kpiDef.priority === 'baseline';

  // Don't prorate percentage or seconds metrics
  const pct = daysElapsed / daysInMonth;
  const proratedFloor = (isPercent || isSeconds || isBaseline) ? t.floor : Math.round(t.floor * pct);
  const proratedCeiling = (isPercent || isSeconds || isBaseline) ? t.ceiling : Math.round(t.ceiling * pct);

  const status = scoreKPI(value, proratedFloor, proratedCeiling, isPercent);
  const progress = value != null && t.ceiling > 0
    ? Math.min(100, Math.round((value / t.ceiling) * 100))
    : 0;

  return {
    key: kpiDef.key,
    label: kpiDef.label,
    funnel: kpiDef.funnel,
    platform: kpiDef.platform,
    unit: kpiDef.unit,
    value,
    floor: t.floor,
    ceiling: t.ceiling,
    proratedFloor,
    proratedCeiling,
    status,
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

  // ── Auth ──
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
      console.warn('Blob store unavailable:', blobErr.message);
    }
  } else {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // ── Date Range ──
  const params = event.queryStringParameters || {};
  const now = new Date();
  let startISO, endISO, daysElapsed, daysInMonth, rangeLabel;

  if (params.from && params.to) {
    // Custom date range from frontend
    startISO = params.from + 'T00:00:00';
    endISO = params.to + 'T23:59:59';
    const startDate = new Date(params.from);
    const endDate = new Date(params.to);
    const diffMs = endDate - startDate;
    daysElapsed = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
    daysInMonth = daysElapsed; // treat range as the full period
    rangeLabel = `${params.from} → ${params.to}`;
  } else {
    // Default: current month to date
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    startISO = monthStart.toISOString().split('T')[0] + 'T00:00:00';
    endISO = now.toISOString().split('T')[0] + 'T23:59:59';
    daysElapsed = now.getDate();
    daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    rangeLabel = `${now.toLocaleString('default', { month: 'long' })} MTD`;
  }

  // ── 4-week trend ranges ──
  function getWeekRange(weeksAgo) {
    const end = new Date(now);
    end.setDate(end.getDate() - (weeksAgo - 1) * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    return {
      start: start.toISOString().split('T')[0] + 'T00:00:00',
      end: end.toISOString().split('T')[0] + 'T23:59:59',
      label: `W-${weeksAgo}`,
    };
  }
  const weekRanges = [4, 3, 2, 1].map(w => getWeekRange(w));

  // ── AM filter ──
  const queryAM = params.am || null;
  const amFilter = sessionRole === 'am' ? sessionAM : queryAM;
  const clients = amFilter
    ? CLIENTS.filter(c => c.am.toLowerCase() === amFilter.toLowerCase())
    : CLIENTS;

  try {
    const results = await Promise.all(clients.map(async (client) => {
      // Current period stats
      const current = await fetchInstagramStats(client.blogId, startISO, endISO);

      // 4-week trend (views per week for sparklines)
      const trends = await Promise.all(
        weekRanges.map(r => fetchInstagramStats(client.blogId, r.start, r.end))
      );

      const targets = KPI_TARGETS[client.stage] || KPI_TARGETS.Spark;

      // Build all 14 KPI cards
      const kpis = {};
      for (const def of KPI_DEFS) {
        kpis[def.key] = buildKPICard(def, current[def.key], targets, daysElapsed, daysInMonth);
      }

      // Trend data: views per week (oldest → newest)
      const trendViews = trends.map(t => t.views || 0);
      const trendSaves = trends.map(t => t.saves || 0);
      const trendShares = trends.map(t => t.shares || 0);
      const trendComments = trends.map(t => t.comments || 0);

      // Build daily views array for the selected period (sorted by date)
      const dailyEntries = Object.entries(current.dailyViews || {}).sort((a, b) => a[0].localeCompare(b[0]));
      const dailyLabels = dailyEntries.map(e => e[0]);
      const dailyData = dailyEntries.map(e => e[1]);

      // Health score: weighted across available KPIs
      const statuses = Object.values(kpis).map(k => k?.status).filter(s => s && s !== 'unknown');
      const above = statuses.filter(s => s === 'above').length;
      const onTrack = statuses.filter(s => s === 'on-track').length;
      const total = statuses.length || 1;
      const healthScore = Math.round(((above * 1.0 + onTrack * 0.6) / total) * 100);

      // TOFU / MOFU / BOFU KPI groupings
      const tofuKpis = KPI_DEFS.filter(d => d.funnel === 'TOFU').map(d => kpis[d.key]).filter(Boolean);
      const mofuKpis = KPI_DEFS.filter(d => d.funnel === 'MOFU').map(d => kpis[d.key]).filter(Boolean);
      const bofuKpis = KPI_DEFS.filter(d => d.funnel === 'BOFU').map(d => kpis[d.key]).filter(Boolean);

      return {
        name: client.name,
        slug: client.slug,
        blogId: client.blogId,
        am: client.am,
        stage: client.stage,
        instagram: client.instagram,
        niche: client.niche,
        goals: CLIENT_GOALS[client.name] || { tofu: { title: '', desc: '' }, mofu: { title: '', desc: '' }, bofu: { title: '', desc: '' } },
        current: {
          views: current.views,
          saves: current.saves,
          shares: current.shares,
          comments: current.comments,
          retention: current.retention,
          watchTime: current.watchTime,
          reelCount: current.reelCount,
          postCount: current.postCount,
          storyCount: current.storyCount,
          totalPosts: current.totalPosts,
        },
        kpis,
        tofuKpis,
        mofuKpis,
        bofuKpis,
        trends: {
          labels: weekRanges.map(r => r.label),
          views: trendViews,
          saves: trendSaves,
          shares: trendShares,
          comments: trendComments,
        },
        daily: {
          labels: dailyLabels,
          views: dailyData,
        },
        healthScore,
        daysElapsed,
        daysInMonth,
        lastUpdated: new Date().toISOString(),
      };
    }));

    // Agency summary
    const avgHealth = Math.round(results.reduce((s, c) => s + c.healthScore, 0) / results.length);
    const totalViews = results.reduce((s, c) => s + (c.current.views || 0), 0);
    const totalSaves = results.reduce((s, c) => s + (c.current.saves || 0), 0);
    const totalShares = results.reduce((s, c) => s + (c.current.shares || 0), 0);
    const aboveCount = results.filter(c => c.healthScore >= 70).length;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        generated: new Date().toISOString(),
        period: { start: startISO, end: endISO, label: rangeLabel, daysElapsed, daysInMonth },
        agency: { avgHealth, totalViews, totalSaves, totalShares, aboveCount, totalClients: results.length },
        clients: results,
        kpiDefs: KPI_DEFS,
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
