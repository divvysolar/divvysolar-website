const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/(main)/projects/haryana/page.js');
let content = fs.readFileSync(filePath, 'utf8');

// Remove image and googleMapLink from the objects in the array
content = content.replace(/, image: "[^"]*"/g, '');
content = content.replace(/, googleMapLink: "[^"]*"/g, '');

fs.writeFileSync(filePath, content);
console.log('Cleaned Haryana projects');
