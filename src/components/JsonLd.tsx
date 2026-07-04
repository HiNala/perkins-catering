/**
 * JSON-LD structured data component for SEO.
 * Renders a script tag with structured data for search engines.
 */
import { SITE_URL } from "@/lib/config";
import { business } from "@/lib/business";

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
 * Includes geo coordinates, postal address, service area with cities,
 * and opening hours specification for local SEO.
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
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Napa County" },
      { "@type": "AdministrativeArea", name: "Sonoma County" },
      { "@type": "AdministrativeArea", name: "Marin County" },
      ...business.serviceCities.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
    founder: {
      "@type": "Person",
      name: "Austin Perkins",
      jobTitle: "Executive Chef & Owner",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      business.social.instagram,
      business.social.facebook,
    ],
  };
}

/**
 * FAQPage JSON-LD for AEO (Answer Engine Optimization).
 * Used on the resources page and embeddable on any page with FAQs.
 */
export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList JSON-LD for navigation context.
 */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
