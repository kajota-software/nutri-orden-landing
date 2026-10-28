/**
 * Textos de /evaluacion. Las opciones de respuesta y sus puntos viven en lib/qualification.ts.
 */

export const evaluacionMeta = {
  title: "Evaluación — NutriOrden",
  description: "Responde 8 preguntas (2 minutos) y te decimos si NutriOrden es para tu consulta.",
};

export const intro = {
  title: "Veamos si NutriOrden es para tu consulta.",
  subtitle:
    "Responde 8 preguntas (2 minutos). Al final ves cuántos pacientes podrías estar perdiendo hoy y te contactamos para contarte si podemos ayudarte.",
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
  contacto: { title: "¿Cómo te contactamos?", hint: "Solo lo usamos para darte seguimiento." },
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
  submit: "Enviar mis respuestas",
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
    "Guardando tus respuestas…",
  ],
};

export const result = {
  title: (nombre: string) => `Gracias, ${nombre}. Recibimos tus respuestas.`,
  text: "Vamos a analizar la información de tu consulta y te contactamos en menos de 24 horas hábiles.",
  contactLine: (whatsapp: string, correo: string) => `Te escribiremos al ${whatsapp} o a ${correo}.`,
  nextTitle: "En esa conversación",
  next: [
    "Te contamos si NutriOrden encaja con tu consulta.",
    "Revisamos juntos cuántos pacientes podrías recuperar.",
    "Si encaja, dejamos tu consulta lista para empezar.",
  ],
  estimateLabel: "Mientras tanto, una estimación con tus respuestas",
  estimate: (pacientes: number, enRiesgo: number, recuperar: number, valor: string) =>
    `De tus ~${pacientes} pacientes, alrededor de ${enRiesgo} podrían no llegar a la tercera consulta. Recuperar solo ${recuperar} equivale a ~${valor} al mes.`,
  back: "Volver al inicio",
};
