"use client";

import { contactFields, countries } from "@/content/evaluacion";
import type { ContactData } from "@/lib/lead-schema";

type Key = keyof ContactData;
type Props = {
  value: Partial<ContactData>;
  errors: Partial<Record<Key, string>>;
  onChange: (key: Key, value: string) => void;
};

const inputClass =
  "h-11 w-full rounded-sm border bg-surface px-3.5 text-body text-ink transition-colors placeholder:text-ink-muted focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ContactFields({ value, errors, onChange }: Props) {
  const field = (key: Key, input: React.ReactNode) => (
    <div className={key === "nombre" ? "sm:col-span-2" : undefined}>
      <label htmlFor={`f-${key}`} className="text-label text-ink">
        {contactFields[key].label}
      </label>
      <div className="mt-1.5">{input}</div>
      {errors[key] ? (
        <p id={`e-${key}`} className="mt-1.5 text-body-s text-danger">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  const common = (key: Key) => ({
    id: `f-${key}`,
    name: key,
    autoComplete: contactFields[key].autoComplete,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
    className: `${inputClass} ${errors[key] ? "border-danger" : "border-line"}`,
  });

  const text = (key: Key, type = "text", inputMode?: "tel" | "email") =>
    field(
      key,
      <input
        {...common(key)}
        type={type}
        inputMode={inputMode}
        placeholder={contactFields[key].placeholder}
        value={value[key] ?? ""}
        onChange={(e) => onChange(key, e.target.value)}
      />,
    );

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {text("nombre")}
      {text("whatsapp", "tel", "tel")}
      {text("correo", "email", "email")}
      {field(
        "pais",
        <select {...common("pais")} value={value.pais ?? ""} onChange={(e) => onChange("pais", e.target.value)}>
          <option value="" disabled>
            {contactFields.pais.placeholder}
          </option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>,
      )}
      {text("ciudad")}
    </div>
  );
}
