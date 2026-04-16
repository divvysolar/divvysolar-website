import Link from 'next/link';
import Image from 'next/image';

const CTA = () => {
    return (
        <section className="relative overflow-hidden" style={{ height: '300px' }}>

            {/* Background Image */}
            <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
                alt="Solar panels - Divvy Solar tailored solar solutions"
                fill
                sizes="100vw"
                className="object-cover object-center"
                quality={85}
            />

            {/* Dark overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(105deg, rgba(10,15,40,0.88) 0%, rgba(10,15,40,0.75) 50%, rgba(10,15,40,0.50) 100%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 flex items-center justify-between gap-8">

                {/* Left — Text */}
                <div className="max-w-2xl">
                    <h2
                        className="font-bold text-white mb-2"
                        style={{
                            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                            lineHeight: '1.2',
                            letterSpacing: '-0.3px',
                        }}
                    >
                        Invest in tailored solar tech solutions.
                    </h2>
                    <p
                        style={{
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            color: 'rgba(255,255,255,0.65)',
                        }}
                    >
                        Harnessing the sun's power and customising solar solutions can reduce your
                        energy bills, carbon footprint, and increase your property value.
                    </p>
                </div>

                {/* Right — CTA Button */}
                <div className="flex-shrink-0">
                    <Link
                        href="/contact"
                        className="inline-flex items-center font-bold uppercase text-sm px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        style={{
                            background: '#0e1b3d',
                            color: '#ffffff',
                            border: '1.5px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            letterSpacing: '0.12em',
                        }}
                        aria-label="Consult with Divvy Solar now"
                    >
                        Consult Now
                    </Link>
                </div>

            </div>

        </section>
    );
};

export default CTA;