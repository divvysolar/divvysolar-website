"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    HomeIcon, 
    BuildingOffice2Icon, 
    BuildingLibraryIcon, 
    ShieldCheckIcon, 
    WrenchScrewdriverIcon, 
    CurrencyRupeeIcon, 
    DocumentCheckIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";

export default function ServicesClient() {
    const [activeFaq, setActiveFaq] = useState(null);

    const services = [
        {
            title: "Residential Solar Solutions",
            tagline: "Smart Power for Modern Homes",
            description: "Switching to solar with Divvy Solar is simple, seamless, and tailored to your home's energy footprint. Enjoy hassle-free rooftop solar installation, tier-1 premium panels, smart monitoring, and long-term utility savings.",
            features: [
                "Tailored rooftop structural designs",
                "Tier-1 premium mono-PERC/Bifacial panels",
                "Smart IoT app for real-time tracking",
                "25-Year performance warranty protection"
            ],
            icon: <HomeIcon className="w-6 h-6" />,
            image: "/hero-main-page.webp",
            href: "/services/residential",
            bgGradient: "from-amber-500/10 via-transparent to-transparent"
        },
        {
            title: "Industrial Solar Solutions",
            tagline: "Turn Utility Bills into a Profit Center",
            description: "Turn your biggest operating cost into a profit centre. We deliver end-to-end industrial solar EPC, handling site surveys, custom engineering, statutory approvals (CEIG/NOC), and grid-tied commissioning for warehouses and factories.",
            features: [
                "40% Accelerated Depreciation tax benefits",
                "End-to-end UHBVN / DHBVN approvals & clearances",
                "Heavy-duty corrosion resistant structure engineering",
                "Zero-downtime factory switchover integration"
            ],
            icon: <BuildingOffice2Icon className="w-6 h-6" />,
            image: "/indus5_mm.jpeg",
            href: "/services/industrial",
            bgGradient: "from-emerald-500/10 via-transparent to-transparent"
        },
        {
            title: "Utility Scale Solar Projects",
            tagline: "High-Yield Bankable Assets",
            description: "Scaling up solar is a structured and highly strategic process. We specialize in compliance-ready, bankable utility solar assets. We cover power evacuation design, grid sync, and land-to-grid execution with precision.",
            features: [
                "Power purchase agreements (PPA) consulting",
                "High-voltage substations & evacuation lines",
                "PVsyst simulation and yield optimization",
                "Remote SCADA-based monitoring systems"
            ],
            icon: <BuildingLibraryIcon className="w-6 h-6" />,
            image: "/utility_hero_4k.webp",
            href: "/services/utility-scale",
            bgGradient: "from-blue-500/10 via-transparent to-transparent"
        }
    ];

    const stats = [
        { value: "1,000+", label: "Completed Projects", desc: "Successfully delivered across North India." },
        { value: "8+", label: "Years of Excellence", desc: "Powering solar innovations since 2018." },
        { value: "100%", label: "Approvals Handled", desc: "DISCOM NOCs, CEIG clearances, & Net Metering." }
    ];

    const processes = [
        {
            step: "01",
            title: "Load & Site Analysis",
            desc: "Our engineers run detailed load assessments, time-of-day tariff analyses, and shadow mapping to design a right-sized solar system optimized for your exact load profile."
        },
        {
            step: "02",
            title: "Tier-1 Sourcing & Engineering",
            desc: "We build systems using global Tier-1 components (such as Sungrow and Vikram Solar) for maximum output, structural reliability, and comprehensive warranty coverage."
        },
        {
            step: "03",
            title: "NOC & CEIG Clearances",
            desc: "We manage the entire paperwork chain, including DISCOM NOCs, safety certifications, CEIG clearances, and net-meter commissioning, so your system is legally compliant from day one."
        }
    ];

    const faqs = [
        {
            q: "How long does a typical industrial or commercial solar installation take?",
            a: "An industrial or commercial rooftop installation generally takes between 4 to 8 weeks. This timeline includes structural safety verification, physical installation, cabling, net-metering configuration, and getting the final DISCOM NOC / CEIG approvals."
        },
        {
            q: " Are there any tax benefits for businesses that go solar?",
            a: " Yes. Solar installations qualify for accelerated depreciation under the Income Tax Act, which reduces your taxable business income in the first year of installation. This makes the effective cost of going solar significantly lower than the upfront investment. Your CA can confirm the exact savings based on your company's tax structure."
        },
        {
            q: "How does net metering save money on holidays or Sundays?",
            a: "When your facility is closed or power consumption is low (like on Sundays), the solar energy generated is automatically exported to the grid. Your state DISCOM records these units and credits them back against your monthly electricity consumption bill."
        },
        {
            q: "What are the lifespans and warranties of the solar system components?",
            a: "Divvy Solar systems are engineered for 25+ years of service. Premium solar panels come with a 25-year performance warranty, while inverters typically include 5 to 10-year warranties with standard extensions. All installations include remote monitoring for proactive maintenance."
        }
    ];

    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    return (
        <main className="bg-[#070e1f] text-white overflow-hidden selection:bg-[#fecb00] selection:text-[#070e1f]">
            
            {/* ── HIGH-END CINEMATIC HERO ── */}
            <section className="relative pt-24 pb-28 text-center overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0e1b3d]/30 to-[#070e1f]">
                {/* Glow Effects */}
                <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
                
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <span className="inline-block py-1 px-4 rounded-full bg-accent/10 border border-accent/20 text-[#fecb00] text-xs font-black uppercase tracking-[0.2em]">
                        Precision Engineering
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
                        Solar EPC Services <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500">
                            Across India
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                        Turnkey solar engineering, sourcing, and commissioning built for residential estates, manufacturing plants, and heavy utility networks since 2018.
                    </p>
                </div>
            </section>

            {/* ── FLOATING GLASSMOTH STATS BANNER ── */}
            <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
                <div className="bg-[#0e1b3d]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
                    <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center md:items-start md:px-8 pt-6 md:pt-0 first:pt-0 text-center md:text-left group">
                                <span className="text-3xl sm:text-4xl font-black text-accent mb-2 group-hover:scale-105 transition-transform duration-300 inline-block">
                                    {stat.value}
                                </span>
                                <span className="text-sm font-bold text-white mb-1">{stat.label}</span>
                                <p className="text-xs text-gray-300 leading-relaxed font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ASYMMETRICAL SOLUTIONS SHOWCASE (NO BOXES) ── */}
            <section className="py-24 relative scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="inline-block py-1.5 px-3 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase mb-4">
                            Solutions Range
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            Turnkey EPC Solutions
                        </h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            We deliver end-to-end solar solutions designed to lower energy costs, ensure environmental compliance, and maximize return on investment.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {services.map((service, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div 
                                    key={index}
                                    className="grid lg:grid-cols-12 gap-12 items-center relative group"
                                >
                                    {/* Alternating Content / Graphic layout */}
                                    <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-xs font-extrabold uppercase text-accent tracking-wider">{service.tagline}</span>
                                            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                                {service.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2.5 pt-2">
                                            {service.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4">
                                            <Link 
                                                href={service.href}
                                                className="inline-flex items-center gap-2 text-accent font-extrabold uppercase text-xs tracking-widest hover:text-white transition-colors"
                                            >
                                                Explore Solution <span>→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image Side with Premium Blend Overlay */}
                                    <div className={`lg:col-span-6 border border-white/10 rounded-[2.5rem] relative overflow-hidden h-[300px] sm:h-[400px] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={index === 0}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f] via-[#070e1f]/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HIGH-END ENGINEERING TIMELINE ── */}
            <section className="py-24 bg-[#0e1b3d]/20 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="inline-block py-1.5 px-3 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase">
                                The Divvy Edge
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                Engineering-First Solar Delivery
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                We believe a solar plant is a 25-year financial asset. That is why our team handles the entire lifecycle in-house—from load profiling and CEIG licensing to remote monitoring and scheduled maintenance. We plan all switchover work during scheduled maintenance windows or non-peak hours to minimise disruption to your operations.
                            </p>
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0e1b3d] border border-white/10 flex items-center justify-center text-accent shrink-0">
                                        <ShieldCheckIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">CEIG & NOC Compliance</h4>
                                        <p className="text-xs text-gray-400 mt-1">We handle all bureaucracy, approvals, Net Metering configuration, and safety certificates on your behalf.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0e1b3d] border border-white/10 flex items-center justify-center text-accent shrink-0">
                                        <WrenchScrewdriverIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">Bi-Annual Operations & Maintenance</h4>
                                        <p className="text-xs text-gray-400 mt-1">Consistent panel cleanings, structure integrity checks, and inverter diagnostics to maximize daily generation yields.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Staggered Vertical Pipeline (Not Standard Box Grid) */}
                        <div className="lg:col-span-7 relative pl-8 border-l border-white/10 space-y-12 py-4">
                            {processes.map((proc, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Connected Node */}
                                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-[#070e1f] border-2 border-accent rounded-full flex items-center justify-center text-[10px] font-black text-accent group-hover:bg-accent group-hover:text-[#070e1f] transition-all duration-300 z-10">
                                        {proc.step}
                                    </div>
                                    <h4 className="heading-georgia text-xl font-bold text-white mb-2">{proc.title}</h4>
                                    <p className="text-gray-300 text-sm leading-relaxed max-w-xl">{proc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINANCIAL BENEFITS OF SOLAR EPC ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#0e1b3d]/30 to-transparent border border-white/10 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-6 space-y-6">
                                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
                                    Tax & ROI Incentives
                                </span>
                                <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Financial Benefits of Solar EPC
                                </h2>
                                <p className="text-gray-300 leading-relaxed font-light text-sm sm:text-base">
                                    For industrial and commercial entities, going solar is not just about saving on power bills — it is a capital investment that delivers direct tax advantages and strengthens cash flows from the very first billing cycle.
                                </p>
                            </div>

                            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">
                                <div className="bg-[#0e1b3d]/40 border border-white/5 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 group">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                                        <CurrencyRupeeIcon className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-2">40% Accelerated Depreciation</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">Claim 40% accelerated depreciation under Section 32 of the Income Tax Act to reduce your corporate income tax burden in Year 1. Applicable under the regular tax regime.</p>
                                </div>
                                <div className="bg-[#0e1b3d]/40 border border-white/5 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 group">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                                        <DocumentCheckIcon className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-2">GST Input Tax Credit</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">Offset the GST paid on solar hardware and components against your outward GST liability, reducing your net capital expenditure. Applicable for GST-registered commercial and industrial entities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PREMIUM INTERACTIVE ACCORDION FAQS ── */}
            <section className="py-24 bg-[#0e1b3d]/20 border-t border-white/5 scroll-mt-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1.5 px-3 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase mb-3">
                            Got Questions?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => {
                            const isOpen = activeFaq === i;
                            return (
                                <div 
                                    key={i} 
                                    className="bg-[#0e1b3d]/30 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:text-accent transition-colors duration-200 focus:outline-none"
                                    >
                                        <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`} />
                                    </button>
                                    <div 
                                        className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}
                                    >
                                        <p className="p-6 text-gray-300 text-xs sm:text-sm leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
