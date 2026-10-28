import { hero } from "@/content/landing";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneMockup } from "./PhoneMockup";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-surface-sage pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-nu grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h1
            id="hero-title"
            className="font-display text-heading-1 text-balance text-ink sm:text-display-l xl:text-display-xl"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-body-l text-ink-muted">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <CtaButton />
            <p className="text-caption text-ink-muted">{hero.note}</p>
          </div>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}
