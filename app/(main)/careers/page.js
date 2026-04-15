import PageHero from "@/components/common/PageHero";
import CareerBoard from "@/components/careers/CareerBoard";

export const metadata = {
    title: 'Careers | Divvy Solar',
    description: 'Join the green energy revolution. View our open positions in Operations, Sales, and Design across Punjab and Haryana.',
};

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            
            
            <CareerBoard />
        </main>
    );
}
