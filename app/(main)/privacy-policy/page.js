import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheckIcon, 
    LockClosedIcon, 
    DocumentCheckIcon, 
    EnvelopeIcon, 
    PhoneIcon, 
    MapPinIcon,
    CheckBadgeIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Privacy Policy | Divvy Solar Power & Solutions Pvt. Ltd.',
    description: 'Official Privacy Policy of Divvy Solar Power & Solutions Pvt. Ltd. Read our transparent data security, privacy practices, and compliance standards for solar EPC services.',
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "October 16, 2026";

    const keyHighlights = [
        {
            title: "Zero Data Selling",
            desc: "We never sell, rent, or trade your contact info or electricity bills to third-party telemarketers.",
            icon: LockClosedIcon
        },
        {
            title: "Ad Standards Compliant",
            desc: "100% compliant with Google Ads and Meta advertisement user safety regulations.",
            icon: CheckBadgeIcon
        },
        {
            title: "Govt & DISCOM Filing",
            desc: "Electricity consumer numbers are only used for solar net-metering approvals and subsidy claims.",
            icon: DocumentCheckIcon
        },
        {
            title: "End-to-End Encryption",
            desc: "All site communication and submitted queries are protected with SSL / TLS 1.3 encryption.",
            icon: ShieldCheckIcon
        }
    ];

    return (
        <main className="bg-slate-50 min-h-screen text-slate-800">
            {/* ─── Premium 3D Solar Universe Hero Banner ─── */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#070b18] text-white">
                
                {/* 3D Sun Flare Aura */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FECB00]/25 via-[#FECB00]/5 to-transparent rounded-[100%] blur-[90px] pointer-events-none" />
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FFF2A3] rounded-full blur-[80px] opacity-70 pointer-events-none" />

                {/* 3D Isometric Solar Farm Rooftop Horizon (Left & Right Wings) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {/* Left Wing Solar Array */}
                    <div 
                        className="absolute -left-12 top-10 w-[380px] h-[220px] hidden md:block"
                        style={{
                            transform: 'perspective(800px) rotateX(55deg) rotateY(15deg) rotateZ(-20deg)',
                            background: 'repeating-linear-gradient(0deg, rgba(30, 58, 138, 0.5) 0px, rgba(30, 58, 138, 0.5) 30px, rgba(254, 203, 0, 0.4) 31px, rgba(15, 23, 42, 0.8) 33px), repeating-linear-gradient(90deg, rgba(30, 58, 138, 0.4) 0px, rgba(30, 58, 138, 0.4) 45px, rgba(255, 255, 255, 0.15) 46px)',
                            border: '1.5px solid rgba(254, 203, 0, 0.3)',
                            borderRadius: '12px',
                            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(254, 203, 0, 0.15) inset'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Right Wing Solar Array */}
                    <div 
                        className="absolute -right-12 top-10 w-[380px] h-[220px] hidden md:block"
                        style={{
                            transform: 'perspective(800px) rotateX(55deg) rotateY(-15deg) rotateZ(20deg)',
                            background: 'repeating-linear-gradient(0deg, rgba(30, 58, 138, 0.5) 0px, rgba(30, 58, 138, 0.5) 30px, rgba(254, 203, 0, 0.4) 31px, rgba(15, 23, 42, 0.8) 33px), repeating-linear-gradient(90deg, rgba(30, 58, 138, 0.4) 0px, rgba(30, 58, 138, 0.4) 45px, rgba(255, 255, 255, 0.15) 46px)',
                            border: '1.5px solid rgba(254, 203, 0, 0.3)',
                            borderRadius: '12px',
                            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(254, 203, 0, 0.15) inset'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Infinite 3D Energy Grid Perspective Floor */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 h-[260px]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(254, 203, 0, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(254, 203, 0, 0.12) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                            transform: 'perspective(500px) rotateX(65deg) translateY(60px)',
                            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
                            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)'
                        }}
                    />
                </div>

                {/* Floating Energy Particles (Pure CSS) */}
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FECB00] shadow-[0_0_10px_#FECB00] animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa] animate-ping opacity-60" style={{ animationDuration: '4s' }} />
                <div className="absolute top-20 right-1/3 w-1 h-1 rounded-full bg-[#FECB00] shadow-[0_0_8px_#FECB00]" />

                <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
                    
                    {/* Center 3D Floating Solar Satellite Beacon */}
                    <div className="inline-flex items-center justify-center mb-5">
                        <div className="relative flex items-center justify-center">
                            
                            {/* Glowing Orbit Ring */}
                            <div 
                                className="absolute w-36 h-36 rounded-full border border-[#FECB00]/30 animate-spin pointer-events-none"
                                style={{ animationDuration: '18s' }}
                            >
                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FECB00] shadow-[0_0_10px_#FECB00]" />
                            </div>

                            {/* Center Glass Shield Container with 3D Depth */}
                            <div 
                                className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl p-[2px] shadow-[0_20px_50px_rgba(254,203,0,0.35)] transition-transform duration-500 hover:scale-110"
                                style={{
                                    background: 'linear-gradient(135deg, #FECB00, rgba(255,255,255,0.4), #0e1b3d)'
                                }}
                            >
                                <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-[#101f46] to-[#070b18] backdrop-blur-xl flex items-center justify-center relative overflow-hidden border border-white/20 p-2.5">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FECB00]/25 via-transparent to-white/20 pointer-events-none" />
                                    
                                    {/* Divvy Solar Official Triangle Sun & Panel Emblem (Centered & Clean) */}
                                    <div className="relative w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center overflow-hidden border border-white/50">
                                        <Image
                                            src="/divvy symbol .jpeg"
                                            alt="Divvy Solar Symbol"
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FECB00]/30 text-[#FECB00] text-xs font-bold tracking-wider uppercase shadow-[0_4px_20px_rgba(254,203,0,0.15)]">
                            <SparklesIcon className="w-3.5 h-3.5 text-[#FECB00]" />
                            Statutory &amp; Legal Compliance Standards
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Privacy Policy
                    </h1>

                    <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                        Transparent client data protection standards by <strong className="text-white font-bold">Divvy Solar Power &amp; Solutions Pvt. Ltd.</strong>
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#FECB00] font-semibold bg-[#FECB00]/10 px-4 py-1 rounded-full border border-[#FECB00]/25 shadow-sm">
                        <span>Last Verified &amp; Updated: {lastUpdated}</span>
                    </div>
                </div>
            </section>

            {/* ─── Highlights Cards (Lightweight 3D Depth & Hover Tilt) ─── */}
            <section className="max-w-5xl mx-auto px-6 sm:px-8 -mt-9 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {keyHighlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={idx} 
                                className="group bg-white p-5 rounded-2xl border border-slate-200/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(14,27,61,0.18)] hover:border-[#FECB00]/50 relative overflow-hidden flex flex-col justify-between"
                                style={{
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
                                }}
                            >
                                {/* Top 3D accent gradient strip */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FECB00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div>
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fefcf0] to-[#fef08a]/40 border border-[#FECB00]/30 text-[#b48c00] flex items-center justify-center mb-3.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-5 h-5 text-[#9a7300]" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm tracking-tight" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ─── Policy Content Article ─── */}
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
                <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200/90 space-y-10 leading-relaxed text-slate-700 text-sm sm:text-base">
                    
                    {/* Section 1 */}
                    <section className="space-y-3 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">1</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Introduction &amp; Scope</h2>
                        </div>
                        <p className="pt-2 text-slate-600">
                            This Privacy Policy sets out the data processing and privacy practices of <strong className="text-slate-900">Divvy Solar Power &amp; Solutions Pvt. Ltd.</strong> (&quot;Divvy Solar&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) across our website (<strong className="text-slate-900">divvysolar.in</strong>), web calculators, solar quotation generators, and customer advisory platforms.
                        </p>
                        <p className="text-slate-600">
                            By requesting a solar proposal, submitting inquiry forms, or booking a rooftop engineering survey, you consent to the legitimate collection and use of your information as outlined in this policy.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">2</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Information We Collect</h2>
                        </div>
                        <p className="text-slate-600">
                            To engineer precise solar photovoltaic (PV) systems, we collect relevant technical and contact parameters:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                    <DocumentCheckIcon className="w-4 h-4 text-[#EBB800]" />
                                    Personal &amp; Site Details
                                </h3>
                                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                                    <li>Customer Name &amp; Organization Name</li>
                                    <li>Contact Number, WhatsApp number &amp; Email ID</li>
                                    <li>Site address, City, State, and PIN code</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                    <LockClosedIcon className="w-4 h-4 text-[#EBB800]" />
                                    Energy &amp; Utility Data
                                </h3>
                                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                                    <li>Average monthly electricity expenditure &amp; consumption units</li>
                                    <li>Sanctioned / Connected load &amp; DISCOM consumer number</li>
                                    <li>Roof type (RCC Concrete Flat, Industrial Metal Shed, Ground)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">3</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>How We Use Your Information</h2>
                        </div>
                        <p className="text-slate-600">Your information is used strictly to deliver comprehensive Solar EPC solutions:</p>
                        <ul className="space-y-2.5 list-disc list-inside text-slate-700 text-sm">
                            <li><strong>System Sizing &amp; Financial Payback:</strong> Engineering optimum kWp plant capacity, module count, and financial ROI projections.</li>
                            <li><strong>On-Site Rooftop Audits:</strong> Coordinating certified solar engineers for physical structural inspection, 3D shadow analysis, and cable pathway routing.</li>
                            <li><strong>DISCOM Net-Metering &amp; Grid Tie Approvals:</strong> Submitting statutory interconnection paperwork to local state power utilities (such as DHBVN, UHBVN, PSPCL, BSES, etc.).</li>
                            <li><strong>Central Solar Subsidy Assistance:</strong> Guiding eligible residential customers through the National PM Surya Ghar Muft Bijli Yojana portal.</li>
                            <li><strong>Plant Commissioning &amp; Remote Monitoring:</strong> Providing warranty coverage, scheduled AMC visits, and inverter cloud monitoring support.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">4</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Google Ads, Meta &amp; Cookies Policy</h2>
                        </div>
                        <p className="text-slate-600">
                            We run digital advertising campaigns across Google Search, YouTube, and Meta Platforms (Facebook &amp; Instagram) to raise awareness about solar energy adoption:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-slate-700 text-sm">
                            <li><strong>Conversion Tracking:</strong> We utilize standard conversion tags (Google Ads Tag &amp; Meta Pixel) to measure ad performance and prevent irrelevant repeat advertisements.</li>
                            <li><strong>Strict Confidentiality:</strong> Data submitted via Google Lead Forms or Facebook Lead Ads is encrypted and routed exclusively into our private internal CRM.</li>
                            <li><strong>No Third-Party Sharing:</strong> We do not share customer data with brokers, affiliate networks, or marketing agencies for unrelated offers.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">5</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Data Security &amp; Retention</h2>
                        </div>
                        <p className="text-slate-600">
                            We enforce robust technical and operational security controls to protect client information against unauthorized access, loss, or misuse. All communications via our web portal are secured with TLS 1.3 encryption. Customer documents are archived in secure, access-controlled databases and retained only for the duration required by statutory warranty and tax regulations.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#0e1b3d] text-white flex items-center justify-center font-bold text-sm">6</span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Your Privacy Rights</h2>
                        </div>
                        <p className="text-slate-600">
                            You have the right to request access to the data we hold regarding your solar project, request corrections to your contact info or address, or ask for the deletion of your consultation record if you decide not to proceed. You may reach out to us at any time using the contact channels below.
                        </p>
                    </section>

                    {/* Section 7: Verified Corporate Contact Card */}
                    <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-[#FECB00]">
                            <EnvelopeIcon className="w-5 h-5" />
                            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider" style={{ fontFamily: "Georgia, serif" }}>Contact Our Compliance Team</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300">
                            For any privacy inquiries, official notices, or data-related assistance, please get in touch with our office:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 text-xs sm:text-sm text-slate-300">
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-[#FECB00] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white block text-sm">Corporate Head Office</strong>
                                    Lower Ground, SJ Tower, Sec-13, Dabra Road, Hisar, Haryana - 125001
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-[#FECB00] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white block text-sm">Gurgaon Co-Office</strong>
                                    Unit-859, Tower-B1, 8th Floor, Spaze I-Tech Park, Sec-49, Gurgaon - 122018
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <PhoneIcon className="w-5 h-5 text-[#FECB00] shrink-0" />
                                <div>
                                    <span className="text-slate-400">Direct Phone: </span>
                                    <a href="tel:+919254986321" className="text-white font-bold hover:text-[#FECB00] transition-colors">+91-9254986321</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <EnvelopeIcon className="w-5 h-5 text-[#FECB00] shrink-0" />
                                <div>
                                    <span className="text-slate-400">Official Email: </span>
                                    <a href="mailto:info@divvysolar.in" className="text-white font-bold hover:text-[#FECB00] transition-colors">info@divvysolar.in</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-4">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0e1b3d] hover:bg-[#1a2e63] text-white text-xs font-bold transition-all shadow-md hover:scale-105"
                        >
                            ← Back to Divvy Solar Home
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

