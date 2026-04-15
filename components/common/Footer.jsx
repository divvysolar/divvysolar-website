'use client';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/services/residential', label: 'Solutions' },
        { href: '/projects', label: 'Projects' },
        { href: '/blogs', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    const offices = [
        {
            title: 'Head Office',
            lines: ['Lower Ground, SJ Tower,', 'Sector-13, Dabra Road,', 'Hisar-125001 (HR)'],
        },
        {
            title: 'CO-Office',
            lines: ['Unit-859, Tower-B1, Floor-8,', 'Spaze I-Tech Park, Sector 49,', 'Gurgaon 122018'],
        },
        {
            title: 'Sales Office',
            lines: ['626, First Floor, Opp. Franco Hotel,', 'Sec-55, Phase-I, Mohali,', 'Punjab 140501'],
        },
        {
            title: 'Regional Office',
            lines: ['Divvy Solar Power & Solutions,', 'Hisar, Haryana,', 'India'],
        },
    ];

    const socials = [
        {
            href: 'https://www.facebook.com/divvysolar',
            label: 'Facebook',
            icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
        },
        {
            href: 'https://www.instagram.com/divvy.solar/',
            label: 'Instagram',
            icon: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
        },
        {
            href: 'https://www.linkedin.com/company/divvy-solar-power-solutions-pvt-ltd/',
            label: 'LinkedIn',
            icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-1.166 0-1.5-.732-1.5-1.5 0-.766.334-1.5 1.5-1.5 1.165 0 1.5.734 1.5 1.5 0 .768-.335 1.5-1.5 1.5zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#0a0f1c]">
            {/* Top brand accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#fecb00]/30 to-transparent" />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* ── Col 1: Brand ── */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <Link href="/" className="inline-block w-fit">
                            <div className="relative h-12 w-48 transition-transform duration-300 hover:scale-105">
                                <Image
                                    src="/divvy_photo.png"
                                    alt="Divvy Solar Logo"
                                    fill
                                    sizes="192px"
                                    className="object-contain"
                                    style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.2)' }}
                                    quality={100}
                                />
                            </div>
                        </Link>

                        <p className="text-gray-200 text-sm leading-relaxed max-w-[260px]">
                            Renewable Energy For All. Reliable solar panel installation for homes, industries, and large-scale projects across India.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-2.5">
                            {socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#fecb00] hover:text-[#0e1b3d] hover:border-[#fecb00] transition-all duration-300"
                                >
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Col 2: Quick Links ── */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white text-[10px] font-semibold tracking-[2.5px] uppercase mb-5 pb-2.5 border-b border-white/10">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-[#fecb00] transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#fecb00] transition-colors duration-200 flex-shrink-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Our Offices ── */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white text-[10px] font-semibold tracking-[2.5px] uppercase mb-5 pb-2.5 border-b border-white/10">
                            Our Offices
                        </h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            {offices.map((office, i) => (
                                <div key={i}>
                                    <h4 className="text-[#fecb00] text-[10px] font-semibold uppercase tracking-widest mb-2">
                                        {office.title}
                                    </h4>
                                    <address className="not-italic text-gray-400 text-[13px] leading-[1.8]">
                                        {office.lines.map((line, j) => (
                                            <span key={j} className="block">{line}</span>
                                        ))}
                                    </address>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Col 4: Contact Us ── */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white text-[10px] font-semibold tracking-[2.5px] uppercase mb-5 pb-2.5 border-b border-white/10">
                            Contact Us
                        </h3>
                        <div className="space-y-3.5">
                            {/* Email */}
                            <a href="mailto:info@divvysolar.in" className="flex items-center gap-3 group">
                                <div className="w-7 h-7 rounded-md bg-[#fecb00]/10 border border-[#fecb00]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#fecb00]/20 group-hover:border-[#fecb00]/40 transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 text-[#fecb00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-[#fecb00] transition-colors">
                                    info@divvysolar.in
                                </span>
                            </a>

                            {/* Phone */}
                            <a href="tel:+919254969113" className="flex items-center gap-3 group">
                                <div className="w-7 h-7 rounded-md bg-[#fecb00]/10 border border-[#fecb00]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#fecb00]/20 group-hover:border-[#fecb00]/40 transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 text-[#fecb00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-[#fecb00] transition-colors">
                                    +91-9254969113
                                </span>
                            </a>

                            {/* Website */}
                            <a href="https://divvysolar.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                <div className="w-7 h-7 rounded-md bg-[#fecb00]/10 border border-[#fecb00]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#fecb00]/20 group-hover:border-[#fecb00]/40 transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 text-[#fecb00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-[#fecb00] transition-colors">
                                    www.divvysolar.in
                                </span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-gray-600 text-xs">
                        © {currentYear} Divvy Solar Pvt. Ltd. All rights reserved.
                    </p>
                    <p className="text-gray-700 text-xs">
                        Renewable Energy For All
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;