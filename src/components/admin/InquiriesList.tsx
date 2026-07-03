"use client";

import { useMemo, useState } from "react";
import type { InquiryRecord } from "@/lib/db";
import { cn } from "@/lib/utils";

type FilterType = "all" | "inquiry" | "quote";

export function InquiriesList({
  inquiries,
  quotes,
}: {
  inquiries: InquiryRecord[];
  quotes: InquiryRecord[];
}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const all = useMemo(
    () => [...inquiries, ...quotes].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
    [inquiries, quotes]
  );

  const filtered = useMemo(() => {
    return all.filter((item) => {
      if (filter !== "all" && item.formType !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${item.firstName} ${item.lastName} ${item.email} ${item.eventType} ${item.location} ${item.phone}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [all, filter, search]);

  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: all.length },
    { label: "Inquiries", value: "inquiry", count: inquiries.length },
    { label: "Quotes", value: "quote", count: quotes.length },
  ];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-1 bg-white rounded-lg border border-border p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                filter === f.value
                  ? "bg-sage text-white"
                  : "text-charcoal hover:bg-cream-dark"
              )}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search name, email, event type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:border-sage w-full sm:w-72"
          aria-label="Search inquiries"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white border border-border p-12 text-center">
          <p className="text-stone">No submissions match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl bg-white border border-border shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-cream-dark/40 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-charcoal">
                        {item.firstName} {item.lastName}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide",
                          item.formType === "quote"
                            ? "bg-gold/15 text-gold"
                            : "bg-sage/10 text-sage"
                        )}
                      >
                        {item.formType}
                      </span>
                    </div>
                    <p className="text-xs text-stone mt-1 truncate">
                      {item.eventType} · {item.eventDate} · {item.guestCount} guests
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-stone">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-stone-light mt-0.5">
                      {isExpanded ? "▲ Hide" : "▼ Details"}
                    </p>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border p-4 bg-cream-dark/20 animate-fade-in">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <Detail label="Email" value={item.email} link={`mailto:${item.email}`} />
                      <Detail label="Phone" value={item.phone || "—"} link={item.phone ? `tel:${item.phone}` : undefined} />
                      <Detail label="Event Type" value={item.eventType} />
                      <Detail label="Event Date" value={item.eventDate} />
                      <Detail label="Guest Count" value={item.guestCount} />
                      <Detail label="Location" value={item.location || "—"} />
                      <Detail label="Service Style" value={item.serviceStyle || "—"} />
                      <Detail label="Budget" value={item.budget || "—"} />
                      <Detail label="Dietary Restrictions" value={item.dietaryRestrictions || "—"} />
                      <Detail label="Newsletter" value={item.newsletter ? "Yes" : "No"} />
                    </dl>
                    {item.message && (
                      <div className="mt-4">
                        <p className="heading-uppercase text-xs text-sage mb-1">Message</p>
                        <p className="text-sm text-charcoal/80 leading-relaxed bg-white rounded-lg p-3 border border-border">
                          {item.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div>
      <dt className="text-xs text-stone heading-uppercase mb-0.5">{label}</dt>
      <dd className="text-charcoal">
        {link ? (
          <a href={link} className="text-sage hover:text-sage-dark">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
