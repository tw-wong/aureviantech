import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({ label, error, hint, id, name, className = "", ...rest }: InputProps) {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className="flex flex-col gap-2 font-body">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`text-base leading-6 text-ink bg-canvas rounded-md px-4 py-3 outline-none
          border transition-[border-color,box-shadow] duration-200 ease-standard
          ${error ? "border-negative" : "border-ink focus:border-on-primary focus:shadow-[0_0_0_3px_var(--color-primary-pale)]"}
          ${className}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span className={`text-xs leading-4 ${error ? "text-negative-darkest" : "text-mute"}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
