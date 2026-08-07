"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PartnershipStatement() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center md:px-10">
        <motion.p
          {...fadeUp(0)}
          className="font-mono text-sm uppercase tracking-widest text-teal-light"
        >
          The Partnership
        </motion.p>

        <motion.h2
          {...fadeUp(0.1)}
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
        >
          You provide the wall.
          <br />
          We handle everything else.
        </motion.h2>

        <motion.p
          {...fadeUp(0.22)}
          className="mx-auto mt-8 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70"
        >
          Installation, stocking, monitoring, and support — fully managed by
          STACKD, so your team never has to think about it.
        </motion.p>
      </div>
    </section>
  );
}
