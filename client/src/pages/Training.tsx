import {
  ArrowRight,
  CheckCircle2,
  Folder,
  FileText,
  Workflow,
  Building2,
  Rocket,
  Clock,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const MAILTO_DISCOVERY =
  "mailto:hello@unpaste.ai?subject=AI%20Operating%20Manual%20%E2%80%94%20Discovery%20Call&body=Hi%20Elliot%2C%0A%0AWe%27d%20like%20to%20talk%20about%20setting%20up%20an%20AI%20workspace%20for%20our%20team.%0A%0ATeam%20size%3A%20%0AIndustry%3A%20%0AWhich%20package%20we%27re%20interested%20in%3A%20%0AAvailability%20for%20a%20call%3A%20%0A%0AThanks%2C";

const mailtoForPackage = (pkg: string) =>
  `mailto:hello@unpaste.ai?subject=${encodeURIComponent(`AI ${pkg} — Discovery Call`)}&body=${encodeURIComponent(
    `Hi Elliot,\n\nWe'd like to talk about the AI ${pkg} package.\n\nTeam size: \nIndustry: \nAvailability for a call: \n\nThanks,`,
  )}`;

interface Package {
  tag: string;
  name: string;
  positioning: string;
  setupPrice: string;
  monthlyPrice?: string;
  term: string;
  includesTitle: string;
  includes: string[];
  recurringTitle?: string;
  recurring?: string[];
  forWhom: string;
  cta: string;
  highlighted?: boolean;
}

const packages: Package[] = [
  {
    tag: "[001]",
    name: "AI KICKSTART",
    positioning: "Get your team's AI off the ground in a day.",
    setupPrice: "$2,400",
    term: "One-off",
    includesTitle: "Half-day on-site (4 hrs). You walk away with:",
    includes: [
      "A shared AI setup your whole team uses the same way",
      "The 4–6 main areas of your business mapped (quoting, jobs, clients, ops, etc.)",
      "A one-page playbook of your AI rules — anyone you hire next week can pick it up",
      "One AI assistant installed and running on real work",
      "2–3 ready-to-use AI shortcuts for things your team does every week",
      "Recording of the day for anyone who couldn't make it",
    ],
    forWhom: "small teams who want to dip a toe in before a longer commitment.",
    cta: "Book Kickstart",
  },
  {
    tag: "[002]",
    name: "AI OPERATIONS",
    positioning: "AI built into how your team works every week.",
    setupPrice: "$4,500",
    monthlyPrice: "$1,500/mo",
    term: "3-month minimum, then month-to-month",
    includesTitle: "Full day on-site (6 hrs). Everything in Kickstart, plus:",
    includes: [
      "Every part of your business mapped so AI can help across the board",
      "Tailored setup for each role (admin, sales, ops, etc.)",
      "3–5 AI assistants doing real recurring work — e.g. draft your weekly client update, draft quote letters, sort your inbox",
      "Clear safety rules: what AI does on its own, what you check first",
      "Set up where your team already works (Drive, Notion, etc.)",
    ],
    recurringTitle: "Then every week:",
    recurring: [
      "45-min team call — bring questions, see what's new",
      "Q&A in between via Slack or email",
      "Monthly 'what's new in AI' update so you don't fall behind",
      "Quarterly tune-up of your AI setup",
    ],
    forWhom: "teams that want AI built into their week, not bolted on the side.",
    cta: "Book Operations",
    highlighted: true,
  },
  {
    tag: "[003]",
    name: "AI DEPARTMENT",
    positioning: "Your AI department, run for you.",
    setupPrice: "$9,500",
    monthlyPrice: "$3,500/mo",
    term: "6-month minimum",
    includesTitle: "2-day intensive. Everything in Operations, plus:",
    includes: [
      "AI mapped across every part of your business",
      "8–12 AI assistants set up and running real work",
      "AI connected to the tools you already use (CRM, calendar, email)",
      "A clear set of rules for what AI can and can't do in your business",
      "Monthly numbers — hours saved, tools adopted, value back",
      "A 90-day plan to get the whole team across it",
    ],
    recurringTitle: "Then every week:",
    recurring: [
      "1-hour leadership call to keep AI on strategy",
      "30-min team Q&A",
      "4 hrs/month of us building new AI assistants for you",
      "Monthly progress report",
      "Quarterly strategy review — what to add, what to drop",
    ],
    forWhom: "businesses that want AI run for them, with someone owning it end-to-end.",
    cta: "Book Department",
  },
];

const audiences = [
  {
    icon: Building2,
    label: "Trades & services",
    description: "Plasterers, builders, sparkies, contractors. AI without becoming engineers.",
  },
  {
    icon: FileText,
    label: "Professional services",
    description: "Accountants, lawyers, agencies. Document-heavy work prime for agentic drafting.",
  },
  {
    icon: Workflow,
    label: "Ops & admin teams",
    description: "Ops, HR, finance, EAs inside a 20–50 person business. Repeatable workflows.",
  },
  {
    icon: Rocket,
    label: "Tech-led startups",
    description: "Teams that already get it. Fastest path to a full AI Department engagement.",
  },
];

const curriculum = [
  {
    step: "01",
    title: "Why this works",
    duration: "30 min",
    detail: "Tour a real example. See what changes when AI knows where things live.",
  },
  {
    step: "02",
    title: "Map your business",
    duration: "60 min",
    detail: "Whiteboard with your team. Identify the 4–6 main areas of how your business runs.",
  },
  {
    step: "03",
    title: "Set it up together",
    duration: "60 min",
    detail: "Create the folders. Each team member writes one 'what's this for' note.",
  },
  {
    step: "04",
    title: "Write your AI playbook",
    duration: "45 min",
    detail: "The one-pager every AI assistant in your business follows.",
  },
  {
    step: "05",
    title: "Install your first AI assistant",
    duration: "30 min",
    detail: "Set it up. Run a real task with your team watching.",
  },
  {
    step: "06",
    title: "Save your shortcuts",
    duration: "15 min",
    detail: "Document the 2–3 things your team will use this week. Pick your AI champion. Recording delivered.",
  },
];

const faqs = [
  {
    q: "Do we need to be technical?",
    a: "No. Everything is plain-English documents your team writes and reads. The AI tools install in minutes and we set them up for you. If you can edit a Google Doc, you can maintain this.",
  },
  {
    q: "Which AI tools do we need to pay for?",
    a: "Usually one team subscription to Claude Team or ChatGPT Team (~$25/user/mo), plus Claude Code or Codex (free CLI tools). Cowork has its own pricing. We pick what fits your team in the first hour — we don’t lock you into anything.",
  },
  {
    q: "What if a new model or tool comes out?",
    a: "That’s exactly why Operations and Department include monthly briefings and quarterly refreshes. The landscape moves — you don’t have to keep up alone. We do, and bring you along.",
  },
  {
    q: "Can we cancel the monthly retainer?",
    a: "After the 3-month minimum on Operations (6-month on Department), it’s month-to-month. Cancel anytime with 30 days’ notice. The workspace and agents are yours — you keep them.",
  },
  {
    q: "Do you travel for on-site sessions?",
    a: "Yes. Based in Brisbane, comfortable across SE Queensland at no extra charge. Interstate or remote teams: we run sessions remotely or quote travel at cost.",
  },
  {
    q: "What’s the minimum team size?",
    a: "Kickstart works from 3 people. Operations and Department are designed for 5-25 person teams. If you’re smaller or solo, the AI Kickstart still delivers a working workspace.",
  },
];

const workspaceTree = `your-business/
├── 01_business_rules/      ─→  How decisions get made
│   ├── what-we-quote
│   └── pricing
├── 02_clients/             ─→  Active and past clients
│   └── active/
├── 03_operations/
│   └── shortcuts/          ─→  Your AI shortcuts
├── 04_sales_marketing/
│   └── pipeline
├── 05_team/
│   └── roles
├── 06_ai_assistants/       ─→  Your AI assistants
│   ├── quote-drafter
│   └── monday-brief
└── YOUR_RULES   ◀──────────  The rules every assistant follows.`;

export default function Training() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="AI Training & Workspace Setup"
        description="We set up your team's AI workspace, install the assistants, and train everyone — so AI actually does the work for you. Three packages from $2,400."
        url="https://unpaste.ai/training"
      />

      <Navigation />

      <div className="grid-background" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-tag mb-6"
              >
                [AI OPERATING MANUAL]
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6"
              >
                BUILD THE WORKSPACE{" "}
                <span className="text-primary">YOUR AGENTS NEED.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
              >
                We set up your team&rsquo;s AI workspace, install the assistants,
                and train everyone &mdash; so AI actually does the work for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#packages"
                  className="brutalist-button inline-flex items-center justify-center gap-2"
                >
                  See the packages
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={MAILTO_DISCOVERY}
                  className="brutalist-button-outline inline-flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Book a discovery call
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[THE SHIFT]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                AI as personal tools{" "}
                <span className="text-primary">vs. shared infrastructure.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                Most teams are in the left column. They don&rsquo;t need more
                training. They need this.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 max-w-6xl mx-auto brutalist-card overflow-hidden"
            >
              {/* BEFORE */}
              <div className="bg-background p-8 md:p-10 border-b md:border-b-0 md:border-r border-border">
                <div className="mono-label text-muted-foreground mb-3">[BEFORE]</div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
                  AI today, in most businesses
                </h3>

                <div className="space-y-2 mb-6">
                  {/* Fake browser tabs scattered */}
                  <div className="font-mono text-xs flex items-center gap-2 text-muted-foreground border border-border p-2">
                    <span className="text-primary">●</span>
                    <span className="truncate">chat.openai.com &mdash; <span className="italic">Sarah&rsquo;s account</span></span>
                  </div>
                  <div className="font-mono text-xs flex items-center gap-2 text-muted-foreground border border-border p-2 ml-6">
                    <span className="text-primary">●</span>
                    <span className="truncate">claude.ai &mdash; <span className="italic">Tom&rsquo;s tab</span></span>
                  </div>
                  <div className="font-mono text-xs flex items-center gap-2 text-muted-foreground border border-border p-2 ml-2">
                    <span className="text-primary">●</span>
                    <span className="truncate">copilot.microsoft.com &mdash; <span className="italic">Jess tried it once</span></span>
                  </div>
                  <div className="font-mono text-xs flex items-center gap-2 text-muted-foreground border border-border p-2 ml-8">
                    <span className="text-primary">●</span>
                    <span className="truncate">perplexity.ai &mdash; <span className="italic">Founder uses this</span></span>
                  </div>

                  {/* Slack ping */}
                  <div className="mt-5 border-l-2 border-muted-foreground/30 pl-3 font-mono text-xs text-muted-foreground italic">
                    &ldquo;hey, what&rsquo;s the prompt for the client brief
                    again?&rdquo;
                    <div className="not-italic text-[10px] text-muted-foreground/60 mt-1">
                      &mdash; #general · 9:47am
                    </div>
                  </div>

                  {/* File chaos */}
                  <div className="mt-5 font-mono text-xs text-muted-foreground space-y-1">
                    <div className="truncate">↳ Quote-FINAL-v3-USE-THIS-ONE.docx</div>
                    <div className="truncate">↳ Quote-FINAL-v3-USE-THIS-ONE-edited.docx</div>
                    <div className="truncate">↳ Marketing-prompts (my version).txt</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 font-mono text-sm text-muted-foreground">
                  <span>Personal productivity. </span>
                  <span className="text-foreground font-bold">
                    Nothing compounds.
                  </span>
                </div>
              </div>

              {/* AFTER */}
              <div className="bg-zinc-900 text-zinc-100 p-8 md:p-10">
                <div className="mono-label text-zinc-400 mb-3">[AFTER]</div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-white">
                  AI with an Operating Manual
                </h3>

                {/* Workspace diagram */}
                <div className="border border-zinc-700 p-5 mb-6">
                  {/* Team members feeding in */}
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {["Sarah", "Tom", "Jess", "Founder"].map((name) => (
                      <div key={name} className="text-center">
                        <div className="font-mono text-xs text-zinc-200 mb-1">
                          {name}
                        </div>
                        <div className="text-primary text-sm leading-none">↓</div>
                      </div>
                    ))}
                  </div>

                  {/* Workspace center */}
                  <div className="border border-primary p-3 mb-3 flex items-center justify-center gap-2 bg-white/5">
                    <Folder className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs font-bold tracking-wider text-white">
                      SHARED WORKSPACE
                    </span>
                  </div>

                  {/* Arrows out to agents */}
                  <div className="text-center mb-3">
                    <div className="text-primary text-sm leading-none">↓</div>
                    <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mt-1">
                      AI assistants run from this
                    </div>
                  </div>

                  {/* Running agents */}
                  <div className="space-y-2 border-t border-zinc-700 pt-3">
                    {[
                      "Weekly brief",
                      "Quote drafts",
                      "Inbox sort",
                    ].map((agent) => (
                      <div
                        key={agent}
                        className="flex items-center justify-between font-mono text-xs"
                      >
                        <span className="text-zinc-100">{agent}</span>
                        <span className="flex items-center gap-1.5 text-primary">
                          <span className="inline-block w-2 h-2 bg-primary"></span>
                          <span className="tracking-wider">RUNNING</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-700 pt-4 font-mono text-sm">
                  <span className="text-zinc-100">Shared infrastructure. </span>
                  <span className="font-bold text-primary">
                    Everyone benefits from everyone&rsquo;s work.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem / Why a workspace */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="section-tag mb-4">[THE PROBLEM]</div>
                <h2 className="text-3xl md:text-4xl tracking-tighter mb-6">
                  Workshops don&rsquo;t fix this.{" "}
                  <span className="text-primary">Infrastructure does.</span>
                </h2>
                <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Tools change every week. Each person uses AI differently.
                    Workshops don&rsquo;t stick.
                  </p>
                  <p className="text-foreground font-bold">
                    Build one AI setup the whole team works from, and it sticks.
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
                  <Folder className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Anatomy of an AI workspace
                  </span>
                </div>
                <pre className="p-6 font-mono text-xs md:text-sm leading-relaxed text-zinc-100 overflow-x-auto whitespace-pre">
                  {workspaceTree}
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
                    <span>Cowork</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section
          id="packages"
          className="py-16 md:py-24 border-t border-border bg-card scroll-mt-20"
        >
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[PACKAGES]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                Three ways to get{" "}
                <span className="text-primary">your workspace running.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                Start with Kickstart to see the pattern. Most teams choose Operations
                for the ongoing relationship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.tag}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`brutalist-card flex flex-col relative ${
                    pkg.highlighted
                      ? "bg-foreground text-background"
                      : "bg-background"
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`mono-label ${
                          pkg.highlighted ? "text-background/60" : ""
                        }`}
                      >
                        {pkg.tag}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p
                      className={`font-mono text-sm mb-6 ${
                        pkg.highlighted ? "text-background/80" : "text-muted-foreground"
                      }`}
                    >
                      {pkg.positioning}
                    </p>

                    {/* Price */}
                    <div
                      className={`pb-6 mb-6 border-b ${
                        pkg.highlighted ? "border-background/20" : "border-border"
                      }`}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-bold tracking-tight">
                          {pkg.setupPrice}
                        </span>
                        <span
                          className={`font-mono text-xs uppercase tracking-wider ${
                            pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                          }`}
                        >
                          setup
                        </span>
                      </div>
                      {pkg.monthlyPrice && (
                        <div className="mt-1 flex items-baseline gap-2">
                          <span
                            className={`font-mono text-lg font-bold ${
                              pkg.highlighted ? "text-primary" : "text-primary"
                            }`}
                          >
                            + {pkg.monthlyPrice}
                          </span>
                          <span
                            className={`font-mono text-xs uppercase tracking-wider ${
                              pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                            }`}
                          >
                            retainer
                          </span>
                        </div>
                      )}
                      <div
                        className={`mt-3 font-mono text-xs ${
                          pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                        }`}
                      >
                        {pkg.term}
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-6">
                      <div
                        className={`mono-label mb-3 ${
                          pkg.highlighted ? "text-background/60" : ""
                        }`}
                      >
                        {pkg.includesTitle}
                      </div>
                      <ul className="space-y-3">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span
                              className={`font-mono text-sm leading-relaxed ${
                                pkg.highlighted ? "text-background/90" : "text-foreground"
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recurring */}
                    {pkg.recurring && (
                      <div
                        className={`mb-6 pt-6 border-t ${
                          pkg.highlighted ? "border-background/20" : "border-border"
                        }`}
                      >
                        <div
                          className={`mono-label mb-3 ${
                            pkg.highlighted ? "text-background/60" : ""
                          }`}
                        >
                          {pkg.recurringTitle}
                        </div>
                        <ul className="space-y-3">
                          {pkg.recurring.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span
                                className={`font-mono text-sm leading-relaxed ${
                                  pkg.highlighted ? "text-background/90" : "text-foreground"
                                }`}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* For whom */}
                    <p
                      className={`font-mono text-xs italic mb-6 ${
                        pkg.highlighted ? "text-background/70" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`mono-label not-italic mr-2 ${
                          pkg.highlighted ? "text-background/50" : ""
                        }`}
                      >
                        For:
                      </span>
                      {pkg.forWhom}
                    </p>

                    {/* CTA */}
                    <a
                      href={mailtoForPackage(pkg.name.replace("AI ", ""))}
                      className={`mt-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors ${
                        pkg.highlighted
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      {pkg.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[WHAT HAPPENS]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                What we actually do{" "}
                <span className="text-primary">on day one.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                The half-day Kickstart curriculum. Operations and Department layer
                more on top.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {curriculum.map((block, i) => (
                  <motion.div
                    key={block.step}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="brutalist-card bg-card p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8"
                  >
                    <div className="md:w-32 flex-shrink-0">
                      <div className="mono-label text-primary mb-1">
                        {block.step}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {block.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg tracking-tight mb-2">
                        {block.title}
                      </h3>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {block.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Agent at Work */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[AN AGENT AT WORK]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                Here&rsquo;s what runs{" "}
                <span className="text-primary">every Monday at 9am.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                Once the setup&rsquo;s in place, AI assistants run on schedule.
                Zero human time.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="brutalist-card bg-zinc-900 text-zinc-100 p-6 md:p-10 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-zinc-700 mb-6">
                  <div>
                    <div className="mono-label text-zinc-400 mb-1">
                      SCHEDULED TASK
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl tracking-tight text-white">
                      Monday Morning Brief
                    </h3>
                  </div>
                  <div className="sm:text-right">
                    <div className="mono-label text-zinc-400 mb-1">TRIGGER</div>
                    <div className="font-mono text-sm text-zinc-200">Monday · 09:00 AEST</div>
                  </div>
                </div>

                {/* Timeline steps */}
                <div className="mb-2">
                  {[
                    {
                      time: "09:00:00",
                      title: "Read the week",
                      detail: "Pulls last week's notes and your brief template.",
                    },
                    {
                      time: "09:00:12",
                      title: "Draft",
                      detail: "Writes the brief in your company voice.",
                    },
                    {
                      time: "09:00:43",
                      title: "Post",
                      detail: "Posts to Slack #leadership and archives a copy.",
                    },
                    {
                      time: "09:00:47",
                      title: "Done",
                      detail: "Leadership reads with their morning coffee.",
                    },
                  ].map((step, i, arr) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-3 h-3 bg-primary mt-2"></div>
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-zinc-700"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-1">
                          <span className="font-mono text-xs text-primary">
                            {step.time}
                          </span>
                          <span className="font-bold text-sm tracking-tight uppercase text-white">
                            {step.title}
                          </span>
                        </div>
                        <div className="font-mono text-sm text-zinc-200 leading-relaxed">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-700">
                  <div>
                    <div className="mono-label text-zinc-400 mb-1">RUN TIME</div>
                    <div className="font-bold text-xl md:text-2xl text-primary">
                      47s
                    </div>
                  </div>
                  <div>
                    <div className="mono-label text-zinc-400 mb-1">
                      HUMAN TIME
                    </div>
                    <div className="font-bold text-xl md:text-2xl text-primary">
                      0min
                    </div>
                  </div>
                  <div>
                    <div className="mono-label text-zinc-400 mb-1">
                      RECURRENCE
                    </div>
                    <div className="font-bold text-xl md:text-2xl text-primary">
                      Weekly
                    </div>
                  </div>
                </div>
              </div>

              {/* Other examples */}
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="brutalist-card bg-background p-6">
                  <div className="mono-label text-primary mb-2">+ ALSO RUNNING</div>
                  <h4 className="font-bold tracking-tight mb-2">
                    Quote drafts from inbox
                  </h4>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    Client enquiry comes in. Agent drafts the quote and sends it to ops for review.
                  </p>
                </div>
                <div className="brutalist-card bg-background p-6">
                  <div className="mono-label text-primary mb-2">+ ALSO RUNNING</div>
                  <h4 className="font-bold tracking-tight mb-2">
                    Client onboarding pack
                  </h4>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    Deal won. Welcome pack, kickoff agenda, and billing setup ready in under a minute.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What makes it different */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[WHY THIS WORKS]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                Not another{" "}
                <span className="text-primary">ChatGPT workshop.</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="brutalist-card bg-card overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-6 md:p-8">
                    <div className="mono-label text-muted-foreground mb-4">
                      A typical AI workshop
                    </div>
                    <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                      <li>Teaches everyone to write better prompts</li>
                      <li>Generic intro to ChatGPT</li>
                      <li>Trainer leaves, nothing sticks</li>
                      <li>One-off — no support after</li>
                      <li>Helps the enthusiasts, not the team</li>
                      <li>You ask AI things, that's it</li>
                    </ul>
                  </div>
                  <div className="p-6 md:p-8 bg-zinc-900 text-zinc-100">
                    <div className="mono-label text-zinc-400 mb-4">
                      What you get with Unpaste
                    </div>
                    <ul className="space-y-3 font-mono text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>A real AI setup, built for your business</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>We pick the AI tools that fit your work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Weekly check-ins keep it alive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Quarterly refresh as AI keeps changing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Shared by the whole team, not just one person</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>AI assistants doing real work for you</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[WHO IT&rsquo;S FOR]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                Built for teams{" "}
                <span className="text-primary">doing the work.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {audiences.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-card border border-border p-6 md:p-8"
                  >
                    <div className="h-10 w-10 border border-border flex items-center justify-center mb-4">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base mb-2 tracking-tight">
                      {item.label}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[FAQ]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                Things people{" "}
                <span className="text-primary">actually ask.</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="brutalist-card bg-background p-6 group"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <span className="font-bold text-base md:text-lg tracking-tight">
                      {faq.q}
                    </span>
                    <span className="font-mono text-primary text-xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-border">
                    {faq.a}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="section-tag mb-4">[NEXT STEP]</div>
              <h2 className="text-3xl md:text-5xl tracking-tighter mb-6">
                Book a{" "}
                <span className="text-primary">discovery call.</span>
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
                15&ndash;30 minutes to scope your team, pick the right package, and
                book a date. No commitment.
              </p>

              <div className="brutalist-card bg-zinc-900 text-zinc-100 p-8 md:p-12 max-w-2xl mx-auto">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                  Email to book
                </p>
                <a
                  href={MAILTO_DISCOVERY}
                  className="inline-block font-bold text-2xl md:text-3xl tracking-tight text-primary hover:underline mb-4"
                >
                  hello@unpaste.ai
                </a>
                <p className="font-mono text-sm text-zinc-200 max-w-md mx-auto">
                  Click to open a draft with the right subject already filled in. We&rsquo;ll reply within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
