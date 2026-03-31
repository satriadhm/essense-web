"use client";

import { cn } from "@/lib/cn";

const colorMap = {
  cyan: "border-[color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] text-[var(--accent-cyan)]",
  purple:
    "border-[color-mix(in_srgb,var(--accent-purple)_30%,transparent)] text-[var(--accent-purple)]",
  amber:
    "border-[color-mix(in_srgb,var(--accent-amber)_30%,transparent)] text-[var(--accent-amber)]",
  muted:
    "border-[var(--border-subtle)] text-[var(--text-muted)]",
};

type PillBadgeProps = {
  label: string;
  color?: keyof typeof colorMap;
  className?: string;
  uppercase?: boolean;
};

export function PillBadge({
  label,
  color = "cyan",
  className,
  uppercase = false,
}: PillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-[var(--bg-surface)] px-3 py-1 text-xs font-medium",
        colorMap[color],
        uppercase && "uppercase tracking-[0.12em]",
        className,
      )}
    >
      {label}
    </span>
  );
}
