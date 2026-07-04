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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
  }, []);

  const isActive = (href: string) => pathname === href;

  const isDropdownActive = (children: { href: string }[]) =>
    children.some((c) => isActive(c.href));

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
            {navigation.map((item) => {
              if (item.children && item.children.length > 0) {
                const dropdownActive = isDropdownActive(item.children);
                return (
                  <div
                    key={item.label}
                    data-dropdown
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider rounded-lg transition-all duration-200",
                        scrolled
                          ? "text-charcoal hover:bg-cream-dark hover:text-sage"
                          : "text-white/90 hover:bg-white/10 hover:text-white",
                        dropdownActive && (scrolled ? "text-sage" : "text-white")
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1 min-w-[240px] rounded-xl bg-white shadow-xl border border-border/50 overflow-hidden transition-all duration-200 origin-top",
                        openDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "flex flex-col px-4 py-2.5 transition-colors duration-150 border-l-2",
                              isActive(child.href)
                                ? "bg-sage/5 border-sage"
                                : "border-transparent hover:bg-cream-dark/50 hover:border-sage/30"
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm font-medium transition-colors",
                                isActive(child.href) ? "text-sage" : "text-charcoal"
                              )}
                            >
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-stone mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Standalone link
              return (
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
                    isActive(item.href) && !item.highlight && (scrolled ? "text-sage" : "text-white")
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
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
            {navigation.map((item) => {
              if (item.children && item.children.length > 0) {
                const expanded = expandedMobile === item.label;
                const dropdownActive = isDropdownActive(item.children);
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setExpandedMobile(expanded ? null : item.label)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-lg transition-colors",
                        "text-charcoal hover:bg-cream-dark",
                        dropdownActive && "text-sage"
                      )}
                      aria-expanded={expanded}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-border pl-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobileMenu}
                            className={cn(
                              "px-4 py-2.5 text-sm rounded-lg transition-colors",
                              isActive(child.href)
                                ? "text-sage bg-sage/5 font-medium"
                                : "text-charcoal/80 hover:bg-cream-dark"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-lg transition-colors",
                    item.highlight
                      ? "bg-sage text-white"
                      : "text-charcoal hover:bg-cream-dark",
                    isActive(item.href) && !item.highlight && "text-sage bg-cream-dark"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
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
