import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const ConsultationInfo = () => {
    const offices = [
        {
            type: 'Head Office',
            city: 'Hisar, HR',
            address: 'Lower Ground, SJ Tower, Sector-13, Dabra Road',
            url: 'https://maps.app.goo.gl/YdQvZ4XaNH6iUFii6'
        },
        {
            type: 'CO-Office',
            city: 'Gurgaon, HR',
            address: 'Unit-859, Tower-B1, Spaze I-Tech Park, Sector 49',
            url: 'https://maps.app.goo.gl/2K1BLD2jJBGLqhmk7'
        },
        {
            type: 'Sales Office',
            city: 'Mohali, PB',
            address: '626, 1st Floor, Opp. Franco Hotel, Sec-55',
            url: 'https://maps.app.goo.gl/nhdbCxZFQiqju9n59'
        },
        {
            type: 'Support Center',
            city: 'Ludhiana, PB',
            address: 'Janta Colony, Malerkotla Road, Ludhiana',
            url: 'https://maps.app.goo.gl/3f82m4nE6zXn1XnS9'
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
                                <a href="tel:+919254969113" className="text-sm md:text-base font-black text-white hover:text-accent transition-colors block tracking-tight whitespace-nowrap">+91-9254969113</a>
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

            {/* Office Locations - Compact & Structured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
                {offices.map((office, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl hover:shadow-lg hover:border-accent transition-all duration-300 group">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <MapPinIcon className="w-4 h-4 text-accent" />
                            <h4 className="font-extrabold text-xs md:text-sm text-accent uppercase tracking-wider">{office.type}</h4>
                        </div>
                        <p className="text-gray-900 text-[10px] mb-2 leading-tight font-black">{office.address}</p>
                        {office.url !== '#' && (
                            <a href={office.url} target="_blank" rel="noopener noreferrer" className="text-accent text-[10px] font-bold inline-flex items-center gap-1 group-hover:underline">
                                Map View
                                <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsultationInfo;
