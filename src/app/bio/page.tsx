import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Chef Austin Perkins — Executive Chef & Owner",
  description:
    "Meet Executive Chef Austin Perkins, founder of Perkins Catering Co. From Petaluma roots to Michelin-recommended chef at Nick's Cove, Austin brings restaurant-quality cuisine to every event.",
  alternates: { canonical: "https://perkins-catering.up.railway.app/bio" },
};

const timeline = [
  {
    year: "Early Years",
    title: "Petaluma Roots",
    description:
      "A native of Petaluma, Austin grew up enjoying the bounty of Sonoma and Marin counties. He took to cooking early in a family that enjoyed the pleasures of food, learning many of his first cooking lessons from his father.",
  },
  {
    year: "Culinary School",
    title: "Tante Marie's Cooking School",
    description:
      "His first jobs in the restaurant business were in the front of house, but he always found himself enticed by the kitchen. He attended Tante Marie's cooking school in San Francisco, learning under famed culinary instructor, author, and celebrity Mary Risley.",
  },
  {
    year: "Fine Dining",
    title: "Cyrus Restaurant, Healdsburg",
    description:
      "Armed with the knowledge from the legendary culinary school, he set out into the restaurant and fine dining world, working in some of the most famed kitchens in the Bay Area, including the two-Michelin-starred Cyrus restaurant in Healdsburg, California.",
  },
  {
    year: "2011",
    title: "Executive Chef at Nick's Cove",
    description:
      "A quick study, he took a sous-chef job at the Pat Kuleto-designed Nick's Cove in Marshall, California, learning under Bay Area legend Chef Mark Franz. In 2011, he was promoted to Executive Chef, where he was recommended by the Michelin Guide, named 'Best Of' four times by the Pacific Sun, and mentioned in Food + Wine, Men's Journal, 7x7, and San Francisco magazine.",
  },
  {
    year: "2015",
    title: "1263 Wine",
    description:
      "Austin enjoys fine wine, and in 2015, along with wine-making partner Shea Lehman, became the owner and operator of his own wine label, 1263 Wine.",
  },
  {
    year: "Today",
    title: "Perkins Catering Co.",
    description:
      "Austin has coordinated events from casual to the most decadent coursed meals. He celebrates the bounty of local farms and maintains close relationships with farmers and artisan producers all over the North Bay Area. When he's not in the kitchen, he enjoys family, wood-working, golf, wine, and spending time with his wife, Kelly.",
  },
];

export default function BioPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Austin Perkins",
          jobTitle: "Executive Chef & Owner",
          worksFor: {
            "@type": "Organization",
            name: "Perkins Catering Co.",
          },
          description:
            "Executive Chef and Owner of Perkins Catering Co. Michelin-recommended chef with roots in Petaluma and experience at Cyrus and Nick's Cove.",
          knowsAbout: ["Catering", "Farm-to-table cuisine", "Wine country cuisine"],
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            Executive Chef & Owner
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Austin Perkins
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            A culinary journey from Petaluma roots to Michelin-recommended chef,
            bringing restaurant-quality cuisine to every event.
          </p>
        </div>
      </section>

      {/* Portrait + intro */}
      <Section background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/bio/chef-austin-perkins.png"
                alt="Executive Chef Austin Perkins"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-sage/10 -z-10" />
          </div>
          <div>
            <SectionHeading eyebrow="The Story" title="A Chef's Journey" />
            <p className="text-charcoal/80 leading-relaxed mb-4">
              A native of Petaluma, Austin grew up enjoying the bounty of Sonoma
              and Marin counties. He took to cooking early in a family that
              enjoyed the pleasures of food, and Austin learned many of his first
              cooking lessons from his father, who enjoyed the kitchen.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              Along a meandering path to the kitchen, his first jobs in the
              restaurant business were in the front of house. He always found
              himself enticed by the kitchen and the food. His next stop on his
              culinary journey took him to Tante Marie&rsquo;s cooking school in
              San Francisco where he learned under famed culinary instructor,
              author, and celebrity Mary Risley.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-8">
              Armed with the knowledge learned at the legendary culinary school,
              he set out into the restaurant and fine dining world. The next few
              years saw him working in some of the most famed kitchens in the Bay
              Area, including the two-Michelin-starred Cyrus restaurant in
              Healdsburg, California.
            </p>
            <Button href="/inquire">
              Work with Austin
            </Button>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section background="white">
        <SectionHeading
          eyebrow="Career Highlights"
          title="The Path to Perkins Catering Co."
          center
        />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row gap-8 mb-12 last:mb-0 ${
                  idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-sage -translate-x-1/2 mt-2 z-10 ring-4 ring-cream" />

                {/* Content */}
                <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-8">
                  <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                    <p className="heading-uppercase text-xs text-sage mb-2">
                      {item.year}
                    </p>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABanner
        title="Experience the Difference"
        subtitle="Chef Austin Perkins personally crafts every menu. Start your inquiry today."
      />
    </>
  );
}
