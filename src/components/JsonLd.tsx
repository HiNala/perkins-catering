/**
 * JSON-LD structured data component for SEO.
 * Renders a script tag with structured data for search engines.
 */
import { SITE_URL } from "@/lib/config";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
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
    "@id": `${SITE_URL}/#business`,
    name: "Perkins Catering Co.",
    description:
      "Farm-to-table catering in Napa, Sonoma, and Marin counties. Restaurant-quality dishes for weddings, corporate events, and private gatherings.",
    telephone: "+1-707-981-7822",
    email: "reservations@perkinscateringco.com",
    url: SITE_URL,
    image: `${SITE_URL}/images/og-image.png`,
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
