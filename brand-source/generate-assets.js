const sharp = require("../node_modules/sharp");
const fs = require("fs");

// IMPORTANT: the source artwork's white separator lines are negative space
// relying on a white/light backing, not actual white-filled paths (verified
// by inspecting the extracted vector paths — only 3 teal fills exist, no
// white). So every raster export that needs the icon to read correctly MUST
// composite it onto a light background, never transparent or dark, or the
// separator lines disappear. See conversation notes for the dark-background
// options proposed for header/footer use instead.
const OFFWHITE = { r: 246, g: 242, b: 234, alpha: 1 };

async function main() {
  const iconSrc = fs.readFileSync("icon-color.svg");

  // Square favicon/app icon sizes: icon centered on an off-white square canvas
  for (const size of [32, 48, 192, 512]) {
    const inner = Math.round(size * 0.82);
    const iconBuf = await sharp(iconSrc)
      .resize({ width: inner, height: inner, fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(iconBuf).metadata();
    await sharp({
      create: { width: size, height: size, channels: 4, background: OFFWHITE },
    })
      .composite([
        {
          input: iconBuf,
          left: Math.round((size - meta.width) / 2),
          top: Math.round((size - meta.height) / 2),
        },
      ])
      .png()
      .toFile(`favicon-${size}.png`);
  }

  // Apple touch icon: opaque off-white background (iOS masks corners itself)
  {
    const size = 180;
    const inner = Math.round(size * 0.72);
    const iconBuf = await sharp(iconSrc)
      .resize({ width: inner, height: inner, fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(iconBuf).metadata();
    await sharp({
      create: { width: size, height: size, channels: 4, background: OFFWHITE },
    })
      .composite([
        {
          input: iconBuf,
          left: Math.round((size - meta.width) / 2),
          top: Math.round((size - meta.height) / 2),
        },
      ])
      .png()
      .toFile("apple-touch-icon.png");
  }

  // Social avatar: 1080x1080, icon centered on off-white square with generous padding
  {
    const size = 1080;
    const inner = Math.round(size * 0.58);
    const iconBuf = await sharp(iconSrc)
      .resize({ width: inner, height: inner, fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(iconBuf).metadata();
    await sharp({
      create: { width: size, height: size, channels: 4, background: OFFWHITE },
    })
      .composite([
        {
          input: iconBuf,
          left: Math.round((size - meta.width) / 2),
          top: Math.round((size - meta.height) / 2),
        },
      ])
      .png()
      .toFile("social-avatar-1080.png");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
