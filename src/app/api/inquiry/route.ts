import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveInquiry, type InquiryRecord } from "@/lib/db";
import { sendEmail, buildInquiryEmail, buildClientConfirmationEmail } from "@/lib/email";
import { business } from "@/lib/business";

const inquirySchema = z.object({
  formType: z.string(),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.string().min(1, "Guest count is required").refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
    "Guest count must be a positive number"
  ),
  location: z.string().optional().default(""),
  serviceStyle: z.string().optional().default(""),
  dietaryRestrictions: z.string().optional().default(""),
  budget: z.string().optional().default(""),
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
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const id = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Persist to DB
    const record: InquiryRecord = {
      id,
      ...data,
      newsletter: data.newsletter,
    };
    await saveInquiry(record);

    // Send email notification to owner
    const { subject, html } = buildInquiryEmail(data);
    const emailSent = await sendEmail({
      to: business.email,
      subject,
      html,
      replyTo: data.email,
    });

    if (!emailSent) {
      console.error("[api/inquiry] Saved to DB but owner email notification failed");
    }

    // Send confirmation email to client
    const clientEmail = buildClientConfirmationEmail({
      firstName: data.firstName,
      formType: data.formType,
    });
    const clientEmailSent = await sendEmail({
      to: data.email,
      subject: clientEmail.subject,
      html: clientEmail.html,
    });

    if (!clientEmailSent) {
      console.error("[api/inquiry] Saved to DB but client confirmation email failed");
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Inquiry received successfully",
    });
  } catch (error) {
    console.error("[api/inquiry] Error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
