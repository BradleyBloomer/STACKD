"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GeometricBackground } from "./geometric-background";

const EASE = [0.22, 1, 0.36, 1] as const;

const SALES_MIN = 3;
const SALES_MAX = 40;
const SALES_DEFAULT = 12;

const BASKET_MIN = 140;
const BASKET_MAX = 320;
const BASKET_STEP = 10;
const BASKET_DEFAULT = 220;

const currency = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

function formatZAR(value: number) {
  // en-ZA renders "ZAR" instead of "R" in some environments — normalize.
  return currency.format(value).replace("ZAR", "R").replace(/\s+/g, " ");
}

export function RevenueEstimator() {
  const reduceMotion = useReducedMotion();
  const [salesPerDay, setSalesPerDay] = useState(SALES_DEFAULT);
  const [basketValue, setBasketValue] = useState(BASKET_DEFAULT);

  const estimatedMonthlyVenueIncome = useMemo(
    () => Math.round(((salesPerDay * basketValue * 30) / 1.15) * 0.2),
    [salesPerDay, basketValue]
  );

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden border-t border-charcoal/10 bg-offwhite text-charcoal">
      <GeometricBackground tone="light" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 md:px-10">
        <div className="text-center">
          <motion.p
            {...reveal(0)}
            className="font-mono text-sm uppercase tracking-widest text-teal-dark"
          >
            Estimate Your Revenue
          </motion.p>

          <motion.h2
            {...reveal(0.1)}
            className="mx-auto mt-6 max-w-xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            What could your venue earn?
          </motion.h2>

          <motion.p
            {...reveal(0.2)}
            className="mx-auto mt-6 max-w-md font-sans text-lg leading-relaxed text-charcoal/60"
          >
            Adjust average daily sales and basket value to estimate your
            venue&apos;s monthly share.
          </motion.p>
        </div>

        <motion.div
          {...reveal(0.3)}
          className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-10"
        >
          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="sales-per-day"
                className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40"
              >
                Average Sales Per Day
              </label>
              <span className="font-display text-xl font-medium tabular-nums">
                {salesPerDay}
              </span>
            </div>
            <input
              id="sales-per-day"
              type="range"
              min={SALES_MIN}
              max={SALES_MAX}
              step={1}
              value={salesPerDay}
              onChange={(e) => setSalesPerDay(Number(e.target.value))}
              className="stackd-range mt-5 w-full"
              aria-valuetext={`${salesPerDay} sales per day`}
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-charcoal/30">
              <span>{SALES_MIN}</span>
              <span>{SALES_MAX}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="basket-value"
                className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40"
              >
                Average Basket Value
              </label>
              <span className="font-display text-xl font-medium tabular-nums">
                {formatZAR(basketValue)}
              </span>
            </div>
            <input
              id="basket-value"
              type="range"
              min={BASKET_MIN}
              max={BASKET_MAX}
              step={BASKET_STEP}
              value={basketValue}
              onChange={(e) => setBasketValue(Number(e.target.value))}
              className="stackd-range mt-5 w-full"
              aria-valuetext={formatZAR(basketValue)}
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-charcoal/30">
              <span>{formatZAR(BASKET_MIN)}</span>
              <span>{formatZAR(BASKET_MAX)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.4)}
          className="mt-16 border-t border-charcoal/10 pt-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-charcoal/40">
            Estimated Monthly Venue Income
          </p>
          <p className="mt-4 font-display text-5xl font-medium tracking-tight tabular-nums sm:text-6xl">
            {formatZAR(estimatedMonthlyVenueIncome)}
          </p>
          <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-charcoal/50">
            Reflects your venue&apos;s 20% revenue share, excluding VAT.
          </p>
        </motion.div>

        <motion.p
          {...reveal(0.5)}
          className="mx-auto mt-10 max-w-md text-center font-mono text-[11px] uppercase tracking-widest text-charcoal/35"
        >
          Illustrative estimate only. No guaranteed earnings. Actual sales
          will vary.
        </motion.p>
      </div>
    </section>
  );
}
