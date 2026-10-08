// POST /api/assessment-lead — the free Efficiency Score assessment.
//
// The Express handler in server/index.ts never ran on Vercel (only api/* does),
// so every submission since the move 404'd. This mirrors that handler: log the
// lead, forward it to ASSESSMENT_WEBHOOK_URL when set, always answer ok so the
// form never shows an error for a lead we did receive.

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false }), {
      status: 405,
      headers: { "content-type": "application/json", allow: "POST" },
    });
  }

  let lead: unknown;
  try {
    lead = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const record = { type: "assessment", receivedAt: new Date().toISOString(), ...(lead as object) };
  console.log("[LEAD]", JSON.stringify(record));

  const webhookUrl = process.env.ASSESSMENT_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    }).catch((err: unknown) => console.error("[LEAD WEBHOOK ERROR]", err));
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}
