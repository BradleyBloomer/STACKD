import { HeroProduct } from "@/components/hero-product";
import { HowItWorksDemo } from "@/components/how-it-works-demo";
import { QuietPause } from "@/components/quiet-pause";
import { PartnershipStatement } from "@/components/partnership-statement";
import { ClosingCta } from "@/components/closing-cta";

export default function Home() {
  return (
    <>
      <HeroProduct />
      <HowItWorksDemo />
      <QuietPause />
      <PartnershipStatement />
      <ClosingCta />
    </>
  );
}
