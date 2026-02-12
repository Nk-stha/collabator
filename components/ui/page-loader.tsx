export function PageLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-white/5 rounded-lg" />
      <div className="h-4 w-80 bg-white/5 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="dashboard-card p-6 h-32 bg-white/5 rounded-2xl" />
        ))}
      </div>
      <div className="dashboard-card p-6 h-64 bg-white/5 rounded-2xl" />
    </div>
  );
}
