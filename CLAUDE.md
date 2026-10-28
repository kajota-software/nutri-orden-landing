@AGENTS.md

## Marca

Toda la UI sigue [brand/BRAND.md](brand/BRAND.md): colores, tipografía, espaciado, logo, componentes y voz. Nunca escribas un color, fuente o radio a mano; usa siempre los tokens de `brand/tokens/`.

## Estructura

- Textos de la landing: `content/landing.ts`. Textos de la evaluación: `content/evaluacion.ts`.
- Preguntas, puntaje, reglas y estimación de la evaluación: `lib/qualification.ts` (un solo archivo configurable).
- Componentes por sección en `components/landing/` y `components/evaluacion/`.
- Pruebas: `npm test`.
