const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/(main)/projects/punjab/page.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/Click any pin for satellite view\./g, 'Click any pin for project details.');

fs.writeFileSync(filePath, content);
console.log('Updated Punjab subtitle');
