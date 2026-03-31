"use client";

import { cn } from "@/lib/cn";

export function FragranceTag({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-[var(--border-active)] bg-[var(--bg-mid)] px-3 py-1 font-heading text-xs font-semibold text-[var(--text-secondary)]",
        className,
      )}
    >
      {name}
    </span>
  );
}
