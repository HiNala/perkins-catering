/**
 * JSON-LD structured data component for SEO.
 * Renders a script tag with structured data for search engines.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * LocalBusiness JSON-LD — used on every page via layout.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CateringService",
    "@id": "https://perkins-catering.up.railway.app/#business",
    name: "Perkins Catering Co.",
    description:
      "Farm-to-table catering in Napa, Sonoma, and Marin counties. Restaurant-quality dishes for weddings, corporate events, and private gatherings.",
    telephone: "+1-707-981-7822",
    email: "reservations@perkinscateringco.com",
    url: "https://perkins-catering.up.railway.app",
    image: "https://perkins-catering.up.railway.app/images/og-image.png",
    priceRange: "$$$",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Napa County" },
      { "@type": "AdministrativeArea", name: "Sonoma County" },
      { "@type": "AdministrativeArea", name: "Marin County" },
    ],
    founder: {
      "@type": "Person",
      name: "Austin Perkins",
      jobTitle: "Executive Chef & Owner",
    },
    sameAs: [],
  };
}
