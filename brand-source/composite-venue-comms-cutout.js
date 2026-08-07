const sharp = require("../node_modules/sharp");

// Rebuilds the Venue Communications machine as a transparent cutout (no
// wall, like the How It Works front-view treatment) AND rebuilds the
// bezel mask to match — both need the same outer device silhouette cut
// to alpha, or the mask would reintroduce a wall-coloured rectangle
// around the now-transparent background.

function pointInQuad(px, py, quad) {
  let inside = false;
  for (let i = 0, j = quad.length - 1; i < quad.length; j = i++) {
    const [xi, yi] = quad[i]; const [xj, yj] = quad[j];
    const intersect = (yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

async function main() {
  const cropX = 250, cropY = 340, cropW = 550, cropH = 780;

  // Outer device silhouette, in ORIGINAL image coordinates — found via
  // luminance edge scanning (wall ~65-90, device ~10-50) plus a
  // diagonal corner scan for the radius (transition at d~22px from the
  // bounding-box corner => r = d/(1-1/sqrt(2)) ~= 75px).
  const deviceRectOrig = { left: 288, top: 380, right: 750, bottom: 1030 };
  const cornerRadius = 75;
  const deviceRect = {
    left: deviceRectOrig.left - cropX,
    top: deviceRectOrig.top - cropY,
    right: deviceRectOrig.right - cropX,
    bottom: deviceRectOrig.bottom - cropY,
  };

  // Screen quad (unchanged), crop-relative — used both to re-flatten the
  // screen on the new background layer and to punch the hole in the mask.
  const quadOrig = [[475,452],[658,460],[658,838],[475,841]];
  const quad = quadOrig.map(([x,y]) => [x-cropX, y-cropY]);

  const outerMaskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cropW}" height="${cropH}">
    <rect x="${deviceRect.left}" y="${deviceRect.top}"
          width="${deviceRect.right-deviceRect.left}" height="${deviceRect.bottom-deviceRect.top}"
          rx="${cornerRadius}" fill="#fff"/>
  </svg>`;

  // venue-comms-machine.jpg is ALREADY the 550x780 crop (cropX/cropY are
  // baked in) — use it directly, don't re-extract from it.

  // --- 1. Background layer: device only, no wall, screen flat-filled ---
  {
    await sharp("venue-comms-machine.jpg")
      .ensureAlpha()
      .composite([{ input: Buffer.from(outerMaskSvg), blend: "dest-in" }])
      .png()
      .toFile("venue-comms-machine-cutout.png");
  }

  // --- 2. Bezel mask: opaque cabinet/badge, transparent screen hole AND
  //     transparent outside the device silhouette (so it doesn't paint a
  //     wall-coloured rectangle back over the now-transparent background) ---
  {
    const { data, info } = await sharp("venue-comms-machine.jpg")
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: W, height: H, channels: C } = info;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (pointInQuad(x, y, quad)) {
          data[(y * W + x) * C + 3] = 0; // screen hole
        }
      }
    }
    await sharp(data, { raw: { width: W, height: H, channels: C } })
      .composite([{ input: Buffer.from(outerMaskSvg), blend: "dest-in" }])
      .png()
      .toFile("venue-comms-bezel-mask.png");
  }

  console.log("done: venue-comms-machine-cutout.png, venue-comms-bezel-mask.png");
}

main().catch((e) => { console.error(e); process.exit(1); });
