/**
 * Generates PWA icons as simple SVG-based PNGs.
 * Creates a teal circle with "L" letter — clean and recognizable at all sizes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'public', 'icons');

fs.mkdirSync(ICONS_DIR, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVG(size: number): string {
  const radius = size * 0.2;
  const fontSize = size * 0.55;
  const center = size / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#14b8a6"/>
  <text x="${center}" y="${center + fontSize * 0.35}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="${fontSize}" fill="white">L</text>
</svg>`;
}

for (const size of sizes) {
  const svg = generateSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(ICONS_DIR, filename), svg);
  console.log(`Created ${filename}`);
}

// Also create a maskable icon (with more padding for safe zone)
function generateMaskableSVG(size: number): string {
  const fontSize = size * 0.4;
  const center = size / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#14b8a6"/>
  <text x="${center}" y="${center + fontSize * 0.35}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="${fontSize}" fill="white">L</text>
</svg>`;
}

const maskableSvg = generateMaskableSVG(512);
fs.writeFileSync(path.join(ICONS_DIR, 'maskable-512x512.svg'), maskableSvg);
console.log('Created maskable-512x512.svg');

console.log('\nDone! All icons generated.');
