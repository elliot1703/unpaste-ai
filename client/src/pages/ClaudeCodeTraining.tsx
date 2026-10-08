// /claude-code-training: the page for the query, not the brand.
//
// Demand research (unpaste/business/seo/demand-map.md, 6 Oct 2026): "claude
// code" is searched 49,500 times a month in Australia, "claude code training"
// 70, and every page that currently wins the training prompts in AI answers
// states what, who, where, how long and how much in the first screen. This page
// does the same, in the words buyers used on discovery calls.
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Terminal, Inbox, FileText, Repeat, Compass, Users, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WORKSHOP_PRICE } from "@/lib/workshops";

const formats = [
  {
    tag: "01 WORKSHOP",
    name: "Brisbane workshop",
    price: `${WORKSHOP_PRICE.display} ${WORKSHOP_PRICE.suffix} a seat`,
    term: "One day · small group · Bulimba",
    who: "You, your laptop, one job that keeps coming back.",
    href: "/workshops",
    cta: "See dates and seats",
  },
  {
    tag: "02 DEV DAY",
    name: "Team dev day",
    price: "$3,500",
    term: "One day · 9:00 to 3:00 · your office",
    who: "The whole team. Workspace set up, agents running, everyone trained on it.",
    href: "/coaching#dev-day",
    cta: "See the dev day",
  },
  {
    tag: "03 ONE-ON-ONE",
    name: "1:1 upskilling block",
    price: "$2,000",
    term: "8 weeks · 4 sessions · in person or remote",
    who: "The owner or one champion gets ahead first, then brings the team in.",
    href: "/coaching",
    cta: "See the block",
  },
];

const learn = [
  {
    icon: Terminal,
    title: "The manual half hour",
    detail:
      "Every person in the office does the same job before 9am: pull the same information, retype it into the CRM. Hand it to an agent. Check its work over coffee.",
  },
  {
    icon: Inbox,
    title: "Follow-ups you have to remember",
    detail:
      "Client notes become drafted follow-up emails, in your voice, waiting in your drafts folder. You read, you send. Nothing slips through the cracks.",
  },
  {
    icon: FileText,
    title: "Quotes from the enquiry email",
    detail:
      "The enquiry lands. The agent reads your price list, drafts the quote, puts it in front of you. It never sends without you.",
  },
  {
    icon: Repeat,
    title: "Consistent every time",
    detail:
      "Brief it once, get the same output tomorrow. The fix for \"it kept coming out different every time I asked\".",
  },
  {
    icon: Compass,
    title: "Knowing what to ask",
    detail:
      "How to brief an agent. How to give it memory. How to keep it on a leash. Which of your tools connect to it, and which don't yet.",
  },
  {
    icon: Users,
    title: "A setup you own",
    detail:
      "Claude Code on your machine, your business written down in plain files it can read. No platform, no retainer required to keep it running.",
  },
];

const whoFor = [
  {
    industry: "Recruitment agencies",
    line: "CVs reworked for the client, JobAdder notes dictated not typed, the morning job-board sweep done before you sit down.",
  },
  {
    industry: "Allied health and solo practitioners",
    line: "Follow-ups drafted from your session notes, waitlist spots offered the moment one opens, reconciliation that doesn't eat your evening.",
  },
  {
    industry: "Trades and home services",
    line: "Quotes drafted from the email and your price list. Jobs created in Tradify or ServiceM8 from the enquiry. You approve, it files.",
  },
  {
    industry: "Agencies and consultancies",
    line: "Proposals, reports and campaign copy that start from your past work instead of a blank page. Writing stops being a chore.",
  },
];

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. Claude Code is a tool developers built, and we teach it to people who don't write code. You type in plain English. Every workshop so far has been business owners, not developers.",
  },
  {
    q: "What is Claude Code, in business terms?",
    a: "Claude Code is Anthropic's AI agent that runs on your own computer. The chat window answers questions. Claude Code does jobs: it opens your files, reads your inbox, fills your CRM, drafts your quotes, builds a web page, and runs the same job again tomorrow.",
  },
  {
    q: "Claude Code or ChatGPT?",
    a: "ChatGPT is a chat window. Claude Code is an agent on your machine that can act on your files and tools. If your team already uses ChatGPT, keep it for drafting. We teach Claude Code for the repeatable jobs.",
  },
  {
    q: "Claude Code or Cowork?",
    a: "Cowork is Anthropic's desktop app for the same agent, with a friendlier window and approval gates. We teach both and pick the one that fits each person in the first hour. Most owners end up with Cowork for daily work and Claude Code for building.",
  },
  {
    q: "What does it cost to run afterwards?",
    a: "A Claude subscription, usually $30 to $100 a month per person depending on how much you run. Claude Code itself is free. No fees to us unless you book more training.",
  },
  {
    q: "Is my client data safe?",
    a: "Claude Code runs on your computer and only touches the files and tools you connect. Anthropic does not train on business data under its commercial terms. We set up the data rules on the day: what the agent may read, what it may never send.",
  },
  {
    q: "Mac or Windows? Online or in person?",
    a: "Both. Workshops and dev days are in person in Brisbane and South East Queensland. The 1:1 block runs in person or remote anywhere in Australia.",
  },
  {
    q: "How is this different from Claude & Coffee?",
    a: "Claude & Coffee is free, every Tuesday 7am in Coorparoo, and you watch agents work and ask questions. Training is where you leave with it installed and running on your own work.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function ClaudeCodeTraining() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Claude Code Training for Business Owners | Brisbane + Online"
        description="Hands-on Claude Code training for people who don't write code. One-day Brisbane workshop $399 + GST a seat, team dev day at your office $3,500, 8-week 1:1 block $2,000. Leave with Claude Code running on your real work."
        keywords="Claude Code training, Claude Code training course, Claude Code for beginners, Claude Code for business, Claude AI training Brisbane, Claude Cowork training, AI training for business owners Australia"
        url="https://unpaste.ai/claude-code-training"
        faqItems={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Claude Code Training for Business Owners",
            description:
              "Hands-on Claude Code training for business owners and teams who do not write code. Brisbane and online.",
            provider: { "@id": "https://unpaste.ai/#organization" },
            instructor: { "@id": "https://unpaste.ai/#elliot" },
            url: "https://unpaste.ai/claude-code-training",
            courseMode: ["onsite", "online"],
            educationalLevel: "Beginner",
            teaches: [
              "Briefing an AI agent",
              "Running repeatable business jobs with Claude Code",
              "Connecting Claude Code to a CRM, inbox and files",
              "Setting data rules for an AI agent",
            ],
            offers: [
              { "@type": "Offer", name: "Brisbane workshop", price: String(WORKSHOP_PRICE.inclGstAmount), priceCurrency: "AUD", url: "https://unpaste.ai/workshops" },
              { "@type": "Offer", name: "Team dev day", price: "3500", priceCurrency: "AUD", url: "https://unpaste.ai/coaching" },
              { "@type": "Offer", name: "1:1 upskilling block", price: "2000", priceCurrency: "AUD", url: "https://unpaste.ai/coaching" },
            ],
          },
        ]}
      />

      <Navigation />
      <div className="grid-background" />

      <div className="relative z-10">
        {/* Hero: what, who, where, how long, how much, in the first screen */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container">
            <div className="max-w-4xl">
              <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="section-tag mb-6">
                [001] CLAUDE CODE · BRISBANE + ONLINE · NO CODE NEEDED
              </motion.div>
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
              >
                CLAUDE CODE TRAINING{" "}
                <span className="text-primary">FOR BUSINESS OWNERS.</span>
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl leading-relaxed mb-6 max-w-3xl"
              >
                Unpaste.ai runs Claude Code training in Brisbane and online for
                people who don't write code. Three formats: a one-day workshop
                ({WORKSHOP_PRICE.display} {WORKSHOP_PRICE.suffix} a seat), a
                team dev day at your office ($3,500), and an 8-week 1:1 block
                ($2,000). Every one ends the same way: Claude Code installed on
                your machine, running on your actual work.
              </motion.p>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-3xl"
              >
                Taught by Elliot Stone, who runs his own business on the agents
                he teaches. Small groups. Your laptop, your files, your jobs.
              </motion.p>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4">
                <Link href="/workshops" className="brutalist-button inline-flex items-center gap-2">
                  Reserve a workshop seat <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/claude-and-coffee"
                  className="brutalist-card bg-background hover:bg-foreground hover:text-background transition-colors px-6 py-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold"
                >
                  Or come to the free Tuesday meetup
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Claude Code is, for an owner */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="section-tag mb-4">[002] WHAT IT IS</div>
                <h2 className="text-3xl md:text-4xl leading-[0.95] tracking-tighter">
                  THE CHAT WINDOW ANSWERS. <span className="text-primary">CLAUDE CODE DOES THE JOB.</span>
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  Claude Code is Anthropic's AI agent that runs on your own
                  computer. Developers use it to write software. We teach
                  business owners to use it to run the business.
                </p>
                <p>
                  Unlike the chat window, it can open your files, read your
                  inbox, fill your CRM, draft your quotes, build a web page, and
                  run the same job again tomorrow without being asked twice.
                  You type in plain English. It shows you what it did. You
                  approve or correct.
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  Cowork is the same agent in Anthropic's desktop app, with a
                  friendlier window and approval gates. We teach both and pick
                  per person on the day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What you learn, in buyers' words */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="section-tag mb-4">[003] WHAT YOU LEARN</div>
            <h2 className="text-3xl md:text-4xl leading-[0.95] tracking-tighter mb-12 max-w-3xl">
              THE JOBS PEOPLE BRING TO THE ROOM.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learn.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="brutalist-card bg-background p-6">
                    <div className="h-10 w-10 border border-border flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formats */}
        <section id="formats" className="py-16 md:py-24 border-t border-border bg-card scroll-mt-20">
          <div className="container">
            <div className="section-tag mb-4">[004] THREE FORMATS</div>
            <h2 className="text-3xl md:text-4xl leading-[0.95] tracking-tighter mb-12 max-w-3xl">
              PICK THE ROOM. <span className="text-primary">SAME ENDING.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {formats.map((f) => (
                <div key={f.name} className="brutalist-card bg-background p-6 flex flex-col">
                  <div className="section-tag mb-4">{f.tag}</div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{f.name}</h3>
                  <div className="font-mono text-primary font-bold mb-1">{f.price}</div>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">{f.term}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{f.who}</p>
                  <Link href={f.href} className="font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 hover:text-primary transition-colors">
                    {f.cta} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-8 max-w-3xl">
              Prices in AUD. Workshop price is per seat and charged at checkout
              as {WORKSHOP_PRICE.inclGst} including GST. Dev day and 1:1 block
              are quoted ex GST. Travel inside South East Queensland is
              included.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="section-tag mb-4">[005] WHO IT'S FOR</div>
            <h2 className="text-3xl md:text-4xl leading-[0.95] tracking-tighter mb-12 max-w-3xl">
              BUSINESSES UNDER 50 PEOPLE WITH TOO MUCH MANUAL WORK.
            </h2>
            <div className="divide-y divide-border border-y border-border">
              {whoFor.map((w) => (
                <div key={w.industry} className="grid md:grid-cols-12 gap-4 py-6">
                  <div className="md:col-span-4 font-bold text-lg tracking-tight">{w.industry}</div>
                  <div className="md:col-span-8 text-muted-foreground leading-relaxed">{w.line}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 border-t border-border bg-card">
          <div className="container">
            <div className="section-tag mb-4">[006] QUESTIONS</div>
            <h2 className="text-3xl md:text-4xl leading-[0.95] tracking-tighter mb-12 max-w-3xl">
              WHAT PEOPLE ASK BEFORE THEY BOOK.
            </h2>
            <div className="max-w-3xl divide-y divide-border border-y border-border">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-bold text-lg tracking-tight mb-2">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag mb-4">[007] NEXT STEP</div>
              <h2 className="text-3xl md:text-5xl leading-[0.95] tracking-tighter mb-8">
                BRING ONE JOB THAT KEEPS COMING BACK.
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link href="/workshops" className="brutalist-button inline-flex items-center gap-2">
                  Reserve a workshop seat <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/coaching"
                  className="brutalist-card bg-background hover:bg-foreground hover:text-background transition-colors px-6 py-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold"
                >
                  Book a team dev day
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
