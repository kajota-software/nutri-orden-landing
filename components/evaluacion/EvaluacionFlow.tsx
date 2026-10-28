"use client";

import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { buttons, errors as copyErrors, questions as copy, steps } from "@/content/evaluacion";
import { track } from "@/lib/analytics";
import { answersSchema, contactSchema, type ContactData } from "@/lib/lead-schema";
import {
  DOLORES,
  ENTREGA,
  FACTURACION,
  HORAS,
  PACIENTES,
  RETENCION,
  URGENCIA,
  type Answers,
  type Evaluacion,
  type Option,
} from "@/lib/qualification";
import { readUtm } from "@/lib/utm";
import { AnalysisScreen } from "./AnalysisScreen";
import { ContactFields } from "./ContactFields";
import { OptionGroup } from "./OptionGroup";
import { ResultView } from "./ResultView";

type AnswerKey = keyof Answers;
type Question =
  | { key: AnswerKey; step: number; options: readonly Option[]; multiple?: boolean }
  | { key: "contacto"; step: number };

const QUESTIONS: Question[] = [
  { key: "pacientes", step: 0, options: PACIENTES },
  { key: "facturacion", step: 0, options: FACTURACION },
  { key: "retencion", step: 1, options: RETENCION },
  { key: "entrega", step: 1, options: ENTREGA },
  { key: "horas", step: 1, options: HORAS },
  { key: "dolores", step: 2, options: DOLORES, multiple: true },
  { key: "urgencia", step: 2, options: URGENCIA },
  { key: "contacto", step: 3 },
];

/** En móvil, una pregunta por pantalla. En desktop, un paso (varias preguntas) por pantalla. */
const MOBILE_SCREENS = QUESTIONS.map((_, i) => [i]);
const DESKTOP_SCREENS = steps.map((_, s) => QUESTIONS.flatMap((q, i) => (q.step === s ? [i] : [])));

type DraftAnswers = Partial<Omit<Answers, "dolores">> & { dolores: Answers["dolores"] };
type Draft = { answers: DraftAnswers; contact: Partial<ContactData>; pos: number };
const EMPTY: Draft = { answers: { dolores: [] }, contact: {}, pos: 0 };
const STORAGE_KEY = "nu-evaluacion-v1";

type Phase = "form" | "leaving" | "analyzing" | "error" | "result";

const desktopQuery = "(min-width: 768px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(desktopQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

async function sendLead(draft: Draft): Promise<Evaluacion> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answers: draft.answers,
      contact: draft.contact,
      utm: readUtm(),
      pagina: window.location.href,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Evaluacion;
}

export function EvaluacionFlow() {
  const isDesktop = useIsDesktop();
  const screens = isDesktop ? DESKTOP_SCREENS : MOBILE_SCREENS;

  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [phase, setPhase] = useState<Phase>("form");
  const [retrying, setRetrying] = useState(false);
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);

  const request = useRef<Promise<Evaluacion> | null>(null);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // Restaurar el progreso guardado (si recarga la página).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Draft;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar
        setDraft({ ...EMPTY, ...parsed, answers: { ...EMPTY.answers, ...parsed.answers } });
        started.current = true;
      }
    } catch {
      // Borrador dañado: empezamos de cero.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || phase === "result") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Sin almacenamiento disponible: el formulario sigue funcionando.
    }
  }, [draft, ready, phase]);

  const screenIdx = Math.max(0, screens.findIndex((s) => s.includes(draft.pos)));
  const screen = screens[screenIdx];
  const step = QUESTIONS[screen[0]].step;
  const isLast = screenIdx === screens.length - 1;
  const progress = ((screenIdx + 1) / screens.length) * 100;

  // Al cambiar de pantalla: llevar la vista al inicio del formulario y el foco al título.
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ block: "start" });
  }, [screenIdx]);

  const goTo = useCallback(
    (idx: number, direction: "next" | "prev") => {
      moved.current = true;
      setDir(direction);
      setErrors({});
      setDraft((d) => ({ ...d, pos: screens[idx][0] }));
    },
    [screens],
  );

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("ViewContent", { content_name: "evaluacion" });
  };

  const setAnswer = (key: AnswerKey, value: string | string[], byPointer: boolean) => {
    markStarted();
    setDraft((d) => ({ ...d, answers: { ...d.answers, [key]: value } }));
    setErrors((e) => ({ ...e, [key]: "" }));
    // En móvil, una respuesta única avanza sola al tocarla.
    const q = QUESTIONS[screen[0]];
    if (byPointer && screen.length === 1 && "options" in q && !q.multiple && !isLast) {
      setTimeout(() => goTo(screenIdx + 1, "next"), 280);
    }
  };

  const validateScreen = (): boolean => {
    const next: Record<string, string> = {};
    for (const i of screen) {
      const q = QUESTIONS[i];
      if (q.key === "contacto") {
        const r = contactSchema.safeParse(draft.contact);
        if (!r.success) for (const issue of r.error.issues) next[String(issue.path[0])] ??= issue.message;
      } else {
        const v = draft.answers[q.key];
        if (!v || (Array.isArray(v) && v.length === 0)) next[q.key] = copyErrors.required;
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`f-${first}`)?.focus();
      return false;
    }
    return true;
  };

  const finish = async () => {
    try {
      const result = await request.current!;
      track("Lead", { resultado: result.resultado });
      setEvaluacion(result);
      setPhase("result");
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setPhase("error");
    }
  };

  const submit = () => {
    const answers = answersSchema.safeParse(draft.answers);
    if (!answers.success) {
      const missing = QUESTIONS.findIndex((q) => q.key === answers.error.issues[0]?.path[0]);
      goTo(Math.max(0, screens.findIndex((s) => s.includes(missing))), "prev");
      return;
    }
    request.current = sendLead(draft);
    request.current.catch(() => {}); // se maneja en finish()
    setPhase("leaving");
    setTimeout(() => setPhase("analyzing"), 300);
    window.scrollTo({ top: 0 });
  };

  const retry = async () => {
    setRetrying(true);
    request.current = sendLead(draft);
    await finish().finally(() => setRetrying(false));
  };

  const onNext = () => {
    if (!validateScreen()) return;
    if (isLast) submit();
    else goTo(screenIdx + 1, "next");
  };

  if (phase === "analyzing") return <AnalysisScreen onDone={finish} />;

  if (phase === "result" && evaluacion) {
    return <ResultView evaluacion={evaluacion} name={draft.contact.nombre ?? ""} email={draft.contact.correo ?? ""} />;
  }

  if (phase === "error") {
    return (
      <div role="alert" className="nu-fade-in mx-auto max-w-md rounded-lg border border-line bg-surface p-6 text-center shadow-sm sm:p-10">
        <p className="text-body text-ink">{copyErrors.submit}</p>
        <button
          type="button"
          onClick={retry}
          disabled={retrying}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-label text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-40"
        >
          <RotateCw size={18} strokeWidth={1.5} aria-hidden className={retrying ? "animate-spin" : undefined} />
          {buttons.retry}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={topRef}
      className={`scroll-mt-6 transition-opacity duration-300 ${phase === "leaving" ? "opacity-0" : "opacity-100"} ${
        ready ? "" : "invisible"
      }`}
    >
      {/* Progreso */}
      <div className="flex items-center justify-between gap-4 text-label">
        <span className="text-primary">
          Paso {step + 1} de {steps.length}
          <span className="text-ink-muted"> · {steps[step]}</span>
        </span>
        {!isDesktop ? (
          <span className="text-ink-muted tabular-nums">
            {screenIdx + 1}/{screens.length}
          </span>
        ) : null}
      </div>
      <div
        role="progressbar"
        aria-label="Avance de la evaluación"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="mt-3 h-1.5 overflow-hidden rounded-pill bg-surface-sage"
      >
        <div className="h-full rounded-pill bg-primary transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="mt-8"
      >
        <div key={`${isDesktop}-${screenIdx}`} className={`space-y-10 ${dir === "next" ? "nu-slide-next" : "nu-slide-prev"}`}>
          {screen.map((i, n) => {
            const q = QUESTIONS[i];
            const text = copy[q.key];
            const headingId = `q-${q.key}`;
            return (
              <div key={q.key} className="min-w-0">
                <h2
                  id={headingId}
                  ref={n === 0 ? headingRef : undefined}
                  tabIndex={n === 0 ? -1 : undefined}
                  className="text-heading-2 text-balance text-ink outline-none"
                >
                  {text.title}
                </h2>
                {"hint" in text ? <p className="mt-1.5 text-body text-ink-muted">{text.hint}</p> : null}
                <div className="mt-5">
                  {q.key === "contacto" ? (
                    <ContactFields
                      value={draft.contact}
                      errors={errors}
                      onChange={(key, value) => {
                        markStarted();
                        setDraft((d) => ({ ...d, contact: { ...d.contact, [key]: value } }));
                        if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
                      }}
                    />
                  ) : q.multiple ? (
                    <OptionGroup
                      multiple
                      name={q.key}
                      legendId={headingId}
                      options={q.options}
                      value={draft.answers.dolores}
                      invalid={!!errors[q.key]}
                      onChange={(v, p) => setAnswer(q.key, v, p)}
                    />
                  ) : (
                    <OptionGroup
                      name={q.key}
                      legendId={headingId}
                      options={q.options}
                      value={draft.answers[q.key] as string | undefined}
                      invalid={!!errors[q.key]}
                      onChange={(v, p) => setAnswer(q.key, v, p)}
                    />
                  )}
                </div>
                {q.key !== "contacto" && errors[q.key] ? (
                  <p role="alert" className="mt-3 text-body-s text-danger">
                    {errors[q.key]}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
          {screenIdx > 0 ? (
            <button
              type="button"
              onClick={() => goTo(screenIdx - 1, "prev")}
              className="inline-flex h-11 items-center gap-2 rounded-md px-3 text-label text-primary transition-colors hover:bg-surface-sage"
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden />
              {buttons.back}
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={phase === "leaving"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-label text-on-primary transition duration-200 hover:-translate-y-px hover:bg-primary-hover hover:shadow-sm disabled:opacity-40"
          >
            {isLast ? buttons.submit : buttons.next}
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}
