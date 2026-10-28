"use client";

import { useEffect } from "react";

/** Aparición suave de los elementos con [data-reveal] cuando entran en pantalla (una sola vez). */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    // Lo que ya está en pantalla al cargar no se anima.
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-revealed", "");
      else io.observe(el);
    }
    root.classList.add("js-reveal");
    return () => io.disconnect();
  }, []);
  return null;
}
