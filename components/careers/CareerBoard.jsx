"use client";

import { useState } from "react";
import Image from "next/image";
const JOBS = [
    {
        id: "tender-executive",
        title: "Tender Executive",
        location: "Gurgaon, Haryana",
        type: "Full-Time",
        department: "Operations",
        description: "We are looking for a detail-oriented and proactive Tender Executive to manage end-to-end tendering activities for solar EPC projects. The candidate will be responsible for identifying tender opportunities, preparing competitive bids, and coordinating with internal teams to ensure timely submission.",
        responsibilities: [
            "Monitor tender portals such as GeM, Eprocurement, and state DISCOM websites for solar-related tenders",
            "Analyze tender documents (RFP, RFQ, BOQ, technical specs)",
            "Prepare and submit technical and commercial bids for solar rooftop & ground-mounted projects",
            "Coordinate with design, finance, and procurement teams for accurate costing and documentation",
            "Ensure compliance with tender requirements and eligibility criteria",
            "Handle bid documentation such as EMD, tender fees, and certifications",
            "Maintain database of submitted tenders and track status",
            "Participate in pre-bid meetings and clarify queries with clients",
            "Follow up for tender results and post-bid negotiations"
        ],
        requirements: [
            "Bachelor’s degree (B.Tech / B.E. preferred – Electrical, Mechanical, or related field)",
            "Understanding of solar EPC projects (rooftop & utility scale)",
            "Knowledge of tendering processes and government procurement",
            "Familiarity with portals like GeM, eProcurement, and DISCOM websites",
            "Strong skills in MS Excel, Word, and documentation",
            "Good analytical and communication skills",
            "Ability to work under deadlines and handle multiple tenders"
        ]
    },
    {
        id: "solar-technician",
        title: "Solar Technician",
        location: "Ludhiana, Punjab",
        type: "Full-Time",
        department: "Operations",
        description: "We are looking for a skilled and reliable Solar Technician responsible for the installation, maintenance, and troubleshooting of solar power systems. The ideal candidate should have hands-on experience with solar panels, inverters, electrical wiring, and rooftop installations while ensuring safety and quality standards.",
        responsibilities: [
            "Install solar panels, mounting structures, and related electrical components.",
            "Perform site inspections and system setup for residential and commercial solar projects.",
            "Connect and configure solar inverters, batteries, and net metering systems.",
            "Conduct testing, commissioning, and troubleshooting of solar systems.",
            "Perform maintenance and repair of solar installations.",
            "Ensure proper cabling, grounding, and safety compliance during installation.",
            "Coordinate with the engineering and project teams for smooth project execution.",
            "Maintain records of installation work and service reports."
        ],
        requirements: [
            "Knowledge of solar panel installation and electrical wiring.",
            "Understanding of inverters, batteries, and solar system components.",
            "Ability to read basic electrical diagrams and system layouts.",
            "Familiarity with installation tools and safety procedures.",
            "Basic troubleshooting and problem-solving skills."
        ]
    },
    {
        id: "sales-executive",
        title: "Sales Executive",
        location: "Ludhiana, Punjab",
        type: "Full-Time",
        department: "Sales",
        description: "We are looking for a dynamic and target-driven Sales Executive to promote and sell solar energy solutions (rooftop & commercial projects). The candidate will be responsible for generating leads, converting prospects, and building long-term client relationships.",
        responsibilities: [
            "Identify and generate leads for solar rooftop and commercial projects",
            "Conduct client meetings (residential, commercial, industrial customers)",
            "Explain solar solutions, ROI, savings, and subsidy benefits to clients",
            "Prepare proposals, quotations, and presentations",
            "Coordinate with technical team for site survey and system design",
            "Close sales deals and achieve monthly/quarterly targets",
            "Maintain CRM data and track sales pipeline",
            "Stay updated with government policies and solar incentives",
            "Follow up with clients for conversion and post-sales support"
        ],
        requirements: [
            "Bachelor’s degree (any field; B.Tech / BBA preferred)",
            "Strong communication and negotiation skills",
            "Basic understanding of solar energy / renewable sector",
            "Sales mindset with target-oriented approach",
            "Ability to work in field sales and client handling",
            "Knowledge of MS Excel, Word, and CRM tools"
        ]
    }
];

export default function CareerBoard() {
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <section className="bg-slate-50 py-20 pb-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Feature Image */}
                <div className="max-w-5xl mx-auto mb-20 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        Join Our Team
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-lg md:text-xl max-w-4xl mb-10">
                        At Divvy Solar, our employees are our greatest asset, and we foster a collaborative and inclusive work environment that encourages growth, creativity, and the pursuit of excellence. We welcome your interest in building the future of renewable energy with us.
                    </p>

                    <div className="relative w-full h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 border-8 border-white group">
                        <Image
                            src="/we_are_hiring.jpg"
                            alt="We are hiring at Divvy Solar"
                            fill
                            priority
                            quality={100}
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="text-center pt-8 border-t border-gray-100">
                        <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#FECB00] mb-3">
                            Join The Revolution
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black text-[#0f172a]" style={{ fontFamily: "Georgia, serif" }}>
                            Explore Open Positions
                        </h3>
                    </div>
                </div>

                {/* Job Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {JOBS.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(254,203,0,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {job.department}
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {job.type}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-[#0f172a] mb-2 leading-tight group-hover:text-[#FECB00] transition-colors">
                                {job.title}
                            </h3>

                            <div className="flex items-center gap-1.5 text-gray-400 text-sm font-semibold mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {job.location}
                            </div>

                            <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                                {job.description}
                            </p>

                            <button
                                onClick={() => setSelectedJob(job)}
                                className="w-full py-3.5 rounded-xl border-2 border-[#0f172a] text-[#0f172a] font-bold text-sm tracking-wide hover:bg-[#0f172a] hover:text-white transition-all duration-300 mt-auto"
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedJob(null)}
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 sm:p-8 flex justify-between items-start z-10">
                            <div>
                                <h3 className="text-3xl font-black text-[#0f172a] leading-tight mb-2">
                                    {selectedJob.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-[#FECB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {selectedJob.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {selectedJob.type}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="p-2 bg-slate-50 hover:bg-slate-100 text-gray-400 hover:text-gray-600 rounded-full transition-colors flex-shrink-0"
                                aria-label="Close"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-8">
                            <h4 className="text-lg font-bold text-[#0f172a] mb-3">Role Overview</h4>
                            <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">
                                {selectedJob.description}
                            </p>

                            {selectedJob.responsibilities && (
                                <>
                                    <h4 className="text-lg font-bold text-[#0f172a] mb-3">Key Responsibilities</h4>
                                    <ul className="space-y-3 mb-8">
                                        {selectedJob.responsibilities.map((resp, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                                                <svg className="w-5 h-5 text-[#FECB00] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="leading-relaxed">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <h4 className="text-lg font-bold text-[#0f172a] mb-3">Key Requirements</h4>
                            <ul className="space-y-3 mb-10">
                                {selectedJob.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="leading-relaxed">{req}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Call to Action Box */}
                            <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-8 relative overflow-hidden text-center">
                                {/* Abstract graphics */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FECB00] rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>

                                <div className="relative z-10">
                                    <h4 className="text-2xl font-black text-white mb-2">Ready to apply?</h4>
                                    <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                                        To apply for this position, please send your updated resume along with your portfolio/details to our HR team.
                                    </p>

                                    <button
                                        onClick={() => {
                                            const subject = encodeURIComponent(`Application for ${selectedJob.title} - ${selectedJob.location}`);
                                            const body = encodeURIComponent(`Hi Divvy Solar HR Team,\n\nI am interested in the ${selectedJob.title} position at ${selectedJob.location}.\n\nPlease find my resume attached.\n\nRegards`);
                                            window.open(`https://mail.google.com/mail/?view=cm&to=info@divvysolar.in&su=${subject}&body=${body}`, '_blank');
                                        }}
                                        className="inline-flex items-center gap-2 bg-[#FECB00] hover:bg-[#EBB800] text-[#0a1122] px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        Send Email to info@divvysolar.in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
