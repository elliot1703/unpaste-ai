import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const defaultSEO = {
  title: "unpaste.ai | Stop Copy-Pasting. Start Scaling.",
  description:
    "Discover where your business is bleeding time. Take our free 5-minute Efficiency Score assessment and see exactly where automation can transform your operations.",
  keywords:
    "AI automation, workflow automation, efficiency assessment, Brisbane AI, business automation, SMB automation, process automation, AI agents",
  image: "/images/og-image.png",
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
}: SEOProps) {
  const seo = {
    title: title ? `${title} | unpaste.ai` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type: type || defaultSEO.type,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "unpaste.ai",
    url: "https://unpaste.ai",
    logo: "https://unpaste.ai/images/logo.png",
    description: "AI automation solutions for Brisbane businesses",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@unpaste.ai",
      contactType: "customer service",
    },
    sameAs: [],
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "unpaste.ai",
    description: "AI automation and workflow solutions for small to medium businesses",
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
    </Helmet>
  );
}
