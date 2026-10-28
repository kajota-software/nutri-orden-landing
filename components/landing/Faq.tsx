"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { faq } from "@/content/landing";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-surface shadow-sm">
      {faq.items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-md px-5 py-5 text-left text-heading-3 text-ink transition-colors hover:text-primary md:px-6"
              >
                {item.q}
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              hidden={!isOpen}
              className="px-5 pb-5 md:px-6"
            >
              <p className="max-w-prose text-body text-ink-muted">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
