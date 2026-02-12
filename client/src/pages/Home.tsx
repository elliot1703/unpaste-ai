import { ArrowRight, Clock, Globe, Megaphone, Search, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Assessment } from "@/components/Assessment";
import { RoiCalculator } from "@/components/RoiCalculator";
import { AgentsSection } from "@/components/AgentsSection";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Animated counter for stats
  const [count, setCount] = useState({ questions: 0, minutes: 0, cost: 0, scale: "—" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount({ questions: 15, minutes: 5, cost: 0, scale: "∞" });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      num: "01",
      title: "Smart Websites",
      description: "AI-native sites with built-in intelligence — assessments, chat, lead capture, dynamic content. Not brochures that are outdated on launch day.",
      icon: Globe,
    },
    {
      num: "02",
      title: "Marketing & Content",
      description: "Brand strategy, social media, email sequences, ad creative, SEO, video briefs. Everything your business needs to be found and remembered.",
      icon: Megaphone,
    },
    {
      num: "03",
      title: "Strategy & Audits",
      description: "Where every engagement starts. Assessment, workshops, brand guidelines, personas, competitor analysis. Understand before you build.",
      icon: Search,
    },
    {
      num: "04",
      title: "Automation",
      description: "AI agents, workflow automation, tool connectors. Connect your scattered systems so information flows without copy-paste.",
      icon: Zap,
    },
  ];

  const proofPoints = [
    {
      question: "How many hours do you lose to manual data entry each week?",
      insight: "Most Brisbane SMBs we assess spend 8-15 hours weekly on copy-paste work between tools that should be connected.",
      cta: "Find your number",
    },
    {
      question: "What's your customer response time costing you?",
      insight: "Businesses responding within 1 hour are 7x more likely to qualify leads than those responding after 2+ hours.",
      cta: "Check your speed",
    },
    {
      question: "Are your tools actually talking to each other?",
      insight: "The average SMB uses 5-8 software tools daily. If they're not integrated, you're the integration — and that's expensive.",
      cta: "Take the assessment",
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

  // Words to cycle through in hero — each split into two lines
  const heroWords = [
    { top: "COPY-", bottom: "PASTING." },
    { top: "MANUAL", bottom: "WORK." },
    { top: "BUSY-", bottom: "WORK." },
    { top: "WASTING", bottom: "TIME." },
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO />

      {/* Fixed Grid Background */}
      <div className="grid-background" />

      {/* Content wrapper - sits above grid */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation onAssessmentOpen={() => setIsAssessmentOpen(true)} />

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating gradient orbs */}
            <motion.div
              className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-[5%] w-96 h-96 bg-primary/3 rounded-full blur-3xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            {/* Animated lines */}
            <motion.div
              className="absolute top-40 left-[20%] w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 100, 200],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute top-60 right-[30%] w-px h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 80, 160],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
            />
          </div>

          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div>
                {/* Section Tag with typing animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="section-tag mb-8 flex items-center gap-2"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block w-2 h-2 bg-primary"
                  />
                  [001] FREE EFFICIENCY AUDIT
                </motion.div>

                {/* Main Headline with staggered letter animation */}
                <div className="mb-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="block"
                    >
                      STOP
                    </motion.span>
                    <div className="relative h-[1.1em] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentWordIndex}
                          initial={{ opacity: 0, y: 50, rotateX: -90 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          exit={{ opacity: 0, y: -50, rotateX: 90 }}
                          transition={{ duration: 0.5 }}
                          className="block text-primary"
                        >
                          {heroWords[currentWordIndex].top}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="relative h-[1.1em] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentWordIndex}
                          initial={{ opacity: 0, y: 50, rotateX: -90 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          exit={{ opacity: 0, y: -50, rotateX: 90 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="block"
                        >
                          {heroWords[currentWordIndex].bottom}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>

                {/* Subheadline with reveal animation */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-mono text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed"
                >
                  Discover your biggest operational bottleneck in 5 minutes.
                  See exactly where your business is bleeding time — and what to fix first.
                </motion.p>

                {/* CTA with hover effects */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <motion.button
                    onClick={() => setIsAssessmentOpen(true)}
                    className="brutalist-button inline-flex items-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take Free Assessment
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.button>
                  <motion.span
                    className="font-mono text-xs text-muted-foreground pt-5 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="inline-flex gap-1">
                      {["5 MIN", "15 QUESTIONS", "INSTANT"].map((text, i) => (
                        <motion.span
                          key={text}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + i * 0.1 }}
                        >
                          {text}{i < 2 && " · "}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>
                </motion.div>
              </div>

              {/* Stats Grid with staggered entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="stats-grid grid-cols-2 relative"
              >
                {[
                  { value: count.questions, label: "QUESTIONS" },
                  { value: count.minutes, label: "MINUTES" },
                  { value: `$${count.cost}`, label: "COST TO START" },
                  { value: count.scale, label: "SCALABILITY" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    className="p-6 md:p-8 group hover:bg-primary/5 transition-colors duration-300"
                  >
                    <motion.div
                      className="display-number"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="mono-label mt-2 group-hover:text-primary transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
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
                  {["SMART WEBSITES", "MARKETING", "CONTENT", "SEO", "AUTOMATION", "AI AGENTS", "BRAND STRATEGY", "BRISBANE BASED"].map((text, j) => (
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

        {/* Agents Section */}
        <AgentsSection />

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-card border-y border-border">
          <div className="container">
            <div className="mb-16">
              <div className="section-tag mb-4">[005] WHAT WE BUILD</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                WEBSITES. MARKETING.{" "}
                <span className="text-primary">AUTOMATION.</span>
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

        {/* Proof Points Section */}
        <section id="results" className="py-24 md:py-32 bg-foreground text-background">
          <div className="container">
            <div className="mb-16">
              <div className="font-mono text-xs text-primary tracking-widest mb-4">[007] THE REAL QUESTIONS</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                HOW MUCH TIME ARE YOU{" "}
                <span className="text-primary">ACTUALLY</span> LOSING?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-background/20">
              {proofPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-foreground p-8 md:p-10 flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-background mb-4 leading-tight">
                      {point.question}
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-background/70 mb-8">
                      {point.insight}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-background/10">
                    <button
                      onClick={() => setIsAssessmentOpen(true)}
                      className="font-mono text-sm font-bold text-primary hover:text-background transition-colors uppercase tracking-wider"
                    >
                      {point.cta} →
                    </button>
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
        <Footer />
      </div>

      {/* Assessment Modal */}
      <Assessment open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
    </div>
  );
}
