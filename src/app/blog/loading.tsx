export default function BlogLoading() {
  return (
    <>
      <section className="pt-32 pb-12 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-4 w-32 bg-cream/20 rounded animate-pulse mx-auto mb-4" />
          <div className="h-12 w-80 bg-cream/20 rounded animate-pulse mx-auto mb-4" />
          <div className="h-5 w-96 bg-cream/10 rounded animate-pulse mx-auto" />
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
                <div className="aspect-[16/10] bg-cream-dark animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 bg-cream-dark rounded animate-pulse" />
                  <div className="h-6 w-full bg-cream-dark/60 rounded animate-pulse" />
                  <div className="h-4 w-full bg-cream-dark/40 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-cream-dark/40 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
