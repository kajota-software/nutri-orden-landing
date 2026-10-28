/**
 * Eventos de medición. Solo se envían si Meta Pixel o Google Analytics
 * están configurados (NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_GA_ID).
 */

type MetaEvent = "PageView" | "ViewContent" | "Lead";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_EVENT: Record<MetaEvent, string> = {
  PageView: "page_view",
  ViewContent: "evaluacion_inicio",
  Lead: "generate_lead",
};

export function track(event: MetaEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
  window.gtag?.("event", GA_EVENT[event], params);
}
