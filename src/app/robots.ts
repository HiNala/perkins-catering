import type { MetadataRoute } from "next";

const SITE_URL = "https://perkins-catering-production.up.railway.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/login", "/signup"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
