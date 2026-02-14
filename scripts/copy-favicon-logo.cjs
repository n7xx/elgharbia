const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const assetsDir = path.join(root, "src", "assets");
const distAssetsDir = path.join(root, "dist", "assets");

const candidates = [
  path.join(publicDir, "brand-logo.jpeg"),
  path.join(publicDir, "brand-logo.jpg"),
  path.join(publicDir, "brand-logo.png"),
  path.join(assetsDir, "brand-logo.jpeg"),
  path.join(assetsDir, "brand-logo.jpg"),
  path.join(assetsDir, "brand-logo.png"),
  path.join(distAssetsDir, "brand-logo.jpeg"),
  path.join(distAssetsDir, "brand-logo.jpg"),
  path.join(assetsDir, "logo-transparent.png"),
  path.join(assetsDir, "logo.jpg"),
];
const srcLogo = candidates.find((p) => fs.existsSync(p));

if (!srcLogo || !fs.existsSync(srcLogo)) {
  console.warn("scripts/copy-favicon-logo: no logo found. Add public/brand-logo.jpeg or src/assets/logo.");
  process.exit(0);
}

const ext = path.extname(srcLogo).toLowerCase();
const targets = [
  "favicon-192" + ext,
  "apple-touch-icon" + ext,
  "favicon-32x32" + ext,
  "favicon-16x16" + ext,
  "og-image" + ext,
];

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

targets.forEach((name) => {
  const dest = path.join(publicDir, name);
  fs.copyFileSync(srcLogo, dest);
  console.log("Copied logo to public/" + name);
});
