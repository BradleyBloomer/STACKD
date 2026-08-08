# STACKD Website — Standing Project Decisions

This file records durable brand and product decisions for this codebase —
things that should stay consistent across future sessions and shouldn't be
silently re-litigated by whoever (or whatever) works on this next. Add to it
as new standing decisions are made; don't delete history, mark it superseded.

## Geometric background: Hero-only, not site-wide (2026-08-06)

The subtle hexagon pattern behind the Hero (`geometric-background.tsx`)
stays scoped to the Hero — the user explicitly left the call up to me.
Decided against extending it site-wide: it echoes the cube/stack icon's
geometry nicely as a one-time texture, but spreading it across every
section would work against what's making the other sections strong —
Meet STACKD's huge typography needs a quiet stage, Partnership's flat
off-white reads as calm specifically because it's clean, and the
interactive demo shouldn't compete with background texture.

Note: the original version of this reasoning called Hero "the opening
moment" — no longer true since the 2026-08-06 reorder moved Hero to
third position (How It Works → Meet STACKD → Hero → ...). The real
reason to keep the texture scoped to Hero has nothing to do with
position: Hero is still the one section carrying a full product
photograph plus the page's largest headline treatment — the
hardware/positioning showcase beat, sandwiched between two flatter
typographic sections. The texture gives that section a bit more visual
depth to match its heft, independent of where it sits in the order. No
code change — it was already scoped this way; this just makes the
decision (and its correct reasoning) durable so it isn't re-opened by
accident or re-justified with a stale premise later.

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

### Homepage reordered again (2026-08-06) — new frozen order

Restructured at the user's explicit direction, superseding the order
below. New order: **How It Works → Meet STACKD → Smart Vending (Hero) →
The Partnership → Estimate Your Revenue → Advertising → Get Started**.
Hero (`hero-product.tsx`) is no longer the opening section — How It
Works opens the page instead, with Hero repositioned mid-page as
reinforcement of the "Smart Vending" positioning rather than an
introduction. Flagged one real tradeoff to the user before implementing:
opening with the interactive phone demo instead of the hero photograph
means the first thing a visitor sees is a small mockup, not the
hardware — a real product photo up top typically does more for a "this
is a premium hardware company" first impression. Proceeded anyway since
this was an explicit, considered instruction, not a default.

Two content changes bundled into the same reorder:
- How It Works heading changed from "How does someone buy from STACKD?"
  to **"Start your journey with STACKD."** — copy only, eyebrow/steps/
  demo mechanics untouched.
- Meet STACKD's headline ("Quiet by design.") sized up substantially
  (`text-4xl sm:text-5xl` → `text-5xl sm:text-6xl lg:text-7xl`, matching
  the Hero's own H1 scale) since it's now doing more first-impression
  work than before.

**New section: Advertising** (`src/components/advertising-section.tsx`),
inserted between Revenue Estimator and Closing CTA. Describes the
touchscreen's idle state as a venue-brandable surface ("Between
purchases, the display is yours — venue promotions, house specials, or
brand messaging"). This describes a **capability, not a commitment** —
it assumes per-venue idle-screen customization is something STACKD
actually offers or plans to offer. That assumption came from me, not
from a confirmed product decision — **needs sign-off** before this reads
as a real feature claim rather than placeholder copy, same standard as
the revenue-estimator figures below.

**Resolved: black/offwhite strict alternation, including Hero
(2026-08-06).** The tension noted above (Meet STACKD and Hero both
charcoal back-to-back) was flagged, and the user confirmed strict
alternation matters more than leaving Hero untouched — so Hero was
recoloured for a light background, which the earlier note had scoped
out as "out of scope." Final order/background is now a clean
offwhite → charcoal → offwhite → charcoal → offwhite → charcoal →
offwhite across all seven sections (How It Works → Meet STACKD → Hero →
Partnership → Revenue Estimator → Venue Communications → Closing CTA),
verified via computed `background-color` in the browser, not just
visual inspection.

What changed to make Hero work on light:
- `hero-product.tsx`: section gets `bg-offwhite`; eyebrow/headline-accent
  flip `teal-light` → `teal-dark`; body text `text-offwhite/*` →
  `text-charcoal/*`; secondary "How It Works" button border/text flip
  from white-based to charcoal-based opacity tokens.
- `geometric-background.tsx`: gained an optional `tone?: "dark" |
  "light"` prop (default `"dark"`, so every other usage is unaffected)
  that bumps opacity slightly for the light variant — same teal stroke
  color either way, since the hex pattern is a brand reference (echoes
  the icon geometry), not a dark-mode-only decoration.
- `product-render-slot.tsx`: this component is Hero-only (no other
  usage), so it was directly restyled rather than parameterized —
  `border-white/10` → `border-charcoal/10`, the top-sheen gradient
  flipped from a white tint to a charcoal tint, and the empty-state
  fallback swapped `StackdIconReversed` (white, dark-bg icon) for the
  plain `StackdIcon` (teal, works on light) with charcoal-based caption
  text. If this slot is ever reused somewhere dark, it'll need the same
  tone-prop treatment `geometric-background.tsx` got instead of being
  hardcoded to light again.
- `partnership-statement.tsx` and `revenue-estimator.tsx` swapped places
  tonally (offwhite ⇄ charcoal) to keep the sequence alternating once
  Hero moved to offwhite — straightforward token flips, no new patterns.

**How It Works demo: finishing the cycle now moves forward, not back.**
Real UX bug, not cosmetic: clicking through to the last step
(`Collect Purchase`) and clicking once more used to wrap `activeStep`
back to 0 *and* scroll the page back near the top of the 320vh pinned
section — so finishing the demo meant re-scrolling through the entire
thing again just to reach whatever section came next. Fixed in
`how-it-works-demo.tsx`'s `advanceStep`: on the last step, scroll past
the end of the pinned range (into the next section) instead of back to
the section's own top; `activeStep` still resets to 0 so a later
scroll-back-up starts the demo fresh, but the reset no longer drags the
scroll position backward with it.

### Homepage structure frozen (2026-08-05) — superseded 2026-08-06, kept for history

The homepage's overall structure (five sections, their order, and the
Curiosity → Understanding → Admiration → Commercial confidence → Action
arc) is now considered **frozen** — change it only if review surfaces a
genuine issue, not to try a new idea.

**Update (2026-08-05, same day):** Review surfaced exactly such a genuine
issue — the "Quiet Pause" section only worked with world-class photography
in place; without it, it was an empty gap in the narrative, not a pause.
Replaced with a redesigned **"Meet STACKD"** section (`src/components/meet-stackd.tsx`,
not the original one retired earlier) at the same position (the
"Admiration" beat, between How It Works and Partnership): the product
render as the dominant visual, no headline pitch, no CTA, with the
hardware's factual specs (Display, Finish, Mount, Footprint) presented as
a quiet typographic caption underneath — no cards, no feature grid, no
icon wall. Those same specs were removed from the Hero (where they'd just
been added) to avoid repeating the same facts in two adjacent sections —
the Hero stays lean (headline, copy, CTA, image only); "Meet STACKD" is
now the sole home for grounding the product in facts. Current frozen
order: Hero → How It Works → Meet STACKD → Partnership → Closing CTA.

Focus shifts to the remaining pages
(Why STACKD, About, Contact, legal placeholders — How It Works is done);
they must
reuse the homepage's established design system, components, motion
language, and pacing philosophy rather than inventing new ones. **The
homepage is now the benchmark every other page is judged against.**

**Update (2026-08-06):** a second genuine exception — see "Homepage
structure: Revenue Estimator added" further down — brought the count to
six sections: Hero → How It Works → Meet STACKD → Partnership → Revenue
Estimator → Closing CTA. The freeze still stands as the default; both
exceptions so far came from real review findings (an empty-feeling
section, a user-directed addition with clear placement reasoning), not
from trying a new idea for its own sake — that bar stays the same going
forward.

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

**Real hardware facts (confirmed 2026-08-05):** cabinet is approximately
850mm tall × 550mm wide × 220mm deep — compact and wide, not tall or
kiosk-like. Payment terminal is compact contactless-only (NFC tap symbol,
small display) with **no keypad, no PIN pad, no coloured buttons** — a
common early mistake was describing it with a keypad; it doesn't have one.
Two renders now exist in the prompt doc: the dramatic hero concepts, and a
separate calmer "Meet STACKD" editorial/catalogue-style prompt for
`src/components/meet-stackd.tsx` — the two must stay tonally distinct
(launch drama vs. quiet product appreciation) even though they render the
same physical object. Real reference photos of the actual D02 Pro unit
(front 3/4 view, straight-on view, manufacturer dimension diagram) were
supplied 2026-08-05 and independently confirm the 850×550×220mm figures
already in use — no correction needed.

**Meet STACKD render: approved and live (2026-08-05).** Stage 1 passed on
the first submitted candidate — kept exactly as generated (hardware,
lighting, composition, environment all untouched). Stage 2 compositing
completed: the placeholder branding badge and the "VENDING MACHINE" idle
screen were replaced with the real logo and the approved STACKD idle
screen (logo, "Premium Automated Retail", teal accent line, "Tap to
Begin", "Age Verification Required"), perspective-matched to the screen's
keystone and the badge panel's tilt. Technique: a homography (projective)
warp for the screen — plain affine/resize isn't sufficient for a keystoned
surface — plus a feathered, photo-sampled gradient patch to erase the old
badge text before placing the real logo (a flat-color patch showed as a
visible box; a hard-edged patch showed as a visible seam — both had to be
fixed). Source photo lives at `brand-source/originals/image-1785960086981.webp`
(the Stage-1-approved, untouched original); the finished composite is at
`brand-source/derivatives/meet-stackd-composite.png` (full quality) and
`public/images/meet-stackd-machine.jpg` (web-optimized, what the site
actually serves) — wired into `MACHINE_IMAGE_SRC` in
`src/components/meet-stackd.tsx`. Reusable pipeline for future renders
(e.g. the hero, once chosen): `brand-source/build-idle-screen.js` (flat
idle-screen graphic) + `brand-source/composite-meet-stackd.js` (homography
warp + logo compositing) — corner coordinates and patch geometry will need
re-deriving per new photo, everything else can be reused as-is.

**Rendering workflow — the standing two-stage review (2026-08-05).** Every
future machine render, hero or otherwise, is judged in this order:

*Stage 1 — Hardware Review* (judge the render on this, and only this):
- Cabinet proportions
- Silhouette
- Materials
- Lighting
- Composition
- Environment
- Screen mood
- Payment terminal accuracy
- Overall realism

If Stage 1 passes, **the render is kept** — full stop. Never reject or ask
for a regenerate because of Stage 2 issues.

*Stage 2 — Production* (fixed afterward, always, regardless of what the
model drew):
- Official STACKD logo
- Screen branding
- Final colour balancing if needed
- Export for web

Branding is a production asset applied after generation, not a prompting
problem to solve — we don't regenerate otherwise-successful renders
because the AI invented its own branding. The official logo is already
extracted as clean vector source in `brand-source/originals/` (icon,
wordmark, full lockup), never redrawn, ready to composite in — same
technique used for the hero (see the reversed-icon work earlier in the
project history).

## Hero render: "Black Wall," approved and live (2026-08-06)

A second, better Stage-1 render was supplied — front-on rather than 3/4
angle, much closer to a true rectangle in the screen's perspective (near-
zero keystone vs. the first render's pronounced one). This one is used for
the **Hero**, keeping the two-render split from the plan above: dramatic
launch shot (Hero) vs. quiet product appreciation (Meet STACKD, still the
first/3-4-angle render). Source: `brand-source/originals/black-wall-original.png`.
Notably, this render's Stage-1 output already drew a close approximation
of the real logo and idle screen (the shared prompt description asks for
STACKD wordmark, "Premium Automated Retail," "Tap to Begin") — that's
still treated as a Stage 2 problem, not a pass: the AI's redrawn cube icon
and text don't match the real vector lockup pixel-for-pixel, so both were
replaced with the real logo/idle-screen assets anyway, same pipeline as
always. Finished composite: `brand-source/derivatives/black-wall-composite.png`
/ `public/images/hero-machine.jpg`, wired into `PRODUCT_IMAGE_SRC` in
`src/components/hero-product.tsx`. Pipeline script:
`brand-source/composite-black-wall.js`.

## Screen-alignment bug, found and fixed (2026-08-06)

The user reported "the screen doesn't line up at all" on the first
(3/4-angle) composite. Investigation confirmed a real bug, not a false
complaint: the screen quad's corners had been read visually off a grid-
overlay crop, and the top-right corner was off by ~47px (placed far
higher than the true corner), badly distorting the homography warp across
the whole top edge. **Fixed** by replacing visual corner-reading with
pixel-luminance edge scanning: the bezel is reliably near-black (lum <15)
against a much brighter glass/cabinet on either side, so scanning for
black-run boundaries (row-wise and column-wise) finds each corner to
within a couple of pixels, far more reliably than eyeballing a grid
overlay — especially on a keystoned (non-rectangular) surface. Re-derived
corners for both renders using this method; both now show a clean, evenly
inset bezel border on all four corners under zoomed inspection. **This is
now the standard method for finding screen/badge corners on any future
render** — grid-overlay visual estimation should be treated as a rough
starting point only, not the final coordinates.

## Meet STACKD: side-by-side layout (2026-08-06, superseded same day)

The centered, single-column photo treatment (`aspect-[4/5]` inside a
`max-w-md` centered column) left too much empty space on wide viewports —
a real issue, not a case of "whitespace is part of the design." First fix
was a two-column layout mirroring the Hero's grid (photo one side, copy +
specs the other). Superseded hours later by the animated version below —
kept here for history since the side-by-side idea itself wasn't wrong, it
was just replaced by a stronger direction, not a rejected one.

## Meet STACKD: photo replaced with an animated brand mark (2026-08-06)

Decided the section doesn't need a product photo at all — the Hero
already carries the hardware photography (the "Black Wall" render), so
Meet STACKD doesn't need to repeat it. Direction instead: let the section
itself be a small "hero moment" built from typography and motion, on
**off-white** (matching Partnership/Revenue Estimator rather than
charcoal) as a deliberate light interlude in the middle of an otherwise
dark page — the same "genuine editorial breathing room beat" the section
was always meant to provide (see "Homepage structure frozen" above),
achieved through contrast and motion instead of photography this time.

Centerpiece: `src/components/stackd-icon-assemble.tsx` — the same official
icon paths as `stackd-icon.tsx` (never redrawn, just copied), each
individual interlocking strip animated in via Framer Motion, rising and
settling into place on scroll-into-view with a per-strip stagger. This is
a literal, on-brand visual (things "stacking" into place) rather than a
decorative effect chosen for novelty — it passes the "every animation
must have a purpose" test the same way the marquee removal and the click-
scroll fix did elsewhere in this doc. It's a **one-shot** reveal
(`viewport={{ once: true }}`, no looping/infinite motion) and respects
`prefers-reduced-motion` (renders fully assembled, no animation). Below
it: eyebrow, one factual sentence, and the same spec `<dl>` as before —
still no headline pitch, no CTA, still answering only "what is the
machine."

The retired composite (`public/images/meet-stackd-machine.jpg` /
`brand-source/derivatives/meet-stackd-composite.png`) is no longer
referenced on the homepage but was left in place rather than deleted — it
may be useful on a future page (Why STACKD/About) where a product photo
still earns its place.

## Homepage structure: Revenue Estimator added (2026-08-06)

The frozen five-section structure gained a sixth section, added
deliberately at the user's direction after review, which is exactly the
condition the freeze note above allows for. Current order: **Hero → How
It Works → Meet STACKD → Partnership → Revenue Estimator → Closing CTA**.
Placement reasoning: the estimator is a continuation of "why should a
venue partner with STACKD" (question 4), not a new topic, so it sits
directly after Partnership and shares its off-white background — the two
read as one "commercial case" chapter before the dark Closing CTA signals
arrival at the final action. It does not introduce a new homepage
question; it quantifies question 4 rather than answering a sixth one.

**Old-site reference material — content/functionality only, not visual
design.** The user supplied three old STACKD HTML drafts
(`stackd-website.html`, `stackd-website-black.html`,
`STACKD-Website-Private-Review.html`, all on the user's local machine
outside the repo) explicitly as reference for business content and
functionality (e.g. the revenue estimator concept), not as visual/design
reference — the user was explicit that the current premium direction
should stay untouched (fonts, colours, spacing, buttons, motion). This is
a different kind of reference than the "reference phase closed" rule
above, which is about competitor/inspiration sites for visual direction;
reusing the user's own prior content ideas doesn't reopen that rule.
Specific figures from those old drafts (e.g. the R9,000/R18,000/R36,000
tier examples, the 80 units/fill assumption) were **not** carried over
verbatim — only the estimator's mechanism and the assumptions below,
which the user specified fresh in this session.

### Revenue estimator — governing calculation (2026-08-06)

`src/components/revenue-estimator.tsx`. These numbers are product/legal
surface area (a real earnings claim shown to prospective venue partners)
and must not drift silently — any change to the formula, ranges, or
disclaimer wording should be a deliberate decision recorded here, not an
incidental copy edit.

- Inputs: average sales per day (slider, range 3–40, default 12),
  average basket value (slider, range R140–R320 in R10 steps, default
  R220).
- Formula: `estimatedMonthlyVenueIncome = Math.round(((averageDailySales * averageBasketValue * 30) / 1.15) * 0.2)`
  — 30-day month, `/1.15` strips 15% VAT out of the basket value, `*0.2`
  applies the venue's 20% revenue share.
- Output is always labelled "Estimated Monthly Venue Income" and
  captioned "Reflects your venue's 20% revenue share, excluding VAT."
- Mandatory disclaimer, always rendered with the result, never
  removable/hideable by a future edit without a deliberate decision here:
  **"Illustrative estimate only. No guaranteed earnings. Actual sales
  will vary."**
- Styling is intentionally plain: a thin 2px range track with a small
  teal dot thumb (`.stackd-range` in `src/app/globals.css`), no card
  background/shadow/dashboard chrome — matches "premium through
  restraint," not a SaaS calculator widget.

## Icon-free brand treatment (2026-08-06)

Decided, piece by piece across this session, to stop pairing the cube
icon with the "STACKD" wordmark everywhere and instead let context decide:

- **Site chrome (header, footer, How It Works idle-state mimic):** icon
  removed entirely — just the word "STACKD" set in `font-display`
  (Space Grotesk), the site's real live CSS font. `StackdIconReversed` /
  `StackdIcon` are no longer imported in `site-header.tsx`,
  `site-footer.tsx`, or `how-it-works-demo.tsx`.
- **Machine's physical cabinet badge (top-right corner, in the photo):**
  left **blank**. First pass replaced the AI-drawn icon+wordmark with
  text-only "STACKD"; final direction removed the writing entirely —
  the patch that erases the AI's placeholder branding is still applied
  (feathered, colour-matched to the panel), just with nothing composited
  back on top. The panel shape itself is Stage-1 hardware and stays
  untouched; only branding on it was ever in scope.
- **Machine's touchscreen idle UI (in the photo):** icon **kept** — a
  splash-style logo mark reads normally on a digital screen the way it
  wouldn't as a tiny physical badge. Screen shows icon, then "STACKD"
  wordmark, then the tagline/accent line/prompt, same layout logic as
  before.
- **Meet STACKD's animated brand mark:** unaffected by any of this — it's
  a standalone icon-only moment (see above), not an icon+wordmark pairing,
  so it was never part of the "redundant lockup" problem being solved
  here.

### Real site fonts embedded into photo compositing (2026-08-06)

To render "STACKD" as actual text (not the vector wordmark logo) inside
a raster photo composite, the site's Google Fonts had to be made
available to the Node/sharp (librsvg) rendering pipeline, which has no
access to the browser's font loading. Fix: copied the base Latin-subset
`.woff2` for each font straight out of `.next/dev/static/media/` (the
files Next.js's own font optimizer already generates) into
`brand-source/` — `space-grotesk-latin.woff2`, `jetbrains-mono-latin.woff2`,
`inter-latin.woff2` — and embed them as base64 data URIs inside an
`@font-face` rule in the generated SVG.

**Real, reproducible constraint found along the way (see
`brand-source/weight-test.png`):** this environment's SVG renderer
rasterizes these embedded variable-font files correctly only at
`font-weight >= 500` — at 300/400 it silently falls back to a generic
serif with no error or warning, which is exactly why "Age Verification
Required" briefly rendered in the wrong font with no visible failure.
Confirmed with a side-by-side weight sweep (300/400/500/600/700) on both
Space Grotesk and Inter, and separately on JetBrains Mono — 400 fails,
500 succeeds, consistently. **Any future SVG text using these embedded
fonts must specify `font-weight >= 500` explicitly**, both on the
`@font-face` rule's usable range and on the `<text>` element itself. This
is noted inline in `brand-source/build-idle-screen.js` and
`brand-source/composite-black-wall.js`.

**Third follow-up: sequential fade left a blank gap between campaigns.**
`AnimatePresence mode="wait"` fully completes the outgoing campaign's
fade-to-0 before the incoming one starts fading in — correct for
layouts where overlap would visually collide, but here it meant the
bare screen fill was plainly visible for a beat between every campaign,
reading as a flash of "blank" rather than a cross-dissolve. Removed
`mode="wait"` (default/simultaneous mode overlaps exit and enter) and
made the animated child `absolute inset-0` so old and new stack exactly
on top of each other during the overlap instead of stacking in normal
flow. Now reads as one continuous fade, matching "elegant fades" rather
than fade-out-to-black-then-fade-in.

**Follow-up bug, unrelated to alignment: four of the five campaigns had
no background.** After the mask fix above, one campaign (Live Music)
looked right and the other four still looked broken — but not from
misalignment. `LiveMusicPoster` sets its own background inline (the
radial gradient); `HappyHour`, `GolfMembersDay`, `SundayLunch`, and
`BrandCampaign` were left with none at all, so their container was
fully transparent outside the text glyphs and the base photo showed
through around the words — visible as a distinct glossy/lighter patch
where a solid dark screen should have been, easy to mistake for another
alignment problem since it also produces a visible "wrong content in the
screen" symptom. Fixed by giving all four the same flat `bg-[#0b0d10]`
fill Live Music's gradient sits on top of, so every campaign fully
opaque-fills its container the same way.

**Follow-up: two of the five posters were getting cropped mid-word.**
The screen's real aspect ratio is ~0.47 (183×389px). Happy Hour, Live
Music, and Golf Day are all close to that (0.38–0.44) so `object-cover`
fit them with only minor top/bottom trim. Pro Shop (0.70) and Burgers &
Beers (0.73) are meaningfully wider — both have headline text running
almost the full source width ("PRO"/"SHOP", "BURGERS"/"BEERS"), so
`cover`'s center-crop to a much narrower target sliced straight through
the words. Switched to `object-contain` (with a `bg-[#0b0d10]` backdrop
matching the screen's own fill, so any letterbox strip reads as "screen,
between designs" rather than an empty gap) — every poster now always
shows complete and legible; the trade is that the two wide ones show
with a sliver of screen fill on two edges instead of bleeding fully
edge-to-edge. Never truncating a headline outweighs full bleed here.

**Posters replaced with a v2 batch generated at the right aspect ratio.**
The user asked ChatGPT for a second pass, given the target spec (~0.47
aspect, i.e. ~1080×2298px). `brand-source/Advert2.png` (860×1829, same
five-panel-sheet format) is a real improvement: Pro Shop moved from
0.70 → 0.4934 and Burgers & Beers from 0.73 → 0.5365, both now close
enough that `object-contain` barely needs to letterbox. The top-row
three (Happy Hour/Live Music/Golf Day) went the other way, from
~0.38–0.44 down to ~0.28–0.30 — narrower than ideal now — but
`object-contain` handles either direction of mismatch gracefully, so
this is a net improvement, not a regression requiring another round.
Extracted the same way as the first batch (divider-line detection, not
hand-eyeballed crops) into `advert-*-v2.jpg`, and the old v1 files were
deleted rather than left dangling. `-v2` suffix used deliberately, per
the standing caching lesson elsewhere in this doc — same filename,
same content-looking change, different actual bytes, exactly the
pattern that caused confusion earlier.

## Venue Communications: real designed posters, wall cut out (2026-08-06)

Two more changes to this section, same day:

**Real posters replace the plain-type campaigns.** The user supplied
`brand-source/adverts.png` — five fully-designed STACKD posters (Happy
Hour, Live Music, Golf Day, Pro Shop, Burgers & Beers) generated
externally as a single contact sheet. Cut into five files via divider-line
detection (`colBrightFrac`/`rowBrightFrac` scans for the sheet's own
white gutters, not hand-eyeballed crops) — `advert-happy-hour.jpg`,
`advert-live-music.jpg`, `advert-golf-day.jpg`, `advert-pro-shop.jpg`,
`advert-burgers-beers.jpg`. These fully replace the five hand-built
React campaign components (`LiveMusicPoster`, `HappyHour`,
`GolfMembersDay`, `SundayLunch`, `BrandCampaign` are gone) — each
`CAMPAIGNS` entry is now just `{ src, alt }` rendered as a plain
`object-cover object-top` `<Image>`. The bezel-mask-on-top technique
means these don't need to be pre-warped or pixel-matched to the screen
quad at all; the mask trims whatever doesn't fit.

**Wall cut out of the machine photo, matching the How It Works
treatment.** Same ask as the earlier front-view render: "we don't need
to see the wall." `venue-comms-machine.jpg` (with its grey studio wall)
is now background-only; two new transparent-PNG derivatives replace what
the page actually serves:
- `venue-comms-machine-cutout.png` — the same photo with everything
  *outside* the device's outer silhouette (a rounded rect, edges found
  via luminance scanning: `left:288, top:380, right:750, bottom:1030`
  in original-image coordinates, `cornerRadius:75`, all crop-relative)
  cut fully transparent. This is now what `advertising-section.tsx`
  actually renders as the background layer, sitting directly on the
  section's own `bg-charcoal` — no separate wall-coloured rectangle.
- `venue-comms-bezel-mask.png` regenerated to match: transparent at
  *both* the screen quad hole *and* everything outside the device
  silhouette (previously only the screen hole was transparent; leaving
  the outer area opaque would have painted a wall-coloured box back over
  the now-transparent background).

Both generated by `brand-source/composite-venue-comms-cutout.js`, which
takes the already-cropped `venue-comms-machine.jpg` as input (not the
original 1122×1402 render — coordinates above are already crop-relative)
and applies the standard rounded-rect + `dest-in` cutout technique used
throughout this project (see `composite-front-view.js` for the same
pattern). One iteration was needed: the first cut left a ~5px sliver of
wall visible at the top-center (the device's top edge isn't perfectly
horizontal in the photo; the flat rounded-rect mask didn't quite clear
it) — fixed by nudging `top` from 372 to 380, verified via a solid-colour
composite check (green background) rather than trusting the crop
numbers alone.

## Venue Communications screen alignment: bezel-mask-on-top (2026-08-06)

The bounding-box + clip-path approach documented below (kept for history)
still wasn't reliably flush against the bezel once the screen was
displayed this large — CSS can *clip* a rectangle to a trapezoid shape,
but it can't *warp* rectangular content to fill one, so text inside the
box never quite matched the photo's real (slightly keystoned) glass
edges. Debugging this collaboratively with an external tool (the user
routed a coordinate-only debug page — no image, just the quad math — to
ChatGPT for a second opinion) produced a better technique, adopted here:
a **bezel mask layered on top of the content**, not a box shaped to fit
the content underneath it.

`brand-source/venue-comms-machine.jpg` (badge-blank, screen-blank) is
still the background. A second file,
`public/images/venue-comms-bezel-mask.png`, is the *same tight-cropped
photo* with only the true screen quad — the exact pixel-scanned
quad, `pointInQuad` against `[[475,452],[658,460],[658,838],[475,841]]`
in original-image space, offset for the 250,340 crop origin — cut fully
transparent (alpha 0); every other pixel (cabinet, badge, PUSH, card
reader, wall) stays fully opaque. Stacked bottom-to-top in
`advertising-section.tsx`: machine photo → crossfading campaign content
(positioned by the same bounding-box percentages as before, `SCREEN_RECT`)
→ bezel mask on top. However precisely the content box lines up, the
mask's opaque real-cabinet-pixels cover anything that spills past the
true quad — the visible edge is *always* exactly right, by construction,
not by how carefully the percentages were tuned. This is strictly more
robust than the clip-path version and doesn't depend on getting the
quad math pixel-perfect on the first (or fourth) try.

Note on provenance: the external pass first came back built from a
*different* source photo (the standing, already-shipped one with a full
branded badge and baked-in "Tap to Begin" screen) — reasonable given it
never had access to this project's actual current asset, only the
coordinates. Adopted the mask *technique*, not those specific image
files — regenerated the mask from this project's real badge-blank,
screen-blank crop so the "badge stays unbranded, screen carries only
live overlay content" rule (see above) still holds.

## Venue Communications rebuilt: real photo + crossfading campaigns (2026-08-06)

Replaced the rotating-text-only version with a real visual demonstration,
per a detailed brief: "the visitor should immediately understand 'I can
advertise my venue,' 'brands can advertise too,' and 'the screen
continues creating value while nobody is purchasing.'" Explicit
constraints: the machine itself must stay completely static (same
proportions/angle/lighting/materials — only the *display content*
animates), fades only (no slide/zoom/device movement), 3-4s dwell per
example, and one of the five examples should look like a real designed
campaign rather than plain text (people read visuals faster than words).

**New two-column layout** (`advertising-section.tsx`, mirrored from the
Hero: image left, copy right here vs. copy left, image right there, for
rhythm variety): machine photo large on one side, "More than a vending
machine." + a new supporting paragraph on the other. New paragraph
("Between purchases, the integrated display becomes a premium
communication channel...") replaces the earlier, shorter version.

**New source photo: `venue-comms-machine.jpg`** — same Black Wall
hardware as the Hero, but cropped much tighter (`brand-source/composite-venue-comms.js`,
470×780 vs. the Hero's 1122×1190) so the screen reads as ~39% of the
frame width instead of ~16% — "keep the machine large" meant cropping
in on the cabinet, not just displaying the same wide shot bigger. Same
badge-blank treatment as the Hero. The screen itself is filled flat
(`#0b0d10`, no baked content) rather than with the branded idle screen,
because the content here is five *live* React components crossfaded via
`AnimatePresence` at a fixed screen-rect position (percentages logged by
the script) — one photo, ever, so "the machine stays completely static"
is true by construction, not by careful timing. Crossfade is pure
opacity (no y-offset) per "just elegant fades," 3.8s dwell,
`prefers-reduced-motion` shows one static example with cycling disabled.

**Five campaign components**, all in `advertising-section.tsx`:
Live Music (designed-poster treatment — radial teal glow background,
larger type, a divider rule, per the "make one look like a real
campaign" ask), Happy Hour, Golf Members' Day, Sunday Lunch, and a
STACKD-branded "New Range" campaign — the last four use plain,
restrained typography (matching "avoid anything that feels like a SaaS
landing page"). Verified no layout overflow at both mobile (375px) and
desktop (1440px) via `scrollWidth`/`scrollHeight` vs. `clientWidth`/
`clientHeight` checks, not just visual inspection.

**Two real bugs found and fixed while building this**, both in the
shared homography-compositing approach used across every render script
in this project — worth knowing about before writing another one:

1. **`bilinearSample`'s bounds check silently drops pixels near a
   quad's edge.** The function returned `null` for any source
   coordinate marginally outside `[0, w-1]`/`[0, h-1]`, and the caller
   treated `null` as "skip this destination pixel" — leaving the
   *original* photo content showing through instead of being replaced.
   With a normal-sized source texture (500×1300, the idle-screen SVG)
   this only ever grazed the outermost pixel or two and was easy to
   miss. It became obvious with `composite-venue-comms.js`'s flat-color
   fill, which initially used an 8×8 source: a destination point 89%
   of the way across a 183px-wide quad lands in the source's outermost
   ~12% *by construction* at that resolution, not as a rare edge case
   — the venue-comms screen showed a stray "L" character (a remnant of
   the AI's original placeholder text) floating in what should have
   been a flat fill. Fixed by clamping coordinates into range in
   `bilinearSample` instead of rejecting them, in both
   `composite-black-wall.js` and `composite-venue-comms.js`. (In the
   process, re-examined whether this had also left a visible defect in
   the shipped Hero image — it hadn't; a separate "...RETAIL" sighting
   there turned out to be our *own* correctly-rendered "PREMIUM
   AUTOMATED RETAIL" tagline, not leftover AI placeholder text. Same
   word, different — correct — source.)
2. **Sharp applies `.extract()` before `.composite()` regardless of
   call order.** `composite-venue-comms.js` originally chained
   `.composite([badgePatch]).extract({...cropRegion})` on one pipeline.
   A debug pre-crop render proved the badge patch was applied correctly
   — but the final, cropped file still showed the badge un-patched.
   Sharp's internal pipeline runs `extract` ahead of `composite`
   regardless of the order they're called in JS, so the crop happened
   on the *pre-patch* image, and the patch's coordinates (specified
   against the uncropped canvas) ended up outside the now-much-smaller
   cropped canvas and were silently ignored. Fix: resolve the
   composited image to a buffer first (`await composite.png().toBuffer()`),
   then start a *new* `sharp()` pipeline from that buffer for the
   `.extract()` call — forces the composite to actually happen before
   extract gets a turn. Anywhere this codebase composites and crops in
   the same script, they need to be two pipelines, not one chain.

## How It Works demo: real photo replaces the fake phone mockup (2026-08-06)

A third render ("front view") was supplied — a clean, near-perfectly
front-on studio shot on a cream background, blank screen, minimal
keystone. Used to replace the interactive demo's previous fully-CSS
phone mockup (`bg-[#08090a]` rounded div standing in for a device) with
the real photographed cabinet. Source: `brand-source/originals/front-view-original.png`.
Pipeline: `brand-source/composite-front-view.js` — crops the cream
padding down to a clean product-shot margin, patches the cabinet badge
blank (same rule as the hero render), and reports the screen's rectangle
as a percentage of the cropped image (`{left: 24.72%, top: 15.33%,
width: 53.75%, height: 54.91%}`). Output:
`public/images/how-it-works-machine.jpg`.

Because this shot is close enough to front-on, no homography/keystone
warp was needed (unlike the hero and Meet STACKD renders) — the five
interactive step screens (`TapToBegin`, `AgeVerification`,
`BrowseProducts`, `SecurePayment`, `CollectPurchase`) are absolutely
positioned over the photo using those percentages, so they scale with
the container instead of needing per-breakpoint pixel math. The real
screen area is narrower than the old fake mockup was, so every step
component's padding/gaps/font sizes were scaled down to fit without
overflow (verified via `scrollHeight`/`clientHeight` checks at the
component's actual rendered size, not just visually). Container was
later sized up ~20% (`max-w-[300px]` → `max-w-[360px]`, grid column
capped accordingly) at the user's request; served as
`how-it-works-machine-v2.jpg` (see file-renaming note below).

**Studio drop-shadow removal.** The source photo's natural drop shadow
against its cream backdrop looked fine full-size but read as a smudge
once inset into a small on-page device frame — the user first asked to
remove it, then asked again for *all* shadows to be gone, machine placed
cleanly on flat off-white. Two iterations:

1. A luminance-threshold approach failed: right next to the cabinet the
   shadow gets nearly as dark as the device itself, so a global
   brightness cutoff misclassifies it as "device" and leaves it
   untouched.
2. A spatial keep-out *rectangle* (device's bounding box, few px margin)
   fixed most of it but still left faint shadow in the corner gaps
   between the rectangle and the cabinet's actual *rounded* silhouette —
   those gap pixels were "inside" the protected rectangle and never
   touched.

Final fix: true cutout-on-flat-background, not in-place correction. A
rounded-rect mask matching the cabinet's real corner radius (~55px,
measured via a diagonal luminance scan from the bounding-box corner)
is used with `blend: "dest-in"` to cut the device cleanly out of the
photo; that cutout is composited onto a solid flat reference-cream
canvas. Everything outside the rounded silhouette is the flat colour by
construction — no gradient, no corner gaps, no shadow anywhere,
regardless of how dark the shadow got in the original. Geometry beats
brightness whenever the thing you're erasing and the thing you're
protecting can have overlapping tonal ranges. Implementation:
`brand-source/composite-front-view.js`.

**Real bug found along the way: sharp's `.composite()` doesn't stack
across calls.** An intermediate version called `.composite()` once to
place the device cutout on the flat background, then called
`.composite()` again later on the same pipeline to add the badge patch
— the second call silently discarded the first, so the output was just
the badge patch floating alone on blank cream (device cutout gone
entirely). Sharp only keeps the overlays from the *last* `.composite()`
call on a given pipeline; every overlay for one output must go in a
single call with one array. Fixed by merging both overlays into one
`composite([{device cutout}, {badge patch}])` call. Worth remembering
for any future multi-layer compositing script in this project.

**Final iteration: transparent cutout, not a flattened cream photo.**
The flat-cream-background version fixed the shadow but the user still
saw a faint rectangular seam — the photo's own cream margin (RGB
244,237,229) is a slightly different shade than `--color-offwhite`
(#f6f2ea), so the photo's rectangular bounds read as a border against
the page. Fix: stop flattening onto cream at all. Export the device as a
**transparent-background PNG** (rounded-rect alpha mask, tight to the
measured silhouette, no cream layer anywhere) sized to just the device's
own bounds (596×931) and place it directly on the section's real
background — no second colour layer means no possible mismatch.
`public/images/how-it-works-machine-v5.png`; container is
`aspect-[596/931]`, `SCREEN_RECT` percentages in
`how-it-works-demo.tsx` are relative to this cutout's own bounds (not
the old crop-with-margin). This is the standing pattern for any future
product photo that needs to sit directly on a page background rather
than in its own framed card: cut out to alpha, don't flatten onto a
matched solid colour and hope the shade is close enough.

**Recurring gotcha: browser image caching.** Multiple times this session
the user reported a fix "not working" when it was actually already
correct on disk — their browser (or Next's image optimizer) was serving
a stale cached copy under the old filename. Standing practice going
forward: whenever a production image is replaced in place with the
*same filename*, treat a cache-busting rename (`-v2`, `-v3`, ...) as
routine, not optional — cheaper than another round of "still see the old
one" confusion. `hero-machine.jpg` → `hero-machine-v2.jpg` and
`how-it-works-machine.jpg` → `how-it-works-machine-v2.jpg` both exist
for this reason; the un-suffixed files are stale and unused.

## Footer copy correction (2026-08-06)

Found and fixed a standing violation of the "no future-category
teasing" rule (see Homepage content discipline above): the site footer
(`src/components/site-footer.tsx`, rendered on every page) read "Built to
scale beyond a single category, a single venue type, or a single city" —
exactly the kind of roadmap-teasing the five-question-filter rule retired
from the homepage, just relocated to the footer instead of removed.
Replaced with the same honest, explicit framing PROJECT.md already
prescribes elsewhere: "A South African automated retail company. Our
first automated retail solution focuses on premium vape products for
hospitality venues."

## Venue Communications poster art: final v4 batch (2026-08-07)

The bezel-mask compositing architecture (see Venue Communications
section above) was solid from the start — every remaining "doesn't fit"
complaint after that was purely about *source poster aspect ratio*, not
the compositing technique. Three AI-generated batches chased this:

- **v1** (`adverts.png`, one 5-panel sheet) and **v2** (`Advert2.png`,
  a second sheet) — both had posters noticeably wider than the screen's
  real aspect (~0.47), forcing a choice between `object-cover` cropping
  into headline text mid-word ("PRO"/"SHOP") or `object-contain` with
  visible letterboxing.
- **v3** — a manual mix-and-precision-crop pass (picking whichever of
  v1/v2 was closer per-image, then server-side cropping to the exact
  target aspect) was a stopgap while the user went back to get a
  properly-sized batch. Caught and fixed a self-inflicted bug mid-pass
  (a symmetric crop clipped "STACKD" off the live-music poster's top
  edge — fixed with an asymmetric crop, accepting a slightly-off aspect
  over losing content).
- **v4** (this batch) — five separate files (`happy hour.png`,
  `live music.png`, `golf day.png`, `pro shop.png`,
  `burger and beer.png`, ~860×1829 each) generated to the correct
  aspect ratio from the start: 0.4691–0.4702 measured vs. 0.4704 target,
  i.e. **no server-side cropping needed at all** — just flatten (no
  alpha, `#0b0d10` background to match the screen fill) and re-encode
  to JPEG (`brand-source/export-adverts-v4.js`). Verified image-by-image
  before wiring in: no clipped text, generous margins on all sides,
  consistent STACKD blue accent across all five.

`CAMPAIGNS` in `src/components/advertising-section.tsx` now points at
`advert-{name}-v4.jpg`; the `-v3` files were deleted from
`public/images/` (superseded, not left dangling, per standing practice).
The lesson for next time a poster/screen-content batch is needed:
**give the exact target pixel aspect ratio up front** (here, 183:389 ≈
0.4704) rather than an approximate one — v4 only took one round because
the brief was that specific.

## Venue Communications: switched to the How It Works device render (2026-08-07)

Even with the v4 posters at the right aspect ratio, the Black Wall photo
(`venue-comms-machine-cutout.png`) was shot at a slight angle, so its
screen quad was keystoned — a plain CSS rect could get close but never
perfectly true, which is what the bezel-mask-on-top technique existed to
paper over. The user pointed at the How It Works section's device shot
(`how-it-works-machine-v5.png`) as the design to use instead: it's
photographed close enough to straight-on that a plain `SCREEN_RECT`
lines up against the real screen edges on its own, no mask required.
Venue Communications now reuses that exact image and rect (left
17.95%, top 13.00%, width 64.93%, height 58.86%, `aspect-[596/931]`) —
same asset as How It Works, since both are legitimate moments of the
same physical device's screen. `venue-comms-machine-cutout.png`,
`venue-comms-bezel-mask.png`, and `venue-comms-machine.jpg` are deleted
(fully superseded, no remaining references).

Also swapped the section's column order on request: copy is now the
left column, the device is the right column (`grid-cols-[1.15fr_1fr]`,
device div second in DOM). Note the screen's real aspect from this shot
(~0.71) is noticeably wider than the poster campaigns (~0.47), so
`object-contain` now pillarboxes visibly on the sides rather than the
near-zero letterboxing the v4 posters achieved against the old (0.47)
screen crop — an accepted trade for a structurally solid fit over a
tighter-but-fragile one.

## Bigger headers + geometric backdrop on every off-white section (2026-08-07)

Two standing visual changes made together across the whole homepage:

1. **Headings bumped up one step everywhere**, eyebrows `text-xs` →
   `text-sm`, main headings gained an `lg:` breakpoint where missing and
   moved up roughly one Tailwind size step (e.g. Hero's h1
   `text-5xl sm:text-6xl lg:text-7xl` → `text-6xl sm:text-7xl lg:text-8xl`).
   Meet STACKD's heading was deliberately left untouched — it was already
   taken to `text-8xl` in a dedicated earlier pass ("make he 'meet
   stackd' much bigger") and is the largest heading on the page by
   design; bumping it further risked overflow for no visual gain.
2. **`GeometricBackground tone="light"` (the hex-grid pattern in
   Hero) extended to every off-white section**, not just Hero: How It
   Works, Revenue Estimator, and Closing CTA all gained it (Hero already
   had it; Venue Communications, Meet STACKD, and Partnership stay
   charcoal and don't use it — the pattern is offwhite-only by design,
   `tone="dark"` is unused). This was previously a deliberate
   Hero-only decision ("you make the decision" → keep it exclusive to
   Hero as an opening-moment signature); the user has now reversed that
   call explicitly, so it's a standing site-wide element on offwhite
   sections going forward, not a one-off.

Verified via computed styles in-browser rather than a screenshot (the
preview pane wasn't compositing frames in this session): confirmed
`pattern#stackd-hex-grid` is present in sections 0/2/4/6 (all offwhite)
and absent from 1/3/5 (all charcoal), and heading `font-size` values
landed at the intended larger sizes post-edit.

## Full black/offwhite order flip + logo-shaped backdrop pattern (2026-08-07)

Two more changes, same day, on top of the above:

**1. Alternation now starts on black, not offwhite.** The user repeated
the "black, off-white, black, off-white" instruction a second time after
the previous pass (which had kept the existing offwhite-first order,
reasoning the alternation itself was already satisfied) — read as
confirmation the intent really was to flip the starting colour, not just
re-describe the existing pattern. Every section's colour is now inverted
from before: How It Works, Hero, Revenue Estimator, and Closing CTA are
charcoal; Meet STACKD, Partnership, and Venue Communications are
offwhite. This is a full re-skin, not a class-rename — each flipped
section needed its accent colours swapped too (`text-teal-dark` ⇄
`text-teal-light`, `text-charcoal/*` ⇄ `text-offwhite/*`,
`border-charcoal/10` ⇄ `border-white/10`), plus a few structural pieces:
- Hero's `ProductRenderSlot` reverted to its original dark-background
  styling (`border-white/10`, `StackdIconReversed` fallback instead of
  `StackdIcon`) — this is the same component from before the light-mode
  pass earlier in the project, not a new build.
- Revenue Estimator's sliders now use `stackd-range stackd-range--dark`
  (light track, charcoal-bordered thumb) — the `--dark` modifier class
  was added in an earlier pass, then flagged as possibly-dead code when
  its section flipped light; it's load-bearing again now. Worth
  remembering before ever deleting a "currently unused" style variant in
  this file — colour passes have gone back and forth more than once.
- The geometric hex backdrop follows whichever sections end up offwhite
  (still offwhite-only by rule) — so it moved from
  Hero/HowItWorks/RevenueEstimator/ClosingCta to
  MeetStackd/Partnership/VenueComms instead of just toggling in place.

**2. The backdrop pattern itself changed from a generic hex outline to
the actual STACKD icon shape, tiled.** Per explicit request ("make them
the shape of the stackd logo"). Implementation: the same 13 path shapes
from `stackd-icon.tsx` (the official icon, not redrawn), flattened to a
single flat fill colour (`#3DB4D3` — the original's multi-tone shading
was pointless at background opacity) and repeated via an SVG `<pattern>`
at 110×125 tile size (icon scaled to ~56px wide, centered with breathing
room). `geometric-background.tsx`'s exported API (`tone` prop) is
unchanged — only the pattern's internal shape changed, so every call
site kept working with no edits needed there. Verified by rendering the
literal pattern markup standalone (not just trusting the geometry math)
before considering it done — confirmed it reads clearly as the logomark
repeated, not a distorted blob, on both light and dark swatches.

## Venue Communications poster art: v5, built to the corrected screen spec (2026-08-07)

Switching Venue Communications to the How It Works device render (see
above) changed the screen's real aspect from ~0.47:1 (old Black Wall
crop) to ~0.732:1 (measured directly from the new photo's screen
pixels: 388×530px within the 596×931 source). The v4 poster batch was
built for the old ratio, so it pillarboxed hard on the new screen — not
a compositing bug, just the wrong target size.

Gave the user the corrected spec directly (aspect 0.732:1, recommended
1170×1600px, full-bleed with ~3-4% text-safe margin) so they could
regenerate rather than trying to crop/stretch the existing v4 set to
fit. The resulting v5 batch (`happy hour 2.png`, `live music 2.png`,
`golf day 2.png`, `pro shop 2.png`, `burger and beer 2.png`) measured
within 0.6% of the target ratio on four of five images and 2.4% on the
fifth — close enough that, like v4 was for its own (different) target,
no server-side cropping was needed at all
(`brand-source/export-adverts-v5.js`, same flatten + re-encode pattern
as v4). `CAMPAIGNS` in `advertising-section.tsx` now points at
`advert-*-v5.jpg`; the v4 files were deleted from `public/images/`.

Standing lesson reconfirmed: whenever the *screen crop itself* changes
(different photo, different measured rect), any in-flight poster art
sized for the old crop needs to be re-verified against the new one —
the aspect ratio is a property of the screen render, not a fixed
constant of the section.

## Real bug found and fixed: screen-rect bottom edge overshoot (2026-08-07)

While investigating a "these don't fit" report on the How It Works /
Venue Communications shared `SCREEN_RECT`, direct pixel-luminance
measurement of `how-it-works-machine-v5.png` (scanning rows/columns for
where the flat screen-interior luminance plateau starts and ends, same
technique used elsewhere in this project) found the existing rect's
bottom edge landed ~20px past the true screen boundary, inside the
bezel frame. Left/right/top were already accurate to within 1-2px. Real
measured screen rect: x 107–495, y 119–649 of the 596×931 source (vs.
the previous assumption of bottom≈669). Fixed in both
`how-it-works-demo.tsx` and `advertising-section.tsx` (`top: 12.78%`,
`height: 56.93%`, was `13.00%`/`58.86%`). This was a real, if minor,
precision bug — independent of and smaller than the poster-aspect
mismatch above, which is the dominant cause of any remaining visible
gap around campaign art.

## Reverted the black-first alternation; per-section colour is now explicit, not derived (2026-08-07)

After flipping the whole homepage to start on black (previous entry),
the user asked to make How It Works off-white again specifically — which,
given strict alternation, meant reverting the *entire* order back to
starting on off-white (undoing that flip) rather than introducing a
one-off exception. Shortly after, a separate, narrower request landed:
make *only* Venue Communications off-white, leave every other section's
colour untouched. That is not consistent with strict alternation at
all — the current homepage order is now:

offwhite, charcoal, offwhite, charcoal, offwhite, offwhite, offwhite

(How It Works, Meet STACKD, Hero, Partnership, Revenue Estimator, Venue
Communications, Closing CTA). Three off-white sections in a row at the
end is intentional, per explicit instruction, not a bug — **do not
"fix" this back to strict alternation without being asked.** The
lesson: after several rounds of flipping the whole sequence back and
forth, the user's actual intent settled on treating each section's
colour as an independent, explicit choice rather than a rule to keep
re-deriving — check the live rendered background of each section before
assuming "alternation" still holds.

Side effect of the three-in-a-row: with no visual divider between
same-coloured adjacent sections, the tail of the page can visually read
as one undifferentiated block while scrolling, which produced a "where
did all the content go" report — the content was never missing (verified
via raw server-rendered HTML with `curl`, independent of any browser
cache), it was a visual-continuity illusion. `ClosingCta`'s `border-t`
was removed per request when it sat between two now-identically-coloured
sections and looked like a stray line; whether a subtle divider should
come back for the three-in-a-row stretch is still an open question, not
yet resolved as of this entry.

(Resolved shortly after: user asked to flip Closing CTA to charcoal,
restoring a real colour change at that seam, and the Revenue
Estimator→Venue Communications border was removed since that pair is
still both offwhite. Final order: offwhite, charcoal, offwhite,
charcoal, offwhite, offwhite, charcoal — dividers only where colour
actually changes.)

## Built the remaining site pages (2026-08-07)

With the homepage considered done, filled in every other page that the
header/footer nav already linked to but didn't exist yet — all were
returning 404: `/why-stackd`, `/about`, `/contact`, `/privacy`, `/terms`.

- **Why STACKD** and **About** both follow the established secondary-page
  pattern from `/how-it-works`: a single charcoal content section, then
  the shared `<ClosingCta />` component (no new component built) for
  visual and conversion consistency. Copy follows the existing brand
  rules directly — no fabricated founding history, team bios, or specific
  stats; "no future-category teasing" respected (vape stated as "our
  first automated retail solution," not implying others already exist).
- **Contact** follows `/partner`'s two-column form-page pattern exactly
  (same grid, same field styling) rather than inventing a new layout.
  Built a new `ContactForm` component and `/api/contact-enquiry` route,
  mirroring `PartnerForm`/`/api/partner-enquiry`'s existing "validate,
  log, TODO wire to real destination" pattern rather than fabricating a
  contact email address that doesn't actually exist. Includes a line
  pointing partnership-intent visitors to `/partner` instead, so the two
  forms don't compete for the same traffic. Verified by actually
  submitting the form end-to-end in-browser (not just reading the code) —
  success state renders correctly, no console errors.
- **Privacy** and **Terms** are new document-style pages on offwhite
  (not charcoal — long-form legal text reads better on light background,
  and no other page needed this treatment yet). Generic, competent
  boilerplate covering the standard sections; explicitly not final legal
  copy, but written as normal presentable placeholder text rather than
  a jarring "under construction" banner, consistent with shipping a
  credible-looking site — the "placeholder" is in scope, not in tone.

All 8 nav-linked routes (`/`, `/how-it-works`, `/why-stackd`, `/about`,
`/contact`, `/partner`, `/privacy`, `/terms`) verified returning 200 via
curl after the build. `tsc --noEmit` and `eslint` both clean.

## Site deployed: GitHub + Vercel, custom domain live (2026-08-07)

Homepage was declared done, so moved on to getting a real shareable
link. Repo already existed locally (git history predates this — no init
needed), just had no remote. Created `github.com/BradleyBloomer/STACKD`,
pushed `main`, imported into Vercel (team "STACKD Vending"). Auto-deploy
on every push to `main` is now live — no manual redeploy step.

Connected the user's existing domain, `stackdvending.co.za` (registered
at HostAfrica), by adding it in Vercel's Domains tab and setting the DNS
records at HostAfrica: **A** `@` → `76.76.21.21`, **CNAME** `www` →
`cname.vercel-dns.com`. HostAfrica's default template had pre-existing
placeholder records for both (`@` A → `169.239.180.4`, `www` CNAME →
the bare domain) which conflicted and had to be deleted first — Vercel
showed "Invalid Configuration" until those were removed. Root domain
308-redirects to `www`, which serves 200. Live URL:
`https://stackdvending.co.za` (canonical is `www`).

**Standing fact for future reference:** production URLs are
`stackd-orpin-six.vercel.app` (Vercel-issued) and
`stackdvending.co.za` / `www.stackdvending.co.za` (custom domain, both
work). GitHub repo: `github.com/BradleyBloomer/STACKD`.

## "Vending Machines" clarity pass (2026-08-07)

User's dad flagged that the homepage's first section (How It Works)
shows a close-up device photo with a touchscreen, but nothing nearby
says what it *is* — could read as a tablet/kiosk demo to a first-time
viewer rather than a vending machine. Two small, independent fixes:

1. How It Works section eyebrow: `"STACKD"` → `"STACKD Vending
   Machines"` (`how-it-works-demo.tsx`) — reuses "Vending" language
   already established in the Hero, not a new term.
2. Site header logo lockup (`site-header.tsx`): added a small subtitle
   under the "STACKD" wordmark reading "Vending Machines," visible on
   every page from the first pixel. First attempt gave it a filled
   pill/badge background — user and their dad both immediately read it
   as "a sticker" slapped onto the logo. Fixed by dropping the
   background entirely: plain small-caps text, color + tracking only,
   matching every other label on the site (no boxed/pill treatment
   exists anywhere else in the design system — this confirms why one
   stood out as wrong on sight).

## Open investigation: mobile layout gaps, not yet reproduced (2026-08-07)

User's partner (a designer, viewing on iPhone via WhatsApp's in-app
browser) reported large unexplained blank vertical gaps in two places:
before the "Meet STACKD" heading, and between Revenue Estimator and
Venue Communications. Screenshots clearly show real, large gaps (roughly
half a mobile viewport height).

Investigated by resizing the browser tool to a 375×812 mobile viewport
and measuring actual computed layout (`getBoundingClientRect` on every
section, plus the Meet STACKD icon/heading specifically) — **could not
reproduce either gap**. Meet STACKD's icon-to-heading spacing measured
exactly as expected from its own padding/margin values; Revenue
Estimator and Venue Communications sit with zero gap between them.

Working theory: this is specific to WhatsApp's in-app browser (a known
non-standard WebView, not real mobile Safari/Chrome), likely related to
Framer Motion's `whileInView` scroll-reveal animations or the
`position: sticky` 320vh How It Works section not being the standard
Chromium engine this was tested against. Asked the user to confirm by
opening the link directly in real Safari/Chrome (bypassing WhatsApp's
browser) — **unresolved as of this entry, waiting on that confirmation
before deciding whether this needs a code fix or is out of our
control.** If it reproduces in real mobile Safari too, next step is
checking whether simplifying/removing `whileInView` viewport-margin
thresholds or the sticky section's `100vh`/`320vh` sizing fixes it on
iOS specifically.
