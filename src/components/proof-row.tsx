const ITEMS = [
  "South African",
  "Age Verification",
  "Remote Monitoring",
  "Cashless Payments",
  "Fully Managed",
];

export function ProofRow() {
  return (
    <div className="border-y border-white/10 bg-charcoal">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-8 md:flex-nowrap md:justify-between md:gap-x-0 md:px-10">
        {ITEMS.map((item, index) => (
          <div key={item} className="flex items-center">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="mr-8 hidden h-4 w-px bg-white/15 md:block"
              />
            )}
            <span className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-offwhite/55">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
