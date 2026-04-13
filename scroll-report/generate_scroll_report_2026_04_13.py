from pathlib import Path
from html import escape

OUT = Path('/home/ubuntu/scroll-media-tools/scroll-report/scroll-report-2026-04-13.html')

report = {
    'date_long': 'Week of April 13, 2026',
    'date_short': 'Apr 13, 2026',
    'title': 'The Scroll Report — Week of April 13, 2026 | Scroll Media',
    'description': "The Scroll Report — Scroll Media's weekly internal brief covering Instagram updates, content strategy signals, AI leverage plays, client ideation scripts, and formats to test.",
    'favicon': '../favicon.png',
    'updates': [
        {
            'title': 'Teen Accounts now shape discoverability more aggressively',
            'summary': 'Instagram is expanding the updated Teen Accounts system globally, tightening default 13+ content controls, expanding blocked search terms, and reducing interactions between teens and accounts that repeatedly post age-inappropriate content.',
            'what_it_means': 'Discoverability is becoming more segmented by audience age, safety profile, and metadata cleanliness. Visibility is no longer one-size-fits-all.',
            'how_to_use': 'For youth-adjacent brands, clean up caption language, avoid ambiguous mature references, and make category fit obvious in visuals and copy.',
            'angle': 'Safety is no longer just policy risk. It is now a distribution variable.',
            'source_name': 'Meta Newsroom',
            'source_url': 'https://about.fb.com/news/2026/04/instagram-expands-teen-accounts-inspired-by-13-content-ratings/'
        },
        {
            'title': 'Reels Trending Ads are getting more culture-timed and category-specific',
            'summary': 'Meta expanded Reels Trending Ads into categories like TV, travel, business, and finance, while also creating limited-content cultural moment lineups and reserve-buying windows for high-attention periods.',
            'what_it_means': 'Reels is being productized around attention windows, not just evergreen placement. The platform is rewarding teams that know when to show up, not only what to post.',
            'how_to_use': 'Map client campaigns to calendar spikes, launches, and live moments. Build content angles around relevance windows instead of treating weekly posting as flat inventory.',
            'angle': 'Timing is becoming a creative multiplier.',
            'source_name': 'Variety',
            'source_url': 'https://variety.com/2026/digital/news/instagram-reels-trending-ads-tv-movies-cultural-moments-nfl-1236698010/'
        },
        {
            'title': 'Meta’s adaptive ranking model keeps making mediocre media buying less valuable',
            'summary': 'Meta says its improved Instagram ad-serving system processes more engagement signals in real time while using less compute, with reported gains in conversions and click-through rate.',
            'what_it_means': 'Manual tweaking matters less when the platform gets better at matching inventory to intent. The edge shifts upstream to message quality, offer strength, and creative differentiation.',
            'how_to_use': 'Stop over-investing in hand-tuned optimization theater. Put more energy into hooks, positioning, landing alignment, and conversion architecture.',
            'angle': 'As automation improves, differentiated inputs matter more than operational busyness.',
            'source_name': 'Social Media Today',
            'source_url': 'https://www.socialmediatoday.com/news/meta-highlights-improvements-to-its-ad-serving-program/816289/'
        },
        {
            'title': 'Clickable caption links signal creator commerce is moving closer to the feed',
            'summary': 'Instagram is testing clickable links inside captions for a limited group of Meta Verified creators, with tight monthly limits and creator-first access.',
            'what_it_means': 'Instagram is selectively reducing friction between attention and action, but it is giving that leverage to creators first, not brands.',
            'how_to_use': 'Double down on creator-led distribution and founder-led accounts. Build partnership structures assuming creators may soon have stronger direct-response mechanics than brand pages.',
            'angle': 'Commerce utility will likely reach creators before it reaches businesses at scale.',
            'source_name': 'ALM Corp',
            'source_url': 'https://almcorp.com/blog/instagram-clickable-links-post-captions-meta-verified/'
        },
    ],
    'signals': [
        {
            'title': 'Signal 01 — Safer creative is now a growth lever, not just compliance hygiene',
            'summary': 'Platform safety systems are increasingly tied to who can see, search, and interact with content. Teams still treating moderation as a back-office issue are behind.',
            'what_it_means': 'Content framing, metadata, and category clarity now affect distribution quality.',
            'how_to_use': 'Audit client hooks, captions, and thumbnails for terms or visuals that can create avoidable ambiguity.',
            'angle': 'The new operator move is making content legible to the algorithm and credible to the audience at the same time.'
        },
        {
            'title': 'Signal 02 — Organic content is being benchmarked against paid-grade creative systems',
            'summary': 'Meta is blending AI creative tools, creator matching, translation, and video generation into one workflow. The expectation of content quality and adaptability is rising.',
            'what_it_means': 'Even purely organic teams are competing in an environment shaped by faster, more modular creative production.',
            'how_to_use': 'Design content in reusable parts: hook, proof, CTA, asset bank, testimonial cut, and localized variant.',
            'angle': 'The team with the better content system beats the team with the prettier post.'
        },
        {
            'title': 'Signal 03 — Calendar intelligence matters more than content volume',
            'summary': 'The expansion of cultural-moment inventory signals that relevance windows are becoming more monetizable and more measurable.',
            'what_it_means': 'Posting consistently is table stakes. Showing up at the right moment with the right angle is where outsized leverage lives.',
            'how_to_use': 'Give every client a 30-day moment map: launches, seasonal tension, buying triggers, and cultural events relevant to their niche.',
            'angle': 'Consistency builds presence. Precision builds spikes.'
        },
        {
            'title': 'Signal 04 — Creator infrastructure is becoming a stronger commerce channel than brand pages',
            'summary': 'Instagram is testing more direct-response features on creator accounts first, while improving creator-brand matching on the paid side.',
            'what_it_means': 'Creators and founders are increasingly the conversion layer, not just the awareness layer.',
            'how_to_use': 'Treat creator partnerships as distribution assets with measurable downstream value, not as optional brand fluff.',
            'angle': 'If the platform gives creators the sharpest tools, brands should stop insisting on doing everything from their own handle.'
        },
        {
            'title': 'Signal 05 — Platform automation is commoditizing optimization work',
            'summary': 'As ranking and delivery systems get better, the premium moves away from dashboard babysitting and toward strategic judgment.',
            'what_it_means': 'The agency advantage is no longer “we know which button to press.” It is “we know what message deserves distribution.”',
            'how_to_use': 'Refocus client reporting around hook quality, lead quality, retention, saves, shares, and assisted conversions.',
            'angle': 'Operator value is shifting from execution mechanics to decision quality.'
        },
        {
            'title': 'Signal 06 — Native feature depth is still an underused moat',
            'summary': 'Mosseri’s creator education push is a reminder that most brands barely use the product they post on. Underused native tools still create easy differentiation.',
            'what_it_means': 'Many teams are leaving reach and retention on the table by ignoring collaborative posts, native stickers, remix behavior, polls, notes, or built-in edit features.',
            'how_to_use': 'Run one “native feature sprint” per client this month: test one underused feature and measure watch time, shares, replies, or DM volume.',
            'angle': 'The moat is often not a secret tactic. It is simply using the platform more completely than everyone else.'
        },
    ],
    'ai_tip': {
        'title': 'Build one weekly source pack, then auto-convert it into nine client angles',
        'what_it_is': 'Instead of researching separately for every client, create one weekly source pack with 5 to 8 articles, platform notes, founder opinions, and internal observations. Then use a structured prompt to translate the same inputs into account-specific hooks, POVs, and scripts by funnel stage.',
        'steps': [
            'Drop all weekly research into one document with three labels per item: platform shift, buyer behavior, and tactical implication.',
            'Ask the model to produce one angle per client using a fixed output: hook, insight, why-now, script direction, CTA, and funnel stage.',
            'Run a second pass that removes generic phrasing and forces each angle to tie back to the client’s positioning or buying friction.',
            'Export the final outputs into a reusable internal ideation sheet so account managers start with drafts instead of blank pages.'
        ],
        'result': 'You turn research into a reusable operating asset. That cuts ideation time, sharpens strategic consistency, and makes it easier to give every client a timely point of view without reinventing the wheel every Monday.'
    },
    'account_managers': [
        {
            'name': 'Riley Walker',
            'avatar': 'R',
            'clients': [
                {
                    'name': 'SKIN BY BROWNLEE', 'handle': '@skinbybrownlee', 'stage': 'MOFU', 'stage_class': 'mofu',
                    'play_title': '“Why Your Acne Content Isn’t Helping — It’s Making People More Confused”',
                    'play_why': 'This reframes Skin by Brownlee as the adult in the room. Most acne content creates product chaos. This angle positions consultation and diagnosis as the real value, not another viral recommendation.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“The reason your acne isn’t getting better might not be your skin. It might be the advice you’re following.”', 'On-Screen: “Your acne advice might be the problem” | B-Roll: creator holding 4 to 5 products | Audio: direct, clinical opener'),
                        ('📍 Context (3–15s)', '“Most acne content online gives you one product, one hack, or one ingredient and acts like it works for everyone. It doesn’t. Different acne types need different treatment paths.”', 'On-Screen: “One-size-fits-all skincare is the lie” | B-Roll: shelf of products, scroll through skincare Reels'),
                        ('⚡ Conflict (15–30s)', '“When you layer random viral recommendations together, you end up inflaming your barrier, confusing your skin, and wasting months on trial and error. More products does not equal better treatment.”', 'On-Screen: “More products. More confusion.” | B-Roll: irritated skin closeups, product layering | Audio: rising authority'),
                        ('🔄 Turning Point (30–48s)', '“What actually works is understanding what kind of breakout you have, what your skin can tolerate, and what order to treat it in. That’s where real progress starts.”', 'On-Screen: “Diagnosis before products” | B-Roll: consultation footage, treatment planning'),
                        ('✅ Resolution + CTA (48–60s)', '“If you’re tired of guessing, book a consultation and let’s build a plan that fits your skin instead of the algorithm. CTA Type: Consultation inquiry | Funnel Stage: MOFU.”', 'On-Screen: “Book your skin consult” | Audio: confident close')
                    ]
                },
                {
                    'name': 'LAUNCH PARTY', 'handle': '@shopthelaunchparty', 'stage': 'TOFU', 'stage_class': 'tofu',
                    'play_title': '“The Beauty Brands Winning Right Now All Do This One Thing”',
                    'play_why': 'Strong curator positioning play. It lets Launch Party comment on market behavior rather than only showcase products, which is better for authority and shareability.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“The beauty brands people actually stay loyal to are not the ones with the loudest marketing. They’re the ones with the clearest point of view.”', 'On-Screen: “The best beauty brands have a POV” | B-Roll: shelf pan, founder clips | Audio: confident, editorial'),
                        ('📍 Context (3–15s)', '“The market is crowded. Everyone says clean, effective, elevated, intentional. Those words mean nothing if the product experience and brand philosophy don’t match.”', 'On-Screen: “Pretty branding is not enough” | B-Roll: packaging shots, website scrolls'),
                        ('⚡ Conflict (15–30s)', '“That’s why so many products get bought once and forgotten. They look good, but there’s no trust, no differentiation, and no reason to come back.”', 'On-Screen: “Bought once. Never rebought.” | B-Roll: half-used products, cluttered vanity | Audio: tension builds'),
                        ('🔄 Turning Point (30–48s)', '“At Launch Party, we look for brands with substance: formula quality, founder intent, ingredient clarity, and a reason to exist beyond aesthetics. That’s what earns repeat attention.”', 'On-Screen: “What we actually look for” | B-Roll: product curation, store edit montage'),
                        ('✅ Resolution + CTA (48–60s)', '“If you want products with real staying power, start with our edit. CTA Type: Product discovery | Funnel Stage: TOFU.”', 'On-Screen: “Shop the curated edit” | Audio: polished close')
                    ]
                },
                {
                    'name': 'MEAS ACTIVE', 'handle': '@measactive', 'stage': 'MOFU', 'stage_class': 'mofu',
                    'play_title': '“Why Most Activewear Brands Design for Content, Not Real Life”',
                    'play_why': 'Sharp positioning. It separates MEAS from commodity athleisure by attacking a visible market weakness: outfits that look good in a mirror but fail in real use.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“Most activewear is designed to look good in a post, not hold up in your actual day.”', 'On-Screen: “Designed for content. Not for life.” | B-Roll: creator adjusting cheap set | Audio: blunt opener'),
                        ('📍 Context (3–15s)', '“The market is full of matching sets that photograph well, then stretch out, slide down, or feel wrong the second you leave the house.”', 'On-Screen: “Looks good for 8 seconds” | B-Roll: mirror selfie to real-life movement'),
                        ('⚡ Conflict (15–30s)', '“That’s the problem with trend-first design. It optimizes for first impression, not repeat wear. And if you won’t reach for it three times a week, it isn’t premium. It’s just expensive.”', 'On-Screen: “If you don’t rewear it, it failed” | B-Roll: fabric, waistband, seam details | Audio: escalating conviction'),
                        ('🔄 Turning Point (30–48s)', '“MEAS is built around versatility. Pieces that move well, hold shape, and still feel right outside the gym. That’s what modern activewear should do.”', 'On-Screen: “Versatility is the standard” | B-Roll: gym to coffee to street transitions'),
                        ('✅ Resolution + CTA (48–60s)', '“If your set only works on camera, it’s not enough. CTA Type: Product consideration | Funnel Stage: MOFU.”', 'On-Screen: “Shop pieces built for real life” | Audio: confident close')
                    ]
                }
            ]
        },
        {
            'name': 'Emily Krintz',
            'avatar': 'E',
            'clients': [
                {
                    'name': 'OMBRE GALLERY', 'handle': '@ombregallery', 'stage': 'MOFU', 'stage_class': 'mofu',
                    'play_title': '“Why the Story Behind the Piece Changes What It’s Worth”',
                    'play_why': 'This removes one of the biggest blockers in art buying: emotional distance. It shifts the conversation from price to meaning.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“Two pieces can cost the same and feel completely different. The difference is usually the story.”', 'On-Screen: “Story changes value” | B-Roll: two framed works side by side | Audio: calm, elevated'),
                        ('📍 Context (3–15s)', '“Most galleries show the final result, but not the process, tension, or human intention behind it. So buyers are left judging art on surface alone.”', 'On-Screen: “No story = shallow connection” | B-Roll: sterile gallery wall'),
                        ('⚡ Conflict (15–30s)', '“When the story is missing, price feels arbitrary. When the artist feels invisible, the work feels decorative instead of personal.”', 'On-Screen: “If it feels random, it won’t sell” | B-Roll: detail shots, empty white wall energy | Audio: reflective tension'),
                        ('🔄 Turning Point (30–48s)', '“That’s why we bring people into the process: the references, the materials, the decisions, the artist behind the piece. Context creates connection.”', 'On-Screen: “Context creates connection” | B-Roll: artist studio, sketchbook, gallery install'),
                        ('✅ Resolution + CTA (48–60s)', '“If you want to collect work that actually means something to you, start with the story. CTA Type: Collection exploration | Funnel Stage: MOFU.”', 'On-Screen: “Explore the current collection” | Audio: warm close')
                    ]
                },
                {
                    'name': 'DEFINE OAKLEY', 'handle': '@defineoakley', 'stage': 'BOFU', 'stage_class': 'bofu',
                    'play_title': '“The Workout Mistake That Keeps Women Stuck in the ‘Working Hard, Not Seeing Change’ Loop”',
                    'play_why': 'This hits a familiar frustration and converts it into a class invitation. It is strong because it names the plateau clearly and positions DEFINE as the smarter alternative.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“If you’re working out consistently and still not seeing the shape or strength you want, the issue might be your training style.”', 'On-Screen: “Working hard. Still stuck?” | B-Roll: woman finishing workout, frustrated expression | Audio: direct opener'),
                        ('📍 Context (3–15s)', '“A lot of women are doing more intensity, more sweat, more output and assuming that means better results. But more stress is not always better training.”', 'On-Screen: “More intensity ≠ better outcome” | B-Roll: HIIT snippets, fatigue visuals'),
                        ('⚡ Conflict (15–30s)', '“When every workout is built around burnout, your form drops, recovery suffers, and the muscles you actually want to target never get enough precise tension.”', 'On-Screen: “Burnout is not strategy” | B-Roll: rushed reps, poor form comparison | Audio: authority builds'),
                        ('🔄 Turning Point (30–48s)', '“DEFINE is built around controlled resistance, alignment, and consistency. That’s how you create shape, stability, and results that actually last.”', 'On-Screen: “Precision changes the body” | B-Roll: instructor cueing, class control shots'),
                        ('✅ Resolution + CTA (48–60s)', '“If you’re done confusing exhaustion with progress, come take a class. CTA Type: Free class booking | Funnel Stage: BOFU.”', 'On-Screen: “Book your first class” | Audio: energizing close')
                    ]
                }
            ]
        },
        {
            'name': 'Rachel Dina',
            'avatar': 'R',
            'clients': [
                {
                    'name': 'LANE & KATE', 'handle': '@laneandkate', 'stage': 'MOFU', 'stage_class': 'mofu',
                    'play_title': '“The Best Custom Jewelry Starts With a Feeling, Not a Design”',
                    'play_why': 'This lowers the barrier for people who want something custom but feel underprepared. It makes the entry point feel emotionally intuitive instead of technically intimidating.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“You do not need a finished sketch to start custom jewelry. Honestly, that’s usually not how the best pieces begin.”', 'On-Screen: “You don’t need a sketch” | B-Roll: ring box, inspiration images | Audio: elegant opener'),
                        ('📍 Context (3–15s)', '“Most people think they need to come in with every detail figured out: shape, stone, metal, exact reference. That’s what stops them from ever starting.”', 'On-Screen: “Perfection is the blocker” | B-Roll: overwhelmed browsing, screenshots'),
                        ('⚡ Conflict (15–30s)', '“But custom is not about having the answer. It’s about translating meaning into a piece. If you wait until everything feels certain, you usually wait too long.”', 'On-Screen: “Meaning first. Specs second.” | B-Roll: consultation notes, heirloom references | Audio: thoughtful tension'),
                        ('🔄 Turning Point (30–48s)', '“At Lane & Kate, the starting point can be a story, a memory, a stone you love, or even a vibe. We help shape the rest from there.”', 'On-Screen: “Bring the feeling. We build the piece.” | B-Roll: design process, wax mold, final jewelry shot'),
                        ('✅ Resolution + CTA (48–60s)', '“If you’ve been sitting on an idea, that’s enough to start. CTA Type: Consultation inquiry | Funnel Stage: MOFU.”', 'On-Screen: “Book your custom consult” | Audio: refined close')
                    ]
                },
                {
                    'name': 'UP & RUNNING', 'handle': '@upandrunningkc', 'stage': 'TOFU', 'stage_class': 'tofu',
                    'play_title': '“The Real Reason ‘Best Running Shoe’ Lists Keep Letting You Down”',
                    'play_why': 'Authority-building education. It attacks the lazy buying behavior that leads to injury and creates a clear reason to visit the store in person.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“The best running shoe on the internet might be the worst running shoe for your body.”', 'On-Screen: “Best for them ≠ best for you” | B-Roll: shoe review list on phone | Audio: punchy opener'),
                        ('📍 Context (3–15s)', '“People buy shoes from top-ten lists, influencer reviews, or whatever colorway they like best. None of that tells you how your body actually moves.”', 'On-Screen: “Lists don’t know your gait” | B-Roll: online shopping, unboxing'),
                        ('⚡ Conflict (15–30s)', '“That’s how runners end up in shoes that feel fine for a week, then create shin pain, knee pain, or constant fatigue because the support profile is wrong from the start.”', 'On-Screen: “Wrong shoe. Predictable pain.” | B-Roll: runner discomfort, gait slow-motion | Audio: tension rises'),
                        ('🔄 Turning Point (30–48s)', '“A gait analysis solves that. We see how you move, what you need, and what shoe actually matches your stride instead of the hype cycle.”', 'On-Screen: “Match the shoe to the stride” | B-Roll: in-store treadmill, fitting process'),
                        ('✅ Resolution + CTA (48–60s)', '“Stop shopping for recommendations. Start shopping for your body. CTA Type: In-store visit | Funnel Stage: TOFU.”', 'On-Screen: “Get your free gait analysis” | Audio: energetic close')
                    ]
                },
                {
                    'name': 'HOLOS HOUSE', 'handle': '@holoshouse', 'stage': 'TOFU', 'stage_class': 'tofu',
                    'play_title': '“Why Wellness Content Feels Empty Right Now”',
                    'play_why': 'This gives Holos House a philosophical lane instead of another generic wellness montage. It is stronger positioning than talking about routines alone.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“A lot of wellness content looks beautiful and changes absolutely nothing about how people live.”', 'On-Screen: “Pretty wellness. Empty impact.” | B-Roll: polished routine clips | Audio: calm but sharp'),
                        ('📍 Context (3–15s)', '“The category is overloaded with morning routines, supplements, matcha, and aesthetics. It all looks intentional, but most of it is still surface-level consumption.”', 'On-Screen: “Wellness became content” | B-Roll: routine montage, aesthetic shelves'),
                        ('⚡ Conflict (15–30s)', '“That’s the problem. If wellness stays at the level of products and rituals, it never becomes a way of living. It stays performative.”', 'On-Screen: “If it’s only aesthetic, it won’t last” | B-Roll: contrast between ritual and real environment | Audio: conviction builds'),
                        ('🔄 Turning Point (30–48s)', '“Holos House is about building an environment, a community, and a rhythm of life that supports your well-being beyond one routine or one purchase.”', 'On-Screen: “Environment > checklist” | B-Roll: community, space, thoughtful lifestyle footage'),
                        ('✅ Resolution + CTA (48–60s)', '“If you want a deeper version of wellness, start there. CTA Type: Brand exploration | Funnel Stage: TOFU.”', 'On-Screen: “Explore Holos House” | Audio: warm close')
                    ]
                },
                {
                    'name': 'SCROLL MEDIA', 'handle': '@getscrollmedia', 'stage': 'TOFU', 'stage_class': 'tofu',
                    'play_title': '“Content Teams Don’t Need More Ideas. They Need Better Filters.”',
                    'play_why': 'This is a strong Scroll Media authority play because it frames the problem upstream. It appeals to founders drowning in output and positions Scroll as the operator that clarifies what deserves to exist.',
                    'beats': [
                        ('🎣 Hook (0–3s)', '“Most brands do not have an idea problem. They have a filtering problem.”', 'On-Screen: “Not an idea problem. A filter problem.” | B-Roll: crowded content board, messy doc | Audio: sharp opener'),
                        ('📍 Context (3–15s)', '“There’s no shortage of content ideas. Trending audio, FAQs, testimonials, behind-the-scenes, founder POVs. The issue is that most teams have no standard for deciding what actually matters.”', 'On-Screen: “Too many ideas. No decision system.” | B-Roll: chaotic planning session'),
                        ('⚡ Conflict (15–30s)', '“So they create volume without leverage. Posts go out, calendars get filled, and nothing compounds because the content was never tied to positioning, buyer intent, or revenue logic.”', 'On-Screen: “Output without leverage” | B-Roll: content calendar, low-signal analytics | Audio: conviction builds'),
                        ('🔄 Turning Point (30–48s)', '“The right filter is simple: does this move broad reach, qualified trust, or high-intent conversion? If not, it probably doesn’t deserve to get made.”', 'On-Screen: “Broad. Qualified. High Intent.” | B-Roll: funnel mapping, strategy doc'),
                        ('✅ Resolution + CTA (48–60s)', '“That’s how we build content systems that actually compound. CTA Type: Discovery call | Funnel Stage: TOFU.”', 'On-Screen: “Build a smarter content system” | Audio: confident close')
                    ]
                }
            ]
        }
    ],
    'formats': {
        'trending': [
            {
                'title': 'The Calendar-Tension Reel',
                'why': 'Hook a real upcoming moment — launch, seasonal shift, live event, or buying deadline — then explain why the audience should care now. Strong because urgency is native to the concept.',
                'application': 'Use for DEFINE, Up & Running, and Launch Party around events, launches, or habit-reset windows.'
            },
            {
                'title': 'The Category Myth Breakdown',
                'why': 'Start by naming the widely accepted lie in the category, then dismantle it with one clear argument. This structure earns saves, shares, and comments because it attacks default thinking.',
                'application': 'Use for Skin by Brownlee, Holos House, Scroll Media, and MEAS.'
            }
        ],
        'original': [
            {
                'title': 'The Operator Screen Recording',
                'why': 'Narrate a real behind-the-scenes workflow on screen — a fitting, consultation, curation process, strategy board, or artist review. This builds trust because the audience sees judgment in action.',
                'application': 'Best for Scroll Media, Ombre Gallery, Lane & Kate, and Up & Running.'
            },
            {
                'title': 'The Decision Audit',
                'why': 'Take one choice buyers commonly make badly and explain the 3 criteria that should actually guide it. It is simple, educational, and naturally conversion-adjacent.',
                'application': 'Best for DEFINE, Launch Party, Skin by Brownlee, and Lane & Kate.'
            }
        ]
    }
}


def stage_label(stage):
    return f'<span class="stage stage-{escape(report_stage_class(stage))}">{escape(stage)}</span>'


def report_stage_class(stage):
    return stage.lower()


def render_update_card(item):
    return f"""
    <article class=\"card\">
      <div class=\"card-meta\">Instagram Update</div>
      <h3>{escape(item['title'])}</h3>
      <p>{escape(item['summary'])}</p>
      <div class=\"takeaways\">
        <div><strong>What it means:</strong> {escape(item['what_it_means'])}</div>
        <div><strong>How to use it:</strong> {escape(item['how_to_use'])}</div>
        <div><strong>The angle:</strong> {escape(item['angle'])}</div>
      </div>
      <div class=\"source\">Source: <a href=\"{escape(item['source_url'])}\" target=\"_blank\">{escape(item['source_name'])}</a></div>
    </article>
    """


def render_signal_card(item):
    return f"""
    <article class=\"card\">
      <div class=\"card-meta\">Strategy Signal</div>
      <h3>{escape(item['title'])}</h3>
      <p>{escape(item['summary'])}</p>
      <div class=\"takeaways\">
        <div><strong>What it means:</strong> {escape(item['what_it_means'])}</div>
        <div><strong>How to use it:</strong> {escape(item['how_to_use'])}</div>
        <div><strong>The angle:</strong> {escape(item['angle'])}</div>
      </div>
    </article>
    """


def render_ai_tip(ai):
    steps = ''.join(f'<li>{escape(step)}</li>' for step in ai['steps'])
    return f"""
    <section class=\"section\" id=\"ai\">
      <div class=\"section-label\"><span>03</span><span>This Week in AI</span></div>
      <h2>This Week in AI</h2>
      <div class=\"tip-card\">
        <div class=\"tip-badge\">This Week’s Tip</div>
        <h3>{escape(ai['title'])}</h3>
        <div class=\"tip-grid\">
          <div>
            <h4>What It Is</h4>
            <p>{escape(ai['what_it_is'])}</p>
          </div>
          <div>
            <h4>The Result</h4>
            <p>{escape(ai['result'])}</p>
          </div>
        </div>
        <h4>How to Use It This Week</h4>
        <ol class=\"steps\">{steps}</ol>
      </div>
    </section>
    """


def render_client(client):
    beats = ''.join(
        f'''<div class="beat"><div class="beat-label">{escape(label)}</div><div class="beat-spoken">{escape(spoken)}</div><div class="beat-direction">{escape(direction)}</div></div>'''
        for label, spoken, direction in client['beats']
    )
    return f"""
    <article class=\"client-card\">
      <div class=\"client-top\">
        <div>
          <div class=\"client-name\">{escape(client['name'])}</div>
          <div class=\"client-handle\">{escape(client['handle'])}</div>
        </div>
        <span class=\"stage stage-{escape(client['stage_class'])}\">{escape(client['stage'])}</span>
      </div>
      <div class=\"play\">
        <div class=\"play-label\">This Week’s Play</div>
        <h4>{escape(client['play_title'])}</h4>
        <p>{escape(client['play_why'])}</p>
      </div>
      <div class=\"script\">{beats}</div>
    </article>
    """


def render_am(am):
    clients_html = ''.join(render_client(c) for c in am['clients'])
    return f"""
    <section class=\"am-section\">
      <div class=\"am-head\">
        <div class=\"am-avatar\">{escape(am['avatar'])}</div>
        <div>
          <div class=\"am-name\">{escape(am['name'])}</div>
          <div class=\"am-role\">Account Manager</div>
        </div>
        <div class=\"am-count\">{len(am['clients'])} Clients</div>
      </div>
      <div class=\"client-grid\">{clients_html}</div>
    </section>
    """


def render_format_card(item, tag):
    return f"""
    <article class=\"format-card\">
      <div class=\"card-meta\">{escape(tag)}</div>
      <h3>{escape(item['title'])}</h3>
      <p><strong>Why it works:</strong> {escape(item['why'])}</p>
      <p><strong>Best applications:</strong> {escape(item['application'])}</p>
    </article>
    """


updates_html = ''.join(render_update_card(u) for u in report['updates'])
signals_html = ''.join(render_signal_card(s) for s in report['signals'])
aims_html = render_ai_tip(report['ai_tip'])
ams_html = ''.join(render_am(am) for am in report['account_managers'])
formats_trending = ''.join(render_format_card(f, 'Trending Now') for f in report['formats']['trending'])
formats_original = ''.join(render_format_card(f, 'Original Format') for f in report['formats']['original'])

html = f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>{escape(report['title'])}</title>
  <meta name=\"description\" content=\"{escape(report['description'])}\" />
  <link rel=\"icon\" type=\"image/png\" href=\"{escape(report['favicon'])}\" />
  <style>
    :root {{
      --bg:#0b0d12;
      --panel:#121722;
      --panel-2:#171d2a;
      --line:#263149;
      --text:#f5f7fb;
      --muted:#a9b3c7;
      --blue:#0c3387;
      --blue-2:#153f9e;
      --lime:#e2ed7a;
      --shadow:#151516;
      --tofu:#7dd3fc;
      --mofu:#c4b5fd;
      --bofu:#86efac;
      --max:1180px;
    }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; background:radial-gradient(circle at top, #102044 0%, var(--bg) 42%); color:var(--text); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height:1.5; }}
    a {{ color:var(--lime); text-decoration:none; }}
    a:hover {{ text-decoration:underline; }}
    .wrap {{ max-width:var(--max); margin:0 auto; padding:32px 20px 80px; }}
    .nav {{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:28px; }}
    .brand {{ display:flex; flex-direction:column; }}
    .brand-word {{ font-size:30px; font-weight:900; letter-spacing:-1px; text-transform:lowercase; }}
    .brand-sub {{ color:var(--muted); font-size:14px; }}
    .nav-links {{ display:flex; flex-wrap:wrap; gap:10px; }}
    .pill {{ border:1px solid rgba(226,237,122,.18); background:rgba(226,237,122,.08); color:var(--lime); padding:8px 12px; border-radius:999px; font-size:13px; }}
    .hero {{ background:linear-gradient(135deg, rgba(12,51,135,.96), rgba(21,23,34,.94)); border:1px solid rgba(203,233,255,.14); border-radius:24px; padding:34px; box-shadow:0 20px 70px rgba(0,0,0,.35); margin-bottom:28px; }}
    .eyebrow {{ color:var(--lime); font-weight:700; text-transform:uppercase; letter-spacing:.14em; font-size:12px; }}
    h1 {{ margin:10px 0 12px; font-size:clamp(36px, 6vw, 64px); line-height:1.02; letter-spacing:-.04em; max-width:850px; }}
    .hero p {{ max-width:860px; font-size:18px; color:#d9e3f5; margin:0 0 18px; }}
    .hero-meta {{ display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }}
    .hero-stat {{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:10px 14px; font-size:14px; color:#d7def1; }}
    .section {{ margin-top:44px; }}
    .section-label {{ display:flex; gap:12px; align-items:center; color:var(--lime); font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; margin-bottom:12px; }}
    .section h2 {{ font-size:36px; line-height:1.05; margin:0 0 10px; letter-spacing:-.03em; }}
    .section-intro {{ max-width:880px; color:var(--muted); font-size:16px; margin:0 0 24px; }}
    .grid {{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:18px; }}
    .card, .tip-card, .client-card, .format-card {{ background:linear-gradient(180deg, rgba(23,29,42,.98), rgba(18,23,34,.98)); border:1px solid var(--line); border-radius:20px; padding:22px; box-shadow:0 16px 40px rgba(0,0,0,.18); }}
    .card-meta {{ color:var(--lime); font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; margin-bottom:10px; }}
    .card h3, .tip-card h3, .format-card h3 {{ margin:0 0 10px; font-size:24px; line-height:1.12; letter-spacing:-.03em; }}
    .card p, .tip-card p, .format-card p {{ margin:0 0 14px; color:#d9dfef; }}
    .takeaways {{ display:grid; gap:10px; margin-top:16px; }}
    .takeaways div {{ background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.05); border-radius:14px; padding:12px 14px; color:#dbe2f2; }}
    .source {{ margin-top:16px; font-size:14px; color:var(--muted); }}
    .tip-badge {{ display:inline-flex; padding:8px 12px; border-radius:999px; background:rgba(226,237,122,.12); color:var(--lime); border:1px solid rgba(226,237,122,.22); font-size:12px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; }}
    .tip-grid {{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin:18px 0; }}
    .tip-grid h4, .tip-card h4 {{ margin:0 0 8px; font-size:16px; color:#ffffff; }}
    .steps {{ margin:8px 0 0; padding-left:22px; color:#dbe2f2; }}
    .steps li {{ margin-bottom:10px; }}
    .am-section {{ margin-top:28px; }}
    .am-head {{ display:flex; align-items:center; gap:14px; margin-bottom:18px; padding:16px 18px; background:rgba(255,255,255,.03); border:1px solid var(--line); border-radius:18px; }}
    .am-avatar {{ width:46px; height:46px; border-radius:50%; display:grid; place-items:center; background:var(--blue); color:#fff; font-weight:900; font-size:20px; }}
    .am-name {{ font-size:22px; font-weight:800; letter-spacing:-.02em; }}
    .am-role, .am-count {{ color:var(--muted); font-size:14px; }}
    .am-count {{ margin-left:auto; }}
    .client-grid {{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:18px; }}
    .client-top {{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }}
    .client-name {{ font-size:20px; font-weight:800; letter-spacing:-.02em; }}
    .client-handle {{ color:var(--muted); font-size:14px; }}
    .stage {{ display:inline-flex; padding:7px 12px; border-radius:999px; font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; border:1px solid transparent; }}
    .stage-tofu {{ color:var(--tofu); background:rgba(125,211,252,.08); border-color:rgba(125,211,252,.2); }}
    .stage-mofu {{ color:var(--mofu); background:rgba(196,181,253,.08); border-color:rgba(196,181,253,.2); }}
    .stage-bofu {{ color:var(--bofu); background:rgba(134,239,172,.08); border-color:rgba(134,239,172,.2); }}
    .play {{ background:rgba(12,51,135,.18); border:1px solid rgba(203,233,255,.1); border-radius:16px; padding:16px; margin-bottom:16px; }}
    .play-label {{ color:var(--lime); font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; margin-bottom:8px; }}
    .play h4 {{ margin:0 0 8px; font-size:22px; line-height:1.15; letter-spacing:-.03em; }}
    .play p {{ margin:0; color:#dbe2f2; }}
    .script {{ display:grid; gap:12px; }}
    .beat {{ background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.05); border-radius:16px; padding:14px; }}
    .beat-label {{ color:var(--lime); font-size:13px; font-weight:800; margin-bottom:8px; }}
    .beat-spoken {{ margin-bottom:8px; color:#fff; }}
    .beat-direction {{ color:var(--muted); font-size:14px; }}
    .format-wrap {{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:18px; }}
    .footer {{ margin-top:46px; padding-top:22px; border-top:1px solid var(--line); color:var(--muted); display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; font-size:14px; }}
    @media (max-width: 900px) {{
      .grid, .client-grid, .tip-grid, .format-wrap {{ grid-template-columns:1fr; }}
      .nav {{ flex-direction:column; align-items:flex-start; }}
      .am-head {{ align-items:flex-start; flex-wrap:wrap; }}
      .am-count {{ margin-left:0; }}
      .hero {{ padding:24px; }}
    }}
  </style>
</head>
<body>
  <div class=\"wrap\">
    <div class=\"nav\">
      <div class=\"brand\">
        <div class=\"brand-word\">scroll media</div>
        <div class=\"brand-sub\">The Scroll Report</div>
      </div>
      <div class=\"nav-links\">
        <a class=\"pill\" href=\"#updates\">Instagram Updates</a>
        <a class=\"pill\" href=\"#signals\">Strategy Signals</a>
        <a class=\"pill\" href=\"#ai\">This Week in AI</a>
        <a class=\"pill\" href=\"#ideation\">Client Ideation</a>
        <a class=\"pill\" href=\"#formats\">Formats to Test</a>
      </div>
    </div>

    <section class=\"hero\">
      <div class=\"eyebrow\">Weekly Internal Brief</div>
      <h1>The Scroll Report</h1>
      <p>This week’s edge is not more posting. It is cleaner positioning, safer distribution inputs, better timing, and stronger creator-led conversion thinking. Meta keeps automating delivery. That means the premium on strategy just went up again.</p>
      <div class=\"hero-meta\">
        <div class=\"hero-stat\">{escape(report['date_long'])}</div>
        <div class=\"hero-stat\">4 Instagram updates</div>
        <div class=\"hero-stat\">6 strategy signals</div>
        <div class=\"hero-stat\">9 client plays</div>
        <div class=\"hero-stat\">2 trending + 2 original formats</div>
      </div>
    </section>

    <section class=\"section\" id=\"updates\">
      <div class=\"section-label\"><span>01</span><span>Notable Instagram Updates</span></div>
      <h2>Notable Instagram Updates</h2>
      <p class=\"section-intro\">The important pattern this week: Instagram is tightening distribution rules around safety while simultaneously making culture-timed, creator-style, and conversion-oriented media more scalable.</p>
      <div class=\"grid\">{updates_html}</div>
    </section>

    <section class=\"section\" id=\"signals\">
      <div class=\"section-label\"><span>02</span><span>Content Strategy Signals</span></div>
      <h2>Content Strategy Signals</h2>
      <p class=\"section-intro\">What matters now is not another generic best practice list. It is understanding where platform direction, buyer behavior, and Scroll’s operating model are converging.</p>
      <div class=\"grid\">{signals_html}</div>
    </section>

    {aims_html}

    <section class=\"section\" id=\"ideation\">
      <div class=\"section-label\"><span>04</span><span>Client Ideation</span></div>
      <h2>Client Ideation</h2>
      <p class=\"section-intro\">One actionable content play per active client. Each script is designed to sharpen positioning, create a clear reaction, and move the audience to the next logical step in the funnel.</p>
      {ams_html}
    </section>

    <section class=\"section\" id=\"formats\">
      <div class=\"section-label\"><span>05</span><span>Creative Lab</span></div>
      <h2>Formats to Test</h2>
      <p class=\"section-intro\">Two bets for right now and two formats worth making your own. Use these as structures, not scripts.</p>
      <div class=\"format-wrap\">{formats_trending}{formats_original}</div>
    </section>

    <div class=\"footer\">
      <div>Prepared for Scroll Media internal use.</div>
      <div>Week of April 13, 2026</div>
    </div>
  </div>
</body>
</html>
"""

OUT.write_text(html, encoding='utf-8')
print(f'Wrote {OUT}')
