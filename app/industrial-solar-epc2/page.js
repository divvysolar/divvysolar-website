'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { gridTariff, solarTariff, projects } from '@/data/projects';

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIAL SOLAR EPC 2 — ARCHITECTURAL OLIVE, BLACK, WHITE & YELLOW UI/UX
// Distinct interactive layout: Interactive bill selector + bento showcase,
// blueprint execution rail, split project dossier explorer, staggered review wall.
// ─────────────────────────────────────────────────────────────────────────────

const FONTS = {
    heading: { fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" },
    body: { fontFamily: "var(--font-inter, 'Inter', sans-serif)" },
};

const BILL_TIERS = [
    {
        value: '₹2 Lakh - ₹5 Lakh / month',
        short: '₹2L – ₹5L',
        note: 'Typical factory shed: LT / HT rooftop assessment',
    },
    {
        value: '₹5 Lakh - ₹15 Lakh / month',
        short: '₹5L – ₹15L',
        note: 'Mid-scale plant: PEB non-penetrating + DG-PV sync',
    },
    {
        value: '₹15 Lakh - ₹50 Lakh / month',
        short: '₹15L – ₹50L',
        note: 'Large industrial unit: 11kV HT grid synchronisation',
    },
    {
        value: 'Above ₹50 Lakh / month',
        short: '₹50L+ / mo',
        note: 'Mega industrial campus: Multi-MW rooftop & ground mount',
    },
];

const ENGINEERING_STEPS = [
    {
        code: '01',
        tag: 'Roof Integrity',
        title: 'Non-Penetrating PEB Clamping',
        desc: 'Standing-seam and trapezoidal mounting designed to avoid roof sheet drilling across industrial sheds.',
    },
    {
        code: '02',
        tag: 'Hybrid Power',
        title: 'DG-PV Reverse-Feed Sync',
        desc: 'Intelligent generator synchronisation engineered to reduce daytime diesel consumption during grid outages.',
    },
    {
        code: '03',
        tag: 'Statutory Liaison',
        title: 'CEIG & DISCOM Approvals',
        desc: 'Turnkey electrical safety documentation, load flow studies, and bi-directional net-metering coordination.',
    },
    {
        code: '04',
        tag: 'Live Telemetry',
        title: 'SCADA Plant Monitoring',
        desc: 'Real-time string and inverter visibility so plant heads can track daily solar generation against grid billing.',
    },
];

export default function IndustrialSolarEpc2Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        monthlyBill: '',
        location: '',
    });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
    const [activeStepIdx, setActiveStepIdx] = useState(0);

    const activeProject = projects[selectedProjectIdx] || projects[0];
    const selectedTierObj = BILL_TIERS.find((t) => t.value === formData.monthlyBill);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.getElementById('epc-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleTierPick = (tierValue) => {
        setFormData((prev) => ({ ...prev, monthlyBill: tierValue }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (honeypot) return;

        const cleanName = formData.name.trim();
        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (!cleanName) {
            setErrorMsg('Please enter your full name.');
            return;
        }
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
            setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
            return;
        }
        if (!formData.monthlyBill) {
            setErrorMsg('Please select your factory monthly electricity bill.');
            return;
        }
        if (!formData.location.trim()) {
            setErrorMsg('Please enter your plant or factory location.');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: cleanName,
                    phone: cleanPhone,
                    monthlyBill: formData.monthlyBill,
                    location: formData.location.trim(),
                    landingPage: '/industrial-solar-epc2',
                    honeypot,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Submission failed. Please call +91-9254986321.');
            }
            router.push('/thank-you?from=industrial-solar-epc2');
        } catch (err) {
            setErrorMsg(err.message || 'Unable to submit right now. Please call +91-9254986321.');
            setSubmitting(false);
        }
    };

    return (
        <div style={FONTS.body} className="min-h-screen bg-[#F6F6F2] text-[#0F110D] selection:bg-[#F4C400] selection:text-[#0F110D] overflow-x-hidden">
            {/* Hide floating chatbot on landing page */}
            <style>{`[data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display: none !important; }`}</style>

            {/* Official funnel-isolated Navbar */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — CHARCOAL BLACK & OLIVE ARCHITECTURAL BENTO HERO
            ═══════════════════════════════════════════════════════════════ */}
            <section
                className="relative text-white border-b border-[#2D3B1E]"
                style={{
                    background: 'radial-gradient(circle at 18% 12%, rgba(79,100,52,0.28) 0%, transparent 48%), radial-gradient(circle at 85% 80%, rgba(244,196,0,0.08) 0%, transparent 45%), #0F110D',
                }}
            >
                {/* Crisp architectural grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-12 lg:pb-16">

                    {/* Top Utility Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-7 border-b border-white/10">
                        <div className="inline-flex items-center gap-2.5">
                            <span className="px-3 py-1 rounded bg-[#F4C400] text-[#0F110D] text-[10px] font-bold tracking-[0.14em] uppercase" style={FONTS.heading}>
                                Industrial EPC Division
                            </span>
                            <span className="text-xs text-stone-300 font-medium">
                                Haryana · Punjab · Delhi NCR
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-stone-300">
                            <button
                                type="button"
                                onClick={() => document.getElementById('commissioned-plants')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-[#F4C400] transition cursor-pointer font-semibold"
                            >
                                Commissioned Plants ↓
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                type="button"
                                onClick={() => document.getElementById('client-reviews')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-[#F4C400] transition cursor-pointer font-semibold"
                            >
                                Client Reviews ↓
                            </button>
                        </div>
                    </div>

                    {/* Hero Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* LEFT / CENTER (7 COLS) — Editorial Headline + Visual Bento + Interactive Bill Picker */}
                        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                            <div className="space-y-4">
                                <h1
                                    style={{ ...FONTS.heading, fontSize: 'clamp(1.95rem, 3.6vw, 3.05rem)', lineHeight: 1.12, letterSpacing: '-0.025em' }}
                                    className="font-bold text-white"
                                >
                                    Cut energy costs by{' '}
                                    <span className="text-[#F4C400]">up to 70%</span>{' '}
                                    with custom solar solutions for factories and warehouses.
                                </h1>

                                <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                                    Turnkey rooftop &amp; ground-mount EPC engineered at{' '}
                                    <span className="text-white font-semibold">₹{solarTariff.toFixed(2)}/unit*</span> with{' '}
                                    <span className="text-white font-semibold">40% accelerated depreciation</span>,
                                    non-penetrating PEB clamping, and{' '}
                                    <span className="text-white font-semibold">DG-PV synchronisation</span>.
                                </p>
                            </div>

                            {/* Interactive Bill Tier Selector (syncs directly to Form) */}
                            <div className="rounded-2xl bg-[#1A2213] border border-[#4F6434]/60 p-4 sm:p-5">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <span style={FONTS.heading} className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F4C400]">
                                        Step 1 · Select Your Monthly Power Bill
                                    </span>
                                    <span className="text-[11px] text-stone-300">
                                        {selectedTierObj ? selectedTierObj.note : 'Tap to pre-fill feasibility form →'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {BILL_TIERS.map((tier) => {
                                        const isSelected = formData.monthlyBill === tier.value;
                                        return (
                                            <button
                                                key={tier.value}
                                                type="button"
                                                onClick={() => handleTierPick(tier.value)}
                                                style={FONTS.heading}
                                                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                                                    isSelected
                                                        ? 'bg-[#F4C400] text-[#0F110D] border-[#F4C400] shadow-md'
                                                        : 'bg-[#0F110D]/70 text-stone-200 border-white/10 hover:border-[#F4C400]/60 hover:text-white'
                                                }`}
                                            >
                                                {tier.short}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Architectural Visual + 3 Bento Metric Cells */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                                {/* Photo cell */}
                                <div className="sm:col-span-6 relative min-h-[185px] rounded-2xl overflow-hidden border border-white/15 bg-[#192112]">
                                    <Image
                                        src="/industrial_4k.webp"
                                        alt="Industrial rooftop solar installation by Divvy Solar"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F110D]/90 via-[#0F110D]/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2">
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-[#F4C400] font-bold">8+ Years EPC</div>
                                            <div style={FONTS.heading} className="text-sm font-bold text-white">Non-Penetrating Roof Mount</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3 Stacked Bento Stat Cells */}
                                <div className="sm:col-span-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-[#2D3B1E] border border-[#4F6434] p-4 flex flex-col justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-stone-300 font-semibold">Solar Tariff</span>
                                        <div>
                                            <div style={FONTS.heading} className="text-2xl font-bold text-[#F4C400]">₹{solarTariff.toFixed(2)}</div>
                                            <div className="text-[11px] text-stone-200 mt-0.5">vs ₹{gridTariff.toFixed(2)} grid*</div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-white text-[#0F110D] p-4 flex flex-col justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-[#3D4F29] font-bold">Tax Benefit</span>
                                        <div>
                                            <div style={FONTS.heading} className="text-2xl font-bold text-[#0F110D]">40%</div>
                                            <div className="text-[11px] text-slate-600 mt-0.5">Accelerated depreciation</div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 rounded-2xl bg-[#181B14] border border-white/10 p-4 flex items-center justify-between gap-3">
                                        <div>
                                            <div style={FONTS.heading} className="text-xl font-bold text-white">35+ MWp Installed</div>
                                            <div className="text-[11px] text-stone-400">Across Haryana, Punjab &amp; NCR</div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full bg-[#2D3B1E] border border-[#4F6434] text-[#F4C400] text-[10px] font-bold whitespace-nowrap">
                                            1,000+ Projects
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-stone-400 leading-relaxed">
                                *₹3.50/unit is the estimated 25-year levelised cost. Assumptions: [VERIFY]. Grid tariff source: [VERIFY]. Depreciation subject to eligibility; consult your CA.
                            </p>
                        </div>

                        {/* RIGHT (5 COLS) — Crisp White & Olive/Black Feasibility Drawer */}
                        <div id="epc-form" className="lg:col-span-5 scroll-mt-24 flex">
                            <div className="w-full bg-white text-[#0F110D] rounded-3xl p-6 sm:p-7 border-2 border-[#3D4F29] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                                {/* Olive & Yellow top accent */}
                                <div className="absolute top-0 left-0 right-0 h-2 flex">
                                    <div className="flex-1 bg-[#2D3B1E]" />
                                    <div className="w-28 bg-[#F4C400]" />
                                </div>

                                <div className="pt-2 mb-4">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span
                                            style={FONTS.heading}
                                            className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D3B1E] bg-[#ECEFE6] px-2.5 py-1 rounded"
                                        >
                                            Plant Feasibility Desk
                                        </span>
                                        <span className="text-[11px] font-semibold text-[#3D4F29]">Step 2 · Details</span>
                                    </div>
                                    <h2 style={FONTS.heading} className="text-xl sm:text-2xl font-bold text-[#0F110D] leading-tight">
                                        Request Custom Payback Model
                                    </h2>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Generation forecast &amp; HT/LT load study for your shed
                                    </p>
                                </div>

                                {/* Honeypot */}
                                <input
                                    type="text"
                                    name="website_url_hp"
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                    <div>
                                        <label className="flex items-center justify-between text-xs font-bold text-[#0F110D] mb-1">
                                            <span>01 · Full Name <span className="text-red-600">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rajesh Singhal"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#F9FAF6] text-sm text-[#0F110D] focus:outline-none focus:border-[#2D3B1E] focus:bg-white focus:ring-2 focus:ring-[#2D3B1E]/15 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#0F110D] mb-1">
                                            02 · Mobile / WhatsApp <span className="text-red-600">*</span>
                                        </label>
                                        <div className="flex items-center rounded-xl border border-stone-300 bg-[#F9FAF6] overflow-hidden focus-within:border-[#2D3B1E] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2D3B1E]/15 transition">
                                            <span className="px-3 py-2.5 bg-[#ECEFE6] border-r border-stone-300 text-xs font-bold text-[#2D3B1E] whitespace-nowrap">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="10-digit mobile number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                className="w-full px-3 py-2.5 bg-transparent text-sm text-[#0F110D] focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#0F110D] mb-1">
                                            03 · Monthly Power Bill <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            required
                                            value={formData.monthlyBill}
                                            onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#F9FAF6] text-sm text-[#0F110D] focus:outline-none focus:border-[#2D3B1E] focus:bg-white focus:ring-2 focus:ring-[#2D3B1E]/15 transition cursor-pointer"
                                        >
                                            <option value="">Select Monthly Bill Range</option>
                                            {BILL_TIERS.map((t) => (
                                                <option key={t.value} value={t.value}>{t.value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#0F110D] mb-1">
                                            04 · Plant / Factory Location <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Panipat, Ludhiana, Hisar"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#F9FAF6] text-sm text-[#0F110D] focus:outline-none focus:border-[#2D3B1E] focus:bg-white focus:ring-2 focus:ring-[#2D3B1E]/15 transition"
                                        />
                                    </div>

                                    {errorMsg && (
                                        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        style={FONTS.heading}
                                        className="w-full py-3.5 rounded-xl bg-[#0F110D] hover:bg-[#2D3B1E] disabled:opacity-60 text-[#F4C400] font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {submitting ? 'Submitting Request...' : 'Get Free Solar Assessment →'}
                                    </button>

                                    <div className="flex items-center justify-center gap-2.5 text-[11px] text-slate-500 font-medium pt-0.5">
                                        <span>🔒 100% Confidential</span>
                                        <span>·</span>
                                        <span>Zero Obligation</span>
                                        <span>·</span>
                                        <span>No Sales Spam</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — ARCHITECTURAL ENGINEERING LEDGER (4-STEP INTERACTIVE RAIL)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white border-b border-stone-200 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3D4F29]">
                                Engineering Scope
                            </span>
                            <h2 style={FONTS.heading} className="text-2xl sm:text-3xl font-bold text-[#0F110D] mt-1">
                                How Divvy Solar Executes Industrial Plants
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                            Built for continuous factory operations—from structural PEB clamping to HT substation clearance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-stone-200 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-stone-200">
                        {ENGINEERING_STEPS.map((step, idx) => {
                            const isActive = activeStepIdx === idx;
                            return (
                                <button
                                    key={step.code}
                                    type="button"
                                    onClick={() => setActiveStepIdx(idx)}
                                    className={`text-left p-6 transition-colors cursor-pointer flex flex-col justify-between gap-4 ${
                                        isActive
                                            ? 'bg-[#2D3B1E] text-white'
                                            : 'bg-white hover:bg-[#F6F6F2] text-[#0F110D]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            style={FONTS.heading}
                                            className={`text-2xl font-bold ${isActive ? 'text-[#F4C400]' : 'text-[#3D4F29]'}`}
                                        >
                                            {step.code}
                                        </span>
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                                isActive
                                                    ? 'bg-[#F4C400] text-[#0F110D]'
                                                    : 'bg-[#ECEFE6] text-[#2D3B1E]'
                                            }`}
                                        >
                                            {step.tag}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 style={FONTS.heading} className="text-base font-bold mb-1.5">
                                            {step.title}
                                        </h3>
                                        <p className={`text-xs leading-relaxed ${isActive ? 'text-stone-200' : 'text-slate-600'}`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — INTERACTIVE SPLIT PROJECT DOSSIER (#commissioned-plants)
            ═══════════════════════════════════════════════════════════════ */}
            <section id="commissioned-plants" className="py-14 sm:py-20 bg-[#F6F6F2] scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#2D3B1E] bg-[#E6EAD9] px-3 py-1 rounded">
                                Commissioned Portfolio
                            </span>
                            <h2 style={FONTS.heading} className="text-2xl sm:text-4xl font-bold text-[#0F110D] mt-2 tracking-tight">
                                Inspect 6 Commissioned Factory Sites
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                            Select any industrial plant on the left to inspect roof type, grid voltage sync, and engineering scope.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                        {/* LEFT — 6 Selectable Project Index Rows */}
                        <div className="lg:col-span-5 flex flex-col gap-2.5">
                            {projects.map((p, idx) => {
                                const isActive = idx === selectedProjectIdx;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setSelectedProjectIdx(idx)}
                                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                            isActive
                                                ? 'bg-[#0F110D] text-white border-[#0F110D] shadow-lg'
                                                : 'bg-white hover:bg-[#ECEFE6] text-[#0F110D] border-stone-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <span
                                                style={FONTS.heading}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                                    isActive
                                                        ? 'bg-[#F4C400] text-[#0F110D]'
                                                        : 'bg-[#ECEFE6] text-[#2D3B1E]'
                                                }`}
                                            >
                                                0{idx + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <div style={FONTS.heading} className="text-sm font-bold truncate">
                                                    {p.companyName}
                                                </div>
                                                <div className={`text-[11px] truncate ${isActive ? 'text-stone-300' : 'text-slate-500'}`}>
                                                    {p.location} · {p.sector}
                                                </div>
                                            </div>
                                        </div>
                                        <span
                                            style={FONTS.heading}
                                            className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                                                isActive
                                                    ? 'bg-[#2D3B1E] text-[#F4C400] border border-[#4F6434]'
                                                    : 'bg-stone-100 text-[#0F110D]'
                                            }`}
                                        >
                                            {p.kWp.toLocaleString()} kWp
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* RIGHT — Live Active Project Dossier Card */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col">
                            <div className="relative h-64 sm:h-72 bg-[#0F110D] shrink-0">
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.companyName}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F110D] via-[#0F110D]/25 to-transparent" />

                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                                    <span className="px-3 py-1 rounded-full bg-[#2D3B1E]/95 text-white text-[11px] font-bold border border-[#4F6434]">
                                        {activeProject.sector}
                                    </span>
                                    <span style={FONTS.heading} className="px-3.5 py-1 rounded-full bg-[#F4C400] text-[#0F110D] text-xs font-bold shadow">
                                        {activeProject.kWp.toLocaleString()} kWp Commissioned
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-5 right-5 text-white">
                                    <h3 style={FONTS.heading} className="text-xl sm:text-2xl font-bold leading-snug">
                                        {activeProject.companyName}
                                    </h3>
                                    <p className="text-xs text-stone-300 mt-1">
                                        📍 {activeProject.location} · Roof Type: <span className="text-[#F4C400] font-semibold">{activeProject.roofType}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                                <div>
                                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3D4F29] mb-3">
                                        Engineering Scope Delivered
                                    </div>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {activeProject.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F6F2] border border-stone-200 text-xs sm:text-sm text-[#0F110D] font-medium">
                                                <span className="w-5 h-5 rounded-full bg-[#2D3B1E] text-[#F4C400] flex items-center justify-center text-[11px] font-bold shrink-0">
                                                    ✓
                                                </span>
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                                    <div className="text-xs text-slate-600">
                                        Plant Head: <strong className="text-[#0F110D]">{activeProject.ownerName}</strong>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={scrollToForm}
                                        style={FONTS.heading}
                                        className="px-5 py-2.5 rounded-xl bg-[#0F110D] hover:bg-[#2D3B1E] text-[#F4C400] text-xs font-bold transition cursor-pointer"
                                    >
                                        Get Similar Plant Feasibility →
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — DARK OLIVE & CHARCOAL CLIENT REVIEWS (#client-reviews)
            ═══════════════════════════════════════════════════════════════ */}
            <section
                id="client-reviews"
                className="py-16 sm:py-20 text-white scroll-mt-16"
                style={{ background: 'linear-gradient(160deg, #1E2814 0%, #2D3B1E 45%, #0F110D 100%)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Sticky Left Summary Column */}
                        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
                            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F110D] bg-[#F4C400] px-3 py-1 rounded">
                                Client Reviews
                            </span>
                            <h2 style={FONTS.heading} className="text-3xl sm:text-4xl font-bold leading-tight">
                                Feedback From Factory Directors
                            </h2>
                            <p className="text-sm text-stone-300 leading-relaxed">
                                Direct operational experiences from agro processors, plywood manufacturers, packaging units, and heavy fabrication plants.
                            </p>

                            <div className="rounded-2xl bg-[#0F110D]/70 border border-white/10 p-5 space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-stone-400">Commissioned Capacities</span>
                                    <span style={FONTS.heading} className="font-bold text-[#F4C400]">300 – 2,500 kWp</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-stone-400">Regions Covered</span>
                                    <span style={FONTS.heading} className="font-bold text-white">Haryana &amp; Punjab</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    style={FONTS.heading}
                                    className="w-full mt-2 py-3 rounded-xl bg-[#F4C400] hover:bg-[#e5b800] text-[#0F110D] text-xs font-bold transition cursor-pointer"
                                >
                                    Schedule Technical Call →
                                </button>
                            </div>
                        </div>

                        {/* Right 2-Column Editorial Testimonial Wall (6 Distinct Clients) */}
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.slice(0, 6).map((p, idx) => (
                                <div
                                    key={p.id}
                                    className={`rounded-2xl p-5 flex flex-col justify-between gap-4 border transition-transform hover:-translate-y-0.5 ${
                                        idx % 2 === 0
                                            ? 'bg-white text-[#0F110D] border-white'
                                            : 'bg-[#14180F] text-white border-[#4F6434]/60'
                                    }`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                                    idx % 2 === 0
                                                        ? 'bg-[#ECEFE6] text-[#2D3B1E]'
                                                        : 'bg-[#2D3B1E] text-[#F4C400]'
                                                }`}
                                            >
                                                {p.testimonialHighlight}
                                            </span>
                                            <span className="text-[#F4C400] text-xs font-bold">★★★★★</span>
                                        </div>

                                        <p className={`text-xs sm:text-[13px] leading-relaxed italic ${idx % 2 === 0 ? 'text-slate-700' : 'text-stone-300'}`}>
                                            &ldquo;{p.testimonialQuote}&rdquo;
                                        </p>
                                    </div>

                                    <div className={`pt-3 border-t flex items-center gap-3 ${idx % 2 === 0 ? 'border-stone-200' : 'border-white/10'}`}>
                                        <div
                                            style={FONTS.heading}
                                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                                                idx % 2 === 0
                                                    ? 'bg-[#2D3B1E] text-[#F4C400]'
                                                    : 'bg-[#F4C400] text-[#0F110D]'
                                            }`}
                                        >
                                            {p.ownerName.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <div style={FONTS.heading} className="text-xs font-bold truncate">
                                                {p.ownerName}
                                            </div>
                                            <div className={`text-[11px] truncate ${idx % 2 === 0 ? 'text-slate-500' : 'text-stone-400'}`}>
                                                {p.companyName} · {p.kWp.toLocaleString()} kWp
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — HIGH-CONTRAST BLACK & YELLOW BOTTOM CALLOUT
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-12 bg-[#F6F6F2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-[#0F110D] text-white p-7 sm:p-10 border border-[#3D4F29] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F4C400]">
                                Zero Obligation Engineering Audit
                            </span>
                            <h3 style={FONTS.heading} className="text-2xl sm:text-3xl font-bold mt-1">
                                Evaluate Solar Payback For Your Factory Shed
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-300 mt-1.5">
                                Share your monthly power bill and plant location to receive a custom feasibility model.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={scrollToForm}
                            style={FONTS.heading}
                            className="px-7 py-3.5 rounded-xl bg-[#F4C400] hover:bg-[#e5b800] text-[#0F110D] text-sm font-bold shadow-lg whitespace-nowrap shrink-0 transition hover:scale-105 cursor-pointer"
                        >
                            Get Feasibility Report →
                        </button>
                    </div>
                </div>
            </section>

            {/* Official funnel-isolated Footer */}
            <Footer isLandingPage={true} landingSlug="industrial-solar-epc2" />

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-[#0F110D]/95 backdrop-blur-md border-t border-[#4F6434]/50">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-[#2D3B1E] text-white text-xs font-bold text-center no-underline"
                >
                    📞 Call Desk
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-[2] py-3 rounded-xl bg-[#F4C400] text-[#0F110D] text-xs font-bold text-center cursor-pointer"
                >
                    Free Feasibility →
                </button>
            </div>
        </div>
    );
}
