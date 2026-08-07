const sharp = require("../node_modules/sharp");
const path = require("path");

// v5: second from-scratch batch, generated to match the corrected screen
// aspect (0.732:1, measured from the How It Works machine photo's real
// screen pixels — see PROJECT.md "Venue Communications: switched to the
// How It Works device render"). Unlike v4 (built for the old, now-unused
// Black Wall screen crop at 0.47:1), these land within 0.6% of the true
// target ratio, so — like v4 — no server-side cropping needed, just
// flatten + re-encode to JPG.
const OUT_DIR = path.join(__dirname, "..", "public", "images");

const FILES = [
  { src: "happy hour 2.png", out: "advert-happy-hour-v5.jpg" },
  { src: "live music 2.png", out: "advert-live-music-v5.jpg" },
  { src: "golf day 2.png", out: "advert-golf-day-v5.jpg" },
  { src: "pro shop 2.png", out: "advert-pro-shop-v5.jpg" },
  { src: "burger and beer 2.png", out: "advert-burgers-beers-v5.jpg" },
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
