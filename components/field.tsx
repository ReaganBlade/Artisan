import type { ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

const inputBase =
  "w-full border-2 bg-paper px-3 py-2.5 text-sm outline-none transition-colors duration-100 placeholder:text-ink/40";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...inputProps
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "id" | "className">) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-[0.15em]"
      >
        {label}
        {required && <span className="text-signal"> *</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(
          inputBase,
          error
            ? "border-signal bg-signal/5 shadow-[2px_2px_0_0_var(--signal-orange)]"
            : "border-ink shadow-hard-sm focus:border-electric focus:shadow-[2px_2px_0_0_var(--electric)]",
        )}
        required={required}
        {...inputProps}
      />
      {error ? (
        <p id={`${id}-error`} className="font-mono text-xs font-bold text-signal">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="font-mono text-xs text-ink/60">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
