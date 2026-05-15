import { ArrowRight, Calendar, User, Users, CheckCircle2, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
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

interface TrainingFormat {
  tag: string;
  name: string;
  icon: typeof User;
  duration: string;
  format: string;
  bestFor: string;
  outcomes: string[];
  highlighted?: boolean;
}

const formats: TrainingFormat[] = [
  {
    tag: "[001]",
    name: "1-ON-1 DAY SESSION",
    icon: User,
    duration: "Full day (6 hours)",
    format: "In-person or remote",
    bestFor: "Founders, executives, and individual operators who want to skip months of YouTube tutorials and get fluent fast.",
    outcomes: [
      "Hands-on with the AI tools relevant to your work",
      "Custom prompts and workflows built for your daily tasks",
      "A personalised AI playbook you keep after the session",
      "Direct answers to your real questions, no generic theory",
    ],
  },
  {
    tag: "[002]",
    name: "TEAM SESSION",
    icon: Users,
    duration: "2 hours",
    format: "On-site at your office",
    bestFor: "Teams of 5–25 who need to get on the same page about AI — what to use, when to use it, and how to use it well.",
    outcomes: [
      "Live demos tailored to your team's industry",
      "Practical exercises everyone walks through together",
      "Q&A on the tools and use cases your team is curious about",
      "A shared baseline so your team stops guessing about AI",
    ],
    highlighted: true,
  },
];

const audience = [
  {
    icon: MapPin,
    label: "SMBs & SMEs",
    description: "Small and medium businesses that want practical AI literacy, not vendor pitches.",
  },
  {
    icon: Users,
    label: "Professional services",
    description: "Law firms, accountants, agencies, and consultants whose work is being reshaped by AI.",
  },
  {
    icon: User,
    label: "Founders & operators",
    description: "Individual leaders who want to get genuinely fluent with the tools, not just hear about them.",
  },
];

export default function Training() {
  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="In-Person AI Training"
        description="Hands-on AI training for individuals and teams. 1-on-1 day sessions and on-site team workshops to get you and your people genuinely productive with AI."
        url="https://unpaste.ai/training"
      />

      <Navigation />

      <div className="grid-background" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-tag mb-6"
              >
                [IN-PERSON AI TRAINING]
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6"
              >
                GET YOUR TEAM{" "}
                <span className="text-primary">PRODUCTIVE WITH AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8"
              >
                Hands-on AI workshops for individuals and teams. Skip the theory, the
                hype, and the YouTube rabbit hole &mdash; learn the tools that are
                actually reshaping work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="#book"
                  className="brutalist-button inline-flex items-center gap-2"
                >
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Two-Format Cards */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[TWO FORMATS]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                Choose the session{" "}
                <span className="text-primary">that fits.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {formats.map((format, i) => {
                const Icon = format.icon;
                return (
                  <motion.div
                    key={format.tag}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`brutalist-card flex flex-col ${
                      format.highlighted ? "bg-foreground text-background" : "bg-card"
                    }`}
                  >
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className={`mono-label ${
                            format.highlighted ? "text-background/60" : ""
                          }`}
                        >
                          {format.tag}
                        </span>
                        <Icon
                          className={`h-5 w-5 ${
                            format.highlighted ? "text-primary" : "text-primary"
                          }`}
                        />
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                        {format.name}
                      </h3>

                      <div className="space-y-2 mb-6 pb-6 border-b border-border/40">
                        <div className="flex items-center gap-2">
                          <Clock
                            className={`h-3.5 w-3.5 ${
                              format.highlighted ? "text-background/60" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`font-mono text-xs uppercase tracking-wider ${
                              format.highlighted ? "text-background/80" : "text-muted-foreground"
                            }`}
                          >
                            {format.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            className={`h-3.5 w-3.5 ${
                              format.highlighted ? "text-background/60" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`font-mono text-xs uppercase tracking-wider ${
                              format.highlighted ? "text-background/80" : "text-muted-foreground"
                            }`}
                          >
                            {format.format}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`font-mono text-sm leading-relaxed mb-6 ${
                          format.highlighted ? "text-background/80" : "text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`block mono-label mb-2 ${
                            format.highlighted ? "text-background/60" : ""
                          }`}
                        >
                          Best for
                        </span>
                        {format.bestFor}
                      </p>

                      <div className="mt-auto">
                        <span
                          className={`block mono-label mb-3 ${
                            format.highlighted ? "text-background/60" : ""
                          }`}
                        >
                          What you get
                        </span>
                        <ul className="space-y-3">
                          {format.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2
                                className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                  format.highlighted ? "text-primary" : "text-primary"
                                }`}
                              />
                              <span
                                className={`font-mono text-sm leading-relaxed ${
                                  format.highlighted ? "text-background/90" : "text-foreground"
                                }`}
                              >
                                {outcome}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Strip */}
        <section className="py-12 md:py-16 border-y border-border bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="section-tag mb-4">[PRICING]</div>
              <div className="font-mono text-2xl md:text-4xl font-bold tracking-tight mb-3">
                FROM <span className="text-primary">$500</span>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                Final scope and pricing discussed on the call. Travel costs for
                on-site team sessions are billed at cost.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[WHO IT'S FOR]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter">
                Built for the people{" "}
                <span className="text-primary">doing the work.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {audience.map((item, i) => {
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

        {/* Booking Section with Calendly Embed */}
        <section id="book" className="py-16 md:py-24 border-t border-border bg-card scroll-mt-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="section-tag mb-4">[NEXT STEP]</div>
              <h2 className="text-3xl md:text-4xl tracking-tighter mb-4">
                Book a discovery call.
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                15&ndash;30 minutes to scope the right format, dates, and pricing for
                your situation. No commitment.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-background border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Select a Time
                    </span>
                  </div>
                </div>

                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/unpaste-ai/consultation?hide_gdpr_banner=1&primary_color=dc2626"
                  style={{ minWidth: "320px", height: "700px" }}
                />

                <noscript>
                  <div className="p-8 text-center">
                    <p className="font-mono text-sm text-muted-foreground mb-4">
                      Please enable JavaScript to use the booking calendar.
                    </p>
                    <a
                      href="https://calendly.com/unpaste-ai/consultation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutalist-button inline-flex items-center gap-2"
                    >
                      Book via Calendly
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </noscript>
              </div>

              <div className="mt-6 text-center">
                <p className="font-mono text-xs text-muted-foreground">
                  Prefer email?{" "}
                  <a
                    href="mailto:hello@unpaste.ai?subject=AI%20Training%20Enquiry"
                    className="text-primary hover:underline"
                  >
                    hello@unpaste.ai
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
