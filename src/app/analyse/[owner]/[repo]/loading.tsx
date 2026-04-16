export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
        <span className="text-slate-700">/</span>
        <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
        <span className="text-slate-700">/</span>
        <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
      </div>

      <div className="flex gap-8 items-start">
        {/* Main skeleton */}
        <div className="flex-1 space-y-8">
          {/* Category + stars */}
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-slate-800 rounded-full animate-pulse" />
            <div className="h-6 w-32 bg-slate-800 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="h-9 w-2/3 bg-slate-800 rounded animate-pulse" />
            <div className="h-5 w-full bg-slate-800/60 rounded animate-pulse" />
            <div className="h-5 w-4/5 bg-slate-800/60 rounded animate-pulse" />
          </div>

          {/* Loading indicator */}
          <div className="flex items-center gap-3 py-4">
            <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-sm text-slate-500">
              Analysiere Repository…
            </p>
          </div>

          {/* Code box skeletons */}
          <div className="space-y-3">
            <div className="h-5 w-28 bg-slate-800 rounded animate-pulse" />
            <div className="h-20 bg-slate-800/60 rounded-lg animate-pulse" />
            <div className="h-20 bg-slate-800/60 rounded-lg animate-pulse" />
          </div>

          {/* Prompt cards */}
          <div className="space-y-3">
            <div className="h-5 w-24 bg-slate-800 rounded animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-800/40 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="hidden lg:block shrink-0 w-[300px]">
          <div className="rounded-xl border border-slate-800 p-4 space-y-2">
            <div className="h-3 w-16 bg-slate-800 rounded animate-pulse mb-3" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 bg-slate-800/60 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
