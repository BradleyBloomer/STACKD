const sharp = require("../node_modules/sharp");

// Same hardware photo as the Hero (Black Wall render), same badge-blank
// treatment — but the screen is filled with a flat idle-dark colour
// instead of the branded "Tap to Begin" idle screen, because this output
// is a *background plate* for the Venue Communications section: the
// screen content there is live React/CSS (crossfading campaign examples),
// composited in the browser, not baked into the photo. This guarantees
// the machine pixels are byte-identical across every campaign shown —
// "the machine itself should remain completely static" is enforced by
// construction (one photo, ever), not by careful animation timing.

function computeHomography(src, dst) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [X, Y] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
    b.push(X);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
    b.push(Y);
  }
  for (let i = 0; i < 8; i++) {
    let maxRow = i;
    for (let k = i + 1; k < 8; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    }
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    [b[i], b[maxRow]] = [b[maxRow], b[i]];
    for (let k = i + 1; k < 8; k++) {
      const f = A[k][i] / A[i][i];
      for (let j = i; j < 8; j++) A[k][j] -= f * A[i][j];
      b[k] -= f * b[i];
    }
  }
  const h = new Array(8);
  for (let i = 7; i >= 0; i--) {
    let sum = b[i];
    for (let j = i + 1; j < 8; j++) sum -= A[i][j] * h[j];
    h[i] = sum / A[i][i];
  }
  return [
    [h[0], h[1], h[2]],
    [h[3], h[4], h[5]],
    [h[6], h[7], 1],
  ];
}
function applyH(H, x, y) {
  const X = H[0][0] * x + H[0][1] * y + H[0][2];
  const Y = H[1][0] * x + H[1][1] * y + H[1][2];
  const W = H[2][0] * x + H[2][1] * y + H[2][2];
  return [X / W, Y / W];
}
function pointInQuad(px, py, quad) {
  let inside = false;
  for (let i = 0, j = quad.length - 1; i < quad.length; j = i++) {
    const [xi, yi] = quad[i];
    const [xj, yj] = quad[j];
    const intersect =
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function bilinearSample(buf, w, h, channels, x, y) {
  // Clamp rather than reject — see composite-black-wall.js for why a
  // strict bounds check here silently leaves original photo content
  // visible at the quad's edge instead of being replaced. Especially
  // important here since the fill source is tiny (8x8): a mapped point
  // 89% of the way across a 183px-wide destination quad lands in the
  // source's outermost ~12% by construction, not as a rare edge case.
  x = Math.max(0, Math.min(w - 1, x));
  y = Math.max(0, Math.min(h - 1, y));
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, w - 1), y1 = Math.min(y0 + 1, h - 1);
  const fx = x - x0, fy = y - y0;
  const px = (xx, yy) => (yy * w + xx) * channels;
  const out = new Array(channels);
  for (let c = 0; c < channels; c++) {
    const v00 = buf[px(x0, y0) + c];
    const v10 = buf[px(x1, y0) + c];
    const v01 = buf[px(x0, y1) + c];
    const v11 = buf[px(x1, y1) + c];
    const top = v00 * (1 - fx) + v10 * fx;
    const bot = v01 * (1 - fx) + v11 * fx;
    out[c] = top * (1 - fy) + bot * fy;
  }
  return out;
}

async function main() {
  const basePath = "originals/black-wall-original.png";
  const { data: baseData, info: baseInfo } = await sharp(basePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: BW, height: BH, channels: BC } = baseInfo;

  // Flat idle-dark fill, no content — matches idle-screen-flat.svg's base
  // tone so it reads as "the same screen, just between messages" rather
  // than an obviously different asset.
  const srcW = 8, srcH = 8;
  const fillSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${srcW}" height="${srcH}"><rect width="${srcW}" height="${srcH}" fill="#0b0d10"/></svg>`;
  const { data: screenData, info: screenInfo } = await sharp(
    Buffer.from(fillSvg)
  )
    .resize(srcW, srcH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const SC = screenInfo.channels;

  // Same quad as the Hero composite — same photo, same screen geometry.
  const quad = [
    [475, 452],
    [658, 460],
    [658, 838],
    [475, 841],
  ];
  const srcRect = [
    [0, 0],
    [srcW, 0],
    [srcW, srcH],
    [0, srcH],
  ];
  const Hinv = computeHomography(quad, srcRect);

  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  const minX = Math.max(0, Math.floor(Math.min(...xs)) - 2);
  const maxX = Math.min(BW - 1, Math.ceil(Math.max(...xs)) + 2);
  const minY = Math.max(0, Math.floor(Math.min(...ys)) - 2);
  const maxY = Math.min(BH - 1, Math.ceil(Math.max(...ys)) + 2);

  for (let py = minY; py <= maxY; py++) {
    for (let px = minX; px <= maxX; px++) {
      if (!pointInQuad(px, py, quad)) continue;
      const [sx, sy] = applyH(Hinv, px, py);
      const sample = bilinearSample(screenData, srcW, srcH, SC, sx, sy);
      if (!sample) continue;
      const baseIdx = (py * BW + px) * BC;
      baseData[baseIdx] = sample[0];
      baseData[baseIdx + 1] = sample[1];
      baseData[baseIdx + 2] = sample[2];
    }
  }

  let composite = sharp(baseData, { raw: { width: BW, height: BH, channels: BC } });

  // Badge patch — identical to the Hero treatment (blank, no branding).
  const patchX = 628, patchY = 394, patchW = 124, patchH = 50;
  const gradientStops = [
    [0, 47, 47, 47],
    [0.5, 51, 51, 51],
    [1, 55, 55, 54],
  ];
  const stopsSvg = gradientStops
    .map(([o, r, g, b]) => `<stop offset="${o}" stop-color="rgb(${r},${g},${b})"/>`)
    .join("");
  const feather = 14;
  const patchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${patchW}" height="${patchH}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">${stopsSvg}</linearGradient>
      <linearGradient id="fadeX" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="white" stop-opacity="0"/>
        <stop offset="${feather / patchW}" stop-color="white" stop-opacity="1"/>
        <stop offset="${1 - feather / patchW}" stop-color="white" stop-opacity="1"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fadeY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="white" stop-opacity="0"/>
        <stop offset="${feather / patchH}" stop-color="white" stop-opacity="1"/>
        <stop offset="${1 - feather / patchH}" stop-color="white" stop-opacity="1"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <mask id="m">
        <rect width="${patchW}" height="${patchH}" fill="url(#fadeX)"/>
        <rect width="${patchW}" height="${patchH}" fill="url(#fadeY)" style="mix-blend-mode:multiply"/>
      </mask>
    </defs>
    <rect width="${patchW}" height="${patchH}" fill="url(#g)" mask="url(#m)"/>
  </svg>`;
  const patchBuf = await sharp(Buffer.from(patchSvg)).png().toBuffer();

  composite = composite.composite([{ input: patchBuf, left: patchX, top: patchY }]);

  // Materialize the composite to a buffer BEFORE cropping. Sharp applies
  // extract() ahead of composite() in its internal pipeline regardless of
  // JS call order, so chaining .extract() straight onto a pipeline that
  // still has a pending .composite() crops the *pre-patch* image — the
  // patch coordinates then land outside the (already-cropped) canvas and
  // silently do nothing. Found via a debug pre-crop render that showed
  // the patch working, followed by a final file that didn't — the crop
  // was the difference. Resolving to a buffer first forces the composite
  // to actually happen before extract gets a turn.
  const patchedBuf = await composite.png().toBuffer();

  // Tighter crop than the Hero's (which shows the wall context around
  // the cabinet) — the user asked for "a much stronger visual
  // demonstration" and "keep the machine large," so this crops in close
  // on the cabinet itself, making the screen a much bigger fraction of
  // the frame than the Hero's ~16%. First attempt (cropX=330) cut into
  // the cabinet's own left edge — the true left edge (rounded corner +
  // side panel, confirmed via a visual crop, not just luminance
  // scanning) sits around x=285-300, not ~350 as first estimated.
  // cropX=250 restores real wall margin before the cabinet starts.
  const cropX = 250, cropY = 340, cropW = 550, cropH = 780;
  await sharp(patchedBuf)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .jpeg({ quality: 92 })
    .toFile("venue-comms-machine.jpg");

  // Screen rect as % of this tighter crop, for the live CSS overlay.
  const rel = {
    leftPct: ((475 - cropX) / cropW) * 100,
    topPct: ((452 - cropY) / cropH) * 100,
    widthPct: ((658 - 475) / cropW) * 100,
    heightPct: ((841 - 452) / cropH) * 100,
  };
  console.log("screen rect %:", rel);
  console.log("done: venue-comms-machine.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
