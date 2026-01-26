import { ArrowRight, ArrowUpRight, Clock, TrendingUp, Users, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

const caseStudies = [
  {
    id: "property-management",
    industry: "REAL ESTATE",
    title: "Brisbane Property Co.",
    subtitle: "Lead Response Automation",
    challenge:
      "Agents were spending 4+ hours daily responding to property enquiries manually. Leads were falling through the cracks, and response times averaged 6 hours.",
    solution:
      "Implemented AI-powered lead qualification and instant response system. Automated property matching and viewing scheduling.",
    results: [
      { metric: "3 min", label: "Response Time", prev: "6 hours" },
      { metric: "85%", label: "Auto-handled", prev: "0%" },
      { metric: "42%", label: "More Conversions", prev: "baseline" },
    ],
    tags: ["AI Assistants", "Lead Management", "Scheduling"],
    image: "/images/case-study-property.jpg",
    color: "bg-blue-500/10",
  },
  {
    id: "accounting-firm",
    industry: "PROFESSIONAL SERVICES",
    title: "Meridian Accounting",
    subtitle: "Client Onboarding Automation",
    challenge:
      "Client onboarding took 36 hours of manual work per client. Staff were drowning in document collection, data entry, and compliance checks.",
    solution:
      "Built automated onboarding workflow with smart document collection, OCR data extraction, and compliance validation.",
    results: [
      { metric: "97%", label: "Time Saved", prev: "36 hrs → 1 hr" },
      { metric: "Zero", label: "Data Entry Errors", prev: "12% error rate" },
      { metric: "3x", label: "Capacity Increase", prev: "baseline" },
    ],
    tags: ["Workflow Automation", "Document Processing", "Compliance"],
    image: "/images/case-study-accounting.jpg",
    color: "bg-green-500/10",
  },
  {
    id: "ecommerce-brand",
    industry: "E-COMMERCE",
    title: "Coastal Threads",
    subtitle: "Customer Service AI",
    challenge:
      "Small team couldn't keep up with customer enquiries. Weekend and after-hours questions went unanswered for days.",
    solution:
      "Deployed 24/7 AI customer service agent handling orders, returns, and product questions. Escalation to humans only when needed.",
    results: [
      { metric: "24/7", label: "Availability", prev: "9-5 only" },
      { metric: "78%", label: "Auto-resolved", prev: "0%" },
      { metric: "4.8★", label: "Customer Rating", prev: "4.1★" },
    ],
    tags: ["AI Assistants", "Customer Service", "E-commerce"],
    image: "/images/case-study-ecommerce.jpg",
    color: "bg-purple-500/10",
  },
  {
    id: "construction-company",
    industry: "CONSTRUCTION",
    title: "BuildRight QLD",
    subtitle: "Quote & Project Automation",
    challenge:
      "Creating quotes took 2-3 days. Project updates were scattered across emails, texts, and spreadsheets. Clients constantly asked for status updates.",
    solution:
      "Automated quote generation from site photos and specs. Centralized project dashboard with automatic client updates.",
    results: [
      { metric: "2 hrs", label: "Quote Time", prev: "2-3 days" },
      { metric: "90%", label: "Fewer Status Calls", prev: "baseline" },
      { metric: "$50K", label: "Monthly Capacity", prev: "+increase" },
    ],
    tags: ["Process Design", "Custom Solutions", "Client Portal"],
    image: "/images/case-study-construction.jpg",
    color: "bg-orange-500/10",
  },
  {
    id: "medical-practice",
    industry: "HEALTHCARE",
    title: "Northside Medical",
    subtitle: "Appointment & Follow-up System",
    challenge:
      "Reception staff spent hours on phone bookings and reminder calls. No-show rate was 18%, costing thousands weekly.",
    solution:
      "Implemented online booking integration with AI-powered reminder sequences and automated follow-up care instructions.",
    results: [
      { metric: "5%", label: "No-show Rate", prev: "18%" },
      { metric: "25hrs", label: "Saved Weekly", prev: "admin time" },
      { metric: "32%", label: "More Appointments", prev: "capacity" },
    ],
    tags: ["Scheduling", "Patient Communication", "Healthcare"],
    image: "/images/case-study-medical.jpg",
    color: "bg-red-500/10",
  },
  {
    id: "creative-agency",
    industry: "CREATIVE",
    title: "Pixel & Co Studio",
    subtitle: "Project Management Automation",
    challenge:
      "Creative director was working 60+ hour weeks managing projects. Client feedback was scattered, deadlines were missed.",
    solution:
      "Built automated project pipeline with client portals, feedback collection, and deadline tracking with smart notifications.",
    results: [
      { metric: "40hrs", label: "Work Week", prev: "60+ hours" },
      { metric: "Zero", label: "Missed Deadlines", prev: "2-3/month" },
      { metric: "45%", label: "More Projects", prev: "capacity" },
    ],
    tags: ["Process Design", "Client Portal", "Project Management"],
    image: "/images/case-study-creative.jpg",
    color: "bg-pink-500/10",
  },
];

const industries = [
  "All",
  "Real Estate",
  "Professional Services",
  "E-commerce",
  "Construction",
  "Healthcare",
  "Creative",
];

export default function Solutions() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Solutions Gallery"
        description="Explore real automation success stories from Brisbane businesses. See how AI and workflow automation transformed operations across industries."
        url="https://unpaste.ai/solutions"
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
                className="font-mono text-xs uppercase tracking-wider text-foreground font-bold"
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
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Book Call
              </Link>
            </div>

            <Link
              href="/book"
              className="hidden md:block font-mono text-xs font-bold uppercase tracking-wider bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
            >
              Get Started
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
                      { href: "/solutions", label: "SOLUTIONS", active: true },
                      { href: "/about", label: "ABOUT", active: false },
                      { href: "/book", label: "BOOK CALL", active: false },
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
                      href="/book"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 bg-foreground text-background font-mono text-sm font-bold uppercase tracking-wider text-center hover:bg-primary transition-colors"
                    >
                      Get Started
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
        <section className="pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-tag mb-6"
            >
              [SOLUTIONS GALLERY]
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8 max-w-4xl"
            >
              REAL RESULTS FROM{" "}
              <span className="text-primary">REAL BUSINESSES.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
            >
              Explore how Brisbane businesses transformed their operations with AI automation.
              Each case study shows the challenge, solution, and measurable outcomes.
            </motion.p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-border bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { icon: Users, value: "50+", label: "Businesses Transformed" },
                { icon: Clock, value: "10,000+", label: "Hours Saved Monthly" },
                { icon: TrendingUp, value: "340%", label: "Average ROI" },
                { icon: Zap, value: "6", label: "Industries Served" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 md:p-8 text-center"
                >
                  <stat.icon className="h-5 w-5 mx-auto mb-3 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="mono-label mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((study, i) => (
                <motion.article
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-border bg-card hover:shadow-[8px_8px_0_0_var(--primary)] transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className={`p-6 md:p-8 ${study.color} border-b border-border`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="mono-label">{study.industry}</span>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">{study.title}</h3>
                    <p className="font-mono text-sm text-muted-foreground">{study.subtitle}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <h4 className="mono-label text-primary mb-2">THE CHALLENGE</h4>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="mono-label text-primary mb-2">THE SOLUTION</h4>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-background border border-border">
                      {study.results.map((result, j) => (
                        <div key={j} className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-primary">
                            {result.metric}
                          </div>
                          <div className="mono-label mt-1">{result.label}</div>
                          <div className="text-[10px] font-mono text-muted-foreground mt-1">
                            {result.prev}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {study.tags.map((tag) => (
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

        {/* CTA Section */}
        <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest mb-6"
            >
              [YOUR STORY NEXT]
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto mb-8"
            >
              READY TO JOIN THESE{" "}
              <span className="text-primary">SUCCESS STORIES?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-mono text-sm text-background/70 max-w-md mx-auto mb-10"
            >
              Book a free consultation and discover how automation can transform your business operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/book"
                className="inline-flex items-center gap-3 bg-primary text-background font-mono text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary/90 transition-colors"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
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
