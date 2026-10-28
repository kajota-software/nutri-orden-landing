import type { ContactData, Utm } from "./lead-schema";
import { getDb } from "./mongodb";
import type { Answers, Evaluacion } from "./qualification";

export const COLECCION_SOLICITUDES = "solicitudes_usuario";

export type Solicitud = {
  creadoEn: Date;
  estado: "nueva" | "contactada" | "descartada";
  contacto: ContactData;
  respuestas: Answers;
  evaluacion: Evaluacion;
  utm: Utm;
  pagina: string;
};

let indicesListos: Promise<unknown> | undefined;

async function coleccion() {
  const col = (await getDb()).collection<Solicitud>(COLECCION_SOLICITUDES);
  // createIndexes es idempotente; la primera escritura crea la colección.
  indicesListos ??= col
    .createIndexes([
      { key: { creadoEn: -1 }, name: "por_fecha" },
      { key: { "contacto.correo": 1 }, name: "por_correo" },
      { key: { estado: 1, creadoEn: -1 }, name: "por_estado" },
    ])
    .catch((err) => {
      indicesListos = undefined;
      console.error("[solicitudes] No se pudieron crear los índices:", err);
    });
  await indicesListos;
  return col;
}

export async function guardarSolicitud(data: Omit<Solicitud, "creadoEn" | "estado">) {
  const col = await coleccion();
  const { insertedId } = await col.insertOne({ creadoEn: new Date(), estado: "nueva", ...data });
  return insertedId.toHexString();
}
