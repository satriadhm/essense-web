"use client";

import { cn } from "@/lib/cn";

const gradients: Record<
  "top" | "mid" | "base",
  string
> = {
  top: "radial-gradient(circle at 35% 35%, #4DD9FF, #7B5CF0)",
  mid: "radial-gradient(circle at 35% 35%, #9D6FF5, #F59E0B)",
  base: "radial-gradient(circle at 35% 35%, #F43F5E, #7B5CF0)",
};

type NoteOrbProps = {
  noteType: "top" | "mid" | "base";
  label: string;
  size?: number;
  className?: string;
};

export function NoteOrb({
  noteType,
  label,
  size = 48,
  className,
}: NoteOrbProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      style={{ width: size + 8 }}
    >
      <div
        className="relative shrink-0 rounded-full shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.35)]"
        style={{
          width: size,
          height: size,
          background: gradients[noteType],
        }}
      >
        <div
          className="pointer-events-none absolute left-[18%] top-[15%] h-[22%] w-[22%] rounded-full bg-white/15 blur-[1px]"
          aria-hidden
        />
      </div>
      <span className="font-heading text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}
