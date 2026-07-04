import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { menu, sampleMenus } from "@/lib/menu";
import { pageMetadata, breadcrumbItems } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu — Seasonal Catering Menu",
  description:
    "Explore Perkins Catering Co.'s seasonal catering menu: salads, soups, appetizers, and entrées crafted with locally sourced ingredients. Every menu is hand-crafted for your event.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Menu",
            name: "Perkins Catering Co. Seasonal Menu",
            hasMenuSection: menu.map((cat) => ({
              "@type": "MenuSection",
              name: cat.title,
              hasMenuItem: cat.items.map((item) => ({
                "@type": "MenuItem",
                name: item.name,
                description: item.description,
              })),
            })),
          },
          breadcrumbJsonLd(
            breadcrumbItems([
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
            ])
          ),
        ]}
      />

      {/* Page header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            Seasonal · Local · Hand-Crafted
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Every menu is hand-crafted by our chefs for each and every event.
            We use only in-season produce and the best available local proteins
            to make every event truly one of a kind.
          </p>
        </div>
      </section>

      {/* Menu categories */}
      {menu.map((category, idx) => (
        <Section
          key={category.title}
          background={idx % 2 === 0 ? "cream" : "white"}
        >
          <SectionHeading
            eyebrow={`Course ${idx + 1}`}
            title={category.title}
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
            {category.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-4 border-b border-border"
              >
                <h3 className="font-heading text-lg font-semibold text-charcoal whitespace-nowrap">
                  {item.name}
                </h3>
                <span className="hidden sm:block flex-1 border-b border-dotted border-stone-light/40 translate-y-[-4px]" />
                <p className="text-sm text-stone italic">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}

      {/* Sample menus */}
      <Section background="charcoal">
        <SectionHeading
          eyebrow="Past Events"
          title="Sample Menus"
          subtitle="A glimpse of menus we've crafted for past events — from intimate dinners to grand celebrations."
          center
          light
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sampleMenus.map((sm) => (
            <div
              key={sm.title}
              className="rounded-2xl bg-charcoal-light/50 border border-cream/10 p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                {sm.title}
              </h3>
              <p className="text-sm text-cream/60 mb-6">{sm.description}</p>
              <ul className="space-y-4">
                {sm.courses.map((course) => (
                  <li key={course.name} className="border-b border-cream/10 pb-4 last:border-0">
                    <p className="font-heading text-base font-medium text-cream">
                      {course.name}
                    </p>
                    {course.description && (
                      <p className="text-sm text-cream/50 italic mt-1">
                        {course.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Every Menu Is One of a Kind"
          />
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            At Perkins Catering Co. our goal is to meet the needs of any
            guest&rsquo;s request. Menus are hand-crafted by our chefs for each
            and every event. We use only in-season produce and the best available
            local proteins to make every event truly one of a kind.
          </p>
          <Button href="/inquire" size="lg">
            Request a Custom Menu
          </Button>
        </div>
      </Section>

      {/* Inline lead capture */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <SectionHeading
              eyebrow="Custom Menu"
              title="Want a Menu Crafted Just for You?"
              subtitle="These samples are just a starting point. Tell us about your event and Chef Austin will design a personalized menu using the freshest seasonal ingredients."
            />
          </div>
          <QuickLeadForm
            title="Request a Custom Menu"
            subtitle="We'll call you within 24 hours to start crafting your perfect menu."
          />
        </div>
      </Section>

      <CTABanner
        title="Hungry for More?"
        subtitle="These are just samples — your menu will be crafted specifically for your event and preferences."
      />
    </>
  );
}
