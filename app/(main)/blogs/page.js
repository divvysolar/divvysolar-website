export const revalidate = 0; // Always fetch fresh data from DB so admin updates show instantly

import PageHero from '@/components/common/PageHero';
import BlogCard from '@/components/blog/BlogCard';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const metadata = {
    title: 'Solar News & Updates',
    description: 'Read the latest news, updates, and insights about solar energy from Divvy Solar experts.',
};

async function getBlogs() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({ published: true })
            .sort({ createdAt: -1 })
            .lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <>
            <PageHero title="Solar News & Insights" breadcrumb="Blogs" backgroundImage="/uti1_main.jpeg" />

            <section className="relative py-28 bg-white min-h-[80vh] overflow-hidden">
                {/* High-Visibility Dynamic Background Effect */}
                <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none animate-dots" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #111827 2.2px, transparent 0)', backgroundSize: '80px 80px' }} />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h2 className="text-[48px] md:text-[76px] font-normal mb-1 leading-tight tracking-tight text-slate-950" style={{ fontFamily: 'Georgia, serif' }}>Latest News</h2>
                        
                        {/* High-Contrast Designful Line (Black) */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-12 md:w-20 h-[2.5px] bg-slate-950 rounded-full"></span>
                            <div className="w-3.5 h-3.5 rounded-full border-[3px] border-slate-950 bg-white rotate-45"></div>
                            <span className="w-12 md:w-20 h-[2.5px] bg-slate-950 rounded-full"></span>
                        </div>

                        <p className="text-slate-700 text-lg md:text-[21px] font-normal leading-relaxed max-w-3xl mx-auto px-4 opacity-90">
                            Divvy Solar shares practical insights to help homeowners and businesses explore our latest solar project updates, solar guides, and industry news.
                        </p>
                    </div>

                    {blogs && blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-bold text-primary mb-2">No Articles Yet</h3>
                            <p className="text-gray-500">Check back soon for latest news and solar insights.</p>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}
