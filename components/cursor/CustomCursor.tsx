"use client";

import { useCallback, useEffect, useState, startTransition } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "pointer" | "cta">("default");

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });
  const ringY = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest("[data-cursor='cta']");
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']",
      );
      if (cta) setMode("cta");
      else if (interactive) setMode("pointer");
      else setMode("default");
    },
    [dotX, dotY, ringX, ringY],
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    startTransition(() => setEnabled(true));
    document.body.classList.add("cursor-none-override");
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("cursor-none-override");
    };
  }, [onMove]);

  if (!enabled) return null;

  const dotSize = mode === "pointer" ? 20 : 8;
  const showRing = mode === "default";

  return (
    <>
      <style>{`
        .cursor-none-override, .cursor-none-override * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          borderRadius: 9999,
          backgroundColor:
            mode === "pointer" ? "var(--accent-purple)" : "var(--accent-cyan)",
        }}
      />
      {mode === "cta" ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 min-w-[3rem] items-center justify-center rounded-md border border-[var(--border-active)] bg-[var(--bg-surface)] px-2 font-heading text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          TAP
        </motion.div>
      ) : showRing ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border-2 border-[color-mix(in_srgb,var(--accent-purple)_50%,transparent)]"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ) : null}
    </>
  );
}
