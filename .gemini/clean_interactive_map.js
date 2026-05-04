const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'components/home/InteractiveMap.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove image and googleMapLink from the objects in the PROJECTS array
// This is a bit more tricky with regex because of the multiline structure
// but we can try removing them line by line
content = content.replace(/\s+image:\s+"[^"]*",?/g, '');
content = content.replace(/\s+googleMapLink:\s+"[^"]*",?/g, '');

fs.writeFileSync(filePath, content);
console.log('Cleaned InteractiveMap default projects');
