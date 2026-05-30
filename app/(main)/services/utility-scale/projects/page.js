import PageHero from '@/components/common/PageHero';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Utility Scale Project Showcase',
    description: 'Explore our multi-megawatt utility scale solar projects across India. Bankable assets, MW-scale EPC expertise, and high-yield performance.',
};

const projects = [
    {
        id: "khudiya-rajasthan",
        title: "Rajasthan 6.0 MW Ground Mounted",
        location: "Khudiya, Chirawa",
        capacity: "6.0 MW",
        type: "Utility Scale",
        image: "/har1_main.webp",
        stats: [
            { label: "Execution Time", value: "6 Months" },
            { label: "Module Technology", value: "Bifacial Mono PERC" },
            { label: "Annual Yield", value: "10.8 GWh" }
        ],
        description: "A large-scale ground-mounted solar farm designed for maximum land utilization and high energy harvesting in the desert environment of Rajasthan."
    },
    {
        id: "umra-hansi",
        title: "Haryana 2.5 MW Independent Plant",
        location: "Umra, Hansi",
        capacity: "2.5 MW",
        type: "Utility Scale",
        image: "/2.5 MW village umra hansi harayan.webp",
        stats: [
            { label: "Execution Time", value: "4 Months" },
            { label: "Grid Voltage", value: "11 kV" },
            { label: "Performance Ratio", value: "82%" }
        ],
        description: "This 2.5 MW project serves as a prime example of decentralized utility solar, feeding clean power directly into the local grid with superior efficiency."
    },
    {
        id: "hisar-chaudhariwas",
        title: "Hisar 900 kW Industrial Utility",
        location: "Chaudhariwas, Hisar",
        capacity: "900 kW",
        type: "Large Industrial",
        image: "/900 kw chaudhariwas hisar haryana.webp",
        stats: [
            { label: "Structure", value: "Fixed Tilt" },
            { label: "Inverter Type", value: "Centralized" },
            { label: "Monitoring", value: "24/7 Remote SCADA" }
        ],
        description: "A specialized utility-scale installation for a large industrial complex, optimizing energy costs through a captive solar model."
    }
];

export default function UtilityProjectsPage() {
    return (
        <div className="bg-[#0a1122] min-h-screen text-white">
            <PageHero 
                title="Utility Project Showcase"
                breadcrumb="Utility Projects"
                backgroundImage="/utility_hero_4k.webp"
            />

            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <span className="text-[#FECB00] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Proven Performance</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                        MW-Scale Solar Landmarks
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore our bankable solar assets that define engineering excellence and high-yield performance across the Indian landscape.
                    </p>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full relative">
                                <div className="aspect-[16/10] relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        quality={85}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-transparent to-transparent opacity-60" />
                                    
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-[#FECB00] text-[#0a1122] px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase shadow-xl">
                                            {project.capacity}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Ambient Glow */}
                                <div className="absolute -inset-4 bg-[#FECB00]/5 blur-3xl rounded-full z-[-1]" />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>{project.title}</h3>
                                    <p className="text-[#FECB00] font-bold tracking-wider text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-lg leading-relaxed font-normal">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/10">
                                    {project.stats.map((stat, sIdx) => (
                                        <div key={sIdx}>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                                            <div className="text-white font-bold text-lg">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <Link 
                                        href="/contact" 
                                        className="inline-flex items-center gap-3 bg-white/5 hover:bg-[#FECB00] hover:text-[#0a1122] border border-white/10 px-8 py-4 rounded-xl transition-all duration-300 font-bold tracking-wide"
                                    >
                                        Discuss Your MW Project
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-gradient-to-b from-[#0a1122] to-black border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Georgia, serif' }}>Ready to Scale with Solar?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Whether you are looking for a PPA model, a Captive solar farm, or a grid-connected utility project, Divvy Solar has the execution capability to deliver.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-[#FECB00] text-[#0a1122] px-10 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl hover:scale-105 transition-all">
                            GET A CUSTOM QUOTE
                        </Link>
                        <Link href="/about" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-white/10 transition-all">
                            LEARN ABOUT OUR EPC
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
