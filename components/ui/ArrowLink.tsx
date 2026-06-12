"use client";

import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ArrowLinkProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ArrowLink({ children, onClick, className = "" }: ArrowLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center gap-1.5 cursor-pointer bg-none border-none p-0
        font-body text-[15px] font-semibold text-ink ${className}`}
    >
      {children}
      <span
        className="inline-flex transition-transform duration-200 ease-standard"
        style={{ transform: hover ? "translateX(3px)" : "none" }}
      >
        <ArrowRight size={17} strokeWidth={2.25} />
      </span>
    </button>
  );
}
