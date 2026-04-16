import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
            <div className="relative w-full max-w-lg mb-12">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
                <h1 className="relative text-9xl font-black text-primary/10 tracking-tighter">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 relative animate-pulse">
                         <Image src="/ksolar.png" alt="Solar Sun" fill sizes="192px" className="object-contain opacity-20" />
                    </div>
                </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight">
                Lost in the <span className="text-accent">Solar Field?</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
                The page you're looking for seems to have drifted away. Let's get you back to the light.
            </p>

            <Link
                href="/"
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
                Return to Homepage
            </Link>
        </div>
    );
}
