import type { Metadata } from "next";
import { EvaluacionFlow } from "@/components/evaluacion/EvaluacionFlow";
import { VslSection } from "@/components/evaluacion/VslSection";
import { Logo } from "@/components/ui/Logo";
import { evaluacionMeta, intro } from "@/content/evaluacion";

export const metadata: Metadata = {
  title: evaluacionMeta.title,
  description: evaluacionMeta.description,
  alternates: { canonical: "/evaluacion" },
};

/** Sin menú de navegación: solo el logo y la evaluación. */
export default function EvaluacionPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <header className="container-nu flex h-16 items-center">
        <Logo variant="color" height={28} />
      </header>
      <main className="container-nu pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-heading-1 text-balance text-ink md:text-display-l">{intro.title}</h1>
          <p className="mt-4 text-body-l text-ink-muted">{intro.subtitle}</p>
          <VslSection />
          <div className="mt-10 md:mt-12">
            <EvaluacionFlow />
          </div>
        </div>
      </main>
    </div>
  );
}
