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
than tall or kiosk-like — approximately 850mm tall × 550mm wide × 220mm
deep, matching the real Reyeah D02 Pro** (this was corrected 2026-08-05;
earlier drafts under-specified this and risked reading as a tall kiosk).
Mounted flush against a wall — no
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

## Meet STACKD section — premium editorial product appreciation (final)

For the homepage's "Meet STACKD" section (`src/components/meet-stackd.tsx`)
— explicitly **not** the hero image. The hero is a dramatic launch moment;
this one is quieter, closer to a catalogue photograph than a marketing
shot. Product appreciation, not spectacle. User-authored final version
(2026-08-05), run with a real D02 Pro reference photo attached:

> Use the attached reference image of the real Reyeah D02 Pro as the
> hardware reference. Preserve the real cabinet's proportions, layout and
> silhouette exactly, while replacing all Reyeah branding with STACKD
> branding.
>
> Create a photorealistic editorial product photograph of the STACKD
> wall-mounted automated retail machine. This is not a dramatic hero image
> or concept art. It should feel like a premium industrial design catalogue
> from Leica, Bang & Olufsen or Apple Hardware.
>
> The cabinet is compact, dense and architectural. It should closely match
> the real Reyeah D02 Pro dimensions (approximately 850mm tall × 550mm wide
> × 220mm deep). Avoid making the machine tall, narrow or kiosk-like. The
> proportions should communicate a real manufactured commercial product.
>
> The machine is mounted flush against a matte charcoal architectural wall
> with no stand, no pedestal, no legs, no visible mounting brackets and no
> cables.
>
> The cabinet has a premium matte black powder-coated finish with subtle
> texture. Panel gaps are tight and precise. Rounded corners are restrained.
> It should feel engineered rather than futuristic.
>
> The 21.5-inch vertical touchscreen occupies the upper portion of the
> cabinet exactly like the real D02 Pro. Display a clean idle screen using
> the official STACKD logo, followed by: STACKD / Premium Automated Retail
> / a thin horizontal teal accent line / Tap to Begin / Age Verification
> Required. The interface should be extremely minimal with a restrained
> teal (#1E82A5) accent. Do not invent additional UI elements, dashboards,
> icons or graphics.
>
> Branding on the cabinet should be subtle. Place the official STACKD cube
> logo and wordmark in the upper-left corner of the cabinet face exactly as
> a real manufacturer would. Do not invent alternative logo treatments or
> place branding elsewhere.
>
> The lower-left contains the PUSH collection door.
>
> The lower-right contains a compact flush-mounted contactless payment
> terminal approximately the height of a modern smartphone. It has a small
> black display and NFC tap symbol only. No keypad, no coloured buttons, no
> PIN pad, no oversized handheld POS terminal. It should look integrated
> into the cabinet, not attached afterwards.
>
> Lighting should be soft and directional from one side, revealing the
> cabinet's materials and edges naturally. No dramatic rim lights, lens
> flares, smoke, blue glow, excessive reflections or cinematic effects.
>
> The machine should occupy roughly 70% of the composition vertically,
> allowing viewers to appreciate the hardware. Include generous but
> balanced negative space around it. Camera should be eye-level with a very
> slight three-quarter angle (5–10°) using an 85mm lens look to minimise
> distortion and accurately represent the cabinet's proportions.
>
> The final image should be indistinguishable from a real commercial
> product photograph. It should communicate precision manufacturing,
> premium industrial design and trust — not futuristic technology or
> marketing spectacle.

---

## Negative prompt / exclusions

**General (hero concepts 1–3):** Reyeah logo or branding, any text other
than STACKD, floor stands, pedestals, legs, visible cables or mounting
brackets, generic or cartoonish vending machine shapes, other product
brands, people, watermarks, low detail.

**Meet STACKD (final, user-authored):** tall kiosk proportions,
freestanding machine, floor stand, pedestal, visible mounting brackets,
visible cables, Reyeah branding, invented logos, incorrect STACKD logo,
keypad payment terminals, coloured POS buttons, oversized card readers,
fake UI dashboards, glowing sci-fi effects, people, watermarks, clutter,
exaggerated reflections, concept art, cartoon styling, speculative
industrial design.
