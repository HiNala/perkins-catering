import Link from "next/link";
import {
  getAnalyticsSummary,
  getInquiries,
  getQuotes,
  getBlogPostsAdmin,
} from "@/lib/db";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <div
      className={`rounded-xl border p-6 shadow-sm transition-all ${
        accent
          ? "bg-sage text-white border-sage"
          : "bg-white border-border hover:shadow-md"
      } ${href ? "hover:-translate-y-0.5" : ""}`}
    >
      <p
        className={`heading-uppercase text-xs mb-2 ${
          accent ? "text-white/80" : "text-stone"
        }`}
      >
        {label}
      </p>
      <p className="font-heading text-4xl font-semibold">{value}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

export default async function AdminDashboard() {
  let summary: Awaited<ReturnType<typeof getAnalyticsSummary>> = {
    totalPageviews: 0,
    uniquePaths: 0,
    recentEvents: [],
  };
  let inquiries: Awaited<ReturnType<typeof getInquiries>> = [];
  let quotes: Awaited<ReturnType<typeof getQuotes>> = [];
  let posts: Awaited<ReturnType<typeof getBlogPostsAdmin>> = [];

  try {
    [summary, inquiries, quotes, posts] = await Promise.all([
      getAnalyticsSummary(),
      getInquiries(),
      getQuotes(),
      getBlogPostsAdmin(),
    ]);
  } catch (error) {
    console.error("[admin] Failed to fetch dashboard data:", error);
  }

  const recentInquiries = [...inquiries, ...quotes]
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold mb-1">Dashboard</h1>
        <p className="text-stone text-sm">
          Overview of site activity and submissions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pageviews"
          value={summary.totalPageviews}
          href="/admin/analytics"
          accent
        />
        <StatCard
          label="Unique Pages"
          value={summary.uniquePaths}
          href="/admin/analytics"
        />
        <StatCard
          label="Inquiries"
          value={inquiries.length}
          href="/admin/inquiries"
        />
        <StatCard
          label="Quote Requests"
          value={quotes.length}
          href="/admin/inquiries?type=quote"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent events */}
        <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold">Recent Activity</h2>
            <Link
              href="/admin/analytics"
              className="text-xs text-sage hover:text-sage-dark font-medium"
            >
              View all →
            </Link>
          </div>
          {summary.recentEvents.length === 0 ? (
            <p className="text-sm text-stone py-8 text-center">
              No analytics events yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {summary.recentEvents.slice(0, 8).map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide bg-sage/10 text-sage flex-shrink-0">
                      {event.type}
                    </span>
                    <span className="text-charcoal truncate font-mono text-xs">
                      {event.path}
                    </span>
                  </div>
                  <span className="text-stone text-xs flex-shrink-0 ml-2">
                    {new Date(event.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold">Recent Submissions</h2>
            <Link
              href="/admin/inquiries"
              className="text-xs text-sage hover:text-sage-dark font-medium"
            >
              View all →
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-stone py-8 text-center">
              No inquiries or quotes yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentInquiries.map((inq) => (
                <li
                  key={inq.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-charcoal truncate">
                      {inq.firstName} {inq.lastName}
                    </p>
                    <p className="text-xs text-stone truncate">
                      {inq.eventType} · {inq.eventDate}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide flex-shrink-0 ml-2 ${
                      inq.formType === "quote"
                        ? "bg-gold/15 text-gold"
                        : "bg-sage/10 text-sage"
                    }`}
                  >
                    {inq.formType}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Blog summary */}
      <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold">Blog Posts</h2>
          <Link
            href="/admin/blog"
            className="text-xs text-sage hover:text-sage-dark font-medium"
          >
            Manage →
          </Link>
        </div>
        <p className="text-sm text-stone">
          {posts.length} post{posts.length === 1 ? "" : "s"} total ·{" "}
          {posts.filter((p) => p.status === "published").length} published
        </p>
      </div>
    </div>
  );
}
