"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthFormState } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(
    login,
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
            Admin Login
          </h1>
          <p className="text-sm text-stone text-center mb-6">
            Sign in to manage inquiries, analytics, and blog posts.
          </p>

          <form action={action} className="space-y-5">
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
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white text-charcoal transition-colors focus:outline-none focus:border-sage"
                aria-invalid={!!state?.errors?.password}
                aria-describedby={state?.errors?.password ? "password-error" : undefined}
              />
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
              {pending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-stone">
              Need an admin account?{" "}
              <Link href="/signup" className="text-sage hover:text-sage-dark font-medium">
                Sign up
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
