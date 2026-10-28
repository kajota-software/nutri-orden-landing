"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { analysis } from "@/content/evaluacion";
import { PlateLoader } from "./PlateLoader";

const TICK_MS = 1000;
const TICKS = 5; // ~5 segundos en total

/** Pantalla de análisis: ~5 s aunque la API responda antes. Llama a onDone al terminar. */
export function AnalysisScreen({ onDone }: { onDone: () => void }) {
  const [t, setT] = useState(-1);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setT(0));
    const timers = Array.from({ length: TICKS }, (_, i) => setTimeout(() => setT(i + 1), (i + 1) * TICK_MS));
    const end = setTimeout(() => done.current(), TICKS * TICK_MS + 200);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, []);

  const filled = t >= 4 ? 3 : t >= 3 ? 2 : t >= 1 ? 1 : 0;
  const progress = t < 0 ? 0 : Math.min(100, ((t + 1) / TICKS) * 100);

  return (
    <div className="nu-fade-in mx-auto w-full max-w-md rounded-lg border border-line bg-surface p-6 text-center shadow-sm sm:p-10">
      <div className="flex justify-center">
        <PlateLoader filled={filled} />
      </div>
      <h2 className="mt-6 text-heading-2 text-ink">{analysis.title}</h2>
      <div
        role="progressbar"
        aria-label={analysis.title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="mt-6 h-1.5 overflow-hidden rounded-pill bg-surface-sage"
      >
        <div className="h-full rounded-pill bg-primary transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
      </div>
      <ul className="mt-6 space-y-3 text-left" aria-live="polite">
        {analysis.messages.map((m, i) =>
          i <= t ? (
            <li key={m} className="nu-fade-in flex items-start gap-3">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill border transition-colors duration-300 ${
                  i < t ? "border-primary bg-primary text-on-primary" : "border-line"
                }`}
              >
                {i < t ? <Check size={12} strokeWidth={2.5} aria-hidden /> : null}
              </span>
              <span className={`text-body ${i < t ? "text-ink-muted" : "text-ink"}`}>{m}</span>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}
