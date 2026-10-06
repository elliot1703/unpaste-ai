// POST /api/workshop-interest — first-notice capture for the next workshop.
// Same story as assessment-lead: the Express route never existed on Vercel.

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false }), {
      status: 405,
      headers: { "content-type": "application/json", allow: "POST" },
    });
  }

  let lead: { name?: unknown; email?: unknown } = {};
  try {
    lead = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (
    typeof lead.name !== "string" ||
    !lead.name.trim() ||
    typeof lead.email !== "string" ||
    !lead.email.includes("@")
  ) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const record = { type: "workshop-interest", receivedAt: new Date().toISOString(), ...lead };
  console.log("[WORKSHOP INTEREST]", JSON.stringify(record));

  const webhookUrl =
    process.env.WORKSHOP_INTEREST_WEBHOOK_URL || process.env.ASSESSMENT_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    }).catch((err: unknown) => console.error("[WORKSHOP INTEREST WEBHOOK ERROR]", err));
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 202,
    headers: { "content-type": "application/json" },
  });
}
