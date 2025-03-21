const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputSvg = path.join(__dirname, '../docs/images/logo192.svg');
const outputDir = path.join(__dirname, '../docs/images');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(inputSvg);
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `logo${size}.png`));
    console.log(`Generated logo${size}.png`);
  }

  // Generate favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'favicon.ico'));
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error); 