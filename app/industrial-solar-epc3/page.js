'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { gridTariff, solarTariff, projects } from '@/data/projects';

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIAL SOLAR EPC 3 — TOP-NOTCH DYNAMIC SOLAR YELLOW & INK BLACK THEME
// Structure based on Ma'am's exact feedback:
// 1. Hero: Tagline on Left + Dynamic Glassmorphic Form on Right (Warm Solar Glow)
// 2. 5 Dynamic Benefit Cards with Golden Accents & Micro-Animations
// 3. Sliding Tier-1 Brand Partners Marquee
// 4. Compact, Sleek Project Showcase (6 real factories with high-contrast tags)
// 5. Sliding Client Reviews Marquee (Infinite smooth loop)
// 6. Interactive Thank You Message Modal on Form Submission
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
        title: 'Up to 70% Power Cost Cut',
        desc: `Displace expensive commercial grid power (₹${gridTariff.toFixed(2)}/unit) down to ~₹${solarTariff.toFixed(2)}/unit levelised cost.`,
        metric: '₹7.00/unit Saved',
        highlight: 'Immediate OPEX Reduction',
    },
    {
        icon: '📊',
        title: '40% Accelerated Depreciation',
        desc: 'Claim 40% corporate tax depreciation in Year 1 under income tax provisions (consult your CA for eligibility).',
        metric: 'Year 1 Tax Relief',
        highlight: 'Corporate Tax Advantage',
    },
    {
        icon: '🛡️',
        title: 'Zero Roof Punctures (PEB)',
        desc: 'Standing-seam & trapezoidal aluminium clamps secure solar modules with zero drilling on factory tin sheets.',
        metric: '160+ km/h Resilient',
        highlight: 'STAAD-Pro Certified',
    },
    {
        icon: '🔄',
        title: 'Smart DG-PV Synchronization',
        desc: 'Zero-export reverse-feed protection prevents generator damage while cutting diesel consumption by 60%+ during cuts.',
        metric: 'Save 60%+ Diesel',
        highlight: 'Automatic Reverse-Feed Protection',
    },
    {
        icon: '⏱️',
        title: '< 3.0 Years Capital Payback',
        desc: 'Rapid corporate payback period with 22+ subsequent years of high-yield solar power generation.',
        metric: '< 3.0 Yrs Payback',
        highlight: '25-Year Asset Life',
    },
];

export default function IndustrialSolarEpc3Page() {
    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '' });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [submittedLead, setSubmittedLead] = useState(null);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.getElementById('epc-hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                    landingPage: '/industrial-solar-epc3',
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
        <div className="min-h-screen bg-[#FFFDF7] text-[#0A0F1D] selection:bg-[#FECB00] selection:text-black antialiased font-sans">
            {/* Dynamic CSS animations & solar glow effects */}
            <style>{`
                [data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display: none !important; }

                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-infinite-marquee {
                    display: flex;
                    width: max-content;
                    animation: marqueeScroll 28s linear infinite;
                }
                .animate-infinite-marquee:hover {
                    animation-play-state: paused;
                }

                @keyframes solarShine {
                    0% { transform: translateX(-100%); }
                    50%, 100% { transform: translateX(200%); }
                }
                .btn-shine-sweep {
                    position: relative;
                    overflow: hidden;
                }
                .btn-shine-sweep::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 40%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
                    transform: skewX(-20deg);
                    animation: solarShine 3.5s infinite ease-in-out;
                }

                .golden-card-glow {
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .golden-card-glow:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 36px -10px rgba(254, 203, 0, 0.35);
                    border-color: #FECB00;
                }
            `}</style>

            {/* Funnel-isolated Header */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO: TAGLINE ON LEFT + DYNAMIC FORM ON RIGHT
                Warm Solar Yellowish Ambient Gradient + Ink Black Contrast
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-8 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9E6] via-[#FFFDF5] to-[#FFFDF7] overflow-hidden">
                {/* Dynamic Ambient Solar Spheres */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FECB00]/25 via-[#FFE066]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-32 right-10 w-80 h-80 bg-[#FFD000]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* LEFT COLUMN — CATCHY HERO TAGLINE */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Dynamic Yellow Pill */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F1D] text-[#FECB00] border border-[#FECB00]/40 text-xs font-bold tracking-wide shadow-md">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FECB00] animate-pulse shadow-[0_0_8px_#FECB00]" />
                                <span>INDUSTRIAL ROOFTOP SOLAR EPC</span>
                                <span className="text-zinc-500">|</span>
                                <span className="text-white font-medium">35+ MWp Installed</span>
                            </div>

                            {/* Catchy Main Tagline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-[#0A0F1D] leading-[1.1] tracking-tight">
                                Cut energy costs by up to{' '}
                                <span className="relative inline-block text-black bg-gradient-to-r from-[#FECB00] via-[#FFD633] to-[#FECB00] px-3 py-1 rounded-xl shadow-[0_4px_14px_rgba(254,203,0,0.4)] transform -rotate-1">
                                    70%
                                </span>{' '}
                                with custom solar solutions for factories and warehouses.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
                                Displace high commercial grid tariffs (₹{gridTariff.toFixed(2)}/unit) down to an estimated{' '}
                                <span className="font-bold text-[#0A0F1D] underline decoration-[#FECB00] decoration-4 underline-offset-2">
                                    ₹{solarTariff.toFixed(2)}/unit
                                </span>{' '}
                                levelised cost with 11kV/33kV synchronized solar,{' '}
                                <strong className="text-[#0A0F1D] font-bold">40% accelerated depreciation</strong>, and non-penetrating PEB clamping.
                            </p>

                            {/* Interactive Solar Economics Pill */}
                            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#FECB00]/50 shadow-[0_10px_25px_rgba(254,203,0,0.12)] max-w-lg">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                                    <span>Commercial Grid: <strong className="text-red-600">₹{gridTariff.toFixed(2)}/unit</strong></span>
                                    <span>Solar Cost: <strong className="text-emerald-700">₹{solarTariff.toFixed(2)}/unit</strong></span>
                                </div>
                                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                                    <div className="h-full bg-emerald-500 w-[33%]" title="Solar Power Cost (~33%)" />
                                    <div className="h-full bg-gradient-to-r from-[#FECB00] to-[#F59E0B] w-[67%]" title="Net Tariff Savings (~67%)" />
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mt-2">
                                    <span className="text-emerald-700">✓ Solar Levelised Cost</span>
                                    <span className="text-black bg-[#FECB00] px-2 py-0.5 rounded font-black">SAVE ₹7.00/UNIT (67% DELTA)</span>
                                </div>
                            </div>

                            {/* Quick Trust Highlights */}
                            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-[#0A0F1D]">
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                                    <span className="text-[#FECB00] text-sm">★</span> 1,000+ Factory Clients
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                                    <span className="text-[#FECB00] text-sm">★</span> Zero Factory Interruption
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                                    <span className="text-[#FECB00] text-sm">★</span> CEIG &amp; DISCOM Approvals
                                </span>
                            </div>

                        </div>

                        {/* RIGHT COLUMN — DYNAMIC GLASSMORPHIC LEAD FORM */}
                        <div id="epc-hero-form" className="lg:col-span-5 scroll-mt-24">
                            <div className="rounded-[28px] bg-white border-2 border-[#FECB00] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(254,203,0,0.3)] relative overflow-hidden">
                                {/* Top Yellow Glow Bar */}
                                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#FECB00] via-[#FFD42E] to-[#F59E0B]" />

                                <div className="mb-5">
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#FECB00] px-3 py-0.5 rounded-full shadow-sm">
                                            Corporate Feasibility Desk
                                        </span>
                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                            ● Desk Live
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-black text-[#0A0F1D]">
                                        Request Plant Audit &amp; ROI Model
                                    </h2>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Receive custom 25-year financial projections and daytime load audit within 24 hours.
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
                                            Contact Person Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rajesh Singhal (Director / GM)"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0A0F1D] placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-[#FECB00]/40 focus:bg-white transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Mobile / WhatsApp Number *
                                        </label>
                                        <div className="flex items-center rounded-xl bg-slate-50 border border-slate-300 overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-[#FECB00]/40 focus-within:bg-white transition">
                                            <span className="px-3.5 py-2.5 bg-[#FFF9E6] border-r border-slate-300 text-xs font-black text-black">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="10-digit mobile number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                className="w-full px-3 py-2.5 bg-transparent text-sm text-[#0A0F1D] placeholder:text-slate-400 focus:outline-none font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Monthly Factory Electricity Bill *
                                        </label>
                                        <select
                                            required
                                            value={formData.monthlyBill}
                                            onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0A0F1D] focus:outline-none focus:border-black focus:ring-2 focus:ring-[#FECB00]/40 focus:bg-white transition cursor-pointer font-medium"
                                        >
                                            <option value="">Select Monthly Bill Range</option>
                                            <option value="₹2 Lakh - ₹5 Lakh / month">₹2 Lakh – ₹5 Lakh / month</option>
                                            <option value="₹5 Lakh - ₹15 Lakh / month">₹5 Lakh – ₹15 Lakh / month</option>
                                            <option value="₹15 Lakh - ₹50 Lakh / month">₹15 Lakh – ₹50 Lakh / month</option>
                                            <option value="Above ₹50 Lakh / month">Above ₹50 Lakh / month</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-1">
                                            Plant Location / Industrial Area *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Panipat, Manesar, Ludhiana"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0A0F1D] placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-[#FECB00]/40 focus:bg-white transition"
                                        />
                                    </div>

                                    {errorMsg && (
                                        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Big Bold Yellow & Black CTA Button with Shine Effect */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn-shine-sweep w-full py-4 rounded-xl bg-gradient-to-r from-[#FECB00] via-[#FFD42E] to-[#FECB00] hover:from-[#FFD42E] hover:to-[#F59E0B] active:scale-[0.99] text-black text-sm font-black tracking-wide transition-all shadow-[0_10px_25px_rgba(254,203,0,0.45)] hover:shadow-[0_12px_30px_rgba(254,203,0,0.6)] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 border border-black/10"
                                    >
                                        <span>{submitting ? 'Preparing Feasibility Report...' : 'Get Free Feasibility Audit'}</span>
                                        <span className="text-lg">→</span>
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
                SECTION 2 — 5 DYNAMIC BENEFITS WITH YELLOW ACCENTS & GLOW
                Ma'am's feedback: "uske niche benefit 4-5" (Simple & Top-Notch)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FECB00] px-3.5 py-1 rounded-full shadow-sm">
                        High-Yield Industrial Value
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#0A0F1D] mt-3">
                        Why Factories Choose Divvy Solar EPC
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Engineered to displace daytime grid tariffs while protecting factory roofs and equipment.
                    </p>
                </div>

                {/* 5 Dynamic Benefit Cards with Gold Tops & Hover Glow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {BENEFITS.map((item, idx) => (
                        <div
                            key={idx}
                            className="golden-card-glow rounded-2xl bg-white border-2 border-slate-100 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
                        >
                            {/* Top Golden Accent Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FECB00]" />

                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] border border-[#FECB00]/40 text-black flex items-center justify-center text-xl mb-4 shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-1">
                                    {item.highlight}
                                </span>
                                <h3 className="text-sm font-black text-[#0A0F1D] leading-snug mb-2 mt-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-slate-100">
                                <span className="inline-block text-xs font-black text-black bg-[#FECB00]/30 border border-[#FECB00]/60 px-2.5 py-1 rounded-md shadow-xs">
                                    {item.metric}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — SLIDING BRANDS MARQUEE
                Ma'am's feedback: "uske niche brands slide kerke jaise website me hai"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-12 bg-[#FFFDF5] border-y border-[#FECB00]/30 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
                    <span className="text-xs font-black uppercase tracking-widest text-[#0A0F1D] bg-[#FECB00]/40 px-3 py-1 rounded-full">
                        Tier-1 Equipment &amp; Technology Partners
                    </span>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFFDF5] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFFDF5] to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-marquee flex items-center gap-8 py-2">
                        {[...BRANDS, ...BRANDS].map((brand, i) => (
                            <div
                                key={i}
                                className="w-44 h-20 flex-shrink-0 bg-white rounded-2xl border-2 border-slate-100 shadow-sm flex items-center justify-center p-3 hover:border-[#FECB00] hover:shadow-md transition duration-300"
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
                SECTION 4 — COMPACT PROJECT SHOWCASE (NO BIG BULKY BOXES)
                Ma'am's feedback: "uske niche projevct showcase or jada bde bde box nhi"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FECB00] px-3.5 py-1 rounded-full shadow-sm">
                            Commissioned Plants
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-[#0A0F1D] mt-3">
                            Recent Industrial Installations
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                        Grid-synchronized HT/LT industrial solar plants across Haryana, Punjab &amp; NCR.
                    </p>
                </div>

                {/* 6 Compact, Sleek Cards Grid (Not Bulky) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            className="golden-card-glow rounded-2xl overflow-hidden bg-white border-2 border-slate-100 flex flex-col group shadow-sm"
                        >
                            <div className="relative h-44 bg-slate-900 shrink-0 overflow-hidden">
                                <Image
                                    src={p.image}
                                    alt={p.companyName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Capacity badge with Golden Glow */}
                                <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-[#FECB00] text-black text-xs font-black shadow-[0_2px_10px_rgba(254,203,0,0.5)]">
                                    {p.kWp.toLocaleString()} kWp
                                </span>

                                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                                    <h3 className="text-sm font-black truncate">
                                        {p.companyName}
                                    </h3>
                                    <p className="text-[11px] text-amber-200 truncate font-medium">
                                        📍 {p.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-white">
                                <div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-600 mb-2">
                                        <span className="font-bold text-black bg-[#FFF9E6] border border-[#FECB00]/40 px-2 py-0.5 rounded">
                                            {p.roofType}
                                        </span>
                                        <span className="font-medium text-slate-500">{p.sector}</span>
                                    </div>
                                    <p className="text-xs text-slate-700 line-clamp-2 italic leading-relaxed">
                                        &ldquo;{p.testimonialQuote}&rdquo;
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#FECB00] hover:text-black text-slate-900 text-xs font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
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
                Ma'am's feedback: "uske niche rewies slide vale jaise website me hai"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 bg-[#FFFDF5] border-t border-[#FECB00]/30 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                    <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FECB00] px-3.5 py-1 rounded-full shadow-sm">
                        Verified Client Reviews
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#0A0F1D] mt-3">
                        What Factory Owners Say
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Verified operational feedback from manufacturing plants powered by Divvy Solar.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFFDF5] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFFDF5] to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-marquee flex items-center gap-6 py-2">
                        {[...projects, ...projects].map((p, idx) => (
                            <div
                                key={`${p.id}-${idx}`}
                                className="w-[85vw] sm:w-[370px] flex-shrink-0 bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#FECB00] transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex text-[#FECB00] text-sm tracking-wider">
                                            ★★★★★
                                        </div>
                                        <span className="text-[10px] font-black text-black bg-[#FECB00] px-2.5 py-0.5 rounded shadow-xs">
                                            {p.kWp} kWp Commissioned
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-4">
                                        &ldquo;{p.testimonialQuote}&rdquo;
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-black text-[#FECB00] font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                                        {p.ownerName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-black text-[#0A0F1D] truncate">
                                            {p.ownerName}
                                        </div>
                                        <div className="text-[11px] text-slate-500 truncate font-medium">
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
                Ma'am's feedback: "or ha jab form koi uper submit kere tab thankyou kerke message popup"
            ═══════════════════════════════════════════════════════════════ */}
            {showThankYouModal && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-[#FECB00] relative animate-slide-up text-center">
                        <button
                            type="button"
                            onClick={() => setShowThankYouModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Gold Checkmark Badge */}
                        <div className="w-16 h-16 rounded-full bg-[#FECB00] text-black flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-[0_0_20px_rgba(254,203,0,0.6)]">
                            ✓
                        </div>

                        <h3 className="text-2xl font-black text-[#0A0F1D]">
                            Thank You!
                        </h3>
                        <p className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block mt-1">
                            Feasibility Request Received Successfully
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                            Hi <strong className="text-black">{submittedLead?.name}</strong>, our corporate engineering desk is reviewing your facility at <strong className="text-black">{submittedLead?.location}</strong>.
                        </p>

                        <div className="bg-[#FFF9E6] border border-[#FECB00]/60 rounded-xl p-3.5 my-4 text-left text-xs text-slate-800 space-y-1">
                            <div><strong>Phone:</strong> +91 {submittedLead?.phone}</div>
                            <div><strong>Monthly Bill:</strong> {submittedLead?.monthlyBill}</div>
                            <div className="text-[11px] text-amber-800 pt-1 font-semibold">
                                ⏱️ An EPC feasibility engineer will connect within 24 hours.
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+919254986321"
                                className="w-full py-3.5 rounded-xl bg-black hover:bg-slate-900 text-[#FECB00] text-xs font-black tracking-wide transition flex items-center justify-center gap-2 no-underline shadow-md"
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
            <Footer isLandingPage={true} landingSlug="industrial-solar-epc3" />

            {/* Mobile Bottom Quick Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-black text-[#FECB00] text-xs font-black text-center no-underline"
                >
                    📞 Call Desk
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-[2] py-3 rounded-xl bg-[#FECB00] text-black text-xs font-black text-center cursor-pointer shadow-md"
                >
                    Free Feasibility Audit →
                </button>
            </div>
        </div>
    );
}
