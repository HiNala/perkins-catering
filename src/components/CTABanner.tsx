import { Button } from "./Button";
import { business } from "@/lib/business";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export function CTABanner({
  title = "Ready to Plan Your Event?",
  subtitle = "Tell us about your vision and we'll craft a custom menu just for you.",
}: CTABannerProps) {
  return (
    <section className="py-20 bg-sage text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
          {title}
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/inquire" variant="secondary" size="lg" className="bg-white text-sage hover:bg-cream">
            Start an Inquiry
          </Button>
          <Button href={business.phoneHref} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-sage">
            Call {business.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
