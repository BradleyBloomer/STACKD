"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["General enquiry", "Partnership", "Press", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact-enquiry", {
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
          A member of the STACKD team will read your message and respond as
          soon as possible.
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
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="topic"
          className="font-mono text-xs uppercase tracking-widest text-offwhite/50"
        >
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
        >
          <option value="" disabled className="bg-charcoal">
            Select a topic
          </option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic} className="bg-charcoal">
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-offwhite/50"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-accent-coral">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-teal px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="rounded-md border border-white/15 bg-transparent px-3 py-2.5 font-sans text-sm text-offwhite outline-none focus:border-teal-light"
      />
    </div>
  );
}
