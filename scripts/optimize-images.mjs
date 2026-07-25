import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

/* Static export serves public/ verbatim (next.config.ts sets
 * images.unoptimized), so whatever lands in public/images is exactly what the
 * browser downloads. Run this after adding a capture: it rewrites PNG/JPEG
 * sources as WebP and drops the original.
 *
 * MAX_WIDTH is sized for the widest slot the images appear in — the .shell
 * container is 72rem, and .case-media splits its column in two — at 2x DPR. */
const DIR = "public/images";
const MAX_WIDTH = 1000;
const QUALITY = 82;

const sources = readdirSync(DIR).filter((file) => /\.(png|jpe?g)$/i.test(file));
if (!sources.length) {
  console.log("No PNG or JPEG sources in public/images — nothing to do.");
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of sources) {
  const from = join(DIR, file);
  const to = join(DIR, `${parse(file).name}.webp`);

  await sharp(from)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(to);

  const originalSize = statSync(from).size;
  const webpSize = statSync(to).size;
  before += originalSize;
  after += webpSize;
  unlinkSync(from);

  console.log(`${file} → ${parse(to).base}  ${kb(originalSize)} → ${kb(webpSize)}`);
}

console.log(`\nTotal: ${kb(before)} → ${kb(after)}`);

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}
