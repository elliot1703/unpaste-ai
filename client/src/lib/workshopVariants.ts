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
    audience: "The stalled — reads about it constantly, hasn't opened it",
    kicker: "[001] CLAUDE CODE · BRISBANE",
    subhead: "You've read enough about AI. One evening and it's running.",
    lede:
      "A three-hour, hands-on workshop in Brisbane. You bring your laptop and one job from your business that keeps coming back. You leave with Claude Code set up, taught about how you work, and doing that job.",
    problem: {
      heading: "IT WAS NEVER THE LEARNING CURVE",
      body:
        "You've got the skill packs downloaded. Tabs you keep meaning to read. Maybe a folder somewhere called ai stuff. What you haven't had is an evening where you sit down, install it properly, and point it at something of your own — with someone next to you when it breaks. That's the whole gap, and it's three hours wide.",
    },
    brain: {
      heading: "A FOLDER WITH YOUR RULES BAKED IN",
      body:
        "Halfway through the session the AI interviews you about how your business actually runs, and writes what it learns into a folder. How you word things. What you never do. Which jobs come back every week. It's plain text you own — so any agent can read it, and it can reach the tools you already run. You go home with it.",
    },
    outcomes: [
      "Claude Code installed and working on your own machine",
      "A folder of rules any agent can read — not locked to one vendor",
      "One real weekly job automated before you leave",
    ],
    objection: {
      heading: "“I'M NOT TECHNICAL”",
      body:
        "Neither was anyone else in the room. There's no code to write — you talk to it, in plain English, mostly by dictation. The most technical thing you'll do all night is name a folder.",
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
      "A three-hour, hands-on workshop in Brisbane. The difference between AI that answers you and AI that does the work is that the second one can reach your actual files. That's what we set up.",
    problem: {
      heading: "THE COPY-PASTE TAX",
      body:
        "You already use AI every day. You paste something in, get something good back, paste it into the real document, fix the formatting, and do it again tomorrow. The tool never sees your files, never remembers last week, never learns your standards. You're the integration layer — and it's costing you the hours it was supposed to save.",
    },
    brain: {
      heading: "SAME MODEL. YOUR DESK. YOUR TOOLS.",
      body:
        "Claude Code is the same intelligence with its hands on your machine — your folders, your documents, your inbox, your store, your ad account. In the session it interviews you and writes your rules into a folder it reads before every job. Stop re-explaining yourself every morning, and stop being the thing that carries data between systems.",
    },
    outcomes: [
      "AI working on your real files, not a chat window",
      "Your rules in a folder, connected to the tools you already run",
      "One recurring job running end to end",
    ],
    objection: {
      heading: "“I ALREADY PAY FOR CHATGPT”",
      body:
        "Keep it. This isn't a different subscription to argue about, it's a different shape of tool — one that opens files, edits them, and remembers. Most people leave using both, for different jobs.",
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
      "A three-hour, hands-on workshop in Brisbane. Write down how your business actually works, once, in a form that something can act on. Then hand it the jobs that keep landing back on your desk.",
    problem: {
      heading: "THE STUFF ONLY YOU KNOW",
      body:
        "How the quote gets worded. Which client gets the phone call, not the email. What never goes out without your eyes on it. It isn't in a system anywhere — it's in your head, which is why the work keeps coming back to you, and why onboarding anyone takes months.",
    },
    brain: {
      heading: "DOCUMENTED ONCE, THEN OPERATIONAL",
      body:
        "The session produces a folder holding your operating knowledge — standards, exceptions, the never-list — that an AI reads before every task. Unlike a procedures doc nobody opens, this one gets used daily and sharpens each time you correct it. It's plain text, so it isn't tied to one vendor: point whichever agent you're using at it and it works. An asset that stays when staff leave, and when tools change.",
    },
    outcomes: [
      "Your operating knowledge written down and usable",
      "A never-list your AI won't cross",
      "One recurring job off your desk for good",
    ],
    objection: {
      heading: "“I HAVEN'T GOT AN EVENING”",
      body:
        "That's the argument for coming, not against it. Three hours once, against a job that comes back every week for the rest of the year. Most attendees pick something that was eating a Sunday.",
    },
    cta: "Take a seat",
  },
];

export const variantBySlug = (slug: string): WorkshopVariant | null =>
  WORKSHOP_VARIANTS.find((v) => v.slug === slug) ?? null;
