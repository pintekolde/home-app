const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = path.join(__dirname, '../public/icons/icon-512x512.png');
const targetDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
    for (const size of sizes) {
        const targetPath = path.join(targetDir, `icon-${size}x${size}.png`);
        await sharp(sourceIcon)
            .resize(size, size)
            .toFile(targetPath);
        console.log(`Generated ${size}x${size} icon`);
    }
}

generateIcons().catch(console.error); 