"use client";

import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: string | number;
  glowColor?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function GlassCard({
  children,
  className,
  padding = 24,
  glowColor,
  ...rest
}: GlassCardProps) {
  const pad =
    typeof padding === "number" ? `${padding}px` : padding;

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-[16px] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[var(--border-active)]",
        className,
      )}
      style={{
        padding: pad,
        boxShadow:
          glowColor && glowColor !== "transparent"
            ? `0 0 30px ${glowColor}`
            : undefined,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
