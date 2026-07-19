const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg')) {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const webpPath = path.join(dir, `${baseName}.webp`);
            
            try {
                // Resize if it's super huge, otherwise just convert to WebP with good quality
                console.log(`Processing: ${file}`);
                await sharp(fullPath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                
                console.log(`Created: ${baseName}.webp`);
                fs.unlinkSync(fullPath); // Delete the original large file
            } catch (err) {
                console.error(`Failed to process ${file}:`, err);
            }
        }
    }
}

processDirectory(publicDir).then(() => console.log('Done!'));
