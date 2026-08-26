import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const sourceDir = resolve('src/assets/source');
const outputDir = resolve('public/images');
await mkdir(outputDir, { recursive: true });

const assets = {
  'hero-kangra.png': 'kangra-painting-laptop-bag-hand-quilted-showing-a-miniature-style-scene-.jpg',
  'warli-pouch.png': 'warli-art-pencil-pouch-front-maroon-fabric-with-village-scene.jpg',
  'warli-pouch-detail.png': 'warli-art-pencil-pouch-reverse-dancing-figures.jpg',
  'madhubani-tote.png': 'madhubani-art-tote-bag-with-fish-and-floral-motifs.jpg',
  'madhubani-tote-detail.png': 'madhubani-art-tote-bag-dotted-circle-design.jpg',
  'gond-tote.png': 'gond-art-tote-bag-close-up-of-appliqu-fringe-edge.jpg',
  'gond-tote-detail.png': 'pdf-gond-tote-detail.jpg',
  'tanjore-folder.png': 'tanjore-painting-document-folder-with-gold-fish-and-lotus-embroidery.jpg',
  'tanjore-folder-detail.png': 'pdf-tanjore-folder-detail.jpg',
  'phad-laptop.png': 'phad-art-laptop-bag-with-forest-and-river-scene.jpg',
  'phad-laptop-detail.png': 'pdf-phad-laptop-detail.jpg',
  'rangoli-ipad.png': 'rangoli-art-ipad-cover-with-indigo-and-rust-mandala-on-desk.jpg',
  'rangoli-ipad-detail.png': 'pdf-rangoli-ipad-detail.jpg',
  'rogan-pouch.png': 'rogan-art-pencil-pouch-with-crewel-embroidered-florals.jpg',
  'rogan-pouch-detail.png': 'pdf-rogan-pouch-detail.jpg',
  'block-pouch.png': 'block-printing-pencil-pouch-patchwork-front.jpg',
  'block-pouch-detail.png': 'block-printing-pencil-pouch-patchwork-alternate-colours.jpg',
  'block-ipad.png': 'block-printing-ipad-cover-patchwork-with-tassel.jpg',
  'block-ipad-detail.png': 'block-printing-ipad-cover-full-quilted-pattern.jpg',
  'kangra-laptop.png': 'kangra-painting-laptop-bag-with-tree-chariot-and-peacock-scene.jpg',
  'kangra-laptop-detail.png': 'kangra-painting-laptop-bag-reverse-striped-panel.jpg',
  'documentary-still.png': 'still-from-the-inheritance-documentary-kangra-painting-laptop-bag-design.jpg',
  'book-front.png': 'hasta-kal-book-front-cover-illustrated-with-folk-art-motifs-by-radha-bah.jpg',
  'book-back.png': 'hasta-kal-book-back-cover-with-description-and-isbn.jpg',
};

for (const [target, source] of Object.entries(assets)) {
  const pipeline = sharp(resolve(sourceDir, source));

  if (target.endsWith('-detail.png')) {
    pipeline.resize({ width: 850, height: 950, fit: 'inside', withoutEnlargement: true });
  }

  await pipeline
    .png({ palette: true, quality: 90, colours: 256, effort: 10, dither: 0.9 })
    .toFile(resolve(outputDir, target));
}

console.log(`Converted ${Object.keys(assets).length} images to PNG in ${outputDir}`);
