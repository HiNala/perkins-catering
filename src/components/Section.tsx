import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  background?: "cream" | "white" | "charcoal" | "sage";
}

const bgStyles = {
  cream: "bg-cream",
  white: "bg-white",
  charcoal: "bg-charcoal text-cream",
  sage: "bg-sage text-white",
};

export function Section({ className, children, id, background = "cream" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", bgStyles[background], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && "text-center mx-auto max-w-3xl", "mb-12", className)}>
      {eyebrow && (
        <p
          className={cn(
            "heading-uppercase text-xs mb-3",
            light ? "text-sage-light" : "text-sage"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight",
          light ? "text-cream" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-cream/70" : "text-stone"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
