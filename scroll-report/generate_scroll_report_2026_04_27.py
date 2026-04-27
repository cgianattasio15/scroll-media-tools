"""
Generate The Scroll Report — Week of April 27, 2026
Uses the same design system as the April 20 report.
"""
from pathlib import Path
from html import escape

OUT = Path('/home/ubuntu/scroll-media-tools/scroll-report/scroll-report-2026-04-27.html')

# Load CSS from April 20 report
april20 = open('/home/ubuntu/scroll-media-tools/scroll-report/scroll-report-2026-04-20.html').read()
css_start = april20.find('<style>')
css_end = april20.find('</style>') + 8
CSS_BLOCK = april20[css_start:css_end]

# Load the head block (everything before <style>) from April 20
head_before_style = april20[:css_start]
# Find the closing </head> after the style block
head_after_style_start = css_end
head_after_style_end = april20.find('</head>') + 7
HEAD_AFTER_CSS = april20[head_after_style_start:head_after_style_end]

# Load the nav block from April 20
nav_start = april20.find('<nav class="nav">')
nav_end = april20.find('</nav>') + 6
NAV_BLOCK = april20[nav_start:nav_end]

# ─── CONTENT DATA ──────────────────────────────────────────────────────────────

DATE_LONG  = 'Week of April 27, 2026'
DATE_SHORT = 'Apr 27, 2026'

UPDATES = [
    {
        'tag': 'Insights & Analytics',
        'title': 'Instagram Improves Insights UI & Adds Skip Rate Data',
        'body': 'Instagram overhauled its Insights interface with new tabs for engagement activity and audience demographics. Most importantly, it added <strong>share rate and skip rate percentage data</strong>, plus views-over-time tracking to understand content longevity. Currently available for individual posts and Reels.',
        'takeaways': [
            ('What it means', 'Share rate and skip rate are now visible — this is a direct signal about what content people find worth passing on vs. what they scroll past. Skip rate is essentially a "hook failure" metric.'),
            ('How to use it', 'Teams that track skip rate weekly will iterate faster than those who only watch likes. Any Reel with a skip rate above the client average should trigger a hook audit — not a content audit.'),
            ('The angle', 'The problem is almost always the first 2 seconds. Now you have the data to prove it.'),
        ],
        'sources': [
            ('Social Media Today', 'https://www.socialmediatoday.com/news/instagram-improves-insights-ui-adds-new-metrics/818504/'),
        ],
        'featured': True,
    },
    {
        'tag': 'Creator Tools',
        'title': 'Instagram Brings AI Video Generation to Edits',
        'body': 'Instagram added in-stream AI video generation to Edits. Users can now generate video clips from text prompts, images, or existing videos directly inside the app — no recording required. Tap plus → AI → enter description or add photos/videos.',
        'takeaways': [
            ('What it means', 'This lowers the floor for video production. The risk is a flood of AI slop. The opportunity is using AI-generated B-roll and transitions to speed up production while keeping the hook, POV, and story logic human.'),
            ('How to use it', 'Use AI for first-draft expansion, but force every output through a voice lock pass before it goes into production.'),
            ('The angle', 'The premium shifts further toward judgment and specificity.'),
        ],
        'sources': [
            ('Social Media Today', 'https://www.socialmediatoday.com/news/instagram-brings-simplified-ai-video-to-edits/818505/'),
        ],
        'featured': False,
    },
    {
        'tag': 'API & Integrations',
        'title': 'Meta Expands Instagram Management APIs',
        'body': 'Meta added partnership ads label support to the Instagram Content Publishing API — third-party tools can now publish paid partnership disclosures at publish time, not after. Also added new Graph API metrics: Reels reposts, saves, and shares.',
        'takeaways': [
            ('What it means', 'The partnership label change is operationally significant for agencies. Previously required a manual step after publishing. Now it\'s built into the scheduling flow.'),
            ('How to use it', 'Saves time, reduces compliance risk, and makes collab posts easier to manage at scale. Start scheduling partnership labels directly in your scheduling tool.'),
            ('The angle', 'Operational friction is being removed — making creator collaborations smoother and more scalable.'),
        ],
        'sources': [
            ('Social Media Today', 'https://www.socialmediatoday.com/news/meta-expands-instagram-management-apis/818385/'),
        ],
        'featured': False,
    },
    {
        'tag': 'Platform Strategy',
        'title': 'Meta Launches Instants as a Standalone App',
        'body': 'Meta launched "Instants" — a standalone app for disappearing, unedited photo sharing. Opens directly to camera like Snapchat. Photos viewable once, disappear after 24 hours. Tagline: "Real life, real quick." A rebranded version of "Shots" tested inside Instagram last year.',
        'takeaways': [
            ('What it means', 'Signals Meta\'s continued push toward raw/authentic content as a counterweight to polished feeds.'),
            ('How to use it', 'The existence of Instants reinforces that Instagram\'s core feed is increasingly a production environment — and that raw, unfiltered content has its own separate home.'),
            ('The angle', 'Instagram is for the polished show; Instants (and Stories) are for the raw reality.'),
        ],
        'sources': [
            ('Social Media Today', 'https://www.socialmediatoday.com/news/meta-launches-instagram-spinoff-instants-as-a-standalone-app/818389/'),
        ],
        'featured': False,
    },
]

SIGNALS = [
    {
        'title': 'Signal 01 — Creator Ad Spend Hits $37B: Creator Marketing Is Now Core Infrastructure',
        'body': 'Creator advertising reached $37.1 billion in 2025, projected $44B in 2026. Creator marketing is now classified as a "core media channel" by IAB — growing faster than the overall digital ad market.',
        'takeaways': [
            ('What it means', 'Creator-led content is no longer a supplement to paid media — it IS the media. Brands that treat social content as a secondary channel are already behind.'),
            ('How to use it', 'The infrastructure question is: how do you build creator-quality content at agency scale without losing specificity?'),
            ('The angle', 'Creator marketing is the new television.'),
        ],
    },
    {
        'title': 'Signal 02 — Skip Rate Is Now a Measurable Hook Metric',
        'body': 'Instagram is now showing skip rate percentage in Insights. This is the first time creators have a direct, quantified signal for hook failure at the post level.',
        'takeaways': [
            ('What it means', 'Every Reel now has a skip rate. Teams should establish a skip rate benchmark per client within 2 weeks.'),
            ('How to use it', 'Any Reel with a skip rate above the client average should trigger a hook audit — not a content audit. The problem is almost always the first 2 seconds.'),
            ('The angle', 'Data removes the emotion from creative feedback.'),
        ],
    },
    {
        'title': 'Signal 03 — Hashtag Reduction to 3 Accelerates Topic-Based Discovery',
        'body': 'Instagram has reduced hashtag limits from 30 to 3 for posts and Reels. This forces creators to be more intentional about topic classification. The algorithm is increasingly using "Add Topic" and content signals over hashtag stacking.',
        'takeaways': [
            ('What it means', 'Stop treating hashtags as reach tools. They\'re now topic signals. Use 1-2 highly specific hashtags that describe the content category, not the brand.'),
            ('How to use it', 'The "Add Topic" feature before publishing is now more important than any hashtag strategy.'),
            ('The angle', 'Clarity beats volume.'),
        ],
    },
    {
        'title': 'Signal 04 — LLM Visibility Is Becoming a Brand Discovery Layer',
        'body': 'AI tools (ChatGPT, Gemini, Meta AI) are increasingly used for brand discovery. LLM visibility = how often and accurately your brand appears in AI-generated answers. Brands with clear messaging, consistent information, and authority signals get mentioned more.',
        'takeaways': [
            ('What it means', 'Social content that builds authority and specificity now compounds in two ways: it builds trust with the human audience AND it feeds the training data that makes your brand more likely to appear in AI answers.'),
            ('How to use it', 'Generic content does neither. Invest in specific, authoritative, well-structured content that answers real questions.'),
            ('The angle', 'You are now optimizing for humans and LLMs simultaneously.'),
        ],
    },
    {
        'title': 'Signal 05 — Trial Reels Cap Is Now in Effect',
        'body': 'Instagram has capped the number of Trial Reels you can post within a 30-day window. Regular Reels are unaffected. The restriction only applies to the trial format.',
        'takeaways': [
            ('What it means', 'The trial Reels cap means you can no longer use trials as a volume testing mechanism.'),
            ('How to use it', 'Each trial slot should be used for a specific hypothesis — hook format, topic angle, or CTA type — not just "let\'s see what happens." Treat each trial like a controlled experiment.'),
            ('The angle', 'Scarcity forces strategy.'),
        ],
    },
    {
        'title': 'Signal 06 — Carousel Reordering After Publishing Is Now Live',
        'body': 'Instagram now lets creators reorder images/videos in a carousel after it\'s been published. Long-requested feature that removes the fear of carousel order mistakes.',
        'takeaways': [
            ('What it means', 'This opens a new optimization loop: publish a carousel, check early engagement data, reorder slides to put the highest-performing visual first.'),
            ('How to use it', 'Watch if reordering changes save/share behavior. Test and iterate on structure, not just content.'),
            ('The angle', 'Post-publish optimization is now a real lever.'),
        ],
    },
]

AI_CARDS = [
    {
        'tag': 'Workflow Tip',
        'title': 'The Skip Rate Audit — Use New Insights Data to Build a Client Hook Intelligence System',
        'body': 'Now that Instagram shows skip rate per post, teams can use AI to systematically diagnose why certain hooks fail and build a client-specific hook improvement framework. This turns a new data point into a compounding intelligence system that gets sharper every week.',
        'steps': [
            ('Pull the data', 'Pull the last 10 Reels per client from Insights. Note the skip rate for each.'),
            ('Identify failures', 'Identify the 3 Reels with the highest skip rate (worst-performing hooks).'),
            ('Feed to AI', 'Copy the first 3 seconds of each script (spoken line + on-screen text) into Claude or ChatGPT.'),
            ('Run the prompt', '"These are three Reel hooks with high skip rates. Analyze what they have in common — are they too vague, too slow, too generic, or missing a tension point? Then rewrite each with a sharper, more specific version that creates immediate curiosity or stakes."'),
            ('Build the rule', 'Use the AI\'s diagnosis to identify a pattern. Build a 1-sentence hook rule for that client. Apply it to the next 4 Reels.'),
        ],
        'prompt': '"These are three Reel hooks with high skip rates. Analyze what they have in common — are they too vague, too slow, too generic, or missing a tension point? Then rewrite each with a sharper, more specific version that creates immediate curiosity or stakes."',
        'prompt_label': 'Skip Rate Audit Prompt',
    },
    {
        'tag': 'Research Tool',
        'title': 'The Share Rate Cluster — Turn Your Best-Performing Content Into a Replication System',
        'body': 'Share rate is now visible in Insights. That means you can identify which posts people found worth passing on — and use AI to reverse-engineer what made them shareable. This is a faster path to replicating your best content than guessing from memory.',
        'steps': [
            ('Pull share rate data', 'Pull the last 30 posts per client. Sort by share rate (highest to lowest). Identify the top 5.'),
            ('Extract the pattern', 'Copy the hook, caption, and topic of each top-5 post into AI.'),
            ('Run the prompt', '"These are my 5 most-shared posts. What do they have in common? Identify the topic pattern, hook structure, and emotional trigger that made people share them."'),
            ('Build a replication brief', 'Use the AI output to create a 3-bullet brief for the next 4 posts: topic lane, hook structure, and emotional trigger to hit.'),
        ],
        'prompt': '"These are my 5 most-shared posts. What do they have in common? Identify the topic pattern, hook structure, and emotional trigger that made people share them. Then give me 3 new post concepts that follow the same pattern but cover a different specific topic."',
        'prompt_label': 'Share Rate Cluster Prompt',
    },
    {
        'tag': 'Agency Mindset',
        'title': 'The LLM Visibility Check — Use AI to Audit How Your Brand Appears in AI Search Results',
        'body': 'LLM visibility is becoming a real brand discovery layer. AI tools like ChatGPT and Gemini are being used to find service providers, agencies, and experts. The brands that appear in those answers have clear messaging, consistent information, and authority signals. Use this workflow to audit and improve your brand\'s LLM visibility.',
        'steps': [
            ('Run the discovery query', 'Ask ChatGPT or Claude: "What are the best [your category] agencies/providers in [your city/niche]?" Note whether your brand appears.'),
            ('Audit the gap', 'If you don\'t appear, ask: "What information would make [your brand name] appear in answers about [your category]?"'),
            ('Strengthen the signals', 'Ensure your website, social profiles, and content clearly state: what you do, who you serve, and what makes you different. Specificity beats generality in LLM training data.'),
            ('Create authority content', 'Publish content that directly answers the questions people ask AI about your category. This builds both human trust and LLM citation probability.'),
        ],
        'prompt': '"What are the best social media agencies for boutique, founder-led brands in [city]? What criteria would make an agency appear in this answer?"',
        'prompt_label': 'LLM Visibility Audit Prompt',
    },
]

ACCOUNT_MANAGERS = [
    {
        'name': 'Riley Walker',
        'avatar': 'R',
        'clients': [
            {
                'name': 'SKIN BY BROWNLEE',
                'handle': '@skinbybrownlee',
                'stage': 'MOFU',
                'stage_class': 'mofu',
                'play_title': '"The One Ingredient That Makes Your Barrier Worse Before It Gets Better"',
                'play_why': 'Educational content that positions the brand as an expert. Addresses a common frustration and provides clarity, building trust and driving consultation bookings.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"If your skin is burning after using this ingredient, you might be doing it wrong."', 'On-Screen: "Why your barrier is compromised" | B-Roll: applying serum | Audio: urgent, informative'),
                    ('📍 Context (0:03–0:18)', '"Retinol is amazing, but it\'s notorious for causing the \'purging\' phase. Most people panic and stop."', 'On-Screen: "The Retinol Purge explained" | B-Roll: showing redness/irritation'),
                    ('⚡ Conflict (0:18–0:32)', '"Stopping means you never get the benefits. But continuing without a buffer means you\'re just damaging your skin barrier."', 'On-Screen: "Don\'t stop, buffer." | B-Roll: mixing products | Audio: educational'),
                    ('🔄 Turning Point (0:32–0:50)', '"The secret is the sandwich method. Moisturizer, retinol, moisturizer. It dilutes the intensity without losing the efficacy."', 'On-Screen: "The Sandwich Method" | B-Roll: demonstrating the method'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Want to start a retinol journey safely? Book a consultation and we\'ll build a routine that won\'t wreck your barrier."', 'CTA Type: Consultation inquiry | Funnel Stage: MOFU'),
                ],
            },
            {
                'name': 'LAUNCH PARTY',
                'handle': '@shopthelaunchparty',
                'stage': 'TOFU',
                'stage_class': 'tofu',
                'play_title': '"Why We Rejected 90% of the Brands That Pitched Us This Month"',
                'play_why': 'Builds exclusivity and trust. Shows the curation process and highlights the high standards of the boutique. Strong shareability as an insider look.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"We said no to 90% of the brands that wanted to be on our shelves this month. Here\'s why."', 'On-Screen: "Why we say NO" | B-Roll: looking at products, shaking head | Audio: confident, insider tone'),
                    ('📍 Context (0:03–0:18)', '"Everyone claims to be clean, sustainable, and effective. But when we look at the ingredient lists, the story falls apart."', 'On-Screen: "Marketing vs. Ingredients" | B-Roll: reading labels closely'),
                    ('⚡ Conflict (0:18–0:32)', '"We refuse to stock products that look pretty but don\'t perform. Our customers trust us to do the vetting for them."', 'On-Screen: "Performance over packaging" | B-Roll: testing products | Audio: firm stance'),
                    ('🔄 Turning Point (0:32–0:50)', '"The 10% that made the cut? They have innovative formulas, transparent sourcing, and founders who actually care."', 'On-Screen: "The 10% that made it" | B-Roll: unboxing new arrivals'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Come discover the brands that actually passed our test. Shop the new curation online or in-store."', 'CTA Type: Shop New Arrivals | Funnel Stage: TOFU'),
                ],
            },
            {
                'name': 'MEAS ACTIVE',
                'handle': '@measactive',
                'stage': 'BOFU',
                'stage_class': 'bofu',
                'play_title': '"The Leggings That Won\'t Roll Down During Your Deadlifts"',
                'play_why': 'Directly addresses a massive pain point for the target audience. Focuses on product performance in a specific, relatable scenario. High purchase intent.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"If you\'re pulling up your leggings between every set of deadlifts, you\'re wearing the wrong gear."', 'On-Screen: "Stop pulling up your leggings" | B-Roll: adjusting leggings at the gym | Audio: relatable, slightly frustrated'),
                    ('📍 Context (0:03–0:18)', '"Most activewear is designed to look good standing still. But the gym isn\'t a photoshoot."', 'On-Screen: "Designed for movement, not photos" | B-Roll: posing vs. actually lifting'),
                    ('⚡ Conflict (0:18–0:32)', '"You need compression that stays put without suffocating you, and a waistband that actually respects your anatomy."', 'On-Screen: "Compression that works" | B-Roll: close up on waistband construction | Audio: technical'),
                    ('🔄 Turning Point (0:32–0:50)', '"That\'s why we engineered the Core-Lock waistband. It moves with you, breathes with you, and most importantly, stays exactly where you put it."', 'On-Screen: "The Core-Lock Waistband" | B-Roll: seamless deadlift execution'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Focus on your form, not your fit. Grab your pair of Core-Lock leggings today."', 'CTA Type: Product Purchase | Funnel Stage: BOFU'),
                ],
            },
        ],
    },
    {
        'name': 'Emily Krintz',
        'avatar': 'E',
        'clients': [
            {
                'name': 'OMBRE GALLERY',
                'handle': '@ombregallery',
                'stage': 'TOFU',
                'stage_class': 'tofu',
                'play_title': '"How to Tell if a Piece of Art Will Look Good in Your Home Before You Buy It"',
                'play_why': 'Lowers the barrier to entry for art buyers. Provides practical value while showcasing the gallery\'s expertise in curation and placement. High save rate.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"Love a piece of art but terrified it\'ll look terrible in your living room? Try this trick."', 'On-Screen: "Will this look good in my house?" | B-Roll: looking at art, looking confused | Audio: helpful, problem-solving'),
                    ('📍 Context (0:03–0:18)', '"Scale and lighting change everything. A piece that looks massive in a gallery might look tiny above your sofa."', 'On-Screen: "Scale is everything" | B-Roll: measuring tape against a wall'),
                    ('⚡ Conflict (0:18–0:32)', '"Don\'t just guess. Cut a piece of kraft paper to the exact dimensions of the art and tape it to your wall. Live with it for 24 hours."', 'On-Screen: "The Kraft Paper Trick" | B-Roll: taping paper to the wall | Audio: instructional'),
                    ('🔄 Turning Point (0:32–0:50)', '"Notice how the light hits that spot morning and night. Does the size feel right? If the paper feels good, the art will feel amazing."', 'On-Screen: "Test the light and scale" | B-Roll: time-lapse of light changing in the room'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Need help finding the perfect piece? DM us photos of your space and we\'ll curate a selection just for you."', 'CTA Type: DM for curation | Funnel Stage: TOFU'),
                ],
            },
            {
                'name': 'DEFINE OAKLEY',
                'handle': '@defineoakley',
                'stage': 'MOFU',
                'stage_class': 'mofu',
                'play_title': '"Why Your Pilates Results Plateaued After 3 Months"',
                'play_why': 'Addresses a common plateau and positions DEFINE\'s specific method as the solution. Good for re-engaging people who have tried other studios.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"Did you see amazing results from Pilates in the first 3 months, and then absolutely nothing?"', 'On-Screen: "The 3-Month Plateau" | B-Roll: looking frustrated on a mat | Audio: empathetic, questioning'),
                    ('📍 Context (0:03–0:18)', '"Your body adapts to repetitive movement quickly. If your routine never changes, your results won\'t either."', 'On-Screen: "Adaptation = Stagnation" | B-Roll: doing the same move repeatedly'),
                    ('⚡ Conflict (0:18–0:32)', '"Most studios teach a set sequence. You get good at the sequence, but you stop challenging the muscles in new ways."', 'On-Screen: "Break the sequence" | B-Roll: instructor adjusting form | Audio: analytical'),
                    ('🔄 Turning Point (0:32–0:50)', '"At DEFINE, our programming changes constantly. We manipulate time under tension, spring load, and angles so your body never has the chance to plateau."', 'On-Screen: "Progressive Overload in Pilates" | B-Roll: dynamic, varied movements on the reformer'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Ready to break through the plateau? Book your next class and feel the difference."', 'CTA Type: Book a class | Funnel Stage: MOFU'),
                ],
            },
        ],
    },
    {
        'name': 'Rachel Dina',
        'avatar': 'R',
        'clients': [
            {
                'name': 'LANE & KATE',
                'handle': '@laneandkate',
                'stage': 'BOFU',
                'stage_class': 'bofu',
                'play_title': '"The Hidden Detail That Makes a Custom Ring Look Expensive"',
                'play_why': 'Highlights craftsmanship and attention to detail. Appeals to buyers looking for high-quality, bespoke pieces. Strong purchase intent content.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"Everyone looks at the center stone, but this is the detail that actually makes a ring look expensive."', 'On-Screen: "The secret to an expensive-looking ring" | B-Roll: close up of a ring | Audio: intriguing, expert tone'),
                    ('📍 Context (0:03–0:18)', '"A huge diamond on a clunky, mass-produced setting will always look cheap. The magic is in the metalwork."', 'On-Screen: "It\'s all in the setting" | B-Roll: comparing a clunky setting to a refined one'),
                    ('⚡ Conflict (0:18–0:32)', '"Look at the prongs. Are they bulky and distracting, or are they delicate, claw-shaped, and practically invisible?"', 'On-Screen: "Check the prongs" | B-Roll: macro shot of delicate claw prongs | Audio: educational'),
                    ('🔄 Turning Point (0:32–0:50)', '"We hand-finish every setting to ensure the metal supports the stone without overpowering it. That refinement is what you\'re actually paying for."', 'On-Screen: "Hand-finished refinement" | B-Roll: jeweler polishing a ring'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Ready to design a ring where every detail matters? Book your custom design consultation today."', 'CTA Type: Book consultation | Funnel Stage: BOFU'),
                ],
            },
            {
                'name': 'UP & RUNNING',
                'handle': '@upandrunningkc',
                'stage': 'TOFU',
                'stage_class': 'tofu',
                'play_title': '"Why You Shouldn\'t Run in the Shoes You Wear Every Day"',
                'play_why': 'Basic education that positions the store as the authority on running health. Drives foot traffic for proper fittings. Broad reach, high relevance.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"Stop running in the sneakers you wear to run errands. Your knees are begging you."', 'On-Screen: "Don\'t run in your daily sneakers" | B-Roll: pointing at casual sneakers | Audio: direct, slightly urgent'),
                    ('📍 Context (0:03–0:18)', '"Daily wear compresses the foam in your shoes unevenly based on how you stand and walk."', 'On-Screen: "Uneven compression" | B-Roll: showing a worn-out sole'),
                    ('⚡ Conflict (0:18–0:32)', '"When you take those unevenly worn shoes on a run, you\'re forcing your joints to compensate for the lack of support. Hello, shin splints."', 'On-Screen: "Compensating leads to injury" | B-Roll: runner grabbing their shin | Audio: cautionary'),
                    ('🔄 Turning Point (0:32–0:50)', '"You need a dedicated pair of running shoes that only see miles. They\'ll last longer, and so will your joints."', 'On-Screen: "Dedicated miles only" | B-Roll: lacing up a fresh pair of running shoes'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"Not sure which shoe is right for your stride? Come in for a free gait analysis and fitting."', 'CTA Type: In-store visit | Funnel Stage: TOFU'),
                ],
            },
            {
                'name': 'HOLOS HOUSE',
                'handle': '@holoshouse',
                'stage': 'MOFU',
                'stage_class': 'mofu',
                'play_title': '"The Difference Between Being Tired and Being Depleted"',
                'play_why': 'Taps into a deep emotional state of the target audience. Positions Holos House\'s wellness services as the antidote to modern burnout. High share and save potential.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"There is a massive difference between being tired and being completely depleted."', 'On-Screen: "Tired vs. Depleted" | B-Roll: someone looking exhausted | Audio: empathetic, calm'),
                    ('📍 Context (0:03–0:18)', '"Tired means you need a good night\'s sleep. Depleted means sleep isn\'t fixing it anymore."', 'On-Screen: "When sleep isn\'t enough" | B-Roll: staring at the ceiling in bed'),
                    ('⚡ Conflict (0:18–0:32)', '"When you\'re depleted, your nervous system is stuck in overdrive. You can\'t rest, you can\'t digest, and you can\'t recover."', 'On-Screen: "Nervous system in overdrive" | B-Roll: anxious pacing | Audio: validating'),
                    ('🔄 Turning Point (0:32–0:50)', '"You have to actively down-regulate. That\'s what our recovery protocols — like contrast therapy and sound healing — are designed to do. Force the body to finally exhale."', 'On-Screen: "Active down-regulation" | B-Roll: relaxing in a sauna or sound bath'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"If you\'re running on empty, it\'s time to reset. Book a recovery session and let your nervous system catch up."', 'CTA Type: Book session | Funnel Stage: MOFU'),
                ],
            },
            {
                'name': 'SCROLL MEDIA',
                'handle': '@getscrollmedia',
                'stage': 'BOFU',
                'stage_class': 'bofu',
                'play_title': '"Why We Don\'t Sell \'Viral\' Packages"',
                'play_why': 'Strong anti-positioning. Repels bad clients and attracts the right ones by focusing on business metrics over vanity metrics. High authority signal.',
                'beats': [
                    ('🎣 Hook (0:00–0:03)', '"If an agency promises to make you go viral, run the other way."', 'On-Screen: "The Viral Promise is a Red Flag" | B-Roll: shaking head, looking at camera | Audio: authoritative, blunt'),
                    ('📍 Context (0:03–0:18)', '"Virality is a byproduct, not a strategy. And most of the time, it brings you the wrong audience anyway."', 'On-Screen: "Virality ≠ Strategy" | B-Roll: showing a spike in views but no sales'),
                    ('⚡ Conflict (0:18–0:32)', '"10,000 views from people who will never buy your product is useless. We\'d rather get you 1,000 views from highly qualified buyers who actually convert."', 'On-Screen: "Qualified Views > Viral Views" | B-Roll: showing a conversion dashboard | Audio: analytical'),
                    ('🔄 Turning Point (0:32–0:50)', '"That\'s why we build conversion infrastructure, not just content. We focus on positioning, funnels, and revenue alignment."', 'On-Screen: "Conversion Infrastructure" | B-Roll: strategy mapping on a whiteboard'),
                    ('✅ Resolution + CTA (0:50–1:00)', '"If you want a social strategy that actually drives revenue, let\'s talk. Book a discovery call today."', 'CTA Type: Discovery Call | Funnel Stage: BOFU'),
                ],
            },
        ],
    },
]

FORMATS_TRENDING = [
    {
        'title': 'The "Skip Rate Bait" Hook Structure',
        'why': 'Now that skip rate is visible in Insights, we need to actively combat it. This structure forces engagement in the first 1.5 seconds by creating cognitive dissonance — the viewer has to keep watching to resolve the tension.',
        'stats': [('Best for', 'Education & Authority'), ('Funnel Stage', 'TOFU / MOFU'), ('Expected Metric', 'Low skip rate, high watch time')],
        'structure': [
            'Open with a counterintuitive statement that creates cognitive dissonance in the first 1.5 seconds.',
            'Follow immediately with a visual that contradicts the expected outcome.',
            'Deliver the educational payoff quickly to reward the attention.',
        ],
        'applications': [
            ('Skin by Brownlee', '"The moisturizer you love is actually dehydrating your skin."'),
            ('Define Oakley', '"If you\'re sweating this much in Pilates, your form is probably wrong."'),
        ],
    },
    {
        'title': 'The "Before You Do X" Carousel',
        'why': 'High save rate format. It functions as a reference card, which signals high value to the algorithm and positions the brand as a helpful guide. The "before you" framing creates urgency and positions the brand as the expert who prevents mistakes.',
        'stats': [('Best for', 'Education & Trust-Building'), ('Funnel Stage', 'TOFU / MOFU'), ('Expected Metric', 'High saves, strong shares')],
        'structure': [
            'Lead slide: "Before you [common action], read this"',
            'Slides 2-5: Specific, actionable reasons why the common approach fails.',
            'Final slide: The better path + CTA.',
        ],
        'applications': [
            ('Lane & Kate', '"Before you buy an emerald cut diamond, read this."'),
            ('Up & Running', '"Before you run your first 5K, check these 3 things."'),
        ],
    },
    {
        'title': 'The "3-Hashtag Thesis" Post',
        'why': 'Tests whether topic clarity alone drives better reach than hashtag volume, leaning directly into the new 3-hashtag limit. Forces the team to commit to one specific topic per post — which improves both algorithm signals and audience clarity.',
        'stats': [('Best for', 'Algorithm Testing'), ('Funnel Stage', 'TOFU'), ('Expected Metric', 'Improved topic-based reach')],
        'structure': [
            'Single carousel or Reel built entirely around one specific topic.',
            'Caption explicitly states the topic in the first line.',
            'Uses only 1-2 hashtags that are hyper-specific to the content.',
        ],
        'applications': [
            ('Any client', 'A deep dive on one highly specific topic, categorized perfectly.'),
            ('Scroll Media', '"The only 3 things that actually drive Instagram reach in 2026."'),
        ],
    },
]

FORMATS_ORIGINAL = [
    {
        'title': 'The "Skip Rate Reveal" Reel',
        'why': 'Meta-content that builds trust by showing the process, not just the output. It proves you are data-driven and constantly improving. Particularly powerful for Scroll Media\'s own account as a positioning play.',
        'stats': [('Best for', 'Authority & Trust'), ('Funnel Stage', 'MOFU / BOFU'), ('Expected Metric', 'High saves, DM inquiries')],
        'structure': [
            'Creator shows their own Insights data on screen.',
            'Walks through which hook failed and why.',
            'Reveals the rewritten version and the result.',
        ],
        'spark': '"Here\'s a hook that totally failed for us last week, and exactly how we fixed it."',
    },
    {
        'title': 'The "Insider Rejection" Reel',
        'why': 'Builds exclusivity and authority by showing what you say NO to. Particularly effective for boutique brands and curated services where the selection process IS the value proposition.',
        'stats': [('Best for', 'Positioning & Differentiation'), ('Funnel Stage', 'TOFU / MOFU'), ('Expected Metric', 'High shares, strong saves')],
        'structure': [
            'Open with: "We said no to [X] this week. Here\'s why."',
            'Walk through the specific criteria that disqualified the option.',
            'Reveal what you said YES to instead and why it passed.',
        ],
        'spark': '"We turned down 3 brand partnerships this month. Here\'s exactly what disqualified them."',
    },
    {
        'title': 'The "Data Before & After" Carousel',
        'why': 'Leverages the new skip rate and share rate metrics to create proof-of-concept content. Shows the before/after of a content optimization and lets the data tell the story.',
        'stats': [('Best for', 'Trust & Social Proof'), ('Funnel Stage', 'MOFU / BOFU'), ('Expected Metric', 'High saves, DM inquiries')],
        'structure': [
            'Slide 1: "We changed one thing about this Reel. Here\'s what happened."',
            'Slides 2-3: Show the original hook and its skip rate.',
            'Slides 4-5: Show the rewritten hook and the improved metrics.',
        ],
        'spark': '"Same topic. Same audio. Different hook. The skip rate dropped from 68% to 31%."',
    },
]

# ─── HTML GENERATION ──────────────────────────────────────────────────────────

def make_updates_html():
    parts = []
    for u in UPDATES:
        featured_class = ' card-featured' if u.get('featured') else ''
        tk_html = ''.join(
            f'<div class="takeaway-item"><strong>{escape(k)}:</strong> {escape(v)}</div>'
            for k, v in u['takeaways']
        )
        src_html = ''.join(
            f'<a class="article-link-btn" href="{escape(url)}" target="_blank"><span class="btn-icon">📰</span> {escape(name)}</a>'
            for name, url in u['sources']
        )
        parts.append(f'''
<div class="card{featured_class}">
<span class="card-tag">{escape(u['tag'])}</span>
<h3 class="card-title">{escape(u['title'])}</h3>
<p class="card-body">{u['body']}</p>
<div class="takeaways">
<div class="takeaways-label">Key Takeaways</div>
{tk_html}
</div>
<div class="article-links">
{src_html}
</div>
</div>''')
    return '\n'.join(parts)


def make_signals_html():
    parts = []
    for s in SIGNALS:
        tk_html = ''.join(
            f'<div class="takeaway-item"><strong>{escape(k)}:</strong> {escape(v)}</div>'
            for k, v in s['takeaways']
        )
        parts.append(f'''
<div class="card">
<h3 class="card-title">{escape(s['title'])}</h3>
<p class="card-body">{escape(s['body'])}</p>
<div class="takeaways">
<div class="takeaways-label">Key Takeaways</div>
{tk_html}
</div>
</div>''')
    return '\n'.join(parts)


def make_ai_html():
    cards = []
    for card in AI_CARDS:
        steps_html = ''.join(
            f'''<div class="ai-step">
<div class="ai-step-num">{i+1}</div>
<div class="ai-step-text"><strong>{escape(label)}</strong> {escape(text)}</div>
</div>'''
            for i, (label, text) in enumerate(card['steps'])
        )
        prompt_html = ''
        if card.get('prompt'):
            prompt_html = f'''<div class="prompt-box">
<div class="prompt-label">{escape(card['prompt_label'])}</div>
<div class="prompt-text">{escape(card['prompt'])}</div>
</div>'''
        cards.append(f'''
<div class="ai-card">
<span class="ai-tag">{escape(card['tag'])}</span>
<h3 class="ai-title">{escape(card['title'])}</h3>
<p class="ai-body">{escape(card['body'])}</p>
<div class="ai-steps">
{steps_html}
</div>
{prompt_html}
</div>''')
    return f'<div class="cards-grid">{chr(10).join(cards)}</div>'


def make_ideation_html():
    parts = []
    for am in ACCOUNT_MANAGERS:
        client_parts = []
        for c in am['clients']:
            beats_html = ''.join(
                f'''<div class="script-beat">
<div class="beat-label">{escape(label)}</div>
<div class="beat-spoken">{escape(spoken)}</div>
<div class="beat-direction"><strong>Direction:</strong> {escape(direction)}</div>
</div>'''
                for label, spoken, direction in c['beats']
            )
            client_parts.append(f'''
<div class="client-card">
<div class="client-header">
<div class="client-meta">
<div class="client-name">{escape(c['name'])}</div>
<div class="client-handle">{escape(c['handle'])}</div>
</div>
<span class="client-stage stage-{c['stage_class']}">{escape(c['stage'])}</span>
</div>
<div class="client-play">
<div class="play-label">This Week\'s Play</div>
<div class="play-title">{escape(c['play_title'])}</div>
<div class="play-why">{escape(c['play_why'])}</div>
</div>
<button class="script-toggle" onclick="toggleScript(this)">
<span class="script-toggle-label">📋 View Full Script</span>
<span class="script-toggle-icon">▼</span>
</button>
<div class="script-content">
{beats_html}
</div>
</div>''')
        parts.append(f'''
<div class="am-section">
<div class="am-header">
<div class="am-avatar">{escape(am['avatar'])}</div>
<div class="am-info">
<div class="am-name">{escape(am['name'])}</div>
<div class="am-role">Account Manager</div>
</div>
<div class="am-count"><strong>{len(am['clients'])}</strong> Clients</div>
</div>
<div class="cards-grid">
{''.join(client_parts)}
</div>
</div>''')
    return '\n'.join(parts)


def make_formats_html():
    trending_parts = []
    for i, f in enumerate(FORMATS_TRENDING, 1):
        stats_html = ''.join(
            f'<span class="format-stat">{escape(v)}</span>'
            for k, v in f['stats']
        )
        struct_html = ''.join(
            f'<div class="format-structure-step"><span class="step-num">{j}</span><span class="step-text">{escape(s)}</span></div>'
            for j, s in enumerate(f['structure'], 1)
        )
        apps_html = ''.join(
            f'<div class="format-application-item"><span class="format-application-item-client">{escape(client)}:</span><span>{escape(desc)}</span></div>'
            for client, desc in f['applications']
        )
        trending_parts.append(f'''
<div class="format-card trending-card">
<span class="format-tag trending">Trending Format #{i}</span>
<h3 class="format-title">{escape(f['title'])}</h3>
<p class="format-why">{escape(f['why'])}</p>
<div class="format-stats">{stats_html}</div>
<div class="format-structure">
<div class="format-structure-label">Format Structure</div>
<div class="format-structure-steps">{struct_html}</div>
</div>
<div class="format-applications">
<div class="format-applications-label">Client Applications</div>
{apps_html}
</div>
</div>''')

    original_parts = []
    for i, f in enumerate(FORMATS_ORIGINAL, 1):
        struct_html = ''.join(
            f'<div class="format-structure-step"><span class="step-num">{j}</span><span class="step-text">{escape(s)}</span></div>'
            for j, s in enumerate(f['structure'], 1)
        )
        spark = f.get('spark', '')
        spark_html = ''
        if spark:
            spark_html = f'''<div class="format-applications">
<div class="format-applications-label">Invented Application — Scroll Media</div>
<div class="format-application-item"><span class="format-application-item-client">Spark Line:</span><span>{escape(spark)}</span></div>
</div>'''
        original_parts.append(f'''
<div class="format-card invent-card">
<span class="format-tag invent">Invented Format #{i}</span>
<h3 class="format-title">{escape(f['title'])}</h3>
<p class="format-why">{escape(f['why'])}</p>
<div class="format-structure">
<div class="format-structure-label">Format Structure</div>
<div class="format-structure-steps">{struct_html}</div>
</div>
{spark_html}
</div>''')

    return '\n'.join(trending_parts), '\n'.join(original_parts)


# Build HTML
updates_html = make_updates_html()
signals_html = make_signals_html()
ai_html = make_ai_html()
ideation_html = make_ideation_html()
formats_trending_html, formats_original_html = make_formats_html()

# Count stats
total_clients = sum(len(am['clients']) for am in ACCOUNT_MANAGERS)
total_formats = len(FORMATS_TRENDING) + len(FORMATS_ORIGINAL)

# Read the April 20 report to extract the full CSS and structural elements
april20_content = open('/home/ubuntu/scroll-media-tools/scroll-report/scroll-report-2026-04-20.html').read()

# Extract CSS block
css_start_idx = april20_content.find('<style>')
css_end_idx = april20_content.find('</style>') + 8
css_block = april20_content[css_start_idx:css_end_idx]

# Extract the head section (before <style>)
head_start_idx = april20_content.find('<!DOCTYPE html>')
head_end_idx = css_start_idx
head_prefix = april20_content[head_start_idx:head_end_idx]
# Replace the title
head_prefix = head_prefix.replace(
    'The Scroll Report — Week of April 20, 2026 | Scroll Media',
    f'The Scroll Report — {DATE_LONG} | Scroll Media'
)

# Extract the script block at the end
scripts_start = april20_content.rfind('<script>')
scripts_end = april20_content.rfind('</script>') + 9
scripts_block = april20_content[scripts_start:scripts_end] if scripts_start > 0 else ''

html = f'''{head_prefix}
{css_block}
</head>
<body>
<div id="progress-bar-wrap"><div id="progress-bar"></div></div>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-brand" href="../index.html">
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-1px;margin-bottom:4px;">scroll media</div>
    </a>
    <div class="nav-links">
      <a class="nav-link" href="#instagram">Updates</a>
      <a class="nav-link" href="#strategy">Signals</a>
      <a class="nav-link" href="#ai">AI</a>
      <a class="nav-link" href="#ideation">Ideation</a>
      <a class="nav-link" href="#formats">Formats</a>
    </div>
    <div class="nav-date">{DATE_SHORT}</div>
  </div>
</nav>

<section class="hero">
  <div class="hero-badge">
    <div class="hero-badge-dot"></div>
    Internal Brief
    <div class="hero-badge-dot"></div>
  </div>
  <h1 class="hero-title">The <span>Scroll Report</span></h1>
  <p class="hero-subtitle">{DATE_LONG}</p>
  <p class="hero-desc">This week's edge: Instagram just handed you a skip rate metric — which means hook failure is now measurable, not guessable. LLM visibility is becoming a real brand discovery layer. And the hashtag era is officially over. The teams that adapt their content systems this week will compound the advantage.</p>
  <div class="hero-stats">
    <div class="hero-stat"><span class="hero-stat-num">{len(UPDATES)}</span><span class="hero-stat-label">Platform Updates</span></div>
    <div class="hero-stat"><span class="hero-stat-num">{len(SIGNALS)}</span><span class="hero-stat-label">Strategy Signals</span></div>
    <div class="hero-stat"><span class="hero-stat-num">{total_clients}</span><span class="hero-stat-label">Client Plays</span></div>
    <div class="hero-stat"><span class="hero-stat-num">{total_formats}</span><span class="hero-stat-label">Formats to Test</span></div>
  </div>
</section>

<div class="section-nav">
  <a class="section-pill" href="#instagram">
    <span class="pill-icon">📱</span> 01 Instagram Updates
  </a>
  <a class="section-pill" href="#strategy">
    <span class="pill-icon">📊</span> 02 Strategy Signals
  </a>
  <a class="section-pill" href="#ai">
    <span class="pill-icon">🤖</span> 03 This Week in AI
  </a>
  <a class="section-pill" href="#ideation">
    <span class="pill-icon">💡</span> 04 Client Ideation
  </a>
  <a class="section-pill highlight" href="#formats">
    <span class="pill-icon">🧪</span> 05 Formats to Test
  </a>
</div>

<main class="main">

<!-- ============================================================
     SECTION 01 — INSTAGRAM UPDATES
  ============================================================ -->
<section class="section" id="instagram">
<div class="section-label">
<span class="section-num">01</span>
<span class="section-tag">Platform Intelligence</span>
</div>
<h2 class="section-title">Notable Instagram Updates</h2>
<p class="section-subtitle">Signals, not mandates. Read critically, apply strategically.</p>
<div class="cards-grid">
{updates_html}
</div>
<div class="section-divider"></div>
</section>

<!-- ============================================================
     SECTION 02 — STRATEGY SIGNALS
  ============================================================ -->
<section class="section" id="strategy">
<div class="section-label">
<span class="section-num">02</span>
<span class="section-tag">Strategic Intelligence</span>
</div>
<h2 class="section-title">Content Strategy Signals</h2>
<p class="section-subtitle">What\'s working, what\'s shifting, and what to apply this week.</p>
<div class="cards-grid">
{signals_html}
</div>
<div class="section-divider"></div>
</section>

<!-- ============================================================
     SECTION 03 — THIS WEEK IN AI
  ============================================================ -->
<section class="section" id="ai">
<div class="section-label">
<span class="section-num">03</span>
<span class="section-tag">AI Leverage</span>
</div>
<h2 class="section-title">This Week in AI</h2>
<p class="section-subtitle">One workflow, tool, or prompt worth using this week.</p>
{ai_html}
<div class="section-divider"></div>
</section>

<!-- ============================================================
     SECTION 04 — CLIENT IDEATION
  ============================================================ -->
<section class="section" id="ideation">
<div class="section-label">
<span class="section-num">04</span>
<span class="section-tag">Client Plays</span>
</div>
<h2 class="section-title">Client Ideation</h2>
<p class="section-subtitle">One actionable content play per active client. Each script is designed to sharpen positioning, create a clear reaction, and move the audience to the next logical step in the funnel.</p>
{ideation_html}
<div class="section-divider"></div>
</section>

<!-- ============================================================
     SECTION 05 — FORMATS TO TEST
  ============================================================ -->
<section class="section" id="formats">
<div class="section-label">
<span class="section-num">05</span>
<span class="section-tag">Creative Lab</span>
</div>
<h2 class="section-title">Formats to Test</h2>
<p class="section-subtitle">Two tracks: what's winning on the platforms right now, and what we're inventing ourselves. The best agencies do both.</p>
<!-- Trending Now subsection -->
<div class="formats-subsection-label">
<span class="formats-subsection-badge badge-trending">📈 Trending Now</span>
<div class="formats-subsection-line"></div>
</div>
<p style="font-size:13px; color:var(--text-muted); margin-bottom:24px; font-style:italic;">Formats currently pulling outsized views and engagement on Instagram. These aren't your typical content types — they're high-leverage structures worth testing across accounts.</p>
<div class="cards-grid" style="margin-bottom: 40px;">
{formats_trending_html}
</div>
<!-- Invent the Format subsection -->
<div class="formats-subsection-label">
<span class="formats-subsection-badge badge-invent">💡 Invent the Format</span>
<div class="formats-subsection-line"></div>
</div>
<p style="font-size:13px; color:var(--text-muted); margin-bottom:24px; font-style:italic;">Original format structures we're developing in-house. The goal is to create content that doesn't look like anything else in the feed — proprietary formats that become associated with the brand.</p>
<div class="cards-grid">
{formats_original_html}
</div>
</section>

</main>

<footer class="footer">
<div class="footer-inner">
<div class="footer-brand">
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-1px;">scroll media</div>
<div class="footer-tagline">Internal Brief — {DATE_LONG}</div>
</div>
<div class="footer-meta">Prepared for Scroll Media internal use only.</div>
</div>
</footer>

{scripts_block}
</body>
</html>'''

OUT.write_text(html, encoding='utf-8')
print(f'Wrote {OUT}')
print(f'Line count: {len(html.splitlines())}')
