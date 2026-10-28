import { z } from "zod";
import {
  DOLORES,
  ENTREGA,
  FACTURACION,
  HORAS,
  PACIENTES,
  RETENCION,
  URGENCIA,
  type Option,
} from "./qualification";

const oneOf = <V extends string>(options: readonly Option<V>[], message: string) =>
  z.enum(options.map((o) => o.value) as [V, ...V[]], { error: message });

export const answersSchema = z.object({
  pacientes: oneOf(PACIENTES, "Elige cuántos pacientes atiendes."),
  facturacion: oneOf(FACTURACION, "Elige tu facturación aproximada."),
  retencion: oneOf(RETENCION, "Elige una opción."),
  entrega: oneOf(ENTREGA, "Elige cómo entregas los planes."),
  horas: oneOf(HORAS, "Elige cuántas horas dedicas."),
  dolores: z
    .array(oneOf(DOLORES, "Opción no válida."))
    .min(1, { error: "Elige al menos una opción." }),
  urgencia: oneOf(URGENCIA, "Elige qué tan pronto quieres resolverlo."),
});

export const contactSchema = z.object({
  nombre: z.string({ error: "Escribe tu nombre." }).trim().min(2, { error: "Escribe tu nombre." }).max(80),
  whatsapp: z
    .string({ error: "Escribe tu número de WhatsApp." })
    .trim()
    .refine((v) => /^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, "").length >= 8, {
      error: "Escribe un número de WhatsApp válido.",
    }),
  correo: z.email({ error: "Escribe un correo válido." }).max(120),
  pais: z.string({ error: "Elige tu país." }).trim().min(2, { error: "Elige tu país." }).max(60),
  ciudad: z.string({ error: "Escribe tu ciudad." }).trim().min(2, { error: "Escribe tu ciudad." }).max(80),
});

export const utmSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
  })
  .default({});

export const leadSchema = z.object({
  answers: answersSchema,
  contact: contactSchema,
  utm: utmSchema,
  pagina: z.string().max(500).optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
export type Utm = z.infer<typeof utmSchema>;
export type LeadInput = z.input<typeof leadSchema>;
