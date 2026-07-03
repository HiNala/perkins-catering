import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/business";

export const metadata: Metadata = {
  title: "Resources — Catering Tips & FAQ",
  description:
    "Helpful resources for planning your catered event. FAQ, tips for choosing a caterer, seasonal ingredient guides, and event planning advice from Perkins Catering Co.",
  alternates: { canonical: "https://perkins-catering.up.railway.app/resources" },
};

const planningTips = [
  {
    title: "Plan Ahead",
    text: "For weddings and large events, we recommend reaching out 3-6 months in advance. This allows time for menu development, tastings, and logistics planning.",
  },
  {
    title: "Know Your Guests",
    text: "Gather information about dietary restrictions, allergies, and preferences early. We can accommodate any need with advance notice.",
  },
  {
    title: "Consider the Season",
    text: "Seasonal ingredients aren't just fresher — they're more flavorful and often more affordable. We'll guide you toward the best options for your event date.",
  },
  {
    title: "Trust Your Chef",
    text: "Every menu we create is custom. Share your vision and preferences, and let Chef Austin craft something extraordinary. The best events come from collaboration.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={{
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
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            Guides & Tips
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Resources
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to plan a successful catered event, from
            frequently asked questions to expert planning tips.
          </p>
        </div>
      </section>

      {/* Planning tips */}
      <Section background="cream">
        <SectionHeading
          eyebrow="Expert Advice"
          title="Event Planning Tips"
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {planningTips.map((tip, idx) => (
            <div
              key={tip.title}
              className="flex gap-4 p-6 rounded-xl bg-white border border-border shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                <span className="font-heading text-lg font-semibold text-sage">
                  {idx + 1}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">
                  {tip.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Frequently Asked Questions"
          center
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-cream-dark/30 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h3 className="font-heading text-lg font-semibold pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage/10 flex items-center justify-center transition-transform group-open:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-sage" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 -mt-2">
                <p className="text-charcoal/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact prompt */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            eyebrow="Still Have Questions?"
            title="We're Here to Help"
          />
          <p className="text-charcoal/80 leading-relaxed mb-8">
            Don&rsquo;t see your question answered? Reach out directly —
            we&rsquo;re happy to discuss your event and answer any questions
            you may have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/inquire" size="lg">
              Start an Inquiry
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
