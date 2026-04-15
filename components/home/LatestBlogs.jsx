import Link from 'next/link';
import Image from 'next/image';

const LatestBlogs = ({ blogs = [] }) => {
    // Exact content from screenshots
    const displayBlogs = blogs.length > 0 ? blogs : [
        {
            _id: '1',
            title: 'Unlocking Solar Potential in India: Key Trends & Insights for Homes, Businesses & Enterprises in 2025!',
            slug: 'solar-potential-in-india-2026-key-trends-insights',
            excerpt: 'Are you ready to embrace the sunshine and transform your homes and businesses? As we know, India is taking steps towards solar power with great confidence. It presents a valuable opportunity for large industries, enterprises, and homeowners. Divvy Solar has emerged as an influential partner in Haryana, Punjab, Chandigarh, and is now expanding into Gurgaon. [...]',
            image: '/utility_hero_4k.png',
            author: 'Divvy Expert',
            createdAt: '2025-04-14'
        },
        {
            _id: '2',
            title: 'Solar Power Is The Future: Why Now Is the Ideal Time to Transition (2025 Edition)',
            slug: 'solar-power-is-the-future-2026',
            excerpt: 'As the world rapidly moves toward a more sustainable future, technological advancements are transforming the energy landscape. Solar power is no longer just an alternative but a central component of how we produce and consume energy. Divvy Solar helps cut costs and emphasise environmental responsibility — transitioning to solar is now a strategic decision. [...]',
            image: '/utility_intro_4k.png',
            author: 'Divvy Expert',
            createdAt: '2025-04-14'
        },
        {
            _id: '3',
            title: 'Mastering EPC Solutions in Solar Energy: A 2025 Guide',
            slug: 'epc-solutions-in-solar-energy-2026',
            excerpt: 'Everyone is talking about a global shift toward renewable energy. An experienced EPC company helps you with a successful solar system installation — the backbone of whether you want a rooftop system or a large solar farm. In this blog, we break down everything you need to know about professional EPC services for 2025. [...]',
            image: '/uti1_main.jpeg',
            author: 'Divvy Expert',
            createdAt: '2025-04-14'
        }
    ];

    return (
        <section className="pt-8 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Exact Antigravity "Professional" Header Replication */}
                <div className="relative text-center mb-10 px-4 py-6 overflow-hidden rounded-3xl">
                    {/* Animated Darker Blue Particles Effect from Reference */}
                    {/* Animated Darker Particles Effect - Faster, Darker, and more Scattered */}
                    <div className="absolute inset-x-0 -top-4 bottom-0 z-0 opacity-[0.4] pointer-events-none animate-dots" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #111827 2.5px, transparent 0)', backgroundSize: '80px 80px' }} />

                    <div className="relative z-10 w-full max-w-4xl mx-auto">
                        {/* The clean, uniform heading */}
                        <h2 className="text-[44px] md:text-[56px] font-normal text-[#111827] mb-6 tracking-[-0.01em] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                            Latest News
                        </h2>

                        {/* Clean, Uniform Description Text matching the AI reference font/spacing */}
                        <p className="text-[#374151] mx-auto text-[17px] md:text-[19px] leading-[1.65] font-normal" style={{ wordSpacing: '0.05em' }}>
                            Divvy Solar shares practical insights to help homeowners and businesses make informed decisions about solar. Explore our latest solar project updates, solar guides, and industry news.
                        </p>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayBlogs.map((blog) => (
                        <article key={blog._id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:bg-[#f8fafc] hover:border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] h-full">

                            {/* Image Container with Floating Badge */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                />

                                {/* Floating Date Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                                        <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary">
                                            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Glass Overlay on Hover */}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 flex-1 flex flex-col bg-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-6 h-[1px] bg-gray-300"></span>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-700">Insight</span>
                                </div>

                                <h3 className="text-xl font-normal text-gray-900 mb-4 leading-snug group-hover:text-primary transition-colors duration-300 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-700 text-[15px] font-normal leading-[1.8] mb-10 line-clamp-4 flex-1">
                                    {blog.excerpt}
                                </p>

                                {/* Action Footer */}
                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <Link
                                        href={`/blogs/${blog.slug}`}
                                        className="flex items-center gap-3 group/btn"
                                    >
                                        <span className="text-[12px] font-black uppercase tracking-[2px] text-primary group-hover/btn:tracking-[3px] transition-all duration-300">
                                            LEARN MORE
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all duration-300">
                                            <svg
                                                className="w-4 h-4 text-primary group-hover/btn:text-white transition-colors duration-300"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
