const segments = [
  'Housing Societies',
  'Apartment Complexes',
  'Gated Townships',
  'RWAs',
  'Builder Communities',
  'Commercial Complexes',
];

export default function TrustStripSection() {
  return (
    <section className="bg-transparent border-y border-bd-subtle/80 py-8 md:py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">

          {/* Enhanced Anchor Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tx-secondary font-medium select-none">
              Designed for
            </span>
            <div className="h-px w-8 bg-slate-300 hidden md:block" />
          </div>

          {/* Infinite Smooth Ticker Window */}
          <div
            className="w-full overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)'
            }}
          >
            {/* Moving Track */}
            <div className="flex w-max items-center gap-8 animate-marquee hover:[animation-play-state:paused]">

              {/* Main List - Deepened Slate & Semi-Bold Text */}
              {segments.map((s) => (
                <div key={s} className="flex items-center gap-8 whitespace-nowrap">
                  <span className="text-[15px] font-semibold text-tx-secondary font-medium transition-colors duration-200 hover:text-black cursor-default tracking-wide">
                    {s}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C58A38] shrink-0 select-none opacity-70" />
                </div>
              ))}

              {/* Duplicate List for Seamless Loop */}
              {segments.map((s) => (
                <div key={`${s}-clone`} aria-hidden="true" className="flex items-center gap-8 whitespace-nowrap">
                  <span className="text-[15px] font-semibold text-tx-secondary font-medium transition-colors duration-200 hover:text-black cursor-default tracking-wide">
                    {s}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C58A38] shrink-0 select-none opacity-70" />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
