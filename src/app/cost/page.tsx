import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cost & Pricing — Catering Investment Guide",
  description:
    "Understand the investment for catering with Perkins Catering Co. Pricing varies by menu, guest count, and service style. Every quote is custom-crafted for your event.",
  alternates: { canonical: `${SITE_URL}/cost` },
};

const pricingTiers = [
  {
    type: "Private Dinner",
    range: "$85 – $150",
    per: "per person",
    description:
      "Intimate multi-course dinners prepared onsite by Chef Austin. Includes custom menu design, preparation, service, and cleanup.",
    features: [
      "4-7 course tasting menu",
      "Chef-prepared onsite",
      "Full service staff",
      "Wine pairing available",
      "8 – 40 guests",
    ],
  },
  {
    type: "Wedding Catering",
    range: "$75 – $175",
    per: "per person",
    description:
      "Custom wedding menus from buffet to plated service. Every menu is crafted to reflect your vision and seasonal availability.",
    features: [
      "Custom menu design",
      "Buffet, plated, or family-style",
      "Full service staff & setup",
      "Dietary accommodations",
      "Up to 250+ guests",
    ],
    popular: true,
  },
  {
    type: "Corporate Events",
    range: "$50 – $125",
    per: "per person",
    description:
      "Professional catering for corporate gatherings, retreats, and celebrations. Flexible options from oyster bars to boxed lunches.",
    features: [
      "Oyster & raw bar options",
      "Buffet or plated service",
      "Flexible scheduling",
      "Volume pricing available",
      "Up to 300+ guests",
    ],
  },
];

const factors = [
  {
    title: "Menu Complexity",
    description:
      "Multi-course plated dinners require more preparation and staff than buffet-style service. The number of courses and complexity of dishes affects pricing.",
  },
  {
    title: "Guest Count",
    description:
      "Larger events benefit from economies of scale, while intimate dinners may have a higher per-person cost due to the personalized nature of the service.",
  },
  {
    title: "Service Style",
    description:
      "Full-service plated meals, buffet setups, and family-style service each have different staffing and equipment requirements.",
  },
  {
    title: "Seasonal Ingredients",
    description:
      "We use only in-season produce and the best available local proteins. Seasonal availability can influence menu pricing.",
  },
  {
    title: "Location & Setup",
    description:
      "Remote or rustic venues may require additional equipment and logistics. We've catered everything from vineyard estates to redwood forests.",
  },
  {
    title: "Staffing",
    description:
      "The number of servers, chefs, and support staff needed depends on your guest count and service style. We handle all staffing in-house.",
  },
];

export default function CostPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          description:
            "Catering pricing varies by event type, menu, and guest count. Contact for a custom quote.",
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            Investment Guide
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Cost & Pricing
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Every event is unique, and so is every quote. These ranges provide a
            starting point — your custom proposal will reflect your specific
            menu, guest count, and service needs.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <Section background="cream">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.type}
              className={`flex flex-col relative ${
                tier.popular ? "ring-2 ring-sage" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sage text-white text-xs uppercase tracking-wider font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-xl font-semibold mb-2">
                {tier.type}
              </h3>
              <div className="mb-4">
                <span className="font-heading text-3xl font-semibold text-sage">
                  {tier.range}
                </span>
                <span className="text-sm text-stone ml-2">{tier.per}</span>
              </div>
              <p className="text-sm text-stone leading-relaxed mb-6 flex-1">
                {tier.description}
              </p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-charcoal/70 flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/inquire" variant={tier.popular ? "primary" : "outline"} className="w-full">
                Get a Quote
              </Button>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-stone mt-8">
          * All pricing is approximate and varies based on specific menu selections,
          seasonal availability, and event logistics. Custom quotes provided upon inquiry.
        </p>
      </Section>

      {/* Factors */}
      <Section background="white">
        <SectionHeading
          eyebrow="What Affects Pricing"
          title="Factors We Consider"
          subtitle="Every quote is custom-crafted based on these key factors."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factors.map((factor) => (
            <div key={factor.title} className="p-6 rounded-xl bg-cream-dark/50">
              <h3 className="font-heading text-lg font-semibold mb-2">
                {factor.title}
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Ready for Your Custom Quote?"
        subtitle="Tell us about your event and we'll craft a personalized proposal."
      />
    </>
  );
}
