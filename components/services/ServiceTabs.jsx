"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ServiceTabs = () => {
    const pathname = usePathname();

    const tabs = [
        { name: 'Residential', href: '/services/residential' },
        { name: 'Industrial', href: '/services/industrial' },
        { name: 'Utility-Scale', href: '/services/utility-scale' }
    ];

    return (
        <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-16 z-[90] hidden md:block shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`
                  whitespace-nowrap py-3 px-1 border-b-2 font-bold text-xs tracking-widest uppercase transition-all
                  ${isActive
                                        ? 'border-accent text-accent'
                                        : 'border-transparent text-gray-500 hover:text-primary hover:border-gray-300'
                                    }
                `}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default ServiceTabs;
