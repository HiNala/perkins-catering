"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Lead capture popup — appears on exit-intent or after 30 seconds.
 * Captures name + phone + email for quick lead generation.
 * Uses sessionStorage to avoid showing multiple times per session.
 */
export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPopup = useCallback(() => {
    if (dismissed || submitted) return;
    if (typeof window === "undefined") return;
    // Don't show if already shown this session
    if (sessionStorage.getItem("leadPopupShown") === "1") return;
    // Don't show on admin/login pages
    if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/login") || window.location.pathname.startsWith("/signup")) return;
    sessionStorage.setItem("leadPopupShown", "1");
    setOpen(true);
  }, [dismissed, submitted]);

  useEffect(() => {
    // Timed popup — show after 30 seconds
    timerRef.current = setTimeout(() => {
      showPopup();
    }, 30000);

    // Exit-intent popup — show when mouse leaves the top of the page
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showPopup]);

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
  };

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
          message: "Quick lead capture from popup",
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

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-charcoal/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-scale-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-cream-dark/50 hover:bg-cream-dark flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {submitted ? (
            /* Success state */
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16l6 6 14-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-sage" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-semibold mb-2">
                Thank You, {form.name.split(" ")[0]}!
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-6">
                Chef Austin will personally call you within 24 hours to discuss
                your event. We&rsquo;ve sent a confirmation to <strong>{form.email}</strong>.
              </p>
              <button
                onClick={handleClose}
                className="text-sage hover:text-sage-dark font-medium transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Header section with sage background */}
              <div className="bg-sage px-8 pt-8 pb-6 text-white">
                <p className="heading-uppercase text-xs text-white/70 mb-2">
                  Limited Availability
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold mb-2">
                  Planning a Catered Event?
                </h2>
                <p className="text-white/80 leading-relaxed">
                  Get a free consultation with Chef Austin. Leave your info and
                  we&rsquo;ll call you within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium mb-2">
                    Your Name <span className="text-sage">*</span>
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-sage">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    placeholder="(707) 555-0100"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium mb-2">
                    Email <span className="text-sage">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                  />
                </div>

                {/* Event type (optional) */}
                <div>
                  <label htmlFor="lead-type" className="block text-sm font-medium mb-2">
                    Event Type <span className="text-stone/50">(optional)</span>
                  </label>
                  <select
                    id="lead-type"
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                  >
                    <option value="">Select event type...</option>
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

                <p className="text-xs text-stone text-center">
                  We respect your privacy. No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
