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
