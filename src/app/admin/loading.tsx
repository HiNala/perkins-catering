export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="h-8 w-48 bg-cream-dark rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-cream-dark/60 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl bg-white border border-border p-6 shadow-sm">
            <div className="h-3 w-20 bg-cream-dark rounded animate-pulse mb-3" />
            <div className="h-10 w-16 bg-cream-dark/60 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white border border-border p-6 shadow-sm">
        <div className="h-5 w-40 bg-cream-dark rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-cream-dark/40 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
