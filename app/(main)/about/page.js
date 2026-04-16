import PageHero from '@/components/common/PageHero';
import Brands from '@/components/home/Brands';
import Image from 'next/image';
import { LightBulbIcon, ShieldCheckIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'About Us | Divvy Solar',
    description: 'Divvy Solar Power & Solutions Pvt.Ltd. has been the leading provider of EPC services since 2018. Over 16,000+ completed projects.',
    openGraph: {
        title: 'About Divvy Solar | Premium EPC Solutions',
        description: 'Learn about Divvy Solar, a trusted EPC provider since 2018, delivering end-to-end solar solutions across India.'
    }
};

const timelineData = [
    { year: '2018', icon: ShieldCheckIcon, title: 'Inception', desc: 'Divvy Solar began with one goal: to deliver solar EPC projects that are engineered right, installed safely, and built to last.' },
    { year: '2021', icon: LightBulbIcon, title: 'Scaling Up', desc: 'We grew our on-ground teams and processes to execute more commercial and industrial solar installations with faster turnaround and tighter quality control.' },
    { year: '2024', icon: ChartBarIcon, title: 'Proven at Scale', desc: 'With 1000+ projects delivered, we standardized a performance-first approach.' },
    { year: '2026', icon: RocketLaunchIcon, title: "What's Next", desc: 'We’re expanding across India with stronger engineering, smarter monitoring, and dependable O&M, so every system keeps generating, year after year.' },
];

export default function AboutPage() {
    return (
        <main className="bg-white overflow-hidden selection:bg-accent selection:text-white">
            <PageHero
                title="About Us"
                breadcrumb="Our Story"
                backgroundImage="/about_us_main.jpeg"
            />

            {/* ─── Company Overview ─── */}
            <section className="py-16 md:py-20 relative z-10">
                <div className="absolute inset-0 bg-slate-50 opacity-[0.2] pointer-events-none"></div>
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-3">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight leading-[1.1]" style={{ fontFamily: "Georgia, serif" }}>
                            Powering India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">Sustainable Future</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[280px] md:min-h-[380px] shadow-xl group transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1">
                            <Image
                                src="/utility_hero_4k.png"
                                alt="Divvy Solar Setup"
                                fill
                                priority
                                quality={100}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            />
                        </div>

                        <div className="lg:col-span-6 flex flex-col gap-5">
                            <div className="bg-primary p-6 rounded-2xl text-white relative overflow-hidden group shadow-lg transition-transform duration-500 hover:-translate-y-1">
                                <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="relative z-10">
                                    <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-1">8+</div>
                                    <div className="text-sm md:text-base font-bold tracking-wide">Years of Excellence</div>
                                    <p className="text-white/85 mt-1.5 text-xs leading-relaxed max-w-sm">
                                        Founded in 2018, Divvy Solar Power & Solutions Pvt. Ltd. is a leading solar EPC provider serving residential, commercial, and industrial clients across North India. Our mission: to make clean, reliable solar energy accessible through quality engineering, transparent processes, and a relentless focus on customer success.
                                        .
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-md flex flex-col justify-center transition-transform duration-500 hover:-translate-y-1 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                                        <Image src="/dinesh_sir_img.jpeg" alt="Dinesh Ahuja - Director of Divvy Solar" fill className="object-cover" sizes="56px" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-black text-primary leading-tight">DINESH AHUJA</h4>
                                        <p className="text-accent font-bold text-xs tracking-widest uppercase mt-0.5">DIRECTOR</p>
                                    </div>
                                </div>
                                <p className="text-gray-800 italic text-sm leading-relaxed border-l-4 border-accent pl-3 font-semibold">
                                    "Solar should be a long-term asset, not a short-term experiment. At Divvy Solar, we focus on engineering-first design, quality components, and safe execution, so every system delivers reliable generation and real savings. Our promise is simple: A transparent process, disciplined timelines, and measurable performance, backed by monitoring and support beyond commissioning."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Vision & Mission (Premium Editorial Layout) ─── */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-[#030712] selection:bg-[#FECB00] selection:text-black">
                {/* Minimalist Background Grids */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px', backgroundPosition: 'center center' }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FECB00]/5 rounded-full blur-[150px] mix-blend-screen" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Editorial Header */}
                    <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-7">
                            <span className="flex items-center gap-3 text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                                <span className="w-8 h-[1px] bg-white/20"></span>
                                Strategic Direction
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-[1.1]" style={{ fontFamily: "'Century', 'Century Gothic', serif" }}>
                                Engineering India’s <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-[#FECB00] italic pr-2">Clean-Energy Future</span>
                            </h2>
                        </div>
                        <div className="lg:col-span-5 lg:pb-3">
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light border-l border-white/10 pl-6">
                                We are a solar EPC company focused on building reliable, performance-driven solar assets. Through strong engineering, quality procurement, and disciplined execution, we help homes, businesses, and industries move toward lower energy costs and a more sustainable future.
                            </p>
                        </div>
                    </div>

                    {/* Premium Minimalist Layout */}
                    <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                        {/* Vision Card */}
                        <div className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
                                        <LightBulbIcon className="w-5 h-5 text-white/80 group-hover:text-[#FECB00] transition-colors duration-500" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 group-hover:text-white/80 transition-colors">Our Vision</span>
                                </div>
                                <span className="text-3xl font-black text-white/[0.05] pointer-events-none group-hover:text-white/[0.1] transition-colors" style={{ fontFamily: "'Century', serif" }}>01</span>
                            </div>

                            <h3 className="text-2xl font-normal text-white mb-4 tracking-tight" style={{ fontFamily: "'Century', serif" }}>
                                Make Solar the First Choice
                            </h3>

                            <p className="text-white/50 text-sm leading-relaxed font-light">
                                We envision an India where on-grid solar power is the default for homes and businesses, trusted for its savings, reliability, and environmental impact. By delivering consistent quality and transparent execution, we aim to make clean energy accessible at scale.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#FECB00]/5 to-transparent border border-[#FECB00]/10 p-8 transition-all duration-500 hover:from-[#FECB00]/10 hover:border-[#FECB00]/30">
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FECB00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-[#FECB00]/20 flex items-center justify-center bg-[#FECB00]/10 shadow-[0_0_15px_rgba(254,203,0,0.1)]">
                                        <RocketLaunchIcon className="w-5 h-5 text-[#FECB00]" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#FECB00]/70 group-hover:text-[#FECB00] transition-colors">Our Mission</span>
                                </div>
                                <span className="text-3xl font-black text-[#FECB00]/[0.05] pointer-events-none group-hover:text-[#FECB00]/[0.1] transition-colors" style={{ fontFamily: "'Century', serif" }}>02</span>
                            </div>

                            <h3 className="text-2xl font-normal text-white mb-4 tracking-tight leading-snug" style={{ fontFamily: "'Century', serif" }}>
                                Deliver Solar That Performs
                            </h3>

                            <p className="text-white/50 text-sm leading-relaxed font-light">
                                Our mission is to provide end-to-end solar EPC solutions, from survey and design to commissioning and O&M, so every project delivers measurable output, safer operations, and long-term ROI for residential, commercial, industrial, and utility-scale customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Timeline ─── */}
            <section className="py-14 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.04),transparent_50%)] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                            Our Journey
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-primary tracking-tight leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                            A Legacy of <span className="text-accent">Progress & Innovation</span>
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Horizontal connecting line — desktop */}
                        <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] z-0" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0 10%, #FECB00 50%, #e2e8f0 90%, transparent)' }} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {timelineData.map((item, i) => (
                                <div key={i} className="group relative flex flex-col items-center lg:items-start text-center lg:text-left">

                                    {/* Year bubble — sits ON the line */}
                                    <div className="relative z-10 flex flex-col items-center mb-5">
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                            style={{
                                                background: i === timelineData.length - 1
                                                    ? 'linear-gradient(135deg, #FECB00, #f5b800)'
                                                    : 'linear-gradient(135deg, #0a1122, #1e3a5f)',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 0 0 4px #f8fafc',
                                            }}
                                        >
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span
                                            className="text-sm font-black px-3 py-0.5 rounded-full"
                                            style={{
                                                background: i === timelineData.length - 1 ? 'rgba(254,203,0,0.12)' : 'rgba(10,17,34,0.07)',
                                                color: i === timelineData.length - 1 ? '#FECB00' : '#0a1122',
                                                border: `1px solid ${i === timelineData.length - 1 ? 'rgba(254,203,0,0.3)' : 'rgba(10,17,34,0.1)'}`,
                                            }}
                                        >
                                            {item.year}
                                        </span>
                                    </div>

                                    {/* Card */}
                                    <div
                                        className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-400 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-accent/20 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #FECB00, transparent)' }} />
                                        <h4 className="text-base font-black text-primary mb-1.5">{item.title}</h4>
                                        <p className="text-gray-700 text-xs leading-relaxed">{item.desc}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Brands />
        </main>
    );
}