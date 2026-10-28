# BRAND.md — NutriOrden

Guía de diseño para cualquier repositorio de NutriOrden (landing, panel del nutricionista, app del paciente). Está escrita para personas y para agentes de IA: si construyes UI en este repo, sigue este archivo. Ante la duda, gana lo que diga aquí sobre cualquier estilo por defecto de una librería.

> Producto: sistema de retención para nutricionistas de consulta privada.
> Eslogan: **Tus pacientes vuelven. Tu consulta, en orden.**
> Personalidad: calma y orden. Claro, sereno, confiable, cercano.

---

## 1. Instalación en el repo

Copia la carpeta del kit así:

```
brand/
  BRAND.md                ← este archivo (enlázalo desde CLAUDE.md / AGENTS.md / README)
  tokens/
    tokens.css            ← variables CSS (fuente de verdad en runtime)
    tokens.json           ← los mismos valores para JS, React Native, emails
    tailwind.preset.js    ← Tailwind v3
    tailwind.theme.css    ← Tailwind v4
public/
  icons/                  ← todo app-icons/
  logo/                   ← los SVG de logo/svg/
  og-image.png
  site.webmanifest
```

**`<head>`** — pega `web/head-snippet.html` (favicon, manifest, theme-color, Open Graph y Google Fonts).

**CSS global**

```css
/* Tailwind v4 */
@import "tailwindcss";
@import "../brand/tokens/tokens.css";
@import "../brand/tokens/tailwind.theme.css";

/* Tailwind v3: importa tokens.css y usa el preset */
@import "../brand/tokens/tokens.css";
```

```js
// tailwind.config.js (v3)
module.exports = { presets: [require('./brand/tokens/tailwind.preset.js')], content: ['./src/**/*.{ts,tsx}'] };
```

Sin Tailwind: usa las variables `var(--nu-*)` y las clases `.nu-text-*` de `tokens.css`.

**Modo oscuro:** sigue al sistema por defecto. Para forzarlo, pon `data-theme="dark"` o `data-theme="light"` en `<html>`. La app del paciente arranca en claro.

---

## 2. Color

Todos los valores viven en `tokens.css`. **Nunca escribas un hex en un componente**: usa el token.

| Token (CSS / Tailwind) | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `--nu-bg` / `bg-bg` | #FAFAF7 | #121712 | Fondo de página (60% de la pantalla) |
| `--nu-surface` / `bg-surface` | #FFFFFF | #1A201A | Tarjetas, modales, inputs |
| `--nu-surface-sage` / `bg-surface-sage` | #EDF4E8 | #20291E | Hero, secciones destacadas, fila seleccionada |
| `--nu-avena` / `bg-avena` | #EFE9DF | #2A2620 | Recetas, testimonios, fotos de comida. Nunca texto |
| `--nu-line` / `border-line` | #DDE2D6 | #2F382D | Bordes de 1px, divisores |
| `--nu-ink` / `text-ink` | #1F2620 | #EEF1EA | Texto principal |
| `--nu-ink-muted` / `text-ink-muted` | #5C6559 | #A7B0A2 | Texto secundario, ayudas, metadatos |
| `--nu-brand` / `bg-brand` | #5E8B52 | #8FBF7E | Logo, ícono, formas, gráficas, texto ≥ 24px. **No** para botones con texto pequeño |
| `--nu-primary` / `bg-primary` | #4F7A44 | #A8CC98 | Botones, enlaces, pestaña activa, checks, foco |
| `--nu-primary-hover` | #436A39 | #BCDAAE | Hover / pressed de primary |
| `--nu-on-primary` / `text-on-primary` | #FFFFFF | #121712 | Texto sobre primary |
| `--nu-sage-300` | #B9D3AC | #4A5E42 | Decorativo: barras vacías, fondos de gráficas |
| `--nu-deep` / `bg-deep` | #2C4228 | #26381F | Footer, banda de CTA final |
| `--nu-success` | #3F6B3A | #9CCB92 | Meta cumplida, pago registrado |
| `--nu-warning` | #96600F | #E0B66A | Paciente en riesgo, pago por vencer |
| `--nu-danger` | #A63D32 | #E89A8F | Error, pago vencido, eliminar |

Reglas:
- Proporción **60 / 30 / 10**: `bg` · `surface` + `surface-sage` · `primary` + `brand`.
- `brand` es el verde del logo; `primary` es el verde de los botones (más oscuro para que el texto blanco cumpla 4,5:1).
- Los colores de estado solo existen en el producto, nunca como decoración en marketing, y siempre van con texto o ícono, nunca solo color.
- Todo par texto/fondo de esta tabla cumple WCAG AA en ambos temas.

---

## 3. Tipografía

| Familia | Token | Pesos | Uso |
| --- | --- | --- | --- |
| **Fraunces** | `--nu-font-display` / `font-display` | 500 | Titulares, nombre de la marca, citas |
| **Figtree** | `--nu-font-sans` / `font-sans` | 400, 500, 600 | Todo lo demás: UI, párrafos, tablas, botones |

| Estilo (`.nu-text-*` / `text-*`) | Familia | Tamaño / interlineado | Peso | Uso |
| --- | --- | --- | --- | --- |
| `display-xl` | Fraunces | 64 / 68 | 500 | Hero en desktop |
| `display-l` | Fraunces | 44 / 50 | 500 | Titulares de sección; hero en móvil |
| `heading-1` | Fraunces | 32 / 38 | 500 | Título de pantalla |
| `heading-2` | Figtree | 24 / 30 | 600 | Encabezado de bloque |
| `heading-3` | Figtree | 18 / 24 | 600 | Título de tarjeta, tiempo de comida, nombre de paciente |
| `body-l` | Figtree | 18 / 28 | 400 | Párrafos de la landing |
| `body` | Figtree | 16 / 24 | 400 | Texto por defecto |
| `body-s` | Figtree | 14 / 20 | 400 | Tablas, metadatos (solo panel del nutricionista) |
| `label` | Figtree | 14 / 20 | 600 | Botones, pestañas, labels |
| `caption` | Figtree | 12 / 16 | 500 | Notas, leyendas, "by FitManage" |
| `metric` | Figtree | 28 / 32 | 600 | Cifras de progreso, con `tabular-nums` |

Reglas:
- Fraunces solo de `heading-1` hacia arriba. Nunca en botones, inputs, tablas ni párrafos.
- Titulares en sentence case: "Plan de esta semana", no "Plan De Esta Semana".
- En la app del paciente el texto nunca baja de 16px.
- Párrafos de máximo 70 caracteres por línea (`max-w-prose`).

---

## 4. Espacio, forma y elevación

- Grilla de 4px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--nu-space-1` … `--nu-space-24`).
- Contenedor de la landing: `max-width: 1120px`, gutter 16px en móvil y 24px desde 768px.
- Secciones de la landing: 96px de separación en desktop y 64px en móvil. El aire es parte de la marca.
- Radios: `sm` 8px (inputs, chips, checkbox) · `md` 12px (botones, tarjetas) · `lg` 20px (modales, mockups) · `pill` (badges, avatares).
- Elevación: primero un borde `line` de 1px. `shadow-sm` solo para tarjetas flotantes; `shadow-lg` solo para modales, menús y el mockup del hero.
- Breakpoints: Tailwind por defecto (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Diseña primero para móvil.

---

## 5. Logo

El símbolo es el **plato saludable**: un círculo dividido en ½ + ¼ + ¼, el método que usa todo nutricionista para explicar un plato equilibrado. Representa nutrición y orden a la vez.

| Archivo (`/logo/`) | Dónde |
| --- | --- |
| `nutriorden-horizontal-color.svg` | Header de la web y del panel, documentos, emails |
| `nutriorden-horizontal-color-oscuro.svg` | Footer `deep`, fondos oscuros a color, modo oscuro |
| `nutriorden-horizontal-blanco.svg` | Sobre fotos o fondos oscuros a una tinta |
| `nutriorden-horizontal-negro.svg` | Impresión a una tinta |
| `nutriorden-vertical-*.svg` | Pantalla de bienvenida, login, formatos cuadrados |
| `nutriorden-simbolo-*.svg` | Espacios pequeños, loader, marca de agua |
| `/icons/icon.svg`, `favicon.*`, `icon-*.png` | Ícono de app, PWA, favicon |

```tsx
// components/Logo.tsx
type Props = { variant?: 'color' | 'color-oscuro' | 'blanco' | 'negro'; layout?: 'horizontal' | 'vertical' | 'simbolo'; height?: number };
export function Logo({ variant = 'color', layout = 'horizontal', height = 32 }: Props) {
  return <img src={`/logo/nutriorden-${layout}-${variant}.svg`} alt="NutriOrden" height={height} style={{ height, width: 'auto' }} />;
}
```

Reglas:
- Header: lockup horizontal a 28–32px de alto. Altura mínima del lockup: 20px; del símbolo solo: 16px.
- Espacio libre alrededor = la mitad del diámetro del símbolo.
- No recrear el logo con texto vivo, no cambiar sus colores, no rotarlo, no aplicar sombras ni degradados, no deformarlo.
- **"by FitManage"**: solo en el footer de la landing y en materiales de venta, en estilo `caption` y color `ink-muted`. Nunca dentro de la app del paciente.

---

## 6. Componentes base

Usa estas especificaciones al construir o tematizar componentes (shadcn/ui, Radix o propios).

**Button**
| Variante | Fondo | Texto | Borde | Uso |
| --- | --- | --- | --- | --- |
| primary | `primary` → hover `primary-hover` | `on-primary` | — | Una sola acción principal por pantalla |
| secondary | `surface` | `ink` | 1px `line` → hover `primary` | Acciones secundarias |
| ghost | transparente → hover `surface-sage` | `primary` | — | Acciones terciarias, enlaces en tablas |
| danger | `danger` | blanco | — | Solo tras confirmar |

Altura 44px (40px en el panel denso), padding horizontal 20px, `radius-md`, texto `label`. Íconos de 18px a 8px del texto. Foco: anillo de 2px `primary` con 2px de separación. Deshabilitado: 40% de opacidad.

**Input / Select / Textarea:** altura 44px, fondo `surface`, borde 1px `line` → foco `primary`, `radius-sm`, label `label` arriba, ayuda en `body-s` `ink-muted`, error en `danger` con texto.

**Card:** fondo `surface`, borde 1px `line`, `radius-md`, padding 16px en móvil y 24px en desktop. Sin sombra salvo que flote.

**Badge (estado del paciente):** `radius-pill`, texto `caption`, fondo del color al 12% de opacidad y texto en el color pleno. Activo → `success`; En riesgo (7+ días sin check-in) → `warning`; Pago vencido → `danger`; Nuevo → `primary`.

**Checklist de la lista de compras:** checkbox de 22px, `radius-sm`; al marcar, fondo `primary` con check blanco y el texto pasa a `ink-muted` tachado.

**Gráficas de progreso:** línea en `brand` de 2px, área en `brand` al 12%, grilla en `line`, meta como línea punteada en `ink-muted`. Cifras en `metric`.

**Íconos:** [Lucide](https://lucide.dev) (`lucide-react`), `strokeWidth={1.5}`, 20px en UI y 24px en navegación, color `ink` o `primary`. Nunca íconos rellenos ni multicolor.

**Estados vacíos:** el símbolo del plato en `sage-300` a 64px, un titular `heading-3` y una acción primary.

---

## 7. Voz en la interfaz

- Tutea a la nutricionista. En la app del paciente habla con la voz de su nutricionista.
- Frases cortas, verbos concretos: "Agendar demo", "Guardar plan", "Ver lista del súper".
- Sin emojis, sin signos de exclamación dobles, sin palabras de culpa ("fallaste", "trampa", "prohibido").
- Confirmaciones humanas: "Listo. El plan ya está en la app de Carlos." en vez de "Operación exitosa".
- Alertas que informan sin alarmar: "Ana lleva 8 días sin registrar su avance."
- Formatos de Costa Rica: fechas `27 oct 2026`, hora `7:00 a. m.`, decimales con coma (`4,2 kg`), moneda `₡25 000`, unidades métricas.

---

## 8. Imágenes

- Comida real y cotidiana de Costa Rica, luz natural, fondos `avena` o madera clara; manos y escenas de consulta antes que cuerpos.
- Prohibido: cintas métricas en la cintura, básculas, "antes y después" en marketing, cuerpos de modelo fitness.
- Fotos con `radius-lg`. Mockups de la app dentro de un marco de celular con `shadow-lg`.

---

## 9. Checklist para agentes antes de entregar UI

- [ ] Ningún hex, `px` de color ni familia tipográfica escrita a mano: solo tokens.
- [ ] Una sola acción `primary` por pantalla.
- [ ] Fraunces solo en titulares (`heading-1` o mayor).
- [ ] Contraste AA en claro y oscuro; foco visible en todo lo interactivo.
- [ ] Funciona a 360px de ancho sin scroll horizontal.
- [ ] El logo es el SVG de `/logo/`, no texto.
- [ ] Textos en español de Costa Rica, con los formatos de la sección 7.
