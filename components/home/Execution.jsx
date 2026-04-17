import {
    ClipboardDocumentCheckIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    BoltIcon,
    ChartBarIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

const steps = [
    {
        title: 'Site Assessment & Energy Analysis',
        description: 'We conduct a detailed solar site survey to assess roof strength, shading, available area, and your electricity consumption. This helps us recommend the right solar system size and layout to maximize generation and savings.',
        icon: ClipboardDocumentCheckIcon,
    },
    {
        title: 'Customized Design & Permit Approvals',
        description: 'Our engineers create a tailored solar PV system design (structure, inverter sizing, wiring plan, and safety standards). Divvy Solar also supports net metering documentation and approvals, making the process smooth and hassle-free.',
        icon: DocumentCheckIcon,
    },
    {
        title: 'Solar Panel Installation & Wiring',
        description: 'We execute professional solar panel installation using quality mounting structures and weatherproof cabling. Our trained team ensures clean workmanship, safe connections, and optimal panel alignment for long-term performance.',
        icon: WrenchScrewdriverIcon,
    },
    {
        title: 'System Testing, Commissioning & Activation',
        description: 'Before handover, we run complete system testing and commissioning, including electrical safety checks and performance verification. Once approved, we activate the system for seamless grid integration and stable output.',
        icon: BoltIcon,
    },
    {
        title: '24/7 Performance Monitoring & Maintenance',
        description: 'With 24/7 remote monitoring, we track generation and system health to detect issues early and protect performance. Our preventive service visits and bi-annual maintenance help keep your solar plant running at peak efficiency.',
        icon: ChartBarIcon,
    },
    {
        title: 'Customer Training & Documentation Handover',
        description: 'We provide complete customer training along with all required documents, system drawings, warranties, and handover reports, so you can confidently operate, monitor, and maintain your solar system.',
        icon: AcademicCapIcon,
    },
];

const Execution = () => {
    return (
        <section
            className="py-12"
            aria-labelledby="execution-heading"
            style={{
                background: 'linear-gradient(160deg, #eef2f7 0%, #f8fafc 50%, #eef2f7 100%)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2
                        id="execution-heading"
                        className="font-bold"
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            color: '#0e1b3d',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.1',
                            fontFamily: '"Georgia", serif',
                        }}
                    >
                        Execution
                    </h2>

                    <p
                        className="text-center mx-auto mt-3"
                        style={{
                            maxWidth: '850px',
                            fontSize: '1rem',
                            lineHeight: '1.75',
                            color: '#1e293b',
                            fontWeight: '400',
                        }}
                    >
                        We deliver <span style={{ color: '#0e1b3d', fontWeight: '700' }}>end-to-end EPC solar solutions</span> for residential, commercial, and industrial customers across Haryana, Punjab, Delhi NCR, and pan-India. With <span style={{ color: '#0e1b3d', fontWeight: '700' }}>8+ years of experience</span> and 1000+ solar projects completed, our team manages everything, from site survey and system design to installation, commissioning, approvals, and maintenance.
                    </p>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div style={{ width: '70px', height: '1px', background: 'linear-gradient(to right, transparent, #94a3b8)' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fecb00', boxShadow: '0 0 0 2px #f8fafc, 0 0 0 3.5px #0e1b3d' }} />
                        <div style={{ width: '36px', height: '2px', background: 'linear-gradient(to right, #0e1b3d, #fecb00)', borderRadius: '2px' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fecb00', boxShadow: '0 0 0 2px #f8fafc, 0 0 0 3.5px #0e1b3d' }} />
                        <div style={{ width: '70px', height: '1px', background: 'linear-gradient(to left, transparent, #94a3b8)' }} />
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <article
                                key={index}
                                className="group rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col"
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: '1px solid rgba(255,255,255,1)',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                                }}
                            >
                                <div className="flex items-start gap-4">

                                    {/* Icon box */}
                                    <div
                                        className="flex-shrink-0 w-[48px] h-[48px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#fecb00] group-hover:border-[#fecb00]"
                                        style={{
                                            background: '#0a0f1c',
                                            border: '1.5px solid #0a0f1c',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-[#0a0f1c]" style={{ color: '#ffffff' }} aria-hidden="true" />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1">
                                        <h3
                                            className="font-bold mb-1.5 leading-snug group-hover:text-[#0e1b3d]"
                                            style={{
                                                fontSize: '0.98rem',
                                                color: '#0e1b3d',
                                                letterSpacing: '-0.1px',
                                                fontFamily: '"Georgia", serif',
                                            }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: '0.875rem',
                                                lineHeight: '1.7',
                                                color: '#1e293b',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Execution;