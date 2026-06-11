/**
 * Built Different — newsletter content (source of truth for the Kit build).
 *
 * Bodies are stored VERBATIM as Markdown, exactly as supplied in
 * built_different_issues_final.md. The build script converts them to email HTML
 * with a fixed mapping (**bold** -> <strong>, *italic* -> <em>, "- " -> <ul><li>,
 * "1. " -> <ol><li>, blank-line-separated blocks -> <p>). No underline is ever
 * produced. Do not rewrite the copy here — edit the source doc and re-paste.
 */

const SEQUENCE_NAME = "Built Different";
const TAG_NAME = "built-different-nurture";

// Sequence-level schedule. Kit's sequence schedule is a single account timezone
// (send_hour + time_zone); there is no documented "subscriber-local" flag on the
// V4 sequence schema, so per the spec fallback we use an ET morning slot.
const SCHEDULE = {
  send_days: ["friday"],         // Fridays only
  send_hour: 8,                  // 8 AM, a morning slot
  time_zone: "America/New_York", // ET
};

// delay_unit "days" gives schedule-aware delivery (respects send_days/send_hour).
const emails = [
  {
    position: 1,
    delay_value: 0, // sends on entry (held to the next Friday-morning window)
    subject: "a client almost fired us during their best month",
    preview_text: "the metric that almost cost me a client, and the one that saved them.",
    body: `A client almost fired us during the best month of their year.

Their reel views were down 40%. They opened the report, saw the drop, and you could feel the email coming. The one that starts with *"I think we need to talk about results."*

Here's the part they hadn't looked at. Sales were up. DMs were up. Profile visits were up. The only thing down was the number Instagram puts in giant font at the top of the screen.

They were watching the scoreboard Instagram wanted them to watch.

Almost every business owner does it. Instagram shows you views first because views keep you posting. Posting keeps you on the app. The app makes money when you're on it. **The metric they put front and center is the one that serves them, not you.**

The numbers that actually predict your revenue live one tap deeper. **Saves. Shares. Profile conversion.** The boring ones they bury. Here's what each one really means:

- **A save** is someone saying "I need this later." That's about the strongest buying signal a piece of content can give you short of an actual purchase.
- **A share** is someone spending their own reputation to put you in front of a friend. Free distribution to a pre-warmed audience.
- **A view** just means the algorithm pushed you out the door. Nobody decided anything.

Saves and shares mean a human did something *on purpose*. That's the difference.

**Your assignment this week. Ten minutes.**

Open your insights. Ignore views completely. Sort your last nine posts by saves, then by shares, and look at the top three. That's your content strategy. Not the stuff that got the most views. The stuff people saved and sent. Make more of those, fewer of everything else. You just built a data-backed plan in ten minutes and it cost you nothing.

The client who almost fired us? We pulled up the saves and shares right there on the call. Their "down" month was the month their best buyers were quietly bookmarking everything. Two weeks later the sales caught up to what the saves already knew.

The view count was lying. The save count knew the whole time.

Go check yours.`,
  },
  {
    position: 2,
    delay_value: 21,
    subject: "why i hope you don't go viral",
    preview_text: "200k views, three states away, zero customers. here's the math.",
    body: `One of the scariest things that can happen to a local business is going viral.

I know how that sounds. Everyone's chasing it. Every guru sells it. You've been told your whole life that more views is more better. So let me walk the math on a local business that actually went viral, because it's not the win you think it is.

A coffee shop posts a reel. Something clicks. It hits **200,000 views.** The owner is thrilled. Screenshots it, sends it to the family group chat, feels like they finally made it.

Now here's what happened under the hood.

Of those 200,000 people, maybe a few hundred live close enough to ever walk in. The other 199,000-some are scattered across the country. They watched a nice video. They will never buy a coffee. They can't. They're three states away.

The algorithm doesn't know that. It just learned something. It learned *"this is who likes this account."* So it takes the next post and shows it to more of the same: people far away who'll never convert. **You've accidentally trained the machine to go find you the wrong audience, at scale.**

This is the thing nobody tells local businesses. For you, a viral post can be worse than a quiet one, because a quiet post in front of the right neighborhood beats a loud one in front of the whole country. Two thousand right viewers beat two million wrong ones. Every time. And yeah, *every time* is a big claim, but I've watched it play out enough to stand on it.

So what do you do if it happens to you?

**Don't chase it.** When a post over-performs with the wrong crowd, resist the urge to make ten more just like it. Instead, post your next three pieces deliberately narrow. Something only a local would care about. A neighborhood reference. An "if you know, you know." A spot down the street.

You're re-teaching the algorithm who you're actually for. Narrow on purpose, until the machine remembers your real audience lives within driving distance.

Going viral feels like the goal because Instagram made it feel like the goal. For a national brand selling to anyone, fine. For you, selling to the people who can actually show up? The goal was never the biggest audience.

It was the right one.`,
  },
  {
    position: 3,
    delay_value: 21,
    subject: "your best content is hurting you",
    preview_text: "the posts you're proudest of might be why nobody new follows you.",
    body: `I stopped asking if a post was good.

Good is useless. Good is a feeling. Good is the thing you decide at 11pm when you're tired and just want to hit publish. I needed a filter that worked when I didn't trust my own judgment.

So now I ask one question. *Is this post doing one of three jobs.* If it's not, I cut it. Doesn't matter how nice it looks or how long it took to make. Here are the three, and the difference between them is the whole game:

- **Relatability** is "this brand gets me." The post that makes a stranger feel seen. It earns the follow.
- **Authority** is "this brand knows things." The post that takes a stance and makes someone smarter than they were thirty seconds ago. It earns the trust.
- **Proof** is "this brand delivers." The result, the before-and-after, the thing a customer said. It earns the money.

Now here's the part that's going to sting a little.

**The content you're proudest of is probably proof. And proof is the one keeping new people from following you.**

Think about what most local businesses post. Look at our happy customer. Look at our new product. Look at our five stars. It feels productive. It feels like marketing. And it does almost nothing for growth, because proof only works on people who *already* trust you. The stranger scrolling past has no reason to care that someone they've never met loved your thing. They needed relatability first, and you skipped straight to the sale.

You're running 90% proof and wondering why the account is flat. It's flat because you're closing people who were never introduced.

**Your move this week.**

Pull up your last six posts and label each one. Relatability, authority, or proof. One word per post. Two things happen:

- You'll find posts you can't label at all. Those aren't neutral. That's the content quietly making your account forgettable. Cut that pattern.
- You'll see you're starving two of the three. Almost everyone is.

From now on, assign the job *before* you make the post, not after. "This one's relatability," then build it to do that one thing well.

A post with a job beats a pretty post with no job. And the testimonial you were about to run for the fourth time this month? It's not pulling its weight. Make a stranger feel something instead.`,
  },
  {
    position: 4,
    delay_value: 21,
    subject: "the more AI floods the feed, the more this wins",
    preview_text: "why the imperfect take is about to beat the polished one.",
    body: `I caught myself swiping past three reels in a row last week before I realized what they had in common.

All AI. Perfect voiceover. Perfect captions. Perfect little zoom on every word. I didn't read a single one. I didn't *decide* to skip them. My thumb just kept moving, like my brain flagged something before I was even awake to it.

That's the thing nobody's pricing in yet. **Your brain has a lie detector, and AI is training it to fire faster every single day.**

Here's what's happening. The feed is filling up with content that's technically flawless and completely hollow. Generated scripts. Synthetic voices. Stock everything. And the more of it we see, the better we get at detecting it. Not consciously. You don't sit there going "ah, this is AI." You just feel a tiny *nope* and keep scrolling.

This is the over-correction, and I think it's the most important shift happening in content right now. The more digital and generated everything gets, the more people crave the opposite. Raw. Lo-fi. Real. Human. A face that isn't perfect. A take with a stumble in it. A video that clearly happened in one shot in somebody's actual kitchen.

It's not a trend or an aesthetic. It's how the brain works. We're pattern-matching machines, and *phony* is a pattern we're all getting fluent in fast.

Which means the local business owner reading this has an advantage the big polished brands are about to lose. **You can be the real thing. You already are the real thing.** You just have to stop hiding it behind production value you think you're supposed to have.

**So here's the move this week.**

Record one reel in a single take. No script. Talk to your camera about one thing you know cold. Your craft, a lesson, why you do the thing the way you do it. Don't write it out first. Don't do six takes. If you stumble, leave the stumble. Then post it next to your polished stuff and watch the retention. I'll bet it beats the over-produced one, because the human thing holds attention in a way the perfect thing can't anymore.

For the record, we run AI all over the back end here. Ideation, scripts, ops, the boring machinery. I'm not anti-AI, I'm kind of the opposite. But the output that reaches a human has to feel like it came from one.

The robots got good at perfect. So perfect doesn't mean much now.

It's the stumble people stay for.`,
  },
  {
    position: 5,
    delay_value: 21,
    subject: "instagram isn't a numbers game",
    preview_text: "everyone's teaching you the algorithm. nobody's teaching you the part people actually read.",
    body: `Copywriters fill space. Songwriters make every word fight for its spot.

I think about that constantly when I write, and here's the part almost nobody will tell you: **you've been sold the lie that Instagram is a numbers game. It's a words game.**

Everyone's out there teaching strategy and frequency and the algorithm. Post-times. Hashtag counts. How often to show up. And almost nobody is teaching you to *write better*, which is wild, because the words are the part the actual human actually reads. You can nail every algorithm trick in the world and still lose, because a person hit your caption, felt nothing, and kept scrolling.

So let me teach the part everyone skips.

A songwriter has three minutes and a melody. Every word has to earn its place or it gets cut, because there's no room. They reach for the unexpected word over the obvious one. A concrete image instead of an abstract idea. A line you *remember* instead of a line you understand and forget.

The bad kind of copywriter just fills the box. Adds words to sound complete. Writes *"we are passionate about delivering quality solutions"* and thinks the job is done. Nobody remembers that. Nobody feels that. It's space with text in it.

Your captions should be lyrics, not paragraphs. And the good news is this is a craft you can practice this week, on your next post. Two passes:

- **Pass one: write it normally, then cut it by half.** This is harder than it sounds, and that's the point. To lose half, you have to decide what actually matters. The warm-up sentence dies. The throat-clearing dies. The second example you didn't need dies. What's left is denser, sharper, and somehow more emotional, because you removed everything standing between the reader and the point.
- **Pass two: read it out loud and cut the freeloaders.** Every word that doesn't change the meaning when you remove it, remove it. If the sentence still works without *really*, *just*, or *very*, those words were freeloading.

Read it out loud is the secret, honestly. Your eyes forgive bad writing. Your ear doesn't. If *you* stumble reading it, the reader stumbles too, and a stumble is where they scroll away.

This is the stuff that separates content that sounds like a brand from content that sounds like a person worth listening to. It's not about being clever. It's about respect. Every extra word you make someone read is a small tax on their attention, and attention is the only currency that matters here.

Write fewer words. Make each one fight for it.`,
  },
  {
    position: 6,
    delay_value: 21,
    subject: "the one document we start every client with",
    preview_text: "five lines that reorganize your entire instagram. steal the template.",
    body: `We don't start any client with content.

I know that sounds backwards for a content agency. But the first thing we build isn't a post or a calendar or a hook. It's one document. **Most agencies would never show you this, because it's the actual work, the part you're really paying for.** I'm going to give you the lightweight version anyway.

We call it the **Ideal Viewer Profile.** Not customer. *Viewer.* The specific person we're making every single piece of content for.

Here's why that distinction matters. Most businesses make content for "their audience," which is a blur. A fog. You can't write a sharp line to a fog. When you're talking to everyone, you're talking to no one, and your content comes out beige. The IVP fixes that by forcing you to invent one real person, in detail, then make everything for them.

When you know exactly who you're talking to, everything downstream gets easier. The hooks get sharper because you know what stops them. The topics get obvious because you know what they care about. The captions write themselves because you're just talking to one person you actually understand.

**So let's build you a quick one this week. Five lines. That's all.**

1. **Who they are.** Not demographics. The real situation. *"A 38-year-old who owns a busy salon, great at her craft, lost on Instagram, posts twice then disappears for a month."*
2. **What they secretly want.** The real desire under the obvious one. Not "more followers." Maybe *"to feel like a legit business and not a hobby."*
3. **What they're scared of.** The hesitation that makes them not act. *"Worried they'll spend hours posting and it'll do nothing, again."*
4. **What stops their scroll.** The specific thing that earns a beat of attention from this exact person.
5. **What makes them trust.** Some people trust data. Some trust a face. Some trust a story. Know which one yours needs.

Write those five lines. Tape them where you can see them. Then run every future post through that one person.

Here's what'll happen. The content that felt hard starts feeling obvious, because you stopped guessing and started aiming. You'll catch yourself about to post something and think *"that's not for them,"* and you'll cut it before it ever goes out. That instinct, that filter, is worth more than any trick I could hand you.

This is the foundation under everything else we do. Pillars come from the IVP. Formats get chosen for the IVP. Hooks land for the IVP. **Get this one document right and the rest of your strategy stops being guesswork.**

One person. Five lines. Go build yours.`,
  },
  {
    position: 7,
    delay_value: 21,
    subject: "i called it research. it was procrastination.",
    preview_text: "AI made my favorite excuse a lot more dangerous.",
    body: `I used to spend two weeks getting ready to launch something.

Researching. Planning. Mapping it out. Building the doc before the doc before the real thing. I called it diligence. I called it being thorough. It was fear wearing a nicer outfit, and it took me an embarrassingly long time to see it.

Here's the trap, and I think a lot of you are in it right now without naming it. **Prep work feels like progress.** It feels responsible. Nobody criticizes you for "doing your research." So it becomes the most respectable way on earth to avoid the scary part, which is putting something real out where people can see it.

And AI made this so much worse.

Because now I can research *forever*. I can generate twelve content plans, analyze forty competitors, build a beautiful strategy deck, and never post a single thing. The tools that were supposed to speed me up became the most sophisticated procrastination machine I've ever owned. I felt productive the whole time I was hiding.

The honest truth is this. **You cannot think your way to the right answer in content. You can only post your way there.**

Every plan is a guess until the audience touches it. You can spend two weeks perfecting a content pillar in a doc, or you can post three pieces this week and let real humans tell you which direction is right in about four days. The second one is faster *and* more accurate. The audience knows things your strategy deck can't.

**So here's the assignment, and it's uncomfortable on purpose.**

That piece of content you've been "researching." The one you keep meaning to refine a little more before it's ready. Post it this week. Rough. Before you feel ready, because you're never going to feel ready, that's the whole point. Then watch what happens. Read the saves, read the shares, read the comments. Refine from there. *Execute, learn, adjust.* Your ability to adjust after you post is worth ten times more than any prep you do before.

The founders who win aren't the ones with the best plan. They're the ones who get the most reps with reality. They post, they learn, they adjust, they post again. Their plan gets sharper because it keeps getting hit by actual data, not because they sat and thought harder.

I still catch myself doing it, by the way. I'll feel the pull to "just research this a bit more" and I have to call it what it is. Fear in a nicer outfit.

Then I post the thing anyway.`,
  },
  {
    position: 8,
    delay_value: 21,
    subject: "a how-to is a golden retriever",
    preview_text: "the creative move behind half our best work. yours to steal.",
    body: `A how-to is a golden retriever. A hot take is a chihuahua. A behind-the-scenes is a lab.

Stick with me, because this little game is actually one of the most useful creative tools we've got, and once you see it you can't unsee it.

Here's the principle underneath the silliness. The fastest way to make something stick is to map it onto something people already know cold. Your audience has zero memory slots for "content formats." But they have a deep, instant, emotional map of dog breeds. So when you borrow their dog-breed map to explain your unfamiliar thing, it lands immediately, and it's fun, and fun stops the scroll.

We call this a **pattern break.** Take something universally familiar and map your product or your point onto it. *Familiar plus surprising* is the combination that breaks a scroll, because the brain relaxes at the familiar part and then perks up at the unexpected connection.

The familiar thing can be almost anything your audience already carries around in their head: coffee orders, zodiac signs, NFL teams, types of weather, The Office characters, phases of the moon.

Let me make it concrete. Say you run a plant shop.

- **Boring version:** "five low-maintenance plants." Scroll past.
- **Pattern break version:** "your low-maintenance plants, ranked by which roommate they are." The pothos that thrives on neglect is the chill roommate. The fiddle leaf fig that dies if you look at it wrong is the high-maintenance one.

Same information. Completely different stopping power. Way more shareable, because now it's a personality bit people send to their friends.

It works in any niche. A bakery: *"our breads as types of people at a party."* A gym: *"your workout split as Mario Kart characters."* A law firm, even: *"contract clauses as relationship red flags."* Every niche has an audience, and every audience already knows something universal you can borrow.

**So here's your move this week.**

Pick one thing your audience knows cold. *One.* Then map your products, your services, or your content types onto it. Don't overthink the polish. The idea is the whole engine here. The execution can be a simple talking video or a basic carousel.

This is genuinely one of the creative moves behind a lot of our best-performing content. It's not a secret because it's complicated. It's a secret because most people never think to borrow a map that already exists in their audience's head.

Familiar gets you the pause. Surprising gets you the share.

Now go figure out which dog your content is.`,
  },
  {
    position: 9,
    delay_value: 21,
    subject: "the stuff nobody's selling you",
    preview_text: "they can't sell you boring. so they sell you the trick play instead.",
    body: `When I played ball and a game fell apart, the coach never drew up something clever.

He didn't pull out a trick play. He'd look at us, dead calm in the middle of the chaos, and say the most boring thing imaginable. *Box out. Dribble with your head up. Get back on defense.* The fundamentals. The stuff we'd run a thousand times in practice and rolled our eyes at.

And it worked. It always worked. Because when everything's falling apart, the answer is almost never something new. **It's the basics you stopped doing well.**

Here's the part the whole industry doesn't want you to know. **The fundamentals are unsellable, and that's the only reason nobody's selling them to you.** You can't build a course around "post consistently." You can't run ads on "know who you're for." There's no money in boring. So instead they sell you the trick play. The new feature. The secret posting time. The trend you have to jump on in the next four hours or you'll miss it forever. It's noise, engineered to make you feel behind so you keep buying the next thing.

Meanwhile the people quietly winning are just doing the boring stuff well.

When I'm overwhelmed, buried, drowning in the trenches, I don't go hunting for a clever tactic. I come back to four fundamentals: *network, watch the money like a hawk, protect the culture, stay honest even when it costs me.* Instagram has its own four, and they're just as boring, and just as ignored:

- **Know exactly who you're for.** One specific person, clear as day.
- **Post consistently,** so the algorithm and the audience can both rely on you.
- **Read your saves and shares,** so you make more of what works.
- **Talk like a human,** so people actually feel something.

That's the whole game. Four things. **Everything else is decoration.**

**So this week, do something that'll feel wrong.** When the next shiny tactic shows up and makes you feel behind, ignore it. On purpose. Just for the week. Instead, pick one of those four fundamentals and do it noticeably better than last week.

- Pick consistency and actually post the three times you keep meaning to.
- Pick your audience and rewrite who you're talking to until it's one sharp person.
- Pick your data and spend ten real minutes in your insights.
- Pick sounding human and rewrite your next caption like you're texting a friend.

One fundamental, done better. That's the assignment.

The flashy stuff is fun to chase. But every time I've been lost in this business, the way out wasn't a new trick. It was getting back to the boring things I already knew, and doing them like they mattered.

Box out. Head up. Keep it simple.`,
  },
  {
    position: 10,
    delay_value: 21,
    subject: "cincinnati is hiding something",
    preview_text: "a love letter, and one thing you can do friday to grow because of it.",
    body: `People sleep on Cincinnati.

I don't think they should, and I'm not just saying that because I live here. I really believe we've quietly got one of the best small-business scenes in the country. The food, the makers, the shops, the founders building real things on real streets. And almost nobody here is showing it off online the way they could.

That's a gap. And gaps are where the opportunity lives.

Here's the thing the national-brand chasers will never understand. A national brand can outspend you. They've got budgets you can't touch and reach you can't buy. **But they cannot out-local you.** They will never know your neighborhood, your regulars, the inside jokes, the spot down the street, the rivalry everybody here understands without explaining. That's yours. That's a moat money can't cross.

And almost every local business I see is posting like they're trying to be a national brand. Generic. Polished. Could-be-anywhere. They're competing on the one field where they're guaranteed to lose, and ignoring the one where they can't.

So I want to leave you with something this week that costs nothing and works better than most paid strategies I know.

**Spotlight a neighbor.**

Post one genuine shoutout to another local business you actually love. A coffee shop, a bakery, a maker, whoever. No deal. No tag-for-tag arrangement. No "we'll post you if you post us." Just real generosity, because you genuinely rate what they do. Two things happen:

- The algorithm notices the engagement it earns, because that kind of post pulls real comments and shares, the signals that actually move you.
- And the bigger one: you become known as the business that lifts up the scene. In a small market, reputation travels at a speed national brands can't comprehend. People remember who was generous. They send customers to those people.

**Generosity is a growth strategy.** It just doesn't look like one, which is exactly why it works in a place where everyone else is busy selling.

This is the part of building here that I love most. It's not zero-sum. A stronger Cincinnati scene lifts every one of us in it. The more we show off what we've got, the more this whole city becomes a place people pay attention to. We're all better off when that happens.

So go find a neighbor worth shouting out. Do it this week. Watch what comes back.

We're building something here. One step at a time.`,
  },
];

module.exports = { SEQUENCE_NAME, TAG_NAME, SCHEDULE, emails };
