import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Star, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BookingFlow } from "@/components/BookingFlow";
import { AskAgent } from "@/components/AskAgent";
import { trackMetaCustom } from "@/lib/metaPixel";
import { HAND_OVER, OFFERS, WORKSHOP_SEATS } from "@/lib/offers";
import { GOOGLE_RATING, GOOGLE_REVIEW_URL, reviewsFor } from "@/lib/reviews";

// /one-on-one/hand-over (22 Oct 2026): the 1:1 offer rebuilt on the $100M Offers
// frameworks. Same facts and the same booking flow as /one-on-one; what changes
// is the order and the framing: a named offer, the cost of the problem in the
// reader's own numbers, the stack, the bonuses, the guarantee, why there aren't
// many, then the ask. Every number on this page is one Elliot has said out loud
// or one the reader typed. Noindex and unlinked, so the two pages can be compared.

const VARIANT = "hand-over";
const P = "/images/workshops/2026-09-16";
const V = "/videos/workshops/2026-09-16";
const offer = OFFERS["one-on-one"];
const workshop = OFFERS.workshop;

const PROBLEMS = [
  "Quotes written at 9pm because the day went on the tools.",
  "Follow-ups you meant to send. The job went to whoever replied first.",
  "Monday's numbers built by hand from three apps that don't talk to each other.",
  "You tried ChatGPT. It wrote a paragraph and handed the work back.",
];

const STACK = [
  {
    title: "The list call, before the day.",
    body: "20 minutes to pick the one job worth handing over first, and what it needs access to. You don't guess, and neither do I.",
  },
  {
    title: `${HAND_OVER.hours} hours in your office, me beside you.`,
    body: "On your laptop, in your accounts, on real jobs. When it breaks, I'm at your shoulder, not on a slide. By the end of the day the job runs without you.",
  },
  {
    title: "The agent is yours.",
    body: "It runs on your machine. No subscription to Unpaste, nothing to rent. You keep the workspace, the instructions and the habits, and you know how to extend them. Agents do the legwork. You make the calls.",
  },
];

const BONUSES = [
  {
    n: "01",
    title: `${HAND_OVER.whatsappWeeks} weeks on WhatsApp`,
    body: `Something breaks, or you want it doing more. Message me. ${HAND_OVER.whatsappWeeks} weeks from the day.`,
  },
  { n: "02", title: "The Unpaste skill library", body: "The skills and repos I hand every client, refreshed as they change." },
  { n: "03", title: "The two-week check-in", body: "A call two weeks after the day. What's running, what drifted, what's next." },
];

const aud = (n: number) => `A$${Math.round(n).toLocaleString("en-AU")}`;

// Plain hash links don't reliably scroll inside the SPA, so every CTA scrolls itself.
function scrollToApply(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById("apply");
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HandOverPage() {
  const reviews = reviewsFor(offer.slug);
  useEffect(() => { trackMetaCustom("OfferView_oneonone", { variant: VARIANT }); }, []);
  const url = "https://unpaste.ai/one-on-one/hand-over";
  const scarcity = [
    "I run every day myself, in person, in Brisbane. There's no team to hand you to, so there are only so many days in a month.",
    HAND_OVER.daysPerMonth ? `${HAND_OVER.daysPerMonth} a month, booked through the call.` : "",
    HAND_OVER.deadline ?? "",
  ].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen offer-page">
      <SEO title={`${HAND_OVER.name}: one job off your plate in one day — Unpaste`} description={offer.seo.description} url={url} noIndex />
      <Navigation />

      <main>
        <section className="offer-hero">
          <img
            className="offer-hero-bg"
            src={`${P}/team-wide-1000.webp`}
            srcSet={`${P}/team-wide-640.webp 640w, ${P}/team-wide-1000.webp 1000w, ${P}/team-wide-1400.webp 1400w, ${P}/team-wide.webp 2000w`}
            sizes="100vw"
            alt=""
            width={2000}
            height={1124}
            fetchPriority="high"
          />
          <div className="offer-hero-copy">
            <ul className="offer-pills">
              {[HAND_OVER.name, "Brisbane", "In your office", `${HAND_OVER.hours} hours`].map((f) => <li key={f}>{f}</li>)}
            </ul>
            <ul className="offer-stack" aria-label="Built with">
              <li><img src="/images/logos/claude.svg" alt="" width={18} height={18} /> Claude</li>
              <li><img src="/images/logos/openai.svg" alt="" width={18} height={18} /> Codex</li>
            </ul>
            <h1>The job that eats your week, handed over. <span>By the end of one day.</span></h1>
            <p className="offer-subhead">For Brisbane owner-operators who've tried ChatGPT and watched it hand the work back. I build the agent in your office, on your real files, and you see it run before I leave.</p>
            <p className="offer-lede">{HAND_OVER.hours} hours. Your laptop. Your quoting, your follow-ups or Monday's numbers, done by an agent you keep. Not satisfied with the day, full refund.</p>
            <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
            <p className="offer-guarantee"><Check /> {offer.guarantee}</p>
          </div>
        </section>

        <section className="offer-proofbar">
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-rating">
            <span className="offer-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span>
            <strong>{GOOGLE_RATING.score} on Google</strong>
            <span>Google reviews</span>
          </a>
          <div className="offer-pulls">
            {reviews.slice(0, 2).map((r) => (
              <blockquote key={r.name}>
                <p>“{r.pull}”</p>
                <footer>{r.name}{r.business ? `, ${r.business}` : ""}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">The week</p>
          <h2>Sound familiar?</h2>
          <ul className="gso-problems">
            {PROBLEMS.map((p) => <li key={p}><X /> {p}</li>)}
          </ul>
          <p className="gso-turn">That list is what the day is built around. Not a demo. Your jobs, your files, your accounts.</p>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">What it costs now</p>
          <h2>Put your own numbers in.</h2>
          <p className="offer-lede">Pick the job and roughly what it takes. The maths is yours, not mine.</p>
          <CostNow />
        </section>

        <section className="offer-section">
          <p className="offer-kicker">Everything in the day</p>
          <h2>What you get.</h2>
          <ol className="offer-steps">
            {STACK.map((s, i) => (
              <li key={s.title}>
                <b>0{i + 1}</b>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </li>
            ))}
          </ol>
          <div className="gso-price">
            <p className="offer-kicker">{HAND_OVER.name}</p>
            <strong>{HAND_OVER.price}</strong>
            <span className="gso-price-note">{HAND_OVER.priceNote} · one day · Brisbane</span>
            <p>A workshop seat is A{workshop.reveal.price} + GST for {workshop.facts[1]} in a room of {WORKSHOP_SEATS}. This is {HAND_OVER.hours} hours with the room to yourself.</p>
            <p>The 20-minute call is free, and there's nothing to pay until you book the day.</p>
            <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">Included when you book a day</p>
          <h2>The {HAND_OVER.whatsappWeeks} weeks after.</h2>
          <p className="offer-lede">The day is where it gets built. The weeks after are where it sticks. These come with the day.</p>
          <div className="gso-bonuses">
            {BONUSES.map((b) => (
              <article key={b.n}>
                <p className="offer-kicker">Bonus {b.n}</p>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="offer-section">
          <div className="gso-guarantee">
            <p className="offer-kicker">The guarantee</p>
            <h2>Not satisfied with the day, every dollar back.</h2>
            <p>I can carry that risk because the work happens in front of you, on your files, and you see it run before I leave. If the day wasn't worth it, say so and you get a full refund.</p>
          </div>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">Why there aren't many</p>
          <h2>One business at a time.</h2>
          <p className="offer-lede">{scarcity}</p>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">The room</p>
          <h2>What beside you looks like.</h2>
          <div className="gso-reel-wrap">
            <RoomReel />
            <p className="offer-lede">The Unpaste workshop at Gather, Bulimba, 16 September 2026. The 1:1 day runs the same way: your laptop open, me at your shoulder, with the room to yourself.</p>
          </div>
        </section>

        <section className="offer-section offer-apply" id="apply">
          <p className="offer-kicker">Two taps, then your email</p>
          <h2>Pick the job. See it handed over.</h2>
          <p className="offer-lede">Then book the 20-minute call, right here.</p>
          <BookingFlow offer={offer} variant={VARIANT} />
        </section>

        <section className="offer-section">
          <p className="offer-kicker">How it runs</p>
          <h2>How the day runs.</h2>
          <ol className="offer-steps">
            {offer.steps.map((s, i) => (
              <li key={s.title}>
                <b>0{i + 1}</b>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </li>
            ))}
          </ol>
          <figure className="offer-wide-photo">
            <img src={`${P}/teaching-wide.webp`} alt="Elliot teaching at the front of the room while attendees work on their laptops" loading="lazy" width={1600} height={900} />
          </figure>
        </section>

        <section className="offer-section offer-reviews" id="reviews">
          <p className="offer-kicker">Reviews</p>
          <h2>What people say.</h2>
          <div className="offer-review-list">
            {reviews.map((r) => (
              <figure key={r.name}>
                <img src={r.screenshot} alt={`Google review from ${r.name}${r.business ? `, ${r.business}` : ""}: ${r.text.replace(/\s+/g, " ")}`} loading="lazy" />
              </figure>
            ))}
          </div>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-text-link">Read them on Google <ArrowRight className="h-4 w-4" /></a>
        </section>

        <section className="offer-section offer-fit">
          <p className="offer-kicker">Fit</p>
          <h2>Is it for you?</h2>
          <div className="offer-fit-grid">
            <article>
              <h3>It's for you if</h3>
              <ul>{offer.forYou.map((l) => <li key={l}><Check /> {l}</li>)}</ul>
            </article>
            <article>
              <h3>It's not</h3>
              <ul>{offer.notFor.map((l) => <li key={l}><X /> {l}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="offer-section offer-who">
          <figure><img src={`${P}/room-elliot.webp`} alt="Elliot in the workshop room at Gather, Bulimba" loading="lazy" width={1280} height={1600} /></figure>
          <div>
            <p className="offer-kicker">Who's teaching</p>
            <h2>Elliot Stone.</h2>
            <p>Founder of Unpaste. Runs his own business on the same tools he teaches, and works beside you on the day when something gets stuck.</p>
          </div>
        </section>
      </main>

      <Footer />

      <AskAgent offer={offer} />

      <div className="offer-sticky">
        <div>
          <strong>{offer.facts[0]}</strong>
          <span>100% money-back guarantee</span>
        </div>
        <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta}</a>
      </div>
    </div>
  );
}

// Cost of the problem in the reader's own numbers. Nothing here is a claim about
// their business: two sliders, one multiplication, 48 working weeks stated.
function CostNow() {
  const WEEKS = 48;
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(100);
  const touched = useRef(false);
  const yearHours = hours * WEEKS;
  const yearCost = yearHours * rate;
  const days = Math.round(yearHours / 8);
  const payback = Math.max(1, Math.ceil(HAND_OVER.priceAmount / (hours * rate)));

  function touch() {
    if (touched.current) return;
    touched.current = true;
    trackMetaCustom("CostCalc_oneonone", { variant: VARIANT });
  }

  return (
    <div className="gso-calc">
      <label>
        <span>Hours a week on this job <b>{hours} h</b></span>
        <input type="range" min={1} max={20} step={1} value={hours} onChange={(e) => { touch(); setHours(Number(e.target.value)); }} />
      </label>
      <label>
        <span>What an hour of your time is worth <b>A${rate}</b></span>
        <input type="range" min={50} max={300} step={10} value={rate} onChange={(e) => { touch(); setRate(Number(e.target.value)); }} />
      </label>
      <div className="gso-calc-out" aria-live="polite">
        <strong>{aud(yearCost)} a year</strong>
        <p>{hours} hours a week is {yearHours.toLocaleString("en-AU")} hours a year over {WEEKS} working weeks. That's {days} working days on one job.</p>
        <p className="gso-payback">The day is {HAND_OVER.price} {HAND_OVER.priceNote}. If the agent takes this job, it pays for itself in {payback === 1 ? "a week" : `${payback} weeks`}.</p>
      </div>
      <p className="gso-fine">Rough numbers. Bring your real ones to the call.</p>
    </div>
  );
}

// Muted loop of the 16 Sep workshop room. React doesn't always write the muted
// attribute, and autoplay depends on it, so it's set again on the element.
function RoomReel() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => undefined);
  }, []);
  return (
    <video
      ref={ref}
      className="gso-reel"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={`${V}/room-loop.jpg`}
      aria-label="The Unpaste workshop room at Gather, Bulimba, 16 September 2026"
    >
      <source src={`${V}/room-loop.mp4`} type="video/mp4" />
    </video>
  );
}
