import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/db";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/config";
import { estimateReadTime, formatDate } from "@/lib/utils";

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

  const readTime = estimateReadTime(post.content);

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
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: post.author },
            url: `${SITE_URL}/blog/${post.slug}`,
            image: post.coverImage || undefined,
            publisher: {
              "@type": "Organization",
              name: "Perkins Catering Co.",
              url: SITE_URL,
            },
          },
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <article>
        <section className="pt-32 pb-12 bg-charcoal text-cream">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="text-base text-sage-light hover:text-white transition-colors mb-6 inline-block"
            >
              ← All Posts
            </Link>
            <div className="flex items-center gap-3 mb-4 text-sm text-sage-light uppercase tracking-wider">
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readTime} min read</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-cream/70 leading-relaxed">{post.excerpt}</p>
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
            {/* Author info bar */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-lg font-semibold text-sage">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-heading text-lg font-semibold">{post.author}</p>
                <p className="text-sm text-stone">Executive Chef & Owner</p>
              </div>
            </div>

            <Markdown content={post.content} />

            {/* Post footer CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="rounded-2xl bg-sage/5 border border-sage/20 p-8 text-center">
                <h3 className="font-heading text-2xl font-semibold mb-2">
                  Planning an Event?
                </h3>
                <p className="text-base text-stone leading-relaxed mb-6">
                  Let Chef Austin craft a custom menu for your wedding, corporate
                  event, or private gathering in Napa, Sonoma, or Marin.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/inquire" size="md">
                    Start an Inquiry
                  </Button>
                  <Button href="/menu" variant="outline" size="md">
                    View Our Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <Section background="white">
          <h2 className="font-heading text-2xl font-semibold mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-sage uppercase tracking-wider mb-2">
                    {formatDate(rp.publishedAt, { month: "short", day: "numeric" })}
                  </p>
                  <h3 className="font-heading text-lg font-semibold group-hover:text-sage transition-colors line-clamp-2 mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-stone leading-relaxed line-clamp-2 flex-1">
                    {rp.excerpt}
                  </p>
                  <p className="text-sm text-stone mt-3">
                    {estimateReadTime(rp.content)} min read
                  </p>
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
