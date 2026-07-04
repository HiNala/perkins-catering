"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LeadCapturePopup } from "./LeadCapturePopup";

/**
 * Renders the public site Header and Footer only on public routes.
 * Auth routes (/login, /signup) and admin routes (/admin) render their own chrome.
 * Lead capture popup is shown on all public pages.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/admin");

  if (isStandaloneRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <LeadCapturePopup />
    </>
  );
}
