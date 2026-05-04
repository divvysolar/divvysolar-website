import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PEOPLE } from "@/components/careers/peopleData";

export function generateStaticParams() {
    return PEOPLE.map((p) => ({
        slug: p.slug,
    }));
}

export async function generateMetadata({ params }) {
    const person = PEOPLE.find((p) => p.slug === params.slug);
    if (!person) return {};
    return {
        title: `${person.name} - ${person.role} | Divvy Solar`,
        description: person.description,
        openGraph: {
            title: `${person.name} | Divvy Solar`,
            description: person.description,
            images: [person.image],
        }
    };
}

export default function PersonPage({ params }) {
    const person = PEOPLE.find((p) => p.slug === params.slug);

    if (!person) {
        notFound();
    }

    return (
        <main className="bg-[#f8fafc] min-h-screen py-16 pb-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-[#1e3a8a] font-bold uppercase tracking-wider text-xs mb-10 flex items-center space-x-2">
                    <Link href="/careers" className="hover:underline">CAREERS</Link>
                    <span>&gt;</span>
                    <Link href="/careers/people-stories" className="hover:underline">PEOPLE STORIES</Link>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Left: Image (Portrait Style) */}
                    <div className="w-full lg:w-2/5 shrink-0 lg:sticky lg:top-24">
                        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100">
                            <Image
                                src={person.image}
                                alt={person.name}
                                fill
                                className={`object-cover ${person.imageClass ? person.imageClass.replace('group-hover:scale-105', '').replace('group-hover:scale-[1.20]', '') : 'object-center'}`}
                                priority
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-3/5 pt-4">
                        <span className="inline-block text-xs font-black uppercase tracking-widest text-[#1e3a8a] bg-blue-50 px-4 py-1.5 rounded-full mb-6">
                            {person.role}
                        </span>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                            Meet {person.name}
                        </h1>
                        
                        <div className="w-16 h-1 bg-[#FECB00] mb-8 rounded-full"></div>

                        <div className="max-w-none">
                            <p className="text-lg md:text-xl font-medium text-slate-800 leading-snug mb-6 border-l-4 border-[#1e3a8a] pl-5 py-1" style={{ fontFamily: "Georgia, serif" }}>
                                "{person.quote || person.description}"
                            </p>

                            <div className="space-y-6 text-[17px] leading-relaxed text-slate-600">
                                {person.impact && person.impact.map((section, i) => (
                                    <div key={i} className="bg-white/50 p-6 rounded-2xl border border-gray-100/50 shadow-sm">
                                        <h3 className="text-lg font-bold text-[#0f172a] mb-2" style={{ fontFamily: "Georgia, serif" }}>
                                            {section.title}
                                        </h3>
                                        <p>
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
