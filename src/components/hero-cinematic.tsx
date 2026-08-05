"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { StackdIconReversed } from "./stackd-icon-reversed";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll only ever enhances (subtle parallax/fade) — it never gates
  // whether the hero content is visible. Everything below appears
  // automatically on load via time-based animation.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[90px]"
      />

      <motion.div
        style={{
          y: reduceMotion ? 0 : parallaxY,
          opacity: reduceMotion ? 1 : scrollFade,
        }}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, scale: 0.88, filter: "blur(6px)" }
        }
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <StackdIconReversed className="h-28 w-auto sm:h-36 md:h-44" />
      </motion.div>

      <motion.p
        {...fadeUp(0.3)}
        className="mt-8 font-mono text-xs uppercase tracking-widest text-teal-light"
      >
        Automated Retail, Engineered
      </motion.p>

      <motion.h1
        {...fadeUp(0.42)}
        className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
      >
        We build and operate automated retail.
      </motion.h1>

      <motion.p
        {...fadeUp(0.56)}
        className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70"
      >
        STACKD partners with premium hospitality venues to deploy smart,
        remotely-monitored retail technology. Our first automated retail
        solution focuses on premium vape products — infrastructure built
        to scale into new categories over time.
      </motion.p>

      <motion.div
        {...fadeUp(0.72)}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
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

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
          Scroll To Explore
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-offwhite/40 to-transparent" />
      </motion.div>
    </section>
  );
}
