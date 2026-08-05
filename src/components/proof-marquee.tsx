const ITEMS = [
  "Proudly South African",
  "Remote-Monitored",
  "Real-Time Inventory Intelligence",
  "Secure Payment Infrastructure",
  "Engineered To Scale",
];

export function ProofMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-charcoal py-6">
      <div className="flex w-max animate-marquee gap-12">
        {track.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-offwhite/50"
          >
            {item}
            <span className="text-teal-light">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
