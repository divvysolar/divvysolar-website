import PageHero from "@/components/common/PageHero";
import SustainabilityCalculator from "@/components/calculator/SustainabilityCalculator";

export const metadata = {
    title: 'Sustainability Calculator | Divvy Solar',
    description: 'Calculate the genuine environmental impact of your solar installation — CO2 offset, coal avoided, trees equivalent, and more. Powered by Divvy Solar official data.',
    alternates: { canonical: 'https://divvysolar.in/sustainability-calculator' },
};

export default function SustainabilityCalculatorPage() {
    return (
        <main className="min-h-screen bg-white">
            <PageHero
                title="Sustainability Calculator"
                subtitle="Measure the real environmental impact of your solar investment using verified Divvy Solar metrics."
                backgroundImage="/Sustainable Development.jpg"
            />
            <SustainabilityCalculator />
        </main>
    );
}
