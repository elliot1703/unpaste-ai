// GET /api/seats — live seat availability for the workshop sessions.
//
// Stripe is the source of truth. Each session is a Payment Link created with
// restrictions.completed_sessions.limit = 6; Stripe increments `count` on every
// completed checkout and deactivates the link at the limit. We only ever read.
//
// That means overselling is impossible regardless of what this endpoint returns:
// if our cached count is stale and two people click the last seat, the second is
// refused by Stripe at checkout, not by us.

export const config = { runtime: "edge" };

/** Session id -> Stripe Payment Link id. Mirrors SESSIONS in lib/workshops.ts. */
const LINKS: Record<string, string | undefined> = {
  s01: process.env.STRIPE_LINK_S01,
  s02: process.env.STRIPE_LINK_S02,
  s03: process.env.STRIPE_LINK_S03,
};

type SeatInfo = {
  sessionId: string;
  total: number;
  taken: number;
  soldOut: boolean;
};

type StripePaymentLink = {
  active?: boolean;
  restrictions?: {
    completed_sessions?: { count?: number; limit?: number };
  };
};

async function fetchLink(
  sessionId: string,
  linkId: string,
  key: string
): Promise<SeatInfo | null> {
  const res = await fetch(`https://api.stripe.com/v1/payment_links/${linkId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return null;

  const link = (await res.json()) as StripePaymentLink;
  const limit = link.restrictions?.completed_sessions?.limit;
  const count = link.restrictions?.completed_sessions?.count;

  // A link with no completed_sessions restriction has no seat cap configured —
  // treat it as unknown rather than inventing a number.
  if (typeof limit !== "number" || typeof count !== "number") return null;

  const taken = Math.min(count, limit);
  return {
    sessionId,
    total: limit,
    taken,
    // Stripe deactivates the link at the limit; honour either signal.
    soldOut: taken >= limit || link.active === false,
  };
}

export default async function handler(): Promise<Response> {
  const key = process.env.STRIPE_RESTRICTED_KEY;

  const entries = Object.entries(LINKS).filter(
    (e): e is [string, string] => typeof e[1] === "string" && e[1].length > 0
  );

  // Nothing configured yet (or no key) — return an empty set. The page renders
  // its "not yet on sale" state rather than an error.
  if (!key || entries.length === 0) {
    return json({ seats: [] }, 200);
  }

  const results = await Promise.all(
    entries.map(([sessionId, linkId]) =>
      fetchLink(sessionId, linkId, key).catch(() => null)
    )
  );

  return json({ seats: results.filter((r): r is SeatInfo => r !== null) }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      // 60s at the edge collapses all traffic to ~3 Stripe calls a minute.
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
