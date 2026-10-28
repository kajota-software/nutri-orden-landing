import type { Utm } from "./lead-schema";

const KEY = "nu-utm";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/** Guarda los UTM de la primera visita de la sesión. Las visitas siguientes no los sobrescriben. */
export function captureUtm() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) utm[f] = v.slice(0, 200);
    }
    sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage no disponible (modo privado estricto): seguimos sin UTM.
  }
}

export function readUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
}
