const SPEC_ROWS: Array<[string, string]> = [
  ["next", "16.3.1"],
  ["typescript", "strict"],
  ["tailwind", "v4"],
  ["framer-motion", "13.x"],
  ["react", "19.2.8"],
  ["sql", "postgres / mysql"],
  ["php", "8.x"],
  ["dart", "3.x"],
  ["runtime", "node 20+"],
  ["deploy", "vercel edge"],
];

export function SpecStrip() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
      <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 md:grid-cols-5">
        {SPEC_ROWS.map(([k, v]) => (
          <div key={k} className="bg-black px-4 py-3">
            <div className="truncate font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-600">
              {k}
            </div>
            <div className="mt-1 truncate font-mono text-xs text-neutral-300">
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GlowLine() {
  return (
    <div className="relative mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}