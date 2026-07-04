"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { navigation, business } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Perkins Catering Co. home" onClick={closeMobileMenu}>
            <Logo className={cn("h-10 w-10 transition-colors", scrolled ? "text-charcoal" : "text-white")} />
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-heading text-xl font-semibold tracking-wide transition-colors",
                  scrolled ? "text-charcoal" : "text-white"
                )}
              >
                Perkins Catering
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] transition-colors",
                  scrolled ? "text-sage" : "text-cream/80"
                )}
              >
                Co.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium uppercase tracking-wider rounded-lg transition-all duration-200",
                  item.highlight
                    ? "bg-sage text-white hover:bg-sage-dark"
                    : scrolled
                      ? "text-charcoal hover:bg-cream-dark hover:text-sage"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                  pathname === item.href && !item.highlight && (scrolled ? "text-sage" : "text-white")
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span
                className={cn(
                  "block h-0.5 w-full transition-all duration-300",
                  scrolled ? "bg-charcoal" : "bg-white",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full transition-all duration-300",
                  scrolled ? "bg-charcoal" : "bg-white",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full transition-all duration-300",
                  scrolled ? "bg-charcoal" : "bg-white",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="lg:hidden mt-4 pb-4 flex flex-col gap-1 animate-fade-in-up"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-lg transition-colors",
                  item.highlight
                    ? "bg-sage text-white"
                    : "text-charcoal hover:bg-cream-dark",
                  pathname === item.href && !item.highlight && "text-sage bg-cream-dark"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={business.phoneHref}
              onClick={closeMobileMenu}
              className="px-4 py-3 text-sm font-medium text-stone hover:text-sage"
            >
              {business.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
