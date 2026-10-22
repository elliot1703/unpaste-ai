// POST /api/apply — the gated form on the workshop, 1:1 and team pages.
//
// Lands the lead in Klaviyo using the public (client) API, so no secret is
// needed: subscribe to the Email List with the answers as profile properties,
// then record an "Applied" event. If LEAD_WEBHOOK_URL is set (a Slack incoming
// webhook), a one-line notification goes there too. Klaviyo is the record;
// the webhook is a convenience and its failure never fails the request.
//
// Three stages (22 Oct 2026):
//   full   the workshop and team forms: name, business, email, phone, answers
//   email  the 1:1 booking flow: first name, email, answers. Same "Applied"
//          event, so follow-up email 1 fires the same way.
//   booked the 1:1 flow after Calendly confirms a call: a "Booked call" event
//          on the same profile, so the dashboard and the flow can see it.

export const config = { runtime: "edge" };

const KLAVIYO_COMPANY_ID = "XwRedj";
const KLAVIYO_LIST_ID = "T6SpEC"; // "Email List"
const KLAVIYO_REVISION = "2024-10-15";

type Lead = {
  stage?: "full" | "email" | "booked";
  offer: string;
  name: string;
  business?: string;
  email: string;
  phone?: string;
  automate?: string;
  stage_answer?: string;
  role?: string;
  teamSize?: string;
  variant?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  page?: string;
  calendlyEvent?: string;
  calendlyInvitee?: string;
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false }, 405);

  let lead: Lead & { stage?: string };
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }

  // The 1:1 flow sends its "Where are you at with AI?" answer as `stage`, the same
  // key the older form used, so read the flow stage first and keep the answer.
  const flowStage = lead.stage === "email" || lead.stage === "booked" ? lead.stage : "full";
  const aiStage = flowStage === "full" ? (lead.stage ?? "") : (lead.stage_answer ?? "");

  const email = typeof lead?.email === "string" ? lead.email.trim() : "";
  if (!email.includes("@") || typeof lead?.offer !== "string" || !lead.offer) {
    return json({ ok: false, error: "email and offer are required" }, 400);
  }
  if (flowStage !== "booked" && (typeof lead?.name !== "string" || !lead.name.trim())) {
    return json({ ok: false, error: "name is required" }, 400);
  }
  const phoneDigits = typeof lead?.phone === "string" ? lead.phone.replace(/\D/g, "") : "";
  if (flowStage === "full") {
    if (typeof lead?.business !== "string" || !lead.business.trim() || !/^0[2-9]\d{8}$/.test(phoneDigits)) {
      return json({ ok: false, error: "name, business, email, an Australian phone number and offer are required" }, 400);
    }
    lead.phone = phoneDigits;
  }

  const [firstName, ...rest] = (lead.name ?? "").trim().split(/\s+/);
  const klaviyoHeaders = { "content-type": "application/json", revision: KLAVIYO_REVISION };
  const profileAttrs = (props: Record<string, string>) => ({
    email,
    ...(firstName ? { first_name: firstName } : {}),
    ...(rest.length ? { last_name: rest.join(" ") } : {}),
    ...(lead.business ? { organization: lead.business } : {}),
    properties: props,
  });
  const clientEvent = (metric: string, props: Record<string, string>) =>
    fetch(`https://a.klaviyo.com/client/events?company_id=${KLAVIYO_COMPANY_ID}`, {
      method: "POST",
      headers: klaviyoHeaders,
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: props,
            metric: { data: { type: "metric", attributes: { name: metric } } },
            profile: { data: { type: "profile", attributes: profileAttrs(props) } },
          },
        },
      }),
    });

  if (flowStage === "booked") {
    const props = {
      offer: lead.offer,
      calendly_event: lead.calendlyEvent ?? "",
      calendly_invitee: lead.calendlyInvitee ?? "",
      booked_from: lead.page ?? "",
      booked_at: new Date().toISOString(),
      variant: lead.variant ?? "",
    };
    const res = await clientEvent("Booked call", props);
    if (!res.ok) console.error("[apply] klaviyo booked event failed", res.status, await res.text());
    await ping(`Call booked (${lead.offer}): ${lead.name || email} · ${email}`);
    return json({ ok: res.ok }, res.ok ? 202 : 502);
  }

  const properties: Record<string, string> = {
    offer: lead.offer,
    business: lead.business ?? "",
    phone: lead.phone ?? "",
    automate_first: lead.automate ?? "",
    ai_stage: aiStage,
    role: lead.role ?? "",
    team_size: lead.teamSize ?? "",
    variant: lead.variant ?? "",
    utm_source: lead.utmSource ?? "",
    utm_medium: lead.utmMedium ?? "",
    utm_campaign: lead.utmCampaign ?? "",
    utm_content: lead.utmContent ?? "",
    applied_from: lead.page ?? "",
    applied_at: new Date().toISOString(),
    capture: flowStage, // "full" form or "email" first
  };

  // Profile upsert carries the data; the subscribe call only adds list
  // membership (Klaviyo's client subscribe ignores profile fields on existing
  // profiles); the event is what flows trigger on.
  const upsert = fetch(`https://a.klaviyo.com/client/profiles?company_id=${KLAVIYO_COMPANY_ID}`, {
    method: "POST",
    headers: klaviyoHeaders,
    body: JSON.stringify({ data: { type: "profile", attributes: profileAttrs(properties) } }),
  });

  const subscribe = fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${KLAVIYO_COMPANY_ID}`, {
    method: "POST",
    headers: klaviyoHeaders,
    body: JSON.stringify({
      data: {
        type: "subscription",
        attributes: {
          custom_source: `apply:${lead.offer}`,
          profile: { data: { type: "profile", attributes: profileAttrs(properties) } },
        },
        relationships: { list: { data: { type: "list", id: KLAVIYO_LIST_ID } } },
      },
    }),
  });

  const event = clientEvent("Applied", properties);

  const [upRes, subRes, evtRes] = await Promise.all([upsert, subscribe, event]);
  if (!upRes.ok && !subRes.ok && !evtRes.ok) {
    return json({ ok: false, error: "klaviyo rejected the lead" }, 502);
  }
  // Any one failing is still a lead landed, but say so in the logs.
  if (!upRes.ok) console.error("[apply] klaviyo profile upsert failed", upRes.status, await upRes.text());
  if (!subRes.ok) console.error("[apply] klaviyo subscribe failed", subRes.status, await subRes.text());
  if (!evtRes.ok) console.error("[apply] klaviyo event failed", evtRes.status, await evtRes.text());

  await ping([
    `New ${lead.offer} application: ${lead.name}`,
    lead.business ? `(${lead.business})` : "",
    `· ${email}`,
    lead.phone ? `· ${lead.phone}` : "",
    lead.automate ? `· wants: ${lead.automate}` : "",
    lead.teamSize ? `· team ${lead.teamSize}` : "",
    lead.utmContent ? `· ad ${lead.utmContent}` : "",
  ].filter(Boolean).join(" "));

  return json({ ok: true }, 202);
}

async function ping(text: string): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => undefined);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
