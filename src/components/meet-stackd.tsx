"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StackdIconAssemble } from "./stackd-icon-assemble";

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
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center md:px-10">
        <StackdIconAssemble className="mx-auto h-32 w-auto sm:h-40" />

        <motion.h2
          {...reveal(0.65)}
          className="mt-10 font-display text-6xl font-medium leading-[1] tracking-tight text-teal-light sm:text-7xl lg:text-8xl"
        >
          Meet STACKD
        </motion.h2>

        <motion.p
          {...reveal(0.72)}
          className="mt-6 font-display text-[2.7rem] font-medium leading-[1.03] tracking-tight text-offwhite sm:text-[3.375rem] lg:text-[4.05rem]"
        >
          Quiet by design.
        </motion.p>

        <motion.p
          {...reveal(0.8)}
          className="mx-auto mt-6 max-w-md font-sans text-lg leading-relaxed text-offwhite/70"
        >
          STACKD is built to work without asking for attention — a
          compact, wall-mounted presence finished to the same standard as
          the venues it serves.
        </motion.p>

        <motion.dl
          {...reveal(0.9)}
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
