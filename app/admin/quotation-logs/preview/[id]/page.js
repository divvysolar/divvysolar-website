import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatINR(n) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n || 0);
}

const cap = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

const ROOF_TYPES = [
    { v: "concrete", l: "Flat Concrete Roof" },
    { v: "tin", l: "Tin Shade / Metal Roof" },
    { v: "tile", l: "Tile Roof" },
    { v: "rcc", l: "RCC Roof" },
    { v: "profile", l: "Industrial Shed / Metal Profile" },
    { v: "ground", l: "Ground-Mounted" }
];

const ALL_STRUCTURE_TYPES = [
    { v: "ms_fabricated", l: "MS Fabricated" },
    { v: "gi", l: "GI Structure" },
    { v: "hot_dip_gi", l: "Elevated GI" },
    { v: "alu_monorail", l: "Aluminium Monorail" },
    { v: "alu_longrail", l: "Aluminium Long rail" },
    { v: "ground_gi", l: "GI Structure (Ground)" },
    { v: "ground_galvalume", l: "Galvalume (Ground)" }
];

const EARTHING_OPTS = [
    { v: "cu_bonded", l: "Copper Bonded Electrode (with chemical compound)" },
    { v: "pure_cu", l: "Pure Copper Electrode (with chemical compound)" },
];

export const DIVVY_BRANCH_OFFICES = {
    gurgaon: {
        id: "gurgaon",
        name: "Gurgaon (Corporate Office)",
        shortName: "Gurgaon Office",
        state: "Haryana / Delhi-NCR",
        addr1: "Unit-859, Tower- B1, 8th Floor, Spaze I - Tech Park, Sec - 49, Gurgaon - 122018 (HARYANA)",
        addr2: "Head Office: Lower Ground, SJ Tower, Sec-13, Hisar 125001 (HR) | Email: info@divvysolar.in | Web: www.divvysolar.in",
    },
    punjab: {
        id: "punjab",
        name: "Punjab / Mohali (Regional Office)",
        shortName: "Punjab / Mohali Office",
        state: "Punjab",
        addr1: "626, First Floor, Opp. Franco Hotel, Sec-55, Phase-I, Mohali, Punjab - 140501",
        addr2: "Corporate Office: Spaze I-Tech Park, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    },
    ludhiana: {
        id: "ludhiana",
        name: "Punjab / Ludhiana (Regional Office)",
        shortName: "Punjab / Ludhiana Office",
        state: "Punjab",
        addr1: "Plot no 14, Phase-VII (ADJ), Focal Point, Gobindgarh, Ludhiana, Punjab - 141010",
        addr2: "Corporate Office: Spaze I-Tech Park, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    },
    hisar: {
        id: "hisar",
        name: "Hisar (Head Office)",
        shortName: "Hisar Head Office",
        state: "Haryana",
        addr1: "Lower Ground, SJ Tower, Sector-13, Dabra Road, Hisar - 125001 (HARYANA)",
        addr2: "Gurgaon Office: Spaze I-Tech Park, Sec-49, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    }
};

export const detectBranchOffice = (locationText) => {
    if (!locationText || typeof locationText !== 'string') return null;
    const loc = locationText.toLowerCase();

    if (loc.includes('ludhiana') || loc.includes('gobindgarh')) {
        return 'ludhiana';
    }
    const punjabKeywords = [
        'punjab', 'mohali', 'chandigarh', 'zirakpur', 'kharar', 'panchkula',
        'derabassi', 'patiala', 'bathinda', 'sangrur', 'malerkotla',
        'hoshiarpur', 'kapurthala', 'amritsar', 'jalandhar', 'khanna', 'morinda',
        'samrala', 'khamano', 'focal point', 'barnala', 'faridkot', 'moga', 'rupnagar', 'nabha', 'rajpura'
    ];
    if (punjabKeywords.some(kw => loc.includes(kw))) {
        return 'punjab';
    }

    const hisarKeywords = [
        'hisar', 'hissar', 'sirsa', 'fatehabad', 'bhiwani', 'rohtak', 'jind', 'hansi', 'tosham', 'adampur', 'uklana'
    ];
    if (hisarKeywords.some(kw => loc.includes(kw))) {
        return 'hisar';
    }

    const gurgaonKeywords = [
        'gurgaon', 'gurugram', 'delhi', 'noida', 'greater noida', 'ghaziabad', 'faridabad', 'manesar', 'rewari',
        'sonipat', 'sonepat', 'panipat', 'karnal', 'kurukshetra', 'ambala', 'palwal', 'ncr', 'dharuhera', 'bawal'
    ];
    if (gurgaonKeywords.some(kw => loc.includes(kw))) {
        return 'gurgaon';
    }

    return null;
};

export default async function QuotationPreviewPage({ params }) {
    const { id } = params;

    await connectToDatabase();
    // Fetch log, explicitly selecting calcState and pdfData
    const log = await QuotationLog.findById(id).select('+calcState +pdfData');

    if (!log) {
        notFound();
    }

    // ── FALLBACK FOR LEGACY LOGS (Without calcState but has pdfData) ─────────
    if (!log.calcState && log.pdfData) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
                <header className="bg-[#1e293b] border-b border-white/10 p-4 flex items-center justify-between no-print">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/quotation-logs" className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors">
                            ← Back to Logs
                        </Link>
                        <h1 className="text-sm font-bold">Quotation Legacy PDF Preview</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <a 
                            href={`/api/quotation-logs/${log._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-[#FECB00] text-slate-900 text-xs font-bold hover:bg-[#FECB00]/90 transition-colors"
                        >
                            Download Stored PDF
                        </a>
                    </div>
                </header>
                <div className="flex-1 w-full bg-[#0f172a] flex items-center justify-center p-4">
                    <iframe 
                        src={log.pdfData} 
                        className="w-full max-w-5xl h-[85vh] rounded-xl border border-white/10 shadow-2xl bg-white"
                        title="Legacy Quotation PDF"
                    />
                </div>
            </div>
        );
    }

    if (!log.calcState) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-xl font-bold text-red-400">Preview Unavailable</h1>
                    <p className="text-white/50 text-sm mt-2 max-w-md">
                        This log entry does not contain calculator state data or stored PDF.
                    </p>
                    <Link href="/admin/quotation-logs" className="inline-block mt-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors">
                        Back to Logs
                    </Link>
                </div>
            </div>
        );
    }

    let state;
    try {
        state = typeof log.calcState === 'string' ? JSON.parse(log.calcState) : log.calcState;
    } catch (e) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-xl font-bold text-red-400">Parsing Error</h1>
                    <p className="text-white/50 text-sm mt-2">Could not parse quotation calculator state.</p>
                </div>
            </div>
        );
    }

    const {
        clientName = log.clientName || '',
        clientPhone = log.clientPhone || '',
        clientLocation = log.clientLocation || '',
        quoteRef = log.quoteRef || '',
        systemKW = log.systemKW || 0,
        systemType = 'ongrid',
        modules = [],
        inverters = [],
        batteries = [],
        structures = [],
        projectCategory = log.projectCategory || 'residential',
        connectedLoad = '',
        roofType = 'concrete',
        dgSync = false,
        customTerms = '',
        dcCablesList = [],
        dcCableM = 0,
        invToAcdbCableM = 0,
        acdbToMainCableM = 0,
        earthingType = 'cu_bonded',
        laType = 'conventional',
        walkway = false,
        walkwayType = 'gi',
        walkwayM = 0,
        customSafety = 0,
        conduit = false,
        conduitUpvcM = 0,
        cableTrayM = 0,
        discomType = '',
        discom = false,
        incBos = false,
        incEng = false,
        incMon = false,
        incTrans = false,
        hideItemizedPricing = false,
        advancePercent: stateAdvP,
        dispatchPercent: stateDispP,
        handoverPercent: stateHandP,
        calc = {},
        rates = {}
    } = state || {};

    const advP = stateAdvP ?? calc?.advancePercent ?? 10;
    const dispP = stateDispP ?? calc?.dispatchPercent ?? 85;
    const handP = stateHandP ?? calc?.handoverPercent ?? 5;
    const advAmt = calc?.advanceAmount || (calc?.grandTotal ? calc.grandTotal * (advP / 100) : 0);
    const dispAmt = calc?.dispatchAmount || (calc?.grandTotal ? calc.grandTotal * (dispP / 100) : 0);
    const handAmt = calc?.handoverAmount || (calc?.grandTotal ? calc.grandTotal * (handP / 100) : 0);

    const projectTypeLabel = projectCategory === "residential" 
        ? "RESIDENTIAL SOLAR PROPOSAL" 
        : projectCategory === "industrial" 
            ? "INDUSTRIAL / C&I SOLAR PROPOSAL" 
            : "UTILITY-SCALE SOLAR PROPOSAL";
    
    const dateStr = new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const quoteRefStr = quoteRef || `DS/QP/${new Date(log.createdAt).getFullYear()}/${log._id.toString().substring(18).toUpperCase()}`;
    const customTermRows = customTerms ? customTerms.split('\n').filter(t => t.trim()).map((t, idx) => `<li key="${idx}" style="padding:2px 0">${t}</li>`).join('') : '';

    const modW = (state?.moduleWarranty && state.moduleWarranty.trim()) ? (state.moduleWarranty.toLowerCase().includes('year') ? state.moduleWarranty : `${state.moduleWarranty} Years`) : '25 Years';
    const invW = (state?.inverterWarranty && state.inverterWarranty.trim()) ? (state.inverterWarranty.toLowerCase().includes('year') ? state.inverterWarranty : `${state.inverterWarranty} Years`) : '5 Years';
    const batW = (state?.batteryWarranty && state.batteryWarranty.trim()) ? (state.batteryWarranty.toLowerCase().includes('year') ? state.batteryWarranty : `${state.batteryWarranty} Years`) : '5 Years';
    
    let dynamicWarrantyTerm = `Warranty: ${modW} performance warranty on solar modules, ${invW} on grid-tie inverters.`;
    if (systemType === "hybrid" || (batteries && batteries.length > 0) || (calc?.selectedBatteryDetails && calc.selectedBatteryDetails.length > 0)) {
        dynamicWarrantyTerm += ` ${batW} on battery storage system.`;
    }

    const branchKey = state?.issuingBranch || log.issuingBranch || detectBranchOffice(clientLocation) || 'gurgaon';
    const activeOffice = DIVVY_BRANCH_OFFICES[branchKey] || DIVVY_BRANCH_OFFICES.gurgaon;

    // ── BUILD ROWS FOR TABLE ────────────────────────────────────────────────
    let rows = [];
    let sno = 1;

    // 1. Modules
    if (calc?.selectedModuleDetails?.length > 0) {
        calc.selectedModuleDetails.forEach(mod => {
            rows.push({
                sno: sno++,
                particulars: `<strong>Solar Modules (${cap(mod.brand)}):</strong> ${mod.modelName || "N/A"}<br/><span style="font-size:9px;color:#64748b">Tier-1 High-efficiency PV modules (${mod.wattage}Wp)</span>`,
                qty: mod.itemWp,
                unit: 'Wp',
                rate: hideItemizedPricing ? 'Included' : formatINR(mod.ratePerWp || 0),
                cost: hideItemizedPricing ? 'Included' : formatINR(mod.cost || 0)
            });
        });
    } else {
        rows.push({
            sno: sno++,
            particulars: `<strong>Solar Modules:</strong> ${calc?.selMod?.modelName || "Standard Tier-1"}<br/><span style="font-size:9px;color:#64748b">Tier-1 High-efficiency PV modules</span>`,
            qty: systemKW * 1000,
            unit: 'Wp',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.modRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc?.moduleCost || 0)
        });
    }

    // 2. Inverters
    if (calc?.selectedInverterDetails?.length > 0) {
        calc.selectedInverterDetails.forEach(inv => {
            rows.push({
                sno: sno++,
                particulars: `<strong>Solar Grid-Tie Inverter:</strong> ${inv.modelName}<br/><span style="font-size:9px;color:#64748b">Multi-MPPT High-efficiency inverter system</span>`,
                qty: inv.qty,
                unit: 'Nos',
                rate: hideItemizedPricing ? 'Included' : formatINR(inv.cost / (inv.qty || 1)),
                cost: hideItemizedPricing ? 'Included' : formatINR(inv.cost)
            });
        });
    }

    // 2b. Batteries (if hybrid)
    if (calc?.selectedBatteryDetails?.length > 0) {
        calc.selectedBatteryDetails.forEach(bat => {
            rows.push({
                sno: sno++,
                particulars: `<strong>Battery Storage System (${cap(bat.brand)}):</strong> ${bat.modelName}<br/><span style="font-size:9px;color:#64748b">Deep-cycle energy storage bank</span>`,
                qty: bat.qty,
                unit: 'Nos',
                rate: hideItemizedPricing ? 'Included' : formatINR(bat.cost / (bat.qty || 1)),
                cost: hideItemizedPricing ? 'Included' : formatINR(bat.cost)
            });
        });
    }

    // 3. Panels (ACDB/DCDB)
    if (calc?.acdbCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>ACDB Combiner / Panel</strong><br/><span style='font-size:9px;color:#64748b'>L&T / Elmex / Schneider / Reputed Make</span>`,
            qty: systemKW,
            unit: 'kW',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.acdbRate || rates?.acdbRatePerKw || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.acdbCost)
        });
    }
    if (calc?.dcdbCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DCDB Combiner / Panel</strong><br/><span style='font-size:9px;color:#64748b'>Reputed Make</span>`,
            qty: systemKW,
            unit: 'kW',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.dcdbRate || rates?.dcdbRatePerKw || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.dcdbCost)
        });
    }

    // 4. Structures
    calc?.selectedStructures?.forEach(st => {
        const stLabel = ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A";
        rows.push({
            sno: sno++,
            particulars: `<strong>Mounting Structure:</strong> ${stLabel}<br/><span style="font-size:9px;color:#64748b">Wind load sustained structural rails & clamps</span>`,
            qty: st.kw,
            unit: 'kW',
            rate: hideItemizedPricing ? 'Included' : formatINR(st.rate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(st.cost || 0)
        });
    });

    // Structure Accessories
    rows.push({
        sno: sno++,
        particulars: `<strong>Structure Accessories:</strong> SS 304 Nut Bolts & Fasteners<br/><span style='font-size:9px;color:#64748b'>Anti-corrosion hardware for mechanical integrity</span>`,
        qty: systemKW,
        unit: 'kW',
        rate: 'Included',
        cost: 'Included'
    });

    // Cables
    if (calc?.selectedDcCablesDetails?.length > 0) {
        calc.selectedDcCablesDetails.forEach(item => {
            if (item.meters > 0) {
                rows.push({
                    sno: sno++,
                    particulars: `<strong>DC Solar Cable (${item.brandLabel || 'Polycab'}):</strong> ${item.cableLabel}<br/><span style="font-size:9px;color:#64748b">Tinned copper flexible single-core solar wire</span>`,
                    qty: item.meters,
                    unit: 'm',
                    rate: hideItemizedPricing ? 'Included' : formatINR(item.rate || 0),
                    cost: hideItemizedPricing ? 'Included' : formatINR(item.cost || 0)
                });
            }
        });
    } else if (dcCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DC Solar Cable:</strong> ${calc?.selDcCable?.label || "Solar DC Cable"}<br/><span style="font-size:9px;color:#64748b">Tinned copper flexible single-core solar wire</span>`,
            qty: dcCableM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.dcRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc?.dcCost || 0)
        });
    }

    if (invToAcdbCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>AC Cable (Inv to ACDB):</strong> ${calc?.selInvToAcdbCable?.label || "Multicore AC Cable"}<br/><span style="font-size:9px;color:#64748b">Multicore flexible AC cabling run</span>`,
            qty: invToAcdbCableM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.selInvToAcdbCable?.ratePerMeter || calc?.invToAcdbRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc?.invToAcdbCost || 0)
        });
    }
    if (acdbToMainCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>AC Cable (ACDB to Main):</strong> ${calc?.selAcdbToMainCable?.label || "Armored/Unarmored AC Cable"}<br/><span style="font-size:9px;color:#64748b">AC distribution cable run</span>`,
            qty: acdbToMainCableM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc?.selAcdbToMainCable?.ratePerMeter || calc?.acdbToMainRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc?.acdbToMainCost || 0)
        });
    }

    // Protection / Earthing
    if (calc?.pitsCount > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Chemical Earthing Pits:</strong> ${EARTHING_OPTS.find(e => e.v === earthingType)?.l || "Chemical Earthing"}<br/><span style="font-size:9px;color:#64748b">Low-resistance maintenance-free earthing</span>`,
            qty: calc.pitsCount,
            unit: 'pits',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.earthingRate || calc.pitRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.earthingCost || calc.pitsCost || 0)
        });
    }
    if (calc?.earthingWireCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Earthing Conductor:</strong> ${calc?.earthingLabel || 'Dedicated Equipment Grounding'}<br/><span style="font-size:9px;color:#64748b">Safety grounding run</span>`,
            qty: calc.earthingWireMeters || 0,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.earthingWireRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.earthingWireCost || 0)
        });
    }
    if (calc?.laCount > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Lightning Protection:</strong> ${laType === "ese" ? "ESE Active" : "Conventional"}<br/><span style="font-size:9px;color:#64748b">Safety shield against lightning surges</span>`,
            qty: calc.laCount,
            unit: 'units',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.laUnitRate || (laType === "conventional" ? (rates?.laConventionalRate || 0) : (rates?.laEseRate || 0))),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.laCost)
        });
    }
    if (walkwayM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Roof Walkway:</strong> ${walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}<br/><span style="font-size:9px;color:#64748b">Safe pathway on roof for O&M visits</span>`,
            qty: walkwayM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.walkRate || (walkwayType === "gi" ? (rates?.walkwayGiRate || 0) : (rates?.walkwayFrpRate || 0))),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.walkCost)
        });
    }
    if (customSafety > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Safety Lifeline</strong><br/><span style='font-size:9px;color:#64748b'>Anchor lifeline system for cleaning personnel</span>`,
            qty: customSafety,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.safetyLineRate || rates?.safetyLineRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.safetyCost)
        });
    }
    if (calc?.conduitUpvcCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Cable Conduiting:</strong> Rigid uPVC Conduit Pipe<br/><span style='font-size:9px;color:#64748b'>UV-resistant heavy-duty protective cable sleeve</span>`,
            qty: calc.conduitUpvcMeters || conduitUpvcM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.conduitUpvcRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.conduitUpvcCost)
        });
    }
    if (calc?.cableTrayCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Cable Tray:</strong> GI Perforated / Ladder Cable Tray<br/><span style='font-size:9px;color:#64748b'>Galvanized heavy-duty cable routing channel</span>`,
            qty: calc.cableTrayMeters || cableTrayM,
            unit: 'm',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.cableTrayRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.cableTrayCost)
        });
    }
    if (calc?.mc4Cost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>MC4 Connectors</strong><br/><span style='font-size:9px;color:#64748b'>Waterproof module string connector links</span>`,
            qty: calc.mc4Pairs,
            unit: 'pairs',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.mc4Rate || rates?.mc4ConnectorRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.mc4Cost)
        });
    }
    if (calc?.mc4BranchCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Branch (Y) Connectors</strong><br/><span style='font-size:9px;color:#64748b'>Parallel string configuration connectors</span>`,
            qty: calc.mc4BranchQty,
            unit: 'nos',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.branchRate || rates?.branchConnectorRate || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.mc4BranchCost)
        });
    }

    // Inclusions
    if (incBos) {
        rows.push({
            sno: sno++,
            particulars: `<strong>BOS & Accessories:</strong> Cable Lugs, Tape, Cable tie & Conduit Pipe`,
            qty: systemKW,
            unit: 'kWp',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incEng) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Engineering & Supervision</strong><br/><span style='font-size:9px;color:#64748b'>String designing, Shadow Analysis, electrical design</span>`,
            qty: systemKW,
            unit: 'kWp',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incMon) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Remote Monitoring Access</strong><br/><span style='font-size:9px;color:#64748b'>Continuous monitoring through data logger device</span>`,
            qty: 1,
            unit: 'Set',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incTrans) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Transportation & Freight</strong><br/><span style='font-size:9px;color:#64748b'>Till site loading and unloading</span>`,
            qty: 1,
            unit: 'Job',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (discom) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DISCOM Liaising & Net Metering</strong><br/><span style='font-size:9px;color:#64748b'>Net-metering approval process with local electricity authority</span>`,
            qty: 1,
            unit: 'job',
            rate: hideItemizedPricing ? 'Included' : formatINR(calc.discomCost || 0),
            cost: hideItemizedPricing ? 'Included' : formatINR(calc.discomCost || 0)
        });
    }
    rows.push({
        sno: sno++,
        particulars: `<strong>Installation & Commissioning:</strong> On-site mechanics, engineering execution, panel staging and commissioning`,
        qty: systemKW,
        unit: 'kW',
        rate: hideItemizedPricing ? 'Included' : formatINR(calc.installRate || rates?.installationRate || 0),
        cost: hideItemizedPricing ? 'Included' : formatINR(calc.installCost || 0)
    });

    return (
        <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col font-sans print:bg-white print:text-black">
            {/* Top Control Bar - Hidden on print */}
            <header className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between no-print shadow-md">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/quotation-logs" 
                        className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition-all hover:scale-105"
                    >
                        ← Back to Logs
                    </Link>
                    <div>
                        <h1 className="text-sm font-bold text-white">Quotation Review</h1>
                        <p className="text-[10px] text-white/50">{clientName || 'N/A'} — {systemKW} kW ({projectCategory})</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {log?.hasPDF && (
                        <a
                            href={`/api/quotation-logs/${log._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all shadow-md"
                        >
                            Download Stored PDF
                        </a>
                    )}
                    <a
                        href="javascript:window.print()"
                        className="px-4 py-2 rounded-xl bg-[#FECB00] text-slate-900 text-xs font-bold hover:bg-[#FECB00]/90 transition-all shadow-lg hover:scale-105"
                    >
                        Print / Save PDF
                    </a>
                </div>
            </header>

            {/* Print Area */}
            <div className="flex-grow flex justify-center p-8 bg-slate-950/20 print:p-0 print:bg-white">
                <div className="page bg-white shadow-2xl rounded-xl print:rounded-none print:shadow-none">
                    
                    {/* Header */}
                    <div className="hdr">
                        <div className="hdr-logo">
                            <img src="/divvy_photo.png" alt="Divvy Solar" />
                        </div>
                        <div className="hdr-mid">
                            <h1>DIVVY SOLAR Power &amp; SOLUTIONS Pvt. Ltd</h1>
                            <p className="addr1">{activeOffice.addr1}</p>
                            <p className="addr2">{activeOffice.addr2}</p>
                        </div>
                        <div className="hdr-right">
                            <div className="type">{projectTypeLabel}</div>
                            <p><strong>Quote Ref:</strong> {quoteRefStr}</p>
                            <p><strong>Date:</strong> {dateStr}</p>
                            <p><strong>Prepared By:</strong> {log?.salespersonName || "Divvy Solar Rep"}{log?.salespersonPhone ? ` (${log.salespersonPhone})` : ""}</p>
                        </div>
                    </div>

                    {/* Customer & Spec Grids */}
                    <div className="info-grid">
                        <div className="info-box">
                            <h3>Client Details</h3>
                            <p><strong>Client / Org:</strong> {clientName || "N/A"}</p>
                            <p><strong>Contact:</strong> {clientPhone || "N/A"}</p>
                            <p><strong>Site Location:</strong> {clientLocation || "N/A"}</p>
                            <p><strong>Quotation Prepared By:</strong> {log?.salespersonName || "Divvy Solar Representative"}{log?.salespersonPhone ? ` | Mob: ${log.salespersonPhone}` : ""}</p>
                            <p><strong>Connected Grid Load:</strong> {connectedLoad ? connectedLoad + " kW" : "N/A"}</p>
                            <p><strong>Type of Roof:</strong> {ROOF_TYPES.find(r => r.v === roofType)?.l || roofType || "N/A"}</p>
                            <p><strong>DG Synchronization:</strong> {dgSync ? "Required" : "Not Required"}</p>
                        </div>
                        <div className="info-box">
                            <h3>Technical Specifications</h3>
                            <p><strong>Proposed Capacity:</strong> {systemKW} kWp (Solar PV Plant)</p>
                            <p><strong>Solar Modules:</strong> {calc?.selectedModuleDetails?.length > 0 ? calc.selectedModuleDetails.map(m => `${m.modelName} (${m.wattage}Wp)`).join(', ') : (calc?.selMod?.modelName || "N/A")}</p>
                            <p><strong>Inverter Model:</strong> {calc?.selectedInverterDetails?.map(inv => inv.modelName + " (x" + inv.qty + ")").join(", ") || "N/A"}</p>
                            {calc?.selectedBatteryDetails?.length > 0 && (
                                <p><strong>Battery Bank:</strong> {calc.selectedBatteryDetails.map(bat => `${bat.modelName} (x${bat.qty})`).join(", ")}</p>
                            )}
                            <p><strong>Mounting Structure:</strong> {calc?.selectedStructures?.map(st => (ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "") + " (" + st.kw + "kW)").join(", ") || "N/A"}</p>
                            {dcCableM > 0 && <p><strong>DC Cable Run:</strong> {dcCableM}m of Solar DC Wire</p>}
                            {invToAcdbCableM > 0 && <p><strong>AC Cable (Inv-ACDB):</strong> {invToAcdbCableM}m of {calc?.selInvToAcdbCable?.label || ""}</p>}
                            {acdbToMainCableM > 0 && <p><strong>AC Cable (ACDB-Main):</strong> {acdbToMainCableM}m of {calc?.selAcdbToMainCable?.label || ""}</p>}
                        </div>
                    </div>

                    {/* Table */}
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40px', textAlign: 'center' }}>S.No</th>
                                <th style={{ textAlign: 'left' }}>Particulars / Components</th>
                                <th style={{ width: '80px', textAlign: 'center' }}>Qty / Size</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>Unit</th>
                                <th style={{ width: '100px', textAlign: 'right' }}>Unit Rate</th>
                                <th style={{ width: '120px', textAlign: 'right' }}>Total (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx}>
                                    <td style={{ textAlign: 'center' }}>{row.sno}</td>
                                    <td dangerouslySetInnerHTML={{ __html: row.particulars }} />
                                    <td style={{ textAlign: 'center' }}>{row.qty}</td>
                                    <td style={{ textAlign: 'center' }}>{row.unit}</td>
                                    <td style={{ textAlign: 'right' }}>{row.rate}</td>
                                    <td style={{ textAlign: 'right' }}>{row.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="totals-wrap">
                        <div className="totals">
                            <div className="totals-row">
                                <span>Base Project Cost:</span>
                                <span><strong>{formatINR(calc?.baseTotal)}</strong></span>
                            </div>
                            {calc?.discountAmount > 0 && (
                                <div className="totals-row" style={{ color: '#16a34a' }}>
                                    <span>Special Discount ({calc.effectiveDiscountPercent || 0}%):</span>
                                    <span>- {formatINR(calc.discountAmount)}</span>
                                </div>
                            )}
                            <div className="totals-row">
                                <span>GST ({calc?.gstPercent ? Number(calc.gstPercent).toFixed(2) : '8.90'}%):</span>
                                <span>{formatINR(calc?.gst)}</span>
                            </div>
                            <div className="totals-grand">
                                <span>Grand Total (Net Value):</span>
                                <span>{formatINR(calc?.grandTotal || log.grandTotal)}</span>
                            </div>
                            <p className="totals-note">Average cost per watt: ₹{calc?.perWp ? calc.perWp.toFixed(2) : ((log.grandTotal || 0) / ((systemKW || 1) * 1000)).toFixed(2)}/Wp (incl. GST)</p>
                        </div>
                    </div>

                    {/* Milestones & Terms */}
                    <div className="bottom-grid">
                        <div>
                            <h4>Payment Milestones Schedule</h4>
                            <ul className="payment-list">
                                <li>
                                    <span>1. Before Material Dispatch ({advP}%):</span>
                                    <strong>{formatINR(advAmt)}</strong>
                                </li>
                                <li>
                                    <span>2. Material Dispatch ({dispP}%):</span>
                                    <strong>{formatINR(dispAmt)}</strong>
                                </li>
                                <li>
                                    <span>3. On the Date of Commissioning ({handP}%):</span>
                                    <strong>{formatINR(handAmt)}</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4>Terms &amp; Conditions</h4>
                            <ul className="terms-list">
                                <li>Payment Mode: <strong>Milestone Payments (Bank Transfer / RTGS / Cheque)</strong></li>
                                <li>Estimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.</li>
                                <li>Grid integration approvals (Net Metering) timeline varies according to State DISCOM.</li>
                                <li>Quotation validity: 15 days from the date of issuance.</li>
                                <li>{dynamicWarrantyTerm}</li>
                            </ul>
                            {customTerms && customTerms.trim() && (
                                <>
                                    <h4 style={{ marginTop: '12px', color: '#1e3a8a' }}>Exact Client Requirements</h4>
                                    <ul className="terms-list" style={{ color: '#0f172a', fontWeight: '600' }} dangerouslySetInnerHTML={{ __html: customTermRows }} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="footer">
                        <div className="sig">
                            <div className="sig-line">
                                Authorized Signatory<br/>
                                <strong>{log?.salespersonName || "Divvy Solar Representative"}</strong>
                                {log?.salespersonPhone && <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>Mob: {log.salespersonPhone}</div>}
                            </div>
                        </div>
                        <div className="sig">
                            <div className="sig-line">
                                Accepted and Agreed<br/>
                                <strong>Client Representative</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Custom CSS matching PDF & print preview */}
            <style dangerouslySetInnerHTML={{ __html: `
                .page {
                    width: 794px;
                    padding: 28px 32px;
                    background: #ffffff;
                }
                .hdr {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #eab308;
                    padding-bottom: 12px;
                    margin-bottom: 16px;
                }
                .hdr-logo img {
                    width: 175px;
                    height: auto;
                    display: block;
                }
                .hdr-mid {
                    flex: 1;
                    text-align: center;
                    padding: 0 12px;
                }
                .hdr-mid h1 {
                    font-size: 13px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .hdr-mid .addr1 {
                    font-size: 8.5px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-top: 3px;
                }
                .hdr-mid .addr2 {
                    font-size: 8px;
                    color: #64748b;
                    margin-top: 2px;
                }
                .hdr-right {
                    width: 180px;
                    text-align: right;
                }
                .hdr-right .type {
                    font-size: 10px;
                    font-weight: 900;
                    color: #eab308;
                    text-transform: uppercase;
                }
                .hdr-right p {
                    font-size: 8.5px;
                    color: #64748b;
                    margin-top: 3px;
                    margin-bottom: 0;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 16px;
                }
                .info-box {
                    border: 1px solid #cbd5e1;
                    background: #f8fafc;
                    border-radius: 6px;
                    padding: 10px;
                }
                .info-box h3 {
                    font-size: 9.5px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 1.5px solid #eab308;
                    padding-bottom: 4px;
                    margin-top: 0;
                    margin-bottom: 6px;
                }
                .info-box p {
                    font-size: 9.5px;
                    color: #334155;
                    margin-bottom: 2px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 16px;
                }
                th {
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: #1e3a8a;
                    text-transform: uppercase;
                    padding: 6px 8px;
                    border: 1px solid #1e3a8a;
                }
                td {
                    font-size: 9px;
                    color: #334155;
                    padding: 6px 8px;
                    border: 1px solid #cbd5e1;
                    vertical-align: top;
                }
                tr:nth-child(even) td {
                    background: #f8fafc;
                }
                .totals-wrap {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 16px;
                }
                .totals {
                    width: 50%;
                    border: 1.5px solid #eab308;
                    background: #fefcf0;
                    border-radius: 6px;
                    padding: 10px 14px;
                }
                .totals-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    color: #334155;
                    padding: 2.5px 0;
                }
                .totals-grand {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    font-weight: 900;
                    color: #1e3a8a;
                    border-top: 1.5px solid #eab308;
                    padding-top: 6px;
                    margin-top: 4px;
                }
                .totals-note {
                    font-size: 8px;
                    color: #64748b;
                    text-align: right;
                    margin-top: 3px;
                    margin-bottom: 0;
                    font-weight: 600;
                }
                .bottom-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    padding-top: 12px;
                    border-top: 1px solid #e2e8f0;
                    margin-bottom: 24px;
                }
                .bottom-grid h4 {
                    font-size: 9.5px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 0;
                    margin-bottom: 8px;
                }
                .payment-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .payment-list li {
                    display: flex;
                    justify-content: space-between;
                    font-size: 9px;
                    color: #334155;
                    padding: 2.5px 0;
                    border-bottom: 1px dashed #cbd5e1;
                }
                .terms-list {
                    padding-left: 14px;
                    margin: 0;
                    font-size: 8.5px;
                    color: #475569;
                    line-height: 1.4;
                }
                .terms-list li {
                    margin-bottom: 2px;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 24px;
                }
                .sig {
                    width: 220px;
                    text-align: center;
                }
                .sig-line {
                    border-top: 1.5px solid #64748b;
                    padding-top: 6px;
                    font-size: 9px;
                    color: #334155;
                }
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                    body {
                        background: #ffffff !important;
                        color: #000000 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .page {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 20px 24px !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }
                }
            `}} />
        </div>
    );
}
