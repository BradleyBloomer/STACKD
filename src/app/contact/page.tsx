import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact STACKD | Vending Machine Partnerships & Support",
  description:
    "Get in touch with STACKD about partnerships, press, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
            Contact
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-offwhite sm:text-5xl">
            Get in touch.
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-offwhite/70">
            Questions about STACKD, partnerships, or press — send us a
            message and we&apos;ll get back to you.
          </p>

          <p className="mt-14 font-sans text-sm leading-relaxed text-offwhite/60">
            Looking to host a STACKD machine at your venue?{" "}
            <Link
              href="/partner"
              className="text-teal-light underline decoration-teal-light/40 underline-offset-4 hover:decoration-teal-light"
            >
              Use our partnership enquiry
            </Link>{" "}
            instead — it&apos;s the fastest way to get a response.
          </p>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-offwhite/40">
            South Africa
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
