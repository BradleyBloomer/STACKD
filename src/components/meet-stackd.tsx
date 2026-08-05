"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { StackdIconReversed } from "./stackd-icon-reversed";

// Approved Stage 1 hardware render, Stage 2 (logo + idle screen) composited.
const MACHINE_IMAGE_SRC: string | undefined = "/images/meet-stackd-machine.jpg";

const SPECS = [
  { label: "Display", value: "21.5\" Touchscreen" },
  { label: "Finish", value: "Matte Black" },
  { label: "Mount", value: "Wall-Mounted" },
  { label: "Footprint", value: "Compact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function MeetStackd() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-4xl px-6 py-32 text-center md:px-10">
        <motion.p
          {...reveal(0)}
          className="font-mono text-xs uppercase tracking-widest text-teal-light"
        >
          Meet STACKD
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="relative mx-auto mt-12 aspect-[4/5] w-full max-w-md"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[90px]"
          />
          {MACHINE_IMAGE_SRC ? (
            <Image
              src={MACHINE_IMAGE_SRC}
              alt="The STACKD machine"
              fill
              className="object-contain"
              sizes="(min-width: 768px) 448px, 100vw"
            />
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center gap-4">
              <StackdIconReversed className="h-16 w-auto opacity-50" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
                Product render — coming soon
              </p>
            </div>
          )}
        </motion.div>

        <motion.dl
          {...reveal(0.3)}
          className="mx-auto mt-14 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {SPECS.map((spec) => (
            <div key={spec.label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-offwhite/35">
                {spec.label}
              </dt>
              <dd className="mt-1.5 font-sans text-sm text-offwhite/70">
                {spec.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
