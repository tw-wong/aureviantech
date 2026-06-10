"use client";

import { useRouter, usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

interface ScrollLinkProps {
  /** Id of the target section, e.g. "services". */
  targetId: string;
  /** Path the section lives on. Defaults to the home page. */
  path?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Navigates to `path` (if not already there) and then smooth-scrolls to
 * `#targetId`. When the section is on another page, the scroll target is handed
 * to ScrollOnArrival via sessionStorage so the scroll runs once the page lands.
 * Renders a real anchor so modified clicks and middle-clicks still work.
 */
export default function ScrollLink({ targetId, path = "/", children, className }: ScrollLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (pathname === path) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `${path}#${targetId}`);
    } else {
      sessionStorage.setItem("scrollTo", targetId);
      router.push(path);
    }
  }

  return (
    <a href={`${path}#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
