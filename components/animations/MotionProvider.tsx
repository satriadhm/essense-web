"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion drives its animations through inline styles, so the
 * `prefers-reduced-motion` rules in globals.css cannot neutralise them.
 * `reducedMotion="user"` makes every motion component on the page honour the
 * OS setting: transform and layout animations are dropped, opacity fades stay.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
