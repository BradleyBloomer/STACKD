"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GeometricBackground } from "./geometric-background";
import { ProductRenderSlot } from "./product-render-slot";

const EASE = [0.22, 1, 0.36, 1] as const;

// Approved Stage 1 hardware render ("Black Wall"), Stage 2 (real logo +
// idle screen) composited.
const PRODUCT_IMAGE_SRC: string | undefined = "/images/hero-machine-v2.jpg";

export function HeroProduct() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-offwhite px-6 pt-16 pb-24 md:px-10 lg:pb-32">
      <GeometricBackground tone="light" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.p
            {...fadeUp(0.05)}
            className="font-mono text-sm uppercase tracking-widest text-teal-dark"
          >
            Automated Retail, Engineered
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 font-display text-6xl font-medium leading-[1.03] tracking-tight text-charcoal sm:text-7xl lg:text-8xl"
          >
            Smart Vending.
            <br />
            <span className="text-teal-dark">Built For Hospitality.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-charcoal/60"
          >
            STACKD installs, stocks, and manages smart vending technology in
            premium hospitality venues — cashless, age-verified, and
            remotely monitored.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/partner"
              className="rounded-full bg-teal px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light"
            >
              Partner With Us
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full border border-charcoal/20 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-charcoal/70 transition-colors hover:border-charcoal/40 hover:text-charcoal"
            >
              How It Works
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <ProductRenderSlot src={PRODUCT_IMAGE_SRC} />
        </motion.div>
      </div>
    </section>
  );
}
