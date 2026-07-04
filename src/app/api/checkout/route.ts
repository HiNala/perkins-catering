import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveInquiry, type InquiryRecord } from "@/lib/db";
import { sendEmail, buildPurchaseEmail } from "@/lib/email";
import { business } from "@/lib/business";

/**
 * Stripe Checkout API — creates a checkout session for summer meal orders.
 *
 * NOTE: Stripe is not yet live. When STRIPE_SECRET_KEY is not configured,
 * this endpoint returns a "coming soon" response so the UI can show
 * the appropriate message. Once Stripe is enabled, this will create
 * a real Checkout Session and return the URL.
 */

const checkoutSchema = z.object({
  mealId: z.string().min(1),
  mealTitle: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
  unitPrice: z.number().positive(),
  pickupDate: z.string().min(1),
  pickupLocation: z.string().min(1),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional().default(""),
  deliveryRequested: z.boolean().default(false),
  notes: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // If Stripe is not configured, return "coming soon"
    if (!stripeSecretKey) {
      // Still log the order intent to the database for the owner
      const id = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const record: InquiryRecord = {
        id,
        formType: "order",
        eventType: "Summer Meal Order",
        eventDate: data.pickupDate,
        guestCount: String(data.quantity),
        location: data.deliveryRequested ? "Delivery requested" : data.pickupLocation,
        serviceStyle: "Summer Meal",
        dietaryRestrictions: data.notes,
        budget: `$${(data.unitPrice * data.quantity).toFixed(2)}`,
        message: `Order: ${data.quantity}x ${data.mealTitle} @ $${data.unitPrice} each`,
        firstName: data.customerName.split(" ")[0] || data.customerName,
        lastName: data.customerName.split(" ").slice(1).join(" ") || "",
        email: data.customerEmail,
        phone: data.customerPhone,
        newsletter: false,
        submittedAt: new Date().toISOString(),
      };

      try {
        await saveInquiry(record);
      } catch (e) {
        console.error("[api/checkout] Failed to save order intent:", e);
      }

      return NextResponse.json({
        success: false,
        comingSoon: true,
        message: "Online checkout is coming soon. Please order via email or phone.",
        orderId: id,
      });
    }

    // When Stripe is configured, create a real checkout session
    // This code path will activate once STRIPE_SECRET_KEY is set
    const total = data.unitPrice * data.quantity;
    const deliveryFee = data.deliveryRequested ? 3000 : 0; // $30.00 in cents

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${stripeSecretKey}`,
      },
      body: new URLSearchParams({
        "mode": "payment",
        "success_url": `${process.env.NEXT_PUBLIC_SITE_URL}/summer?success=1`,
        "cancel_url": `${process.env.NEXT_PUBLIC_SITE_URL}/summer?canceled=1`,
        "customer_email": data.customerEmail,
        "line_items[0][quantity]": String(data.quantity),
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][unit_amount]": String(Math.round(data.unitPrice * 100)),
        "line_items[0][price_data][product_data][name]": data.mealTitle,
        "line_items[0][price_data][product_data][description]": `Pickup: ${data.pickupDate} at ${data.pickupLocation}`,
        ...(data.deliveryRequested
          ? {
              "line_items[1][quantity]": "1",
              "line_items[1][price_data][currency]": "usd",
              "line_items[1][price_data][unit_amount]": String(deliveryFee),
              "line_items[1][price_data][product_data][name]": "Delivery Fee",
            }
          : {}),
        "metadata[order_id]": `order_${Date.now()}`,
        "metadata[meal_id]": data.mealId,
        "metadata[customer_name]": data.customerName,
        "metadata[customer_phone]": data.customerPhone,
        "metadata[pickup_date]": data.pickupDate,
        "metadata[pickup_location]": data.pickupLocation,
        "metadata[delivery_requested]": String(data.deliveryRequested),
        "metadata[notes]": data.notes,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[api/checkout] Stripe error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    const session = await response.json();

    // Send notification email to owner
    const { subject, html } = buildPurchaseEmail({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      mealTitle: data.mealTitle,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      total,
      pickupDate: data.pickupDate,
      pickupLocation: data.pickupLocation,
      deliveryRequested: data.deliveryRequested,
      notes: data.notes,
    });

    await sendEmail({
      to: business.email,
      subject,
      html,
      replyTo: data.customerEmail,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("[api/checkout] Error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
