import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "tertiary" | "ghost";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  label: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary border border-transparent",
  tertiary: "bg-canvas text-ink border border-ink",
  ghost: "bg-transparent text-ink border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-[52px] h-[52px]",
};

export default function IconButton({
  label,
  variant = "tertiary",
  size = "md",
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-pill
        transition-[filter] duration-200 ease-standard
        hover:enabled:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
