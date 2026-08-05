"use client";

import Link from "next/link";
import { useState } from "react";
import { StackdIconReversed } from "./stackd-icon-reversed";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-stackd", label: "Why STACKD" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight text-offwhite transition-opacity hover:opacity-80"
        >
          <StackdIconReversed className="h-6 w-auto md:h-7" />
          STACKD
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-offwhite/70 transition-colors hover:text-offwhite"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/partner"
            className="rounded-full bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-offwhite transition-colors hover:bg-teal-light"
          >
            Partner With Us
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="h-[1.5px] w-6 bg-offwhite" />
          <span className="h-[1.5px] w-6 bg-offwhite" />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-offwhite/70"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/partner"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-teal px-5 py-3 text-center font-mono text-sm uppercase tracking-widest text-offwhite"
          >
            Partner With Us
          </Link>
        </nav>
      )}
    </header>
  );
}
