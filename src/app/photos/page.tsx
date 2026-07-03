import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Photo Gallery — Events & Cuisine",
  description:
    "Browse photos of Perkins Catering Co.'s catered events, beautifully plated dishes, and memorable celebrations across Napa, Sonoma, and Marin counties.",
  alternates: { canonical: "https://perkins-catering-production.up.railway.app/photos" },
};

const galleryImages = [
  { src: "/images/gallery/gallery-01.jpg", alt: "Catered event dish by Perkins Catering Co." },
  { src: "/images/gallery/gallery-02.jpg", alt: "Beautifully plated catering presentation" },
  { src: "/images/gallery/gallery-03.jpg", alt: "Perkins Catering Co. event cuisine" },
  { src: "/images/gallery/gallery-04.jpg", alt: "Catered wedding dish with local ingredients" },
  { src: "/images/gallery/gallery-05.jpg", alt: "Elegant catering setup by Perkins Catering" },
  { src: "/images/gallery/gallery-06.jpg", alt: "Farm-to-table catering presentation" },
  { src: "/images/gallery/gallery-07.jpg", alt: "Perkins Catering Co. plated dish" },
  { src: "/images/gallery/gallery-08.jpg", alt: "Catered event food by Perkins Catering Co." },
];

export default function PhotosPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Perkins Catering Co. Photo Gallery",
          image: galleryImages.map((img) => ({
            "@type": "ImageObject",
            contentUrl: `https://perkins-catering-production.up.railway.app${img.src}`,
            description: img.alt,
          })),
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            A Visual Feast
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Photo Gallery
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            A glimpse of the events we&rsquo;ve catered and the dishes
            we&rsquo;ve crafted across wine country.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <Section background="cream">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Want Your Event to Look This Good?"
        subtitle="Let's create something beautiful together. Start your inquiry today."
      />
    </>
  );
}
