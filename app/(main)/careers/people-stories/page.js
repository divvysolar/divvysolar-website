import Image from "next/image";

export const metadata = {
    title: 'Life at Divvy Solar | Divvy Solar',
    description: 'Meet the visionary leaders driving the green energy revolution at Divvy Solar.',
};

const STORIES = [
    {
        id: 1,
        name: "Dinesh Ahuja",
        role: "Chief Executive Officer",
        quote: "We are not just installing solar panels; we are building a sustainable Divvy Solar was built on a simple belief,that clean energy should not be a choice, but a standard. Every installation we deliver is a step toward a more self-reliant and sustainable future.egacy for future generations.",
        story: "CEO of Divvy Solar, envisioned a future where businesses and communities take control of their energy with confidence. What began as a mission to make solar more accessible has evolved into a company delivering reliable, high-quality EPC solutions. Driven by purpose and long-term vision, he has shaped Divvy Solar into a trusted partner for a cleaner, more efficient future and balancing innovation, trust, and execution to drive sustained growth and meaningful impact.",
        image: "/dinesh_sir_img.jpeg"
    },
    {
        id: 2,
        name: "Dhananjay Arora",
        role: "Director",
        quote: "Innovation, integrity, and execution excellence are the pillars of Divvy Solar. Our focus is to deliver reliable solar EPC solutions with quality, transparency, and long-term performance for every client.",
        story: "As a Director at Divvy Solar Power & Solutions Pvt. Ltd., Dhananjay Arora plays a key role in driving strategic planning, business development, and operational excellence. With strong expertise in market research, leadership, and data-driven decision-making, he helps strengthen Divvy Solar’s growth across residential, commercial, and industrial solar projects.",
        image: "/dhanajay sir img.jpeg"
    },
    {
        id: 3,
        name: "Sonam Verma",
        role: "Marketing Head",
        quote: "Every solar installation represents a step toward a more sustainable future. My focus is to ensure that this impact is effectively communicated, creating awareness, trust, and long-term value for our customers.",
        story: "Sonam Verma leads the marketing function at Divvy Solar, driving strategic initiatives that strengthen the company’s brand presence and market positioning. She plays a key role in aligning innovative renewable energy solutions with customer needs through data-driven campaigns and targeted outreach.",
        image: "/sonam mam.png"
    },
    {
        id: 4,
        name: "Chandan Pathak",
        role: "Project Manager",
        quote: "Excellence in execution comes from planning, precision, and an uncompromising commitment to quality and ensuring every project stands as a benchmark.",
        story: "Project Manager at Divvy Solar, leads the end-to-end execution of solar EPC projects with a focus on precision, efficiency, and quality. His disciplined approach ensures every installation is delivered on time, within budget, and to the highest safety standards.With strong technical expertise and attention to detail, he plays a key role in maintaining consistent project excellence and delivering reliable outcomes for every client.",
        image: "/chandan img.jpeg"
    }
];

export default function LifeAtDivvyPage() {
    return (
        <main className="bg-white py-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-sm font-black text-[#FECB00] uppercase tracking-widest mb-3">Our Culture</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6" style={{ fontFamily: "Georgia, serif" }}>
                        Life at Divvy Solar
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Meet the brilliant minds driving the renewable energy revolution at Divvy Solar. Discover their journeys, passions, and what makes working here special.
                    </p>
                </div>

                <div className="space-y-24">
                    {STORIES.map((story, index) => (
                        <div key={story.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-12 lg:gap-20`}>
                            {/* Image side */}
                            <div className="w-full md:w-[40%]">
                                <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-xl">
                                    {story.image ? (
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                            <svg className="w-20 h-20 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent z-10"></div>
                                    {/* Abstract decoration */}
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="text-white font-black text-2xl tracking-wide">{story.name}</div>
                                        <div className="text-[#FECB00] font-bold text-sm uppercase tracking-wider">{story.role}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="w-full md:w-[50%]">
                                <svg className="w-12 h-12 text-[#FECB00] mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                <blockquote className="text-2xl md:text-3xl font-medium text-[#0f172a] mb-8 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                                    "{story.quote}"
                                </blockquote>
                                <div className="w-12 h-1 bg-[#FECB00] mb-8"></div>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {story.story}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
