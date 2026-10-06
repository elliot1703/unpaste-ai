import type React from "react";
import { ArrowRight, Check, Star, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ApplyForm } from "@/components/ApplyForm";
import type { Offer } from "@/lib/offers";
import type { WorkshopVariant } from "@/lib/workshopVariants";
import { GOOGLE_RATING, GOOGLE_REVIEW_URL, reviewsFor } from "@/lib/reviews";

// One page shape for all three offers. Price is never on the page; the form
// reveals it. Everything named here (date, seats, reviews, photos) is true or
// it doesn't ship.

const PHOTOS = [
  { src: "/images/workshops/2026-09-16/notebook.webp", alt: "Elliot helping an attendee work through a build on their laptop", label: "Building" },
  { src: "/images/workshops/2026-09-16/standing.webp", alt: "Attendees and Elliot standing around the workshop table in conversation", label: "Asking" },
  { src: "/images/workshops/2026-09-16/couch.webp", alt: "Two attendees troubleshooting a build together on the breakout couch", label: "Fixing" },
];

const BUILT = [
  { title: "An agent that enters the CRM for her", body: "Anna now hands monday.com entry to her agent instead of doing it by hand. Her words: admin time noticeably down." },
  { title: "A brand guide the agent can read", body: "The voice, the standards and the never-list, saved once so nobody re-explains them." },
  { title: "One recurring job, running from the workspace", body: "The task that kept coming back, handed over with instructions the agent follows." },
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
      <SEO title={variant ? `${headline.main} ${headline.accent}` : offer.seo.title} description={offer.seo.description} url={url} noIndex={!canonical} />
      <Navigation />

      <main>
        <section className="offer-hero">
          <figure className="offer-hero-photo">
            <img src="/images/workshops/2026-09-16/hands-on.webp" alt="Elliot working beside workshop attendees on their laptops" width={1200} height={1500} fetchPriority="high" />
            <figcaption>The first Brisbane room · 16 September 2026</figcaption>
          </figure>
          <div className="offer-hero-copy">
            <p className="offer-kicker">{offer.kicker}</p>
            <h1>{headline.main} <span>{headline.accent}</span></h1>
            <p className="offer-subhead">{subhead}</p>
            <p className="offer-lede">{lede}</p>
            <ul className="offer-facts">
              {offer.facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="offer-proofbar">
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-rating">
            <span className="offer-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span>
            <strong>{GOOGLE_RATING.score} on Google</strong>
            <span>{GOOGLE_RATING.count} reviews, all five stars</span>
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
          <h2>Three steps. <span>No slides.</span></h2>
          <ol className="offer-steps">
            {offer.steps.map((s, i) => (
              <li key={s.title}>
                <b>0{i + 1}</b>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {offer.slug === "workshop" && (
          <section className="offer-section offer-built">
            <p className="offer-kicker">What people built last time</p>
            <h2>Real jobs, <span>not demos.</span></h2>
            <ul className="offer-built-list">
              {BUILT.map((b) => (
                <li key={b.title}><h3>{b.title}</h3><p>{b.body}</p></li>
              ))}
            </ul>
          </section>
        )}

        <section className="offer-section offer-room">
          <p className="offer-kicker">The room</p>
          <h2>Laptops open. <span>Questions asked.</span></h2>
          <div className="offer-photo-strip">
            {PHOTOS.map((p) => (
              <figure key={p.src}>
                <img src={p.src} alt={p.alt} loading="lazy" width={1200} height={1200} />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
          <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta} <ArrowRight className="h-4 w-4" /></a>
        </section>

        <section className="offer-section offer-reviews" id="reviews">
          <p className="offer-kicker">Every Google review, in full</p>
          <h2>{GOOGLE_RATING.score} from {GOOGLE_RATING.count}. <span>Named, not anonymous.</span></h2>
          <div className="offer-review-list">
            {reviews.map((r) => (
              <article key={r.name}>
                <header>
                  <span className="offer-stars" aria-label="Five stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span>
                  <strong>{r.name}</strong>
                  {r.business && <span>{r.business}</span>}
                </header>
                {r.text.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </article>
            ))}
          </div>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="offer-text-link">Read them on Google <ArrowRight className="h-4 w-4" /></a>
        </section>

        <section className="offer-section offer-fit">
          <p className="offer-kicker">The honest bit</p>
          <h2>Useful if you're <span>past curious.</span></h2>
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
          <figure><img src="/images/elliot.webp" alt="Elliot, founder of Unpaste" loading="lazy" width={937} height={1250} /></figure>
          <div>
            <p className="offer-kicker">Who's teaching</p>
            <h2>Elliot. <span>On the floor all day.</span></h2>
            <p>Runs Unpaste on the same tools he teaches. Built his own business on agents first, then started showing Brisbane owners how. No theory, no slides, beside you when it gets stuck.</p>
          </div>
        </section>

        <section className="offer-section offer-apply" id="apply">
          <p className="offer-kicker">{offer.cta}</p>
          <h2>Three questions, <span>then the price.</span></h2>
          <p className="offer-lede">So Elliot knows what you're bringing, and so you're not reading a price for something that isn't a fit.</p>
          <ApplyForm offer={offer} variant={variant?.slug} />
        </section>
      </main>

      <Footer />

      <div className="offer-sticky">
        <div>
          <strong>{offer.facts[0]}</strong>
          <span>{offer.facts.slice(1, 3).join(" · ")}</span>
        </div>
        <a href="#apply" onClick={scrollToApply} className="offer-button">{offer.cta}</a>
      </div>
    </div>
  );
}
