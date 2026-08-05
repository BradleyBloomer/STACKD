const sharp = require("../node_modules/sharp");
const fs = require("fs");

// --- tiny homography (projective) solver -----------------------------
// Solves for the 3x3 matrix H (8 DOF, h33=1) such that for each pair
// (x,y) -> (X,Y):  [X,Y,1]^T ~ H * [x,y,1]^T
function computeHomography(src, dst) {
  // src, dst: arrays of 4 [x,y] points
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
  // Gaussian elimination on 8x8
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
  // ray casting
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
  if (x < 0 || y < 0 || x > w - 1 || y > h - 1) return null;
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

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

async function main() {
  const basePath = "originals/image-1785960086981.webp";
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

  // Destination quad (inner active screen area), corners in order
  // TL, TR, BR, BL — read from the coordinate-grid crops earlier.
  const quad = [
    [478, 358],
    [690, 322],
    [688, 828],
    [478, 840],
  ];
  const srcRect = [
    [0, 0],
    [srcW, 0],
    [srcW, srcH],
    [0, srcH],
  ];
  // dest->source mapping: solve H taking quad points to rect points
  const Hinv = computeHomography(quad, srcRect);

  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  const minX = Math.max(0, Math.floor(Math.min(...xs)) - 2);
  const maxX = Math.min(BW - 1, Math.ceil(Math.max(...xs)) + 2);
  const minY = Math.max(0, Math.floor(Math.min(...ys)) - 2);
  const maxY = Math.min(BH - 1, Math.ceil(Math.max(...ys)) + 2);

  // Clean replace within the quad. The old photo's reflection isn't reused
  // here (it would ghost the old "VENDING MACHINE" text back in, since
  // text and glass glare are both just "bright pixels" — no way to tell
  // them apart from luminance alone). A synthetic reflection is baked
  // into idle-screen-flat.svg instead, which avoids that entirely.
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

  // --- Logo badge replacement (top-right "STACKD" text) ---------------
  // Erase the placeholder text with a patch matching the panel's real
  // lighting gradient (sampled from the photo itself, not a flat fill),
  // then composite the real logo lockup on top, rotated to match the
  // panel's tilt.
  let composite = sharp(baseData, {
    raw: { width: BW, height: BH, channels: BC },
  });

  // Kept tight to the flat part of the panel, short of the rounded
  // corner (which starts around x=780) so the patch never overlaps the
  // curve into the wall/background.
  const patchX = 648, patchY = 296, patchW = 128, patchH = 52;
  const gradientStops = [
    [0, 71, 71, 71],
    [0.3, 70, 70, 70],
    [0.6, 74, 74, 74],
    [1, 80, 80, 78],
  ];
  const stopsSvg = gradientStops
    .map(([o, r, g, b]) => `<stop offset="${o}" stop-color="rgb(${r},${g},${b})"/>`)
    .join("");
  // Feather the alpha mask (not just the color) so the patch blends into
  // the surrounding photo instead of showing as a hard-edged box.
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

  const logoSvgRaw = fs.readFileSync("derivatives/horizontal-white.svg", "utf8");
  const logoViewBox = logoSvgRaw.match(/viewBox="([^"]+)"/)[1];
  const logoTargetW = 145;
  const [, , vbW, vbH] = logoViewBox.split(" ").map(Number);
  const logoTargetH = (vbH / vbW) * logoTargetW;
  // Supersample for quality, then scale back down to the real target size
  // before rotating — forgetting this step was the earlier bug (the logo
  // rendered 3x too large because the resize-down never happened).
  const superscale = 3;
  const logoPngBig = await sharp(Buffer.from(logoSvgRaw))
    .resize(
      Math.round(logoTargetW * superscale),
      Math.round(logoTargetH * superscale)
    )
    .png()
    .toBuffer();
  const logoPng = await sharp(logoPngBig)
    .resize(Math.round(logoTargetW), Math.round(logoTargetH))
    .png()
    .toBuffer();
  const logoRotated = await sharp(logoPng)
    .rotate(-7, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoRotated).metadata();

  const centerX = 712, centerY = 322;

  composite = composite.composite([
    { input: patchBuf, left: patchX, top: patchY },
    {
      input: logoRotated,
      left: Math.round(centerX - logoMeta.width / 2),
      top: Math.round(centerY - logoMeta.height / 2),
    },
  ]);

  await composite.png().toFile("meet-stackd-final.png");
  console.log("done: meet-stackd-final.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
