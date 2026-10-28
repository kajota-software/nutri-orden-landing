/**
 * Textos de la landing. Edita aquí sin tocar los componentes.
 * Voz: segunda persona, tuteo, español de Costa Rica (ver brand/BRAND.md §7).
 */
import {
  BellRing,
  CalendarCheck,
  ClipboardList,
  LayoutTemplate,
  LineChart,
  ShoppingBasket,
  Sparkles,
  UserRoundSearch,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const CTA_LABEL = "Ver si mi consulta califica";
export const CTA_HREF = "/evaluacion";

export const meta = {
  title: "NutriOrden — Para que tus pacientes vuelvan",
  ogTitle: "NutriOrden — Tus pacientes vuelven. Tu consulta, en orden.",
  description:
    "NutriOrden pone el plan, la lista del súper y el avance en el celular de tu paciente, para que lo cumpla y vuelva. Y a ti te devuelve las horas que hoy se van en Excel y WhatsApp.",
};

export const nav = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Precio", href: "/#precio" },
  { label: "Preguntas", href: "/#preguntas" },
];

export const hero = {
  title: "Tus pacientes dejan el plan de alimentación. Y no vuelven a consulta.",
  subtitle: meta.description,
  note: "Toma 2 minutos · Del equipo detrás de FitManage",
  mockup: {
    day: "Hoy · martes 27 oct",
    greeting: "Tu plan de hoy",
    meals: [
      { time: "7:00 a. m.", name: "Desayuno", food: "Gallo pinto, huevo y papaya", done: true },
      { time: "10:00 a. m.", name: "Merienda", food: "Yogur natural con avena", done: true },
      { time: "12:30 p. m.", name: "Almuerzo", food: "Arroz, frijoles, pollo y ensalada", done: false, swap: "Cambiar alimento" },
      { time: "7:00 p. m.", name: "Cena", food: "Tortilla con queso y vegetales", done: false },
    ],
    progressLabel: "Tu avance",
    progressValue: "4 de 4",
    progressNote: "registros semanales al día",
    list: {
      title: "Lista del súper",
      items: [
        { name: "Frijoles negros", done: true },
        { name: "Huevos", done: true },
        { name: "Papaya", done: true },
        { name: "Pechuga de pollo", done: false },
        { name: "Avena en hojuelas", done: false },
      ],
    },
  },
};

export const problem = {
  title: "No se van por falta de ganas. Se pierden entre consulta y consulta.",
  chain: [
    "Recibe un plan en papel o Excel que cuesta entender.",
    "Llega al súper e improvisa.",
    "No ve su avance y pierde la motivación.",
    "Le da pena volver si no cumplió.",
    "Nadie le escribe y deja de agendar.",
  ],
  meanwhile: "Mientras tanto, tú pasas las noches armando planes y respondiendo las mismas dudas por WhatsApp.",
  closer: "NutriOrden corta esa cadena en cada eslabón.",
};

type Benefit = { icon: LucideIcon; title: string; text: string };
export type PhoneScreen = "plan" | "lista" | "avance" | "recordatorios";

export const patientBenefits: { title: string; eyebrow: string; items: (Benefit & { screen: PhoneScreen })[] } = {
  eyebrow: "En el celular de tu paciente",
  title: "Seguir el plan deja de ser un esfuerzo",
  items: [
    {
      icon: UtensilsCrossed,
      screen: "plan",
      title: "Sabe qué comer hoy",
      text: "Abre el celular y ve su plan del día, comida por comida. Si algo no le gusta, tiene opciones para cambiarlo.",
    },
    {
      icon: ShoppingBasket,
      screen: "lista",
      title: "Llega al súper con la lista hecha",
      text: "La lista de compras sale sola de su plan. Marca lo que ya tiene y no improvisa en el pasillo.",
    },
    {
      icon: LineChart,
      screen: "avance",
      title: "Ve su avance y eso lo motiva",
      text: "Su peso, sus medidas y sus fotos en un solo lugar. Ver que avanza es lo que lo hace seguir.",
    },
    {
      icon: BellRing,
      screen: "recordatorios",
      title: "No se le olvida volver",
      text: "Recibe recordatorios de su cita y de su registro semanal, sin que tengas que escribirle.",
    },
  ],
};

export const nutritionistBenefits: { title: string; eyebrow: string; items: Benefit[] } = {
  eyebrow: "En tu consulta",
  title: "Más pacientes que vuelven, con menos horas de trabajo",
  items: [
    {
      icon: UserRoundSearch,
      title: "Sabes quién se está alejando",
      text: "Te avisamos cuando un paciente deja de registrar su avance, antes de que deje de agendar.",
    },
    {
      icon: LayoutTemplate,
      title: "Armas planes en minutos",
      text: "Partes de tus plantillas y recetas. Ajustas lo necesario y el plan llega a su celular.",
    },
    {
      icon: Sparkles,
      title: "Tu consulta se ve premium",
      text: "Tus pacientes sienten el acompañamiento, y es más fácil venderles seguimiento mensual.",
    },
  ],
};

/** Mockups del celular del paciente (sección "Seguir el plan deja de ser un esfuerzo"). */
export const phoneScreens = {
  lista: {
    title: "Lista del súper",
    subtitle: "Semana del 27 oct",
    groups: [
      { name: "Verdulería", items: [{ name: "Papaya", done: true }, { name: "Plátano maduro", done: true }, { name: "Espinaca", done: false }] },
      { name: "Abarrotes", items: [{ name: "Frijoles negros", done: true }, { name: "Avena en hojuelas", done: false }] },
      { name: "Carnes", items: [{ name: "Pechuga de pollo", done: false }] },
    ],
  },
  avance: {
    title: "Tu avance",
    subtitle: "Últimas 6 semanas",
    bars: [38, 46, 52, 60, 71, 82],
    metrics: [
      { label: "Cintura", value: "−3 cm" },
      { label: "Registros", value: "6 de 6" },
    ],
    photos: "3 fotos de avance",
  },
  recordatorios: {
    title: "Recordatorios",
    items: [
      { time: "Hoy · 7:00 p. m.", text: "Es hora de tu registro semanal. Te toma 1 minuto." },
      { time: "Jueves · 9:00 a. m.", text: "Tu cita con tu nutricionista es el jueves a las 10:00 a. m." },
      { time: "Lunes · 8:00 a. m.", text: "Nueva semana: tu lista del súper ya está lista." },
    ],
  },
};

/** Mockup del panel de la nutricionista (banda verde profundo). */
export const panelMock = {
  title: "Tus pacientes",
  subtitle: "Esta semana",
  alert: { text: "Ana lleva 8 días sin registrar su avance.", action: "Escribirle" },
  patients: [
    { name: "Ana Rojas", meta: "8 días sin registro", status: "En riesgo", tone: "warning" },
    { name: "Carlos Mora", meta: "Registró ayer", status: "Activo", tone: "success" },
    { name: "María Solís", meta: "Primera semana", status: "Nueva", tone: "primary" },
    { name: "José Vargas", meta: "Cita el jueves", status: "Activo", tone: "success" },
  ],
} as const;

export const howItWorks = {
  id: "como-funciona",
  title: "Tres pasos. Cero complicaciones.",
  steps: [
    { icon: ClipboardList, title: "Armas el plan desde tus plantillas", text: "Eliges una plantilla, ajustas porciones y listo." },
    { icon: ShoppingBasket, title: "Tu paciente lo recibe en su celular", text: "Con su plan del día y su lista del súper ya hecha." },
    { icon: CalendarCheck, title: "Ves su avance y te avisamos si se atrasa", text: "Le escribes a tiempo, antes de que se aleje." },
  ],
};

export const beforeAfter = {
  title: "Lo que cambia para tu paciente, y para ti",
  columns: { label: "", before: "Hoy", after: "Con NutriOrden" },
  toggleLabel: "Compara cómo es hoy y cómo es con NutriOrden",
  rows: [
    { label: "El plan", before: "Un PDF o Excel que hay que estudiar", after: "Claro, por día y por comida, siempre en su mano" },
    { label: "El súper", before: "Improvisa", after: "Lista lista, sacada de su plan" },
    { label: "El progreso", before: "Lo ve solo si vuelve", after: "Lo ve cada semana" },
    { label: "Entre consultas", before: "Silencio o dudas sueltas por WhatsApp", after: "Un registro semanal que lo mantiene conectado" },
    { label: "Si se aleja", before: "Te enteras cuando ya no agendó", after: "Te enteras a tiempo" },
    { label: "Tu tiempo", before: "Noches armando planes", after: "Planes en minutos" },
  ],
  timelineTitle: "Su primer mes",
  timeline: [
    { day: "Día 1", text: "Sale de consulta con su plan en el celular." },
    { day: "Día 2", text: "Hace el súper con su lista." },
    { day: "Día 7", text: "Ve su primer avance." },
    { day: "Día 12", text: "Se atrasa y le escribes a tiempo." },
    { day: "Día 30", text: "Vuelve a su cita." },
  ],
};

export const cost = {
  title: "Cada paciente que no vuelve es dinero que ya habías ganado.",
  figure: { prefix: "₡", value: 100000, suffix: " al mes" },
  text: "Si cobras ₡25 000 por consulta y solo 4 pacientes más vuelven una vez al mes, son ₡100 000 adicionales, sin buscar un solo paciente nuevo.",
  note: "Ejemplo ilustrativo.",
};

export const pricing = {
  id: "precio",
  title: "Un precio claro. Se paga con un paciente que vuelve.",
  plans: {
    consulta: {
      name: "Consulta",
      description: "Para tu consulta privada.",
      price: "$99",
      period: "al mes",
      features: [
        "Pacientes ilimitados",
        "Planes con tus plantillas y recetas",
        "App para tus pacientes",
        "Lista de compras automática",
        "Seguimiento de medidas, fotos y avance",
        "Recordatorios de citas y pagos",
        "Aviso de pacientes que se están alejando",
        "Acompañamiento para empezar",
      ],
      note: "Sin contratos de permanencia. Cancelas cuando quieras.",
    },
    clinicas: {
      name: "Clínicas",
      badge: "Más adelante",
      description: "Para clínicas con varias nutricionistas y un equipo que coordinar.",
      pricePrefix: "Desde",
      price: "$199",
      period: "al mes",
      features: [
        "Todo lo del plan Consulta",
        "Varias nutricionistas en una misma cuenta",
        "Funciones avanzadas para equipos",
      ],
      note: "Si tienes una clínica, cuéntanos en la evaluación y te avisamos primero.",
    },
  },
};

export const faq = {
  id: "preguntas",
  title: "Preguntas frecuentes",
  items: [
    {
      q: "¿Mis pacientes tienen que descargar algo complicado?",
      a: "No. Lo abren desde un enlace en el celular y pueden agregarlo a su pantalla de inicio, como cualquier app.",
    },
    {
      q: "¿Cuánto tiempo me toma empezar?",
      a: "Poco. Te acompañamos para cargar tus primeros pacientes y tus plantillas, para que empieces sin enredos.",
    },
    {
      q: "¿Sirve si atiendo en línea o presencial?",
      a: "Sí, en ambos casos. Tu paciente tiene su plan en el celular sin importar dónde fue la consulta.",
    },
    {
      q: "¿Qué pasa con los datos de mis pacientes?",
      a: "Son tuyos y de tus pacientes. Se usan solo para su seguimiento y con su consentimiento.",
    },
    {
      q: "¿Puedo usar mis propios planes y recetas?",
      a: "Sí. Armas tus plantillas una vez y las reutilizas con cada paciente.",
    },
    {
      q: "¿Por qué hay una evaluación antes de empezar?",
      a: "Porque queremos trabajar con consultas donde de verdad podamos mejorar la retención. Son 2 minutos y te decimos con honestidad si te podemos ayudar.",
    },
  ],
};

export const closing = {
  title: "Que tus pacientes vuelvan empieza hoy.",
};

export const footer = {
  slogan: "Tus pacientes vuelven. Tu consulta, en orden.",
  whatsappLabel: "WhatsApp",
  emailLabel: "Correo",
  privacy: "Aviso de privacidad",
  byline: "Del equipo detrás de FitManage",
};

export const contact = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const whatsappUrl = (text?: string) =>
  contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "";
