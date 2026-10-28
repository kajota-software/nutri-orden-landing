import { howItWorks } from "@/content/landing";

/** Tres pasos sobre una misma línea, sin tarjetas. */
export function HowItWorks() {
  return (
    <section id={howItWorks.id} aria-labelledby="como-title" className="section-y">
      <div className="container-nu">
        <h2 data-reveal id="como-title" className="max-w-3xl font-display text-heading-1 text-balance text-ink md:text-display-l">
          {howItWorks.title}
        </h2>
        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          <span aria-hidden className="absolute top-7 bottom-7 left-7 w-px bg-sage-300 md:top-7 md:right-[16%] md:bottom-auto md:left-7 md:h-px md:w-auto" />
          {howItWorks.steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal style={{ transitionDelay: `${i * 120}ms` }} className="relative flex gap-6 md:flex-col">
              <span className="relative grid size-14 shrink-0 place-items-center rounded-pill border border-line bg-surface text-primary shadow-sm">
                <Icon size={24} strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-display text-display-l text-brand tabular-nums" aria-hidden>
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-heading-2 text-ink">{title}</h3>
                <p className="mt-2 max-w-[22rem] text-body-l text-ink-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
