"use client";

import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS — Exactly matching mam's screenshot for 3 kWp
// ─────────────────────────────────────────────────────────────
const ANNUAL_KWH_PER_KWP = 1382;        
const CO2_PER_KWP = 0.99;               
const COAL_PER_KWP = 0.63;              
const TREES_PER_KWP = 16.3;             // Changed from 16.5 to 16.3 to match "49 trees" for 3kWp
const PETROL_PER_KWP = 381.8;           
const FOREST_PER_KWP = 1.19;            

// ─────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────
const fmtInt = (n) => Math.round(n).toLocaleString("en-IN");
const fmtOne = (n) => n.toFixed(1);
const fmtTwo = (n) => n.toFixed(2);

const METRICS = [
    {
        id: "co2",
        label: "CO2 offset",
        totalUnit: "MT",
        perKwpUnit: "MT CO2 / kWp / yr",
        perKwpValue: CO2_PER_KWP,
    },
    {
        id: "coal",
        label: "Coal avoided",
        totalUnit: "MT",
        perKwpValue: COAL_PER_KWP,
        perKwpUnit: "MT coal / kWp / yr",
    },
    {
        id: "trees",
        label: "Trees planted equiv.",
        totalUnit: "trees",
        perKwpValue: TREES_PER_KWP,
        perKwpUnit: "trees / kWp / yr",
    },
    {
        id: "petrol",
        label: "Petrol avoided",
        totalUnit: "L",
        perKwpValue: PETROL_PER_KWP,
        perKwpUnit: "litres / kWp / yr",
    },
    {
        id: "forest",
        label: "Forest equivalent",
        totalUnit: "ac",
        perKwpValue: FOREST_PER_KWP,
        perKwpUnit: "acres / kWp / yr",
    },
    {
        id: "clean",
        label: "Clean energy",
        totalUnit: "kWh",
        perKwpValue: ANNUAL_KWH_PER_KWP,
        perKwpUnit: "kWh / kWp / yr",
    },
];

export default function SustainabilityCalculator() {
    const [systemSize, setSystemSize] = useState("3");

    const kw = parseFloat(systemSize) || 0;
    const annualKwh = kw * ANNUAL_KWH_PER_KWP;

    const results = useMemo(() => {
        return METRICS.map((m) => {
            const total = m.perKwpValue * kw;
            return { ...m, total, perKwp: m.perKwpValue };
        });
    }, [kw]);

    return (
        <section className="bg-white py-12 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* HEADER */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-4xl font-extrabold text-[#0f172a]" style={{ fontFamily: "Georgia, serif" }}>
                            Per kW Sustainability Calculator
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Per kW Value = Total Value / System Size (kWp). Enter your system size to see 
                            the genuine environmental impact of your solar installation.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[12px] font-bold text-[#0f172a] uppercase tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
                            DIVVY SOLAR
                        </p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                            RENEWABLE ENERGY FOR ALL
                        </p>
                    </div>
                </div>

                {/* INPUTS */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex flex-col">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">SYSTEM SIZE (KWP)</label>
                        <input
                            type="number"
                            value={systemSize}
                            onChange={(e) => setSystemSize(e.target.value)}
                            className="w-28 h-12 border-2 border-green-800/20 rounded-lg px-3 font-bold text-lg outline-none focus:border-green-800/50 transition-all"
                        />
                    </div>
                    <div className="text-gray-300 text-xl mt-4">÷</div>
                    <div className="flex flex-col">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">ANNUAL PRODUCTION (KWH)</label>
                        <div className="w-40 h-12 border-2 border-green-800/10 bg-slate-50/50 rounded-lg flex items-center px-4 font-bold text-lg text-gray-700">
                            {kw > 0 ? fmtInt(annualKwh) : ""}
                        </div>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="mb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        ENVIRONMENTAL METRICS — TOTAL VS PER KW BREAKDOWN
                    </p>

                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-[1.5fr_4fr_1fr] gap-4 px-6 py-3 bg-[#f8faf8] border-y border-gray-100 mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">METRIC</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">FORMULA</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">PER KWP VALUE</span>
                    </div>

                    {/* TABLE ROWS */}
                    <div className="space-y-4">
                        {results.map((r) => {
                            // Formatting total value to match mam's screenshot (e.g. 1.1k for petrol)
                            let totalStr = "";
                            if (r.id === "petrol") {
                                totalStr = r.total >= 1000 ? `${(r.total / 1000).toFixed(1)}k` : Math.round(r.total);
                            } else if (r.id === "clean") {
                                totalStr = fmtInt(r.total);
                            } else if (r.id === "trees" || r.id === "forest") {
                                totalStr = Math.round(r.total);
                            } else {
                                totalStr = fmtOne(r.total);
                            }

                            // Per Kwp Display
                            let perKwpStr = "";
                            if (r.id === "petrol" || r.id === "clean") {
                                perKwpStr = fmtInt(r.perKwpValue);
                            } else if (r.id === "trees") {
                                perKwpStr = r.perKwpValue.toFixed(1);
                            } else {
                                perKwpStr = r.perKwpValue.toFixed(2);
                            }

                            return (
                                <div key={r.id} className="grid grid-cols-[1.5fr_4fr_1fr] gap-4 items-center px-6 py-1 group">
                                    {/* Metric Name */}
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{r.label}</span>

                                    {/* Formula Box */}
                                    <div className="bg-[#fcfdfc] border border-gray-100 rounded-xl h-14 flex items-center justify-center gap-3 shadow-sm group-hover:border-green-100 transition-colors">
                                        <span className="text-xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                                            {totalStr} {r.totalUnit}
                                        </span>
                                        <span className="text-gray-300 font-light text-lg">÷</span>
                                        <span className="text-xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                                            {kw} kWp
                                        </span>
                                    </div>

                                    {/* Per Kwp Value */}
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                                            {perKwpStr}
                                        </span>
                                        <p className="text-[9px] text-gray-400 font-bold leading-tight">{r.perKwpUnit}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* SPECIFIC YIELD BAR */}
                    <div className="mt-8 bg-[#1a3a1a] rounded-lg h-14 flex items-center justify-between px-6 shadow-xl">
                        <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Specific yield</span>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total kWh ÷ System kWp</span>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
                                {fmtInt(ANNUAL_KWH_PER_KWP)} kWh/kWp/yr
                            </span>
                        </div>
                    </div>
                </div>

                {/* FOOTER TEXT */}
                <div className="text-center mt-6">
                    <p className="text-[11px] text-gray-300 font-medium tracking-wide">
                        Formula: Per kW Value = Total Annual Value ÷ System Size (kWp) • India CEA factor 0.716 kg CO₂/kWh
                    </p>
                </div>

            </div>
        </section>
    );
}
