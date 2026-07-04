import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/db";
import { Section, SectionHeading } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Catering Insights from Wine Country",
  description:
    "Catering tips, seasonal menus, wine pairings, and event planning advice from Executive Chef Austin Perkins of Perkins Catering Co.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="heading-uppercase text-xs text-sage-light mb-4">
            From the Kitchen
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">
            The Perkins Catering Blog
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                  <p className="text-xs text-sage font-medium uppercase tracking-wider mb-2">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-heading text-xl font-semibold mb-2 group-hover:text-sage transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-stone leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-stone mt-4">
                    By {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <CTABanner />
    </>
  );
}
