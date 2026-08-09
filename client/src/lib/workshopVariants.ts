// Three messaging directions for the workshop landing page.
//
// NOT a statistical A/B test — at six seats and realistically a few hundred
// visitors, no split test reaches significance. These exist to be read side by
// side and chosen from, and to be reused as ad landing pages for later sessions.
//
// All three sell the identical workshop and centre on the same idea: you leave
// with a CLAUDE.md that knows your business. What differs is the door in —
// which reader state it speaks to, and which concrete job it leads with.

/**
 * The concept is the headline on every variant — that's the thing being
 * tested. Variants differ in the sub-head below it and everything after.
 */
export const BRAIN_H1 = { main: "BUILD YOUR BUSINESS", accent: "AN AI BRAIN." } as const;

export type VariantSection = { heading: string; body: string };

export type WorkshopVariant = {
  /** URL slug under /workshops/ */
  slug: string;
  /** Internal label for the picker + analytics */
  label: string;
  /** Who this door is for — shown on the comparison view, not the page. */
  audience: string;
  /** Mono kicker above the H1 */
  kicker: string;
  /** Variant-specific sub-head under the shared H1 */
  subhead: string;
  /** The paragraph under the H1 */
  lede: string;
  /** Section [002] — the problem being named */
  problem: VariantSection;
  /** Section [004] — what the brain is, in their terms */
  brain: VariantSection;
  /** Three outcomes under the diagram */
  outcomes: string[];
  /** Section [006] — objection this reader actually has */
  objection: VariantSection;
  /** Primary CTA label */
  cta: string;
};

export const WORKSHOP_VARIANTS: WorkshopVariant[] = [
  {
    slug: "start",
    label: "A · Start",
    audience: "Uses ChatGPT daily — ready for AI that acts, not answers",
    kicker: "[001] CLAUDE CODE · BRISBANE",
    subhead: "You already use AI every day. This is the next level — AI that actually does things.",
    lede:
      "Three hours, hands-on, Brisbane. Bring your laptop and one job that keeps coming back. Leave with it running.",
    problem: {
      heading: "YOU TALK TO AI EVERY DAY. IT STILL DOES NOTHING FOR YOU.",
      body:
        "ChatGPT answers your questions — then you go do the work anyway. The next level is AI with its hands on your actual business. Getting there takes one evening, with someone next to you when it breaks.",
    },
    brain: {
      heading: "A FOLDER WITH YOUR RULES BAKED IN",
      body:
        "Halfway through, the AI interviews you and writes your rules into a folder. How you word things. What you never do. Plain text you own — any agent can read it.",
    },
    outcomes: [
      "Claude Code installed and working on your own machine",
      "A folder of rules any agent can read — not locked to one vendor",
      "One real weekly job automated before you leave",
    ],
    objection: {
      heading: "“I'M NOT TECHNICAL”",
      body:
        "There's no code. You talk to it in plain English — mostly by dictation. The most technical thing you'll do all night is name a folder.",
    },
    cta: "Take a seat",
  },
  {
    slug: "beyond-chat",
    label: "B · Beyond chat",
    audience: "The ChatGPT plateau — uses AI daily, senses there's more",
    kicker: "[001] BEYOND THE CHAT WINDOW · BRISBANE",
    subhead: "You've hit the ceiling of copy and paste. This is what's past it.",
    lede:
      "AI that answers you isn't AI that does the work. The difference is reach — that's what we set up. Three hours, hands-on, Brisbane.",
    problem: {
      heading: "YOU'RE STILL THE ONE DOING THE COPY-PASTING.",
      body:
        "Paste in, copy out, fix the formatting, do it again tomorrow. The tool never sees your files and never remembers last week. You're the integration layer.",
    },
    brain: {
      heading: "SAME MODEL. YOUR DESK. YOUR TOOLS.",
      body:
        "The same intelligence, with its hands on your machine — files, inbox, store, ad account. Your rules live in a folder it reads before every job. Stop re-explaining yourself every morning.",
    },
    outcomes: [
      "AI working on your real files, not a chat window",
      "Your rules in a folder, connected to the tools you already run",
      "One recurring job running end to end",
    ],
    objection: {
      heading: "“I ALREADY PAY FOR CHATGPT”",
      body:
        "Keep it. This is a different shape of tool — one that opens files, edits them, and remembers. Most people end up using both.",
    },
    cta: "Take a seat",
  },
  {
    slug: "systems",
    label: "C · Systems",
    audience: "The operator — runs a team, thinks in process not tools",
    kicker: "[001] AN ASSET, NOT A SUBSCRIPTION · BRISBANE",
    subhead: "Your business runs on knowledge that only lives in your head. Write it down once, then put it to work.",
    lede:
      "How your business runs lives in your head. Write it down once, in a form an AI can act on. Three hours, hands-on, Brisbane.",
    problem: {
      heading: "EVERY JOB STILL ENDS UP BACK ON YOUR DESK.",
      body:
        "How the quote gets worded. Who gets a call, not an email. What never ships without your eyes on it. None of it is in a system — so the work keeps coming back to you.",
    },
    brain: {
      heading: "DOCUMENTED ONCE, THEN OPERATIONAL",
      body:
        "A folder holding your standards, your exceptions, your never-list — read before every task, sharper every time you correct it. Plain text, no vendor. It outlasts staff and tools.",
    },
    outcomes: [
      "Your operating knowledge written down and usable",
      "A never-list your AI won't cross",
      "One recurring job off your desk for good",
    ],
    objection: {
      heading: "“I HAVEN'T GOT AN EVENING”",
      body:
        "Three hours once, against a job that comes back every week. Most people bring the thing that was eating their Sunday.",
    },
    cta: "Take a seat",
  },
];

export const variantBySlug = (slug: string): WorkshopVariant | null =>
  WORKSHOP_VARIANTS.find((v) => v.slug === slug) ?? null;
