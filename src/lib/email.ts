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
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Perkins Catering <onboarding@resend.dev>";

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
        from: fromEmail,
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
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8; font-weight: bold; width: 40%;">${esc(label)}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8;">${esc(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        data.message
          ? `<h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 10px;">Message</h2>
             <p style="background: #faf8f5; padding: 16px; border-radius: 8px; line-height: 1.6;">${esc(data.message)}</p>`
          : ""
      }
      <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 24px 0;" />
      <p style="color: #8a8580; font-size: 14px;">
        This inquiry was submitted via ${esc(business.url)}
      </p>
    </div>
  `;

  return { subject, html };
}

export function buildPurchaseEmail(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  mealTitle: string;
  quantity: number;
  unitPrice: number;
  total: number;
  pickupDate: string;
  pickupLocation: string;
  deliveryRequested: boolean;
  notes: string;
}): { subject: string; html: string } {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const subject = `New Order: ${data.quantity}x ${data.mealTitle} from ${data.customerName}`;

  const rows = [
    ["Customer", data.customerName],
    ["Email", data.customerEmail],
    ["Phone", data.customerPhone || "Not provided"],
    ["Meal", data.mealTitle],
    ["Quantity", String(data.quantity)],
    ["Unit Price", `$${data.unitPrice.toFixed(2)}`],
    ["Total", `$${data.total.toFixed(2)}`],
    ["Pickup Date", data.pickupDate],
    ["Pickup Location", data.pickupLocation],
    ["Delivery", data.deliveryRequested ? "Yes (+$30.00)" : "No"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #5c7560; font-size: 24px; margin-bottom: 20px;">
        New Summer Meal Order
      </h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8; font-weight: bold; width: 40%;">${esc(label)}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e0d8;">${esc(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        data.notes
          ? `<h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 10px;">Notes</h2>
             <p style="background: #faf8f5; padding: 16px; border-radius: 8px; line-height: 1.6;">${esc(data.notes)}</p>`
          : ""
      }
      <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 24px 0;" />
      <p style="color: #8a8580; font-size: 14px;">
        This order was placed via ${esc(business.url)}/summer
      </p>
    </div>
  `;

  return { subject, html };
}

export function buildClientConfirmationEmail(data: {
  firstName: string;
  formType: string;
}): { subject: string; html: string } {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const isInquiry = data.formType !== "quote" && data.formType !== "order";
  const subject = isInquiry
    ? "We received your inquiry — Perkins Catering Co."
    : data.formType === "quote"
    ? "We received your quote request — Perkins Catering Co."
    : "We received your order — Perkins Catering Co.";

  const heading = isInquiry
    ? "Thank you for your inquiry!"
    : data.formType === "quote"
    ? "Thank you for your quote request!"
    : "Thank you for your order!";

  const bodyText = isInquiry
    ? "Chef Austin will personally review your event details and get back to you within 24 hours. We're excited to help craft the perfect catering experience for your special occasion."
    : data.formType === "quote"
    ? "We'll prepare a detailed catering proposal based on your requirements and send it to you within 24-48 hours. If you have any questions in the meantime, don't hesitate to reach out."
    : "We've received your summer meal order and will confirm pickup details shortly. If you have any questions, please call us at " + business.phone + ".";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #5c7560; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #faf8f5; font-size: 22px; margin: 0;">Perkins Catering Co.</h1>
        <p style="color: #faf8f5; font-size: 14px; opacity: 0.8; margin: 4px 0 0;">Farm-to-table catering in wine country</p>
      </div>
      <div style="padding: 24px; background: #faf8f5; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 16px;">${esc(heading)}</h2>
        <p style="color: #3a3a3a; line-height: 1.6; margin-bottom: 16px;">
          Hi ${esc(data.firstName)},
        </p>
        <p style="color: #3a3a3a; line-height: 1.6; margin-bottom: 24px;">
          ${bodyText}
        </p>
        <div style="background: #fff; border: 1px solid #e5e0d8; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #8a8580; font-size: 13px; margin: 0 0 8px;">Need to reach us?</p>
          <p style="margin: 0; font-size: 14px;">
            <strong>Phone:</strong> ${esc(business.phone)}<br/>
            <strong>Email:</strong> ${esc(business.email)}
          </p>
        </div>
        <p style="color: #8a8580; font-size: 13px; margin: 0;">
          Warm regards,<br/>Chef Austin Perkins & the Perkins Catering Co. team
        </p>
      </div>
    </div>
  `;

  return { subject, html };
}
