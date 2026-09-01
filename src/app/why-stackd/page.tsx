import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";

export const metadata: Metadata = {
  title: "Why Partner With STACKD | Automated Vending for Venues",
  description:
    "Why hospitality venues partner with STACKD for fully managed, automated vending machines.",
};

const FAQS = [
  {
    question: "What is STACKD?",
    answer:
      "STACKD is a South African automated retail technology company. We design, install, and operate compact, wall-mounted vending machines for premium hospitality venues.",
  },
  {
    question: "What does a STACKD vending machine sell?",
    answer:
      "Our first automated retail solution focuses on premium vape products — an ID-verified category well suited to cashless, automated sale.",
  },
  {
    question: "How does a STACKD machine verify a customer's age?",
    answer:
      "Every purchase requires age verification before payment can proceed. Attempting to bypass this is a violation of our terms of use.",
  },
  {
    question: "What does it cost a venue to host a STACKD machine?",
    answer:
      "There is no upfront cost to the venue. STACKD handles installation, stocking, monitoring, and support — the venue provides the wall space.",
  },
  {
    question: "How much can a venue earn from hosting a STACKD machine?",
    answer:
      "Venues earn a fixed share of every sale. The exact amount depends on foot traffic and average basket value — use the revenue estimator on our homepage for an illustrative estimate, or get in touch for specifics.",
  },
  {
    question: "Where does STACKD operate?",
    answer: "STACKD currently operates in South Africa.",
  },
  {
    question: "How do I get a STACKD machine installed at my venue?",
    answer:
      "Submit a partnership enquiry with your venue details. STACKD assesses fit — foot traffic, layout, and power access — then handles installation and configuration.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const PILLARS = [
  {
    label: "Built for hospitality",
    body: "Compact and wall-mounted, finished to the same standard as the venues it serves — not a bulky, generic vending machine.",
  },
  {
    label: "Fully managed",
    body: "Installation, stocking, monitoring, and support are handled by STACKD from day one. Your team never has to think about it.",
  },
  {
    label: "Transparent revenue share",
    body: "Your venue earns a fixed share of every sale, with no upfront cost and no hidden fees.",
  },
  {
    label: "Remote by design",
    body: "Age verification, secure payment, and inventory monitoring all run automatically, with no staff involvement required.",
  },
];

export default function WhyStackdPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
          Why STACKD
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-offwhite sm:text-5xl lg:text-6xl">
          A revenue line you don&apos;t have to manage.
        </h1>
        <p className="mx-auto mt-6 max-w-lg font-sans text-lg leading-relaxed text-offwhite/70">
          STACKD installs, stocks, and maintains automated retail technology
          inside your venue. You provide the wall — we handle everything
          else.
        </p>

        <div className="mx-auto mt-20 grid max-w-3xl gap-10 text-left sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="border-t border-white/10 pt-6"
            >
              <h2 className="font-display text-lg font-medium text-offwhite">
                {pillar.label}
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-offwhite/60">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-20 max-w-lg font-sans text-sm leading-relaxed text-offwhite/50">
          STACKD is a South African automated retail technology company. Our
          first automated retail solution focuses on premium vape products
          for hospitality venues.
        </p>

        <div className="mx-auto mt-28 max-w-2xl text-left">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-teal-light">
            Common Questions
          </p>
          <dl className="mt-10 flex flex-col gap-8">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-t border-white/10 pt-6">
                <dt className="font-display text-lg font-medium text-offwhite">
                  {faq.question}
                </dt>
                <dd className="mt-3 font-sans text-sm leading-relaxed text-offwhite/60">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ClosingCta />
    </>
  );
}
