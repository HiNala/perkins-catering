import Link from "next/link";
import { business, footerNav } from "@/lib/business";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-10 w-10 text-sage-light" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-semibold tracking-wide">
                  Perkins Catering
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage-light">
                  Co.
                </span>
              </div>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed mb-6">
              {business.tagline}
            </p>
            <p className="text-sm text-cream/60 leading-relaxed">
              {business.serviceArea}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/60 hover:text-sage-light transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-cream/60 hover:text-sage-light transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="heading-uppercase text-xs text-sage-light mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-sage-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="heading-uppercase text-xs text-sage-light mb-4">
              More
            </h3>
            <ul className="space-y-3">
              {footerNav.more.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-sage-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-uppercase text-xs text-sage-light mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={business.phoneHref}
                  className="text-sm text-cream/70 hover:text-sage-light transition-colors block"
                >
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="text-sm text-cream/70 hover:text-sage-light transition-colors block break-all"
                >
                  {business.email}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/inquire"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium uppercase tracking-wide rounded-lg bg-sage text-white hover:bg-sage-dark transition-all duration-200"
                >
                  Start an Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">
            Crafted with care in Sonoma County
          </p>
        </div>
      </div>
    </footer>
  );
}
