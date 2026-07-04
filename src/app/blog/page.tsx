import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/db";
import { Section, SectionHeading } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbItems } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";
import { estimateReadTime, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Blog — Catering Insights from Wine Country",
  description:
    "Catering tips, seasonal menus, wine pairings, and event planning advice from Executive Chef Austin Perkins of Perkins Catering Co.",
  path: "/blog",
});

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  // Featured post is the most recent
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Perkins Catering Co. Blog",
            description:
              "Catering tips, seasonal menus, wine pairings, and event planning advice from Executive Chef Austin Perkins.",
            url: `${SITE_URL}/blog`,
            publisher: {
              "@type": "Organization",
              name: "Perkins Catering Co.",
              url: SITE_URL,
            },
          },
          breadcrumbJsonLd(
            breadcrumbItems([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ])
          ),
        ]}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-sage text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-sm text-sage-light mb-4">
            From the Kitchen
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            The Perkins Catering Blog
          </h1>
          <p className="text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Catering tips, seasonal menus, wine pairings, and stories from
            catering events across Napa, Sonoma, and Marin.
          </p>
        </div>
      </section>

      <Section background="cream">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <SectionHeading
              title="No Posts Yet"
              subtitle="Check back soon for catering insights and seasonal menu inspiration."
              center
            />
          </div>
        ) : (
          <>
            {/* Featured post — large card */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group rounded-2xl bg-white border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col md:flex-row mb-12"
              >
                {featured.coverImage && (
                  <div className="relative aspect-[16/10] md:aspect-auto md:w-1/2 overflow-hidden">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8 lg:p-10 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-sage/10 text-sage rounded-full">
                      Featured
                    </span>
                    <span className="text-sm text-stone">
                      {formatDate(featured.publishedAt)}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold mb-3 group-hover:text-sage transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-base text-stone leading-relaxed line-clamp-3 mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-stone">
                    <span>By {featured.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{estimateReadTime(featured.content)} min read</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts — grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl bg-white border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  >
                    {post.coverImage && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm text-sage font-medium uppercase tracking-wider mb-2">
                        {formatDate(post.publishedAt, { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <h2 className="font-heading text-xl font-semibold mb-3 group-hover:text-sage transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-base text-stone leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-sm text-stone">
                        <span>By {post.author}</span>
                        <span aria-hidden="true">·</span>
                        <span>{estimateReadTime(post.content)} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      <CTABanner />
    </>
  );
}
