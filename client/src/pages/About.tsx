import { ArrowRight, ArrowUpRight, MapPin, Mail, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

const values = [
  {
    num: "01",
    title: "EFFICIENCY OBSESSED",
    description:
      "We believe time is your most valuable asset. Every solution we build is measured by how much time it gives back to you.",
  },
  {
    num: "02",
    title: "HUMAN-CENTERED AI",
    description:
      "AI should amplify human potential, not replace it. We automate the mundane so you can focus on what matters.",
  },
  {
    num: "03",
    title: "RESULTS OVER HYPE",
    description:
      "We don't chase trends. We implement solutions that deliver measurable ROI and real business outcomes.",
  },
  {
    num: "04",
    title: "LOCAL EXPERTISE",
    description:
      "Brisbane-based means we understand the Australian SMB landscape. We speak your language and operate in your timezone.",
  },
];

const team = [
  {
    name: "Elliot Stone",
    role: "Founder · Unpaste.ai",
    bio: "Brisbane-based AI consultant focused on small and medium businesses. I work hands-on with trades, professional services, and operations teams across South East Queensland — practical AI training and on-site workspace setup, built around how your business actually runs. Twelve months building and testing AI systems for SMBs has taught me one thing: the tool isn't the bottleneck. The setup around it is. That's the gap I fill.",
    image: "/images/team-elliot.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="About Us"
        description="Meet Elliot Stone, the Brisbane-based AI consultant behind unpaste.ai. Hands-on AI workspace setup for small business teams across South East Queensland."
        url="https://unpaste.ai/about"
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
                className="font-mono text-xs uppercase tracking-wider text-foreground font-bold"
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
              className="font-mono text-xs font-bold uppercase tracking-wider bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="section-tag mb-6"
                >
                  [ABOUT UNPASTE]
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8"
                >
                  WE HATE{" "}
                  <span className="text-primary">BUSY-WORK</span>{" "}
                  AS MUCH AS YOU DO.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-mono text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
                >
                  I&rsquo;m a Brisbane-based AI consultant. I work hands-on with
                  small business teams to set up AI workspaces that actually stick
                  &mdash; so the team gets time back and your business keeps
                  control of what ships out the door.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card border border-border p-8 md:p-10"
              >
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  <span className="text-primary font-bold">OUR MISSION</span>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed">
                  To give every business owner their time back by making intelligent automation
                  accessible, practical, and transformative.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 border-y border-border bg-card">
          <div className="container">
            <div className="mb-16">
              <div className="section-tag mb-4">[001] OUR VALUES</div>
              <h2 className="text-4xl md:text-5xl max-w-xl leading-tight">
                WHAT DRIVES EVERYTHING WE DO.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-8 md:p-12 group"
                >
                  <span className="text-5xl font-bold text-foreground/10">{value.num}</span>
                  <h3 className="text-xl font-bold mt-4 mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="section-tag mb-4">[002] WHAT I DO</div>
              <h2 className="text-4xl md:text-5xl leading-tight mb-10">
                PRACTICAL AI TRAINING{" "}
                <span className="text-primary">FOR SMALL TEAMS.</span>
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-5 font-mono text-sm md:text-base text-foreground leading-relaxed"
              >
                <p>
                  I work with small and medium businesses across South East
                  Queensland &mdash; trades, professional services, and operations
                  teams &mdash; to help them get real value from AI in their
                  day-to-day work.
                </p>
                <p>
                  Most teams I meet have tried one or two AI tools but haven&rsquo;t
                  figured out how to use them consistently across the business. I
                  come on-site and work directly with your team in their actual
                  workflows &mdash; quoting, scheduling, client communication,
                  documentation, reporting &mdash; and help them build setups
                  they&rsquo;ll actually use.
                </p>
                <p>
                  Hands-on, practical, and built around how your business runs today.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 border-y border-border bg-card">
          <div className="container">
            <div className="mb-16">
              <div className="section-tag mb-4">[003] WHO YOU&rsquo;RE WORKING WITH</div>
              <h2 className="text-4xl md:text-5xl max-w-2xl leading-tight">
                THE PERSON IN THE ROOM{" "}
                <span className="text-primary">WITH YOUR TEAM.</span>
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl mt-6">
                Hands-on AI consulting for small and medium businesses across
                South East Queensland. Workshops, training, and on-site workspace
                setup &mdash; with someone who&rsquo;ll work alongside your
                specialists in the actual work.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border bg-background group hover:shadow-[6px_6px_0_0_var(--primary)] transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center border-b border-border">
                    <div className="text-6xl font-bold text-muted-foreground/20">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold tracking-tight">{member.name}</h3>
                    <div className="mono-label text-primary mt-1 mb-4">{member.role}</div>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-4">
                      <a
                        href={member.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={member.twitter}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-4">[004] LOCATION</div>
                <h2 className="text-4xl md:text-5xl leading-tight mb-6">
                  PROUDLY{" "}
                  <span className="text-primary">BRISBANE</span> BASED.
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
                  We work with businesses across Australia, but our heart is in Brisbane.
                  Local expertise, Australian values, and your timezone.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 border border-border flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Brisbane, Queensland</div>
                      <div className="mono-label">Australia</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 border border-border flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <a
                        href="mailto:hello@unpaste.ai"
                        className="font-bold text-sm hover:text-primary transition-colors flex items-center gap-1"
                      >
                        hello@unpaste.ai
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                      <div className="mono-label">Get in touch</div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-video bg-muted border border-border flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="font-mono text-sm text-muted-foreground">
                    Brisbane, QLD
                  </div>
                </div>
              </motion.div>
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
              [LET'S TALK]
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto mb-8"
            >
              READY TO{" "}
              <span className="text-primary">WORK TOGETHER?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-mono text-sm text-background/70 max-w-md mx-auto mb-10"
            >
              Book a free consultation and let's explore how we can transform your operations.
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
