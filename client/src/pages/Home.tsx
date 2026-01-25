import { ArrowRight, ArrowUpRight, Clock, Zap, Link2, Sparkles, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Assessment } from "@/components/Assessment";
import { RoiCalculator } from "@/components/RoiCalculator";
import { AgentShowcase } from "@/components/AgentShowcase";

export default function Home() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.02], ["rgba(250, 250, 250, 0)", "rgba(250, 250, 250, 0.95)"]);
  const navBorder = useTransform(scrollYProgress, [0, 0.02], ["rgba(228, 228, 231, 0)", "rgba(228, 228, 231, 1)"]);

  // Animated counter for stats
  const [count, setCount] = useState({ hours: 0, businesses: 0, cost: 0, scale: "—" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount({ hours: 10, businesses: 5, cost: 0, scale: "∞" });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      num: "01",
      title: "AI Assistants",
      description: "Automated responses, quote generation, and customer follow-ups that work around the clock.",
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Workflow Automation",
      description: "Connect your scattered tools so information flows automatically. No more copy-paste.",
      icon: Zap,
    },
    {
      num: "03",
      title: "Process Design",
      description: "We map how your business runs, find the bottlenecks, and design workflows that work.",
      icon: Link2,
    },
    {
      num: "04",
      title: "Custom Solutions",
      description: "When off-the-shelf doesn't fit, we build exactly what you need. Bespoke automation.",
      icon: Sparkles,
    },
  ];

  const testimonials = [
    {
      quote: "We went from 36 hours of client onboarding down to just 1. The automation handles everything.",
      name: "Sarah Chen",
      title: "Operations Director",
      metric: "97%",
      metricLabel: "TIME SAVED",
    },
    {
      quote: "Response time dropped from 4 hours to 3 minutes. We close deals faster now.",
      name: "James Mitchell",
      title: "Founder, Brisbane Property Co",
      metric: "85%",
      metricLabel: "AUTO-HANDLED",
    },
    {
      quote: "I was drowning in admin. Now I leave at 5pm and the business runs smoother than ever.",
      name: "Emma Rodriguez",
      title: "Creative Director",
      metric: "25hrs",
      metricLabel: "SAVED WEEKLY",
    },
  ];

  const faqs = [
    {
      q: "WHAT IS THE EFFICIENCY SCORE?",
      a: "A 15-question assessment that scores your operations from 0-100. It identifies where you're losing time, benchmarks you against similar businesses, and highlights the processes doing the most damage to your bottom line.",
    },
    {
      q: "WHO IS THIS ASSESSMENT FOR?",
      a: "Business owners, operations managers, and team leaders who feel like they're spending too much time on repetitive tasks. If you're copying data between tools, chasing follow-ups, or working weekends to catch up—this is for you.",
    },
    {
      q: "IS THE ASSESSMENT REALLY FREE?",
      a: "Completely free. No credit card, no hidden catches. We built it to help business owners see exactly where their time is going—and to show you what's possible with automation.",
    },
    {
      q: "WHAT HAPPENS AFTER I COMPLETE IT?",
      a: "You get your Efficiency Score immediately, plus a breakdown of your biggest time-wasters. Then you can book a free 30-minute workshop where we review your results and show you a clear path forward.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Grid Background */}
      <div className="grid-background" />

      {/* Content wrapper - sits above grid */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          style={{ backgroundColor: navBg, borderColor: navBorder }}
          className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
        >
          <div className="container flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 bg-primary" />
              <span className="font-mono text-sm font-bold tracking-tight">UNPASTE</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#method" className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">Method</a>
              <a href="#results" className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">Results</a>
              <a href="#faq" className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsAssessmentOpen(true)}
                className="font-mono text-xs font-bold uppercase tracking-wider bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
              >
                Start Audit
              </button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm bg-background border-border">
                <SheetHeader>
                  <SheetTitle className="text-left font-mono text-sm font-bold">MENU</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  <a href="#services" className="font-mono text-lg uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>Services</a>
                  <a href="#method" className="font-mono text-lg uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>Method</a>
                  <a href="#results" className="font-mono text-lg uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>Results</a>
                  <a href="#faq" className="font-mono text-lg uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                  <hr className="border-border" />
                  <button
                    onClick={() => { setIsAssessmentOpen(true); setMobileMenuOpen(false); }}
                    className="brutalist-button w-full"
                  >
                    Start Audit
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div>
                {/* Section Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="section-tag mb-8"
                >
                  [001] FREE EFFICIENCY AUDIT
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter mb-10"
                >
                  STOP<br />
                  COPY-<br />
                  PASTING.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-mono text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed"
                >
                  Discover your biggest operational bottleneck in 5 minutes.
                  See where automation can give you back 10+ hours every week.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <button
                    onClick={() => setIsAssessmentOpen(true)}
                    className="brutalist-button inline-flex items-center gap-3"
                  >
                    Take Free Assessment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-xs text-muted-foreground pt-5">
                    5 MIN · 15 QUESTIONS · INSTANT
                  </span>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="stats-grid grid-cols-2"
              >
                <div className="p-6 md:p-8">
                  <div className="display-number">{count.hours}+</div>
                  <div className="mono-label mt-2">HOURS SAVED WEEKLY</div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="display-number">{count.businesses}</div>
                  <div className="mono-label mt-2">MINUTE ASSESSMENT</div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="display-number">${count.cost}</div>
                  <div className="mono-label mt-2">COST TO START</div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="display-number">{count.scale}</div>
                  <div className="mono-label mt-2">SCALABILITY</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-6 border-y border-border bg-background">
          <div className="marquee-container">
            <div className="marquee-content">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-6">
                  {["WORKFLOW AUTOMATION", "AI ASSISTANTS", "PROCESS DESIGN", "CUSTOM SOLUTIONS", "BRISBANE BASED", "SMB FOCUSED"].map((text, j) => (
                    <span key={j} className="flex items-center gap-6 font-mono text-sm uppercase tracking-wider whitespace-nowrap">
                      {text}
                      <span className="h-2 w-2 bg-primary" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="section-tag mb-4"
                >
                  [002] THE PHILOSOPHY
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl leading-tight"
                >
                  COPY-PASTE IS A SIGNAL THAT YOUR TOOLS{" "}
                  <span className="text-muted-foreground">AREN'T TALKING.</span>
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border p-8 md:p-10"
              >
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  <span className="text-foreground font-bold">UNPASTE</span> /ʌnˈpeɪst/ <span className="italic">verb</span>
                </div>
                <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                  To remove the need for manual data transfer by connecting your tools with automation—freeing humans to do higher-value work.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <RoiCalculator />

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-card border-y border-border">
          <div className="container">
            <div className="mb-16">
              <div className="section-tag mb-4">[004] WHAT WE DO</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                FOUR PILLARS OF OPERATIONAL EXCELLENCE.
              </h2>
            </div>

            <div className="stats-grid md:grid-cols-2">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 group cursor-default"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-6xl font-bold text-foreground/10">{service.num}</span>
                    <div className="h-12 w-12 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                      <service.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
                    {service.title.toUpperCase()}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Employees Section */}
        <AgentShowcase onCtaClick={() => setIsAssessmentOpen(true)} />

        {/* Method Section */}
        <section id="method" className="py-24 md:py-32 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="lg:sticky lg:top-32">
                <div className="section-tag mb-4">[006] THE METHOD</div>
                <h2 className="text-4xl md:text-5xl leading-tight mb-6">
                  FROM OVERWHELMED TO{" "}
                  <span className="text-primary">OPTIMISED.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed max-w-md">
                  Three steps to reclaim your time. No complex onboarding, no lengthy contracts.
                </p>
                <button
                  onClick={() => setIsAssessmentOpen(true)}
                  className="brutalist-button-outline inline-flex items-center gap-3"
                >
                  Start Your Assessment
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-0">
                {[
                  {
                    step: "[01]",
                    title: "TAKE THE ASSESSMENT",
                    description: "Answer 15 questions about how your business runs. Get an Efficiency Score and see exactly where time is being wasted.",
                    time: "5 MIN"
                  },
                  {
                    step: "[02]",
                    title: "BOOK YOUR WORKSHOP",
                    description: "In a free 30-minute call, we'll review your results, identify your biggest bottleneck, and show you what's possible.",
                    time: "30 MIN"
                  },
                  {
                    step: "[03]",
                    title: "GET YOUR ROADMAP",
                    description: "Leave with a clear action plan—what to automate first, what to fix, and exactly how it will transform your operations.",
                    time: "INSTANT"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="border-b border-border py-8 first:pt-0 last:border-none group"
                  >
                    <div className="flex items-start gap-6">
                      <span className="section-tag pt-1">{item.step}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <span className="mono-label flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </span>
                        </div>
                        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-24 md:py-32 bg-foreground text-background">
          <div className="container">
            <div className="mb-16">
              <div className="font-mono text-xs text-primary tracking-widest mb-4">[007] RESULTS</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                REAL OUTCOMES FROM REAL BUSINESSES.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-background/20">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-foreground p-8 md:p-10 flex flex-col"
                >
                  <div className="flex-1">
                    <p className="font-mono text-sm leading-relaxed text-background/70 mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-end justify-between pt-6 border-t border-background/10">
                    <div>
                      <div className="font-bold text-background text-sm">{testimonial.name}</div>
                      <div className="font-mono text-xs text-background/50">{testimonial.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{testimonial.metric}</div>
                      <div className="mono-label text-background/50">{testimonial.metricLabel}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 md:py-32 bg-background">
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <div className="section-tag mb-4">[008] FAQ</div>
              <h2 className="text-4xl md:text-5xl">
                COMMON QUESTIONS.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border bg-card px-6 data-[state=open]:shadow-[4px_4px_0_0_var(--primary)]"
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

        {/* Final CTA Section */}
        <section className="py-24 md:py-32 border-t border-border bg-background">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-tag mb-8"
            >
              [009] GET STARTED
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto mb-8"
            >
              READY TO GET YOUR{" "}
              <span className="text-primary">TIME</span> BACK?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-mono text-sm text-muted-foreground max-w-md mx-auto mb-10"
            >
              Take the free Efficiency Score assessment and discover where automation can transform your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsAssessmentOpen(true)}
                className="brutalist-button text-base px-10 py-5 inline-flex items-center gap-3"
              >
                Take the Free Assessment
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mono-label mt-8"
            >
              5 MINUTES · 15 QUESTIONS · INSTANT RESULTS
            </motion.p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-background">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 bg-primary" />
                  <span className="font-mono text-sm font-bold">UNPASTE</span>
                </a>
                <p className="font-mono text-xs text-muted-foreground max-w-sm leading-relaxed">
                  AI automation for Brisbane businesses who are too busy to fix how they work.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-4">Navigation</h4>
                <ul className="space-y-3 font-mono text-xs text-muted-foreground">
                  <li><a href="#services" className="hover:text-foreground transition-colors">SERVICES</a></li>
                  <li><a href="#method" className="hover:text-foreground transition-colors">METHOD</a></li>
                  <li><a href="#results" className="hover:text-foreground transition-colors">RESULTS</a></li>
                  <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-3 font-mono text-xs text-muted-foreground">
                  <li>
                    <a href="mailto:hello@unpaste.ai" className="hover:text-foreground transition-colors flex items-center gap-1">
                      HELLO@UNPASTE.AI
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                  <li>BRISBANE, AUSTRALIA</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border font-mono text-xs text-muted-foreground">
              <div>&copy; {new Date().getFullYear()} UNPASTE.AI. ALL RIGHTS RESERVED.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">PRIVACY</a>
                <a href="#" className="hover:text-foreground transition-colors">TERMS</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Assessment Modal */}
      <Assessment open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
    </div>
  );
}
