import type { ComponentType } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Laptop,
  Brain,
  Rocket,
  Search,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MetaIcon,
  ShopifyIcon,
  TikTokIcon,
  XIcon,
} from "@/components/BrandIcons";
import { calendlyUrl as baseCalendlyUrl, CONTACT_EMAIL } from "@/lib/booking";
import { VenueBand } from "@/components/VenueBand";
import { SessionsSection } from "@/components/SessionsSection";
import { useSeats } from "@/hooks/useSeats";
import { SESSIONS, VENUES, WORKSHOP_PRICE, nextSessionLabel } from "@/lib/workshops";

const calendlyUrl = (source: string) => baseCalendlyUrl(`workshop_${source}`);

// Per-module "register interest" mailto for the [007] coming-next cards.
const moduleInterestHref = (moduleTitle: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Register interest — ${moduleTitle} module — Brisbane AI workshop`
  )}&body=${encodeURIComponent(
    `Hi Elliot, I'd like to register interest in the ${moduleTitle} module when it runs. My name is `
  )}`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const learn = [
  {
    title: "Get Claude Code running",
    detail: "Set up and working on your own machine — the version that does the work, not the chatbox.",
  },
  {
    title: "Build your first automation",
    detail: "Something real you'll use after you leave. Your work, your tools.",
  },
  {
    title: "Steer it for better results",
    detail: "How to give feedback that sharpens the output instead of settling for the first try.",
  },
  {
    title: "The mental models",
    detail: "How to think about this new way of working, so it keeps paying off after today.",
  },
];

const walkOut = [
  "Claude Code installed and working on your laptop.",
  "At least one automation running in your own work.",
  "The confidence to keep building on your own.",
];

type WorkshopModule = {
  title: string;
  detail: string;
  icons: ComponentType<{ className?: string }>[];
};

const nextModules: WorkshopModule[] = [
  {
    title: "Shopify + Meta ads",
    detail: "Run your store and ads through Claude Code.",
    icons: [ShopifyIcon, MetaIcon],
  },
  {
    title: "Social media",
    detail: "Run your social media through Claude Code.",
    icons: [InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon, XIcon],
  },
  {
    title: "SEO",
    detail: "Run your SEO through Claude Code.",
    icons: [Search],
  },
];

const sessionStats: { value: string; label: string; was?: string }[] = [
  { value: "3 hrs", label: "HANDS-ON" },
  { value: "4–10", label: "PEOPLE" },
  { value: "Brisbane", label: "IN PERSON" },
  { value: "Laptop", label: "BRING YOUR OWN" },
  { value: "$399", was: "$850", label: "+ GST / SEAT" },
];

const learnIcons = [Laptop, Rocket, CheckCircle2, Brain];

export default function Workshop() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="AI Workshop Brisbane — Learn Claude Code for Work"
        description="A 3-hour, hands-on AI workshop in Brisbane. Small group. Bring your laptop and leave using Claude Code to actually do your work — not just chat with it. $399 + GST a seat — down from $850."
        keywords="AI workshop Brisbane, Claude Code workshop, learn Claude Code, hands-on AI training Brisbane, AI for business owners, AI workshop for beginners"
        url="https://unpaste.ai/workshops"
      />

      <Navigation />

      <div className="grid-background" />

      <div className="relative z-10">
        {/* [001] Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-tag mb-8"
              >
                [001] AI WORKSHOP · BRISBANE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
              >
                LEARN TO USE CLAUDE CODE{" "}
                <span className="text-primary">FOR WORK.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl"
              >
                A 3-hour, hands-on AI workshop in Brisbane. Small group. Bring
                your laptop — leave using AI to actually do your work, not just
                chat with it.
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
                  Take a seat
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#what-it-is"
                  className="brutalist-button-outline inline-flex items-center gap-3"
                >
                  See what's inside
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mono-label"
              >
                <span className="line-through opacity-60">
                  {WORKSHOP_PRICE.was}
                </span>{" "}
                {WORKSHOP_PRICE.display} {WORKSHOP_PRICE.suffix} · 3 HOURS ·
                SMALL GROUP · BRISBANE · {nextSessionLabel()}
              </motion.p>
            </div>
          </div>
        </section>

        {/* [002] What it is */}
        <section
          id="what-it-is"
          className="py-20 md:py-28 border-t border-border bg-card scroll-mt-20"
        >
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag mb-4">[002] WHAT IT IS</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-6">
                THREE HOURS. YOUR LAPTOP.{" "}
                <span className="text-primary">REAL WORK.</span>
              </h2>
              <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
                <p>
                  A hands-on session in a small group of four to ten. You're on
                  your own laptop the whole time. You'll go from typing questions
                  into Claude in a browser to running{" "}
                  <span className="text-foreground font-bold">Claude Code</span>{" "}
                  — the version that actually does the work: writing, building,
                  and automating inside your real files and tools.
                </p>
                <p className="text-foreground font-bold">
                  No slides to sit through. You build as you learn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* [003] What you'll learn */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[003] WHAT YOU'LL LEARN</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                FOUR THINGS YOU'LL{" "}
                <span className="text-primary">TAKE HOME.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
              {learn.map((item, i) => {
                const Icon = learnIcons[i];
                return (
                  <motion.div
                    key={item.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="brutalist-card bg-background p-6 md:p-8 flex items-start gap-4"
                  >
                    <div className="h-10 w-10 border border-border flex items-center justify-center flex-shrink-0 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* [004] What you'll walk out with */}
        <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
          <div className="container">
            <div className="max-w-3xl">
              <div className="font-mono text-xs text-primary tracking-widest mb-4">
                [004] WHAT YOU'LL WALK OUT WITH
              </div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-8">
                TOOLS IN HAND.{" "}
                <span className="text-primary">NOT A FOLDER OF NOTES.</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {walkOut.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-mono text-sm md:text-base text-background leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-sm text-background/70 leading-relaxed">
                You leave with things that work — not a folder of notes you'll
                never open.
              </p>
            </div>
          </div>
        </section>

        {/* [005] Who it's for */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[005] WHO IT'S FOR</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                YOU'VE TRIED THE CHATBOT.{" "}
                <span className="text-primary">NOW GO FURTHER.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
              <div className="brutalist-card bg-background p-6 md:p-8">
                <div className="mono-label text-primary mb-6">THIS IS FOR YOU IF</div>
                <ul className="space-y-4">
                  {[
                    "You're a business owner, marketer, executive, or solo operator who's used Claude or ChatGPT and wants to actually put it to work.",
                    "You want real skills you keep — not another subscription someone else runs.",
                    "You can use a laptop — no code, no jargon needed.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                      <span className="font-mono text-sm text-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="brutalist-card bg-background p-6 md:p-8">
                <div className="mono-label text-muted-foreground mb-6">
                  MAYBE NOT YET IF
                </div>
                <ul className="space-y-4">
                  {[
                    "You're a developer who already lives in the terminal — you'll be ahead of the room.",
                    "You want it built entirely for you — that's custom development. Get in touch for a tailored solution.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-mono text-sm text-muted-foreground flex-shrink-0 mt-0.5">
                        ✕
                      </span>
                      <span className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* [006] How it runs */}
        <section className="py-20 md:py-28 border-t border-border bg-card">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[006] HOW IT RUNS</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                THE <span className="text-primary">DETAILS.</span>
              </h2>
            </div>

            <div className="stats-grid md:grid-cols-3 lg:grid-cols-5 max-w-6xl">
              {sessionStats.map((stat) => (
                <div key={stat.label} className="p-6 md:p-8">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {stat.was && (
                      <span className="mr-2 text-base md:text-lg font-normal text-muted-foreground line-through">
                        {stat.was}
                      </span>
                    )}
                    {stat.value}
                  </div>
                  <div className="mono-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="font-mono text-sm text-muted-foreground mt-8 max-w-3xl leading-relaxed">
              What to bring: your own laptop and a{" "}
              <span className="text-foreground font-bold">Claude Pro subscription</span>{" "}
              (from Anthropic) — it's what runs Claude Code. We'll help you get set
              up on the day.
            </p>
          </div>
        </section>

        {/* [007] What's coming next */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[007] WHAT'S COMING NEXT</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                THIS IS THE <span className="text-primary">FIRST SESSION.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                More are on the way — each one going deep on a job you already
                do. Come to this one and you'll hear about the rest first.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl">
              {nextModules.map((mod, i) => (
                <motion.div
                  key={mod.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="brutalist-card bg-background p-6 md:p-8 flex flex-col"
                >
                  <div className="inline-flex h-10 items-center justify-center gap-3 self-start border border-border px-3 mb-6 text-primary">
                    {mod.icons.map((Icon, idx) => (
                      <Icon key={idx} className="h-4 w-4" />
                    ))}
                  </div>
                  <h3 className="font-bold text-lg tracking-tight mb-2 uppercase">
                    {mod.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
                    {mod.detail}
                  </p>
                  <a
                    href={moduleInterestHref(mod.title)}
                    className="mt-auto inline-flex items-center gap-2 self-start border border-foreground px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
                  >
                    Register interest
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* [008] Side offer — 1:1 coaching (no pricing) */}
        <section className="py-16 md:py-20 border-t border-border bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <div className="font-mono text-xs text-primary tracking-widest mb-4">
                  [008] PREFER ONE-ON-ONE?
                </div>
                <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                  1:1 COACHING,{" "}
                  <span className="text-primary">ON YOUR OWN BUSINESS.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Want to go deeper than a room allows? One-on-one coaching runs
                  hands-on with you — Claude Code on your real work, at your
                  pace. Book an intro call and we'll scope it together.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href={calendlyUrl("coaching_sideoffer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Book an intro call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* [009] The room */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag mb-6">[009] THE ROOM</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                THIS IS WHERE{" "}
                <span className="text-primary">YOU'LL BE SITTING.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
                {VENUES.gatherBulimba.name}, {VENUES.gatherBulimba.street},{" "}
                {VENUES.gatherBulimba.suburb}. Free parking on the street, and
                the room is a two-minute walk from Oxford Street.
              </p>
            </div>
            <VenueBand venue={VENUES.gatherBulimba} />
          </div>
        </section>

        {/* [010] Take a seat */}
        <SessionsSection />

        <Footer />
      </div>
    </div>
  );
}

