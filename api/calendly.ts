// POST /api/calendly — Calendly's webhook for bookings and cancellations.
//
// Checks Calendly's signature, then passes the booking to the call sheet's
// Apps Script web app (LEAD_SHEET_URL). The script finds the applicant's row by
// email, writes the call time and moves Status to "Call booked"; a cancellation
// is noted and puts Status back to "New". A booking with no matching row gets
// its own row, marked "Calendly, no form", unless it came from the team-training
// form. The matching rules live in the script, next to the sheet.
//
// The webhook itself is created once through the Calendly API, with the same
// signing key as CALENDLY_WEBHOOK_SIGNING_KEY. Calendly retries for 24 hours
// when this route answers with an error, then switches the webhook off. So a
// sheet failure answers 502 and Calendly tries again; that is safe because the
// script leaves the sheet the same when it gets the same booking twice.

export const config = { runtime: "edge" };

// Calendly's example rejects signatures older than 3 minutes. Its docs do not
// say whether a retry is signed again, so the window covers the full 24 hours
// of retries. The HMAC is what proves the post came from Calendly.
const MAX_AGE_SECONDS = 25 * 60 * 60;

// What the script answers when it has done its job.
const SHEET_DONE = new Set(["ok", "no match", "skipped"]);

type Invitee = {
  email?: string;
  name?: string;
  rescheduled?: boolean;
  tracking?: { utm_source?: string | null } | null;
  questions_and_answers?: { question?: string; answer?: string }[] | null;
  scheduled_event?: { name?: string; start_time?: string } | null;
};

type Webhook = { event?: string; payload?: Invitee };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return new Response(null, { status: 405 });

  const key = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  const sheetUrl = process.env.LEAD_SHEET_URL;
  if (!key || !sheetUrl) {
    console.error("[calendly] CALENDLY_WEBHOOK_SIGNING_KEY or LEAD_SHEET_URL is not set");
    return new Response(null, { status: 500 });
  }

  const raw = await req.text();
  if (!(await signedByCalendly(req.headers.get("calendly-webhook-signature"), raw, key))) {
    console.error("[calendly] signature missing, wrong or too old");
    return new Response(null, { status: 401 });
  }

  let hook: Webhook;
  try {
    hook = JSON.parse(raw) as Webhook;
  } catch {
    return new Response(null, { status: 400 });
  }

  const event = hook.event === "invitee.created" ? "created" : hook.event === "invitee.canceled" ? "canceled" : null;
  const invitee = hook.payload;
  // A reschedule cancels the old booking and creates a new one; the new one
  // carries the update, so the cancellation half is skipped.
  if (!event || (event === "canceled" && invitee?.rescheduled)) return new Response(null, { status: 200 });
  if (!invitee?.email || !invitee.scheduled_event?.start_time) {
    console.error("[calendly] booking without an email or start time", hook.event);
    return new Response(null, { status: 200 });
  }

  const done = await sendToSheet(sheetUrl, {
    kind: "booking",
    event,
    email: invitee.email.trim(),
    name: (invitee.name ?? "").trim(),
    start: invitee.scheduled_event.start_time,
    eventName: invitee.scheduled_event.name ?? "",
    source: invitee.tracking?.utm_source ?? "",
    answers: (invitee.questions_and_answers ?? []).map((qa) => ({ q: qa.question ?? "", a: qa.answer ?? "" })),
  });
  return new Response(null, { status: done ? 200 : 502 });
}

// Calendly-Webhook-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<raw body>">
async function signedByCalendly(header: string | null, body: string, key: string): Promise<boolean> {
  const parts = new Map(
    (header ?? "").split(",").map((part) => {
      const at = part.indexOf("=");
      return [part.slice(0, at).trim(), part.slice(at + 1).trim()] as const;
    }),
  );
  const t = parts.get("t") ?? "";
  const v1 = parts.get("v1") ?? "";
  if (!/^\d+$/.test(t) || !/^[0-9a-f]{64}$/i.test(v1)) return false;
  if (Date.now() / 1000 - Number(t) > MAX_AGE_SECONDS) return false;

  const encoder = new TextEncoder();
  const hmacKey = await crypto.subtle.importKey(
    "raw", encoder.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["verify"],
  );
  const signature = new Uint8Array(v1.match(/../g)!.map((pair) => parseInt(pair, 16)));
  // verify() compares in constant time.
  return crypto.subtle.verify("HMAC", hmacKey, signature, encoder.encode(`${t}.${body}`));
}

type Booking = {
  kind: "booking";
  event: "created" | "canceled";
  email: string;
  name: string;
  start: string;
  eventName: string;
  source: string;
  answers: { q: string; a: string }[];
};

async function sendToSheet(url: string, booking: Booking): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
      // Calendly wants an answer within 10 seconds.
      signal: AbortSignal.timeout(8_000),
    });
    // A sign-in or error page can come back as a 200, so the status alone is not enough.
    const body = (await res.text()).trim();
    if (res.ok && SHEET_DONE.has(body)) {
      if (body !== "ok") console.log("[calendly]", booking.event, body);
      return true;
    }
    console.error("[calendly] lead sheet failed", res.status, body.slice(0, 200));
  } catch (err) {
    console.error("[calendly] lead sheet failed", err);
  }
  return false;
}
