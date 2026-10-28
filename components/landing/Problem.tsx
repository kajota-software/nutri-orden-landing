"use client";

import { Unlink } from "lucide-react";
import { useRef } from "react";
import { problem } from "@/content/landing";
import { useScrollProgress } from "@/lib/hooks";

/**
 * La cadena del abandono: una línea que se llena con el scroll y va encendiendo
 * cada eslabón. El último se rompe en verde profundo.
 */
export function Problem() {
  const listRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(listRef, 0.65);
  const n = problem.chain.length;
  const active = Math.min(n, Math.floor(progress * n + 0.35));
  const broken = active >= n;

  return (
    <section aria-labelledby="problema-title" className="section-y">
      <div className="container-nu grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="problema-title" className="font-display text-heading-1 text-balance text-ink md:text-display-l">
            {problem.title}
          </h2>
          <p className="mt-6 max-w-prose text-body-l text-ink-muted">{problem.meanwhile}</p>
          <p
            className={`mt-8 inline-flex items-center gap-3 text-heading-2 transition-colors duration-500 ${
              broken ? "text-ink" : "text-ink-muted"
            }`}
          >
            <Unlink size={24} strokeWidth={1.5} aria-hidden className="shrink-0 text-primary" />
            {problem.closer}
          </p>
        </div>

        <ol ref={listRef} className="relative">
          {/* Riel y relleno */}
          <span aria-hidden className="absolute top-3 bottom-3 left-[15px] w-0.5 rounded-pill bg-line" />
          <span
            aria-hidden
            className="absolute top-3 left-[15px] w-0.5 rounded-pill bg-brand transition-[height] duration-150 ease-out"
            style={{ height: `calc(${progress} * (100% - 24px))` }}
          />
          {problem.chain.map((text, i) => {
            const on = i < active;
            const last = i === n - 1;
            return (
              <li key={text} className="relative flex gap-6 pb-10 last:pb-0 md:pb-14">
                <span
                  aria-hidden
                  className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-pill border-2 text-caption tabular-nums transition-colors duration-300 ${
                    on
                      ? last
                        ? "border-deep bg-deep text-on-primary"
                        : "border-brand bg-brand text-on-primary"
                      : "border-line bg-bg text-ink-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <div
                  data-theme={last && on ? "dark" : undefined}
                  className={`-mt-1 flex-1 rounded-lg transition-all duration-500 ${
                    last ? (on ? "bg-deep px-6 py-5 text-ink" : "px-6 py-5") : ""
                  }`}
                >
                  <p
                    className={`text-heading-2 transition-colors duration-500 ${on ? "text-ink" : "text-ink-muted"}`}
                  >
                    {text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
