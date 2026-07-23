import {
  ArrowRight,
  CheckCircle2,
  Map,
  FileText,
  Shield,
  DoorOpen,
  Users,
  User,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { calendlyUrl as baseCalendlyUrl, CONTACT_EMAIL } from "@/lib/booking";

const calendlyUrl = (source: string) => baseCalendlyUrl(`coaching_${source}`);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// The Agent OS in one glance — same artifact we build with clients.
const agentOsTree = `your-business/
├── START-HERE.md   ← the entry point
├── map.md          ← where things live
├── sops/           ← how you work
├── rules.md        ← the never-list
└── work/           ← what ships`;

const sprintWeeks = [
  {
    week: "WK 1",
    title: "First live build",
    detail:
      "A working automation in your business by the end of session one. Not a demo — your work, your tools.",
  },
  {
    week: "WK 2",
    title: "The thinking",
    detail:
      "How to spot what's automatable, how to brief an agent properly, and where the limits actually are.",
  },
  {
    week: "WK 3",
    title: "The judgment",
    detail:
      "A roadmap you own — what to build next, what to skip, and how to keep compounding without me.",
  },
];

const devDayAgenda = [
  {
    time: "9:00",
    title: "Set up",
    detail: "Claude Code on your machines. Your workspace mapped.",
  },
  {
    time: "10:30",
    title: "First workflow",
    detail: "Built on live work, with your team on the keyboard.",
  },
  {
    time: "12:30",
    title: "Skill library",
    detail: "Installed and walked through — the shortcuts your team runs weekly.",
  },
  {
    time: "1:30",
    title: "Second workflow + frameworks",
    detail: "Another build, plus the thinking that makes it stick.",
  },
  {
    time: "2:30",
    title: "Your AI champion",
    detail: "One person assigned, briefed, and owning the system from here.",
  },
];

const pillars = [
  {
    icon: Map,
    num: "01",
    title: "The map",
    detail:
      "Where everything in your business lives, written down so an agent can find it.",
  },
  {
    icon: FileText,
    num: "02",
    title: "The SOPs",
    detail: "Your repeatable tasks, documented once, delegated forever.",
  },
  {
    icon: Shield,
    num: "03",
    title: "The guardrails",
    detail: "The never-do-this rules that keep a capable agent safe.",
  },
  {
    icon: DoorOpen,
    num: "04",
    title: "The entry point",
    detail: "One file that tells any AI where to start reading.",
  },
];

// DRAFT quotes — pending sign-off from each client before production deploy.
const proof = [
  {
    name: "Kim",
    org: "CRC",
    context: "1:1 executive coaching",
    quote:
      "I went from watching AI videos to running Claude Code on my own work in the first session.",
  },
  {
    name: "Matt",
    org: "Recruiting firm director",
    context: "1:1 coaching",
    quote:
      "Watching Elliot run his own business through it is what sold me. Now I'm building the same thing for mine.",
  },
  {
    name: "Paul",
    org: "Public Sector People",
    context: "1:1 coaching",
    quote: "Every session ends with something running that wasn't there before.",
  },
];

const faqs = [
  {
    q: "WHAT TOOL DO WE USE?",
    a: "Claude Code, set up with Unpaste's workspace skills. The system itself is plain markdown files on your machine — it works with Claude today and whatever model is best next year.",
  },
  {
    q: "DO I NEED TO BE TECHNICAL?",
    a: "No. If you can write a clear email, you can run this. Setup is done with you, and every framework is taught in plain English — no code, no jargon.",
  },
  {
    q: "WHAT DOES IT COST TO RUN AFTERWARDS?",
    a: "A Claude subscription from Anthropic — roughly $30–$150/month depending on the plan. Nothing ongoing to me unless you want ongoing help.",
  },
  {
    q: "WHAT DO I ACTUALLY OWN?",
    a: "Everything. The workspace, the skills, the SOPs, the guardrails — plain files on your machine. Cancel every subscription including mine and it still works.",
  },
  {
    q: "IN PERSON OR REMOTE?",
    a: "Workshops and dev days run in person — Brisbane and surrounds. Coaching runs in person in Brisbane or remote anywhere in Australia.",
  },
  {
    q: "WHAT HAPPENS AFTER THE SPRINT?",
    a: "Three options: keep going with ongoing sessions (we scope it together), book a dev day to bring your team in, or take the roadmap and run solo. No lock-in either way.",
  },
];

export default function Coaching() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="AI Coaching, Workshops & Dev Days"
        description="Learn to run your business on AI — 1:1 coaching sprints ($750), Brisbane workshops ($399), and done-with-you dev days at your office ($3,500). Claude Code, on your real work, with a system you own."
        keywords="AI coaching Brisbane, Claude Code coaching, AI workshop Brisbane, done with you AI, executive AI coaching, AI dev day, AI social media automation Brisbane, AI content pipeline, business AI training"
        url="https://unpaste.ai/coaching"
        faqItems={faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
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
                [001] COACHING · WORKSHOPS · DEV DAYS
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
              >
                LEARN TO RUN YOUR BUSINESS{" "}
                <span className="text-primary">THE WAY I RUN MINE.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl"
              >
                Unpaste is a one-person business that ships like a team. Every
                page, proposal, and automation goes through the same AI system —
                and I'll teach you to build yours. Hands-on, on your real work.
                Brisbane in person, remote anywhere in Australia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 items-start mb-8"
              >
                <a
                  href={calendlyUrl("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-button inline-flex items-center gap-3"
                >
                  Book an intro call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#ways-in"
                  className="brutalist-button-outline inline-flex items-center gap-3"
                >
                  See the three ways in
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mono-label"
              >
                WORKSHOP $399 · SPRINT $750 · PIPELINE $1,200 · DEV DAY $3,500 · + GST
              </motion.p>
            </div>
          </div>
        </section>

        {/* [002] The demonstration */}
        <section className="py-20 md:py-28 border-t border-border bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="section-tag mb-4">[002] THE DEMONSTRATION</div>
                <h2 className="text-3xl md:text-4xl tracking-tighter mb-6">
                  THE PITCH IS{" "}
                  <span className="text-primary">THE BUSINESS ITSELF.</span>
                </h2>
                <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
                  <p>
                    No slide deck. Unpaste runs on the exact system you're
                    buying: a plain-file workspace that Claude Code reads, works
                    in, and ships from. Client work, proposals, this website —
                    all of it.
                  </p>
                  <p className="text-foreground font-bold">
                    In session one you watch it run a real business. Then we
                    start building yours.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="brutalist-card bg-zinc-900 text-zinc-100"
              >
                <div className="p-4 border-b border-zinc-700 flex items-center gap-2">
                  <Map className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Your Agent OS, at a glance
                  </span>
                </div>
                <pre className="p-6 font-mono text-xs md:text-sm leading-relaxed text-zinc-100 overflow-x-auto whitespace-pre">
                  {agentOsTree}
                </pre>
                <div className="p-4 border-t border-zinc-700 font-mono text-xs">
                  <div className="flex items-center gap-2 flex-wrap text-zinc-300">
                    <span className="text-zinc-400">WORKS WITH</span>
                    <span className="text-primary">●</span>
                    <span>Claude Code</span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-primary">●</span>
                    <span>Codex</span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-primary">●</span>
                    <span>whatever comes next</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* [003] Three ways in */}
        <section
          id="ways-in"
          className="py-20 md:py-28 border-t border-border scroll-mt-20"
        >
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[003] THREE WAYS IN</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                PICK YOUR <span className="text-primary">WAY IN.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                Same system, three depths. Start where it fits, step up when it
                earns it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Workshop */}
              <motion.div
                id="workshop"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="brutalist-card bg-background flex flex-col scroll-mt-24"
              >
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-label text-primary">[A] WORKSHOP</span>
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mb-1 text-3xl font-bold tracking-tight">
                    $399 <span className="text-sm font-normal">+ GST / seat</span>
                  </div>
                  <div className="mono-label mb-6">ONE DAY · BRISBANE · SMALL ROOM</div>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                    Bring your laptop. Leave with Claude Code installed, the
                    workspace skills set up, and the frameworks that make it
                    stick — running on your own machine.
                  </p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {[
                      "Claude Code set up on your laptop",
                      "The workspace skills, installed",
                      "The frameworks, in plain English",
                      "Hands-on all day — no slides",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-mono text-xs text-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mono-label mb-4">FIRST BRISBANE SESSION — DATE TBC</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Brisbane%20AI%20workshop%20—%20first%20seat%20access`}
                    className="mt-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Get first seat access
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Coaching sprint — featured */}
              <motion.div
                id="sprint"
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="brutalist-card bg-foreground text-background flex flex-col relative scroll-mt-24"
              >
                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider">
                  Start here
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-label text-primary">[B] COACHING SPRINT</span>
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mb-1 text-3xl font-bold tracking-tight">
                    $750 <span className="text-sm font-normal">+ GST</span>
                  </div>
                  <div className="mono-label mb-6 text-background/60">
                    3 WEEKS · 1:1 · YOUR BUSINESS
                  </div>
                  <p className="font-mono text-sm text-background/80 leading-relaxed mb-6">
                    Three weeks, one-on-one, on your real work. The first
                    session ends with something running.
                  </p>
                  <div className="space-y-4 mb-6 flex-1">
                    {sprintWeeks.map((wk) => (
                      <div key={wk.week} className="flex items-start gap-3">
                        <span className="mono-label text-primary pt-0.5 flex-shrink-0">
                          {wk.week}
                        </span>
                        <div>
                          <div className="font-bold text-sm tracking-tight">
                            {wk.title}
                          </div>
                          <p className="font-mono text-xs text-background/70 leading-relaxed">
                            {wk.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-xs text-background/60 italic mb-5">
                    Then: extend with ongoing sessions, book a dev day, or run
                    solo. Your call.
                  </p>
                  <a
                    href={calendlyUrl("sprint")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Book an intro call
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Dev day */}
              <motion.div
                id="dev-day"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="brutalist-card bg-background flex flex-col scroll-mt-24"
              >
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-label text-primary">[C] DEV DAY</span>
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mb-1 text-3xl font-bold tracking-tight">
                    $3,500 <span className="text-sm font-normal">+ GST</span>
                  </div>
                  <div className="mono-label mb-6">9:00–3:00 · YOUR OFFICE · YOUR TEAM</div>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                    Done with you, not for you. We build at your desks, on your
                    live work, and hand it over running.
                  </p>
                  <div className="space-y-3 mb-6 flex-1">
                    {devDayAgenda.map((slot) => (
                      <div key={slot.time} className="flex items-start gap-3">
                        <span className="mono-label text-primary pt-0.5 w-10 flex-shrink-0">
                          {slot.time}
                        </span>
                        <div>
                          <div className="font-bold text-sm tracking-tight">
                            {slot.title}
                          </div>
                          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                            {slot.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href={calendlyUrl("devday")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Book a dev day
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* [004] Themed builds — productized pipelines */}
        <section
          id="pipeline"
          className="py-20 md:py-28 border-t border-border bg-card scroll-mt-20"
        >
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[004] THEMED BUILDS</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                ONE PIPELINE. ONE PRICE.{" "}
                <span className="text-primary">RUNNING BEFORE WE LEAVE.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                Productized builds for the systems every business needs. First
                up: content.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="brutalist-card bg-background max-w-4xl mx-auto"
            >
              <div className="p-6 md:p-10 grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                  <div className="mono-label text-primary mb-3">
                    THE SOCIAL CONTENT PIPELINE
                  </div>
                  <div className="mb-1 text-3xl md:text-4xl font-bold tracking-tight">
                    $1,200 <span className="text-sm font-normal">+ GST</span>
                  </div>
                  <div className="mono-label mb-6">
                    HALF DAY · YOUR OFFICE OR REMOTE
                  </div>
                  <p className="font-mono text-sm text-foreground font-bold leading-relaxed mb-4">
                    Every business needs the content. Nobody needs the hire.
                  </p>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                    We set up the same content system Unpaste runs on — in your
                    business, on your brand — and teach you to drive it. The
                    production work gets handled. You stay the editor.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Your brand voice + content pillars, written down so an agent can use them",
                      "Post templates for your platforms, yours to keep",
                      "The generation workflow in Claude + Codex — drafts in your voice, batched weekly",
                      "Scheduling wired up, plus the review habit",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-mono text-xs md:text-sm text-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 flex flex-col md:border-l md:border-border md:pl-8">
                  <div className="mono-label mb-3">YOU LEAVE WITH</div>
                  <p className="font-mono text-sm text-foreground leading-relaxed mb-6">
                    A month of content drafted, the pipeline running, and the
                    skills to keep it going.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground italic mb-6 flex-1">
                    Less than a marketing hire's first week. Once. Want a
                    different pipeline built the same way? Ask on the call.
                  </p>
                  <a
                    href={calendlyUrl("pipeline")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Book a pipeline day
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* [005] Custom development bridge */}
        <section
          id="custom"
          className="py-16 md:py-20 border-t border-border bg-foreground text-background scroll-mt-20"
        >
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <div className="font-mono text-xs text-primary tracking-widest mb-4">
                  [005] WANT IT BUILT FOR YOU?
                </div>
                <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                  CUSTOM DEVELOPMENT.{" "}
                  <span className="text-primary">FROM $5,000.</span>
                </h2>
                <p className="font-mono text-sm text-background/70 leading-relaxed max-w-xl">
                  Quoting systems, client pipelines, internal tools, automations.
                  Scoped on a call, built on your stack, handed over running —
                  and you own every file.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="/book"
                  className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Book a scoping call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* [005] What you leave with — the Agent OS */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-2xl mb-12">
                <div className="section-tag mb-4">[006] WHAT YOU LEAVE WITH</div>
                <h2 className="text-3xl md:text-4xl tracking-tighter mb-6">
                  YOU OWN THE SYSTEM.{" "}
                  <span className="text-primary">YOU RENT THE INTELLIGENCE.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Everything we build is plain files on your machine. No
                  platform, no subscription to me, no lock-in. Point a better
                  model at the same folder next year and it all still works.
                </p>
              </div>

              <div className="stats-grid md:grid-cols-2 lg:grid-cols-4">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.num}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="p-6 md:p-8 group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-5xl font-bold text-foreground/10">
                        {pillar.num}
                      </span>
                      <div className="h-10 w-10 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                        <pillar.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg tracking-tight mb-3 uppercase">
                      {pillar.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                      {pillar.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="font-mono text-sm text-foreground font-bold mt-10">
                If you never call me again, it keeps working. That's the point.
              </p>
            </div>
          </div>
        </section>

        {/* [006] Proof */}
        <section className="py-20 md:py-28 border-t border-border bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[007] WHO'S ALREADY IN</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                COACHING CLIENTS, <span className="text-primary">ON THE RECORD.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {proof.map((client, i) => (
                <motion.div
                  key={client.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="brutalist-card bg-background p-6 md:p-8 flex flex-col"
                >
                  <p className="font-mono text-sm text-foreground leading-relaxed mb-6 flex-1">
                    “{client.quote}”
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="font-bold text-sm tracking-tight">
                      {client.name} · {client.org}
                    </div>
                    <div className="mono-label mt-1">{client.context}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* [007] For / not for */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-2xl mb-12">
                <div className="section-tag mb-4">[008] WHO IT'S FOR</div>
                <h2 className="text-3xl md:text-4xl tracking-tighter">
                  FOR PEOPLE WHO'LL{" "}
                  <span className="text-primary">OPEN THE LAPTOP.</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="brutalist-card bg-background p-6 md:p-8">
                  <div className="mono-label text-primary mb-6">THIS IS FOR YOU IF</div>
                  <ul className="space-y-4">
                    {[
                      "You're an owner or director who wants the capability in-house — not another retainer.",
                      "You'll practise between sessions. The system compounds when you use it.",
                      "You have real repetitive work to point at: quoting, follow-ups, reporting, admin.",
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
                    THIS ISN'T FOR YOU IF
                  </div>
                  <ul className="space-y-4">
                    {[
                      "You want it done entirely for you — that's custom development, and I'll happily quote it.",
                      "You're after an AI strategy document. We build things, we don't write decks about them.",
                      "Nobody on your side can give it an hour a week. Skills don't install themselves.",
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
          </div>
        </section>

        {/* [008] FAQ */}
        <section className="py-20 md:py-28 border-t border-border bg-card">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <div className="section-tag mb-4">[009] FAQ</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                THE HONEST ANSWERS.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border bg-background px-6 data-[state=open]:shadow-[4px_4px_0_0_var(--primary)]"
                >
                  <AccordionTrigger className="text-left font-mono text-sm font-bold tracking-wide hover:text-primary py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-mono text-sm text-muted-foreground pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* [009] Final CTA */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container text-center">
            <div className="section-tag mb-8">[010] NEXT STEP</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto mb-8">
              START WITH A <span className="text-primary">CALL.</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto mb-10">
              Thirty minutes. Bring how your week actually runs — leave knowing
              which way in fits.
            </p>
            <a
              href={calendlyUrl("final")}
              target="_blank"
              rel="noopener noreferrer"
              className="brutalist-button text-base px-10 py-5 inline-flex items-center gap-3"
            >
              Book an intro call
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mono-label mt-8">
              OR EMAIL{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL.toUpperCase()}
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
