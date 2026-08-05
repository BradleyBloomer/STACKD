import type { Metadata } from "next";
import { HowItWorksDemo } from "@/components/how-it-works-demo";
import { ClosingCta } from "@/components/closing-cta";

export const metadata: Metadata = {
  title: "How It Works | STACKD",
  description:
    "How a customer buys from a STACKD machine — tap to begin, age verification, browse, pay, and collect.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksDemo />
      <ClosingCta />
    </>
  );
}
