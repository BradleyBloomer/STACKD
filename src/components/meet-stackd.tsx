"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GeometricBackground } from "./geometric-background";

const SPECS = [
  "21.5\" Touchscreen",
  "Wall-Mounted",
  "Matte Black Finish",
  "Compact Footprint",
];

export function MeetStackd() {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-charcoal py-32">
      <GeometricBackground />

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.p
          {...fade(0)}
          className="font-mono text-xs uppercase tracking-widest text-offwhite/40"
        >
          Introducing
        </motion.p>

        <motion.h2
          {...fade(0.1)}
          className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-6xl"
        >
          Meet STACKD.
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="mt-4 font-display text-2xl font-medium tracking-tight text-teal-light sm:text-3xl"
        >
          Small footprint. Big impact.
        </motion.p>

        <motion.p
          {...fade(0.3)}
          className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed text-offwhite/60"
        >
          The STACKD machine is a compact, wall-mounted vape vending
          solution built for premium hospitality venues. Cashless
          purchasing, built-in age verification, and remote monitoring —
          fully managed by STACKD, so your team never has to think about
          it.
        </motion.p>

        <motion.div {...fade(0.42)} className="mx-auto mt-20 max-w-2xl">
          <div
            aria-hidden="true"
            className="mx-auto h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {SPECS.map((spec, i) => (
              <span key={spec} className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-offwhite/70 transition-colors hover:text-teal-light">
                  {spec}
                </span>
                {i < SPECS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-teal-light/40"
                  />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
