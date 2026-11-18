'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// RESIDENTIAL SOLAR EPC 1 — TOP-NOTCH DYNAMIC YELLOW & INK BLACK THEME
// Dedicated high-converting residential solar landing page:
// 1. Hero: Catchy Tagline on Left + Clean Feasibility & Subsidy Form on Right
// 2. 5 Clean Residential Benefits (Direct ₹78,000 Subsidy, Net-Zero Bill, Elevated Frame, etc.)
// 3. Sliding Tier-1 Brand Partners Marquee
// 4. Compact Residential Project Showcase (Real North India Homes with Bill Before/After)
// 5. Sliding Client Reviews Marquee (5 stars, verified homeowner quotes)
// 6. Interactive Thank You Popup Modal on Form Submission
// ─────────────────────────────────────────────────────────────────────────────

const BRANDS = [
    { name: 'Waaree', src: '/waaree.png' },
    { name: 'Vikram Solar', src: '/vikram.png' },
    { name: 'Adani Solar', src: '/adani.png' },
    { name: 'Havells', src: '/havells.png' },
    { name: 'Eastman', src: '/images/eastman.png' },
    { name: 'Luminous', src: '/luminious.png' },
    { name: 'Invergy', src: '/invergy.png' },
    { name: 'Jackson', src: '/jackson.png' },
];

const BENEFITS = [
    {
        icon: '💰',
        title: '₹78,000 Direct Govt Subsidy',
        desc: 'Direct Benefit Transfer (DBT) subsidy credited straight to your bank account under PM Surya Ghar Muft Bijli Yojana.',
        metric: 'Up to ₹78,000 DBT',
    },
    {
        icon: '⚡',
        title: 'Zero / Nominal Monthly Bill',
        desc: 'Offset 12–15 units per day with a 3kW system to wipe out heavy summer air conditioning power bills.',
        metric: 'Net-Zero Electricity',
    },
    {
        icon: '🏗️',
        title: '6.5 Ft Elevated Structure',
        desc: 'Heavy hot-dip galvanized frame keeps your terrace 100% usable for walking, clothes drying, and family sitting.',
        metric: '100% Usable Terrace',
    },
    {
        icon: '📑',
        title: 'Turnkey Net-Metering Liaison',
        desc: 'Our in-house team handles complete DISCOM paperwork, meter testing, and bi-directional solar net-meter activation.',
        metric: 'Hassle-Free Approval',
    },
    {
        icon: '🛡️',
        title: '25-Year Panel Warranty',
        desc: 'Tier-1 DCR ALMM bifacial solar panels with remote smartphone WiFi generation tracking app.',
        metric: '25-Year Protection',
    },
];

const RESIDENTIAL_PROJECTS = [
    {
        id: 'hisar-5kw',
        title: '5 kW Elevated Terrace Solar Installation',
        homeowner: 'Vikas Gupta',
        location: 'Sector 14, Hisar, Haryana',
        capacity: '5 kWp',
        image: '/resi2main.webp',
        billBefore: '₹8,500 / mo',
        billAfter: '₹180 / mo (Net Zero)',
        subsidy: '₹78,000 Credited via DBT',
        structure: '6.5 Ft Elevated Galvanized Frame',
        quote: 'Our summer AC electricity bill dropped from ₹8,500 to under ₹200. The elevated structure gives us full shaded terrace space for evening walks.',
    },
    {
        id: 'mohali-3kw',
        title: '3 kW High-Yield Bifacial Solar Plant',
        homeowner: 'Amit Bansal',
        location: 'Phase 7, Mohali, Punjab',
        capacity: '3 kWp',
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
        homeowner: 'Anjali Sharma',
        location: 'DLF Phase 2, Gurgaon, Haryana',
        capacity: '10 kWp',
        image: '/har1_main.webp',
        billBefore: '₹24,000 / mo',
        billAfter: '₹1,200 / mo (95% Cut)',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'EV Charger Ready + Smart Net Meter',
        quote: 'We run multiple 2-ton inverter ACs and charge our EV daily. The 10 kW solar array produces abundant energy, saving us over ₹2.5 Lakh annually.',
    },
    {
        id: 'karnal-5kw',
        title: '5 kW Independent Kothi Solar Array',
        homeowner: 'Sandeep Malik',
        location: 'Model Town, Karnal, Haryana',
        capacity: '5 kWp',
        image: '/resi2main.webp',
        billBefore: '₹9,200 / mo',
        billAfter: '₹240 / mo',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'Hot-Dip Galvanized Elevated Frame',
        quote: 'Very professional installation team. They used heavy galvanized frames that withstand heavy winds and rains with zero vibration.',
    },
    {
        id: 'ludhiana-3kw',
        title: '3 kW Standard Family Rooftop Solar',
        homeowner: 'Rajesh Kumar',
        location: 'Civil Lines, Ludhiana, Punjab',
        capacity: '3 kWp',
        image: '/resi1m.webp',
        billBefore: '₹5,400 / mo',
        billAfter: '₹80 / mo',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'DCR Mono PERC / TOPCon Modules',
        quote: 'The best investment for our house. We are getting free daytime solar power and the mobile app shows live generation every second.',
    },
    {
        id: 'panchkula-10kw',
        title: '10 kW Bungalow Rooftop Solar Plant',
        homeowner: 'Rekha Rani',
        location: 'Sector 6, Panchkula, Haryana',
        capacity: '10 kWp',
        image: '/har1_main.webp',
        billBefore: '₹26,000 / mo',
        billAfter: '₹1,400 / mo',
        subsidy: '₹78,000 Credited via DBT',
        structure: 'Elevated Gazebo Terrace Design',
        quote: 'Divvy Solar designed an elevated gazebo-style solar structure on our terrace. It looks architecturally pleasing and cut our power bills to near zero.',
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

export default function ResidentialSolar1Page() {
    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '', systemSize: '' });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [submittedLead, setSubmittedLead] = useState(null);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const el = document.getElementById('epc-form') || document.getElementById('resi-hero-form');
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
                    systemSize: formData.systemSize || 'Residential Solar',
                    landingPage: '/residential-solar-1',
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
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#FECB00] selection:text-black antialiased font-sans">
            {/* Custom smooth marquee keyframes */}
            <style>{`
                [data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display: none !important; }

                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-infinite-marquee {
                    display: flex;
                    width: max-content;
                    animation: marqueeScroll 26s linear infinite;
                }
                .animate-infinite-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Funnel-isolated Header */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO: TAGLINE ON LEFT + SUBSIDY FORM ON RIGHT
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/40 via-white to-white overflow-hidden border-b border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* LEFT COLUMN — CATCHY TAGLINE & SUBSIDY HIGHLIGHTS */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Eyebrow Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-[#FECB00]" />
                                <span>PM Surya Ghar Yojana 2026</span>
                                <span className="text-slate-500">|</span>
                                <span className="text-[#FECB00] font-bold">Direct DBT Subsidy Up to ₹78,000</span>
                            </div>

                            {/* Catchy Main Tagline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black text-slate-900 leading-[1.14] tracking-tight">
                                Bring your home electricity bill to{' '}
                                <span className="text-black bg-[#FECB00] px-2.5 py-0.5 rounded-lg inline-block shadow-xs">
                                    Zero
                                </span>{' '}
                                with custom rooftop solar &amp; direct DBT subsidy.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                                Claim up to <strong className="text-slate-900 font-bold underline decoration-[#FECB00] decoration-4 underline-offset-2">₹78,000 central government subsidy</strong> credited straight into your bank account. 6.5 ft elevated frame keeps your roof 100% usable, with 25-year panel warranty and turnkey net-metering.
                            </p>

                            {/* Quick Subsidy Sizing Chips */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-lg space-y-2">
                                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                    <span>PM Surya Ghar Subsidy Slabs:</span>
                                    <span className="text-emerald-700 font-extrabold">● Direct Bank Credit</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                                        <div className="font-bold text-slate-900">2 kW System</div>
                                        <div className="text-emerald-700 font-extrabold text-[11px]">₹60,000 Subsidy</div>
                                        <div className="text-[10px] text-slate-500">1-2 BHK Homes</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white border-2 border-[#FECB00] shadow-xs">
                                        <div className="font-extrabold text-slate-900">3 kW System ★</div>
                                        <div className="text-emerald-700 font-black text-[11px]">₹78,000 Subsidy</div>
                                        <div className="text-[10px] text-slate-500">Max Subsidy Slab</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 col-span-2 sm:col-span-1">
                                        <div className="font-bold text-slate-900">5-10 kW Systems</div>
                                        <div className="text-emerald-700 font-extrabold text-[11px]">₹78,000 Subsidy</div>
                                        <div className="text-[10px] text-slate-500">Kothis &amp; Villas</div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-700">
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> 1,500+ Homes Powered
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> 6.5 Ft Elevated Frame
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> DHBVN / PSPCL Net-Metering
                                </span>
                            </div>

                            {/* Helpdesk Direct Call */}
                            <div className="pt-1 flex items-center gap-2 text-xs text-slate-600">
                                <span>Residential Solar Helpdesk:</span>
                                <a
                                    href="tel:+919254986321"
                                    className="font-bold text-slate-900 hover:text-amber-600 underline decoration-[#FECB00] decoration-2 underline-offset-4"
                                >
                                    +91 92549-86321
                                </a>
                            </div>

                        </div>

                        {/* RIGHT COLUMN — CLEAN FEASIBILITY & SUBSIDY FORM */}
                        <div id="epc-form" className="lg:col-span-5 scroll-mt-24">
                            <div id="resi-hero-form" className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                                {/* Top Yellow Accent Strip */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FECB00]" />

                                <div className="mb-5">
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-2.5 py-0.5 rounded">
                                            Free Subsidy Check
                                        </span>
                                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                            ● ₹78k Subsidy Active
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                        Check Your Subsidy &amp; Savings
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Book a free physical roof survey and get custom quotation within 24 hours.
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
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Vikas Gupta"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Mobile / WhatsApp Number *
                                        </label>
                                        <div className="flex items-center rounded-xl bg-slate-50 border border-slate-300 overflow-hidden focus-within:border-slate-900 focus-within:bg-white transition">
                                            <span className="px-3.5 py-2.5 bg-slate-100 border-r border-slate-300 text-xs font-bold text-slate-700">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="10-digit mobile number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                className="w-full px-3 py-2.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Average Monthly Electricity Bill *
                                        </label>
                                        <select
                                            required
                                            value={formData.monthlyBill}
                                            onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer"
                                        >
                                            <option value="">Select Monthly Bill</option>
                                            <option value="₹1,500 - ₹3,500 / month">₹1,500 – ₹3,500 / month (1-2 BHK)</option>
                                            <option value="₹3,500 - ₹7,000 / month">₹3,500 – ₹7,000 / month (3-4 BHK)</option>
                                            <option value="₹7,000 - ₹15,000 / month">₹7,000 – ₹15,000 / month (Kothi / High AC)</option>
                                            <option value="Above ₹15,000 / month">Above ₹15,000 / month (Villa / Heavy Load)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            City / Home Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Hisar, Mohali, Gurgaon, Ludhiana"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Preferred System Capacity (Optional)
                                        </label>
                                        <select
                                            value={formData.systemSize}
                                            onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer"
                                        >
                                            <option value="">Let Engineer Recommend Based on Bill</option>
                                            <option value="2 kW (₹60,000 Subsidy)">2 kW System (₹60,000 Subsidy)</option>
                                            <option value="3 kW (₹78,000 Max Subsidy)">3 kW System (₹78,000 Max Subsidy)</option>
                                            <option value="5 kW Elevated Frame">5 kW Elevated System</option>
                                            <option value="10 kW Villa / High Load">10 kW Villa / High Load System</option>
                                        </select>
                                    </div>

                                    {errorMsg && (
                                        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* High-Impact Yellow & Black CTA Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-3.5 rounded-xl bg-[#FECB00] hover:bg-[#ffd42e] active:scale-[0.99] text-slate-950 text-sm font-black tracking-wide transition shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 border border-black/5"
                                    >
                                        <span>{submitting ? 'Calculating Subsidy...' : 'Check Subsidy & Free Site Survey'}</span>
                                        <span className="text-base">→</span>
                                    </button>

                                    <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-500 font-medium">
                                        <span>🔒 100% Confidential</span>
                                        <span>·</span>
                                        <span>Zero Obligation</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — 5 CLEAN BENEFITS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-3 py-1 rounded-full">
                        Key Home Benefits
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                        Why Homeowners Choose Divvy Solar
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                        Guaranteed DBT subsidy facilitation, heavy-duty elevated frames, and 25 years of clean power.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {BENEFITS.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-900 hover:shadow-md transition duration-300"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FECB00]/25 text-black flex items-center justify-center text-lg mb-3">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                                <span className="inline-block text-[11px] font-bold text-black bg-slate-100 px-2 py-0.5 rounded">
                                    {item.metric}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — SLIDING BRANDS MARQUEE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-10 bg-slate-50 border-y border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Tier-1 DCR ALMM Panel &amp; Inverter Partners
                    </span>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-marquee flex items-center gap-8 py-2">
                        {[...BRANDS, ...BRANDS].map((brand, i) => (
                            <div
                                key={i}
                                className="w-44 h-20 flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center p-3 hover:border-[#FECB00] transition"
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={brand.src}
                                        alt={brand.name}
                                        fill
                                        sizes="176px"
                                        className="object-contain p-1"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — COMPACT RESIDENTIAL PROJECT SHOWCASE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-3 py-1 rounded-full">
                            Real Home Installations
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                            Recent Residential Rooftop Systems
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                        Net-metered homes across Haryana, Punjab &amp; Delhi NCR enjoying near-zero electricity bills.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {RESIDENTIAL_PROJECTS.map((p) => (
                        <div
                            key={p.id}
                            className="rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-900 hover:shadow-lg transition-all flex flex-col group"
                        >
                            <div className="relative h-44 bg-slate-900 shrink-0 overflow-hidden">
                                <Image
                                    src={encodeURI(p.image)}
                                    alt={p.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#FECB00] text-black text-xs font-extrabold shadow">
                                    {p.capacity}
                                </span>

                                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                                    <h3 className="text-sm font-bold truncate">
                                        {p.title}
                                    </h3>
                                    <p className="text-[11px] text-slate-200 truncate">
                                        📍 {p.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                <div>
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                        <div>
                                            <span className="text-slate-400 block text-[10px]">BEFORE</span>
                                            <span className="text-red-600 line-through">{p.billBefore}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-slate-400 block text-[10px]">AFTER</span>
                                            <span className="text-emerald-700 font-black">{p.billAfter}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-slate-600 mb-2">
                                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            ✓ {p.subsidy}
                                        </span>
                                        <span className="font-medium text-slate-500 truncate max-w-[140px]">{p.structure}</span>
                                    </div>

                                    <p className="text-xs text-slate-600 line-clamp-2 italic">
                                        &ldquo;{p.quote}&rdquo;
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full py-2 rounded-lg bg-slate-100 hover:bg-[#FECB00] hover:text-black text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span>Check Subsidy for My Home</span>
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — SLIDING REVIEWS MARQUEE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-3 py-1 rounded-full">
                        Homeowner Stories
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                        What Families Say About Divvy Solar
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Verified homeowner reviews across Haryana, Punjab &amp; Chandigarh.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-marquee flex items-center gap-6 py-2">
                        {[...REVIEWS, ...REVIEWS].map((r, idx) => (
                            <div
                                key={`${r.name}-${idx}`}
                                className="w-[85vw] sm:w-[360px] flex-shrink-0 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-900 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex text-[#FECB00] text-sm">
                                            ★★★★★
                                        </div>
                                        <span className="text-[10px] font-bold text-black bg-[#FECB00]/30 px-2 py-0.5 rounded">
                                            {r.system}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-4">
                                        &ldquo;{r.text}&rdquo;
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-900 text-[#FECB00] font-bold text-xs flex items-center justify-center shrink-0">
                                        {r.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-900 truncate">
                                            {r.name}
                                        </div>
                                        <div className="text-[11px] text-slate-500 truncate">
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
                <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-[#FECB00] relative text-center">
                        <button
                            type="button"
                            onClick={() => setShowThankYouModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="w-14 h-14 rounded-full bg-[#FECB00] text-black flex items-center justify-center text-2xl font-black mx-auto mb-3 shadow-sm">
                            ✓
                        </div>

                        <h3 className="text-2xl font-extrabold text-slate-900">
                            Thank You!
                        </h3>
                        <p className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mt-1">
                            Subsidy &amp; Site Survey Request Received
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                            Hi <strong className="text-black">{submittedLead?.name}</strong>, our solar engineer will check PM Surya Ghar subsidy eligibility for your home in <strong className="text-black">{submittedLead?.location}</strong>.
                        </p>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 my-4 text-left text-xs text-slate-700 space-y-1">
                            <div><strong>Phone:</strong> +91 {submittedLead?.phone}</div>
                            <div><strong>Monthly Bill:</strong> {submittedLead?.monthlyBill}</div>
                            {submittedLead?.systemSize && (
                                <div><strong>Selected System:</strong> {submittedLead?.systemSize}</div>
                            )}
                            <div className="text-[11px] text-slate-500 pt-1">
                                ⏱️ An engineer will call or WhatsApp you within 24 hours.
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+919254986321"
                                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#FECB00] text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 no-underline"
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
            <Footer isLandingPage={true} landingSlug="residential-solar-1" />

            {/* Mobile Bottom Quick Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-[#FECB00] text-xs font-bold text-center no-underline"
                >
                    📞 Call Helpdesk
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-[2] py-3 rounded-xl bg-[#FECB00] text-slate-950 text-xs font-black text-center cursor-pointer shadow-sm"
                >
                    Check Subsidy Free →
                </button>
            </div>
        </div>
    );
}
