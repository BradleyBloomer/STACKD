const sharp = require("../node_modules/sharp");

// --- tiny homography (projective) solver -----------------------------
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
  // Clamp rather than reject out-of-range coordinates. A strict bounds
  // rejection here caused a real bug: floating-point imprecision in the
  // homography maps destination pixels near the quad's edge to source
  // coordinates that overshoot [0, w-1]/[0, h-1] by a fraction of a
  // pixel — this used to return null, which the caller treats as "skip
  // this destination pixel," silently leaving the ORIGINAL photo content
  // visible there instead of the replacement. That's how a sliver of the
  // AI's placeholder "...RETAIL" text survived at the screen's right
  // edge in the shipped Hero image, undetected until a much-zoomed-in
  // check for the Venue Communications work turned it up. Clamping means
  // every destination pixel inside the quad is always replaced — never
  // silently left showing through.
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

  const srcW = 500, srcH = 1300;
  const { data: screenData, info: screenInfo } = await sharp(
    "idle-screen-flat.svg"
  )
    .resize(srcW, srcH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const SC = screenInfo.channels;

  // Screen quad, re-derived via pixel-luminance edge scanning (same
  // technique used to fix the first render's alignment bug) — this photo
  // is much closer to front-on than the first render, so the keystone is
  // small (a few px), not the ~50px+ keystone of the 3/4-angle shot.
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
      const [r, g, b] = sample;
      baseData[baseIdx] = r;
      baseData[baseIdx + 1] = g;
      baseData[baseIdx + 2] = b;
    }
  }

  // --- Logo badge replacement (top cabinet "STACKD" text) -------------
  // The AI render already drew a close approximation of the real logo —
  // per the standing rule, that's still a production asset problem, not
  // a prompting success: replace it with the real vector lockup rather
  // than keeping the AI's redrawn version.
  let composite = sharp(baseData, {
    raw: { width: BW, height: BH, channels: BC },
  });

  // Panel here reads as a near-flat neutral dark gray (~50-55), unlike
  // the first render's directional-lit panel — a gentle gradient is
  // still used so the patch isn't a dead-flat rectangle.
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

  // Cabinet badge is left blank — the AI's placeholder text is patched
  // away (feathered, colour-matched to the panel) and nothing is placed
  // back on top. The panel shape itself is part of the Stage-1 hardware
  // render and stays untouched; only the branding on it is removed.
  composite = composite.composite([
    { input: patchBuf, left: patchX, top: patchY },
  ]);

  await composite.png().toFile("black-wall-final.png");
  console.log("done: black-wall-final.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
