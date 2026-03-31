"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Word-level split for hero-style typography animations */
export function TextSplit({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
