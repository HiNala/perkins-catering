import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { Analytics } from "@/components/Analytics";
import { SITE_URL } from "@/lib/config";
import { business } from "@/lib/business";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perkins Catering Co. — Farm-to-Table Catering in Sonoma County",
    template: "%s | Perkins Catering Co.",
  },
  description:
    "Perkins Catering Co. brings restaurant-quality, locally sourced catering to Napa, Sonoma, and Marin counties. Led by Executive Chef Austin Perkins, we craft custom menus for weddings, corporate events, and private gatherings.",
  keywords: [
    "catering Sonoma County",
    "catering Napa County",
    "catering Marin County",
    "wedding catering Bay Area",
    "corporate catering",
    "farm to table catering",
    "Austin Perkins chef",
    "Perkins Catering Co",
    "private chef Sonoma",
    "event catering wine country",
    "wedding caterer Napa",
    "wedding caterer Sonoma",
    "corporate catering Marin",
    "catering Santa Rosa",
    "catering Petaluma",
    "catering Healdsburg",
    "catering Glen Ellen",
    "wine country catering",
    "Sonoma County caterer",
    "Napa Valley catering",
  ],
  authors: [{ name: "Austin Perkins" }],
  creator: "Perkins Catering Co.",
  publisher: "Perkins Catering Co.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Perkins Catering Co.",
    title: "Perkins Catering Co. — Farm-to-Table Catering in Sonoma County",
    description:
      "Restaurant-quality, locally sourced catering for weddings, corporate events, and private gatherings in Napa, Sonoma, and Marin counties.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Perkins Catering Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perkins Catering Co. — Farm-to-Table Catering in Sonoma County",
    description:
      "Restaurant-quality, locally sourced catering for weddings, corporate events, and private gatherings in Napa, Sonoma, and Marin counties.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Sonoma County, California",
    "geo.position": `${business.geo.latitude};${business.geo.longitude}`,
    "ICBM": `${business.geo.latitude}, ${business.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
