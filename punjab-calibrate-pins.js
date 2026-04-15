/**
 * punjab-calibrate-pins.js
 * ------------------
 * 1. punjab-data.txt se real names padho
 * 2. City coordinates se sahi jagah rakho (phyllotaxis scatter, no overlap)
 * 3. punjab/page.js ke PUNJAB_PROJECTS array ko replace karo
 * 4. Sabke pinColor teal (#2dd4bf) karo
 *
 * Run: node punjab-calibrate-pins.js
 */

const fs = require('fs');
const PAGE_PATH = './app/(main)/projects/punjab/page.js';

// ─── City Center Coordinates (calibrated for punjab-updated.jpeg) ────────────
const CITIES = {
    ldh: { x: 64.0, y: 54.0, name: 'Ludhiana', img: '/ludhiana.jpeg' },
    mlk: { x: 65.5, y: 66.5, name: 'Malerkotla', img: '/mohali.jpeg' },
    sgr: { x: 64.0, y: 76.5, name: 'Sangrur', img: '/mohali.jpeg' },
    moh: { x: 88.0, y: 60.5, name: 'Mohali', img: '/mohali.jpeg' },
    asr: { x: 33.5, y: 29.5, name: 'Amritsar', img: '/amritsar.jpeg' },
    gov: { x: 79.5, y: 62.0, name: 'Govindgarh', img: '/mohali.jpeg' },
    pat: { x: 82.3, y: 73.4, name: 'Patiala', img: '/mohali.jpeg' },
    khn: { x: 76.8, y: 61.1, name: 'Khanna', img: '/mohali.jpeg' },
    fsg: { x: 81.5, y: 63.0, name: 'Fatehgarh Sahib', img: '/mohali.jpeg' },
    bth: { x: 35.1, y: 77.0, name: 'Bathinda', img: '/mohali.jpeg' },
    bar: { x: 54.9, y: 72.6, name: 'Barnala', img: '/mohali.jpeg' },
    jal: { x: 55.9, y: 41.0, name: 'Jalandhar', img: '/jalandhar.jpeg' },
    mor: { x: 83.0, y: 51.0, name: 'Morinda', img: '/mohali.jpeg' },
    trn: { x: 34.5, y: 35.0, name: 'Tarn Taran', img: '/amritsar.jpeg' },
    ahm: { x: 58.5, y: 70.8, name: 'Ahmedgarh', img: '/mohali.jpeg' },
    mac: { x: 77.7, y: 53.3, name: 'Machhiwara', img: '/mohali.jpeg' },
    sam: { x: 75.5, y: 56.2, name: 'Samrala', img: '/mohali.jpeg' },
    kha: { x: 80.9, y: 58.9, name: 'Khamano', img: '/mohali.jpeg' },
    taj: { x: 48.1, y: 40.6, name: 'Tajoka', img: '/mohali.jpeg' },
    kap: { x: 49.4, y: 37.9, name: 'Kapurthala', img: '/mohali.jpeg' },
    hsp: { x: 66.4, y: 32.8, name: 'Hoshiarpur', img: '/mohali.jpeg' },
    der: { x: 93.5, y: 63.2, name: 'Derabassi', img: '/mohali.jpeg' },
};

// ─── Read project data from punjab-data.txt ──────────────────────────────────
if (!fs.existsSync('./punjab-data.txt')) {
    console.error('❌ punjab-data.txt not found');
    process.exit(1);
}
const rawData = fs.readFileSync('./punjab-data.txt', 'utf8').trim().split('\n');

const groups = {};
rawData.forEach(line => {
    const [cc, name, cap, t, yr] = line.split('|').map(s => s.trim());
    if (!cc || !name) return;
    if (!groups[cc]) groups[cc] = [];
    groups[cc].push({ name, cap, t, yr });
});

const PHI = (1 + Math.sqrt(5)) / 2;
const pins = [];
let idCount = 1;

Object.entries(groups).forEach(([cc, entries]) => {
    const city = CITIES[cc];
    if (!city) {
        console.warn(`⚠️  Unknown city code: ${cc}`);
        return;
    }

    const R = Math.min(4.0, entries.length * 0.25);

    entries.forEach((e, i) => {
        const angle = i * 2 * Math.PI / PHI;
        const r = R * Math.sqrt((i + 1) / entries.length);

        const x = +(city.x + r * Math.cos(angle)).toFixed(1);
        const y = +(city.y + r * Math.sin(angle)).toFixed(1);

        const type = e.t === 'I' ? 'Industrial/Commercial' : 'Residential';
        const cp = parseFloat(e.cap);
        const panels = Math.ceil(cp * 3);
        const pinId = `${cc}-${String(idCount).padStart(2, '0')}`;
        const mapLink = `https://www.google.com/maps/search/${encodeURIComponent(e.name + ' ' + city.name + ' Punjab')}`;

        pins.push(
            `    { id: "${pinId}", city: "${city.name} \u2013 ${e.name.replace(/"/g, '\\"')}", state: "Punjab", x: "${x}%", y: "${y}%", capacity: "${cp} KW", type: "${type}", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "${e.yr}", panelsInstalled: "${panels}+", status: "Operational", image: "${city.img}", pinColor: "#2dd4bf", region: "Punjab", googleMapLink: "${mapLink}" },`
        );
        idCount++;
    });
});

let page = fs.readFileSync(PAGE_PATH, 'utf8');

const startMark = 'const PUNJAB_PROJECTS = [';
const si = page.indexOf(startMark);
if (si === -1) {
    console.error('❌ Could not find PUNJAB_PROJECTS in page.js');
    process.exit(1);
}

let depth = 0, ei = si + startMark.length - 1;
while (ei < page.length) {
    if (page[ei] === '[') depth++;
    else if (page[ei] === ']') { depth--; if (depth === 0) break; }
    ei++;
}
ei++;

page = page.substring(0, si)
    + `const PUNJAB_PROJECTS = [\n${pins.join('\n')}\n];`
    + page.substring(ei);

fs.writeFileSync(PAGE_PATH, page, 'utf8');
console.log(`✅ Done! Generated ${pins.length} real Punjab projects in page.js`);
