import { LandingHeader } from "./landingHeader";
import { HeroSection } from "./heroSection";
import { InteractivePatternDemo } from "./interactivePatternDemo";
import { GeneratorShowcase } from "./generatorShowcase";
import { HowItWorksSection } from "./howItWorksSection";
import { DeveloperSection } from "./developerSection";
import { FeatureSection } from "./featureSection";
import { UseCasesSection } from "./useCasesSection";
import { FinalCtaSection } from "./finalCtaSection";
import { LandingFooter } from "./landingFooter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-pencil">
      <LandingHeader />
      <main>
        <HeroSection />
        <InteractivePatternDemo />
        <GeneratorShowcase />
        <HowItWorksSection />
        <DeveloperSection />
        <FeatureSection />
        <UseCasesSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
