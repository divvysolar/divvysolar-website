import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectImages = [
    '2.5 MW village umra hansi harayan.jpeg',
    '900 kw chaudhariwas hisar haryana.jpeg',
    'har1_main.jpeg'
];

async function optimize() {
    for (const img of projectImages) {
        const inputPath = path.join('public', img);
        if (fs.existsSync(inputPath)) {
            const outputPath = inputPath.replace('.jpeg', '.webp');
            console.log(`Optimizing ${img}...`);
            await sharp(inputPath).webp({ quality: 75 }).toFile(outputPath);
            console.log(`Done: ${outputPath}`);
        }
    }
}

optimize().catch(console.error);
