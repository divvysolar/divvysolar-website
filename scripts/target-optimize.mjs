import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targets = [
    'rohit.png',
    'solar-future-banner.png',
    'industrial_4k.png',
    'utility_hero_4k.png',
    'utility_intro_4k.png',
    'about_us_main_4k.png'
];

const publicDir = 'public';

async function optimize() {
    console.log('--- Image Optimization Report ---');
    console.log('Targeting the specific 6 images from the screenshot.\n');

    for (const file of targets) {
        const inputPath = path.join(publicDir, file);
        const fileName = path.parse(file).name;
        const outputPath = path.join(publicDir, `${fileName}.webp`);

        if (!fs.existsSync(inputPath)) {
            console.log(`Skipping ${file}: File not found.`);
            continue;
        }

        const statsBefore = fs.statSync(inputPath);
        const sizeBefore = (statsBefore.size / 1024).toFixed(2);

        try {
            await sharp(inputPath)
                .webp({ quality: 75 })
                .toFile(outputPath);

            const statsAfter = fs.statSync(outputPath);
            const sizeAfter = (statsAfter.size / 1024).toFixed(2);
            const savings = (100 - (statsAfter.size / statsBefore.size) * 100).toFixed(1);

            console.log(`Optimized: ${file}`);
            console.log(`- Before: ${sizeBefore} KB`);
            console.log(`- After:  ${sizeAfter} KB (webp)`);
            console.log(`- Savings: ${savings}%\n`);
            
            // Keep original as requested (Do NOT delete originals until verified)
        } catch (err) {
            console.error(`Error optimizing ${file}:`, err);
        }
    }
}

optimize();
