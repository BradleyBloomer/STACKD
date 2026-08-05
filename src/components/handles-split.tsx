"use client";

import { motion } from "framer-motion";

const STACKD_HANDLES = [
  "Remote monitoring & inventory intelligence",
  "Payment systems & transaction infrastructure",
  "Installation & hardware maintenance",
  "Restocking logistics",
  "Ongoing operational support",
];

const VENUE_PROVIDES = ["A suitable location", "Power", "Agreed connectivity"];

export function HandlesSplit() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/10">
      <div className="md:pr-16">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
          The System
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-offwhite">
          What STACKD handles
        </h3>
        <ul className="mt-8 flex flex-col gap-5">
          {STACKD_HANDLES.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="flex items-start gap-4 border-t border-white/10 pt-5 font-sans text-base text-offwhite/80"
            >
              <span className="font-mono text-xs text-teal-light">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="md:pl-16">
        <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40">
          The Venue
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-offwhite">
          What the venue provides
        </h3>
        <ul className="mt-8 flex flex-col gap-5">
          {VENUE_PROVIDES.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="flex items-start gap-4 border-t border-white/10 pt-5 font-sans text-base text-offwhite/80"
            >
              <span className="font-mono text-xs text-offwhite/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
        <p className="mt-8 font-sans text-sm leading-relaxed text-offwhite/50">
          In return, the venue earns passive revenue through an agreed
          commercial arrangement — no operational burden on your team.
        </p>
      </div>
    </div>
  );
}
