import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { SITE_URL } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "Perkins Catering",
    description:
      "Farm-to-table catering in Napa, Sonoma, and Marin counties. Restaurant-quality dishes for weddings, corporate events, and private gatherings.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#1a1a1a",
    orientation: "portrait-primary",
    categories: ["food", "business", "lifestyle"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    scope: SITE_URL,
  };
}
