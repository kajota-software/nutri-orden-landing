import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { contact } from "@/content/landing";

export const metadata: Metadata = {
  title: "Aviso de privacidad — NutriOrden",
  description: "Cómo usamos los datos que nos compartes en NutriOrden.",
  alternates: { canonical: "/privacidad" },
};

const sections = [
  {
    title: "Qué datos recopilamos",
    text: "Cuando completas la evaluación nos compartes tu nombre, WhatsApp, correo, país, ciudad y tus respuestas sobre tu consulta. También registramos de qué campaña llegaste (parámetros UTM) y la fecha.",
  },
  {
    title: "Para qué los usamos",
    text: "Para saber si NutriOrden es para tu consulta, enviarte tu resultado, contactarte por WhatsApp o correo y agendar una llamada si así lo decides. No vendemos ni compartimos tus datos con terceros para fines publicitarios.",
  },
  {
    title: "Medición",
    text: "Usamos herramientas de medición (Google Analytics y Meta) para entender cómo se usa este sitio y mejorar nuestros anuncios. Estas herramientas pueden usar cookies.",
  },
  {
    title: "Datos de tus pacientes",
    text: "Si usas NutriOrden, los datos de tus pacientes son tuyos y de ellos. Se usan solo para su seguimiento nutricional y con su consentimiento.",
  },
  {
    title: "Tus derechos",
    text: "Puedes pedirnos en cualquier momento que corrijamos o eliminemos tus datos escribiéndonos a nuestro correo de contacto.",
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <header className="container-nu flex h-16 items-center">
        <Link href="/" aria-label="NutriOrden, inicio" className="rounded-sm">
          <Logo variant="color" height={28} />
        </Link>
      </header>
      <main className="container-nu pt-6 pb-16 md:pt-10 md:pb-24">
        <article className="mx-auto max-w-prose">
          <h1 className="font-display text-heading-1 text-ink md:text-display-l">Aviso de privacidad</h1>
          <p className="mt-4 text-body-l text-ink-muted">
            En NutriOrden cuidamos los datos que nos compartes. Este aviso explica, en simple, qué hacemos con ellos.
          </p>
          {sections.map((s) => (
            <section key={s.title} className="mt-10">
              <h2 className="text-heading-2 text-ink">{s.title}</h2>
              <p className="mt-3 text-body text-ink-muted">{s.text}</p>
            </section>
          ))}
          {contact.email ? (
            <p className="mt-10 text-body text-ink">
              Contacto:{" "}
              <a href={`mailto:${contact.email}`} className="rounded-sm text-primary underline underline-offset-4">
                {contact.email}
              </a>
            </p>
          ) : null}
          <p className="mt-10 text-caption text-ink-muted">Última actualización: 28 oct 2026</p>
        </article>
      </main>
    </div>
  );
}
