import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Fuerza la paleta oscura de los tokens para bandas en verde profundo. */
  deep?: boolean;
  labelledBy?: string;
};

export function Section({ id, className = "", children, deep, labelledBy }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={deep ? "dark" : undefined}
      className={`section-y ${deep ? "bg-deep text-ink" : ""} ${className}`}
    >
      <div className="container-nu">{children}</div>
    </section>
  );
}

export function SectionTitle({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`max-w-3xl font-display text-heading-1 text-balance text-ink md:text-display-l ${className}`}
    >
      {children}
    </h2>
  );
}
