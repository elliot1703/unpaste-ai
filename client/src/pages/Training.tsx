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
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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

const CALENDLY_BASE = "https://calendly.com/elliot-unpaste/30min";
const calendlyUrl = (source: string) =>
  `${CALENDLY_BASE}?utm_source=training_${source}`;

const CONTACT_EMAIL = "hello@unpaste.ai";

interface IncludeItem {
  lead: string;
  detail?: string;
}

type IncludeEntry = string | IncludeItem;

interface Package {
  tag: string;
  name: string;
  positioning: string;
  setupPrice: string;
  monthlyPrice?: string;
  term: string;
  youGet?: string;
  narrative?: string;
  includesTitle: string;
  includes: IncludeEntry[];
  recurringTitle?: string;
  recurring?: IncludeEntry[];
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
    youGet: "1 workspace · 4–6 areas mapped · 1 AI assistant · 2–3 shortcuts · 1 playbook",
    includesTitle: "Half day on-site · 4 hrs",
    includes: [
      {
        lead: "Your team on the same page about AI",
        detail: "One shared workspace + clear rules, not scattered personal accounts",
      },
      {
        lead: "Your business mapped",
        detail: "4–6 main areas — quoting, jobs, clients, ops",
      },
      {
        lead: "AI playbook (one-pager)",
        detail: "Anyone you hire next week can pick it up",
      },
      {
        lead: "AI assistant installed",
        detail: "Running on real work, day one",
      },
      {
        lead: "2–3 starter shortcuts",
        detail: "For the things your team does every week",
      },
      {
        lead: "Recording for new hires",
      },
    ],
    narrative:
      "Short interactive session with the team — practical metaphors, real visuals, no tech jargon. Then we sit with your specialist team members and workshop the AI opportunities mainstream tools haven't touched yet.",
    forWhom: "small teams who want to dip a toe in before a longer commitment.",
    cta: "Book Kickstart",
  },
  {
    tag: "[002]",
    name: "AI OPERATIONS",
    positioning: "AI built into how your team works every week.",
    setupPrice: "$4,500",
    monthlyPrice: "$1,900/mo",
    term: "3-month minimum, then month-to-month",
    youGet: "Full workspace · per-role setup · 3–5 AI assistants · weekly check-ins · ongoing tune-ups",
    includesTitle: "Full day on-site · 6 hrs (everything in Kickstart, plus)",
    includes: [
      {
        lead: "Your whole team aligned, every role configured",
        detail: "Admin, sales, ops — each role has the AI setup that fits how they work",
      },
      {
        lead: "Every part of your business mapped",
        detail: "AI helps across the board, not just one corner",
      },
      {
        lead: "3–5 AI assistants doing recurring work",
        detail: "Weekly client updates, quote drafts, inbox triage — the stuff that eats time",
      },
      {
        lead: "Clear safety rules",
        detail: "What AI does on its own, what you check first",
      },
      {
        lead: "Set up where your team already works",
        detail: "Drive, Notion, wherever the work happens — no new dashboards",
      },
    ],
    recurringTitle: "Then every week",
    recurring: [
      {
        lead: "45-min team call",
        detail: "Bring questions, see what's new, dig into what's working",
      },
      {
        lead: "Q&A in between",
        detail: "Slack or email — we don't disappear between sessions",
      },
      {
        lead: "Monthly 'what's new in AI' update",
        detail: "So you don't fall behind as the tools evolve",
      },
      {
        lead: "Quarterly tune-up",
        detail: "Refresh your setup as your team grows into it",
      },
    ],
    narrative:
      "Full day on-site to start. Workshop with each role's specialists to find the recurring work AI can take off their plate, then set those assistants up live with your team watching. After the day, we stay with you — Tuesday 10am office hours every week so the setup actually beds in and evolves with your team.",
    forWhom: "teams that want AI built into their week, not bolted on the side.",
    cta: "Book Operations",
    highlighted: true,
  },
  {
    tag: "[003]",
    name: "AI DEPARTMENT",
    positioning: "Your AI department, run for you.",
    setupPrice: "From $9,500",
    monthlyPrice: "Retainer per scope",
    term: "Scoped engagement",
    youGet: "Full architecture · 8–12 assistants · CRM/email/calendar wired in · weekly leadership + team · ongoing build hours",
    includesTitle: "2-day intensive · everything in Operations, plus",
    includes: [
      {
        lead: "Leadership aligned on AI strategy",
        detail: "Day one with you and the decision-makers — what to bet on, what to govern",
      },
      {
        lead: "AI architecture across the whole business",
        detail: "Mapped from sales to ops to finance to admin — nothing left out",
      },
      {
        lead: "8–12 AI assistants running real work",
        detail: "Replacing the most expensive repetitive tasks in the business",
      },
      {
        lead: "AI wired into the tools you already use",
        detail: "CRM, calendar, email — no separate dashboards to learn",
      },
      {
        lead: "Clear governance rules",
        detail: "What AI can and can't do, who approves what",
      },
      {
        lead: "Monthly numbers showing value back",
        detail: "Hours saved, tools adopted, ROI per assistant",
      },
      {
        lead: "90-day rollout plan",
        detail: "So the whole team comes up to speed in a structured way",
      },
    ],
    recurringTitle: "Then every week",
    recurring: [
      {
        lead: "1-hour leadership call",
        detail: "Keep AI on strategy, not just tactics",
      },
      {
        lead: "30-min team Q&A",
        detail: "Plus Slack/email through the week — we're embedded",
      },
      {
        lead: "4 hrs/month of build work",
        detail: "We build new assistants as needs emerge",
      },
      {
        lead: "Monthly progress report",
        detail: "What's working, what's not, what to add next",
      },
      {
        lead: "Quarterly strategy review",
        detail: "What to add, what to drop, what's changing in AI",
      },
    ],
    narrative:
      "Two full days on-site to start. Day one with leadership — strategy, governance, what you're betting on. Day two with the whole team — workshop with each function's specialists to find their AI opportunities. Then we run as your fractional AI department: weekly leadership and team time, monthly build hours, quarterly strategy. You direct, we build.",
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

const curriculumHuman = [
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

const curriculumTech = [
  {
    step: "01",
    title: "Architecture walkthrough",
    duration: "30 min",
    detail: "Reference implementation tour. Folder taxonomy, context windows, agent tool-calls.",
  },
  {
    step: "02",
    title: "Domain decomposition",
    duration: "60 min",
    detail: "Workshop to identify top-level entities for workspace partitioning.",
  },
  {
    step: "03",
    title: "Scaffold the repo",
    duration: "60 min",
    detail: "Create folder structure. Author per-folder READMEs as agent context.",
  },
  {
    step: "04",
    title: "Author system prompt + policy",
    duration: "45 min",
    detail: "Org-level system prompt with persona, scope, safety boundaries.",
  },
  {
    step: "05",
    title: "Provision first agent",
    duration: "30 min",
    detail: "Install Claude Code (or equivalent). Bind to workspace context. Execute first task.",
  },
  {
    step: "06",
    title: "Define initial recipe set",
    duration: "15 min",
    detail: "2–3 reusable agent recipes as markdown specs. Assign workspace maintainer.",
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

const workspaceTreeHuman = `your-business/
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

const workspaceTreeTech = `your-business/
├── 01_business_rules/      ─→  Domain context, agent-readable
│   ├── what-we-quote
│   └── pricing
├── 02_clients/             ─→  Per-client READMEs scope agent context
│   └── active/
├── 03_operations/
│   └── shortcuts/          ─→  Markdown recipe library
├── 04_sales_marketing/
│   └── pipeline
├── 05_team/
│   └── roles
├── 06_ai_assistants/       ─→  Agent specs (model, tools, scope)
│   ├── quote-drafter
│   └── monday-brief
└── YOUR_RULES   ◀──────────  Org-level system prompt + safety rails.`;

export default function Training() {
  const [techMode, setTechMode] = useState(false);
  const workspaceTree = techMode ? workspaceTreeTech : workspaceTreeHuman;
  const curriculum = techMode ? curriculumTech : curriculumHuman;

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
                and train everyone &mdash; so AI does the grunt work and you
                decide what ships.
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
                  href={calendlyUrl("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-button-outline inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book a discovery call
                </a>
              </motion.div>

              {/* Tech jargon toggle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-col items-center gap-2"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Reading this with your IT person?
                </div>
                <div
                  role="group"
                  aria-label="Toggle tech jargon"
                  className="inline-flex border border-border bg-background"
                >
                  <button
                    type="button"
                    onClick={() => setTechMode(false)}
                    aria-pressed={!techMode}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      !techMode
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    No tech jargon
                  </button>
                  <button
                    type="button"
                    onClick={() => setTechMode(true)}
                    aria-pressed={techMode}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border-l border-border ${
                      techMode
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Tech jargon
                  </button>
                </div>
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

        {/* Single Pane of Glass — After the workshop */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[AFTER THE WORKSHOP]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                Less doing.{" "}
                <span className="text-primary">More deciding.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                AI does the grunt work. You review and ship what matters. This is
                what Monday morning starts to look like.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* UI Mockup — Single Pane of Glass */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-3 brutalist-card bg-background overflow-hidden"
              >
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-card border-b border-border">
                  <span className="w-2.5 h-2.5 bg-red-500"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-500"></span>
                  <span className="w-2.5 h-2.5 bg-green-500"></span>
                  <span className="ml-3 font-mono text-xs text-muted-foreground">
                    your business &middot; monday 8:55am
                  </span>
                </div>

                {/* Title */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="mono-label text-primary mb-1">
                    [MORNING QUEUE]
                  </div>
                  <div className="font-bold text-base md:text-lg tracking-tight">
                    AI ran overnight. Here&rsquo;s what&rsquo;s waiting.
                  </div>
                </div>

                {/* Inbox items */}
                <div className="divide-y divide-border">
                  {[
                    {
                      title: "Weekly leadership brief",
                      detail: "Drafted from last week's notes. Ready to send.",
                      action: "REVIEW",
                      time: "2 min",
                    },
                    {
                      title: "4 quote drafts from enquiries",
                      detail: "Built from your pricing rules. Awaiting your sign-off.",
                      action: "REVIEW",
                      time: "8 min",
                      highlight: true,
                    },
                    {
                      title: "Inbox triage: 23 emails",
                      detail: "18 auto-sorted &middot; 5 drafted replies for you to send.",
                      action: "REVIEW",
                      time: "5 min",
                    },
                    {
                      title: "Q1 KPI snapshot",
                      detail: "Numbers refreshed. One variance flagged for a look.",
                      action: "CHECK",
                      time: "3 min",
                      flag: true,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="px-6 py-4 flex items-start gap-4 hover:bg-card/50 transition-colors"
                    >
                      <span
                        className={`w-2 h-2 mt-2 flex-shrink-0 ${
                          item.flag
                            ? "bg-primary"
                            : item.highlight
                              ? "bg-primary"
                              : "bg-foreground"
                        }`}
                      ></span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm tracking-tight">
                          {item.title}
                        </div>
                        <div
                          className="font-mono text-xs text-muted-foreground mt-1"
                          dangerouslySetInnerHTML={{ __html: item.detail }}
                        />
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                          {item.action}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-card border-t border-border flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">
                    Your total morning review:
                  </span>
                  <span className="text-foreground font-bold">~18 min</span>
                </div>
              </motion.div>

              {/* Time Returned panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="md:col-span-2 brutalist-card bg-zinc-900 text-zinc-100 p-6 md:p-8 flex flex-col"
              >
                <div className="mono-label text-zinc-400 mb-3">
                  [TIME RETURNED &mdash; WEEKLY]
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6">
                  What your team gets back.
                </h3>

                <div className="space-y-4 flex-1">
                  {[
                    {
                      task: "Writing weekly client brief",
                      before: "4 hrs",
                      after: "5 min sign-off",
                    },
                    {
                      task: "Drafting quote letters",
                      before: "6 hrs",
                      after: "20 min reviewing",
                    },
                    {
                      task: "Email triage + drafts",
                      before: "3 hrs",
                      after: "25 min reviewing",
                    },
                    {
                      task: "Monthly KPI assembly",
                      before: "8 hrs/mo",
                      after: "auto + 10 min",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="pb-4 border-b border-zinc-700 last:border-0 last:pb-0"
                    >
                      <div className="font-mono text-xs text-zinc-300 mb-1.5">
                        {item.task}
                      </div>
                      <div className="flex items-baseline gap-2 font-mono text-sm">
                        <span className="text-zinc-500 line-through">
                          {item.before}
                        </span>
                        <span className="text-zinc-400">&rarr;</span>
                        <span className="text-primary font-bold">
                          {item.after}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-700">
                  <div className="mono-label text-zinc-400 mb-1">
                    Per team member, per week
                  </div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                      ~6 hrs
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      back to the work that matters
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
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
                <div className="p-4 border-b border-zinc-700 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Anatomy of an AI workspace
                    </span>
                  </div>
                  <div
                    role="group"
                    aria-label="Toggle tech jargon"
                    className="inline-flex border border-zinc-700"
                  >
                    <button
                      type="button"
                      onClick={() => setTechMode(false)}
                      aria-pressed={!techMode}
                      className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                        !techMode
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      No jargon
                    </button>
                    <button
                      type="button"
                      onClick={() => setTechMode(true)}
                      aria-pressed={techMode}
                      className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors border-l border-zinc-700 ${
                        techMode
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Tech
                    </button>
                  </div>
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
                        <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                          <span
                            className={`font-mono text-lg font-bold text-primary`}
                          >
                            {pkg.monthlyPrice.endsWith("/mo") ? `+ ${pkg.monthlyPrice}` : pkg.monthlyPrice}
                          </span>
                          {pkg.monthlyPrice.endsWith("/mo") && (
                            <span
                              className={`font-mono text-xs uppercase tracking-wider ${
                                pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                              }`}
                            >
                              retainer
                            </span>
                          )}
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

                    {/* YOU GET — at-a-glance summary */}
                    {pkg.youGet && (
                      <div
                        className={`mb-6 pb-6 border-b ${
                          pkg.highlighted ? "border-background/20" : "border-border"
                        }`}
                      >
                        <div
                          className={`mono-label mb-2 ${
                            pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                          }`}
                        >
                          You get
                        </div>
                        <div
                          className={`font-mono text-xs md:text-sm leading-relaxed ${
                            pkg.highlighted ? "text-background/90" : "text-foreground"
                          }`}
                        >
                          {pkg.youGet}
                        </div>
                      </div>
                    )}

                    {/* Includes */}
                    <div className="mb-6">
                      <div
                        className={`mono-label mb-4 ${
                          pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                        }`}
                      >
                        {pkg.includesTitle}
                      </div>
                      <ul className="space-y-4">
                        {pkg.includes.map((item, idx) => {
                          if (typeof item === "string") {
                            return (
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
                            );
                          }
                          return (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <div
                                  className={`font-bold text-sm tracking-tight ${
                                    pkg.highlighted ? "text-white" : "text-foreground"
                                  }`}
                                >
                                  {item.lead}
                                </div>
                                {item.detail && (
                                  <div
                                    className={`font-mono text-xs leading-relaxed mt-1 ${
                                      pkg.highlighted ? "text-background/70" : "text-muted-foreground"
                                    }`}
                                  >
                                    {item.detail}
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
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
                          {pkg.recurring.map((item, idx) => {
                            if (typeof item === "string") {
                              return (
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
                              );
                            }
                            return (
                              <li key={idx} className="flex items-start gap-3">
                                <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                  <div
                                    className={`font-bold text-sm tracking-tight ${
                                      pkg.highlighted ? "text-white" : "text-foreground"
                                    }`}
                                  >
                                    {item.lead}
                                  </div>
                                  {item.detail && (
                                    <div
                                      className={`font-mono text-xs leading-relaxed mt-1 ${
                                        pkg.highlighted ? "text-background/70" : "text-muted-foreground"
                                      }`}
                                    >
                                      {item.detail}
                                    </div>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Narrative — what this looks like in real life */}
                    {pkg.narrative && (
                      <div
                        className={`mb-6 p-4 border-l-2 ${
                          pkg.highlighted
                            ? "bg-background/5 border-primary"
                            : "bg-card border-primary"
                        }`}
                      >
                        <div
                          className={`mono-label mb-2 ${
                            pkg.highlighted ? "text-background/60" : "text-muted-foreground"
                          }`}
                        >
                          What this looks like in real life
                        </div>
                        <p
                          className={`font-mono text-xs leading-relaxed ${
                            pkg.highlighted ? "text-background/90" : "text-foreground"
                          }`}
                        >
                          {pkg.narrative}
                        </p>
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
                      href={calendlyUrl(pkg.name.toLowerCase().replace(/ /g, "_"))}
                      target="_blank"
                      rel="noopener noreferrer"
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
            <div className="text-center max-w-2xl mx-auto mb-8">
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
              <div className="mb-6 flex justify-end">
                <div
                  role="group"
                  aria-label="Toggle tech jargon"
                  className="inline-flex border border-border bg-background"
                >
                  <button
                    type="button"
                    onClick={() => setTechMode(false)}
                    aria-pressed={!techMode}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      !techMode
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    No jargon
                  </button>
                  <button
                    type="button"
                    onClick={() => setTechMode(true)}
                    aria-pressed={techMode}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors border-l border-border ${
                      techMode
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Tech
                  </button>
                </div>
              </div>
              {techMode ? (
                /* Terminal-style render */
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="brutalist-card bg-zinc-950 overflow-hidden font-mono"
                >
                  {/* Terminal window chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                    <span className="w-2.5 h-2.5 bg-red-500"></span>
                    <span className="w-2.5 h-2.5 bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 bg-green-500"></span>
                    <span className="ml-3 font-mono text-xs text-zinc-400">
                      unpaste — workshop@day-one
                    </span>
                  </div>
                  {/* Terminal body */}
                  <div className="p-6 md:p-8 text-sm leading-relaxed">
                    <div className="text-zinc-500 mb-1">
                      <span className="text-green-400">$</span>{" "}
                      ./workshop start --tier kickstart --duration 4h
                    </div>
                    <div className="text-green-400 mb-1">✓ workspace initialized</div>
                    <div className="text-green-400 mb-6">✓ 6 modules loaded</div>

                    {curriculum.map((block) => (
                      <div key={block.step} className="mb-5">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-primary font-bold">
                            [{block.step}]
                          </span>
                          <span className="text-white uppercase tracking-tight font-bold">
                            {block.title}
                          </span>
                          <span className="text-zinc-500 text-xs ml-auto">
                            {block.duration}
                          </span>
                        </div>
                        <div className="text-zinc-300 pl-10 text-xs leading-relaxed mt-1.5">
                          ↳ {block.detail}
                        </div>
                      </div>
                    ))}

                    <div className="text-zinc-500 mt-6 flex items-center gap-1">
                      <span className="text-green-400">$</span>
                      <span className="inline-block w-2 h-4 bg-zinc-300 animate-pulse ml-1" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Standard brutalist-card render */
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
              )}
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
                    Deal won. Welcome pack and kickoff agenda assembled. Quick review, then you send.
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
                        <span>AI does the grunt work, your team stays in control</span>
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
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-4">
                  Pick a time that suits
                </p>

                <a
                  href={calendlyUrl("final")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-base md:text-lg tracking-tight px-8 py-4 hover:bg-primary/90 transition-colors mb-4"
                >
                  Book a 30-min discovery call
                  <ArrowRight className="h-4 w-4" />
                </a>

                <p className="font-mono text-xs text-zinc-300 max-w-md mx-auto">
                  No pitch, just a chat. We&rsquo;ll scope your team, pick the right
                  package, and book a workshop date.
                </p>

                <p className="font-mono text-xs text-zinc-500 mt-6 pt-6 border-t border-zinc-700">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-zinc-300 hover:text-primary transition-colors underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
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
