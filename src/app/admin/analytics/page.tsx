import { getAnalyticsEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  let events: Awaited<ReturnType<typeof getAnalyticsEvents>> = [];
  try {
    events = await getAnalyticsEvents();
  } catch (error) {
    console.error("[admin/analytics] Failed to fetch events:", error);
  }
  const pageviews = events.filter((e) => e.type === "pageview");

  // Pageviews over the last 14 days
  const days: { label: string; count: number }[] = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const count = pageviews.filter((e) => {
      const t = new Date(e.timestamp);
      return t >= d && t < next;
    }).length;
    days.push({
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count,
    });
  }
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  // Top pages
  const pageCounts = new Map<string, number>();
  for (const e of pageviews) {
    pageCounts.set(e.path, (pageCounts.get(e.path) ?? 0) + 1);
  }
  const topPages = [...pageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const maxPage = Math.max(1, ...topPages.map((p) => p[1]));

  // Top referrers
  const refCounts = new Map<string, number>();
  for (const e of pageviews) {
    const ref = e.referrer || "(direct)";
    refCounts.set(ref, (refCounts.get(ref) ?? 0) + 1);
  }
  const topReferrers = [...refCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold mb-1">Analytics</h1>
        <p className="text-stone text-sm">
          {pageviews.length} total pageviews across {pageCounts.size} unique pages.
        </p>
      </div>

      {/* Pageviews over time */}
      <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold mb-6">
          Pageviews — Last 14 Days
        </h2>
        <div className="flex items-end justify-between gap-1 h-48">
          {days.map((d) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full bg-sage rounded-t transition-all hover:bg-sage-dark relative"
                  style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count > 0 ? "4px" : "0" }}
                  title={`${d.count} views`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-stone opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                </div>
              </div>
              <span className="text-[9px] text-stone hidden sm:block">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold mb-4">Top Pages</h2>
          {topPages.length === 0 ? (
            <p className="text-sm text-stone py-8 text-center">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPages.map(([path, count]) => (
                <li key={path}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-mono text-xs text-charcoal truncate mr-2">
                      {path}
                    </span>
                    <span className="text-stone flex-shrink-0">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-cream-dark overflow-hidden">
                    <div
                      className="h-full bg-sage rounded-full"
                      style={{ width: `${(count / maxPage) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top referrers */}
        <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold mb-4">Referrers</h2>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-stone py-8 text-center">No data yet.</p>
          ) : (
            <ul className="space-y-2">
              {topReferrers.map(([ref, count]) => (
                <li
                  key={ref}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <span className="text-charcoal truncate mr-2">
                    {ref === "(direct)" ? (
                      <span className="text-stone">(Direct / None)</span>
                    ) : (
                      <a
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage hover:text-sage-dark truncate"
                      >
                        {ref}
                      </a>
                    )}
                  </span>
                  <span className="text-stone flex-shrink-0 font-medium">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
