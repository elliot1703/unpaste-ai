import { ArrowRight, Calendar, Clock, Video, CheckCircle2, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const benefits = [
  "Review your current operations and pain points",
  "Identify your biggest automation opportunities",
  "Get a clear roadmap for implementation",
  "No sales pressure - just honest advice",
];

const meetingDetails = [
  { icon: Clock, label: "Duration", value: "30 minutes" },
  { icon: Video, label: "Format", value: "Video call (Zoom/Meet)" },
  { icon: Calendar, label: "Availability", value: "Mon-Fri, 9am-5pm AEST" },
];

export default function Book() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        title="Book a Consultation"
        description="Schedule a free 30-minute consultation with unpaste.ai. Discover how AI automation can transform your business operations."
        url="https://unpaste.ai/book"
      />

      {/* Fixed Grid Background */}
      <div className="grid-background" />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 bg-primary" />
              <span className="font-mono text-sm font-bold tracking-tight">UNPASTE</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/solutions"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Solutions
              </Link>
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/book"
                className="font-mono text-xs uppercase tracking-wider text-foreground font-bold"
              >
                Book Call
              </Link>
            </div>

            <Link
              href="/"
              className="hidden md:block font-mono text-xs font-bold uppercase tracking-wider bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
            >
              Take Assessment
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 border border-border hover:border-foreground transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l-2 border-foreground z-50 md:hidden"
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
                  <span className="font-mono text-sm font-bold tracking-wider">[MENU]</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Links */}
                <div className="p-6">
                  <nav className="space-y-0">
                    {[
                      { href: "/", label: "HOME", active: false },
                      { href: "/solutions", label: "SOLUTIONS", active: false },
                      { href: "/about", label: "ABOUT", active: false },
                      { href: "/book", label: "BOOK CALL", active: true },
                    ].map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-4 border-b border-border font-mono text-lg tracking-wider transition-colors ${
                            item.active
                              ? "text-primary font-bold"
                              : "text-foreground hover:text-primary"
                          }`}
                        >
                          <span className="text-muted-foreground mr-3">[0{i + 1}]</span>
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 bg-foreground text-background font-mono text-sm font-bold uppercase tracking-wider text-center hover:bg-primary transition-colors"
                    >
                      Take Assessment
                      <ArrowRight className="inline-block ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-border"
                  >
                    <div className="font-mono text-xs text-muted-foreground space-y-2">
                      <div>HELLO@UNPASTE.AI</div>
                      <div>BRISBANE, AUSTRALIA</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-tag mb-6"
              >
                [FREE CONSULTATION]
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6"
              >
                LET'S TALK{" "}
                <span className="text-primary">AUTOMATION.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm text-muted-foreground leading-relaxed"
              >
                Book a free 30-minute consultation. We'll review your operations,
                identify opportunities, and show you what's possible.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left Column - Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* What to Expect */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-bold text-lg mb-6 tracking-tight">WHAT TO EXPECT</h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-mono text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meeting Details */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-bold text-lg mb-6 tracking-tight">MEETING DETAILS</h2>
                  <div className="space-y-4">
                    {meetingDetails.map((detail, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 border border-border flex items-center justify-center flex-shrink-0">
                          <detail.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="mono-label">{detail.label}</div>
                          <div className="font-mono text-sm">{detail.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternative Contact */}
                <div className="bg-foreground text-background p-6 md:p-8">
                  <h2 className="font-bold text-lg mb-4 tracking-tight">PREFER EMAIL?</h2>
                  <p className="font-mono text-sm text-background/70 mb-4">
                    Not ready for a call? Send us a message and we'll get back to you within 24 hours.
                  </p>
                  <a
                    href="mailto:hello@unpaste.ai"
                    className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                  >
                    hello@unpaste.ai
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column - Calendly Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-3"
              >
                <div className="bg-card border border-border overflow-hidden">
                  <div className="p-4 border-b border-border bg-background">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        Select a Time
                      </span>
                    </div>
                  </div>

                  {/* Calendly Inline Widget */}
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/unpaste-ai/consultation?hide_gdpr_banner=1&primary_color=dc2626"
                    style={{ minWidth: "320px", height: "700px" }}
                  />

                  {/* Fallback/Placeholder */}
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 border-y border-border bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50+", label: "Businesses Helped" },
                { value: "100%", label: "Free Consultation" },
                { value: "30min", label: "Your Time Investment" },
                { value: "24hrs", label: "Response Time" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="mono-label mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-background">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-primary" />
                <span className="font-bold text-foreground">UNPASTE.AI</span>
              </div>
              <div className="flex gap-6">
                <Link href="/" className="hover:text-foreground transition-colors">
                  HOME
                </Link>
                <Link href="/solutions" className="hover:text-foreground transition-colors">
                  SOLUTIONS
                </Link>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  ABOUT
                </Link>
                <Link href="/book" className="hover:text-foreground transition-colors">
                  BOOK
                </Link>
              </div>
              <div>&copy; {new Date().getFullYear()} UNPASTE.AI</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
