"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GeometricBackground } from "./geometric-background";

const EASE = [0.22, 1, 0.36, 1] as const;

// Switched from the photographed Black Wall render to the same
// transparent-cutout device shot used by How It Works
// (how-it-works-machine-v5.png). That render is close enough to
// straight-on that it needs no keystone correction — a plain CSS rect
// lines up against the real screen edges with no bezel-mask trick
// required, unlike the Black Wall photo which was shot at a slight
// angle. Same source image, same rect (see how-it-works-demo.tsx).
const SCREEN_RECT = {
  left: "17.95%",
  top: "12.78%",
  width: "65.10%",
  height: "56.93%",
};

// Real designed campaigns — v5: rebuilt after the screen's true aspect
// was corrected from ~0.47:1 (the old Black Wall crop) to the actual
// ~0.732:1 (measured from the How It Works machine's real screen
// pixels). v4 was sized for the old ratio, hence the pillarboxing; this
// batch was generated directly against the corrected spec and lands
// within 0.6% of the target on all five — no server-side cropping
// needed, just flatten + re-encode to JPG (brand-source/export-adverts-v5.js).
const CAMPAIGNS = [
  { src: "/images/advert-live-music-v5.jpg", alt: "STACKD screen showing a Live Music night promotion" },
  { src: "/images/advert-happy-hour-v5.jpg", alt: "STACKD screen showing a Happy Hour promotion" },
  { src: "/images/advert-golf-day-v5.jpg", alt: "STACKD screen showing a Golf Day promotion" },
  { src: "/images/advert-pro-shop-v5.jpg", alt: "STACKD screen showing a Pro Shop promotion" },
  { src: "/images/advert-burgers-beers-v5.jpg", alt: "STACKD screen showing a Burgers and Beers promotion" },
];

export function AdvertisingSection() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CAMPAIGNS.length);
    }, 3800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  const campaign = CAMPAIGNS[reduceMotion ? 0 : index];

  return (
    <section className="relative overflow-hidden bg-offwhite">
      <GeometricBackground tone="light" />
      <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-sm uppercase tracking-widest text-teal-dark"
            >
              Venue Communications
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
            >
              More than a vending machine.
            </motion.h2>

            <motion.p
              {...fadeUp(0.22)}
              className="mt-8 max-w-md font-sans text-lg leading-relaxed text-charcoal/60"
            >
              Between purchases, the integrated display becomes a premium
              communication channel for your venue. Promote events,
              specials, seasonal campaigns and carefully selected partner
              advertising — all managed remotely and displayed only while
              the machine is idle.
            </motion.p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto w-full max-w-[360px]"
          >
            {/* Same transparent-cutout device shot as How It Works — no
                wall, sits directly on the section's own charcoal
                background. Straight-on enough that no bezel mask is
                needed: the plain SCREEN_RECT rect below lines up against
                the real screen edges on its own. */}
            <div className="relative aspect-[596/931] w-full">
              <Image
                src="/images/how-it-works-machine-v5.png"
                alt="The STACKD machine's display, shown between purchases"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 360px, 80vw"
              />
              {/* The machine photo itself never changes — only this
                  screen-rect overlay crossfades. No slide, no zoom, no
                  device movement, per the brief: elegant fades only. */}
              <div
                className="absolute overflow-hidden rounded-[3px]"
                style={SCREEN_RECT}
              >
                {/* No mode="wait" here on purpose — that sequences exit
                    then enter, leaving a blank gap (the bare screen
                    fill) visible between campaigns. Simultaneous
                    (default) mode overlaps the fade-out and fade-in so
                    it reads as one continuous cross-dissolve, matching
                    "elegant fades" rather than fade-to-black-then-in. */}
                <AnimatePresence>
                  <motion.div
                    key={reduceMotion ? "static" : index}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0 h-full w-full bg-[#0b0d10]"
                  >
                    {/* object-contain, not cover: this screen's real
                        aspect (~0.71) is wider than the tall poster
                        campaigns (~0.47) — cover would crop into
                        headline text. contain never truncates, at the
                        cost of pillarboxing against the dark fill. */}
                    <Image
                      src={campaign.src}
                      alt={campaign.alt}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
