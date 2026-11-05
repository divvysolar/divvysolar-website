'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import Testimonials from '@/components/home/Testimonials';
import * as fp from '@/lib/fpixel';
import {
    BuildingOffice2Icon,
    CurrencyRupeeIcon,
    BoltIcon,
    ShieldCheckIcon,
    DocumentCheckIcon,
    ChartBarIcon,
    PhoneIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    BriefcaseIcon,
    WrenchScrewdriverIcon,
    CheckBadgeIcon,
    ScaleIcon,
    LockClosedIcon,
    CheckIcon,
    CpuChipIcon,
    FireIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// 1. Genuine Industrial Mega Projects
const COMPLETED_PROJECTS = [
    {
        title: "2.5 MW Agro-Manufacturing Solar Plant",
        location: "Village Umra, Hansi, Haryana",
        capacity: "2,500 kWp",
        image: "/2.5 MW village umra hansi harayan.webp",
        annualSavings: "₹1.85 Cr / yr",
        sector: "Agro & Heavy Processing",
        structure: "HT Ground Mount + RCC Rooftop",
        generation: "3.75 Million Units / yr",
        tag: "Mega HT EPC"
    },
    {
        title: "900 kW Industrial Rooftop EPC",
        location: "Chaudhariwas, Hisar, Haryana",
        capacity: "900 kWp",
        image: "/900 kw chaudhariwas hisar haryana.webp",
        annualSavings: "₹68.5 Lakh / yr",
        sector: "Processing & Warehousing",
        structure: "Pre-Engineered PEB Standing Seam",
        generation: "1.35 Million Units / yr",
        tag: "Non-Penetrating"
    },
    {
        title: "500 kW Plywood Manufacturing Plant",
        location: "Hmbran, Ludhiana, Punjab",
        capacity: "500 kWp",
        image: "/500 kw  golden plywood hmbran ludhiana.jpeg",
        annualSavings: "₹38.2 Lakh / yr",
        sector: "Timber & Plywood Industry",
        structure: "Industrial Corrugated Metal Sheet",
        generation: "750,000 Units / yr",
        tag: "DG-PV Sync"
    },
    {
        title: "500 kW Surya Polyflex Polymers",
        location: "Hansi Industrial Zone, Haryana",
        capacity: "500 kWp",
        image: "/surya polyflex 500 kw hansi  .jpeg",
        annualSavings: "₹41.0 Lakh / yr",
        sector: "Plastics & Packaging",
        structure: "Trapezoidal Sheet + HDG Walkways",
        generation: "750,000 Units / yr",
        tag: "Zero-Leak"
    }
];

// 2. Commercial ROI & Payback Tiers
const ROI_TIERS = [
    {
        category: "50 kW - 100 kW",
        scope: "Small Factories & Cold Rooms",
        monthlyBill: "₹1L - ₹3L / mo",
        estAnnualSavings: "₹7.5L - ₹15L",
        payback: "3.2 Years",
        taxDeprec: "₹14L - ₹28L (Yr 1)",
        popular: false
    },
    {
        category: "200 kW - 300 kW",
        scope: "Textile, Plastic & Auto Ancillaries",
        monthlyBill: "₹5L - ₹10L / mo",
        estAnnualSavings: "₹30L - ₹45L",
        payback: "3.1 Years",
        taxDeprec: "₹56L - ₹84L (Yr 1)",
        popular: true
    },
    {
        category: "500 kW - 1 MW",
        scope: "Heavy Processing & Warehouses",
        monthlyBill: "₹15L - ₹35L / mo",
        estAnnualSavings: "₹75L - ₹1.5 Cr",
        payback: "2.9 Years",
        taxDeprec: "₹1.4 Cr - ₹2.8 Cr (Yr 1)",
        popular: false
    },
    {
        category: "1 MW - 5 MW+",
        scope: "Mega Industrial Parks & HT Plants",
        monthlyBill: "₹40L+ / mo",
        estAnnualSavings: "₹1.8 Cr - ₹7 Cr+",
        payback: "2.8 Years",
        taxDeprec: "₹3 Cr+ (Yr 1)",
        popular: false
    }
];

// 3. Technical Engineering Standards
const ENGINEERING_STANDARDS = [
    {
        num: "01",
        title: "Non-Penetrating Standing Seam Clamping",
        desc: "Engineered anodized aluminum seam clamps designed for PEB roofs. Zero drill punctures protect your factory roof and raw inventory from any water damage."
    },
    {
        num: "02",
        title: "STAAD-Pro Wind Load Certified HDG Steel",
        desc: "Heavy hot-dip galvanized mounting structures fabricated to withstand extreme 160+ km/h gale winds with 80+ micron zinc protective galvanization."
    },
    {
        num: "03",
        title: "Automated DG-PV Synchronization",
        desc: "Smart microgrid controllers dynamically throttle solar inverter feeds in real time, preventing generator reverse feeding and reducing factory diesel burn by 60%+."
    },
    {
        num: "04",
        title: "100% Turnkey CEIG & DISCOM Approvals",
        desc: "Complete liaisoning for drawing clearances from the Chief Electrical Inspector to Govt (CEIG), relay testing, and HT/LT bi-directional net-meter synchronization."
    }
];

export default function IndustrialSolarLandingPage() {
    const [monthlyPowerSpend, setMonthlyPowerSpend] = useState(8); // In Lakhs

    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        mobileNumber: '',
        cityState: '',
        industryType: '',
        monthlyBill: '₹5L - ₹10L / mo'
    });

    const [marketingParams, setMarketingParams] = useState({
        gclid: '',
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Dynamic Industrial ROI Calculations
    const indCalc = useMemo(() => {
        const monthlyRupees = monthlyPowerSpend * 100000;
        const estimatedKw = Math.round((monthlyRupees / 9.20) / 120 / 10) * 10;
        const recKw = Math.max(50, Math.min(2500, estimatedKw));
        const estAnnualSavingsCr = ((monthlyRupees * 12 * 0.88) / 10000000).toFixed(2);
        const estYr1TaxWriteOffLakh = Math.round(recKw * 38000 * 0.40 / 100000);
        const roofAreaSqFt = recKw * 90;

        return {
            recKw,
            estAnnualSavingsCr,
            estYr1TaxWriteOffLakh,
            roofAreaSqFt
        };
    }, [monthlyPowerSpend]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setMarketingParams({
                gclid: urlParams.get('gclid') || '',
                utmSource: urlParams.get('utm_source') || 'google',
                utmMedium: urlParams.get('utm_medium') || 'cpc',
                utmCampaign: urlParams.get('utm_campaign') || 'industrial_solar_epc'
            });
        }
    }, []);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const formEl = document.getElementById('assessment-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollToTop = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (submitting || submitted) return;

        const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            setErrorMsg('Please enter a valid 10-digit mobile number');
            return;
        }

        setSubmitting(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    companyName: formData.companyName,
                    whatsapp: cleanPhone,
                    location: formData.cityState,
                    industryType: formData.industryType,
                    monthlyBill: `₹${monthlyPowerSpend} Lakh/mo (Est. Capacity: ${indCalc.recKw} kWp)`,
                    serviceType: `Industrial Solar EPC (${indCalc.recKw} kWp - Tax Write-Off: ₹${indCalc.estYr1TaxWriteOffLakh}L)`,
                    landingPage: '/industrial-solar-epc',
                    gclid: marketingParams.gclid,
                    utmSource: marketingParams.utmSource,
                    utmMedium: marketingParams.utmMedium,
                    utmCampaign: marketingParams.utmCampaign
                })
            });

            if (res.ok) {
                setSubmitted(true);
                fp.event('Lead', {
                    content_name: 'Industrial Solar EPC Lead',
                    content_category: 'Google Ads Industrial',
                    currency: 'INR',
                    value: monthlyPowerSpend * 100000
                });
                if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'industrial_lead_submitted',
                        company_name: formData.companyName,
                        capacity_kw: indCalc.recKw
                    });
                }
            } else {
                const errData = await res.json();
                setErrorMsg(errData.error || 'Something went wrong. Please connect with our team via phone.');
            }
        } catch (err) {
            console.error('Lead submission error:', err);
            setErrorMsg('Network error. Please call our corporate desk directly.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative font-sans text-[#2c221e] bg-[#fbf8f5] overflow-x-hidden selection:bg-amber-400 selection:text-[#1c140e]">

            {/* TOP EXECUTIVE TICKER: Warm Ochre & Bronze Theme */}
            <div className="bg-[#1c1511] text-[#e8ded6] text-xs py-2 px-4 border-b border-[#3d2f26]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-center sm:text-left">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
                        <span className="font-normal text-[#d4c5b9] text-[11px] sm:text-xs">
                            <strong className="text-amber-400 font-medium">Commercial Solar EPC:</strong> 40% Accelerated Depreciation Under Section 32 + Reduce Factory Power Tariff to ₹3.50/unit.
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[11px] text-[#a89586] font-normal">
                        <span className="flex items-center gap-1.5"><CheckBadgeIcon className="w-3.5 h-3.5 text-amber-400" /> CEIG Approved &amp; HT Net-Metering Liaison</span>
                        <span>•</span>
                        <span>35+ MWp Installed Across North India</span>
                    </div>
                </div>
            </div>

            {/* STICKY WARM IVORY NAVBAR */}
            <header className="sticky top-0 z-50 bg-[#fbf8f5]/95 backdrop-blur-md border-b border-[#ebdcd0] shadow-[0_2px_12px_rgba(28,21,17,0.03)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Divvy Solar Industrial"
                        className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                    >
                        <div className="relative w-44 sm:w-52 h-12">
                            <Image
                                src="/divvy_photo.png"
                                alt="Divvy Solar"
                                fill
                                priority
                                className="object-contain object-left"
                                sizes="208px"
                            />
                        </div>
                    </button>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="tel:+919254986321"
                            className="text-xs sm:text-sm font-normal text-[#4a3b32] hover:text-amber-700 transition flex items-center gap-2 group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/60 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform shadow-xs">
                                <PhoneIcon className="w-4 h-4 stroke-[1.75]" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <span className="block text-[10px] uppercase tracking-wider text-[#8c7b6f] font-medium">Corporate Engineering Desk</span>
                                <span className="font-semibold text-[#1c1511]">92549-86321</span>
                            </div>
                        </a>

                        <button
                            type="button"
                            onClick={scrollToForm}
                            className="bg-[#1c1511] hover:bg-[#2e231c] text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(28,21,17,0.2)] hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Request Plant Feasibility</span>
                            <ArrowRightIcon className="w-3.5 h-3.5 text-amber-400 stroke-[2]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                HERO SECTION: Industrial Editorial Warm Theme (Distinct From Residential)
            ════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-8 sm:pt-14 pb-16 lg:pb-20 bg-gradient-to-b from-[#fbf8f5] via-[#f5ede4] to-[#ebe0d3] border-b border-[#ebdcd0] overflow-hidden">
                
                {/* Warm Ochre & Amber Radial Ambient Glow */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

                        {/* LEFT COLUMN: Industrial Architecture Proposition */}
                        <div className="lg:col-span-7 space-y-6 pt-2">

                            {/* Warm Industrial Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e3d0c1] shadow-[0_2px_8px_rgba(28,21,17,0.03)]">
                                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                                <span className="text-xs font-medium text-[#3b2d24]">
                                    Industrial Rooftop &amp; Ground Mount EPC
                                </span>
                                <span className="text-[#c7b3a3]">|</span>
                                <span className="text-xs text-amber-800 font-semibold">35+ MWp Commissioned</span>
                            </div>

                            {/* Headline: Editorial Warm High-Impact */}
                            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold leading-[1.18] text-[#1c1511] tracking-tight">
                                Turn Factory Rooftops into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 font-bold">Multi-Crore Profit</span> Center.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-[#524136] leading-relaxed font-normal max-w-xl">
                                Displace high grid power tariffs (₹9–11/unit) down to ₹3.50/unit levelized cost. Zero factory downtime, non-penetrating PEB clamps, and 100% turnkey CEIG &amp; DISCOM net-metering.
                            </p>

                            {/* 3 Value Metrics Grid (Warm Paper Cards) */}
                            <div className="grid grid-cols-3 gap-3.5 pt-1">
                                <div className="p-4 rounded-2xl bg-white border border-[#e8dacd] shadow-[0_8px_20px_-4px_rgba(44,34,30,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-amber-700">40%</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-[#2c221e] uppercase tracking-wide mt-1">Tax Write-Off</div>
                                    <div className="text-[10px] text-[#7a675b] font-normal">Section 32 (Year 1)</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-[#e8dacd] shadow-[0_8px_20px_-4px_rgba(44,34,30,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-emerald-700">&lt; 3.0 Yrs</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-[#2c221e] uppercase tracking-wide mt-1">Corporate Payback</div>
                                    <div className="text-[10px] text-[#7a675b] font-normal">22+ Yrs 100% Free Power</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-[#e8dacd] shadow-[0_8px_20px_-4px_rgba(44,34,30,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-[#1c1511]">₹3.50</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-[#2c221e] uppercase tracking-wide mt-1">Levelized Cost</div>
                                    <div className="text-[10px] text-[#7a675b] font-normal">vs ₹9.50 Grid Tariff</div>
                                </div>
                            </div>

                            {/* Warm Dark Industrial Statement Badge */}
                            <div className="p-4 rounded-2xl bg-[#1c1511] text-white flex items-center justify-between flex-wrap gap-3 shadow-[0_10px_25px_rgba(28,21,17,0.25)] border border-[#3d2f26]">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center ring-2 ring-[#1c1511]">35M</div>
                                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center ring-2 ring-[#1c1511]">★</div>
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-medium text-xs flex items-center justify-center ring-2 ring-[#1c1511]">✓</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex text-amber-400 text-xs">
                                                <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                                                <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                                                <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                                                <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                                                <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                                            </div>
                                            <span className="text-xs font-medium text-[#d4c5b9]">Enterprise Solar EPC</span>
                                        </div>
                                        <p className="text-[11px] text-[#a89586] font-normal">Empanelled for Textiles, Auto Ancillaries, Forging, Plastics &amp; Warehousing</p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                                    Zero Factory Halt
                                </span>
                            </div>

                            {/* Industrial Trust Bullets */}
                            <div className="grid grid-cols-2 gap-3 text-xs text-[#4a3b32] font-normal pt-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>Non-Penetrating Leak-Proof PEB Clamping</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>Smart DG-PV Synchronization (Save 60%+ Diesel)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>STAAD-Pro 160+ km/h Cyclone Resilient Structures</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>100% Turnkey CEIG &amp; HT Net-Metering Liaison</span>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Warm Corporate Lead Assessment Card */}
                        <div id="assessment-form" className="lg:col-span-5 scroll-mt-24">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_-10px_rgba(44,34,30,0.1)] border border-[#e8dacd] relative overflow-hidden">
                                
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700" />

                                <div className="mb-5">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-3 py-0.5 rounded-full inline-block mb-2">
                                        Corporate Feasibility Audit
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1c1511] leading-tight">
                                        Request Free Site Assessment
                                    </h3>
                                    <p className="text-xs text-[#736055] mt-1 leading-relaxed font-normal">
                                        Get an engineering load audit, tariff displacement report &amp; 25-year financial model within 24 hours.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                                        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                            <CheckCircleIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-emerald-950">Technical Request Confirmed!</h4>
                                            <p className="text-xs text-emerald-800 leading-relaxed font-normal mt-1.5">
                                                Your industrial audit request has been assigned to our senior commercial EPC engineering team. We will connect within <strong>30 minutes</strong> with initial metrics.
                                            </p>
                                        </div>
                                        <a
                                            href="tel:+919254986321"
                                            className="inline-flex items-center justify-center gap-2 w-full bg-[#1c1511] hover:bg-[#2e231c] text-white font-medium py-3 px-4 rounded-xl text-xs transition shadow-sm hover:shadow-md"
                                        >
                                            <PhoneIcon className="w-4 h-4 text-amber-400" />
                                            <span>Call Corporate Desk: 92549-86321</span>
                                        </a>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-3.5">

                                        {/* Contact Person Name */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-[#4a3b32] mb-1">Contact Person Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Rajesh Singhal (Director / GM)"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full bg-[#fbf8f5] border border-[#e3d0c1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1c1511] placeholder-[#a69588] focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all font-normal"
                                            />
                                        </div>

                                        {/* Company Name */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-[#4a3b32] mb-1">Company / Facility Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Haryana Metal &amp; Polymers Ltd."
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                className="w-full bg-[#fbf8f5] border border-[#e3d0c1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1c1511] placeholder-[#a69588] focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all font-normal"
                                            />
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-[#4a3b32] mb-1">Mobile / WhatsApp Number *</label>
                                            <div className="relative flex items-center border border-[#e3d0c1] rounded-xl overflow-hidden bg-[#fbf8f5] focus-within:bg-white focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all">
                                                <div className="flex items-center gap-1 px-3 bg-[#f5ede4] text-xs font-semibold text-[#4a3b32] border-r border-[#e3d0c1] shrink-0">
                                                    <span>🇮🇳 +91</span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    maxLength={10}
                                                    pattern="[0-9]{10}"
                                                    placeholder="10-digit mobile number"
                                                    value={formData.mobileNumber}
                                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                                                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-[#1c1511] placeholder-[#a69588] focus:outline-none font-normal"
                                                />
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-[#4a3b32] mb-1">Plant Location / Industrial Area *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Manesar, Panipat, Focal Point Ludhiana"
                                                value={formData.cityState}
                                                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                                                className="w-full bg-[#fbf8f5] border border-[#e3d0c1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1c1511] placeholder-[#a69588] focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all font-normal"
                                            />
                                        </div>

                                        {/* Industry Type */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-[#4a3b32] mb-1">Industry Type</label>
                                            <select
                                                value={formData.industryType}
                                                onChange={(e) => setFormData({ ...formData, industryType: e.target.value })}
                                                className="w-full bg-[#fbf8f5] border border-[#e3d0c1] rounded-xl px-3.5 py-2.5 text-xs text-[#2c221e] focus:outline-none focus:bg-white focus:border-amber-600 font-normal"
                                            >
                                                <option value="">Select Industry Type (Optional)</option>
                                                <option value="Manufacturing / Heavy Industry">Manufacturing / Heavy Industry</option>
                                                <option value="Textile & Garments">Textile &amp; Garments</option>
                                                <option value="Plastics & Packaging">Plastics &amp; Packaging</option>
                                                <option value="Cold Storage & Food Processing">Cold Storage &amp; Food Processing</option>
                                                <option value="Warehouse & Logistics">Warehouse &amp; Logistics</option>
                                                <option value="Commercial Complex / Mall / Hospital">Commercial / Hospital / Institutional</option>
                                            </select>
                                        </div>

                                        {/* Warm Embedded Power Bill Slider in Form */}
                                        <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1.5">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-medium text-[#524136]">Monthly Power Bill</span>
                                                <span className="font-semibold text-amber-800">₹{monthlyPowerSpend} Lakh / mo</span>
                                            </div>
                                            <input
                                                type="range"
                                                min={1}
                                                max={30}
                                                step={1}
                                                value={monthlyPowerSpend}
                                                onChange={(e) => setMonthlyPowerSpend(Number(e.target.value))}
                                                className="w-full accent-amber-600 cursor-pointer h-2 bg-[#ebdcd0] rounded-lg"
                                            />
                                            <div className="flex justify-between items-center text-[10px] text-[#736055]">
                                                <span>Est: <strong className="text-[#1c1511]">{indCalc.recKw} kWp Plant</strong></span>
                                                <span className="text-emerald-800 font-semibold">Yr 1 Tax Write-Off: ₹{indCalc.estYr1TaxWriteOffLakh} Lakh</span>
                                            </div>
                                        </div>

                                        {errorMsg && (
                                            <p className="text-xs font-medium text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">{errorMsg}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#1c1511] hover:bg-[#2e231c] text-white font-medium py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(28,21,17,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <span>Registering Feasibility...</span>
                                            ) : (
                                                <>
                                                    <span>Request Free Industrial Site Assessment</span>
                                                    <ArrowRightIcon className="w-4 h-4 text-amber-400 stroke-[2]" />
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center justify-center gap-3 pt-0.5 text-[10px] text-[#8c7b6f] font-normal">
                                            <span className="flex items-center gap-1"><LockClosedIcon className="w-3 h-3 text-emerald-700" /> Enterprise NDA Protected</span>
                                            <span>•</span>
                                            <span>Zero Production Halt</span>
                                        </div>

                                    </form>
                                )}

                            </div>

                            {/* Credentials Strip */}
                            <div className="mt-4 bg-white rounded-2xl p-3 border border-[#e8dacd] shadow-xs flex items-center justify-between gap-2 text-center text-[11px] font-medium text-[#524136]">
                                <div>
                                    <span className="block text-[#1c1511] font-semibold">Section 32</span>
                                    <span className="text-[10px] text-[#8c7b6f] font-normal">Income Tax Act</span>
                                </div>
                                <span className="text-[#c7b3a3]">•</span>
                                <div>
                                    <span className="block text-[#1c1511] font-semibold">CEIG Approved</span>
                                    <span className="text-[10px] text-[#8c7b6f] font-normal">Govt. Certified</span>
                                </div>
                                <span className="text-[#c7b3a3]">•</span>
                                <div>
                                    <span className="block text-[#1c1511] font-semibold">HT Synchronized</span>
                                    <span className="text-[10px] text-[#8c7b6f] font-normal">State DISCOMs</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 2: WARM INDUSTRIAL PAYBACK & TAX WRITE-OFF MATRIX
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-[#ebdcd0] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                            Corporate Yield &amp; Cash Flow
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-[#1c1511] mt-3 tracking-tight">
                            Industrial Solar EPC Payback &amp; Tax Depreciation Matrix
                        </h2>
                        <p className="text-sm text-[#736055] mt-2 font-normal">
                            Estimated returns calculated against standard industrial HT tariffs and Section 32 Income Tax benefits:
                        </p>
                    </div>

                    {/* Interactive Industrial Calculator */}
                    <div className="bg-[#fbf8f5] border border-[#e8dacd] rounded-3xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(28,21,17,0.03)] mb-14">
                        <div className="max-w-3xl mx-auto space-y-7">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-[#7a675b]">Step 1: Adjust Your Monthly Industrial Power Bill</span>
                                    <h3 className="text-xl font-medium text-[#1c1511]">What does your facility spend on grid electricity?</h3>
                                </div>
                                <div className="text-left sm:text-right">
                                    <span className="text-3xl sm:text-4xl font-semibold text-amber-800">₹{monthlyPowerSpend} Lakh</span>
                                    <span className="text-xs text-[#7a675b] block font-normal">/ month (~{(monthlyPowerSpend * 100000 / 9.2).toFixed(0)} units)</span>
                                </div>
                            </div>

                            <input
                                type="range"
                                min={1}
                                max={30}
                                step={1}
                                value={monthlyPowerSpend}
                                onChange={(e) => setMonthlyPowerSpend(Number(e.target.value))}
                                className="w-full accent-amber-600 cursor-pointer h-2 bg-[#ebdcd0] rounded-lg"
                            />

                            {/* Stat Output Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                <div className="p-4 bg-white rounded-2xl border border-[#e8dacd] shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#7a675b] block">Optimal Plant Size</span>
                                    <span className="text-2xl font-semibold text-[#1c1511] mt-1 block">{indCalc.recKw} kWp</span>
                                    <span className="text-[11px] text-[#7a675b] mt-0.5 block">Needs ~{indCalc.roofAreaSqFt} sq. ft.</span>
                                </div>

                                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-amber-900 block">Yr 1 Tax Write-Off</span>
                                    <span className="text-2xl font-semibold text-amber-800 mt-1 block">₹{indCalc.estYr1TaxWriteOffLakh}L</span>
                                    <span className="text-[11px] text-amber-800 mt-0.5 block">40% Sec 32 IT Act</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-[#e8dacd] shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#7a675b] block">Est. Annual Savings</span>
                                    <span className="text-2xl font-semibold text-emerald-700 mt-1 block">₹{indCalc.estAnnualSavingsCr} Cr</span>
                                    <span className="text-[11px] text-[#7a675b] mt-0.5 block">Every operational year</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-[#e8dacd] shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#7a675b] block">Corporate Payback</span>
                                    <span className="text-2xl font-semibold text-amber-700 mt-1 block">&lt; 3.0 Yrs</span>
                                    <span className="text-[11px] text-[#7a675b] mt-0.5 block">Post-payback power is free</span>
                                </div>
                            </div>

                            {/* Action Strip */}
                            <div className="p-4 rounded-2xl bg-[#1c1511] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-sm">
                                <div>
                                    <span className="text-[#d4c5b9]">Target Levelized Cost of Solar Generation:</span>
                                    <span className="font-semibold text-amber-400 text-base sm:text-lg ml-2">₹3.20 - ₹3.60 / unit</span>
                                    <span className="text-[#a89586] block text-[11px] mt-0.5">(Displacing state grid tariffs of ₹9.00 - ₹11.50 / unit)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="bg-amber-400 hover:bg-amber-300 text-[#1c1511] font-medium px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                                >
                                    Get Engineering Feasibility →
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Standard Industrial Tiers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ROI_TIERS.map((tier) => (
                            <div
                                key={tier.category}
                                className={`rounded-3xl p-6 relative flex flex-col justify-between transition-all duration-300 ${
                                    tier.popular
                                        ? 'bg-white border-2 border-amber-600 shadow-[0_12px_30px_-5px_rgba(217,119,6,0.18)] scale-[1.02]'
                                        : 'bg-white border border-[#e8dacd] hover:border-amber-300 shadow-xs hover:-translate-y-0.5'
                                }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                                        ★ Most In-Demand Capacity
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-medium text-[#1c1511]">{tier.category}</h3>
                                    <p className="text-xs text-amber-800 font-medium mt-0.5">{tier.scope}</p>

                                    <div className="my-5 p-4 rounded-2xl bg-[#fbf8f5] border border-[#e8dacd] space-y-2 text-xs font-normal">
                                        <div className="flex justify-between">
                                            <span className="text-[#7a675b]">Power Bill:</span>
                                            <span className="text-[#2c221e] font-medium">{tier.monthlyBill}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#7a675b]">Est. Annual Savings:</span>
                                            <span className="text-emerald-700 font-semibold">{tier.estAnnualSavings}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#7a675b]">Payback Period:</span>
                                            <span className="text-[#2c221e] font-medium">{tier.payback}</span>
                                        </div>
                                        <div className="flex justify-between pt-1 border-t border-[#ebdcd0]">
                                            <span className="text-[#7a675b]">Yr 1 Tax Write-Off:</span>
                                            <span className="text-amber-800 font-semibold">{tier.taxDeprec}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className={`w-full py-3 rounded-xl font-medium text-xs text-center transition-all cursor-pointer ${
                                        tier.popular
                                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                                            : 'bg-[#f5ede4] hover:bg-[#ebdcd0] text-[#2c221e]'
                                    }`}
                                >
                                    Enquire For {tier.category}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 3: REAL VERIFIED MEGA INDUSTRIAL PROJECTS
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#f5ede4] border-b border-[#ebdcd0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#e3d0c1]">
                            Proven MW-Scale Engineering
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-[#1c1511] mt-3 tracking-tight">
                            Verified Completed Industrial Solar Plants
                        </h2>
                        <p className="text-sm text-[#736055] mt-2 font-normal">
                            Actual on-ground commercial rooftop &amp; ground-mount installations engineered across North India:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {COMPLETED_PROJECTS.map((proj) => (
                            <div key={proj.title} className="bg-white rounded-3xl overflow-hidden border border-[#e8dacd] shadow-xs hover:shadow-md transition-all duration-300">
                                
                                <div className="relative h-64 w-full overflow-hidden bg-[#e8dacd]">
                                    <Image
                                        src={proj.image}
                                        alt={proj.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#1c1511] shadow-xs">
                                        {proj.sector}
                                    </div>
                                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                                        {proj.capacity}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-base sm:text-lg font-medium leading-snug">{proj.title}</h3>
                                        <p className="text-xs text-[#d4c5b9] mt-0.5">{proj.location}</p>
                                    </div>
                                </div>

                                <div className="p-5 grid grid-cols-2 gap-3 text-xs border-t border-[#f5ede4] font-normal">
                                    <div className="p-3 bg-[#fbf8f5] rounded-xl border border-[#ebdcd0]">
                                        <span className="block text-[10px] text-[#7a675b] uppercase font-medium">Estimated Tariff Savings</span>
                                        <span className="font-semibold text-emerald-800 text-sm mt-0.5 block">{proj.annualSavings}</span>
                                    </div>
                                    <div className="p-3 bg-[#fbf8f5] rounded-xl border border-[#ebdcd0]">
                                        <span className="block text-[10px] text-[#7a675b] uppercase font-medium">Mounting Engineering</span>
                                        <span className="font-medium text-[#2c221e] text-xs mt-0.5 block truncate">{proj.structure}</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 4: INDUSTRIAL ENGINEERING RIGOR & ZERO DOWNTIME
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-[#ebdcd0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        <div className="lg:col-span-7 space-y-6">
                            <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                                Engineering Benchmarks
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-normal text-[#1c1511] tracking-tight">
                                Built for Harsh Industrial Environments &amp; Zero Downtime
                            </h2>
                            <p className="text-[#524136] text-sm sm:text-base leading-relaxed font-normal">
                                Industrial rooftops endure chemical fumes, thermal expansion cycles, and high mechanical vibrations. We design heavy-duty EPC plants that protect both your building and your power yields.
                            </p>

                            <div className="space-y-3.5 pt-2">
                                {ENGINEERING_STANDARDS.map((std, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-[#fbf8f5] border border-[#ebdcd0] shadow-xs flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#1c1511] text-amber-400 font-semibold text-sm flex items-center justify-center shrink-0">
                                            {std.num}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-[#1c1511]">{std.title}</h3>
                                            <p className="text-xs text-[#736055] leading-relaxed mt-1 font-normal">{std.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Technical Blueprint Graphic */}
                        <div className="lg:col-span-5">
                            <div className="bg-[#fbf8f5] rounded-3xl p-6 sm:p-8 border border-[#e8dacd] shadow-sm space-y-6">
                                <div className="relative h-60 rounded-2xl overflow-hidden border border-[#ebdcd0]">
                                    <Image
                                        src="/industrial_4k.webp"
                                        alt="Industrial Solar Technical Execution"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                                        <span className="text-white font-medium text-base">Corporate Solar Engineering</span>
                                        <span className="text-amber-400 text-xs font-normal">Direct CEIG &amp; HT Transformer Tie-In</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs text-[#4a3b32] font-normal">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</div>
                                        <span>STAAD-Pro load certified structures with 10-year warranty</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</div>
                                        <span>Bi-directional net/gross meter liaison with DHBVN / PSPCL</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</div>
                                        <span>25-year manufacturer power warranty on Tier-1 TOPCon modules</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full bg-[#1c1511] hover:bg-[#2e231c] text-white font-medium py-3 px-5 rounded-xl text-xs sm:text-sm shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Schedule Factory Feasibility Visit</span>
                                    <ArrowRightIcon className="w-4 h-4 text-amber-400" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 5: Customer Reviews */}
            <Testimonials />

            {/* MAIN WEBSITE FOOTER */}
            <Footer />

            {/* MOBILE FLOATING CTA BAR */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#fbf8f5]/95 backdrop-blur-md border-t border-[#ebdcd0] md:hidden flex gap-2 shadow-lg">
                <a
                    href="tel:+919254986321"
                    className="flex-1 bg-white border border-[#ebdcd0] text-[#1c1511] font-medium py-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
                >
                    <PhoneIcon className="w-4 h-4 text-amber-700" />
                    <span>Call Desk</span>
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-1 bg-[#1c1511] text-white font-medium py-3 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                    <span>Request Audit</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-amber-400" />
                </button>
            </div>
        </div>
    );
}
