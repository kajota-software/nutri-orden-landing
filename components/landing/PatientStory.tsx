"use client";

import { useEffect, useRef, useState } from "react";
import { patientBenefits } from "@/content/landing";
import { PhoneFrame, SCREENS } from "./PhoneScreens";

/**
 * "Seguir el plan deja de ser un esfuerzo": en desktop el celular queda fijo
 * y cambia de pantalla según el beneficio que estás leyendo.
 */
export function PatientStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const { items } = patientBenefits;

  return (
    <section aria-labelledby="paciente-title" className="section-y bg-surface-sage">
      <div className="container-nu">
        <p className="text-label text-ink-muted">{patientBenefits.eyebrow}</p>
        <h2 id="paciente-title" className="mt-3 max-w-3xl font-display text-heading-1 text-balance text-ink md:text-display-l">
          {patientBenefits.title}
        </h2>

        <div className="mt-12 grid gap-16 lg:mt-4 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-24">
          <ol>
            {items.map(({ icon: Icon, title, text, screen }, i) => {
              const Screen = SCREENS[screen];
              return (
                <li
                  key={title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-index={i}
                  className="flex flex-col justify-center gap-8 pb-16 last:pb-0 lg:min-h-[78vh] lg:pb-0"
                >
                  <div>
                    <span className="flex items-center gap-3 text-label text-ink-muted">
                      <span className="grid size-11 place-items-center rounded-pill bg-surface text-primary">
                        <Icon size={22} strokeWidth={1.5} aria-hidden />
                      </span>
                      0{i + 1}
                    </span>
                    <h3
                      className={`mt-5 font-display text-heading-1 transition-colors duration-500 ${
                        active === i ? "text-ink" : "text-ink lg:text-ink-muted"
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 max-w-[30rem] text-body-l text-ink-muted">{text}</p>
                  </div>
                  {/* Móvil: cada beneficio con su pantalla */}
                  <div aria-hidden className="mx-auto w-full max-w-[17rem] lg:hidden">
                    <PhoneFrame>
                      <Screen />
                    </PhoneFrame>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Desktop: celular fijo que cambia de pantalla */}
          <div aria-hidden className="hidden lg:block">
            <div className="sticky top-[calc(50vh-17rem)]">
              <PhoneFrame className="relative h-[34rem]">
                {items.map(({ screen }, i) => {
                  const Screen = SCREENS[screen];
                  return (
                    <div
                      key={screen}
                      className={`absolute inset-x-6 top-10 transition-all duration-500 ease-out ${
                        active === i ? "translate-y-0 opacity-100" : active > i ? "-translate-y-3 opacity-0" : "translate-y-3 opacity-0"
                      }`}
                    >
                      <Screen />
                    </div>
                  );
                })}
              </PhoneFrame>
              <div className="mt-6 flex justify-center gap-2">
                {items.map((it, i) => (
                  <span
                    key={it.title}
                    className={`h-1.5 rounded-pill transition-all duration-500 ${active === i ? "w-8 bg-primary" : "w-1.5 bg-sage-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
