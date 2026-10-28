import { Check, Repeat2 } from "lucide-react";
import { hero } from "@/content/landing";

const { mockup } = hero;

/** Mockup del celular del paciente: plan del día al frente y lista del súper detrás. Solo HTML/CSS con tokens. */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[24rem] pb-6 sm:max-w-[28rem]" aria-hidden>
      {/* Lista del súper, detrás */}
      <div className="absolute top-16 left-0 w-[58%] -rotate-3 rounded-lg border border-line bg-surface p-4 shadow-sm">
        <p className="text-label text-ink">{mockup.list.title}</p>
        <ul className="mt-3 space-y-2.5">
          {mockup.list.items.map((item) => (
            <li key={item.name} className="flex items-center gap-2.5">
              <span
                className={`grid size-[22px] shrink-0 place-items-center rounded-sm border ${
                  item.done ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"
                }`}
              >
                {item.done ? <Check size={14} strokeWidth={2.5} /> : null}
              </span>
              <span className={`truncate text-body-s ${item.done ? "text-ink-muted line-through" : "text-ink"}`}>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Celular con el plan del día */}
      <div className="relative ml-auto w-[64%] min-w-[13.5rem] rounded-lg border border-line bg-ink p-2 shadow-lg">
        <div className="overflow-hidden rounded-md bg-bg">
          <div className="flex justify-center pt-2">
            <span className="h-1.5 w-16 rounded-pill bg-line" />
          </div>
          <div className="px-4 pt-3 pb-5">
            <p className="text-caption text-ink-muted">{mockup.day}</p>
            <p className="mt-0.5 text-heading-3 text-ink">{mockup.greeting}</p>
            <ul className="mt-3 space-y-2">
              {mockup.meals.map((meal) => (
                <li
                  key={meal.name}
                  className={`rounded-sm border p-2.5 ${meal.swap ? "border-primary bg-surface-sage" : "border-line bg-surface"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-caption text-ink-muted">
                      {meal.name} · {meal.time}
                    </span>
                    {meal.done ? (
                      <span className="grid size-4 place-items-center rounded-pill bg-primary text-on-primary">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-body-s font-medium text-ink">{meal.food}</p>
                  {meal.swap ? (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-caption text-ink">
                      <Repeat2 size={12} strokeWidth={1.5} />
                      {meal.swap}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-sm border border-line bg-surface p-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-caption text-ink-muted">{mockup.progressLabel}</span>
                <span className="text-label text-ink tabular-nums">{mockup.progressValue}</span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-1.5 rounded-pill bg-brand" />
                ))}
              </div>
              <p className="mt-1.5 text-caption text-ink-muted">{mockup.progressNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
