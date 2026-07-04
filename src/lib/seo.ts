/**
 * Page metadata helper — standardizes openGraph, twitter, and canonical
 * across all pages. Reduces boilerplate and ensures consistency.
 */
import type { Metadata } from "next";
import { SITE_URL } from "./config";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string; // e.g. "/menu", "/bio"
  image?: string; // defaults to og-image.png
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

/**
 * Build a complete Metadata object for a page with openGraph, twitter,
 * and canonical URL — all using the site's default OG image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og-image.png",
  type = "website",
  publishedTime,
  authors,
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "Perkins Catering Co.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * Build breadcrumb data for a page.
 */
export function breadcrumbItems(items: { name: string; path: string }[]) {
  return items.map((item) => ({
    name: item.name,
    url: `${SITE_URL}${item.path}`,
  }));
}
