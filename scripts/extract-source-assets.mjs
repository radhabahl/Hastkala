import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const sourcePath = process.argv[2];

if (!sourcePath) {
  throw new Error('Pass the source HTML path as the first argument.');
}

const html = await readFile(resolve(sourcePath), 'utf8');
const outputDir = resolve('src/assets/source');
await mkdir(outputDir, { recursive: true });

const imagePattern = /<img\s+src="data:image\/([^;]+);base64,([^"]+)"\s+alt="([^"]*)"/g;
const seen = new Map();
const manifest = [];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);

for (const match of html.matchAll(imagePattern)) {
  const [, mediaType, encoded, alt] = match;
  const baseName = slugify(alt) || `image-${manifest.length + 1}`;
  const count = (seen.get(baseName) ?? 0) + 1;
  seen.set(baseName, count);

  const extension = mediaType === 'png' ? '.png' : '.jpg';
  const filename = `${baseName}${count > 1 ? `-${count}` : ''}${extension}`;
  const targetPath = join(outputDir, filename);

  await writeFile(targetPath, Buffer.from(encoded, 'base64'));
  manifest.push({ filename, alt, sourceExtension: extname(filename) });
}

await writeFile(
  join(outputDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);

console.log(`Extracted ${manifest.length} images to ${outputDir}`);
