import { BellRing } from "lucide-react";
import { nutritionistBenefits, panelMock } from "@/content/landing";

const TONE = {
  warning: "bg-warning/12 text-warning",
  success: "bg-success/12 text-success",
  primary: "bg-primary/12 text-primary",
} as const;

/** Banda verde profundo: lo que gana la nutricionista, con un vistazo a su panel. */
export function NutritionistBand() {
  return (
    <section data-theme="dark" aria-labelledby="nutri-title" className="section-y overflow-hidden bg-deep text-ink">
      <div className="container-nu grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p data-reveal className="text-label text-ink-muted">
            {nutritionistBenefits.eyebrow}
          </p>
          <h2 data-reveal id="nutri-title" className="mt-3 font-display text-heading-1 text-balance text-ink md:text-display-l">
            {nutritionistBenefits.title}
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {nutritionistBenefits.items.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className="flex gap-5 py-6">
                <Icon size={24} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-heading-3 text-ink">{title}</h3>
                  <p className="mt-1.5 text-body text-ink-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Vistazo al panel de la nutricionista */}
        <div data-reveal aria-hidden className="relative lg:pl-6">
          <div data-theme="light" className="relative rounded-lg border border-line bg-surface p-5 text-ink shadow-lg sm:p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-heading-3 text-ink">{panelMock.title}</p>
              <p className="text-caption text-ink-muted">{panelMock.subtitle}</p>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {panelMock.patients.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-pill bg-surface-sage text-label text-ink">
                      {p.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div>
                      <p className="text-body-s font-medium text-ink">{p.name}</p>
                      <p className="text-caption text-ink-muted">{p.meta}</p>
                    </div>
                  </div>
                  <span className={`rounded-pill px-2.5 py-0.5 text-caption ${TONE[p.tone]}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Aviso flotante */}
          <div
            data-theme="light"
            className="relative mx-4 -mt-6 flex items-center gap-3 rounded-md border border-line bg-surface p-4 text-ink shadow-lg sm:absolute sm:-bottom-8 sm:-left-2 sm:mx-0 sm:mt-0 sm:max-w-[20rem] lg:-left-8"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-warning/12 text-warning">
              <BellRing size={18} strokeWidth={1.5} />
            </span>
            <p className="text-body-s text-ink">{panelMock.alert.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
