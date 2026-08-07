const sharp = require("../node_modules/sharp");

async function main() {
  const src = "originals/front-view-original.png";

  // Crop to remove most of the excess cream studio background while
  // keeping a clean product-shot margin around the cabinet.
  const crop = { left: 353, top: 30, width: 720, height: 998 };

  // The device is exported as a true cutout with a transparent background,
  // not flattened onto a flat cream rectangle. An earlier version placed
  // the cutout on a solid cream JPEG, which fixed the shadow but
  // introduced a new problem: the photo's own cream margin is a *slightly*
  // different shade than the site's --color-offwhite token, so the
  // rectangular bounds of the photo itself showed up as a faint seam
  // against the page. Cutting out to alpha instead means the device sits
  // directly on the page's real background — no second "cream layer" to
  // ever mismatch.
  //
  // Tight to the measured device edge (lum<80 scan found left=422,
  // right=1022, top=60, bottom=995) with a couple px pulled *inward*, not
  // outward — any outward margin leaves a sliver of original background
  // (with its own soft edge-shadow) inside the mask.
  const deviceRectOrig = { left: 424, top: 62, right: 1020, bottom: 993 };
  const cornerRadius = 53;
  const deviceRect = {
    left: deviceRectOrig.left - crop.left,
    top: deviceRectOrig.top - crop.top,
    right: deviceRectOrig.right - crop.left,
    bottom: deviceRectOrig.bottom - crop.top,
  };

  const cropped = await sharp(src).extract(crop).toBuffer();
  const cutoutW = deviceRect.right - deviceRect.left;
  const cutoutH = deviceRect.bottom - deviceRect.top;
  const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cutoutW}" height="${cutoutH}">
    <rect width="${cutoutW}" height="${cutoutH}" rx="${cornerRadius}" fill="#fff"/>
  </svg>`;

  // Cabinet badge (icon + "STACKD" text) patched blank — same rule as the
  // hero render: the physical badge stays unbranded, the touchscreen is
  // where content lives. Coordinates relative to the device cutout's own
  // origin (not the crop) now that the cutout is the final canvas.
  const patchOrig = { left: 815, top: 70, width: 175, height: 70 };
  const patch = {
    left: patchOrig.left - deviceRectOrig.left,
    top: patchOrig.top - deviceRectOrig.top,
    width: patchOrig.width,
    height: patchOrig.height,
  };
  const feather = 16;
  const patchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${patch.width}" height="${patch.height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="rgb(44,44,43)"/>
        <stop offset="1" stop-color="rgb(47,47,46)"/>
      </linearGradient>
      <linearGradient id="fadeX" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="white" stop-opacity="0"/>
        <stop offset="${feather / patch.width}" stop-color="white" stop-opacity="1"/>
        <stop offset="${1 - feather / patch.width}" stop-color="white" stop-opacity="1"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fadeY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="white" stop-opacity="0"/>
        <stop offset="${feather / patch.height}" stop-color="white" stop-opacity="1"/>
        <stop offset="${1 - feather / patch.height}" stop-color="white" stop-opacity="1"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <mask id="m">
        <rect width="${patch.width}" height="${patch.height}" fill="url(#fadeX)"/>
        <rect width="${patch.width}" height="${patch.height}" fill="url(#fadeY)" style="mix-blend-mode:multiply"/>
      </mask>
    </defs>
    <rect width="${patch.width}" height="${patch.height}" fill="url(#g)" mask="url(#m)"/>
  </svg>`;
  const patchBuf = await sharp(Buffer.from(patchSvg)).png().toBuffer();

  // Badge patch first (still opaque, inside device bounds), THEN the
  // rounded-rect alpha mask on top via dest-in — both effects, one
  // composite() call. (Sharp doesn't stack across separate composite()
  // calls on the same pipeline — found the hard way earlier: a second
  // call silently discarded the first.)
  await sharp(cropped)
    .extract({
      left: deviceRect.left,
      top: deviceRect.top,
      width: cutoutW,
      height: cutoutH,
    })
    .ensureAlpha()
    .composite([
      { input: patchBuf, left: patch.left, top: patch.top },
      { input: Buffer.from(maskSvg), blend: "dest-in" },
    ])
    .png()
    .toFile("how-it-works-machine.png");

  // Screen rectangle, relative to the device cutout's own origin (the
  // cutout is now the full exported canvas, not a crop-with-margin).
  const screen = { left: 531, top: 183, right: 918, bottom: 731 };
  const rel = {
    leftPct: ((screen.left - deviceRectOrig.left) / cutoutW) * 100,
    topPct: ((screen.top - deviceRectOrig.top) / cutoutH) * 100,
    widthPct: ((screen.right - screen.left) / cutoutW) * 100,
    heightPct: ((screen.bottom - screen.top) / cutoutH) * 100,
  };
  console.log("cutout size", { cutoutW, cutoutH });
  console.log("screen rect %:", rel);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
