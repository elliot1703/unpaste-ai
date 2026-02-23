import { ArrowRight, Building2, Hammer, HeartPulse, Palette, ShoppingBag, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const industries = [
  {
    id: "real-estate",
    icon: Building2,
    industry: "REAL ESTATE",
    problem: "Leads fall through the cracks",
    description:
      "Agents spend hours responding to enquiries manually. Response times stretch to 6+ hours. By then, the buyer has already called someone else.",
    solutions: [
      "AI-powered instant lead qualification and response",
      "Automated property matching based on buyer criteria",
      "Viewing scheduling without the back-and-forth",
    ],
    tags: ["AI Assistants", "Lead Management", "Scheduling"],
  },
  {
    id: "professional-services",
    icon: Calculator,
    industry: "PROFESSIONAL SERVICES",
    problem: "Onboarding buries your team",
    description:
      "Client onboarding means chasing documents, re-entering data, and running compliance checks by hand. Every new client costs dozens of hours before billable work starts.",
    solutions: [
      "Smart document collection with automated reminders",
      "OCR data extraction — no manual entry",
      "Compliance validation that runs itself",
    ],
    tags: ["Workflow Automation", "Document Processing", "Compliance"],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    industry: "E-COMMERCE",
    problem: "Customers wait, then leave",
    description:
      "Small teams can't answer every question at 10pm on a Sunday. Unanswered enquiries become abandoned carts, negative reviews, and lost repeat business.",
    solutions: [
      "24/7 AI customer service for orders, returns, and product questions",
      "Smart escalation — humans only when actually needed",
      "Consistent, on-brand responses every time",
    ],
    tags: ["AI Assistants", "Customer Service", "E-commerce"],
  },
  {
    id: "construction",
    icon: Hammer,
    industry: "CONSTRUCTION & TRADES",
    problem: "Quoting takes days, updates get lost",
    description:
      "Creating quotes takes 2-3 days. Project updates are scattered across emails, texts, and spreadsheets. Clients keep calling asking 'what's happening?'",
    solutions: [
      "Faster quote generation from specs and site details",
      "Centralised project dashboard with automatic client updates",
      "One place for everything — no more chasing texts",
    ],
    tags: ["Process Design", "Client Portal", "Project Management"],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    industry: "HEALTHCARE",
    problem: "No-shows and phone tag",
    description:
      "Reception spends hours on bookings and reminder calls. No-show rates hit 15-20%, costing thousands weekly. Follow-up care instructions get lost.",
    solutions: [
      "Online booking with AI-powered reminder sequences",
      "Automated follow-up care instructions",
      "Less phone time, more patient time",
    ],
    tags: ["Scheduling", "Patient Communication", "Healthcare"],
  },
  {
    id: "creative",
    icon: Palette,
    industry: "CREATIVE & AGENCIES",
    problem: "Managing projects eats creative time",
    description:
      "The creative director works 60-hour weeks managing timelines, not doing creative work. Client feedback is scattered, deadlines slip, and scope creep is constant.",
    solutions: [
      "Automated project pipelines with built-in deadlines",
      "Client portals for centralised feedback collection",
      "Smart notifications so nothing falls through",
    ],
    tags: ["Process Design", "Client Portal", "Project Management"],
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Solutions | unpaste.ai"
        description="See the problems we solve for Brisbane businesses — from lead response and client onboarding to quoting, scheduling, and customer service automation."
        url="https://unpaste.ai/solutions"
      />

      <div className="grid-background" />

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-tag mb-6"
            >
              [SOLUTIONS]
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8 max-w-4xl"
            >
              PROBLEMS WE{" "}
              <span className="text-primary">SOLVE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
            >
              Every business runs differently, but the time-wasters are surprisingly similar.
              Here's what we fix — industry by industry.
            </motion.p>
          </div>
        </section>

        {/* Industry Cards */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">
              {industries.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border border-border bg-card hover:shadow-[6px_6px_0_0_var(--foreground)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex items-start justify-between mb-4">
                      <span className="mono-label">{item.industry}</span>
                      <div className="h-10 w-10 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {item.problem}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <h4 className="mono-label text-primary mb-2">THE PROBLEM</h4>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="mono-label text-primary mb-2">WHAT WE BUILD</h4>
                      <ul className="space-y-2">
                        {item.solutions.map((solution) => (
                          <li key={solution} className="flex items-start gap-3">
                            <span className="h-1.5 w-1.5 bg-primary mt-2 shrink-0" />
                            <span className="font-mono text-sm text-muted-foreground leading-relaxed">
                              {solution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-background border border-border font-mono text-[10px] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Don't see your industry */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-border bg-card p-8 md:p-12 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                DON'T SEE YOUR INDUSTRY?
              </h3>
              <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                The problems above aren't industry-specific — they're business-specific.
                If you're copying data between tools, chasing follow-ups, or answering the same
                questions repeatedly, we can help.
              </p>
              <Link
                href="/book"
                className="brutalist-button inline-flex items-center gap-3"
              >
                Book a Free Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest mb-6"
            >
              [START HERE]
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto mb-8"
            >
              FIND OUT WHERE YOUR{" "}
              <span className="text-primary">TIME IS GOING.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-mono text-sm text-background/70 max-w-md mx-auto mb-10"
            >
              Take our free 5-minute assessment. Get your Efficiency Score and a clear
              picture of what to fix first.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-3 bg-primary text-background font-mono text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary/90 transition-colors"
              >
                Take Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 border border-background/30 text-background font-mono text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-background/10 transition-colors"
              >
                Book a Call Instead
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
