import { ReactNode } from "react";

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em]
        whitespace-nowrap text-positive-deep ${center ? "justify-center" : "justify-start"}`}
    >
      <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** Max display title px; default 40. */
  titleSize?: number;
  maxWidth?: number;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  titleSize = 40,
  maxWidth,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const minSize = Math.round(titleSize * 0.72);
  return (
    <div
      className={`${centered ? "text-center" : "text-left"} ${className}`}
      style={{ maxWidth, marginInline: centered && maxWidth ? "auto" : undefined }}
    >
      {eyebrow && (
        <div className={`flex ${centered ? "justify-center" : "justify-start"}`}>
          <Eyebrow center={centered}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`font-display font-extrabold leading-[1.06] tracking-[-0.5px] text-ink text-balance ${eyebrow ? "mt-4" : "mt-0"}`}
        style={{ fontSize: `clamp(${minSize}px, 4.4vw, ${titleSize}px)` }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-7 text-body text-pretty ${centered ? "mx-auto" : ""}`}
          style={{ maxWidth: centered ? 560 : 520 }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
