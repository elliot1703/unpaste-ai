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
import { GOOGLE_RATING, GOOGLE_REVIEW_URL, REVIEWS, reviewsFor } from "@/lib/reviews";
import { TOOLS } from "@/lib/integrations";

// /one-on-one/hand-over (22 Oct 2026): the 1:1 offer rebuilt on the $100M Offers
// frameworks. Same facts and the same booking flow as /one-on-one; what changes
// is the order and the framing: a named offer, the person first, the cost of
// the problem in the reader's own numbers, every review in full, the stack with
// the price stated, the bonuses, the guarantee, why there aren't many, then the
// ask. Photos and stills are all from the 16 Sep 2026 workshop at Gather.
// Every number is one Elliot has said out loud or one the reader typed.
// Noindex and unlinked, so the two pages can be compared from ads.

const VARIANT = "hand-over";
const P = "/images/workshops/2026-09-16";
const S = `${P}/stills`;
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
    title: "A call before the day, so we arrive with the list already written.",
    body: "20 minutes to pick the one job worth handing over first, and what it needs access to. You don't guess, and neither do I.",
    img: `${S}/talking.webp`,
    alt: "Elliot talking a group through a build, phone in hand",
  },
  {
    title: `${HAND_OVER.hours} hours in your office, with me beside you the whole time.`,
    body: "On your laptop, in your accounts, on real jobs. When it breaks, I'm at your shoulder, not on a slide. By the end of the day the job runs without you.",
    img: `${S}/over-laptop.webp`,
    alt: "Elliot leaning over an attendee's laptop, pointing at the screen",
  },
  {
    title: "An agent that's yours to keep, with no subscription to me.",
    body: "It runs on your machine. You keep the workspace, the instructions and the habits, and you know how to extend them. Agents do the legwork. You make the calls.",
    img: `${S}/two-at-laptop.webp`,
    alt: "Elliot and an attendee working through a build on one laptop",
  },
];

const BONUSES = [
  {
    n: "01",
    title: `${HAND_OVER.whatsappWeeks} weeks on WhatsApp after the day`,
    body: `Something breaks, or you want it doing more. Message me. ${HAND_OVER.whatsappWeeks} weeks from the day.`,
  },
  { n: "02", title: "The Unpaste skill library and repos", body: "The skills and repos I hand every client, refreshed as they change." },
  { n: "03", title: "A check-in call two weeks later", body: "A call two weeks after the day. What's running, what drifted, what's next." },
];

const ROOM = [
  { src: `${P}/notebook.webp`, alt: "Elliot helping an attendee work through a build on their laptop", cap: "Working through a build" },
  { src: `${S}/couch.webp`, alt: "Elliot leaning in beside an attendee on the couch, both looking at her laptop", cap: "On the couch" },
  { src: `${P}/conversation.webp`, alt: "Elliot talking through a build with two attendees at the whiteboard", cap: "At the whiteboard" },
  { src: `${S}/listening.webp`, alt: "Two attendees listening at the table, laptops open", cap: "Laptops open" },
  { src: `${P}/gather-anna.webp`, alt: "Elliot and an attendee at Gather in Bulimba", cap: "Gather, Bulimba" },
  { src: `${S}/standing-talk.webp`, alt: "Elliot standing beside a seated attendee, talking through a problem", cap: "Talking it through" },
];

const aud = (n: number) => `A$${Math.round(n).toLocaleString("en-AU")}`;

// Plain hash links don't reliably scroll inside the SPA, so every CTA scrolls itself.
function scrollToApply(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById("apply");
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Stars = () => <span className="offer-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span>;

export default function HandOverPage() {
  const pulls = reviewsFor(offer.slug);
  useEffect(() => { trackMetaCustom("OfferView_oneonone", { variant: VARIANT }); }, []);
  const url = "https://unpaste.ai/one-on-one/hand-over";
  const scarcityExtra = [
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
            <h1>Hand over the job that eats your week, <span>and see it running by the end of one day.</span></h1>
            <p className="offer-subhead">I come to your office, build the agent on your laptop with your real files, and don't leave until you've watched it run. For Brisbane owner-operators who've tried ChatGPT and watched it hand the work back.</p>
            <p className="offer-lede">{HAND_OVER.hours} hours, in person. Your quoting, your follow-ups or Monday's numbers, done by an agent you keep. Not satisfied with the day, full refund.</p>
            <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
            <p className="offer-guarantee"><Check /> {offer.guarantee}</p>
          </div>
        </section>

        <section className="offer-proofbar">
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-rating">
            <Stars />
            <strong>{GOOGLE_RATING.score} on Google</strong>
            <span>{GOOGLE_RATING.count} reviews</span>
          </a>
          <div className="offer-pulls">
            {pulls.slice(0, 2).map((r) => (
              <blockquote key={r.name}>
                <p>“{r.pull}”</p>
                <footer>{r.name}{r.business ? `, ${r.business}` : ""}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="offer-section">
          <div className="gso-split gso-who">
            <figure><img src={`${P}/room-elliot.webp`} alt="Elliot in the workshop room at Gather, Bulimba" loading="lazy" width={1280} height={1600} /></figure>
            <div>
              <p className="offer-kicker">Who's teaching</p>
              <h2>Who you'll be spending the day with.</h2>
              <p className="offer-lede">Elliot Stone, founder of Unpaste. I run my own business on the same tools I'll set up for you, and I teach Brisbane business owners to do the same, hands-on, laptops open. Even this page was built by talking to Claude Code, not typing.</p>
              <ul className="offer-facts">
                <li>Founder, Unpaste</li>
                <li>Brisbane</li>
                <li>{GOOGLE_RATING.score} on Google</li>
                <li>Workshops at Gather, Bulimba</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">Your week</p>
          <h2>If any of this sounds like your week, the day was built for you.</h2>
          <div className="gso-split">
            <div>
              <ul className="gso-problems">
                {PROBLEMS.map((p) => <li key={p}><X /> {p}</li>)}
              </ul>
              <p className="gso-turn">That's the list we work from. Not a demo, not a slide deck. Your jobs, your files, your accounts.</p>
            </div>
            <figure><img src={`${P}/over-shoulder.webp`} alt="Over the shoulder of attendees working at the table" loading="lazy" width={1200} height={1200} /></figure>
          </div>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">What it costs you now</p>
          <h2>Here's what that one job is costing you right now, in your own numbers.</h2>
          <p className="offer-lede">Move the sliders to roughly match the job you'd hand over. The maths is yours, not mine.</p>
          <CostNow />
        </section>

        <section className="offer-section gso-reviews" id="reviews">
          <p className="offer-kicker">Google reviews</p>
          <h2>What people who've learnt this from me say about it.</h2>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-rating gso-rating">
            <Stars />
            <strong>{GOOGLE_RATING.score} on Google</strong>
            <span>{GOOGLE_RATING.count} reviews, every one of them public</span>
          </a>
          <div className="gso-review-wall">
            {REVIEWS.map((r) => (
              <article key={r.name}>
                <header>
                  <Stars />
                  <strong>{r.name}</strong>
                  {r.business && <span>{r.business}</span>}
                </header>
                {r.text.split(/\n\s*\n/).map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
              </article>
            ))}
          </div>
          <p className="offer-kicker gso-shots-kicker">As they appear on Google</p>
          <div className="offer-review-list gso-shots">
            {REVIEWS.map((r) => (
              <figure key={r.name}>
                <img src={r.screenshot} alt={`Google review from ${r.name}${r.business ? `, ${r.business}` : ""}`} loading="lazy" />
              </figure>
            ))}
          </div>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-text-link">Read them on Google <ArrowRight className="h-4 w-4" /></a>
        </section>

        <section className="offer-section">
          <p className="offer-kicker">Everything in the day</p>
          <h2>Here's everything you get when you book a Hand-Over Day.</h2>
          <ol className="gso-stack">
            {STACK.map((s, i) => (
              <li key={s.title}>
                <figure><img src={s.img} alt={s.alt} loading="lazy" width={900} height={1600} /></figure>
                <b>0{i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
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
          <h2>And three things that come with the day, because the weeks after are where it sticks.</h2>
          <p className="offer-lede">The day is where it gets built. The weeks after are where it either becomes a habit or quietly stops. These come with every day.</p>
          <div className="gso-bonuses">
            {BONUSES.map((b) => (
              <article key={b.n}>
                <p className="offer-kicker">Bonus {b.n}</p>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
          <figure className="offer-wide-photo gso-wide">
            <img src={`${P}/couch-help.webp`} alt="Elliot beside an attendee on the couch, both looking at the laptop" loading="lazy" width={1600} height={900} />
            <figcaption>The week after is when the questions come. That's what the WhatsApp is for.</figcaption>
          </figure>
        </section>

        <section className="offer-section">
          <div className="gso-split gso-guarantee-wrap">
            <div className="gso-guarantee">
              <p className="offer-kicker">The guarantee</p>
              <h2>If you're not satisfied with the day, you get every dollar back.</h2>
              <p>I can promise that because the work happens in front of you, on your files, and you see it run before I leave. If the day wasn't worth it, say so and I'll refund the lot.</p>
            </div>
            <figure><img src={`${P}/hands-on.webp`} alt="Elliot between two attendees, pointing at the screen" loading="lazy" width={1200} height={1500} /></figure>
          </div>
        </section>

        <section className="offer-section">
          <div className="gso-split gso-split-rev">
            <figure><img src={`${S}/teaching.webp`} alt="Elliot teaching at the front of the room, attendees at their laptops" loading="lazy" width={900} height={1600} /></figure>
            <div>
              <p className="offer-kicker">Why there aren't many</p>
              <h2>I run every one of these myself, in person, so there are only so many days in a month.</h2>
              <p className="offer-lede">There's no team to hand you to and no junior doing the build. It's me, in your office, one business at a time.{scarcityExtra ? ` ${scarcityExtra}` : ""}</p>
            </div>
          </div>
        </section>

        <section className="offer-section gso-room">
          <p className="offer-kicker">The room</p>
          <h2>This is what it looks like when I'm sitting beside you.</h2>
          <div className="gso-reel-wrap">
            <RoomReel />
            <div>
              <p className="offer-lede">The Unpaste workshop at Gather, Bulimba, 16 September 2026. The 1:1 day runs the same way: your laptop open, me at your shoulder, with the room to yourself.</p>
              <div className="offer-photo-strip">
                {ROOM.map((p) => (
                  <figure key={p.src}>
                    <img src={p.src} alt={p.alt} loading="lazy" width={900} height={900} />
                    <figcaption>{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="offer-section offer-apply" id="apply">
          <p className="offer-kicker">Two taps, then your email</p>
          <h2>Pick the job you'd hand over first, and I'll show you what it looks like done.</h2>
          <p className="offer-lede">Then book the 20-minute call, right here.</p>
          <BookingFlow offer={offer} variant={VARIANT} />
        </section>

        <section className="offer-section">
          <p className="offer-kicker">How it runs</p>
          <h2>How the day actually runs, from the first call to the check-in two weeks later.</h2>
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

        <section className="offer-section offer-tools">
          <p className="offer-kicker">What it connects to</p>
          <h2>It works with the tools you already use, not a new system you have to learn.</h2>
          <p className="offer-lede">We connect the agent to the apps your business already runs on, the way I set them up for my own: which connections are worth making first, what to give the agent access to, what to keep it away from, and the habits that keep it useful after the day.</p>
          <ul className="offer-logos">
            {TOOLS.map((t) => (
              <li key={t.key}><img src={t.logo} alt="" width={28} height={28} loading="lazy" /><span>{t.name}</span></li>
            ))}
          </ul>
        </section>

        <section className="offer-section offer-fit">
          <p className="offer-kicker">Fit</p>
          <h2>Who this is for, and who it isn't.</h2>
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
          <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
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
