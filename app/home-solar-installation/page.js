'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import Testimonials from '@/components/home/Testimonials';
import * as fp from '@/lib/fpixel';
import {
    ShieldCheckIcon,
    CheckCircleIcon,
    PhoneIcon,
    SparklesIcon,
    ArrowRightIcon,
    ClockIcon,
    CheckBadgeIcon,
    DocumentCheckIcon,
    ChatBubbleLeftRightIcon,
    SunIcon,
    BoltIcon,
    CurrencyRupeeIcon,
    HomeModernIcon,
    WrenchScrewdriverIcon,
    LockClosedIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// 1. Residential Packages Matrix
const SYSTEM_SIZES = [
    {
        capacity: '2 kW System',
        idealFor: 'Small Homes / 1-2 BHK',
        appliances: 'Fans, Lights, TV, Refrigerator',
        roofArea: '150 - 200 sq. ft.',
        dailyUnits: '8 - 10 Units / day',
        monthlySavings: '₹2,000 - ₹3,000 / mo',
        centralSubsidy: '₹60,000',
        netCost: '₹55,000 - ₹65,000*',
        popular: false
    },
    {
        capacity: '3 kW System',
        idealFor: '3-4 BHK / 1-2 Inverter ACs',
        appliances: '1-2 ACs, Refrigerator, Washing Machine, Geyser',
        roofArea: '250 - 300 sq. ft.',
        dailyUnits: '12 - 15 Units / day',
        monthlySavings: '₹3,500 - ₹5,000 / mo',
        centralSubsidy: '₹78,000',
        netCost: '₹95,000 - ₹1.10L*',
        popular: true,
        tag: 'Highest DBT Subsidy'
    },
    {
        capacity: '5 kW System',
        idealFor: 'Independent Kothi / 2-3 ACs',
        appliances: '2-3 Inverter ACs, Water Pump, Heavy Appliances',
        roofArea: '400 - 500 sq. ft.',
        dailyUnits: '20 - 25 Units / day',
        monthlySavings: '₹6,500 - ₹9,000 / mo',
        centralSubsidy: '₹78,000 (Max Cap)',
        netCost: '₹1.85L - ₹2.10L*',
        popular: false
    },
    {
        capacity: '10 kW System',
        idealFor: 'Luxury Bungalows & Villas',
        appliances: 'Multiple ACs, EV Charger, Heat Pump, Villa Setup',
        roofArea: '800 - 1,000 sq. ft.',
        dailyUnits: '40 - 50 Units / day',
        monthlySavings: '₹15,000 - ₹22,000 / mo',
        centralSubsidy: '₹78,000 (Max Cap)',
        netCost: '₹3.90L - ₹4.30L*',
        popular: false
    }
];

// 2. Real Residential Project Case Studies
const REAL_PROJECTS = [
    {
        title: "5 kW Elevated Terrace Solar Installation",
        location: "Sector 14, Hisar, Haryana",
        capacity: "5 kWp DCR Mono PERC",
        image: "/resi2main.webp",
        billBefore: "₹8,500 / month",
        billAfter: "₹180 / month (Net Zero)",
        subsidy: "₹78,000 Credited via DBT",
        highlight: "6.5 Ft Elevated Heavy Structure (Usable Terrace)"
    },
    {
        title: "3 kW High-Yield Rooftop Solar Plant",
        location: "Phase 7, Mohali, Punjab",
        capacity: "3 kWp Bifacial TOPCon",
        image: "/resi1m.webp",
        billBefore: "₹4,800 / month",
        billAfter: "₹0 - ₹120 / month",
        subsidy: "₹78,000 Credited via DBT",
        highlight: "Zero Roof Penetration & Seamless PSPCL Net-Meter"
    },
    {
        title: "10 kW Luxury Villa Solar EPC",
        location: "DLF Phase 2, Gurgaon, Haryana",
        capacity: "10 kWp Premium Black Panels",
        image: "/har1_main.webp",
        billBefore: "₹24,000 / month",
        billAfter: "₹1,200 / month (95% Cut)",
        subsidy: "₹78,000 Credited via DBT",
        highlight: "Integrated EV Charger & DHBVN Smart Net Meter"
    }
];

// 3. Turnkey EPC Process
const EPC_STEPS = [
    {
        step: "01",
        title: "Free Rooftop Survey & 3D Shadow Profiling",
        desc: "Certified engineer measures azimuth angle, structural strength & simulates shadow-free unit generation with drone/app mapping."
    },
    {
        step: "02",
        title: "Customized Engineering & Tier-1 DCR Dispatch",
        desc: "Custom hot-dip galvanized mounting designed for 150+ km/h wind loads + ALMM Tier-1 mono PERC/TOPCon panels dispatched directly from our warehouse."
    },
    {
        step: "03",
        title: "2-Day Clean Installation & Zero-Leak Mounting",
        desc: "Precision mechanical & electrical installation by in-house technicians with dual copper earthing and Class-II surge protection."
    },
    {
        step: "04",
        title: "DISCOM Net-Metering & Bi-Directional Testing",
        desc: "Complete liaisoning with DHBVN, UHBVN, PSPCL, TPDDL or BSES. Net-meter inspection and test reports processed on your behalf."
    },
    {
        step: "05",
        title: "₹78,000 PM Surya Ghar Subsidy Direct Credit",
        desc: "Direct submission on national portal with PCR generation. Cash subsidy credited straight into your linked bank account."
    }
];

// 4. Brief FAQs
const FAQS = [
    {
        q: "How does the PM Surya Ghar ₹78,000 direct bank subsidy work in 2026?",
        a: "Under PM Surya Ghar Muft Bijli Yojana, households installing 1 kW get ₹30,000, 2 kW get ₹60,000, and 3 kW or higher receive a flat ₹78,000 direct bank transfer (DBT). Divvy Solar is an authorized, DISCOM-empanelled vendor—we handle registration, installation, DISCOM joint inspection, and subsidy documentation end-to-end so your money lands safely in your Aadhaar-linked account."
    },
    {
        q: "Will solar installation damage my roof or cause water leakage during monsoon?",
        a: "Never. We use elevated anchor-fastener mounting with high-grade industrial waterproofing grouting, or ballasted non-penetrating structures where required. Our structures are hot-dip galvanized (80+ microns), rust-proof, and engineered to withstand 150 km/h squalls and heavy rainfall."
    },
    {
        q: "What is net metering and what happens to surplus power on sunny days?",
        a: "With a government-approved bi-directional meter installed on your connection, any daytime solar energy not used by your appliances is automatically sent back to the state electricity grid. You earn credit units for every exported kWh, which offset your night-time and monsoon grid usage. Your bill reduces by 90% to 100%."
    },
    {
        q: "How long does the entire turnkey installation and meter connection take?",
        a: "Our site survey is done within 24 hours. The physical installation is completed in 2 working days. Net-meter inspection by your state DISCOM (DHBVN/UHBVN/PSPCL) typically takes 10 to 18 business days. The ₹78,000 government subsidy is credited directly to your bank in ~30 days of net-meter commissioning."
    },
    {
        q: "What warranties and guarantees does Divvy Solar provide?",
        a: "You get a 25-year manufacturer performance guarantee on Tier-1 DCR solar panels (minimum 84.8% generation output at Year 25), 5 to 10 years comprehensive replacement warranty on smart inverters, 5 years workmanship & structural stability warranty, and lifetime technical support from our North India service centers."
    }
];

export default function HomeSolarInstallationPage() {
    // Interactive Dynamic Slider
    const [monthlyBill, setMonthlyBill] = useState(6000);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        cityState: ''
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
    const [openFaq, setOpenFaq] = useState(0);

    // Dynamic Live Calculations based on monthly bill
    const calc = useMemo(() => {
        // Average unit tariff in North India ~ ₹7.50 / unit
        const monthlyUnits = Math.round(monthlyBill / 7.5);
        // 1 kW generates approx 120 units/month in North India
        const recKw = Math.max(2, Math.min(15, Math.ceil(monthlyUnits / 120)));
        const approxGross = recKw * 62000;
        const subsidy = recKw === 1 ? 30000 : recKw === 2 ? 60000 : 78000;
        const approxNet = approxGross - subsidy;
        const annualSavings = Math.round(monthlyBill * 12 * 0.92);
        const paybackYrs = (approxNet / annualSavings).toFixed(1);
        const savings25Yrs = (annualSavings * 25 - approxNet);
        const roofArea = recKw * 100;

        return {
            recKw,
            monthlyUnits,
            approxGross,
            subsidy,
            approxNet,
            annualSavings,
            paybackYrs,
            savings25Yrs,
            roofArea
        };
    }, [monthlyBill]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setMarketingParams({
                gclid: urlParams.get('gclid') || '',
                utmSource: urlParams.get('utm_source') || 'google',
                utmMedium: urlParams.get('utm_medium') || 'cpc',
                utmCampaign: urlParams.get('utm_campaign') || 'residential_solar_search'
            });
        }
    }, []);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const el = document.getElementById('enquiry-form');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollToTop = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const trackCallClick = () => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ event: 'click_to_call', channel: 'phone', page: '/home-solar-installation' });
        }
    };

    const trackWhatsAppClick = () => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ event: 'click_to_whatsapp', channel: 'whatsapp', page: '/home-solar-installation' });
        }
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
                    whatsapp: cleanPhone,
                    location: formData.cityState,
                    monthlyBill: `₹${monthlyBill.toLocaleString('en-IN')} / mo (${calc.recKw} kW Recommended)`,
                    serviceType: `Residential Solar (${calc.recKw} kWp - ₹${calc.subsidy.toLocaleString('en-IN')} Subsidy)`,
                    companyName: 'Residential Rooftop',
                    landingPage: '/home-solar-installation',
                    gclid: marketingParams.gclid,
                    utmSource: marketingParams.utmSource,
                    utmMedium: marketingParams.utmMedium,
                    utmCampaign: marketingParams.utmCampaign
                })
            });

            if (res.ok) {
                setSubmitted(true);
                fp.event('Lead', {
                    content_name: 'Residential Solar Home Lead',
                    content_category: 'Google Ads Landing Page',
                    currency: 'INR',
                    value: calc.subsidy
                });
                if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'residential_lead_submitted',
                        lead_type: 'residential',
                        recommended_kw: calc.recKw
                    });
                }
            } else {
                const errData = await res.json();
                setErrorMsg(errData.error || 'Something went wrong. Please connect via helpline.');
            }
        } catch (err) {
            console.error('Lead error:', err);
            setErrorMsg('Network error. Please call our solar helpline directly.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative font-sans text-slate-800 bg-[#f8fafc] overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">

            {/* TOP TICKER: Official MNRE & Subsidy Trust Banner */}
            <div className="bg-[#0f172a] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-center sm:text-left">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                        <span className="font-normal text-slate-300">
                            <strong className="text-amber-400 font-semibold">PM Surya Ghar Yojana 2026:</strong> Direct ₹78,000 Govt. DBT Subsidy Credited to Bank + Guaranteed Zero Bill.
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5"><CheckBadgeIcon className="w-3.5 h-3.5 text-emerald-400" /> MNRE &amp; DISCOM Empanelled</span>
                        <span>•</span>
                        <span>Haryana • Punjab • Delhi NCR • Chandigarh</span>
                    </div>
                </div>
            </div>

            {/* STICKY CLEAN NAVBAR */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo: Always scrolls to top on this landing page */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Divvy Solar Home"
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

                    <div className="flex items-center gap-3 sm:gap-6">
                        <a
                            href="tel:+919254986321"
                            onClick={trackCallClick}
                            className="text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5"
                        >
                            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600">
                                <PhoneIcon className="w-4 h-4" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Solar Helpline</span>
                                <span className="font-bold text-slate-900">92549-86321</span>
                            </div>
                        </a>

                        <button
                            type="button"
                            onClick={scrollToForm}
                            className="bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Book Free Survey</span>
                            <ArrowRightIcon className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                HERO SECTION: High-Conversion Clean Split Hero with Form
            ════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-8 sm:pt-12 pb-16 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/70 border-b border-slate-200 overflow-hidden">
                
                {/* Subtle Geometric Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* LEFT COLUMN: Clean, High-Trust Solar Value Proposition */}
                        <div className="lg:col-span-7 space-y-6 pt-2">

                            {/* Trust Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                                    Direct MNRE EPC • PM Surya Ghar 2026
                                </span>
                                <span className="text-amber-300">|</span>
                                <span className="text-xs text-amber-800 font-semibold">₹78,000 Subsidy</span>
                            </div>

                            {/* Main Punchy Headline */}
                            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.18] text-slate-900 tracking-tight">
                                Turn Your Rooftop into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500">Zero Electricity Bill</span> Home.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                                Full-stack residential solar installation with maximum direct government subsidy, ALMM Tier-1 bifacial panels, certified 150+ km/h wind structure &amp; complete DISCOM net-metering.
                            </p>

                            {/* 3 Value Metrics Grid */}
                            <div className="grid grid-cols-3 gap-3 pt-1">
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹78,000</div>
                                    <div className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wide mt-1">Direct DBT Subsidy</div>
                                    <div className="text-[10px] text-slate-500 font-normal">Straight to Bank</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">Up to 95%</div>
                                    <div className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wide mt-1">Bill Reduction</div>
                                    <div className="text-[10px] text-slate-500 font-normal">Net Metering Credit</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">25 Years</div>
                                    <div className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wide mt-1">Generation Warranty</div>
                                    <div className="text-[10px] text-slate-500 font-normal">Tier-1 DCR Modules</div>
                                </div>
                            </div>

                            {/* Verified Homeowner Reviews Pill */}
                            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-3 shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center ring-2 ring-slate-900">★</div>
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-900">1K</div>
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-900">✓</div>
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
                                            <span className="text-xs font-bold text-slate-200">4.9/5 (500+ Reviews)</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">1,000+ Verified Rooftop Installations in North India</p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    Zero Roof Leak Guarantee
                                </span>
                            </div>

                            {/* Trust Bullets */}
                            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium pt-1">
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>24-Hour Physical Site Feasibility</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>End-to-End DISCOM Net-Metering</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Custom Elevated Structures (Full Roof Usable)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Direct EPC — No Commission Agents</span>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Modern White Card Lead Form Above Fold */}
                        <div id="enquiry-form" className="lg:col-span-5 scroll-mt-24">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_-10px_rgba(15,23,42,0.12)] border border-slate-200/90 relative">

                                <div className="mb-5">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full inline-block mb-2">
                                        ⚡ 2026 Subsidy Booking
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                                        Get Your Custom Solar Plan &amp; Subsidy
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                        Lock in your ₹78,000 PM Surya Ghar grant &amp; get a 3D shadow report within 24 hours.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircleIcon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-emerald-950">Feasibility Request Confirmed!</h4>
                                            <p className="text-xs text-emerald-800 leading-relaxed font-normal mt-1">
                                                Our solar engineer will share your exact <strong>{calc.recKw} kW Plant</strong> proposal and ₹{calc.subsidy.toLocaleString('en-IN')} subsidy documents in <strong>15–30 minutes</strong>.
                                            </p>
                                        </div>
                                        <a
                                            href="https://wa.me/919254986321?text=Hi%20Divvy%20Solar,%20I%20have%20submitted%20my%20details%20for%20Home%20Rooftop%20Solar%20Installation."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={trackWhatsAppClick}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition shadow-xs"
                                        >
                                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                            <span>Connect on WhatsApp Now</span>
                                        </a>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-4">

                                        {/* Name */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Ramesh Verma"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                                            />
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                                            <div className="relative flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition">
                                                <div className="flex items-center gap-1.5 px-3 bg-slate-100 text-xs font-bold text-slate-700 border-r border-slate-200 shrink-0">
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
                                                    className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">City / District *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Gurgaon, Hisar, Mohali, Ludhiana"
                                                value={formData.cityState}
                                                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                                            />
                                        </div>

                                        {/* Monthly Bill Select */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-[11px] font-bold text-slate-700">Monthly Electricity Bill</label>
                                                <span className="text-xs font-bold text-amber-600">₹{monthlyBill.toLocaleString('en-IN')}/mo</span>
                                            </div>
                                            <input
                                                type="range"
                                                min={1500}
                                                max={25000}
                                                step={500}
                                                value={monthlyBill}
                                                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                                            />
                                            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                                                <span>₹1,500</span>
                                                <span className="text-emerald-700 font-bold">Recommended: {calc.recKw} kW Plant</span>
                                                <span>₹25,000+</span>
                                            </div>
                                        </div>

                                        {/* Live Estimate Preview Pill */}
                                        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                                            <div>
                                                <span className="text-slate-500 block text-[10px]">Estimated Subsidy Credit</span>
                                                <span className="font-extrabold text-emerald-700 text-sm">₹{calc.subsidy.toLocaleString('en-IN')} DBT</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-slate-500 block text-[10px]">Annual Power Savings</span>
                                                <span className="font-extrabold text-amber-700 text-sm">~₹{calc.annualSavings.toLocaleString('en-IN')}/yr</span>
                                            </div>
                                        </div>

                                        {errorMsg && (
                                            <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">{errorMsg}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <span>Submitting Details...</span>
                                            ) : (
                                                <>
                                                    <span>Claim Free Feasibility &amp; ₹{calc.subsidy.toLocaleString('en-IN')} Subsidy</span>
                                                    <ArrowRightIcon className="w-4 h-4 text-amber-400" />
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><LockClosedIcon className="w-3 h-3 text-emerald-600" /> 100% Privacy</span>
                                            <span>•</span>
                                            <span>No Sales Spam</span>
                                            <span>•</span>
                                            <span>Zero Obligation</span>
                                        </div>

                                    </form>
                                )}

                            </div>

                            {/* Empanelled Badges Box */}
                            <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-2 text-center text-[11px] font-semibold text-slate-600">
                                <div>
                                    <span className="block text-slate-900 font-bold">MNRE</span>
                                    <span className="text-[10px] text-slate-400 font-normal">Govt. of India</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div>
                                    <span className="block text-slate-900 font-bold">PM Surya Ghar</span>
                                    <span className="text-[10px] text-slate-400 font-normal">National Portal</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div>
                                    <span className="block text-slate-900 font-bold">DHBVN / PSPCL</span>
                                    <span className="text-[10px] text-slate-400 font-normal">State DISCOMs</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 2: INTERACTIVE SOLAR SAVINGS CALCULATOR (Clean Visual Cards)
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
                            Transparent Economics
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                            Interactive Home Solar Savings Matrix
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            Calculated with PM Surya Ghar DBT subsidies, typical state electricity tariffs &amp; 25-year panel degradation metrics:
                        </p>
                    </div>

                    {/* Calculator Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
                        <div className="max-w-3xl mx-auto space-y-6">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1: Select Your Average Monthly Bill</span>
                                    <h3 className="text-xl font-bold text-slate-900">How much do you pay for electricity?</h3>
                                </div>
                                <div className="text-left sm:text-right">
                                    <span className="text-3xl font-extrabold text-amber-600">₹{monthlyBill.toLocaleString('en-IN')}</span>
                                    <span className="text-xs text-slate-500 block font-normal">/ month (~{calc.monthlyUnits} units)</span>
                                </div>
                            </div>

                            <input
                                type="range"
                                min={1500}
                                max={25000}
                                step={500}
                                value={monthlyBill}
                                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                className="w-full accent-amber-500 cursor-pointer h-3 bg-slate-200 rounded-lg"
                            />

                            {/* Output Metrics 4-Box */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Recommended Plant</span>
                                    <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{calc.recKw} kW</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">Needs ~{calc.roofArea} sq. ft. roof</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Govt. DBT Subsidy</span>
                                    <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">₹{calc.subsidy.toLocaleString('en-IN')}</span>
                                    <span className="text-[11px] text-emerald-700 mt-0.5 block">Direct bank credit</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Annual Bill Savings</span>
                                    <span className="text-2xl font-extrabold text-amber-600 mt-1 block">₹{calc.annualSavings.toLocaleString('en-IN')}</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">Year 1 savings</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Estimated Payback</span>
                                    <span className="text-2xl font-extrabold text-blue-600 mt-1 block">~{calc.paybackYrs} Yrs</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">20+ Yrs free power</span>
                                </div>
                            </div>

                            {/* Net Investment Strip */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                                <div>
                                    <span className="text-slate-500">Effective Net Turnkey Cost after ₹{calc.subsidy.toLocaleString('en-IN')} Govt. Subsidy:</span>
                                    <span className="font-extrabold text-slate-900 text-sm ml-2">₹{(calc.approxNet / 100000).toFixed(2)} Lakh*</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
                                >
                                    Book This Plant Size →
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Standard System Sizes Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SYSTEM_SIZES.map((system) => (
                            <div
                                key={system.capacity}
                                className={`rounded-3xl p-6 relative flex flex-col justify-between transition duration-200 ${
                                    system.popular
                                        ? 'bg-white border-2 border-amber-400 shadow-lg scale-[1.02]'
                                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                                }`}
                            >
                                {system.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-extrabold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                                        ★ {system.tag}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{system.capacity}</h3>
                                    <p className="text-xs text-amber-700 font-semibold mt-0.5">{system.idealFor}</p>

                                    <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs font-normal">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Govt Subsidy:</span>
                                            <span className="text-emerald-700 font-bold">{system.centralSubsidy}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Roof Area:</span>
                                            <span className="text-slate-800 font-medium">{system.roofArea}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Generation:</span>
                                            <span className="text-slate-800 font-medium">{system.dailyUnits}</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-700 space-y-2 mb-6">
                                        <div>
                                            <span className="text-slate-400 block text-[11px] font-medium">Appliances Covered:</span>
                                            <span className="text-slate-800 font-medium">{system.appliances}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <span className="text-slate-400 block text-[11px] font-medium">Estimated Monthly Savings:</span>
                                            <span className="text-emerald-700 font-bold text-sm">{system.monthlySavings}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className={`w-full py-3 rounded-xl font-bold text-xs text-center transition cursor-pointer ${
                                        system.popular
                                            ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                    }`}
                                >
                                    Enquire For {system.capacity}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 3: REAL VERIFIED ROOFTOP PROJECTS (Actual Photos)
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-100 px-3.5 py-1 rounded-full border border-blue-200">
                            Proven North India Track Record
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                            Real Homes Energized by Divvy Solar
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            Actual on-ground residential rooftop plants executed across Haryana, Punjab &amp; Delhi NCR:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {REAL_PROJECTS.map((proj) => (
                            <div key={proj.title} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition">
                                
                                {/* Image Container with Explicit Fixed Dimensions */}
                                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                                    <Image
                                        src={proj.image}
                                        alt={proj.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-xs">
                                        {proj.capacity}
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <span className="text-[11px] font-semibold text-amber-400 block">{proj.location}</span>
                                        <span className="text-xs font-bold text-white block mt-0.5">{proj.highlight}</span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{proj.title}</h4>
                                    
                                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Bill Before Solar:</span>
                                            <span className="text-rose-600 font-semibold">{proj.billBefore}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Bill After Solar:</span>
                                            <span className="text-emerald-700 font-bold">{proj.billAfter}</span>
                                        </div>
                                        <div className="flex justify-between pt-1 border-t border-slate-200">
                                            <span className="text-slate-500">Govt. Grant:</span>
                                            <span className="text-blue-700 font-bold">{proj.subsidy}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={scrollToForm}
                                        className="w-full text-center text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 py-2.5 rounded-xl transition cursor-pointer"
                                    >
                                        Get Similar Setup For Your Home →
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 4: 5-STEP TURNKEY EPC TIMELINE (Clean Visuals)
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
                            Zero Hassle Execution
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                            Start Saving with EPC in 5 Simple Steps
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            We manage every single engineering, DISCOM approval &amp; government subsidy filing step:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {EPC_STEPS.map((step) => (
                            <div key={step.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-amber-400 font-extrabold text-sm flex items-center justify-center mb-4">
                                        {step.step}
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{step.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 5: CUSTOMER TESTIMONIALS
            ════════════════════════════════════════════════════════════════ */}
            <Testimonials />

            {/* ════════════════════════════════════════════════════════════════
                SECTION 6: DIRECT EPC HERITAGE & DIRECTOR STATEMENT
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        
                        {/* Company Heritage Photo */}
                        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[340px] border border-slate-200 shadow-md">
                            <Image
                                src="/utility_hero_4k.webp"
                                alt="Divvy Solar Solar EPC Installations"
                                fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Turnkey EPC Since 2018</span>
                                <h3 className="text-lg font-bold text-white mt-1">1,000+ Verified Rooftop Installations</h3>
                                <p className="text-xs text-slate-300 mt-1">Offices &amp; engineering hubs across Hisar, Gurgaon, Mohali &amp; Ludhiana</p>
                            </div>
                        </div>

                        {/* Right: Statement & Numbers */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                                    Direct Engineering, No Middlemen
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                                    North India&apos;s Direct Solar EPC Company
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed mt-2 font-normal">
                                    Unlike online lead aggregators who sell your phone number to third-party sub-contractors, Divvy Solar is a full-stack registered EPC company with our own warehousing, in-house structural engineers, and dedicated post-commissioning maintenance teams.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">8+</div>
                                    <div className="text-[11px] font-bold text-slate-700 uppercase mt-0.5">Years EPC Experience</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,000+</div>
                                    <div className="text-[11px] font-bold text-slate-700 uppercase mt-0.5">Plants Energized</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹78,000</div>
                                    <div className="text-[11px] font-bold text-slate-700 uppercase mt-0.5">Max Govt. Subsidy</div>
                                </div>
                            </div>

                            {/* Director Statement */}
                            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4 shadow-xs">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                                    <Image
                                        src="/dinesh_sir_img.jpeg"
                                        alt="Dinesh Aneja - Director of Divvy Solar"
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Dinesh Aneja <span className="font-normal text-xs text-amber-700">• Director &amp; CEO, Divvy Solar</span></h4>
                                    <p className="text-xs text-slate-600 italic mt-1 leading-relaxed">
                                        &ldquo;Solar is a 25-year structural investment on your home. We use only Tier-1 ALMM panels and heavy hot-dip galvanized mounting to guarantee safety, zero roof leaks, and maximum unit generation.&rdquo;
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 7: ACCORDION FAQS
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                            Got Questions?
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition">
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                                >
                                    <span className="text-sm font-bold text-slate-900 leading-snug">{faq.q}</span>
                                    <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-5 text-xs text-slate-600 font-normal leading-relaxed border-t border-slate-200/60 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* MAIN FOOTER */}
            <Footer />

            {/* MOBILE FLOATING CTA DOCK */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex gap-2 shadow-2xl">
                <a
                    href="tel:+919254986321"
                    onClick={trackCallClick}
                    className="flex-1 bg-slate-100 border border-slate-300 text-slate-900 font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
                >
                    <PhoneIcon className="w-4 h-4 text-amber-600" />
                    <span>Call Team</span>
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black py-3 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                    <span>Check Subsidy</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-slate-950" />
                </button>
            </div>

        </div>
    );
}
