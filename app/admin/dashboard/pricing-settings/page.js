"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  CubeIcon, 
  BoltIcon, 
  WrenchScrewdriverIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  PlusIcon, 
  TrashIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

const MODULE_BRANDS = ["waaree", "vikram", "adani", "jakson", "havells", "luminous"];
const INVERTER_BRANDS = ["havells","luminous","utl","sungrow","invergy"];
const STRUCTURE_TYPES_ADMIN = [
  { v: "ms_fabricated", l: "MS Fabricated" },
  { v: "gi", l: "GI Structure" },
  { v: "hot_dip_gi", l: "Hot-dip GI" },
  { v: "alu_monorail", l: "Aluminium Monorail" },
  { v: "alu_longrail", l: "Aluminium Long rail" },
  { v: "ground_gi", l: "Ground - GI Structure" },
  { v: "ground_hot_dip", l: "Ground - Hot-dip GI" },
  { v: "ground_galvalume", l: "Ground - Galvalume" },
];
const cap = s => (s && typeof s === 'string') ? (s.charAt(0).toUpperCase() + s.slice(1)) : (s || '');

const NumInput = ({label,value,onChange,unit="₹"}) => {
  const [localVal, setLocalVal] = useState((value ?? "").toString());

  useEffect(() => {
    if (value !== undefined && Number(localVal) !== value) {
      setLocalVal(value === 0 ? "0" : value.toString());
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">{unit}</span>
        <input 
          type="text" 
          value={localVal} 
          onChange={e => {
            const raw = e.target.value;
            if (raw === "" || /^\d*\.?\d*$/.test(raw)) {
              let cleaned = raw;
              if (raw.startsWith('0') && raw.length > 1 && !raw.startsWith('0.')) {
                cleaned = raw.replace(/^0+/, '') || '0';
              }
              setLocalVal(cleaned);
              onChange(cleaned === "" || cleaned === "." ? 0 : Number(cleaned));
            }
          }}
          onBlur={() => {
            const num = Number(localVal);
            setLocalVal(isNaN(num) ? "0" : num.toString());
          }}
          onFocus={e => e.target.select()}
          className="w-full pl-8 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all" 
          placeholder="0"
        />
      </div>
    </div>
  );
};

const TextInput = ({label,value,onChange,placeholder=""}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
    <input type="text" value={value??""} onChange={e=>onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all" placeholder={placeholder}/>
  </div>
);

/* ── Solar Module Model list manager with Rate ── */
function ModuleModelManager({ models = [], onAdd, onRemove, onToggle, onUpdateName, onUpdateRate }) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {models.map((m, i) => (
          <div key={m._id || i} className="flex items-center gap-2 bg-white/3 rounded-xl px-3 py-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => onToggle(i)}
              className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 transition-all ${m.inStock ? "bg-[#FECB00] border-[#FECB00]" : "bg-transparent border-white/30"}`}
              title={m.inStock ? "In Stock — click to mark Out of Stock" : "Out of Stock — click to mark In Stock"}
            >
              {m.inStock && (
                <svg className="w-2.5 h-2.5 text-[#0a1122] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <input
              value={m.modelName || ""}
              onChange={e => onUpdateName(i, e.target.value)}
              className="flex-1 min-w-[140px] bg-transparent text-white text-sm outline-none"
              placeholder="Model/Type (e.g. TopCon DCR)"
            />
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
              <span className="text-white/40 text-xs">₹</span>
              <input
                type="number"
                step="0.1"
                value={m.ratePerWp ?? ""}
                onChange={e => onUpdateRate(i, Number(e.target.value))}
                onFocus={e => e.target.select()}
                className="w-20 bg-transparent text-white text-sm outline-none text-right"
                placeholder="15.5"
              />
              <span className="text-white/40 text-xs font-semibold">/Wp</span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0 p-1"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Model/Type (e.g. TopCon DCR)"
          className="flex-1 min-w-[140px] px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"
        />
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={e => setRate(e.target.value)}
          placeholder="Rate (₹/Wp)"
          onFocus={e => e.target.select()}
          className="w-28 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"
        />
        <button
          type="button"
          onClick={() => {
            if (name && rate) {
              onAdd({
                modelName: name,
                wattage: 550,
                ratePerWp: Number(rate),
                inStock: true
              });
              setName("");
              setRate("");
            }
          }}
          className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1 transition-all flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}
        >
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
}

/* ── Generic Inverter / Other Model list manager ── */
function ModelManager({title,models=[],onAdd,onRemove,onToggle,onUpdateName,onUpdateRate,rateField,rateLabel}) {
  const [name,setName] = useState("");
  const [rate,setRate] = useState("");

  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-bold text-white/70">{title}</h3>}
      <div className="space-y-2">
        {models.map((m,i)=>(
          <div key={m._id||i} className="flex items-center gap-2 bg-white/3 rounded-xl px-3 py-2">
            <button type="button" onClick={()=>onToggle(i)}
              className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 transition-all ${m.inStock?"bg-[#FECB00] border-[#FECB00]":"bg-transparent border-white/30"}`}
              title={m.inStock?"In Stock — click to mark Out of Stock":"Out of Stock — click to mark In Stock"}>
              {m.inStock && <svg className="w-2.5 h-2.5 text-[#0a1122] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </button>
            <input value={m.modelName} onChange={e=>onUpdateName(i,e.target.value)}
              className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Model name"/>
            <span className="text-white/30 text-xs">₹</span>
            <input type="number" value={m[rateField]??""} onChange={e=>onUpdateRate(i,Number(e.target.value))}
              onFocus={e => e.target.select()}
              className="w-24 bg-transparent text-white text-sm outline-none text-right"/>
            <span className="text-white/30 text-xs">{rateLabel}</span>
            <button type="button" onClick={()=>onRemove(i)} className="text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0">
              <TrashIcon className="w-4 h-4"/>
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Model name (e.g. Havells 10kW)"
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"/>
        <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder={`Rate (${rateLabel})`}
          onFocus={e => e.target.select()}
          className="w-32 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"/>
        <button type="button" onClick={()=>{if(name&&rate){onAdd({modelName:name,[rateField]:Number(rate),inStock:true});setName("");setRate("");}}}
          className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1 transition-all"
          style={{background:"linear-gradient(135deg,#FECB00,#EBB800)",color:"#0a1122"}}>
          <PlusIcon className="w-4 h-4"/> Add
        </button>
      </div>
    </div>
  );
}

export default function PricingSettingsPage() {
  const {data:session,status} = useSession();
  const router = useRouter();
  const [rates,setRates] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [toast,setToast] = useState(null);
  const [newModuleBrand, setNewModuleBrand] = useState("");
  const [newInverterBrand, setNewInverterBrand] = useState("");
  const [newBatteryBrand, setNewBatteryBrand] = useState("");

  useEffect(()=>{
    if(status==="authenticated" && session?.user?.role!=="admin" && session?.user?.role!=="finance") router.push("/admin/dashboard");
  },[status,session,router]);

  const fetchRates = useCallback(async()=>{
    try { const r=await fetch("/api/pricing/rates"); const j=await r.json(); if(j.success) setRates(j.data); }
    catch(e){console.error(e);}
    finally{setLoading(false);}
  },[]);

  useEffect(()=>{ if(status==="authenticated") fetchRates(); },[status,fetchRates]);

  const update = (path,val) => setRates(prev=>{
    const c=JSON.parse(JSON.stringify(prev));
    const keys=path.split(".");
    let r=c;
    for(let i=0;i<keys.length-1;i++){if(!r[keys[i]])r[keys[i]]={};r=r[keys[i]];}
    r[keys[keys.length-1]]=val;
    return c;
  });

  // Module brand & model helpers
  const addModuleBrand = (brandName) => {
    const clean = brandName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!clean) return;
    setRates(p => ({
      ...p,
      modules: {
        ...(p.modules || {}),
        [clean]: p.modules?.[clean] || []
      }
    }));
  };

  const deleteModuleBrand = (brandName) => {
    if (!window.confirm(`Are you sure you want to remove the brand "${cap(brandName)}"?`)) return;
    setRates(p => {
      const updated = { ...(p.modules || {}) };
      delete updated[brandName];
      return { ...p, modules: updated };
    });
  };

  const addModuleModel = (brand,m) => setRates(p=>({...p,modules:{...p.modules,[brand]:[...(p.modules?.[brand]||[]),m]}}));
  const removeModuleModel = (brand,i) => setRates(p=>({...p,modules:{...p.modules,[brand]:(p.modules?.[brand]||[]).filter((_,idx)=>idx!==i)}}));
  const toggleModuleStock = (brand,i) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],inStock:!arr[i].inStock};return {...p,modules:{...p.modules,[brand]:arr}};});
  const updateModuleName = (brand,i,v) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],modelName:v};return {...p,modules:{...p.modules,[brand]:arr}};});
  const updateModuleRate = (brand,i,v) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],ratePerWp:v};return {...p,modules:{...p.modules,[brand]:arr}};});

  // Inverter brand & model helpers
  const addInverterBrand = (brandName) => {
    const clean = brandName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!clean) return;
    setRates(p => ({
      ...p,
      inverters: {
        ...(p.inverters || {}),
        [clean]: p.inverters?.[clean] || []
      }
    }));
  };

  const deleteInverterBrand = (brandName) => {
    if (!window.confirm(`Are you sure you want to remove the brand "${cap(brandName)}"?`)) return;
    setRates(p => {
      const updated = { ...(p.inverters || {}) };
      delete updated[brandName];
      return { ...p, inverters: updated };
    });
  };

  const addInverterModel = (brand,m) => setRates(p=>({...p,inverters:{...p.inverters,[brand]:[...(p.inverters?.[brand]||[]),m]}}));
  const removeInverterModel = (brand,i) => setRates(p=>({...p,inverters:{...p.inverters,[brand]:(p.inverters?.[brand]||[]).filter((_,idx)=>idx!==i)}}));
  const toggleInverterStock = (brand,i) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],inStock:!arr[i].inStock};return {...p,inverters:{...p.inverters,[brand]:arr}};});
  const updateInverterName = (brand,i,v) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],modelName:v};return {...p,inverters:{...p.inverters,[brand]:arr}};});
  const updateInverterRate = (brand,i,v) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],ratePerKW:v};return {...p,inverters:{...p.inverters,[brand]:arr}};});

  // Battery brand & model helpers (for Hybrid & Off-grid)
  const addBatteryBrand = (brandName) => {
    const clean = brandName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!clean) return;
    setRates(p => ({
      ...p,
      batteries: {
        ...(p.batteries || {}),
        [clean]: p.batteries?.[clean] || []
      }
    }));
  };

  const deleteBatteryBrand = (brandName) => {
    if (!window.confirm(`Are you sure you want to remove the battery brand "${cap(brandName)}"?`)) return;
    setRates(p => {
      const updated = { ...(p.batteries || {}) };
      delete updated[brandName];
      return { ...p, batteries: updated };
    });
  };

  const addBatteryModel = (brand,m) => setRates(p=>({...p,batteries:{...p.batteries,[brand]:[...(p.batteries?.[brand]||[]),m]}}));
  const removeBatteryModel = (brand,i) => setRates(p=>({...p,batteries:{...p.batteries,[brand]:(p.batteries?.[brand]||[]).filter((_,idx)=>idx!==i)}}));
  const toggleBatteryStock = (brand,i) => setRates(p=>{const arr=[...(p.batteries?.[brand]||[])];arr[i]={...arr[i],inStock:!arr[i].inStock};return {...p,batteries:{...p.batteries,[brand]:arr}};});
  const updateBatteryName = (brand,i,v) => setRates(p=>{const arr=[...(p.batteries?.[brand]||[])];arr[i]={...arr[i],modelName:v};return {...p,batteries:{...p.batteries,[brand]:arr}};});
  const updateBatteryRate = (brand,i,v) => setRates(p=>{const arr=[...(p.batteries?.[brand]||[])];arr[i]={...arr[i],ratePerUnit:v};return {...p,batteries:{...p.batteries,[brand]:arr}};});

  const handleSave = async()=>{
    setSaving(true);
    try {
      const r=await fetch("/api/pricing/rates",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(rates)});
      const j=await r.json();
      if(j.success){setRates(j.data);setToast({type:"success",message:"Rates saved!"});}
      else setToast({type:"error",message:j.error||"Save failed"});
    } catch(e){setToast({type:"error",message:"Network error"});}
    finally{setSaving(false);setTimeout(()=>setToast(null),4000);}
  };

  const isAdmin = session?.user?.role === "admin";

  if(loading||!rates) return (
    <div className="flex items-center justify-center py-32">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#FECB00]/20"/>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#FECB00] animate-spin"/>
      </div>
    </div>
  );

  const allModuleBrands = Array.from(new Set([
    "waaree", "vikram", "adani", "jakson", "havells", "luminous", "eastman",
    ...Object.keys(rates.modules || {}).filter(k => k !== 'typeAdder' && !k.startsWith('$'))
  ]));

  const allInverterBrands = Array.from(new Set([
    "havells", "luminous", "utl", "sungrow", "invergy", "eastman",
    ...Object.keys(rates.inverters || {}).filter(k => !k.startsWith('$'))
  ]));

  const allBatteryBrands = Array.from(new Set([
    "eastman", "exide", "luminous", "livguard", "amaron", "dyness",
    ...Object.keys(rates.batteries || {}).filter(k => !k.startsWith('$'))
  ]));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Pricing Settings</h1>
          <p className="text-white/50 text-sm mt-1">Manage models, rates & availability. Changes reflect instantly for salespersons.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{background:"linear-gradient(135deg,#FECB00,#EBB800)",color:"#0a1122"}}>
          {saving?"Saving...":"Save All Rates"}
        </button>
      </div>

      {toast && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${toast.type==="success"?"bg-green-500/10 border border-green-500/20 text-green-400":"bg-red-500/10 border border-red-500/20 text-red-400"}`}>
          {toast.type==="success"?<CheckCircleIcon className="w-5 h-5"/>:<ExclamationTriangleIcon className="w-5 h-5"/>}
          {toast.message}
        </div>
      )}

      {/* ── 0. Financial & Percentage Controls (Admin Only) ── */}
      {isAdmin && (
        <section className="rounded-2xl bg-[#0b1329] border-2 border-[#FECB00]/40 p-6 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FECB00]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-start sm:items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FECB00]/15 border border-[#FECB00]/30 flex items-center justify-center text-[#FECB00]">
                <BanknotesIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-white">
                    Residential Pricing &amp; Margin Controls
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FECB00] text-[#070b15]">
                    Admin Full Power
                  </span>
                </div>
                <p className="text-white/50 text-xs mt-0.5">
                  Set company profit margins, salesperson discount negotiation limits, and composite GST rate.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-semibold">
                Residential: {rates.financialSettings?.residential?.profitMarginPercent ?? rates.financialSettings?.profitMarginPercent ?? 17}%
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-400 font-semibold">
                Industrial (100 kW+): {rates.financialSettings?.industrial?.profitMarginPercent ?? 8}%
              </span>
            </div>
          </div>

          {/* Key Percentage Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Residential Controls */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Residential Solar</span>
                <span className="text-[10px] text-emerald-400/70 bg-emerald-400/10 px-2 py-0.5 rounded">Rooftop</span>
              </div>
              <NumInput 
                label="Residential Profit Margin" 
                value={rates.financialSettings?.residential?.profitMarginPercent ?? rates.financialSettings?.profitMarginPercent ?? 17} 
                onChange={v => {
                  update("financialSettings.residential.profitMarginPercent", v);
                  update("financialSettings.profitMarginPercent", v);
                }} 
                unit="%" 
              />
              <NumInput 
                label="Max Sales Discount" 
                value={rates.financialSettings?.residential?.maxDiscountPercent ?? rates.financialSettings?.maxDiscountPercent ?? 5} 
                onChange={v => {
                  update("financialSettings.residential.maxDiscountPercent", v);
                  update("financialSettings.maxDiscountPercent", v);
                }} 
                unit="%" 
              />
              <p className="text-[10.5px] text-emerald-300/80 leading-relaxed">
                Applied on Residential Rooftop systems and plants under 100 kWp.
              </p>
            </div>

            {/* Industrial Controls */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Industrial & Commercial</span>
                <span className="text-[10px] text-blue-400/70 bg-blue-400/10 px-2 py-0.5 rounded">100 kW+ / C&I</span>
              </div>
              <NumInput 
                label="Industrial Profit Margin" 
                value={rates.financialSettings?.industrial?.profitMarginPercent ?? 8} 
                onChange={v => update("financialSettings.industrial.profitMarginPercent", v)} 
                unit="%" 
              />
              <NumInput 
                label="Max Allowed Discount" 
                value={rates.financialSettings?.industrial?.maxDiscountPercent ?? 3} 
                onChange={v => update("financialSettings.industrial.maxDiscountPercent", v)} 
                unit="%" 
              />
              <p className="text-[10.5px] text-blue-300/80 leading-relaxed">
                Applied on Industrial proposals and large projects 100 kWp & above.
              </p>
            </div>

            {/* General GST & Financials */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Tax & Milestones</span>
                <span className="text-[10px] text-white/40 bg-white/10 px-2 py-0.5 rounded">Statutory</span>
              </div>
              <NumInput 
                label="Standard Solar GST" 
                value={rates.financialSettings?.gstPercent ?? 8.9} 
                onChange={v => update("financialSettings.gstPercent", v)} 
                unit="%" 
              />
              <p className="text-[10.5px] text-slate-400 leading-relaxed">
                Standard composite EPC GST rate on complete solar supply & installation (8.90%).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Module Brands ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <CubeIcon className="w-6 h-6 text-[#FECB00]"/>
            <div>
              <h2 className="text-lg font-bold text-white">Solar Module Models (₹/Wp)</h2>
              <p className="text-white/40 text-xs mt-0.5">Yellow checkbox = In Stock (visible to salesperson). Untick = Out of Stock (hidden).</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={newModuleBrand}
              onChange={e => setNewModuleBrand(e.target.value)}
              placeholder="New Brand (e.g. Eastman)"
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 w-44"
              onKeyDown={e => {
                if (e.key === "Enter" && newModuleBrand.trim()) {
                  addModuleBrand(newModuleBrand);
                  setNewModuleBrand("");
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (newModuleBrand.trim()) {
                  addModuleBrand(newModuleBrand);
                  setNewModuleBrand("");
                }
              }}
              className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
              style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}
            >
              <PlusIcon className="w-3.5 h-3.5" /> Add Brand
            </button>
          </div>
        </div>

        {allModuleBrands.map(brand=>(
          <div key={brand} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white">{cap(brand)}</h3>
              <button
                type="button"
                onClick={() => deleteModuleBrand(brand)}
                className="text-xs text-red-400/50 hover:text-red-400 flex items-center gap-1 transition-colors p-1"
                title={`Remove ${cap(brand)} brand`}
              >
                <TrashIcon className="w-3.5 h-3.5" /> Remove Brand
              </button>
            </div>
            <ModuleModelManager
              models={rates.modules?.[brand]||[]}
              onAdd={m=>addModuleModel(brand,m)}
              onRemove={i=>removeModuleModel(brand,i)}
              onToggle={i=>toggleModuleStock(brand,i)}
              onUpdateName={(i,v)=>updateModuleName(brand,i,v)}
              onUpdateRate={(i,v)=>updateModuleRate(brand,i,v)}
            />
          </div>
        ))}
      </section>

      {/* ── Inverter Brands ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <BoltIcon className="w-6 h-6 text-[#FECB00]"/>
            <div>
              <h2 className="text-lg font-bold text-white">Inverter Models (₹/Unit)</h2>
              <p className="text-white/40 text-xs mt-0.5">Toggle stock status per model.</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={newInverterBrand}
              onChange={e => setNewInverterBrand(e.target.value)}
              placeholder="New Brand (e.g. Eastman)"
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 w-44"
              onKeyDown={e => {
                if (e.key === "Enter" && newInverterBrand.trim()) {
                  addInverterBrand(newInverterBrand);
                  setNewInverterBrand("");
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (newInverterBrand.trim()) {
                  addInverterBrand(newInverterBrand);
                  setNewInverterBrand("");
                }
              }}
              className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
              style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}
            >
              <PlusIcon className="w-3.5 h-3.5" /> Add Brand
            </button>
          </div>
        </div>

        {allInverterBrands.map(brand=>(
          <div key={brand} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white">{cap(brand)}</h3>
              <button
                type="button"
                onClick={() => deleteInverterBrand(brand)}
                className="text-xs text-red-400/50 hover:text-red-400 flex items-center gap-1 transition-colors p-1"
                title={`Remove ${cap(brand)} brand`}
              >
                <TrashIcon className="w-3.5 h-3.5" /> Remove Brand
              </button>
            </div>
            <ModelManager
              title="" models={rates.inverters?.[brand]||[]}
              onAdd={m=>addInverterModel(brand,m)}
              onRemove={i=>removeInverterModel(brand,i)}
              onToggle={i=>toggleInverterStock(brand,i)}
              onUpdateName={(i,v)=>updateInverterName(brand,i,v)}
              onUpdateRate={(i,v)=>updateInverterRate(brand,i,v)}
              rateField="ratePerKW" rateLabel="₹/Unit"
            />
          </div>
        ))}
      </section>

      {/* ── Battery Storage Brands (for Hybrid Solar) ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-[#FECB00]/20 flex items-center justify-center text-[#FECB00] font-bold text-xs">⚡</div>
            <div>
              <h2 className="text-lg font-bold text-white">Battery Storage Models (₹/Unit)</h2>
              <p className="text-white/40 text-xs mt-0.5">Configured for Hybrid Solar systems (Tubular & Lithium LFP).</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={newBatteryBrand}
              onChange={e => setNewBatteryBrand(e.target.value)}
              placeholder="New Brand (e.g. Dyness)"
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 w-44"
              onKeyDown={e => {
                if (e.key === "Enter" && newBatteryBrand.trim()) {
                  addBatteryBrand(newBatteryBrand);
                  setNewBatteryBrand("");
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (newBatteryBrand.trim()) {
                  addBatteryBrand(newBatteryBrand);
                  setNewBatteryBrand("");
                }
              }}
              className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
              style={{ background: "linear-gradient(135deg,#FECB00,#EBB800)", color: "#0a1122" }}
            >
              <PlusIcon className="w-3.5 h-3.5" /> Add Brand
            </button>
          </div>
        </div>

        {allBatteryBrands.map(brand=>(
          <div key={brand} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white">{cap(brand)}</h3>
              <button
                type="button"
                onClick={() => deleteBatteryBrand(brand)}
                className="text-xs text-red-400/50 hover:text-red-400 flex items-center gap-1 transition-colors p-1"
                title={`Remove ${cap(brand)} brand`}
              >
                <TrashIcon className="w-3.5 h-3.5" /> Remove Brand
              </button>
            </div>
            <ModelManager
              title="" models={rates.batteries?.[brand]||[]}
              onAdd={m=>addBatteryModel(brand,m)}
              onRemove={i=>removeBatteryModel(brand,i)}
              onToggle={i=>toggleBatteryStock(brand,i)}
              onUpdateName={(i,v)=>updateBatteryName(brand,i,v)}
              onUpdateRate={(i,v)=>updateBatteryRate(brand,i,v)}
              rateField="ratePerUnit" rateLabel="₹/Unit"
            />
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <WrenchScrewdriverIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">Structure Rates (₹/kW)</h2>
            <p className="text-white/40 text-xs mt-0.5">Flat rate per kW for each structure type.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {STRUCTURE_TYPES_ADMIN.map(mat=>(
            <NumInput key={mat.v} label={mat.l} value={rates.structure?.[mat.v]?.ratePerKw} onChange={v=>update(`structure.${mat.v}.ratePerKw`,v)}/>
          ))}
        </div>
      </section>

      {/* ── BOS & Scaling ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">BOS, Cabling & Installation Rates</h2>
            <p className="text-white/40 text-xs mt-0.5">Per-kW scaling items auto-calculate based on system size.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <NumInput label="Earthing Pit (Cu) (₹/pit)" value={rates.earthingPitRateCu ?? 3500} onChange={v=>update("earthingPitRateCu",v)}/>
          <NumInput label="Earthing GI Strip (₹/m)" value={rates.earthingGiStripRate ?? 65} onChange={v=>update("earthingGiStripRate",v)}/>
          <NumInput label="Earthing Cu Wire 4 sqmm (₹/m)" value={rates.earthingCu4Rate ?? 45} onChange={v=>update("earthingCu4Rate",v)}/>
          <NumInput label="Earthing Cu Wire 6 sqmm (₹/m)" value={rates.earthingCu6Rate ?? 65} onChange={v=>update("earthingCu6Rate",v)}/>
          <NumInput label="Earthing Cu Wire 10 sqmm (₹/m)" value={rates.earthingCu10Rate ?? 105} onChange={v=>update("earthingCu10Rate",v)}/>
          <NumInput label="Earthing Cu Wire 16 sqmm (₹/m)" value={rates.earthingCu16Rate ?? 165} onChange={v=>update("earthingCu16Rate",v)}/>
          <NumInput label="Earthing Cu Wire 25 sqmm (₹/m)" value={rates.earthingCu25Rate ?? 260} onChange={v=>update("earthingCu25Rate",v)}/>
          <NumInput label="Earthing Cu Wire 35 sqmm (₹/m)" value={rates.earthingCu35Rate ?? 360} onChange={v=>update("earthingCu35Rate",v)}/>

          <NumInput label="LA Conventional (₹/unit)" value={rates.laConventionalRate} onChange={v=>update("laConventionalRate",v)}/>
          <NumInput label="LA ESE (₹/unit)" value={rates.laEseRate} onChange={v=>update("laEseRate",v)}/>

          <NumInput label="GI Walkway (₹/m)" value={rates.walkwayGiRate} onChange={v=>update("walkwayGiRate",v)}/>
          <NumInput label="FRP Walkway (₹/m)" value={rates.walkwayFrpRate} onChange={v=>update("walkwayFrpRate",v)}/>
          <NumInput label="Safety Line (₹/m)" value={rates.safetyLineRate} onChange={v=>update("safetyLineRate",v)}/>
          <NumInput label="MC4 Connectors (₹/pair)" value={rates.mc4ConnectorRate} onChange={v=>update("mc4ConnectorRate",v)}/>
          <NumInput label="ACDB Combiner (₹/kW)" value={rates.acdbRatePerKw} onChange={v=>update("acdbRatePerKw",v)}/>
          <NumInput label="DCDB Combiner (₹/kW)" value={rates.dcdbRatePerKw} onChange={v=>update("dcdbRatePerKw",v)}/>
          <NumInput label="Branch/Y-Connectors (₹/nos)" value={rates.branchConnectorRate} onChange={v=>update("branchConnectorRate",v)}/>
          {rates.dcCables?.map((c, i) => (
            <NumInput key={c._id || i} label={c.label || `DC Cable ${i}`} value={c.ratePerMeter} onChange={v=>setRates(p=>{const n=[...(p.dcCables||[])];n[i]={...n[i],ratePerMeter:v};return{...p,dcCables:n}})}/>
          ))}
          <NumInput label="DISCOM (Single Phase) (₹ flat)" value={rates.discomSinglePhaseCost} onChange={v=>update("discomSinglePhaseCost",v)}/>
          <NumInput label="DISCOM (Three Phase) (₹ flat)" value={rates.discomThreePhaseCost} onChange={v=>update("discomThreePhaseCost",v)}/>
          <NumInput label="DISCOM (LT) (₹ flat)" value={rates.discomLtCost} onChange={v=>update("discomLtCost",v)}/>
          <NumInput label="DISCOM (HT) (₹ flat)" value={rates.discomHtCost} onChange={v=>update("discomHtCost",v)}/>
          <NumInput label="Installation: Rooftop RCC (₹/kW)" value={rates.installationRateRcc} onChange={v=>update("installationRateRcc",v)}/>
          <NumInput label="Installation: GroundMounted (₹/kW)" value={rates.installationRateGround} onChange={v=>update("installationRateGround",v)}/>
          <NumInput label="Installation: Shed (₹/kW)" value={rates.installationRateShed} onChange={v=>update("installationRateShed",v)}/>
        </div>
      </section>

      {/* ── AC Cables Matrix ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BoltIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">AC Cables Matrix (₹/m)</h2>
            <p className="text-white/40 text-xs mt-0.5">Rates for Aluminium AC cables (2 Core &amp; 4 Core Armoured AC cables).</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {rates.acCables?.filter(c => c.conductor === 'aluminium' || c.conductor !== 'copper').map((c, i) => (
            <NumInput key={c._id || i} label={c.label} value={c.ratePerMeter} onChange={v=>setRates(p=>{const n=[...(p.acCables||[])];n[i]={...n[i],ratePerMeter:v};return{...p,acCables:n}})}/>
          ))}
        </div>
      </section>

      {/* ── 8. Financial Markups & Segment Profit Margins (Admin & Finance) ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BanknotesIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">Segment Profit Margins &amp; Financial Controls</h2>
            <p className="text-white/40 text-xs mt-0.5">Control company profit margins and discount limits independently for Residential vs Industrial projects.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Residential Card */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-[#FECB00] uppercase tracking-wider">Residential Solar (&lt; 100 kW)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Standard Tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumInput 
                label="Profit Margin %" 
                unit="%" 
                value={rates.financialSettings?.residential?.profitMarginPercent ?? (rates.financialSettings?.profitMarginPercent ?? 17)} 
                onChange={v => update("financialSettings.residential.profitMarginPercent", v)}
              />
              <NumInput 
                label="Max Sales Discount %" 
                unit="%" 
                value={rates.financialSettings?.residential?.maxDiscountPercent ?? (rates.financialSettings?.maxDiscountPercent ?? 5)} 
                onChange={v => update("financialSettings.residential.maxDiscountPercent", v)}
              />
            </div>
          </div>

          {/* Industrial / C&I Card */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-[#FECB00] uppercase tracking-wider">Industrial &amp; Commercial (100 kW+ / C&amp;I)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Volume / C&amp;I Tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumInput 
                label="Profit Margin %" 
                unit="%" 
                value={rates.financialSettings?.industrial?.profitMarginPercent ?? 8} 
                onChange={v => update("financialSettings.industrial.profitMarginPercent", v)}
              />
              <NumInput 
                label="Max Sales Discount %" 
                unit="%" 
                value={rates.financialSettings?.industrial?.maxDiscountPercent ?? 3} 
                onChange={v => update("financialSettings.industrial.maxDiscountPercent", v)}
              />
            </div>
          </div>
        </div>

        {/* Global GST & Payment Milestones */}
        <div className="pt-2 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <NumInput 
            label="Standard Solar GST %" 
            unit="%" 
            value={rates.financialSettings?.gstPercent ?? 8.9} 
            onChange={v => update("financialSettings.gstPercent", v)}
          />
          <NumInput 
            label="Advance Booking %" 
            unit="%" 
            value={rates.financialSettings?.advancePaymentPercent ?? 10} 
            onChange={v => update("financialSettings.advancePaymentPercent", v)}
          />
          <NumInput 
            label="Material Dispatch %" 
            unit="%" 
            value={rates.financialSettings?.dispatchPaymentPercent ?? 85} 
            onChange={v => update("financialSettings.dispatchPaymentPercent", v)}
          />
          <NumInput 
            label="Handover / Comm. %" 
            unit="%" 
            value={rates.financialSettings?.handoverPaymentPercent ?? 5} 
            onChange={v => update("financialSettings.handoverPaymentPercent", v)}
          />
        </div>
      </section>


      {/* ── 9. Standard Company Terms & Conditions (Fixed on Proposals) ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <DocumentTextIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">Standard Company Terms &amp; Conditions</h2>
            <p className="text-white/40 text-xs mt-0.5">Fixed standard terms that will automatically print on all customer proposals. (One term per line).</p>
          </div>
        </div>
        <div>
          <textarea
            rows={6}
            value={rates.standardTerms ?? ""}
            onChange={e => update("standardTerms", e.target.value)}
            placeholder="e.g.&#10;Payment Mode: Milestone Payments (Bank Transfer / RTGS / Cheque)&#10;Estimated Delivery: 4 to 6 weeks from structural layout approval.&#10;Grid integration approvals timeline varies according to State DISCOM.&#10;Quotation validity: 15 days from the date of issuance.&#10;Warranty: 25 years performance warranty on solar modules, 5 years on inverters."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all font-mono leading-relaxed resize-y"
          />
        </div>
      </section>

      {/* Bottom Save */}
      <div className="flex justify-end pb-8">
        <button onClick={handleSave} disabled={saving}
          className="px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{background:"linear-gradient(135deg,#FECB00,#EBB800)",color:"#0a1122"}}>
          {saving?"Saving...":"Save All Rates"}
        </button>
      </div>
    </div>
  );
}
