"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { result } from "@/content/evaluacion";
import { formatUsd, type Evaluacion } from "@/lib/qualification";
import { PlateLoader } from "./PlateLoader";

type Props = { evaluacion: Evaluacion; name: string; whatsapp: string; email: string };

export function ResultView({ evaluacion, name, whatsapp, email }: Props) {
  const { estimacion: e } = evaluacion;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  const firstName = name.trim().split(/\s+/)[0] ?? "";

  return (
    <div className="nu-fade-in mx-auto w-full max-w-2xl">
      <div className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-10">
        <PlateLoader filled={4} size={48} />
        <h2 ref={heading} tabIndex={-1} className="mt-6 font-display text-heading-1 text-balance text-ink outline-none">
          {result.title(firstName)}
        </h2>
        <p className="mt-4 text-body-l text-ink">{result.text}</p>
        <p className="mt-2 text-body text-ink-muted">{result.contactLine(whatsapp, email)}</p>

        <div className="mt-8">
          <p className="text-label text-ink">{result.nextTitle}</p>
          <ul className="mt-3 space-y-3">
            {result.next.map((item) => (
              <li key={item} className="flex gap-3 text-body text-ink-muted">
                <Check size={20} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-md bg-surface-sage p-5">
          <p className="text-caption text-ink-muted">{result.estimateLabel}</p>
          <p className="mt-2 text-body-l text-ink">
            {result.estimate(e.pacientes, e.pacientesEnRiesgo, e.pacientesARecuperar, formatUsd(e.valorRecuperar))}
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-md border border-line bg-surface px-5 text-label text-ink transition-colors hover:border-primary"
        >
          {result.back}
        </Link>
      </div>
    </div>
  );
}
