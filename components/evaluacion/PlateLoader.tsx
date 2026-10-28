/**
 * Símbolo del plato (½ + ¼ + ¼) que se llena por partes durante el análisis.
 * Geometría tomada de /logo/nutriorden-simbolo-color.svg (círculo de 27 con separaciones de 3,2).
 */
const PARTS = [
  "M25.4 0.047 A27 27 0 0 0 25.4 53.953 Z",
  "M28.6 0.047 A27 27 0 0 1 53.953 25.4 L28.6 25.4 Z",
  "M53.953 28.6 A27 27 0 0 1 28.6 53.953 L28.6 28.6 Z",
];

export function PlateLoader({ filled, size = 72 }: { filled: number; size?: number }) {
  return (
    <svg viewBox="0 0 54 54" width={size} height={size} aria-hidden>
      {PARTS.map((d, i) => (
        <g key={d}>
          <path d={d} className="fill-sage-300" />
          <path
            d={d}
            className="fill-brand transition-opacity duration-700 ease-out"
            style={{ opacity: i < filled ? 1 : 0 }}
          />
        </g>
      ))}
    </svg>
  );
}
