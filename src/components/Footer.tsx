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
