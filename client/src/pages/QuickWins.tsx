import {
  ArrowRight,
  Building2,
  Home,
  Banknote,
  TrendingUp,
  Wrench,
  Truck,
  Clock,
  Lightbulb,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface Win {
  number: string;
  title: string;
  what: string;
  saved: string;
  tool: string;
  prompt: string;
  tip: string;
}

interface Industry {
  id: string;
  label: string;
  icon: typeof Building2;
  blurb: string;
  wins: Win[];
}

const industries: Industry[] = [
  {
    id: "real-estate",
    label: "Real Estate Agencies",
    icon: Home,
    blurb: "For sales agents, principals, and property managers.",
    wins: [
      {
        number: "01",
        title: "Pre-listing presentation in 30 minutes",
        what: "Suburb data + 3 recent comparables + your agency's track record → AI assembles the full pitch deck in your branded template. Agents spend 2–3 hours on these per appraisal.",
        saved: "~2.5 hrs per listing presentation",
        tool: "Claude with your slide template + agency stats in a Project",
        prompt: `Build a 6-slide listing presentation for [vendor name] at [address]:

Slide 1 — Cover (address, vendor name, today's date, your agent details)
Slide 2 — Suburb snapshot (median, days on market, recent 12-month trend)
Slide 3 — Three comparable sales (price, key features, sale date)
Slide 4 — Suggested price range with rationale
Slide 5 — Marketing plan + timeline
Slide 6 — Why [agency name] (use track record stats in the template)

Use the brand voice and slide structure from the template uploaded to this project. Don't invent numbers.

DATA: [paste suburb stats + comparables + your agency stats]`,
        tip: "Build a template doc once with your agency's track record, brand voice, and slide structure. AI fills it in every time.",
      },
      {
        number: "02",
        title: "Buyer matching from new listings",
        what: "Match every new listing against your full buyer database. AI flags which buyers should see what, with a one-line rationale per match. Skips lukewarm matches.",
        saved: "~5 hrs/week of agent time",
        tool: "Claude / ChatGPT with structured data",
        prompt: `From the buyer list and new listings below, output a table with three columns: LISTING, BUYER, WHY THIS MATCH.

Only include matches where bedrooms, suburb, and price band all align. Skip lukewarm matches.

BUYERS: [paste CSV]
LISTINGS: [paste CSV]`,
        tip: "Update buyer preferences quarterly. Out-of-date data ruins the matching quality more than anything else.",
      },
      {
        number: "03",
        title: "Weekly market briefs for past clients",
        what: "Personalised weekly market update sent to every past client based on their suburb, price range, and life-stage. Keeps you top-of-mind for the next referral.",
        saved: "~3 hrs/week",
        tool: "Claude (with Perplexity for current data)",
        prompt: `Draft a 150-word market update email for [client name], who bought a [bedrooms] home in [suburb] in [year]. Cover:

- One recent sale nearby (price + brief context)
- One market trend relevant to their property type
- A single line on what it means for them (no pressure)

End with: "Let me know if you'd like a current appraisal."`,
        tip: "Keep a 'client preferences' doc in your workspace so AI always has the context.",
      },
      {
        number: "04",
        title: "Vendor open-home recap reports",
        what: "After every open home, AI drafts a recap for the vendor from your voice notes — attendees, feedback themes, suggested next step.",
        saved: "~15 min per open home",
        tool: "Claude with voice-to-text (or ChatGPT)",
        prompt: `Below are my voice notes from today's open home at [address]. Draft a 200-word recap for the vendor covering:

- Number of attendees + buyer profile
- 2–3 feedback themes
- One recommendation for the next campaign step

Tone: honest, professional, brief.

NOTES: [paste]`,
        tip: "Record voice notes in the car right after the open. AI handles the cleanup.",
      },
      {
        number: "05",
        title: "Email triage on inbound enquiries",
        what: "AI reads every 'I saw this listing' email and drafts a personalised reply with viewing times and a buyer-qualification question. Drafts only — you press send.",
        saved: "4–6 hrs/week across the team",
        tool: "Claude + Gmail OR ChatGPT",
        prompt: `For each enquiry email below, draft a reply that:

- Thanks them by name
- Suggests the next 2 open-home times for that property
- Asks one qualification question (finance pre-approval / timeline / current living situation)
- Sounds like a human agent, not a template

Sign off as [your name], [agency name].

ENQUIRIES: [paste batch]`,
        tip: "Never auto-send. Drafts only. A bad reply costs more than the time saved.",
      },
    ],
  },
  {
    id: "mortgage-broker",
    label: "Mortgage Brokers",
    icon: Banknote,
    blurb: "For sole brokers and small broker offices.",
    wins: [
      {
        number: "01",
        title: "Compliance doc auto-drafting",
        what: "Your fact-find, NCCP docs, and credit guides drafted from client info using your firm's house templates. Frees up the most expensive hours in your week.",
        saved: "~2 hrs per application",
        tool: "Claude with your templates uploaded as project knowledge",
        prompt: `Using the templates uploaded to this project, draft a first-pass [Fact Find / NCCP statement / Credit Guide] for the following client. Flag anywhere I need to add detail manually.

CLIENT INFO: [paste]`,
        tip: "Always review against your compliance manual. Never skip the QA pass — your licence is on the line.",
      },
      {
        number: "02",
        title: "Pre-approval document screening",
        what: "Client uploads docs. AI checks completeness against a per-lender checklist, flags what's missing, and drafts the 'still need these' email.",
        saved: "~30 min per file",
        tool: "Claude with vision (PDF reading)",
        prompt: `Review the attached client documents against the [lender name] checklist in this project. Output:

1. What's present and good
2. What's missing
3. What's there but needs clarification
4. A polite email to the client requesting the missing items

DOCS: [attach PDFs]`,
        tip: "Build a 'lender checklists' workspace doc — one per major lender. Updates quarterly.",
      },
      {
        number: "03",
        title: "Personalised lender shortlist per client",
        what: "Given a borrower profile + property, AI ranks 3 lenders from your panel with rationale (rate, policy, turnaround). Replaces 45 minutes of mental cross-referencing.",
        saved: "~45 min per client",
        tool: "Claude / ChatGPT",
        prompt: `Given the borrower profile below and the lender preferences doc in this project, rank the top 3 lenders for this scenario. For each:

- Why they're a fit
- Current best-fit product + rate range
- Expected approval turnaround
- One risk or watch-out

BORROWER: [paste]
PROPERTY: [paste]`,
        tip: "Maintain a 'lender preferences' doc covering your panel — current policies, niches, turnaround speeds.",
      },
      {
        number: "04",
        title: "Weekly rate change digest for client portfolio",
        what: "AI compiles which rate changes (across your panel of lenders) affect which clients in your book, with personalised messaging suggestions per client.",
        saved: "~3 hrs/week",
        tool: "Claude + Perplexity for current rates",
        prompt: `Below is my client portfolio and this week's lender rate changes. Produce:

- A summary of which changes affect which clients
- A draft 80-word personalised note to each affected client
- A priority list of who needs a call (vs. an email)

PORTFOLIO: [paste]
RATE CHANGES: [paste / link]`,
        tip: "Run Monday morning. Schedule sends through the week so it doesn't look like a batch.",
      },
      {
        number: "05",
        title: "Client intake → borrower profile summary",
        what: "Client fills out your intake form. AI summarises the borrower into a tight one-pager with risk flags before you spend an hour on it.",
        saved: "~45 min per new client",
        tool: "Claude / ChatGPT",
        prompt: `From the intake below, produce a one-page borrower summary covering:

- Income picture (PAYG, self-employed, combined)
- Existing debts and serviceability stress points
- Property goals and timeline
- 3–5 risk flags or items needing clarification

Keep it scannable. Use bullet points.

INTAKE: [paste]`,
        tip: "Use a structured intake form (Typeform / Google Form) so the data comes in clean.",
      },
    ],
  },
  {
    id: "financial-advisor",
    label: "Financial Advisors",
    icon: TrendingUp,
    blurb: "For advisors, paraplanners, and practice managers.",
    wins: [
      {
        number: "01",
        title: "SOA first-draft generation",
        what: "Intake form + recommendations + research notes → first-draft Statement of Advice in your house style. You QA, polish, and ship. Saves the equivalent of half a paraplanner per week.",
        saved: "3–4 hrs per SOA",
        tool: "Claude with your SOA template + style guide in a Project",
        prompt: `Using the SOA template and style guide in this project, draft a first-pass SOA for the client below. Cover all required sections. Flag anywhere I need to add detail. Do NOT invent figures.

CLIENT: [paste profile + recommendations]`,
        tip: "First draft only. Human review is mandatory. AI hallucinations on financial figures = career-ending.",
      },
      {
        number: "02",
        title: "Cross-client opportunity detector",
        what: "New tax law, market event, or regulation change → AI scans your whole client book, flags exactly which clients are materially affected, and drafts a personalised 'here's what this means for you' email per client.",
        saved: "~4 hrs per major event",
        tool: "Claude with your client book + tags in workspace",
        prompt: `New event: [paste tax change / market event / regulation update]

From the client book in this project, identify:

1. Clients MATERIALLY affected (income, holdings, life stage)
2. Clients AT THE EDGE (worth a check-in but not urgent)
3. Clients NOT affected (don't email — protects your inbox credibility)

For each materially affected client, draft a 150-word personalised email covering:
- What changed (one line)
- Why it specifically matters to them
- Suggested next action (book a chat / wait and see / specific to-do)`,
        tip: "Tag your CRM export thoroughly (life stage, asset class, business owner y/n). Sharper tags = sharper targeting.",
      },
      {
        number: "03",
        title: "Compliance disclosure review on advice",
        what: "Before you send advice, AI reviews against required disclosures (BID, FDS, ROA requirements) and flags gaps with suggested wording fixes.",
        saved: "~20 min per piece of advice",
        tool: "Claude with your compliance manual uploaded",
        prompt: `Review the drafted advice below against the compliance checklist in this project. Output:

- ✓ Items present and adequate
- ⚠ Items present but light on detail
- ✗ Items missing entirely
- Suggested wording fixes

ADVICE: [paste]`,
        tip: "Keep an audit trail. Save each AI check log alongside the advice file.",
      },
      {
        number: "04",
        title: "Daily client comm digest",
        what: "AI scans your CRM activity and drafts a list of which clients need a check-in today, what type of touchpoint, and drafts the actual emails.",
        saved: "~1 hr/day",
        tool: "Claude + CRM export",
        prompt: `From the CRM activity log and client lifecycle map below, produce a daily action list:

- Which clients are overdue for a check-in
- Suggested touchpoint type for each (call / email / no contact needed)
- Drafted email for any that I should send today

LOG: [paste]`,
        tip: "Keep a 'client lifecycle map' doc — annual review cadence, life events to watch, communication preferences.",
      },
      {
        number: "05",
        title: "Portfolio review summaries",
        what: "Quarterly review data → personalised review letter draft in your house voice for each client. Same depth, fraction of the time.",
        saved: "~2 hrs per client",
        tool: "Claude with your client knowledge in a Project",
        prompt: `Draft a 400-word quarterly review letter for [client name]. Cover:

- Portfolio performance vs. their target (be specific)
- One thing that worked, one that didn't (honest)
- Recommended actions for the quarter ahead
- Sign-off in [your name]'s voice

Use the client preferences doc in this project for tone.

DATA: [paste portfolio summary]`,
        tip: "Build a 'client tone preferences' doc — formal vs warm vs technical per client.",
      },
    ],
  },
  {
    id: "trades",
    label: "Trades Businesses",
    icon: Wrench,
    blurb: "For builders, plumbers, electricians, plasterers, landscapers.",
    wins: [
      {
        number: "01",
        title: "Material take-off from plans",
        what: "Upload architectural plans (PDF or photo). AI extracts quantities — concrete cubic m, timber lineal m, fittings count — into your costing template format. Estimators charge $100/hr+ for this.",
        saved: "2–4 hrs per quote",
        tool: "Claude with vision + your costing template in a Project",
        prompt: `From the plans attached, produce a material take-off in the costing template format in this project. Include:

- Concrete (cubic m) by element (slab, footings, etc.)
- Timber (lineal m, by size)
- Steel reinforcement
- Plasterboard (sqm)
- Fittings (count by type)
- Anything else relevant to a [job type] quote

Flag anything ambiguous from the plans. DO NOT invent quantities.

PLANS: [attach]
JOB TYPE: [paste]`,
        tip: "Always spot-check 3 line items manually before pricing. Vision models can miscount — treat AI as the estimator's assistant, not the estimator.",
      },
      {
        number: "02",
        title: "Weekly job pipeline summary",
        what: "AI compiles which jobs are running, which are delayed, which need follow-up, and what's owed in invoices — into a tight Friday-afternoon brief for the owner.",
        saved: "90 min/week",
        tool: "Claude + your job spreadsheet",
        prompt: `From the job tracker below, produce a Friday brief covering:

- Jobs running on schedule (one line each)
- Jobs slipping or at risk (with reason + recommended action)
- Quotes outstanding (need follow-up)
- Cash collection — invoices owed by who
- 3 priorities for next week

TRACKER: [paste]`,
        tip: "Run Friday afternoon. You'll know your Monday before you finish your coffee.",
      },
      {
        number: "03",
        title: "End-of-job invoice + photo report",
        what: "Final invoice assembled with photo evidence and a short description from your job notes. Clients pay faster when they see the work clearly documented.",
        saved: "30 min per job",
        tool: "Claude with vision + your invoice template",
        prompt: `Assemble a final invoice + completion report for the job below:

- Itemised invoice using the template in this project
- 4–6 best photos with one-line captions
- Short summary of work completed
- Warranty notes + payment terms

JOB NOTES: [paste]
PHOTOS: [attach]`,
        tip: "Photo evidence cuts payment disputes in half. Clients pay 30%+ faster when they can see exactly what they're paying for.",
      },
      {
        number: "04",
        title: "Quote drafts from inbound enquiry",
        what: "Voicemail or email enquiry → drafted quote letter using your rate sheet and standard inclusions. You eyeball, adjust, send.",
        saved: "30–45 min per quote",
        tool: "Claude + voice-to-text (Whisper / Otter)",
        prompt: `From the enquiry below and the rate sheet in this project, draft a quote letter that includes:

- Acknowledgement of what they asked for
- Itemised line items at YOUR rates
- Standard inclusions and exclusions
- Total + GST
- Validity (30 days) and next steps

Don't invent prices. If something isn't on the rate sheet, flag it for me.

ENQUIRY: [paste]`,
        tip: "Keep your pricing rules in a workspace doc. Never let AI invent numbers.",
      },
      {
        number: "05",
        title: "Job photos → progress reports for clients",
        what: "Daily site photos + a few sentences of notes → professional weekly progress update sent to the homeowner. Stops the 'how's it going?' calls.",
        saved: "20 min per job per week",
        tool: "Claude with vision",
        prompt: `From the photos and notes below, draft a 150-word weekly progress update for the homeowner at [address]:

- What got done this week
- What's planned for next week
- Anything they need to decide or pay for
- One photo highlight to call out

Tone: friendly, clear, no jargon.

PHOTOS + NOTES: [paste / attach]`,
        tip: "Standardise the template once. Clients learn to expect Friday updates and stop the mid-week check-ins.",
      },
    ],
  },
  {
    id: "distribution",
    label: "Distribution Businesses",
    icon: Truck,
    blurb: "For wholesale, B2B distribution, and supply businesses.",
    wins: [
      {
        number: "01",
        title: "PDF order → structured order data",
        what: "Customer PDFs and emails come in formatted however they like. AI extracts the order into your system's structure (SKU, qty, ship-to).",
        saved: "5–10 min per order",
        tool: "Claude with vision (PDF reading)",
        prompt: `Extract the order from the attached document into this exact JSON structure:

{
  "customer": "",
  "po_number": "",
  "ship_to": "",
  "ship_date_requested": "",
  "lines": [{ "sku": "", "description": "", "qty": 0, "unit_price": 0 }],
  "notes": ""
}

If anything is ambiguous, flag it. Don't invent SKUs.

DOC: [attach]`,
        tip: "Build a 'common formats' workspace doc for your tricky customers — AI learns their quirks.",
      },
      {
        number: "02",
        title: "Daily stock alert summary",
        what: "Stock data → daily summary of what's low, what's overstocked, what's at risk of running out before the next shipment.",
        saved: "1 hr/day for the ops manager",
        tool: "Claude + spreadsheet",
        prompt: `From the stock data and forward orders below, produce a 7am alert covering:

- SKUs likely to stock out in the next 14 days (with date + reason)
- SKUs overstocked (>90 days of cover)
- Orders that can't be fulfilled with current stock
- One recommended action per alert

DATA: [paste]`,
        tip: "Run at 7am so it's waiting when the team opens up.",
      },
      {
        number: "03",
        title: "Returns / credit note processing",
        what: "Return reason + photos → policy check + drafted credit note + customer reply with the right tone calibrated to fault. Removes hours of admin per week from your ops team.",
        saved: "20 min per return",
        tool: "Claude with vision + your credit note template + returns policy",
        prompt: `Process the return below:

1. Determine if a credit is warranted (apply policy in this project)
2. Draft the credit note using the template
3. Draft a reply email to the customer (apologise if our fault, neutral if not)

RETURN INFO: [paste + attach photos]`,
        tip: "Tone differs by reason. 'Our fault' = warm apology. 'Their fault' = neutral and matter-of-fact.",
      },
      {
        number: "04",
        title: "Supplier follow-up sequence",
        what: "AI drafts overdue PO follow-ups, escalations, and chase emails on the cadence you define — saves the back-and-forth of figuring out who to chase and how.",
        saved: "2 hrs/week",
        tool: "Claude with your supplier escalation ladder",
        prompt: `From the overdue PO list and escalation ladder in this project, draft today's outbound emails:

- 1st follow-up (7 days overdue): polite check-in
- 2nd follow-up (14 days): firmer, escalates to their manager
- 3rd follow-up (21+ days): formal, copies their account exec

POS: [paste]`,
        tip: "Build a 'supplier escalation ladder' doc — your standard cadence per supplier tier.",
      },
      {
        number: "05",
        title: "Customer comms on delays / order status",
        what: "When orders slip, AI drafts personalised update emails per customer — tone calibrated to the relationship (formal for some, casual for others).",
        saved: "2–3 hrs/week",
        tool: "Claude with your customer relationship notes",
        prompt: `Below are orders running late and the customer relationship notes for each. Draft a personalised email per customer covering:

- New ETA (be specific)
- Why (honest, brief)
- What you're doing about it
- Any concession if warranted

Tone: match the relationship — formal for X, casual for Y.

DELAYS: [paste]`,
        tip: "Always review before sending. Customer comms are reputation — never auto-send delay emails.",
      },
    ],
  },
];

export default function QuickWins() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="5 Quick AI Wins for Your Business"
        description="Free guide. Pick your industry — real estate, mortgage broker, financial advisor, trades, or distribution. Get 5 practical AI workflows you can set up this week."
        url="https://unpaste.ai/quick-wins"
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
                [FREE GUIDE]
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6"
              >
                5 QUICK AI WINS{" "}
                <span className="text-primary">FOR YOUR BUSINESS.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
              >
                Pick your industry. Get 5 practical AI workflows with real
                prompts, time-saved estimates, and setup tips. No email
                required.
              </motion.p>

              {/* Industry chips */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
              >
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <a
                      key={industry.id}
                      href={`#${industry.id}`}
                      className="brutalist-card bg-background hover:bg-foreground hover:text-background transition-colors px-4 py-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {industry.label}
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industry Sections */}
        {industries.map((industry, idx) => {
          const Icon = industry.icon;
          const sectionBg = idx % 2 === 0 ? "bg-card" : "bg-background";
          return (
            <section
              key={industry.id}
              id={industry.id}
              className={`py-16 md:py-24 border-t border-border scroll-mt-20 ${sectionBg}`}
            >
              <div className="container">
                {/* Section header */}
                <div className="max-w-3xl mx-auto mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 border border-border flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="section-tag">
                      [{industry.label.toUpperCase()}]
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl tracking-tighter mb-3">
                    5 quick AI wins{" "}
                    <span className="text-primary">for {industry.label.toLowerCase()}.</span>
                  </h2>
                  <p className="font-mono text-sm text-muted-foreground">
                    {industry.blurb}
                  </p>
                </div>

                {/* Win cards */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  {industry.wins.map((win, i) => (
                    <motion.div
                      key={win.number}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={fadeUp}
                      className="brutalist-card bg-background overflow-hidden"
                    >
                      <div className="p-6 md:p-8">
                        {/* Header */}
                        <div className="flex items-baseline gap-4 mb-4">
                          <span className="mono-label text-primary text-base">
                            [{win.number}]
                          </span>
                          <h3 className="font-bold text-lg md:text-xl tracking-tight flex-1">
                            {win.title}
                          </h3>
                        </div>

                        {/* What it does */}
                        <p className="font-mono text-sm text-foreground leading-relaxed mb-5">
                          {win.what}
                        </p>

                        {/* Metadata strip */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-5 pb-5 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                            <div>
                              <div className="mono-label text-muted-foreground">
                                Time saved
                              </div>
                              <div className="font-mono text-sm font-bold">
                                {win.saved}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary flex-shrink-0" />
                            <div>
                              <div className="mono-label text-muted-foreground">
                                Tool
                              </div>
                              <div className="font-mono text-sm font-bold">
                                {win.tool}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Prompt */}
                        <details className="mb-5 group">
                          <summary className="cursor-pointer flex items-center justify-between gap-4 p-3 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 transition-colors">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">
                              <span className="text-primary">$</span> Starter prompt
                            </span>
                            <span className="font-mono text-primary text-base group-open:rotate-45 transition-transform">
                              +
                            </span>
                          </summary>
                          <pre className="p-4 bg-zinc-950 text-zinc-100 border-t border-zinc-800 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                            {win.prompt}
                          </pre>
                        </details>

                        {/* Tip */}
                        <div className="flex items-start gap-2 p-3 bg-card border-l-2 border-primary">
                          <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="font-mono text-xs text-muted-foreground italic leading-relaxed">
                            <span className="not-italic font-bold text-foreground mr-1">
                              Tip:
                            </span>
                            {win.tip}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Per-industry mini CTA */}
                <div className="max-w-4xl mx-auto mt-10">
                  <div className="brutalist-card bg-foreground text-background p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="mono-label text-background/60 mb-1">
                        Want these built into your business?
                      </div>
                      <div className="font-bold text-lg tracking-tight">
                        We set up the whole AI workspace for you.
                      </div>
                    </div>
                    <Link
                      href="/training"
                      className="font-mono text-xs font-bold uppercase tracking-wider bg-primary text-white px-6 py-3 hover:bg-primary/90 transition-colors inline-flex items-center gap-2 flex-shrink-0"
                    >
                      See packages
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Final CTA */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="section-tag mb-4">[NEXT STEP]</div>
              <h2 className="text-3xl md:text-5xl tracking-tighter mb-6">
                Want help making{" "}
                <span className="text-primary">it real?</span>
              </h2>
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
                Quick wins are a start. We come on-site, set up the whole AI
                workspace for your team, and keep it running. Three packages,
                from $2,400.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/training"
                  className="brutalist-button inline-flex items-center justify-center gap-2"
                >
                  See training packages
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://calendly.com/elliot-unpaste/30min?utm_source=quick_wins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-button-outline inline-flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Book a discovery call
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
