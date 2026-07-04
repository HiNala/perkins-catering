import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-20">
      <div className="text-center max-w-md">
        <Link href="/" className="inline-flex flex-col items-center gap-2 mb-8">
          <Logo className="h-12 w-12 text-sage" />
          <div className="flex flex-col leading-none">
            <span className="font-heading text-2xl font-semibold text-charcoal tracking-wide">
              Perkins Catering
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
              Co.
            </span>
          </div>
        </Link>

        <h1 className="font-heading text-6xl font-semibold text-charcoal mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl text-stone mb-3">
          Page Not Found
        </h2>
        <p className="text-stone mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-lg bg-sage text-white hover:bg-sage-dark transition-all duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/inquire"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-lg border-2 border-sage text-sage hover:bg-sage hover:text-white transition-all duration-200"
          >
            Start an Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
