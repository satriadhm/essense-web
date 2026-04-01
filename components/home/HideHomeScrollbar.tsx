"use client";

import { useEffect } from "react";

/** Hides the visible scrollbar on the home (hero) page only; scrolling still works. */
export function HideHomeScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.add("home-hide-scrollbar");
    body.classList.add("home-hide-scrollbar");
    return () => {
      root.classList.remove("home-hide-scrollbar");
      body.classList.remove("home-hide-scrollbar");
    };
  }, []);
  return null;
}
