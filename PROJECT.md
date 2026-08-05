# STACKD Website — Standing Project Decisions

This file records durable brand and product decisions for this codebase —
things that should stay consistent across future sessions and shouldn't be
silently re-litigated by whoever (or whatever) works on this next. Add to it
as new standing decisions are made; don't delete history, mark it superseded.

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
