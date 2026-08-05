# STACKD Website — Standing Project Decisions

This file records durable brand and product decisions for this codebase —
things that should stay consistent across future sessions and shouldn't be
silently re-litigated by whoever (or whatever) works on this next. Add to it
as new standing decisions are made; don't delete history, mark it superseded.

## STACKD Design Principles (2026-08-05) — governs every design decision from here on

1. Trust before excitement.
2. Clarity before creativity.
3. Premium through restraint.
4. Every animation must have a purpose.
5. Every section answers one question.
6. Never exaggerate capability.
7. Design for decision-makers, not designers.
8. Hospitality first.
9. Less, but better.
10. If something feels unnecessary, remove it.

The root test behind all ten: **"Does this make STACKD feel more
trustworthy?"** Not more exciting, not more animated, not more modern.
Venue owners are trusting STACKD to install equipment in their
businesses — the site's job is to reinforce professionalism, reliability,
and premium execution, in that order, before novelty.

In practice:
- **Animation must be purposeful, never decorative-for-its-own-sake.** Motion
  should clarify hierarchy or sequence (entrance reveals, scroll-linked
  emphasis), not perform. Be suspicious of any animation whose only job is
  to look lively — continuous/infinite motion that isn't tied to a real
  status or action is a candidate for removal. (Precedent: the homepage's
  auto-scrolling proof marquee was removed for exactly this reason and
  replaced with a static row — see `src/components/proof-row.tsx`.)
- **Claims stay honest and specific.** No hype language, no vague
  superlatives — concrete, verifiable statements over excitement.
- **Restraint reads as competence.** Generous whitespace, clear hierarchy,
  controlled color use (see "don't overuse teal") — a site that feels
  calm and in control is itself a trust signal.
- **Predictability over surprise.** Interactions should behave as expected;
  nothing jarring, nothing that draws attention to itself as a "trick."
  Always respect prefers-reduced-motion.
- When a new idea is exciting but doesn't clearly pass the trust test, flag
  it rather than build it silently.

### Subtraction as the default (2026-08-05)

Elaborates principles 3, 9, and 10 with a concrete decision rule:

- **When faced with two good design options, choose the simpler one.**
- **Every visual element, animation, section, and sentence must justify its
  existence.** If it doesn't clearly earn its place, cut it — don't keep it
  because it's harmless.
- **The default answer is subtraction, not addition.** When a section feels
  like it needs more to feel finished, first ask whether something should
  be removed instead of something added.
- **Whitespace is not empty space — it is part of the design.** Don't fill
  it out of a feeling that space must be "used."
- **The machine is the hero. Everything else exists to support it** — copy,
  layout, motion, color all serve the product; none of it should compete
  with it for attention.

## Brand & product naming (2026-08-05)

- **STACKD is the company brand.**
- **The machine does not currently have a separate public product name.**
  It is referred to simply as "the STACKD machine." Do not introduce names
  like MINI, PRO, MAX, or ONE anywhere on the site.
- A product naming system may be introduced later if the product range
  expands beyond a single machine model — until then, avoid any copy that
  implies multiple models or a "platform" of machines already exist.

## Brand positioning

STACKD is positioned as a South African **automated retail technology
company**, not a vape company. Smart vape vending in premium hospitality
venues is the first deployment, not the whole identity. Messaging hierarchy
on every page: (1) smart technology, (2) hospitality partnerships,
(3) premium automated retail, (4) the vape vending focus stated honestly
and explicitly (e.g. "Our first automated retail solution focuses on
premium vape products") — never implying multiple product categories are
already live.

## Homepage content discipline (2026-08-05)

Every homepage section must reinforce one of exactly five questions. If a
section doesn't clearly answer one of these, it doesn't belong on the
homepage:

1. What is STACKD?
2. What is the machine?
3. How does it work?
4. Why should a venue partner with STACKD?
5. How do we get started?

**No future-category teasing.** STACKD is currently focused on one thing —
premium automated vape retail for hospitality venues. Do not hint at future
product categories (snacks, drinks, electronics, etc.) or future venue
types (hotels, airports, universities) on the homepage. That story is
earned over time, not claimed in advance. This retired the homepage's
former "Built to Scale" roadmap section entirely (no replacement — the
five-question filter doesn't require one per question, and forcing a
section to exist just to cover a question is itself a violation of
"subtraction as the default" above). This is a stricter, homepage-specific
application of the "no multiple models/categories" rule under Brand &
product naming below — that rule was about product naming; this one is
about not previewing the roadmap at all yet, anywhere on the homepage.

## Creative direction: premium product company, not premium startup (2026-08-05)

STACKD is now explicitly being designed as a **premium product website**,
not a startup landing page. Reference benchmarks: Aeline, Apple, Bang &
Olufsen, Leica — but only for **discipline, rhythm, confidence, and
restraint**. Never for structure, layout, or color. (Aeline specifically
was checked and its actual structure — pricing tiers, testimonials, stat
counters, blog previews, dashboard cards, feature-card grids — is the
opposite of where STACKD is going; what's worth taking from it is the
*feeling*: confident typography, generous whitespace, editorial rhythm
between sections, premium photography, and the sense that every element
was placed on purpose. Nothing should feel like it exists to fill space.)

The measure of success: a visitor should think **"this feels like a
premium company,"** not **"nice website."** They should leave remembering
the product, not the website. This is the same spirit as the trust test
and subtraction principles above, applied specifically to visual/editorial
craft rather than messaging honesty.

Concrete homepage consequence: sections are being reduced from the
original build-out to a small number of exceptional ones (roughly
Hero → How It Works → a quiet photographic pause → The Partnership →
Closing CTA), each answering exactly one of the five homepage questions
above, with a genuine editorial "breathing room" beat added deliberately
(not as padding) between the interactive product demo and the business
proposition — see `src/components/` for whichever pause-section component
exists once built.

### Reference phase closed — refine STACKD as STACKD (2026-08-05)

The creative direction is now considered established. **No more external
reference sites from here** (no more Rovano, Aeline, or anything new) —
every decision from this point is judged against the principles and
narrative already recorded in this file, not against another company's
website. The goal has shifted from inspiration to **consistency**: making
the existing work exceptional rather than different. Effort now goes into
refining typography, spacing, rhythm, photography, and interaction within
what's already built — not introducing new ideas, patterns, or sections.
If a change can't be justified by something already written down here, it
probably shouldn't happen.

### Homepage structure frozen (2026-08-05)

The homepage's overall structure (five sections, their order, and the
Curiosity → Understanding → Admiration → Commercial confidence → Action
arc) is now considered **frozen** — change it only if review surfaces a
genuine issue, not to try a new idea. Focus shifts to the remaining pages
(How It Works, Why STACKD, About, Contact, legal placeholders): they must
reuse the homepage's established design system, components, motion
language, and pacing philosophy rather than inventing new ones. **The
homepage is now the benchmark every other page is judged against.**

## Hero product render

The homepage hero is a flexible two-column layout (copy left, image slot
right) that accepts a photorealistic render of the real machine once one is
chosen — see `PRODUCT_IMAGE_SRC` in `src/components/hero-product.tsx` and
`brand-source/hero-render-prompts.md` for the render brief. The machine is
based on the real Reyeah D02 Pro the user owns, wall-mounted, rebranded to
STACKD, Reyeah branding fully removed. The site does not claim STACKD built
the machine's underlying operating system — the real customer interaction
flow (Welcome → Age Verification → Product Selection → Payment → Dispensing
→ Thank You) should be presented honestly wherever it's described (planned
home: the How It Works page).
