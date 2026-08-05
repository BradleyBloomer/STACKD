# STACKD product render prompts — AI image-generation

Prompts for every machine render needed across the site, based on the real
Reyeah D02 Pro cabinet, rebranded as STACKD. Written 2026-08-05, updated
same day with a hardware correction (see shared description).

**Before using these:** if your tool accepts an image + text prompt (ChatGPT
GPT Image, Midjourney `/describe` + image prompt, etc.), attach a real photo
of your actual D02 Pro unit alongside the prompt. Text-only generation cannot
reliably reproduce one specific real product's exact proportions — a
reference photo dramatically improves accuracy on silhouette, screen size,
door position, and terminal placement.

## Shared machine description (used in every prompt below)

A wall-mounted premium smart vending machine cabinet, matte black
powder-coated finish, premium industrial design. **Compact and wide rather
than tall or kiosk-like — proportions closely matching the real Reyeah D02
Pro** (this was corrected 2026-08-05; earlier drafts under-specified this
and risked reading as a tall kiosk). Mounted flush against a wall — no
floor stand, no pedestal, no legs, no visible mounting brackets. A 21.5-inch
vertical touchscreen dominates the upper portion of the front face,
displaying a subtle, premium branded idle/attract screen: a centered
STACKD wordmark using the approved official logo (not a redrawn or
approximated version), the line "Premium Automated Retail" beneath it, and
a understated "Tap to Begin" prompt near the bottom, set against a dark
screen background with a soft teal (#1E82A5) glow — restrained, not
theatrical. This is the machine's idle screen before the normal purchase
flow begins — not a claim that STACKD built custom software, just a
branded attract screen. Lower-left: a rectangular push-to-open product
collection door labeled "PUSH". Lower-right: a **compact card payment
terminal with no keypad** (tap/contactless only), mounted to the cabinet's
side panel. A small STACKD wordmark and geometric cube icon badge near the
top of the cabinet, subtly embossed or backlit, using the approved official
logo. No Reyeah branding, no other logos, no other brand names anywhere on
the unit.

---

## Concept 1 — Premium Apple-style product launch

> [Shared machine description above.] Photographed for a premium technology
> product launch, in the style of an Apple product reveal. The machine is
> mounted on a smooth dark architectural wall — charcoal-black with a subtle
> brushed texture — in a minimal, studio-like environment. Dramatic
> directional lighting from the upper left rakes across the cabinet's edges,
> creating crisp highlight lines along its silhouette with soft falloff into
> shadow on the right, plus a soft teal rim-light glow along the right edge.
> The touchscreen casts a soft glow onto the wall behind it. Camera:
> eye-level, slight three-quarter angle (~15°), 50mm lens look, shallow
> depth of field, machine in sharp focus. Composition: machine occupies the
> right two-thirds of the frame; the left third is clean, empty dark wall
> with soft gradient lighting and no text — reserved for website headline
> and button overlay. Ultra-high detail, physically-based rendering quality,
> 8K product photography. No people, no clutter, no watermarks.

## Concept 2 — Luxury hospitality venue integration

> [Shared machine description above.] The machine is professionally
> wall-mounted inside a high-end hospitality venue — an upscale cocktail bar
> or boutique hotel lounge at night. Environment: dark wood or matte stone
> wall texture, warm low ambient lighting from unseen pendant fixtures, soft
> out-of-focus bokeh of venue lighting (string lights, glassware
> reflections, a blurred bar counter) in the background. The machine's
> screen provides a cool teal light source in contrast to the warm ambient
> venue lighting. Camera: slightly low angle, three-quarter view, as if a
> guest is approaching the machine, 35mm lens look, natural shallow depth of
> field — machine crisp, venue softly blurred behind it. Photorealistic,
> editorial hospitality/interior-design photography style. No people in
> frame, no other brand signage, no watermarks.

## Concept 3 — Close-up cinematic craftsmanship

> [Shared machine description above, cropped to the upper section only —
> screen edge, bezel, and payment terminal corner, not the full cabinet.]
> Extreme close-up composition on the edge where the matte black chassis
> meets the touchscreen bezel, with a partial view of the payment terminal.
> Style reference: Tesla or Bang & Olufsen product photography — obsessive
> attention to material texture (matte black, subtle micro-texture on an
> anodized-metal-like finish), precise seams and tolerances. A single
> dramatic hard-edged light source rakes across the surface from the top,
> creating a bright specular highlight along one edge and deep shadow
> elsewhere. The touchscreen shows a sliver of the STACKD interface glowing
> teal, softly lighting nearby surfaces. Background: pure black, completely
> out of focus / undefined, so the machine's geometry and material carry the
> entire image. Macro product-photography look, extremely shallow depth of
> field, ultra-detailed. No people, no full-machine view, no text overlay,
> no watermarks.

---

## Meet STACKD section — premium editorial product appreciation

For the homepage's "Meet STACKD" section (`src/components/meet-stackd.tsx`)
— explicitly **not** the hero image. The hero is a dramatic launch moment;
this one is quieter, closer to a catalogue photograph than a marketing
shot. Product appreciation, not spectacle.

> [Shared machine description above.] Photographed as a premium industrial
> design catalogue image — the tone of a Bang & Olufsen or Leica product
> catalogue, not a product launch campaign. The machine is mounted naturally
> on a dark architectural wall — matte charcoal, subtle real-world texture,
> no studio artificiality. Lighting is soft and directional, from one side,
> revealing the texture of the matte black powder-coated finish and the
> precision of the cabinet's seams and edges — **no dramatic rim-light glow,
> no theatrical spotlighting, no lens flare.** This should look like it was
> lit to show the object honestly, not to create excitement. Camera:
> eye-level, straight-on or very slight angle (~5–10°), longer lens look
> (85mm equivalent) for minimal distortion, so the proportions read
> accurately. Generous negative space around the machine on all sides — the
> wall itself is a real part of the composition, not empty space to crop
> out. Sharp focus throughout the cabinet, natural depth of field falloff
> only on the wall behind it. Photorealistic, calm, quiet, considered. No
> people, no clutter, no watermarks, no marketing copy or overlay text in
> the image itself.

---

## Negative prompt / exclusions (apply to all of the above)

Reyeah logo or branding, any text other than STACKD, floor stands, pedestals,
legs, visible cables or mounting brackets, generic or cartoonish vending
machine shapes, other product brands, people, watermarks, low detail.
