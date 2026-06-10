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
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      })
    );
  }, []);
  return null;
}
