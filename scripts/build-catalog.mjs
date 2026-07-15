#!/usr/bin/env node
/* Builds catalog.csv — the product feed Meta Commerce Manager reads.
 *
 * Run `node scripts/build-catalog.mjs` after ANY change to the products array
 * in main.js, then commit the regenerated catalog.csv.
 * Meta re-fetches the file from https://dailystoptoshop.com/catalog.csv.
 *
 * The `id` column must stay identical to the content_ids the pixel sends
 * (see pixel.js) — that pairing is what makes dynamic product ads work.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://dailystoptoshop.com';

const src = readFileSync(join(root, 'main.js'), 'utf8');
const match = src.match(/const products = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('build-catalog: could not find `const products = [...]` in main.js.');
  console.error('If that array moved or was renamed, update the regex above.');
  process.exit(1);
}
const products = new Function(`return ${match[1]}`)();

const abs = (path) => `${SITE}/${String(path).replace(/^\.\//, '')}`;
const cell = (value) => {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const columns = [
  'id', 'title', 'description', 'availability', 'condition',
  'price', 'sale_price', 'link', 'image_link', 'additional_image_link', 'brand'
];

const rows = products.map((p) => ({
  id: p.id,
  title: p.name,
  description: p.description,
  availability: p.inStock ? 'in stock' : 'out of stock',
  condition: 'new',
  // Meta shows `price` struck through and `sale_price` as the live price.
  price: `${p.originalPrice || p.price} ${p.currency}`,
  sale_price: p.originalPrice ? `${p.price} ${p.currency}` : '',
  link: `${SITE}/product.html?id=${p.id}`,
  image_link: abs(p.images[0]),
  additional_image_link: p.images.slice(1, 11).map(abs).join(','),
  brand: (p.specs && p.specs.Brand) || 'dailystoptoshop'
}));

const csv = [
  columns.join(','),
  ...rows.map((row) => columns.map((c) => cell(row[c])).join(','))
].join('\n') + '\n';

writeFileSync(join(root, 'catalog.csv'), csv, 'utf8');
console.log(`catalog.csv written — ${rows.length} products`);
