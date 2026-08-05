"use client";

import { useState, type FormEvent } from "react";

const VENUE_TYPES = [
  "Bar",
  "Restaurant",
  "Nightclub",
  "Hotel",
  "Entertainment venue",
  "Other hospitality venue",
];

export function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-light">
          Received
        </p>
        <h2 className="mt-4 font-display text-2xl font-medium text-offwhite">
          Thanks — we&apos;ll be in touch shortly.
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-offwhite/60">
          A member of the STACKD team will review your venue details and
          follow up to discuss next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Venue name" name="venueName" required />
        <Field label="Contact name" name="contactName" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="venueType"
            className="font-mono text-xs uppercase tracking-widest text-offwhite/50"
          >
            Venue type
          </label>
          <select
            id="venueType"
            name="venueType"
            required
            defaultValue=""
            className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
          >
            <option value="" disabled className="bg-charcoal">
              Select venue type
            </option>
            {VENUE_TYPES.map((type) => (
              <option key={type} value={type} className="bg-charcoal">
                {type}
              </option>
            ))}
          </select>
        </div>
        <Field label="City" name="city" required />
      </div>
      <Field
        label="Estimated weekly foot traffic"
        name="footTraffic"
        placeholder="e.g. 500–1,000"
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-offwhite/50"
        >
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-accent-coral">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-teal px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-xs uppercase tracking-widest text-offwhite/50"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
      />
    </div>
  );
}
