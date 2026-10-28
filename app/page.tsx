import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Closing } from "@/components/landing/Closing";
import { CostOfInaction } from "@/components/landing/CostOfInaction";
import { FaqSection } from "@/components/landing/FaqSection";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { NutritionistBand } from "@/components/landing/NutritionistBand";
import { PatientStory } from "@/components/landing/PatientStory";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-label focus:text-ink"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <Problem />
        <PatientStory />
        <NutritionistBand />
        <HowItWorks />
        <BeforeAfter />
        <CostOfInaction />
        <Pricing />
        <FaqSection />
        <Closing />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
