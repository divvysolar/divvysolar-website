// ============================================================
// SINGLE SOURCE OF TRUTH — Industrial Solar EPC landing page
// All numbers, tariffs, projects, and testimonials render from here.
// ============================================================

export const gridTariff = 10.50; // [VERIFY: source/DISCOM and tariff category]
export const solarTariff = 3.50; // Estimated 25-year levelised cost
export const heroPayback = "Custom Payback Report";

/**
 * Calculates Estimated Annual Savings dynamically based on annual metered units.
 * Formula: annualUnits * (gridTariff - solarTariff) / 100,000 (in Lakh)
 * Returns "[VERIFY]" if annualUnits is unknown or not a number.
 */
export function calculateSavings(annualUnits, grid = gridTariff, solar = solarTariff) {
  if (typeof annualUnits !== 'number' || isNaN(annualUnits)) {
    return '[VERIFY]';
  }
  const savingsLakh = (annualUnits * (grid - solar)) / 100000;
  if (savingsLakh >= 100) {
    return `₹${(savingsLakh / 100).toFixed(1)} Cr`;
  }
  return `₹${savingsLakh.toFixed(1)} Lakh`;
}

export function getProjectSavings(project) {
  return calculateSavings(project.annualUnits);
}

export const projects = [
  {
    id: "bansal-agro-2500kw",
    companyName: "Bansal Agro Processors & Cold Storage",
    ownerName: "Rajinder Bansal",
    title: "2.5 MW Bansal Agro Processors & Cold Storage",
    location: "Village Umra, Hansi, Haryana",
    kWp: 2500,
    sector: "Agro & Heavy Processing",
    roofType: "HT Ground Mount + RCC Rooftop",
    annualUnits: "[VERIFY]", // [VERIFY: actual annual units]
    payback: "[VERIFY]", // [VERIFY: payback period]
    testimonialQuote: "Our monthly grid power bill dropped significantly. What impressed us most was Divvy Solar's execution team—they synchronized the HT lines on Sunday with planned execution to minimise factory downtime.",
    permission_confirmed: false,
    tags: ["Mega HT EPC"],
    highlights: [
      "Turnkey CEIG and DISCOM approval support for 11kV grid synchronisation",
      "SCADA remote monitoring system",
      "High-voltage surge and lightning protection"
    ],
    image: "/2.5 MW village umra hansi harayan.webp",
    testimonialHighlight: "Power Bill Reduced Significantly"
  },
  {
    id: "golden-timber-500kw",
    companyName: "Golden Timber & Plywood Works",
    ownerName: "Vikramjit Singh",
    title: "500 kWp Golden Timber & Plywood Works",
    location: "Humbran, Ludhiana, Punjab",
    kWp: 500,
    sector: "Timber & Plywood Industry",
    roofType: "Industrial Corrugated Metal Sheet",
    annualUnits: "[VERIFY]", // [VERIFY: actual annual units]
    payback: "[VERIFY]", // [VERIFY: payback period]
    testimonialQuote: "We were worried about roof leaks on our PEB shed. Divvy used non-penetrating clamps designed to avoid roof drilling—no leakage observed [VERIFY]. Their DG-PV synchronisation system also helped reduce diesel usage.",
    permission_confirmed: false,
    tags: ["DG-PV Sync", "Non-Penetrating"],
    highlights: [
      "DG-PV synchronisation to reduce diesel usage",
      "Bi-directional net-metering support with PSPCL",
      "Remote live inverter telemetry"
    ],
    image: "/500 kw  golden plywood hmbran ludhiana.jpeg",
    testimonialHighlight: "Non-Penetrating PEB Clamping"
  },
  {
    id: "polyflex-polymers-500kw",
    companyName: "Polyflex Polymers & Packaging",
    ownerName: "Anil Goel",
    title: "500 kWp Polyflex Polymers & Packaging",
    location: "Hansi Industrial Zone, Haryana",
    kWp: 500,
    sector: "Plastics & Packaging",
    roofType: "Trapezoidal Sheet + HDG Walkways",
    annualUnits: "[VERIFY]", // [VERIFY: actual annual units]
    payback: "[VERIFY]", // [VERIFY: payback period]
    testimonialQuote: "Their guidance on 40% accelerated depreciation helped our CA claim tax benefits in year one itself. Power costs drop sharply, helping our plant's overall operating margins.",
    permission_confirmed: false,
    tags: ["Non-Penetrating"],
    highlights: [
      "Hot-dip galvanized maintenance walkways",
      "40% Accelerated Depreciation benefit (consult your CA)",
      "Tier-1 Mono PERC / TopCon modules"
    ],
    image: "/polyflex-500kw-hansi.jpeg",
    testimonialHighlight: "40% Accelerated Depreciation Claimed"
  },
  {
    id: "chaudhariwas-solar-900kw",
    companyName: "Chaudhariwas Agro Cold Hub",
    ownerName: "Devender Sihag",
    title: "900 kWp Chaudhariwas Cold Storage & Solar Hub",
    location: "Chaudhariwas, Hisar, Haryana",
    kWp: 900,
    sector: "Cold Storage & Agro Infrastructure",
    roofType: "HT Ground Mount + Substation Sync",
    annualUnits: "[VERIFY]",
    payback: "[VERIFY]",
    testimonialQuote: "The 900 kW plant was synchronized smoothly with the DHBVN grid. Their engineering team handled the HT metering and CEIG clearance without administrative hassle.",
    permission_confirmed: false,
    tags: ["Mega HT EPC"],
    highlights: [
      "33kV / 11kV HT substation grid synchronisation",
      "High-yield monocrystalline solar arrays",
      "Centralised SCADA telemetry monitoring"
    ],
    image: "/900 kw chaudhariwas hisar haryana.jpeg",
    testimonialHighlight: "Smooth 11kV Grid Synchronisation"
  },
  {
    id: "ramsons-industrial-320kw",
    companyName: "Ramsons Heavy Engineering",
    ownerName: "Rajesh Agarwal",
    title: "320 kWp Ramsons Heavy Engineering Works",
    location: "Sector 27/28, Hisar, Haryana",
    kWp: 320,
    sector: "Heavy Engineering & Fabrication",
    roofType: "Industrial Curved PEB Shed",
    annualUnits: "[VERIFY]",
    payback: "[VERIFY]",
    testimonialQuote: "Our PEB shed has curved sheets, so standard clamps were not suitable. Divvy engineered custom non-penetrating seam clamps and ensured reverse feed protection with our DG set.",
    permission_confirmed: false,
    tags: ["DG-PV Sync", "Non-Penetrating"],
    highlights: [
      "Custom non-penetrating standing seam clamps",
      "DG synchronisation with reverse feed controller",
      "DHBVN net-metering integration approval"
    ],
    image: "/WhatsApp Image 2026-04-22 at 15.22.45.jpeg",
    testimonialHighlight: "Custom Non-Penetrating Clamping"
  },
  {
    id: "barwa-agro-300kw",
    companyName: "Barwa Processing & Ginning Mills",
    ownerName: "Suresh Jangra",
    title: "300 kWp Barwa Cotton & Ginning Mills",
    location: "Barwa, Bhiwani, Haryana",
    kWp: 300,
    sector: "Cotton & Textile Ginning",
    roofType: "Trapezoidal Metal Sheet Shed",
    annualUnits: "[VERIFY]",
    payback: "[VERIFY]",
    testimonialQuote: "During peak ginning season, our connected load is very high. The solar plant offsets peak daytime grid units and their remote app lets us monitor generation in real time.",
    permission_confirmed: false,
    tags: ["Non-Penetrating"],
    highlights: [
      "Short-rail anodised aluminium mounting",
      "Dual MPPT string inverter configuration",
      "Real-time generation telemetry app"
    ],
    image: "/300 kw barwa bhiwani harayana.jpeg",
    testimonialHighlight: "Peak Tariff Cost Offset"
  }
];
