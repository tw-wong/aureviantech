import { ElementType, HTMLAttributes, ReactNode } from "react";

type Variant = "content" | "sage" | "green" | "dark" | "outline";

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  lifted?: boolean;
  as?: ElementType;
  /** Tailwind padding classes; defaults to p-6 (24px). */
  padding?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  content: "bg-canvas text-ink border border-transparent",
  sage: "bg-canvas-soft text-ink border border-transparent",
  green: "bg-primary-pale text-ink border border-transparent",
  dark: "bg-ink text-primary border border-transparent",
  outline: "bg-canvas text-ink border border-ink",
};

export default function Card({
  variant = "content",
  lifted = false,
  as: Tag = "div",
  padding = "p-6",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={`rounded-xl font-body ${padding} ${lifted ? "shadow-soft" : ""} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
