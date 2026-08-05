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

export function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const iconScale = useTransform(scrollYProgress, [0, 0.35], [0.72, 1]);
  const iconOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const iconBlurPx = useTransform(scrollYProgress, [0, 0.3], [10, 0]);
  const iconBlur = useTransform(iconBlurPx, (v) => `blur(${v}px)`);

  const labelOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.15, 0.35], [16, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.3, 0.55], [28, 0]);

  const bodyOpacity = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.42, 0.62], [20, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.55, 0.75], [16, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const animatedStyle = (style: Record<string, unknown>) =>
    reduceMotion ? { opacity: 1 } : style;

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[100px]"
        />

        <motion.div
          style={animatedStyle({
            scale: iconScale,
            opacity: iconOpacity,
            filter: iconBlur,
          })}
          className="relative"
        >
          <StackdIconReversed className="h-40 w-auto sm:h-52 md:h-64" />
        </motion.div>

        <motion.p
          style={animatedStyle({ opacity: labelOpacity, y: labelY })}
          className="mt-10 font-mono text-xs uppercase tracking-widest text-teal-light"
        >
          Automated Retail, Engineered
        </motion.p>

        <motion.h1
          style={animatedStyle({ opacity: headlineOpacity, y: headlineY })}
          className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
        >
          We build and operate automated retail.
        </motion.h1>

        <motion.p
          style={animatedStyle({ opacity: bodyOpacity, y: bodyY })}
          className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70"
        >
          STACKD partners with premium hospitality venues to deploy smart,
          remotely-monitored retail technology. Our first automated retail
          solution focuses on premium vape products — infrastructure built
          to scale into new categories over time.
        </motion.p>

        <motion.div
          style={animatedStyle({ opacity: ctaOpacity, y: ctaY })}
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
          style={animatedStyle({ opacity: hintOpacity })}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
            Scroll To Explore
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-offwhite/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
