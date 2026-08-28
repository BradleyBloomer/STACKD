import { HeroProduct } from "@/components/hero-product";
import { HowItWorksDemo } from "@/components/how-it-works-demo";
import { MeetStackd } from "@/components/meet-stackd";
import { PartnershipStatement } from "@/components/partnership-statement";
import { RevenueEstimator } from "@/components/revenue-estimator";
import { AdvertisingSection } from "@/components/advertising-section";
import { ClosingCta } from "@/components/closing-cta";

export default function Home() {
  return (
    <>
      <HowItWorksDemo />
      <MeetStackd />
      <AdvertisingSection />
      <HeroProduct />
      <PartnershipStatement />
      <RevenueEstimator />
      <ClosingCta />
    </>
  );
}
