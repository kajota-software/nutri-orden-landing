"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/lib/hooks";

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Cifra que cuenta hasta su valor al entrar en pantalla (formato CR: ₡100 000). */
export function CountUp({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const seen = useInViewOnce(ref, 0.6);
  const [n, setN] = useState(value);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const r = ref.current?.getBoundingClientRect();
    // Solo animamos si todavía no está en pantalla al cargar.
    if (r && r.top > window.innerHeight) setN(0);
  }, []);

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    const start = performance.now();
    const dur = 1400;
    let frame = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, value]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${fmt(value)}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {fmt(n)}
        {suffix}
      </span>
    </p>
  );
}
