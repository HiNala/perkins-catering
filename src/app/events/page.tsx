import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Events — Weddings, Corporate & Private Gatherings",
  description:
    "Perkins Catering Co. caters weddings, corporate events, and private gatherings across Napa, Sonoma, and Marin counties. Custom menus, expert service, and restaurant-quality cuisine.",
  alternates: { canonical: `${SITE_URL}/events` },
};

const eventTypes = [
  {
    title: "Weddings",
    description:
      "From intimate ceremonies to grand celebrations for 250+ guests, we craft wedding menus that reflect your love story. Whether it's a rustic outdoor setting in the redwoods or an elegant vineyard affair, we bring everything needed to create a memorable dining experience.",
    features: [
      "Custom menu design based on your preferences",
      "Full-service staffing and setup",
      "Wine pairings from local vineyards",
      "Accommodations for dietary restrictions",
      "Buffet, plated, or family-style service",
    ],
    capacity: "8 – 250+ guests",
  },
  {
    title: "Corporate Events",
    description:
      "Impress your team and clients with restaurant-quality catering for corporate gatherings, retreats, and celebrations. From oyster and raw bars for 300 to intimate executive dinners, we deliver exceptional food with professional service.",
    features: [
      "Oyster & raw bar setups",
      "Buffet or plated service options",
      "Flexible scheduling for business hours",
      "Volume catering for large teams",
      "Custom branding and themes",
    ],
    capacity: "10 – 300+ guests",
  },
  {
    title: "Private Dinners",
    description:
      "Intimate in-home dinners with a personal chef experience. Perfect for special occasions, milestone celebrations, or simply an extraordinary evening with friends and family. Our chef prepares everything onsite for the freshest experience.",
    features: [
      "Chef-prepared onsite at your location",
      "Multi-course tasting menus",
      "Wine pairings from our 1263 Wine label",
      "Custom themes and cuisines",
      "Full cleanup and service",
    ],
    capacity: "8 – 40 guests",
  },
];

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Catering",
          provider: {
            "@type": "CateringService",
            name: "Perkins Catering Co.",
          },
          areaServed: ["Napa County", "Sonoma County", "Marin County"],
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            Every Event Is Unique
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Events We Cater
          </h1>
          <p className="text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Our goal at Perkins Catering Co. is to make your event the best it
            can possibly be. Our chefs, led by Austin Perkins, have worked in
            many of the Bay Area&rsquo;s top 100 restaurants their entire careers.
            We work to bring the same restaurant quality dishes directly to you.
          </p>
        </div>
      </section>

      {/* Event types */}
      {eventTypes.map((event, idx) => (
        <Section
          key={event.title}
          background={idx % 2 === 0 ? "cream" : "white"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <p className="heading-uppercase text-sm text-sage mb-3">
                {event.capacity}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold mb-4">
                {event.title}
              </h2>
              <p className="text-charcoal/80 leading-relaxed mb-6">
                {event.description}
              </p>
              <ul className="space-y-3 mb-8">
                {event.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-sage flex-shrink-0" />
                    <span className="text-charcoal/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button href="/inquire">
                Inquire About {event.title}
              </Button>
            </div>
            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sage/20 to-charcoal/10 flex items-center justify-center p-12">
                <div className="text-center">
                  <p className="font-heading text-6xl font-semibold text-sage/40">
                    {event.capacity}
                  </p>
                  <p className="heading-uppercase text-sm text-stone mt-2">
                    Guest Range
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Process */}
      <Section background="charcoal">
        <SectionHeading
          eyebrow="How It Works"
          title="Our Event Planning Process"
          center
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Inquire", description: "Tell us about your event — type, date, guest count, and preferences." },
            { step: "02", title: "Custom Menu", description: "Chef Austin crafts a personalized menu based on your vision and seasonal ingredients." },
            { step: "03", title: "Refine", description: "We work with you during the planning phase to ensure every detail is considered." },
            { step: "04", title: "Event Day", description: "Our team arrives, sets up, and delivers a seamless dining experience." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <p className="font-heading text-5xl font-semibold text-sage/30 mb-3">
                {item.step}
              </p>
              <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-cream/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Inline lead capture */}
      <Section background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <SectionHeading
              eyebrow="Start Planning"
              title="Tell Us About Your Event"
              subtitle="Whether it's an intimate dinner for 12 or a grand celebration for 300, Chef Austin will craft a custom menu just for you. Leave your info and we'll call within 24 hours."
            />
          </div>
          <QuickLeadForm
            title="Plan Your Event"
            subtitle="Get a free consultation with Chef Austin."
          />
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
