import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ title, description, icon, href, delay = 0 }) => {
    return (
        <div
            className="group bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden flex flex-col h-full animate-slide-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors duration-500 z-0 text-accent" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-xl bg-orange-50 mb-6 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                    {icon}
                </div>

                <h3 className="text-2xl font-black text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                    {description}
                </p>

                <Link
                    href={href}
                    className="inline-flex items-center text-accent font-bold uppercase tracking-wider text-sm mt-auto group-hover:text-primary transition-colors focus:outline-none"
                >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Explore Solution
                    <ArrowLongRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            {/* Bottom glowing line on hover */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </div>
    );
};

export default ServiceCard;
