/* eslint-disable @next/next/no-img-element -- SVG del kit de marca, sin optimización de imagen. */

type Props = {
  variant?: "color" | "color-oscuro" | "blanco" | "negro" | "auto";
  layout?: "horizontal" | "vertical" | "simbolo";
  height?: number;
  className?: string;
  lazy?: boolean;
};

const RATIO = { horizontal: 683.65 / 105, vertical: 1, simbolo: 1 } as const;

/** Logo de NutriOrden (brand/BRAND.md §5). "auto" usa la versión oscura cuando el sistema está en modo oscuro. */
export function Logo({ variant = "color", layout = "horizontal", height = 32, className, lazy }: Props) {
  const src = (v: string) => `/logo/nutriorden-${layout}-${v}.svg`;
  const width = Math.round(height * RATIO[layout]);
  const img = (
    <img
      src={src(variant === "auto" ? "color" : variant)}
      alt="NutriOrden"
      width={width}
      height={height}
      className={className}
      loading={lazy ? "lazy" : undefined}
      style={{ height, width: "auto" }}
    />
  );
  if (variant !== "auto") return img;
  return (
    <picture>
      <source srcSet={src("color-oscuro")} media="(prefers-color-scheme: dark)" />
      {img}
    </picture>
  );
}
