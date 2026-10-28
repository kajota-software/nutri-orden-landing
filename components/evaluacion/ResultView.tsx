"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { result } from "@/content/evaluacion";
import { whatsappUrl } from "@/content/landing";
import { formatUsd, type Evaluacion } from "@/lib/qualification";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { PlateLoader } from "./PlateLoader";

type Props = { evaluacion: Evaluacion; name: string; email: string };

export function ResultView({ evaluacion, name, email }: Props) {
  const { resultado, motivo, estimacion: e } = evaluacion;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  const califica = resultado === "califica" || resultado === "prioridad_alta";
  const title = califica ? result.califica.title : resultado === "aun_no" ? result.aunNo.title : result.noCalifica.title;
  const wa = whatsappUrl(result.aunNo.whatsappText);

  return (
    <div className="nu-fade-in mx-auto w-full max-w-2xl">
      <div className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-10">
        <PlateLoader filled={3} size={48} />
        <h2 ref={heading} tabIndex={-1} className="mt-6 font-display text-heading-1 text-balance text-ink outline-none">
          {title}
        </h2>

        <div className="mt-8 rounded-md bg-surface-sage p-5">
          <p className="text-caption text-ink-muted">{result.estimateLabel}</p>
          <p className="mt-2 text-body-l text-ink">
            {result.estimate(e.pacientes, e.pacientesEnRiesgo, e.pacientesARecuperar, formatUsd(e.valorRecuperar))}
          </p>
        </div>

        {califica ? (
          <div className="mt-8 space-y-4">
            <p className="text-body text-ink-muted">{result.califica.text}</p>
            <CalendlyEmbed
              name={name}
              email={email}
              buttonLabel={result.califica.button}
              fallbackHref={whatsappUrl(result.califica.whatsappText)}
            />
            <p className="text-body-s text-ink-muted">{result.califica.note}</p>
          </div>
        ) : resultado === "aun_no" ? (
          <div className="mt-8 space-y-6">
            <p className="text-body text-ink-muted">{result.aunNo.text}</p>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-label text-on-primary transition duration-200 hover:-translate-y-px hover:bg-primary-hover hover:shadow-sm"
              >
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
                {result.aunNo.button}
              </a>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {motivo ? <p className="text-body text-ink-muted">{result.noCalifica.reasons[motivo]}</p> : null}
            <p className="text-body text-ink-muted">{result.noCalifica.invite}</p>
            <Link
              href="/"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md border border-line bg-surface px-5 text-label text-ink transition-colors hover:border-primary"
            >
              {result.noCalifica.back}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
