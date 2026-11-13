// POST /api/apply — the gated-pricing form for the workshop, 1:1 and team pages.
//
// Lands the lead in Klaviyo using the public (client) API, so no secret is
// needed: subscribe to the Email List with the answers as profile properties,
// then record an "Applied" event. If LEAD_WEBHOOK_URL is set (a Slack incoming
// webhook), a one-line notification goes there too. Klaviyo is the record;
// the webhook is a convenience and its failure never fails the request.
//
// If LEAD_SHEET_URL is set (a Google Apps Script web app), 1:1 applications
// are also added to the call sheet as a row. That runs after the reply has
// gone, so it can neither slow the applicant down nor change what they see.
//
// If GHL_PRIVATE_TOKEN and GHL_LOCATION_ID are both set, 1:1 applications also
// create a GoHighLevel contact and a card in the "1:1 Setup" pipeline, in the
// same after-the-reply way. The ids below are not secrets: nothing can be read
// or written with them without the token, which lives only in Vercel.

export const config = { runtime: "edge" };

const KLAVIYO_COMPANY_ID = "XwRedj";
const KLAVIYO_LIST_ID = "T6SpEC"; // "Email List"
const KLAVIYO_REVISION = "2024-10-15";

// Offers whose applications go to the call sheet.
const SHEET_OFFERS = new Set(["one-on-one"]);

// GoHighLevel (the CRM). Offers whose applications go there, and where.
const GHL_OFFERS = new Set(["one-on-one"]);
const GHL_API = "https://services.leadconnectorhq.com";
const GHL_PIPELINE_ID = "Hjc5cVjo6Isg7Fmg3gKs"; // "1:1 Setup"
const GHL_STAGE_APPLIED = "24d3d810-0fa2-4c3b-9a3f-8421e71f42a9";
const GHL_FIELDS = {
  automate: "0g4agGJ8OaLvPw63pKIR", // First job for AI
  stage: "qlKMnTnlMKhVVQqeN7oT", // AI stage
  role: "6eezM0qu26oHwSzhPcUe", // Role
  offer: "Z6ZOerMn39ifdE0i7kXF", // Offer
  utmSource: "ufq8CflHIpJ3JTml6ZNC", // UTM source
  utmCampaign: "XLHxaNTRw0ZFAgWgDpL6", // UTM campaign
  utmContent: "i5Mf8bgAm1WWPvKjTSvN", // UTM content
  appliedAt: "plvk0O1uRcOVvIgMVlpA", // Applied at
  consentBasis: "yMeDVbZmBaUzqPVggQYi", // Consent basis
};
// What the form told the applicant. Update it when the line under the 1:1
// form changes (client/src/lib/offers.ts, IN_TOUCH).
const GHL_CONSENT_BASIS =
  "1:1 form, live from 13 Nov 2026: \"We'll be in touch by phone or email about 1:1 Setup. Unsubscribe any time.\"";

type Lead = {
  offer: string;
  name: string;
  business?: string;
  email: string;
  phone?: string;
  automate?: string;
  stage?: string;
  role?: string;
  teamSize?: string;
  variant?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  page?: string;
};

type RequestContext = { waitUntil: (promise: Promise<unknown>) => void };

export default async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false }, 405);

  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }

  const phoneDigits = typeof lead?.phone === "string" ? lead.phone.replace(/\D/g, "") : "";
  if (
    typeof lead?.name !== "string" || !lead.name.trim() ||
    typeof lead?.business !== "string" || !lead.business.trim() ||
    typeof lead?.email !== "string" || !lead.email.includes("@") ||
    !/^0[2-9]\d{8}$/.test(phoneDigits) ||
    typeof lead?.offer !== "string" || !lead.offer
  ) {
    return json({ ok: false, error: "name, business, email, an Australian phone number and offer are required" }, 400);
  }
  lead.phone = phoneDigits;

  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const properties = {
    offer: lead.offer,
    business: lead.business ?? "",
    phone: lead.phone ?? "",
    automate_first: lead.automate ?? "",
    ai_stage: lead.stage ?? "",
    role: lead.role ?? "",
    team_size: lead.teamSize ?? "",
    variant: lead.variant ?? "",
    utm_source: lead.utmSource ?? "",
    utm_medium: lead.utmMedium ?? "",
    utm_campaign: lead.utmCampaign ?? "",
    utm_content: lead.utmContent ?? "",
    applied_from: lead.page ?? "",
    applied_at: new Date().toISOString(),
  };

  const klaviyoHeaders = {
    "content-type": "application/json",
    revision: KLAVIYO_REVISION,
  };

  // Profile upsert carries the data; the subscribe call only adds list
  // membership (Klaviyo's client subscribe ignores profile fields on existing
  // profiles); the event is what flows trigger on.
  const upsert = fetch(`https://a.klaviyo.com/client/profiles?company_id=${KLAVIYO_COMPANY_ID}`, {
    method: "POST",
    headers: klaviyoHeaders,
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: lead.email.trim(),
          first_name: firstName,
          last_name: rest.join(" "),
          organization: lead.business ?? "",
          properties,
        },
      },
    }),
  });

  const subscribe = fetch(
    `https://a.klaviyo.com/client/subscriptions?company_id=${KLAVIYO_COMPANY_ID}`,
    {
      method: "POST",
      headers: klaviyoHeaders,
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            custom_source: `apply:${lead.offer}`,
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: lead.email.trim(),
                  first_name: firstName,
                  last_name: rest.join(" "),
                  properties,
                },
              },
            },
          },
          relationships: { list: { data: { type: "list", id: KLAVIYO_LIST_ID } } },
        },
      }),
    }
  );

  const event = fetch(
    `https://a.klaviyo.com/client/events?company_id=${KLAVIYO_COMPANY_ID}`,
    {
      method: "POST",
      headers: klaviyoHeaders,
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties,
            metric: { data: { type: "metric", attributes: { name: "Applied" } } },
            profile: {
              data: {
                type: "profile",
                attributes: { email: lead.email.trim(), first_name: firstName, last_name: rest.join(" "), properties },
              },
            },
          },
        },
      }),
    }
  );

  const [upRes, subRes, evtRes] = await Promise.all([upsert, subscribe, event]);
  if (!upRes.ok && !subRes.ok && !evtRes.ok) {
    return json({ ok: false, error: "klaviyo rejected the lead" }, 502);
  }
  // Any one failing is still a lead landed, but say so in the logs.
  if (!upRes.ok) console.error("[apply] klaviyo profile upsert failed", upRes.status, await upRes.text());
  if (!subRes.ok) console.error("[apply] klaviyo subscribe failed", subRes.status, await subRes.text());
  if (!evtRes.ok) console.error("[apply] klaviyo event failed", evtRes.status, await evtRes.text());

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const line = [
      `New ${lead.offer} application: ${lead.name}`,
      lead.business ? `(${lead.business})` : "",
      `· ${lead.email}`,
      lead.phone ? `· ${lead.phone}` : "",
      lead.automate ? `· wants: ${lead.automate}` : "",
      lead.teamSize ? `· team ${lead.teamSize}` : "",
      lead.utmContent ? `· ad ${lead.utmContent}` : "",
    ].filter(Boolean).join(" ");
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: line }),
    }).catch(() => undefined);
  }

  ctx.waitUntil(sendToSheet(lead));
  ctx.waitUntil(sendToGhl(lead, firstName, rest.join(" "), properties.applied_at));

  return json({ ok: true }, 202);
}

// One row per application in the call sheet. No retries: Klaviyo stays the
// record, and a missed row shows in the logs.
async function sendToSheet(lead: Lead): Promise<void> {
  const url = process.env.LEAD_SHEET_URL;
  if (!url || !SHEET_OFFERS.has(lead.offer)) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        offer: lead.offer,
        name: lead.name.trim(),
        business: lead.business,
        email: lead.email.trim(),
        phone: lead.phone,
        automate: lead.automate,
        stage: lead.stage,
        role: lead.role,
        utmSource: lead.utmSource,
        utmCampaign: lead.utmCampaign,
        utmContent: lead.utmContent,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    // The script answers "ok" once the row is in. A sign-in or error page can
    // come back as a 200, so the status alone is not enough.
    const body = (await res.text()).trim();
    if (!res.ok || body !== "ok") console.error("[apply] lead sheet failed", res.status, body.slice(0, 200));
  } catch (err) {
    console.error("[apply] lead sheet failed", err);
  }
}

// One GHL contact and one card per 1:1 applicant. Off unless both variables
// are set. The contact is upserted by email (no tags: tags sent on an upsert
// replace the contact's existing ones). The card is created, never upserted,
// so someone who has moved on is not dragged back to "Applied"; GHL refuses a
// second card for the same contact in this pipeline, and that is fine. No
// retries: Klaviyo stays the record. Logs carry a status code, never the person.
async function sendToGhl(lead: Lead, firstName: string, lastName: string, appliedAt: string): Promise<void> {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId || !GHL_OFFERS.has(lead.offer)) return;
  const signal = AbortSignal.timeout(5_000); // one cap for both calls
  const post = (path: string, body: unknown) =>
    fetch(`${GHL_API}${path}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        version: "v3",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      signal,
    });
  const field = (id: string, value: string | undefined) => (value ? [{ id, fieldValue: value }] : []);

  try {
    const c = await post("/contacts/upsert", {
      locationId,
      firstName,
      lastName,
      email: lead.email.trim().toLowerCase(),
      phone: `+61${(lead.phone ?? "").slice(1)}`,
      companyName: lead.business?.trim(),
      country: "AU",
      source: "unpaste.ai application",
      customFields: [
        ...field(GHL_FIELDS.automate, lead.automate),
        ...field(GHL_FIELDS.stage, lead.stage),
        ...field(GHL_FIELDS.role, lead.role),
        ...field(GHL_FIELDS.offer, lead.offer),
        ...field(GHL_FIELDS.utmSource, lead.utmSource),
        ...field(GHL_FIELDS.utmCampaign, lead.utmCampaign),
        ...field(GHL_FIELDS.utmContent, lead.utmContent),
        ...field(GHL_FIELDS.appliedAt, appliedAt),
        ...field(GHL_FIELDS.consentBasis, GHL_CONSENT_BASIS),
      ],
    });
    if (!c.ok) return void console.error("[apply] ghl contact failed", c.status);
    const contactId = ((await c.json()) as { contact?: { id?: string } }).contact?.id;
    if (!contactId) return void console.error("[apply] ghl contact failed", "no id");

    const o = await post("/opportunities/", {
      locationId,
      contactId,
      pipelineId: GHL_PIPELINE_ID,
      pipelineStageId: GHL_STAGE_APPLIED,
      status: "open",
      name: `${lead.name.trim()}, ${lead.business?.trim()}`,
    });
    if (o.ok) return;
    const code = o.status === 400 ? ((await o.json().catch(() => ({}))) as { code?: string }).code : undefined;
    if (code !== "OPPORTUNITY_NO_DUPLICATE") console.error("[apply] ghl card failed", o.status);
  } catch (err) {
    console.error("[apply] ghl failed", err instanceof Error ? err.name : "error");
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
