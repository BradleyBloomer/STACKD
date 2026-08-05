"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClosingCta() {
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
          className="font-mono text-xs uppercase tracking-widest text-teal-light"
        >
          Get Started
        </motion.p>

        <motion.h2
          {...fadeUp(0.1)}
          className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-6xl"
        >
          Have a venue that could earn passive revenue?
        </motion.h2>

        <motion.div {...fadeUp(0.22)} className="mt-10">
          <Link
            href="/partner"
            className="inline-block rounded-full bg-teal px-8 py-4 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light"
          >
            Start a Partnership Enquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
