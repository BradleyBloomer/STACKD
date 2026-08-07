import Image from "next/image";
import { StackdIcon } from "./stackd-icon";

// Flexible slot for the machine hero render. Pass `src` once a chosen
// render exists — nothing else about the hero needs to change. Until then,
// this renders an honest placeholder rather than pretending to be final art.
// Styled for the Hero's light (offwhite) background — the Hero is the only
// place this is used.
export function ProductRenderSlot({
  src,
  alt = "STACKD smart vending machine",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="relative aspect-[1122/1190] w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-gradient-to-b from-charcoal/[0.03] to-transparent">
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
          <StackdIcon className="h-16 w-auto opacity-60" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/35">
            Product render — coming soon
          </p>
        </div>
      )}
    </div>
  );
}
