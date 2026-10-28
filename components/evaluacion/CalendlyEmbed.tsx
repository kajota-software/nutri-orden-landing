"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

type Props = { name: string; email: string; buttonLabel: string; fallbackHref?: string };

/** Calendly embebido. Se carga al tocar el botón; envía "Schedule" cuando se agenda. */
export function CalendlyEmbed({ name, email, buttonLabel, fallbackHref }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if ((e.data as { event?: string })?.event === "calendly.event_scheduled") track("Schedule");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const buttonClass =
    "inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-label text-on-primary transition duration-200 hover:-translate-y-px hover:bg-primary-hover hover:shadow-sm";

  // Sin Calendly configurado: el botón lleva a WhatsApp.
  if (!CALENDLY_URL || !URL.canParse(CALENDLY_URL)) {
    return fallbackHref ? (
      <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        {buttonLabel}
      </a>
    ) : null;
  }

  const src = new URL(CALENDLY_URL);
  src.searchParams.set("embed_domain", typeof window === "undefined" ? "" : window.location.host);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("hide_gdpr_banner", "1");
  if (name) src.searchParams.set("name", name);
  if (email) src.searchParams.set("email", email);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClass}
      >
        {buttonLabel}
      </button>
    );
  }

  return (
    <div className="nu-fade-in overflow-hidden rounded-lg border border-line bg-surface">
      <iframe src={src.toString()} title={buttonLabel} className="h-[700px] w-full" />
    </div>
  );
}
