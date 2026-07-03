import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description:
    "Contact Perkins Catering Co. for catering inquiries in Napa, Sonoma, and Marin counties. Call 707-981-7822 or email reservations@perkinscateringco.com.",
  alternates: { canonical: "https://perkins-catering.up.railway.app/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Perkins Catering Co.",
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            We&rsquo;d Love to Hear From You
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Contact
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Reach out by phone, email, or start a detailed inquiry. We respond
            to all inquiries within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <Section background="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="rounded-2xl bg-white border border-border p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-sage">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Phone</h3>
            <a
              href={business.phoneHref}
              className="text-lg text-sage hover:text-sage-dark transition-colors"
            >
              {business.phone}
            </a>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-white border border-border p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-sage">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Email</h3>
            <a
              href={business.emailHref}
              className="text-sage hover:text-sage-dark transition-colors break-all"
            >
              {business.email}
            </a>
          </div>
        </div>

        {/* Service area */}
        <div className="max-w-4xl mx-auto mt-8 rounded-2xl bg-white border border-border p-8 shadow-sm">
          <h3 className="font-heading text-xl font-semibold mb-4 text-center">
            Service Area
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {business.serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-lg bg-sage/10 text-sage text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center mt-12">
          <SectionHeading
            title="Planning an Event?"
            subtitle="Our detailed inquiry form helps us understand your needs and craft the perfect proposal."
          />
          <Button href="/inquire" size="lg">
            Start a Detailed Inquiry
          </Button>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
