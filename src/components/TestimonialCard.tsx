import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  affiliation: string;
  className?: string;
}

export function TestimonialCard({ quote, author, affiliation, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "rounded-2xl bg-white border border-border p-8 shadow-sm transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Quote mark */}
      <div className="text-5xl font-heading text-sage/30 leading-none mb-4">
        &ldquo;
      </div>
      <blockquote className="text-charcoal/80 leading-relaxed text-[15px] mb-6">
        {quote}
      </blockquote>
      <figcaption className="border-t border-border pt-4">
        <p className="font-heading text-lg font-semibold text-charcoal">
          {author}
        </p>
        <p className="text-sm text-stone uppercase tracking-wider mt-1">
          {affiliation}
        </p>
      </figcaption>
    </figure>
  );
}
