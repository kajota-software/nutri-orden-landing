import { leadSchema } from "@/lib/lead-schema";
import { evaluar } from "@/lib/qualification";
import { guardarSolicitud } from "@/lib/solicitudes";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Revisa tus respuestas.", issues: parsed.error.issues }, { status: 422 });
  }

  const { answers, contact, utm, pagina } = parsed.data;
  // El puntaje se recalcula aquí; nunca se confía en lo que manda el cliente.
  const evaluacion = evaluar(answers);
  const paginaOrigen = pagina ?? request.headers.get("referer") ?? "";

  // La base de datos es el registro principal: si no se guarda, la persona lo sabe y reintenta.
  let id: string;
  try {
    id = await guardarSolicitud({ contacto: contact, respuestas: answers, evaluacion, utm, pagina: paginaOrigen });
  } catch (err) {
    console.error("[leads] No se pudo guardar la solicitud en MongoDB:", err);
    return Response.json({ error: "No pudimos guardar tus respuestas." }, { status: 500 });
  }

  // Webhook opcional (Make, Zapier, Sheets). Si falla, la solicitud ya quedó guardada.
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    const payload = {
      id,
      fecha: new Date().toISOString(),
      pagina: paginaOrigen,
      ...contact,
      ...answers,
      dolores: answers.dolores.join(", "),
      puntos: evaluacion.puntos,
      dolor: evaluacion.dolor,
      resultado: evaluacion.resultado,
      motivo: evaluacion.motivo ?? "",
      pacientes_estimados: evaluacion.estimacion.pacientes,
      pacientes_en_riesgo: evaluacion.estimacion.pacientesEnRiesgo,
      valor_por_paciente_usd: evaluacion.estimacion.valorPorPaciente,
      valor_recuperar_usd: evaluacion.estimacion.valorRecuperar,
      utm_source: utm.utm_source ?? "",
      utm_medium: utm.utm_medium ?? "",
      utm_campaign: utm.utm_campaign ?? "",
      utm_content: utm.utm_content ?? "",
    };
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
    } catch (err) {
      console.error("[leads] Error al reenviar al webhook (la solicitud sí se guardó):", err);
    }
  }

  return Response.json(evaluacion);
}
