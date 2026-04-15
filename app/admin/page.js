"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SunIcon, LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log("Submitting login for:", email);
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            console.log("SignIn response:", res);

            if (res?.error) {
                console.error("Login failed:", res.error);
                setError("Invalid email or password");
                setLoading(false);
            } else {
                window.location.href = "/admin/dashboard";
            }
        } catch (err) {
            console.error("Login exception:", err);
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a]" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
                style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}></div>

            <div className="w-full max-w-md p-8 relative z-10">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-2xl relative"
                        style={{ background: 'linear-gradient(135deg, #FECB00, #FAD02C)', boxShadow: '0 0 40px rgba(254,203,0,0.4)' }}>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm mix-blend-overlay"></div>
                        <SunIcon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
                    <p className="text-white/50 mt-1.5 text-sm font-medium">Sign in to manage Divvy Solar</p>
                </div>

                {/* Login Card */}
                <div className="rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition-colors">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FECB00] to-transparent opacity-50"></div>

                    <form className="space-y-5" onSubmit={handleSubmit} method="post" action="#">
                        {error && (
                            <div className="p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-fade-in"
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-white/50 group-focus-within:text-[#FECB00] transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all sm:text-sm"
                                    placeholder="admin@divvysolar.in"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-white/50 group-focus-within:text-[#FECB00] transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full relative group mt-8 overflow-hidden rounded-xl p-[1px] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#FECB00] to-[#FAD02C] rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                            <div className="relative flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-[#FECB00] to-[#EBB800] rounded-xl text-[#0a1122] text-sm font-bold shadow-[0_0_20px_rgba(254,203,0,0.3)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(254,203,0,0.5)]">
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <span>Sign In to Dashboard</span>
                                )}
                            </div>
                        </button>
                    </form>
                </div>
                
                <p className="text-center text-white/50 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Divvy Solar. All rights reserved.
                </p>
            </div>
        </div>
    );
}
