'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { gridTariff, solarTariff, projects } from '@/data/projects';

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIAL SOLAR EPC 3NEW — CLEAN INDUSTRIAL LANDING PAGE
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
        icon: '⚡',
        title: 'Up to 70% Tariff Cut',
        desc: `Displace expensive commercial grid power (₹${gridTariff.toFixed(2)}/unit) down to an estimated ₹${solarTariff.toFixed(2)}/unit levelised cost.`,
        metric: 'Save ~₹7.00 / Unit',
    },
    {
        icon: '📊',
        title: '40% Accelerated Depreciation',
        desc: 'Claim 40% corporate tax depreciation in Year 1 under income tax provisions (consult your CA for eligibility).',
        metric: 'Year 1 Tax Relief',
    },
    {
        icon: '🛡️',
        title: 'Zero Roof Punctures (PEB)',
        desc: 'Standing-seam & trapezoidal clamps secure modules with zero drilling on factory tin sheets. 160+ km/h wind tested.',
        metric: 'STAAD-Pro Certified',
    },
    {
        icon: '🔄',
        title: 'Smart DG-PV Synchronization',
        desc: 'Zero-export reverse-feed relays protect generators while cutting factory diesel consumption by over 60% during cuts.',
        metric: 'Save 60%+ Diesel',
    },
    {
        icon: '⏱️',
        title: '< 3.0 Years Capital Payback',
        desc: 'Rapid corporate investment recovery with 22+ subsequent years of high-yield solar energy generation.',
        metric: '< 3.0 Yrs Payback',
    },
];

export default function IndustrialSolarEpc3NewPage() {
    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '' });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [submittedLead, setSubmittedLead] = useState(null);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const el = document.getElementById('epc-form') || document.getElementById('epc-hero-form');
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
                    landingPage: '/industrial-solar-epc3new',
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
            });
            setShowThankYouModal(true);
            setFormData({ name: '', phone: '', monthlyBill: '', location: '' });
            setSubmitting(false);
        } catch (err) {
            setErrorMsg(err.message || 'Unable to submit right now. Please call +91-9254986321.');
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#FECB00] selection:text-black antialiased font-sans">
            {/* Custom marquee keyframes */}
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
                SECTION 1 — HERO: TAGLINE ON LEFT + CLEAN EXECUTIVE FORM ON RIGHT
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/70 via-white to-white overflow-hidden border-b border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* LEFT COLUMN — CATCHY TAGLINE & VALUE METRICS */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Crisp Eyebrow Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-[#FECB00]" />
                                <span>Industrial Rooftop Solar EPC</span>
                                <span className="text-slate-500">|</span>
                                <span className="text-[#FECB00] font-bold">35+ MWp Commissioned</span>
                            </div>

                            {/* Catchy Main Tagline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black text-slate-900 leading-[1.14] tracking-tight">
                                Cut energy costs by up to{' '}
                                <span className="text-black bg-[#FECB00] px-2.5 py-0.5 rounded-lg inline-block shadow-xs">
                                    70%
                                </span>{' '}
                                with custom solar solutions for factories and warehouses.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                                Displace high commercial grid tariffs (₹{gridTariff.toFixed(2)}/unit) down to an estimated{' '}
                                <strong className="text-slate-900 font-bold underline decoration-[#FECB00] decoration-4 underline-offset-2">
                                    ₹{solarTariff.toFixed(2)}/unit
                                </strong>{' '}
                                levelised cost with 11kV/33kV HT synchronized solar,{' '}
                                <strong className="text-slate-900 font-bold">40% accelerated depreciation</strong>, and non-penetrating PEB clamping.
                            </p>

                            {/* Clean Tariff Savings Meter */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-lg">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                                    <span>Commercial Grid: <strong className="text-red-600">₹{gridTariff.toFixed(2)}/unit</strong></span>
                                    <span>Solar Cost: <strong className="text-emerald-700">~₹{solarTariff.toFixed(2)}/unit</strong></span>
                                </div>
                                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex">
                                    <div className="h-full bg-emerald-500 w-[33%]" />
                                    <div className="h-full bg-[#FECB00] w-[67%]" />
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mt-2">
                                    <span className="text-emerald-700">✓ Solar Levelised Cost</span>
                                    <span className="text-black bg-[#FECB00] px-2 py-0.5 rounded text-[10px]">SAVE ₹7.00/UNIT (67% DELTA)</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-700">
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> 1,000+ Factory Clients
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> Zero Roof Drilling
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                                    <span className="text-[#FECB00] font-bold">✓</span> CEIG &amp; DISCOM Liaison
                                </span>
                            </div>

                            {/* Engineering Desk Phone */}
                            <div className="pt-1 flex items-center gap-2 text-xs text-slate-600">
                                <span>Corporate Engineering Desk:</span>
                                <a
                                    href="tel:+919254986321"
                                    className="font-bold text-slate-900 hover:text-amber-600 underline decoration-[#FECB00] decoration-2 underline-offset-4"
                                >
                                    +91 92549-86321
                                </a>
                            </div>

                        </div>

                        {/* RIGHT COLUMN — SLEEK FEASIBILITY FORM */}
                        <div id="epc-form" className="lg:col-span-5 scroll-mt-24">
                            <div id="epc-hero-form" className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                                {/* Top Yellow Accent Strip */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FECB00]" />

                                <div className="mb-5">
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-2.5 py-0.5 rounded">
                                            Corporate Feasibility Desk
                                        </span>
                                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                            ● Desk Active
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                        Request Plant Feasibility &amp; ROI Model
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Get custom daytime load audit and 25-year financial projections within 24 hours.
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
                                            Contact Person Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rajesh Singhal (Director / GM)"
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
                                            Monthly Factory Electricity Bill *
                                        </label>
                                        <select
                                            required
                                            value={formData.monthlyBill}
                                            onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer"
                                        >
                                            <option value="">Select Monthly Bill Range</option>
                                            <option value="₹2 Lakh - ₹5 Lakh / month">₹2 Lakh – ₹5 Lakh / month</option>
                                            <option value="₹5 Lakh - ₹15 Lakh / month">₹5 Lakh – ₹15 Lakh / month</option>
                                            <option value="₹15 Lakh - ₹50 Lakh / month">₹15 Lakh – ₹50 Lakh / month</option>
                                            <option value="Above ₹50 Lakh / month">Above ₹50 Lakh / month</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Plant Location / Industrial Area *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Panipat, Manesar, Ludhiana"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                                        />
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
                                        <span>{submitting ? 'Preparing Feasibility Report...' : 'Get Free Feasibility Audit'}</span>
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
                        Key Industrial Benefits
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                        Why Factories Choose Divvy Solar EPC
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                        Displace daytime grid tariffs while maintaining structural integrity and zero factory downtime.
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
                        Tier-1 Equipment &amp; Technology Partners
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
                SECTION 4 — COMPACT PROJECT SHOWCASE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FECB00]/40 px-3 py-1 rounded-full">
                            Commissioned Plants
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                            Recent Industrial Installations
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                        Grid-synchronized HT/LT industrial solar across Haryana, Punjab &amp; NCR.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            className="rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-900 hover:shadow-lg transition-all flex flex-col group"
                        >
                            <div className="relative h-40 bg-slate-900 shrink-0 overflow-hidden">
                                <Image
                                    src={encodeURI(p.image)}
                                    alt={p.companyName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#FECB00] text-black text-xs font-extrabold shadow">
                                    {p.kWp.toLocaleString()} kWp
                                </span>

                                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                                    <h3 className="text-sm font-bold truncate">
                                        {p.companyName}
                                    </h3>
                                    <p className="text-[11px] text-slate-200 truncate">
                                        📍 {p.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                <div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-600 mb-2">
                                        <span className="font-semibold text-black bg-slate-100 px-2 py-0.5 rounded">
                                            {p.roofType}
                                        </span>
                                        <span>{p.sector}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-2 italic">
                                        &ldquo;{p.testimonialQuote}&rdquo;
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full py-2 rounded-lg bg-slate-100 hover:bg-[#FECB00] hover:text-black text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span>Get Feasibility for Similar Plant</span>
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
                        Client Feedback
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                        What Factory Owners Say
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Verified feedback from industrial enterprises running on Divvy Solar power.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-marquee flex items-center gap-6 py-2">
                        {[...projects, ...projects].map((p, idx) => (
                            <div
                                key={`${p.id}-${idx}`}
                                className="w-[85vw] sm:w-[360px] flex-shrink-0 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-900 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex text-[#FECB00] text-sm">
                                            ★★★★★
                                        </div>
                                        <span className="text-[10px] font-bold text-black bg-[#FECB00]/30 px-2 py-0.5 rounded">
                                            {p.kWp} kWp Installed
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-4">
                                        &ldquo;{p.testimonialQuote}&rdquo;
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-900 text-[#FECB00] font-bold text-xs flex items-center justify-center shrink-0">
                                        {p.ownerName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-900 truncate">
                                            {p.ownerName}
                                        </div>
                                        <div className="text-[11px] text-slate-500 truncate">
                                            {p.companyName}
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
                            Feasibility Request Received
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                            Hi <strong className="text-black">{submittedLead?.name}</strong>, our corporate engineering desk is reviewing your facility at <strong className="text-black">{submittedLead?.location}</strong>.
                        </p>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 my-4 text-left text-xs text-slate-700 space-y-1">
                            <div><strong>Phone:</strong> +91 {submittedLead?.phone}</div>
                            <div><strong>Monthly Bill:</strong> {submittedLead?.monthlyBill}</div>
                            <div className="text-[11px] text-slate-500 pt-1">
                                ⏱️ An EPC feasibility engineer will connect within 24 hours.
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+919254986321"
                                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#FECB00] text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 no-underline"
                            >
                                <span>📞 Direct Desk: +91 92549-86321</span>
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
            <Footer isLandingPage={true} landingSlug="industrial-solar-epc3new" />

            {/* Mobile Bottom Quick Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-[#FECB00] text-xs font-bold text-center no-underline"
                >
                    📞 Call Desk
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-[2] py-3 rounded-xl bg-[#FECB00] text-slate-950 text-xs font-black text-center cursor-pointer shadow-sm"
                >
                    Free Feasibility Audit →
                </button>
            </div>
        </div>
    );
}
