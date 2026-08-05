"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GeometricBackground } from "./geometric-background";
import { ProductRenderSlot } from "./product-render-slot";

const EASE = [0.22, 1, 0.36, 1] as const;

// Swap in the chosen render's path once one is picked, e.g.
// "/hero/stackd-machine.png" — nothing else in this component needs to change.
const PRODUCT_IMAGE_SRC: string | undefined = undefined;

// Quiet, factual grounding for the product — a spec caption, not a feature
// pitch. No cards, no icons: just what the hardware actually is.
const SPECS = [
  { label: "Display", value: "21.5\" Touchscreen" },
  { label: "Finish", value: "Matte Black" },
  { label: "Mount", value: "Wall-Mounted" },
  { label: "Footprint", value: "Compact" },
];

export function HeroProduct() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10 lg:py-32">
      <GeometricBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.p
            {...fadeUp(0.05)}
            className="font-mono text-xs uppercase tracking-widest text-teal-light"
          >
            Automated Retail, Engineered
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 font-display text-5xl font-medium leading-[1.03] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
          >
            Smart Vending.
            <br />
            <span className="text-teal-light">Built For Hospitality.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70"
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
              className="rounded-full border border-white/20 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-offwhite/80 transition-colors hover:border-white/40 hover:text-offwhite"
            >
              How It Works
            </Link>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <ProductRenderSlot src={PRODUCT_IMAGE_SRC} />
          </motion.div>

          <motion.dl
            {...fadeUp(0.6)}
            className="mx-auto mt-8 max-w-xs border-t border-white/10"
          >
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between border-b border-white/10 py-3"
              >
                <dt className="font-mono text-[10px] uppercase tracking-widest text-offwhite/35">
                  {spec.label}
                </dt>
                <dd className="font-sans text-sm text-offwhite/70">
                  {spec.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
