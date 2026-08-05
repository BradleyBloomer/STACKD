"use client";

import { motion, useReducedMotion } from "framer-motion";

const COLUMNS = [
  { width: 34, bars: [30, 55, 40, 70] },
  { width: 44, bars: [50, 35, 65, 45, 60] },
  { width: 34, bars: [45, 60, 30] },
];

export function HeroStack() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-[420px] gap-4 sm:h-[520px]">
      {COLUMNS.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex h-full flex-1 flex-col-reverse gap-[6px]"
          style={{ maxWidth: `${column.width}%` }}
        >
          {column.bars.map((height, barIndex) => {
            const isSignature = columnIndex === 1 && barIndex === 1;
            return (
              <motion.div
                key={barIndex}
                initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion
                    ? 0
                    : 0.15 + (columnIndex * column.bars.length + barIndex) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: "bottom",
                  height: `${height}%`,
                }}
                className={`w-full rounded-sm ${
                  isSignature
                    ? "bg-teal-light shadow-[0_0_24px_rgba(61,180,211,0.55)]"
                    : "bg-gradient-to-t from-teal-dark to-teal"
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
