"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import type { Option } from "@/lib/qualification";

type Common = {
  name: string;
  legendId: string;
  options: readonly Option[];
  invalid?: boolean;
};

type Single = Common & {
  multiple?: false;
  value: string | undefined;
  onChange: (value: string, byPointer: boolean) => void;
};

type Multi = Common & {
  multiple: true;
  value: string[];
  onChange: (value: string[], byPointer: boolean) => void;
};

/** Respuestas como tarjetas grandes seleccionables (radio o checkbox nativos, accesibles con teclado). */
export function OptionGroup(props: Single | Multi) {
  const { name, options, legendId, invalid } = props;
  const pointer = useRef(false);

  return (
    <div
      role={props.multiple ? "group" : "radiogroup"}
      aria-labelledby={legendId}
      aria-invalid={invalid || undefined}
      className="grid gap-3 sm:grid-cols-2"
      onPointerDown={() => {
        pointer.current = true;
      }}
    >
      {options.map((o) => {
        const checked = props.multiple ? props.value.includes(o.value) : props.value === o.value;
        return (
          <label
            key={o.value}
            className={`group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-md border px-4 py-3.5 transition duration-200 hover:-translate-y-px has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
              checked ? "border-primary bg-surface-sage" : "border-line bg-surface hover:border-sage-300 hover:shadow-sm"
            }`}
          >
            <input
              type={props.multiple ? "checkbox" : "radio"}
              name={name}
              value={o.value}
              checked={checked}
              className="sr-only"
              onChange={(e) => {
                const byPointer = pointer.current;
                pointer.current = false;
                if (props.multiple) {
                  const next = e.target.checked
                    ? [...props.value, o.value]
                    : props.value.filter((v) => v !== o.value);
                  props.onChange(next, byPointer);
                } else {
                  props.onChange(o.value, byPointer);
                }
              }}
            />
            <span
              aria-hidden
              className={`grid size-[22px] shrink-0 place-items-center border transition-colors ${
                props.multiple ? "rounded-sm" : "rounded-pill"
              } ${checked ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"}`}
            >
              {checked ? <Check size={14} strokeWidth={2.5} /> : null}
            </span>
            <span className="text-body font-medium text-ink">{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
