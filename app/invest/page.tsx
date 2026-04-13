import Hero from "@/components/invest/Hero";
import HowItWorks from "@/components/invest/HowItWorks";
import MarketFocus from "@/components/invest/MarketFocus";
import ProjectsFeatured from "@/components/invest/ProjectsFeatured";
import AIPlans from "@/components/invest/AIPlans";
import RiskArchitecture from "@/components/invest/RiskArchitecture";
import FinalCTA from "@/components/invest/FinalCTA";

export default function InvestPage() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <MarketFocus />
            <ProjectsFeatured />
            <AIPlans />
            <RiskArchitecture />
            <FinalCTA />
        </main>
    );
}
