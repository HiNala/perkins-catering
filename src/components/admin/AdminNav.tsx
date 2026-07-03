"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Blog", href: "/admin/blog" },
];

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="w-full lg:w-64 lg:min-h-screen bg-charcoal text-cream flex flex-col lg:fixed lg:top-0 lg:left-0 z-30">
      {/* Brand */}
      <div className="p-5 border-b border-cream/10">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-9 text-sage-light" />
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold tracking-wide">
              Perkins Catering
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-sage-light">
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden p-4 text-sm text-cream/80 hover:text-cream flex items-center justify-between"
        onClick={() => setOpen(!open)}
        aria-label="Toggle admin menu"
        aria-expanded={open}
      >
        <span>Menu</span>
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {/* Nav */}
      <nav
        className={cn(
          "flex-col gap-1 p-4 lg:flex lg:flex-1",
          open ? "flex" : "hidden lg:flex"
        )}
        aria-label="Admin navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
              isActive(item.href)
                ? "bg-sage text-white"
                : "text-cream/70 hover:bg-cream/10 hover:text-cream"
            )}
          >
            {item.label}
          </Link>
        ))}

        <div className="mt-auto pt-4 border-t border-cream/10 space-y-2">
          <Link
            href="/"
            className="block px-4 py-2.5 text-sm text-cream/60 hover:text-cream transition-colors"
          >
            ← View Site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2.5 text-sm text-cream/60 hover:text-red-300 transition-colors"
            >
              Log Out
            </button>
          </form>
          <p className="px-4 pt-2 text-xs text-cream/40 truncate" title={userEmail}>
            {userEmail}
          </p>
        </div>
      </nav>
    </aside>
  );
}
