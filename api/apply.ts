// POST /api/apply — the gated-pricing form for the workshop, 1:1 and team pages.
//
// Lands the lead in Klaviyo using the public (client) API, so no secret is
// needed: subscribe to the Email List with the answers as profile properties,
// then record an "Applied" event. If LEAD_WEBHOOK_URL is set (a Slack incoming
// webhook), a one-line notification goes there too. Klaviyo is the record;
// the webhook is a convenience and its failure never fails the request.

export const config = { runtime: "edge" };

const KLAVIYO_COMPANY_ID = "XwRedj";
const KLAVIYO_LIST_ID = "T6SpEC"; // "Email List"
const KLAVIYO_REVISION = "2024-10-15";

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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false }, 405);

  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }

  if (
    typeof lead?.name !== "string" || !lead.name.trim() ||
    typeof lead?.email !== "string" || !lead.email.includes("@") ||
    typeof lead?.offer !== "string" || !lead.offer
  ) {
    return json({ ok: false, error: "name, email and offer are required" }, 400);
  }

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

  const [subRes, evtRes] = await Promise.all([subscribe, event]);
  if (!subRes.ok && !evtRes.ok) {
    return json({ ok: false, error: "klaviyo rejected the lead" }, 502);
  }
  // One of the two failing is still a lead landed, but say so in the logs.
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

  return json({ ok: true }, 202);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
