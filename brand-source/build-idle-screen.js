const fs = require("fs");

// NOTE: this environment's SVG renderer only rasterizes these embedded
// variable-font files correctly at font-weight >= 500 — at 300/400 it
// silently falls back to a generic serif with no error. Verified via
// brand-source/weight-test.png. Always specify weight >= 500 below.
const spaceGrotesk = fs.readFileSync(`${__dirname}/space-grotesk-latin.woff2`).toString("base64");
const jetbrainsMono = fs.readFileSync(`${__dirname}/jetbrains-mono-latin.woff2`).toString("base64");
const inter = fs.readFileSync(`${__dirname}/inter-latin.woff2`).toString("base64");

// The icon graphic stays on the touchscreen idle UI (a splash-style logo
// mark reads normally there) even though the physical cabinet badge and
// site chrome were simplified to text-only — same official icon paths as
// stackd-icon.tsx, never redrawn.
function extractPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path[\s\S]*?\/>/g)].map((m) => m[0]).join("\n");
}
const iconPaths = extractPaths(`${__dirname}/derivatives/icon-white.svg`);

const W = 500;
const H = 1300;

const iconH = 108;
const iconScale = iconH / 258.977;
const iconTargetW = 227.527 * iconScale;

const gap1 = 40;
const wordmarkH = 56;
const gap2 = 40;
const taglineH = 22;
const gap3 = 36;
const lineBlockH = 3;
const gap4 = 40;
const tapH = 38;
const gap5 = 64;
const ageH = 19;

const totalH =
  iconH + gap1 + wordmarkH + gap2 + taglineH + gap3 + lineBlockH + gap4 + tapH + gap5 + ageH;
let cursor = (H - totalH) / 2;

const iconX = (W - iconTargetW) / 2;
const iconY = cursor;
const iconTransform = `translate(${iconX} ${iconY}) scale(${iconScale}) translate(-136.234 -70.105)`;
cursor += iconH + gap1;

const wordmarkY = cursor + wordmarkH * 0.75;
cursor += wordmarkH + gap2;

const taglineY = cursor + taglineH * 0.8;
cursor += taglineH + gap3;

const lineY = cursor + lineBlockH / 2;
cursor += lineBlockH + gap4;

const tapY = cursor + tapH * 0.75;
cursor += tapH + gap5;

const ageY = cursor + ageH * 0.75;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<style>
@font-face {
  font-family: 'Space Grotesk';
  src: url(data:font/woff2;base64,${spaceGrotesk}) format('woff2');
  font-weight: 300 700;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url(data:font/woff2;base64,${jetbrainsMono}) format('woff2');
  font-weight: 100 800;
}
@font-face {
  font-family: 'Inter';
  src: url(data:font/woff2;base64,${inter}) format('woff2');
  font-weight: 100 900;
}
</style>
<radialGradient id="vign" cx="50%" cy="42%" r="75%">
<stop offset="0%" stop-color="#12181b"/>
<stop offset="100%" stop-color="#0b0d10"/>
</radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="#0b0d10"/>
<rect width="${W}" height="${H}" fill="url(#vign)"/>
<g opacity="0.07">
<rect x="-100" y="0" width="180" height="${H}" fill="#ffffff" transform="skewX(-18)"/>
</g>
<g>${iconPaths.replace(/<path/g, `<path transform="${iconTransform}"`)}</g>
<text x="${W / 2}" y="${wordmarkY}" text-anchor="middle" font-family="Space Grotesk" font-weight="600" letter-spacing="0.5" font-size="48" fill="#f6f2ea">STACKD</text>
<text x="${W / 2}" y="${taglineY}" text-anchor="middle" font-family="JetBrains Mono" font-weight="500" font-size="17" letter-spacing="3" fill="#c7cdd2">PREMIUM AUTOMATED RETAIL</text>
<rect x="${W / 2 - 55}" y="${lineY}" width="110" height="2.5" fill="#3DB4D3"/>
<text x="${W / 2}" y="${tapY}" text-anchor="middle" font-family="Space Grotesk" font-weight="500" font-size="36" fill="#3DB4D3">Tap to Begin</text>
<text x="${W / 2}" y="${ageY}" text-anchor="middle" font-family="Inter" font-weight="500" font-size="18" fill="#7c8288">Age Verification Required</text>
</svg>
`;

fs.writeFileSync(`${__dirname}/idle-screen-flat.svg`, svg);
console.log("written idle-screen-flat.svg");
