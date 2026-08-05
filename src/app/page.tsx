import { HeroProduct } from "@/components/hero-product";
import { HowItWorksDemo } from "@/components/how-it-works-demo";
import { MeetStackd } from "@/components/meet-stackd";
import { PartnershipStatement } from "@/components/partnership-statement";
import { ClosingCta } from "@/components/closing-cta";

export default function Home() {
  return (
    <>
      <HeroProduct />
      <HowItWorksDemo />
      <MeetStackd />
      <PartnershipStatement />
      <ClosingCta />
    </>
  );
}
