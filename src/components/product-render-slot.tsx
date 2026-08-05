import Image from "next/image";
import { StackdIconReversed } from "./stackd-icon-reversed";

// Flexible slot for the machine hero render. Pass `src` once a chosen
// render exists — nothing else about the hero needs to change. Until then,
// this renders an honest placeholder rather than pretending to be final art.
export function ProductRenderSlot({
  src,
  alt = "STACKD smart vending machine",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[80px]"
      />

      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <StackdIconReversed className="h-16 w-auto opacity-60" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-offwhite/35">
            Product render — coming soon
          </p>
        </div>
      )}
    </div>
  );
}
