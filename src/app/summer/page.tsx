import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABanner } from "@/components/CTABanner";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/lib/business";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Summer Meals — Seasonal Pickup & Delivery",
  description:
    "Perkins Catering Co.'s summer meal program offers chef-prepared seasonal dishes for pickup at Imagery Winery in Glen Ellen, CA. Delivery available on request.",
  alternates: { canonical: `${SITE_URL}/summer` },
};

const summerMeals = [
  {
    title: "Wood Fired California King Salmon",
    date: "July 24th",
    price: "$45.00",
    priceNote: "$45 for 2",
    courses: [
      "Arugula Salad",
      "Melted Leeks",
      "Purée of celery root",
      "Almond Blondies",
    ],
  },
];

const pickupInfo = {
  location: "Imagery Winery",
  address: "14335 Sonoma Hwy, Glen Ellen, CA 95442",
  hours: "11 AM – 4 PM",
  deliveryFee: "$30.00",
  deliveryNote:
    "Delivery is available on request and will have a $30.00 delivery fee. Please request delivery via email after making your selections.",
};

export default function SummerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Summer Meal Program",
          provider: {
            "@type": "CateringService",
            name: "Perkins Catering Co.",
          },
          areaServed: "Sonoma County",
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-sage text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-cream/80 mb-4">
            Seasonal · Fresh · To-Go
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Summer Meals
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Enjoy chef-prepared seasonal meals at home. Pickup at Imagery Winery
            or have it delivered to your door.
          </p>
        </div>
      </section>

      {/* Featured meal */}
      <Section background="cream">
        <SectionHeading
          eyebrow="Featured This Week"
          title="Chef's Summer Selection"
          center
        />
        <div className="max-w-2xl mx-auto">
          {summerMeals.map((meal) => (
            <Card key={meal.title} className="text-center" hover={false}>
              <p className="heading-uppercase text-sm text-sage mb-2">
                {meal.date}
              </p>
              <h3 className="font-heading text-2xl font-semibold mb-4">
                {meal.title}
              </h3>
              <div className="inline-block px-4 py-2 rounded-lg bg-sage/10 text-sage font-semibold mb-6">
                {meal.price} · {meal.priceNote}
              </div>
              <div className="border-t border-border pt-6">
                <p className="heading-uppercase text-sm text-stone mb-4">
                  Menu
                </p>
                <ul className="space-y-2">
                  {meal.courses.map((course) => (
                    <li key={course} className="text-charcoal/80">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button href={business.emailHref}>
                  Order via Email
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pickup info */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card hover={false}>
            <h3 className="font-heading text-xl font-semibold mb-4">
              Pickup Details
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="heading-uppercase text-sm text-stone">Location</dt>
                <dd className="text-charcoal/80 mt-1">{pickupInfo.location}</dd>
              </div>
              <div>
                <dt className="heading-uppercase text-sm text-stone">Address</dt>
                <dd className="text-charcoal/80 mt-1">{pickupInfo.address}</dd>
              </div>
              <div>
                <dt className="heading-uppercase text-sm text-stone">Hours</dt>
                <dd className="text-charcoal/80 mt-1">{pickupInfo.hours}</dd>
              </div>
            </dl>
          </Card>
          <Card hover={false}>
            <h3 className="font-heading text-xl font-semibold mb-4">
              Delivery Options
            </h3>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              {pickupInfo.deliveryNote}
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-sage/10 text-sage font-semibold">
              Delivery Fee: {pickupInfo.deliveryFee}
            </div>
            <div className="mt-6">
              <Button href={business.emailHref} variant="outline" size="sm">
                Request Delivery
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Inline lead capture */}
      <Section background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <SectionHeading
              eyebrow="Summer Catering"
              title="Planning a Summer Event?"
              subtitle="From backyard BBQs to vineyard weddings, let Chef Austin craft the perfect summer menu. Leave your info and we'll call you within 24 hours."
            />
          </div>
          <QuickLeadForm
            title="Plan Your Summer Event"
            subtitle="Free consultation with Chef Austin."
          />
        </div>
      </Section>

      <CTABanner
        title="Planning a Summer Event?"
        subtitle="From backyard BBQs to vineyard weddings, we cater all your summer celebrations."
      />
    </>
  );
}
