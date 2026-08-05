import Link from "next/link";
import { HeroProduct } from "@/components/hero-product";
import { HowItWorksDemo } from "@/components/how-it-works-demo";
import { QuietPause } from "@/components/quiet-pause";
import { PartnershipStatement } from "@/components/partnership-statement";

export default function Home() {
  return (
    <>
      <HeroProduct />

      <HowItWorksDemo />

      <QuietPause />

      <PartnershipStatement />

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
