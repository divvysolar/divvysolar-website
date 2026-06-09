import Image from 'next/image';
import PageHero from '@/components/common/PageHero';
import ServiceTabs from '@/components/services/ServiceTabs';
import Testimonials from '@/components/home/Testimonials';
import ContactForm from '@/components/contact/ContactForm';
import { BoltIcon, ShieldCheckIcon, CurrencyRupeeIcon, Cog6ToothIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Residential Rooftop Solar & Subsidy',
    description: 'Get residential rooftop solar panels with PM Surya Ghar Muft Bijli Yojana subsidy. Divvy Solar designs custom, DCR-compliant home solar systems with full net-metering support across Haryana, Punjab & Delhi NCR.',
    keywords: [
        'home solar rooftop subsidy',
        'PM Surya Ghar Muft Bijli Yojana',
        'rooftop solar subsidy Haryana',
        'residential solar installation Punjab',
        'DCR compliant solar panels home',
        'solar panel cost for home Delhi NCR',
        'rooftop net metering residential',
        'Divvy Solar home rooftop'
    ],
    openGraph: {
        title: 'Residential Rooftop Solar & Subsidies',
        description: 'Reduce household electricity bills to zero. Fully supported PM Surya Ghar Yojana installations, high-yield DCR solar panels, and seamless net metering.',
        url: 'https://divvysolar.in/services/residential',
        images: [{ url: '/resi2main.webp', width: 1200, height: 630, alt: 'Residential Rooftop Solar by Divvy Solar' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Home Rooftop Solar & Subsidies',
        description: 'Zero electricity bills with PM Surya Ghar rooftop solar subsidies in Haryana, Punjab & Delhi NCR.'
    },
    alternates: { canonical: 'https://divvysolar.in/services/residential' },
};

export default function ResidentialPage() {
    const features = [
        { title: "Customized Design", desc: "Site survey-based solar PV design optimized for your energy usage and maximum generation.", icon: <Cog6ToothIcon className="w-8 h-8" /> },
        { title: "Superior Performance", desc: "High-quality components and expert engineering to improve yield, efficiency, and ROI.", icon: <BoltIcon className="w-8 h-8" /> },
        { title: "Fast Installation", desc: "Trained teams deliver on-time solar panel installation with clean, safe workmanship.", icon: <ClockIcon className="w-8 h-8" /> },
        { title: "Quality Assurance", desc: "Strict testing, safety checks, and commissioning for dependable grid-connected operation.", icon: <ShieldCheckIcon className="w-8 h-8" /> },
        { title: "Smart Monitoring", desc: "24/7 remote monitoring to track generation, system health, and performance trends.", icon: <CurrencyRupeeIcon className="w-8 h-8" /> },
        { title: "Ongoing Support", desc: "Preventive maintenance and service support to keep your solar plant running at peak output.", icon: <PhoneIcon className="w-8 h-8" /> },
    ];

    return (
        <>
            <PageHero
                title="Residential Solar Solutions"
                breadcrumb="Residential"
                backgroundImage="/resi2main.webp"
            />
            <ServiceTabs />

            {/* Intro Section */}
            <section className="pt-20 pb-10 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up lg:pr-10">
                             <div className="inline-flex items-center bg-[#0a0f1c] text-white px-4 py-1.5 rounded-full mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h3 className="font-medium uppercase tracking-[0.2em] text-[10px] text-amber-400">PM Surya Ghar Rooftop Solar</h3>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-medium text-[#0a1122] mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                <span className="block md:whitespace-nowrap">Residential Solar Solutions</span>
                                <span className="block text-amber-500 md:whitespace-nowrap">for Maximum Savings</span>
                            </h2>

                            <div className="space-y-10 text-[#0a1122] text-lg leading-relaxed">
                                <p className="text-xl font-normal leading-relaxed opacity-90 text-gray-700">
                                    Turnkey residential solar EPC solutions for homes and independent villas across Haryana, Punjab, and Delhi NCR. From site survey and engineering to net-metering and commissioning, we build high-performance rooftop solar systems that eliminate high electricity bills and deliver long-term energy independence.
                                </p>

                                <div className="grid grid-cols-1 gap-8 py-4">
                                    <div className="flex items-start group/item">
                                        <div className="self-stretch w-1.5 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-105 transition-transform duration-300 shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>Complete EPC Solutions</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">End-to-end residential execution, from design and procurement to final testing and net-metering, managed by one expert team.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="self-stretch w-1.5 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-105 transition-transform duration-300 shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>High-Efficiency Systems</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">Optimized residential sizing with Tier-1 components to maximize generation and ensure the fastest return on your investment.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="self-stretch w-1.5 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-105 transition-transform duration-300 shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>Precision Engineering</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">Weatherproof structural design, safe electrical wiring, and compliance-focused installation for reliable, lifelong home energy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[480px] lg:h-[520px] rounded-[3rem] overflow-hidden shadow-sm animate-fade-in group border border-gray-100">
                            <Image
                                src="/resi1m.webp"
                                alt="Residential Solar"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                                quality={75}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid - Enhanced Visibility & Reduced Spacing */}
            <section className="pt-10 pb-12 bg-white relative overflow-hidden scroll-mt-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-7xl font-normal text-[#1f1f1f] mb-6 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                            Our Features
                        </h2>
                        <div className="flex flex-col items-center space-y-2">
                            <p className="text-xl md:text-3xl text-[#1f1f1f] font-normal tracking-tight">
                                Divvy Solar delivers turnkey solar EPC solutions, engineering, approvals, installation, and maintenance
                            </p>
                            <p className="text-lg md:text-xl text-[#1f1f1f] font-light tracking-tight opacity-80">
                                built for safe, high-performance solar systems and long-term electricity savings.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group relative bg-[#f8f9fa] p-10 md:p-12 rounded-3xl border border-transparent hover:bg-white hover:border-[#e8eaed] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center justify-center min-h-[260px]"
                            >
                                <div className="text-[#0a1122] mb-8 transition-colors">
                                    <div className="w-10 h-10 md:w-12 h-12">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-[#0a1122] mb-4" style={{ fontFamily: 'Georgia, serif' }}>{feature.title}</h3>
                                <p className="text-[#333333] text-sm md:text-base leading-relaxed max-w-[280px] text-center font-normal">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PM Surya Ghar Subsidy Breakdown Section */}
            <section className="py-20 bg-slate-50 relative overflow-hidden scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-amber-400/10 border border-amber-400/20 text-[#0a1122] px-4 py-1.5 rounded-full mb-6">
                            <span className="font-semibold uppercase tracking-[0.2em] text-[10px] text-[#0a1122]">National Subsidy Calculator</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-normal text-[#0a1122] mb-6 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                            PM Surya Ghar Subsidy Structure
                        </h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light leading-relaxed">
                            Under the direct benefit scheme of the Government of India, residential homeowners receive substantial cash subsidies directly to their bank accounts within 30 days of net-metering commissioning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Option 1 */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs uppercase font-bold tracking-widest text-gray-400">System Capacity</span>
                                    <span className="bg-amber-400/10 text-[#0a1122] font-semibold text-xs px-3 py-1 rounded-full">1 kW - 2 kW</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#0a1122] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Small Home Solar</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Perfect for small households, independent floors, and families with average consumption (fans, lights, refrigerator).</p>
                                
                                <div className="border-t border-slate-100 pt-6 space-y-4 mb-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Government Subsidy</span>
                                        <span className="font-bold text-[#0a1122] text-lg">₹30,000 - ₹60,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Average Savings / Month</span>
                                        <span className="font-bold text-amber-500">₹1,000 - ₹2,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>PM Surya Ghar Approved Subsidy</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>DCR-Compliant Panels Mandatory</span>
                                </div>
                            </div>
                        </div>

                        {/* Option 2 */}
                        <div className="bg-[#0a1122] text-white border border-[#0a1122] rounded-[2.5rem] p-8 md:p-10 shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-amber-400 text-[#0a1122] font-black text-[9px] uppercase tracking-widest px-6 py-2 rounded-bl-3xl shadow-sm z-10">Most Popular</div>
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs uppercase font-bold tracking-widest text-slate-400">System Capacity</span>
                                    <span className="bg-amber-400 text-[#0a1122] font-bold text-xs px-3 py-1 rounded-full">3 kW System</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Standard Home Rooftop</h3>
                                <p className="text-slate-300 text-sm mb-6 leading-relaxed">Our most requested solar capacity, built to offset heavy daily appliance loads including up to two 1.5-ton split ACs.</p>
                                
                                <div className="border-t border-slate-800 pt-6 space-y-4 mb-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">Government Subsidy</span>
                                        <span className="font-bold text-amber-400 text-xl">₹78,000 (Flat Capped)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">Average Savings / Month</span>
                                        <span className="font-bold text-amber-400 text-lg">₹3,000 - ₹4,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Maximum direct subsidy benefit</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Bi-directional net-meter integration</span>
                                </div>
                            </div>
                        </div>

                        {/* Option 3 */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs uppercase font-bold tracking-widest text-gray-400">System Capacity</span>
                                    <span className="bg-amber-400/10 text-[#0a1122] font-semibold text-xs px-3 py-1 rounded-full">4 kW - 10 kW+</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#0a1122] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Premium Villa / Estate</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Designed for large independent bungalows, luxury villas, and homes running central HVAC, multiple ACs, and EV chargers.</p>
                                
                                <div className="border-t border-slate-100 pt-6 space-y-4 mb-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Government Subsidy</span>
                                        <span className="font-bold text-[#0a1122] text-lg">₹78,000 (Maximum Cap)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Average Savings / Month</span>
                                        <span className="font-bold text-amber-500 text-lg">₹4,000 - ₹12,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Ideal for EV fast-charging at home</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Discom panel registration by Divvy Solar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EPC 3 Steps & Contact - Optimized Gaps */}
            <section className="pt-16 pb-24 bg-[#f8f9fa] scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
                            <div className="inline-flex items-center bg-[#0a1122]/5 border border-[#0a1122]/10 text-[#0a1122] px-4 py-1.5 rounded-full mb-6 w-fit">
                                <span className="font-black uppercase tracking-[0.2em] text-[10px]">EPC Process</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-medium text-[#0a1122] mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Start Saving with EPC in 3 Steps</h2>
                            <p className="text-gray-600 mb-10 text-base leading-relaxed max-w-md font-normal">
                                We deliver <span className="text-[#0a1122] font-medium">turnkey solar EPC solutions</span> — from initial structural load tests to net-metering approval — with absolute efficiency.
                            </p>
                            <div className="space-y-0">
                                {[
                                    { num: "01", title: "Engineering", desc: "Site survey, detailed shadow profiling, and customized solar PV design to maximize generational yield." },
                                    { num: "02", title: "Procurement", desc: "Sourcing Tier-1 DCR solar components from highly trusted global brands for guaranteed, durable output." },
                                    { num: "03", title: "Construction", desc: "Expert rooftop installation, testing, followed by net-metering commissioning and 24/7 smart monitoring." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-[#0a1122] text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">{step.num}</div>
                                            {i < 2 && <div className="w-px h-full bg-[#0a1122]/10 my-1"></div>}
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="font-semibold text-[#0a1122] text-lg mb-1.5">{step.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed font-normal">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <ContactForm defaultService="RESIDENTIAL/HOME SOLAR" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reused Testimonials for Social Proof */}
            <Testimonials />
        </>
    );
}
