import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ blog }) => {
    return (
        <article className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:bg-[#f8fafc] hover:border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] h-full">

            {/* Image Container with Floating Badge */}
            <div className="relative h-64 overflow-hidden">
                {blog.image ? (
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                        No Image Available
                    </div>
                )}

                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100/50">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
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
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Insight</span>
                </div>

                <h2 className="text-xl font-semibold text-[#0a101f] mb-4 leading-snug group-hover:text-primary transition-colors duration-300 tracking-tight">
                    <Link href={`/blogs/${blog.slug}`} className="focus:outline-none">
                        {blog.title}
                    </Link>
                </h2>

                <p className="text-gray-600 text-[15px] font-light leading-[1.8] mb-10 line-clamp-4 flex-1">
                    {blog.excerpt}
                </p>

                {/* Action Footer */}
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex items-center gap-3 group/btn focus:outline-none"
                    >
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-hover/btn:text-primary transition-colors duration-300">
                            LEARN MORE
                        </span>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-white transition-all duration-300 text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
