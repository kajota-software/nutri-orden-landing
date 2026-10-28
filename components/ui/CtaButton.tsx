import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTA_HREF, CTA_LABEL } from "@/content/landing";

type Props = {
  className?: string;
  size?: "md" | "sm";
  withIcon?: boolean;
};

/** Única acción de la landing: "Ver si mi consulta califica" → /evaluacion. */
export function CtaButton({ className = "", size = "md", withIcon = true }: Props) {
  const sizing = size === "sm" ? "h-10 px-3.5 sm:px-4" : "h-12 px-6";
  return (
    <Link
      href={CTA_HREF}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-label text-on-primary transition duration-200 hover:-translate-y-px hover:bg-primary-hover hover:shadow-sm ${sizing} ${className}`}
    >
      {CTA_LABEL}
      {withIcon ? (
        <ArrowRight aria-hidden size={18} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
