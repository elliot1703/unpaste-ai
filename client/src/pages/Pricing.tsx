import { ArrowRight, Check, Star } from "lucide-react";
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
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface Package {
  tag: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}

const brandingPackages: Package[] = [
  {
    tag: "[001]",
    name: "STARTER",
    price: "$1,800",
    description:
      "For businesses that need a professional foundation fast. Brand guidelines, logo direction, and a clear identity to build from.",
    features: [
      "1-hour brand strategy session",
      "Logo direction & refinement",
      "Colour palette & typography",
      "Brand style guide (PDF)",
      "Social media profile setup",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    tag: "[002]",
    name: "GROWTH",
    price: "$3,500",
    badge: "MOST POPULAR",
    description:
      "Full brand identity plus the marketing assets you need to actually use it. Website-ready, social-ready, print-ready.",
    features: [
      "Everything in Starter",
      "2-hour strategy deep-dive",
      "Extended logo suite (icon, wordmark, lockup)",
      "Marketing collateral templates",
      "Social media content templates (6 designs)",
      "Email signature & letterhead",
      "Brand voice & messaging framework",
    ],
    cta: "Get Started",
    ctaHref: "/book",
    highlighted: true,
  },
  {
    tag: "[003]",
    name: "COMPLETE",
    price: "$5,600",
    badge: "BEST VALUE",
    description:
      "A complete brand overhaul with everything you need to launch and run. Strategy, identity, assets, and your first month of content.",
    features: [
      "Everything in Growth",
      "3-hour strategy & positioning workshop",
      "Competitor & market analysis",
      "Full stationery suite",
      "Flyer & banner designs",
      "12 social media posts (designed & captioned)",
      "Brand launch checklist",
      "30-day post-launch support",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
];

const webPackages: Package[] = [
  {
    tag: "[001]",
    name: "STARTER",
    price: "$2,800",
    description:
      "A clean, professional website for businesses that need to be online yesterday. Mobile-ready, fast, and built to convert.",
    features: [
      "3-page custom website",
      "Mobile responsive design",
      "Contact form with notifications",
      "Privacy & terms pages",
      "Google Analytics setup",
      "1 round of revisions",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    tag: "[002]",
    name: "BUSINESS",
    price: "$4,800",
    badge: "MOST POPULAR",
    description:
      "For businesses that need more than a brochure. SEO foundations, animations, and the pages to properly showcase what you do.",
    features: [
      "Everything in Starter",
      "5-page website",
      "Scroll animations & micro-interactions",
      "Basic SEO setup (meta, schema, sitemap)",
      "Blog/news section",
      "Free stock photography sourcing",
      "2 rounds of revisions",
    ],
    cta: "Get Started",
    ctaHref: "/book",
    highlighted: true,
  },
  {
    tag: "[003]",
    name: "PREMIUM",
    price: "$7,200",
    description:
      "A serious website for a serious business. Advanced features, integrations, and the kind of design that makes competitors nervous.",
    features: [
      "Everything in Business",
      "Up to 10 pages",
      "Advanced animations & transitions",
      "Google Maps & social integration",
      "AI chatbot integration",
      "Advanced SEO & performance optimisation",
      "Dedicated senior designer",
      "3 rounds of revisions",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    tag: "[004]",
    name: "ENTERPRISE",
    price: "$9,600",
    badge: "FULL SERVICE",
    description:
      "The complete digital presence. Every page, every feature, every optimisation. Built to scale with your business.",
    features: [
      "Everything in Premium",
      "Up to 15 pages",
      "Custom forms & lead capture",
      "Pricing tables & comparison pages",
      "Newsletter signup & email integration",
      "Content strategy & copywriting",
      "Monthly maintenance (3 months included)",
      "Priority support",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
];

const monthlyPackages: Package[] = [
  {
    tag: "[001]",
    name: "LAUNCH",
    price: "$1,200",
    period: "/month",
    description:
      "For businesses just getting started with consistent marketing. The essentials to stay visible and grow your audience.",
    features: [
      "4 social media posts per month",
      "1 email newsletter (design + send)",
      "Ad-hoc design tasks (2 hrs/month)",
      "Social ad creation (1 campaign)",
      "Stock photography library access",
      "Monthly performance snapshot",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    tag: "[002]",
    name: "SCALE",
    price: "$2,400",
    period: "/month",
    badge: "MOST POPULAR",
    description:
      "For growing businesses that need serious marketing output. More content, website updates, and active campaign management.",
    features: [
      "Everything in Launch",
      "8 social media posts per month",
      "Website content updates",
      "Google Business profile management",
      "Ad campaign management",
      "1 additional webpage or blog post",
      "Bi-weekly strategy check-ins",
    ],
    cta: "Get Started",
    ctaHref: "/book",
    highlighted: true,
  },
  {
    tag: "[003]",
    name: "DOMINATE",
    price: "$3,800",
    period: "/month",
    badge: "FULL SERVICE",
    description:
      "Your outsourced marketing department. Strategy, execution, reporting, and a dedicated team that knows your business inside out.",
    features: [
      "Everything in Scale",
      "12 social media posts per month",
      "1 graphic design project per month",
      "Google Ads creation & management",
      "Review management & responses",
      "SEO enhancements & monitoring",
      "Monthly reporting & strategy session",
      "Dedicated senior designer",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
];

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`relative flex flex-col border border-border bg-card p-8 transition-all duration-300 ${
        pkg.highlighted
          ? "shadow-[6px_6px_0_0_var(--foreground)] -translate-x-[2px] -translate-y-[2px] border-foreground"
          : "hover:shadow-[4px_4px_0_0_var(--foreground)] hover:-translate-x-[2px] hover:-translate-y-[2px]"
      }`}
    >
      {pkg.badge && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-wider px-3 py-1">
          {pkg.badge}
        </div>
      )}

      <div className="mb-6">
        <span className="section-tag">{pkg.tag}</span>
        <h3 className="font-display text-2xl font-800 tracking-tight mt-1">{pkg.name}</h3>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-display text-4xl font-800 tracking-tight">{pkg.price}</span>
        {pkg.period && (
          <span className="font-mono text-xs text-muted-foreground uppercase">{pkg.period}</span>
        )}
      </div>

      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8">
        {pkg.description}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <span className="font-mono text-xs leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={pkg.ctaHref}
        className={`block text-center font-mono text-xs font-bold uppercase tracking-wider py-4 px-6 transition-all duration-200 ${
          pkg.highlighted
            ? "brutalist-button"
            : "brutalist-button-outline"
        }`}
      >
        {pkg.cta}
        <ArrowRight className="inline-block ml-2 h-3 w-3" />
      </Link>
    </motion.div>
  );
}

function PricingSection({
  tag,
  title,
  subtitle,
  packages,
}: {
  tag: string;
  title: string;
  subtitle: string;
  packages: Package[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="section-tag">{tag}</span>
          <h2 className="text-4xl md:text-5xl font-800 tracking-tight mt-2 mb-4">{title}</h2>
          <p className="font-mono text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
        </motion.div>

        <div
          className={`grid gap-6 ${
            packages.length === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }`}
        >
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Pricing | unpaste.ai"
        description="Transparent pricing for branding, web design, and ongoing marketing. Brisbane-built packages for businesses that want results, not invoices full of surprises."
        url="https://unpaste.ai/pricing"
      />

      <div className="grid-background" />

      <div className="relative z-10">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-tag">[PRICING]</span>
              <h1 className="text-5xl md:text-7xl font-800 tracking-tight mt-2 mb-6">
                CLEAR PRICING.
                <br />
                <span className="text-primary">NO SURPRISES.</span>
              </h1>
              <p className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed">
                Every package includes a strategy session so we build the right thing — not just a
                thing. All prices in AUD + GST.
              </p>
            </motion.div>

            {/* Quick nav */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {[
                { label: "Branding", href: "#branding" },
                { label: "Web Design", href: "#web" },
                { label: "Monthly Marketing", href: "#monthly" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-xs font-bold uppercase tracking-wider border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Branding Packages */}
        <div id="branding">
          <PricingSection
            tag="[001] BRANDING"
            title="BRAND IDENTITY"
            subtitle="Your brand is what people say about you when you're not in the room. These packages make sure they're saying the right thing."
            packages={brandingPackages}
          />
        </div>

        {/* Divider */}
        <div className="container">
          <div className="border-t border-border" />
        </div>

        {/* Web Design Packages */}
        <div id="web">
          <PricingSection
            tag="[002] WEB DESIGN"
            title="WEBSITES THAT WORK"
            subtitle="Not just pretty pages — websites built to convert visitors into customers. Fast, mobile-first, and search-optimised from day one."
            packages={webPackages}
          />
        </div>

        {/* Divider */}
        <div className="container">
          <div className="border-t border-border" />
        </div>

        {/* Monthly Marketing */}
        <div id="monthly">
          <PricingSection
            tag="[003] MONTHLY"
            title="ONGOING MARKETING"
            subtitle="Consistency wins. These retainers keep your marketing running while you run your business. Cancel anytime."
            packages={monthlyPackages}
          />
        </div>

        {/* Custom / CTA Section */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
              >
                <span className="section-tag">[CUSTOM]</span>
                <h2 className="text-4xl md:text-5xl font-800 tracking-tight mt-2 mb-6">
                  NEED SOMETHING
                  <br />
                  <span className="text-primary">DIFFERENT?</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                  AI agents, workflow automation, custom integrations, or a combination of
                  everything above — we scope it, price it, and build it.
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Start with a free 30-minute call. We'll map out what you need and give you
                  a clear quote — no obligation, no sales pressure.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
                className="space-y-6"
              >
                <div className="border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Free Efficiency Assessment
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
                    Not sure where to start? Take our 5-minute assessment to find out exactly
                    where your business is losing time — and what to fix first.
                  </p>
                  <Link
                    href="/assessment"
                    className="brutalist-button inline-block"
                  >
                    Take the Assessment
                    <ArrowRight className="inline-block ml-2 h-3 w-3" />
                  </Link>
                </div>

                <div className="border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Book a Free Call
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
                    30 minutes, zero pressure. We'll talk about your business, your goals, and
                    whether we're the right fit.
                  </p>
                  <Link
                    href="/book"
                    className="brutalist-button-outline inline-block"
                  >
                    Book a Call
                    <ArrowRight className="inline-block ml-2 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
