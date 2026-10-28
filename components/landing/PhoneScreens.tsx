import { BellRing, Camera, Check, Repeat2 } from "lucide-react";
import type { ReactNode } from "react";
import { hero, phoneScreens, type PhoneScreen } from "@/content/landing";

/** Marco de celular para los mockups (radius-lg + shadow-lg, brand/BRAND.md §8). */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-line bg-ink p-2 shadow-lg ${className}`}>
      <div className="h-full overflow-hidden rounded-md bg-bg">
        <div className="flex justify-center pt-2">
          <span className="h-1.5 w-16 rounded-pill bg-line" />
        </div>
        <div className="px-4 pt-3 pb-5">{children}</div>
      </div>
    </div>
  );
}

function Checkbox({ done, size = 22 }: { done: boolean; size?: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-sm border ${done ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"}`}
    >
      {done ? <Check size={size * 0.62} strokeWidth={2.5} /> : null}
    </span>
  );
}

export function PlanScreen() {
  const { mockup } = hero;
  return (
    <>
      <p className="text-caption text-ink-muted">{mockup.day}</p>
      <p className="mt-0.5 text-heading-3 text-ink">{mockup.greeting}</p>
      <ul className="mt-3 space-y-2">
        {mockup.meals.map((meal) => (
          <li key={meal.name} className={`rounded-sm border p-2.5 ${meal.swap ? "border-primary bg-surface-sage" : "border-line bg-surface"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-caption text-ink-muted">
                {meal.name} · {meal.time}
              </span>
              {meal.done ? (
                <span className="grid size-4 place-items-center rounded-pill bg-primary text-on-primary">
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-body-s font-medium text-ink">{meal.food}</p>
            {meal.swap ? (
              <span className="mt-1.5 inline-flex items-center gap-1 text-caption text-ink">
                <Repeat2 size={12} strokeWidth={1.5} />
                {meal.swap}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ListScreen() {
  const s = phoneScreens.lista;
  return (
    <>
      <p className="text-caption text-ink-muted">{s.subtitle}</p>
      <p className="mt-0.5 text-heading-3 text-ink">{s.title}</p>
      <div className="mt-3 space-y-3">
        {s.groups.map((g) => (
          <div key={g.name}>
            <p className="text-caption text-ink-muted">{g.name}</p>
            <ul className="mt-1.5 space-y-1.5">
              {g.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2.5 rounded-sm border border-line bg-surface px-2.5 py-2">
                  <Checkbox done={item.done} size={20} />
                  <span className={`text-body-s ${item.done ? "text-ink-muted line-through" : "text-ink"}`}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export function ProgressScreen() {
  const s = phoneScreens.avance;
  return (
    <>
      <p className="text-caption text-ink-muted">{s.subtitle}</p>
      <p className="mt-0.5 text-heading-3 text-ink">{s.title}</p>
      <div className="mt-3 rounded-sm border border-line bg-surface p-3">
        <div className="flex h-28 items-end gap-2">
          {s.bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-sm ${i === s.bars.length - 1 ? "bg-brand" : "bg-sage-300"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-caption text-ink-muted tabular-nums">
          <span>Sem 1</span>
          <span>Sem 6</span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {s.metrics.map((m) => (
          <div key={m.label} className="rounded-sm border border-line bg-surface p-2.5">
            <p className="text-caption text-ink-muted">{m.label}</p>
            <p className="text-heading-3 text-ink tabular-nums">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-sm border border-line bg-surface p-2.5 text-body-s text-ink">
        <Camera size={16} strokeWidth={1.5} className="text-primary" />
        {s.photos}
      </div>
    </>
  );
}

export function RemindersScreen() {
  const s = phoneScreens.recordatorios;
  return (
    <>
      <p className="text-heading-3 text-ink">{s.title}</p>
      <ul className="mt-3 space-y-2">
        {s.items.map((r, i) => (
          <li key={r.time} className={`rounded-sm border p-3 ${i === 0 ? "border-primary bg-surface-sage" : "border-line bg-surface"}`}>
            <span className="flex items-center gap-1.5 text-caption text-ink-muted">
              <BellRing size={12} strokeWidth={1.5} />
              {r.time}
            </span>
            <p className="mt-1 text-body-s text-ink">{r.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export const SCREENS: Record<PhoneScreen, () => ReactNode> = {
  plan: PlanScreen,
  lista: ListScreen,
  avance: ProgressScreen,
  recordatorios: RemindersScreen,
};
