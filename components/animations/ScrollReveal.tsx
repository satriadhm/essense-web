"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Direction = "up" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
};

const offset = (dir: Direction, d: number) => {
  if (dir === "up") return { x: 0, y: d };
  if (dir === "left") return { x: -d, y: 0 };
  return { x: d, y: 0 };
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offset(direction, distance) }
      }
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
