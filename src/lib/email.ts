/**
 * Email service using Resend.
 * Sends notification emails when inquiries/quotes are submitted.
 * Falls back gracefully if RESEND_API_KEY is not configured.
 */

import { business } from "./business";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: EmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No API key configured — log and return success so the form doesn't error
    console.log("[email] RESEND_API_KEY not set — skipping email send");
    console.log("[email] Would send:", { to, subject });
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Perkins Catering <onboarding@resend.dev>",
        to,
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[email] Resend API error:", res.status, errorBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Failed to send email:", err);
    return false;
  }
}

export function buildInquiryEmail(data: {
  formType: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  serviceStyle: string;
  dietaryRestrictions: string;
  budget: string;
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
}): { subject: string; html: string } {
  const subject = `New ${data.formType === "quote" ? "Quote Request" : "Inquiry"} from ${data.firstName} ${data.lastName}`;

  const rows = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Event Type", data.eventType],
    ["Event Date", data.eventDate],
    ["Guest Count", data.guestCount],
    ["Location", data.location || "Not provided"],
    ["Service Style", data.serviceStyle || "Not specified"],
    ["Budget", data.budget || "Not specified"],
    ["Dietary Restrictions", data.dietaryRestrictions || "None"],
    ["Newsletter", data.newsletter ? "Yes" : "No"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #5c7560; font-size: 24px; margin-bottom: 20px;">
        New ${data.formType === "quote" ? "Quote Request" : "Inquiry"}
      </h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8; font-weight: bold; width: 40%;">${label}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8;">${value}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        data.message
          ? `<h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 10px;">Message</h2>
             <p style="background: #faf8f5; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.message}</p>`
          : ""
      }
      <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 24px 0;" />
      <p style="color: #8a8580; font-size: 14px;">
        This inquiry was submitted via ${business.url}
      </p>
    </div>
  `;

  return { subject, html };
}
