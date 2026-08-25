const fs = require('fs');
const path = require('path');
const https = require('https');

const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const downloads = [
  { url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mercadolibre.svg', file: 'mercadolivre.svg' },
  { url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shopee.svg', file: 'shopee.svg' },
  { url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazon.svg', file: 'amazon.svg' },
  { url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/aliexpress.svg', file: 'aliexpress.svg' }
];

downloads.forEach(item => {
  const filePath = path.join(logosDir, item.file);
  const file = fs.createWriteStream(filePath);
  https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${item.file}`);
    });
  }).on('error', err => {
    console.error(`Error downloading ${item.file}:`, err);
  });
});
