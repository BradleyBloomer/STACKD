import type { Metadata } from "next";
import { PartnerForm } from "@/components/partner-form";

export const metadata: Metadata = {
  title: "Partner With STACKD | Host a Vending Machine at Your Venue",
  description:
    "Tell us about your venue and start a conversation about hosting STACKD's automated retail technology.",
};

const STEPS = [
  "Submit your venue details",
  "We assess fit — foot traffic, layout, power access",
  "We install and configure the technology",
  "Your venue starts earning",
];

export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
            Partner With Us
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-offwhite sm:text-5xl">
            Turn your foot traffic into passive revenue.
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-offwhite/70">
            Tell us about your venue. If it&apos;s a good fit, we handle
            installation, stocking, monitoring, and support — you provide the
            space.
          </p>

          <ol className="mt-14 flex flex-col gap-6">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span className="font-mono text-xs text-teal-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="border-t border-white/10 pt-0 font-sans text-sm text-offwhite/70">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <PartnerForm />
      </div>
    </div>
  );
}
