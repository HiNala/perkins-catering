import { NextResponse } from "next/server";
import { getInquiries, getQuotes } from "@/lib/db";

/**
 * Returns recent notifications for the admin dashboard.
 * "New" = submitted within the last 24 hours.
 * Critical notifications (leads, orders, quotes) get a red blinking dot.
 */
export async function GET() {
  try {
    const [inquiries, quotes] = await Promise.all([
      getInquiries(),
      getQuotes(),
    ]);

    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    const all = [...inquiries, ...quotes].sort((a, b) =>
      a.submittedAt < b.submittedAt ? 1 : -1
    );

    const newItems = all.filter(
      (item) => new Date(item.submittedAt).getTime() > twentyFourHoursAgo
    );

    const notifications = newItems.slice(0, 10).map((item) => {
      const isNew = new Date(item.submittedAt).getTime() > twentyFourHoursAgo;
      const isOrder = item.formType === "order";
      return {
        id: item.id,
        type: isOrder ? "order" : item.formType === "quote" ? "quote" : "inquiry",
        title: isOrder
          ? `Order from ${item.firstName} ${item.lastName}`
          : `${item.formType === "quote" ? "Quote Request" : "Inquiry"} from ${item.firstName} ${item.lastName}`,
        description: `${item.eventType} · ${item.eventDate} · ${item.guestCount} guests`,
        timestamp: item.submittedAt,
        isNew,
        critical: true, // All leads/orders/quotes are critical
        href: "/admin/inquiries",
      };
    });

    return NextResponse.json({
      notifications,
      unreadCount: newItems.length,
      hasNew: newItems.length > 0,
    });
  } catch (error) {
    console.error("[api/notifications] Error:", error);
    return NextResponse.json(
      { notifications: [], unreadCount: 0, hasNew: false },
      { status: 200 }
    );
  }
}
