import { access, readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const htmlFiles = (await readdir(dist)).filter((file) => file.endsWith('.html'));
const failures = [];

for (const filename of htmlFiles) {
  const html = await readFile(join(dist, filename), 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (duplicates.length) failures.push(`${filename}: duplicate IDs: ${duplicates.join(', ')}`);
  if (/href="#"/.test(html)) failures.push(`${filename}: contains a placeholder href="#"`);

  for (const hashLink of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(hashLink[1])) failures.push(`${filename}: missing anchor target #${hashLink[1]}`);
  }

  for (const imageTag of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]*"/.test(imageTag[0])) failures.push(`${filename}: image missing alt text`);
    if (!/\swidth="\d+"/.test(imageTag[0]) || !/\sheight="\d+"/.test(imageTag[0])) {
      failures.push(`${filename}: image missing intrinsic dimensions`);
    }
  }

  for (const reference of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const cleanPath = reference[1].split(/[?#]/)[0];
    if (cleanPath === '/') continue;
    try {
      await access(join(dist, cleanPath));
    } catch {
      failures.push(`${filename}: missing local asset ${cleanPath}`);
    }
  }
}

const imageFiles = await readdir(join(dist, 'images'));
const imageBytes = await Promise.all(imageFiles.map(async (file) => (await stat(join(dist, 'images', file))).size));
const totalImageBytes = imageBytes.reduce((total, size) => total + size, 0);

// High-resolution PNG detail views intentionally keep enough pixels for the modal.
if (totalImageBytes > 12_000_000) {
  failures.push(`Optimized image set is unexpectedly large: ${totalImageBytes} bytes`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${htmlFiles.length} HTML pages and ${imageFiles.length} optimized images (${(totalImageBytes / 1024 / 1024).toFixed(2)} MB).`);
}
