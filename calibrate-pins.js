/**
 * calibrate-pins.js
 * ------------------
 * Ek hi script — Haryana ke saare projects:
 *  1. haryana-data.txt se real names padho
 *  2. City coordinates se sahi jagah rakho (phyllotaxis scatter, no overlap)
 *  3. page.js ke BASE_HARYANA_PROJECTS array ko replace karo
 *  4. Purane helper functions (makeProject, generateClusterPins, ADDITIONAL_HARYANA_PINS) ko clean karo
 *  5. Sabke pinColor gold (#fbbf24) karo
 *
 * Run: node calibrate-pins.js
 */

const fs = require('fs');
const PAGE_PATH = './app/(main)/projects/haryana/page.js';

// ─── City Center Coordinates (calibrated for d-maps Haryana image) ────────────
const CITIES = {
    HI: { x: 41.5,  y: 43.5,  name: 'Hisar',         img: '/hisar.jpeg'     },
    BW: { x: 53.0,  y: 51.5,  name: 'Bhiwani',        img: '/ludiana2.jpeg'  },
    FT: { x: 37.0,  y: 37.5,  name: 'Fatehabad',      img: '/panipat.jpeg'   },
    HA: { x: 53.5,  y: 46.0,  name: 'Hansi',          img: '/hisar.jpeg'     },
    SI: { x: 43.0,  y: 54.0,  name: 'Siwani',         img: '/hisar.jpeg'     },
    BL: { x: 49.0,  y: 39.5,  name: 'Barwala',        img: '/hisar.jpeg'     },
    AP: { x: 38.2,  y: 46.0,  name: 'Adampur',        img: '/hisar.jpeg'     },
    PK: { x: 74.0,  y: 12.5,  name: 'Panchkula',      img: '/gurgaon.jpeg'   },
    SR: { x: 26.0,  y: 37.0,  name: 'Sirsa',          img: '/hisar.jpeg'     },
    RO: { x: 62.0,  y: 51.0,  name: 'Rohtak',         img: '/ludiana2.jpeg'  },
    LO: { x: 48.0,  y: 53.0,  name: 'Loharu',         img: '/hisar.jpeg'     },
    TH: { x: 52.0,  y: 49.0,  name: 'Tosham',         img: '/gurgaon.jpeg'   },
    SF: { x: 60.0,  y: 40.0,  name: 'Safidon',        img: '/hisar.jpeg'     },
    DA: { x: 51.0,  y: 58.0,  name: 'Charkhi Dadri',  img: '/gurgaon.jpeg'   },
    FB: { x: 80.0,  y: 60.0,  name: 'Faridabad',      img: '/gurgaon.jpeg'   },
    PP: { x: 70.0,  y: 42.0,  name: 'Panipat',        img: '/panipat.jpeg'   },
    AM: { x: 74.0,  y: 19.0,  name: 'Ambala',         img: '/gurgaon.jpeg'   },
    KN: { x: 70.0,  y: 35.0,  name: 'Karnal',         img: '/ludiana2.jpeg'  },
    RW: { x: 65.0,  y: 65.0,  name: 'Rewari',         img: '/gurgaon.jpeg'   },
    SP: { x: 70.0,  y: 48.0,  name: 'Sonipat',        img: '/gurgaon.jpeg'   },
    GN: { x: 70.0,  y: 51.0,  name: 'Ganaur',         img: '/gurgaon.jpeg'   },
    GG: { x: 68.0,  y: 62.0,  name: 'Gurugram',       img: '/gurgaon.jpeg'   },
    TU: { x: 73.0,  y: 63.8,  name: 'Tauru',          img: '/gurgaon.jpeg'   },
    AG: { x: 44.0,  y: 46.0,  name: 'Agroha',         img: '/hisar.jpeg'     },
    ST: { x: 49.0,  y: 49.0,  name: 'Satrod',         img: '/hisar.jpeg'     },
    JG: { x: 48.0,  y: 48.0,  name: 'Juglan',         img: '/hisar.jpeg'     },
    JD: { x: 60.0,  y: 41.0,  name: 'Jind',           img: '/hisar.jpeg'     },
    PH: { x: 48.0,  y: 51.0,  name: 'Panihar',        img: '/hisar.jpeg'     },
    LD: { x: 46.0,  y: 49.0,  name: 'Ludas',          img: '/hisar.jpeg'     },
    GW: { x: 46.5,  y: 49.5,  name: 'Gangwa',         img: '/hisar.jpeg'     },
    CW: { x: 47.0,  y: 50.5,  name: 'Chaudhriwas',    img: '/hisar.jpeg'     },
    TR: { x: 49.0,  y: 47.0,  name: 'Talwandi Rana',  img: '/hisar.jpeg'     },
    BR: { x: 44.0,  y: 57.5,  name: 'Barwa',          img: '/hisar.jpeg'     },
    UK: { x: 45.0,  y: 45.0,  name: 'Uklana',         img: '/hisar.jpeg'     },
    KW: { x: 24.0,  y: 38.0,  name: 'Kalanwali',      img: '/hisar.jpeg'     },
    KH: { x: 70.5,  y: 48.5,  name: 'Khubru',         img: '/gurgaon.jpeg'   },
    HD: { x: 60.5,  y: 41.5,  name: 'Hadwa',          img: '/hisar.jpeg'     },
    DL: { x: 53.5,  y: 52.0,  name: 'Dhuleri',        img: '/ludiana2.jpeg'  },
    BK: { x: 52.5,  y: 51.0,  name: 'Bawani Khera',   img: '/ludiana2.jpeg'  },
};

// ─── Read project data from haryana-data.txt ──────────────────────────────────
const rawData = fs.readFileSync('./haryana-data.txt', 'utf8').trim().split('\n');

// Group entries by city code
const groups = {};
rawData.forEach(line => {
    const [cc, name, cap, t, yr] = line.split('|').map(s => s.trim());
    if (!cc || !name) return;
    if (!groups[cc]) groups[cc] = [];
    groups[cc].push({ name, cap, t, yr });
});

// ─── Golden ratio (for phyllotaxis scatter — no overlap) ──────────────────────
const PHI = (1 + Math.sqrt(5)) / 2;

// ─── Generate pins ─────────────────────────────────────────────────────────────
const pins = [];
let id = 1;

Object.entries(groups).forEach(([cc, entries]) => {
    const city = CITIES[cc];
    if (!city) {
        console.warn(`⚠️  Unknown city code: ${cc}`);
        return;
    }

    // Scatter radius — Hisar has 180+ entries so needs more room
    const maxR = cc === 'HI' ? 4.8 : 3.2;
    const R = Math.min(maxR, entries.length * 0.22);

    entries.forEach((e, i) => {
        // Phyllotaxis spiral — guarantees even distribution
        const angle = i * 2 * Math.PI / PHI;
        const r = R * Math.sqrt((i + 1) / entries.length);

        const x = +(city.x + r * Math.cos(angle)).toFixed(2);
        const y = +(city.y + r * Math.sin(angle)).toFixed(2);

        const type = e.t === 'I' ? 'Industrial/Commercial' : 'Residential';
        const cp   = parseFloat(e.cap);
        const panels = Math.ceil(cp * 3);
        const pinId  = `hr-${String(id).padStart(4, '0')}`;
        const mapLink = `https://www.google.com/maps/search/${encodeURIComponent(e.name + ' ' + city.name + ' Haryana')}`;

        pins.push(
            `    { id: "${pinId}", city: "${city.name} \u2013 ${e.name.replace(/"/g, '\\"')}", state: "Haryana", x: "${x}%", y: "${y}%", capacity: "${cp} KW", type: "${type}", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "${e.yr}", panelsInstalled: "${panels}+", status: "Operational", image: "${city.img}", pinColor: "#fbbf24", region: "Haryana", googleMapLink: "${mapLink}" },`
        );
        id++;
    });
});

// ─── Read & update page.js ─────────────────────────────────────────────────────
let page = fs.readFileSync(PAGE_PATH, 'utf8');

// 1. Replace BASE_HARYANA_PROJECTS array
const startMark = 'const BASE_HARYANA_PROJECTS = [';
const si = page.indexOf(startMark);
if (si === -1) {
    console.error('❌ Could not find BASE_HARYANA_PROJECTS in page.js');
    process.exit(1);
}
// Find matching closing bracket
let depth = 0, ei = si + startMark.length - 1;
while (ei < page.length) {
    if (page[ei] === '[') depth++;
    else if (page[ei] === ']') { depth--; if (depth === 0) break; }
    ei++;
}
ei++; // include the ']'

page = page.substring(0, si)
    + `const BASE_HARYANA_PROJECTS = [\n${pins.join('\n')}\n];`
    + page.substring(ei);

// 2. Remove makeProject helper (if still present)
page = page.replace(
    /\/\* -+\s*Helper to create extra pins[\s\S]*?(?=\/\* -+\s*(?:Grid|Extra|Final)|const ADDITIONAL_HARYANA_PINS|export default)/,
    ''
);

// 3. Remove generateClusterPins helper (if still present)
page = page.replace(
    /\/\* -+\s*Grid[\s\S]*?(?=\/\* -+\s*(?:Extra|Final)|const ADDITIONAL_HARYANA_PINS|export default)/,
    ''
);

// 4. Remove ADDITIONAL_HARYANA_PINS block + comment (if still present)
page = page.replace(
    /\/\* -+\s*Extra Haryana[\s\S]*?const ADDITIONAL_HARYANA_PINS\s*=\s*\[\s*(?:\.\.\.[\s\S]*?)?\];\s*/,
    ''
);
// Also handle the empty array version
page = page.replace(/const ADDITIONAL_HARYANA_PINS\s*=\s*\[\s*\];\s*/g, '');

// 5. Replace HARYANA_PROJECTS merge with direct alias
page = page.replace(
    /\/\* -+\s*Final[\s\S]*?\*\/\s*\nconst HARYANA_PROJECTS\s*=\s*\[.*?\];/,
    'const HARYANA_PROJECTS = BASE_HARYANA_PROJECTS;'
);
// Also handle without comment block
page = page.replace(
    /const HARYANA_PROJECTS\s*=\s*\[\s*\.\.\.BASE_HARYANA_PROJECTS,\s*\.\.\.ADDITIONAL_HARYANA_PINS\s*\];/,
    'const HARYANA_PROJECTS = BASE_HARYANA_PROJECTS;'
);

// 6. Fix all pinColors to gold (safety net)
page = page.replace(/pinColor:\s*["'][^"']+["']/g, 'pinColor: "#fbbf24"');

fs.writeFileSync(PAGE_PATH, page, 'utf8');
console.log(`✅ Done! Generated ${pins.length} real Haryana projects in page.js`);
console.log(`   Saare pins gold (#fbbf24), real names, no overlap.`);
