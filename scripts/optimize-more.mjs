import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
    'hero-main-page.jpeg',
    'about_us_main.jpeg',
    'pun1_main.jpeg',
    'uti1_main.jpeg',
    'resi1m.jpeg',
    'resi2main.jpeg'
];

const publicDir = 'public';

async function optimize() {
    for (const img of images) {
        const inputPath = path.join(publicDir, img);
        if (fs.existsSync(inputPath)) {
            const outputPath = inputPath.replace(/\.(jpeg|jpg)$/, '.webp');
            console.log(`Optimizing ${img} to ${outputPath}...`);
            await sharp(inputPath)
                .webp({ quality: 75 })
                .toFile(outputPath);
            console.log(`Done: ${img}`);
        } else {
            console.log(`Skipping ${img}: File not found`);
        }
    }
}

optimize().catch(console.error);
