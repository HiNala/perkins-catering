import { cn } from "@/lib/utils";

type IconName = "rings" | "briefcase" | "utensils" | "sun";

const icons: Record<IconName, React.ReactElement> = {
  rings: (
    <>
      <circle cx="16" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 20 L12 28 M32 20 L36 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 28 L14 28 M34 28 L38 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="8" r="2" fill="currentColor" />
    </>
  ),
  briefcase: (
    <>
      <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M18 12 V8 H30 V12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="1.5" fill="currentColor" />
    </>
  ),
  utensils: (
    <>
      <path d="M14 8 V20 M14 20 C14 24 12 28 12 32 V40 H16 V32 C16 28 14 24 14 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M10 8 V14 C10 16 12 18 14 18 C16 18 18 16 18 14 V8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M30 8 C26 12 26 20 28 24 V40 H32 V24 C34 20 34 12 30 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M24 6 V12 M24 36 V42 M6 24 H12 M36 24 H42 M11 11 L15 15 M33 33 L37 37 M37 11 L33 15 M15 33 L11 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-12 w-12 text-sage", className)}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
