"use client";

import { useState } from "react";

interface SummerMealOrderProps {
  meal: {
    id: string;
    title: string;
    date: string;
    price: number;
    priceNote: string;
    courses: string[];
  };
  pickupInfo: {
    location: string;
    address: string;
    hours: string;
  };
}

export function SummerMealOrder({ meal, pickupInfo }: SummerMealOrderProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryRequested, setDeliveryRequested] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "coming-soon" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const total = meal.price * quantity + (deliveryRequested ? 30 : 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealId: meal.id,
          mealTitle: meal.title,
          quantity,
          unitPrice: meal.price,
          pickupDate: meal.date,
          pickupLocation: pickupInfo.location,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          deliveryRequested,
          notes,
        }),
      });

      const data = await res.json();

      if (data.comingSoon) {
        setStatus("coming-soon");
      } else if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        setStatus("error");
        setErrorMsg(data.error);
      } else {
        setStatus("coming-soon");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or order via email.");
    }
  }

  if (status === "coming-soon") {
    return (
      <div className="rounded-xl bg-sage/10 border border-sage/30 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <svg className="h-6 w-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
          Online Checkout Coming Soon!
        </h3>
        <p className="text-charcoal/70 mb-6 leading-relaxed">
          We&apos;re putting the finishing touches on our online ordering system.
          In the meantime, please order via email or phone.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:reservations@perkinscateringco.com?subject=Order: ${encodeURIComponent(meal.title)}&body=${encodeURIComponent(`Hi Austin,\n\nI'd like to order:\n\n${quantity}x ${meal.title} ($${meal.price} each)\nPickup: ${meal.date} at ${pickupInfo.location}\n${deliveryRequested ? "Delivery requested (+$30)\n" : ""}Total: $${total.toFixed(2)}\n\nName: \nPhone: \n\nThank you!`)}`}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wide rounded-lg bg-sage text-white hover:bg-sage-dark transition-all duration-200"
          >
            Order via Email
          </a>
          <a
            href="tel:7079817822"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wide rounded-lg border border-sage text-sage hover:bg-sage hover:text-white transition-all duration-200"
          >
            Call to Order
          </a>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        disabled
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium uppercase tracking-wide rounded-xl bg-sage/80 text-white cursor-not-allowed relative overflow-hidden"
      >
        <span className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.684M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          Buy Now — Coming Soon
        </span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            placeholder="(707) 555-0123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Quantity
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10 rounded-lg border border-border bg-white text-charcoal hover:bg-cream transition-all flex items-center justify-center font-semibold"
            >
              −
            </button>
            <span className="w-12 text-center font-heading text-lg font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(20, quantity + 1))}
              className="h-10 w-10 rounded-lg border border-border bg-white text-charcoal hover:bg-cream transition-all flex items-center justify-center font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={deliveryRequested}
            onChange={(e) => setDeliveryRequested(e.target.checked)}
            className="h-5 w-5 rounded border-border text-sage focus:ring-sage/20"
          />
          <span className="text-sm text-charcoal">
            Request delivery (+$30.00)
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all resize-none"
          placeholder="Dietary restrictions, preferred pickup time, etc."
        />
      </div>

      {/* Order summary */}
      <div className="rounded-lg bg-cream border border-border p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-charcoal/70">{quantity}x {meal.title}</span>
          <span className="font-medium">${(meal.price * quantity).toFixed(2)}</span>
        </div>
        {deliveryRequested && (
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/70">Delivery fee</span>
            <span className="font-medium">$30.00</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-border">
          <span className="font-heading font-semibold text-charcoal">Total</span>
          <span className="font-heading font-semibold text-sage">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium uppercase tracking-wide rounded-xl bg-sage text-white hover:bg-sage-dark transition-all duration-200 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.684M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Buy Now — Coming Soon
          </>
        )}
      </button>
    </form>
  );
}
