"use client";

import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type FormType = "inquiry" | "quote";

interface FormData {
  // Step 1: Event details
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  // Step 2: Preferences
  serviceStyle: string;
  dietaryRestrictions: string;
  budget: string;
  message: string;
  // Step 3: Contact info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Newsletter
  newsletter: boolean;
}

const initialData: FormData = {
  eventType: "",
  eventDate: "",
  guestCount: "",
  location: "",
  serviceStyle: "",
  dietaryRestrictions: "",
  budget: "",
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  newsletter: true,
};

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Private Dinner",
  "Birthday Celebration",
  "Anniversary",
  "Other",
];

const serviceStyles = [
  "Plated / Multi-course",
  "Buffet",
  "Family-style",
  "Cocktail / Appetizers only",
  "Not sure yet",
];

const budgetRanges = [
  "Under $75/person",
  "$75 – $100/person",
  "$100 – $150/person",
  "$150+/person",
  "Not sure yet",
];

const steps = [
  { number: 1, title: "Event Details", description: "Tell us about your event" },
  { number: 2, title: "Preferences", description: "Menu and service style" },
  { number: 3, title: "Contact Info", description: "How to reach you" },
];

export function InquiryForm() {
  const [step, setStep] = useState(1);
  const [formType, setFormType] = useState<FormType | null>(null);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (field: keyof FormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!data.eventType) newErrors.eventType = "Please select an event type";
      if (!data.eventDate) newErrors.eventDate = "Please provide an event date";
      if (!data.guestCount) newErrors.guestCount = "Please estimate your guest count";
    }

    if (stepNum === 2 && formType === "quote") {
      if (!data.budget) newErrors.budget = "Budget range is required for quote requests";
    }

    if (stepNum === 3) {
      if (!data.firstName.trim()) newErrors.firstName = "First name is required";
      if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!data.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const endpoint = formType === "quote" ? "/api/quote" : "/api/inquiry";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formType,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or call us at 707-981-7822."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="rounded-2xl bg-white border border-border p-8 sm:p-12 shadow-lg text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6 16l6 6 14-14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sage"
            />
          </svg>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold mb-3">
          Thank You, {data.firstName}!
        </h2>
        <p className="text-charcoal/70 leading-relaxed mb-6 max-w-md mx-auto">
          Your {formType === "quote" ? "quote request" : "inquiry"} has been
          received. Chef Austin will review the details and get back to you
          within 24 hours at <strong>{data.email}</strong>.
        </p>
        <div className="rounded-xl bg-cream-dark/50 p-6 mb-6 text-left max-w-md mx-auto">
          <p className="heading-uppercase text-xs text-sage mb-3">Your Submission</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone">Event Type</dt>
              <dd className="font-medium">{data.eventType}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Date</dt>
              <dd className="font-medium">{data.eventDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Guests</dt>
              <dd className="font-medium">{data.guestCount}</dd>
            </div>
          </dl>
        </div>
        <Button href="/" variant="outline">
          Back to Home
        </Button>
      </div>
    );
  }

  // Form type selection
  if (!formType) {
    return (
      <div className="rounded-2xl bg-white border border-border p-8 sm:p-12 shadow-lg">
        <h2 className="font-heading text-2xl font-semibold mb-2 text-center">
          How Can We Help?
        </h2>
        <p className="text-stone text-center mb-8">
          Choose the option that best fits your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setFormType("inquiry")}
            className="rounded-xl border-2 border-border p-6 text-left hover:border-sage hover:bg-sage/5 transition-all duration-200 group"
          >
            <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-sage transition-colors">
              General Inquiry
            </h3>
            <p className="text-sm text-stone leading-relaxed">
              Tell us about your event and we&rsquo;ll start a conversation about
              how we can help.
            </p>
          </button>
          <button
            onClick={() => setFormType("quote")}
            className="rounded-xl border-2 border-border p-6 text-left hover:border-sage hover:bg-sage/5 transition-all duration-200 group"
          >
            <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-sage transition-colors">
              Request a Quote
            </h3>
            <p className="text-sm text-stone leading-relaxed">
              Provide detailed event info for a custom catering proposal with
              pricing.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-border p-8 sm:p-12 shadow-lg">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                    step >= s.number
                      ? "bg-sage text-white"
                      : "bg-cream-dark text-stone"
                  )}
                >
                  {step > s.number ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 hidden sm:block transition-colors",
                    step >= s.number ? "text-sage font-medium" : "text-stone"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors duration-300",
                    step > s.number ? "bg-sage" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Event Details */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-1">
              Event Details
            </h2>
            <p className="text-sm text-stone mb-6">
              Tell us about the event you&rsquo;re planning.
            </p>
          </div>

          {/* Event type */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Event Type <span className="text-sage">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("eventType", type)}
                  className={cn(
                    "px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                    data.eventType === type
                      ? "border-sage bg-sage/5 text-sage"
                      : "border-border text-charcoal hover:border-stone-light"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.eventType && (
              <p className="text-sm text-red-500 mt-2">{errors.eventType}</p>
            )}
          </div>

          {/* Date + Guest count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                Event Date <span className="text-sage">*</span>
              </label>
              <input
                id="eventDate"
                type="date"
                value={data.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none",
                  errors.eventDate ? "border-red-300" : "border-border focus:border-sage"
                )}
              />
              {errors.eventDate && (
                <p className="text-sm text-red-500 mt-1">{errors.eventDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium mb-2">
                Estimated Guest Count <span className="text-sage">*</span>
              </label>
              <input
                id="guestCount"
                type="number"
                min="1"
                placeholder="e.g. 100"
                value={data.guestCount}
                onChange={(e) => update("guestCount", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none",
                  errors.guestCount ? "border-red-300" : "border-border focus:border-sage"
                )}
              />
              {errors.guestCount && (
                <p className="text-sm text-red-500 mt-1">{errors.guestCount}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Event Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Healdsburg, Sonoma County"
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-1">
              Preferences
            </h2>
            <p className="text-sm text-stone mb-6">
              Help us understand your vision for the menu and service.
            </p>
          </div>

          {/* Service style */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Service Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => update("serviceStyle", style)}
                  className={cn(
                    "px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-left",
                    data.serviceStyle === style
                      ? "border-sage bg-sage/5 text-sage"
                      : "border-border text-charcoal hover:border-stone-light"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Budget Range {formType === "quote" && <span className="text-sage">*</span>}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => update("budget", range)}
                  className={cn(
                    "px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-left",
                    data.budget === range
                      ? "border-sage bg-sage/5 text-sage"
                      : "border-border text-charcoal hover:border-stone-light"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.budget && (
              <p className="text-sm text-red-500 mt-2">{errors.budget}</p>
            )}
          </div>
          <div>
            <label htmlFor="dietary" className="block text-sm font-medium mb-2">
              Dietary Restrictions or Preferences
            </label>
            <input
              id="dietary"
              type="text"
              placeholder="e.g. Vegetarian options, gluten-free, nut allergy"
              value={data.dietaryRestrictions}
              onChange={(e) => update("dietaryRestrictions", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Tell Us More About Your Vision
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Share any details about your event theme, cuisine preferences, or special requests..."
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage resize-none"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button onClick={handleBack} variant="ghost">
              Back
            </Button>
            <Button onClick={handleNext}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-1">
              Contact Information
            </h2>
            <p className="text-sm text-stone mb-6">
              How can we reach you with your proposal?
            </p>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name <span className="text-sage">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none",
                  errors.firstName ? "border-red-300" : "border-border focus:border-sage"
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name <span className="text-sage">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={data.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none",
                  errors.lastName ? "border-red-300" : "border-border focus:border-sage"
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address <span className="text-sage">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border-2 bg-white text-charcoal transition-colors focus:outline-none",
                errors.email ? "border-red-300" : "border-border focus:border-sage"
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(707) 555-0100"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
            />
          </div>

          {/* Newsletter */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.newsletter}
              onChange={(e) => update("newsletter", e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-border text-sage focus:ring-sage"
            />
            <span className="text-sm text-charcoal/70">
              Send me seasonal menu updates and special offers from Perkins
              Catering Co.
            </span>
          </label>

          {/* Error */}
          {submitError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button onClick={handleBack} variant="ghost" disabled={submitting}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : formType === "quote" ? "Request Quote" : "Submit Inquiry"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
