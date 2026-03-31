"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  className?: string;
  label?: string;
};

export function MagneticButton({
  className,
  label = "Download Free",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.35);
      y.set((e.clientY - cy) * 0.35);
    },
    [x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="cta"
      className={cn(
        "magnetic-btn-shimmer group relative overflow-hidden rounded-full px-8 py-3.5 font-heading text-sm font-bold text-white transition-transform duration-150 hover:scale-[1.02]",
        "bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)]",
        className,
      )}
    >
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
