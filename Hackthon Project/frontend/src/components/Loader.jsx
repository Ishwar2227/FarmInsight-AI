const Loader = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      <div className="absolute inset-3 animate-spin rounded-full border-4 border-secondary/20 border-t-secondary animation-delay-1000"></div>
    </div>
    <p className="text-sm font-medium text-slate-500">Gathering smart insights...</p>
  </div>
);

export default Loader;

