// Three honest doors into the same next-workshop first-notice funnel.
// The body, proof and form stay identical so we can compare the message rather
// than accidentally testing three different offers.

export type WorkshopVariant = {
  slug: string;
  label: string;
  audience: string;
  kicker: string;
  headline: { main: string; accent: string };
  subhead: string;
  lede: string;
};

export const WORKSHOP_VARIANTS: WorkshopVariant[] = [
  {
    slug: "start",
    label: "A · Watch it work",
    audience: "Already uses AI and wants to see it take useful action",
    kicker: "AI WORKSHOP · BRISBANE",
    headline: { main: "WATCH IT", accent: "DO THE WORK." },
    subhead: "Not a webinar. Not a prompt pack.",
    lede:
      "Bring your laptop and a real job from your business. Build with Elliot beside you, then leave with something useful working and the confidence to keep going.",
  },
  {
    slug: "beyond-chat",
    label: "B · Beyond chat",
    audience: "Uses AI daily but is tired of being the copy-paste layer",
    kicker: "BEYOND THE CHAT WINDOW · BRISBANE",
    headline: { main: "STOP", accent: "COPY-PASTING." },
    subhead: "AI can do more than hand the work back to you.",
    lede:
      "Bring your laptop and the job you keep moving between tabs. We’ll build a practical way for an agent to work across the files and tools your business already uses.",
  },
  {
    slug: "systems",
    label: "C · Systems",
    audience: "An operator ready to turn business knowledge into a working system",
    kicker: "PRACTICAL AGENTS · BRISBANE",
    headline: { main: "PUT AN AGENT", accent: "ON YOUR BUSINESS." },
    subhead: "Turn the way you work into something your AI can use.",
    lede:
      "Bring one recurring job and the rules in your head. We’ll turn them into a workspace you own, then put it to work while you’re still in the room.",
  },
];

export const variantBySlug = (slug: string): WorkshopVariant | null =>
  WORKSHOP_VARIANTS.find((variant) => variant.slug === slug) ?? null;
