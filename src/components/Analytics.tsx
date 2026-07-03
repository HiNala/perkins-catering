"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Self-hosted analytics — tracks pageviews client-side.
 * Sends pageview events to the /api/analytics endpoint.
 * No third-party scripts; fully self-contained.
 */
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackPageview = async () => {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "pageview",
            path: url,
            referrer: document.referrer || null,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // Silently fail — analytics should never break the page
      }
    };

    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
