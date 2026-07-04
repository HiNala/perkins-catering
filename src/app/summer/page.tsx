import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { CTABanner } from "@/components/CTABanner";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { SummerMealOrder } from "@/components/SummerMealOrder";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { business } from "@/lib/business";
import { pageMetadata, breadcrumbItems } from "@/lib/seo";
import { imageUrl } from "@/lib/s3";

export const metadata = pageMetadata({
  title: "Summer Meals — Seasonal Pickup & Delivery",
  description:
    "Perkins Catering Co.'s summer meal program offers chef-prepared seasonal dishes for pickup at Imagery Winery in Glen Ellen, CA. Delivery available on request.",
  path: "/summer",
});

const summerMeals = [
  {
    id: "salmon-july-24",
    title: "Wood Fired California King Salmon",
    date: "July 24th",
    price: 45.00,
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
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Summer Meal Program",
            provider: {
              "@type": "CateringService",
              name: "Perkins Catering Co.",
            },
            areaServed: "Sonoma County",
          },
          breadcrumbJsonLd(
            breadcrumbItems([
              { name: "Home", path: "/" },
              { name: "Summer Meals", path: "/summer" },
            ])
          ),
        ]}
      />

      {/* Hero header with background image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl("hero/sunlit-elegant-table.jpg")}
            alt="Sunlit elegant summer table setting"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage/80 via-sage/70 to-charcoal/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-cream/90 mb-4 drop-shadow">
            Seasonal · Fresh · To-Go
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4 drop-shadow-lg">
            Summer Meals
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Enjoy chef-prepared seasonal meals at home. Pickup at Imagery Winery
            or have it delivered to your door.
          </p>
        </div>
      </section>

      {/* Featured meal with order form */}
      <Section background="cream">
        <SectionHeading
          eyebrow="Featured This Week"
          title="Chef's Summer Selection"
          center
        />
        <div className="max-w-3xl mx-auto">
          {summerMeals.map((meal) => (
            <div key={meal.id} className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg bg-white">
              {/* Left: meal image */}
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={imageUrl("gallery/gallery-03.jpg")}
                  alt={meal.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Right: meal details + order */}
              <div className="p-6 sm:p-8 flex flex-col">
                <p className="heading-uppercase text-sm text-sage mb-2">
                  {meal.date}
                </p>
                <h3 className="font-heading text-2xl font-semibold mb-3">
                  {meal.title}
                </h3>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="px-3 py-1.5 rounded-lg bg-sage/10 text-sage font-semibold text-sm">
                    ${meal.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-stone">{meal.priceNote}</span>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <p className="heading-uppercase text-xs text-stone mb-3">
                    Menu
                  </p>
                  <ul className="space-y-1.5">
                    {meal.courses.map((course) => (
                      <li key={course} className="text-sm text-charcoal/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-sage flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order form */}
                <div className="mt-auto">
                  <SummerMealOrder meal={meal} pickupInfo={pickupInfo} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pickup instructions — prominent card */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="How It Works"
            title="Pickup Instructions"
            center
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                <span className="font-heading text-2xl font-semibold text-sage">1</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Place Your Order</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Select your meal and quantity, then complete the checkout form above.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                <span className="font-heading text-2xl font-semibold text-sage">2</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Pick Up at Imagery Winery</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {pickupInfo.address}
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                <span className="font-heading text-2xl font-semibold text-sage">3</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Enjoy at Home</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Pick up between {pickupInfo.hours} on {summerMeals[0].date}.
              </p>
            </div>
          </div>

          {/* Pickup details card */}
          <Card hover={false} className="mt-8 border-2 border-sage/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="heading-uppercase text-xs text-stone mb-1">Pickup Location</p>
                  <p className="text-sm font-medium text-charcoal">{pickupInfo.location}</p>
                  <p className="text-xs text-charcoal/60">{pickupInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="heading-uppercase text-xs text-stone mb-1">Pickup Hours</p>
                  <p className="text-sm font-medium text-charcoal">{pickupInfo.hours}</p>
                  <p className="text-xs text-charcoal/60">On {summerMeals[0].date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 17h4M3 5h11M3 5l2 6h11l2-6M3 5a2 2 0 002-2" />
                </svg>
                <div>
                  <p className="heading-uppercase text-xs text-stone mb-1">Delivery Available</p>
                  <p className="text-sm font-medium text-charcoal">{pickupInfo.deliveryFee} fee</p>
                  <p className="text-xs text-charcoal/60">Request at checkout</p>
                </div>
              </div>
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
        title="Ready for a Summer to Remember?"
        subtitle="From backyard BBQs to vineyard weddings, we cater all your summer celebrations."
      />
    </>
  );
}
