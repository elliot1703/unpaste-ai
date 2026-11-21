// POST /api/assessment-lead — the contact step of the /assessment calculator.
//
// Creates or updates a GoHighLevel contact (the CRM) with what the visitor told
// the calculator. No card: there is no pipeline for assessment leads. The
// assessment form shows no contact-consent line, and the consent field says so,
// so nobody is added to a list or emailed from here.
//
// Needs GHL_PRIVATE_TOKEN and GHL_LOCATION_ID (the same variables /api/apply
// uses). Logs carry a status code, never the person.

export const config = { runtime: "edge" };

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_FIELDS = {
  automate: "0g4agGJ8OaLvPw63pKIR", // First job for AI
  offer: "Z6ZOerMn39ifdE0i7kXF", // Offer
  appliedAt: "plvk0O1uRcOVvIgMVlpA", // Applied at
  consentBasis: "yMeDVbZmBaUzqPVggQYi", // Consent basis
};
const CONSENT_BASIS =
  "Assessment form (unpaste.ai/assessment): no contact-consent line shown; details left to see the results.";

type AssessmentLead = {
  name?: string;
  email?: string;
  business?: string;
  automateFirst?: string;
};

type RequestContext = { waitUntil: (promise: Promise<unknown>) => void };

export default async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false }, 405);

  let lead: AssessmentLead;
  try {
    lead = (await req.json()) as AssessmentLead;
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }
  if (typeof lead?.email !== "string" || !lead.email.includes("@")) {
    return json({ ok: false, error: "email is required" }, 400);
  }

  ctx.waitUntil(sendToGhl(lead));
  return json({ ok: true }, 202);
}

async function sendToGhl(lead: AssessmentLead): Promise<void> {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return;
  const [firstName, ...rest] = (lead.name ?? "").trim().split(/\s+/);
  const field = (id: string, value: string | undefined) => (value ? [{ id, fieldValue: value }] : []);

  try {
    const r = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        version: "v3",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        firstName: firstName || undefined,
        lastName: rest.join(" ") || undefined,
        email: lead.email!.trim().toLowerCase(),
        companyName: lead.business?.trim() || undefined,
        country: "AU",
        source: "unpaste.ai assessment",
        customFields: [
          ...field(GHL_FIELDS.automate, lead.automateFirst),
          ...field(GHL_FIELDS.offer, "assessment"),
          ...field(GHL_FIELDS.appliedAt, new Date().toISOString()),
          ...field(GHL_FIELDS.consentBasis, CONSENT_BASIS),
        ],
      }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!r.ok) console.error("[assessment-lead] ghl contact failed", r.status);
  } catch (err) {
    console.error("[assessment-lead] ghl failed", err instanceof Error ? err.name : "error");
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
