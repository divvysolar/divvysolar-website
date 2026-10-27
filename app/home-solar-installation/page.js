'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import Testimonials from '@/components/home/Testimonials';
import * as fp from '@/lib/fpixel';
import {
    BoltIcon,
    ShieldCheckIcon,
    CurrencyRupeeIcon,
    CheckCircleIcon,
    PhoneIcon,
    SparklesIcon,
    StarIcon,
    ArrowRightIcon,
    ClockIcon,
    WrenchScrewdriverIcon,
    ChevronDownIcon,
    MapPinIcon,
    CheckBadgeIcon,
    DocumentCheckIcon,
    SunIcon,
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/outline';

// 1. Residential Systems & System-Size Guidance
const SYSTEM_SIZES = [
    {
        capacity: '2 kW System',
        idealFor: 'Small Homes / 1-2 BHK',
        appliances: 'Fans, Lights, TV, Refrigerator',
        roofArea: '150 - 200 sq. ft.',
        dailyUnits: '8 - 10 Units / day',
        monthlySavings: '₹2,000 - ₹3,000 / month',
        centralSubsidy: '₹60,000',
        popular: false
    },
    {
        capacity: '3 kW System',
        idealFor: '3-4 BHK / 1 AC + Geyser',
        appliances: '1 Inverter AC, Refrigerator, Washing Machine, Geyser',
        roofArea: '250 - 300 sq. ft.',
        dailyUnits: '12 - 15 Units / day',
        monthlySavings: '₹3,500 - ₹5,000 / month',
        centralSubsidy: '₹78,000',
        popular: true,
        tag: 'Highest Subsidy Slab'
    },
    {
        capacity: '5 kW System',
        idealFor: 'Independent Kothi / 2-3 ACs',
        appliances: '2-3 Inverter ACs, Water Pump, Heavy Home Appliances',
        roofArea: '400 - 500 sq. ft.',
        dailyUnits: '20 - 25 Units / day',
        monthlySavings: '₹6,500 - ₹9,000 / month',
        centralSubsidy: '₹78,000 (Max Cap)',
        popular: false
    },
    {
        capacity: '10 kW System',
        idealFor: 'Large Bungalows / Luxury Villas',
        appliances: 'Multiple ACs, Lift/Heater, EV Charger, Villa Setup',
        roofArea: '800 - 1,000 sq. ft.',
        dailyUnits: '40 - 50 Units / day',
        monthlySavings: '₹15,000 - ₹22,000 / month',
        centralSubsidy: '₹78,000 (Max Cap)',
        popular: false
    }
];

// 2. Installation Process (Start Saving with EPC in 3 Steps per user design)
const EPC_STEPS = [
    {
        num: "01",
        title: "Engineering",
        desc: "Site survey, detailed shadow profiling, and customized solar PV design to maximize generational yield."
    },
    {
        num: "02",
        title: "Procurement",
        desc: "Sourcing Tier-1 DCR solar components from highly trusted global brands for guaranteed, durable output."
    },
    {
        num: "03",
        title: "Construction",
        desc: "Expert rooftop installation, testing, followed by net-metering commissioning and 24/7 smart monitoring."
    }
];

// 3. PM Surya Ghar Eligibility & Subsidy Guidelines
const SUBSIDY_GUIDELINES = [
    {
        id: 'eligibility',
        title: 'Eligibility Criteria',
        tag: 'Who Can Apply',
        summary: 'Direct MNRE guidelines for domestic rooftop solar installations.',
        points: [
            {
                label: 'Residential Ownership',
                detail: 'Indian citizen with active domestic DISCOM meter & exclusive roof rights.'
            },
            {
                label: 'Matching Name & KYC',
                detail: 'Electricity bill name must match Aadhaar & bank account for direct DBT transfer.'
            },
            {
                label: 'Roof Footprint',
                detail: 'Min. 100 sq. ft. shadow-free roof area per 1 kW system capacity.'
            },
            {
                label: 'Subsidy Limit',
                detail: 'One government subsidy per household / consumer electricity connection.'
            }
        ]
    },
    {
        id: 'slabs',
        title: 'Direct DBT Subsidy Slabs',
        tag: 'Government Grant Cap',
        summary: 'Fixed financial grant credited directly into your bank account via DBT.',
        points: [
            {
                label: '1 kW System',
                detail: '₹30,000 Direct DBT subsidy credited in ~30 days of net-metering.'
            },
            {
                label: '2 kW System',
                detail: '₹60,000 Direct DBT subsidy (₹30k/kW) credited directly.'
            },
            {
                label: '3 kW System (Recommended)',
                detail: '₹78,000 Maximum direct subsidy grant cap by Govt. of India.'
            },
            {
                label: 'Above 3 kW (Up to 10 kW+)',
                detail: 'Flat ₹78,000 max central subsidy grant + 100% zero electricity bills.'
            }
        ]
    },
    {
        id: 'compliance',
        title: 'MNRE Standards & Compliance',
        tag: 'Tier-1 EPC Guarantee',
        summary: 'Technical benchmarks guaranteed by Divvy Solar as an authorized vendor.',
        points: [
            {
                label: 'ALMM & DCR Modules',
                detail: 'Tier-1 Made-in-India mono PERC/TOPCon solar panels with 25Y warranty.'
            },
            {
                label: 'Smart Grid Inverters',
                detail: 'High-efficiency inverters with surge protection & mobile WiFi monitoring.'
            },
            {
                label: 'Heavy Structure & Earthing',
                detail: 'Hot-dip galvanized mounting structure (150+ km/h wind) & dual copper earthing.'
            },
            {
                label: '100% Turnkey Approvals',
                detail: 'Complete DISCOM liaisoning, net-meter testing & subsidy filing managed by us.'
            }
        ]
    }
];

// 4. Brief-Compliant FAQs
const FAQS = [
    {
        q: "What is the typical pricing and net cost after PM Surya Ghar subsidy?",
        a: "A standard 3 kW residential rooftop solar plant costs approximately ₹1.90L to ₹2.10L depending on roof height and structure customization. With the ₹78,000 direct DBT subsidy credited back by the government, your effective net cost comes down to ₹1.12L to ₹1.32L."
    },
    {
        q: "How does the net metering process work?",
        a: "A bi-directional meter records units generated by your solar panels vs. units consumed from the grid. Excess daytime solar energy is exported to the grid for credits. At the end of billing cycle, you only pay for net units consumed, effectively cutting bills by up to 90-95%."
    },
    {
        q: "What is the timeline from booking to commissioning?",
        a: "Site feasibility survey is completed within 24 hours. Material delivery and physical installation take 3 to 5 days. Net metering inspection and DISCOM meter installation typically take 10 to 14 business days depending on DISCOM schedules."
    },
    {
        q: "What warranties and maintenance are included?",
        a: "Divvy Solar provides 25 years of performance warranty on Tier-1 DCR solar panels, 5 to 10 years warranty on on-grid inverters, and 5 years of comprehensive free maintenance with generation monitoring."
    },
    {
        q: "Can I install solar on an elevated roof or terrace structure?",
        a: "Yes. We design customized elevated structures (6 to 8 feet high) so that your rooftop remains 100% usable for family activities, walking, or garden space while panels generate clean power."
    }
];

export default function HomeSolarInstallationPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        cityState: '',
        monthlyBill: '₹5,000 - ₹10,000 / month'
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
    const [faqOpen, setFaqOpen] = useState(0);
    const [activeSubsidyTab, setActiveSubsidyTab] = useState('all');



    // Extract GCLID and UTM parameters safely
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setMarketingParams({
                gclid: urlParams.get('gclid') || '',
                utmSource: urlParams.get('utm_source') || 'google',
                utmMedium: urlParams.get('utm_medium') || 'cpc',
                utmCampaign: urlParams.get('utm_campaign') || 'residential_search_ads'
            });
        }
    }, []);

    // Conversion tracking helper
    const triggerConversionEvents = () => {
        fp.event('Lead', {
            content_name: 'Residential Solar Lead Form',
            content_category: 'Google Ads Landing Page',
            currency: 'INR',
            value: applicableSubsidy
        });

        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'residential_lead_submitted',
                lead_type: 'residential',
                landing_page: '/home-solar-installation',
                recommended_kw: recommendedKw
            });
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'generate_lead', {
                    event_category: 'Solar Inquiry',
                    event_label: 'Home Solar Installation Lead'
                });
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (submitting || submitted) return;

        setSubmitting(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    whatsapp: formData.mobileNumber,
                    location: formData.cityState,
                    monthlyBill: formData.monthlyBill,
                    serviceType: 'Residential (Google Ads: /home-solar-installation)',
                    landingPage: '/home-solar-installation',
                    gclid: marketingParams.gclid,
                    utmSource: marketingParams.utmSource,
                    utmMedium: marketingParams.utmMedium,
                    utmCampaign: marketingParams.utmCampaign
                })
            });

            if (res.ok) {
                triggerConversionEvents();
                setSubmitted(true);
            } else {
                const errData = await res.json();
                setErrorMsg(errData.error || 'Something went wrong. Please connect with our team via phone.');
            }
        } catch (err) {
            console.error('Lead submission error:', err);
            setErrorMsg('Network error. Please call our solar helpline directly.');
        } finally {
            setSubmitting(false);
        }
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

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const formEl = document.getElementById('enquiry-form');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative font-sans text-slate-800 bg-[#fbfbf9] overflow-x-hidden selection:bg-[#fecb00] selection:text-[#0a1122]">
            
            {/* Top Minimal Trust Bar (Clean, airy, professional) */}
            <div className="bg-[#0f172a] text-slate-200 text-xs py-2.5 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-normal text-slate-300">
                            <strong className="font-medium text-white">PM Surya Ghar Yojana:</strong> Direct ₹78,000 Central DBT Subsidy + Zero Electricity Bill.
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-xs text-slate-400 font-light">
                        <span>MNRE &amp; DISCOM Registered Solar EPC</span>
                        <span>•</span>
                        <span>Haryana, Punjab &amp; Delhi NCR</span>
                    </div>
                </div>
            </div>

            {/* Clean White Modern Header (Codeyoung inspired clean navbar) */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-11 w-44">
                            <Image
                                src="/divvy_photo.png"
                                alt="Divvy Solar Power Solutions"
                                fill
                                sizes="176px"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Right Action buttons */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="tel:+919254986321"
                            onClick={trackCallClick}
                            className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-normal transition"
                        >
                            <PhoneIcon className="w-4 h-4 text-amber-500" />
                            <span>Help: 92549-86321</span>
                        </a>
                        <button
                            type="button"
                            onClick={scrollToForm}
                            className="inline-flex items-center justify-center bg-[#fecb00] hover:bg-[#ffd42e] text-[#070e1f] px-6 py-2.5 rounded-full font-medium text-sm transition duration-200 shadow-sm hover:shadow"
                        >
                            <span>Book Site Visit</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION: Codeyoung-Style Crisp, Minimal & High-Converting Layout */}
            <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        
                        {/* Left Column: Clean Typography & Social Proof */}
                        <div className="lg:col-span-7 space-y-7">
                            
                            {/* Social Proof Pill (Exact Codeyoung 30K+ Happy Parents style) */}
                            <div className="inline-flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full">
                                <div className="flex -space-x-1.5 overflow-hidden">
                                    <span className="inline-block w-5 h-5 rounded-full ring-2 ring-white bg-amber-400 text-[10px] font-semibold text-slate-900 flex items-center justify-center">★</span>
                                    <span className="inline-block w-5 h-5 rounded-full ring-2 ring-white bg-blue-500 text-[9px] font-bold text-white flex items-center justify-center">D</span>
                                    <span className="inline-block w-5 h-5 rounded-full ring-2 ring-white bg-emerald-500 text-[9px] font-bold text-white flex items-center justify-center">✓</span>
                                </div>
                                <span className="text-xs font-normal text-slate-600">
                                    <strong className="font-semibold text-slate-900">1,000+</strong> happy rooftop owners across North India
                                </span>
                            </div>

                            {/* Headline: Clean, balanced font weight with subtle highlight */}
                            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-normal leading-[1.2] text-[#0f172a] tracking-tight">
                                Unlock <span className="font-semibold text-amber-600">100% solar savings</span> for your home, today.
                            </h1>

                            {/* Subheading: Balanced, clear professional text */}
                            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
                                Complete turnkey rooftop solar installation with direct PM Surya Ghar central subsidy, precision 3D engineering &amp; guaranteed zero electricity bills.
                            </p>

                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700 pt-1">
                                <span className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-800">Residential Rooftop</span>
                                <span className="text-slate-300">|</span>
                                <span className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-800">₹78,000 Govt Subsidy</span>
                                <span className="text-slate-300">|</span>
                                <span className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-800">Net-Metering Liaisoning</span>
                                <span className="text-slate-300">|</span>
                                <span className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-800">25Y Warranty</span>
                            </div>

                            {/* 4 Feature Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <SparklesIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-900">Custom 3D Shadow Analysis</h3>
                                        <p className="text-[11px] text-slate-600 font-normal mt-0.5">Engineered for maximum sunlight generation.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <DocumentCheckIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-900">100% DISCOM Liaisoning</h3>
                                        <p className="text-[11px] text-slate-600 font-normal mt-0.5">Hassle-free meter approval &amp; subsidy DBT.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <ShieldCheckIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-900">Tier-1 DCR Mono Modules</h3>
                                        <p className="text-[11px] text-slate-600 font-normal mt-0.5">25-year manufacturer performance warranty.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <ClockIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-900">24-Hour Fast Feasibility</h3>
                                        <p className="text-[11px] text-slate-600 font-normal mt-0.5">On-ground site visit &amp; savings report.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Rating Block */}
                            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-800 shadow-xs">
                                        G
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-semibold text-slate-900">Divvy Solar Reviews</span>
                                            <div className="flex text-amber-500 text-xs">★★★★★</div>
                                            <span className="text-[11px] text-slate-600 font-medium">(4.9/5)</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 font-normal">Rated 4.9+ on Google by verified homeowner clients</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                                    <CheckBadgeIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>PM Surya Ghar Registered</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Codeyoung Clean Minimal Lead Form Card */}
                        <div id="enquiry-form" className="lg:col-span-5 scroll-mt-24">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.07)] border border-slate-200/90 relative">
                                
                                {/* Form Title with Subtle Gold Highlight */}
                                <div className="text-center mb-6">
                                    <h2 className="text-xl sm:text-2xl font-light text-[#0f172a]">
                                        Book a <span className="font-semibold text-amber-600">FREE</span> site visit for your home
                                    </h2>
                                    
                                    {/* 3 Step Indicator Line (Codeyoung exact style) */}
                                    <div className="flex items-center justify-center gap-1.5 mt-3 mb-1">
                                        <div className="w-10 h-1 bg-[#fecb00] rounded-full"></div>
                                        <div className="w-10 h-1 bg-slate-200 rounded-full"></div>
                                        <div className="w-10 h-1 bg-slate-200 rounded-full"></div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-light">
                                        Instant 3D Solar Feasibility &amp; Govt Subsidy Estimate
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 text-center space-y-3">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                                            <CheckCircleIcon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-lg font-medium text-emerald-950">Thank You!</h3>
                                        <p className="text-xs text-emerald-800 font-light leading-relaxed">
                                            Your request has been registered. Our residential solar engineer will connect with you within <strong>15 to 30 minutes</strong>.
                                        </p>
                                        <a
                                            href="https://wa.me/919254986321?text=Hi%20Divvy%20Solar,%20I%20have%20submitted%20my%20details%20for%20Home%20Rooftop%20Solar%20Installation."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={trackWhatsAppClick}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl text-xs transition shadow-xs"
                                        >
                                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                            <span>Chat With Us on WhatsApp</span>
                                        </a>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                        {/* Field 1: Full Name */}
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Parent's / Homeowner's Name"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fecb00] focus:border-[#fecb00] transition"
                                            />
                                        </div>

                                        {/* Field 2: City / Location */}
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                placeholder="City / Location (e.g. Gurgaon, Mohali, Hisar)"
                                                value={formData.cityState}
                                                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fecb00] focus:border-[#fecb00] transition"
                                            />
                                        </div>

                                        {/* Field 3: Mobile Number (Exact Codeyoung phone row) */}
                                        <div>
                                            <div className="relative flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#fecb00] focus-within:border-[#fecb00] transition">
                                                <div className="flex items-center gap-1.5 px-3 bg-slate-50/50 border-r border-slate-200 text-xs font-medium text-slate-600 shrink-0">
                                                    <span>🇮🇳</span>
                                                    <span>+91</span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    maxLength={10}
                                                    pattern="[0-9]{10}"
                                                    placeholder="Enter 10-digit mobile number"
                                                    value={formData.mobileNumber}
                                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                                                    className="w-full bg-white px-3 py-3 text-xs sm:text-sm font-normal text-slate-800 placeholder-slate-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Field 4: Monthly Electricity Bill */}
                                        <div>
                                            <select
                                                value={formData.monthlyBill}
                                                onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-normal text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#fecb00] focus:border-[#fecb00] transition appearance-none"
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2364748b'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                                            >
                                                <option value="" disabled>Select Monthly Electricity Bill</option>
                                                <option>Under ₹2,500 / month (Ideal: 2 kW)</option>
                                                <option>₹2,500 - ₹5,000 / month (Ideal: 3 kW)</option>
                                                <option>₹5,000 - ₹10,000 / month (Ideal: 5 kW)</option>
                                                <option>₹10,000 - ₹20,000 / month (Ideal: 8 kW)</option>
                                                <option>Above ₹20,000 / month (10 kW+ Villa)</option>
                                            </select>
                                        </div>

                                        {/* Terms Checkbox (Exact Codeyoung pattern) */}
                                        <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 font-light">
                                            <input
                                                type="checkbox"
                                                required
                                                defaultChecked
                                                className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                                            />
                                            <span>
                                                I agree with the <Link href="/privacy-policy" className="text-blue-600 hover:underline">terms of use</Link> and <Link href="/privacy-policy" className="text-blue-600 hover:underline">privacy policy</Link>
                                            </span>
                                        </div>

                                        {errorMsg && (
                                            <p className="text-xs font-normal text-rose-600">{errorMsg}</p>
                                        )}

                                        {/* CTA Button: Solid warm yellow like Codeyoung "Verify and Select Time" */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#fecb00] hover:bg-[#ffd42e] text-[#070e1f] font-medium py-3.5 px-6 rounded-xl text-sm transition duration-200 shadow-xs hover:shadow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                        >
                                            {submitting ? (
                                                <span>Submitting Details...</span>
                                            ) : (
                                                <span>Verify and Get My Quote</span>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Backed By & Approvals Trust Box (Exact Codeyoung bottom card) */}
                            <div className="mt-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                    Approved &amp; Certified By
                                </div>
                                <div className="flex items-center justify-between gap-3 text-slate-600 text-xs font-light grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition">
                                    <span className="font-semibold text-slate-700">MNRE Govt. of India</span>
                                    <span>•</span>
                                    <span className="font-semibold text-slate-700">PM Surya Ghar</span>
                                    <span>•</span>
                                    <span className="font-semibold text-slate-700">State DISCOMs</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION: Residential Rooftop Solar Systems & System-Size Guidance */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-normal text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            System-Size Guidance
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-light text-[#0f172a] mt-3 tracking-tight">
                            Residential Rooftop Solar Packages
                        </h2>
                        <p className="text-sm text-slate-500 font-light mt-2">
                            Select the ideal system capacity tailored to your monthly units and roof footprint:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SYSTEM_SIZES.map((system) => (
                            <div
                                key={system.capacity}
                                className={`rounded-3xl p-6 relative flex flex-col justify-between transition duration-200 ${system.popular
                                    ? 'bg-white border-2 border-amber-400 shadow-[0_10px_30px_rgba(254,203,0,0.12)] scale-[1.02]'
                                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
                                    }`}
                            >
                                {system.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fecb00] text-[#070e1f] text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                                        ★ {system.tag}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-medium text-[#0f172a]">{system.capacity}</h3>
                                    <p className="text-xs text-amber-600 font-medium mt-0.5">{system.idealFor}</p>

                                    <div className="my-5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2 text-xs font-normal">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Govt Subsidy:</span>
                                            <span className="text-emerald-700 font-semibold">{system.centralSubsidy}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Roof Needed:</span>
                                            <span className="text-slate-800 font-medium">{system.roofArea}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Generation:</span>
                                            <span className="text-slate-800 font-medium">{system.dailyUnits}</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-700 space-y-2 mb-6 font-normal">
                                        <div>
                                            <span className="text-slate-500 block text-[11px] font-medium">Typical Loads:</span>
                                            <span className="text-slate-800 font-medium">{system.appliances}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <span className="text-slate-500 block text-[11px] font-medium">Estimated Monthly Savings:</span>
                                            <span className="text-emerald-700 font-semibold text-sm">{system.monthlySavings}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className={`w-full py-3 rounded-xl font-semibold text-xs text-center transition cursor-pointer ${system.popular
                                        ? 'bg-[#fecb00] hover:bg-[#ffd42e] text-[#070e1f] shadow-sm'
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

            {/* SECTION: Start Saving with EPC in 3 Steps */}
            <section className="py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column: Heading, Subtitle & 3-Step Vertical Timeline */}
                        <div className="lg:col-span-7 xl:col-span-7 space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-1 rounded-full mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#fecb00]"></span>
                                    <span className="font-medium uppercase tracking-wider text-[11px] text-slate-700">Turnkey Solar Process</span>
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-normal text-[#0f172a] leading-tight tracking-tight mb-3">
                                    Start saving with EPC in <span className="font-semibold text-[#0f172a]">3 simple steps</span>
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                                    We deliver end-to-end solar solutions — from initial 3D shadow analysis to DISCOM net-metering approval — with complete transparency.
                                </p>
                            </div>

                            {/* 3 Steps Timeline */}
                            <div className="pt-2">
                                {EPC_STEPS.map((step, i) => (
                                    <div key={i} className="flex gap-5 sm:gap-6 group">
                                        {/* Number Badge with Vertical Connecting Line */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-[#fecb00] flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                                                {step.num}
                                            </div>
                                            {i < EPC_STEPS.length - 1 && (
                                                <div className="w-px h-full min-h-[45px] bg-slate-200 my-1"></div>
                                            )}
                                        </div>
                                        
                                        {/* Step Title & Description */}
                                        <div className="pb-8">
                                            <h3 className="font-semibold text-[#0f172a] text-base sm:text-lg mb-1 tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Visual Trust & Fast Action Card */}
                        <div className="lg:col-span-5 xl:col-span-5">
                            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
                                <div className="relative h-52 rounded-2xl overflow-hidden border border-slate-100 shadow-xs">
                                    <Image
                                        src="/resi2main.webp"
                                        alt="Turnkey Residential Solar EPC Installation"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                                        <span className="text-white font-semibold text-sm">Direct MNRE Portal Subsidy</span>
                                        <span className="text-[#fecb00] text-xs font-medium">₹78,000 Direct DBT Bank Credit Guarantee</span>
                                    </div>
                                </div>

                                <div className="space-y-2.5 font-normal">
                                    <div className="flex items-center gap-3 text-xs text-slate-700">
                                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                                        <span>24-Hour site inspection &amp; shadow feasibility report</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-700">
                                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                                        <span>100% turnkey DISCOM net-metering &amp; CEIG liaisoning</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-700">
                                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                                        <span>25-year manufacturer performance warranty on Tier-1 panels</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={scrollToForm}
                                    className="w-full bg-[#fecb00] hover:bg-[#ffd42e] text-[#070e1f] font-semibold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>Schedule Free Site Feasibility Survey</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION: Official Customer Reviews */}
            <Testimonials />

            {/* SECTION: Subsidy and PM Surya Ghar Information */}
            <section className="py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            PM Surya Ghar: Muft Bijli Yojana
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-normal text-[#0f172a] mt-3 tracking-tight">
                            Direct Government Subsidy Guidelines
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2">
                            Official eligibility guidelines, central DBT subsidy slabs, and technical standards by MNRE:
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                        <button
                            type="button"
                            onClick={() => setActiveSubsidyTab('all')}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeSubsidyTab === 'all'
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                        >
                            All Guidelines
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSubsidyTab('eligibility')}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeSubsidyTab === 'eligibility'
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                        >
                            Eligibility Criteria
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSubsidyTab('slabs')}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeSubsidyTab === 'slabs'
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                        >
                            Subsidy Slabs (₹78,000)
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSubsidyTab('compliance')}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeSubsidyTab === 'compliance'
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                        >
                            Technical Standards
                        </button>
                    </div>

                    {/* Guidelines Cards Grid */}
                    <div className={activeSubsidyTab === 'all' 
                        ? "grid grid-cols-1 md:grid-cols-3 gap-5" 
                        : "max-w-xl mx-auto"
                    }>
                        {SUBSIDY_GUIDELINES.filter(g => activeSubsidyTab === 'all' || g.id === activeSubsidyTab).map((g) => (
                            <div
                                key={g.id}
                                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-slate-300 transition duration-200"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70">
                                            {g.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-medium text-[#0f172a] mb-1">{g.title}</h3>
                                    <p className="text-xs text-slate-500 font-normal mb-4">{g.summary}</p>

                                    <div className="space-y-3 font-normal">
                                        {g.points.map((pt, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-2 text-xs">
                                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">✓</div>
                                                <div className="leading-snug">
                                                    <span className="text-slate-800 font-medium">{pt.label}: </span>
                                                    <span className="text-slate-600">{pt.detail}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className="text-slate-400">Govt. Verified</span>
                                    <button
                                        type="button"
                                        onClick={scrollToForm}
                                        className="font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer transition"
                                    >
                                        <span>Check Eligibility</span>
                                        <ArrowRightIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* SECTION: ABOUT DIVVY SOLAR */}
            <section className="py-20 bg-slate-50/60 border-t border-slate-200/80 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-normal uppercase tracking-widest text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                            About Divvy Solar
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-light text-[#0f172a] mt-3 tracking-tight">
                            North India&apos;s Trusted Solar EPC Partner
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base font-light mt-2">
                            Delivering end-to-end solar solutions with Tier-1 components, precision engineering, and dedicated post-installation support since 2018.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Left: Real Project Image with badge */}
                        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px] shadow-sm group border border-slate-200">
                            <Image
                                src="/utility_hero_4k.webp"
                                alt="Divvy Solar Installation"
                                fill
                                quality={80}
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <span className="inline-block px-3 py-1 bg-[#fecb00] text-[#070e1f] font-medium text-xs rounded-full mb-2">
                                    MNRE / PM Surya Ghar Registered
                                </span>
                                <h3 className="text-base sm:text-lg font-normal">1,000+ Verified Rooftop Installations</h3>
                                <p className="text-xs text-slate-300 font-light mt-0.5">Haryana • Punjab • Delhi NCR</p>
                            </div>
                        </div>

                        {/* Right: Company Highlights & Director Note */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                                    <div className="text-2xl sm:text-3xl font-light text-amber-500">8+</div>
                                    <div className="text-xs font-normal text-slate-700 mt-1 uppercase tracking-wider">Years in EPC</div>
                                    <div className="text-[11px] text-slate-400 font-light mt-0.5">Founded 2018</div>
                                </div>
                                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                                    <div className="text-2xl sm:text-3xl font-light text-[#0f172a]">1,000+</div>
                                    <div className="text-xs font-normal text-slate-700 mt-1 uppercase tracking-wider">Projects</div>
                                    <div className="text-[11px] text-slate-400 font-light mt-0.5">Residential &amp; C&amp;I</div>
                                </div>
                                <div className="col-span-2 sm:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                                    <div className="text-2xl sm:text-3xl font-light text-emerald-600">₹78,000</div>
                                    <div className="text-xs font-normal text-slate-700 mt-1 uppercase tracking-wider">Max Subsidy</div>
                                    <div className="text-[11px] text-slate-400 font-light mt-0.5">PM Surya Ghar</div>
                                </div>
                            </div>

                            {/* Director Statement */}
                            <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-2xl shadow-xs relative overflow-hidden flex-1 flex flex-col justify-center">
                                <div className="flex items-center gap-3.5 mb-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-xs border border-amber-300 shrink-0">
                                        <Image
                                            src="/dinesh_sir_img.jpeg"
                                            alt="Dinesh Aneja - Director of Divvy Solar"
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-normal text-[#0f172a] leading-tight">Dinesh Aneja</h4>
                                        <p className="text-[11px] text-amber-600 font-normal tracking-wide uppercase">Director &amp; CEO, Divvy Solar</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed italic border-l-2 border-amber-400 pl-3">
                                    &ldquo;Solar is a 25-year investment. At Divvy Solar, we make sure every component—from hot-dip galvanized mounting structures to Tier-1 mono PERC/TOPCon panels—is engineered for longevity, safe generation, and seamless net-metering approval.&rdquo;
                                </p>
                            </div>

                            {/* Key Value Points */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600 font-light">
                                    <CheckBadgeIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span><strong className="font-normal text-slate-800">Turnkey EPC:</strong> We manage DISCOM net-metering liaisoning, structure fabrication, and subsidy disbursement.</span>
                                </div>
                                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600 font-light">
                                    <ShieldCheckIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span><strong className="font-normal text-slate-800">On-ground Teams:</strong> Dedicated support teams stationed across Hisar, Gurgaon, Mohali &amp; Ludhiana.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* MAIN WEBSITE FOOTER */}
            <Footer />

            {/* MOBILE FLOATING CTA BAR */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex gap-2 shadow-lg">
                <a
                    href="tel:+919254986321"
                    onClick={trackCallClick}
                    className="flex-1 bg-slate-100 border border-slate-300 text-slate-800 font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
                >
                    <PhoneIcon className="w-4 h-4 text-amber-600" />
                    <span>Call Team</span>
                </a>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-[#fecb00] text-[#070e1f] font-black py-3 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                    <span>Get Solar Quote</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
