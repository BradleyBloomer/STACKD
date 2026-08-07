import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | STACKD",
  description: "How STACKD collects, uses, and protects your information.",
};

const SECTIONS = [
  {
    heading: "Information we collect",
    body: `We collect information you provide directly to us — such as your name, email address, and venue details when you submit a partnership enquiry or contact form. When you use a STACKD machine, the machine collects transaction data (product, price, timestamp) and age-verification confirmation. We do not collect or store government ID numbers or images.`,
  },
  {
    heading: "How we use information",
    body: `We use the information we collect to respond to enquiries, evaluate and manage venue partnerships, operate and improve our machines, and meet legal and regulatory obligations related to age-restricted retail.`,
  },
  {
    heading: "Cookies",
    body: `Our website uses only the minimum cookies required for the site to function correctly. We do not use third-party advertising or tracking cookies.`,
  },
  {
    heading: "Sharing of information",
    body: `We do not sell your information. We may share information with service providers who help us operate our business (such as payment processing and hosting providers), or where required by law.`,
  },
  {
    heading: "Data security",
    body: `We take reasonable technical and organizational measures to protect the information we hold. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    heading: "Your rights",
    body: `You may request access to, correction of, or deletion of your personal information by contacting us at the details below.`,
  },
  {
    heading: "Changes to this policy",
    body: `We may update this policy from time to time. Material changes will be reflected by an updated revision date on this page.`,
  },
  {
    heading: "Contact",
    body: `Questions about this policy can be directed to us via our contact page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="border-t border-charcoal/10 bg-offwhite">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-dark">
          Legal
        </p>
        <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-charcoal sm:text-5xl">
          Privacy Policy
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
