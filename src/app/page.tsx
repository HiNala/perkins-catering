import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ServiceIcon } from "@/components/ServiceIcon";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";
import { HeroSlider } from "@/components/HeroSlider";
import { JsonLd, businessJsonLd, faqJsonLd } from "@/components/JsonLd";
import { business, services, testimonials, faqs } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { imageUrl } from "@/lib/s3";

export const metadata: Metadata = pageMetadata({
  title: "Perkins Catering Co. — Farm-to-Table Catering in Sonoma County",
  description:
    "Perkins Catering Co. brings restaurant-quality, locally sourced catering to Napa, Sonoma, and Marin counties. Led by Executive Chef Austin Perkins, we craft custom menus for weddings, corporate events, and private gatherings.",
  path: "",
});

export default function HomePage() {
  // Pick top 4 FAQs for AEO on homepage
  const homepageFaqs = faqs.slice(0, 4);

  return (
    <>
      <JsonLd data={[businessJsonLd(), faqJsonLd(homepageFaqs)]} />

      {/* ===== Full-bleed hero with image slider ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image slider — full-bleed */}
        <HeroSlider />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6 animate-fade-in-up delay-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Local Ingredients.
            <br />
            Expert Care.
            <br />
            <span className="text-white">Quality Events.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Farm-to-table catering led by Executive Chef Austin Perkins.
            Restaurant-quality dishes, crafted for your wedding, corporate event,
            or private gathering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Button href="/inquire" size="lg" className="bg-sage text-white hover:bg-sage-dark shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
              Start an Inquiry
            </Button>
            <Button href="/menu" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-sage shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
              Explore the Menu
            </Button>
          </div>
          {/* Location banner below buttons */}
          <p className="heading-uppercase text-sm sm:text-base text-white/90 mt-10 animate-fade-in-up delay-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {business.serviceArea}
          </p>
        </div>
      </section>

      {/* ===== Services overview ===== */}
      <Section background="cream">
        <SectionHeading
          eyebrow="What We Do"
          title="Catering for Every Occasion"
          subtitle="From intimate dinners to grand celebrations, we bring restaurant-quality cuisine directly to you."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <ServiceIcon name={service.icon as "rings" | "briefcase" | "utensils" | "sun"} className="h-12 w-12 text-sage mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-base text-stone leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-charcoal/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ===== About preview ===== */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl("bio/chef-austin-perkins.png")}
                alt="Executive Chef Austin Perkins"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-sage/10 -z-10" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Meet the Chef"
              title="Austin Perkins"
              subtitle="Executive Chef & Owner"
            />
            <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
              A native of Petaluma, Austin grew up enjoying the bounty of Sonoma
              and Marin counties. His culinary journey took him through Tante
              Marie&rsquo;s cooking school in San Francisco, the two-Michelin-starred
              Cyrus restaurant in Healdsburg, and ultimately to Executive Chef at
              Nick&rsquo;s Cove in Marshall, California.
            </p>
            <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
              Recommended by the Michelin Guide and named &ldquo;Best Of&rdquo; four
              times by the Pacific Sun, Austin celebrates the bounty of local farms
              and maintains close relationships with farmers and artisan producers
              throughout the North Bay.
            </p>
            <Button href="/bio" variant="outline" size="md">
              Read His Story
            </Button>
          </div>
        </div>
      </Section>

      {/* ===== Testimonials ===== */}
      <Section background="cream">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Our Clients Say"
          subtitle="We've had the privilege of catering hundreds of events across wine country. Here's what a few of our clients had to say."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.author}
              quote={t.quote}
              author={t.author}
              affiliation={t.affiliation}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/testimonials" variant="ghost" size="md">
            Read More Testimonials
          </Button>
        </div>
      </Section>

      {/* ===== Service area with cities ===== */}
      <Section background="charcoal">
        <div className="text-center max-w-3xl mx-auto">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            Serving Wine Country
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream mb-6">
            Napa · Sonoma · Marin
          </h2>
          <p className="text-xl text-cream/70 leading-relaxed mb-8">
            We proudly serve the three counties that produce some of the finest
            food and wine in the world. Our close relationships with local farmers,
            fishers, and artisan producers ensure every dish is made with the
            freshest ingredients available.
          </p>
          {/* Service cities grid for local SEO */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {business.serviceCities.map((city) => (
              <span
                key={city}
                className="inline-block px-4 py-2 text-sm rounded-full bg-white/10 text-cream/80 border border-white/10"
              >
                {city}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/inquire" size="lg">
              Plan Your Event
            </Button>
            <a
              href={business.phoneHref}
              className="text-xl text-cream/80 hover:text-sage-light transition-colors"
            >
              {business.phone}
            </a>
          </div>
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <CTABanner />
    </>
  );
}
