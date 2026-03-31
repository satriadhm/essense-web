"use client";

import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  children: React.ReactNode;
  className?: string;
  notch?: boolean;
};

export function PhoneMockup({ children, className, notch = true }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[42px] border-2 border-white/12 bg-[var(--bg-surface)] shadow-2xl",
        className,
      )}
    >
      {notch && (
        <div
          className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 gap-2"
          aria-hidden
        >
          <span className="h-2 w-2 rounded-full bg-black/60" />
          <span className="h-2 w-6 rounded-full bg-black/70" />
        </div>
      )}
      <div className="min-h-[420px] bg-[var(--bg-deep)] pt-8">{children}</div>
    </div>
  );
}
