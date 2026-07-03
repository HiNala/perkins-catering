"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthFormState } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(
    signup,
    undefined
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4 py-20">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <Logo className="h-12 w-12 text-sage-light" />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-2xl font-semibold text-cream tracking-wide">
                Perkins Catering
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sage-light">
                Co.
              </span>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl bg-cream border border-border p-8 shadow-lg">
          <h1 className="font-heading text-2xl font-semibold mb-2 text-center text-charcoal">
            Create Admin Account
          </h1>
          <p className="text-sm text-stone text-center mb-6">
            Set up an account to access the admin dashboard.
          </p>

          <form action={action} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-charcoal">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Austin Perkins"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                aria-invalid={!!state?.errors?.name}
                aria-describedby={state?.errors?.name ? "name-error" : undefined}
              />
              {state?.errors?.name && (
                <p id="name-error" className="text-sm text-red-600 mt-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-charcoal">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                aria-invalid={!!state?.errors?.email}
                aria-describedby={state?.errors?.email ? "email-error" : undefined}
              />
              {state?.errors?.email && (
                <p id="email-error" className="text-sm text-red-600 mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-charcoal">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                aria-invalid={!!state?.errors?.password}
                aria-describedby={state?.errors?.password ? "password-error" : "password-hint"}
              />
              <p id="password-hint" className="text-xs text-stone mt-1">
                Must be at least 8 characters with one letter and one number.
              </p>
              {state?.errors?.password && (
                <p id="password-error" className="text-sm text-red-600 mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state?.message && (
              <div
                className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700"
                role="alert"
              >
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-lg bg-sage text-white hover:bg-sage-dark transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {pending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-stone">
              Already have an account?{" "}
              <Link href="/login" className="text-sage hover:text-sage-dark font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-cream/60 hover:text-sage-light transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
