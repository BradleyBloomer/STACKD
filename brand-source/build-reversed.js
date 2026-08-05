const fs = require("fs");

// Builds a technically-correct dark-background variant.
// The visible teal shapes are the ORIGINAL, UNMODIFIED paths (byte-identical
// d attributes, byte-identical fill colors) — nothing about the icon itself
// is redrawn or recolored. A separate backing layer, using copies of the
// exact same paths with an off-white fill + stroke, sits behind them to
// restore the separator lines that (on the original artwork) were negative
// space relying on a white page. The stroke only needs to be wide enough to
// bridge the narrow gaps between adjacent shapes — it is not a redesign.

function extractPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path([\s\S]*?)\/>/g)].map((m) => m[1]);
}

function buildVariant(strokeWidth) {
  const raw = extractPaths("originals/icon-original.svg");
  const viewBox = fs
    .readFileSync("originals/icon-original.svg", "utf8")
    .match(/viewBox="([^"]+)"/)[1];

  const backing = raw
    .map((p) => `<path${p.replace(/fill="rgb\([^)]*\)"/, 'fill="#F6F2EA"')}/>`)
    .join("\n");
  const foreground = raw.map((p) => `<path${p}/>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
<g stroke="#F6F2EA" stroke-width="${strokeWidth}" stroke-linejoin="round">
${backing}
</g>
<g>
${foreground}
</g>
</svg>
`;
}

// stroke-width 3.5 chosen after visual testing: fully bridges the design's
// narrow separator gaps without visibly thickening the outer silhouette
fs.writeFileSync("derivatives/icon-reversed-darkbg.svg", buildVariant(3.5));
console.log("done");
