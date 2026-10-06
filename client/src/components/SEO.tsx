import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  faqItems?: FAQItem[];
  /** Extra JSON-LD objects for this page (Event, Course, Article…). */
  jsonLd?: Record<string, unknown>[];
}

/** One sentence, reused everywhere the entity is described. */
export const ENTITY_STATEMENT =
  "Unpaste.ai is a Brisbane AI training company. Elliot Stone teaches business owners and teams to run their work with Claude, Claude Code and Cowork, through hands-on workshops, team dev days and 1:1 coaching.";

const defaultSEO = {
  title: "unpaste.ai | Stop Copy-Pasting. Start Scaling.",
  description:
    "Brisbane AI training. Hands-on Claude Code workshops, team dev days and 1:1 coaching for business owners and teams. Learn to run your work with Claude, Claude Code and Cowork, on a system you own.",
  keywords:
    "AI coaching Brisbane, AI training, AI workshops Brisbane, Claude Code, custom development, AI automation, workflow automation, Brisbane AI, business automation, AI agents",
  image: "https://unpaste.ai/images/og-image.png",
  url: "https://unpaste.ai",
  type: "website",
};

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type,
  noIndex = false,
  faqItems,
  jsonLd,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | unpaste.ai` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type: type || defaultSEO.type,
  };

  // Entity statement. Keep this sentence identical in llms.txt, the Home
  // subheadline, LinkedIn and Google Business Profile: AI engines assemble
  // "what is Unpaste.ai" from whichever of these they read first.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://unpaste.ai/#organization",
    name: "Unpaste.ai",
    alternateName: "Unpaste",
    url: "https://unpaste.ai",
    logo: "https://unpaste.ai/images/og-image.png",
    description: ENTITY_STATEMENT,
    foundingDate: "2025",
    founder: { "@id": "https://unpaste.ai/#elliot" },
    areaServed: ["Brisbane", "South East Queensland", "Australia"],
    knowsAbout: [
      "Claude",
      "Claude Code",
      "Claude Cowork",
      "AI training for small business",
      "AI agents for business operations",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "elliot@unpaste.co",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.linkedin.com/company/unpaste-ai",
      "https://www.linkedin.com/in/elliot-stone-66a5a1a4",
    ],
  };

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://unpaste.ai/#elliot",
    name: "Elliot Stone",
    jobTitle: "Founder",
    worksFor: { "@id": "https://unpaste.ai/#organization" },
    url: "https://unpaste.ai/about",
    image: "https://unpaste.ai/images/team-elliot.jpg",
    description:
      "Brisbane AI trainer. Teaches business owners and teams to run their work with Claude, Claude Code and Cowork, and runs the weekly Claude & Coffee meetup.",
    sameAs: ["https://www.linkedin.com/in/elliot-stone-66a5a1a4"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
  };

  const faqSchema = faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://unpaste.ai/#localbusiness",
    name: "Unpaste.ai",
    description: ENTITY_STATEMENT,
    url: "https://unpaste.ai",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "Queensland",
      addressCountry: "Australia",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.4698,
      longitude: 153.0251,
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="unpaste.ai" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {jsonLd?.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
