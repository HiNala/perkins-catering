"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Compact inline lead capture form for embedding on key pages.
 * Captures name, phone, and email — submits to /api/inquiry.
 * Smaller than the full InquiryForm, designed for conversion.
 */
export function QuickLeadForm({
  title = "Get a Free Consultation",
  subtitle = "Tell us about your event and Chef Austin will call you within 24 hours.",
  variant = "light",
}: {
  title?: string;
  subtitle?: string;
  variant?: "light" | "dark";
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.name.split(" ")[0],
          lastName: form.name.split(" ").slice(1).join(" ") || form.name.split(" ")[0],
          email: form.email,
          phone: form.phone,
          eventType: form.eventType || "Not specified",
          eventDate: "",
          guestCount: "",
          location: "",
          serviceStyle: "",
          dietaryRestrictions: "",
          budget: "",
          message: "Quick lead from inline form",
          formType: "inquiry",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at 707-981-7822.");
    } finally {
      setSubmitting(false);
    }
  };

  const isDark = variant === "dark";

  if (submitted) {
    return (
      <div className={cn(
        "rounded-2xl p-8 text-center",
        isDark ? "bg-white/10 border border-white/20" : "bg-white border border-border shadow-lg"
      )}>
        <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l5 5 13-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-sage" />
          </svg>
        </div>
        <h3 className={cn("font-heading text-xl font-semibold mb-2", isDark && "text-cream")}>
          Thank You, {form.name.split(" ")[0]}!
        </h3>
        <p className={cn("leading-relaxed", isDark ? "text-cream/70" : "text-charcoal/70")}>
          Chef Austin will call you within 24 hours. Check your email for confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-2xl p-6 sm:p-8",
      isDark ? "bg-white/10 border border-white/20" : "bg-white border border-border shadow-lg"
    )}>
      <h3 className={cn("font-heading text-xl sm:text-2xl font-semibold mb-2", isDark && "text-cream")}>
        {title}
      </h3>
      <p className={cn("text-sm mb-6 leading-relaxed", isDark ? "text-cream/70" : "text-stone")}>
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none focus:border-sage",
              isDark ? "border-white/20" : "border-border"
            )}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none focus:border-sage",
              isDark ? "border-white/20" : "border-border"
            )}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none focus:border-sage",
              isDark ? "border-white/20" : "border-border"
            )}
          />
        </div>
        <div>
          <select
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none focus:border-sage",
              isDark ? "border-white/20" : "border-border"
            )}
          >
            <option value="">Event type (optional)</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Private Dinner">Private Dinner</option>
            <option value="Birthday Celebration">Birthday Celebration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200",
            "bg-sage hover:bg-sage-dark disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {submitting ? "Submitting..." : "Get My Free Consultation"}
        </button>

        <p className={cn("text-xs text-center", isDark ? "text-cream/50" : "text-stone")}>
          We respond within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
}
