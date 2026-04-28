import Image from "next/image";
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Client Experiences | Divvy Solar',
    description: 'Read our case studies and what our team members have to say about working at Divvy Solar.',
};

const CASE_STUDIES = [
    {
        id: 1,
        title: "Transforming Industrial Energy Efficiency",
        client: "AgriTech Solutions Ltd.",
        description: "How we helped a leading agricultural processing plant reduce their energy costs by 45% through a custom 500kW rooftop solar installation.",
        image: "/projects/project1.jpg",
        tags: ["Industrial", "Cost Saving", "Rooftop"]
    },
    {
        id: 2,
        title: "Empowering Local Communities",
        client: "Sunrise Educational Trust",
        description: "Implementing a 100kW solar power system for an educational institution, providing uninterrupted power and a hands-on learning experience for students.",
        image: "/projects/project2.jpg",
        tags: ["Commercial", "Education", "Sustainability"]
    },
    {
        id: 3,
        title: "Utility-Scale Solar Farm Innovation",
        client: "GreenState Power Grid",
        description: "A comprehensive look at our 5MW ground-mounted solar project, highlighting the challenges overcome and the innovative tracking technology used.",
        image: "/projects/project3.jpg",
        tags: ["Utility-Scale", "Ground-Mounted", "Innovation"]
    }
];

export default function WhatPeopleSayPage() {
    redirect('/');
    return (
        <main className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-sm font-black text-[#FECB00] uppercase tracking-widest mb-3">Impact & Experiences</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6" style={{ fontFamily: "Georgia, serif" }}>
                            What Our Clients Say
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                            Discover the impact of our work through real-world case studies and messages from our leadership about our mission and culture.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">


                {/* Case Studies Grid */}
                <div className="mb-32">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-2xl font-black text-[#0f172a]" style={{ fontFamily: "Georgia, serif" }}>Selected Case Studies</h3>
                        <div className="h-px bg-gray-200 flex-grow ml-8 hidden md:block"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CASE_STUDIES.map((study) => (
                            <div key={study.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 bg-slate-200">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b] opacity-90"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
                                        <svg className="w-12 h-12 mb-4 text-[#FECB00] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        <h3 className="text-xl font-bold">{study.title}</h3>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-full border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="text-lg font-black text-[#0f172a] mb-2">{study.client}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {study.description}
                                    </p>
                                    <button className="text-[#0f172a] font-bold text-xs uppercase tracking-widest group-hover:text-[#FECB00] transition-colors flex items-center gap-2">
                                        View Project Details
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message From Leadership Section */}
                <div className="mb-32 bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
                    <div className="relative z-10">
                        <span className="text-[#0f172a] font-bold text-xs uppercase tracking-[0.2em] mb-8 block text-center">A MESSAGE TO OUR CLIENTS</span>
                        <div className="flex flex-col gap-12 items-center">
                            <div className="max-w-4xl mx-auto text-center">
                                <svg className="w-12 h-12 text-[#FECB00] mb-8 opacity-30 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                <p className="text-xl md:text-3xl font-medium text-[#0f172a] leading-relaxed mb-10 italic" style={{ fontFamily: "Georgia, serif" }}>
                                    "You are not just our client—you are part of the Divvy Solar family. We are committed to building lasting relationships that go beyond projects, creating trust, happiness, and a brighter future together."
                                </p>
                                <div className="border-t border-gray-100 pt-8 inline-block px-12">
                                    <h4 className="text-2xl font-black text-[#0f172a]">Divvy Solar</h4>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Solar Solution For All</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    );
}
