import { cn } from "@/lib/cn";

/**
 * The small uppercase label that sits above every section heading. This markup
 * was repeated verbatim in six sections; keeping it in one place stops the
 * tracking/size/weight from drifting apart between them.
 */
export function SectionKicker({
  children,
  tone = "cyan",
  className,
}: {
  children: React.ReactNode;
  tone?: "cyan" | "violet";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-heading text-label font-semibold uppercase tracking-[0.15em]",
        tone === "cyan"
          ? "text-[var(--accent-cyan)]"
          : "text-[var(--accent-violet)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
