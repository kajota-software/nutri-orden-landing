/**
 * Textos de /evaluacion. Las opciones de respuesta y sus puntos viven en lib/qualification.ts.
 */
import type { MotivoNoCalifica } from "@/lib/qualification";

export const evaluacionMeta = {
  title: "Evaluación — NutriOrden",
  description: "Responde 8 preguntas (2 minutos) y te decimos si NutriOrden es para tu consulta.",
};

export const intro = {
  title: "Veamos si NutriOrden es para tu consulta.",
  subtitle:
    "Responde 8 preguntas (2 minutos). Al final te decimos si podemos ayudarte y cuántos pacientes podrías estar perdiendo hoy.",
};

export const vsl = {
  title: "Mira cómo funciona en 3 minutos",
};

export const steps = ["Tu consulta", "Tus pacientes", "Lo que te cuesta", "Tus datos"] as const;

export const questions = {
  pacientes: { title: "¿Cuántos pacientes activos atiendes al mes?" },
  facturacion: { title: "¿Cuánto factura tu consulta al mes, aproximadamente?", hint: "En dólares (USD)." },
  retencion: { title: "De cada 10 pacientes nuevos, ¿cuántos llegan a la 3.ª consulta?" },
  entrega: { title: "¿Cómo entregas los planes a tus pacientes?" },
  horas: { title: "¿Cuántas horas por semana dedicas a armar planes y responder dudas?" },
  dolores: { title: "¿Qué es lo que más te cuesta hoy?", hint: "Puedes elegir varias." },
  urgencia: { title: "¿Qué tan pronto quieres resolverlo?" },
  contacto: { title: "¿A dónde te enviamos tu resultado?", hint: "Solo lo usamos para darte seguimiento." },
} as const;

export const contactFields = {
  nombre: { label: "Nombre", placeholder: "Tu nombre", autoComplete: "name" },
  whatsapp: { label: "WhatsApp", placeholder: "+506 8888 7777", autoComplete: "tel" },
  correo: { label: "Correo", placeholder: "tu@correo.com", autoComplete: "email" },
  pais: { label: "País", placeholder: "Elige tu país", autoComplete: "country-name" },
  ciudad: { label: "Ciudad", placeholder: "Tu ciudad", autoComplete: "address-level2" },
} as const;

export const countries = [
  "Costa Rica",
  "Panamá",
  "Nicaragua",
  "Honduras",
  "El Salvador",
  "Guatemala",
  "México",
  "Colombia",
  "Ecuador",
  "Perú",
  "Chile",
  "Argentina",
  "República Dominicana",
  "Estados Unidos",
  "España",
  "Otro",
];

export const buttons = {
  next: "Siguiente",
  back: "Atrás",
  submit: "Ver mi resultado",
  retry: "Reintentar",
};

export const errors = {
  required: "Elige una opción para seguir.",
  submit: "No pudimos enviar tus respuestas. Revisa tu conexión e intenta de nuevo; no perdiste nada.",
};

export const analysis = {
  title: "Analizando tu consulta",
  messages: [
    "Revisando el tamaño de tu consulta…",
    "Calculando cuántos pacientes podrías estar perdiendo…",
    "Analizando el tiempo que dedicas a planes y seguimiento…",
    "Preparando tu resultado…",
  ],
};

export const result = {
  estimateLabel: "Estimación con tus respuestas",
  estimate: (pacientes: number, enRiesgo: number, recuperar: number, valor: string) =>
    `De tus ~${pacientes} pacientes, alrededor de ${enRiesgo} podrían no llegar a la tercera consulta. Recuperar solo ${recuperar} equivale a ~${valor} al mes.`,
  califica: {
    title: "Tu consulta califica. Podemos ayudarte a que tus pacientes vuelvan.",
    text: "Agenda una llamada corta para ver tu caso y dejar tu consulta lista.",
    button: "Agendar mi llamada",
    note: "Te escribimos por WhatsApp en menos de 24 horas.",
    whatsappText: "Hola, mi consulta calificó en la evaluación de NutriOrden y quiero agendar mi llamada.",
  },
  aunNo: {
    title: "Tu consulta tiene potencial. Cuando estés lista, aquí estamos.",
    text: "Te enviaremos ideas para mejorar la retención de tus pacientes.",
    button: "Escribirnos por WhatsApp",
    whatsappText: "Hola, hice la evaluación de NutriOrden y quiero saber más.",
  },
  noCalifica: {
    title: "Por ahora NutriOrden no es la mejor opción para tu consulta.",
    reasons: {
      tamano:
        "Hoy atiendes menos de 10 pacientes al mes. NutriOrden rinde de verdad cuando tienes varios pacientes a los que dar seguimiento al mismo tiempo, y no queremos que pagues por algo que todavía no vas a aprovechar.",
      volumen:
        "Con la facturación actual de tu consulta, la inversión todavía no se justificaría, y preferimos decírtelo con claridad.",
      dolor:
        "Por tus respuestas, tus pacientes ya vuelven y tu forma de trabajar te está funcionando. Eso es una gran señal.",
    } satisfies Record<MotivoNoCalifica, string>,
    invite: "Cuando tu consulta crezca, vuelve a hacer la evaluación. Aquí vamos a estar.",
    back: "Volver al inicio",
  },
};
