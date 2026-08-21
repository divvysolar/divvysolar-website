"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CubeIcon, BoltIcon, WrenchScrewdriverIcon, ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const MODULE_BRANDS = ["waaree","vikram","jakson","adani","havells","luminous"];
const INVERTER_BRANDS = ["havells","luminous","utl","sungrow"];
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
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);

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

/* ── Model list manager ── */
function ModelManager({title,models=[],onAdd,onRemove,onToggle,onUpdateName,onUpdateRate,rateField,rateLabel}) {
  const [name,setName] = useState("");
  const [rate,setRate] = useState("");

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-white/70">{title}</h3>
      <div className="space-y-2">
        {models.map((m,i)=>(
          <div key={m._id||i} className="flex items-center gap-2 bg-white/3 rounded-xl px-3 py-2">
            <button onClick={()=>onToggle(i)}
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
            <button onClick={()=>onRemove(i)} className="text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0">
              <TrashIcon className="w-4 h-4"/>
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Model name (e.g. Waaree 540Wp Mono)"
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"/>
        <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder={`Rate (${rateLabel})`}
          onFocus={e => e.target.select()}
          className="w-32 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"/>
        <button onClick={()=>{if(name&&rate){onAdd({modelName:name,[rateField]:Number(rate),inStock:true});setName("");setRate("");}}}
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

  useEffect(()=>{
    if(status==="authenticated" && session?.user?.role!=="admin") router.push("/admin/dashboard");
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

  // Module model helpers
  const addModuleModel = (brand,m) => setRates(p=>({...p,modules:{...p.modules,[brand]:[...(p.modules?.[brand]||[]),m]}}));
  const removeModuleModel = (brand,i) => setRates(p=>({...p,modules:{...p.modules,[brand]:(p.modules?.[brand]||[]).filter((_,idx)=>idx!==i)}}));
  const toggleModuleStock = (brand,i) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],inStock:!arr[i].inStock};return {...p,modules:{...p.modules,[brand]:arr}};});
  const updateModuleName = (brand,i,v) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],modelName:v};return {...p,modules:{...p.modules,[brand]:arr}};});
  const updateModuleRate = (brand,i,v) => setRates(p=>{const arr=[...(p.modules?.[brand]||[])];arr[i]={...arr[i],ratePerWp:v};return {...p,modules:{...p.modules,[brand]:arr}};});

  // Inverter model helpers
  const addInverterModel = (brand,m) => setRates(p=>({...p,inverters:{...p.inverters,[brand]:[...(p.inverters?.[brand]||[]),m]}}));
  const removeInverterModel = (brand,i) => setRates(p=>({...p,inverters:{...p.inverters,[brand]:(p.inverters?.[brand]||[]).filter((_,idx)=>idx!==i)}}));
  const toggleInverterStock = (brand,i) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],inStock:!arr[i].inStock};return {...p,inverters:{...p.inverters,[brand]:arr}};});
  const updateInverterName = (brand,i,v) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],modelName:v};return {...p,inverters:{...p.inverters,[brand]:arr}};});
  const updateInverterRate = (brand,i,v) => setRates(p=>{const arr=[...(p.inverters?.[brand]||[])];arr[i]={...arr[i],ratePerKW:v};return {...p,inverters:{...p.inverters,[brand]:arr}};});

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

  if(loading||!rates) return (
    <div className="flex items-center justify-center py-32">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#FECB00]/20"/>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#FECB00] animate-spin"/>
      </div>
    </div>
  );

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

      {/* ── Module Brands ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <CubeIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">Solar Module Models (₹/Wp)</h2>
            <p className="text-white/40 text-xs mt-0.5">Yellow checkbox = In Stock (visible to salesperson). Untick = Out of Stock (hidden).</p>
          </div>
        </div>

        {MODULE_BRANDS.map(brand=>(
          <div key={brand} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
            <h3 className="text-sm font-black text-white">{cap(brand)}</h3>
            <ModelManager
              title="" models={rates.modules?.[brand]||[]}
              onAdd={m=>addModuleModel(brand,m)}
              onRemove={i=>removeModuleModel(brand,i)}
              onToggle={i=>toggleModuleStock(brand,i)}
              onUpdateName={(i,v)=>updateModuleName(brand,i,v)}
              onUpdateRate={(i,v)=>updateModuleRate(brand,i,v)}
              rateField="ratePerWp" rateLabel="₹/Wp"
            />
          </div>
        ))}
        {/* Deactivated brands notice */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
          <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0"/>
          <p className="text-red-400/70 text-xs"><strong>Eastman & Invergy</strong> — No Work. Permanently excluded from all salesperson dropdowns.</p>
        </div>
      </section>

      {/* ── Inverter Brands ── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BoltIcon className="w-6 h-6 text-[#FECB00]"/>
          <div>
            <h2 className="text-lg font-bold text-white">Inverter Models (₹/Unit)</h2>
            <p className="text-white/40 text-xs mt-0.5">Toggle stock status per model.</p>
          </div>
        </div>
        {INVERTER_BRANDS.map(brand=>(
          <div key={brand} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
            <h3 className="text-sm font-black text-white">{cap(brand)}</h3>
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
          <NumInput label="Earthing Pit (GI) (₹/pit)" value={rates.earthingPitRateGi} onChange={v=>update("earthingPitRateGi",v)}/>
          <NumInput label="Earthing Pit (Cu) (₹/pit)" value={rates.earthingPitRateCu} onChange={v=>update("earthingPitRateCu",v)}/>
          <NumInput label="Earthing Pit (Cu Bonded) (₹/pit)" value={rates.earthingPitRateCuBonded} onChange={v=>update("earthingPitRateCuBonded",v)}/>

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
            <h2 className="text-lg font-bold text-white">Advanced AC Cables Matrix (₹/m)</h2>
            <p className="text-white/40 text-xs mt-0.5">Rates for Armoured/Unarmoured Copper & Aluminium cables (148+ varieties). Scroll to view all.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {rates.acCables?.map((c, i) => (
            <NumInput key={c._id || i} label={c.label} value={c.ratePerMeter} onChange={v=>setRates(p=>{const n=[...(p.acCables||[])];n[i]={...n[i],ratePerMeter:v};return{...p,acCables:n}})}/>
          ))}
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
