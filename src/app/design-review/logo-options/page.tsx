import { StackdIcon } from "@/components/stackd-icon";
import { StackdIconReversed } from "@/components/stackd-icon-reversed";

export const metadata = {
  title: "Logo Options Review | STACKD (internal)",
  robots: { index: false, follow: false },
};

function OptionRow({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="border-t border-white/10 pt-6">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
        {label}
      </p>
      <p className="mt-1 max-w-2xl font-sans text-sm text-offwhite/60">
        {description}
      </p>
    </div>
  );
}

function SizeLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
      {children}
    </p>
  );
}

export default function LogoOptionsReview() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
        Internal Design Review — Not Part Of The Public Site
      </p>
      <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-offwhite sm:text-4xl">
        Logo on dark background — three options
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-offwhite/60">
        All three use the exact same unmodified icon paths from the original
        file. Nothing here has been redrawn. Option 2 adds an off-white
        backing layer (same paths, thin stroke) behind the untouched
        foreground shapes to restore the separator lines on dark backgrounds.
        Option 3 wraps the untouched icon in a small rounded off-white chip.
      </p>

      {/* OPTION 1 */}
      <section className="mt-16">
        <OptionRow
          label="Option 1"
          description="Original color icon placed directly on the dark background, no treatment. Shows the negative-space issue: separator lines disappear."
        />
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <div>
            <SizeLabel>Desktop header (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIcon className="h-8 w-auto" />
            </div>
          </div>
          <div>
            <SizeLabel>Mobile header (24px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIcon className="h-6 w-auto" />
            </div>
          </div>
          <div>
            <SizeLabel>Footer (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIcon className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 2 */}
      <section className="mt-16">
        <OptionRow
          label="Option 2"
          description="Reversed variant: unmodified teal paths on top, an off-white backing copy of the same paths (with a thin stroke to bridge the gaps) behind them. No chip, no card — the mark sits directly on the background."
        />
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <div>
            <SizeLabel>Desktop header (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIconReversed className="h-8 w-auto" />
            </div>
          </div>
          <div>
            <SizeLabel>Mobile header (24px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIconReversed className="h-6 w-auto" />
            </div>
          </div>
          <div>
            <SizeLabel>Footer (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <StackdIconReversed className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 3 */}
      <section className="mt-16">
        <OptionRow
          label="Option 3 (current site treatment)"
          description="Unmodified icon inside a small rounded off-white chip. Guaranteed fidelity to the original artwork, but may read as an app-icon tile rather than an integrated wordmark — flagged as the open question."
        />
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <div>
            <SizeLabel>Desktop header (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-offwhite p-1.5">
                <StackdIcon className="h-full w-full" />
              </span>
            </div>
          </div>
          <div>
            <SizeLabel>Mobile header (24px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-offwhite p-1">
                <StackdIcon className="h-full w-full" />
              </span>
            </div>
          </div>
          <div>
            <SizeLabel>Footer (32px)</SizeLabel>
            <div className="flex h-20 items-center rounded-lg border border-white/10 bg-charcoal px-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-offwhite p-1.5">
                <StackdIcon className="h-full w-full" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Full lockup in context, all three, in an actual header-style bar */}
      <section className="mt-20">
        <OptionRow
          label="In context"
          description="Each option as it would sit in the real header bar, next to the wordmark, at actual size."
        />
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-charcoal px-6 py-4">
            <StackdIcon className="h-8 w-auto" />
            <span className="font-display text-lg font-medium tracking-tight text-offwhite">
              STACKD
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
              Option 1 — raw
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-charcoal px-6 py-4">
            <StackdIconReversed className="h-8 w-auto" />
            <span className="font-display text-lg font-medium tracking-tight text-offwhite">
              STACKD
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
              Option 2 — reversed
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-charcoal px-6 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-offwhite p-1.5">
              <StackdIcon className="h-full w-full" />
            </span>
            <span className="font-display text-lg font-medium tracking-tight text-offwhite">
              STACKD
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
              Option 3 — chip
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
