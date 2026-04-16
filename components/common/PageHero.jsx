import Link from 'next/link';
import Image from 'next/image';

const PageHero = ({ title, breadcrumb, backgroundImage, theme = 'dark' }) => {
    const isLight = theme === 'light';
    
    return (
        <section className={`relative transition-colors duration-500 ${isLight ? 'bg-white pt-10 pb-6 lg:pt-14 lg:pb-10' : 'bg-[#0a1122] pt-14 pb-10 lg:pt-20 lg:pb-14'} overflow-hidden flex items-center`}>
            {/* Background Image Container */}
            {backgroundImage ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        priority
                        className="object-cover object-center"
                        quality={100}
                        sizes="100vw"
                    />
                    {/* Professional Deep Overlay - Top to Bottom */}
                    <div className={`absolute inset-0 z-10 ${isLight ? 'bg-white/40' : 'bg-gradient-to-b from-[#0a1122]/90 via-[#0a1122]/40 to-[#0a1122]/90'}`} />
                    {/* Side Vignetts for Premium Depth */}
                    {!isLight && <div className="absolute inset-0 bg-gradient-to-r from-[#0a1122]/60 via-transparent to-[#0a1122]/60 z-10" />}
                </div>
            ) : (
                <div className={`absolute inset-0 ${isLight ? 'opacity-5' : 'opacity-10'}`}>
                    <div
                        className={`absolute inset-0 ${isLight ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+IDxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNMzAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMTUpIiBmaWxsPSJub25lIi8+IDwvc3ZnPg==')]" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+IDxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNMzAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBmaWxsPSJub25lIi8+IDwvc3ZnPg==')]"}`}
                        style={{ backgroundSize: '40px 40px' }}
                    />
                </div>
            )}

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
                <h1 className={`text-2xl md:text-3xl font-light tracking-tighter mb-4 drop-shadow-xl leading-[1.05] ${isLight ? 'text-primary' : 'text-white'}`}>
                    {title.split(' ').map((word, i) => (
                        <span key={i} className={i === 0 ? "font-bold" : ""}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>

                <div className="flex items-center justify-center space-x-3 text-sm font-semibold">
                    <Link href="/" className={`${isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'} transition-all duration-300`}>
                        Home
                    </Link>
                    <span className={isLight ? 'text-gray-300' : 'text-gray-500'}>/</span>
                    <span className={`${isLight ? 'text-[#0a1122]' : 'text-white'} uppercase tracking-widest text-[11px] font-medium`}>{breadcrumb || title}</span>
                </div>
            </div>

            {/* Bottom Glow Element */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] ${isLight ? 'bg-gradient-to-r from-transparent via-gray-200 to-transparent' : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'} z-20`} />
        </section>
    );
};

export default PageHero;
