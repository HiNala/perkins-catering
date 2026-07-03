import type { MetadataRoute } from "next";

const SITE_URL = "https://perkins-catering-production.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/bio",
    "/photos",
    "/events",
    "/summer",
    "/inquire",
    "/testimonials",
    "/cost",
    "/resources",
    "/contact",
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/inquire" || route === "/menu" ? 0.9 : 0.7,
  }));
}
