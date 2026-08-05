import Image from "next/image";
import { StackdIconReversed } from "./stackd-icon-reversed";

// A deliberate photographic beat between the product demo and the business
// proposition — no headline, no CTA, nothing asking for action. Its only
// job is to let the machine be admired. Swap in real photography via `src`
// the same way ProductRenderSlot works; until then this shows an honest
// placeholder rather than fabricated content.
const PAUSE_IMAGE_SRC: string | undefined = undefined;

export function QuietPause() {
  return (
    <section className="relative border-t border-white/10 bg-charcoal">
      <div className="relative mx-auto aspect-[16/10] w-full max-w-6xl overflow-hidden sm:aspect-[21/9]">
        {PAUSE_IMAGE_SRC ? (
          <Image
            src={PAUSE_IMAGE_SRC}
            alt="STACKD machine, installed"
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <StackdIconReversed className="h-10 w-auto opacity-40" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
              Photography — coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
