import { ArrowRight, Clock, Compass, GraduationCap, Users } from "lucide-react";
import { OFFERS, WORKSHOP_WHEN } from "@/lib/offers";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoiCalculator } from "@/components/RoiCalculator";
import { AgentsSection } from "@/components/AgentsSection";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {

  // The three current offers. Facts come from offers.ts so the workshop date stays in sync;
  // prices stay off this page, as on the offer pages (shown after the short form).
  const services = [
    {
      num: "01",
      title: "AI Workshop",
      description: `${WORKSHOP_WHEN}. 4.5 hours, Brisbane, small group. ${OFFERS.workshop.lede}`,
      icon: Users,
      href: OFFERS.workshop.path,
    },
    {
      num: "02",
      title: "1:1 Setup Day",
      description: `${OFFERS["one-on-one"].subhead} One day in your office, built together, and you keep everything.`,
      icon: Compass,
      href: OFFERS["one-on-one"].path,
    },
    {
      num: "03",
      title: "Team AI Training",
      description: `Up to 12 people. ${OFFERS.team.lede}`,
      icon: GraduationCap,
      href: OFFERS.team.path,
    },
  ];

  // Words to cycle through in hero — lead word + two lines. Three STOPs and
  // one START, in that order: the subtraction story sets up a single
  // capability beat, deliberately not more (2026-08 positioning dial).
  const heroWords = [
    { lead: "STOP", top: "COPY-", bottom: "PASTING." },
    { lead: "STOP", top: "BUSY-", bottom: "WORK." },
    { lead: "STOP", top: "WASTING", bottom: "TIME." },
    { lead: "START", top: "BIGGER", bottom: "WORK." },
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
        <Navigation />

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
            <div>
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
                  [001] AI WORKSHOPS · 1:1 SETUP DAYS · TEAM TRAINING
                </motion.div>

                {/* Main Headline with staggered letter animation */}
                <div className="mb-10">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter"
                  >
                    {/* Keyed by the word itself, so it only animates on the
                        STOP -> START flip, not every tick. */}
                    <div className="relative h-[1.1em] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroWords[currentWordIndex].lead}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                          className="block"
                        >
                          {heroWords[currentWordIndex].lead}
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
                  </motion.h1>
                </div>

                {/* Subheadline with reveal animation */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-mono text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed"
                >
                  Hands-on AI workshops in Brisbane, plus 1:1 setup days and
                  team training in your office. Automating the busy-work is step
                  one, then you build things you couldn't before. Either way, you
                  own the system.
                </motion.p>

                {/* CTA with hover effects */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <motion.a
                    href="/workshops"
                    className="brutalist-button inline-flex items-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    See the workshop
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-6 border-y border-border bg-background">
          <div className="marquee-container">
            <div className="marquee-content">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-6">
                  {["WORKSHOPS", "1:1 SETUP DAYS", "TEAM TRAINING", "CLAUDE CODE", "CODEX", "AUTOMATION", "AI AGENTS", "BRISBANE BASED"].map((text, j) => (
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
                  To remove the need for manual data transfer by connecting your tools with automation—freeing humans to do the work only humans can do.
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
              <div className="section-tag mb-4">[005] WHAT WE DO</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                LEARN IT.{" "}
                <span className="text-primary">OR BUILD IT WITH US.</span>
              </h2>
            </div>

            <div className="stats-grid md:grid-cols-3">
              {services.map((service, i) => (
                <motion.a
                  key={i}
                  href={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 group block"
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
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                    See it <ArrowRight className="h-3 w-3" />
                  </span>
                </motion.a>
              ))}
            </div>
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
              [006] GET STARTED
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto mb-10"
            >
              READY FOR <span className="text-primary">MORE</span> THAN YOUR
              TIME BACK?
            </motion.h2>
            {/* The same three offers as the cards above, by the same names. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {services.map((service, i) => (
                <a
                  key={service.href}
                  href={service.href}
                  className={`${i === 0 ? "brutalist-button" : "brutalist-button-outline"} inline-flex items-center justify-center gap-3 w-full max-w-xs sm:w-auto`}
                >
                  {service.title}
                  <ArrowRight className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
