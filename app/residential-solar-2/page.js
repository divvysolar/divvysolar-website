'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// RESIDENTIAL SOLAR EPC 2 — LUXE EMERALD & SOLAR GOLD ARCHITECTURAL THEME
// Distinct visual grammar from Variant 1:
// - Palette: Deep Emerald (#06281E), Forest Green (#0D4A38), Porcelain Mint (#F4F9F6), Solar Gold (#F59E0B)
// - Interactive Real-Time Subsidy Slider/Selector in Hero
// - Continuous Emerald & Gold Marquee Ribbon
// - 4-Pillar Architectural Bento Grid (6.5ft elevated frame, DBT subsidy, DCR bifacial panels)
// - Interactive 4-Tier Home System Sizing Cards (2kW, 3kW, 5kW, 10kW)
// - Real North India Homes Before/After showcase
// - High-converting Glassmorphic Lead Form with Thank You Modal
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_SIZES = [
    {
        capacity: '2 kW System',
        idealFor: '1-2 BHK Homes',
        appliances: 'Fans, LED Lights, TV, Refrigerator, Basic Household Loads',
        roofArea: '150 - 200 sq. ft.',
        dailyUnits: '8 - 10 Units / day',
        monthlySavings: '₹2,200 - ₹3,000 / mo',
        centralSubsidy: '₹60,000',
        badge: 'Compact Home',
        popular: false,
    },
    {
        capacity: '3 kW System',
        idealFor: '3-4 BHK Standard Family',
        appliances: '1-2 Inverter ACs, Refrigerator, Geyser, Washing Machine',
        roofArea: '250 - 300 sq. ft.',
        dailyUnits: '12 - 15 Units / day',
        monthlySavings: '₹3,800 - ₹5,200 / mo',
        centralSubsidy: '₹78,000',
        badge: '★ Max Subsidy Slab',
        popular: true,
    },
    {
        capacity: '5 kW System',
        idealFor: 'Independent Kothi / Floors',
        appliances: '2-3 Inverter ACs, Water Pump, Heavy Home Appliances',
        roofArea: '400 - 500 sq. ft.',
        dailyUnits: '20 - 25 Units / day',
        monthlySavings: '₹6,500 - ₹9,000 / mo',
        centralSubsidy: '₹78,000',
        badge: 'High Consumption',
        popular: false,
    },
    {
        capacity: '10 kW System',
        idealFor: 'Bungalows & Luxury Villas',
        appliances: 'Multiple ACs, EV Charger, Heat Pump, Villa Setup',
        roofArea: '800 - 1,000 sq. ft.',
        dailyUnits: '40 - 50 Units / day',
        monthlySavings: '₹15,000 - ₹22,000 / mo',
        centralSubsidy: '₹78,000',
        badge: 'Villa & EV Ready',
        popular: false,
    },
];

const COMPLETED_HOMES = [
    {
        id: 'hisar-5kw',
        title: '5 kW Elevated Terrace Solar Installation',
        owner: 'Vikas Gupta',
        location: 'Sector 14, Hisar, Haryana',
        capacity: '5 kWp DCR Mono PERC',
        image: '/resi2main.webp',
        billBefore: '₹8,500 / mo',
        billAfter: '₹180 / mo (Net Zero)',
        subsidy: '₹78,000 Credited via DBT',
        structure: '6.5 Ft Elevated Galvanized Frame (Full Roof Usable)',
        quote: 'Our summer AC electricity bill dropped from ₹8,500 to under ₹200. The elevated structure gives us full shaded terrace space for evening walks.',
    },
    {
        id: 'mohali-3kw',
        title: '3 kW High-Yield Bifacial Solar Plant',
        owner: 'Amit Bansal',
        location: 'Phase 7, Mohali, Punjab',
        capacity: '3 kWp Bifacial TOPCon',
        image: '/resi1m.webp',
        billBefore: '₹4,800 / mo',
        billAfter: '₹0 - ₹120 / mo',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'PSPCL Net-Meter Approved',
        quote: 'The ₹78,000 central subsidy came straight into my bank account within 3 weeks of net-meter installation. Complete paperwork was handled by Divvy.',
    },
    {
        id: 'gurgaon-10kw',
        title: '10 kW Luxury Villa Solar Installation',
        owner: 'Anjali Sharma',
        location: 'DLF Phase 2, Gurgaon, Haryana',
        capacity: '10 kWp Premium Setup',
        image: '/har1_main.webp',
        billBefore: '₹24,000 / mo',
        billAfter: '₹1,200 / mo (95% Cut)',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'EV Charger Ready + DHBVN Smart Meter',
        quote: 'We run multiple 2-ton inverter ACs and charge our EV daily. The 10 kW solar array produces abundant energy, saving us over ₹2.5 Lakh annually.',
    },
];

const REVIEWS = [
    {
        name: 'Vikas Gupta',
        location: 'Hisar, Haryana',
        system: '5 kW Elevated System',
        stars: 5,
        text: 'Divvy Solar ki technical team ek dum top-class hai. 6.5 ft elevated frame lagwaya hai, pura roof walk aur sitting ke liye usable hai. Bill lagbhag zero ho gaya.',
    },
    {
        name: 'Amit Bansal',
        location: 'Mohali, Punjab',
        system: '3 kW Standard Family',
        stars: 5,
        text: 'PM Surya Ghar scheme ki ₹78,000 subsidy seedha bank account me aa gayi. PSPCL net-metering ka saara documentation Divvy team ne khud karwaya.',
    },
    {
        name: 'Anjali Sharma',
        location: 'Gurgaon, Haryana',
        system: '10 kW Luxury Villa',
        stars: 5,
        text: 'Zero electricity bill achieved even with 3 ACs and EV charging. The Tier-1 panels and smart inverter app performance is fantastic.',
    },
    {
        name: 'Rajesh Kumar',
        location: 'Ludhiana, Punjab',
        system: '3 kW Rooftop Solar',
        stars: 5,
        text: 'Best solar installation company in North India. Timely execution, high quality DCR panels, and transparent pricing. Very happy!',
    },
    {
        name: 'Priyanka Sethi',
        location: 'Chandigarh',
        system: '5 kW Elevated Terrace',
        stars: 5,
        text: 'The physical site assessment was very detailed. They customized the elevated structure according to our terrace garden without any roof damage.',
    },
    {
        name: 'Suresh Jangra',
        location: 'Hansi, Haryana',
        system: '3 kW Home System',
        stars: 5,
        text: 'Transparent subsidy guidance and quality mounting hardware. Helped us get DISCOM approvals smoothly. Highly recommended!',
    },
];

export default function ResidentialSolar2Page() {
    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '', systemSize: '' });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [submittedLead, setSubmittedLead] = useState(null);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [selectedBillTier, setSelectedBillTier] = useState('3kw');

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const el = document.getElementById('epc-form') || document.getElementById('resi2-hero-form');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            setErrorMsg('Please select your monthly electricity bill range.');
            return;
        }
        if (!formData.location.trim()) {
            setErrorMsg('Please enter your city or home location.');
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
                    systemSize: formData.systemSize || 'Residential Solar 2 (Emerald)',
                    landingPage: '/residential-solar-2',
                    honeypot,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Submission failed. Please call +91-9254986321.');
            }

            setSubmittedLead({
                name: cleanName,
                phone: cleanPhone,
                monthlyBill: formData.monthlyBill,
                location: formData.location.trim(),
                systemSize: formData.systemSize,
            });
            setShowThankYouModal(true);
            setFormData({ name: '', phone: '', monthlyBill: '', location: '', systemSize: '' });
            setSubmitting(false);
        } catch (err) {
            setErrorMsg(err.message || 'Unable to submit right now. Please call +91-9254986321.');
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-[#06281E] selection:bg-[#F59E0B] selection:text-black antialiased font-sans">
            {/* Custom smooth marquee keyframes */}
            <style>{`
                [data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display: none !important; }

                @keyframes emeraldMarquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-emerald-marquee {
                    display: flex;
                    width: max-content;
                    animation: emeraldMarquee 28s linear infinite;
                }
                .animate-emerald-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Funnel-isolated Header */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                TOP EDITORIAL ANNOUNCEMENT RIBBON
            ═══════════════════════════════════════════════════════════════ */}
            <div className="bg-[#06281E] text-white text-xs py-2 px-4 border-b border-[#0D4A38]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                        <span className="font-semibold text-emerald-200">PM Surya Ghar Yojana 2026:</span>
                        <span className="hidden sm:inline text-white">Central Govt Direct DBT Subsidy up to ₹78,000 Active</span>
                    </div>
                    <a
                        href="tel:+919254986321"
                        className="font-bold text-[#F59E0B] hover:text-white transition flex items-center gap-1"
                    >
                        <span>Desk: +91 92549-86321</span>
                        <span>→</span>
                    </a>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO: SPLIT-SCREEN ARCHITECTURAL SHOWCASE
                Emerald & Solar Gold Theme with Real-Time Subsidy Calculator
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EBF5F0] via-[#F4F9F6] to-white overflow-hidden">
                {/* Subtle emerald atmospheric glow spheres */}
                <div className="absolute -top-20 right-10 w-[550px] h-[300px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-40 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* LEFT COLUMN — ARCHITECTURAL HOME SOLAR COPY */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Leaf Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06281E] text-[#FEF08A] text-xs font-bold tracking-wide shadow-md">
                                <span>🌿</span>
                                <span>ARCHITECTURAL HOME SOLAR</span>
                                <span className="text-emerald-500">|</span>
                                <span className="text-white font-medium">1,500+ Homes Transformed</span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#06281E] leading-[1.12] tracking-tight">
                                Where clean home solar meets{' '}
                                <span className="relative inline-block text-white bg-[#06281E] px-3 py-1 rounded-xl shadow-lg border border-emerald-700/50">
                                    architectural
                                </span>{' '}
                                elegance.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
                                Wipe out summer electricity bills with high-yield rooftop solar and claim up to{' '}
                                <strong className="text-[#06281E] font-bold underline decoration-[#F59E0B] decoration-4 underline-offset-2">
                                    ₹78,000 direct bank subsidy
                                </strong>{' '}
                                under PM Surya Ghar Yojana. Our 6.5 ft elevated frames convert your rooftop into a shaded terrace lounge while keeping your house 4-6°C cooler.
                            </p>

                            {/* INTERACTIVE REAL-TIME SUBSIDY TIER SELECTOR */}
                            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-100 shadow-[0_10px_30px_rgba(6,40,30,0.06)] max-w-xl space-y-3">
                                <div className="flex items-center justify-between text-xs font-bold text-[#06281E]">
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-[#F59E0B] text-sm">☀</span>
                                        <span>Select Your Monthly Electricity Bill:</span>
                                    </span>
                                    <span className="text-emerald-700 font-extrabold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                        Live Subsidy Calculator
                                    </span>
                                </div>

                                {/* Bill Tiers Buttons */}
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                    {[
                                        { id: '2kw', label: '₹2,500/mo', cap: '2 kW', sub: '₹60,000' },
                                        { id: '3kw', label: '₹5,000/mo', cap: '3 kW', sub: '₹78,000 ★' },
                                        { id: '5kw', label: '₹9,000/mo', cap: '5 kW', sub: '₹78,000' },
                                        { id: '10kw', label: '₹18,000+/mo', cap: '10 kW', sub: '₹78,000' },
                                    ].map((tier) => (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            onClick={() => setSelectedBillTier(tier.id)}
                                            className={`p-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                                                selectedBillTier === tier.id
                                                    ? 'bg-[#06281E] text-[#FEF08A] shadow-md border-2 border-[#06281E]'
                                                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 border border-slate-200'
                                            }`}
                                        >
                                            <div className="text-[11px] font-black">{tier.label}</div>
                                            <div className="text-[10px] opacity-80">{tier.cap}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Real-Time Calculation Result */}
                                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-[#FEF08A]/30 border border-emerald-200/60 flex items-center justify-between text-xs">
                                    <div>
                                        <span className="text-slate-500 text-[10px] block font-semibold">RECOMMENDED CAPACITY</span>
                                        <span className="text-[#06281E] font-black text-sm">
                                            {selectedBillTier === '2kw' ? '2 kWp System' : selectedBillTier === '3kw' ? '3 kWp System (Ideal)' : selectedBillTier === '5kw' ? '5 kWp System' : '10 kWp Villa System'}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-slate-500 text-[10px] block font-semibold">DIRECT GOVT DBT SUBSIDY</span>
                                        <span className="text-emerald-800 font-black text-sm">
                                            {selectedBillTier === '2kw' ? '₹60,000 Cash Credit' : '₹78,000 Max Subsidy'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Highlights */}
                            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-[#06281E]">
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-emerald-100 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#F59E0B]">✓</span> 6.5 Ft Elevated Frame
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-emerald-100 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#F59E0B]">✓</span> 4-6°C Roof Cooling
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-emerald-100 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#F59E0B]">✓</span> 25-Yr Panel Warranty
                                </span>
                            </div>

                        </div>

                        {/* RIGHT COLUMN — FROSTED GLASS LEAD DESK */}
                        <div id="epc-form" className="lg:col-span-5 scroll-mt-24">
                            <div id="resi2-hero-form" className="rounded-3xl bg-white/95 backdrop-blur-md border-2 border-emerald-200 p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(6,40,30,0.14)] relative overflow-hidden">
                                {/* Top Forest Emerald Accent Strip */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#06281E] via-[#0D4A38] to-[#F59E0B]" />

                                <div className="mb-5">
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-[#06281E] bg-[#FEF08A] px-3 py-0.5 rounded-full shadow-xs">
                                            Home Subsidy Audit Desk
                                        </span>
                                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded">
                                            ● ₹78,000 DBT Active
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-black text-[#06281E]">
                                        Check Your Subsidy Eligibility
                                    </h2>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Book a complimentary rooftop survey and receive custom quotation within 24 hours.
                                    </p>
                                </div>

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
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Vikas Gupta"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#06281E] placeholder:text-slate-400 focus:outline-none focus:border-[#06281E] focus:ring-2 focus:ring-emerald-200 focus:bg-white transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Mobile / WhatsApp Number *
                                        </label>
                                        <div className="flex items-center rounded-xl bg-slate-50 border border-slate-300 overflow-hidden focus-within:border-[#06281E] focus-within:ring-2 focus-within:ring-emerald-200 focus-within:bg-white transition">
                                            <span className="px-3.5 py-2.5 bg-emerald-50 border-r border-slate-300 text-xs font-black text-[#06281E]">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="10-digit number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                className="w-full px-3 py-2.5 bg-transparent text-sm text-[#06281E] placeholder:text-slate-400 focus:outline-none font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Average Monthly Electricity Bill *
                                        </label>
                                        <select
                                            required
                                            value={formData.monthlyBill}
                                            onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#06281E] focus:outline-none focus:border-[#06281E] focus:ring-2 focus:ring-emerald-200 focus:bg-white transition cursor-pointer font-medium"
                                        >
                                            <option value="">Select Monthly Bill</option>
                                            <option value="₹1,500 - ₹3,500 / month">₹1,500 – ₹3,500 / month (1-2 BHK)</option>
                                            <option value="₹3,500 - ₹7,000 / month">₹3,500 – ₹7,000 / month (3-4 BHK)</option>
                                            <option value="₹7,000 - ₹15,000 / month">₹7,000 – ₹15,000 / month (Kothi / 2-3 ACs)</option>
                                            <option value="Above ₹15,000 / month">Above ₹15,000 / month (Villa / Heavy Load)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            City / Home Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Hisar, Mohali, Gurgaon, Karnal"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#06281E] placeholder:text-slate-400 focus:outline-none focus:border-[#06281E] focus:ring-2 focus:ring-emerald-200 focus:bg-white transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Preferred System Type (Optional)
                                        </label>
                                        <select
                                            value={formData.systemSize}
                                            onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#06281E] focus:outline-none focus:border-[#06281E] focus:bg-white transition cursor-pointer font-medium"
                                        >
                                            <option value="">Let Engineer Recommend Based on Roof</option>
                                            <option value="6.5 Ft Elevated Terrace Lounge">6.5 Ft Elevated Terrace Lounge (Full Roof Usable)</option>
                                            <option value="Standard Rooftop Frame">Standard Rooftop Structure</option>
                                            <option value="3 kW Max Subsidy Package">3 kW Max Subsidy Package (₹78,000 DBT)</option>
                                            <option value="5-10 kW Villa / EV Package">5-10 kW Villa / EV Package</option>
                                        </select>
                                    </div>

                                    {errorMsg && (
                                        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Emerald & Solar Gold CTA Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-4 rounded-xl bg-[#06281E] hover:bg-[#0A382A] active:scale-[0.99] text-[#FEF08A] text-sm font-black tracking-wide transition-all shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 border border-emerald-700/40"
                                    >
                                        <span>{submitting ? 'Checking Subsidy Eligibility...' : 'Check Subsidy & Request Survey'}</span>
                                        <span className="text-base text-[#F59E0B]">→</span>
                                    </button>

                                    <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-500 font-semibold">
                                        <span>🔒 100% Confidential</span>
                                        <span>·</span>
                                        <span>Zero Obligation</span>
                                        <span>·</span>
                                        <span>Instant WhatsApp Callback</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                CONTINUOUS EMERALD & GOLD MARQUEE RIBBON
            ═══════════════════════════════════════════════════════════════ */}
            <div className="bg-[#06281E] text-white py-3.5 overflow-hidden border-y border-[#0D4A38] shadow-inner">
                <div className="animate-emerald-marquee flex items-center gap-8 text-xs font-black tracking-wider uppercase text-emerald-100">
                    {[
                        '🌿 PM SURYA GHAR YOJANA 2026',
                        '✦ ₹78,000 DIRECT GOVT DBT SUBSIDY',
                        '✦ 6.5 FT ELEVATED TERRACE LOUNGE',
                        '✦ 4-6°C COOLER ROOFTOP',
                        '✦ TIER-1 DCR ALMM BIFACIAL PANELS',
                        '✦ 25-YEAR PANEL PERFORMANCE WARRANTY',
                        '✦ DHBVN & PSPCL NET-METERING LIAISON',
                        '✦ 1,500+ NORTH INDIA HOMES POWERED',
                        '🌿 PM SURYA GHAR YOJANA 2026',
                        '✦ ₹78,000 DIRECT GOVT DBT SUBSIDY',
                        '✦ 6.5 FT ELEVATED TERRACE LOUNGE',
                        '✦ 4-6°C COOLER ROOFTOP',
                        '✦ TIER-1 DCR ALMM BIFACIAL PANELS',
                        '✦ 25-YEAR PANEL PERFORMANCE WARRANTY',
                        '✦ DHBVN & PSPCL NET-METERING LIAISON',
                        '✦ 1,500+ NORTH INDIA HOMES POWERED',
                    ].map((item, i) => (
                        <span key={i} className="flex-shrink-0 flex items-center gap-3">
                            <span className="text-[#F59E0B] font-bold">{item}</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — 4-PILLAR ARCHITECTURAL BENTO GRID
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-wider text-[#06281E] bg-[#FEF08A] px-3.5 py-1 rounded-full shadow-xs">
                        Architectural Engineering
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#06281E] mt-3">
                        Solar Designed for How You Live
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Engineered to eliminate high electricity bills while enhancing your home&apos;s lifestyle and terrace usability.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Bento 1: 6.5 Ft Elevated Frame (Large Card) */}
                    <div className="md:col-span-7 rounded-3xl bg-white border-2 border-emerald-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-emerald-300 transition-all">
                        <div className="p-6 sm:p-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold mb-3">
                                <span>🏗️</span>
                                <span>Full Roof Walking Usability</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-[#06281E] mb-2">
                                6.5 Ft Elevated Terrace Gazebo Structure
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                                Standard frames block your roof. Our heavy hot-dip galvanized elevated structure provides complete 6.5 ft headroom clearance underneath—turning your terrace into a shaded gazebo for evening tea, clothes drying, and family gatherings.
                            </p>
                        </div>
                        <div className="relative h-56 sm:h-72 w-full mt-auto overflow-hidden">
                            <Image
                                src="/resi2main.webp"
                                alt="6.5 Ft Elevated Terrace Solar Frame by Divvy Solar"
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06281E]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white font-bold">
                                <span>✓ Shaded Terrace Space</span>
                                <span className="bg-[#F59E0B] text-black px-2.5 py-0.5 rounded font-black">4-6°C Cooler House</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento 2: Direct Govt DBT Subsidy */}
                    <div className="md:col-span-5 rounded-3xl bg-[#06281E] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FEF08A] flex items-center justify-center text-2xl mb-4 border border-white/15">
                                💰
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#FEF08A] bg-white/10 px-2.5 py-1 rounded-full inline-block mb-2">
                                Direct Benefit Transfer (DBT)
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                                ₹78,000 Direct Bank Credit
                            </h3>
                            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                                Under PM Surya Ghar Yojana, the government deposits up to ₹78,000 directly into your bank account. Our desk handles the full online portal application, document submission, and DISCOM inspection liaison.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-emerald-800/60 space-y-2 text-xs">
                            <div className="flex items-center justify-between font-bold">
                                <span className="text-emerald-200">2 kW Subsidy:</span>
                                <span className="text-white">₹60,000 Cash Transfer</span>
                            </div>
                            <div className="flex items-center justify-between font-bold">
                                <span className="text-emerald-200">3 kW to 10 kW Subsidy:</span>
                                <span className="text-[#FEF08A]">₹78,000 Max Slab ★</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento 3: Tier-1 DCR ALMM Bifacial Solar Panels */}
                    <div className="md:col-span-6 rounded-3xl bg-white border-2 border-emerald-100 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-emerald-300 transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl mb-4 border border-emerald-200">
                                ⚡
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-[#06281E] mb-2">
                                Tier-1 DCR ALMM Bifacial Modules
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                We exclusively install DCR-compliant, ALMM-approved bifacial panels that generate electricity from both the top and underside by capturing reflected sunlight from white terrace floors (+15% extra energy output).
                            </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-900">
                            <span>✓ 25-Year Performance Warranty</span>
                            <span className="bg-emerald-100 px-2 py-0.5 rounded">98.4% Peak Inverter Efficiency</span>
                        </div>
                    </div>

                    {/* Bento 4: Bi-Directional Net-Metering */}
                    <div className="md:col-span-6 rounded-3xl bg-white border-2 border-emerald-100 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-emerald-300 transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl mb-4 border border-amber-200">
                                🔄
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-[#06281E] mb-2">
                                Bi-Directional Net-Metering &amp; Grid Banking
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Any surplus units generated during sunny afternoon hours are automatically exported to the DISCOM grid (DHBVN, PSPCL, BSES). Your home draws these banked units back for free during night hours.
                            </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                            <span>✓ In-House DISCOM Liaison Desk</span>
                            <span className="bg-[#FEF08A] text-black px-2 py-0.5 rounded font-black">Zero Grid Wastage</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — SYSTEM SIZING & PM SURYA GHAR SUBSIDY MATRIX
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-20 bg-white border-y border-emerald-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                        <div>
                            <span className="text-xs font-black uppercase tracking-wider text-[#06281E] bg-[#FEF08A] px-3.5 py-1 rounded-full shadow-xs">
                                Transparent System Packages
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#06281E] mt-3">
                                Find the Perfect Solar Capacity for Your Home
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={scrollToForm}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06281E] text-[#FEF08A] font-bold text-xs hover:bg-[#0A382A] transition self-start sm:self-auto cursor-pointer"
                        >
                            <span>Book Free Roof Assessment</span>
                            <span>→</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SYSTEM_SIZES.map((sys) => (
                            <div
                                key={sys.capacity}
                                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                                    sys.popular
                                        ? 'bg-[#06281E] text-white border-2 border-[#06281E] shadow-xl relative'
                                        : 'bg-[#F4F9F6] text-[#06281E] border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-md'
                                }`}
                            >
                                {sys.popular && (
                                    <div className="absolute -top-3 right-6 bg-[#F59E0B] text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md">
                                        Most Popular Family Choice
                                    </div>
                                )}

                                <div>
                                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md inline-block mb-3 ${
                                        sys.popular ? 'bg-white/15 text-[#FEF08A]' : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                        {sys.badge}
                                    </span>

                                    <h3 className="text-xl font-black mb-1">
                                        {sys.capacity}
                                    </h3>
                                    <p className={`text-xs mb-4 font-semibold ${sys.popular ? 'text-emerald-200' : 'text-slate-500'}`}>
                                        Ideal for: {sys.idealFor}
                                    </p>

                                    <div className={`p-3 rounded-xl mb-4 text-xs font-bold ${
                                        sys.popular ? 'bg-white/10 text-emerald-100 border border-white/10' : 'bg-white border border-emerald-200 text-emerald-900'
                                    }`}>
                                        <div className="text-[10px] uppercase text-slate-400">CENTRAL DBT SUBSIDY</div>
                                        <div className="text-base font-black text-[#F59E0B]">{sys.centralSubsidy} Direct Credit</div>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center justify-between pb-2 border-b border-black/5">
                                            <span className="opacity-75">Daily Generation:</span>
                                            <span className="font-bold">{sys.dailyUnits}</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-2 border-b border-black/5">
                                            <span className="opacity-75">Monthly Savings:</span>
                                            <span className="font-bold">{sys.monthlySavings}</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-2 border-b border-black/5">
                                            <span className="opacity-75">Roof Area Needed:</span>
                                            <span className="font-bold">{sys.roofArea}</span>
                                        </div>
                                    </div>

                                    <div className={`mt-3 text-[11px] leading-relaxed ${sys.popular ? 'text-emerald-200/90' : 'text-slate-600'}`}>
                                        <strong>Powers:</strong> {sys.appliances}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className={`w-full mt-6 py-3 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                        sys.popular
                                            ? 'bg-[#FEF08A] hover:bg-yellow-300 text-black shadow-md'
                                            : 'bg-white hover:bg-[#06281E] hover:text-white text-[#06281E] border border-emerald-200'
                                    }`}
                                >
                                    <span>Get Quotation for {sys.capacity}</span>
                                    <span>→</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — REAL COMPLETED HOMES (BEFORE & AFTER BILLS)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#06281E] bg-[#FEF08A] px-3.5 py-1 rounded-full shadow-xs">
                            Real North India Installations
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-[#06281E] mt-3">
                            Homeowners Enjoying Near-Zero Electricity Bills
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                        Verified net-metered installations across Hisar, Mohali, Gurgaon, and Karnal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COMPLETED_HOMES.map((home) => (
                        <div
                            key={home.id}
                            className="rounded-3xl overflow-hidden bg-white border-2 border-emerald-100 flex flex-col group shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all"
                        >
                            <div className="relative h-48 bg-slate-900 shrink-0 overflow-hidden">
                                <Image
                                    src={encodeURI(home.image)}
                                    alt={home.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-[#FEF08A] text-black text-xs font-black shadow-md">
                                    {home.capacity}
                                </span>

                                <div className="absolute bottom-3 left-4 right-4 text-white">
                                    <h3 className="text-sm font-black truncate">
                                        {home.title}
                                    </h3>
                                    <p className="text-[11px] text-emerald-200 truncate font-semibold">
                                        📍 {home.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                <div>
                                    {/* Before / After Bill Badge */}
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                                        <div>
                                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Bill Before</span>
                                            <span className="text-red-600 line-through font-extrabold">{home.billBefore}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Bill After</span>
                                            <span className="text-emerald-800 font-black text-sm">{home.billAfter}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-2">
                                        <span className="bg-emerald-100/70 border border-emerald-300 px-2.5 py-0.5 rounded">
                                            ✓ {home.subsidy}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-600 italic leading-relaxed">
                                        &ldquo;{home.quote}&rdquo;
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-[#06281E] hover:text-white text-[#06281E] text-xs font-black transition cursor-pointer"
                                >
                                    Check Subsidy for Similar Home →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — HOMEOWNER STORIES & REVIEWS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-20 bg-emerald-50/40 border-t border-emerald-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                    <span className="text-xs font-black uppercase tracking-wider text-[#06281E] bg-[#FEF08A] px-3.5 py-1 rounded-full shadow-xs">
                        Homeowner Experiences
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#06281E] mt-3">
                        What Families Say About Divvy Solar
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Genuine feedback from residential solar installations across North India.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-emerald-50/40 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-emerald-50/40 to-transparent z-10 pointer-events-none" />

                    <div className="animate-emerald-marquee flex items-center gap-6 py-2">
                        {[...REVIEWS, ...REVIEWS].map((r, idx) => (
                            <div
                                key={`${r.name}-${idx}`}
                                className="w-[85vw] sm:w-[370px] flex-shrink-0 bg-white border-2 border-emerald-100 p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-[#06281E] transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex text-[#F59E0B] text-sm">
                                            ★★★★★
                                        </div>
                                        <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded">
                                            {r.system}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-4">
                                        &ldquo;{r.text}&rdquo;
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#06281E] text-[#FEF08A] font-black text-sm flex items-center justify-center shrink-0">
                                        {r.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-black text-[#06281E] truncate">
                                            {r.name}
                                        </div>
                                        <div className="text-[11px] text-slate-500 truncate font-semibold">
                                            {r.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                THANK YOU POPUP MODAL
            ═══════════════════════════════════════════════════════════════ */}
            {showThankYouModal && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-[#06281E] relative text-center">
                        <button
                            type="button"
                            onClick={() => setShowThankYouModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="w-16 h-16 rounded-full bg-[#06281E] text-[#FEF08A] flex items-center justify-center text-2xl font-black mx-auto mb-3 shadow-lg">
                            ✓
                        </div>

                        <h3 className="text-2xl font-black text-[#06281E]">
                            Thank You!
                        </h3>
                        <p className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block mt-1">
                            Home Subsidy Request Received Successfully
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                            Hi <strong className="text-[#06281E]">{submittedLead?.name}</strong>, our residential solar engineer will calculate PM Surya Ghar subsidy eligibility for your home in <strong className="text-[#06281E]">{submittedLead?.location}</strong>.
                        </p>

                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 my-4 text-left text-xs text-slate-800 space-y-1">
                            <div><strong>Phone:</strong> +91 {submittedLead?.phone}</div>
                            <div><strong>Monthly Bill:</strong> {submittedLead?.monthlyBill}</div>
                            {submittedLead?.systemSize && (
                                <div><strong>Selected System:</strong> {submittedLead?.systemSize}</div>
                            )}
                            <div className="text-[11px] text-emerald-800 pt-1 font-semibold">
                                ⏱️ An engineer will connect via WhatsApp/Call within 24 hours.
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+919254986321"
                                className="w-full py-3.5 rounded-xl bg-[#06281E] hover:bg-[#0A382A] text-[#FEF08A] text-xs font-black tracking-wide transition flex items-center justify-center gap-2 no-underline shadow-md"
                            >
                                <span>📞 Direct Helpdesk: +91 92549-86321</span>
                            </a>
                            <button
                                type="button"
                                onClick={() => setShowThankYouModal(false)}
                                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                            >
                                Back to Page
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Funnel-isolated Footer */}
            <Footer isLandingPage={true} landingSlug="residential-solar-2" />

            {/* Mobile Bottom Quick Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-xl">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-[#06281E] text-[#FEF08A] text-xs font-black text-center no-underline"
                >
                    📞 Call Helpdesk
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-[2] py-3 rounded-xl bg-[#F59E0B] text-black text-xs font-black text-center cursor-pointer shadow-md"
                >
                    Check Subsidy Free →
                </button>
            </div>
        </div>
    );
}
