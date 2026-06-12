"use client";

import { useEffect } from "react";

/**
 * On mount, if a ScrollLink stored a target section id before navigating here,
 * smooth-scroll to it once the page has rendered. This produces a "land on the
 * page, then glide to the section" effect after a cross-page navigation.
 */
export default function ScrollOnArrival() {
  useEffect(() => {
    const id = sessionStorage.getItem("scrollTo");
    if (!id) return;
    sessionStorage.removeItem("scrollTo");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth" });
        // Reflect the section in the URL without triggering another jump.
        window.history.replaceState(null, "", `#${id}`);
      })
    );
  }, []);
  return null;
}
