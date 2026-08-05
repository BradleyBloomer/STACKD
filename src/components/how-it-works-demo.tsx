"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { StackdIconReversed } from "./stackd-icon-reversed";

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
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <StackdIconReversed className="h-10 w-auto opacity-80" />
      <div className="relative flex h-8 w-8 items-center justify-center">
        {animate && (
          <motion.span
            className="absolute h-8 w-8 rounded-full border border-teal-light/50"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="h-2 w-2 rounded-full bg-teal-light" />
      </div>
      <p className="font-display text-lg font-medium text-offwhite">
        Tap to Begin
      </p>
    </div>
  );
}

function AgeVerification() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center">
      <p className="font-display text-lg font-medium text-offwhite">
        Confirm Your Age
      </p>
      <p className="font-sans text-xs text-offwhite/50">
        You must be 18 or older to continue.
      </p>
      <span className="rounded-full bg-teal px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-offwhite">
        I&rsquo;m 18+
      </span>
    </div>
  );
}

function BrowseProducts() {
  const tiles = Array.from({ length: 6 });
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-8">
      <p className="font-display text-lg font-medium text-offwhite">
        Browse Products
      </p>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((_, i) => (
          <span
            key={i}
            className={`h-8 w-8 rounded-md ${
              i === 2
                ? "bg-teal-light ring-2 ring-teal-light/40 ring-offset-2 ring-offset-charcoal"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SecurePayment({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <p className="font-display text-lg font-medium text-offwhite">
        Tap to Pay
      </p>
      <div className="relative flex h-10 w-14 items-center justify-center rounded-md border border-white/15">
        {animate && (
          <motion.span
            className="absolute -inset-2 rounded-lg border border-teal-light/40"
            animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="h-1 w-6 rounded-full bg-teal-light/60" />
      </div>
    </div>
  );
}

function CollectPurchase() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <p className="font-display text-lg font-medium text-offwhite">
        Collect Below
      </p>
      <span className="text-offwhite/40">↓</span>
      <span className="rounded-md border border-white/15 px-6 py-2 font-mono text-[11px] uppercase tracking-widest text-offwhite/60">
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

    const next = (activeStep + 1) % STEPS.length;
    setActiveStep(next);

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableRange = section.offsetHeight - window.innerHeight;
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
      className="relative border-t border-white/10 bg-charcoal"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="mx-auto w-full max-w-[300px]">
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
              className="relative aspect-[9/16] w-full cursor-pointer select-none rounded-xl border border-white/15 bg-[#08090a] p-2.5 outline-none focus-visible:ring-2 focus-visible:ring-teal-light/60"
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-charcoal">
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
            <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
              How It Works
            </p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-5xl">
              How does someone buy from STACKD?
            </h2>

            <ul className="mt-12 flex flex-col gap-5">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  className={`border-l-2 pl-5 font-display text-xl transition-colors duration-500 sm:text-2xl ${
                    i === activeStep
                      ? "border-teal-light text-offwhite"
                      : "border-white/10 text-offwhite/30"
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
