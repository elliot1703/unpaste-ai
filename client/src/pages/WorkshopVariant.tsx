import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BrainDiagram } from "@/components/BrainDiagram";
import { VenueBand } from "@/components/VenueBand";
import { SessionsSection } from "@/components/SessionsSection";
import { VENUES, WORKSHOP_PRICE, nextSessionLabel } from "@/lib/workshops";
import { BRAIN_H1, type WorkshopVariant as Variant } from "@/lib/workshopVariants";

/**
 * A messaging variant of the workshop page.
 *
 * Every word above the fold is per-variant; everything that states fact —
 * price, dates, venue, seat availability — comes from the same data the live
 * page uses. A variant can reframe the offer but cannot misdescribe it.
 *
 * noIndex on all variants: three near-duplicate pages would otherwise compete
 * with /workshops for the same terms and split its ranking.
 */
export default function WorkshopVariantPage({ variant }: { variant: Variant }) {
  const venue = VENUES.gatherBulimba;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${BRAIN_H1.main} ${BRAIN_H1.accent}`}
        description={variant.lede}
        url={`https://unpaste.ai/workshops/${variant.slug}`}
        noIndex
      />
      <div className="grid-background" />
      <div className="relative z-10">
        <Navigation />

        {/* [001] Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-tag text-sm md:text-base mb-8"
              >
                {variant.kicker}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
              >
                {BRAIN_H1.main}{" "}
                <span className="text-primary">{BRAIN_H1.accent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight mb-8 max-w-3xl"
              >
                {variant.subhead}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl"
              >
                {variant.lede}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 items-start mb-8"
              >
                <a
                  href="#sessions"
                  className="brutalist-button inline-flex items-center gap-3"
                >
                  {variant.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#brain"
                  className="brutalist-button-outline inline-flex items-center gap-3"
                >
                  What you'll build
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mono-label"
              >
                {WORKSHOP_PRICE.display} {WORKSHOP_PRICE.suffix} · 3 HOURS ·
                SMALL GROUP · {venue.short.toUpperCase()} ·{" "}
                {nextSessionLabel()}
              </motion.p>
            </div>
          </div>
        </section>

        {/* [002] The problem */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag text-sm md:text-base mb-4">[002] THE PROBLEM</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6">
                {variant.problem.heading}
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                {variant.problem.body}
              </p>
            </div>
          </div>
        </section>

        {/* [003] Proof — needs a real screenshot */}
        <section className="py-16 md:py-20 border-t border-border bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="section-tag text-sm md:text-base mb-4">[003] FIVE MINUTES IN</div>
                <h2 className="text-3xl md:text-4xl leading-tight mb-6">
                  60 FILES. 5.3 GIGABYTES.{" "}
                  <span className="text-primary">SORTED IN FIVE MINUTES.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  That was the warm-up in a session last week. Not the
                  impressive part — just the moment you stop reading about it
                  and watch it touch your own machine.
                </p>
              </div>
              <ShotSlot
                label="Screenshot needed"
                hint="Konrad's desktop — before / after"
              />
            </div>
          </div>
        </section>

        {/* [004] The brain */}
        <section id="brain" className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="section-tag text-sm md:text-base mb-4">[004] WHAT YOU BUILD</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6">
                {variant.brain.heading}
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                {variant.brain.body}
              </p>
            </div>

            <div className="border border-border p-6 md:p-10 flex justify-center">
              <BrainDiagram />
            </div>

            <div className="stats-grid grid sm:grid-cols-3 border border-border mt-6">
              {variant.outcomes.map((o) => (
                <div key={o} className="p-6">
                  <Check className="h-5 w-5 text-primary mb-4" />
                  <p className="font-mono text-sm leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [005] The artefact — needs a real screenshot */}
        <section className="py-16 md:py-20 border-t border-border bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <ShotSlot
                label="Screenshot needed"
                hint="A real CLAUDE.md — never-list visible"
              />
              <div>
                <div className="section-tag text-sm md:text-base mb-4">[005] WHAT YOU TAKE HOME</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6">
                  THE CONFIDENCE TO{" "}
                  <span className="text-primary">KEEP BUILDING.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  A working setup on your laptop, your rules in a folder, one
                  job automated — and you know how to do the next one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* [006] The objection */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag text-sm md:text-base mb-4">[006] THE HONEST BIT</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6">
                {variant.objection.heading}
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                {variant.objection.body}
              </p>
            </div>
          </div>
        </section>

        {/* [007] The room */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag text-sm md:text-base mb-6">[007] THE ROOM</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                THIS IS WHERE{" "}
                <span className="text-primary">YOU'LL BE SITTING.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
                {venue.name}, {venue.street}, {venue.suburb}. Free parking on
                the street, and the room is a two-minute walk from Oxford
                Street.
              </p>
            </div>
            <VenueBand venue={venue} />
          </div>
        </section>

        {/* [008] Book */}
        <SessionsSection tag="[008] TAKE A SEAT" />

        <Footer />
      </div>
    </div>
  );
}

/**
 * Placeholder for imagery that has to be captured from a real machine.
 * Loud on purpose — an empty proof slot should look unfinished rather than
 * quietly render as nothing and ship that way.
 */
function ShotSlot({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="shot-slot">
      <span className="shot-slot__label">{label}</span>
      <span className="font-mono text-xs text-muted-foreground">{hint}</span>
    </div>
  );
}
