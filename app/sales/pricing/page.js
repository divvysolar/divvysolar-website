"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  CubeIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  DocumentArrowDownIcon,
  UserIcon,
  SunIcon,
  PrinterIcon,
  ArrowPathIcon,
  BuildingOffice2Icon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export const DIVVY_BRANCH_OFFICES = {
  gurgaon: {
    id: "gurgaon",
    name: "Gurgaon (Corporate Office)",
    shortName: "Gurgaon Office",
    state: "Haryana / Delhi-NCR",
    addr1: "Unit-859, Tower- B1, 8th Floor, Spaze I - Tech Park, Sec - 49, Gurgaon - 122018 (HARYANA)",
    addr2: "Head Office: Lower Ground, SJ Tower, Sec-13, Hisar 125001 (HR) | Email: info@divvysolar.in | Web: www.divvysolar.in",
    tagline: "Corporate Headquarters (NCR & North India)"
  },
  punjab: {
    id: "punjab",
    name: "Punjab / Mohali (Regional Office)",
    shortName: "Punjab / Mohali Office",
    state: "Punjab",
    addr1: "626, First Floor, Opp. Franco Hotel, Sec-55, Phase-I, Mohali, Punjab - 140501",
    addr2: "Corporate Office: Spaze I-Tech Park, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    tagline: "Punjab Regional Operations & Sales Office"
  },
  ludhiana: {
    id: "ludhiana",
    name: "Punjab / Ludhiana (Regional Office)",
    shortName: "Punjab / Ludhiana Office",
    state: "Punjab",
    addr1: "Plot no 14, Phase-VII (ADJ), Focal Point, Gobindgarh, Ludhiana, Punjab - 141010",
    addr2: "Corporate Office: Spaze I-Tech Park, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    tagline: "Punjab Industrial Corridor Office"
  },
  hisar: {
    id: "hisar",
    name: "Hisar (Head Office)",
    shortName: "Hisar Head Office",
    state: "Haryana",
    addr1: "Lower Ground, SJ Tower, Sector-13, Dabra Road, Hisar - 125001 (HARYANA)",
    addr2: "Gurgaon Office: Spaze I-Tech Park, Sec-49, Gurgaon | Email: info@divvysolar.in | Web: www.divvysolar.in",
    tagline: "Registered Head Office & Logistics Hub"
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

const ACTIVE_MODULE_BRANDS = ["waaree", "vikram", "adani", "jakson", "havells", "luminous", "eastman"];
const ACTIVE_INVERTER_BRANDS = ["havells", "luminous", "utl", "sungrow", "invergy", "eastman"];
const ACTIVE_BATTERY_BRANDS = ["eastman", "exide", "luminous", "livguard", "amaron", "dyness"];
const STRUCTURE_CATEGORIES = [
  { v: "ms", l: "MS Fabricated" },
  { v: "gi", l: "GI Structure" },
  { v: "alu", l: "Aluminium" },
  { v: "ground", l: "Ground Mounted" },
];

const STRUCTURE_TYPES_MAP = {
  ms: [
    { v: "ms_fabricated", l: "MS Fabricated" },
  ],
  gi: [
    { v: "gi", l: "GI Structure" },
    { v: "hot_dip_gi", l: "Elevated GI" },
  ],
  alu: [
    { v: "alu_monorail", l: "Aluminium Monorail" },
    { v: "alu_longrail", l: "Aluminium Long rail" },
  ],
  ground: [
    { v: "ground_gi", l: "GI Structure" },
    { v: "ground_galvalume", l: "Galvalume" }
  ]
};

// Flatten to easily find labels by value
const ALL_STRUCTURE_TYPES = Object.values(STRUCTURE_TYPES_MAP).flat();
const STRUCTURE_TYPES = ALL_STRUCTURE_TYPES;


const ROOF_TYPES = [{ v: "rcc", l: "Rooftop RCC" }, { v: "profile", l: "Shed (Profile Sheet)" }, { v: "ground", l: "Ground Mounted" }];
const PROJECT_CATEGORIES = [
  { v: "residential", l: "Residential Rooftop Solar" },
  { v: "industrial", l: "Industrial & Commercial Solar (C&I / 100kW+)" },
];
const LA_OPTS = [
  { v: "none", l: "None" },
  { v: "ese", l: "ESE Active" },
  { v: "conventional", l: "Conventional" },
];

const ACDB_OPTS = [
  { v: "1phase-mcb", l: "1-Phase ACDB (MCB, SPD)", desc: "1-Phase with MCB, Surge Arrestor and Fuses" },
  { v: "3phase-mcb", l: "3-Phase ACDB (MCB, SPD)", desc: "3-Phase with MCB, Surge Arrestor and Fuses" },
  { v: "3phase-mccb", l: "3-Phase ACDB (MCCB, SPD)", desc: "3-Phase with MCCB, Surge Arrestor, Fuses and SPDs" },
  { v: "lt-panel", l: "LT Panel (ACB/MCCB)", desc: "LT Synchronization Panel with ACB/MCCB, SPD, Fuses & Metering" },
  { v: "ht-panel", l: "HT Panel / VCB", desc: "HT Panel / VCB with comprehensive protection relays and SPDs" },
];
const WALKWAY_OPTS = [{ v: "gi", l: "GI Walkway" }, { v: "frp", l: "FRP Walkway" }];
const EARTHING_OPTS = [
  { v: "copper_wire", l: "Single Core Copper Wire" },
  { v: "gi_stripe", l: "GI Strip Earthing" }
];

const CABLE_BRANDS = [
  { v: "polycab", l: "Polycab" },
  { v: "havells", l: "Havells" },
  { v: "kei", l: "KEI" },
  { v: "lapp", l: "LAPP" },
  { v: "finolex", l: "Finolex" },
  { v: "apar", l: "Apar / Siechem" },
  { v: "reputed", l: "Reputed Make / Tier-1" },
];

const EARTHING_WIRE_SIZES = {
  copper_wire: ["4", "6", "10", "16", "25", "35"]
};
const cap = s => (s && typeof s === 'string') ? (s.charAt(0).toUpperCase() + s.slice(1)) : (s || '');

const formatINR = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

export const inWords = (num) => {
  if (!num || isNaN(num)) return "Zero Rupees";
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const rounded = Math.round(Number(num));
  if (rounded === 0) return "Zero Rupees";
  const numStr = ('000000000' + rounded).slice(-9);
  const n = numStr.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return `${rounded} Rupees`;
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || (b[Number(n[1][0])] + ' ' + a[Number(n[1][1])])) + 'Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || (b[Number(n[2][0])] + ' ' + a[Number(n[2][1])])) + 'Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || (b[Number(n[3][0])] + ' ' + a[Number(n[3][1])])) + 'Thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || (b[Number(n[4][0])] + ' ' + a[Number(n[4][1])])) + 'Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || (b[Number(n[5][0])] + ' ' + a[Number(n[5][1])])) : '';
  return (str.trim() + ' Rupees').replace(/\s+/g, ' ');
};

const Sel = ({ label, id, value, onChange, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
    <select id={id} value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all appearance-none"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23ffffff50'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
      {children}
    </select>
  </div>
);

const Inp = ({ label, id, value, onChange, placeholder = "", unit, type = "text", min, max, step }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input id={id} type={type} value={value} min={min} max={max} step={step} placeholder={placeholder}
        onChange={e => onChange(type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)}
        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"
        style={unit ? { paddingRight: "3.5rem" } : {}} />
      {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">{unit}</span>}
    </div>
  </div>
);

const Chk = ({ label, id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-5 h-5 rounded-md border-2 border-white/20 bg-white/5 peer-checked:bg-[#FECB00] peer-checked:border-[#FECB00] transition-all flex items-center justify-center">
        {checked && <svg className="w-3 h-3 text-[#0a1122]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
    </div>
    <span className="text-sm text-white/70 group-hover:text-white transition-colors font-medium">{label}</span>
  </label>
);

const getModuleTech = (m) => {
  if (!m) return "";
  if (m.technology && m.technology.trim()) return m.technology.trim();
  const raw = (m.modelName || "")
    .replace(/^(waaree|vikram|adani|jakson|havells|luminous)\s*/i, "")
    .replace(/\b\d{3,4}\s*(w|wp)\b/gi, "")
    .replace(/\(\s*\d{3,4}\s*(w|wp)\s*\)/gi, "")
    .replace(/mono\s*perc/i, "Mono PERC")
    .replace(/topcon/i, "TopCon")
    .replace(/bifacial/i, "Bifacial")
    .replace(/non\s*dcr/i, "Non-DCR")
    .replace(/\bdcr\b/i, "DCR")
    .trim();
  return raw || m.modelName || "Standard";
};

const getModuleWattage = (m) => {
  if (!m) return 0;
  if (m.wattage && m.wattage > 0) return m.wattage;
  const match = (m.modelName || "").match(/\b(\d{3,4})\s*(w|wp)\b/i);
  return match ? Number(match[1]) : 540;
};

const DynamicCableSelector = ({ label, cables, selectedId, onChange, brand = "polycab", onBrandChange }) => {
  const filteredCables = cables?.filter(c => c.conductor !== 'copper') || [];
  const selCable = filteredCables.find(c => c._id === selectedId) || filteredCables[0];
  if (!filteredCables || filteredCables.length === 0) return null;

  const conductors = Array.from(new Set(filteredCables.map(c => c.conductor)));
  const selConductor = selCable?.conductor || conductors[0] || 'aluminium';

  const coreOrder = { "2": 1, "4": 2, "3.5": 3 };
  const availableCores = Array.from(new Set(filteredCables.filter(c => c.conductor === selConductor).map(c => c.cores))).sort((a, b) => (coreOrder[a] || 99) - (coreOrder[b] || 99));
  const selCores = selCable && selCable.conductor === selConductor ? selCable.cores : availableCores[0];

  const availableSizes = filteredCables
    .filter(c => c.conductor === selConductor && c.cores === selCores)
    .map(c => c.sizeSqMm)
    .sort((a, b) => a - b);
  const selSize = selCable && selCable.conductor === selConductor && selCable.cores === selCores 
    ? selCable.sizeSqMm 
    : availableSizes[0];

  const updateSelection = (cond, cores, size) => {
    const match = filteredCables.find(x => x.conductor === cond && x.cores === cores && x.sizeSqMm === Number(size));
    if (match) {
      onChange(match._id);
      return;
    }
    const fallbackCores = filteredCables.find(x => x.conductor === cond && x.cores === cores);
    if (fallbackCores) {
      onChange(fallbackCores._id);
      return;
    }
    const fallbackCond = filteredCables.find(x => x.conductor === cond);
    if (fallbackCond) {
      onChange(fallbackCond._id);
    }
  };

  const currentBrandObj = CABLE_BRANDS.find(b => b.v === brand) || CABLE_BRANDS[0];

  return (
    <div className="space-y-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Sel label="Cable Brand" id={`${label}-brand`} value={brand} onChange={onBrandChange}>
          {CABLE_BRANDS.map(b => (
            <option key={b.v} value={b.v} className="bg-[#0f172a]">
              {b.l}
            </option>
          ))}
        </Sel>
        <Sel label="Conductor" id={`${label}-conductor`} value={selConductor} onChange={v => updateSelection(v, selCores, selSize)}>
          {conductors.map(c => (
            <option key={c} value={c} className="bg-[#0f172a]">
              {c === 'copper' ? 'Copper' : c === 'aluminium' ? 'Aluminium' : cap(c)}
            </option>
          ))}
        </Sel>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Sel label="Cores" id={`${label}-cores`} value={selCores} onChange={v => updateSelection(selConductor, v, selSize)}>
          {availableCores.map(c => (
            <option key={c} value={c} className="bg-[#0f172a]">
              {c} Core
            </option>
          ))}
        </Sel>
        <Sel label="Size (sqmm)" id={`${label}-size`} value={selSize} onChange={v => updateSelection(selConductor, selCores, v)}>
          {availableSizes.map(s => (
            <option key={s} value={s} className="bg-[#0f172a]">
              {s} sqmm
            </option>
          ))}
        </Sel>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-white/5 flex-wrap gap-1">
        <span className="text-[11px] text-white/50 truncate">{currentBrandObj?.l} · {selCable?.label || `${selCores}C x ${selSize}sqmm ${cap(selConductor)}`}</span>
      </div>
    </div>
  );
};

export default function PricingCalculatorPage() {
  const { data: session } = useSession();
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);
  // Client & Project Details
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [salespersonName, setSalespersonName] = useState("");
  const [salespersonPhone, setSalespersonPhone] = useState("");
  const [issuingBranch, setIssuingBranch] = useState("gurgaon");
  const [quoteRef, setQuoteRef] = useState("");
  const [systemKW, setSystemKW] = useState("");
  const [systemType, setSystemType] = useState("ongrid");
  const [projectCategory, setProjectCategory] = useState("residential");
  const [roofType, setRoofType] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [dgSync, setDgSync] = useState(false);

  // Auto-detect branch & salesperson profile from session
  useEffect(() => {
    if (session?.user) {
      const userStr = `${session.user.name || ''} ${session.user.email || ''}`.toLowerCase();
      const detected = detectBranchOffice(userStr);
      if (detected) {
        setIssuingBranch(detected);
      }
      if (session.user.name && !salespersonName) {
        setSalespersonName(session.user.name);
      }
      if (session.user.phone && !salespersonPhone) {
        setSalespersonPhone(session.user.phone);
      }
    }
  }, [session]);

  const handleClientLocationChange = (val) => {
    setClientLocation(val);
    const detected = detectBranchOffice(val);
    if (detected) {
      setIssuingBranch(detected);
    }
  };

  // Solar modules (Multi-module array support)
  const [modules, setModules] = useState([{ brand: "", model: "", qty: "" }]);

  // Inverter
  const [inverters, setInverters] = useState([{ brand: "", model: "", qty: "" }]);

  // Battery Storage (for Hybrid / Off-Grid)
  const [batteries, setBatteries] = useState([{ brand: "", model: "", qty: "" }]);

  // Structure
  const [structures, setStructures] = useState([{ id: Date.now(), type: "gi", kw: "" }]);

  // ACDB / DCDB
  const [acdb, setAcdb] = useState(false);
  const [dcdb, setDcdb] = useState(false);

  // Cables Selections
  const [dcCablesList, setDcCablesList] = useState([
    { id: Date.now(), brand: "polycab", cableId: "", meters: "" }
  ]);

  const [invToAcdbCableBrand, setInvToAcdbCableBrand] = useState("polycab");
  const [invToAcdbCableId, setInvToAcdbCableId] = useState("");
  const [invToAcdbCableM, setInvToAcdbCableM] = useState("");

  const [acdbToMainCableBrand, setAcdbToMainCableBrand] = useState("polycab");
  const [acdbToMainCableId, setAcdbToMainCableId] = useState("");
  const [acdbToMainCableM, setAcdbToMainCableM] = useState("");

  const [earthing, setEarthing] = useState(false);
  const [earthingType, setEarthingType] = useState("copper_wire");
  const [earthingWireSize, setEarthingWireSize] = useState("10");
  const [earthingWireM, setEarthingWireM] = useState("");
  const [isOverridePits, setIsOverridePits] = useState(false);
  const [customPits, setCustomPits] = useState(0);

  const [laType, setLaType] = useState("none");
  const [isOverrideLA, setIsOverrideLA] = useState(false);
  const [customLA, setCustomLA] = useState("");

  const [walkway, setWalkway] = useState(false);
  const [walkwayType, setWalkwayType] = useState("gi");
  const [walkwayM, setWalkwayM] = useState("");

  const [safetyLine, setSafetyLine] = useState(false);
  const [isOverrideSafety, setIsOverrideSafety] = useState(false);
  const [customSafety, setCustomSafety] = useState("");

  const [conduit, setConduit] = useState(false);
  const [conduitUpvcM, setConduitUpvcM] = useState("");
  const [cableTrayM, setCableTrayM] = useState("");

  const [mc4Pairs, setMc4Pairs] = useState("");
  const [mc4BranchQty, setMc4BranchQty] = useState("");

  // Commercial & Financial Controls
  const [discountPercent, setDiscountPercent] = useState(0); // 0 to maxDiscountPercent

  // Payment Milestones (Salesperson customizable per quotation)
  const [advancePercent, setAdvancePercent] = useState("");
  const [dispatchPercent, setDispatchPercent] = useState("");
  const [handoverPercent, setHandoverPercent] = useState("");

  // Warranties (Customizable per quotation)
  const [moduleWarranty, setModuleWarranty] = useState("25 Years");
  const [inverterWarranty, setInverterWarranty] = useState("5 Years");
  const [batteryWarranty, setBatteryWarranty] = useState("5 Years");

  // Print Inclusions
  const [incBos, setIncBos] = useState(true);
  const [incEng, setIncEng] = useState(true);
  const [incMon, setIncMon] = useState(true);
  const [incTrans, setIncTrans] = useState(true);

  const [incNuts, setIncNuts] = useState(false);
  const [hideItemizedPricing, setHideItemizedPricing] = useState(false);

  const [discom, setDiscom] = useState(false);
  const [discomType, setDiscomType] = useState("lt_three");
  const [customTerms, setCustomTerms] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [quoteRefLoading, setQuoteRefLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch("/api/pricing/rates");
      const json = await res.json();
      if (json.success) setRates(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextQuoteRef = useCallback(async () => {
    setQuoteRefLoading(true);
    try {
      const res = await fetch("/api/quotation-logs/next-ref");
      const json = await res.json();
      if (json.success && json.nextRef) {
        setQuoteRef(json.nextRef);
      }
    } catch (err) {
      console.error("Failed to fetch next quote ref:", err);
    } finally {
      setQuoteRefLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    fetchNextQuoteRef();

    const onFocus = () => fetchNextQuoteRef();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchRates, fetchNextQuoteRef]);

  // Sync cables & default overrides when rates are loaded
  useEffect(() => {
    if (rates) {
      if (rates.dcCables?.length && dcCablesList.length > 0 && !dcCablesList[0].cableId) {
        setDcCablesList(prev => prev.map((item, idx) => idx === 0 && !item.cableId ? { ...item, cableId: rates.dcCables[0]._id } : item));
      }
      if (rates.acCables?.length && !invToAcdbCableId) setInvToAcdbCableId(rates.acCables[0]._id);
      if (rates.acCables?.length && !acdbToMainCableId) setAcdbToMainCableId(rates.acCables[0]._id);
      if (rates.financialSettings) {
        if (advancePercent === "") setAdvancePercent(rates.financialSettings.advancePaymentPercent ?? 10);
        if (dispatchPercent === "") setDispatchPercent(rates.financialSettings.dispatchPaymentPercent ?? 85);
        if (handoverPercent === "") setHandoverPercent(rates.financialSettings.handoverPaymentPercent ?? 5);
      }
    }
  }, [rates, invToAcdbCableId, acdbToMainCableId]);


  // Auto-filter out brands with no active models in stock (supports dynamically added brands from Admin)
  const allModuleBrandKeys = rates?.modules 
    ? Object.keys(rates.modules).filter(k => k !== 'typeAdder' && !k.startsWith('$'))
    : ACTIVE_MODULE_BRANDS;
  const filteredModuleBrands = rates ? allModuleBrandKeys.filter(brand => {
    const models = rates.modules?.[brand] || [];
    return Array.isArray(models) && models.length > 0 && models.some(m => m.inStock !== false);
  }) : allModuleBrandKeys;
  const visibleModuleBrands = filteredModuleBrands.length > 0 ? filteredModuleBrands : allModuleBrandKeys;

  const allInverterBrandKeys = rates?.inverters 
    ? Object.keys(rates.inverters).filter(k => !k.startsWith('$'))
    : ACTIVE_INVERTER_BRANDS;
  const filteredInverterBrands = rates ? allInverterBrandKeys.filter(brand => {
    const models = rates.inverters?.[brand] || [];
    return Array.isArray(models) && models.length > 0 && models.some(m => m.inStock !== false);
  }) : allInverterBrandKeys;
  const visibleInverterBrands = filteredInverterBrands.length > 0 ? filteredInverterBrands : allInverterBrandKeys;

  const allBatteryBrandKeys = rates?.batteries 
    ? Object.keys(rates.batteries).filter(k => !k.startsWith('$'))
    : ACTIVE_BATTERY_BRANDS;
  const filteredBatteryBrands = rates ? allBatteryBrandKeys.filter(brand => {
    const models = rates.batteries?.[brand] || [];
    return Array.isArray(models) && models.length > 0 && models.some(m => m.inStock !== false);
  }) : allBatteryBrandKeys;
  const visibleBatteryBrands = filteredBatteryBrands.length > 0 ? filteredBatteryBrands : allBatteryBrandKeys;

  const totalModKW = modules.reduce((sum, m) => {
    const avail = rates?.modules?.[m.brand] || [];
    const sel = avail.find(x => (x._id && x._id === m.model) || x.modelName === m.model);
    const wp = m.customWattage !== undefined && m.customWattage !== "" ? Number(m.customWattage) : (sel?.wattage || 0);
    return sum + ((Number(m.qty) || 0) * wp / 1000);
  }, 0);
  const totalInvKW = inverters.reduce((sum, inv) => {
    const avail = rates?.inverters?.[inv.brand] || [];
    const sel = avail.find(x => (x._id && x._id === inv.model) || x.modelName === inv.model);
    let capKw = sel?.capacity || 0;
    if (!capKw && sel?.modelName) {
      const match = sel.modelName.match(/(\d+(?:\.\d+)?)\s*kw\b/i);
      if (match) capKw = Number(match[1]);
    }
    return sum + ((Number(inv.qty) || 1) * capKw);
  }, 0);
  const totalStructKW = structures.reduce((sum, st) => sum + (Number(st.kw) || 0), 0);
  const effectiveSystemKW = Number(systemKW) > 0 ? Number(systemKW) : (totalModKW > 0 ? totalModKW : (totalInvKW > 0 ? totalInvKW : totalStructKW));

  const defaultPits = earthing ? 3 : 0;
  const defaultLA = laType !== "none" ? Math.max(1, Math.ceil(effectiveSystemKW * (rates?.laPerKW || 0.1))) : 0;
  const defaultSafety = safetyLine ? Math.round(effectiveSystemKW * (rates?.safetyLinePerKW || 2)) : 0;

  useEffect(() => {
    if (!isOverridePits) setCustomPits(defaultPits);
  }, [defaultPits, isOverridePits]);

  useEffect(() => {
    if (!isOverrideLA) setCustomLA(defaultLA);
  }, [defaultLA, isOverrideLA]);

  useEffect(() => {
    if (!isOverrideSafety) setCustomSafety(defaultSafety);
  }, [defaultSafety, isOverrideSafety]);

  const handleEarthingChange = (val) => {
    setEarthing(val);
    if (!val) {
      setIsOverridePits(false);
      setEarthingWireM("");
    }
  };
  const handleEarthingTypeChange = (val) => {
    setEarthingType(val);
    if (val === "copper_wire") setEarthingWireSize("10");
  };
  const handleLAChange = (val) => {
    setLaType(val);
    if (val === "none") setIsOverrideLA(false);
  };
  const handleSafetyChange = (val) => {
    setSafetyLine(val);
    if (!val) setIsOverrideSafety(false);
  };
  const handleWalkwayChange = (val) => {
    setWalkway(val);
    if (!val) setWalkwayM("");
  };

  const updateModule = (index, field, value) => {
    const nm = [...modules];
    nm[index] = { ...nm[index], [field]: value };
    if (field === "brand") {
      nm[index].model = "";
      nm[index].tech = "";
      nm[index].qty = "";
    }
    setModules(nm);
  };

  const calc = (() => {
    const modKW = totalModKW;
    const invKW = totalInvKW;
    const structKW = totalStructKW;
    const plantKW = effectiveSystemKW;
    
    // Allow calculation if plantKW > 0 OR if any component is configured
    const hasAnySelection = plantKW > 0 || 
      inverters.some(i => i.model && (Number(i.qty) > 0 || i.qty)) || 
      modules.some(m => m.model && Number(m.qty) > 0) || 
      structures.some(s => Number(s.kw) > 0) ||
      batteries.some(b => b.model && (Number(b.qty) > 0 || b.qty)) ||
      (conduit && (Number(conduitUpvcM) > 0 || Number(cableTrayM) > 0)) ||
      (walkway && Number(walkwayM) > 0) ||
      (safetyLine && Number(customSafety) > 0) ||
      (earthing && (customPits > 0 || Number(earthingWireM) > 0)) ||
      dcCablesList.some(d => Number(d.meters) > 0) ||
      Number(invToAcdbCableM) > 0 ||
      Number(acdbToMainCableM) > 0 ||
      Number(mc4Pairs) > 0 ||
      Number(mc4BranchQty) > 0 ||
      discom || acdb || dcdb;
    if (!rates || !hasAnySelection) return null;
    const wp = plantKW * 1000;

    // Financial Percentage Settings (configured by Super Admin & Finance Team)
    const fin = rates.financialSettings || {
      residential: { profitMarginPercent: 17, maxDiscountPercent: 5 },
      industrial: { profitMarginPercent: 8, maxDiscountPercent: 3 },
      profitMarginPercent: 17,
      dealerCommissionPercent: 0,
      maxDiscountPercent: 5,
      gstPercent: 8.9,
      advancePaymentPercent: 10,
      dispatchPaymentPercent: 85,
      handoverPaymentPercent: 5,
    };

    // Category-specific financial settings:
    // Industrial applies if category is "industrial" OR plant capacity >= 100 kW
    const isIndustrial = projectCategory === "industrial" || plantKW >= 100;
    const catSettings = isIndustrial 
      ? (fin.industrial || { profitMarginPercent: 8, maxDiscountPercent: 3 })
      : (fin.residential || { profitMarginPercent: fin.profitMarginPercent ?? 17, maxDiscountPercent: fin.maxDiscountPercent ?? 5 });

    const profitMarginPercent = Number(catSettings?.profitMarginPercent ?? (isIndustrial ? 8 : (fin.profitMarginPercent ?? 17)));
    const maxDiscountPercent = Number(catSettings?.maxDiscountPercent ?? (isIndustrial ? 3 : (fin.maxDiscountPercent ?? 5)));
    const gstPercent = Number(fin.gstPercent ?? 8.9);

    // Direct baked-in markup multiplier (strictly uses profit margin)
    const markupMultiplier = 1 + (profitMarginPercent / 100);

    let moduleCost = 0;
    const selectedModuleDetails = [];
    modules.forEach(m => {
      const availModels = m.brand && rates.modules?.[m.brand] ? rates.modules[m.brand] : [];
      const selMod = availModels.find(item => (item._id && item._id === m.model) || item.modelName === m.model);
      const qty = Number(m.qty) || 0;
      if (selMod && qty > 0) {
        const adder = systemType === "hybrid" ? (rates.modules?.typeAdder?.hybrid || 0) : (rates.modules?.typeAdder?.ongrid || 0);
        const rawRatePerWp = (selMod.ratePerWp || 0) + adder;
        const ratePerWp = rawRatePerWp * markupMultiplier;
        const effectiveWp = m.customWattage !== undefined && m.customWattage !== "" ? Number(m.customWattage) : (selMod.wattage || 0);
        const itemWp = qty * effectiveWp;
        const kw = itemWp / 1000;
        const cost = ratePerWp * itemWp;
        moduleCost += cost;
        selectedModuleDetails.push({ ...selMod, brand: m.brand, kw, itemWp, ratePerWp, cost, panels: qty, qty, wattage: effectiveWp });
      }
    });

    let invCost = 0;
    const selectedInverterDetails = [];
    inverters.forEach(inv => {
      const availModels = inv.brand && rates.inverters?.[inv.brand] ? rates.inverters[inv.brand] : [];
      const selInv = availModels.find(m => (m._id && m._id === inv.model) || m.modelName === inv.model);
      if (selInv) {
        const qty = Number(inv.qty) || 1;
        const rawRate = selInv.ratePerKW || 0;
        const rate = rawRate * markupMultiplier;
        const cost = rate * qty;
        invCost += cost;
        selectedInverterDetails.push({ ...selInv, qty, cost, rate, brand: inv.brand });
      }
    });

    let batteryCost = 0;
    const selectedBatteryDetails = [];
    if (systemType === "hybrid" || batteries.some(b => b.brand && b.model && Number(b.qty) > 0)) {
      batteries.forEach(bat => {
        const availModels = bat.brand && rates.batteries?.[bat.brand] ? rates.batteries[bat.brand] : [];
        const selBat = availModels.find(m => (m._id && m._id === bat.model) || m.modelName === bat.model);
        if (selBat) {
          const qty = Number(bat.qty) || 1;
          const rawRate = selBat.ratePerUnit || selBat.rate || 0;
          const rate = rawRate * markupMultiplier;
          const cost = rate * qty;
          batteryCost += cost;
          selectedBatteryDetails.push({ ...selBat, qty, cost, rate, brand: bat.brand });
        }
      });
    }

    const selectedStructures = structures.map(st => {
      const rawRate = rates.structure?.[st.type]?.ratePerKw || 0;
      const rate = rawRate * markupMultiplier;
      const cost = rate * (Number(st.kw) || 0);
      return { ...st, rate, cost };
    });
    const structCost = selectedStructures.reduce((sum, st) => sum + st.cost, 0);

    const selectedDcCablesDetails = dcCablesList.map(item => {
      const cable = rates.dcCables?.find(c => c._id === item.cableId) || rates.dcCables?.[0];
      const rawRate = cable?.ratePerMeter || 0;
      const rate = rawRate * markupMultiplier;
      const meters = Number(item.meters) || 0;
      const cost = rate * meters;
      const brandObj = CABLE_BRANDS.find(b => b.v === item.brand) || CABLE_BRANDS[0];
      return {
        id: item.id,
        brand: item.brand,
        brandLabel: brandObj?.l || cap(item.brand),
        cableId: item.cableId,
        cableLabel: cable?.label || "DC Cable",
        rate,
        meters,
        cost
      };
    });
    const dcCost = selectedDcCablesDetails.reduce((sum, item) => sum + item.cost, 0);

    const selInvToAcdbCable = rates.acCables?.find(c => c._id === invToAcdbCableId) || rates.acCables?.[0];
    const rawInvToAcdbRate = selInvToAcdbCable?.ratePerMeter || 0;
    const invToAcdbRate = rawInvToAcdbRate * markupMultiplier;
    const invToAcdbCost = invToAcdbRate * invToAcdbCableM;

    const selAcdbToMainCable = rates.acCables?.find(c => c._id === acdbToMainCableId) || rates.acCables?.[0];
    const rawAcdbToMainRate = selAcdbToMainCable?.ratePerMeter || 0;
    const acdbToMainRate = rawAcdbToMainRate * markupMultiplier;
    const acdbToMainCost = acdbToMainRate * acdbToMainCableM;

    const acCost = invToAcdbCost + acdbToMainCost;

    const pitsCount = earthing ? customPits : 0;
    const rawPitRate = rates.earthingPitRateCu || 3500;
    const pitRate = rawPitRate * markupMultiplier;
    const pitsCost = pitsCount * pitRate;

    let rawEarthingWireRate = 0;
    if (earthingType === "gi_stripe") {
      rawEarthingWireRate = rates.earthingGiStripRate || 65;
    } else {
      const cuRates = {
        "4": rates.earthingCu4Rate || 45,
        "6": rates.earthingCu6Rate || 65,
        "10": rates.earthingCu10Rate || 105,
        "16": rates.earthingCu16Rate || 165,
        "25": rates.earthingCu25Rate || 260,
        "35": rates.earthingCu35Rate || 360,
      };
      rawEarthingWireRate = cuRates[earthingWireSize] || 105;
    }
    const earthingWireRate = rawEarthingWireRate * markupMultiplier;
    const earthingWireMeters = (earthing && Number(earthingWireM) > 0) ? Number(earthingWireM) : 0;
    const earthingWireCost = earthingWireMeters * earthingWireRate;

    const earthingLabel = earthingType === "copper_wire" 
      ? `Single Core Copper Wire (${earthingWireSize} sqmm)` 
      : "GI Strip Earthing";

    const earthingCost = pitsCost + earthingWireCost;

    const laCount = laType !== "none" ? customLA : 0;
    const rawLaUnitRate = laType === "conventional" ? (rates.laConventionalRate || 0) : (rates.laEseRate || 0);
    const laUnitRate = rawLaUnitRate * markupMultiplier;
    const laCost = laCount * laUnitRate;

    const rawWalkRate = walkway ? (walkwayType === "gi" ? (rates.walkwayGiRate || 0) : (rates.walkwayFrpRate || 0)) : 0;
    const walkRate = rawWalkRate * markupMultiplier;
    const walkCost = (walkway && Number(walkwayM) > 0) ? walkRate * Number(walkwayM) : 0;

    const safetyM = safetyLine ? customSafety : 0;
    const rawSafetyRate = rates.safetyLineRate || 0;
    const safetyLineRate = rawSafetyRate * markupMultiplier;
    const safetyCost = safetyM * safetyLineRate;

    const rawConduitUpvcRate = rates.conduitUpvcRate ?? 65;
    const conduitUpvcRate = rawConduitUpvcRate * markupMultiplier;
    const conduitUpvcMeters = (conduit && Number(conduitUpvcM) > 0) ? Number(conduitUpvcM) : 0;
    const conduitUpvcCost = conduitUpvcRate * conduitUpvcMeters;

    const rawCableTrayRate = rates.cableTrayRate ?? 280;
    const cableTrayRate = rawCableTrayRate * markupMultiplier;
    const cableTrayMeters = (conduit && Number(cableTrayM) > 0) ? Number(cableTrayM) : 0;
    const cableTrayCost = cableTrayRate * cableTrayMeters;

    const rawAcdbRate = rates.acdbRatePerKw || 0;
    const acdbRate = rawAcdbRate * markupMultiplier;
    const acdbCost = acdb ? acdbRate * plantKW : 0;

    const rawDcdbRate = rates.dcdbRatePerKw || 0;
    const dcdbRate = rawDcdbRate * markupMultiplier;
    const dcdbCost = dcdb ? dcdbRate * plantKW : 0;

    const rawMc4Rate = rates.mc4ConnectorRate || 0;
    const mc4Rate = rawMc4Rate * markupMultiplier;
    const mc4Cost = (Number(mc4Pairs) || 0) * mc4Rate;

    const rawBranchRate = rates.branchConnectorRate || 0;
    const branchRate = rawBranchRate * markupMultiplier;
    const mc4BranchCost = (Number(mc4BranchQty) || 0) * branchRate;

    let rawDiscomCost = 0;
    if (discom) {
      if (discomType === "single_phase") rawDiscomCost = rates.discomSinglePhaseCost || 0;
      else if (discomType === "three_phase") rawDiscomCost = rates.discomThreePhaseCost || 0;
      else if (discomType === "lt") rawDiscomCost = rates.discomLtCost || 0;
      else if (discomType === "ht") rawDiscomCost = rates.discomHtCost || 0;
    }
    const discomCost = rawDiscomCost * markupMultiplier;

    let rawInstallRate = rates.installationRate || 0;
    if (roofType === "rcc") rawInstallRate = rates.installationRateRcc || 0;
    else if (roofType === "profile") rawInstallRate = rates.installationRateShed || 0;
    else if (roofType === "ground") rawInstallRate = rates.installationRateGround || 0;

    const installRate = rawInstallRate * markupMultiplier;
    const installCost = installRate * plantKW;

    // Total markedUpBase is now mathematically the exact sum of all marked-up components
    const markedUpBase = moduleCost + invCost + batteryCost + structCost + dcCost + acCost + earthingCost + laCost + walkCost + safetyCost + conduitUpvcCost + cableTrayCost + mc4Cost + mc4BranchCost + acdbCost + dcdbCost + discomCost + installCost;

    const rawHardwareCost = markedUpBase / markupMultiplier;
    const marginAmount = markedUpBase - rawHardwareCost;

    // Clamped Discount
    const effectiveDiscountPercent = Math.min(Math.max(0, Number(discountPercent) || 0), maxDiscountPercent);
    const discountAmount = markedUpBase * (effectiveDiscountPercent / 100);
    const baseTotal = markedUpBase - discountAmount;

    const gstRate = gstPercent / 100;
    const gst = baseTotal * gstRate;
    const grandTotal = baseTotal + gst;
    const perWp = wp > 0 ? grandTotal / wp : 0;

    // Payment Milestones (Salesperson customizable per proposal)
    const advP = advancePercent !== "" ? Number(advancePercent) : (fin.advancePaymentPercent ?? 10);
    const dispP = dispatchPercent !== "" ? Number(dispatchPercent) : (fin.dispatchPaymentPercent ?? 85);
    const handP = handoverPercent !== "" ? Number(handoverPercent) : (fin.handoverPaymentPercent ?? 5);
    const advanceAmount = grandTotal * (advP / 100);
    const dispatchAmount = grandTotal * (dispP / 100);
    const handoverAmount = grandTotal * (handP / 100);

    return {
      moduleCost, invCost, batteryCost, structCost, dcCost, acCost, earthingCost, laCost,
      walkCost, safetyCost, conduitUpvcCost, conduitUpvcRate, conduitUpvcMeters, cableTrayCost, cableTrayRate, cableTrayMeters,
      discomCost, installCost, mc4Cost, installRate,
      rawHardwareCost, marginAmount, markedUpBase, effectiveDiscountPercent, discountAmount,
      baseTotal, gstRate, gstPercent, gst, grandTotal, perWp, effectiveKW: plantKW,
      advancePercent: advP, dispatchPercent: dispP, handoverPercent: handP, advanceAmount, dispatchAmount, handoverAmount,
      maxDiscountPercent, isIndustrial, appliedProfitMarginPercent: profitMarginPercent, appliedMaxDiscountPercent: maxDiscountPercent,
      pitsCount, pitsCost, pitRate, earthingWireCost, earthingWireRate, earthingWireMeters,
      laCount, selectedModuleDetails, selectedInverterDetails, selectedBatteryDetails, selectedDcCablesDetails, selInvToAcdbCable, selAcdbToMainCable, selectedStructures, invToAcdbCost, acdbToMainCost, acdbCost, dcdbCost, mc4BranchCost, mc4Pairs, mc4BranchQty, earthingLabel,
      invToAcdbRate, acdbToMainRate, acdbRate, dcdbRate, mc4Rate, branchRate, laUnitRate, walkRate, safetyLineRate,
      invToAcdbCableBrand, acdbToMainCableBrand
    };
  })();
  const handleDownloadPDF = async () => {
    if (!calc) return;
    setPdfLoading(true);

    const fmtINR = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
    const invAcdbBrandLabel = CABLE_BRANDS.find(b => b.v === invToAcdbCableBrand)?.l || cap(invToAcdbCableBrand);
    const acdbMainBrandLabel = CABLE_BRANDS.find(b => b.v === acdbToMainCableBrand)?.l || cap(acdbToMainCableBrand);

    const buildItemizedRows = () => {
      let rows = "";
      let sno = 1;
      const snoCell = () => `<td style="border:1px solid #cbd5e1;padding:4px 6px;font-size:8.5px;text-align:center;color:#334155;vertical-align:top;font-weight:600">${sno++}</td>`;
      const cell = (content, align = "left") => `<td style="border:1px solid #cbd5e1;padding:4px 6px;font-size:8.5px;text-align:${align};color:#334155;vertical-align:top">${content}</td>`;

      if (calc.selectedModuleDetails?.length > 0) {
        calc.selectedModuleDetails.forEach(mod => {
          rows += `<tr>${snoCell()}${cell(`<strong>Solar Modules (${cap(mod.brand)}):</strong> ${mod.modelName || "N/A"}<br/><span style="font-size:8px;color:#64748b">Tier-1 High-efficiency PV modules (${mod.wattage}Wp)</span>`)}${cell(mod.itemWp, "center")}${cell("Wp", "center")}${cell("&#8377;" + (mod.ratePerWp || 0).toFixed(2), "right")}${cell(fmtINR(mod.cost), "right")}</tr>`;
        });
      } else {
        rows += `<tr>${snoCell()}${cell(`<strong>Solar Modules:</strong> Not Selected<br/><span style="font-size:8px;color:#64748b">Tier-1 High-efficiency PV modules</span>`)}${cell((effectiveSystemKW || 0) * 1000, "center")}${cell("Wp", "center")}${cell("&#8377;0.00", "right")}${cell(fmtINR(0), "right")}</tr>`;
      }

      calc.selectedInverterDetails?.forEach(inv => {
        rows += `<tr>${snoCell()}${cell(`<strong>Solar Grid-Tie Inverter:</strong> ${inv.modelName}<br/><span style="font-size:8px;color:#64748b">Multi-MPPT High-efficiency inverter system</span>`)}${cell(inv.qty, "center")}${cell("Nos", "center")}${cell("&#8377;" + (inv.cost / (inv.qty || 1)).toFixed(2), "right")}${cell(fmtINR(inv.cost), "right")}</tr>`;
      });

      calc.selectedBatteryDetails?.forEach(bat => {
        rows += `<tr>${snoCell()}${cell(`<strong>Battery Storage System (${cap(bat.brand)}):</strong> ${bat.modelName}<br/><span style="font-size:8px;color:#64748b">Deep-cycle energy storage bank</span>`)}${cell(bat.qty, "center")}${cell("Nos", "center")}${cell("&#8377;" + (bat.cost / (bat.qty || 1)).toFixed(2), "right")}${cell(fmtINR(bat.cost), "right")}</tr>`;
      });

      if (calc.acdbCost > 0) rows += `<tr>${snoCell()}${cell("<strong>ACDB Combiner / Panel</strong><br/><span style='font-size:8px;color:#64748b'>L&amp;T / Elmex / Schneider / Reputed Make</span>")}${cell(effectiveSystemKW, "center")}${cell("kW", "center")}${cell("&#8377;" + (calc.acdbRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.acdbCost), "right")}</tr>`;
      if (calc.dcdbCost > 0) rows += `<tr>${snoCell()}${cell("<strong>DCDB Combiner / Panel</strong><br/><span style='font-size:8px;color:#64748b'>Reputed Make</span>")}${cell(effectiveSystemKW, "center")}${cell("kW", "center")}${cell("&#8377;" + (calc.dcdbRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.dcdbCost), "right")}</tr>`;

      calc.selectedStructures?.forEach(st => {
        const stLabel = ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A";
        rows += `<tr>${snoCell()}${cell(`<strong>Mounting Structure:</strong> ${stLabel}<br/><span style="font-size:8px;color:#64748b">Wind load sustained structural rails &amp; clamps</span>`)}${cell(st.kw, "center")}${cell("kW", "center")}${cell("&#8377;" + (st.rate || 0).toFixed(2), "right")}${cell(fmtINR(st.cost), "right")}</tr>`;
      });

      rows += `<tr>${snoCell()}${cell("<strong>Structure Accessories:</strong> SS 304 Nut Bolts &amp; Fasteners<br/><span style='font-size:8px;color:#64748b'>Anti-corrosion hardware for mechanical integrity</span>")}${cell(effectiveSystemKW, "center")}${cell("kW", "center")}${cell("Included", "right")}${cell("Included", "right")}</tr>`;

      if (calc.selectedDcCablesDetails?.length > 0) {
        calc.selectedDcCablesDetails.forEach(item => {
          if (item.meters > 0) {
            rows += `<tr>${snoCell()}${cell(`<strong>DC Solar Cable (${item.brandLabel}):</strong> ${item.cableLabel}<br/><span style="font-size:8px;color:#64748b">Tinned copper flexible single-core solar wire</span>`)}${cell(item.meters, "center")}${cell("m", "center")}${cell("&#8377;" + (item.rate || 0).toFixed(2), "right")}${cell(fmtINR(item.cost), "right")}</tr>`;
          }
        });
      }
      if (invToAcdbCableM > 0) rows += `<tr>${snoCell()}${cell(`<strong>AC Cable - Inv to ACDB (${invAcdbBrandLabel}):</strong> ${calc.selInvToAcdbCable?.label || "N/A"}<br/><span style="font-size:8px;color:#64748b">Multicore flexible AC cabling run</span>`)}${cell(invToAcdbCableM, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.invToAcdbRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.invToAcdbCost), "right")}</tr>`;
      if (acdbToMainCableM > 0) rows += `<tr>${snoCell()}${cell(`<strong>AC Cable - ACDB to Main (${acdbMainBrandLabel}):</strong> ${calc.selAcdbToMainCable?.label || "N/A"}<br/><span style="font-size:8px;color:#64748b">AC distribution cable run</span>`)}${cell(acdbToMainCableM, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.acdbToMainRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.acdbToMainCost), "right")}</tr>`;
      if (calc.pitsCount > 0) rows += `<tr>${snoCell()}${cell(`<strong>Chemical Earthing Pits:</strong> Copper Chemical Pits<br/><span style="font-size:8px;color:#64748b">Low-resistance maintenance-free earthing</span>`)}${cell(calc.pitsCount, "center")}${cell("pits", "center")}${cell("&#8377;" + (calc.pitRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.pitsCost), "right")}</tr>`;
      if (calc.earthingWireMeters > 0) rows += `<tr>${snoCell()}${cell(`<strong>Earthing Conductor / Wire:</strong> ${calc.earthingLabel}<br/><span style="font-size:8px;color:#64748b">Dedicated equipment safety grounding run</span>`)}${cell(calc.earthingWireMeters, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.earthingWireRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.earthingWireCost), "right")}</tr>`;
      if (calc.laCount > 0) rows += `<tr>${snoCell()}${cell(`<strong>Lightning Protection:</strong> ${laType === "ese" ? "ESE Active" : "Conventional"}<br/><span style="font-size:8px;color:#64748b">Safety shield against high-voltage lightning surges</span>`)}${cell(calc.laCount, "center")}${cell("units", "center")}${cell("&#8377;" + (calc.laUnitRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.laCost), "right")}</tr>`;
      if (walkway && Number(walkwayM) > 0) rows += `<tr>${snoCell()}${cell(`<strong>Roof Walkway:</strong> ${walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}<br/><span style="font-size:8px;color:#64748b">Safe pathway on roof for O&amp;M visits</span>`)}${cell(walkwayM, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.walkRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.walkCost), "right")}</tr>`;
      if (customSafety > 0) rows += `<tr>${snoCell()}${cell("<strong>Safety Lifeline</strong><br/><span style='font-size:8px;color:#64748b'>Anchor lifeline system for cleaning personnel</span>")}${cell(customSafety, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.safetyLineRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.safetyCost), "right")}</tr>`;
      if (calc.conduitUpvcCost > 0) rows += `<tr>${snoCell()}${cell("<strong>Cable Conduiting:</strong> Rigid uPVC Conduit Pipe<br/><span style='font-size:8px;color:#64748b'>UV-resistant heavy-duty protective cable sleeve</span>")}${cell(calc.conduitUpvcMeters, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.conduitUpvcRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.conduitUpvcCost), "right")}</tr>`;
      if (calc.cableTrayCost > 0) rows += `<tr>${snoCell()}${cell("<strong>Cable Tray:</strong> GI Perforated / Ladder Cable Tray<br/><span style='font-size:8px;color:#64748b'>Galvanized heavy-duty cable routing channel</span>")}${cell(calc.cableTrayMeters, "center")}${cell("m", "center")}${cell("&#8377;" + (calc.cableTrayRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.cableTrayCost), "right")}</tr>`;
      if (calc.mc4Cost > 0) rows += `<tr>${snoCell()}${cell("<strong>MC4 Connectors</strong><br/><span style='font-size:8px;color:#64748b'>Waterproof module string connector links</span>")}${cell(calc.mc4Pairs, "center")}${cell("pairs", "center")}${cell("&#8377;" + (calc.mc4Rate || 0).toFixed(2), "right")}${cell(fmtINR(calc.mc4Cost), "right")}</tr>`;
      if (calc.mc4BranchCost > 0) rows += `<tr>${snoCell()}${cell("<strong>Branch (Y) Connectors</strong><br/><span style='font-size:8px;color:#64748b'>Parallel string configuration connectors</span>")}${cell(calc.mc4BranchQty, "center")}${cell("nos", "center")}${cell("&#8377;" + (calc.branchRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.mc4BranchCost), "right")}</tr>`;
      if (incBos) rows += `<tr>${snoCell()}${cell("<strong>BOS &amp; Accessories:</strong> Cable Lugs, Tape, Cable tie &amp; Conduit Pipe")}${cell(effectiveSystemKW, "center")}${cell("kWp", "center")}${cell("Included", "right")}${cell("Included", "right")}</tr>`;
      if (incEng) rows += `<tr>${snoCell()}${cell("<strong>Engineering &amp; Supervision</strong><br/><span style='font-size:8px;color:#64748b'>String designing, Shadow Analysis, electrical design</span>")}${cell(effectiveSystemKW, "center")}${cell("kWp", "center")}${cell("Included", "right")}${cell("Included", "right")}</tr>`;
      if (incMon) rows += `<tr>${snoCell()}${cell("<strong>Remote Monitoring Access</strong><br/><span style='font-size:8px;color:#64748b'>Continuous monitoring through data logger device</span>")}${cell(1, "center")}${cell("Set", "center")}${cell("Included", "right")}${cell("Included", "right")}</tr>`;
      if (incTrans) rows += `<tr>${snoCell()}${cell("<strong>Transportation &amp; Freight</strong><br/><span style='font-size:8px;color:#64748b'>Till site loading and unloading</span>")}${cell(1, "center")}${cell("Job", "center")}${cell("Included", "right")}${cell("Included", "right")}</tr>`;
      if (discom) rows += `<tr>${snoCell()}${cell("<strong>DISCOM Liaising &amp; Net Metering</strong><br/><span style='font-size:8px;color:#64748b'>Net-metering approval process with local electricity authority</span>")}${cell(1, "center")}${cell("job", "center")}${cell("&#8377;" + (calc.discomCost || 0).toFixed(2), "right")}${cell(fmtINR(calc.discomCost), "right")}</tr>`;
      const installTypeLabel = roofType === "rcc" ? "Rooftop RCC" : roofType === "profile" ? "Shed" : roofType === "ground" ? "Ground-Mounted" : "Standard";
      rows += `<tr>${snoCell()}${cell(`<strong>Installation &amp; Commissioning (${installTypeLabel}):</strong> On-site mechanics, engineering execution, panel staging and commissioning`)}${cell(effectiveSystemKW, "center")}${cell("kW", "center")}${cell("&#8377;" + (calc.installRate || 0).toFixed(2), "right")}${cell(fmtINR(calc.installCost), "right")}</tr>`;
      return rows;
    };

    const modW = (moduleWarranty && moduleWarranty.trim()) ? (moduleWarranty.toLowerCase().includes('year') ? moduleWarranty : `${moduleWarranty} Years`) : '25 Years';
    const invW = (inverterWarranty && inverterWarranty.trim()) ? (inverterWarranty.toLowerCase().includes('year') ? inverterWarranty : `${inverterWarranty} Years`) : '5 Years';
    const batW = (batteryWarranty && batteryWarranty.trim()) ? (batteryWarranty.toLowerCase().includes('year') ? batteryWarranty : `${batteryWarranty} Years`) : '5 Years';

    const buildTurnkeyRows = () => {
      let rows = "";
      let sno = 1;
      const snoCell = () => `<td style="border:1px solid #cbd5e1;padding:4px 6px;font-size:8.5px;text-align:center;color:#334155;vertical-align:top;font-weight:600">${sno++}</td>`;
      const cell = (content, align = "left") => `<td style="border:1px solid #cbd5e1;padding:4px 6px;font-size:8.5px;text-align:${align};color:#334155;vertical-align:top">${content}</td>`;

      // 1. Modules
      if (calc.selectedModuleDetails?.length > 0) {
        calc.selectedModuleDetails.forEach(mod => {
          rows += `<tr>${snoCell()}${cell("<strong>Solar PV Modules</strong>")}${cell(`Tier-1 High Efficiency PV Modules (${mod.wattage}Wp, ${mod.tech || 'Mono PERC/TopCon'})`)}${cell(`${cap(mod.brand)} / Reputed Tier-1 (${modW} Warranty)`)}${cell("Nos", "center")}${cell(mod.panels || mod.qty, "center")}</tr>`;
        });
      } else {
        rows += `<tr>${snoCell()}${cell("<strong>Solar PV Modules</strong>")}${cell(`Tier-1 High Efficiency Solar PV Modules (${modW} Warranty)`)}${cell("Tier-1 Make")}${cell("Wp", "center")}${cell((effectiveSystemKW || 0) * 1000, "center")}</tr>`;
      }

      // 2. Inverters
      calc.selectedInverterDetails?.forEach(inv => {
        rows += `<tr>${snoCell()}${cell("<strong>Solar Inverter</strong>")}${cell(`Grid-Tie / Hybrid Multi-MPPT Inverter System (${inv.modelName})`)}${cell(`${cap(inv.brand)} / Tier-1 (${invW} Warranty)`)}${cell("Nos", "center")}${cell(inv.qty, "center")}</tr>`;
      });

      // 3. Batteries (if hybrid)
      calc.selectedBatteryDetails?.forEach(bat => {
        rows += `<tr>${snoCell()}${cell("<strong>Battery Storage Bank</strong>")}${cell(`Deep-Cycle Solar Battery Bank (${bat.modelName})`)}${cell(`${cap(bat.brand)} (${batW} Warranty)`)}${cell("Nos", "center")}${cell(bat.qty, "center")}</tr>`;
      });

      // 4. ACDB
      if (calc.acdbCost > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>AC Distribution Box (ACDB)</strong>")}${cell("ACDB Combiner with MCB/MCCB, Surge Protection Device (SPD) & Fuses")}${cell("L&amp;T / Schneider / Elmex / Reputed")}${cell("Set", "center")}${cell("1", "center")}</tr>`;
      }

      // 5. DCDB
      if (calc.dcdbCost > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>DC Distribution Box (DCDB)</strong>")}${cell("DC Combiner Box with Class-1 DC Fuses & High surge arrestor SPD")}${cell("Reputed Make")}${cell("Set", "center")}${cell("1", "center")}</tr>`;
      }

      // 6. Mounting Structure
      calc.selectedStructures?.forEach(st => {
        const stLabel = ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A";
        rows += `<tr>${snoCell()}${cell("<strong>Module Mounting Structure</strong>")}${cell(`${stLabel} (Engineered for wind resistance up to 150 kmph)`)}${cell("Standard Structural Grade")}${cell("kWp", "center")}${cell(st.kw, "center")}</tr>`;
      });

      // 7. Structure Fasteners
      rows += `<tr>${snoCell()}${cell("<strong>Structure Hardware &amp; Fasteners</strong>")}${cell("SS 304 / High tensile anti-corrosion nut bolts, clamps &amp; brackets")}${cell("Reputed Make")}${cell("Set", "center")}${cell("1", "center")}</tr>`;

      // 8. DC Cables
      if (calc.selectedDcCablesDetails?.length > 0) {
        calc.selectedDcCablesDetails.forEach(item => {
          if (item.meters > 0) {
            rows += `<tr>${snoCell()}${cell("<strong>DC Solar Cable</strong>")}${cell(`${item.cableLabel} (Single-core flexible tinned copper solar cable)`)}${cell(item.brandLabel || "Polycab / Siechem")}${cell("Mtr", "center")}${cell(item.meters, "center")}</tr>`;
          }
        });
      }

      // 9. AC Cables (Inv to ACDB)
      if (invToAcdbCableM > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>AC Solar Cable (Inv to ACDB)</strong>")}${cell(calc.selInvToAcdbCable?.label || "Multicore flexible AC cabling run")}${cell(invAcdbBrandLabel)}${cell("Mtr", "center")}${cell(invToAcdbCableM, "center")}</tr>`;
      }

      // 10. AC Cables (ACDB to Main)
      if (acdbToMainCableM > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>AC Solar Cable (ACDB to Main)</strong>")}${cell(calc.selAcdbToMainCable?.label || "Multicore distribution AC cable")}${cell(acdbMainBrandLabel)}${cell("Mtr", "center")}${cell(acdbToMainCableM, "center")}</tr>`;
      }

      // 11. Chemical Earthing Pits
      if (calc.pitsCount > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Chemical Earthing Pits</strong>")}${cell("Maintenance-free chemical copper earthing electrode with compound")}${cell("Reputed Make")}${cell("Pits", "center")}${cell(calc.pitsCount, "center")}</tr>`;
      }

      // 12. Earthing Conductor
      if (calc.earthingWireMeters > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Earthing Conductor</strong>")}${cell(`${calc.earthingLabel} (Dedicated equipment &amp; plant safety grounding)`)}${cell("Reputed Make")}${cell("Mtr", "center")}${cell(calc.earthingWireMeters, "center")}</tr>`;
      }

      // 13. Lightning Protection
      if (calc.laCount > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Lightning Protection System</strong>")}${cell(laType === "ese" ? "ESE Active Early Streamer Emission Lightning Arrestor" : "Conventional Spike Lightning Arrestor")}${cell("Reputed Make")}${cell("Nos", "center")}${cell(calc.laCount, "center")}</tr>`;
      }

      // 14. Walkway
      if (walkway && Number(walkwayM) > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Roof Walkway</strong>")}${cell(walkwayType === "gi" ? "GI Steel Grating Walkway" : "FRP Anti-corrosion Walkway")}${cell("Standard Make")}${cell("Mtr", "center")}${cell(walkwayM, "center")}</tr>`;
      }

      // 15. Safety Lifeline
      if (customSafety > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Safety Lifeline System</strong>")}${cell("Stainless steel lifeline wire rope with roof anchor brackets")}${cell("Standard Make")}${cell("Mtr", "center")}${cell(customSafety, "center")}</tr>`;
      }

      // 15b. Conduiting & Cable Trays
      if (calc.conduitUpvcCost > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Cable Conduiting</strong>")}${cell("Rigid heavy-duty UV-stabilized uPVC Conduit Pipe")}${cell("ISI / Reputed Make")}${cell("Mtr", "center")}${cell(calc.conduitUpvcMeters, "center")}</tr>`;
      }
      if (calc.cableTrayCost > 0) {
        rows += `<tr>${snoCell()}${cell("<strong>Cable Tray System</strong>")}${cell("Galvanized GI Perforated / Ladder Cable Tray with Coupler Plates")}${cell("Standard Structural Grade")}${cell("Mtr", "center")}${cell(calc.cableTrayMeters, "center")}</tr>`;
      }

      // 16. MC4 Connectors
      if (calc.mc4Cost > 0 || calc.mc4BranchCost > 0) {
        const totalMc4 = (Number(calc.mc4Pairs) || 0) + (Number(calc.mc4BranchQty) || 0);
        rows += `<tr>${snoCell()}${cell("<strong>MC4 &amp; Branch Connectors</strong>")}${cell("IP67 / IP68 UV resistant waterproof module string connectors")}${cell("Multi-Contact / Reputed")}${cell("Set", "center")}${cell(totalMc4 > 0 ? totalMc4 : "1", "center")}</tr>`;
      }

      // 17. BOS Accessories
      if (incBos) {
        rows += `<tr>${snoCell()}${cell("<strong>BOS Accessories &amp; Wiring</strong>")}${cell("Cable ties, cable trays, PVC conduit pipes, copper lugs, glands &amp; safety labels")}${cell("Reputed / Tier-1")}${cell("Lot", "center")}${cell("1", "center")}</tr>`;
      }

      // 18. Installation & Commissioning
      const installTypeLabel = roofType === "rcc" ? "Rooftop RCC" : roofType === "profile" ? "Shed" : roofType === "ground" ? "Ground-Mounted" : "Standard";
      rows += `<tr>${snoCell()}${cell("<strong>Installation, Testing &amp; Commissioning</strong>")}${cell(`Complete mechanical erection, electrical integration, string testing &amp; commissioning (${installTypeLabel})`)}${cell("Divvy Solar Technical Team")}${cell("Job", "center")}${cell("1", "center")}</tr>`;

      // 19. Engineering & Supervision
      if (incEng) {
        rows += `<tr>${snoCell()}${cell("<strong>Engineering &amp; System Design</strong>")}${cell("3D shadow analysis, string sizing, electrical SLD &amp; supervision")}${cell("Divvy Solar Design Engineering")}${cell("Job", "center")}${cell("1", "center")}</tr>`;
      }

      // 20. Remote Monitoring
      if (incMon) {
        rows += `<tr>${snoCell()}${cell("<strong>Remote Monitoring System</strong>")}${cell("IoT Data logger device with cloud mobile application &amp; web portal")}${cell("Inverter OEM / Divvy Solar")}${cell("Set", "center")}${cell("1", "center")}</tr>`;
      }

      // 21. Transportation & Freight
      if (incTrans) {
        rows += `<tr>${snoCell()}${cell("<strong>Transportation &amp; Freight</strong>")}${cell("Safe transit, transit insurance, loading, transportation to site &amp; unloading")}${cell("Divvy Solar Logistics")}${cell("Job", "center")}${cell("1", "center")}</tr>`;
      }

      // 22. DISCOM Net Metering
      if (discom) {
        rows += `<tr>${snoCell()}${cell("<strong>DISCOM Liaising &amp; Net Metering</strong>")}${cell("Net-metering application processing, grid feasibility and DISCOM coordination")}${cell("Divvy Solar Regulatory")}${cell("Job", "center")}${cell("1", "center")}</tr>`;
      }

      return rows;
    };

    try {
      const activeQuoteRef = (quoteRef && quoteRef.trim()) || `DS/QP/${new Date().getFullYear()}/0001`;
      const projectTypeLabel = projectCategory === "residential"
        ? "RESIDENTIAL SOLAR PROPOSAL"
        : projectCategory === "industrial"
          ? "INDUSTRIAL / C&I SOLAR PROPOSAL"
          : "UTILITY-SCALE SOLAR PROPOSAL";
      const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      const quoteRefStr = activeQuoteRef;
      let dynamicWarrantyTerm = `Warranty: ${modW} performance warranty on solar modules, ${invW} on grid-tie inverters.`;
      if (systemType === "hybrid" || batteries.some(b => b.brand && b.model)) {
        dynamicWarrantyTerm += ` ${batW} on battery storage system.`;
      }

      const rawStdTerms = rates?.standardTerms || 'Payment Mode: Milestone Payments (Bank Transfer / RTGS / Cheque)\nEstimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.\nGrid integration approvals (Net Metering) timeline varies according to State DISCOM.\nQuotation validity: 15 days from the date of issuance.\nWarranty: 25 years performance warranty on solar modules, 5 years on grid-tie inverters.';
      const rawTermsArr = rawStdTerms.split('\n').filter(t => t.trim());
      const hasWarrantyLine = rawTermsArr.some(t => t.trim().toLowerCase().startsWith('warranty:'));
      let processedTerms = rawTermsArr.map(t => {
        if (t.trim().toLowerCase().startsWith('warranty:')) {
          return dynamicWarrantyTerm;
        }
        return t;
      });
      if (!hasWarrantyLine) {
        processedTerms.push(dynamicWarrantyTerm);
      }
      const standardTermRows = processedTerms.map(t => `<li style="padding:1.5px 0">${t}</li>`).join('');
      const customTermRows = customTerms ? customTerms.split('\n').filter(t => t.trim()).map(t => `<li style="padding:1.5px 0">${t}</li>`).join('') : '';
      const logoUrl = window.location.origin + "/divvy_photo.png";

      const css = `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #334155; -webkit-print-color-adjust: exact; }
        .page { width: 794px; background: #fff; padding: 20px 28px; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eab308; padding-bottom: 8px; margin-bottom: 10px; }
        .hdr-logo img { width: 165px; height: auto; display: block; }
        .hdr-mid { flex: 1; text-align: center; padding: 0 10px; }
        .hdr-mid h1 { font-size: 13.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; }
        .hdr-mid .addr1 { font-size: 8px; font-weight: 700; color: #1e293b; margin-top: 2px; }
        .hdr-mid .addr2 { font-size: 7.5px; color: #64748b; margin-top: 1px; }
        .hdr-right { width: 170px; text-align: right; }
        .hdr-right .type { font-size: 10px; font-weight: 900; color: #eab308; text-transform: uppercase; }
        .hdr-right p { font-size: 8px; color: #64748b; margin-top: 2px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
        .info-box { border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; padding: 6px 8px; }
        .info-box h3 { font-size: 9px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #eab308; padding-bottom: 3px; margin-bottom: 4px; }
        .info-box p { font-size: 8.5px; color: #334155; margin-bottom: 1.5px; line-height: 1.3; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
        th { font-size: 8.5px; font-weight: 700; color: #fff; background: #1e3a8a; text-transform: uppercase; padding: 5px 6px; border: 1px solid #1e3a8a; }
        td { font-size: 8.5px; color: #334155; padding: 3.5px 6px; border: 1px solid #cbd5e1; vertical-align: top; line-height: 1.25; }
        tr:nth-child(even) td { background: #f8fafc; }
        .totals-wrap { display: flex; justify-content: flex-end; margin-bottom: 8px; }
        .totals { width: 50%; border: 1.5px solid #eab308; background: #fefcf0; border-radius: 6px; padding: 6px 10px; }
        .totals-row { display: flex; justify-content: space-between; font-size: 8.5px; color: #334155; padding: 1.5px 0; }
        .totals-grand { display: flex; justify-content: space-between; font-size: 11px; font-weight: 900; color: #1e3a8a; border-top: 1.5px solid #eab308; padding-top: 4px; margin-top: 3px; }
        .totals-note { font-size: 7.5px; color: #64748b; text-align: right; margin-top: 2px; font-weight: 600; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0; margin-bottom: 10px; }
        .bottom-grid h4 { font-size: 9px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .payment-list { list-style: none; }
        .payment-list li { display: flex; justify-content: space-between; font-size: 8.5px; color: #334155; font-weight: 500; padding: 1.5px 0; }
        .terms-list { list-style: decimal; padding-left: 14px; }
        .terms-list li { font-size: 8px; color: #475569; padding: 1px 0; line-height: 1.35; }
        .footer { display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #cbd5e1; }
        .sig { width: 38%; text-align: center; }
        .sig-line { border-top: 1px solid #94a3b8; padding-top: 4px; font-size: 8.5px; color: #64748b; font-weight: 600; }
      `;

      const activeOffice = DIVVY_BRANCH_OFFICES[issuingBranch] || DIVVY_BRANCH_OFFICES.gurgaon;

      const mainTableHtml = !hideItemizedPricing ? `
        <table>
          <thead>
            <tr>
              <th style="width:36px;text-align:center">S.No</th>
              <th style="text-align:left">Particulars / Components</th>
              <th style="width:70px;text-align:center">Qty / Size</th>
              <th style="width:45px;text-align:center">Unit</th>
              <th style="width:90px;text-align:right">Unit Rate</th>
              <th style="width:110px;text-align:right">Total (INR)</th>
            </tr>
          </thead>
          <tbody>${buildItemizedRows()}</tbody>
        </table>
        <div class="totals-wrap">
          <div class="totals">
            <div class="totals-row"><span>Base Plant Cost:</span><span><strong>${fmtINR(calc.markedUpBase)}</strong></span></div>
            ${calc.discountAmount > 0 ? `<div class="totals-row" style="color:#16a34a"><span>Special Negotiation Discount (${calc.effectiveDiscountPercent}%):</span><span>- ${fmtINR(calc.discountAmount)}</span></div>` : ''}
            <div class="totals-row"><span>Subtotal (Taxable):</span><span>${fmtINR(calc.baseTotal)}</span></div>
            <div class="totals-row"><span>GST (${calc.gstPercent}%):</span><span>${fmtINR(calc.gst)}</span></div>
            <div class="totals-grand"><span>Grand Total (Net Value):</span><span>${fmtINR(calc.grandTotal)}</span></div>
            <p class="totals-note">Average cost per watt: &#8377;${calc.perWp.toFixed(2)}/Wp (incl. GST)</p>
          </div>
        </div>
      ` : `
        <table>
          <thead>
            <tr>
              <th style="width:32px;text-align:center">S.No</th>
              <th style="width:150px;text-align:left">Material</th>
              <th style="text-align:left">Technical Specifications</th>
              <th style="width:150px;text-align:left">Make / Brand</th>
              <th style="width:40px;text-align:center">Units</th>
              <th style="width:40px;text-align:center">Qty</th>
            </tr>
          </thead>
          <tbody>${buildTurnkeyRows()}</tbody>
        </table>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;margin-bottom:6px">
          <thead>
            <tr style="background:#1e3a8a;color:#fff">
              <th style="width:32px;text-align:center;padding:5px 6px;font-size:8.5px;border:1px solid #1e3a8a">S.No</th>
              <th style="text-align:left;padding:5px 6px;font-size:8.5px;border:1px solid #1e3a8a">Purchase Order For</th>
              <th style="width:110px;text-align:right;padding:5px 6px;font-size:8.5px;border:1px solid #1e3a8a">Taxable Value</th>
              <th style="width:95px;text-align:right;padding:5px 6px;font-size:8.5px;border:1px solid #1e3a8a">GST @ ${calc.gstPercent}%</th>
              <th style="width:115px;text-align:right;padding:5px 6px;font-size:8.5px;border:1px solid #1e3a8a">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #cbd5e1;padding:6px;font-size:9px;text-align:center;color:#334155;font-weight:bold">1</td>
              <td style="border:1px solid #cbd5e1;padding:6px;font-size:9px;text-align:left;color:#0f172a;font-weight:600">
                Complete Supply, Installation, Testing &amp; Commissioning of ${effectiveSystemKW || 0} kWp Solar PV System @ &#8377;${Math.round(calc.perWp * 1000).toLocaleString('en-IN')}/- Per kWp
                ${calc.discountAmount > 0 ? `<div style="font-size:8px;color:#16a34a;font-weight:normal;margin-top:1px">Special discount of ${calc.effectiveDiscountPercent}% applied</div>` : ''}
              </td>
              <td style="border:1px solid #cbd5e1;padding:6px;font-size:9px;text-align:right;color:#334155;font-weight:bold">${fmtINR(calc.baseTotal)}</td>
              <td style="border:1px solid #cbd5e1;padding:6px;font-size:9px;text-align:right;color:#334155;font-weight:bold">${fmtINR(calc.gst)}</td>
              <td style="border:1px solid #cbd5e1;padding:6px;font-size:10px;text-align:right;color:#1e3a8a;font-weight:900">${fmtINR(calc.grandTotal)}</td>
            </tr>
          </tbody>
        </table>
        <div style="background:#fefcf0;border:1px solid #eab308;padding:5px 10px;border-radius:4px;margin-bottom:10px;font-size:8.5px;font-weight:800;color:#1e3a8a;text-align:center;letter-spacing:0.3px">
          (${inWords(Math.round(calc.grandTotal)).toUpperCase()} ONLY INCLUSIVE GST)
        </div>
      `;

      const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>
        <div class="page">
          <div class="hdr">
            <div class="hdr-logo"><img src="${logoUrl}" /></div>
            <div class="hdr-mid">
              <h1>DIVVY SOLAR Power &amp; SOLUTIONS Pvt. Ltd</h1>
              <p class="addr1">${activeOffice.addr1}</p>
              <p class="addr2">${activeOffice.addr2}</p>
            </div>
            <div class="hdr-right">
              <div class="type">${projectTypeLabel}</div>
              <p><strong>Quote Ref:</strong> ${quoteRefStr}</p>
              <p><strong>Date:</strong> ${dateStr}</p>
              <p><strong>Prepared By:</strong> ${salespersonName || "Divvy Solar Representative"}${salespersonPhone ? ` (${salespersonPhone})` : ""}</p>
            </div>
          </div>
          <div class="info-grid">
            <div class="info-box">
              <h3>Client Details</h3>
              <p><strong>Client / Org:</strong> ${clientName || "N/A"}</p>
              <p><strong>Contact:</strong> ${clientPhone || "N/A"}</p>
              <p><strong>Site Location:</strong> ${clientLocation || "N/A"}</p>
              <p><strong>Quotation Prepared By:</strong> ${salespersonName || "Divvy Solar Representative"}${salespersonPhone ? ` | Mob: ${salespersonPhone}` : ""}</p>
              <p><strong>Connected Grid Load:</strong> ${connectedLoad ? connectedLoad + " kW" : "N/A"}</p>
              <p><strong>Type of Roof:</strong> ${ROOF_TYPES.find(r => r.v === roofType)?.l || "N/A"}</p>
              <p><strong>DG Synchronization:</strong> ${dgSync ? "Required" : "Not Required"}</p>
            </div>
            <div class="info-box">
              <h3>Technical Specifications</h3>
              <p><strong>System Type:</strong> ${systemType === 'hybrid' ? 'Hybrid' : 'On-Grid'}</p>
              <p><strong>Proposed Capacity:</strong> ${effectiveSystemKW || 0} kWp (Solar PV Plant)</p>
              <p><strong>Solar Modules:</strong> ${calc.selectedModuleDetails?.map(m => `${cap(m.brand)} ${m.modelName} (${m.kw}kWp, ${m.panels} panels)`).join(", ") || "N/A"}</p>
              <p><strong>Inverter Model:</strong> ${calc.selectedInverterDetails?.map(inv => inv.modelName + " (x" + inv.qty + ")").join(", ") || "N/A"}</p>
              <p><strong>Mounting Structure:</strong> ${calc.selectedStructures?.map(st => (ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "") + " (" + st.kw + "kW)").join(", ") || "N/A"}</p>
              ${calc.selectedDcCablesDetails?.filter(item => item.meters > 0).length > 0 ? `<p><strong>DC Cable Run:</strong> ${calc.selectedDcCablesDetails.filter(item => item.meters > 0).map(item => `${item.meters}m of ${item.cableLabel} (${item.brandLabel})`).join(", ")}</p>` : ""}
              ${invToAcdbCableM > 0 ? `<p><strong>AC Cable (Inv-ACDB):</strong> ${invToAcdbCableM}m of ${calc.selInvToAcdbCable?.label || ""} (${invAcdbBrandLabel})</p>` : ""}
              ${acdbToMainCableM > 0 ? `<p><strong>AC Cable (ACDB-Main):</strong> ${acdbToMainCableM}m of ${calc.selAcdbToMainCable?.label || ""} (${acdbMainBrandLabel})</p>` : ""}
              ${walkway && Number(walkwayM) > 0 ? `<p><strong>Roof Walkway:</strong> ${walkwayM}m of ${walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}</p>` : ""}
              ${calc.pitsCount > 0 ? `<p><strong>Earthing System:</strong> ${calc.pitsCount} Pits of ${calc.earthingLabel}</p>` : ""}
            </div>
          </div>
          ${mainTableHtml}
          <div class="bottom-grid">
            <div>
              <h4>Payment Milestones Schedule</h4>
              <ul class="payment-list">
                <li><span>1. Before Material Dispatch (${calc.advancePercent}%):</span><strong>${fmtINR(calc.advanceAmount)}</strong></li>
                <li><span>2. Material Dispatch (${calc.dispatchPercent}%):</span><strong>${fmtINR(calc.dispatchAmount)}</strong></li>
                <li><span>3. On the Date of Commissioning (${calc.handoverPercent}%):</span><strong>${fmtINR(calc.handoverAmount)}</strong></li>
              </ul>
            </div>
            <div>
              <h4>Terms &amp; Conditions</h4>
              <ul class="terms-list">
                ${standardTermRows}
              </ul>
              ${customTerms && customTerms.trim() ? `
                <h4 style="margin-top:8px;color:#1e3a8a">Exact Client Requirements</h4>
                <ul class="terms-list" style="color:#0f172a;font-weight:600">
                  ${customTermRows}
                </ul>
              ` : ''}
            </div>
          </div>
          <div class="footer">
            <div class="sig">
              <div class="sig-line">
                Authorized Signatory<br/>
                <strong>${salespersonName || "Divvy Solar Representative"}</strong>
                ${salespersonPhone ? `<div style="font-size:8px;color:#64748b;margin-top:1px">Mob: ${salespersonPhone}</div>` : ""}
              </div>
            </div>
            <div class="sig"><div class="sig-line">Accepted and Agreed<br/><strong>Client Representative</strong></div></div>
          </div>
        </div>
      </body></html>`;

      // Create offscreen iframe at exact A4 width (794px = A4 at 96dpi)
      const iframe = document.createElement("iframe");
      iframe.style.cssText = "position:fixed;left:-9999px;top:0;width:794px;height:2000px;border:none;visibility:hidden;";
      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();

      // Wait for images and layout to settle
      await new Promise(resolve => setTimeout(resolve, 1500));

      const pageEl = iframe.contentDocument.querySelector(".page");
      const totalH = pageEl.scrollHeight;
      iframe.style.height = totalH + 100 + "px";
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        height: totalH,
        windowWidth: 794,
        windowHeight: totalH,
      });

      if (document.body.contains(iframe)) document.body.removeChild(iframe);

      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgHeightMm = (canvas.height * pdfW) / canvas.width;

      if (imgHeightMm <= pdfH + 4) {
        // Fits on a single, crisp A4 page without page splits
        pdf.addImage(imgData, "JPEG", 0, 0, pdfW, Math.min(imgHeightMm, pdfH));
      } else {
        // Clean multi-page pagination
        let heightLeft = imgHeightMm;
        let page = 0;
        while (heightLeft > 5) {
          if (page > 0) pdf.addPage();
          const position = -(page * pdfH);
          pdf.addImage(imgData, "JPEG", 0, position, pdfW, imgHeightMm);
          heightLeft -= pdfH;
          page++;
        }
      }

      const pdfBase64 = pdf.output('datauristring');
      pdf.save(`Divvy_Solar_Quote_${clientName || "Client"}_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.pdf`);

      // ── Quotation Log ─────────────────────────────────────────────────────────
      // Only send pdfData if under 15MB to avoid database/body-size limits; always create the log entry.
      const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB
      const pdfToLog = (typeof pdfBase64 === 'string' && pdfBase64.length < MAX_PDF_BYTES)
        ? pdfBase64
        : '';

      const calcStateData = {
        clientName: clientName || '',
        clientPhone: clientPhone || '',
        clientLocation: clientLocation || '',
        salespersonName: salespersonName || session?.user?.name || '',
        salespersonPhone: salespersonPhone || session?.user?.phone || '',
        issuingBranch: issuingBranch || 'gurgaon',
        branchAddress: activeOffice.addr1,
        branchSecondary: activeOffice.addr2,
        quoteRef: quoteRefStr,
        systemKW: Number(systemKW) || 0,
        modules: modules || [],
        systemType: systemType || 'ongrid',
        inverters: inverters || [],
        batteries: batteries || [],
        structures: structures || [],
        projectCategory: projectCategory || 'residential',
        connectedLoad: connectedLoad || '',
        roofType: roofType || '',
        dgSync: !!dgSync,
        customTerms: customTerms || '',
        dcCablesList: dcCablesList || [],
        dcCableM: dcCablesList.reduce((sum, item) => sum + (Number(item.meters) || 0), 0),
        invToAcdbCableM: Number(invToAcdbCableM) || 0,
        acdbToMainCableM: Number(acdbToMainCableM) || 0,
        earthingType: earthingType || '',
        laType: laType || '',
        walkway: !!walkway,
        walkwayType: walkwayType || 'gi',
        walkwayM: Number(walkwayM) || 0,
        customSafety: Number(customSafety) || 0,
        conduit: !!conduit,
        conduitUpvcM: Number(conduitUpvcM) || 0,
        cableTrayM: Number(cableTrayM) || 0,
        discomType: discomType || '',
        discom: !!discom,
        incBos: !!incBos,
        incEng: !!incEng,
        incMon: !!incMon,
        incTrans: !!incTrans,
        incNuts: !!incNuts,
        hideItemizedPricing: !!hideItemizedPricing,
        moduleWarranty: moduleWarranty || '25 Years',
        inverterWarranty: inverterWarranty || '5 Years',
        batteryWarranty: batteryWarranty || '5 Years',
        advancePercent: Number(advancePercent) || 10,
        dispatchPercent: Number(dispatchPercent) || 85,
        handoverPercent: Number(handoverPercent) || 5,
        discountPercent: Number(discountPercent) || 0,
        calc: calc,
        rates: rates,
      };

      try {
        const logRes = await fetch('/api/quotation-logs', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            salespersonName: salespersonName || session?.user?.name || '',
            salespersonPhone: salespersonPhone || session?.user?.phone || '',
            clientName: clientName || '',
            clientPhone: clientPhone || '',
            clientLocation: clientLocation || '',
            issuingBranch: issuingBranch || 'gurgaon',
            quoteRef: quoteRefStr,
            systemKW: Number(systemKW) || 0,
            grandTotal: calc?.grandTotal || 0,
            projectCategory: projectCategory || 'residential',
            action: 'downloaded',
            pdfData: pdfToLog,
            calcState: JSON.stringify(calcStateData),
          }),
        });

        if (logRes.ok) {
          // Auto-fetch next quote reference number for future proposal
          fetchNextQuoteRef();
          // Show a brief success toast
          const toast = document.createElement('div');
          toast.textContent = '✓ Quotation logged successfully';
          toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:#16a34a;color:#fff;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:fadeIn .3s ease';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 3000);
        } else {
          const errText = await logRes.text().catch(() => '');
          console.error('[QuotationLog] Server error:', logRes.status, errText);
          // Show a warning toast
          const toast = document.createElement('div');
          toast.textContent = `⚠ Log failed (${logRes.status}) — PDF downloaded OK`;
          toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:#b45309;color:#fff;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.3)';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 5000);
        }
      } catch (logErr) {
        console.error('[QuotationLog] Network error:', logErr);
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert(`PDF download failed: ${err.message}`);
    } finally {
      setPdfLoading(false);
    }
  };


  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#FECB00]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-t-[#FECB00] animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">      <style>{`
        @media screen {
          .print-only { display: none !important; }
        }
        @page {
          margin: 0;
        }
        @media print {
          .no-print, aside, header, nav, #slChatButton { display: none !important; }
          .print-only { display: block !important; }
          
          html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            font-family: 'Inter', sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body > div,
          main, 
          main > div {
            height: auto !important;
            min-height: initial !important;
            overflow: visible !important;
            display: block !important;
            position: static !important;
          }
          
          .print-container {
            max-width: 100% !important;
            padding: 20px 24px !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }

          .print-container > div:first-child {
            padding-bottom: 8px !important;
            margin-bottom: 12px !important;
          }

          .print-container .grid {
            margin-bottom: 12px !important;
            gap: 12px !important;
          }

          .print-container .grid > div {
            padding: 8px !important;
          }
          
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
 
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin-bottom: 12px !important;
          }
          
          tbody tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          th, td {
            border: 1px solid #ddd !important;
            padding: 5px 6px !important;
            text-align: left !important;
            font-size: 9.5px !important;
          }
          
          th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }

          .print-container .flex.justify-end {
            margin-bottom: 8px !important;
          }

          .print-container .grid-cols-2 {
            margin-bottom: 12px !important;
            gap: 16px !important;
          }

          .print-container .flex.justify-between.items-center.pt-8 {
            padding-top: 12px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <CalculatorIcon className="w-7 h-7 text-[#FECB00]" />
            Site-Visit & Proposal Engine
          </h1>
          <p className="text-white/50 text-sm mt-1">Configure client details, dynamic cabling & custom BOS overrides → print quotation.</p>
        </div>
        {calc && (
          <button onClick={handleDownloadPDF} disabled={pdfLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}>
            {pdfLoading ? (
              <><span className="w-4 h-4 border-2 border-[#0a1122]/30 border-t-[#0a1122] rounded-full animate-spin" />Generating PDF...</>
            ) : (
              <><DocumentArrowDownIcon className="w-5 h-5" />Download Quotation PDF</>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        {/* LEFT: Dynamic Config Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Section 1: Client Details */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <UserIcon className="w-6 h-6 text-[#FECB00]" />
              <div>
                <h2 className="text-lg font-bold text-white">1. Client & Project Details</h2>
                <p className="text-white/40 text-xs mt-0.5">Basic information for the quotation header.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Inp label="Client Name" id="client-name" value={clientName} onChange={setClientName} />
              <Inp label="Phone" id="client-phone" value={clientPhone} onChange={setClientPhone} />
              <Inp 
                label="Location / Site Address" 
                id="client-loc" 
                value={clientLocation} 
                onChange={handleClientLocationChange} 
                placeholder="e.g. Mohali, Punjab / Gurgaon, HR / Hisar" 
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-ref" className="text-xs font-bold text-white/50 uppercase tracking-wider">Quote Reference #</label>
                <div className="relative">
                  <input
                    id="quote-ref"
                    type="text"
                    value={quoteRef || "DS/QP/2026/0001"}
                    readOnly
                    tabIndex={-1}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white font-bold text-sm tracking-wide cursor-not-allowed select-all focus:outline-none transition-all"
                  />
                </div>
              </div>
              <Inp 
                label="Quotation Prepared By (Salesperson Name)" 
                id="salesperson-name" 
                value={salespersonName} 
                onChange={setSalespersonName} 
                placeholder="e.g. Vineet Kumar" 
              />
              <Inp 
                label="Salesperson Mobile # (Printed on Proposal)" 
                id="salesperson-phone" 
                value={salespersonPhone} 
                onChange={setSalespersonPhone} 
                placeholder="e.g. +91 98765 43210" 
              />
            </div>

            {/* Issuing Branch / Office Synchronization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <Sel 
                label="Divvy Issuing Branch / Office (Letterhead Header)" 
                id="issuing-branch" 
                value={issuingBranch} 
                onChange={setIssuingBranch}
              >
                <option value="gurgaon" className="bg-[#0f172a]">Gurgaon (Corporate Office) — Spaze I-Tech Park</option>
                <option value="punjab" className="bg-[#0f172a]">Punjab / Mohali (Regional Office) — Phase-I, Mohali</option>
                <option value="ludhiana" className="bg-[#0f172a]">Punjab / Ludhiana (Regional Office) — Focal Point</option>
                <option value="hisar" className="bg-[#0f172a]">Hisar (Head Office) — SJ Tower, Sec-13</option>
              </Sel>

              <div className="rounded-xl bg-[#FECB00]/10 border border-[#FECB00]/20 p-3 flex items-start gap-2.5">
                <BuildingOffice2Icon className="w-5 h-5 text-[#FECB00] shrink-0 mt-0.5" />
                <div className="text-xs min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white truncate">
                      {DIVVY_BRANCH_OFFICES[issuingBranch]?.name || "Corporate Office"}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FECB00]/20 text-[#FECB00] font-bold uppercase tracking-wider whitespace-nowrap">
                      ✓ Sync Active
                    </span>
                  </div>
                  <p className="text-white/70 text-[11px] mt-1 leading-snug line-clamp-2">
                    {DIVVY_BRANCH_OFFICES[issuingBranch]?.addr1}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Inp label="System Size (kWp)" id="system-kw" value={systemKW} onChange={setSystemKW} type="number" min={0} step="0.1" placeholder="e.g. 10" />
              <Sel label="System Type" id="sys-type" value={systemType} onChange={setSystemType}>
                <option value="ongrid" className="bg-[#0f172a]">On-Grid (Grid-Tied)</option>
                <option value="hybrid" className="bg-[#0f172a]">Hybrid (Grid + Battery Backup)</option>
              </Sel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Sel label="Project Category" id="proj-cat" value={projectCategory} onChange={setProjectCategory}>
                {PROJECT_CATEGORIES.map(c => <option key={c.v} value={c.v} className="bg-[#0f172a]">{c.l}</option>)}
              </Sel>
              <Sel label="Roof Type" id="roof-type" value={roofType} onChange={setRoofType}>
                <option value="" className="bg-[#0f172a]">Select Roof Type</option>
                {ROOF_TYPES.map(c => <option key={c.v} value={c.v} className="bg-[#0f172a]">{c.l}</option>)}
              </Sel>
              <Inp label="Connected Load (kW)" id="connected-load" value={connectedLoad} onChange={setConnectedLoad} type="number" min={0} />
            </div>
          </section>

          {/* Section 2: Solar Modules */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SunIcon className="w-6 h-6 text-[#FECB00]" />
                <div>
                  <h2 className="text-lg font-bold text-white">2. Solar Modules</h2>
                  <p className="text-white/40 text-xs mt-0.5">Select brand, model and quantity of panels.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModules([...modules, { brand: "", model: "", qty: "" }])}
                className="px-3 py-1.5 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors flex items-center gap-1.5"
              >
                <span>+ Add Module</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-white/5">
              <Inp
                label="Module Performance Warranty"
                id="module-warranty"
                value={moduleWarranty}
                onChange={setModuleWarranty}
                placeholder="e.g. 25 Years / 30 Years"
              />
            </div>

            {/* Multi-Module List */}
            <div className="space-y-4">
              {modules.map((mod, index) => {
                const availModels = mod.brand && rates?.modules?.[mod.brand]
                  ? rates.modules[mod.brand].filter(m => m.inStock !== false)
                  : [];
                
                // Distinct technology options for chosen brand
                const distinctTechs = Array.from(new Set(availModels.map(m => getModuleTech(m)))).filter(Boolean);
                
                const selModObj = availModels.find(m => (m._id && m._id === mod.model) || m.modelName === mod.model);
                const currentTech = selModObj ? getModuleTech(selModObj) : (mod.tech || (distinctTechs[0] || ""));
                
                // Models available for currentTech
                const filteredModels = currentTech 
                  ? availModels.filter(m => getModuleTech(m) === currentTech)
                  : availModels;

                const distinctWattages = (filteredModels.length > 0 ? filteredModels : availModels).map(m => ({
                  id: m._id || m.modelName,
                  wattage: getModuleWattage(m),
                  modelName: m.modelName,
                  model: m
                }));

                const selWattage = mod.customWattage !== undefined && mod.customWattage !== "" ? Number(mod.customWattage) : (selModObj ? getModuleWattage(selModObj) : 0);
                const modCapacityKW = mod.qty && selWattage > 0 ? ((Number(mod.qty) * selWattage) / 1000).toFixed(2) : null;

                return (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative">
                    {modules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setModules(modules.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 text-white/30 hover:text-red-400 p-1 text-lg font-bold transition-colors leading-none"
                        title="Remove Module"
                      >
                        ×
                      </button>
                    )}
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                        Module #{index + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* 1. Module Brand */}
                      <Sel
                        label="Module Brand"
                        id={`mod-brand-${index}`}
                        value={mod.brand}
                        onChange={v => {
                          const nextModels = v && rates?.modules?.[v] ? rates.modules[v].filter(m => m.inStock !== false) : [];
                          const first = nextModels[0];
                          const nm = [...modules];
                          nm[index] = {
                            ...nm[index],
                            brand: v,
                            tech: first ? getModuleTech(first) : "",
                            model: first ? (first._id || first.modelName) : "",
                            customWattage: undefined, // reset so new model's default wattage auto-fills
                          };
                          setModules(nm);
                        }}
                      >
                        <option value="" className="bg-[#0f172a]">Select Brand</option>
                        {visibleModuleBrands.map(b => (
                          <option key={b} value={b} className="bg-[#0f172a]">{cap(b)}</option>
                        ))}
                      </Sel>

                      {/* 2. Module Technology / Type */}
                      <Sel
                        label="Model / Technology"
                        id={`mod-tech-${index}`}
                        value={currentTech}
                        disabled={!mod.brand || distinctTechs.length === 0}
                        onChange={v => {
                          const matchedForTech = availModels.find(m => getModuleTech(m) === v) || availModels[0];
                          const nm = [...modules];
                          nm[index] = {
                            ...nm[index],
                            tech: v,
                            model: matchedForTech ? (matchedForTech._id || matchedForTech.modelName) : "",
                          };
                          setModules(nm);
                        }}
                      >
                        <option value="" className="bg-[#0f172a]">Select Type</option>
                        {distinctTechs.map(t => (
                          <option key={t} value={t} className="bg-[#0f172a]">{t}</option>
                        ))}
                      </Sel>

                      {/* 3. Wattage (Wp) — Editable number input, auto-fills from model */}
                      <Inp
                        label="Wattage (Wp)"
                        id={`mod-wattage-${index}`}
                        value={mod.customWattage !== undefined ? mod.customWattage : (selModObj ? getModuleWattage(selModObj) : "")}
                        type="number"
                        min={1}
                        step="1"
                        placeholder="e.g. 550"
                        unit="Wp"
                        onChange={v => {
                          const nm = [...modules];
                          nm[index] = { ...nm[index], customWattage: v === "" ? "" : Number(v) };
                          setModules(nm);
                        }}
                      />

                      {/* 4. Quantity (Panels) */}
                      <Inp
                        label="Quantity (Panels)"
                        id={`mod-qty-${index}`}
                        value={mod.qty}
                        type="number"
                        min={1}
                        step="1"
                        placeholder="e.g. 18"
                        onChange={v => updateModule(index, "qty", v === "" ? "" : Number(v))}
                      />
                    </div>

                    {/* Live Module Info Tag (Margin & Raw Cost strictly hidden) */}
                    {selModObj && (
                      <div className="flex items-center justify-between pt-1 text-xs border-t border-white/5 flex-wrap gap-2">
                        <span className="text-[#FECB00] font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FECB00]" />
                          {cap(mod.brand)} · {getModuleTech(selModObj)} ({selWattage}Wp)
                        </span>
                        {modCapacityKW && (
                          <span className="text-white/60 font-medium">
                            Capacity: <strong className="text-white">{modCapacityKW} kWp</strong> ({mod.qty} Panels)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Inverter Configuration */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BoltIcon className="w-6 h-6 text-[#FECB00]" />
                <div>
                  <h2 className="text-lg font-bold text-white">3. Inverter Configuration</h2>
                  <p className="text-white/40 text-xs mt-0.5">Add one or more inverters for this system.</p>
                </div>
              </div>
              <button onClick={() => setInverters([...inverters, { brand: "", model: "", qty: "" }])}
                className="px-3 py-1.5 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors">
                + Add Inverter
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-white/5">
              <Inp
                label="Inverter Warranty"
                id="inverter-warranty"
                value={inverterWarranty}
                onChange={setInverterWarranty}
                placeholder="e.g. 5 Years / 7 Years / 10 Years"
              />
            </div>

            <div className="space-y-4">
              {inverters.map((inv, index) => {
                const availModels = inv.brand && rates?.inverters?.[inv.brand]
                  ? rates.inverters[inv.brand].filter(m => m.inStock !== false)
                  : [];
                return (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative">
                    {inverters.length > 1 && (
                      <button onClick={() => setInverters(inverters.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 p-1">×</button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Sel label="Brand" id={`inv-brand-${index}`} value={inv.brand}
                        onChange={v => { const ni = [...inverters]; ni[index] = { ...ni[index], brand: v, model: "" }; setInverters(ni); }}>
                        <option value="" className="bg-[#0f172a]">Select Brand</option>
                        {visibleInverterBrands.map(b => <option key={b} value={b} className="bg-[#0f172a]">{cap(b)}</option>)}
                      </Sel>
                      <Sel label="Model" id={`inv-model-${index}`} value={inv.model} disabled={!inv.brand}
                        onChange={v => { const ni = [...inverters]; ni[index] = { ...ni[index], model: v }; setInverters(ni); }}>
                        <option value="" className="bg-[#0f172a]">Select Model</option>
                        {availModels.map(m => <option key={m._id || m.modelName} value={m._id || m.modelName} className="bg-[#0f172a]">{m.modelName} {m.capacity ? `(${m.capacity}kW)` : ""}</option>)}
                      </Sel>
                      <Inp label="Qty" id={`inv-qty-${index}`} value={inv.qty} type="number" min={1} placeholder="e.g. 1"
                        onChange={v => { const ni = [...inverters]; ni[index] = { ...ni[index], qty: v === "" ? "" : Number(v) }; setInverters(ni); }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3b: Battery Storage (for Hybrid Solar) */}
          {(systemType === "hybrid" || batteries.some(b => b.brand || b.model)) && (
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#FECB00]/20 flex items-center justify-center text-[#FECB00] font-bold text-xs">⚡</div>
                  <div>
                    <h2 className="text-lg font-bold text-white">4. Battery Storage (Hybrid Backup Bank)</h2>
                    <p className="text-white/40 text-xs mt-0.5">Select battery brand, model and quantity for hybrid backup.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBatteries([...batteries, { brand: "", model: "", qty: "" }])}
                  className="px-3 py-1.5 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors"
                >
                  + Add Battery
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-white/5">
                <Inp
                  label="Battery Warranty"
                  id="battery-warranty"
                  value={batteryWarranty}
                  onChange={setBatteryWarranty}
                  placeholder="e.g. 5 Years / 10 Years"
                />
              </div>
              <div className="space-y-4">
                {batteries.map((bat, index) => {
                  const availModels = bat.brand && rates?.batteries?.[bat.brand]
                    ? rates.batteries[bat.brand].filter(m => m.inStock !== false)
                    : [];
                  const selBatObj = availModels.find(m => (m._id && m._id === bat.model) || m.modelName === bat.model);
                  return (
                    <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative">
                      {batteries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setBatteries(batteries.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 text-white/20 hover:text-red-400 p-1"
                        >
                          ×
                        </button>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Sel
                          label="Battery Brand"
                          id={`bat-brand-${index}`}
                          value={bat.brand}
                          onChange={v => {
                            const nb = [...batteries];
                            nb[index] = { ...nb[index], brand: v, model: "" };
                            setBatteries(nb);
                          }}
                        >
                          <option value="" className="bg-[#0f172a]">Select Brand</option>
                          {visibleBatteryBrands.map(b => (
                            <option key={b} value={b} className="bg-[#0f172a]">{cap(b)}</option>
                          ))}
                        </Sel>
                        <Sel
                          label="Battery Model / Capacity"
                          id={`bat-model-${index}`}
                          value={bat.model}
                          disabled={!bat.brand}
                          onChange={v => {
                            const nb = [...batteries];
                            nb[index] = { ...nb[index], model: v };
                            setBatteries(nb);
                          }}
                        >
                          <option value="" className="bg-[#0f172a]">Select Model</option>
                          {availModels.map(m => (
                            <option key={m._id || m.modelName} value={m._id || m.modelName} className="bg-[#0f172a]">
                              {m.modelName}
                            </option>
                          ))}
                        </Sel>
                        <Inp
                          label="Quantity (Nos)"
                          id={`bat-qty-${index}`}
                          value={bat.qty}
                          type="number"
                          min={1}
                          placeholder="e.g. 4"
                          onChange={v => {
                            const nb = [...batteries];
                            nb[index] = { ...nb[index], qty: v === "" ? "" : Number(v) };
                            setBatteries(nb);
                          }}
                        />
                      </div>
                      {selBatObj && (
                        <div className="flex items-center justify-between pt-1 text-xs border-t border-white/5">
                          <span className="text-[#FECB00] font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FECB00]" />
                            {cap(bat.brand)} · {selBatObj.modelName}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section 5: Mounting Structure */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WrenchScrewdriverIcon className="w-6 h-6 text-[#FECB00]" />
                <div>
                  <h2 className="text-lg font-bold text-white">Mounting Structure</h2>
                  <p className="text-white/40 text-xs mt-0.5">Select structure types and set capacities</p>
                </div>
              </div>
              <button onClick={() => setStructures([...structures, { id: Date.now(), type: "ms_fabricated", kw: "" }])}
                className="px-3 py-1.5 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors">
                + Add Structure
              </button>
            </div>

            <div className="space-y-4">
              {structures.map((st, index) => {
                const structRate = rates?.structure?.[st.type]?.ratePerKw || 0;
                const structTotal = structRate * (Number(st.kw) || 0);
                return (
                  <div key={st.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative">
                    {structures.length > 1 && (
                      <button onClick={() => setStructures(structures.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 p-1">
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Sel label="Structure Type" id={`struct-type-${st.id}`} value={st.type}
                        onChange={v => {
                          const newSt = [...structures];
                          newSt[index].type = v;
                          setStructures(newSt);
                        }}>
                        {ALL_STRUCTURE_TYPES.map(opt => <option key={opt.v} value={opt.v} className="bg-[#0f172a]">{opt.l}</option>)}
                      </Sel>
                      <Inp label="Capacity (kW)" id={`struct-kw-${st.id}`} value={st.kw} type="number" min={0.1}
                        onChange={v => {
                          const newSt = [...structures];
                          newSt[index].kw = v;
                          setStructures(newSt);
                        }} />
                    </div>
                    {st.type.startsWith("ground") && (
                      <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-200">
                        <strong>Note:</strong> Ground Mounted pricing & design is finalized only after Department & Sand Quality Testing.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Dynamic Cabling */}
          {/* Section 5: Wiring & Cabling */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-[#FECB00]" />
              <div>
                <h2 className="text-lg font-bold text-white">5. Wiring & Cabling (Conductor/Size Matrix)</h2>
                <p className="text-white/40 text-xs mt-0.5">Configure DC cabling runs and AC cabling specifications.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {/* DC Cable Multi-Item Support */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-sm font-bold text-white/80">DC Side Cabling</p>
                      <p className="text-[11px] text-white/40">Add multiple DC cable runs</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDcCablesList([...dcCablesList, { id: Date.now(), brand: "polycab", cableId: rates?.dcCables?.[0]?._id || "", meters: "" }])}
                      className="px-2.5 py-1 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors"
                    >
                      + Add DC Cable
                    </button>
                  </div>

                  <div className="space-y-3">
                    {dcCablesList.map((item, index) => {
                      const selCable = rates?.dcCables?.find(c => c._id === item.cableId) || rates?.dcCables?.[0];
                      const itemRate = selCable?.ratePerMeter || 0;
                      const itemMeters = Number(item.meters) || 0;
                      const itemTotal = itemRate * itemMeters;
                      const currentBrandObj = CABLE_BRANDS.find(b => b.v === item.brand) || CABLE_BRANDS[0];

                      return (
                        <div key={item.id || index} className="space-y-3 bg-white/5 border border-white/10 p-3.5 rounded-xl relative">
                          {dcCablesList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setDcCablesList(dcCablesList.filter((_, i) => i !== index))}
                              className="absolute top-2 right-2 text-white/30 hover:text-red-400 p-1 text-sm font-bold leading-none"
                              title="Remove this DC cable run"
                            >
                              ×
                            </button>
                          )}
                          <div className="text-[11px] font-bold text-[#FECB00]/80 uppercase tracking-wider">
                            DC Cable #{index + 1}
                          </div>
                          <Sel
                            label="DC Cable Brand"
                            id={`dc-cable-brand-${index}`}
                            value={item.brand}
                            onChange={v => {
                              const updated = [...dcCablesList];
                              updated[index] = { ...updated[index], brand: v };
                              setDcCablesList(updated);
                            }}
                          >
                            {CABLE_BRANDS.map(b => (
                              <option key={b.v} value={b.v} className="bg-[#0f172a]">{b.l}</option>
                            ))}
                          </Sel>
                          <Sel
                            label="DC Cable Size (Conductor)"
                            id={`dc-cable-${index}`}
                            value={item.cableId || (rates?.dcCables?.[0]?._id || "")}
                            onChange={v => {
                              const updated = [...dcCablesList];
                              updated[index] = { ...updated[index], cableId: v };
                              setDcCablesList(updated);
                            }}
                          >
                            {rates?.dcCables?.map(c => (
                              <option key={c._id} value={c._id} className="bg-[#0f172a]">{c.label}</option>
                            ))}
                          </Sel>
                          <Inp
                            label="DC Cable Run Length"
                            id={`dc-run-${index}`}
                            value={item.meters}
                            onChange={v => {
                              const updated = [...dcCablesList];
                              updated[index] = { ...updated[index], meters: v };
                              setDcCablesList(updated);
                            }}
                            type="number"
                            min={0}
                            unit="m"
                          />
                          <div className="flex items-center justify-between pt-1 border-t border-white/5 flex-wrap gap-1">
                            <span className="text-[11px] text-white/50">{currentBrandObj?.l} · {selCable?.label || "DC Cable"}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Inverter to ACDB */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white/80">Inverter to ACDB (AC)</p>
                    <p className="text-[11px] text-white/40">Inverter to AC distribution board</p>
                  </div>
                  <DynamicCableSelector label="Inv-ACDB" cables={rates?.acCables} selectedId={invToAcdbCableId} onChange={setInvToAcdbCableId} brand={invToAcdbCableBrand} onBrandChange={setInvToAcdbCableBrand} />
                </div>
                <Inp label="Run Length" id="inv-acdb-run" value={invToAcdbCableM} onChange={setInvToAcdbCableM} type="number" min={0} unit="m" />
              </div>

              {/* ACDB to Main */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white/80">ACDB to Main (AC)</p>
                    <p className="text-[11px] text-white/40">ACDB to main LT panel / meter</p>
                  </div>
                  <DynamicCableSelector label="ACDB-Main" cables={rates?.acCables} selectedId={acdbToMainCableId} onChange={setAcdbToMainCableId} brand={acdbToMainCableBrand} onBrandChange={setAcdbToMainCableBrand} />
                </div>
                <Inp label="Run Length" id="acdb-main-run" value={acdbToMainCableM} onChange={setAcdbToMainCableM} type="number" min={0} unit="m" />
              </div>
            </div>
          </section>

          {/* Section 6: BOS Accessories & Quantity Overrides */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-[#FECB00]" />
              <h2 className="text-lg font-bold text-white">6. BOS & Accessories (Override Quantity Support)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* Earthing Pits & Conductor */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Chk label="Earthing" id="earthing-check" checked={earthing} onChange={handleEarthingChange} />
                {earthing && (
                  <div className="pt-2 space-y-2.5">
                    <Sel label="Earthing Conductor Type" id="earthing-type" value={earthingType} onChange={handleEarthingTypeChange}>
                      {EARTHING_OPTS.map(o => <option key={o.v} value={o.v} className="bg-[#0f172a]">{o.l}</option>)}
                    </Sel>

                    {earthingType === "copper_wire" && (
                      <Sel 
                        label="Copper Wire Size (sqmm)" 
                        id="earthing-wire-size" 
                        value={earthingWireSize} 
                        onChange={setEarthingWireSize}
                      >
                        {(EARTHING_WIRE_SIZES.copper_wire || []).map(sz => (
                          <option key={sz} value={sz} className="bg-[#0f172a]">{sz} sqmm</option>
                        ))}
                      </Sel>
                    )}

                    <Inp 
                      label="Earthing Wire Run Length" 
                      id="earthing-wire-m" 
                      value={earthingWireM} 
                      onChange={setEarthingWireM} 
                      type="number" 
                      min={0} 
                      unit="m" 
                      placeholder="e.g. 50" 
                    />

                    <Inp label="No. of Chemical Earthing Pits" id="pits-qty" value={customPits}
                      onChange={(v) => { setIsOverridePits(true); setCustomPits(v); }}
                      type="number" min={0} />
                    {isOverridePits && (
                      <button onClick={() => setIsOverridePits(false)} className="text-[10px] text-[#FECB00]/70 hover:underline">
                        Reset to default (3 pits)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ACDB & DCDB Combiner Boxes & DG Synchronization */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-4">
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Combiner & Grid Interfacing</p>
                <div className="space-y-3">
                  <Chk label="ACDB Combiner Required" id="acdb-check" checked={acdb} onChange={setAcdb} />
                  <Chk label="DCDB Combiner Required" id="dcdb-check" checked={dcdb} onChange={setDcdb} />
                  <div className="pt-2 border-t border-white/5">
                    <Chk label="DG Synchronisation Required" id="dg-sync" checked={dgSync} onChange={setDgSync} />
                  </div>
                </div>
              </div>

              {/* Lightning Arrestor */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Sel label="Lightning Arrestor" id="la-opt" value={laType} onChange={handleLAChange}>
                  {LA_OPTS.map(o => <option key={o.v} value={o.v} className="bg-[#0f172a]">{o.l}</option>)}
                </Sel>
                {laType !== "none" && (
                  <div className="pt-2 space-y-2">
                    <Inp label="No. of LA Units" id="la-qty" value={customLA}
                      onChange={(v) => { setIsOverrideLA(true); setCustomLA(v); }}
                      type="number" min={0} />
                    {isOverrideLA && (
                      <button onClick={() => setIsOverrideLA(false)} className="text-[10px] text-[#FECB00]/70 hover:underline">
                        Reset to calculated default ({defaultLA} units)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Safety Line */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Chk label="Safety Line Required" id="safety-check" checked={safetyLine} onChange={handleSafetyChange} />
                {safetyLine && (
                  <div className="pt-2 space-y-2">
                    <Inp label="Safety Line (Meters)" id="safety-qty" value={customSafety}
                      onChange={(v) => { setIsOverrideSafety(true); setCustomSafety(v); }}
                      type="number" min={0} unit="m" />
                    {isOverrideSafety && (
                      <button onClick={() => setIsOverrideSafety(false)} className="text-[10px] text-[#FECB00]/70 hover:underline">
                        Reset to calculated default ({defaultSafety}m)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Walkway System */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Chk label="Walkway Required" id="walkway-check" checked={walkway} onChange={handleWalkwayChange} />
                {walkway && (
                  <div className="pt-2 space-y-2">
                    <Sel label="Walkway Material" id="walkway-type" value={walkwayType} onChange={setWalkwayType}>
                      {WALKWAY_OPTS.map(o => <option key={o.v} value={o.v} className="bg-[#0f172a]">{o.l}</option>)}
                    </Sel>
                    <Inp label="Walkway Length (Meters)" id="walkway-qty" value={walkwayM} onChange={setWalkwayM} type="number" min={0} unit="m" placeholder="e.g. 20" />
                  </div>
                )}
              </div>

              {/* Conduiting & Cable Trays */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Chk label="Conduiting / Cable Trays Required" id="conduit-check" checked={conduit} onChange={setConduit} />
                {conduit && (
                  <div className="pt-2 space-y-2.5">
                    <Inp 
                      label="uPVC Conduit Pipe (Meters)" 
                      id="conduit-upvc-m" 
                      value={conduitUpvcM} 
                      onChange={setConduitUpvcM} 
                      type="number" 
                      min={0} 
                      unit="m" 
                      placeholder="e.g. 30" 
                    />
                    <Inp 
                      label="GI Cable Tray (Meters)" 
                      id="cable-tray-m" 
                      value={cableTrayM} 
                      onChange={setCableTrayM} 
                      type="number" 
                      min={0} 
                      unit="m" 
                      placeholder="e.g. 15" 
                    />
                  </div>
                )}
              </div>

              {/* MC4 & Branch Connectors */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-4">
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider">MC4 Connectors</p>
                <Inp label="Normal MC4 Connectors (Pairs)" id="mc4-pairs" value={mc4Pairs} onChange={setMc4Pairs} type="number" min={0} unit="pairs" />
                <Inp label="Branch (Y) Connectors (Nos)" id="mc4-branch-qty" value={mc4BranchQty} onChange={setMc4BranchQty} type="number" min={0} unit="nos" />
              </div>

              {/* Additional Inclusions */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3 sm:col-span-2 mt-4">
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Standard Quotation Inclusions (Print Only)</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <Chk label="Wiring & BOS Accessories" id="inc-bos" checked={incBos} onChange={setIncBos} />
                  <Chk label="Engineering & Supervision" id="inc-eng" checked={incEng} onChange={setIncEng} />
                  <Chk label="Remote Monitoring" id="inc-mon" checked={incMon} onChange={setIncMon} />
                  <Chk label="Transportation & Freight" id="inc-trans" checked={incTrans} onChange={setIncTrans} />
                  <Chk label="Only Nut Bolts" id="inc-nuts" checked={incNuts} onChange={setIncNuts} />
                </div>

                {/* Turnkey Format / Hide Itemized Pricing Toggle */}
                <div className="pt-3 mt-3 border-t border-white/10 bg-amber-500/10 -mx-4 -mb-4 p-4 rounded-b-xl border-amber-500/20">
                  <Chk
                    label="Hide Itemized Pricing on Proposal (Turnkey Lump-Sum Format / Single PO Summary)"
                    id="hide-itemized-pricing"
                    checked={hideItemizedPricing}
                    onChange={setHideItemizedPricing}
                  />
                  <p className="text-[11px] text-amber-300/80 ml-8 mt-1">
                    When checked, individual component prices are completely hidden in the PDF proposal. A technical BOM with specifications and a single turnkey purchase order summary with taxable value, GST, and total amount in words will be printed.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3 max-w-md">
                <Chk label="DISCOM approval & Net Metering" id="discom-check" checked={discom} onChange={setDiscom} />
                {discom && (
                  <div className="pt-2">
                    <Sel label="Connection Type" id="discom-type" value={discomType} onChange={setDiscomType}>
                      <option value="single_phase" className="bg-[#0f172a]">Single Phase</option>
                      <option value="three_phase" className="bg-[#0f172a]">Three Phase</option>
                      <option value="lt" className="bg-[#0f172a]">LT</option>
                      <option value="ht" className="bg-[#0f172a]">HT</option>
                    </Sel>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Milestones Schedule (Salesperson on-the-fly customization) */}
            <div className="pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-bold text-white/90">Payment Milestones Schedule (% of Project Value)</p>
                  <p className="text-[11px] text-white/40">Adjust milestone percentages for this quotation (printed on proposal)</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAdvancePercent(rates?.financialSettings?.advancePaymentPercent ?? 10);
                    setDispatchPercent(rates?.financialSettings?.dispatchPaymentPercent ?? 85);
                    setHandoverPercent(rates?.financialSettings?.handoverPaymentPercent ?? 5);
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#FECB00]/80 hover:text-[#FECB00] hover:bg-white/10 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
                <Inp
                  label="1. Before Material Dispatch"
                  id="adv-percent"
                  value={advancePercent}
                  onChange={v => setAdvancePercent(v)}
                  type="number"
                  min={0}
                  max={100}
                  unit="%"
                />
                <Inp
                  label="2. Before Material Dispatch"
                  id="disp-percent"
                  value={dispatchPercent}
                  onChange={v => setDispatchPercent(v)}
                  type="number"
                  min={0}
                  max={100}
                  unit="%"
                />
                <Inp
                  label="3. On the Date of Commissioning"
                  id="hand-percent"
                  value={handoverPercent}
                  onChange={v => setHandoverPercent(v)}
                  type="number"
                  min={0}
                  max={100}
                  unit="%"
                />
              </div>

              <div className="flex items-center justify-between text-xs px-1 pt-1">
                <span className="text-white/40">
                  Total Milestone: <strong className={((Number(advancePercent)||0) + (Number(dispatchPercent)||0) + (Number(handoverPercent)||0)) === 100 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {((Number(advancePercent)||0) + (Number(dispatchPercent)||0) + (Number(handoverPercent)||0))}%
                  </strong>
                  {((Number(advancePercent)||0) + (Number(dispatchPercent)||0) + (Number(handoverPercent)||0)) !== 100 && (
                    <span className="text-amber-400/80 ml-1.5">(Target: 100%)</span>
                  )}
                </span>
                {calc && (
                  <span className="text-[#FECB00] text-[11px] font-semibold">
                    Adv: {formatINR(calc.advanceAmount)} | Disp: {formatINR(calc.dispatchAmount)} | Comm: {formatINR(calc.handoverAmount)}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Exact Client Requirements (Custom Scope)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FECB00]/20 text-[#FECB00] font-bold">Salesperson Input</span>
                </p>
                <p className="text-xs text-white/50 mt-0.5">Type specific customer conditions, special client scope, or site notes for this quotation.</p>
              </div>
              <textarea
                value={customTerms}
                onChange={(e) => setCustomTerms(e.target.value)}
                placeholder="e.g.&#10;1. AC cabling beyond 30 meters to be provided by client.&#10;2. Civil masonry, earthing pit trenching & water connection by customer.&#10;3. Plant delivery timeline subject to roof clearance."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all min-h-[100px] resize-y leading-relaxed"
              />
            </div>
          </section>
        </div>

        {/* RIGHT: Live Cost breakdown preview & Commercial Controls */}
        {/* RIGHT: Live Cost breakdown preview & Commercial Controls */}
        <div className="space-y-6">
          {/* Commercial & Negotiation Discount Card */}
          <div className="rounded-2xl border border-[#FECB00]/20 bg-[#FECB00]/5 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FECB00] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4" />
                Negotiation Discount
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FECB00]/20 text-[#FECB00] font-bold">
                Max Cap: {calc?.maxDiscountPercent || 5}%
              </span>
            </div>

            {/* Negotiation Discount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/70 font-semibold">Special Discount</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md text-xs">
                  {discountPercent}% {calc && calc.discountAmount > 0 ? `(-${formatINR(calc.discountAmount)})` : ""}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={calc?.maxDiscountPercent || 5}
                step="0.5"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full accent-[#FECB00] cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-medium">
                <span>0% (Standard Rate)</span>
                <span className="text-[#FECB00]/70">Max Limit: {calc?.maxDiscountPercent || 5}%</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown Preview Sticky Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6 sticky top-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <DocumentArrowDownIcon className="w-5 h-5 text-[#FECB00]" />
              Cost Breakdown Preview
            </h3>

            {!calc ? (
              <p className="text-sm text-white/40">Enter system size and configure components to see quotation.</p>
            ) : (
              <>
                {/* Dynamic Items */}
                <div className="space-y-3 text-sm border-b border-white/10 pb-4">
                  {[
                    ...((calc.selectedModuleDetails || []).length > 0
                      ? calc.selectedModuleDetails.map((mod, i) => ({
                        l: `Solar Module ${i + 1} (${cap(mod.brand)} ${mod.modelName}) [${mod.kw}kWp]`,
                        v: mod.cost
                      }))
                      : [{ l: `Solar Modules (Not Selected)`, v: 0 }]
                    ),
                    ...((calc.selectedInverterDetails || []).length > 0
                      ? calc.selectedInverterDetails.map((inv, i) => ({
                        l: `Inverter ${i + 1} (${inv.modelName}) x${inv.qty}`, v: inv.cost
                      }))
                      : [{ l: `Inverter (Not Selected)`, v: 0 }]
                    ),
                    ...((calc.selectedBatteryDetails || []).map((bat, i) => ({
                      l: `Battery ${i + 1} (${cap(bat.brand)} ${bat.modelName}) x${bat.qty}`, v: bat.cost
                    }))),
                    ...(calc.selectedStructures?.length > 0
                      ? calc.selectedStructures.map((st, i) => ({
                        l: `Structure ${i + 1} (${ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || 'Structure'}) [${st.kw}kW]`,
                        v: st.cost
                      }))
                      : [{ l: 'Mounting Structure (Not Selected)', v: 0 }]
                    ),
                    ...(calc.selectedDcCablesDetails?.filter(item => item.cost > 0).map((item, idx) => ({
                      l: `DC Cabling #${idx + 1} (${item.brandLabel} · ${item.cableLabel}, ${item.meters}m)`,
                      v: item.cost
                    })) || []),
                    { l: `AC Cabling: Inv to ACDB (${CABLE_BRANDS.find(b => b.v === invToAcdbCableBrand)?.l || cap(invToAcdbCableBrand)} · ${calc.selInvToAcdbCable?.label || "None"}, ${invToAcdbCableM}m)`, v: calc.invToAcdbCost },
                    { l: `AC Cabling: ACDB to Main (${CABLE_BRANDS.find(b => b.v === acdbToMainCableBrand)?.l || cap(acdbToMainCableBrand)} · ${calc.selAcdbToMainCable?.label || "None"}, ${acdbToMainCableM}m)`, v: calc.acdbToMainCost },
                    ...(calc.pitsCost > 0 ? [{ l: `Chemical Earthing (${calc.pitsCount} pits)`, v: calc.pitsCost }] : []),
                    ...(calc.earthingWireCost > 0 ? [{ l: `Earthing Wire (${calc.earthingLabel}, ${calc.earthingWireMeters}m)`, v: calc.earthingWireCost }] : []),
                    { l: `Lightning Arrestor (${calc.laCount} units, ${cap(laType)})`, v: calc.laCost },
                    { l: `Walkway (${walkwayM}m, ${walkwayType === "gi" ? "GI" : "FRP"})`, v: calc.walkCost },
                    { l: `Safety Line (${customSafety}m)`, v: calc.safetyCost },
                    ...(calc.conduitUpvcCost > 0 ? [{ l: `uPVC Conduit Pipe (${calc.conduitUpvcMeters}m)`, v: calc.conduitUpvcCost }] : []),
                    ...(calc.cableTrayCost > 0 ? [{ l: `GI Cable Tray (${calc.cableTrayMeters}m)`, v: calc.cableTrayCost }] : []),
                    ...(calc.acdbCost ? [{ l: `ACDB Combiner`, v: calc.acdbCost }] : []),
                    ...(calc.dcdbCost ? [{ l: `DCDB Combiner`, v: calc.dcdbCost }] : []),
                    ...(calc.mc4Cost ? [{ l: `MC4 Connectors`, v: calc.mc4Cost }] : []),
                    ...(calc.mc4BranchCost ? [{ l: `Branch (Y) Connectors`, v: calc.mc4BranchCost }] : []),
                    { l: `DISCOM / Net Metering (${discomType === 'single_phase' ? 'Single Phase' : discomType === 'three_phase' ? 'Three Phase' : discomType === 'lt' ? 'LT' : 'HT'})`, v: calc.discomCost },
                    { l: "Installation & Commissioning", v: calc.installCost },
                  ].filter(i => i.v > 0).map(i => (
                    <div key={i.l} className="flex justify-between items-start gap-4">
                      <span className="text-white/60 text-xs leading-relaxed">{i.l}</span>
                      <span className="text-white font-medium whitespace-nowrap">{formatINR(i.v)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Base Plant Cost</span>
                    <span className="text-white font-medium">{formatINR(calc.markedUpBase)}</span>
                  </div>

                  {calc.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium text-xs">
                      <span>Discount ({calc.effectiveDiscountPercent}%)</span>
                      <span>- {formatINR(calc.discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white/70 text-xs">
                    <span>Taxable Subtotal</span>
                    <span>{formatINR(calc.baseTotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">GST ({calc.gstPercent}%)</span>
                    <span className="text-white font-medium">{formatINR(calc.gst)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-white font-bold text-base">Total Quotation</span>
                    <span className="text-xl font-black" style={{ color: "#FECB00" }}>{formatINR(calc.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1"><span className="text-white/50">System Size</span><span className="text-white/80 font-bold">{effectiveSystemKW || 0} kWp</span></div>
                  <div className="flex justify-between text-xs"><span className="text-white/50">Cost per Watt</span><span className="text-white/80 font-bold">₹{(calc.perWp || 0).toFixed(2)}/Wp</span></div>
                </div>

                {/* PDF & Print Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] px-1 text-white/50">
                    <span>Quotation Format:</span>
                    <span className={hideItemizedPricing ? "text-[#FECB00] font-bold" : "text-white/80 font-medium"}>
                      {hideItemizedPricing ? "Turnkey Lump-Sum (Prices Hidden)" : "Detailed Itemized"}
                    </span>
                  </div>
                  <button onClick={handleDownloadPDF} disabled={pdfLoading}
                    className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}>
                    {pdfLoading ? (
                      <><span className="w-4 h-4 border-2 border-[#0a1122]/30 border-t-[#0a1122] rounded-full animate-spin" />Generating PDF...</>
                    ) : (
                      <><DocumentArrowDownIcon className="w-5 h-5" />Download PDF File</>
                    )}
                  </button>
                  <button onClick={() => window.print()}
                    className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-[#FECB00]/30 text-[#FECB00] hover:bg-[#FECB00]/10">
                    <PrinterIcon className="w-5 h-5" />
                    Print / Save via Browser
                  </button>
                </div>

                {/* Payment Milestones Schedule */}
                <div className="rounded-xl bg-white/3 border border-white/5 p-4 space-y-2">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">
                    Payment Milestones Schedule
                  </p>
                  {[
                    { l: "Before Material Dispatch", p: calc.advancePercent, v: calc.advanceAmount },
                    { l: "Material Dispatch", p: calc.dispatchPercent, v: calc.dispatchAmount },
                    { l: "On the Date of Commissioning", p: calc.handoverPercent, v: calc.handoverAmount }
                  ].map(s => (
                    <div key={s.l} className="flex justify-between text-xs">
                      <span className="text-white/60">{s.l} ({s.p}%)</span>
                      <span className="text-white font-medium">{formatINR(s.v)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── PRINT ONLY: Clean business-letterhead PDF quotation ─── */}
      {calc && (
        <div className="print-only print-container bg-white text-slate-800 p-8 max-w-4xl mx-auto border border-gray-200 shadow-sm rounded-md" ref={printRef}>
          {/* Letterhead Header */}
          <div className="flex justify-between items-center border-b-[2.5px] border-[#eab308] pb-4 mb-6">
            <div className="flex-shrink-0 w-[200px]">
              <img src="/divvy_photo.png" alt="Divvy Solar Logo" className="w-[190px] h-auto object-contain block" />
            </div>
            <div className="flex-grow text-center px-3">
              <h1 className="text-[15px] font-extrabold text-[#1e3a8a] uppercase tracking-wide m-0">
                DIVVY SOLAR Power &amp; SOLUTIONS Pvt. Ltd
              </h1>
              <p className="text-[9px] font-bold text-slate-800 mt-1">
                {(DIVVY_BRANCH_OFFICES[issuingBranch] || DIVVY_BRANCH_OFFICES.gurgaon).addr1}
              </p>
              <p className="text-[8.5px] text-slate-500 mt-0.5 leading-relaxed">
                {(DIVVY_BRANCH_OFFICES[issuingBranch] || DIVVY_BRANCH_OFFICES.gurgaon).addr2}
              </p>
            </div>
            <div className="flex-shrink-0 w-[180px] text-right">
              <h2 className="text-[11px] font-black text-[#eab308] uppercase tracking-wide">
                {projectCategory === "residential"
                  ? "RESIDENTIAL SOLAR PROPOSAL"
                  : projectCategory === "industrial"
                    ? "INDUSTRIAL / C&I SOLAR PROPOSAL"
                    : "UTILITY-SCALE SOLAR PROPOSAL"}
              </h2>
              <p className="text-[9px] text-slate-600 mt-1"><strong>Quote Ref:</strong> {quoteRef || `DS/QP/${new Date().getFullYear()}/---`}</p>
              <p className="text-[9px] text-slate-600"><strong>Date:</strong> {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p className="text-[9px] text-slate-600"><strong>Prepared By:</strong> {salespersonName || "Divvy Solar Representative"}{salespersonPhone ? ` (${salespersonPhone})` : ""}</p>
            </div>
          </div>

          {/* Client Info & System Specs */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Client Details */}
            <div className="border border-slate-300 bg-slate-50/30 rounded-lg p-3 space-y-1">
              <h3 className="text-[10px] font-bold text-[#1e3a8a] uppercase border-b-2 border-[#eab308] pb-1.5 mb-2 tracking-wider">Client Details</h3>
              <p className="text-xs text-slate-700"><strong>Client / Org:</strong> {clientName || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Contact:</strong> {clientPhone || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Site Location:</strong> {clientLocation || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Quotation Prepared By:</strong> {salespersonName || "Divvy Solar Representative"}{salespersonPhone ? ` | Mob: ${salespersonPhone}` : ""}</p>
              <p className="text-xs text-slate-700"><strong>Connected Grid Load:</strong> {connectedLoad ? `${connectedLoad} kW` : "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Type of Roof:</strong> {ROOF_TYPES.find(r => r.v === roofType)?.l || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>DG Synchronization:</strong> {dgSync ? "Required" : "Not Required"}</p>
            </div>

            {/* System Technical Specifications */}
            <div className="border border-slate-300 bg-slate-50/30 rounded-lg p-3 space-y-1">
              <h3 className="text-[10px] font-bold text-[#1e3a8a] uppercase border-b-2 border-[#eab308] pb-1.5 mb-2 tracking-wider">Technical Specifications</h3>
              <p className="text-xs text-slate-700"><strong>System Type:</strong> {systemType === 'hybrid' ? 'Hybrid' : 'On-Grid'}</p>
              <p className="text-xs text-slate-700"><strong>Proposed Capacity:</strong> {effectiveSystemKW || 0} kWp (Solar PV Plant)</p>
              <p className="text-xs text-slate-700"><strong>Solar Modules:</strong> {calc.selectedModuleDetails?.map(m => `${cap(m.brand)} ${m.modelName} (${m.kw}kWp, ${m.panels} panels)`).join(", ") || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Inverter Model:</strong> {calc.selectedInverterDetails?.map(inv => `${inv.modelName} (x${inv.qty})`).join(", ") || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Mounting Structure:</strong> {calc.selectedStructures?.map(st => `${ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || 'Structure'} (${st.kw}kW)`).join(", ") || "N/A"}</p>
              {calc.selectedDcCablesDetails?.filter(item => item.meters > 0).length > 0 && (
                <p className="text-xs text-slate-700">
                  <strong>DC Cable Run:</strong> {calc.selectedDcCablesDetails.filter(item => item.meters > 0).map(item => `${item.meters}m of ${item.cableLabel} (${item.brandLabel})`).join(", ")}
                </p>
              )}
              <p className="text-xs text-slate-700"><strong>AC Cable (Inv-ACDB):</strong> {invToAcdbCableM}m of {calc.selInvToAcdbCable?.label || "N/A"} ({CABLE_BRANDS.find(b => b.v === invToAcdbCableBrand)?.l || cap(invToAcdbCableBrand)})</p>
              <p className="text-xs text-slate-700"><strong>AC Cable (ACDB-Main):</strong> {acdbToMainCableM}m of {calc.selAcdbToMainCable?.label || "N/A"} ({CABLE_BRANDS.find(b => b.v === acdbToMainCableBrand)?.l || cap(acdbToMainCableBrand)})</p>
              {walkway && Number(walkwayM) > 0 && (
                <p className="text-xs text-slate-700"><strong>Roof Walkway:</strong> {walkwayM}m of {walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}</p>
              )}
              {calc.pitsCount > 0 && (
                <p className="text-xs text-slate-700"><strong>Earthing System:</strong> {calc.pitsCount} Pits of {calc.earthingLabel}</p>
              )}
            </div>
          </div>

          {!hideItemizedPricing ? (
            <>
              {/* Itemized Cost Details Table */}
              <table className="min-w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-[#1e3a8a]">
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-center w-[40px]">S.No</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-left">Particulars / Components</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-center w-[80px]">Qty / Size</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-center w-[50px]">Unit</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-right w-[100px]">Unit Rate</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-right w-[120px]">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {(() => {
                    let sno = 1;
                    return (
                      <>
                        {calc.selectedModuleDetails?.length > 0 ? calc.selectedModuleDetails.map((mod, idx) => (
                          <tr key={`print-mod-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Solar Modules ({cap(mod.brand)}):</strong> {mod.modelName || "N/A"} <br />
                              <span className="text-[10px] text-slate-500">Tier-1 High-efficiency PV modules ({mod.wattage}Wp)</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{mod.itemWp}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Wp</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(mod.ratePerWp || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(mod.cost)}</td>
                          </tr>
                        )) : (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Solar Modules:</strong> Not Selected <br />
                              <span className="text-[10px] text-slate-500">Tier-1 High-efficiency PV modules</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{(effectiveSystemKW || 0) * 1000}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Wp</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0.00</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0</td>
                          </tr>
                        )}
                        {calc.selectedInverterDetails?.length > 0 ? calc.selectedInverterDetails.map((inv, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Solar Grid-Tie Inverter:</strong> {inv.modelName} <br />
                              <span className="text-[10px] text-slate-500">Multi-MPPT High-efficiency inverter system</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{inv.qty}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(inv.cost / (inv.qty || 1)).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(inv.cost)}</td>
                          </tr>
                        )) : (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Solar Grid-Tie Inverters ({effectiveSystemKW || 0} kW):</strong> N/A <br />
                              <span className="text-[10px] text-slate-500">Multi-MPPT High-efficiency inverter system</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0</td>
                          </tr>
                        )}
                        {calc.selectedBatteryDetails?.map((bat, idx) => (
                          <tr key={`print-bat-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Battery Storage System ({cap(bat.brand)}):</strong> {bat.modelName} <br />
                              <span className="text-[10px] text-slate-500">Deep-cycle energy storage bank</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{bat.qty}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(bat.cost / (bat.qty || 1)).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(bat.cost)}</td>
                          </tr>
                        ))}
                        {calc.acdbCost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>ACDB Combiner / Panel</strong> <br />
                              <span className="text-[10px] text-slate-500">L&T / Elmex / Schneider / Reputed Make</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.acdbRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.acdbCost)}</td>
                          </tr>
                        )}
                        {calc.dcdbCost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>DCDB Combiner / Panel</strong> <br />
                              <span className="text-[10px] text-slate-500">Reputed Make</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.dcdbRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.dcdbCost)}</td>
                          </tr>
                        )}
                        {calc.selectedStructures?.map((st, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Mounting Structure:</strong> {ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A"} <br />
                              <span className="text-[10px] text-slate-500">Wind load sustained structural rails & clamps</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{st.kw}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(st.rate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(st.cost)}</td>
                          </tr>
                        ))}
                        <tr className="hover:bg-slate-50">
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                            <strong>Structure Accessories:</strong> SS 304 Nut Bolts & Fasteners <br />
                            <span className="text-[10px] text-slate-500">Anti-corrosion hardware for mechanical integrity</span>
                          </td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                        </tr>

                        {calc.selectedDcCablesDetails?.map((item, idx) => {
                          if (item.meters <= 0) return null;
                          return (
                            <tr key={`print-dc-${idx}`} className="hover:bg-slate-50">
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                                <strong>DC Solar Cable ({item.brandLabel}):</strong> {item.cableLabel} <br />
                                <span className="text-[10px] text-slate-500">Tinned copper flexible single-core solar wire</span>
                              </td>
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{item.meters}</td>
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(item.rate || 0).toFixed(2)}</td>
                              <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(item.cost)}</td>
                            </tr>
                          );
                        })}
                        {invToAcdbCableM > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>AC Solar Cable - Inv to ACDB ({CABLE_BRANDS.find(b => b.v === invToAcdbCableBrand)?.l || cap(invToAcdbCableBrand)}):</strong> {calc.selInvToAcdbCable?.label || "N/A"} <br />
                              <span className="text-[10px] text-slate-500">Multicore flexible AC cabling run</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{invToAcdbCableM}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.invToAcdbRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.invToAcdbCost)}</td>
                          </tr>
                        )}
                        {acdbToMainCableM > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>AC Solar Cable - ACDB to Main ({CABLE_BRANDS.find(b => b.v === acdbToMainCableBrand)?.l || cap(acdbToMainCableBrand)}):</strong> {calc.selAcdbToMainCable?.label || "N/A"} <br />
                              <span className="text-[10px] text-slate-500">AC distribution cable run</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{acdbToMainCableM}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.acdbToMainRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.acdbToMainCost)}</td>
                          </tr>
                        )}
                        {calc.pitsCount > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Chemical Earthing Pits:</strong> Copper Chemical Pits<br />
                              <span className="text-[10px] text-slate-500">Low-resistance maintenance-free earthing connection</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.pitsCount}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">pits</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.pitRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.pitsCost)}</td>
                          </tr>
                        )}
                        {calc.earthingWireMeters > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Earthing Conductor / Wire:</strong> {calc.earthingLabel}<br />
                              <span className="text-[10px] text-slate-500">Dedicated equipment safety grounding run</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.earthingWireMeters}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.earthingWireRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.earthingWireCost)}</td>
                          </tr>
                        )}
                        {calc.laCount > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Lightning Protection System:</strong> {laType === "ese" ? "ESE Active Lightning Arrestor" : "Conventional Lightning Arrestor"}<br />
                              <span className="text-[10px] text-slate-500">Safety shield against high-voltage lightning surges</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.laCount}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">units</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.laUnitRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.laCost)}</td>
                          </tr>
                        )}
                        {walkway && Number(walkwayM) > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Roof Walkway:</strong> {walkwayType === "gi" ? "GI Steel Grating Walkway" : "FRP Anti-corrosion Walkway"}<br />
                              <span className="text-[10px] text-slate-500">Safe pathway on roof for standard O&M visits</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{walkwayM}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.walkRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.walkCost)}</td>
                          </tr>
                        )}
                        {customSafety > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Safety Lifeline:</strong> Stainless steel safety lifeline cable for maintenance safety<br />
                              <span className="text-[10px] text-slate-500">Anchor lifeline system for cleaning personnel</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{customSafety}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.safetyLineRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.safetyCost)}</td>
                          </tr>
                        )}
                        {calc.mc4Cost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>MC4 Connectors:</strong> High resistance waterproof module connection pairs<br />
                              <span className="text-[10px] text-slate-500">Waterproof module string connector links</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.mc4Pairs}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">pairs</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.mc4Rate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.mc4Cost)}</td>
                          </tr>
                        )}
                        {calc.mc4BranchCost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Branch (Y) Connectors:</strong> High resistance waterproof parallel connections<br />
                              <span className="text-[10px] text-slate-500">Parallel string configuration connectors</span>
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.mc4BranchQty}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">nos</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.branchRate || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.mc4BranchCost)}</td>
                          </tr>
                        )}
                        {incBos && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>BOS &amp; Accessories:</strong> Cable Lugs, Tape, Cable tie &amp; Conduit Pipe with accessories
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kWp</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          </tr>
                        )}
                        {incEng && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Engineering &amp; Supervision:</strong> String designing, Shadow Analysis, electrical design, and panel placement
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kWp</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          </tr>
                        )}
                        {incNuts && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Structure Hardware:</strong> Only Nut Bolts
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kWp</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          </tr>
                        )}
                        {incMon && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Remote Monitoring Access:</strong> Continuous monitoring through data logger device
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Set</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          </tr>
                        )}
                        {incTrans && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>Transportation &amp; Freight:</strong> Till site loading and unloading
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Job</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                          </tr>
                        )}
                        {discom && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                              <strong>DISCOM Liaising &amp; Net Metering:</strong> Net-metering approval process with local electricity authority
                            </td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">job</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.discomCost || 0).toFixed(2)}</td>
                            <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.discomCost)}</td>
                          </tr>
                        )}
                        <tr className="hover:bg-slate-50">
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                            <strong>Installation &amp; Commissioning ({roofType === "rcc" ? "Rooftop RCC" : roofType === "profile" ? "Shed" : roofType === "ground" ? "Ground-Mounted" : "Standard"}):</strong> On-site mechanics, engineering execution, panel staging, and commissioning
                          </td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{effectiveSystemKW}</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.installRate || 0).toFixed(2)}</td>
                          <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.installCost)}</td>
                        </tr>
                      </>
                    );
                  })()}
                </tbody>
              </table>

              {/* Totals Box (renders naturally below the table, moving to Page 2 if table overflows) */}
              <div className="flex justify-end mb-6 avoid-break">
                <div className="w-1/2 space-y-2 border-2 border-[#eab308] bg-[#fefcf0]/50 rounded-lg p-3">
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>Base Plant Cost:</span>
                    <span className="font-semibold text-slate-800">{formatINR(calc.markedUpBase)}</span>
                  </div>
                  {calc.discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                      <span>Negotiation Discount ({calc.effectiveDiscountPercent}%):</span>
                      <span>- {formatINR(calc.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>Taxable Subtotal:</span>
                    <span className="font-semibold text-slate-800">{formatINR(calc.baseTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>GST ({calc.gstPercent}%):</span>
                    <span className="font-semibold text-slate-800">{formatINR(calc.gst)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1e3a8a] border-t border-[#eab308] pt-2 font-black">
                    <span>Grand Total (Net Value):</span>
                    <span>{formatINR(calc.grandTotal)}</span>
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 text-right pt-1">
                    Average cost per watt: ₹{(calc.perWp || 0).toFixed(2)}/Wp (incl. GST)
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Technical BOM Table (Turnkey Format) */}
              <table className="min-w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-[#1e3a8a]">
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-center w-[36px]">S.No</th>
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-left w-[160px]">Material</th>
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-left">Technical Specifications</th>
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-left w-[130px]">Make / Brand</th>
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-center w-[45px]">Units</th>
                    <th className="text-[10px] font-bold text-white uppercase px-2.5 py-2 border border-[#1e3a8a] text-center w-[45px]">Qty</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {(() => {
                    let sno = 1;
                    return (
                      <>
                        {calc.selectedModuleDetails?.length > 0 ? calc.selectedModuleDetails.map((mod, idx) => (
                          <tr key={`turnkey-mod-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Solar PV Modules</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Tier-1 High Efficiency PV Modules ({mod.wattage}Wp, {mod.tech || 'Mono PERC/TopCon'})</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{cap(mod.brand)} / Reputed Tier-1 ({moduleWarranty || "25 Years"} Warranty)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{mod.panels || mod.qty}</td>
                          </tr>
                        )) : (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Solar PV Modules</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Tier-1 High Efficiency Solar PV Modules ({moduleWarranty || "25 Years"} Warranty)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Tier-1 Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Wp</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{(effectiveSystemKW || 0) * 1000}</td>
                          </tr>
                        )}
                        {calc.selectedInverterDetails?.map((inv, idx) => (
                          <tr key={`turnkey-inv-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Solar Inverter</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Grid-Tie / Hybrid Multi-MPPT Inverter System ({inv.modelName})</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{cap(inv.brand)} / Tier-1 ({inverterWarranty || "5 Years"} Warranty)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{inv.qty}</td>
                          </tr>
                        ))}
                        {calc.selectedBatteryDetails?.map((bat, idx) => (
                          <tr key={`turnkey-bat-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Battery Storage Bank</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Deep-Cycle Solar Battery Bank ({bat.modelName})</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{cap(bat.brand)} ({batteryWarranty || "5 Years"} Warranty)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{bat.qty}</td>
                          </tr>
                        ))}
                        {calc.acdbCost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">AC Distribution Box (ACDB)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">ACDB Combiner with MCB/MCCB, Surge Protection Device (SPD) & Fuses</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">L&T / Schneider / Elmex / Reputed</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Set</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        {calc.dcdbCost > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">DC Distribution Box (DCDB)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">DC Combiner Box with Class-1 DC Fuses & High surge arrestor SPD</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Set</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        {calc.selectedStructures?.map((st, idx) => (
                          <tr key={`turnkey-st-${idx}`} className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Module Mounting Structure</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "Mounting Structure"} (Engineered for wind resistance up to 150 kmph)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Standard Structural Grade</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">kWp</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{st.kw}</td>
                          </tr>
                        ))}
                        <tr className="hover:bg-slate-50">
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                          <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Structure Fasteners & Hardware</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">SS 304 / High tensile anti-corrosion nut bolts, clamps & brackets</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed Make</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Set</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                        </tr>
                        {calc.selectedDcCablesDetails?.map((item, idx) => {
                          if (item.meters <= 0) return null;
                          return (
                            <tr key={`turnkey-dc-${idx}`} className="hover:bg-slate-50">
                              <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                              <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">DC Solar Cable</td>
                              <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{item.cableLabel} (Single-core flexible tinned copper solar wire)</td>
                              <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{item.brandLabel || "Polycab / Siechem"}</td>
                              <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                              <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{item.meters}</td>
                            </tr>
                          );
                        })}
                        {invToAcdbCableM > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">AC Solar Cable (Inv to ACDB)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{calc.selInvToAcdbCable?.label || "Multicore flexible AC cabling run"}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{CABLE_BRANDS.find(b => b.v === invToAcdbCableBrand)?.l || cap(invToAcdbCableBrand)}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{invToAcdbCableM}</td>
                          </tr>
                        )}
                        {acdbToMainCableM > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">AC Solar Cable (ACDB to Main)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{calc.selAcdbToMainCable?.label || "Multicore distribution AC cable"}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{CABLE_BRANDS.find(b => b.v === acdbToMainCableBrand)?.l || cap(acdbToMainCableBrand)}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{acdbToMainCableM}</td>
                          </tr>
                        )}
                        {calc.pitsCount > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Chemical Earthing Pits</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Maintenance-free chemical copper earthing electrode with compound</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Pits</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{calc.pitsCount}</td>
                          </tr>
                        )}
                        {calc.earthingWireMeters > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Earthing Conductor</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{calc.earthingLabel} (Dedicated equipment & plant safety grounding)</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{calc.earthingWireMeters}</td>
                          </tr>
                        )}
                        {calc.laCount > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Lightning Protection System</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{laType === "ese" ? "ESE Active Early Streamer Emission Lightning Arrestor" : "Conventional Spike Lightning Arrestor"}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Nos</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{calc.laCount}</td>
                          </tr>
                        )}
                        {walkway && Number(walkwayM) > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Roof Walkway</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">{walkwayType === "gi" ? "GI Steel Grating Walkway" : "FRP Anti-corrosion Walkway"}</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Standard Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{walkwayM}</td>
                          </tr>
                        )}
                        {customSafety > 0 && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Safety Lifeline System</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Stainless steel lifeline wire rope with roof anchor brackets</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Standard Make</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Mtr</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{customSafety}</td>
                          </tr>
                        )}
                        {(calc.mc4Cost > 0 || calc.mc4BranchCost > 0) && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">MC4 & Branch Connectors</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">IP67 / IP68 UV resistant waterproof module string connectors</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Multi-Contact / Reputed</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Set</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">{(Number(calc.mc4Pairs) || 0) + (Number(calc.mc4BranchQty) || 0) > 0 ? (Number(calc.mc4Pairs) || 0) + (Number(calc.mc4BranchQty) || 0) : 1}</td>
                          </tr>
                        )}
                        {incBos && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">BOS Accessories & Wiring</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Cable ties, cable trays, PVC conduit pipes, copper lugs, glands & safety labels</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Reputed / Tier-1</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Lot</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        <tr className="hover:bg-slate-50">
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                          <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Installation, Testing & Commissioning</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Complete mechanical erection, electrical integration, string testing & commissioning ({roofType === "rcc" ? "Rooftop RCC" : roofType === "profile" ? "Shed" : roofType === "ground" ? "Ground-Mounted" : "Standard"})</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Divvy Solar Technical Team</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Job</td>
                          <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                        </tr>
                        {incEng && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Engineering & System Design</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">3D shadow analysis, string sizing, electrical SLD & technical supervision</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Divvy Solar Design Engineering</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Job</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        {incMon && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Remote Monitoring System</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">IoT Data logger device with cloud mobile application & web portal</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Inverter OEM / Divvy Solar</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Set</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        {incTrans && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">Transportation & Freight</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Safe transit, transit insurance, loading, transportation to site & unloading</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Divvy Solar Logistics</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Job</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                        {discom && (
                          <tr className="hover:bg-slate-50">
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-semibold">{sno++}</td>
                            <td className="text-xs text-slate-800 px-2.5 py-1.5 border border-slate-300 font-bold">DISCOM Liaising & Net Metering</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Net-metering application processing, grid feasibility and DISCOM coordination</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300">Divvy Solar Regulatory</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center">Job</td>
                            <td className="text-xs text-slate-700 px-2.5 py-1.5 border border-slate-300 text-center font-bold">1</td>
                          </tr>
                        )}
                      </>
                    );
                  })()}
                </tbody>
              </table>

              {/* Turnkey Commercial Purchase Order Table */}
              <table className="min-w-full border-collapse mb-4 avoid-break">
                <thead>
                  <tr className="bg-[#1e3a8a]">
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-center w-[40px]">S.No</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-left">Purchase Order For</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-right w-[120px]">Taxable Value</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-right w-[110px]">GST @ {calc.gstPercent}%</th>
                    <th className="text-[10px] font-bold text-white uppercase px-3 py-2 border border-[#1e3a8a] text-right w-[130px]">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="text-xs text-slate-700 px-3 py-3 border border-slate-300 text-center font-bold">1</td>
                    <td className="text-xs text-slate-800 px-3 py-3 border border-slate-300 font-semibold">
                      Complete Supply, Installation, Testing &amp; Commissioning of {effectiveSystemKW || 0} kWp Solar PV System @ ₹{Math.round(calc.perWp * 1000).toLocaleString('en-IN')}/- Per kWp
                      {calc.discountAmount > 0 && (
                        <div className="text-[10px] text-emerald-600 font-normal mt-0.5">Special discount of {calc.effectiveDiscountPercent}% applied</div>
                      )}
                    </td>
                    <td className="text-xs text-slate-700 px-3 py-3 border border-slate-300 text-right font-bold">{formatINR(calc.baseTotal)}</td>
                    <td className="text-xs text-slate-700 px-3 py-3 border border-slate-300 text-right font-bold">{formatINR(calc.gst)}</td>
                    <td className="text-xs text-[#1e3a8a] px-3 py-3 border border-slate-300 text-right font-black text-sm">{formatINR(calc.grandTotal)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Turnkey Amount in Words Banner */}
              <div className="bg-[#fefcf0] border-2 border-[#eab308] p-2.5 rounded-lg mb-6 text-center text-xs font-bold text-[#1e3a8a] uppercase tracking-wide avoid-break">
                ({inWords(Math.round(calc.grandTotal)).toUpperCase()} ONLY INCLUSIVE GST)
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200 mb-8 avoid-break">
            <div>
              <h4 className="text-xs font-bold text-[#1e3a8a] uppercase mb-2 tracking-wider">
                Payment Milestones Schedule
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li className="flex justify-between">
                  <span>1. Before Material Dispatch ({calc.advancePercent}%):</span>
                  <span className="font-bold">{formatINR(calc.advanceAmount)}</span>
                </li>
                <li className="flex justify-between">
                  <span>2. Material Dispatch ({calc.dispatchPercent}%):</span>
                  <span className="font-bold">{formatINR(calc.dispatchAmount)}</span>
                </li>
                <li className="flex justify-between">
                  <span>3. On the Date of Commissioning ({calc.handoverPercent}%):</span>
                  <span className="font-bold">{formatINR(calc.handoverAmount)}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#1e3a8a] uppercase mb-2 tracking-wider">Terms &amp; Conditions</h4>
              <ul className="text-[10px] text-slate-600 list-disc list-inside space-y-1">
                {(() => {
                  const modW = (moduleWarranty && moduleWarranty.trim()) ? (moduleWarranty.toLowerCase().includes('year') ? moduleWarranty : `${moduleWarranty} Years`) : '25 Years';
                  const invW = (inverterWarranty && inverterWarranty.trim()) ? (inverterWarranty.toLowerCase().includes('year') ? inverterWarranty : `${inverterWarranty} Years`) : '5 Years';
                  let dynamicWarrantyTerm = `Warranty: ${modW} performance warranty on solar modules, ${invW} on grid-tie inverters.`;
                  if (systemType === "hybrid" || batteries.some(b => b.brand && b.model)) {
                    const batW = (batteryWarranty && batteryWarranty.trim()) ? (batteryWarranty.toLowerCase().includes('year') ? batteryWarranty : `${batteryWarranty} Years`) : '5 Years';
                    dynamicWarrantyTerm += ` ${batW} on battery storage system.`;
                  }
                  const rawTerms = rates?.standardTerms ? rates.standardTerms.split('\n') : [
                    "Payment Mode: Milestone Payments (Bank Transfer / RTGS / Cheque)",
                    "Estimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.",
                    "Grid integration approvals (Net Metering) timeline varies according to State DISCOM.",
                    "Quotation validity: 15 days from the date of issuance.",
                    "Warranty: 25 years performance warranty on solar modules, 5 years on grid-tie inverters."
                  ];
                  const rawList = rawTerms.filter(t => t.trim());
                  const hasWarranty = rawList.some(t => t.trim().toLowerCase().startsWith('warranty:'));
                  let list = rawList.map(t => {
                    if (t.trim().toLowerCase().startsWith('warranty:')) {
                      return dynamicWarrantyTerm;
                    }
                    return t;
                  });
                  if (!hasWarranty) list.push(dynamicWarrantyTerm);
                  return list.map((term, i) => <li key={`std-${i}`}>{term}</li>);
                })()}
              </ul>

              {customTerms && customTerms.trim() && (
                <div className="mt-3 pt-2 border-t border-slate-200">
                  <h4 className="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1 tracking-wider">Exact Client Requirements</h4>
                  <ul className="text-[10px] text-slate-800 font-semibold list-disc list-inside space-y-0.5">
                    {customTerms.split('\n').filter(t => t.trim()).map((term, i) => (
                      <li key={`req-${i}`}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-200 text-xs text-slate-500 avoid-break">
            <div className="w-1/3 text-center border-t border-slate-300 pt-2 font-semibold text-slate-700">
              Authorized Signatory <br />
              <strong>{salespersonName || "Divvy Solar Representative"}</strong>
              {salespersonPhone && <div className="text-[10px] text-slate-500 font-normal mt-0.5">Mob: {salespersonPhone}</div>}
            </div>
            <div className="w-1/3 text-center border-t border-slate-300 pt-2 font-semibold text-slate-700">
              Accepted and Agreed <br />
              <strong>Client Representative</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
