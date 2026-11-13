'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { gridTariff, solarTariff, projects } from '@/data/projects';

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIAL SOLAR EPC 3 — CLEAN OBSIDIAN HIGH-PERFORMANCE LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────

const FONTS = {
    heading: { fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" },
    body: { fontFamily: "var(--font-inter, 'Inter', sans-serif)" },
};

const SOLUTIONS = [
    {
        title: 'HT & LT Rooftop EPC',
        desc: '11kV & 33kV synchronized solar arrays engineered for continuous industrial manufacturing.',
        image: '/epc3/hero-solar.jpg',
    },
    {
        title: 'Solar Inverters & SCADA',
        desc: 'High-efficiency string inverters with live string monitoring and generation analytics.',
        image: '/epc3/inverter-tech.jpg',
    },
    {
        title: 'Non-Penetrating PEB Clamping',
        desc: 'Standing-seam & trapezoidal clamps designed to eliminate roof sheet drilling.',
        image: '/epc3/peb-clamping.webp',
    },
    {
        title: 'DG-PV Sync & Storage',
        desc: 'Advanced reverse-feed protection with diesel generators plus CEIG and DISCOM approvals.',
        image: '/epc3/dg-sync.jpeg',
    },
];

const KNOWLEDGE_ACCORDION = [
    {
        num: '001',
        title: 'Solar 101 the basics',
        detail: 'Rooftop solar converts daytime sunlight into direct 3-phase AC power using high-efficiency mono PERC modules, directly offsetting expensive commercial grid power during peak factory operating hours.',
    },
    {
        num: '002',
        title: 'Financial benefits of solar',
        detail: `Offset high grid tariffs down to an estimated ₹${solarTariff.toFixed(2)}/unit levelised cost while claiming 40% accelerated tax depreciation (consult your CA for eligibility). Typical corporate capital payback is under 3.0 years.`,
    },
    {
        num: '003',
        title: 'Environmental impact',
        detail: 'A 500 kWp industrial rooftop solar installation offsets over 600 metric tonnes of carbon emissions annually, helping manufacturing enterprises achieve ESG compliance and RE100 vendor milestones.',
    },
    {
        num: '004',
        title: 'Solar installation process',
        detail: 'Our engineering desk conducts 3D shadow analysis, structural load testing, STAAD-Pro wind calculations, CEIG safety liaison, and bi-directional net-metering commissioning across North India.',
    },
];

export default function IndustrialSolarEpc3Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '' });
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [activeAccordion, setActiveAccordion] = useState(1);

    const scrollToSection = (id) => (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            router.push('/thank-you?from=industrial-solar-epc3');
        } catch (err) {
            setErrorMsg(err.message || 'Unable to submit right now. Please call +91-9254986321.');
            setSubmitting(false);
        }
    };

    return (
        <div style={FONTS.body} className="min-h-screen bg-[#07080A] text-white selection:bg-[#38BDF8] selection:text-[#07080A] overflow-x-hidden antialiased">
            {/* Hide floating chatbot on landing page */}
            <style>{`[data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display: none !important; }`}</style>

            {/* Funnel-isolated Header */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO CONTAINER
            ═══════════════════════════════════════════════════════════════ */}
            <section className="px-3 sm:px-6 lg:px-8 pt-3 pb-8">
                <div className="max-w-7xl mx-auto relative rounded-[32px] overflow-hidden border border-white/10 min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 shadow-2xl">
                    <Image
                        src="/epc3/hero-solar.jpg"
                        alt="Cinematic solar field and wind turbines at sunset"
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover object-center"
                    />

                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, rgba(7,8,10,0.35) 0%, rgba(7,8,10,0.15) 35%, rgba(7,8,10,0.78) 75%, rgba(7,8,10,0.96) 100%)',
                        }}
                    />

                    {/* TOP BADGE */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-xs text-zinc-200 shadow-lg">
                            <div className="flex -space-x-1.5">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-black text-[9px] font-bold border border-black/40">DS</span>
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-400 text-black text-[9px] font-bold border border-black/40">35</span>
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400 text-black text-[9px] font-bold border border-black/40">✓</span>
                            </div>
                            <span className="font-medium tracking-tight text-[11px] sm:text-xs">
                                35+ MWp Installed · 1,000+ Factory Clients
                            </span>
                        </div>
                    </div>

                    {/* BOTTOM EDITORIAL HEADLINE */}
                    <div className="relative z-10 w-full mt-auto pt-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                            <div className="lg:col-span-7">
                                <h1
                                    style={{ ...FONTS.heading, letterSpacing: '-0.035em' }}
                                    className="text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.02] text-white"
                                >
                                    <span>Discover clean</span>
                                    <span className="block mt-1 sm:mt-2">
                                        <span className="inline-block w-12 sm:w-20 lg:w-28 h-[2px] bg-white/90 align-middle mr-3 sm:mr-5 -mt-1 sm:-mt-2 rounded-full" />
                                        <span>solar solution</span>
                                    </span>
                                </h1>
                            </div>

                            <div className="lg:col-span-5 space-y-4">
                                <p className="text-zinc-200 text-xs sm:text-sm lg:text-[14px] leading-relaxed max-w-md">
                                    Cut factory and warehouse energy costs by up to 70% with turnkey industrial solar EPC at{' '}
                                    <span className="text-white font-semibold">₹{solarTariff.toFixed(2)}/unit*</span>,{' '}
                                    <span className="text-white font-semibold">40% accelerated depreciation</span>, and non-penetrating PEB clamping.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={scrollToSection('epc-form')}
                                        style={FONTS.heading}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#07080A] hover:bg-[#38BDF8] text-xs font-semibold tracking-wide transition shadow-md cursor-pointer"
                                    >
                                        <span>Get Started</span>
                                        <span>→</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={scrollToSection('engineering-advantages')}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition cursor-pointer"
                                    >
                                        <span>Explore Advantages</span>
                                        <span>↓</span>
                                    </button>
                                </div>

                                <p className="text-[10px] sm:text-[11px] text-zinc-400">
                                    *₹{solarTariff.toFixed(2)}/unit 25-yr levelised cost vs ₹{gridTariff.toFixed(2)} grid tariff. Depreciation subject to CA verification.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FEASIBILITY AUDIT DESK (#epc-form)
            ═══════════════════════════════════════════════════════════════ */}
            <section id="epc-form" className="px-3 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto scroll-mt-20">
                <div className="rounded-[28px] bg-[#101216] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[10px] font-semibold text-[#38BDF8] uppercase tracking-widest mb-2">
                                    Corporate Engineering Desk
                                </div>
                                <h2 style={FONTS.heading} className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                                    Request Free Industrial Feasibility Study
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                                Get custom tariff displacement calculations, shadow analysis, and 25-year financial ROI model within 24 hours.
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

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                                <div>
                                    <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">Contact Person Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Rajesh Singhal"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#38BDF8] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">Mobile / WhatsApp *</label>
                                    <div className="flex items-center rounded-xl bg-white/[0.04] border border-white/15 overflow-hidden focus-within:border-[#38BDF8] transition">
                                        <span className="px-3 py-2.5 bg-white/5 border-r border-white/10 text-xs font-semibold text-zinc-300">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            placeholder="10-digit number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                            className="w-full px-3 py-2.5 bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">Monthly Electricity Bill *</label>
                                    <select
                                        required
                                        value={formData.monthlyBill}
                                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8] transition cursor-pointer"
                                    >
                                        <option value="">Select Monthly Bill</option>
                                        <option value="₹2 Lakh - ₹5 Lakh / month">₹2 Lakh – ₹5 Lakh / mo</option>
                                        <option value="₹5 Lakh - ₹15 Lakh / month">₹5 Lakh – ₹15 Lakh / mo</option>
                                        <option value="₹15 Lakh - ₹50 Lakh / month">₹15 Lakh – ₹50 Lakh / mo</option>
                                        <option value="Above ₹50 Lakh / month">Above ₹50 Lakh / mo</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] text-zinc-400 mb-1.5 font-medium">Plant Location / Industrial Area *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Manesar, Panipat"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#38BDF8] transition"
                                    />
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs">
                                    {errorMsg}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                <div className="flex items-center gap-3 text-xs text-zinc-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-emerald-400">✓</span> 100% Confidential
                                    </span>
                                    <span>·</span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-emerald-400">✓</span> Zero Obligation
                                    </span>
                                    <span>·</span>
                                    <span className="hidden sm:inline-flex items-center gap-1.5">
                                        <span className="text-sky-400">✓</span> DISCOM Net-Metering Liaison
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={FONTS.heading}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#60a5fa] text-[#07080A] text-sm font-bold tracking-wide transition shadow-lg disabled:opacity-50 cursor-pointer"
                                >
                                    {submitting ? 'Preparing Feasibility...' : 'Get Free Feasibility Study →'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — REDESIGNED: "ENGINEERED FOR INDUSTRIAL SCALE & MAXIMUM ROI"
                Clean, authoritative, high-performance 4-pillar architectural layout
                plus direct comparative financial matrix.
            ═══════════════════════════════════════════════════════════════ */}
            <section id="engineering-advantages" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-zinc-300 uppercase tracking-widest mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                            Industrial EPC Engineering
                        </div>
                        <h2
                            style={{ ...FONTS.heading, letterSpacing: '-0.03em' }}
                            className="text-3xl sm:text-5xl font-normal text-white leading-[1.08]"
                        >
                            Engineered for Factory Scale,
                            <br />
                            Maximum Yield &amp; High ROI
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            Every megawatt is engineered with structural wind simulations, non-penetrating clamps, and zero-export reverse feed relays to protect factory transformers and diesel gensets.
                        </p>
                    </div>
                </div>

                {/* 4 Clean Engineering Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

                    {/* Pillar 1: Levelised Power Economics */}
                    <div className="rounded-[24px] bg-[#101216] border border-white/10 p-6 flex flex-col justify-between hover:border-[#38BDF8]/40 transition group">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8] text-lg font-bold">
                                    ₹
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    70% Tariff Cut
                                </span>
                            </div>
                            <h3 style={FONTS.heading} className="text-lg font-medium text-white mb-2">
                                ₹{solarTariff.toFixed(2)}/Unit Power
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Displace high commercial grid tariffs (₹{gridTariff.toFixed(2)}/unit) with high-yield daytime solar generated directly on your roof.
                            </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-white/10">
                            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Estimated Savings</div>
                            <div style={FONTS.heading} className="text-xl font-bold text-white mt-0.5">
                                ₹7.00/unit Delta
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2: Non-Penetrating PEB Clamping */}
                    <div className="rounded-[24px] bg-[#101216] border border-white/10 p-6 flex flex-col justify-between hover:border-[#38BDF8]/40 transition group">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 text-lg font-bold">
                                    🛡️
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                    No Roof Puncture
                                </span>
                            </div>
                            <h3 style={FONTS.heading} className="text-lg font-medium text-white mb-2">
                                Non-Penetrating PEB
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Anodized aluminium standing seam and trapezoidal clamps engineered to secure modules without drilling through factory tin sheets.
                            </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-white/10">
                            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Wind Rating</div>
                            <div style={FONTS.heading} className="text-xl font-bold text-white mt-0.5">
                                160+ km/h Resilient
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3: Corporate Tax Depreciation */}
                    <div className="rounded-[24px] bg-[#101216] border border-white/10 p-6 flex flex-col justify-between hover:border-[#38BDF8]/40 transition group">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/25 flex items-center justify-center text-sky-400 text-lg font-bold">
                                    📊
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                                    Tax Advantage
                                </span>
                            </div>
                            <h3 style={FONTS.heading} className="text-lg font-medium text-white mb-2">
                                40% Tax Write-Off
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Claim 40% accelerated tax depreciation in Year 1 (consult your CA for eligibility). Substantially lowers net plant investment cost.
                            </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-white/10">
                            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Capital Payback</div>
                            <div style={FONTS.heading} className="text-xl font-bold text-white mt-0.5">
                                &lt; 3.0 Years Typical
                            </div>
                        </div>
                    </div>

                    {/* Pillar 4: DG-PV Reverse Feed Sync */}
                    <div className="rounded-[24px] bg-[#101216] border border-white/10 p-6 flex flex-col justify-between hover:border-[#38BDF8]/40 transition group">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="w-10 h-10 rounded-xl bg-violet-400/10 border border-violet-400/25 flex items-center justify-center text-violet-400 text-lg font-bold">
                                    ⚡
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                                    Diesel Savings
                                </span>
                            </div>
                            <h3 style={FONTS.heading} className="text-lg font-medium text-white mb-2">
                                DG-PV Synchronization
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Microsecond zero-export reverse feed relays prevent generator backfeeding while reducing factory diesel consumption by over 60%.
                            </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-white/10">
                            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Diesel Displacement</div>
                            <div style={FONTS.heading} className="text-xl font-bold text-white mt-0.5">
                                Save 60%+ Fuel
                            </div>
                        </div>
                    </div>

                </div>

                {/* Direct Industrial Economics Matrix (Clean comparison table) */}
                <div className="rounded-[24px] bg-[#101216] border border-white/10 p-6 sm:p-8 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8]">Financial Comparison</span>
                            <h3 style={FONTS.heading} className="text-xl sm:text-2xl font-medium text-white mt-0.5">
                                Factory Grid Power vs Divvy Solar EPC
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={scrollToSection('epc-form')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
                        >
                            <span>Request Financial Model</span>
                            <span>→</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-zinc-400">
                                    <th className="py-3 px-4 font-medium">Evaluation Parameter</th>
                                    <th className="py-3 px-4 font-medium text-zinc-400">Standard Grid Power (DISCOM)</th>
                                    <th className="py-3 px-4 font-semibold text-[#38BDF8]">Divvy Industrial Solar EPC</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-zinc-300">
                                <tr>
                                    <td className="py-3.5 px-4 font-medium text-white">Daytime Tariff Rate</td>
                                    <td className="py-3.5 px-4 text-zinc-400">₹9.00 – ₹11.00 / unit (HT/LT)</td>
                                    <td className="py-3.5 px-4 text-emerald-400 font-bold">~₹{solarTariff.toFixed(2)} / unit levelised cost</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-medium text-white">Annual Cost Inflation</td>
                                    <td className="py-3.5 px-4 text-zinc-400">5% to 8% annual DISCOM tariff hikes</td>
                                    <td className="py-3.5 px-4 text-emerald-400 font-bold">Zero fuel cost for 25 years</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-medium text-white">Tax Depreciation Benefit</td>
                                    <td className="py-3.5 px-4 text-zinc-400">Standard operational expense</td>
                                    <td className="py-3.5 px-4 text-emerald-400 font-bold">40% Accelerated Depreciation (Year 1)*</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-medium text-white">Capital Payback Period</td>
                                    <td className="py-3.5 px-4 text-zinc-400">No return (perpetual utility bill)</td>
                                    <td className="py-3.5 px-4 text-emerald-400 font-bold">&lt; 3.0 Years corporate payback</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-medium text-white">Genset Synchronization</td>
                                    <td className="py-3.5 px-4 text-zinc-400">Expensive 100% diesel burn during cuts</td>
                                    <td className="py-3.5 px-4 text-emerald-400 font-bold">DG-PV sync saves up to 60%+ diesel</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — "SOLAR SOLUTIONS BY DIVVY SOLAR"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h2
                            style={{ ...FONTS.heading, letterSpacing: '-0.03em' }}
                            className="text-3xl sm:text-5xl font-normal text-white leading-[1.08]"
                        >
                            Solar solutions
                            <br />
                            by Divvy Solar
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-md">
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Divvy offers tailored solar energy solutions for factories and businesses, helping you save energy and make a positive impact.
                        </p>
                        <button
                            type="button"
                            onClick={scrollToSection('epc-form')}
                            className="shrink-0 px-4 py-2 rounded-full border border-white/20 hover:border-white text-xs text-white transition cursor-pointer"
                        >
                            View all services →
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#121417] border border-white/15 text-xs">
                        <button
                            type="button"
                            aria-label="Previous service"
                            onClick={scrollToSection('solutions-grid')}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/10 transition cursor-pointer"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            aria-label="Next service"
                            onClick={scrollToSection('solutions-grid')}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/10 transition cursor-pointer"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div id="solutions-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SOLUTIONS.map((item) => (
                        <div
                            key={item.title}
                            onClick={scrollToSection('epc-form')}
                            className="group relative rounded-[24px] overflow-hidden bg-[#121417] border border-white/10 h-[360px] flex flex-col justify-end p-5 cursor-pointer shadow-lg"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/40 to-transparent" />

                            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shadow">
                                ↗
                            </div>

                            <div className="relative z-10">
                                <h3 style={FONTS.heading} className="text-lg font-medium text-white tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — "BRIGHT CHOICES BEGIN WITH KNOWLEDGE"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                    <div className="lg:col-span-3">
                        <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                            About Us
                        </span>
                    </div>

                    <div className="lg:col-span-9 space-y-4">
                        <h2
                            style={{ ...FONTS.heading, letterSpacing: '-0.03em' }}
                            className="text-3xl sm:text-5xl font-normal leading-[1.1]"
                        >
                            <span className="text-white">Bright Choices Begin with Knowledge </span>
                            <span className="text-zinc-500">Discover the Power of Solar with Divvy</span>
                        </h2>

                        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                            At Divvy we believe that an informed decision is the best decision, that&apos;s why we&apos;ve created a comprehensive engineering feasibility framework to help you understand the true ROI of rooftop solar.
                        </p>

                        <button
                            type="button"
                            onClick={scrollToSection('epc-form')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#07080A] hover:bg-[#38BDF8] text-xs font-semibold transition cursor-pointer"
                        >
                            <span>Get Started</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-3">
                        {KNOWLEDGE_ACCORDION.map((item, idx) => {
                            const isOpen = activeAccordion === idx;
                            return (
                                <button
                                    key={item.num}
                                    type="button"
                                    onClick={() => setActiveAccordion(idx)}
                                    className={`w-full text-left rounded-2xl p-5 border transition-all cursor-pointer ${
                                        isOpen
                                            ? 'bg-[#121417] border-white/20 shadow-xl'
                                            : 'bg-[#0B0C0E] border-white/5 hover:border-white/15'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-zinc-500">{item.num}</span>
                                            <span style={FONTS.heading} className="text-base font-medium text-white">
                                                {item.title}
                                            </span>
                                        </div>

                                        {isOpen ? (
                                            <span className="px-2.5 py-1 rounded-full bg-[#38BDF8] text-[#07080A] text-xs font-bold shrink-0">
                                                ●
                                            </span>
                                        ) : (
                                            <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs text-zinc-400 shrink-0">
                                                ↗
                                            </span>
                                        )}
                                    </div>

                                    {isOpen && (
                                        <div className="mt-3.5 pl-8 text-xs text-zinc-300 leading-relaxed border-t border-white/10 pt-3">
                                            {item.detail}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative rounded-[28px] overflow-hidden border border-white/10 h-72 sm:h-96 shadow-2xl bg-[#121417]">
                            <Image
                                src="/epc3/factory-sunset.jpg"
                                alt="Modern industrial plant with solar power at dusk"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/85 via-transparent to-transparent" />

                            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs">
                                <span className="text-zinc-200 font-medium">8+ Years EPC Track Record</span>
                                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-[#38BDF8] font-semibold">
                                    35+ MWp Installed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — COMMISSIONED INDUSTRIAL PLANTS (#commissioned-plants)
            ═══════════════════════════════════════════════════════════════ */}
            <section id="commissioned-plants" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
                            Commissioned Plants
                        </span>
                        <h2 style={FONTS.heading} className="text-3xl sm:text-4xl font-normal text-white mt-2">
                            Real Factories Powering with Divvy Solar
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                        HT &amp; LT grid-synchronized installations across Haryana, Punjab &amp; Delhi NCR.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            className="rounded-[22px] overflow-hidden bg-[#121417] border border-white/10 hover:border-white/30 transition flex flex-col shadow-lg"
                        >
                            <div className="relative h-48 bg-black shrink-0">
                                <Image
                                    src={p.image}
                                    alt={p.companyName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent" />
                                <span
                                    style={FONTS.heading}
                                    className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white text-[#07080A] text-xs font-bold shadow"
                                >
                                    {p.kWp.toLocaleString()} kWp
                                </span>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <h3 style={FONTS.heading} className="text-sm font-semibold text-white">
                                        {p.companyName}
                                    </h3>
                                    <p className="text-[11px] text-zinc-300 mt-0.5">📍 {p.location}</p>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                <div>
                                    <span className="inline-block text-[10px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2.5 py-0.5 rounded-full mb-3">
                                        {p.roofType}
                                    </span>
                                    <div className="space-y-1.5">
                                        {p.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                                <span className="text-[#38BDF8] font-bold shrink-0">✓</span>
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                                    <span className="text-zinc-500">{p.sector}</span>
                                    <button
                                        type="button"
                                        onClick={scrollToSection('epc-form')}
                                        className="font-semibold text-white hover:text-[#38BDF8] transition cursor-pointer"
                                    >
                                        Get Feasibility →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 6 — "SOLAR SYSTEM SUCCESS STORIES"
            ═══════════════════════════════════════════════════════════════ */}
            <section id="client-reviews" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                        Testimonials
                    </span>
                    <h2 style={FONTS.heading} className="text-3xl sm:text-5xl font-normal text-white mt-2 tracking-tight">
                        Solar system
                        <br />
                        Success stories
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.slice(0, 6).map((p) => (
                        <div
                            key={p.id}
                            className="rounded-[22px] bg-[#121417] border border-white/10 p-6 flex flex-col justify-between gap-5 hover:border-white/25 transition shadow-lg"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-amber-400 text-xs">★★★★★</span>
                                    <span className="text-[10px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2.5 py-0.5 rounded-full">
                                        {p.testimonialHighlight}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed italic">
                                    &ldquo;{p.testimonialQuote}&rdquo;
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                                <div
                                    style={FONTS.heading}
                                    className="w-10 h-10 rounded-full bg-white text-[#07080A] font-bold text-sm flex items-center justify-center shrink-0"
                                >
                                    {p.ownerName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div style={FONTS.heading} className="text-xs font-semibold text-white truncate">
                                        {p.ownerName}
                                    </div>
                                    <div className="text-[11px] text-zinc-400 truncate">
                                        {p.companyName} · {p.kWp.toLocaleString()} kWp
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Funnel-isolated Branded Footer */}
            <Footer isLandingPage={true} landingSlug="industrial-solar-epc3" />

            {/* Mobile Bottom Sticky Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5 bg-[#07080A]/95 backdrop-blur-md border-t border-white/10">
                <a
                    href="tel:+919254986321"
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white text-xs font-bold text-center no-underline"
                >
                    📞 Call Engineering Desk
                </a>
                <button
                    type="button"
                    onClick={scrollToSection('epc-form')}
                    className="flex-[2] py-3 rounded-xl bg-[#38BDF8] text-[#07080A] text-xs font-bold text-center cursor-pointer"
                >
                    Get Feasibility Report →
                </button>
            </div>
        </div>
    );
}
