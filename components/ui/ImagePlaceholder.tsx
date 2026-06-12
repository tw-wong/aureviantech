import { ReactNode } from "react";

interface ImagePlaceholderProps {
  /** Centred Lucide icon node. */
  icon?: ReactNode;
  label?: string;
  /** Height in px; default 460. */
  height?: number;
  /** "rounded" (24px) or "circle". */
  shape?: "rounded" | "circle";
  className?: string;
}

export default function ImagePlaceholder({
  icon,
  label,
  height = 460,
  shape = "rounded",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full flex flex-col items-center justify-center gap-3
        bg-primary-pale text-ink-deep border border-[rgba(22,51,0,0.08)]
        ${shape === "circle" ? "rounded-pill" : "rounded-xl"} ${className}`}
      style={{ height: shape === "circle" ? height : `${height}px` }}
    >
      {icon}
      {label && <span className="text-sm font-medium text-mute px-4 text-center">{label}</span>}
    </div>
  );
}
