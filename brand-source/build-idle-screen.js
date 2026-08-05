const fs = require("fs");

function extractPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path[\s\S]*?\/>/g)].map((m) => m[0]).join("\n");
}

const iconPaths = extractPaths("derivatives/icon-white.svg");
const wmPaths = extractPaths("derivatives/wordmark-white.svg");

const W = 500;
const H = 1300;

// Build the stack top-down from a running cursor so it's easy to keep
// centered as a single group, rather than guessing fixed Y positions.
const iconH = 130;
const gap1 = 45;
const wmH = (63.137 / 316.363) * 320; // wordmark target width 320
const gap2 = 50;
const taglineH = 26;
const gap3 = 40;
const lineBlockH = 30;
const gap4 = 40;
const tapH = 40;
const gap5 = 70;
const ageH = 20;

const totalH =
  iconH + gap1 + wmH + gap2 + taglineH + gap3 + lineBlockH + gap4 + tapH + gap5 + ageH;
let cursor = (H - totalH) / 2;

const iconScale = iconH / 258.977;
const iconTargetW = 227.527 * iconScale;
const iconX = (W - iconTargetW) / 2;
const iconY = cursor;
const iconTransform = `translate(${iconX} ${iconY}) scale(${iconScale}) translate(-136.234 -70.105)`;
cursor += iconH + gap1;

const wmScale = 320 / 316.363;
const wmX = (W - 320) / 2;
const wmY = cursor;
const wmTransform = `translate(${wmX} ${wmY}) scale(${wmScale}) translate(-91.816 -342.219)`;
cursor += wmH + gap2;

const taglineY = cursor + taglineH * 0.75;
cursor += taglineH + gap3;

const lineY = cursor + lineBlockH / 2;
cursor += lineBlockH + gap4;

const tapY = cursor + tapH * 0.75;
cursor += tapH + gap5;

const ageY = cursor + ageH * 0.75;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#0b0d10"/>
<rect width="${W}" height="${H}" fill="url(#vign)"/>
<defs>
<radialGradient id="vign" cx="50%" cy="42%" r="75%">
<stop offset="0%" stop-color="#12181b"/>
<stop offset="100%" stop-color="#0b0d10"/>
</radialGradient>
</defs>
<g>${iconPaths.replace(/<path/g, `<path transform="${iconTransform}"`)}</g>
<g>${wmPaths.replace(/<path/g, `<path transform="${wmTransform}"`)}</g>
<g opacity="0.07">
<rect x="-100" y="0" width="180" height="${H}" fill="#ffffff" transform="skewX(-18)"/>
</g>
<text x="${W / 2}" y="${taglineY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="2" fill="#c7cdd2">PREMIUM AUTOMATED RETAIL</text>
<rect x="${W / 2 - 55}" y="${lineY}" width="110" height="2.5" fill="#3DB4D3"/>
<text x="${W / 2}" y="${tapY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#3DB4D3">Tap to Begin</text>
<text x="${W / 2}" y="${ageY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#7c8288">Age Verification Required</text>
</svg>
`;

fs.writeFileSync("idle-screen-flat.svg", svg);
console.log("written idle-screen-flat.svg, totalH=", totalH, "start=", (H-totalH)/2);
