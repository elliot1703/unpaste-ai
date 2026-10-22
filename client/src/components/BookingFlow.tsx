import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { trackMeta, trackMetaCustom } from "@/lib/metaPixel";
import { CALENDLY_BASE } from "@/lib/booking";
import type { Offer } from "@/lib/offers";

// The 1:1 booking flow (22 Oct 2026). Two taps, then first name and email, then the
// outcome for the job they picked with the calendar right there. Email is captured
// before anything is shown, so a person who stops after step 3 is still on the list
// and gets email 1. Business name, phone and "who runs the business" are gone: the
// phone comes from Calendly, the rest from the call.
//
// Pixel events keep the names the funnel dashboard already counts:
//   ApplyStart (first tap), ApplyDetails (reached the email step), Applied + Lead
//   (email captured), RevealClick (outcome screen shown), Booked + Schedule (call booked).

type Question = { key: "automate" | "stage"; title: string; hint: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    key: "automate",
    title: "What would you hand to AI first?",
    hint: "The day is built around it.",
    options: ["Quoting or proposals", "Emails and follow-ups", "Admin, invoicing or reports", "Content and marketing", "Not sure yet"],
  },
  {
    key: "stage",
    title: "Where are you at with AI?",
    hint: "No wrong answer. It tells me where to start you.",
    options: ["I use ChatGPT or Claude daily", "Tried a few things, nothing stuck", "Built something that half works", "Haven't started"],
  },
];

// Same words as follow-up email 1 in Klaviyo (offers/one-on-one/emails/1-straight-away.md
// in the funnel repo). Change both together.
const OUTCOMES: Record<string, { intro: string; points: string[] }> = {
  "Quoting or proposals": {
    intro: "You said quoting is the first thing you'd hand over. Here's what handed over looks like.",
    points: [
      "You send the job notes and site photos, the agent writes the quote off your rate card and it's in the customer's inbox before you've left the driveway.",
      "Quotes you haven't heard back on get a follow-up on day 3 and day 7, written the way you'd say it.",
      "Won quotes become jobs in your calendar and your job system without you typing them twice.",
    ],
  },
  "Emails and follow-ups": {
    intro: "You said emails and follow-ups are the first thing you'd hand over. Here's what handed over looks like.",
    points: [
      "Every enquiry gets a reply in your voice within minutes, with the next step already in it.",
      "Anyone you haven't heard back from gets chased on day 3 and day 7, and you see the thread before it goes if you want to.",
      "Monday morning you get one list: who's waiting on you, who went quiet, who's ready to book.",
    ],
  },
  "Admin, invoicing or reports": {
    intro: "You said admin, invoicing or reports are the first thing you'd hand over. Here's what handed over looks like.",
    points: [
      "Finished jobs turn into invoices without you opening the accounting software, and overdue ones get a polite nudge on their own.",
      "Receipts and bills get read, filed and matched, so month end is a check, not a weekend.",
      "Monday at 7am you get last week's numbers on your phone: sales, what's owed, what's booked.",
    ],
  },
  "Content and marketing": {
    intro: "You said content and marketing are the first thing you'd hand over. Here's what handed over looks like.",
    points: [
      "Every job becomes content. A photo from the site becomes the post, in your voice, naming the suburb, queued for you.",
      "Every finished job asks for a review the next day, with your Google link, so the suburbs you want fill up with proof.",
      "Every quote you sent and didn't hear back on gets chased on day 3 and day 7.",
    ],
  },
  "Not sure yet": {
    intro: "You're not sure yet what you'd hand over first. That's normal, and it's what the call is for. Here's the shape of it.",
    points: [
      "The one job you redo every week, whatever it is, done by an agent on your machine.",
      "The enquiries and quotes you haven't heard back on, chased on day 3 and day 7 in your voice.",
      "Monday at 7am, one message with who's waiting on you and what's booked.",
    ],
  },
};

type Answers = Partial<Record<Question["key"], string>>;
type State = "idle" | "submitting" | "done" | "error";

function readAttribution() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") ?? "",
    utmMedium: p.get("utm_medium") ?? "",
    utmCampaign: p.get("utm_campaign") ?? "",
    utmContent: p.get("utm_content") ?? "",
    page: window.location.pathname,
  };
}

export function BookingFlow({ offer, variant }: { offer: Offer; variant?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [state, setState] = useState<State>("idle");
  const [person, setPerson] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const attribution = useMemo(readAttribution, []);
  const total = QUESTIONS.length + 1;
  const ev = (name: string, params?: Record<string, unknown>) => trackMetaCustom(`${name}_oneonone`, { variant, ...params });

  function choose(key: Question["key"], value: string) {
    if (step === 0) ev("ApplyStart");
    if (step + 1 === QUESTIONS.length) ev("ApplyDetails");
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const lead = {
      stage: "email",
      offer: offer.slug,
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      automate: answers.automate ?? "",
      stage_answer: answers.stage ?? "",
      variant: variant ?? "",
      ...attribution,
    };
    try {
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error("apply failed");
      setPerson({ name: lead.name, email: lead.email });
      setState("done");
      trackMeta("Lead", { content_name: offer.name, content_category: offer.slug, variant });
      ev("Applied", { wants: answers.automate });
    } catch {
      setError("That didn't go through. Please try once more.");
      setState("error");
    }
  }

  if (state === "done") return <Outcome offer={offer} person={person} answer={answers.automate ?? "Not sure yet"} variant={variant} attribution={attribution} />;

  const q = QUESTIONS[step];

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
              <button type="button" key={opt} className={answers[q.key] === opt ? "is-selected" : undefined} onClick={() => choose(q.key, opt)}>
                <i aria-hidden="true">{answers[q.key] === opt && <Check />}</i>
                {opt}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <form className="apply-step apply-details" onSubmit={submit}>
          <h3>Where should I send it?</h3>
          <p>What {answers.automate && answers.automate !== "Not sure yet" ? answers.automate.toLowerCase() : "the job"} looks like handed over, in writing, plus the calendar to book a 20-minute call.</p>
          <label><span>First name</span><input name="name" autoComplete="given-name" required maxLength={60} /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <button className="apply-submit" disabled={state === "submitting"}>
            {state === "submitting" ? "One moment…" : "Show me"}
            {state !== "submitting" && <ArrowRight className="h-4 w-4" />}
          </button>
          {error && <p className="apply-error" role="alert">{error}</p>}
          <p className="apply-note">Elliot emails you what you asked for, and the call is yours to book if you want it. Unsubscribe any time.</p>
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

function Outcome({ offer, person, answer, variant, attribution }: {
  offer: Offer;
  person: { name: string; email: string };
  answer: string;
  variant?: string;
  attribution: ReturnType<typeof readAttribution>;
}) {
  const o = OUTCOMES[answer] ?? OUTCOMES["Not sure yet"];
  const [booked, setBooked] = useState(false);
  useEffect(() => { trackMetaCustom("RevealClick_oneonone", { kind: "calendly", variant }); }, [variant]);

  async function onScheduled(payload: unknown) {
    setBooked(true);
    trackMeta("Schedule", { content_name: offer.name, content_category: offer.slug, variant });
    trackMetaCustom("Booked_oneonone", { variant });
    const p = (payload ?? {}) as { event?: { uri?: string }; invitee?: { uri?: string } };
    await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: "booked", offer: offer.slug, email: person.email, name: person.name, calendlyEvent: p.event?.uri ?? "", calendlyInvitee: p.invitee?.uri ?? "", variant: variant ?? "", ...attribution }),
    }).catch(() => undefined);
  }

  const calendlyUrl = (() => {
    const u = new URL(CALENDLY_BASE);
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("primary_color", "dc2626");
    u.searchParams.set("name", person.name);
    u.searchParams.set("email", person.email);
    u.searchParams.set("utm_source", attribution.utmSource || "site");
    u.searchParams.set("utm_medium", attribution.utmMedium || "page");
    u.searchParams.set("utm_campaign", "one-on-one");
    u.searchParams.set("utm_content", attribution.utmContent || variant || "direct");
    return u.toString();
  })();

  return (
    <div className="apply apply-reveal apply-outcome" role="status">
      <p className="apply-kicker">Sent to {person.email}</p>
      <h3>{booked ? `Done, ${person.name}. Talk soon.` : `${person.name}, here's where a day goes.`}</h3>
      {!booked && (
        <>
          <p className="apply-intro">{o.intro}</p>
          <ol className="apply-includes apply-points">
            {o.points.map((line) => <li key={line}><Check /> {line}</li>)}
          </ol>
          <p className="apply-intro">All of it runs on your machine, in your accounts, nothing to subscribe to. That's what we'd build in your office in one day. The price for the day is on the call, and if you're not satisfied with the day you get your money back.</p>
          <p className="apply-kicker apply-cal-kicker">Book the 20-minute call</p>
          <p className="apply-intro">Not a sales call. Bring what you've already tried and I'll tell you what's stopping it, whether or not you book a day.</p>
        </>
      )}
      {booked ? (
        <p className="apply-intro">The call's in both our calendars. Before it, have a think about the one job you'd most like off your plate. Elliot</p>
      ) : (
        <>
          <CalendlyInline url={calendlyUrl} onScheduled={onScheduled} />
          <p className="apply-note">Can't see the calendar? <a href={calendlyUrl} target="_blank" rel="noreferrer">Open it in a new tab</a>, or reply to the email and I'll call you.</p>
        </>
      )}
    </div>
  );
}

let calendlyScript: Promise<void> | null = null;
function loadCalendly(): Promise<void> {
  if (calendlyScript) return calendlyScript;
  calendlyScript = new Promise((resolve) => {
    if (document.querySelector('script[src*="assets.calendly.com"]')) return resolve();
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
  return calendlyScript;
}

function CalendlyInline({ url, onScheduled }: { url: string; onScheduled: (payload: unknown) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true;
    loadCalendly().then(() => {
      const w = window as unknown as { Calendly?: { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void } };
      if (alive && ref.current && w.Calendly && !ref.current.hasChildNodes()) w.Calendly.initInlineWidget({ url, parentElement: ref.current });
    });
    const onMessage = (e: MessageEvent) => {
      const d = e.data as { event?: string; payload?: unknown } | undefined;
      if (typeof e.origin === "string" && e.origin.includes("calendly.com") && d?.event === "calendly.event_scheduled") onScheduled(d.payload);
    };
    window.addEventListener("message", onMessage);
    return () => { alive = false; window.removeEventListener("message", onMessage); };
  }, [url, onScheduled]);
  return <div ref={ref} className="apply-cal" />;
}
