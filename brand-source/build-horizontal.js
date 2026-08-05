const fs = require("fs");

function extractPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path[\s\S]*?\/>/g)].map((m) => m[0]).join("\n");
}

const iconPaths = extractPaths("originals/icon-original.svg");
const wordmarkPaths = extractPaths("originals/wordmark-original.svg");

const scale = 100 / 258.977;
const iconW = 227.527 * scale;
const gap = 16;
const wmW = 316.363 * scale;
const wmH = 63.137 * scale;
const wmX = iconW + gap;
const wmY = (100 - wmH) / 2;
const totalW = wmX + wmW;
const pad = 4;

const iconTransform = `translate(0 0) scale(${scale}) translate(-136.234 -70.105)`;
const wmTransform = `translate(${wmX} ${wmY}) scale(${scale}) translate(-91.816 -342.219)`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${totalW + pad * 2} ${100 + pad * 2}">
<g transform="${iconTransform}">
${iconPaths}
</g>
<g transform="${wmTransform}">
${wordmarkPaths}
</g>
</svg>
`;

fs.writeFileSync("derivatives/horizontal-color.svg", svg);
console.log("Written derivatives/horizontal-color.svg", { totalW, wmX, wmY, wmW, wmH, iconW });
