// Verbatim public Google reviews for Unpaste. Source of truth and pull-quote
// decisions: unpaste/workshops/marketing/social-proof.md. Never edit the text.
// Rating and count must match the live listing; update both together.

export const GOOGLE_RATING = { score: "5.0", count: 5, updated: "6 Oct 2026" } as const;

export const GOOGLE_REVIEW_URL = "https://www.google.com/maps?cid=5179529895289794045";

export type Review = {
  name: string;
  business?: string;
  /** Which offer this review backs best. */
  backs: ("workshop" | "one-on-one" | "team")[];
  /** One line for tiles and the hero strip. */
  pull: string;
  /** Screenshot of the review as it appears on Google, used on the page. */
  screenshot: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Anna Mascaro",
    screenshot: "/images/reviews/anna-mascaro.webp",
    business: "Luminate Leadership",
    backs: ["workshop"],
    pull: "It has noticeably cut down the time I spend on admin.",
    text: `I recently attended Elliot's AI workshop on setting up an agent and got a lot out of it. Elliot explained clearly what an agent actually does, then walked us through how to set one up so that it works.

The real test has been what happened afterwards. Since the workshop I've kept building on what I learnt and now use my agent across more of my daily tasks. It has noticeably cut down the time I spend on admin, which frees me up for the work that matters most.

Thanks, Elliot. I'd highly recommend this workshop to anyone who wants to move from being curious about AI to actually using it.`,
  },
  {
    name: "Christophe Cosson",
    screenshot: "/images/reviews/christophe-cosson.webp",
    backs: ["one-on-one", "workshop"],
    pull: "We walked away with practical skills and systems we could actually put to work straight away.",
    text: `Elliot's AI training was absolutely brilliant. My partner and I attended his AI training to learn how to build Claude Agents and, honestly, it has completely changed the way we approach our businesses.

Elliot has a great ability to take something that can seem complicated and make it practical, easy to understand and immediately useful. Since the AI workshop, we've implemented what he taught us and are already saving a significant amount of time by automating tasks that previously required a lot of manual work.

The biggest value for us was that this wasn't just an introduction to AI — we walked away with practical skills and systems we could actually put to work in our businesses straight away.

I couldn't recommend Elliot's AI training highly enough. If you're looking to save time, understand how to build agents properly, work smarter and get real-world results from AI, his workshops are well worth the investment.`,
  },
  {
    name: "Conrad Tamsen",
    screenshot: "/images/reviews/conrad-tamsen.webp",
    business: "DO Financial",
    backs: ["team"],
    pull: "Upskill the entire team. Could not recommend him enough.",
    text: `We just hired Elliot for a three hour workshop to upskill the entire team & automate specific tasks using Claude Code within our business.

Could not recommend him enough.

The photo was taken by the Director during a one-on-one session.

We look forward to our continued engagement with him`,
  },
  {
    name: "Andy Canning",
    screenshot: "/images/reviews/andy-canning.webp",
    business: "Luminate Leadership",
    backs: ["workshop"],
    pull: "I walked away with actionable ideas on how and when to use Claude Code.",
    text: `I had the incredible pleasure of attending one of Unpaste's Claude workshops recently and I thoroughly enjoyed it!
Elliot is so knowledgeable and patient in catering for everyone's question. I walked away with actionable ideas on how and when to use Claude Code, and I can already see it transferring my business.`,
  },
  {
    name: "Andrew Ciui",
    screenshot: "/images/reviews/andrew-ciui.webp",
    backs: ["workshop", "team"],
    pull: "Very helpful at understanding how to utilise AI across my 3 separate businesses.",
    text: `Absolutely loved the experience, had a great time and it was very helpful at understanding how to utilise AI across my 3 seperate businesses.`,
  },
];

/** Reviews ordered so the ones backing this offer come first. */
export const reviewsFor = (slug: Review["backs"][number]): Review[] =>
  [...REVIEWS].sort((a, b) => Number(b.backs.includes(slug)) - Number(a.backs.includes(slug)));
