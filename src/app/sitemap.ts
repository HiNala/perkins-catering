import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/db";

const SITE_URL = "https://perkins-catering-production.up.railway.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/menu",
    "/bio",
    "/photos",
    "/events",
    "/summer",
    "/blog",
    "/inquire",
    "/testimonials",
    "/cost",
    "/resources",
    "/contact",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1.0
        : route === "/inquire" || route === "/menu"
          ? 0.9
          : 0.7,
  }));

  // Blog post entries (graceful if DB is unavailable at build time)
  try {
    const posts = await getBlogPosts();
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
    return [...staticEntries, ...blogEntries];
  } catch {
    return staticEntries;
  }
}
