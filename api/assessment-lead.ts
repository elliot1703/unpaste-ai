// POST /api/assessment-lead — capture leads from the /assessment funnel.
//
// The form posts here when the user reaches the results step. Klaviyo is the
// destination of record: each submission fires an "Assessment Completed" event,
// which auto-creates/updates the profile for that email. Profiles are created
// WITHOUT marketing consent — the form promises "no spam, no newsletters", so
// nothing here subscribes anyone to anything.
//
// ASSESSMENT_WEBHOOK_URL, if set, receives a JSON copy of the raw lead (escape
// hatch for a Sheet or other integration). Every lead is also logged, so a
// missing key degrades to log-only rather than dropping the lead silently.

export const config = { runtime: "edge" };

type Lead = {
  name?: string;
  email?: string;
  business?: string;
  industry?: string;
  manualDataEntryHours?: string;
  softwareToolsCount?: string;
  biggestBottleneck?: string;
  automateFirst?: string;
  hourSavingsValue?: string;
  submittedAt?: string;
};

async function sendToKlaviyo(lead: Lead, key: string): Promise<boolean> {
  const [firstName, ...restName] = (lead.name ?? "").trim().split(/\s+/);

  const res = await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      "Content-Type": "application/json",
      revision: "2024-10-15",
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: {
            industry: lead.industry,
            manualDataEntryHours: lead.manualDataEntryHours,
            softwareToolsCount: lead.softwareToolsCount,
            biggestBottleneck: lead.biggestBottleneck,
            automateFirst: lead.automateFirst,
            hourSavingsValue: lead.hourSavingsValue,
            business: lead.business,
          },
          time: lead.submittedAt,
          metric: {
            data: {
              type: "metric",
              attributes: { name: "Assessment Completed" },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: lead.email,
                ...(firstName ? { first_name: firstName } : {}),
                ...(restName.length ? { last_name: restName.join(" ") } : {}),
                ...(lead.business ? { properties: { business: lead.business } } : {}),
              },
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    console.error("[LEAD KLAVIYO ERROR]", res.status, await res.text());
  }
  return res.ok;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ ok: false, error: "method not allowed" }, 405);
  }

  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  // Log first — this is the backstop if no destination is configured.
  console.log("[LEAD]", JSON.stringify(lead));

  // Klaviyo needs an identifier; a lead with no email can only be logged.
  const klaviyoKey = process.env.KLAVIYO_PRIVATE_KEY;
  let stored = "log";
  if (klaviyoKey && lead.email) {
    const ok = await sendToKlaviyo(lead, klaviyoKey).catch((err: unknown) => {
      console.error("[LEAD KLAVIYO ERROR]", err);
      return false;
    });
    if (ok) stored = "klaviyo";
  }

  const webhookUrl = process.env.ASSESSMENT_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((err: unknown) => console.error("[LEAD WEBHOOK ERROR]", err));
  }

  return json({ ok: true, stored }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
