import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";

export const metadata: Metadata = {
  title: "About STACKD | South African Automated Retail Company",
  description:
    "STACKD is a South African automated retail technology company building fully managed retail machines for premium hospitality venues.",
};

const VALUES = [
  {
    label: "Restraint over spectacle",
    body: "The machine is designed to feel like it belongs — quiet, well-finished, and never competing for attention.",
  },
  {
    label: "Reliability over features",
    body: "Every part of the experience is built to work the same way, every time, without staff intervention.",
  },
  {
    label: "Partnership over transactions",
    body: "We manage installation, stocking, and support so venues can treat STACKD as a revenue line, not a vendor to manage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
          About
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-offwhite sm:text-5xl lg:text-6xl">
          A South African automated retail company.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-offwhite/70">
          STACKD designs, installs, and operates compact, wall-mounted
          retail machines for premium hospitality venues — bars,
          restaurants, and similar spaces where a discreet, reliable point
          of sale adds value without adding staff.
        </p>
        <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-offwhite/70">
          Our first automated retail solution focuses on premium vape
          products. As our technology and partner network grow, our focus
          stays the same: automated retail that feels like it belongs in
          the venue it serves.
        </p>

        <div className="mx-auto mt-20 grid max-w-3xl gap-10 text-left sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.label} className="border-t border-white/10 pt-6">
              <h2 className="font-display text-lg font-medium text-offwhite">
                {value.label}
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-offwhite/60">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ClosingCta />
    </>
  );
}
