import {
  ArrowRight,
  BatteryCharging,
  Check,
  FileText,
  Landmark,
  Laptop,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BrainDiagram } from "@/components/BrainDiagram";
import { VenueBand } from "@/components/VenueBand";
import { SessionsSection } from "@/components/SessionsSection";
import {
  InstagramIcon,
  LinkedInIcon,
  MetaColourIcon,
  ShopifyColourIcon,
  HubSpotColourIcon,
} from "@/components/BrandIcons";
import { VENUES, WORKSHOP_PRICE, nextSessionLabel } from "@/lib/workshops";
import { BRAIN_H1, type WorkshopVariant as Variant } from "@/lib/workshopVariants";
import { ComposerBox, ClaudeConvo, IMessageThread } from "@/components/PromptBoxes";

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
export default function WorkshopVariantPage({
  variant,
  canonical = false,
}: {
  variant: Variant;
  /** True when this variant IS /workshops — indexed, canonical URL. */
  canonical?: boolean;
}) {
  const venue = VENUES.gatherBulimba;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={
          canonical
            ? "AI Workshop Brisbane — Build Your Business an AI Brain"
            : `${BRAIN_H1.main} ${BRAIN_H1.accent}`
        }
        description={variant.lede}
        url={
          canonical
            ? "https://unpaste.ai/workshops"
            : `https://unpaste.ai/workshops/${variant.slug}`
        }
        noIndex={!canonical}
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
                {WORKSHOP_PRICE.display} {WORKSHOP_PRICE.suffix} · 3.5 HOURS ·
                10 SEATS · {venue.short.toUpperCase()} ·{" "}
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

        {/* [003] What it unlocks — plain words, one line each */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="section-tag text-sm md:text-base mb-4">
                [003] ONCE IT'S LOADED
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6">
                WHAT YOU CAN DO{" "}
                <span className="text-primary">ONCE IT'S LOADED.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                The workshop gets the first job running. These are the ones
                people build next.
              </p>
            </div>

            <div className="stats-grid grid sm:grid-cols-2 lg:grid-cols-4 border border-border">
              {CAPABILITIES.map(({ title, line, icon }) => (
                <div key={title} className="p-6">
                  <div className="h-6 mb-4 flex items-center">{icon}</div>
                  <h3 className="font-mono text-sm font-bold tracking-wide mb-2">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            {/* The grid says what's possible; this shows what asking for it
                actually looks like — the real composer they'll type into,
                with the tools it reaches into alongside. */}
            <div className="mt-10">
              <p className="mono-label mb-4">What asking looks like</p>
              <ComposerBox
                prompt="Hey Claude, let's make a new landing page for the end-of-year sale. Use the transcript from yesterday's team brainstorm as the starting point. We'll also need an EDM in Mailchimp to match."
                steps={[
                  { action: "Reads the brainstorm transcript", tool: "Granola" },
                  { action: "Builds and deploys the page", tool: "Vercel" },
                  { action: "Drafts the matching EDM", tool: "Mailchimp" },
                ]}
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

            {/* The brain in use — the reply name-drops the rules folder the
                section just described. */}
            <div className="mt-10">
              <p className="mono-label mb-4">The brain, in use</p>
              <ClaudeConvo
                prompt="Draft this week's socials from the jobs we finished. The Henderson deck photos are in the shared folder."
                reply="Reading your brand voice file and the Henderson photos"
                after="12 min later"
                result="five posts drafted in your voice, ready to approve"
              />
            </div>
          </div>
        </section>

        {/* [005] The takeaway — the iMessage box paints the after-state:
            delegating from your phone like it's any other text thread. */}
        <section className="py-16 md:py-20 border-t border-border bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
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
              <div className="w-full lg:justify-self-end lg:max-w-md">
                <IMessageThread
                  messages={[
                    "Chase the three quotes that haven't replied, in my voice, and log the follow-ups in the CRM.",
                  ]}
                  reply="Done. Three follow-ups sent, CRM updated. Two have already opened it."
                  after="your tuesday now"
                  result="work you didn't do, done your way"
                />
              </div>
            </div>
          </div>
        </section>

        {/* [006] The objection */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="section-tag text-sm md:text-base mb-4">[006] THE HONEST BIT</div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6">
                  {variant.objection.heading}
                </h2>
                <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                  {variant.objection.body}
                </p>
                <p className="mono-label mb-3">WHO'S TEACHING THIS</p>
                <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                  I'm not a developer. I ran a gardening business in Bulimba —
                  and it became the test bed for my first AI agents. Watching
                  them work opened my eyes to what's possible, so I went all in
                  on learning it. Teaching is the next stage: you get the same
                  feeling of superpowers, without figuring it out alone.
                </p>
              </div>
              <figure className="m-0 lg:justify-self-end w-full max-w-md">
                <img
                  src="/images/elliot.webp"
                  alt="Elliot, outdoors in Brisbane"
                  loading="lazy"
                  decoding="async"
                  width={937}
                  height={1250}
                  className="w-full aspect-[4/5] object-cover border border-border"
                />
                <figcaption className="mono-label mt-3">
                  Elliot · started with a gardening business in Bulimba
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* [007] What you'll need */}
        <section className="py-16 md:py-20 border-t border-border bg-card">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="section-tag text-sm md:text-base mb-4">
                [007] WHAT YOU'LL NEED
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter">
                BRING <span className="text-primary">THREE THINGS.</span>
              </h2>
            </div>

            <div className="stats-grid grid sm:grid-cols-3 border border-border">
              {NEEDS.map(({ title, line, icon }) => (
                <div key={title} className="p-6">
                  <div className="h-6 mb-4 flex items-center">{icon}</div>
                  <h3 className="font-mono text-sm font-bold tracking-wide mb-2">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-mono text-sm text-muted-foreground mt-8 max-w-3xl leading-relaxed">
              That's the whole list. No code, no prep reading — everything else
              gets sorted in the room.
            </p>
          </div>
        </section>

        {/* [008] The room */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag text-sm md:text-base mb-6">[008] THE ROOM</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                THIS IS WHERE{" "}
                <span className="text-primary">YOU'LL BE SITTING.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
                {venue.name}, {venue.street}, {venue.suburb}. Free parking on
                site.
              </p>
              {venue.mapUrl && (
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-button-outline inline-flex items-center gap-3 mb-10"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Maps
                </a>
              )}
            </div>
            <VenueBand venue={venue} />
          </div>
        </section>

        {/* [009] Book */}
        <SessionsSection tag="[009] GRAB YOUR SEAT" />

        <Footer />
      </div>
    </div>
  );
}

/** The bring list — factual, so shared across variants like the room is. */
const NEEDS: { title: string; line: string; icon: React.ReactNode }[] = [
  {
    title: "YOUR LAPTOP",
    line: "Mac or Windows — whatever you actually work on.",
    icon: <Laptop className="h-6 w-6 text-primary" />,
  },
  {
    title: "ITS CHARGER",
    line: "Three and a half hours of real work. Batteries alone won't make it.",
    icon: <BatteryCharging className="h-6 w-6 text-primary" />,
  },
  {
    title: "CLAUDE PRO",
    line: "The subscription that runs Claude Code, about $31 AUD a month. Have it active before the day.",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
];

/**
 * What the loaded brain unlocks. Shared across variants — the capabilities
 * don't change with the door someone came in through. Wording is mum-test
 * plain: each line says what happens, not what category of thing it is.
 */
const CAPABILITIES: { title: string; line: string; icon: React.ReactNode }[] = [
  {
    title: "SOCIAL CONTENT",
    line: "Posts drafted from work you actually did this week.",
    icon: <InstagramIcon className="h-6 w-6" style={{ color: "#E4405F" }} />,
  },
  {
    title: "BUSINESS GRANTS",
    line: "It finds grants you're eligible for and drafts the application.",
    icon: <Landmark className="h-6 w-6 text-primary" />,
  },
  {
    title: "LINKEDIN",
    line: "Your week, turned into posts, in your voice.",
    icon: <LinkedInIcon className="h-6 w-6" style={{ color: "#0A66C2" }} />,
  },
  {
    title: "META ADS",
    line: "Campaigns created, watched and adjusted.",
    icon: <MetaColourIcon className="h-6 w-6" />,
  },
  {
    title: "SHOPIFY",
    line: "Products, orders and updates handled from your desk.",
    icon: <ShopifyColourIcon className="h-6 w-6" />,
  },
  {
    title: "QUOTES & PROPOSALS",
    line: "Advanced proposals in your wording, in minutes.",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "CRM NURTURE",
    line: "Follow-up campaigns that run themselves.",
    icon: <HubSpotColourIcon className="h-6 w-6" />,
  },
  {
    title: "WHATEVER'S NEXT",
    line: "The thing eating your week right now — that's the one you build.",
    icon: <ArrowRight className="h-6 w-6 text-primary" />,
  },
];

