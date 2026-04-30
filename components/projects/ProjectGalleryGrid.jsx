"use client";

import { useState } from "react";
import Image from "next/image";

const GALLERY_PROJECTS = [
    { id: "hisar-chaudhariwas", city: "Chaudhariwas, Hisar", state: "Haryana", capacity: "900 kW", type: "Utility Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/900 kw chaudhariwas hisar haryana.jpeg", },
    { id: "hisar-ramsons", city: "Sector 27/28, Hisar", state: "Haryana", capacity: "320 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/WhatsApp Image 2026-04-22 at 15.22.45.jpeg", },
    { id: "hansi-fortune-poultry", city: "Ramayan, Hansi", state: "Haryana", capacity: "250 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/ramsons.jpeg", },
    { id: "umra-hansi", city: "Umra, Hansi", state: "Haryana", capacity: "2.5 MW", type: "Utility Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/2.5 MW village umra hansi harayan.jpeg", },
    { id: "khudiya-rajasthan", city: "Khudiya, Chirawa", state: "Rajasthan", capacity: "6.0 MW", type: "Utility Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/har1_main.jpeg", },
    { id: "hisar-sec911", city: "Sector 9-11, Hisar", state: "Haryana", capacity: "400 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/sec 9 11 hisar 400kw .jpeg", },
    { id: "ludhiana-golden-plywood", city: "Hambran, Ludhiana", state: "Punjab", capacity: "500 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/500 kw  golden plywood hmbran ludhiana.jpeg", },
    { id: "hansi-surya-polyflex", city: "Hansi, Hisar", state: "Haryana", capacity: "500 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/surya polyflex 500 kw hansi  .jpeg", },
    { id: "bhiwani-barwa", city: "Barwa, Bhiwani", state: "Haryana", capacity: "300 kW", type: "Industrial Scale Project", builder: "Divvy Solar EPC", status: "Live & Operational", image: "/300 kw barwa bhiwani harayana.jpeg", }
];

export default function ProjectGalleryGrid() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="pt-12 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FECB00] mb-4">
                        Project Showcase
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-6" style={{ fontFamily: "Georgia, serif" }}>
                        Our Milestone Projects
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Explore our high-quality solar EPC projects. Every installation is built for maximum efficiency and long-term durability.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GALLERY_PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-[4/3] bg-gray-200"
                            onClick={() => setSelectedImage(project)}
                        >
                            {/* Image Background */}
                            <Image
                                src={project.image}
                                alt={`${project.city} Solar Project`}
                                fill
                                className={`object-cover transition-transform duration-700 group-hover:scale-110 ${project.rotate === 90 ? "rotate-90 scale-150" : project.rotate === -90 ? "-rotate-90 scale-150" : ""}`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Top Badges */}
                            <div className="absolute top-5 left-5 right-5 flex justify-between items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white bg-black/40 backdrop-blur-md border border-white/10">
                                    {project.type}
                                </span>
                                <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-[#0f172a] bg-[#FECB00] shadow-lg">
                                    {project.capacity}
                                </span>
                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-2xl font-black text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.city}
                                </h3>
                                <p className="text-white/70 text-sm font-medium mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {project.state}, India
                                </p>

                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        {project.status}
                                    </span>
                                    <span className="text-[10px] text-white/75 uppercase tracking-widest font-bold">
                                        Divvy Certified
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-colors z-10"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-default animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.image}
                            alt={`${selectedImage.city} High-Res`}
                            fill
                            sizes="100vw"
                            className={`object-contain bg-black ${selectedImage.rotate === 90 ? "rotate-90 scale-125" : selectedImage.rotate === -90 ? "-rotate-90 scale-125" : ""}`}
                            quality={100}
                        />
                        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 px-6 py-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white shadow-2xl">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-[#FECB00] text-[#0f172a] text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm">
                                    {selectedImage.type}
                                </span>
                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                                    {selectedImage.capacity}
                                </span>
                            </div>
                            <p className="font-black text-2xl sm:text-3xl tracking-tight text-white mb-1">
                                {selectedImage.city} Installation
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <p className="text-sm font-medium text-amber-500">{selectedImage.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
