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
  /** How the day runs, three lines. */
  steps: { title: string; body: string }[];
  forYou: string[];
  notFor: string[];
  askTeamSize: boolean;
  /** Button label used on every CTA on the page. */
  cta: string;
  /** Shown only after the form is submitted. */
  reveal: {
    title: string;
    price: string;
    priceNote: string;
    was?: string;
    includes: string[];
    buttonLabel: string;
    /** Stripe link comes from env so the page can ship before it exists. */
    action: { kind: "stripe"; link?: string } | { kind: "calendly"; url: string };
    /** Shown when the Stripe link isn't configured yet. Must be true. */
    fallback: string;
  };
  seo: { title: string; description: string };
};

// TODO(elliot): weekday to confirm. 10 Nov 2026 is a Tuesday; Elliot said Wednesday.
export const WORKSHOP_DATE = "10 November";
export const WORKSHOP_EARLY_BIRD_ENDS = "3 November";
export const WORKSHOP_SEATS = 10;

const STRIPE_LINK_WORKSHOP = import.meta.env.VITE_STRIPE_LINK_WORKSHOP as string | undefined;

export const OFFERS: Record<OfferSlug, Offer> = {
  workshop: {
    slug: "workshop",
    path: "/workshops",
    name: "The Unpaste Workshop",
    kicker: `AI workshop · Brisbane · ${WORKSHOP_DATE}`,
    headline: { main: "Watch it", accent: "do the work." },
    subhead: "Not a webinar. Not a prompt pack.",
    lede:
      "Bring your laptop and a real job from your business. Build it with Elliot beside you, and leave with it running.",
    facts: [WORKSHOP_DATE, "4.5 hours", `${WORKSHOP_SEATS} seats`, "Brisbane"],
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
    cta: "Apply for a seat",
    reveal: {
      title: "You're a fit. Here's the seat.",
      price: "$499",
      priceNote: `+ GST · early bird until ${WORKSHOP_EARLY_BIRD_ENDS}, then $699`,
      includes: [
        `${WORKSHOP_DATE}, 4.5 hours, Brisbane`,
        `${WORKSHOP_SEATS} seats, so everyone gets help`,
        "One real job from your business, running by the end",
        "You keep everything built on the day",
      ],
      buttonLabel: "Pay now, lock the seat",
      action: { kind: "stripe", link: STRIPE_LINK_WORKSHOP },
      fallback: "Booking opens in the next few days. Elliot will email you the link first, before it goes public.",
    },
    seo: {
      title: "Hands-on AI Workshop Brisbane — Unpaste",
      description:
        "Bring your laptop and one real job. Build it with Elliot beside you and leave with it running. 10 seats, Brisbane.",
    },
  },

  "one-on-one": {
    slug: "one-on-one",
    path: "/one-on-one",
    name: "1:1 Setup Day",
    kicker: "1:1 setup · In person · Brisbane",
    headline: { main: "Set up properly,", accent: "in one day." },
    subhead: "Claude Code or Codex, on your machine, built around how your business runs.",
    lede:
      "Before the day, we write down what AI should be doing for you. Then I come to you and we build it, together, until it's done.",
    facts: ["One day", "In your office", "Claude Code or Codex", "Brisbane"],
    steps: [
      { title: "Before the day, we write the list.", body: "The quoting. The follow-ups. Monday's numbers. Whatever is actually eating your week." },
      { title: "We build it in your office, together.", body: "On your laptop, in your accounts, with your real files. Not a demo environment." },
      { title: "You keep everything, and know how to extend it.", body: "No subscription to us. The workspace, the instructions and the habits stay with you." },
    ],
    forYou: [
      "You run the business, or you can sign off on this.",
      "You've tried AI tools and want it set up properly, once.",
      "You'd rather one focused day than a course you never finish.",
    ],
    notFor: [
      "Someone who wants it built without being in the room.",
      "A team of more than two. See team training instead.",
      "A general AI talk.",
    ],
    askTeamSize: false,
    cta: "Check availability",
    reveal: {
      title: "You're a fit. Let's find the day.",
      // TODO(elliot): price and length to confirm.
      price: "Price on the call",
      priceNote: "one day, in person, Brisbane",
      includes: [
        "A pre-day call to write the list",
        "A full day in your office, Elliot beside you",
        "Everything built stays yours",
        "A follow-up call two weeks later",
      ],
      buttonLabel: "Book a 20-minute call",
      action: { kind: "calendly", url: calendlyUrl("one-on-one") },
      fallback: "",
    },
    seo: {
      title: "1:1 Claude Code Setup Day, Brisbane — Unpaste",
      description:
        "One day, in your office. We write down what AI should do for your business, then build it on your machine until it's done.",
    },
  },

  team: {
    slug: "team",
    path: "/team-training",
    name: "Team AI Training",
    kicker: "Team training · Up to 12 · We come to you",
    headline: { main: "Put AI to work", accent: "in your business." },
    subhead: "Practical training built around your team's real work.",
    lede:
      "We come to you, find the tasks eating the team's time, build the first workflows together on the day, then keep the momentum with weekly catch-ups.",
    facts: ["Up to 12 people", "In your office", "Brisbane", "2 spots left in October"],
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
    cta: "Check October dates",
    reveal: {
      title: "You're a fit. Two October dates left.",
      price: "$2,500",
      priceNote: "+ GST · for the day, up to 12 people",
      includes: [
        "A planning call before the day",
        "A full day in your office, built around your team's work",
        "Weekly catch-up calls after",
        "Everything built stays with the team",
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
