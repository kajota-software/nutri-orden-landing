import { Check, Sparkles } from "lucide-react";
import { pricing } from "@/content/landing";
import { CtaButton } from "@/components/ui/CtaButton";

/** Dos planes: Consulta ($99) y, a la par y más grande, Clínicas (más adelante). */
export function Pricing() {
  const { consulta, clinicas } = pricing.plans;
  return (
    <section id={pricing.id} aria-labelledby="precio-title" className="section-y">
      <div className="container-nu">
        <h2 data-reveal id="precio-title" className="mx-auto max-w-2xl text-center font-display text-heading-1 text-balance text-ink md:text-display-l">
          {pricing.title}
        </h2>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Consulta */}
          <div data-reveal className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-heading-3 text-ink">{consulta.name}</p>
            <p className="mt-1 text-body text-ink-muted">{consulta.description}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-heading-1 text-ink tabular-nums">{consulta.price}</span>
              <span className="text-body text-ink-muted">{consulta.period}</span>
            </p>
            <ul className="mt-6 space-y-2.5">
              {consulta.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-body-s text-ink">
                  <Check size={18} strokeWidth={1.5} aria-hidden className="mt-px shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <CtaButton className="mt-8 w-full" />
            <p className="mt-3 text-center text-caption text-ink-muted">{consulta.note}</p>
          </div>

          {/* Clínicas */}
          <div
            data-reveal
            data-theme="dark"
            className="relative overflow-hidden rounded-lg bg-deep p-8 text-ink shadow-lg sm:p-12 lg:py-16"
          >
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-1 text-caption text-ink">
              <Sparkles size={14} strokeWidth={1.5} aria-hidden className="text-primary" />
              {clinicas.badge}
            </span>
            <p className="mt-6 font-display text-heading-1 text-ink">{clinicas.name}</p>
            <p className="mt-2 max-w-md text-body-l text-ink-muted">{clinicas.description}</p>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
              <span className="text-body-l text-ink-muted">{clinicas.pricePrefix}</span>
              <span className="font-display text-display-l text-ink tabular-nums sm:text-display-xl">{clinicas.price}</span>
              <span className="text-body-l text-ink-muted">{clinicas.period}</span>
            </p>
            <ul className="mt-8 space-y-3">
              {clinicas.features.map((f) => (
                <li key={f} className="flex gap-3 text-body text-ink">
                  <Check size={20} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-line pt-6 text-body-s text-ink-muted">{clinicas.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
