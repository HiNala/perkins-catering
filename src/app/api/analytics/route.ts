import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveAnalyticsEvent, getAnalyticsSummary, type AnalyticsRecord } from "@/lib/db";
import { getSession } from "@/lib/dal";

const analyticsSchema = z.object({
  type: z.enum(["pageview", "click", "conversion"]),
  path: z.string(),
  referrer: z.string().nullable().optional(),
  timestamp: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = analyticsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid analytics event" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const id = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const record: AnalyticsRecord = {
      id,
      type: data.type,
      path: data.path,
      referrer: data.referrer ?? null,
      timestamp: data.timestamp,
    };

    await saveAnalyticsEvent(record);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[api/analytics] Error:", error);
    return NextResponse.json(
      { error: "Failed to record analytics event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[api/analytics] GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
