import { HTMLAttributes, ReactNode } from "react";

type Variant = "positive" | "neutral" | "negative" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  positive: "bg-primary-pale text-positive-deep",
  neutral: "bg-canvas-soft text-ink",
  negative: "bg-[#320707] text-white",
  warning: "bg-[#ffd11a] text-[#4a3b1c]",
};

export default function Badge({ variant = "neutral", className = "", children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-body text-sm font-semibold leading-5
        px-3 py-1 rounded-pill ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
