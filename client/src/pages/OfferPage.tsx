import type React from "react";
import { ArrowRight, Check, Star, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ApplyForm } from "@/components/ApplyForm";
import type { Offer } from "@/lib/offers";
import type { WorkshopVariant } from "@/lib/workshopVariants";
import { GOOGLE_RATING, GOOGLE_REVIEW_URL, reviewsFor } from "@/lib/reviews";
import { SESSIONS, WORKSHOP_PRICE } from "@/lib/workshops";
import { EXAMPLES, TOOLS, toolByKey } from "@/lib/integrations";

// Event schema for every dated workshop session. Only the canonical /workshops
// page carries it; the H1 variants are noindex. Emits nothing while sessions
// are undated, so it is safe to leave in place between runs.
const workshopEvents = () =>
  SESSIONS.filter((x) => x.isoDate && x.venue).map((x) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Claude Code Workshop, Brisbane",
    description:
      "A hands-on, small-group AI workshop in Brisbane. Bring your laptop and leave using Claude Code on your own work.",
    startDate: x.isoDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://unpaste.ai/workshops",
    location: {
      "@type": "Place",
      name: x.venue!.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: x.venue!.street,
        addressLocality: x.venue!.suburb,
        addressCountry: "AU",
      },
    },
    offers: {
      "@type": "Offer",
      price: String(WORKSHOP_PRICE.inclGstAmount),
      priceCurrency: "AUD",
      availability: x.paymentLinkId
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: "https://unpaste.ai/workshops",
    },
    organizer: { "@id": "https://unpaste.ai/#organization" },
    performer: { "@id": "https://unpaste.ai/#elliot" },
  }));

// One page shape for all three offers. Price is never on the page; the form
// reveals it. Everything named here (date, seats, reviews, photos) is true or
// it doesn't ship.

const P = "/images/workshops/2026-09-16";
const PHOTOS = [
  { src: `${P}/notebook.webp`, alt: "Elliot helping an attendee work through a build on their laptop" },
  { src: `${P}/conversation.webp`, alt: "Elliot talking through a build with two attendees at the whiteboard" },
  { src: `${P}/couch-help.webp`, alt: "Elliot beside an attendee on the couch, both looking at the laptop" },
  { src: `${P}/listening.webp`, alt: "Two attendees listening at the table, laptops open" },
  { src: `${P}/gather-anna.webp`, alt: "Elliot and an attendee at Gather in Bulimba" },
  { src: `${P}/over-shoulder.webp`, alt: "Over the shoulder of attendees working at the table" },
];

const BUILT = [
  { title: "A quote written from the job notes", body: "Photos and a few lines in, a priced quote out, ready to send. The agent uses your rate card, not a guess." },
  { title: "Customer details filed without typing", body: "Say what happened on the call. The agent puts the name, the job and the next step into the CRM." },
  { title: "The Monday numbers, before coffee", body: "Last week's sales, ad spend and new leads pulled into one short brief every Monday morning." },
  { title: "Posts that sound like you", body: "Your brand voice saved once. The agent drafts the week's posts and captions in it, you approve." },
];

// Plain hash links don't reliably scroll inside the SPA, so every CTA scrolls itself.
function scrollToApply(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById("apply");
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function OfferPage({
  offer,
  variant,
  canonical = true,
}: {
  offer: Offer;
  /** Workshop H1 test only: overrides the headline and marks the page noindex. */
  variant?: WorkshopVariant;
  canonical?: boolean;
}) {
  const headline = variant ? { main: variant.headline.main, accent: variant.headline.accent } : offer.headline;
  const subhead = variant?.subhead ?? offer.subhead;
  const lede = variant?.lede ?? offer.lede;
  const reviews = reviewsFor(offer.slug);
  const url = variant ? `https://unpaste.ai/workshops/${variant.slug}` : `https://unpaste.ai${offer.path}`;

  return (
    <div className="min-h-screen offer-page">
      <SEO
        title={variant ? `${headline.main} ${headline.accent}` : offer.seo.title}
        description={offer.seo.description}
        url={url}
        noIndex={!canonical}
        jsonLd={offer.slug === "workshop" && canonical ? workshopEvents() : undefined}
      />
      <Navigation />

      <main>
        <section className="offer-hero">
          <img className="offer-hero-bg" src={`${P}/hands-on.webp`} alt="" width={1200} height={1500} fetchPriority="high" />
          <div className="offer-hero-copy">
            <ul className="offer-pills">
              {offer.pills.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <h1>{headline.main} <span>{headline.accent}</span></h1>
            <p className="offer-subhead">{subhead}</p>
            <p className="offer-lede">{lede}</p>
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

        <section className="offer-section offer-tools">
          <p className="offer-kicker">What it connects to</p>
          <h2>Your agent, in the tools you already use.</h2>
          <p className="offer-lede">We show you how to connect an agent to the apps your business runs on, and the way we set them up ourselves: which connections are worth making first, what to give the agent access to, what to keep it away from, and the habits that keep it useful after the day.</p>
          <ul className="offer-logos">
            {TOOLS.map((t) => (
              <li key={t.key}><img src={t.logo} alt="" width={28} height={28} loading="lazy" /><span>{t.name}</span></li>
            ))}
          </ul>
          <div className="offer-examples">
            {EXAMPLES.map((ex) => (
              <article key={ex.ask} className="offer-example">
                <div className="offer-ask"><span>You</span><p>{ex.ask}</p></div>
                <ol>
                  {ex.steps.map((st) => {
                    const t = toolByKey(st.tool);
                    return (
                      <li key={st.text}><img src={t.logo} alt={t.name} width={22} height={22} loading="lazy" /><span>{st.text}</span></li>
                    );
                  })}
                </ol>
                <div className="offer-result"><Check /> {ex.result}</div>
              </article>
            ))}
          </div>
          <p className="offer-note">Examples of what you can set up on the day. What you build depends on the job you bring.</p>
        </section>

        {offer.slug === "workshop" && (
          <section className="offer-section offer-built">
            <p className="offer-kicker">Examples</p>
            <h2>What people build.</h2>
            <ul className="offer-built-list">
              {BUILT.map((b) => (
                <li key={b.title}><h3>{b.title}</h3><p>{b.body}</p></li>
              ))}
            </ul>
          </section>
        )}

        <section className="offer-section offer-room">
          <p className="offer-kicker">The room</p>
          <h2>What it looks like.</h2>
          <div className="offer-photo-strip">
            {PHOTOS.map((p) => (
              <figure key={p.src}>
                <img src={p.src} alt={p.alt} loading="lazy" width={1200} height={1200} />
              </figure>
            ))}
          </div>
          <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
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

        <section className="offer-section offer-apply" id="apply">
          <p className="offer-kicker">{offer.cta}</p>
          <h2>A few quick questions.</h2>
          <p className="offer-lede">So Elliot knows what you want to work on. The price is on the next screen.</p>
          <ApplyForm offer={offer} variant={variant?.slug} />
        </section>
      </main>

      <Footer />

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
