'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Global Error Caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto text-center">
                <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-accent sm:text-5xl">500</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6 text-left">
                            <h1 className="text-4xl font-extrabold text-primary tracking-tight sm:text-5xl">
                                Something went wrong
                            </h1>
                            <p className="mt-1 text-base text-gray-500">
                                We're sorry for the inconvenience. Our team has been notified.
                            </p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6 text-left">
                            <button
                                onClick={() => reset()}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-[#0a1122] bg-[#FECB00] hover:bg-[#EBB800] focus:outline-none transition-all duration-200"
                            >
                                Try again
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-primary bg-primary/5 hover:bg-primary/10 focus:outline-none transition-all duration-200"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
