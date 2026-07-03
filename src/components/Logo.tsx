import { cn } from "@/lib/utils";

/**
 * Perkins Catering Co. — Modern Logo Mark
 * A stylized wheat/leaf emblem representing farm-to-table catering.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      {/* Wheat stalk */}
      <path
        d="M24 10 L24 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      <path
        d="M24 16 C20 16 18 14 18 12 C20 12 22 14 24 16"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 22 C20 22 18 20 18 18 C20 18 22 20 24 22"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 28 C20 28 18 26 18 24 C20 24 22 26 24 28"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Right leaves */}
      <path
        d="M24 16 C28 16 30 14 30 12 C28 12 26 14 24 16"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 22 C28 22 30 20 30 18 C28 18 26 20 24 22"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 28 C28 28 30 26 30 24 C28 24 26 26 24 28"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Top grain */}
      <circle cx="24" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}
