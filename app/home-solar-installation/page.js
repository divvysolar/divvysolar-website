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
    ArrowRightIcon,
    CheckBadgeIcon,
    ChatBubbleLeftRightIcon,
    LockClosedIcon,
    ChevronDownIcon,
    CheckIcon,
    WrenchScrewdriverIcon,
    DocumentCheckIcon,
    SunIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// 1. Genuine PM Surya Ghar 2026 System Sizing & Economics
const SYSTEM_SIZES = [
    {
        capacity: '2 kW System',
        idealFor: '1-2 BHK Homes',
        appliances: 'Fans, LED Lights, TV, Refrigerator, Basic Loads',
        roofArea: '150 - 200 sq. ft.',
        dailyUnits: '8 - 10 Units / day',
        monthlySavings: '₹2,200 - ₹3,000 / mo',
        centralSubsidy: '₹60,000',
        badge: 'Compact Home',
        popular: false
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
        popular: true
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
        popular: false
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
        popular: false
    }
];

// 2. Genuine North India Completed Projects
const REAL_PROJECTS = [
    {
        title: "5 kW Elevated Terrace Solar Installation",
        location: "Sector 14, Hisar, Haryana",
        capacity: "5 kWp DCR Mono PERC",
        image: "/resi2main.webp",
        billBefore: "₹8,500 / mo",
        billAfter: "₹180 / mo (Net Zero)",
        subsidy: "₹78,000 Credited via DBT",
        structure: "6.5 Ft Elevated Galvanized Frame (Full Roof Usable)"
    },
    {
        title: "3 kW High-Yield Bifacial Solar Plant",
        location: "Phase 7, Mohali, Punjab",
        capacity: "3 kWp Bifacial TOPCon",
        image: "/resi1m.webp",
        billBefore: "₹4,800 / mo",
        billAfter: "₹0 - ₹120 / mo",
        subsidy: "₹78,000 Credited via DBT",
        structure: "Non-Penetrating Mounting & PSPCL Net Meter Approved"
    },
    {
        title: "10 kW Luxury Villa Solar Installation",
        location: "DLF Phase 2, Gurgaon, Haryana",
        capacity: "10 kWp Premium Setup",
        image: "/har1_main.webp",
        billBefore: "₹24,000 / mo",
        billAfter: "₹1,200 / mo (95% Cut)",
        subsidy: "₹78,000 Credited via DBT",
        structure: "Integrated EV Charging Line & DHBVN Smart Net Meter"
    }
];

// 3. Technical Specifications Comparison (Engineering Standard)
const TECHNICAL_SPECS = [
    {
        parameter: "Solar PV Modules",
        divvySpec: "Tier-1 ALMM & DCR Certified Mono PERC / TOPCon",
        marketSpec: "Non-DCR / Lower efficiency unlisted panels",
        benefit: "Guarantees 25-year performance & official DBT subsidy approval"
    },
    {
        parameter: "Mounting Structure",
        divvySpec: "Hot-Dip Galvanized Iron (80+ Micron Coating)",
        marketSpec: "Pre-galvanized / Painted MS Structure",
        benefit: "Zero rust in heavy rain & tested for 150+ km/h cyclone squalls"
    },
    {
        parameter: "Grid-Tied Inverter",
        divvySpec: "Smart MPPT Inverters (Havells / Invergy / Solis)",
        marketSpec: "Local or unbranded inverters with low conversion",
        benefit: "98.4%+ peak efficiency with live phone WiFi monitoring"
    },
    {
        parameter: "Safety & Earthing",
        divvySpec: "Dual Copper-Bonded Chemical Earthing + Class-II SPD",
        marketSpec: "Single GI pipe earthing without surge protection",
        benefit: "Protects costly home appliances against lighting & line surges"
    },
    {
        parameter: "DISCOM Liaisoning",
        divvySpec: "100% In-House Engineer Team (DHBVN, PSPCL, BSES)",
        marketSpec: "Homeowner left to handle meter testing alone",
        benefit: "Hassle-free bi-directional meter activation within 2-3 weeks"
    }
];

// 4. EPC Execution Workflow
const EPC_STEPS = [
    {
        step: "01",
        title: "Free Rooftop Audit & 3D Shadow Profiling",
        desc: "Our engineer visits your roof to check sanction load, azimuth orientation, structural strength, and calculate shadow-free generation."
    },
    {
        step: "02",
        title: "Factory-Direct Tier-1 Components",
        desc: "Government-approved ALMM DCR panels and hot-dip galvanized mounting frames dispatched directly from our regional warehouses."
    },
    {
        step: "03",
        title: "48-Hour Precision Installation",
        desc: "Mechanical mounting with zero-leak anchor grouting, dual chemical earthing, and safety AC/DC combiner boxes installed by trained technicians."
    },
    {
        step: "04",
        title: "DISCOM Net-Meter & ₹78K DBT Credit",
        desc: "We coordinate DISCOM joint inspection, net-meter installation, and upload all commissioning reports to the national portal for direct subsidy transfer."
    }
];

// 5. Authentic FAQs
const FAQS = [
    {
        q: "How does the PM Surya Ghar ₹78,000 direct bank transfer (DBT) work in 2026?",
        a: "Under the PM Surya Ghar Muft Bijli Yojana, eligible residential consumers installing 1 kW receive ₹30,000, 2 kW receive ₹60,000, and 3 kW or higher receive the maximum ₹78,000 subsidy. As an authorized empanelled solar EPC company, Divvy Solar handles the entire application, DISCOM joint testing, and portal uploads. The subsidy is deposited directly into your Aadhaar-linked bank account within 30 days of net-meter commissioning."
    },
    {
        q: "Will the solar installation damage my roof or cause water leakage during rain?",
        a: "Zero water leakage is 100% guaranteed. We utilize chemical anchor fasteners with industrial silicone waterproofing grouting. For tiled or newly waterproofed terraces, we also provide non-penetrating ballasted structures or elevated 6.5–8 ft pergolas that keep the entire terrace usable for walking and leisure."
    },
    {
        q: "How does net-metering reduce my monthly electricity bill to near zero?",
        a: "A state DISCOM bi-directional net-meter tracks every unit of solar power exported to the grid during sunny hours and units imported at night. Your monthly bill is generated only for the net difference. In most months, home generation exceeds consumption, reducing your electricity bill by 90% to 95%."
    },
    {
        q: "How long does the entire survey, installation, and meter process take?",
        a: "The physical site assessment is conducted within 24 hours of booking. Material delivery and physical installation take just 2 days. DISCOM inspection, meter changeover, and bi-directional testing usually take 10 to 18 working days depending on your local subdivision schedule."
    },
    {
        q: "What warranties and post-installation support are provided?",
        a: "Every Divvy Solar home plant comes with a 25-year manufacturer performance warranty on Tier-1 panels, 5 to 10 years warranty on smart grid-tied inverters, 5 years comprehensive structural stability warranty, and lifetime technical support from our regional engineering hubs in Hisar, Gurgaon, Mohali, and Ludhiana."
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
        const monthlyUnits = Math.round(monthlyBill / 7.5);
        const recKw = Math.max(2, Math.min(15, Math.ceil(monthlyUnits / 120)));
        const approxGross = recKw * 62000;
        const subsidy = recKw === 1 ? 30000 : recKw === 2 ? 60000 : 78000;
        const approxNet = Math.max(approxGross - subsidy, 0);
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
                    monthlyBill: `₹${monthlyBill.toLocaleString('en-IN')} / mo (${calc.recKw} kW Plant Recommended)`,
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

            {/* TOP TICKER */}
            <div className="bg-[#0b1329] text-slate-300 text-xs py-2 px-4 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-center sm:text-left">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                        <span className="font-normal text-slate-300 text-[11px] sm:text-xs">
                            <strong className="text-amber-400 font-medium">PM Surya Ghar Yojana 2026:</strong> Get direct ₹78,000 government subsidy credited to your bank account.
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 font-normal">
                        <span className="flex items-center gap-1.5"><CheckBadgeIcon className="w-3.5 h-3.5 text-emerald-400" /> MNRE &amp; DISCOM Registered EPC</span>
                        <span>•</span>
                        <span>Haryana • Punjab • Delhi NCR • Chandigarh</span>
                    </div>
                </div>
            </div>

            {/* STICKY CLEAN NAVBAR */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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
                            className="text-xs sm:text-sm font-normal text-slate-700 hover:text-amber-600 transition flex items-center gap-2 group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform shadow-xs">
                                <PhoneIcon className="w-4 h-4 stroke-[1.75]" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">Free Expert Desk</span>
                                <span className="font-semibold text-slate-900">92549-86321</span>
                            </div>
                        </a>

                        <button
                            type="button"
                            onClick={scrollToForm}
                            className="bg-[#0b1329] hover:bg-slate-900 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(11,19,41,0.18)] hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Book Free Survey</span>
                            <ArrowRightIcon className="w-3.5 h-3.5 text-amber-400 stroke-[2]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                HERO SECTION: Refined Typography & 3D Depth
            ════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-8 sm:pt-14 pb-16 lg:pb-20 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/80 border-b border-slate-200/80 overflow-hidden">
                
                {/* 3D Depth Ambient Lights */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

                        {/* LEFT COLUMN: Clean Refined Typography */}
                        <div className="lg:col-span-7 space-y-6 pt-2">

                            {/* Trust Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-medium text-slate-800">
                                    PM Surya Ghar Muft Bijli Yojana
                                </span>
                                <span className="text-slate-300">|</span>
                                <span className="text-xs text-amber-600 font-semibold">₹78,000 Direct DBT Grant</span>
                            </div>

                            {/* Main Refined Headline (Clean Medium Weight) */}
                            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold leading-[1.18] text-slate-900 tracking-tight">
                                Cut Your Electricity Bill by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 font-bold">95%</span> with Turnkey Home Solar.
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                                Complete turnkey engineering for independent homes and villas. We handle site profiling, ALMM Tier-1 bifacial panels, certified elevated mounting &amp; DISCOM net-metering end-to-end.
                            </p>

                            {/* 3D Metric Highlight Cards (Refined Weights) */}
                            <div className="grid grid-cols-3 gap-3.5 pt-1">
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-emerald-600">₹78,000</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-slate-800 uppercase tracking-wide mt-1">Direct Subsidy</div>
                                    <div className="text-[10px] text-slate-500 font-normal">To Your Bank A/C</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-amber-600">&lt; 3.2 Yrs</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-slate-800 uppercase tracking-wide mt-1">Typical Payback</div>
                                    <div className="text-[10px] text-slate-500 font-normal">20+ Yrs Free Power</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl font-semibold text-slate-900">25 Years</div>
                                    <div className="text-[11px] sm:text-xs font-medium text-slate-800 uppercase tracking-wide mt-1">Output Warranty</div>
                                    <div className="text-[10px] text-slate-500 font-normal">Tier-1 ALMM Modules</div>
                                </div>
                            </div>

                            {/* 3D Dark Social Proof Badge */}
                            <div className="p-4 rounded-2xl bg-[#0b1329] text-white flex items-center justify-between flex-wrap gap-3 shadow-[0_10px_25px_rgba(11,19,41,0.2)] border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center ring-2 ring-[#0b1329]">★</div>
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-medium text-xs flex items-center justify-center ring-2 ring-[#0b1329]">1K+</div>
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-medium text-xs flex items-center justify-center ring-2 ring-[#0b1329]">✓</div>
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
                                            <span className="text-xs font-medium text-slate-200">4.9/5 Rating (Google Reviews)</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-normal">1,000+ Completed Installations Across Haryana, Punjab &amp; Delhi NCR</p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                                    Zero Roof Leak Guarantee
                                </span>
                            </div>

                            {/* Trust Feature List */}
                            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-normal pt-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>24-Hour Free Rooftop Feasibility</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>100% DISCOM Net-Metering Handled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>Elevated Structures (Roof Stays Usable)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                                    </div>
                                    <span>Direct EPC Team (No Third-Party Brokers)</span>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: 3D Lead Form Card */}
                        <div id="enquiry-form" className="lg:col-span-5 scroll-mt-24">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_-10px_rgba(11,19,41,0.1)] border border-slate-200 relative overflow-hidden">
                                
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400" />

                                <div className="mb-5">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full inline-block mb-2">
                                        PM Surya Ghar 2026 Booking
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
                                        Request Free Site Assessment
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                                        Lock in your ₹78,000 subsidy &amp; receive an exact 3D shadow blueprint within 24 hours.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                            <CheckCircleIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-emerald-950">Feasibility Reserved!</h4>
                                            <p className="text-xs text-emerald-800 leading-relaxed font-normal mt-1.5">
                                                Our solar engineer will send your <strong>{calc.recKw} kW Plant</strong> proposal and verified ₹{calc.subsidy.toLocaleString('en-IN')} subsidy documents in <strong>15–30 minutes</strong>.
                                            </p>
                                        </div>
                                        <a
                                            href="https://wa.me/919254986321?text=Hi%20Divvy%20Solar,%20I%20have%20submitted%20my%20details%20for%20Home%20Rooftop%20Solar%20Installation."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={trackWhatsAppClick}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl text-xs transition shadow-sm hover:shadow-md"
                                        >
                                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                            <span>Connect on WhatsApp Now</span>
                                        </a>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-4">

                                        {/* Name */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-slate-700 mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Ramesh Verma"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-normal"
                                            />
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                                            <div className="relative flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all">
                                                <div className="flex items-center gap-1 px-3 bg-slate-100 text-xs font-semibold text-slate-700 border-r border-slate-200 shrink-0">
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
                                                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-normal"
                                                />
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className="block text-[11px] font-medium text-slate-700 mb-1">City / District *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Gurgaon, Hisar, Mohali, Ludhiana"
                                                value={formData.cityState}
                                                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-normal"
                                            />
                                        </div>

                                        {/* Slider in Form */}
                                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-medium text-slate-600">Monthly Power Bill</span>
                                                <span className="font-semibold text-amber-600">₹{monthlyBill.toLocaleString('en-IN')}/mo</span>
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
                                            <div className="flex justify-between items-center text-[11px] pt-0.5">
                                                <span className="text-slate-500 font-normal">Rec: <strong className="text-slate-900 font-semibold">{calc.recKw} kW Plant</strong></span>
                                                <span className="text-emerald-700 font-semibold">Subsidy: ₹{calc.subsidy.toLocaleString('en-IN')} DBT</span>
                                            </div>
                                        </div>

                                        {errorMsg && (
                                            <p className="text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">{errorMsg}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#0b1329] hover:bg-slate-900 text-white font-medium py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(11,19,41,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <span>Submitting Details...</span>
                                            ) : (
                                                <>
                                                    <span>Claim Free Survey &amp; ₹{calc.subsidy.toLocaleString('en-IN')} Subsidy</span>
                                                    <ArrowRightIcon className="w-4 h-4 text-amber-400 stroke-[2]" />
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center justify-center gap-3 pt-0.5 text-[11px] text-slate-400 font-normal">
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
                            <div className="mt-4 bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 text-center text-[11px] font-medium text-slate-600">
                                <div>
                                    <span className="block text-slate-900 font-semibold">MNRE</span>
                                    <span className="text-[10px] text-slate-400 font-normal">Govt. of India</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div>
                                    <span className="block text-slate-900 font-semibold">PM Surya Ghar</span>
                                    <span className="text-[10px] text-slate-400 font-normal">National Portal</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div>
                                    <span className="block text-slate-900 font-semibold">DHBVN / PSPCL</span>
                                    <span className="text-[10px] text-slate-400 font-normal">State DISCOMs</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 2: INTERACTIVE LIVE CALCULATOR & MATRIX
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-slate-200 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                            Transparent Payback Matrix
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                            Live Home Solar Savings Calculator
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            Calculate your exact plant capacity, direct government cash subsidy &amp; 25-year wealth generation:
                        </p>
                    </div>

                    {/* Interactive Calculator Card */}
                    <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] mb-14">
                        <div className="max-w-3xl mx-auto space-y-7">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Step 1: Adjust Your Monthly Electricity Bill</span>
                                    <h3 className="text-xl font-medium text-slate-900">What is your typical monthly bill?</h3>
                                </div>
                                <div className="text-left sm:text-right">
                                    <span className="text-3xl sm:text-4xl font-semibold text-amber-600">₹{monthlyBill.toLocaleString('en-IN')}</span>
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
                                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                            />

                            {/* Stat Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 block">Recommended Plant</span>
                                    <span className="text-2xl font-semibold text-slate-900 mt-1 block">{calc.recKw} kW</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">Needs ~{calc.roofArea} sq. ft.</span>
                                </div>

                                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-800 block">Govt. DBT Subsidy</span>
                                    <span className="text-2xl font-semibold text-emerald-600 mt-1 block">₹{calc.subsidy.toLocaleString('en-IN')}</span>
                                    <span className="text-[11px] text-emerald-700 mt-0.5 block">Direct bank credit</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 block">Year 1 Savings</span>
                                    <span className="text-2xl font-semibold text-amber-600 mt-1 block">₹{calc.annualSavings.toLocaleString('en-IN')}</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">Zero electricity bill</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 block">Payback Period</span>
                                    <span className="text-2xl font-semibold text-blue-600 mt-1 block">~{calc.paybackYrs} Yrs</span>
                                    <span className="text-[11px] text-slate-500 mt-0.5 block">20+ Yrs 100% free power</span>
                                </div>
                            </div>

                            {/* Net Investment Strip */}
                            <div className="p-4 rounded-2xl bg-[#0b1329] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-sm">
                                <div>
                                    <span className="text-slate-300">Turnkey Net Cost after ₹{calc.subsidy.toLocaleString('en-IN')} Govt. Subsidy:</span>
                                    <span className="font-semibold text-amber-400 text-base sm:text-lg ml-2">₹{(calc.approxNet / 100000).toFixed(2)} Lakh*</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-medium px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
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
                                className={`rounded-3xl p-6 relative flex flex-col justify-between transition-all duration-300 ${
                                    system.popular
                                        ? 'bg-white border-2 border-amber-400 shadow-[0_12px_30px_-5px_rgba(245,158,11,0.15)] scale-[1.02]'
                                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:-translate-y-0.5'
                                }`}
                            >
                                {system.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                                        {system.badge}
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-medium text-slate-900">{system.capacity}</h3>
                                        {!system.popular && (
                                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{system.badge}</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-amber-700 font-medium">{system.idealFor}</p>

                                    <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs font-normal">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Govt. Grant:</span>
                                            <span className="text-emerald-700 font-semibold">{system.centralSubsidy}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Roof Area:</span>
                                            <span className="text-slate-800">{system.roofArea}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Generation:</span>
                                            <span className="text-slate-800">{system.dailyUnits}</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-700 space-y-2 mb-6 font-normal">
                                        <div>
                                            <span className="text-slate-400 block text-[11px] font-medium">Appliances Covered:</span>
                                            <span className="text-slate-800 font-normal">{system.appliances}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <span className="text-slate-400 block text-[11px] font-medium">Estimated Monthly Savings:</span>
                                            <span className="text-emerald-700 font-semibold text-sm">{system.monthlySavings}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className={`w-full py-3 rounded-xl font-medium text-xs text-center transition-all cursor-pointer ${
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
                SECTION 3: REAL VERIFIED ROOFTOP CASE STUDIES
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                            Proven North India Track Record
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                            Real Homes Energized by Divvy Solar
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            Actual on-ground residential rooftop plants executed across Haryana, Punjab &amp; Delhi NCR:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {REAL_PROJECTS.map((proj) => (
                            <div key={proj.title} className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300">
                                
                                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                                    <Image
                                        src={proj.image}
                                        alt={proj.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 shadow-xs">
                                        {proj.capacity}
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <span className="text-[11px] font-medium text-amber-400 block">{proj.location}</span>
                                        <span className="text-xs font-normal text-white block mt-0.5">{proj.structure}</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <h4 className="text-base font-medium text-slate-900 leading-snug">{proj.title}</h4>
                                    
                                    <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2 text-xs font-normal">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Bill Before Solar:</span>
                                            <span className="text-rose-600 font-medium">{proj.billBefore}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Bill After Solar:</span>
                                            <span className="text-emerald-700 font-semibold">{proj.billAfter}</span>
                                        </div>
                                        <div className="flex justify-between pt-1.5 border-t border-slate-200">
                                            <span className="text-slate-500">Govt. Grant:</span>
                                            <span className="text-blue-700 font-semibold">{proj.subsidy}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={scrollToForm}
                                        className="w-full text-center text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 py-2.5 rounded-xl transition-all cursor-pointer"
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
                SECTION 4: TECHNICAL STANDARDS & SPECIFICATIONS TABLE
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            Engineering Quality Benchmarks
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                            Why Divvy Solar Engineering Outperforms
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            Compare verified Tier-1 EPC specifications against common market shortcuts:
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    <th className="p-4 sm:p-5">System Component</th>
                                    <th className="p-4 sm:p-5 text-emerald-800 bg-emerald-50/50">Divvy Solar EPC Standard</th>
                                    <th className="p-4 sm:p-5 text-slate-500">Standard Market Vendors</th>
                                    <th className="p-4 sm:p-5">Long-Term Benefit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-normal">
                                {TECHNICAL_SPECS.map((spec, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                                        <td className="p-4 sm:p-5 font-medium text-slate-900">{spec.parameter}</td>
                                        <td className="p-4 sm:p-5 bg-emerald-50/20 font-medium text-emerald-900 flex items-center gap-1.5">
                                            <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                                            <span>{spec.divvySpec}</span>
                                        </td>
                                        <td className="p-4 sm:p-5 text-slate-500">{spec.marketSpec}</td>
                                        <td className="p-4 sm:p-5 text-slate-600 font-normal">{spec.benefit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 5: 4-STEP STREAMLINED EPC TIMELINE
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                            Zero Hassle Execution
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                            From Site Visit to Zero Bill in 4 Simple Steps
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-normal">
                            We take complete responsibility for engineering, DISCOM permits &amp; government subsidy deposit:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {EPC_STEPS.map((step) => (
                            <div key={step.step} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                                <div>
                                    <div className="w-11 h-11 rounded-2xl bg-[#0b1329] text-amber-400 font-semibold text-sm flex items-center justify-center mb-4">
                                        {step.step}
                                    </div>
                                    <h4 className="text-base font-medium text-slate-900 mb-2 leading-snug">{step.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 6: CUSTOMER TESTIMONIALS
            ════════════════════════════════════════════════════════════════ */}
            <Testimonials />

            {/* ════════════════════════════════════════════════════════════════
                SECTION 7: DIRECT EPC TRUST & LEADERSHIP STATEMENT
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        
                        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[340px] border border-slate-200 shadow-sm">
                            <Image
                                src="/utility_hero_4k.webp"
                                alt="Divvy Solar Solar EPC Installations"
                                fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                                <span className="text-amber-400 font-medium text-xs uppercase tracking-wider">Turnkey EPC Since 2018</span>
                                <h3 className="text-lg font-normal text-white mt-1">1,000+ Verified Rooftop Installations</h3>
                                <p className="text-xs text-slate-300 mt-1 font-light">Offices &amp; engineering hubs across Hisar, Gurgaon, Mohali &amp; Ludhiana</p>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                                    Direct Engineering, No Middlemen
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                                    North India&apos;s Direct Solar EPC Company
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed mt-2 font-normal">
                                    Unlike online lead aggregators who sell your phone number to third-party sub-contractors, Divvy Solar is a full-stack registered EPC company with our own warehousing, in-house structural engineers, and dedicated post-commissioning maintenance teams.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-normal text-amber-600">8+</div>
                                    <div className="text-[11px] font-medium text-slate-700 uppercase mt-0.5">Years EPC Experience</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-normal text-slate-900">1,000+</div>
                                    <div className="text-[11px] font-medium text-slate-700 uppercase mt-0.5">Plants Energized</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                                    <div className="text-2xl sm:text-3xl font-normal text-emerald-600">₹78,000</div>
                                    <div className="text-[11px] font-medium text-slate-700 uppercase mt-0.5">Max Govt. Subsidy</div>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4 shadow-xs">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-400 shrink-0 shadow-xs">
                                    <Image
                                        src="/dinesh_sir_img.jpeg"
                                        alt="Dinesh Aneja - Director of Divvy Solar"
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900">Dinesh Aneja <span className="font-normal text-xs text-amber-700">• Director &amp; CEO, Divvy Solar</span></h4>
                                    <p className="text-xs text-slate-600 italic mt-1 leading-relaxed font-normal">
                                        &ldquo;Solar is a 25-year structural investment on your home. We use only Tier-1 ALMM panels and heavy hot-dip galvanized mounting to guarantee safety, zero roof leaks, and maximum unit generation.&rdquo;
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTION 8: ACCORDION FAQS
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            Got Questions?
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 mt-3 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200">
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                                >
                                    <span className="text-sm font-medium text-slate-900 leading-snug">{faq.q}</span>
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
                    className="flex-1 bg-slate-100 border border-slate-300 text-slate-900 font-medium py-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
                >
                    <PhoneIcon className="w-4 h-4 text-amber-600" />
                    <span>Call Team</span>
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-semibold py-3 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                    <span>Check Subsidy</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-slate-950" />
                </button>
            </div>

        </div>
    );
}
