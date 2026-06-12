import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary border border-transparent",
  secondary: "bg-canvas-soft text-ink border border-transparent",
  tertiary: "bg-canvas text-ink border border-ink",
  dark: "bg-ink text-primary border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-lg",
  md: "text-base px-6 py-3 rounded-xl",
  lg: "text-base px-7 py-4 rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconLeft,
  iconRight,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-semibold leading-6
        transition-[filter,transform] duration-200 ease-standard
        hover:enabled:brightness-95 active:enabled:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
