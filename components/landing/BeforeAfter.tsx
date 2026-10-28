"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { beforeAfter } from "@/content/landing";
import { prefersReducedMotion, useInViewOnce, useScrollProgress } from "@/lib/hooks";

/**
 * Antes y después como un interruptor: la misma consulta, "Hoy" o "Con NutriOrden".
 * Al entrar en pantalla cambia sola una vez a "Con NutriOrden"; después manda quien lee.
 */
export function BeforeAfter() {
  const { columns, rows, timeline } = beforeAfter;
  const [after, setAfter] = useState(false);
  const touched = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(boxRef, 0.5);

  useEffect(() => {
    if (!seen || touched.current || prefersReducedMotion()) return;
    const t = setTimeout(() => {
      if (!touched.current) setAfter(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [seen]);

  const choose = (v: boolean) => {
    touched.current = true;
    setAfter(v);
  };

  const timelineRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(timelineRef, 0.75);
  const reached = Math.floor(progress * timeline.length + 0.5);

  return (
    <section aria-labelledby="antes-title" className="section-y">
      <div className="container-nu">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 data-reveal id="antes-title" className="max-w-2xl font-display text-heading-1 text-balance text-ink md:text-display-l">
            {beforeAfter.title}
          </h2>
          {/* Interruptor */}
          <div
            role="group"
            aria-label={beforeAfter.toggleLabel}
            className="relative inline-grid shrink-0 grid-cols-2 self-start rounded-pill border border-line bg-surface p-1 shadow-sm md:self-auto"
          >
            <span
              aria-hidden
              className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-pill transition-all duration-500 ease-out ${
                after ? "translate-x-full bg-primary" : "translate-x-0 bg-ink"
              }`}
            />
            {[false, true].map((v) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={after === v}
                onClick={() => choose(v)}
                className={`relative z-10 rounded-pill px-5 py-2.5 text-label whitespace-nowrap transition-colors duration-300 ${
                  after === v ? "text-on-primary" : "text-ink-muted hover:text-ink"
                }`}
              >
                {v ? columns.after : columns.before}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={boxRef}
          aria-live="polite"
          className={`mt-10 overflow-hidden rounded-lg border transition-colors duration-700 ${
            after ? "border-sage-300 bg-surface-sage" : "border-line bg-surface"
          }`}
        >
          <ul className="divide-y divide-line">
            {rows.map((row, i) => (
              <li key={row.label} className="grid gap-2 px-5 py-5 md:grid-cols-[14rem_1fr] md:items-center md:gap-8 md:px-8 md:py-6">
                <p className="text-label text-ink-muted">{row.label}</p>
                <div className="relative flex items-start gap-3">
                  <span
                    aria-hidden
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill transition-colors duration-500 ${
                      after ? "bg-primary text-on-primary" : "bg-line text-ink-muted"
                    }`}
                  >
                    {after ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2} />}
                  </span>
                  <p
                    key={String(after)}
                    className="nu-fade-in text-heading-3 text-ink"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {after ? row.after : row.before}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Línea de tiempo del primer mes, se llena con el scroll */}
        <div className="mt-20">
          <h3 data-reveal className="text-heading-2 text-ink">
            {beforeAfter.timelineTitle}
          </h3>
          <ol ref={timelineRef} className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-4">
            <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-line md:top-[11px] md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto" />
            <span
              aria-hidden
              className="absolute top-2 left-[11px] w-0.5 bg-brand md:hidden"
              style={{ height: `calc(${progress} * (100% - 16px))` }}
            />
            <span
              aria-hidden
              className="absolute top-[11px] left-0 hidden h-0.5 bg-brand md:block"
              style={{ width: `${progress * 100}%` }}
            />
            {timeline.map((t, i) => {
              const on = i < reached;
              return (
                <li key={t.day} className="relative flex gap-5 md:flex-col md:gap-4">
                  <span
                    aria-hidden
                    className={`relative grid size-6 shrink-0 place-items-center rounded-pill border-2 transition-all duration-300 ${
                      on ? "border-brand bg-brand text-on-primary" : "border-line bg-bg"
                    } ${on && i === timeline.length - 1 ? "scale-125" : ""}`}
                  >
                    {on ? <Check size={12} strokeWidth={3} /> : null}
                  </span>
                  <div>
                    <p
                      className={`font-display text-heading-1 tabular-nums transition-colors duration-500 ${
                        on ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {t.day}
                    </p>
                    <p className="mt-1 text-body text-ink-muted">{t.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
