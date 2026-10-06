import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { trackMeta } from "@/lib/metaPixel";
import type { Offer } from "@/lib/offers";

// The gate. Three quick questions, then details, then the price. Every answer
// lands on the Klaviyo profile so Elliot can call with context, and the Lead
// pixel fires on success so Meta has something frequent enough to learn from.

type Question = { key: "automate" | "stage" | "role" | "teamSize"; title: string; hint: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    key: "automate",
    title: "What would you hand to AI first?",
    hint: "We shape the day around it.",
    options: ["Quoting or proposals", "Emails and follow-ups", "Admin, invoicing or reports", "Content and marketing", "Not sure yet"],
  },
  {
    key: "stage",
    title: "Where are you at with AI?",
    hint: "No wrong answer. It tells us where to start you.",
    options: ["I use ChatGPT or Claude daily", "Tried a few things, nothing stuck", "Built something that half works", "Haven't started"],
  },
  {
    key: "role",
    title: "Who runs the business?",
    hint: "We work best with owners and operators.",
    options: ["It's mine", "I run it with a partner", "I can sign off on this", "Someone else would approve it"],
  },
];

const TEAM_SIZE: Question = {
  key: "teamSize",
  title: "How many people would join?",
  hint: "Up to 12 on the day.",
  options: ["2 to 4", "5 to 8", "9 to 12"],
};

type Answers = Partial<Record<Question["key"], string>>;
type State = "idle" | "submitting" | "done" | "error";

export function ApplyForm({ offer, variant }: { offer: Offer; variant?: string }) {
  const questions = useMemo(
    () => (offer.askTeamSize ? [...QUESTIONS, TEAM_SIZE] : QUESTIONS),
    [offer.askTeamSize]
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const attribution = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    return {
      utmSource: p.get("utm_source") ?? "",
      utmMedium: p.get("utm_medium") ?? "",
      utmCampaign: p.get("utm_campaign") ?? "",
      utmContent: p.get("utm_content") ?? "",
      page: window.location.pathname,
    };
  }, []);

  const total = questions.length + 1;
  const detailsStep = questions.length;

  function choose(key: Question["key"], value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => Math.min(s + 1, detailsStep));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const lead = {
      offer: offer.slug,
      name: String(form.get("name") ?? ""),
      business: String(form.get("business") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      ...answers,
      variant: variant ?? "",
      ...attribution,
    };
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error("apply failed");
      setEmail(lead.email);
      setState("done");
      trackMeta("Lead", { content_name: offer.name, content_category: offer.slug, variant });
    } catch {
      setError("That didn't go through. Please try once more.");
      setState("error");
    }
  }

  if (state === "done") return <Reveal offer={offer} email={email} variant={variant} />;

  const q = questions[step];

  return (
    <div className="apply" id="apply-form">
      <div className="apply-progress" aria-label={`Step ${step + 1} of ${total}`}>
        <span style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <p className="apply-count">{step + 1} / {total}</p>

      {q ? (
        <fieldset className="apply-step" key={q.key}>
          <legend>
            <h3>{q.title}</h3>
            <p>{q.hint}</p>
          </legend>
          <div className="apply-options">
            {q.options.map((opt) => (
              <button
                type="button"
                key={opt}
                className={answers[q.key] === opt ? "is-selected" : undefined}
                onClick={() => choose(q.key, opt)}
              >
                <i aria-hidden="true">{answers[q.key] === opt && <Check />}</i>
                {opt}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <form className="apply-step apply-details" onSubmit={submit}>
          <h3>Your details.</h3>
          <p>So Elliot can get in touch. The price is on the next screen.</p>
          <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
          <label><span>Business name</span><input name="business" autoComplete="organization" /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
          <button className="apply-submit" disabled={state === "submitting"}>
            {state === "submitting" ? "One moment…" : "See the price"}
            {state !== "submitting" && <ArrowRight className="h-4 w-4" />}
          </button>
          {error && <p className="apply-error" role="alert">{error}</p>}
          <p className="apply-note">Elliot will be in touch by email or phone about {offer.name}. No list, no spam.</p>
        </form>
      )}

      {step > 0 && (
        <button type="button" className="apply-back" onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}
    </div>
  );
}

function Reveal({ offer, email, variant }: { offer: Offer; email: string; variant?: string }) {
  const r = offer.reveal;
  const ref = variant || "direct";
  const href =
    r.action.kind === "stripe"
      ? r.action.link
        ? `${r.action.link}?client_reference_id=${encodeURIComponent(ref)}&prefilled_email=${encodeURIComponent(email)}`
        : undefined
      : r.action.url;

  return (
    <div className="apply apply-reveal" role="status">
      <p className="apply-kicker">Next step</p>
      <h3>{r.title}</h3>
      <p className="apply-price">
        <strong>{r.price}</strong> <span>{r.priceNote}</span>
      </p>
      <ul className="apply-includes">
        {r.includes.map((line) => (
          <li key={line}><Check /> {line}</li>
        ))}
      </ul>
      {href ? (
        <a
          className="apply-submit"
          href={href}
          onClick={() => trackMeta("InitiateCheckout", { content_name: offer.name, content_category: offer.slug, variant })}
        >
          {r.buttonLabel} <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <p className="apply-fallback">{r.fallback}</p>
      )}
      <p className="apply-note">Elliot has your details and will be in touch at {email}.</p>
    </div>
  );
}
