"use client";

import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ContactForm = ({ defaultService = 'RESIDENTIAL/HOME' }) => {
    const [activeTab, setActiveTab] = useState(defaultService);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        location: '',
        monthlyBill: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    serviceType: activeTab
                }),
            });

            if (res.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', whatsapp: '', location: '', monthlyBill: '' });
            } else {
                const errorData = await res.json();
                setSubmitStatus(errorData.message || errorData.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = ['RESIDENTIAL/HOME', 'INDUSTRIAL/COMMERCIAL', 'UTILITY/PPA'];

    return (
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-gray-100 h-full relative overflow-hidden z-20">
            {/* Professional Accent Border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-[#FECB00] to-accent"></div>

            <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-[#0a1122] mb-3 tracking-tight">Book Free Consultation</h3>
                <p className="text-gray-600 text-sm font-medium">Get an expert consultation within 24 hours.</p>
            </div>

            {/* Service Tabs - High Contrast & Professional */}
            <div className="flex bg-gray-50 p-1 rounded-2xl mb-8 border border-gray-200 shadow-inner relative z-50 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTab(tab);
                        }}
                        className={`flex-1 py-3 px-3 rounded-xl text-[9px] sm:text-[10px] font-black transition-all duration-300 whitespace-nowrap relative z-50 pointer-events-auto ${activeTab === tab
                            ? 'bg-accent text-white shadow-xl shadow-accent/20 scale-[1.02]'
                            : 'text-gray-400 hover:text-accent'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h4>
                    <p className="text-green-700 text-sm">Our team will contact you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {submitStatus && submitStatus !== 'success' && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center text-[10px] font-bold border border-red-100 mb-4 animate-in slide-in-from-top-2 uppercase tracking-tight">
                            <XCircleIcon className="w-5 h-5 mr-3 shrink-0" />
                            {submitStatus === 'error' ? 'Something went wrong. Please try again.' : submitStatus}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 relative z-50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-primary font-medium relative z-50 pointer-events-auto"
                            />
                        </div>
                        <div className="space-y-1.5 relative z-50">
                             <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Email Address</label>
                             <input
                                 type="email"
                                 name="email"
                                 required
                                 value={formData.email}
                                 onChange={handleChange}
                                 className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-primary font-medium relative z-50 pointer-events-auto"
                             />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 relative z-50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">WhatsApp No.</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                required
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-primary font-medium relative z-50 pointer-events-auto"
                            />
                        </div>
                        <div className="space-y-1.5 relative z-50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">City / Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-primary font-medium relative z-50 pointer-events-auto"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Monthly Electricity Bill</label>
                        <div className="relative">
                            <select
                                name="monthlyBill"
                                required
                                value={formData.monthlyBill}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all appearance-none text-primary font-medium"
                            >
                                <option value="" disabled>Select Range</option>
                                <option value="Under ₹3,000">Under ₹3,000</option>
                                <option value="₹3,000 - ₹10,000">₹3,000 - ₹10,000</option>
                                <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                                <option value="Above ₹25,000">Above ₹25,000</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-[#EBB800] text-white font-black py-5 rounded-2xl transition-all duration-300 flex items-center justify-center text-sm uppercase tracking-[3px] shadow-2xl shadow-accent/30 active:scale-[0.98] disabled:opacity-50 mt-4 group"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                SECURING...
                            </span>
                        ) : (
                            <>
                                Get Free Consultation
                                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </>
                        )}
                    </button>

                    <p className="text-[9px] text-center text-gray-400 font-bold tracking-tight uppercase">Trusted by 20,000+ customers across India</p>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
