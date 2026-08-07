import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  Download,
  FileText,
  MessageSquare,
  Shield,
  Sparkles,
  Terminal,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { calendlyUrl as baseCalendlyUrl } from "@/lib/booking";

const calendlyUrl = baseCalendlyUrl("resources_coaching_cta");

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface Resource {
  number: string;
  title: string;
  icon: LucideIcon;
  worksIn: string;
  time: string;
  what: string;
  steps: string[];
  prompt: string;
  note?: string;
}

const resources: Resource[] = [
  {
    number: "01",
    title: "The Agent Interview",
    icon: Bot,
    worksIn: "Claude Code",
    time: "~10 min",
    what: "Every new chat starts with amnesia — the agent knows nothing about you or your business. This prompt turns that around: it interviews YOU, then writes what it learns into CLAUDE.md, the file it reads every time it wakes up in that workspace.",
    steps: [
      "Open Claude Code and open the folder you want it to work in.",
      "Paste the prompt. Answer its questions — out loud is fine, turn dictation on.",
      "When it shows you CLAUDE.md, correct anything it got wrong. Those corrections are the most valuable part.",
    ],
    prompt: `You're setting up as my assistant in this workspace. Before you write anything, interview me.

Ask me 8–10 questions, a few at a time, about: what my business does, who my customers are, the documents I produce every week, how I like things written, and the things I never want done.

When the interview is done, write my answers into a file called CLAUDE.md at the top level of this workspace. Plain headings, no fluff, keep it under one page.

Then read it back to me so I can correct anything.`,
  },
  {
    number: "02",
    title: "The ChatGPT Bridge",
    icon: MessageSquare,
    worksIn: "ChatGPT",
    time: "~5 min",
    what: "Been using ChatGPT for a while? It already knows your tone, your rules, your formats. This prompt exports that knowledge as a markdown file you can drop straight into a new Claude Code workspace — so it starts smart, not blank.",
    steps: [
      "Run this in the ChatGPT chat where you've done most of your work.",
      "Answer its two or three scoping questions.",
      "Save the file it produces into your new workspace folder.",
    ],
    prompt: `I'm setting up a dedicated workspace on my computer for one area of my work: [THE ONE THING — e.g. social content for my clients / my monthly client reporting / my proposals].

Look back through what you know about me and what we've done in this chat, and pull out only what applies to that one area. I want the rules, not the history.

Give me a single markdown file containing:
- how I want the work done — tone, format, structure, length
- the things I never want done
- any templates or formats I reuse
- specifics about the business it's for

Leave out: anything about other areas of my work, examples of past outputs, and general advice about the topic.

If something only came up once and you're not sure it's a standing preference, don't put it in the main file — list it at the bottom under "check these".

Before you write anything, ask me two or three questions to make sure you've scoped it right.`,
    note: "Pick ONE area of your work. A single tight file beats three thin ones — you can repeat the prompt for other areas later.",
  },
  {
    number: "03",
    title: "The Never-List",
    icon: Shield,
    worksIn: "Claude Code",
    time: "~5 min",
    what: "Telling an agent what NOT to do is as important as telling it what to do. That's your fence. This prompt builds the guard rails into your CLAUDE.md — and writes your most important rule twice, so it can't be forgotten.",
    steps: [
      "Run this in a workspace that already has a CLAUDE.md.",
      "Tell it your hard rules — the things it must never do, ever.",
      "Read the result. If a rule matters enough to say, it matters enough to check.",
    ],
    prompt: `Read the CLAUDE.md in this workspace. Add a section called NEVER.

Ask me for the things I never want done in this workspace — the hard rules, not preferences. Write them as short, direct commands.

Then take the single most important rule and write it twice: once at the very top of the file and once at the very bottom, each marked clearly. Rules written twice don't get forgotten.

Show me the finished file before you save it.`,
  },
  {
    number: "04",
    title: "The Desktop Cleanup",
    icon: Trash2,
    worksIn: "Claude Code",
    time: "~5 min",
    what: "The fastest confidence builder there is. Point it at a messy desktop and watch it organise years of chaos into folders in minutes — without deleting a single thing. Perfect first job for a new workspace.",
    steps: [
      "Open Claude Code in the folder you want cleaned (yes, your Desktop can be a workspace).",
      "Paste the prompt. Answer its questions.",
      "Read the plan before you approve it. Nothing gets deleted — everything doubtful goes to a review folder.",
    ],
    prompt: `I've had this computer for years and there's a bunch of files and folders on my desktop that may be redundant. Clean it up and organise it into folders.

Don't delete anything. If something may be redundant, put it in a folder called "to-be-reviewed".

Ask me a couple of questions first, then show me your plan before you move anything.`,
  },
  {
    number: "05",
    title: "The Weekly Document",
    icon: FileText,
    worksIn: "Claude Code",
    time: "~15 min",
    what: "Everyone has one — the document you produce every week that you wish drafted itself. This prompt doesn't write it for you once. It builds the machine: a repeatable process you run forever after.",
    steps: [
      "Put a couple of past examples of the document in your workspace.",
      "Paste the prompt and name your document.",
      "It gives you a plan first — read it, fix its assumptions, THEN let it build.",
    ],
    prompt: `Every week I produce [NAME THE DOCUMENT — e.g. my client status report / my social media calendar / my quoting summary].

Look at the examples in [FOLDER]. Draft a plan for how you would produce this document for me from now on:

- where you get the inputs
- what format and structure you follow
- what you'd need from me each week
- what you'd never guess or invent

Don't produce the document yet. Show me the plan first and wait for my approval.`,
  },
  {
    number: "06",
    title: "The Delegation Brief",
    icon: Sparkles,
    worksIn: "Claude Code or ChatGPT",
    time: "~5 min",
    what: "\"Make this better\" is how you get generic back. A real brief answers three questions: what does done look like, what does it need to know, and what's off limits. This prompt rebuilds a lazy instruction into a proper brief — and teaches you the habit.",
    steps: [
      "Paste the prompt along with whatever vague instruction you were about to give.",
      "Answer its three questions plainly — one long response beats many short ones.",
      "Compare the rebuilt brief to your original. That gap is the skill.",
    ],
    prompt: `I'm about to give an AI this instruction:

"[PASTE YOUR VAGUE INSTRUCTION — e.g. make this email better]"

Don't run it. Instead, turn it into a proper delegation brief by asking me three questions:

1. What does DONE look like? (the specific result I want)
2. What does it need to KNOW? (context, examples, constraints)
3. What's OFF LIMITS? (the things it must not do or change)

Once I've answered, write the rebuilt brief in my words, ready to paste. Tell me what the original instruction would have made it guess about.`,
  },
];

const tasteFiles = [
  {
    number: "T1",
    slug: "swiss-brutalist",
    name: "Swiss Brutalist",
    vibe: "Bauhaus meets tech startup. Zero radius, hard shadows, one red accent. The taste file behind this website.",
    url: "/taste/taste-swiss-brutalist.md",
  },
  {
    number: "T2",
    slug: "bauhaus",
    name: "Bauhaus",
    vibe: "Form follows function. Jost + Inter, primary colours as structure, geometry as layout.",
    url: "/taste/taste-bauhaus.md",
  },
  {
    number: "T3",
    slug: "modern-retro",
    name: "Modern Retro",
    vibe: "Sun-faded '70s warmth with modern spacing. Fraunces + Karla, cream and espresso, arches and badges.",
    url: "/taste/taste-modern-retro.md",
  },
];

const steps = [
  {
    number: "01",
    title: "COPY",
    detail: "Hit the copy button on any prompt below.",
  },
  {
    number: "02",
    title: "PASTE",
    detail: "Drop it into Claude Code or ChatGPT and hit enter.",
  },
  {
    number: "03",
    title: "READ THE PLAN",
    detail: "It shows you what it's about to do before it touches anything. Read it. That's the whole skill.",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
        copied
          ? "border-primary bg-primary text-white"
          : "border-zinc-600 text-zinc-100 hover:border-primary hover:text-primary"
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> COPIED
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> COPY
        </>
      )}
    </button>
  );
}

function CopyTasteButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      const res = await fetch(url);
      await navigator.clipboard.writeText(await res.text());
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
        copied
          ? "border-primary bg-primary text-white"
          : "border-foreground text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> COPIED
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> COPY
        </>
      )}
    </button>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Free AI Prompts & Starter Pack — Claude Code Resources"
        description="Free copy-paste prompts for Claude Code and ChatGPT. Set up your workspace, build your rules, draft your first automation. Built from what we teach in our Brisbane AI workshops. No signup — copy and go."
        keywords="free AI prompts, Claude Code prompts, Claude Code setup, CLAUDE.md, AI workspace setup, AI for small business, AI starter pack, Brisbane AI workshop"
        url="https://unpaste.ai/resources"
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
                [001] FREE RESOURCES
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
              >
                PROMPTS THAT MAKE AI <span className="text-primary">DO THE WORK.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl"
              >
                Free copy-paste prompts for Claude Code and ChatGPT. Built from what we teach
                in our workshops — the same frameworks, no signup, no email. Copy one, paste
                it into your agent, read the plan before you approve it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#starter-pack"
                  className="brutalist-button bg-primary text-white px-6 py-3 inline-flex items-center gap-2"
                >
                  GRAB THE PROMPTS <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/workshops"
                  className="brutalist-button border border-foreground text-foreground px-6 py-3 inline-flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
                >
                  SEE THE WORKSHOP
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* [002] How to use */}
        <section className="py-16 border-t border-border bg-card">
          <div className="container">
            <div className="section-tag mb-6">[002] HOW TO USE THIS PAGE</div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="bg-card p-6 md:p-8"
                >
                  <div className="mono-label text-primary mb-3">STEP {step.number}</div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* [003] The starter pack */}
        <section id="starter-pack" className="py-16 md:py-24 border-t border-border scroll-mt-20">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="section-tag mb-4">[003] THE STARTER PACK</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-3">
                SIX PROMPTS. <span className="text-primary">YOUR FIRST SYSTEM.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Run them in order and you'll have a workspace that knows your business,
                respects your rules, and drafts your weekly work. Or grab the one you need.
              </p>
            </div>

            {/* Index chips */}
            <div className="flex flex-wrap gap-3 mb-12">
              {resources.map((r) => {
                const Icon = r.icon;
                return (
                  <a
                    key={r.number}
                    href={`#resource-${r.number}`}
                    className="brutalist-card bg-background hover:bg-foreground hover:text-background transition-colors px-4 py-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {r.title}
                  </a>
                );
              })}
            </div>

            {/* Resource cards */}
            <div className="space-y-6 max-w-4xl">
              {resources.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.number}
                    id={`resource-${r.number}`}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="brutalist-card bg-background overflow-hidden scroll-mt-24"
                  >
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 border border-border flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="mono-label text-primary text-base">[{r.number}]</span>
                        <h3 className="font-bold text-lg md:text-xl tracking-tight flex-1">
                          {r.title}
                        </h3>
                      </div>

                      {/* Meta strip */}
                      <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-dashed border-muted">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <div className="mono-label">Works in</div>
                            <div className="font-mono text-sm font-bold">{r.worksIn}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <div className="mono-label">Time</div>
                            <div className="font-mono text-sm font-bold">{r.time}</div>
                          </div>
                        </div>
                      </div>

                      {/* What it does */}
                      <p className="font-mono text-sm text-foreground leading-relaxed mb-5">
                        {r.what}
                      </p>

                      {/* How to use */}
                      <div className="mb-5 pb-5 border-b border-dashed border-muted">
                        <div className="mono-label mb-3">How to use it</div>
                        <ol className="space-y-2">
                          {r.steps.map((step, si) => (
                            <li key={si} className="flex gap-3 font-mono text-sm text-muted-foreground leading-relaxed">
                              <span className="text-primary font-bold flex-shrink-0">{si + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Prompt box */}
                      <div className="bg-zinc-950 text-zinc-100">
                        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-zinc-800">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider">
                            <span className="text-primary">$</span> The prompt
                          </span>
                          <CopyButton text={r.prompt} />
                        </div>
                        <pre className="p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                          {r.prompt}
                        </pre>
                      </div>

                      {r.note && (
                        <p className="mt-4 font-mono text-xs text-muted-foreground leading-relaxed border-l-2 border-primary pl-3">
                          {r.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* [004] Design taste files */}
        <section id="taste-files" className="py-16 md:py-24 border-t border-border bg-card scroll-mt-20">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="section-tag mb-4">[004] DESIGN TASTE FILES</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-3">
                TEACH YOUR AGENT <span className="text-primary">TASTE.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                A taste file is a set of design rules — fonts, colour, spacing, motion, and a
                never-list — that an agent reads before it designs anything. Drop one into
                your project, tell your agent to follow it, and every page it builds comes
                out with a point of view instead of a default. These are the same files we
                use on client work.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
              {tasteFiles.map((t, i) => (
                <motion.div
                  key={t.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="brutalist-card bg-background p-6 flex flex-col"
                >
                  <div className="mono-label text-primary mb-3">[{t.number}]</div>
                  <h3 className="font-bold text-xl tracking-tight mb-1">{t.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-5">
                    {t.vibe}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["TYPE", "COLOUR", "SPACING", "MOTION", "NEVER"].map((chip) => (
                      <span
                        key={chip}
                        className="border border-border px-2 py-1 font-mono text-[10px] tracking-wider text-muted-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-3">
                    <CopyTasteButton url={t.url} />
                    <a
                      href={t.url}
                      download
                      className="inline-flex items-center gap-2 border border-zinc-600 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" /> .MD
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary pl-3">
              How to use: copy or download a file, save it as DESIGN-TASTE.md at the root of
              your project, then tell your agent — "read DESIGN-TASTE.md and follow it for
              every visual decision." The file includes the exact install prompt.
            </p>
          </div>
        </section>

        {/* [005] CTA */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="section-tag mb-6">[005] GO FURTHER</div>
              <h2 className="text-3xl md:text-5xl tracking-tighter mb-6">
                THESE PROMPTS ARE THE FIRST HOUR{" "}
                <span className="text-primary">OF THE WORKSHOP.</span>
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                In three hours, in person, you'll set up your own workspace, build your first
                real automation, and leave with the confidence to keep going. Small group.
                Your laptop. Real work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/workshops"
                  className="brutalist-button bg-primary text-white px-8 py-4 inline-flex items-center gap-2"
                >
                  TAKE A SEAT <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-button border border-foreground text-foreground px-8 py-4 inline-flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
                >
                  BOOK A 1:1 INTRO CALL
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
