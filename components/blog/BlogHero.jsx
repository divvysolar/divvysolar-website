import { UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const BlogHero = ({ title, date, author, image }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="relative pt-40 pb-32 overflow-hidden w-full bg-[#f8fafc]">
            {/* High-Impact Visual Banner */}
            <div className="absolute inset-0 z-0">
                {image ? (
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={image} 
                            className="w-full h-full object-cover" 
                            alt={title} 
                        />
                        {/* Advanced Gradient Overlays for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gray-100" />
                )}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
                {/* Stunning Glassmorphic Container for the Title */}
                <div className="bg-white/85 backdrop-blur-xl border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 md:p-14 lg:p-16 max-w-4xl mx-auto">
                    
                    {/* Professional Header Meta */}
                    <div className="inline-flex items-center justify-center space-x-3 px-5 py-1.5 rounded-full border border-gray-100 bg-white shadow-sm mb-10">
                        <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors focus:outline-none">Home</Link>
                        <span className="text-gray-200">•</span>
                        <Link href="/blogs" className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary transition-colors focus:outline-none">Blogs</Link>
                    </div>

                    {/* The Dark, Bold Heading */}
                    <h1 className="text-3xl md:text-5xl lg:text-[52px] font-bold text-[#0a1122] tracking-tight leading-[1.15] mb-12 mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
                        {title}
                    </h1>

                    {/* Metadata Bridge */}
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {/* Author Pill */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-[#0a1122]" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Author</span>
                                <span className="text-[14px] font-bold text-gray-800">{author || 'Divvy Solar Expert'}</span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                        {/* Date Pill */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                                <CalendarIcon className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Published</span>
                                <span className="text-[14px] font-bold text-gray-800">{formatDate(date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogHero;
