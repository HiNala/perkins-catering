import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveQuote, type InquiryRecord } from "@/lib/db";
import { sendEmail, buildInquiryEmail } from "@/lib/email";
import { business } from "@/lib/business";

const quoteSchema = z.object({
  formType: z.string(),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  location: z.string().optional().default(""),
  serviceStyle: z.string().optional().default(""),
  dietaryRestrictions: z.string().optional().default(""),
  budget: z.string().min(1, "Budget range is required for quotes"),
  message: z.string().optional().default(""),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  newsletter: z.boolean().default(true),
  submittedAt: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const id = `quote_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Persist to DB
    const record: InquiryRecord = {
      id,
      ...data,
      newsletter: data.newsletter,
    };
    await saveQuote(record);

    // Send email notification
    const { subject, html } = buildInquiryEmail(data);
    await sendEmail({
      to: business.email,
      subject,
      html,
      replyTo: data.email,
    });

    return NextResponse.json({
      success: true,
      id,
      message: "Quote request received successfully",
    });
  } catch (error) {
    console.error("[api/quote] Error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
