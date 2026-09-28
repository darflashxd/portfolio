import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');

async function getFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimize() {
  const files = await getFiles(imagesDir);
  console.log(`Checking ${files.length} images for optimization...`);
  let totalSaved = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const origStat = await fs.promises.stat(file);
    const origSize = origStat.size;
    totalBefore += origSize;
    const ext = path.extname(file).toLowerCase();
    
    try {
      const inputBuffer = await fs.promises.readFile(file);
      let buffer;
      if (ext === '.png') {
        buffer = await sharp(inputBuffer)
          .png({ compressionLevel: 9, quality: 90, effort: 10 })
          .toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await sharp(inputBuffer, { failOn: 'none' })
          .jpeg({ quality: 85, mozjpeg: true, progressive: true })
          .toBuffer();
      }

      if (buffer && buffer.length < origSize) {
        await fs.promises.writeFile(file, buffer);
        const saved = origSize - buffer.length;
        totalSaved += saved;
        totalAfter += buffer.length;
        console.log(`Optimized ${path.basename(file)}: ${(origSize/1024).toFixed(1)} KB -> ${(buffer.length/1024).toFixed(1)} KB (Saved ${(saved/1024).toFixed(1)} KB)`);
      } else {
        totalAfter += origSize;
        console.log(`Kept ${path.basename(file)}: already optimal`);
      }
    } catch (err) {
      totalAfter += origSize;
      console.warn(`Could not process ${path.basename(file)}: ${err.message}`);
    }
  }

  console.log(`\nBefore: ${(totalBefore/1024/1024).toFixed(2)} MB`);
  console.log(`After : ${(totalAfter/1024/1024).toFixed(2)} MB`);
  console.log(`Total Saved: ${(totalSaved/1024/1024).toFixed(2)} MB (${((totalSaved/totalBefore)*100).toFixed(1)}% reduction)`);
}

optimize().catch(console.error);
