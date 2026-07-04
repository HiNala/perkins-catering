import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";
import { pageMetadata, breadcrumbItems } from "@/lib/seo";
import { imageUrl } from "@/lib/s3";
import { business } from "@/lib/business";

export const metadata = pageMetadata({
  title: "Inquire — Start Your Catering Inquiry",
  description:
    "Tell us about your event and we'll craft a custom catering proposal. Multi-step inquiry form for weddings, corporate events, and private gatherings in Napa, Sonoma, and Marin counties.",
  path: "/inquire",
});

const trustBadges = [
  { label: "24-Hour Response", icon: "clock" },
  { label: "Custom Menus", icon: "menu" },
  { label: "Michelin Recommended", icon: "star" },
  { label: "500+ Events Catered", icon: "check" },
];

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
            src={imageUrl("inquire-hero.jpg")}
            alt="Catered event setup by Perkins Catering Co."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            Let&rsquo;s Plan Something Extraordinary
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream mb-4 drop-shadow-lg">
            Start an Inquiry
          </h1>
          <p className="text-xl text-cream/85 max-w-2xl mx-auto leading-relaxed">
            Tell us about your event. The more we know, the better we can craft
            a custom menu and proposal tailored to your vision.
          </p>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-cream/80">
                <svg className="h-5 w-5 text-sage-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <Section background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <InquiryForm />
            </div>
          </div>

          {/* Sidebar — what to expect + contact */}
          <div className="space-y-6">
            {/* What to expect */}
            <div className="rounded-2xl bg-white shadow-sm p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">
                What Happens Next?
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-sage/10 text-sage font-heading font-semibold text-sm flex items-center justify-center">1</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">We Review Your Details</p>
                    <p className="text-xs text-stone mt-0.5">Chef Austin personally reviews every inquiry.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-sage/10 text-sage font-heading font-semibold text-sm flex items-center justify-center">2</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Custom Menu & Proposal</p>
                    <p className="text-xs text-stone mt-0.5">We craft a tailored proposal within 24 hours.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-sage/10 text-sage font-heading font-semibold text-sm flex items-center justify-center">3</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Tasting & Booking</p>
                    <p className="text-xs text-stone mt-0.5">Schedule a tasting and secure your date.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Quick contact */}
            <div className="rounded-2xl bg-sage text-white p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Prefer to Talk?
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Call us directly and we&apos;ll get started right away.
              </p>
              <a
                href={business.phoneHref}
                className="block text-lg font-heading font-semibold text-white hover:text-cream transition-colors mb-2"
              >
                {business.phone}
              </a>
              <a
                href={business.emailHref}
                className="block text-sm text-white/80 hover:text-cream transition-colors break-all"
              >
                {business.email}
              </a>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={imageUrl("gallery/gallery-04.jpg")}
                alt="Beautifully catered event dish"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <CTABanner
        title="Your Event Deserves the Best"
        subtitle="Join hundreds of satisfied clients across Napa, Sonoma, and Marin counties."
      />
    </>
  );
}
