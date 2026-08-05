import Link from "next/link";
import { HeroStack } from "@/components/hero-stack";
import { HandlesSplit } from "@/components/handles-split";
import { ProofMarquee } from "@/components/proof-marquee";

const ROADMAP = [
  {
    index: "001",
    status: "Live now",
    label: "Premium vape vending",
    detail: "Premium hospitality venues — bars, restaurants, clubs, hotels.",
  },
  {
    index: "002",
    status: "Platform expands to",
    label: "Snacks · Drinks · Electronics · Convenience · Medicine",
    detail: "Same infrastructure, new categories, no rebuild required.",
  },
  {
    index: "003",
    status: "Venues expand to",
    label: "Hotels · Airports · Universities",
    detail: "Anywhere with foot traffic, power, and a reason to stock up.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-16 md:px-10 md:pt-24 lg:flex-row lg:items-end lg:gap-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
            Automated Retail, Engineered
          </p>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-7xl">
            We build and operate automated retail.
          </h1>
          <p className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70">
            STACKD partners with premium hospitality venues to deploy smart,
            remotely-monitored retail technology. Our first automated retail
            solution focuses on premium vape products — infrastructure built
            to scale into new categories over time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <HeroStack />
        </div>
      </section>

      <section className="border-t border-white/10 bg-offwhite text-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-dark">
            Built to Scale
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            One platform. A category today, a category of categories
            tomorrow.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-charcoal/10 sm:grid-cols-3">
            {ROADMAP.map((item) => (
              <div key={item.index} className="bg-offwhite p-8">
                <p className="font-mono text-xs text-charcoal/40">
                  {item.index}
                </p>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-teal-dark">
                  {item.status}
                </p>
                <p className="mt-3 font-display text-xl font-medium leading-snug">
                  {item.label}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/60">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
            The Partnership
          </p>
          <div className="mt-16">
            <HandlesSplit />
          </div>
        </div>
      </section>

      <ProofMarquee />

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Have a venue that could earn passive revenue?
          </h2>
          <div className="mt-10">
            <Link
              href="/partner"
              className="inline-block rounded-full bg-teal px-8 py-4 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light"
            >
              Start a Partnership Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
