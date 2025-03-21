const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const targetDir = path.join(__dirname, '../public/icons');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Create a 512x512 base icon
async function createBaseIcon() {
    const size = 512;
    const centerX = size / 2;
    const centerY = size / 2;

    // Create an SVG for the home icon
    const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <rect width="${size}" height="${size}" fill="#2196f3"/>
        <path d="M ${centerX} ${size * 0.2} L ${size * 0.2} ${size * 0.5} L ${size * 0.3} ${size * 0.5} L ${size * 0.3} ${size * 0.8} L ${size * 0.7} ${size * 0.8} L ${size * 0.7} ${size * 0.5} L ${size * 0.8} ${size * 0.5} Z" fill="white"/>
    </svg>`;

    const baseIconPath = path.join(targetDir, 'icon-512x512.png');
    await sharp(Buffer.from(svg))
        .resize(size, size)
        .toFile(baseIconPath);
    
    console.log('Generated base 512x512 icon');
    return baseIconPath;
}

async function generateIcons() {
    const baseIconPath = await createBaseIcon();

    for (const size of sizes) {
        if (size === 512) continue; // Skip as we already have it
        const targetPath = path.join(targetDir, `icon-${size}x${size}.png`);
        await sharp(baseIconPath)
            .resize(size, size)
            .toFile(targetPath);
        console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon.ico
    await sharp(baseIconPath)
        .resize(32, 32)
        .toFile(path.join(targetDir, 'favicon.ico'));
    console.log('Generated favicon.ico');
}

generateIcons().catch(console.error); 