"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { GeometricBackground } from "./geometric-background";

// Screen rectangle as a percentage of the device cutout (the photo is a
// transparent-background PNG of just the machine now — no cream margin —
// so these percentages are relative to the cutout's own bounds), found
// via pixel-luminance edge scanning (brand-source/composite-front-view.js).
// This shot is close enough to front-on that no homography/keystone
// correction is needed, unlike the hero/Meet-STACKD renders.
const SCREEN_RECT = {
  left: "17.95%",
  top: "12.78%",
  width: "65.10%",
  height: "56.93%",
};
const STEPS = [
  "Tap to Begin",
  "Age Verification",
  "Browse Products",
  "Secure Payment",
  "Collect Purchase",
];

const EASE = [0.22, 1, 0.36, 1] as const;

function TapToBegin({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <p className="font-display text-base font-medium tracking-tight text-offwhite/80">
        STACKD
      </p>
      <div className="relative flex h-9 w-9 items-center justify-center">
        {animate && (
          <motion.span
            className="absolute h-9 w-9 rounded-full border border-teal-light/50"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="h-2 w-2 rounded-full bg-teal-light" />
      </div>
      <p className="font-display text-sm font-medium text-offwhite">
        Tap to Begin
      </p>
    </div>
  );
}

function AgeVerification() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 px-4 text-center">
      <p className="font-display text-sm font-medium text-offwhite">
        Confirm Your Age
      </p>
      <p className="font-sans text-[10px] leading-snug text-offwhite/50">
        You must be 18 or older to continue.
      </p>
      <span className="rounded-full bg-teal px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-offwhite">
        I&rsquo;m 18+
      </span>
    </div>
  );
}

function BrowseProducts() {
  const tiles = Array.from({ length: 6 });
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 px-4">
      <p className="font-display text-sm font-medium text-offwhite">
        Browse Products
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {tiles.map((_, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-sm bg-white/10 ring-teal-light/40 ring-offset-1 ring-offset-charcoal transition-colors duration-150 hover:bg-teal-light hover:ring-2"
          />
        ))}
      </div>
    </div>
  );
}

function SecurePayment({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <p className="font-display text-sm font-medium text-offwhite">
        Tap to Pay
      </p>
      <div className="relative flex h-7 w-10 items-center justify-center rounded-md border border-white/15">
        {animate && (
          <motion.span
            className="absolute -inset-1.5 rounded-lg border border-teal-light/40"
            animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="h-0.5 w-4 rounded-full bg-teal-light/60" />
      </div>
    </div>
  );
}

function CollectPurchase() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5">
      <p className="font-display text-sm font-medium text-offwhite">
        Collect Below
      </p>
      <span className="text-xs text-offwhite/40">↓</span>
      <span className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-offwhite/60">
        Push
      </span>
    </div>
  );
}

export function HowItWorksDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  // Clicking the screen advances the same underlying state scrolling does —
  // one source of truth (scroll position). We set the step immediately for
  // an unlaggy response, then smooth-scroll the page to match so continued
  // scrolling afterward picks up from the right place.
  const advanceStep = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableRange = section.offsetHeight - window.innerHeight;

    if (activeStep === STEPS.length - 1) {
      // Finished the cycle. Looping back to step 0 used to jump the scroll
      // position back near the top of this (320vh) section — so finishing
      // the demo meant re-scrolling through the whole thing again just to
      // reach whatever comes next on the page. Move forward instead: past
      // the end of the pinned range, into the next section.
      window.scrollTo({ top: sectionTop + scrollableRange + 80, behavior: "auto" });
      setActiveStep(0);
      return;
    }

    const next = activeStep + 1;
    setActiveStep(next);

    const targetProgress = (next + 0.5) / STEPS.length;
    const targetY = sectionTop + targetProgress * scrollableRange;

    // Instant, not smooth: the section is sticky/pinned, so the visible
    // result is identical either way (the pinned content masks the scroll
    // change). Smooth scrolling here would pass through intermediate scroll
    // positions that don't match `next` yet, and the scroll listener above
    // would overwrite this step with those stale in-between values before
    // the animation finished — a real race, not just a sandbox quirk.
    window.scrollTo({ top: targetY, behavior: "auto" });
  }, [activeStep]);

  const screens = [
    <TapToBegin key="0" animate={!reduceMotion} />,
    <AgeVerification key="1" />,
    <BrowseProducts key="2" />,
    <SecurePayment key="3" animate={!reduceMotion} />,
    <CollectPurchase key="4" />,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-charcoal/10 bg-offwhite text-charcoal"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden px-6 py-20 md:px-10">
        <GeometricBackground tone="light" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,400px)_1fr]">
          <div className="mx-auto w-full max-w-[360px]">
            <div
              role="button"
              tabIndex={0}
              aria-label="Advance to the next step"
              onClick={advanceStep}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  advanceStep();
                }
              }}
              className="relative aspect-[596/931] w-full cursor-pointer select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-teal-light/60"
            >
              <Image
                src="/images/how-it-works-machine-v5.png"
                alt="The STACKD machine's touchscreen"
                fill
                className="pointer-events-none object-contain"
                sizes="360px"
              />
              <div
                className="absolute overflow-hidden rounded-[3px]"
                style={SCREEN_RECT}
              >
                {reduceMotion ? (
                  screens[activeStep]
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 6, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: activeStep === 0 ? 0.3 : 0.5, ease: EASE },
                        y: { duration: 0.5, ease: EASE },
                        scale: { duration: 0.5, ease: EASE },
                      }}
                      className="h-full w-full"
                    >
                      {screens[activeStep]}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-teal-dark">
              STACKD Vending Machines
            </p>
            <h2 className="mt-4 max-w-md font-display text-5xl font-medium leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              Start your journey with STACKD.
            </h2>

            <ul className="mt-12 flex flex-col gap-5">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  className={`border-l-2 pl-5 font-display text-xl transition-colors duration-500 sm:text-2xl ${
                    i === activeStep
                      ? "border-teal text-charcoal"
                      : "border-charcoal/10 text-charcoal/35"
                  }`}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
