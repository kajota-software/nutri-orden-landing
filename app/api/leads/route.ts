import { leadSchema } from "@/lib/lead-schema";
import { evaluar } from "@/lib/qualification";

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

  const payload = {
    fecha: new Date().toISOString(),
    pagina: pagina ?? request.headers.get("referer") ?? "",
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

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[leads] Falta LEADS_WEBHOOK_URL: el lead no se guardó.");
      return Response.json({ error: "No pudimos guardar tus respuestas." }, { status: 500 });
    }
    console.warn("[leads] LEADS_WEBHOOK_URL no está configurada. Lead recibido:", payload);
  } else {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
    } catch (err) {
      console.error("[leads] Error al reenviar al webhook:", err);
      return Response.json({ error: "No pudimos guardar tus respuestas." }, { status: 502 });
    }
  }

  return Response.json(evaluacion);
}
