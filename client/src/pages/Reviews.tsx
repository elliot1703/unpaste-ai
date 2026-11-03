import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GOOGLE_LISTING_URL, GOOGLE_RATING, REVIEWS } from "@/lib/reviews";

// /reviews (3 Nov 2026): the five public Google reviews on a page of their own,
// so the listing can be shared where a Google Maps link gets no preview card
// (LinkedIn Featured). Every word inside the cards is the reviewer's, verbatim,
// from @/lib/reviews; reviewers appear by first name only and no session is
// labelled. The headline is the Featured title Elliot approved in
// unpaste/business/linkedin/profile-v2.md; the lede is the reviews heading he
// approved on the 1:1 page. The OG image (scripts/og-reviews.html) carries the
// rating so the share card reads "5.0 from 5 reviews" on its own.

const PAGE_URL = "https://unpaste.ai/reviews";
const OG_IMAGE = "https://unpaste.ai/images/og-reviews.png";

function Stars({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <span
      role="img"
      aria-label={`${GOOGLE_RATING.score} out of 5 stars`}
      className="inline-flex gap-0.5 text-primary"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={size} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="What people said after the sessions"
        description={`Unpaste on Google: ${GOOGLE_RATING.score} from ${GOOGLE_RATING.count} reviews, every one of them public. Hands-on AI workshops, 1:1 setup days and team training for Brisbane businesses.`}
        keywords="Unpaste reviews, Google reviews, AI workshop Brisbane reviews, AI training Brisbane, Claude Code workshop"
        url={PAGE_URL}
        image={OG_IMAGE}
      />

      <Navigation />

      <main className="container pt-28 pb-20 md:pt-36 md:pb-28">
        <header className="mb-12 md:mb-16">
          <span className="section-tag">[GOOGLE REVIEWS]</span>
          <h1 className="mt-3 max-w-4xl text-5xl leading-[0.95] tracking-tighter md:text-7xl">
            What people said after the sessions
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
            A few of the people I've trained, in their own words.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href={GOOGLE_LISTING_URL}
              target="_blank"
              rel="noreferrer"
              className="brutalist-button inline-flex items-center gap-3"
            >
              Read them on Google <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href="/workshops" className="brutalist-button-outline inline-flex items-center gap-3">
              See the workshop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section aria-label="Google rating" className="stats-grid mb-12 border border-border md:mb-16 md:grid-cols-3">
          <div className="min-w-0 p-6 md:p-8">
            <p className="display-number text-6xl md:text-7xl">{GOOGLE_RATING.score}</p>
            <p className="mono-label mt-3">On Google</p>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-4 p-6 md:p-8">
            <Stars size="h-5 w-5" />
            <p className="mono-label">
              {GOOGLE_RATING.count} reviews, every one of them public
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-4 p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-wider">
              Workshops, 1:1 training, team days.
            </p>
            <p className="mono-label">Brisbane</p>
          </div>
        </section>

        <section aria-label="Reviews" className="stats-grid border border-border md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <article key={r.name} className="flex min-w-0 flex-col gap-4 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="section-tag">[{String(i + 1).padStart(3, "0")}]</span>
                <Stars />
              </div>
              <h2 className="text-3xl tracking-tighter md:text-4xl">{r.name.split(" ")[0]}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {r.text.split(/\n\s*\n/).map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </article>
          ))}
          <aside className="flex min-w-0 flex-col justify-between gap-8 bg-foreground p-6 text-background md:p-8">
            <div>
              <span className="section-tag">[GOOGLE]</span>
              <p className="display-number mt-3 text-6xl md:text-7xl">{GOOGLE_RATING.score}</p>
              <p className="mono-label mt-3 text-background/70">From {GOOGLE_RATING.count} reviews</p>
            </div>
            <a
              href={GOOGLE_LISTING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 border-b-2 border-background pb-1 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
            >
              Read them on Google <ArrowUpRight className="h-4 w-4" />
            </a>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
