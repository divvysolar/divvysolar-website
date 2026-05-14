import Image from 'next/image';
import Link from 'next/link';
import {
    BoltIcon,
    ChartBarIcon,
    SunIcon,
    BuildingOffice2Icon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/home/InteractiveMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full bg-slate-50 flex flex-col items-center justify-center rounded-3xl animate-pulse border border-slate-100">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">
                Loading Region Map...
            </p>
        </div>
    ),
});

export const metadata = {
    title: 'Haryana Projects | Divvy Solar',
    description:
        'Harnessing the power of the sun with utility-scale and industrial solar in Haryana.',
};

const BASE_HARYANA_PROJECTS = [
    { id: "hr-0001", city: "Hisar – AMAN KUMAR SUMIT KUMAR", state: "Haryana", x: "41.83%", y: "43.5%", capacity: "5.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "17+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0002", city: "Hisar – ATTAM PARKASH", state: "Haryana", x: "41.16%", y: "43.19%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0003", city: "Hisar – VINOD MAHTA", state: "Haryana", x: "41.55%", y: "44.06%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0004", city: "Hisar – SHYAM SUNDAR", state: "Haryana", x: "41.9%", y: "42.98%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0005", city: "Hisar – SATISH KUMAR", state: "Haryana", x: "40.78%", y: "43.63%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0006", city: "Hisar – NAND KISHORE", state: "Haryana", x: "42.18%", y: "43.93%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0007", city: "Hisar – SUBASH SAINI", state: "Haryana", x: "41.28%", y: "42.66%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0008", city: "Hisar – TILAK RAJ", state: "Haryana", x: "41.07%", y: "44.32%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0009", city: "Hisar – MRS. MANJU", state: "Haryana", x: "42.42%", y: "43.16%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0010", city: "Hisar – Anil kumar arora", state: "Haryana", x: "40.54%", y: "43.11%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0011", city: "Hisar – SH.OMPARKASH", state: "Haryana", x: "41.96%", y: "44.48%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0012", city: "Hisar – MAHINDER SINGH KHURANA", state: "Haryana", x: "41.84%", y: "42.42%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0013", city: "Hisar – UMA MITTAL", state: "Haryana", x: "40.48%", y: "44.09%", capacity: "15 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0014", city: "Hisar – SOBHA MITTAL", state: "Haryana", x: "42.7%", y: "43.76%", capacity: "15 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0015", city: "Hisar – DEVENDER BHUTANI", state: "Haryana", x: "40.77%", y: "42.46%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0016", city: "Hisar – BHAJAN LAL ARORA", state: "Haryana", x: "41.33%", y: "44.8%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0017", city: "Hisar – MRS. KANTA GARG", state: "Haryana", x: "42.53%", y: "42.63%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0018", city: "Hisar – MR. JAGMOHAN", state: "Haryana", x: "40.11%", y: "43.44%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0019", city: "Hisar – SANTOSH ARORA", state: "Haryana", x: "42.51%", y: "44.51%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0020", city: "Hisar – MUNNI DHARAMPAL JANGRA", state: "Haryana", x: "41.43%", y: "42.04%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0021", city: "Hisar – DEVENDER KUMAR JASUJA", state: "Haryana", x: "40.54%", y: "44.65%", capacity: "6.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "20+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0022", city: "Hisar – NIKHLESH KATHPAL", state: "Haryana", x: "43.02%", y: "43.3%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0023", city: "Hisar – MR, VIKAS NAIN", state: "Haryana", x: "40.21%", y: "42.6%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0024", city: "Hisar – KULWANT SINGH", state: "Haryana", x: "41.85%", y: "45.06%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0025", city: "Hisar – MAYANK DEWAN", state: "Haryana", x: "42.31%", y: "42.08%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0026", city: "Hisar – Rajkumar DEWAN", state: "Haryana", x: "39.91%", y: "44.01%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0027", city: "Hisar – BALDEV GROVER", state: "Haryana", x: "43.04%", y: "44.21%", capacity: "9 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "27+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0028", city: "Hisar – SANTOSH KUMARI", state: "Haryana", x: "40.83%", y: "41.9%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0029", city: "Hisar – ALKA KAUSHIK", state: "Haryana", x: "40.9%", y: "45.16%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0030", city: "Hisar – ANIL JAIN", state: "Haryana", x: "43.09%", y: "42.67%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0031", city: "Hisar – SANTOSH RANI", state: "Haryana", x: "39.74%", y: "43.04%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0032", city: "Hisar – RAVI BHUSHAN MONGA", state: "Haryana", x: "42.5%", y: "45.06%", capacity: "5.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "17+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0033", city: "Hisar – LEELA DEVI", state: "Haryana", x: "41.82%", y: "41.65%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0034", city: "Hisar – PARMOD NARANG", state: "Haryana", x: "39.99%", y: "44.67%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0035", city: "Hisar – PREM PARKASH", state: "Haryana", x: "43.43%", y: "43.66%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0036", city: "Hisar – SANJAY KUMAR", state: "Haryana", x: "40.17%", y: "42.06%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0037", city: "Hisar – SHARDA YADAV", state: "Haryana", x: "41.51%", y: "45.49%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0038", city: "Hisar – GALAXY POWER SOLUTIONS", state: "Haryana", x: "42.86%", y: "42.01%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0039", city: "Hisar – DALIP KAUR", state: "Haryana", x: "39.46%", y: "43.69%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0040", city: "Hisar – BRAJESH KUMAR", state: "Haryana", x: "43.15%", y: "44.75%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0041", city: "Hisar – Control room Hisar", state: "Haryana", x: "41.12%", y: "41.44%", capacity: "49.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "149+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0042", city: "Hisar – Vanya Buildtech pvt ltd", state: "Haryana", x: "40.37%", y: "45.3%", capacity: "80 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "240+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0043", city: "Hisar – SAHIL", state: "Haryana", x: "43.57%", y: "42.93%", capacity: "15 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0044", city: "Hisar – VIJENDER SINGH", state: "Haryana", x: "39.57%", y: "42.51%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0045", city: "Hisar – MEGHA JAIN", state: "Haryana", x: "42.26%", y: "45.56%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0046", city: "Hisar – VIVAK GOYAL", state: "Haryana", x: "42.34%", y: "41.44%", capacity: "20 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "60+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0047", city: "Hisar – SITARAM KAJLA", state: "Haryana", x: "39.47%", y: "44.46%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0048", city: "Hisar – POONAM SANGWAN", state: "Haryana", x: "43.67%", y: "44.17%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0049", city: "Hisar – BAWANI WALA PALSTIC UDYOG", state: "Haryana", x: "40.34%", y: "41.52%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0050", city: "Hisar – BIRMA DEVI", state: "Haryana", x: "41.01%", y: "45.76%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0051", city: "Hisar – DR, AK VERMA", state: "Haryana", x: "43.41%", y: "42.15%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0052", city: "Hisar – VINAY AGARWAL", state: "Haryana", x: "39.16%", y: "43.21%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0053", city: "Hisar – Kanchan dhawan", state: "Haryana", x: "43.04%", y: "45.31%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0054", city: "Hisar – Prithvi Singh Sangwan", state: "Haryana", x: "41.59%", y: "41.1%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0055", city: "Hisar – SANDHYA MALHOTRA", state: "Haryana", x: "39.8%", y: "45.23%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0056", city: "Hisar – Dharampal", state: "Haryana", x: "43.95%", y: "43.37%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0057", city: "Hisar – Sushila Devi", state: "Haryana", x: "39.59%", y: "41.93%", capacity: "5.2 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "16+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0058", city: "Hisar – MR.TILAK RAJ", state: "Haryana", x: "41.84%", y: "45.97%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0059", city: "Hisar – KAVITA", state: "Haryana", x: "42.93%", y: "41.43%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0060", city: "Hisar – PREETI GOYAL", state: "Haryana", x: "39.03%", y: "44.07%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0061", city: "Hisar – MANISH BANSAL", state: "Haryana", x: "43.72%", y: "44.76%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0062", city: "Hisar – SHASHI KUMAR", state: "Haryana", x: "40.7%", y: "41.05%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0063", city: "Hisar – PARVEEN SURA", state: "Haryana", x: "40.42%", y: "45.86%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0064", city: "Hisar – AJIT SINGH", state: "Haryana", x: "43.91%", y: "42.48%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0065", city: "Hisar – M L GHAHKAD", state: "Haryana", x: "39.01%", y: "42.62%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0066", city: "Hisar – SIYARAM IRRIGATION PVT LT", state: "Haryana", x: "42.75%", y: "45.85%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0067", city: "Hisar – GOPAL CONCRETE PRODUCTS", state: "Haryana", x: "42.17%", y: "40.91%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0068", city: "Hisar – RAJENDER SINGH", state: "Haryana", x: "39.24%", y: "44.97%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0069", city: "Hisar – Dr Ramesh Jindal", state: "Haryana", x: "44.18%", y: "43.95%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0070", city: "Hisar – ANIL GUPTA", state: "Haryana", x: "39.81%", y: "41.34%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0071", city: "Hisar – Janu Priya", state: "Haryana", x: "41.29%", y: "46.25%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0072", city: "Hisar – OMPARKASH", state: "Haryana", x: "43.53%", y: "41.6%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0073", city: "Hisar – ANIL KUMAR LUTHRA", state: "Haryana", x: "38.7%", y: "43.53%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0074", city: "Hisar – Rekha Bansal", state: "Haryana", x: "43.59%", y: "45.38%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0075", city: "Hisar – Narseen", state: "Haryana", x: "41.22%", y: "40.68%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0076", city: "Hisar – Santosh Sharma", state: "Haryana", x: "39.79%", y: "45.78%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0077", city: "Hisar – Reshu Bansal", state: "Haryana", x: "44.32%", y: "42.97%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0078", city: "Hisar – Desh Raj", state: "Haryana", x: "39.05%", y: "41.97%", capacity: "5.2 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "16+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0079", city: "Hisar – MAHESH SINGLA", state: "Haryana", x: "42.28%", y: "46.3%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0080", city: "Hisar – Jai Dev Electric Works", state: "Haryana", x: "42.82%", y: "40.89%", capacity: "25 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "75+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0081", city: "Hisar – Jai Dev Electric Works", state: "Haryana", x: "38.74%", y: "44.54%", capacity: "15 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0082", city: "Hisar – Jagmender Singh", state: "Haryana", x: "44.25%", y: "44.6%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0083", city: "Hisar – Sushil Jewellers", state: "Haryana", x: "40.21%", y: "40.81%", capacity: "5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0084", city: "Hisar – GOPAL PETRO SERVICE", state: "Haryana", x: "40.63%", y: "46.37%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0085", city: "Hisar – KRISHANA DEVI", state: "Haryana", x: "44.1%", y: "41.96%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0086", city: "Hisar – AMAN MANCHANDA", state: "Haryana", x: "38.53%", y: "42.88%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0087", city: "Hisar – UNITED TAXTILE", state: "Haryana", x: "43.28%", y: "45.98%", capacity: "207 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "621+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0088", city: "Hisar – Bindiya Dhupper", state: "Haryana", x: "41.86%", y: "40.45%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0089", city: "Hisar – United Textiles Ltd", state: "Haryana", x: "39.16%", y: "45.51%", capacity: "110 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "330+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0090", city: "Hisar – Ramniwas Associates", state: "Haryana", x: "44.6%", y: "43.6%", capacity: "12 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "36+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0091", city: "Hisar – Hotel Pritam Palace", state: "Haryana", x: "39.27%", y: "41.32%", capacity: "20 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "60+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0092", city: "Hisar – PARUL", state: "Haryana", x: "41.68%", y: "46.63%", capacity: "11 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "33+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0093", city: "Hisar – RAMSONS STAINLESS", state: "Haryana", x: "43.5%", y: "41.06%", capacity: "330 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "990+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0094", city: "Hisar – Shilpa Aggarwal", state: "Haryana", x: "38.36%", y: "43.95%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0095", city: "Hisar – Deepak Goyal", state: "Haryana", x: "44.14%", y: "45.3%", capacity: "9 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "27+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0096", city: "Hisar – Vikas Goyal", state: "Haryana", x: "40.77%", y: "40.38%", capacity: "9 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "27+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0097", city: "Hisar – Bilas Chand Goyal", state: "Haryana", x: "39.92%", y: "46.31%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0098", city: "Hisar – Sunil Gupta", state: "Haryana", x: "44.58%", y: "42.48%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0099", city: "Hisar – Sharmila Gunpal", state: "Haryana", x: "38.53%", y: "42.16%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0100", city: "Hisar – B N GIRDHAR", state: "Haryana", x: "42.79%", y: "46.51%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0101", city: "Hisar – BALVEER SINGH", state: "Haryana", x: "42.58%", y: "40.39%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0102", city: "Hisar – Karanpal Singh", state: "Haryana", x: "38.59%", y: "45.07%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0103", city: "Hisar – DEEPAK TANEJA", state: "Haryana", x: "44.72%", y: "44.32%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0104", city: "Hisar – Neha", state: "Haryana", x: "39.67%", y: "40.71%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0105", city: "Hisar – TARUN MITTAL", state: "Haryana", x: "40.96%", y: "46.81%", capacity: "5.2 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "16+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0106", city: "Hisar – Shanti Lal", state: "Haryana", x: "44.14%", y: "41.41%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0107", city: "Hisar – Gurudawara Shree Guru Singh Sabha", state: "Haryana", x: "38.12%", y: "43.25%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0108", city: "Hisar – GURU NANAK GIRLS SCHOOL", state: "Haryana", x: "43.83%", y: "45.97%", capacity: "5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0109", city: "Hisar – DEEPAK TANEJA 2", state: "Haryana", x: "41.45%", y: "40.08%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0110", city: "Hisar – MR.JITENDER", state: "Haryana", x: "39.22%", y: "46.07%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0111", city: "Hisar – Mr.Pawan Kumar", state: "Haryana", x: "44.93%", y: "43.15%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0112", city: "Hisar – MRS.KAMLESH", state: "Haryana", x: "38.72%", y: "41.43%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0113", city: "Hisar – Kailash Rani", state: "Haryana", x: "42.16%", y: "46.92%", capacity: "6.3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "19+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0114", city: "Hisar – Hisar Exim Pvt Ltd", state: "Haryana", x: "43.33%", y: "40.52%", capacity: "35 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "105+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0115", city: "Hisar – SANT COOLING & HOME WORLD", state: "Haryana", x: "38.12%", y: "44.46%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0116", city: "Hisar – RAKESH THAKRAL", state: "Haryana", x: "44.65%", y: "45.08%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0117", city: "Hisar – KIRAN KUMARI", state: "Haryana", x: "40.24%", y: "40.19%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0118", city: "Hisar – Ravinder Parkash Nagrath", state: "Haryana", x: "40.19%", y: "46.81%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0119", city: "Hisar – Mr.Ramesh", state: "Haryana", x: "44.71%", y: "41.94%", capacity: "4.8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0120", city: "Hisar – AMAR NATH", state: "Haryana", x: "38.06%", y: "42.48%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0121", city: "Hisar – Rajesh Kumar Gupta", state: "Haryana", x: "43.35%", y: "46.59%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0122", city: "Hisar – HARI MOHAN SWEETS", state: "Haryana", x: "42.22%", y: "39.96%", capacity: "26.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "80+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0123", city: "Hisar – Kherati Lal", state: "Haryana", x: "38.56%", y: "45.63%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0124", city: "Hisar – BHAGWAN DASS JAGAN NATH", state: "Haryana", x: "45.12%", y: "43.92%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0125", city: "Hisar – AV Stainless Tube Pvt Ltd", state: "Haryana", x: "39.1%", y: "40.74%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0126", city: "Hisar – MAHAVIR PARSAD", state: "Haryana", x: "41.4%", y: "47.17%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0127", city: "Hisar – RAM LAL", state: "Haryana", x: "44.06%", y: "40.85%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0128", city: "Hisar – RAM GOPAL", state: "Haryana", x: "37.8%", y: "43.73%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0129", city: "Hisar – Dalbir Singh hisar", state: "Haryana", x: "44.39%", y: "45.84%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0130", city: "Hisar – SARITA RANI", state: "Haryana", x: "40.95%", y: "39.81%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0131", city: "Hisar – MAINA DEVI", state: "Haryana", x: "39.41%", y: "46.61%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0132", city: "Hisar – Rajnish Godara Hisar", state: "Haryana", x: "45.16%", y: "42.62%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0133", city: "Hisar – LAXMI NARAIN", state: "Haryana", x: "38.2%", y: "41.67%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0134", city: "Hisar – MEENA DEVI", state: "Haryana", x: "42.7%", y: "47.09%", capacity: "6.3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "19+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0135", city: "Hisar – United Textiles Ltd 1", state: "Haryana", x: "43.04%", y: "40.02%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0136", city: "Hisar – United Textiles Ltd 2", state: "Haryana", x: "38%", y: "45.03%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0137", city: "Hisar – SAPRA MULTISPECIALITY HOSPITAL", state: "Haryana", x: "45.12%", y: "44.74%", capacity: "220 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "660+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0138", city: "Hisar – Sushil Jewellers 2", state: "Haryana", x: "39.66%", y: "40.12%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0139", city: "Hisar – SONA DEVI", state: "Haryana", x: "40.57%", y: "47.25%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0140", city: "Hisar – Shiv Stainless Steel Pipes", state: "Haryana", x: "44.73%", y: "41.36%", capacity: "68.2 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "205+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0141", city: "Hisar – MAHAVIR PARSAD SWAMI", state: "Haryana", x: "37.66%", y: "42.9%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0142", city: "Hisar – PUSHPA DEVI", state: "Haryana", x: "43.93%", y: "46.55%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0143", city: "Hisar – BALJEET SINGH CHOPRA", state: "Haryana", x: "41.77%", y: "39.59%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0144", city: "Hisar – ANIL KUMAR(HISAR)", state: "Haryana", x: "38.66%", y: "46.21%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0145", city: "Hisar – ANITA ARORA", state: "Haryana", x: "45.44%", y: "43.42%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0146", city: "Hisar – UJJWALA LATHERS", state: "Haryana", x: "38.53%", y: "40.89%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0147", city: "Hisar – Babli Devi", state: "Haryana", x: "41.92%", y: "47.45%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0148", city: "Hisar – UDAY PETRO", state: "Haryana", x: "43.86%", y: "40.29%", capacity: "11 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "33+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0149", city: "Hisar – MR.VINOD KUMAR", state: "Haryana", x: "37.58%", y: "44.27%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0150", city: "Hisar – Dr.Yashveer", state: "Haryana", x: "44.92%", y: "45.59%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0151", city: "Hisar – ANITA ARORA 2", state: "Haryana", x: "40.38%", y: "39.64%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0152", city: "Hisar – KUNJ TRADERS", state: "Haryana", x: "39.71%", y: "47.12%", capacity: "35 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "105+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0153", city: "Hisar – SURYAKARAN", state: "Haryana", x: "45.28%", y: "42.04%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0154", city: "Hisar – TAMAS RECREATIONS", state: "Haryana", x: "37.72%", y: "42.02%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0155", city: "Hisar – ANJANA VERMA", state: "Haryana", x: "43.3%", y: "47.16%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0156", city: "Hisar – Rahul Gupta", state: "Haryana", x: "42.65%", y: "39.58%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0157", city: "Hisar – HISAR HETCHERY", state: "Haryana", x: "37.99%", y: "45.63%", capacity: "60 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "180+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0158", city: "Hisar – MS. MANJU SOMANI", state: "Haryana", x: "45.54%", y: "44.3%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0159", city: "Hisar – ASHOK SAINI", state: "Haryana", x: "39.06%", y: "40.17%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0160", city: "Hisar – RAJPATI", state: "Haryana", x: "41.05%", y: "47.62%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0161", city: "Hisar – BHP FILLING STATION", state: "Haryana", x: "44.62%", y: "40.76%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0162", city: "Hisar – MRS. RAJ RANI", state: "Haryana", x: "37.33%", y: "43.41%", capacity: "4 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "12+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0163", city: "Hisar – K K MARBLE & GRANITE", state: "Haryana", x: "44.52%", y: "46.39%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0164", city: "Hisar – MR. ASHOK KUMAR", state: "Haryana", x: "41.22%", y: "39.32%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0165", city: "Hisar – MONA GUPTA", state: "Haryana", x: "38.87%", y: "46.78%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0166", city: "Hisar – RAJESH GUPTA", state: "Haryana", x: "45.67%", y: "42.86%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0167", city: "Hisar – MR. SANJEEV KUMAR", state: "Haryana", x: "37.98%", y: "41.15%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0168", city: "Hisar – DHARAM BIR RETWAL", state: "Haryana", x: "42.51%", y: "47.62%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0169", city: "Hisar – SHAKUNTLA DEVI", state: "Haryana", x: "43.54%", y: "39.77%", capacity: "10.35 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "32+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0170", city: "Hisar – JYOTI", state: "Haryana", x: "37.46%", y: "44.88%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0171", city: "Hisar – PANKAJ CHUG", state: "Haryana", x: "45.42%", y: "45.22%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0172", city: "Hisar – MR. ARUN KUMAR", state: "Haryana", x: "39.77%", y: "39.57%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0173", city: "Hisar – SUDHIR KUMAR", state: "Haryana", x: "40.12%", y: "47.58%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0174", city: "Hisar – MR. ASHOK KUMAR RAM NARAIN", state: "Haryana", x: "45.28%", y: "41.42%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0175", city: "Hisar – BALVANT AGGARWAL", state: "Haryana", x: "37.29%", y: "42.48%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0176", city: "Hisar – NARESH KUMAR GROVER", state: "Haryana", x: "43.92%", y: "47.11%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0177", city: "Hisar – MR. SANJIV KUMAR GOYAL", state: "Haryana", x: "42.15%", y: "39.19%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0178", city: "Hisar – MR. RAJVIR SINGH", state: "Haryana", x: "38.1%", y: "46.24%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0179", city: "Hisar – BAL KRISHNA GUPTA", state: "Haryana", x: "45.87%", y: "43.78%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0180", city: "Hisar – DR. BAL KRISHAN GUPTA", state: "Haryana", x: "38.46%", y: "40.33%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0181", city: "Hisar – HOTAL CROWN CITY", state: "Haryana", x: "41.61%", y: "47.9%", capacity: "19 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "57+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0182", city: "Hisar – KULBIR", state: "Haryana", x: "44.4%", y: "40.17%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0183", city: "Hisar – PREMA DEVI", state: "Haryana", x: "37.1%", y: "43.99%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0184", city: "Hisar – MR. PARVEEN SURA", state: "Haryana", x: "45.09%", y: "46.12%", capacity: "12 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "36+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0185", city: "Hisar – PARVINDER SINGH", state: "Haryana", x: "40.62%", y: "39.14%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0186", city: "Hisar – RAJKUMAR BANIWAL", state: "Haryana", x: "39.2%", y: "47.32%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0187", city: "Hisar – GEETA DEVI", state: "Haryana", x: "45.79%", y: "42.23%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0188", city: "Hisar – VANDANA MEHTA", state: "Haryana", x: "37.47%", y: "41.53%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0189", city: "Hisar – HARDESH RAHEJA", state: "Haryana", x: "43.15%", y: "47.69%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0190", city: "Hisar – MRS. SEEMA", state: "Haryana", x: "43.12%", y: "39.29%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0191", city: "Hisar – J P SHARMA", state: "Haryana", x: "37.45%", y: "45.52%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0192", city: "Hisar – MR. SURESH SHARMA", state: "Haryana", x: "45.86%", y: "44.75%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0193", city: "Hisar – ATUL GIRDHAR", state: "Haryana", x: "39.12%", y: "39.62%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0194", city: "Hisar – BAWANI WALA PLASTIC UDYOG 2", state: "Haryana", x: "40.63%", y: "47.98%", capacity: "7 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0195", city: "Hisar – MRS. SUMITRA", state: "Haryana", x: "45.17%", y: "40.78%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0196", city: "Hisar – MANJU DEVI", state: "Haryana", x: "36.94%", y: "43.02%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0197", city: "Hisar – Hisar Exim Pvt Ltd 2", state: "Haryana", x: "44.55%", y: "46.94%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0198", city: "Hisar – NIRMALA DEVI", state: "Haryana", x: "41.58%", y: "38.89%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0199", city: "Hisar – VIKRANT KATHURIA", state: "Haryana", x: "38.32%", y: "46.85%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0200", city: "Hisar – PUSHPA W/O SHAMSHER", state: "Haryana", x: "46.12%", y: "43.17%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0201", city: "Hisar – RENU CHOUDHARY", state: "Haryana", x: "37.87%", y: "40.61%", capacity: "15 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0202", city: "Hisar – DINESH KUMAR GARG", state: "Haryana", x: "42.23%", y: "48.09%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0203", city: "Hisar – SUNIL GOYAL", state: "Haryana", x: "44.07%", y: "39.61%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0204", city: "Hisar – SHRI LAXMI METAL", state: "Haryana", x: "36.96%", y: "44.64%", capacity: "315 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "945+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0205", city: "Hisar – KAPIL KUKREJA", state: "Haryana", x: "45.62%", y: "45.73%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0206", city: "Hisar – NITIN", state: "Haryana", x: "39.96%", y: "39.06%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0207", city: "Hisar – JAI DAYAL", state: "Haryana", x: "39.63%", y: "47.82%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0208", city: "Hisar – JAGDISH CHANDER", state: "Haryana", x: "45.81%", y: "41.57%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0209", city: "Hisar – DEVENDER KUMAR TAKHRAL", state: "Haryana", x: "37.01%", y: "42.01%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0210", city: "Hisar – GARG HOSPITAL", state: "Haryana", x: "43.81%", y: "47.64%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0211", city: "Hisar – SANGEETA BANSAL", state: "Haryana", x: "42.6%", y: "38.87%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0212", city: "Hisar – MR. BAJAN LAL", state: "Haryana", x: "37.55%", y: "46.17%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0213", city: "Hisar – SURENDER KUMAR", state: "Haryana", x: "46.23%", y: "44.19%", capacity: "5.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "17+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0214", city: "Hisar – USHA JINDAL", state: "Haryana", x: "38.48%", y: "39.79%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0215", city: "Hisar – OMPATI", state: "Haryana", x: "41.22%", y: "48.29%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0216", city: "Bhiwani – Rajkumar", state: "Haryana", x: "53.67%", y: "51.5%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0217", city: "Bhiwani – THE OAKWOOD SCHOOL", state: "Haryana", x: "52.3%", y: "50.86%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0218", city: "Bhiwani – URJAGREEN POWER PVT LTD", state: "Haryana", x: "53.1%", y: "52.65%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0219", city: "Bhiwani – SUNITA DEVI", state: "Haryana", x: "53.81%", y: "50.44%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0220", city: "Bhiwani – BBMB DIVISION OFFICE", state: "Haryana", x: "51.53%", y: "51.76%", capacity: "39.6 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "119+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0221", city: "Bhiwani – SUB DIVISION OFFICE", state: "Haryana", x: "54.38%", y: "52.38%", capacity: "39.6 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "119+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0222", city: "Bhiwani – CONTROL ROOM BBMB", state: "Haryana", x: "52.54%", y: "49.8%", capacity: "97.7 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "294+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0223", city: "Bhiwani – VED PARKASH", state: "Haryana", x: "52.13%", y: "53.17%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0224", city: "Bhiwani – TARIF HATCHERY", state: "Haryana", x: "54.88%", y: "50.81%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0225", city: "Bhiwani – AGARWAL ELECTRICAL", state: "Haryana", x: "51.05%", y: "50.69%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0226", city: "Bhiwani – AGARWAL TRADERS", state: "Haryana", x: "53.94%", y: "53.5%", capacity: "45 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "135+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0227", city: "Bhiwani – MANGAL CONCRETE", state: "Haryana", x: "53.69%", y: "49.29%", capacity: "15 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0228", city: "Bhiwani – SARITA DEVI", state: "Haryana", x: "50.92%", y: "52.71%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0229", city: "Bhiwani – MRS. SONIA", state: "Haryana", x: "55.44%", y: "52.04%", capacity: "15 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0230", city: "Bhiwani – SUNITA DEVI 2", state: "Haryana", x: "51.51%", y: "49.39%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0231", city: "Bhiwani – Memory inn hotel", state: "Haryana", x: "52.66%", y: "54.15%", capacity: "20 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "60+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0232", city: "Bhiwani – Kosal Kumar", state: "Haryana", x: "55.1%", y: "49.73%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0233", city: "Bhiwani – Khewat No-2485 Farm", state: "Haryana", x: "50.17%", y: "51.38%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0234", city: "Bhiwani – AGARWAL TRADERS Dulheri", state: "Haryana", x: "55.06%", y: "53.55%", capacity: "300 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "900+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0235", city: "Bhiwani – SURESH TRADING CO", state: "Haryana", x: "52.86%", y: "48.52%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0236", city: "Bhiwani – AGARWAL TRADERS Dulheri 2", state: "Haryana", x: "51.04%", y: "53.85%", capacity: "85 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "255+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0237", city: "Bhiwani – MUNGIPA IRRITECH Dulheri", state: "Haryana", x: "56.1%", y: "51.08%", capacity: "60 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "180+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0238", city: "Bhiwani – MUNGIPA IRRITECH Dulheri 2", state: "Haryana", x: "50.37%", y: "49.67%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0239", city: "Charkhi Dadri – PAITAWAS POULTRY FARM", state: "Haryana", x: "51.22%", y: "58%", capacity: "5.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "17+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0240", city: "Fatehabad – LAXMI DEVI", state: "Haryana", x: "37.7%", y: "37.5%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0241", city: "Fatehabad – SUDESH RANI", state: "Haryana", x: "36.27%", y: "36.83%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0242", city: "Fatehabad – RAJKUMAR FATHABAD", state: "Haryana", x: "37.11%", y: "38.7%", capacity: "6.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "20+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0243", city: "Fatehabad – SANTOSH KUMARI", state: "Haryana", x: "37.85%", y: "36.39%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0244", city: "Fatehabad – SUMAN GARG", state: "Haryana", x: "35.46%", y: "37.77%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0245", city: "Fatehabad – RAJ RANI", state: "Haryana", x: "38.44%", y: "38.42%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0246", city: "Fatehabad – MEENU BALA", state: "Haryana", x: "36.52%", y: "35.72%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0247", city: "Fatehabad – Shree Manka Meshwar Mandir", state: "Haryana", x: "36.09%", y: "39.25%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0248", city: "Fatehabad – RAJ RANI 2", state: "Haryana", x: "38.97%", y: "36.78%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0249", city: "Fatehabad – NISANT", state: "Haryana", x: "34.96%", y: "36.66%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0250", city: "Fatehabad – ANKIT KUMAR", state: "Haryana", x: "37.98%", y: "39.6%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0251", city: "Fatehabad – KAMLESH RANI", state: "Haryana", x: "37.72%", y: "35.19%", capacity: "6.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "20+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0252", city: "Fatehabad – SHRI MAHAVIR TRADING COMPANY", state: "Haryana", x: "34.82%", y: "38.76%", capacity: "40 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "120+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0253", city: "Fatehabad – RAMESH KUMARI", state: "Haryana", x: "39.55%", y: "38.06%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0254", city: "Fatehabad – M.L Gum & Chemical", state: "Haryana", x: "35.44%", y: "35.29%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0255", city: "Fatehabad – Ganpati Gum & Chemicals", state: "Haryana", x: "36.64%", y: "40.27%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0256", city: "Fatehabad – HP SHRI BALAJI PETROLEUM", state: "Haryana", x: "39.2%", y: "35.64%", capacity: "8 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0257", city: "Fatehabad – GOYAL COTTON & OIL INDUSTRY", state: "Haryana", x: "34.04%", y: "37.38%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0258", city: "Fatehabad – BUTA SINGH", state: "Haryana", x: "39.16%", y: "39.65%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0259", city: "Fatehabad – GURTEJ SINGH", state: "Haryana", x: "36.86%", y: "34.38%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0260", city: "Fatehabad – SHAHEED BABA DEEP SINGH", state: "Haryana", x: "34.95%", y: "39.96%", capacity: "48 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "144+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0261", city: "Safidon – Champion Research And Breeding Farm", state: "Haryana", x: "60.22%", y: "40%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0262", city: "Loharu – SAFAL FEEDS PRIVATE LIMITED", state: "Haryana", x: "48.31%", y: "53%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2019", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0263", city: "Loharu – SAFAL FEEDS PRIVATE LIMITED 2", state: "Haryana", x: "47.68%", y: "52.7%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0264", city: "Faridabad – AHUJA CONSTRUCTION", state: "Haryana", x: "80.22%", y: "60%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0265", city: "Siwani – Verma Electronics", state: "Haryana", x: "43.73%", y: "54%", capacity: "5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0266", city: "Siwani – Verma Electronics 2", state: "Haryana", x: "42.24%", y: "53.3%", capacity: "6 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0267", city: "Siwani – B.R GUAR GUM PVT LTD", state: "Haryana", x: "43.11%", y: "55.26%", capacity: "300 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "900+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0268", city: "Siwani – SHREE SHYAM INDUSTRIES", state: "Haryana", x: "43.89%", y: "52.84%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0269", city: "Siwani – Jai Bharat Gum & Chemicals", state: "Haryana", x: "41.39%", y: "54.28%", capacity: "650 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "1950+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0270", city: "Siwani – TIKU RAM GUM AND CHEMICALS", state: "Haryana", x: "44.51%", y: "54.96%", capacity: "125 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "375+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0271", city: "Siwani – TIKU RAM GUM 2", state: "Haryana", x: "42.5%", y: "52.14%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0272", city: "Siwani – TIKU RAM GUM AND CHEMICALS 2", state: "Haryana", x: "42.05%", y: "55.83%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0273", city: "Siwani – SHEENU SONI", state: "Haryana", x: "45.06%", y: "53.25%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0274", city: "Siwani – GOVIND RAM", state: "Haryana", x: "40.87%", y: "53.12%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0275", city: "Siwani – AVNISH KUMAR", state: "Haryana", x: "44.03%", y: "56.19%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0276", city: "Rohtak – ELECTRONICS HUB", state: "Haryana", x: "62.31%", y: "51%", capacity: "30 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "90+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0277", city: "Rohtak – Dr.Usha Chhillar", state: "Haryana", x: "61.68%", y: "50.7%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0278", city: "Panchkula – PARMOD JINDAL PANCHKULA", state: "Haryana", x: "74.7%", y: "12.5%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0279", city: "Panchkula – Moon Star Enterprises", state: "Haryana", x: "73.27%", y: "11.84%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0280", city: "Panchkula – NEERA GUPTA", state: "Haryana", x: "74.11%", y: "13.7%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0281", city: "Panchkula – ARTI DAHIYA", state: "Haryana", x: "74.85%", y: "11.4%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0282", city: "Panchkula – PREM KUMAR", state: "Haryana", x: "72.47%", y: "12.77%", capacity: "8 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "24+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0283", city: "Panchkula – N K JAIN", state: "Haryana", x: "75.44%", y: "13.41%", capacity: "3.1 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "10+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0284", city: "Panchkula – Mr.Lalit Mohan", state: "Haryana", x: "73.52%", y: "10.72%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0285", city: "Panchkula – HARI OM SHARMA", state: "Haryana", x: "73.09%", y: "14.25%", capacity: "9.9 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0286", city: "Panchkula – TARUNA GUPTA", state: "Haryana", x: "75.96%", y: "11.78%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0287", city: "Panchkula – FINKOTECH INC.", state: "Haryana", x: "71.97%", y: "11.66%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0288", city: "Hansi – BALRAJ", state: "Haryana", x: "54.32%", y: "46%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2020", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0289", city: "Hansi – HARYANA SALES", state: "Haryana", x: "52.64%", y: "45.21%", capacity: "5.5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "17+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0290", city: "Hansi – MUKUL MITTAL", state: "Haryana", x: "53.62%", y: "47.42%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0291", city: "Hansi – Krishana Cotton Oil & General Mills", state: "Haryana", x: "54.5%", y: "44.69%", capacity: "125 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "375+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0292", city: "Hansi – SEEMA TAYAL", state: "Haryana", x: "51.69%", y: "46.32%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0293", city: "Hansi – Fortune Poultry Feeds", state: "Haryana", x: "55.2%", y: "47.08%", capacity: "250 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "750+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0294", city: "Hansi – SAPNA BEVERAGES INDUSTRY", state: "Haryana", x: "52.93%", y: "43.9%", capacity: "300 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "900+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0295", city: "Hansi – SUNIL MOTORS", state: "Haryana", x: "52.43%", y: "48.07%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0296", city: "Hansi – NATIONAL INDO GERMAN ORGANIC PRODUCT", state: "Haryana", x: "55.82%", y: "45.15%", capacity: "10 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0297", city: "Hansi – ARJUN OIL MILL", state: "Haryana", x: "51.09%", y: "45.01%", capacity: "200 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "600+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0298", city: "Hansi – AMIT JAIN", state: "Haryana", x: "54.66%", y: "48.47%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0299", city: "Hansi – SAPNA BEVERAGES", state: "Haryana", x: "54.35%", y: "43.28%", capacity: "250 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "750+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0300", city: "Hansi – ARYA KUMAR", state: "Haryana", x: "50.93%", y: "47.49%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0301", city: "Hansi – SURYA POLYFLEX PRIVATE LIMITED", state: "Haryana", x: "56.51%", y: "46.66%", capacity: "650 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "1950+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0302", city: "Uklana – P S Sodhi", state: "Haryana", x: "45.22%", y: "45%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0303", city: "Sirsa – ANJU SINGLA", state: "Haryana", x: "26.44%", y: "37%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0304", city: "Sirsa – SURYA WASTE MANAGEMANT", state: "Haryana", x: "25.54%", y: "36.58%", capacity: "15 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "45+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0305", city: "Sirsa – VEER BIGGAJI KISAN SEWA KENDRA", state: "Haryana", x: "26.07%", y: "37.76%", capacity: "5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0306", city: "Sirsa – PUNJAB RICE MILLS", state: "Haryana", x: "26.54%", y: "36.3%", capacity: "120 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "360+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0307", city: "Satrod – AV PRECISION TUBE PVT LTD", state: "Haryana", x: "49.31%", y: "49%", capacity: "80 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "240+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0308", city: "Satrod – Babli Devi Satroad", state: "Haryana", x: "48.68%", y: "48.7%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0309", city: "Karnal – CHANDER PRABHA", state: "Haryana", x: "70.22%", y: "35%", capacity: "7 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0310", city: "Panipat – Sanjay Kataria", state: "Haryana", x: "70.22%", y: "42%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0311", city: "Juglan – HISAR RESEARCH & BREEDING FARM", state: "Haryana", x: "48.22%", y: "48%", capacity: "120 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "360+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0312", city: "Tauru – Orphans in Need", state: "Haryana", x: "73.22%", y: "63.8%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0313", city: "Ambala – ASHOK KUMAR", state: "Haryana", x: "74.31%", y: "19%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2022", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0314", city: "Ambala – MR. ASHOK KUMAR", state: "Haryana", x: "73.68%", y: "18.7%", capacity: "6 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "18+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0315", city: "Agroha – Radiance Educational Trust", state: "Haryana", x: "44.22%", y: "46%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0316", city: "Barwa – Bharti Oil and Fibre Mills", state: "Haryana", x: "44.31%", y: "57.5%", capacity: "320 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "960+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0317", city: "Barwa – JAI SHUV TAX FEB", state: "Haryana", x: "43.68%", y: "57.2%", capacity: "195 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "585+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0318", city: "Adampur – JAI MAA KALYANI COTTEX", state: "Haryana", x: "38.58%", y: "46%", capacity: "210 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "630+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0319", city: "Adampur – JAI MAA Ambey Oil Mills", state: "Haryana", x: "37.8%", y: "45.64%", capacity: "120 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "360+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0320", city: "Adampur – TANEJA BROTHERS MILK & FOOD", state: "Haryana", x: "38.26%", y: "46.66%", capacity: "100 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "300+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0321", city: "Sonipat – AGARWAL ELECTRICAL Ganaur", state: "Haryana", x: "70.31%", y: "48%", capacity: "77 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "231+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0322", city: "Sonipat – SAMRADITYA TEXTILES", state: "Haryana", x: "69.68%", y: "47.7%", capacity: "550 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "1650+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0323", city: "Jind – MUNGIPA IRRITECH", state: "Haryana", x: "60.22%", y: "41%", capacity: "49.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "149+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0324", city: "Panihar – SIYARAM IRRIGATION 1", state: "Haryana", x: "48.31%", y: "51%", capacity: "125 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "375+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0325", city: "Panihar – SIYARAM IRRIGATION 2", state: "Haryana", x: "47.68%", y: "50.7%", capacity: "135 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "405+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0326", city: "Gurugram – Rajnish Godara", state: "Haryana", x: "68.22%", y: "62%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0327", city: "Gangwa – REKHA VERMA", state: "Haryana", x: "46.72%", y: "49.5%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0328", city: "Barwala – DUNNICHAND AGRO INDUSTRIES", state: "Haryana", x: "49.44%", y: "39.5%", capacity: "225 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "675+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0329", city: "Barwala – TARSEM CHAND", state: "Haryana", x: "48.54%", y: "39.08%", capacity: "3 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "9+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0330", city: "Barwala – RAVI DUTT TARSEAM CHAND", state: "Haryana", x: "49.07%", y: "40.26%", capacity: "130 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "390+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0331", city: "Barwala – KK COTTEX", state: "Haryana", x: "49.54%", y: "38.8%", capacity: "225 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "675+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0332", city: "Kalanwali – PUNJAB RICE MILLS", state: "Haryana", x: "24.22%", y: "38%", capacity: "120 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "360+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0333", city: "Talwandi Rana – SUPER SEEDS PRIVATE LTD", state: "Haryana", x: "49.22%", y: "47%", capacity: "300 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "900+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0334", city: "Chaudhriwas – BIMLA INDUSTRIES HOUSE 1", state: "Haryana", x: "47.31%", y: "50.5%", capacity: "500 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "1500+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0335", city: "Chaudhriwas – BIMLA INDUSTRIES HOUSE 2", state: "Haryana", x: "46.68%", y: "50.2%", capacity: "400 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "1200+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0336", city: "Ganaur – SAMRADITYA TEXTILES", state: "Haryana", x: "70.22%", y: "51%", capacity: "550 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "1650+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0337", city: "Khubru – AGARWAL ELECTRICAL Khubru", state: "Haryana", x: "70.72%", y: "48.5%", capacity: "77 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "231+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0338", city: "Hadwa – MUNGIPA IRRITECH Hadwa", state: "Haryana", x: "60.72%", y: "41.5%", capacity: "49.5 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "149+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0339", city: "Dhuleri – AGARWAL TRADERS Dulheri", state: "Haryana", x: "53.88%", y: "52%", capacity: "300 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "900+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0340", city: "Dhuleri – MUNGIPA IRRITECH Dulheri", state: "Haryana", x: "53.1%", y: "51.64%", capacity: "60 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "180+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0341", city: "Dhuleri – MUNGIPA IRRITECH Dulheri 2", state: "Haryana", x: "53.56%", y: "52.66%", capacity: "50 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "150+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0342", city: "Bawani Khera – Bawani Khera Farm", state: "Haryana", x: "52.72%", y: "51%", capacity: "10 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "30+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0343", city: "Tosham – P.K.Fuel Centre", state: "Haryana", x: "52.44%", y: "49%", capacity: "7 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "21+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0344", city: "Tosham – Kirshan Chander", state: "Haryana", x: "51.54%", y: "48.58%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2023", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0345", city: "Tosham – Radha Swami Satsang", state: "Haryana", x: "52.07%", y: "49.76%", capacity: "30 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2024", panelsInstalled: "90+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0346", city: "Tosham – MR. ROSHAN LAL", state: "Haryana", x: "52.54%", y: "48.3%", capacity: "5 KW", type: "Residential", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2025", panelsInstalled: "15+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
    { id: "hr-0347", city: "Rewari – SHIVA BATTERY HOUSE", state: "Haryana", x: "65.22%", y: "65%", capacity: "14 KW", type: "Industrial/Commercial", builder: "Divvy Solar EPC", builderRole: "Lead EPC Partner", completedYear: "2021", panelsInstalled: "42+", status: "Operational", pinColor: "#fbbf24", region: "Haryana" },
];;

const HARYANA_PROJECTS = BASE_HARYANA_PROJECTS;

export default function HaryanaProjectsPage() {
    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-amber-500 selection:text-white">
            {/* HERO */}
            <section className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-[#050a14]">
                <Image
                    src="/har1_main.jpeg"
                    alt="Haryana Solar Vision"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-105"
                    quality={100}
                />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(105deg, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.85) 40%, rgba(5,10,20,0.40) 70%, rgba(5,10,20,0.1) 100%)`,
                    }}
                />
                <div
                    className="absolute top-0 left-0 z-10 pointer-events-none"
                    style={{
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(ellipse at top left, rgba(254,203,0,0.07) 0%, transparent 65%)',
                    }}
                />
                <div
                    className="absolute top-0 left-0 z-20 h-[3px]"
                    style={{ width: '45%', background: 'linear-gradient(to right, #FECB00, transparent)' }}
                />
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-24 pb-28 md:py-28 md:pb-32">
                    <div className="max-w-2xl">
                        <div
                            className="inline-flex items-center gap-2.5 mb-8"
                            style={{
                                background: 'rgba(254,203,0,0.08)',
                                border: '1px solid rgba(254,203,0,0.25)',
                                borderRadius: '100px',
                                padding: '6px 16px',
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                                style={{ boxShadow: '0 0 6px rgba(254,203,0,0.8)' }}
                            />
                            <span className="text-yellow-300/90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
                                Haryana Coverage Area
                            </span>
                        </div>

                        <h1
                            className="font-extrabold text-white mb-6"
                            style={{
                                fontSize: 'clamp(2rem, 8vw, 3.6rem)',
                                lineHeight: '1.1',
                                letterSpacing: '-0.5px',
                                fontFamily: '"Georgia", serif',
                                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            Energizing Haryana&apos;s <br className="hidden sm:block" /> Growth Engine
                        </h1>

                        <div
                            className="mb-6"
                            style={{
                                width: '50px',
                                height: '3px',
                                background: 'linear-gradient(to right, #FECB00, rgba(254,203,0,0.2))',
                                borderRadius: '2px',
                            }}
                        />

                        <p
                            className="text-white/90 font-normal mb-10"
                            style={{ fontSize: '0.92rem', lineHeight: '1.8', maxWidth: '380px' }}
                        >
                            Delivering robust industrial solar parks and commercial rooftop grids that empower
                            manufacturing and drive limitless expansion.
                        </p>

                        <div className="flex items-center gap-4 flex-wrap">
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center gap-2.5 font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                                style={{
                                    background: 'linear-gradient(135deg, #FECB00 0%, #f5b800 100%)',
                                    color: '#0a0f1e',
                                    boxShadow: '0 4px 20px rgba(254,203,0,0.35)',
                                }}
                            >
                                Get a Free Quote
                            </Link>

                            <a
                                href="#explore-projects"
                                className="inline-flex justify-center items-center gap-2.5 font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white',
                                    background: 'rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                View Projects
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-8 md:-mt-12 relative z-30 mb-12 lg:mb-20">
                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] px-6 py-8 md:px-12 md:py-10 border border-slate-100/80">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x-0 lg:divide-x divide-slate-100">
                        {[
                            {
                                icon: CheckCircleIcon,
                                val: "1000+",
                                label: "Solar Projects Delivered",
                                color: "text-amber-600",
                                bg: "bg-amber-50",
                            },
                            {
                                icon: ChartBarIcon,
                                val: "8+ Years",
                                label: "EPC Experience",
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                            },
                            {
                                icon: BoltIcon,
                                val: "Across Haryana",
                                label: "Execution Capability",
                                color: "text-amber-600",
                                bg: "bg-amber-50",
                            },
                            {
                                icon: SunIcon,
                                val: '24/7',
                                label: 'Remote Monitoring Support',
                                color: 'text-amber-600',
                                bg: 'bg-amber-50',
                            },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center lg:items-start lg:pl-10 first:pl-0 group"
                            >
                                <div
                                    className={`p-3.5 rounded-2xl ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                                >
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                                    {stat.val}
                                </h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center lg:text-left leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-10 lg:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
                    <div className="space-y-6 order-1 flex flex-col justify-center">
                        <div>
                            <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-amber-500 rounded-full"></span>
                                Why Haryana?
                            </span>

                            <h3
                                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
                                style={{ fontFamily: '"Georgia", serif' }}
                            >
                                Haryana’s Trusted Solar EPC Hub for Industry
                            </h3>
                        </div>

                        <p className="text-base text-slate-700 leading-relaxed font-normal">
                            Haryana is one of North India’s strongest industrial corridors, spanning <strong className="text-slate-900 font-bold">Gurgaon, Panipat, Hisar, and beyond</strong>, where energy demand and operating costs are consistently high. Divvy Solar helps factories, warehouses, and commercial facilities reduce power expenses with <strong className="text-slate-900 font-bold">industrial rooftop solar, on-grid solar plants</strong>, and scalable EPC execution designed for long-term performance.
                        </p>

                        <div className="space-y-3">
                            {[
                                {
                                    title: "Industrial Rooftop Solar for High-Load Facilities",
                                    desc: "We design and install high-capacity rooftop systems that maximize available space, improve generation, and reduce dependence on grid tariffs.",
                                },
                                {
                                    title: "Performance-Driven ROI",
                                    desc: "With optimized engineering, quality components, and disciplined commissioning, our projects are built to deliver strong generation and faster payback, without disrupting operations.",
                                },
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                                            <CheckCircleIcon className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-slate-900 mb-0.5">{feature.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed font-normal">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-2 relative h-full min-h-[400px]">
                        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl group">
                            <Image
                                src="/about_us_main_4k.webp"
                                alt="Haryana Solar Potential HD"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                quality={75}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* INTERACTIVE MAP */}
            <div
                id="explore-projects"
                className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 border-t border-slate-100 relative"
            >
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#1A0C02 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <InteractiveMap
                    mapImage="/haryana-updated.svg"
                    customProjects={HARYANA_PROJECTS}
                    title="Live Haryana Coverage"
                    subtitle="335+ verified installations across <span class='font-black text-amber-600'>Haryana</span>. Click any pin for project details."
                    headerLabel="Live Project Coverage"
                />
            </div>

            {/* BOTTOM CTA */}
            <div className="max-w-7xl mx-auto px-6 pb-32 lg:pb-32">
                <div className="relative py-10 px-8 rounded-[2.5rem] overflow-hidden bg-[#0a0f1c] text-center border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
                    <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight"
                            style={{ fontFamily: '"Georgia", serif' }}
                        >
                            Ready to shrink your electricity bills?
                        </h2>
                        <p className="text-stone-400 mb-8 text-sm md:text-base max-w-lg">
                            Join forward-thinking businesses across Haryana achieving energy independence.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#050a14] bg-amber-400 rounded-full hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:-translate-y-1"
                        >
                            Get a Free Site Assessment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}