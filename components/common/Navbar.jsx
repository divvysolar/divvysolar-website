"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import PropTypes from 'prop-types';

const NavDropdown = ({ title, links, dropdownKey, openDropdown, handleMouseEnter, handleMouseLeave, alignRight = false }) => {
    const pathname = usePathname();
    const isOpen = openDropdown === dropdownKey;
    const anyActive = links.some(link => pathname?.startsWith(link.href));

    return (
        <div // NOSONAR
            role="button"
            tabIndex={0}
            className="relative h-full flex items-center cursor-pointer z-50"
            onMouseEnter={() => handleMouseEnter(dropdownKey)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleMouseEnter(dropdownKey);
                }
            }}
        >
            <div className={`flex items-center text-sm font-bold tracking-wide transition-colors ${anyActive || isOpen ? 'text-accent' : 'text-primary hover:text-accent'}`}>
                {title}
                <ChevronDownIcon className={`ml-1 h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            <div
                className={`absolute ${alignRight ? 'right-0' : 'left-1/2 -translate-x-1/2'} top-full z-[999999] transition-all duration-300 ease-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ paddingTop: '10px', width: '220px' }}
            >
                {/* Invisible Bridge to prevent hover loss with a thicker ceiling */}
                <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />

                <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-1 flex flex-col w-full relative z-20">
                    {links.map((link) => (
                        <div key={link.name} className="w-full flex">
                            <Link
                                href={link.href}
                                prefetch={false}
                                className="flex-1 w-full flex items-center justify-center px-6 py-4 text-gray-700 text-[11px] uppercase tracking-wider font-extrabold hover:text-accent hover:bg-gray-50 transition-all duration-300 cursor-pointer group/link whitespace-nowrap"
                            >
                                <span className="relative w-full text-center block transition-transform duration-300 group-hover/link:scale-105">{link.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
    const closeTimer = useRef(null);

    const isActive = (path) => {
        if (!pathname) return false;
        if (path === '/') return pathname === '/';
        return pathname === path || pathname.startsWith(path + '/');
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setOpenDropdown(null);
    }, [pathname]);

    const servicesLinks = [
        { name: 'RESIDENTIAL/HOME', href: '/services/residential' },
        { name: 'INDUSTRIAL/COMMERCIAL', href: '/services/industrial' },
        { name: 'UTILITY/PPA', href: '/services/utility-scale' },
    ];

    const projectsLinks = [
        { name: 'Our Milestone Projects', href: '/projects' },
        { name: 'Punjab Projects', href: '/projects/punjab' },
        { name: 'Haryana Projects', href: '/projects/haryana' },
    ];

    const moreLinks = [
        { name: 'Solar Calculator', href: '/calculator' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blogs' },
    ];

    const handleMouseEnter = (name) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenDropdown(name);
    };

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
    };

    return (
        <nav className={`sticky top-0 w-full z-[99999] transition-shadow duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <div
                                className="relative h-11 w-44 transition-transform duration-300 hover:scale-105"
                            >
                                <Image
                                    src="/divvy_photo.png"
                                    alt="Divvy Solar Logo"
                                    fill
                                    sizes="176px"
                                    className="object-contain"
                                    priority
                                    quality={100}
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex flex-1 items-center justify-end">
                        {/* Right-Aligned Nav Links */}
                        <div className="flex space-x-8 items-center h-full mr-8 xl:mr-12">
                            <Link
                                href="/"
                                className={`text-sm font-bold tracking-wide transition-colors h-full flex items-center ${isActive('/') ? 'text-accent' : 'text-primary hover:text-accent'}`}
                            >
                                HOME
                            </Link>

                            <NavDropdown
                                title="CORE SOLUTIONS"
                                links={servicesLinks}
                                dropdownKey="services"
                                openDropdown={openDropdown}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                            />

                            <NavDropdown
                                title="PROJECTS"
                                links={projectsLinks}
                                dropdownKey="projects"
                                openDropdown={openDropdown}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                            />

                            <Link
                                href="/about"
                                className={`text-sm font-bold tracking-wide transition-colors h-full flex items-center ${isActive('/about') ? 'text-accent' : 'text-primary hover:text-accent'}`}
                            >
                                ABOUT
                            </Link>

                            <NavDropdown
                                title="MORE"
                                links={moreLinks}
                                dropdownKey="more"
                                openDropdown={openDropdown}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                alignRight={true}
                            />
                        </div>

                        {/* Extreme Right Button */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/contact"
                                className="bg-yellow-400 text-[#0a0f1e] text-[11px] lg:text-[12px] xl:text-[13px] font-black tracking-wider lg:tracking-widest px-5 lg:px-6 py-2.5 rounded-full hover:bg-yellow-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
                            >
                                GET FREE QUOTE
                            </Link>
                        </div>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-primary hover:text-accent focus:outline-none"
                        >
                            {isOpen ? (
                                <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden overflow-y-auto transition-all duration-300 bg-white border-t border-gray-100 absolute w-full shadow-2xl ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pt-6 pb-32 space-y-2">
                    {/* HOME */}
                    <Link
                        href="/"
                        className={`block px-4 py-4 text-base font-black tracking-widest border-b border-gray-50 transition-colors ${isActive('/') ? 'text-accent bg-accent/5' : 'text-primary'}`}
                        onClick={() => setIsOpen(false)}
                    >
                        HOME
                    </Link>

                    {/* CORE SOLUTIONS ACCORDION */}
                    <div className="border-b border-gray-50">
                        <button 
                            onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'services' ? null : 'services')}
                            className="flex items-center justify-between w-full px-4 py-4 text-base font-black tracking-widest text-primary hover:text-accent transition-colors"
                        >
                            <span>CORE SOLUTIONS</span>
                            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${activeMobileDropdown === 'services' ? 'rotate-180 text-accent' : 'text-gray-400'}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileDropdown === 'services' ? 'max-h-64 opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                            {servicesLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className={`block pl-8 pr-4 py-3 text-[12px] font-bold uppercase tracking-wider ${isActive(link.href) ? 'text-accent bg-accent/5' : 'text-gray-600'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* PROJECTS ACCORDION */}
                    <div className="border-b border-gray-50">
                        <button 
                            onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'projects' ? null : 'projects')}
                            className="flex items-center justify-between w-full px-4 py-4 text-base font-black tracking-widest text-primary hover:text-accent transition-colors"
                        >
                            <span>PROJECTS</span>
                            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${activeMobileDropdown === 'projects' ? 'rotate-180 text-accent' : 'text-gray-400'}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileDropdown === 'projects' ? 'max-h-64 opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                            {projectsLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className={`block pl-8 pr-4 py-3 text-[12px] font-bold uppercase tracking-wider ${pathname === link.href ? 'text-accent bg-accent/5' : 'text-gray-600'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ABOUT */}
                    <Link
                        href="/about"
                        className={`block px-4 py-4 text-base font-black tracking-widest border-b border-gray-50 ${isActive('/about') ? 'text-accent' : 'text-primary'}`}
                        onClick={() => setIsOpen(false)}
                    >
                        ABOUT
                    </Link>

                    {/* MORE ACCORDION */}
                    <div className="border-b border-gray-50">
                        <button 
                            onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'more' ? null : 'more')}
                            className="flex items-center justify-between w-full px-4 py-4 text-base font-black tracking-widest text-primary hover:text-accent transition-colors"
                        >
                            <span>MORE</span>
                            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${activeMobileDropdown === 'more' ? 'rotate-180 text-accent' : 'text-gray-400'}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileDropdown === 'more' ? 'max-h-64 opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                            {moreLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className={`block pl-8 pr-4 py-3 text-[12px] font-bold uppercase tracking-wider ${isActive(link.href) ? 'text-accent bg-accent/5' : 'text-gray-600'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <Link
                            href="/contact"
                            className="block w-full text-center bg-yellow-400 text-slate-900 text-sm font-black tracking-widest py-5 rounded-2xl shadow-xl active:scale-95 transition-all duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            GET FREE QUOTE
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

NavDropdown.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
    dropdownKey: PropTypes.string.isRequired,
    openDropdown: PropTypes.string,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    alignRight: PropTypes.bool,
};