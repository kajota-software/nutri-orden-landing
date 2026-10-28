"use client";

import { useEffect, useState, type RefObject } from "react";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Avance (0 a 1) de un elemento mientras cruza la pantalla: 0 cuando su borde superior
 * llega a `start` (fracción del alto de la ventana) y 1 cuando su borde inferior llega ahí.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, start = 0.6) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sin animación: todo visible
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * start;
      setProgress(Math.min(1, Math.max(0, (line - r.top) / r.height)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, start]);
  return progress;
}

/** true la primera vez que el elemento entra en pantalla. */
export function useInViewOnce(ref: RefObject<HTMLElement | null>, threshold = 0.3) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}
