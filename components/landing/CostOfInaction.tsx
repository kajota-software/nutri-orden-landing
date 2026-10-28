import { cost } from "@/content/landing";
import { CtaButton } from "@/components/ui/CtaButton";
import { CountUp } from "./CountUp";

export function CostOfInaction() {
  return (
    <section aria-labelledby="costo-title" className="section-y bg-avena">
      <div className="container-nu grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <h2 data-reveal id="costo-title" className="font-display text-heading-1 text-balance text-ink md:text-display-l">
          {cost.title}
        </h2>
        <div data-reveal>
          <CountUp
            value={cost.figure.value}
            prefix={cost.figure.prefix}
            suffix={cost.figure.suffix}
            className="font-display text-heading-1 whitespace-nowrap text-brand tabular-nums sm:text-display-l md:text-display-xl"
          />
          <p className="mt-6 max-w-prose text-body-l text-ink-muted">{cost.text}</p>
          <p className="mt-3 text-caption text-ink-muted">{cost.note}</p>
          <CtaButton className="mt-10" />
        </div>
      </div>
    </section>
  );
}
