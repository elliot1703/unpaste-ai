// POST /api/ask — the "ask the agent that built this page" Easter egg.
//
// Answers questions about the three training offers via OpenRouter (or the
// Anthropic API directly). Facts below mirror client/src/lib/offers.ts (that file uses
// import.meta.env, so it can't be imported here); change both together.
// Guardrails live in the system prompt: offers and Elliot only, no invented
// prices, dates, venues or guarantees, price stays gated behind the form.

export const config = { runtime: "edge" };

// Provider: OpenRouter when OPENROUTER_API_KEY is set (per-key spend cap +
// per-key usage in openrouter.ai/keys, Elliot's choice 7 Oct 2026), else the
// Anthropic API directly with ANTHROPIC_API_KEY. ASK_MODEL overrides either.
const OPENROUTER_MODEL = process.env.ASK_MODEL || "anthropic/claude-sonnet-5.5";
const ANTHROPIC_MODEL = process.env.ASK_MODEL || "claude-sonnet-5-5";
const MAX_INPUT = 300;
const MAX_TURNS = 5;
const RATE_LIMIT = 30; // questions per IP per hour, best effort per edge instance

type Slug = "workshop" | "one-on-one" | "team";
type Turn = { role: "user" | "assistant"; content: string };

const FACTS: Record<Slug, string> = {
  workshop: `THE UNPASTE WORKSHOP
- Wednesday 11 November 2026, 4.5 hours, Brisbane. Venue is confirmed on booking (not decided yet; say "Brisbane, venue confirmed on booking").
- 10 seats.
- Price: $499 + GST early bird until 4 November, then $699 + GST. The page shows the price only after the short apply form, so when price comes up say the number AND "apply on this page and it's on the next screen".
- 100% money-back guarantee: not satisfied with the day, full refund.
- Bring a laptop and one real job from your business (the quote you rewrite every week, the inbox nobody owns, the report you build by hand).
- How the day runs: bring your laptop and one real job; build it with Elliot beside you (small room, laptops open, he's at your shoulder, not on a slide); leave with it running on your machine, in your accounts. You keep everything.
- For you if: you already use ChatGPT or Claude and want it doing the work; you can bring a laptop and one real piece of work; you're happy to learn by building, asking and fixing.
- Not: a keynote or slide-heavy AI overview; a developer course that expects code; a done-for-you implementation day.
- Tools covered: Claude and Codex (Claude Code or Codex set up on your machine), connected to tools like ServiceM8, Shopify, HubSpot, Instagram, Google Ads, Meta Ads, Gmail, Google Drive, Canva.`,
  "one-on-one": `1:1 SETUP DAY
- One day, in person, in your office, Brisbane. Claude Code or Codex set up on your machine, built around how your business runs.
- Before the day: a call to write down what AI should be doing (quoting, follow-ups, Monday's numbers). On the day: build it together on your laptop, in your accounts, with your real files. After: a follow-up call two weeks later. No subscription; you keep everything.
- Price: not published. Say "the price is covered on a 20-minute call; apply on this page to book it". Never guess a number.
- 100% money-back guarantee: not satisfied with the day, full refund.
- For: the owner or someone who can sign off; people who've tried AI tools and want it set up properly once; people who'd rather one focused day than a course.
- Not for: someone who wants it built without being in the room; teams of more than two (that's team training); a general AI talk.`,
  team: `TEAM AI TRAINING
- Up to 12 people, in your office, Brisbane and South East Queensland. Two dates left in October 2026.
- $2,500 + GST for the day, up to 12 people. Includes a planning call before, a full day built around the team's real work, weekly catch-up calls after. Everything built stays with the team.
- 100% money-back guarantee: not satisfied with the day, full refund.
- Booking: a 20-minute call first; apply on this page to book it.
- For: teams of two to twelve who already use ChatGPT or Claude; you want the team building, not watching.
- Not: a keynote for a hundred people; a done-for-you build with nobody from the team in the room; teams outside South East Queensland for now.`,
};

const ELLIOT = `ELLIOT STONE: founder of Unpaste (unpaste.ai), Brisbane. Runs his own business on the same tools he teaches and works beside people on the day when something gets stuck. Google rating 5.0 from 5 reviews. Reviewers say it cut their admin time, that he explains what an agent actually does and then sets one up so it works, and that the team upskilled.`;

const THIS_PAGE = `THIS PAGE: the page the visitor is on, its apply form, the follow-up emails and the Meta ads for it were built with Claude Code working with Elliot over two days in October 2026. If asked how, say that and suggest the 1:1 setup day or the workshop as the way to get the same thing for their business.`;

function systemPrompt(slug: Slug): string {
  return `You are the AI agent that helped build this page for Unpaste, answering visitors' questions about one offer. Plain Australian business English, no hype, no exclamation marks, under 80 words per answer, no markdown, no lists unless asked for steps.

Rules:
1. Only answer about the offer below, Elliot, Unpaste, and how this page was built. For anything else say you only know about the workshop and training, and point them to the apply form on this page.
2. Never invent a price, date, venue, seat count, guarantee or inclusion. If it isn't in the facts, say you don't know and that Elliot will answer after they apply.
3. When price or booking comes up, end with: "Apply on this page and the price is on the next screen."
4. Don't collect personal details. Don't promise outcomes.

${FACTS[slug]}

${ELLIOT}

${THIS_PAGE}`;
}

const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 3600_000 });
    return false;
  }
  h.n += 1;
  return h.n > RATE_LIMIT;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false }, 405);

  let body: { offer?: string; messages?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }

  const slug = (["workshop", "one-on-one", "team"] as Slug[]).includes(body.offer as Slug)
    ? (body.offer as Slug)
    : "workshop";
  const turns = (Array.isArray(body.messages) ? body.messages : [])
    .filter((t) => t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
    .slice(-(MAX_TURNS * 2))
    .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_INPUT) }));
  if (!turns.length || turns[turns.length - 1].role !== "user") {
    return json({ ok: false, error: "last message must be from the visitor" }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return json({ ok: true, answer: "That's a lot of questions. Apply on this page and Elliot will answer the rest himself." }, 200);
  }

  const system = systemPrompt(slug);
  const orKey = process.env.OPENROUTER_API_KEY;
  const anKey = process.env.ANTHROPIC_API_KEY;
  if (!orKey && !anKey) {
    return json({ ok: true, answer: "The agent's not switched on yet. Apply on this page and Elliot will answer you directly." }, 200);
  }

  let answer = "";
  try {
    if (orKey) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${orKey}`,
          "HTTP-Referer": "https://unpaste.ai",
          "X-Title": "unpaste.ai ask-the-agent",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          max_tokens: 220,
          messages: [{ role: "system", content: system }, ...turns],
        }),
      });
      if (res.status === 402) {
        // Per-key credit cap reached on OpenRouter: fail soft, say so in the logs.
        console.error("[ask] openrouter 402: key budget exhausted");
        return json({ ok: true, answer: "I've hit my question limit for now. Apply on this page and Elliot will answer you directly." }, 200);
      }
      if (!res.ok) throw new Error(`openrouter ${res.status} ${(await res.text()).slice(0, 300)}`);
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      answer = (data.choices?.[0]?.message?.content ?? "").trim();
    } else {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": anKey!, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: ANTHROPIC_MODEL, max_tokens: 220, system, messages: turns }),
      });
      if (!res.ok) throw new Error(`anthropic ${res.status} ${(await res.text()).slice(0, 300)}`);
      const data = (await res.json()) as { content?: { type: string; text?: string }[] };
      answer = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text ?? "").join("").trim();
    }
  } catch (e) {
    console.error("[ask]", (e as Error).message);
    return json({ ok: true, answer: "The agent dropped out for a second. Try again, or apply on this page and Elliot will answer you directly." }, 200);
  }

  return json({ ok: true, answer: answer || "Apply on this page and Elliot will answer that one directly." }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
