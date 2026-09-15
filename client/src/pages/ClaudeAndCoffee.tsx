import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  Coffee,
  Inbox,
  Zap,
  Wrench,
  Compass,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useMemo } from "react";
import { trackMeta } from "@/lib/metaPixel";
import { VENUES } from "@/lib/workshops";

// Free ticket on Humanitix. Visitors who arrive from a paid ad (utm_source=meta
// in the URL) get the affiliate-tagged link, so Humanitix's affiliate report
// shows who came from the ads; everyone else gets the plain event link. The
// UTMs are forwarded either way. The click also fires the pixel's Lead event
// so Meta reports a result per ad.
const HUMANITIX_EVENT =
  "https://events.humanitix.com/claude-and-coffee-ai-for-normies";
const HUMANITIX_ADS_LINK = HUMANITIX_EVENT; // swap for the affiliate link once created

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

function getReserveLink(): { href: string; fromAds: boolean; utmContent: string } {
  if (typeof window === "undefined") {
    return { href: HUMANITIX_EVENT, fromAds: false, utmContent: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const fromAds = params.get("utm_source") === "meta";
  const target = new URL(fromAds ? HUMANITIX_ADS_LINK : HUMANITIX_EVENT);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) target.searchParams.set(key, value);
  }
  return { href: target.toString(), fromAds, utmContent: params.get("utm_content") ?? "" };
}

const venue = VENUES.jaggerRocky;
const VENUE_SITE = "https://jaggerrocky.com/";
const HERO_IMAGE = "/images/claude-and-coffee/elliot-jagger-rocky.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// The brief, in Elliot's words: agents for the things you couldn't do
// before, the things you don't want to do, and the things you'd rather do
// faster. Plus the how. Four cards, same 2x2 as the workshop page.
const cover = [
  {
    tag: "01 CAN'T",
    title: "Things you couldn't do before",
    detail:
      "Build a website. Cut a video. Write the code. Work you'd normally hire out, now running on your own machine.",
    icon: Wrench,
  },
  {
    tag: "02 WON'T",
    title: "Things you don't want to do",
    detail:
      "Inbox triage. Chasing invoices. Writing the same email for the tenth time. Hand it to an agent and check its work.",
    icon: Inbox,
  },
  {
    tag: "03 FASTER",
    title: "Things you already do, done faster",
    detail:
      "Quotes, reports, research, social posts. Same output, a fraction of the time, and your name still on it.",
    icon: Zap,
  },
  {
    tag: "04 HOW",
    title: "Tips and best practice",
    detail:
      "How to brief an agent. How to give it memory. How to keep it on a leash. Which tools actually connect, and which don't yet.",
    icon: Compass,
  },
];

// Pulled from the notes of the first session (Tue 8 Sep 2026). Keep this
// honest: only things that were actually shown in the room.
const recentTuesday = [
  "A Shopify store built by an agent, discount codes created live, Shopify never opened.",
  "A morning routine that reads several inboxes and sends what matters to your phone.",
  "A brand guidelines file the agent reads before it designs anything.",
  "How an agent remembers you between sessions: a folder of plain text files, not a chat history.",
  "The honest bit: what doesn't connect yet, and why.",
];

const forYou = [
  "You've used ChatGPT or Claude in a browser and have a feeling there's more to it.",
  "You run a business, a team, or a busy life and want to know which parts an agent could take.",
  "You'd rather see it working than read about it.",
];

const details: { value: string; label: string }[] = [
  { value: "Tuesdays", label: "EVERY WEEK" },
  { value: "7–8:30am", label: "THEN CHAT" },
  { value: "Free", label: "FOR NOW" },
  { value: "Coorparoo", label: "IN PERSON" },
  { value: "Small", label: "GROUP" },
  { value: "Optional", label: "LAPTOP" },
];

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Claude & Coffee",
  description:
    "A free weekly Tuesday morning meetup in Brisbane for people curious about AI agents. See real agents doing real work, ask anything, no code needed.",
  isAccessibleForFree: true,
  url: "https://unpaste.ai/claude-and-coffee",
  offers: {
    "@type": "Offer",
    url: HUMANITIX_EVENT,
    price: "0",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
  },
  image: `https://unpaste.ai${HERO_IMAGE}`,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  eventSchedule: {
    "@type": "Schedule",
    repeatFrequency: "P1W",
    byDay: "https://schema.org/Tuesday",
    startTime: "07:00",
    endTime: "08:30",
    scheduleTimezone: "Australia/Brisbane",
  },
  location: {
    "@type": "Place",
    name: venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.street,
      addressLocality: "Coorparoo",
      addressRegion: "QLD",
      postalCode: "4151",
      addressCountry: "AU",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Unpaste",
    url: "https://unpaste.ai",
  },
};

export default function ClaudeAndCoffee() {
  // Read once on mount: the ad lands people here with UTMs in the URL.
  const reserve = useMemo(getReserveLink, []);
  // Humanitix is off-site, so Lead fires on the click through, the same way
  // the workshop cards fire InitiateCheckout before Stripe.
  const onReserveClick = () =>
    trackMeta("Lead", {
      content_name: "Claude & Coffee — reserve a spot",
      content_category: reserve.fromAds ? "paid" : "organic",
      utm_content: reserve.utmContent,
    });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Claude & Coffee — Weekly AI Meetup, Brisbane"
        description="AI for normies. A free meetup every Tuesday, 7 to 8:30am, at Jagger Rocky Studios in Coorparoo. See AI agents doing real work, ask anything, no code needed. Small group, places limited."
        keywords="AI meetup Brisbane, Claude meetup, AI agents for business, Claude Code meetup, AI for beginners Brisbane, Coorparoo events, Tuesday morning meetup"
        url="https://unpaste.ai/claude-and-coffee"
        type="event"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <Navigation />

      <div className="grid-background" />

      <div className="relative z-10">
        {/* [001] Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-3 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="section-tag mb-8"
                >
                  [001] BRISBANE AI MEETUP · EVERY TUESDAY
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
                >
                  CLAUDE &amp; COFFEE.
                  <br />
                  <span className="text-primary">AI FOR NORMIES.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl"
                >
                  Every Tuesday, 7 to 8:30am, Jagger Rocky Studios in Coorparoo.
                  Free. Ninety minutes with a coffee, watching AI agents do real
                  work and asking whatever you've been wondering. Stick around
                  after if you want to keep talking. No code. No pitch.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 items-start mb-8"
                >
                  <a
                    href={reserve.href}
                    onClick={onReserveClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button inline-flex items-center gap-3"
                  >
                    Save a spot
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#what-it-is"
                    className="brutalist-button-outline inline-flex items-center gap-3"
                  >
                    What we cover
                  </a>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mono-label"
                >
                  EVERY TUESDAY · 7:00–8:30AM · FREE ·{" "}
                  {venue.name.toUpperCase()}, {venue.short.toUpperCase()} ·
                  PLACES LIMITED
                </motion.p>
              </div>

              <motion.figure
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 min-w-0 border border-foreground bg-card"
              >
                <img
                  src={HERO_IMAGE}
                  alt="Elliot, host of Claude & Coffee, in the studio at Jagger Rocky"
                  width={1400}
                  height={787}
                  className="block w-full h-auto aspect-[4/3] object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="flex items-center justify-between gap-4 border-t border-foreground px-4 py-3">
                  <strong className="font-mono text-xs font-bold uppercase tracking-wider">
                    Elliot, your host
                  </strong>
                  <span className="mono-label">UNPASTE × JAGGER ROCKY</span>
                </figcaption>
              </motion.figure>
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
                COFFEE. A LAPTOP.{" "}
                <span className="text-primary">REAL AGENTS.</span>
              </h2>
              <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
                <p>
                  Claude &amp; Coffee is a weekly meetup for people who are
                  curious about AI agents and want to see them working before
                  deciding what to do with them. Elliot runs{" "}
                  <span className="text-foreground font-bold">Unpaste</span> on
                  agents every day. Each Tuesday he opens the laptop and shows
                  what's running: the morning inbox check, the store that got
                  built without opening Shopify, the folder of files that gives
                  an agent a memory.
                </p>
                <p>
                  Then the floor is yours. Bring the job you're sick of, or the
                  thing you've always wanted to build, and we'll talk through
                  how an agent would take it on.
                </p>
                <p className="text-foreground font-bold">
                  No slides. No sign-up to anything. You watch, you ask, you
                  leave knowing what's possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* [003] What we cover */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[003] WHAT WE COVER</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                THREE KINDS OF WORK.{" "}
                <span className="text-primary">AND HOW.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Agents earn their keep in three places. Every session lands on
                at least one of them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
              {cover.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.tag}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="brutalist-card bg-background p-6 md:p-8 flex items-start gap-4 min-w-0"
                  >
                    <div className="h-10 w-10 border border-border flex items-center justify-center flex-shrink-0 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="mono-label text-primary mb-2">{item.tag}</div>
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

        {/* [004] From a recent Tuesday */}
        <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
          <div className="container">
            <div className="max-w-3xl">
              <div className="font-mono text-xs text-primary tracking-widest mb-4">
                [004] FROM A RECENT TUESDAY
              </div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-8">
                WHAT GOT SHOWN{" "}
                <span className="text-primary">ON THE SCREEN.</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {recentTuesday.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-mono text-sm md:text-base text-background leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-sm text-background/70 leading-relaxed">
                Every week is different. What gets shown depends on who's in the
                room and what they ask.
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
                CURIOUS BEATS{" "}
                <span className="text-primary">TECHNICAL.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
              <div className="brutalist-card bg-background p-6 md:p-8 min-w-0">
                <div className="mono-label text-primary mb-6">THIS IS FOR YOU IF</div>
                <ul className="space-y-4">
                  {forYou.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                      <span className="font-mono text-sm text-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="brutalist-card bg-background p-6 md:p-8 min-w-0">
                <div className="mono-label text-muted-foreground mb-6">
                  MAYBE NOT YET IF
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-sm text-muted-foreground flex-shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="font-mono text-sm text-muted-foreground leading-relaxed">
                      You want to leave with something built and running on your
                      own laptop. That's the{" "}
                      <Link
                        href="/workshops"
                        className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors"
                      >
                        workshop
                      </Link>
                      , not the meetup.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-sm text-muted-foreground flex-shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="font-mono text-sm text-muted-foreground leading-relaxed">
                      You're a developer who already lives in the terminal.
                      You're welcome, but you'll be ahead of the room.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* [006] The details */}
        <section className="py-20 md:py-28 border-t border-border bg-card">
          <div className="container">
            <div className="max-w-2xl mb-12">
              <div className="section-tag mb-4">[006] THE DETAILS</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                SAME TIME, <span className="text-primary">SAME PLACE.</span>
              </h2>
            </div>

            <div className="stats-grid md:grid-cols-3 max-w-6xl">
              {details.map((stat) => (
                <div key={stat.label} className="p-6 md:p-8 min-w-0">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="mono-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="font-mono text-sm text-muted-foreground mt-8 max-w-3xl leading-relaxed">
              It's free. What to bring: curiosity. A laptop if you want to
              follow along on your own machine, though most people watch the
              first time. We wrap at 8:30, and anyone who wants to keep talking
              usually does. Places are limited by the size of the room, so{" "}
              <a
                href={reserve.href}
                    onClick={onReserveClick}
                    target="_blank"
                    rel="noopener noreferrer"
                className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors"
              >
                grab a free ticket
              </a>
              .
            </p>
          </div>
        </section>

        {/* [007] The room */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag mb-6">[007] THE ROOM</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter mb-6">
                A WORKING STUDIO,{" "}
                <span className="text-primary">FIVE MINUTES FROM THE CBD.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
                {venue.name}, {venue.street}, {venue.suburb}. A creative studio
                that shoots photos and podcasts the rest of the week, and hosts
                us on Tuesday mornings.
              </p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Step-free access through the garage door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {venue.mapUrl && (
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button-outline inline-flex items-center gap-3"
                  >
                    <MapPin className="h-4 w-4" />
                    Open in Maps
                  </a>
                )}
                <a
                  href={VENUE_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start border border-foreground px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
                >
                  jaggerrocky.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* [008] Save a spot */}
        <section className="py-20 md:py-28 border-t border-border bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl">
              <div className="lg:col-span-2 min-w-0">
                <div className="font-mono text-xs tracking-widest mb-4 opacity-80">
                  [008] SAVE A SPOT
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6">
                  SEE YOU TUESDAY.
                  <br />
                  7AM. COFFEE'S ON.
                </h2>
                <p className="font-mono text-sm leading-relaxed max-w-xl opacity-90">
                  Free, for now. Grab a ticket on Humanitix so we know the
                  numbers. Takes twenty seconds. If Tuesday mornings don't
                  work, email Elliot, and you'll hear first when a second slot
                  opens.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href={reserve.href}
                    onClick={onReserveClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 bg-foreground text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  style={{ boxShadow: "4px 4px 0 0 var(--primary-foreground)" }}
                >
                  <Coffee className="h-4 w-4" />
                  Save a spot
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
