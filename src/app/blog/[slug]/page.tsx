import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/db";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getBlogPost>> = null;
  try {
    post = await getBlogPost(slug);
  } catch {
    return { title: "Blog Post" };
  }
  if (!post) return { title: "Blog Post" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getBlogPost>> = null;
  try {
    post = await getBlogPost(slug);
  } catch (error) {
    console.error("[blog/[slug]] Failed to fetch post:", error);
    notFound();
  }
  if (!post || post.status !== "published") notFound();

  // Fetch related posts (latest 3, excluding current)
  let related: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    related = (await getBlogPosts()).filter((p) => p.slug !== slug).slice(0, 3);
  } catch {
    related = [];
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Person", name: post.author },
          url: `${SITE_URL}/blog/${post.slug}`,
          image: post.coverImage || undefined,
        }}
      />

      {/* Hero */}
      <article>
        <section className="pt-32 pb-12 bg-charcoal text-cream">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="text-sm text-sage-light hover:text-sage transition-colors mb-6 inline-block"
            >
              ← All Posts
            </Link>
            <p className="text-xs text-sage-light uppercase tracking-wider mb-4">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.author}
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-cream/70 leading-relaxed">{post.excerpt}</p>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full h-[40vh] min-h-[300px] max-h-[500px] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <Section background="cream">
          <div className="mx-auto max-w-3xl">
            <Markdown content={post.content} />

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-stone">
                Written by {post.author}
              </p>
              <Button href="/inquire" variant="outline" size="sm">
                Plan Your Event
              </Button>
            </div>
          </div>
        </Section>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <Section background="white">
          <h2 className="font-heading text-2xl font-semibold mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp) => (
              <Link
                key={rp.id}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl bg-cream border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
              >
                {rp.coverImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-sage uppercase tracking-wider mb-2">
                    {new Date(rp.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="font-heading text-lg font-semibold group-hover:text-sage transition-colors line-clamp-2">
                    {rp.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABanner />
    </>
  );
}
