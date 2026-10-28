/**
 * Evaluación de NutriOrden: preguntas, puntaje, reglas de calificación y estimación.
 * Todo lo configurable vive en este archivo. El servidor (app/api/leads) recalcula
 * el resultado con estas mismas funciones; nunca se confía en lo que manda el cliente.
 */

export type Option<V extends string = string> = {
  value: V;
  label: string;
  points: number;
};

// ---------------------------------------------------------------------------
// Preguntas y puntos
// ---------------------------------------------------------------------------

export const PACIENTES = [
  { value: "menos_10", label: "Menos de 10", points: 0 },
  { value: "10_30", label: "10–30", points: 2 },
  { value: "31_80", label: "31–80", points: 3 },
  { value: "mas_80", label: "Más de 80", points: 3 },
] as const satisfies readonly Option[];

export const FACTURACION = [
  { value: "menos_500", label: "Menos de $500", points: 0 },
  { value: "500_1500", label: "$500–1 500", points: 1 },
  { value: "1500_4000", label: "$1 500–4 000", points: 2 },
  { value: "mas_4000", label: "Más de $4 000", points: 3 },
] as const satisfies readonly Option[];

export const RETENCION = [
  { value: "8_10", label: "8 a 10", points: 0 },
  { value: "5_7", label: "5 a 7", points: 2 },
  { value: "menos_5", label: "Menos de 5", points: 3 },
  { value: "no_se", label: "No lo sé", points: 2 },
] as const satisfies readonly Option[];

export const ENTREGA = [
  { value: "papel", label: "Papel", points: 2 },
  { value: "excel_pdf", label: "Excel o PDF", points: 2 },
  { value: "whatsapp", label: "Por WhatsApp", points: 2 },
  { value: "otra", label: "Otra herramienta", points: 1 },
] as const satisfies readonly Option[];

export const HORAS = [
  { value: "menos_2", label: "Menos de 2", points: 0 },
  { value: "2_5", label: "2–5", points: 1 },
  { value: "5_10", label: "5–10", points: 2 },
  { value: "mas_10", label: "Más de 10", points: 3 },
] as const satisfies readonly Option[];

/** Selección múltiple: 1 punto por opción, con tope en DOLORES_MAX_PUNTOS. */
export const DOLORES = [
  { value: "no_vuelven", label: "Pacientes que no vuelven", points: 1 },
  { value: "no_cumplen", label: "Que no cumplan el plan", points: 1 },
  { value: "tiempo_planes", label: "Tiempo armando planes", points: 1 },
  { value: "seguimiento", label: "Dar seguimiento", points: 1 },
  { value: "cobrar", label: "Cobrar a tiempo", points: 1 },
] as const satisfies readonly Option[];
export const DOLORES_MAX_PUNTOS = 3;

export const URGENCIA = [
  { value: "este_mes", label: "Este mes", points: 3 },
  { value: "3_meses", label: "En los próximos 3 meses", points: 2 },
  { value: "explorando", label: "Solo estoy explorando", points: 0 },
] as const satisfies readonly Option[];

export type Pacientes = (typeof PACIENTES)[number]["value"];
export type Facturacion = (typeof FACTURACION)[number]["value"];
export type Retencion = (typeof RETENCION)[number]["value"];
export type Entrega = (typeof ENTREGA)[number]["value"];
export type Horas = (typeof HORAS)[number]["value"];
export type Dolor = (typeof DOLORES)[number]["value"];
export type Urgencia = (typeof URGENCIA)[number]["value"];

export type Answers = {
  pacientes: Pacientes;
  facturacion: Facturacion;
  retencion: Retencion;
  entrega: Entrega;
  horas: Horas;
  dolores: Dolor[];
  urgencia: Urgencia;
};

// ---------------------------------------------------------------------------
// Reglas
// ---------------------------------------------------------------------------

export const RULES = {
  /** Debajo de este dolor la consulta no califica (máximo posible: 11). */
  dolorMinimo: 4,
  /** Pacientes que se usan como ejemplo de "recuperar". */
  pacientesARecuperar: 4,
  /** Rangos de pacientes que cuentan para prioridad alta (con urgencia "este_mes"). */
  pacientesPrioridad: ["31_80", "mas_80"] as Pacientes[],
} as const;

/** Punto medio de cada rango, para la estimación. */
export const PUNTO_MEDIO_PACIENTES: Record<Pacientes, number> = {
  menos_10: 5,
  "10_30": 20,
  "31_80": 55,
  mas_80: 100,
};

export const PUNTO_MEDIO_FACTURACION: Record<Facturacion, number> = {
  menos_500: 250,
  "500_1500": 1000,
  "1500_4000": 2750,
  mas_4000: 5000,
};

/** Proporción de pacientes que no llegan a la 3.ª consulta, según la respuesta. */
export const TASA_ABANDONO: Record<Retencion, number> = {
  "8_10": 0.15,
  "5_7": 0.4,
  menos_5: 0.6,
  no_se: 0.4,
};

// ---------------------------------------------------------------------------
// Cálculo
// ---------------------------------------------------------------------------

export type Resultado = "prioridad_alta" | "califica" | "aun_no" | "no_califica";
export type MotivoNoCalifica = "tamano" | "volumen" | "dolor";

export type Estimacion = {
  /** Punto medio de pacientes activos al mes. */
  pacientes: number;
  /** Pacientes que podrían no llegar a la 3.ª consulta. */
  pacientesEnRiesgo: number;
  /** Ingreso mensual aproximado por paciente, en USD. */
  valorPorPaciente: number;
  /** Pacientes usados en el ejemplo (4, o menos si en riesgo hay menos). */
  pacientesARecuperar: number;
  /** Valor mensual de recuperarlos, en USD. */
  valorRecuperar: number;
};

export type Evaluacion = {
  puntos: number;
  dolor: number;
  resultado: Resultado;
  motivo: MotivoNoCalifica | null;
  estimacion: Estimacion;
};

const pointsOf = <V extends string>(options: readonly Option<V>[], value: V) =>
  options.find((o) => o.value === value)?.points ?? 0;

export function puntosDolores(dolores: readonly Dolor[]): number {
  const unicos = new Set(dolores);
  const total = DOLORES.filter((o) => unicos.has(o.value)).reduce((s, o) => s + o.points, 0);
  return Math.min(total, DOLORES_MAX_PUNTOS);
}

export function calcularDolor(a: Answers): number {
  return (
    pointsOf(RETENCION, a.retencion) +
    pointsOf(ENTREGA, a.entrega) +
    pointsOf(HORAS, a.horas) +
    puntosDolores(a.dolores)
  );
}

export function calcularPuntos(a: Answers): number {
  return (
    pointsOf(PACIENTES, a.pacientes) +
    pointsOf(FACTURACION, a.facturacion) +
    pointsOf(URGENCIA, a.urgencia) +
    calcularDolor(a)
  );
}

export function calcularEstimacion(a: Answers): Estimacion {
  const pacientes = PUNTO_MEDIO_PACIENTES[a.pacientes];
  const facturacion = PUNTO_MEDIO_FACTURACION[a.facturacion];
  const pacientesEnRiesgo = Math.max(1, Math.round(pacientes * TASA_ABANDONO[a.retencion]));
  const valorPorPaciente = facturacion / pacientes;
  const pacientesARecuperar = Math.min(RULES.pacientesARecuperar, pacientesEnRiesgo);
  return {
    pacientes,
    pacientesEnRiesgo,
    valorPorPaciente: Math.round(valorPorPaciente),
    pacientesARecuperar,
    valorRecuperar: Math.round(pacientesARecuperar * valorPorPaciente),
  };
}

export function evaluar(a: Answers): Evaluacion {
  const puntos = calcularPuntos(a);
  const dolor = calcularDolor(a);
  const estimacion = calcularEstimacion(a);

  let motivo: MotivoNoCalifica | null = null;
  if (a.pacientes === "menos_10") motivo = "tamano";
  else if (a.facturacion === "menos_500") motivo = "volumen";
  else if (dolor < RULES.dolorMinimo) motivo = "dolor";

  let resultado: Resultado;
  if (motivo) resultado = "no_califica";
  else if (a.urgencia === "explorando") resultado = "aun_no";
  else if (RULES.pacientesPrioridad.includes(a.pacientes) && a.urgencia === "este_mes")
    resultado = "prioridad_alta";
  else resultado = "califica";

  return { puntos, dolor, resultado, motivo, estimacion };
}

/** Formato de Costa Rica: separador de miles con espacio. "$1 375". */
export function formatUsd(n: number): string {
  const s = Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `$${s}`;
}
