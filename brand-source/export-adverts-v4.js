const sharp = require("../node_modules/sharp");
const path = require("path");

// v4: user's newest batch, built by ChatGPT at (essentially) the exact
// target aspect ratio (183/389 = 0.4704) from the start, so unlike v1-v3
// this needs no cropping — just flatten (no alpha) and re-encode as JPG
// into public/images under a fresh cache-busted filename.
const OUT_DIR = path.join(__dirname, "..", "public", "images");

const FILES = [
  { src: "happy hour.png", out: "advert-happy-hour-v4.jpg" },
  { src: "live music.png", out: "advert-live-music-v4.jpg" },
  { src: "golf day.png", out: "advert-golf-day-v4.jpg" },
  { src: "pro shop.png", out: "advert-pro-shop-v4.jpg" },
  { src: "burger and beer.png", out: "advert-burgers-beers-v4.jpg" },
];

async function main() {
  for (const { src, out } of FILES) {
    await sharp(path.join(__dirname, src))
      .flatten({ background: "#0b0d10" })
      .jpeg({ quality: 92 })
      .toFile(path.join(OUT_DIR, out));
    console.log("wrote", out);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
