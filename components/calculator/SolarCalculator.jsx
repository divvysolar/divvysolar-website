"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// OFFLINE FALLBACK MAP
// ─────────────────────────────────────────────────────────────
const getOfflineCityFromPincode = (pincode) => {
    if (!pincode || pincode.length !== 6) return null;
    const prefix = pincode.substring(0, 3);
    const firstTwo = pincode.substring(0, 2);

    const punjabMap = { "141": "Ludhiana", "143": "Amritsar", "144": "Jalandhar", "145": "Pathankot", "147": "Patiala", "148": "Sangrur", "151": "Bathinda", "152": "Ferozepur", "160": "Mohali", "140": "Rupnagar", "142": "Moga", "146": "Hoshiarpur" };
    const haryanaMap = { "121": "Faridabad", "122": "Gurgaon", "123": "Mewat", "124": "Rohtak", "125": "Hisar", "126": "Jind", "127": "Bhiwani", "128": "Sirsa", "129": "Fatehabad", "131": "Sonipat", "132": "Panipat", "133": "Ambala", "134": "Panchkula", "135": "Yamunanagar", "136": "Kurukshetra" };

    if (punjabMap[prefix]) return `${punjabMap[prefix]}, Punjab`;
    if (haryanaMap[prefix]) return `${haryanaMap[prefix]}, Haryana`;
    if (firstTwo === "14" || firstTwo === "15") return "Punjab";
    if (firstTwo === "12" || firstTwo === "13") return "Haryana";

    return null;
};

// ─────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString("en-IN");
const fmtL = (n) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${fmt(n)}`;
};

// ─────────────────────────────────────────────────────────────
// SLIDER CONFIG
// ─────────────────────────────────────────────────────────────
const SLIDER = {
    Residential: { min: 1000, max: 50000, step: 100, default: 4500 },
    Commercial: { min: 10000, max: 200000, step: 1000, default: 50000 },
    Industrial: { min: 50000, max: 1000000, step: 5000, default: 200000 },
};

// ─────────────────────────────────────────────────────────────
// CENTRAL SUBSIDY — PM Surya Ghar 2024-25 (Residential ONLY)
// ─────────────────────────────────────────────────────────────
const getCentralSubsidy = (kw) => {
    if (kw >= 3) return 78000;
    if (kw >= 2) return 60000;
    return 30000;
};

// ─────────────────────────────────────────────────────────────
// STATE SUBSIDY — Punjab Residential ONLY
// ₹10,000 per kW, max 3 kW = ₹30,000 max
// FIX: use Math.ceil so 2.8kW → 3kW → ₹30,000
// ─────────────────────────────────────────────────────────────
const getPunjabStateSubsidy = (kw) => {
    return Math.min(Math.ceil(kw), 3) * 10000;
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function SolarCalculator() {
    const [pincode, setPincode] = useState("");
    const [locationName, setLocationName] = useState("");
    const [isValidatingPin, setIsValidatingPin] = useState(false);
    const [type, setType] = useState("Residential");
    const [bill, setBill] = useState(SLIDER.Residential.default);
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const sliderConfig = SLIDER[type];

    // ── Type change ──
    const handleTypeChange = (t) => {
        setType(t);
        setBill(SLIDER[t].default);
        setResult(null);
    };

    // ── Pincode validation via India Post API ──
    useEffect(() => {
        if (pincode.length !== 6) {
            setLocationName("");
            setError("");
            return;
        }

        const timer = setTimeout(async () => {
            setIsValidatingPin(true);
            setError("");
            setLocationName("");

            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await res.json();

                if (data?.[0]?.Status === "Success") {
                    const state = data[0].PostOffice[0].State;
                    const district = data[0].PostOffice[0].District;

                    if (state.toLowerCase().includes("punjab") || state.toLowerCase().includes("haryana")) {
                        setLocationName(`${district}, ${state}`);
                    } else {
                        setError("We currently serve Punjab & Haryana only.");
                    }
                } else {
                    throw new Error("Invalid pincode");
                }
            } catch {
                // Offline fallback
                const offline = getOfflineCityFromPincode(pincode);
                if (offline) {
                    setLocationName(offline);
                } else {
                    setError("We currently serve Punjab & Haryana only.");
                }
            } finally {
                setIsValidatingPin(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [pincode]);

    // ── Calculate ──
    const handleCalculate = (e) => {
        e?.preventDefault();

        if (pincode.length !== 6 || error || !locationName) {
            if (!error) setError("Please enter a valid 6-digit Pincode.");
            return;
        }

        setIsCalculating(true);

        setTimeout(() => {
            const isPunjab = locationName.toLowerCase().includes("punjab");

            // Real electricity rates (PSPCL / DHBVN 2024-25)
            const electricityRate = isPunjab ? 7.50 : 8.00;

            // System size calculation
            const unitsPerMonth = bill / electricityRate;
            const unitsPerDay = unitsPerMonth / 30;
            const recommendedKw = Number(Math.max(1, unitsPerDay / 4.5).toFixed(2));

            // Roof area & CO2
            const roofArea = Math.round(recommendedKw * 65);
            const co2Saved = (recommendedKw * 4.5 * 365 * 0.82 / 1000).toFixed(1);

            // Savings
            const monthlySavings = parseInt(bill);
            const yearlySavings = monthlySavings * 12;

            // Subsidies — Residential only
            let centralSubsidy = 0;
            let stateSubsidy = 0;
            let totalSubsidy = 0;

            if (type === "Residential") {
                centralSubsidy = getCentralSubsidy(recommendedKw);
                stateSubsidy = isPunjab ? getPunjabStateSubsidy(recommendedKw) : 0;
                totalSubsidy = centralSubsidy + stateSubsidy;
            }

            setResult({
                systemSize: recommendedKw,
                roofArea,
                co2Saved,
                monthlySavings,
                yearlySavings,
                centralSubsidy,
                stateSubsidy,
                totalSubsidy,
                isPunjab,
                type,
                electricityRate,
            });

            setIsCalculating(false);
        }, 800);
    };

    // ─────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────
    return (
        <section className="bg-white py-16 md:py-24 pb-32 md:pb-40 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* ══════════════════════════════════════
                        LEFT PANE — Inputs
                    ══════════════════════════════════════ */}
                    <div className="lg:w-1/3 flex flex-col pt-8">
                        <h2 className="text-3xl lg:text-[40px] leading-tight font-extrabold text-[#0f172a] mb-6" style={{ fontFamily: "Georgia, serif" }}>
                            Calculate Your <br />Solar Savings
                        </h2>
                        <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                            Curious how much you can save by switching to solar? The Divvy Solar Calculator estimates your solar potential, system size, and long-term savings — in seconds.
                        </p>

                        <form
                            onSubmit={handleCalculate}
                            className="space-y-8 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-28"
                        >
                            {/* Installation Type */}
                            <div>
                                <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                                    Installation Type
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {[
                                        { id: "Residential", label: "🏠 Home" },
                                        { id: "Commercial", label: "🏢 Commercial" },
                                        { id: "Industrial", label: "🏭 Industrial" },
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => handleTypeChange(t.id)}
                                            className={`py-2.5 px-1 text-xs font-bold rounded-xl border transition-all ${type === t.id
                                                    ? "bg-[#0f172a] text-white border-[#0f172a]"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                                                }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                    Your Pincode
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                                        placeholder="e.g. 141001"
                                        className={`w-full text-lg font-medium bg-white border rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-500 placeholder:font-normal ${error
                                                ? "border-red-300 focus:border-red-500"
                                                : "border-gray-200 focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
                                            }`}
                                    />
                                    {isValidatingPin && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <div className="w-5 h-5 border-2 border-gray-300 border-t-[#0f172a] rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>

                                {locationName && !isValidatingPin && (
                                    <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Valid Location: {locationName}
                                    </p>
                                )}
                                {error && !isValidatingPin && (
                                    <p className="text-xs font-semibold text-red-500 mt-2 flex items-start gap-1">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {error}
                                    </p>
                                )}
                            </div>

                            {/* Bill Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="block text-sm font-semibold text-[#0f172a]">
                                        Avg. Monthly Electricity Bill
                                    </label>
                                    <span className="text-2xl font-black text-[#0f172a]">
                                        ₹{fmt(bill)}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={sliderConfig.min}
                                    max={sliderConfig.max}
                                    step={sliderConfig.step}
                                    value={bill}
                                    onChange={(e) => setBill(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0f172a]"
                                />
                                <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2">
                                    <span>₹{fmt(sliderConfig.min)}</span>
                                    <span>{fmtL(sliderConfig.max)}</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isCalculating || !!error || pincode.length !== 6 || !locationName || isValidatingPin}
                                className={`w-full py-4 px-6 rounded-xl text-white font-bold text-base flex justify-center items-center gap-2 transition-all ${isCalculating || !!error || pincode.length !== 6 || !locationName || isValidatingPin
                                        ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                        : "bg-[#0f172a] hover:bg-slate-800"
                                    }`}
                            >
                                {isCalculating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                                        Calculating...
                                    </>
                                ) : "Calculate Savings"}
                            </button>
                        </form>
                    </div>

                    {/* ══════════════════════════════════════
                        RIGHT PANE — Results
                    ══════════════════════════════════════ */}
                    <div className="lg:w-2/3">

                        {/* Empty state */}
                        {!result && !isCalculating && (
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border border-dashed border-gray-300 rounded-3xl bg-gray-50 mt-8 lg:mt-0">
                                <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-4 text-[#0f172a]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-2">Estimate Your Potential</h3>
                                <p className="text-gray-600 text-sm max-w-md">
                                    Select your installation type, enter your 6-digit pincode and average monthly bill to get your custom solar estimate for Punjab & Haryana.
                                </p>
                            </div>
                        )}

                        {/* Results */}
                        {result && (
                            <div className="space-y-8 mt-8 lg:mt-0">

                                {/* Commercial / Industrial depreciation note */}
                                {(result.type === "Commercial" || result.type === "Industrial") && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 shadow-sm">
                                        <span className="text-xl shrink-0">💡</span>
                                        <p className="text-amber-800 text-sm leading-relaxed font-medium">
                                            Commercial & Industrial customers can claim{" "}
                                            <strong>40% Accelerated Depreciation</strong> in Year 1 under Income Tax Act
                                            — significantly reducing effective project cost.
                                        </p>
                                    </div>
                                )}

                                {/* 1. System Size */}
                                <div>
                                    <h3 className="text-xl font-medium text-[#0f172a] mb-4">
                                        Required System Size ({result.type})
                                    </h3>
                                    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0] p-6 lg:p-8">
                                            <div className="text-center py-2 sm:py-0">
                                                <p className="text-sm font-medium text-[#475569] flex items-center justify-center gap-1.5 mb-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    System Size
                                                </p>
                                                <p className="text-3xl font-bold text-[#0f172a]">
                                                    {result.systemSize}{" "}
                                                    <span className="text-base font-semibold">kW</span>
                                                </p>
                                            </div>
                                            <div className="text-center py-2 sm:py-0">
                                                <p className="text-sm font-medium text-[#475569] mb-2">Roof Area (est.)</p>
                                                <p className="text-3xl font-bold text-[#0f172a]">
                                                    {fmt(result.roofArea)}{" "}
                                                    <span className="text-base font-semibold">sq. ft.</span>
                                                </p>
                                            </div>
                                            <div className="text-center py-2 sm:py-0">
                                                <p className="text-sm font-medium text-[#475569] mb-2">CO₂ Saved/Year</p>
                                                <p className="text-3xl font-bold text-[#10b981]">
                                                    {result.co2Saved}{" "}
                                                    <span className="text-base font-semibold">tonnes</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-[#f8fafc] text-center py-3 rounded-b-2xl text-[13px] border-t border-[#e2e8f0]">
                                            <span className="text-[#475569]">
                                                Based on {result.isPunjab ? "Punjab" : "Haryana"} electricity rate{" "}
                                            </span>
                                            <span className="font-semibold text-[#0f172a]">
                                                ₹{result.electricityRate}/unit
                                            </span>
                                            <span className="text-[#475569]"> · 4.5 units/kW/day solar generation</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <Link href="/contact" className="text-[#2563eb] font-medium hover:underline">
                                                Roof area issue? Contact us
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Savings */}
                                <div>
                                    <h3 className="text-xl font-medium text-[#0f172a] mb-4">Your Estimated Savings</h3>
                                    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-300 p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
                                            <div className="text-center py-4 sm:py-2">
                                                <p className="text-sm font-medium text-[#475569] mb-2">Monthly Savings</p>
                                                <p className="text-3xl font-bold text-[#0f172a]">
                                                    ₹{fmt(result.monthlySavings)}
                                                </p>
                                            </div>
                                            <div className="text-center py-4 sm:py-2">
                                                <p className="text-sm font-medium text-[#475569] mb-2">Yearly Savings</p>
                                                <p className="text-3xl font-bold text-[#0f172a]">
                                                    ₹{fmt(result.yearlySavings)}
                                                </p>
                                            </div>
                                            <div className="text-center py-4 sm:py-2">
                                                <p className="text-sm font-medium text-[#475569] mb-2">
                                                    {result.type === "Residential" ? "Payback Period" : "25-Year Savings"}
                                                </p>
                                                {result.type === "Residential" ? (
                                                    <Link
                                                        href="/contact"
                                                        className="inline-block mt-1 px-4 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-bold rounded-full transition-colors"
                                                    >
                                                        Contact Us →
                                                    </Link>
                                                ) : (
                                                    <p className="text-3xl font-bold text-[#16a34a]">
                                                        {fmtL(result.yearlySavings * 25)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Subsidy — Residential ONLY */}
                                {result.type === "Residential" && (
                                    <div>
                                        <h3 className="text-xl font-medium text-[#0f172a] mb-4">
                                            Subsidy Benefit
                                        </h3>
                                        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-300 p-6">
                                            <div className="space-y-3 mb-4">
                                                <div className="flex justify-between items-center text-[15px]">
                                                    <span className="text-[#334155]">Central Subsidy (PM Surya Ghar)</span>
                                                    <span className="text-[#16a34a] font-bold">
                                                        ₹{fmt(result.centralSubsidy)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-[15px]">
                                                    <span className="text-[#334155]">
                                                        State Subsidy{" "}
                                                        {result.isPunjab ? "(Punjab - PEDA)" : "(Haryana)"}
                                                    </span>
                                                    <span className={`font-bold ${result.stateSubsidy > 0 ? "text-[#16a34a]" : "text-gray-500"}`}>
                                                        {result.stateSubsidy > 0 ? `₹${fmt(result.stateSubsidy)}` : "₹0"}
                                                    </span>
                                                </div>
                                                <div className="pt-3 border-t border-[#e2e8f0] flex justify-between items-center">
                                                    <span className="text-sm font-semibold text-[#475569]">
                                                        Total Subsidy Benefit
                                                    </span>
                                                    <span className="text-xl font-bold text-[#16a34a]">
                                                        ₹{fmt(result.totalSubsidy)}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-[12px] text-center text-gray-500 font-medium border-t border-gray-100 pt-3">
                                                Subsidy applicable on residential installations only · Subject to MNRE guidelines
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* 4. Pricing + Financing */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Pricing Card */}
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-medium text-[#0f172a] mb-4">
                                            Investment & Pricing
                                        </h3>
                                        <div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] shadow-xl p-8 flex flex-col justify-center items-center text-center flex-grow relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#FECB00]/10 to-transparent pointer-events-none" />
                                            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5 border border-white/20">
                                                <svg className="w-7 h-7 text-[#FECB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                </svg>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-3">
                                                Get exact pricing for your project
                                            </h4>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                                Every project is unique. Our engineers will assess your site, sanctioned load, and structure to give you the most accurate quote.
                                            </p>
                                            <Link
                                                href="/contact"
                                                className="w-full py-3.5 px-6 rounded-xl bg-[#FECB00] hover:bg-[#EBB800] text-[#0f172a] font-bold text-sm transition-all text-center block"
                                            >
                                                Book Free Site Survey →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Financing Card */}
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-medium text-[#0f172a] mb-4">
                                            Financing Options
                                        </h3>

                                        {result.type === "Residential" ? (
                                            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-3 border-b border-[#e2e8f0] pb-4 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center font-bold text-lg shrink-0">
                                                        ₹0
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[#0f172a]">Solar at ₹0 down payment</h4>
                                                        <p className="text-xs text-gray-600 font-medium">Subject to bank approval</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 mb-6">
                                                    <div className="flex justify-between items-center text-[15px]">
                                                        <span className="text-[#334155]">EMI Tenure</span>
                                                        <span className="font-bold text-[#0f172a]">5 years</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[15px]">
                                                        <span className="text-[#334155]">Interest Rate</span>
                                                        <span className="font-bold text-[#0f172a]">~10% p.a.</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[15px]">
                                                        <span className="text-[#334155]">Total Subsidy Benefit</span>
                                                        <span className="font-bold text-[#16a34a]">
                                                            ₹{fmt(result.totalSubsidy)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="bg-[#f8fafc] rounded-xl py-4 px-4 border border-[#e2e8f0] text-center mt-auto">
                                                    <span className="block font-bold text-[#0f172a] mb-1">
                                                        EMI starts from ₹X/month
                                                    </span>
                                                    <span className="block text-xs text-gray-500 font-medium">
                                                        (calculated after free site survey)
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-gray-500 leading-tight border-t border-gray-100 pt-3 mt-3 text-center">
                                                    EMI calculated after Central & State subsidy deductions. Actual bank rates may vary.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-6 flex flex-col items-center text-center justify-center flex-grow">
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-[#64748b]">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-[#0f172a] mb-2">
                                                    Corporate Financing Available
                                                </p>
                                                <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                                                    We offer OPEX / CAPEX models and tie-ups with leading financial institutions for customized {result.type.toLowerCase()} solar loans.
                                                </p>
                                                <Link
                                                    href="/contact"
                                                    className="mt-4 px-5 py-2 bg-[#0f172a] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
                                                >
                                                    Discuss Financing →
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 5. Disclaimer */}
                                <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r-xl">
                                    <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                                        ⚠️{" "}
                                        <strong className="text-gray-800">Disclaimer:</strong>{" "}
                                        This is an indicative estimate based on standard solar generation data for Punjab & Haryana. Actual system size, exact cost, and potential savings depend on your site conditions, roof type, shading, orientation, and sanctioned load. A free physical site assessment by our engineers will give you exact final numbers and a detailed proposal.
                                    </p>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}