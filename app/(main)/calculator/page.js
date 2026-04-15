import PageHero from "@/components/common/PageHero";
import SolarCalculator from "@/components/calculator/SolarCalculator";

export const metadata = {
    title: 'Solar Calculator | Divvy Solar',
    description: 'Calculate your exact rooftop solar system size, monthly savings, and return on investment with the Divvy Solar AI Estimator.',
};

export default function CalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Premium Hero inspired by latest designs */}
            <PageHero
                title="Your Financial Freedom Planner"
                subtitle="Instantly calculate your required solar setup to zero out grid electricity bills permanently."
                backgroundImage="/uti2_main.jpeg"
            />

            {/* The Custom Component built as requested */}
            <SolarCalculator />
        </main>
    );
}
