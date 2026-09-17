import { ArrowDown, ArrowRight, Check, Laptop, X } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkshopInterestForm } from "@/components/WorkshopInterestForm";
import type { WorkshopVariant as Variant } from "@/lib/workshopVariants";

const BUILD_EXAMPLES = [
  {
    number: "01",
    title: "A brand guide your agent can read",
    body: "Save the voice, standards and never-list you are tired of re-explaining.",
  },
  {
    number: "02",
    title: "A campaign built through conversation",
    body: "Talk through what you want, then watch the agent turn the brief into working assets.",
  },
  {
    number: "03",
    title: "One recurring job running from your workspace",
    body: "Start with the task that keeps coming back and build a repeatable way to hand it over.",
  },
];

const MORNING = [
  ["See it work", "Live demonstrations on real tools and files—not polished magic tricks."],
  ["Build on your business", "Work on the job you brought, with help beside you when it gets stuck."],
  ["Leave able to continue", "Keep the workspace, instructions and a clear next step on your own laptop."],
];

const PHOTOS = [
  {
    src: "/images/workshops/2026-09-16/notebook.webp",
    alt: "Elliot helping an attendee work through a build on their laptop",
    label: "BUILDING",
  },
  {
    src: "/images/workshops/2026-09-16/standing.webp",
    alt: "Attendees and Elliot standing around the workshop table in conversation",
    label: "ASKING",
  },
  {
    src: "/images/workshops/2026-09-16/couch.webp",
    alt: "Two attendees troubleshooting a build together on the breakout couch",
    label: "FIXING",
  },
];

export default function WorkshopVariantPage({
  variant,
  canonical = false,
}: {
  variant: Variant;
  canonical?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background workshop-page">
      <SEO
        title={
          canonical
            ? "Hands-on AI Workshop Brisbane — Unpaste"
            : `${variant.headline.main} ${variant.headline.accent}`
        }
        description={variant.lede}
        url={canonical ? "https://unpaste.ai/workshops" : `https://unpaste.ai/workshops/${variant.slug}`}
        noIndex={!canonical}
      />
      <div className="relative z-10">
        <Navigation />

        <main>
          <section className="workshop-hero">
            <div className="container workshop-hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="workshop-hero-copy"
              >
                <p className="workshop-kicker">{variant.kicker}</p>
                <h1>
                  {variant.headline.main}<br />
                  <span>{variant.headline.accent}</span>
                </h1>
                <p className="workshop-subhead">{variant.subhead}</p>
                <p className="workshop-lede">{variant.lede}</p>
                <div className="workshop-hero-actions">
                  <a href="#first-notice" className="brutalist-button inline-flex items-center gap-3">
                    Get first notice <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#proof" className="workshop-text-link">
                    See the room <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
                <p className="workshop-meta">BRISBANE · HALF-DAY · HANDS-ON · NEXT DATE IN PLANNING</p>
              </motion.div>
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="workshop-hero-photo"
              >
                <img
                  src="/images/workshops/2026-09-16/hands-on.webp"
                  alt="Elliot working beside workshop attendees on their laptops"
                  width={1200}
                  height={1500}
                />
                <figcaption>THE FIRST BRISBANE ROOM · 16 SEPTEMBER 2026</figcaption>
              </motion.figure>
            </div>
          </section>

          <section id="proof" className="workshop-section workshop-proof">
            <div className="container">
              <div className="workshop-section-intro">
                <p className="workshop-kicker">THE REAL ROOM</p>
                <h2>Not a webinar.<br /><span>A working table.</span></h2>
                <p>
                  People arrive with different businesses and different problems. The common bit is the work: laptops open, questions asked, useful things made.
                </p>
              </div>
              <div className="workshop-proof-lead">
                <img
                  src="/images/workshops/2026-09-16/room-session.webp"
                  alt="A hands-on Unpaste workshop in progress at Gather in Bulimba"
                  loading="lazy"
                  width={1600}
                  height={1000}
                />
              </div>
              <div className="workshop-photo-strip">
                {PHOTOS.map((photo) => (
                  <figure key={photo.src}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" width={1200} height={1200} />
                    <figcaption>{photo.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="workshop-section workshop-builds">
            <div className="container">
              <div className="workshop-section-intro">
                <p className="workshop-kicker">WHAT YOU COULD BUILD</p>
                <h2>Bring the job that<br /><span>keeps coming back.</span></h2>
                <p>These are examples from the kinds of work explored in the first room. Your useful build may be different.</p>
              </div>
              <div className="workshop-build-list">
                {BUILD_EXAMPLES.map((item) => (
                  <article key={item.number}>
                    <span>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <a href="#first-notice" className="brutalist-button inline-flex items-center gap-3">
                Get first notice <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section className="workshop-section workshop-rhythm">
            <div className="container workshop-rhythm-grid">
              <div className="workshop-section-intro">
                <p className="workshop-kicker">THE MORNING</p>
                <h2>See it.<br />Build it.<br /><span>Leave with it.</span></h2>
              </div>
              <div className="workshop-rhythm-list">
                {MORNING.map(([title, body], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <div><h3>{title}</h3><p>{body}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="workshop-section workshop-fit">
            <div className="container">
              <div className="workshop-section-intro">
                <p className="workshop-kicker">THE HONEST BIT</p>
                <h2>Useful if you’re<br /><span>past the curiosity stage.</span></h2>
              </div>
              <div className="workshop-fit-grid">
                <article>
                  <h3>It’s for you if</h3>
                  <ul>
                    <li><Check /> You already use ChatGPT or Claude and want to go further.</li>
                    <li><Check /> You can bring a laptop and a real piece of work.</li>
                    <li><Check /> You’re happy to learn by making, asking and fixing.</li>
                  </ul>
                </article>
                <article>
                  <h3>It’s not</h3>
                  <ul>
                    <li><X /> A passive keynote or slide-heavy AI overview.</li>
                    <li><X /> A developer course that expects you to know code.</li>
                    <li><X /> A done-for-you implementation day.</li>
                  </ul>
                </article>
              </div>
              <div className="workshop-bring-note">
                <Laptop className="h-6 w-6" />
                <p><strong>Bring the computer you actually work on.</strong> We’ll confirm the required account setup before the day—without surprising you with it in the room.</p>
              </div>
            </div>
          </section>

          <section className="workshop-section workshop-facilitator">
            <div className="container workshop-facilitator-grid">
              <figure>
                <img src="/images/elliot.webp" alt="Elliot, founder of Unpaste" loading="lazy" width={937} height={1250} />
              </figure>
              <div className="workshop-section-intro">
                <p className="workshop-kicker">YOUR FACILITATOR</p>
                <h2>Taught by the person<br /><span>doing the work.</span></h2>
                <p>
                  Elliot learned by applying agents to a real operating business—not by collecting AI theory. In the workshop he works beside you while you apply the same practical approach to yours.
                </p>
              </div>
            </div>
          </section>

          <section id="first-notice" className="workshop-section workshop-interest">
            <div className="container workshop-interest-grid">
              <div className="workshop-section-intro">
                <p className="workshop-kicker">THE NEXT BRISBANE ROOM</p>
                <h2>Bring your problem.<br /><span>We’ll shape the room.</span></h2>
                <p>
                  Tell us what you want to work on and which side of town suits. People on this list will hear first when the date, room and price are locked.
                </p>
              </div>
              <WorkshopInterestForm variant={variant.slug} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
