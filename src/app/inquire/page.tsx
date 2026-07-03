import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Inquire — Start Your Catering Inquiry",
  description:
    "Tell us about your event and we'll craft a custom catering proposal. Multi-step inquiry form for weddings, corporate events, and private gatherings in Napa, Sonoma, and Marin counties.",
  alternates: { canonical: "https://perkins-catering-production.up.railway.app/inquire" },
};

export default function InquirePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Catering Inquiry",
          description:
            "Multi-step catering inquiry form for Perkins Catering Co.",
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            Let&rsquo;s Plan Something Extraordinary
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Start an Inquiry
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Tell us about your event. The more we know, the better we can craft
            a custom menu and proposal tailored to your vision.
          </p>
        </div>
      </section>

      {/* Form */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto">
          <InquiryForm />
        </div>
      </Section>

      <CTABanner
        title="Prefer to Talk?"
        subtitle="Call us directly and we'll get started right away."
      />
    </>
  );
}
