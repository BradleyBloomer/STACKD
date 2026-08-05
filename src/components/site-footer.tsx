import Link from "next/link";
import { StackdIconReversed } from "./stackd-icon-reversed";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-stackd", label: "Why STACKD" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight text-offwhite transition-opacity hover:opacity-80"
            >
              <StackdIconReversed className="h-8 w-auto" />
              STACKD
            </Link>
            <p className="mt-4 font-sans text-sm leading-relaxed text-offwhite/60">
              South African automated retail infrastructure. Built to scale
              beyond a single category, a single venue type, or a single
              city.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40">
                Site
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-offwhite/70 hover:text-offwhite"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40">
                Legal
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-offwhite/70 hover:text-offwhite"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40">
                Contact
              </p>
              <ul className="mt-4 flex flex-col gap-3 font-sans text-sm text-offwhite/70">
                <li>South Africa</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-widest text-offwhite/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} STACKD. All rights reserved.</p>
          <p>Proudly South African</p>
        </div>
      </div>
    </footer>
  );
}
