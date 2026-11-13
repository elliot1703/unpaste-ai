// Single source for the three training offers and their gated-pricing pages.
// Price never renders on the page itself; it appears on the form's end screen.
// Change a date, price or seat count here and every page follows.

import { calendlyUrl } from "./booking";

export type OfferSlug = "workshop" | "one-on-one" | "team";

export type Offer = {
  slug: OfferSlug;
  path: string;
  /** Short product name used in copy and the pixel. */
  name: string;
  kicker: string;
  headline: { main: string; accent: string };
  subhead: string;
  lede: string;
  /** Mono facts line under the hero. */
  facts: string[];
  /** Hero pills over the photo. Short, three to four. */
  pills: string[];
  /** How the day runs, three lines. */
  steps: { title: string; body: string }[];
  forYou: string[];
  notFor: string[];
  askTeamSize: boolean;
  /** Button label used on every CTA on the page. */
  cta: string;
  /** Shorter label for the phone sticky bar, when the full one would cut off the text beside it. Falls back to cta. */
  ctaShort?: string;
  /**
   * Form copy for an offer with no price to show on the end screen. Leave it
   * out and the form keeps its default "the price is on the next screen" wording.
   */
  apply?: { lede: string; detailsNote: string; submitLabel: string };
  /** Who the form says will be in touch. Leave it out and the form says Elliot. See IN_TOUCH. */
  inTouch?: keyof typeof IN_TOUCH;
  /**
   * The page and form have five lines written for an offer that runs as one day.
   * An offer that does not run as one day sets its own here. Leave it out and
   * the page keeps the one-day wording.
   */
  notOneDay?: {
    /** Heading over the three steps. Default "How the day runs." */
    runs: string;
    /** Ends the tools paragraph: "...the habits that keep it useful ___." Default "after the day". */
    after: string;
    /** Ends the line about Elliot: "...the same tools he teaches, and ___." Default "works beside you on the day when something gets stuck". */
    beside: string;
    /** Small line in the phone sticky bar. Default "100% money-back guarantee". Keep it under 24 characters. */
    sticky: string;
    /** Hint under the first form question. Default "We shape the day around it." */
    shapeHint: string;
  };
  /** Shown under every CTA and on the end screen. Elliot, 6 Oct: 100% money back if unsatisfied. */
  guarantee: string;
  /** Shown only after the form is submitted. */
  reveal: {
    title: string;
    /** Leave price and priceNote out when there is no confirmed price; the end screen then shows none. */
    price?: string;
    priceNote?: string;
    was?: string;
    includes: string[];
    /** Only used when the action has a link to send people to. */
    buttonLabel?: string;
    /**
     * Stripe link comes from env so the page can ship before it exists.
     * "none" means there is nothing to pay for or book yet: no button, the fallback line shows.
     */
    action: { kind: "stripe"; link?: string } | { kind: "calendly"; url: string } | { kind: "none" };
    /** Shown when there is no button (no Stripe link yet, or nothing to book). Must be true. */
    fallback: string;
  };
  seo: { title: string; description: string };
};

// The four lines on the form that say who will be in touch after an application.
// They live together so they cannot disagree. "elliot" is the default. "we" is for
// an offer where someone other than Elliot may phone the applicant.
export const IN_TOUCH = {
  elliot: {
    lede: "So Elliot knows what you want to work on. The price is on the next screen.",
    detailsNote: "So Elliot can get in touch. The price is on the next screen.",
    note: (offerName: string) => `Elliot will be in touch by email or phone about ${offerName}. Unsubscribe any time.`,
    done: (email: string) => `Elliot has your details and will be in touch at ${email}.`,
  },
  we: {
    lede: "So we know what you want to work on. The price is on the next screen.",
    detailsNote: "So we can get in touch. The price is on the next screen.",
    note: (offerName: string) => `We'll be in touch by phone or email about ${offerName}. Unsubscribe any time.`,
    done: (_email: string) => "We have your details and will be in touch by phone or email.",
  },
} as const;

// No next workshop date is confirmed (checked 12 Nov 2026, after the 11 November session date passed).
// While that is the case every workshop surface says so and the form registers
// interest only: no date, no seat count, no price, no payment link.
//
// When Elliot confirms the next session, put the dated copy back in the workshop
// offer below (date, seats, price and any early bird, the Stripe link) and update
// the workshop facts in api/ask.ts to match. Commit 38e87b8 is the last dated version.
export const WORKSHOP_WHEN = "Next date to be announced";

export const OFFERS: Record<OfferSlug, Offer> = {
  workshop: {
    slug: "workshop",
    path: "/workshops",
    name: "The Unpaste Workshop",
    kicker: `AI workshop · Brisbane · ${WORKSHOP_WHEN}`,
    headline: { main: "Put AI to work", accent: "in your business." },
    subhead: "A hands-on workshop for Brisbane business owners.",
    lede:
      "Bring your laptop and a real job from your business. Build it with Elliot beside you, and leave with it running.",
    facts: [WORKSHOP_WHEN, "4.5 hours", "Small group", "Brisbane"],
    pills: ["AI workshop", "Brisbane", WORKSHOP_WHEN, "Small group"],
    steps: [
      { title: "Bring your laptop and one real job.", body: "The quote you rewrite every week. The inbox nobody owns. The report you build by hand." },
      { title: "Build it with Elliot beside you.", body: "Small room, laptops open. When you get stuck, he's at your shoulder, not on a slide." },
      { title: "Leave with it running.", body: "On your machine, in your accounts. You keep everything and you know how to extend it." },
    ],
    forYou: [
      "You already use ChatGPT or Claude and want it doing the work, not handing it back.",
      "You can bring a laptop and one real piece of work.",
      "You're happy to learn by building, asking and fixing.",
    ],
    notFor: [
      "A keynote or a slide-heavy AI overview.",
      "A developer course that expects you to know code.",
      "A done-for-you implementation day.",
    ],
    askTeamSize: false,
    cta: "Register your interest",
    ctaShort: "Register",
    apply: {
      lede: "So Elliot knows what you want to work on. He'll email you when the next date is set.",
      detailsNote: "So Elliot can email you when the next date is set.",
      submitLabel: "Register your interest",
    },
    guarantee: "100% money-back guarantee. Not satisfied with the day, you get a full refund.",
    reveal: {
      title: "Your interest is registered",
      includes: [
        `${WORKSHOP_WHEN}, 4.5 hours, Brisbane`,
        "A small group, so everyone gets help",
        "One real job from your business, running by the end",
        "You keep everything built on the day",
        "100% money-back guarantee if you're not satisfied",
      ],
      action: { kind: "none" },
      fallback: "Nothing to book or pay today. Elliot will email you the next date and the price first, before it goes public.",
    },
    seo: {
      title: "Hands-on AI Workshop Brisbane — Unpaste",
      description:
        `Hands-on AI workshop in Brisbane. Bring your laptop and one real job. Build it with Elliot beside you and leave with it running. ${WORKSHOP_WHEN}.`,
    },
  },

  "one-on-one": {
    slug: "one-on-one",
    path: "/one-on-one",
    // 13 Nov 2026, Elliot: the 1:1 is now two separate 3-hour sessions. Not happy
    // after the first, they don't pay and we don't come back for the second.
    name: "1:1 Setup",
    kicker: "1:1 setup · In person · Brisbane",
    headline: { main: "Set up properly,", accent: "in two sessions." },
    subhead: "Claude Code or Codex, on your machine, built around how your business runs.",
    lede:
      "Before the first session, we write down what AI should be doing for you. Then I come to you and we build it, together.",
    facts: ["Two 3-hour sessions", "In your office", "Claude Code or Codex", "Brisbane"],
    pills: ["1:1 setup", "In your office", "Brisbane", "Two 3-hour sessions"],
    steps: [
      { title: "Before the first session, we write the list.", body: "The quoting. The follow-ups. Monday's numbers. Whatever is actually eating your week." },
      { title: "We build it in your office, together.", body: "On your laptop, in your accounts, with your real files. Not a demo environment." },
      { title: "You keep everything, and know how to extend it.", body: "No subscription to us. The workspace, the instructions and the habits stay with you." },
    ],
    forYou: [
      "You run the business, or you can sign off on this.",
      "You've tried AI tools and want it set up properly, once.",
      "You'd rather two focused sessions than a course you never finish.",
    ],
    notFor: [
      "Someone who wants it built without being in the room.",
      "A team of more than two. See team training instead.",
      "A general AI talk.",
    ],
    askTeamSize: false,
    cta: "Check availability",
    // "Two 3-hour sessions" is wider than "One day" was, so the phone bar needs a shorter button.
    ctaShort: "Apply",
    // The end screen has no price to show (it says "Price on the call"), so the
    // form must not promise one. If a price goes on the end screen, take this out
    // and the form goes back to "The price is on the next screen" and "See the price".
    apply: {
      lede: "So we know what you want to work on.",
      detailsNote: "So we can get in touch.",
      submitLabel: "Check availability",
    },
    // From 13 Nov 2026 someone other than Elliot may phone 1:1 applicants.
    inTouch: "we",
    notOneDay: {
      runs: "How the two sessions run.",
      after: "after the sessions",
      beside: "works beside you when something gets stuck",
      sticky: "First session guarantee",
      shapeHint: "We shape the sessions around it.",
    },
    guarantee: "Not happy after the first session? You don't pay and we don't come back.",
    reveal: {
      title: "The 1:1 setup",
      // TODO(elliot): price to confirm.
      price: "Price on the call",
      priceNote: "two 3-hour sessions, in person, Brisbane",
      includes: [
        "A call before the first session to write the list",
        "Two 3-hour sessions in your office, Elliot beside you",
        "Everything built stays yours",
        "A follow-up call two weeks later",
        "Not happy after the first session, you don't pay",
      ],
      buttonLabel: "Book a 20-minute call",
      action: { kind: "calendly", url: calendlyUrl("one-on-one") },
      fallback: "",
    },
    seo: {
      title: "1:1 Claude Code Setup, Brisbane — Unpaste",
      description:
        "Two 3-hour sessions, in your office. We write down what AI should do for your business, then build it on your machine.",
    },
  },

  team: {
    slug: "team",
    path: "/team-training",
    name: "Team AI Training",
    kicker: "Team training · Up to 12 · We come to you",
    headline: { main: "AI training", accent: "for the whole team." },
    subhead: "Practical training built around your team's real work.",
    lede:
      "We come to you, find the tasks eating the team's time, build the first workflows together on the day, then keep the momentum with weekly catch-ups.",
    facts: ["Up to 12 people", "In your office", "Brisbane", "Booked on request"],
    pills: ["Team training", "Up to 12", "We come to you", "Booked on request"],
    steps: [
      { title: "Find the tasks eating the team's time.", body: "A short call before the day. We pick the two or three jobs worth automating first." },
      { title: "Build useful AI workflows together.", body: "Laptops open, everyone building on their own real work, Elliot moving between desks." },
      { title: "Weekly catch-ups to keep going.", body: "A standing call after the day, so what got built keeps getting used." },
    ],
    forYou: [
      "A team of two to twelve who already use ChatGPT or Claude.",
      "You want the team building, not watching.",
      "You're based in or around Brisbane.",
    ],
    notFor: [
      "A keynote for a hundred people.",
      "A done-for-you build with no one from your team in the room.",
      "Teams outside South East Queensland, for now.",
    ],
    askTeamSize: true,
    cta: "Check availability",
    guarantee: "100% money-back guarantee. Not satisfied with the day, you get a full refund.",
    reveal: {
      title: "Team training day",
      price: "$2,500",
      priceNote: "+ GST · for the day, up to 12 people",
      includes: [
        "A planning call before the day",
        "A full day in your office, built around your team's work",
        "Weekly catch-up calls after",
        "Everything built stays with the team",
        "100% money-back guarantee if you're not satisfied",
      ],
      buttonLabel: "Book a 20-minute call",
      action: { kind: "calendly", url: calendlyUrl("team-training") },
      fallback: "",
    },
    seo: {
      title: "Team AI Training Brisbane, up to 12 — Unpaste",
      description:
        "We come to you. Find the tasks eating the team's time, build the first AI workflows together, then weekly catch-ups to keep going.",
    },
  },
};

export const OFFER_LIST = Object.values(OFFERS);
