const fs = require("fs");
const path = require("path");

const robotsTxt = `# robots.txt for https://oliveextra.com

User-agent: *
Allow: /

Sitemap: https://oliveextra.com/sitemap.xml
`;

const filePath = path.join(__dirname, "./public/robots.txt");

const publicDir = path.join(__dirname, "./public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(filePath, robotsTxt);

console.log("✅ تم إنشاء ملف robots.txt بنجاح!");
