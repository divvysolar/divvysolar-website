import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const ConsultationInfo = () => {
    const offices = [
        {
            type: 'HEAD OFFICE',
            city: 'Hisar, HR',
            address: 'Lower Ground, SJ Tower, Sec-13, Dabra Road, Hisar (Warehouse) 125001',
            url: 'https://maps.app.goo.gl/YdQvZ4XaNH6iUFii6'
        },
        {
            type: 'CO-OFFICE',
            city: 'Gurgaon, HR',
            address: 'Unit-859, Tower-B1, 8th Floor, Spaze I-Tech Park, Sec-49, Gurgaon 122018',
            url: 'https://maps.app.goo.gl/2K1BLD2jJBGLqhmk7'
        },
        {
            type: 'SALES OFFICE',
            city: 'Mohali, PB',
            address: '626, 1st Floor, Opp Franco Hotel, Sec-55, Phase-I, Mohali 140501',
            url: 'https://maps.app.goo.gl/nhdbCxZFQiqju9n59'
        },
        {
            type: 'REGIONAL OFFICE',
            city: 'Ludhiana, PB',
            address: 'Plot no 14, Phase-VII (ADJ), Focal Point, Gobindgarh, Ludhiana 411010',
            url: 'https://www.google.com/maps/search/?api=1&query=Plot+no+14+Phase+VII+Focal+Point+Ludhiana+Munish+Forging'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="mb-6 text-center xl:text-left animate-slide-up">
                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-bold tracking-[3px] uppercase mb-3">
                    Connect With Us
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-primary mb-3 leading-tight uppercase tracking-tighter">
                    Ready to Facilitate <br /><span className="text-accent underline decoration-primary/10 underline-offset-4">Your Solar Switch</span>
                </h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-sm mx-auto xl:mx-0 font-medium">
                    Our team provides expert guidance for seamless project support. Reach out today to power your future.
                </p>
            </div>

            {/* Premium Uniform Contact Sections */}
            <div className="grid grid-cols-1 gap-3">
                {/* Contact Strip 1: Phone & Mail (Compact & Professional) */}
                <div className="bg-slate-900 rounded-2xl p-4 shadow-xl shadow-slate-900/10 relative overflow-hidden group border border-white/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Phone Section */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shrink-0">
                                <PhoneIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[2px] mb-0.5 whitespace-nowrap">Call Expert</p>
                                <a href="tel:+919254986321" className="text-sm md:text-base font-black text-white hover:text-accent transition-colors block tracking-tight whitespace-nowrap">+91-9254986321</a>
                            </div>
                        </div>
                        {/* Divider Line (Desktop only) */}
                        <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
                        {/* Email Section */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shrink-0">
                                <EnvelopeIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[2px] mb-0.5 whitespace-nowrap">Email Us</p>
                                <a href="mailto:info@divvysolar.in" className="text-sm md:text-base font-black text-white hover:text-accent transition-colors block tracking-tight whitespace-nowrap">info@divvysolar.in</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Strip 2: Working Hours (Matching Theme) */}
                <div className="bg-slate-900 rounded-2xl p-4 shadow-xl shadow-slate-900/10 relative overflow-hidden group border border-white/5">
                    <div className="absolute inset-0 bg-white/[0.02] opacity-40"></div>
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shrink-0">
                            <ClockIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[2px] mb-0.5">Service Hours</p>
                            <p className="text-sm sm:text-lg font-black text-white whitespace-nowrap overflow-hidden">Mon - Sat: 10:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Office Locations - Updated Styling with Yellow and Black */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
                {offices.map((office, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl hover:shadow-2xl hover:border-accent transition-all duration-300 group shadow-lg shadow-gray-100/50 flex flex-col h-full">
                        <div className="flex-grow">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                                <MapPinIcon className="w-4 h-4 text-accent" />
                                <h4 className="font-black text-xs md:text-sm text-accent uppercase tracking-widest">{office.type}</h4>
                            </div>
                            <p className="text-[#0a1122] text-[11px] mb-6 leading-relaxed font-black uppercase tracking-tight">
                                {office.address}
                            </p>
                        </div>
                        {office.url !== '#' && (
                            <div>
                                <a 
                                    href={office.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="bg-accent text-white px-4 py-2 rounded-lg text-[10px] font-black inline-flex items-center gap-2 hover:bg-[#EBB800] transition-all active:scale-95 shadow-md shadow-accent/20"
                                >
                                    MAP VIEW
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsultationInfo;
