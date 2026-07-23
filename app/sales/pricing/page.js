"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  CubeIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  DocumentArrowDownIcon,
  UserIcon,
  SunIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";

const ACTIVE_MODULE_BRANDS = ["waaree", "vikram", "jakson", "adani", "havells", "luminous"];
const ACTIVE_INVERTER_BRANDS = ["havells", "luminous", "utl", "sungrow"];
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
    { v: "hot_dip_gi", l: "Hot-dip GI" },
  ],
  alu: [
    { v: "alu_monorail", l: "Aluminium Monorail" },
    { v: "alu_longrail", l: "Aluminium Long rail" },
  ],
  ground: [
    { v: "ground_gi", l: "GI Structure" },
    { v: "ground_hot_dip", l: "Hot-dip GI" },
    { v: "ground_galvalume", l: "Galvalume" }
  ]
};

// Flatten to easily find labels by value
const ALL_STRUCTURE_TYPES = Object.values(STRUCTURE_TYPES_MAP).flat();
const STRUCTURE_TYPES = ALL_STRUCTURE_TYPES;


const ROOF_TYPES = [{ v: "rcc", l: "RCC Flat Roof" }, { v: "profile", l: "Profile Sheet" }, { v: "ground", l: "Ground-Mounted" }];
const PROJECT_CATEGORIES = [
  { v: "residential", l: "Residential (GST @ 8.90%)" },
  { v: "industrial", l: "Industrial (GST @ 8.90%)" },
  { v: "utility", l: "Utility (GST @ 8.90%)" },
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
const WALKWAY_OPTS = [{ v: "none", l: "None" }, { v: "gi", l: "GI Walkway" }, { v: "frp", l: "FRP Walkway" }];
const EARTHING_OPTS = [
  { v: "gi_stripe", l: "GI Strip Earthing" },
  { v: "copper", l: "Copper Earthing" },
  { v: "cu_bonded", l: "Copper Bonded Earthing" }
];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);


const formatINR = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

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

const DynamicCableSelector = ({ label, cables, selectedId, onChange }) => {
  const selCable = cables?.find(c => c._id === selectedId) || cables?.[0];
  if (!cables || cables.length === 0) return null;

  const typeOpts = Array.from(new Set(cables.map(c => `${c.conductor}-${c.armoured ? 'armoured' : 'unarmoured'}`)));
  const selType = selCable ? `${selCable.conductor}-${selCable.armoured ? 'armoured' : 'unarmoured'}` : typeOpts[0];

  const availableCores = Array.from(new Set(cables.filter(c => `${c.conductor}-${c.armoured ? 'armoured' : 'unarmoured'}` === selType).map(c => c.cores))).sort();
  const selCores = selCable?.cores || availableCores[0];

  const availableSizes = cables.filter(c => `${c.conductor}-${c.armoured ? 'armoured' : 'unarmoured'}` === selType && c.cores === selCores).map(c => c.sizeSqMm).sort((a, b) => a - b);
  const selSize = selCable?.sizeSqMm || availableSizes[0];

  const updateSelection = (t, c, s) => {
    const [cond, arm] = t.split('-');
    const isArm = arm === 'armoured';
    const match = cables.find(x => x.conductor === cond && !!x.armoured === isArm && x.cores === c && x.sizeSqMm === Number(s));
    if (match) {
      onChange(match._id);
    } else {
      // Fallback if combination doesn't exist, pick the first size of that type/core
      const fallback = cables.find(x => x.conductor === cond && !!x.armoured === isArm && x.cores === c);
      if (fallback) onChange(fallback._id);
      else {
        // Ultimate fallback: just pick first of type
        const ultFallback = cables.find(x => x.conductor === cond && !!x.armoured === isArm);
        if (ultFallback) onChange(ultFallback._id);
      }
    }
  };

  return (
    <div className="space-y-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
      <Sel label={`${label} Type`} id={`${label}-type`} value={selType} onChange={v => updateSelection(v, selCores, selSize)}>
        {typeOpts.map(t => {
          let name = "";
          if (t === 'copper-unarmoured') name = "Copper Unarmoured";
          if (t === 'copper-armoured') name = "Copper Armoured";
          if (t === 'aluminium-unarmoured') name = "Aluminium Unarmoured";
          if (t === 'aluminium-armoured') name = "Aluminium Armoured";
          return <option key={t} value={t} className="bg-[#0f172a]">{name}</option>;
        })}
      </Sel>
      <div className="grid grid-cols-2 gap-2">
        <Sel label="Cores" id={`${label}-cores`} value={selCores} onChange={v => updateSelection(selType, v, selSize)}>
          {availableCores.map(c => <option key={c} value={c} className="bg-[#0f172a]">{c} Core</option>)}
        </Sel>
        <Sel label="Size (sqmm)" id={`${label}-size`} value={selSize} onChange={v => updateSelection(selType, selCores, v)}>
          {availableSizes.map(s => <option key={s} value={s} className="bg-[#0f172a]">{s} sqmm</option>)}
        </Sel>
      </div>
      <p className="text-xs text-[#FECB00] font-medium pt-1">Rate: ₹{selCable?.ratePerMeter}/m</p>
    </div>
  );
};

export default function PricingCalculatorPage() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  // Client Details
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [quoteRef, setQuoteRef] = useState("");
  const [projectCategory, setProjectCategory] = useState("residential");
  const [roofType, setRoofType] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [dgSync, setDgSync] = useState(false);

  // Solar modules
  const [moduleBrand, setModuleBrand] = useState("");
  const [moduleModel, setModuleModel] = useState("");
  const [systemType, setSystemType] = useState("ongrid");
  const [systemKW, setSystemKW] = useState("");

  // Inverter
  const [inverters, setInverters] = useState([{ brand: "", model: "", qty: 1 }]);

  // Structure
  const [structures, setStructures] = useState([{ id: Date.now(), type: "gi", kw: 10 }]);

  // ACDB / DCDB
  const [acdb, setAcdb] = useState(false);
  const [dcdb, setDcdb] = useState(false);

  // Cables Selections
  const [dcCableId, setDcCableId] = useState("");
  const [dcCableM, setDcCableM] = useState("");

  const [invToAcdbCableId, setInvToAcdbCableId] = useState("");
  const [invToAcdbCableM, setInvToAcdbCableM] = useState("");

  const [acdbToMainCableId, setAcdbToMainCableId] = useState("");
  const [acdbToMainCableM, setAcdbToMainCableM] = useState("");

  // BOS Checkboxes & Overrides
  const [earthing, setEarthing] = useState(false);
  const [earthingType, setEarthingType] = useState("gi_stripe");
  const [isOverridePits, setIsOverridePits] = useState(false);
  const [customPits, setCustomPits] = useState(0);

  const [laType, setLaType] = useState("none");
  const [isOverrideLA, setIsOverrideLA] = useState(false);
  const [customLA, setCustomLA] = useState("");

  const [walkwayType, setWalkwayType] = useState("none");
  const [walkwayM, setWalkwayM] = useState("");

  const [safetyLine, setSafetyLine] = useState(false);
  const [isOverrideSafety, setIsOverrideSafety] = useState(false);
  const [customSafety, setCustomSafety] = useState("");

  const [mc4Pairs, setMc4Pairs] = useState("");
  const [mc4BranchQty, setMc4BranchQty] = useState("");

  // Print Inclusions
  const [incBos, setIncBos] = useState(true);
  const [incEng, setIncEng] = useState(true);
  const [incMon, setIncMon] = useState(true);
  const [incTrans, setIncTrans] = useState(true);

  const [incNuts, setIncNuts] = useState(false);

  const [discom, setDiscom] = useState(false);
  const [discomType, setDiscomType] = useState("lt_three");
  const [customTerms, setCustomTerms] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

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

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Sync cables & default overrides when rates are loaded
  useEffect(() => {
    if (rates) {
      if (rates.dcCables?.length && !dcCableId) setDcCableId(rates.dcCables[0]._id);
      if (rates.acCables?.length && !invToAcdbCableId) setInvToAcdbCableId(rates.acCables[0]._id);
      if (rates.acCables?.length && !acdbToMainCableId) setAcdbToMainCableId(rates.acCables[0]._id);
    }
  }, [rates, dcCableId, invToAcdbCableId, acdbToMainCableId]);

  // Reset models when brand changes (Module only now, inverters handled in loop)
  useEffect(() => { setModuleModel(""); }, [moduleBrand]);

  // Auto-filter out brands with no active models in stock
  const visibleModuleBrands = rates ? ACTIVE_MODULE_BRANDS.filter(brand => {
    const models = rates.modules?.[brand] || [];
    return models.some(m => m.inStock !== false);
  }) : [];

  const visibleInverterBrands = rates ? ACTIVE_INVERTER_BRANDS.filter(brand => {
    const models = rates.inverters?.[brand] || [];
    return models.some(m => m.inStock !== false);
  }) : [];

  const availableModuleModels = moduleBrand && rates?.modules?.[moduleBrand]
    ? rates.modules[moduleBrand].filter(m => m.inStock !== false)
    : [];


  const defaultPits = earthing ? Math.max(2, Math.ceil(systemKW * (rates?.earthingPitsPerKW || 0.3))) : 0;
  const defaultLA = laType !== "none" ? Math.max(1, Math.ceil(systemKW * (rates?.laPerKW || 0.1))) : 0;
  const defaultSafety = safetyLine ? Math.round(systemKW * (rates?.safetyLinePerKW || 2)) : 0;

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
    if (!val) setIsOverridePits(false);
  };
  const handleLAChange = (val) => {
    setLaType(val);
    if (val === "none") setIsOverrideLA(false);
  };
  const handleSafetyChange = (val) => {
    setSafetyLine(val);
    if (!val) setIsOverrideSafety(false);
  };

  const calc = (() => {
    if (!rates || !systemKW) return null;
    const wp = systemKW * 1000;

    const selMod = availableModuleModels.find(m => m._id === moduleModel);
    const modRate = selMod?.ratePerWp || 0;
    const moduleCost = modRate * wp;

    let invCost = 0;
    const selectedInverterDetails = [];
    inverters.forEach(inv => {
      const availModels = inv.brand && rates.inverters?.[inv.brand] ? rates.inverters[inv.brand] : [];
      const selInv = availModels.find(m => m._id === inv.model);
      if (selInv) {
        const capacity = selInv.capacity || 0;
        const qty = inv.qty || 1;
        const effectiveCap = capacity > 0 ? capacity : systemKW;
        const cost = (selInv.ratePerKW || 0) * effectiveCap * qty;
        invCost += cost;
        selectedInverterDetails.push({ ...selInv, qty, cost, brand: inv.brand });
      }
    });

    const selectedStructures = structures.map(st => {
      const rate = rates.structure?.[st.type]?.ratePerKw || 0;
      const cost = rate * (Number(st.kw) || 0);
      return { ...st, rate, cost };
    });
    const structCost = selectedStructures.reduce((sum, st) => sum + st.cost, 0);

    const selDcCable = rates.dcCables?.find(c => c._id === dcCableId) || rates.dcCables?.[0];
    const dcRate = selDcCable?.ratePerMeter || 0;
    const dcCost = dcRate * dcCableM;

    const selInvToAcdbCable = rates.acCables?.find(c => c._id === invToAcdbCableId) || rates.acCables?.[0];
    const invToAcdbRate = selInvToAcdbCable?.ratePerMeter || 0;
    const invToAcdbCost = invToAcdbRate * invToAcdbCableM;

    const selAcdbToMainCable = rates.acCables?.find(c => c._id === acdbToMainCableId) || rates.acCables?.[0];
    const acdbToMainRate = selAcdbToMainCable?.ratePerMeter || 0;
    const acdbToMainCost = acdbToMainRate * acdbToMainCableM;

    const acCost = invToAcdbCost + acdbToMainCost;

    const pitsCount = earthing ? customPits : 0;
    let earthingRate = 0;
    if (earthingType === "gi_stripe") earthingRate = rates.earthingPitRateGi || 0;
    else if (earthingType === "aluminium") earthingRate = rates.earthingPitRateAl || 0;
    else if (earthingType === "copper") earthingRate = rates.earthingPitRateCu || 0;
    else if (earthingType === "cu_bonded") earthingRate = rates.earthingPitRateCuBonded || 0;

    const earthingCost = pitsCount * earthingRate;

    const laCount = laType !== "none" ? customLA : 0;
    const laUnitRate = laType === "conventional" ? (rates.laConventionalRate || 0) : (rates.laEseRate || 0);
    const laCost = laCount * laUnitRate;

    const walkRate = walkwayType === "gi" ? (rates.walkwayGiRate || 0) : (rates.walkwayFrpRate || 0);
    const walkCost = walkwayType !== "none" ? walkRate * walkwayM : 0;

    const safetyM = safetyLine ? customSafety : 0;
    const safetyCost = safetyM * (rates.safetyLineRate || 0);

    const acdbCost = acdb ? (rates.acdbRatePerKw || 0) * systemKW : 0;
    const dcdbCost = dcdb ? (rates.dcdbRatePerKw || 0) * systemKW : 0;
    const mc4Cost = (Number(mc4Pairs) || 0) * (rates.mc4ConnectorRate || 0);
    const mc4BranchCost = (Number(mc4BranchQty) || 0) * (rates.branchConnectorRate || 0);

    let discomCost = 0;
    if (discom) {
      if (discomType === "single_phase") discomCost = rates.discomSinglePhaseCost || 0;
      else if (discomType === "three_phase") discomCost = rates.discomThreePhaseCost || 0;
      else if (discomType === "lt") discomCost = rates.discomLtCost || 0;
      else if (discomType === "ht") discomCost = rates.discomHtCost || 0;
    }
    const installCost = (rates.installationRate || 0) * systemKW;

    const baseTotal = moduleCost + invCost + structCost + dcCost + acCost + earthingCost + laCost + walkCost + safetyCost + mc4Cost + mc4BranchCost + acdbCost + dcdbCost + discomCost + installCost;
    const gstRate = 0.089;
    const gst = baseTotal * gstRate;
    const grandTotal = baseTotal + gst;
    const perWp = wp > 0 ? grandTotal / wp : 0;

    return {
      moduleCost, invCost, structCost, dcCost, acCost, earthingCost, laCost,
      walkCost, safetyCost, discomCost, installCost, mc4Cost,
      baseTotal, gst, grandTotal, perWp,
      pitsCount, laCount, selMod, selectedInverterDetails, selDcCable, selInvToAcdbCable, selAcdbToMainCable, modRate, selectedStructures, dcRate, invToAcdbCost, acdbToMainCost, acdbCost, dcdbCost, mc4BranchCost, mc4Pairs, mc4BranchQty, earthingRate
    };
  })();

  const handleDownloadPDF = async () => {
    if (!calc) return;

    const buildQuotationHTML = () => {
      const fmtINR = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
      let rows = "";
      let sno = 1;
      rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Solar Modules:</strong> ${calc.selMod?.modelName || "N/A"}<br/><span style="font-size:10px;color:#64748b">Tier-1 High-efficiency PV modules</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW * 1000}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">Wp</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${(calc.modRate || 0).toFixed(2)}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.moduleCost)}</td></tr>`;
      if (calc.selectedInverterDetails?.length > 0) {
        calc.selectedInverterDetails.forEach(inv => {
          rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Solar Grid-Tie Inverter:</strong> ${inv.modelName}<br/><span style="font-size:10px;color:#64748b">Multi-MPPT High-efficiency inverter system</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${inv.qty}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">Nos</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${(inv.cost / (inv.qty || 1)).toFixed(2)}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(inv.cost)}</td></tr>`;
        });
      }
      if (calc.acdbCost > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>ACDB Combiner / Panel</strong><br/><span style="font-size:10px;color:#64748b">L&T / Elmex / Schneider / Reputed Make</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kW</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.acdbRatePerKw || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.acdbCost)}</td></tr>`;
      if (calc.dcdbCost > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>DCDB Combiner / Panel</strong><br/><span style="font-size:10px;color:#64748b">Reputed Make</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kW</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.dcdbRatePerKw || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.dcdbCost)}</td></tr>`;
      calc.selectedStructures?.forEach(st => { const stLabel = ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A"; rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Mounting Structure:</strong> ${stLabel}<br/><span style="font-size:10px;color:#64748b">Wind load sustained structural rails & clamps</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${st.kw}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kW</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${st.rate}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(st.cost)}</td></tr>`; });
      rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Structure Accessories</strong><br/><span style="font-size:10px;color:#64748b">SS 304 Nut Bolts & Fasteners</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kW</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td></tr>`;
      if (dcCableM > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>DC Solar Cable:</strong> ${calc.selDcCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">Tinned copper flexible single-core solar wire</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${dcCableM}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">m</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${calc.dcRate}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.dcCost)}</td></tr>`;
      if (invToAcdbCableM > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>AC Cable (Inv to ACDB):</strong> ${calc.selInvToAcdbCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">Multicore flexible AC copper/aluminium cabling run</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${invToAcdbCableM}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">m</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${calc.selInvToAcdbCable?.ratePerMeter || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.invToAcdbCost)}</td></tr>`;
      if (acdbToMainCableM > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>AC Cable (ACDB to Main):</strong> ${calc.selAcdbToMainCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">AC distribution armored/unarmored cable</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${acdbToMainCableM}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">m</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${calc.selAcdbToMainCable?.ratePerMeter || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.acdbToMainCost)}</td></tr>`;
      if (calc.pitsCount > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Chemical Earthing Pits:</strong> ${EARTHING_OPTS.find(e => e.v === earthingType)?.l || "Chemical Earthing"}<br/><span style="font-size:10px;color:#64748b">Low-resistance maintenance-free earthing connection</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${calc.pitsCount}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">pits</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${calc.earthingRate}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.earthingCost)}</td></tr>`;
      if (calc.laCount > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Lightning Protection:</strong> ${laType === "ese" ? "ESE Active" : "Conventional"}<br/><span style="font-size:10px;color:#64748b">Safety shield against high-voltage lightning surges</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${calc.laCount}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">units</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${laType === "conventional" ? (rates?.laConventionalRate || 0) : (rates?.laEseRate || 0)}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.laCost)}</td></tr>`;
      if (walkwayM > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Roof Walkway:</strong> ${walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}<br/><span style="font-size:10px;color:#64748b">Safe pathway on roof for standard O&M visits</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${walkwayM}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">m</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${walkwayType === "gi" ? (rates?.walkwayGiRate || 0) : (rates?.walkwayFrpRate || 0)}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.walkCost)}</td></tr>`;
      if (customSafety > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Safety Lifeline</strong><br/><span style="font-size:10px;color:#64748b">Anchor lifeline system for cleaning personnel</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${customSafety}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">m</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.safetyLineRate || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.safetyCost)}</td></tr>`;
      if (calc.mc4Cost > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>MC4 Connectors</strong><br/><span style="font-size:10px;color:#64748b">Waterproof module string connector links</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${calc.mc4Pairs}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">pairs</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.mc4ConnectorRate || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.mc4Cost)}</td></tr>`;
      if (calc.mc4BranchCost > 0) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Branch (Y) Connectors</strong><br/><span style="font-size:10px;color:#64748b">Parallel string configuration connectors</span></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${calc.mc4BranchQty}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">nos</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.branchConnectorRate || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.mc4BranchCost)}</td></tr>`;
      if (incBos) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>BOS &amp; Accessories:</strong> Cable Lugs, Tape, Cable tie &amp; Conduit Pipe</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kWp</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td></tr>`;
      if (incEng) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Engineering &amp; Supervision</strong></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kWp</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td></tr>`;
      if (incMon) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Remote Monitoring Access</strong></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">1</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">Set</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td></tr>`;
      if (incTrans) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Transportation &amp; Freight</strong></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">1</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">Job</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">Included</td></tr>`;
      if (discom) rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>DISCOM Liaising &amp; Net Metering</strong></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">1</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">job</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${discomType === 'single_phase' ? (rates?.discomSinglePhaseCost||0) : discomType === 'three_phase' ? (rates?.discomThreePhaseCost||0) : discomType === 'lt' ? (rates?.discomLtCost||0) : (rates?.discomHtCost||0)}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.discomCost)}</td></tr>`;
      rows += `<tr><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${sno++}</td><td style="border:1px solid #cbd5e1;padding:8px 10px"><strong>Installation &amp; Commissioning</strong></td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">${systemKW}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:center">kW</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">&#8377;${rates?.installationRate || 0}</td><td style="border:1px solid #cbd5e1;padding:8px 10px;text-align:right">${fmtINR(calc.installCost)}</td></tr>`;
      const projectTypeLabel = projectCategory === "residential" ? "RESIDENTIAL OFFER" : projectCategory === "industrial" ? "INDUSTRIAL PROPOSAL" : "UTILITY-SCALE PROPOSAL";
      const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      const quoteRefStr = quoteRef || `DS/QP/${new Date().getFullYear()}/---`;
      const customTermRows = customTerms ? customTerms.split('\n').filter(t => t.trim()).map(t => `<li style="font-weight:600;color:#334155;margin-bottom:4px">${t}</li>`).join('') : '';
      const logoUrl = window.location.origin + "/divvy_photo.png";

      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; background: #e2e8f0; }
        .page-container { width: 1024px; height: 1448px; padding: 40px; position: relative; background: #ffffff; margin-bottom: 20px; box-sizing: border-box; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #eab308; padding-bottom: 16px; margin-bottom: 24px; }
        .logo-area { flex: 0 0 200px; }
        .company-details { flex: 1; text-align: center; padding: 0 10px; }
        .company-details h2 { font-size: 15px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin: 0; letter-spacing: 0.5px; }
        .company-details .address { font-size: 9px; font-weight: 700; color: #1e293b; margin: 4px 0 2px 0; }
        .company-details .contacts { font-size: 8.5px; color: #64748b; margin: 0; }
        .quote-meta { flex: 0 0 180px; text-align: right; }
        .quote-meta .proposal-title { font-size: 11px; font-weight: 900; color: #eab308; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .quote-meta p { font-size: 9px; color: #475569; margin: 2px 0 0 0; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .box { border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; padding: 12px; }
        .box h3 { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #eab308; padding-bottom: 6px; margin-bottom: 8px; letter-spacing: 0.5px; }
        .box p { font-size: 10px; color: #334155; margin: 4px 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th { background: #1e3a8a; color: #ffffff; font-weight: 700; font-size: 10px; text-transform: uppercase; padding: 8px 10px; border: 1px solid #1e3a8a; }
        td { padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10.5px; vertical-align: top; color: #334155; }
        tr:nth-child(even) { background: #f8fafc; }
        .clearfix::after { content: ""; display: table; clear: both; }
        .totals-box { float: right; width: 48%; border: 1.5px solid #eab308; background: #fefcf0; border-radius: 6px; padding: 12px; }
        .totals-row { display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0; color: #334155; }
        .grand-total { display: flex; justify-content: space-between; font-size: 13px; font-weight: 900; border-top: 1.5px solid #eab308; padding-top: 8px; margin-top: 8px; color: #1e3a8a; }
        .payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .payment-grid h4 { font-size: 11px; text-transform: uppercase; font-weight: 800; color: #1e3a8a; margin-bottom: 10px; letter-spacing: 0.5px; }
        .payment-grid ul { list-style: none; font-size: 11px; }
        .payment-grid li { display: flex; justify-content: space-between; padding: 3px 0; color: #334155; }
        .terms-list { padding-left: 16px !important; list-style: decimal !important; }
        .terms-list li { display: list-item !important; padding: 2px 0 !important; }
        .footer { display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; padding-top: 20px; }
        .sig { width: 40%; text-align: center; border-top: 1px solid #94a3b8; padding-top: 8px; font-size: 10px; color: #64748b; font-weight: 600; }
      </style></head>
      <body>
        <div id="page-1" class="page-container">
          <div class="header">
            <div class="logo-area"><img src="${logoUrl}" alt="Divvy Solar Logo" style="width:190px; height:auto; display:block;" /></div>
            <div class="company-details"><h2>DIVVY SOLAR Power & SOLUTIONS Pvt. Ltd</h2><p class="address">Unit-859, Tower- B1, 8th Floor, Spaze I - Tech Park, Sec - 49, Gurgaon - 122018 (HARYANA)</p><p class="contacts">Head Office: Lower Ground, SJ Tower, Sec-13, Hisar 125001<br/>Email: info@divvysolar.in | Web: www.divvysolar.in</p></div>
            <div class="quote-meta"><span class="proposal-title">${projectTypeLabel}</span><p><strong>Quote Ref:</strong> ${quoteRefStr}</p><p><strong>Date:</strong> ${dateStr}</p></div>
          </div>
          <div class="grid2">
            <div class="box"><h3>Client Details</h3><p><strong>Client / Org:</strong> ${clientName || "N/A"}</p><p><strong>Contact:</strong> ${clientPhone || "N/A"}</p><p><strong>Site Location:</strong> ${clientLocation || "N/A"}</p><p><strong>Connected Grid Load:</strong> ${connectedLoad ? connectedLoad + " kW" : "N/A"}</p><p><strong>Type of Roof:</strong> ${ROOF_TYPES.find(r => r.v === roofType)?.l || "N/A"}</p><p><strong>DG Synchronization:</strong> ${dgSync ? "Required" : "Not Required"}</p></div>
            <div class="box"><h3>Technical Specifications</h3><p><strong>Proposed Capacity:</strong> ${systemKW} kWp</p><p><strong>Solar Modules:</strong> ${calc.selMod?.modelName || "N/A"} (${calc.selMod?.wattage || ""}Wp)</p><p><strong>Inverter Model:</strong> ${calc.selectedInverterDetails?.map(inv => inv.modelName + " (x" + inv.qty + ")").join(", ") || "N/A"}</p><p><strong>Mounting Structure:</strong> ${calc.selectedStructures?.map(st => (ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "") + " (" + st.kw + "kW)").join(", ") || "N/A"}</p></div>
          </div>
          <table><thead><tr><th style="width:40px">S.No</th><th>Particulars / Components</th><th style="width:80px;text-align:center">Qty</th><th style="width:50px;text-align:center">Unit</th><th style="width:100px;text-align:right">Unit Rate</th><th style="width:120px;text-align:right">Total (INR)</th></tr></thead><tbody>${rows}</tbody></table>
          <div class="clearfix"><div class="totals-box"><div class="totals-row"><span>Base Project Cost:</span><span><strong>${fmtINR(calc.baseTotal)}</strong></span></div><div class="totals-row"><span>GST (8.90%):</span><span>${fmtINR(calc.gst)}</span></div><div class="grand-total"><span>Grand Total (Net Value):</span><span>${fmtINR(calc.grandTotal)}</span></div><p style="font-size:9px;color:#64748b;text-align:right;margin-top:6px;font-weight:600;">Average cost per watt: &#8377;${calc.perWp.toFixed(2)}/Wp (incl. GST)</p></div></div>
        </div>
        <div id="page-2" class="page-container">
          <div class="header" style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 24px;"><div class="logo-area"><img src="${logoUrl}" alt="Divvy Solar Logo" style="width:120px; height:auto; display:block;" /></div><div class="quote-meta" style="text-align: right;"><span style="font-size: 10px; color: #64748b; font-weight: 600; text-transform: uppercase;">${projectTypeLabel} | Quote Ref: ${quoteRefStr}</span></div></div>
          <div class="payment-grid" style="margin-top: 32px;"><div><h4>Payment Milestones</h4><ul><li style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>1. Advance Booking (10%):</span><strong>${fmtINR(calc.grandTotal * 0.1)}</strong></li><li style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>2. Material Dispatch (85%):</span><strong>${fmtINR(calc.grandTotal * 0.85)}</strong></li><li style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>3. Post-Commissioning (5%):</span><strong>${fmtINR(calc.grandTotal * 0.05)}</strong></li></ul></div><div><h4>Project Terms</h4><ul class="terms-list"><li>Estimated Delivery: 4 to 6 weeks from advance receipt.</li><li>Net Metering timeline varies by State DISCOM.</li><li>Quotation validity: 15 days from issuance.</li><li>Warranty: 25 years on modules, 5 years on inverters.</li>${customTermRows}</ul></div></div>
          <div class="footer" style="position: absolute; bottom: 40px; left: 40px; right: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px;"><div class="sig">Authorized Signatory<br/><strong>Divvy Solar Representative</strong></div><div class="sig">Accepted and Agreed<br/><strong>Client Representative</strong></div></div>
        </div>
      </body></html>`;
    };
    setPdfLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).jsPDF;
      const iframe = document.createElement("iframe");
      iframe.style.cssText = "position:fixed;left:-9999px;top:0;width:1024px;height:1px;border:none;visibility:hidden;";
      document.body.appendChild(iframe);
      const htmlContent = buildQuotationHTML();
      iframe.contentDocument.open();
      iframe.contentDocument.write(htmlContent);
      iframe.contentDocument.close();
      await new Promise(resolve => setTimeout(resolve, 800));
      const page1 = iframe.contentDocument.getElementById("page-1");
      const page2 = iframe.contentDocument.getElementById("page-2");
      const canvas1 = await html2canvas(page1, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false, width: 1024, height: 1448 });
      const canvas2 = await html2canvas(page2, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false, width: 1024, height: 1448 });
      document.body.removeChild(iframe);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas1.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);
      pdf.addPage();
      pdf.addImage(canvas2.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`Divvy_Solar_Quote_${clientName || "Client"}_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF download failed.");
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
    <div className="space-y-8">
      <style>{`
        @media screen {
          .print-only { display: none !important; }
        }
        @page {
          margin: 0;
        }
        @media print {
          .no-print, aside, header, nav, #slChatButton { display: none !important; }
          .print-only { display: block !important; }
          
          /* Reset parent styles to prevent layout clipping and show full content starting from top */
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
          
          /* Target only the parent layout containers of the application shell */
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
            padding: 40px 40px !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }
          
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          table {
            border-collapse: collapse !important;
            width: 100% !important;
            counter-reset: rowNumber;
          }
          
          tbody tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            counter-increment: rowNumber;
          }

          tbody tr td:first-child::before {
            content: counter(rowNumber);
          }
          
          th, td {
            border: 1px solid #ddd !important;
            padding: 8px !important;
            text-align: left !important;
            font-size: 11px !important;
          }
          
          th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
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
              <Inp label="Location / Site Address" id="client-loc" value={clientLocation} onChange={setClientLocation} />
              <Inp label="Quote Reference #" id="quote-ref" value={quoteRef} onChange={setQuoteRef} />
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
            <div className="flex items-center gap-3">
              <input type="checkbox" id="dg-sync" checked={dgSync} onChange={e => setDgSync(e.target.checked)} className="w-4 h-4 accent-[#FECB00]" />
              <label htmlFor="dg-sync" className="text-sm text-white/70">DG Synchronisation Required</label>
            </div>
          </section>

          {/* Section 2: Solar Modules */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <SunIcon className="w-6 h-6 text-[#FECB00]" />
              <div>
                <h2 className="text-lg font-bold text-white">2. Solar Modules</h2>
                <p className="text-white/40 text-xs mt-0.5">Select brand, model and system type.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Sel label="Module Brand" id="mod-brand" value={moduleBrand} onChange={setModuleBrand}>
                <option value="" className="bg-[#0f172a]">Select Brand</option>
                {visibleModuleBrands.map(b => <option key={b} value={b} className="bg-[#0f172a]">{cap(b)}</option>)}
              </Sel>
              <Sel label="Module Model" id="mod-model" value={moduleModel} onChange={setModuleModel} disabled={!moduleBrand}>
                <option value="" className="bg-[#0f172a]">Select Model</option>
                {availableModuleModels.map(m => <option key={m._id} value={m._id} className="bg-[#0f172a]">{m.modelName} ({m.wattage}Wp) — ₹{m.ratePerWp}/Wp</option>)}
              </Sel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Inp label="System Size (kWp)" id="system-kw" value={systemKW} onChange={setSystemKW} type="number" min={0} />
              <Sel label="System Type" id="sys-type" value={systemType} onChange={setSystemType}>
                <option value="ongrid" className="bg-[#0f172a]">On-Grid</option>
                <option value="hybrid" className="bg-[#0f172a]">Hybrid</option>
              </Sel>
            </div>
            {systemKW > 0 && moduleModel && (
              <p className="text-xs text-white/40 pt-2 border-t border-white/5">
                Panels needed: ~{Math.ceil((systemKW * 1000) / (availableModuleModels.find(m => m._id === moduleModel)?.wattage || 1))} panels @ {availableModuleModels.find(m => m._id === moduleModel)?.wattage}Wp each
              </p>
            )}
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
              <button onClick={() => setInverters([...inverters, { brand: "", model: "", qty: 1 }])}
                className="px-3 py-1.5 rounded-lg border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold hover:bg-[#FECB00]/10 transition-colors">
                + Add Inverter
              </button>
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
                        {availModels.map(m => <option key={m._id} value={m._id} className="bg-[#0f172a]">{m.modelName} ({m.capacity}kW) — ₹{m.ratePerKW}/kW</option>)}
                      </Sel>
                      <Inp label="Qty" id={`inv-qty-${index}`} value={inv.qty} type="number" min={1}
                        onChange={v => { const ni = [...inverters]; ni[index] = { ...ni[index], qty: Number(v) }; setInverters(ni); }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Mounting Structure */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WrenchScrewdriverIcon className="w-6 h-6 text-[#FECB00]" />
                <div>
                  <h2 className="text-lg font-bold text-white">Mounting Structure</h2>
                  <p className="text-white/40 text-xs mt-0.5">Select structure types and set capacities</p>
                </div>
              </div>
              <button onClick={() => setStructures([...structures, { id: Date.now(), type: "ms_fabricated", kw: 1 }])}
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
                    {/* Live Price Preview */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-white/40">
                        Rate: <span className="text-white/60 font-semibold">₹{structRate.toLocaleString("en-IN")}/kW</span>
                        {structRate === 0 && <span className="text-yellow-400/70 ml-1">(Set rate in Admin → Pricing)</span>}
                      </span>
                      <span className="text-sm font-bold text-[#FECB00]">
                        {structTotal > 0 ? `= ${formatINR(structTotal)}` : "₹0"}
                      </span>
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
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-[#FECB00]" />
              <h2 className="text-lg font-bold text-white">5. Wiring & Cabling (Conductor/Size Matrix)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* DC Cable */}
              <div className="space-y-3.5 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-4">
                <p className="text-sm font-bold text-white/80">DC Side Cabling</p>
                <Sel label="DC Cable Size (Conductor)" id="dc-cable" value={dcCableId} onChange={setDcCableId}>
                  {rates?.dcCables?.map(c => (
                    <option key={c._id} value={c._id} className="bg-[#0f172a]">{c.label} (₹{c.ratePerMeter}/m)</option>
                  ))}
                </Sel>
                <Inp label="DC Cable Run Length" id="dc-run" value={dcCableM} onChange={setDcCableM} type="number" min={0} unit="m" />
              </div>

              {/* Inverter to ACDB */}
              <div className="space-y-3.5 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-white/80 mb-3">Inverter to ACDB (AC)</p>
                  <DynamicCableSelector label="Inv-ACDB" cables={rates?.acCables} selectedId={invToAcdbCableId} onChange={setInvToAcdbCableId} />
                </div>
                <Inp label="Run Length" id="inv-acdb-run" value={invToAcdbCableM} onChange={setInvToAcdbCableM} type="number" min={0} unit="m" />
              </div>

              {/* ACDB to Main */}
              <div className="space-y-3.5 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-white/80 mb-3">ACDB to Main (AC)</p>
                  <DynamicCableSelector label="ACDB-Main" cables={rates?.acCables} selectedId={acdbToMainCableId} onChange={setAcdbToMainCableId} />
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
              {/* Earthing Pits */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                <Chk label="Earthing Pits Required" id="earthing-check" checked={earthing} onChange={handleEarthingChange} />
                {earthing && (
                  <div className="pt-2 space-y-2">
                    <Sel label="Earthing Type" id="earthing-type" value={earthingType} onChange={setEarthingType}>
                      {EARTHING_OPTS.map(o => <option key={o.v} value={o.v} className="bg-[#0f172a]">{o.l}</option>)}
                    </Sel>
                    <Inp label="No. of Earthing Pits" id="pits-qty" value={customPits}
                      onChange={(v) => { setIsOverridePits(true); setCustomPits(v); }}
                      type="number" min={0} />
                    {isOverridePits && (
                      <button onClick={() => setIsOverridePits(false)} className="text-[10px] text-[#FECB00]/70 hover:underline">
                        Reset to calculated default ({defaultPits} pits)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ACDB & DCDB Combiner Boxes */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-4">
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Combiner Boxes (per kW)</p>
                <div className="space-y-3">
                  <Chk label="ACDB Combiner Required" id="acdb-check" checked={acdb} onChange={setAcdb} />
                  <Chk label="DCDB Combiner Required" id="dcdb-check" checked={dcdb} onChange={setDcdb} />
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
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-4">
                <p className="text-sm font-bold text-white/80">Walkway System</p>
                <Sel label="Walkway Material" id="walkway-opt" value={walkwayType} onChange={setWalkwayType}>
                  {WALKWAY_OPTS.map(o => <option key={o.v} value={o.v} className="bg-[#0f172a]">{o.l}</option>)}
                </Sel>
                {walkwayType !== "none" && (
                  <Inp label="Walkway Length" id="walkway-qty" value={walkwayM} onChange={setWalkwayM} type="number" min={0} unit="m" />
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <Chk label="DISCOM approval & Net Metering" id="discom-check" checked={discom} onChange={setDiscom} />
                {discom && (
                  <Sel label="Connection Type" id="discom-type" value={discomType} onChange={setDiscomType}>
                    <option value="single_phase" className="bg-[#0f172a]">Single Phase</option>
                    <option value="three_phase" className="bg-[#0f172a]">Three Phase</option>
                    <option value="lt" className="bg-[#0f172a]">LT</option>
                    <option value="ht" className="bg-[#0f172a]">HT</option>
                  </Sel>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <p className="text-sm font-bold text-white/80">Terms & Conditions (Exact Client Scope)</p>
              <textarea
                value={customTerms}
                onChange={(e) => setCustomTerms(e.target.value)}
                placeholder="E.g., Exact unki requirements jaise extra cable length client khud layega..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all min-h-[100px] resize-y"
              />
            </div>
          </section>
        </div>

        {/* RIGHT: Live Cost breakdown preview */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6 sticky top-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
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
                    { l: `Solar Modules (${calc.selMod?.modelName || "Not Selected"})`, v: calc.moduleCost },
                    ...((calc.selectedInverterDetails || []).length > 0 
                      ? calc.selectedInverterDetails.map((inv, i) => ({
                          l: `Inverter ${i + 1} (${inv.modelName}) x${inv.qty}`, v: inv.cost
                        }))
                      : [{ l: `Inverter (Not Selected)`, v: 0 }]
                    ),
                    ...(calc.selectedStructures?.length > 0 
                      ? calc.selectedStructures.map((st, i) => ({
                          l: `Structure ${i + 1} (${ALL_STRUCTURE_TYPES.find(opt=>opt.v===st.type)?.l || st.type || 'Structure'}) [${st.kw}kW]`,
                          v: st.cost
                        }))
                      : [{ l: 'Mounting Structure (Not Selected)', v: 0 }]
                    ),
                    { l: `DC Cabling (${calc.selDcCable?.label || "None"}, ${dcCableM}m)`, v: calc.dcCost },
                    { l: `AC Cabling: Inv to ACDB (${calc.selInvToAcdbCable?.label || "None"}, ${invToAcdbCableM}m)`, v: calc.invToAcdbCost },
                    { l: `AC Cabling: ACDB to Main (${calc.selAcdbToMainCable?.label || "None"}, ${acdbToMainCableM}m)`, v: calc.acdbToMainCost },
                    { l: `Earthing Pits (${calc.pitsCount} pits)`, v: calc.earthingCost },
                    { l: `Lightning Arrestor (${calc.laCount} units, ${cap(laType)})`, v: calc.laCost },
                    { l: `Walkway (${walkwayM}m, ${cap(walkwayType)})`, v: calc.walkCost },
                    { l: `Safety Line (${customSafety}m)`, v: calc.safetyCost },
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
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-white/60">Base Cost</span><span className="text-white font-medium">{formatINR(calc.baseTotal)}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">GST (8.90%)</span><span className="text-white font-medium">{formatINR(calc.gst)}</span></div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-white font-bold text-base">Total Quotation</span>
                    <span className="text-xl font-black" style={{ color: "#FECB00" }}>{formatINR(calc.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1"><span className="text-white/50">System Size</span><span className="text-white/80 font-bold">{systemKW} kWp</span></div>
                  <div className="flex justify-between text-xs"><span className="text-white/50">Cost per Watt</span><span className="text-white/80 font-bold">₹{(calc.perWp || 0).toFixed(2)}/Wp</span></div>
                </div>

                {/* PDF & Print Buttons */}
                <div className="flex flex-col gap-2">
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

                {/* Payment Schedule */}
                <div className="rounded-xl bg-white/3 border border-white/5 p-4 space-y-2">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Payment Schedule</p>
                  {[{ l: "Advance (Booking)", p: 10 }, { l: "Material Dispatch", p: 85 }, { l: "After Commissioning", p: 5 }].map(s => (
                    <div key={s.l} className="flex justify-between text-xs">
                      <span className="text-white/60">{s.l} ({s.p}%)</span>
                      <span className="text-white font-medium">{formatINR(calc.grandTotal * s.p / 100)}</span>
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
                DIVVY SOLAR Power & SOLUTIONS Pvt. Ltd
              </h1>
              <p className="text-[9px] font-bold text-slate-800 mt-1">
                Unit-859, Tower- B1, 8th Floor, Spaze I - Tech Park, Sec - 49, Gurgaon - 122018 (HARYANA)
              </p>
              <p className="text-[8.5px] text-slate-500 mt-0.5 leading-relaxed">
                Head Office: Lower Ground, SJ Tower, Sec-13, Hisar 125001 (HARYANA) <br />
                Email: info@divvysolar.in | Web: www.divvysolar.in
              </p>
            </div>
            <div className="flex-shrink-0 w-[180px] text-right">
              <h2 className="text-[11px] font-black text-[#eab308] uppercase tracking-wide">
                {projectCategory === "residential"
                  ? "RESIDENTIAL OFFER"
                  : projectCategory === "industrial"
                    ? "INDUSTRIAL PROPOSAL"
                    : "UTILITY-SCALE PROPOSAL"}
              </h2>
              <p className="text-[9px] text-slate-600 mt-1"><strong>Quote Ref:</strong> {quoteRef || `DS/QP/${new Date().getFullYear()}/---`}</p>
              <p className="text-[9px] text-slate-600"><strong>Date:</strong> {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
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
              <p className="text-xs text-slate-700"><strong>Connected Grid Load:</strong> {connectedLoad ? `${connectedLoad} kW` : "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Type of Roof:</strong> {ROOF_TYPES.find(r => r.v === roofType)?.l || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>DG Synchronization:</strong> {dgSync ? "Required" : "Not Required"}</p>
            </div>

            {/* System Technical Specifications */}
            <div className="border border-slate-300 bg-slate-50/30 rounded-lg p-3 space-y-1">
              <h3 className="text-[10px] font-bold text-[#1e3a8a] uppercase border-b-2 border-[#eab308] pb-1.5 mb-2 tracking-wider">Technical Specifications</h3>
              <p className="text-xs text-slate-700"><strong>Proposed Capacity:</strong> {systemKW} kWp (Solar PV Plant)</p>
              <p className="text-xs text-slate-700"><strong>Solar Modules:</strong> {calc.selMod?.modelName || "N/A"} {calc.selMod?.wattage ? `(${calc.selMod.wattage}Wp)` : ""}</p>
              <p className="text-xs text-slate-700"><strong>Inverter Model:</strong> {calc.selectedInverterDetails?.map(inv => `${inv.modelName} (x${inv.qty})`).join(", ") || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>Mounting Structure:</strong> {calc.selectedStructures?.map(st => `${ALL_STRUCTURE_TYPES.find(opt=>opt.v===st.type)?.l || st.type || 'Structure'} (${st.kw}kW)`).join(", ") || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>DC Cable Run:</strong> {dcCableM}m of {calc.selDcCable?.label || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>AC Cable (Inv-ACDB):</strong> {invToAcdbCableM}m of {calc.selInvToAcdbCable?.label || "N/A"}</p>
              <p className="text-xs text-slate-700"><strong>AC Cable (ACDB-Main):</strong> {acdbToMainCableM}m of {calc.selAcdbToMainCable?.label || "N/A"}</p>
            </div>
          </div>

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
                    <tr className="hover:bg-slate-50">
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                        <strong>Solar Modules:</strong> {calc.selMod?.modelName || "N/A"} <br />
                        <span className="text-[10px] text-slate-500">Tier-1 High-efficiency PV modules</span>
                      </td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW * 1000}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Wp</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{(calc.modRate || 0).toFixed(2)}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.moduleCost)}</td>
                    </tr>
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
                          <strong>Solar Grid-Tie Inverters ({systemKW} kW):</strong> N/A <br />
                          <span className="text-[10px] text-slate-500">Multi-MPPT High-efficiency inverter system</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">Nos</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹0</td>
                      </tr>
                    )}
                    {calc.acdbCost > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>ACDB Combiner / Panel</strong> <br />
                          <span className="text-[10px] text-slate-500">L&T / Elmex / Schneider / Reputed Make</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.acdbRatePerKw || 0}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.dcdbRatePerKw || 0}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.dcdbCost)}</td>
                      </tr>
                    )}
                    {calc.selectedStructures?.map((st, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>Mounting Structure:</strong> {ALL_STRUCTURE_TYPES.find(opt=>opt.v===st.type)?.l || st.type || "N/A"} <br />
                          <span className="text-[10px] text-slate-500">Wind load sustained structural rails & clamps</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{st.kw}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{st.rate}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(st.cost)}</td>
                      </tr>
                    ))}
                    <tr className="hover:bg-slate-50">
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                        <strong>Structure Accessories:</strong> SS 304 Nut Bolts & Fasteners <br />
                        <span className="text-[10px] text-slate-500">Anti-corrosion hardware for mechanical integrity</span>
                      </td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                    </tr>

                    {dcCableM > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>DC Solar Cable:</strong> {calc.selDcCable?.label || "N/A"} <br />
                          <span className="text-[10px] text-slate-500">Tinned copper flexible single-core solar wire</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{dcCableM}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{calc.dcRate}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.dcCost)}</td>
                      </tr>
                    )}
                    {invToAcdbCableM > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>AC Solar Cable (Inv to ACDB):</strong> {calc.selInvToAcdbCable?.label || "N/A"} <br />
                          <span className="text-[10px] text-slate-500">Multicore flexible AC copper/aluminium cabling run</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{invToAcdbCableM}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{calc.selInvToAcdbCable?.ratePerMeter || 0}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.invToAcdbCost)}</td>
                      </tr>
                    )}
                    {acdbToMainCableM > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>AC Solar Cable (ACDB to Main):</strong> {calc.selAcdbToMainCable?.label || "N/A"} <br />
                          <span className="text-[10px] text-slate-500">AC distribution armored/unarmored cable</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{acdbToMainCableM}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{calc.selAcdbToMainCable?.ratePerMeter || 0}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.acdbToMainCost)}</td>
                      </tr>
                    )}
                    {calc.pitsCount > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>Chemical Earthing Pits:</strong> {EARTHING_OPTS.find(e => e.v === earthingType)?.l || "Chemical Earthing"}<br />
                          <span className="text-[10px] text-slate-500">Low-resistance maintenance-free earthing connection</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{calc.pitsCount}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">pits</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{calc.earthingRate}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.earthingCost)}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{laType === "conventional" ? (rates?.laConventionalRate || 0) : (rates?.laEseRate || 0)}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.laCost)}</td>
                      </tr>
                    )}
                    {walkwayM > 0 && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>Roof Walkway:</strong> {walkwayType === "gi" ? "GI Steel Grating Walkway" : "FRP Anti-corrosion Walkway"}<br />
                          <span className="text-[10px] text-slate-500">Safe pathway on roof for standard O&M visits</span>
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{walkwayM}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">m</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{walkwayType === "gi" ? (rates?.walkwayGiRate || 0) : (rates?.walkwayFrpRate || 0)}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.safetyLineRate || 0}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.mc4ConnectorRate || 0}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.branchConnectorRate || 0}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.mc4BranchCost)}</td>
                      </tr>
                    )}
                    {incBos && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>BOS & Accessories:</strong> Cable Lugs, Tape, Cable tie & Conduit Pipe with accessories
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kWp</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">Included</td>
                      </tr>
                    )}
                    {incEng && (
                      <tr className="hover:bg-slate-50">
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                          <strong>Engineering & Supervision:</strong> String designing, Shadow Analysis, electrical design, and panel placement
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
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
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
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
                          <strong>Transportation & Freight:</strong> Till site loading and unloading
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
                          <strong>DISCOM Liaising & Net Metering:</strong> Net-metering approval process with local electricity authority
                        </td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">1</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">job</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{discomType === 'single_phase' ? (rates?.discomSinglePhaseCost || 0) : discomType === 'three_phase' ? (rates?.discomThreePhaseCost || 0) : discomType === 'lt' ? (rates?.discomLtCost || 0) : (rates?.discomHtCost || 0)}</td>
                        <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.discomCost)}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50">
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{sno++}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300">
                        <strong>Installation & Commissioning:</strong> On-site mechanics, engineering execution, panel staging, and commissioning
                      </td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">{systemKW}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-center">kW</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">₹{rates?.installationRate || 0}</td>
                      <td className="text-xs text-slate-700 px-3 py-2 border border-slate-300 text-right">{formatINR(calc.installCost)}</td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>

          <div className="flex justify-end mb-6 avoid-break">
            <div className="w-1/2 space-y-2 border-2 border-[#eab308] bg-[#fefcf0]/50 rounded-lg p-3">
              <div className="flex justify-between text-xs text-slate-700">
                <span>Base Project Cost:</span>
                <span className="font-semibold text-slate-800">{formatINR(calc.baseTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-700">
                <span>GST (8.90%):</span>
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
          {/* Page break for printing */}
          <div className="page-break" style={{ pageBreakBefore: "always" }} />

          {/* Minimal Header on Page 2 for Print */}
          <div className="print-only flex justify-between items-center border-b border-slate-200 pb-2 mb-6 mt-4">
            <img src="/divvy_photo.png" alt="Divvy Solar Logo" className="w-[120px] h-auto object-contain block" />
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              {projectCategory === "residential" ? "RESIDENTIAL OFFER" : projectCategory === "industrial" ? "INDUSTRIAL PROPOSAL" : "UTILITY-SCALE PROPOSAL"} | Quote Ref: {quoteRef || `DS/QP/${new Date().getFullYear()}/---`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200 mb-8 avoid-break">
            <div>
              <h4 className="text-xs font-bold text-[#1e3a8a] uppercase mb-2 tracking-wider">Payment Milestones Schedule</h4>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li className="flex justify-between">
                  <span>1. Advance Booking Amount (10%):</span>
                  <span className="font-bold">{formatINR(calc.grandTotal * 0.1)}</span>
                </li>
                <li className="flex justify-between">
                  <span>2. Material Dispatch Stage (85%):</span>
                  <span className="font-bold">{formatINR(calc.grandTotal * 0.85)}</span>
                </li>
                <li className="flex justify-between">
                  <span>3. Post-Commissioning Handover (5%):</span>
                  <span className="font-bold">{formatINR(calc.grandTotal * 0.05)}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#1e3a8a] uppercase mb-2 tracking-wider">Project Execution Terms</h4>
              <ul className="text-[10px] text-slate-600 list-disc list-inside space-y-1">
                <li>Estimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.</li>
                <li>Grid integration approvals (Net Metering) timeline varies according to State DISCOM.</li>
                <li>Quotation validity: 15 days from the date of issuance.</li>
                <li>Warranty: 25 years performance warranty on solar modules, 5 years on grid-tie inverters.</li>
                {customTerms && customTerms.split('\n').map((term, i) => (
                  term.trim() && <li key={i} className="font-semibold text-slate-700">{term}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-200 text-xs text-slate-500 avoid-break">
            <div className="w-1/3 text-center border-t border-slate-300 pt-2 font-semibold text-slate-700">
              Authorized Signatory <br />
              <strong>Divvy Solar Representative</strong>
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
