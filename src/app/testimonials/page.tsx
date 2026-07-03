import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { testimonials } from "@/lib/business";

export const metadata: Metadata = {
  title: "Testimonials — Client Reviews",
  description:
    "Read what clients say about Perkins Catering Co. From wineries to weddings to corporate events, our clients rave about the food, service, and professionalism.",
  alternates: { canonical: "https://perkins-catering-production.up.railway.app/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={testimonials.map((t) => ({
          "@type": "Review",
          reviewBody: t.quote,
          author: { "@type": "Person", name: t.author },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          itemReviewed: {
            "@type": "CateringService",
            name: "Perkins Catering Co.",
          },
        }))}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            Kind Words
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Testimonials
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            We&rsquo;ve had the privilege of catering hundreds of events across
            wine country. Here&rsquo;s what our clients have to say.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Section background="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.author}
              quote={t.quote}
              author={t.author}
              affiliation={t.affiliation}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        title="Join Our Happy Clients"
        subtitle="Experience the same exceptional food and service. Start your inquiry today."
      />
    </>
  );
}
