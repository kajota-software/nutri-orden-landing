"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/landing";
import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-nu flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="NutriOrden, inicio" className="shrink-0 rounded-sm">
          <span className="sm:hidden">
            <Logo layout="simbolo" variant="color" height={28} />
          </span>
          <span className="hidden sm:block">
            <Logo variant="color" height={28} />
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-sm text-label text-ink-muted transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CtaButton size="sm" withIcon={false} />
      </div>
    </header>
  );
}
