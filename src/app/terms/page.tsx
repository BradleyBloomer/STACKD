import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | STACKD",
  description: "Terms of use for the STACKD website and machines.",
};

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    body: `By using this website or a STACKD machine, you agree to these terms. If you do not agree, please do not use our website or machines.`,
  },
  {
    heading: "Age restrictions",
    body: `STACKD machines dispense age-restricted products. Every purchase requires age verification before payment can proceed. Attempting to circumvent age verification is a violation of these terms and may be a violation of local law.`,
  },
  {
    heading: "Use of the website",
    body: `This website is provided for informational purposes and to facilitate partnership and contact enquiries. You agree not to misuse the site, attempt to gain unauthorized access to our systems, or submit false information through our forms.`,
  },
  {
    heading: "Partnership enquiries",
    body: `Submitting a partnership or contact enquiry does not guarantee a venue placement or response within any specific timeframe. All partnerships are subject to a separate written agreement between STACKD and the venue.`,
  },
  {
    heading: "Intellectual property",
    body: `The STACKD name, logo, and all website content are the property of STACKD and may not be reproduced without permission.`,
  },
  {
    heading: "Disclaimer of warranties",
    body: `This website and our machines are provided "as is." While we take reasonable steps to keep our machines and website reliable, we do not guarantee uninterrupted or error-free operation.`,
  },
  {
    heading: "Limitation of liability",
    body: `To the fullest extent permitted by law, STACKD is not liable for any indirect, incidental, or consequential damages arising from use of this website or a STACKD machine.`,
  },
  {
    heading: "Governing law",
    body: `These terms are governed by the laws of South Africa.`,
  },
  {
    heading: "Changes to these terms",
    body: `We may update these terms from time to time. Material changes will be reflected by an updated revision date on this page.`,
  },
];

export default function TermsPage() {
  return (
    <div className="border-t border-charcoal/10 bg-offwhite">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-dark">
          Legal
        </p>
        <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-charcoal sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-charcoal/40">
          Last updated: August 2026
        </p>

        <div className="mt-14 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-medium text-charcoal">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-charcoal/70">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
