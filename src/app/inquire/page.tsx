import Image from "next/image";
import { Section } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";
import { pageMetadata, breadcrumbItems } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Inquire — Start Your Catering Inquiry",
  description:
    "Tell us about your event and we'll craft a custom catering proposal. Multi-step inquiry form for weddings, corporate events, and private gatherings in Napa, Sonoma, and Marin counties.",
  path: "/inquire",
});

export default function InquirePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Catering Inquiry",
            description:
              "Multi-step catering inquiry form for Perkins Catering Co.",
          },
          breadcrumbJsonLd(
            breadcrumbItems([
              { name: "Home", path: "/" },
              { name: "Inquire", path: "/inquire" },
            ])
          ),
        ]}
      />

      {/* Header with hero image */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/inquire-hero.jpg"
            alt="Catered event setup by Perkins Catering Co."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            Let&rsquo;s Plan Something Extraordinary
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream mb-4">
            Start an Inquiry
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
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
