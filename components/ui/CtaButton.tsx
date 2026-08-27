import { cn } from "@/lib/cn";
import { DOWNLOAD_URL } from "@/lib/site-constants";

type CtaButtonProps = {
  className?: string;
  label?: string;
};

export function CtaButton({ className, label = "Join the beta" }: CtaButtonProps) {
  return (
    <a
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-3.5 font-heading text-sm font-bold",
        // Dark ink on the violet→cyan ramp; white text scored 1.66:1 on the cyan stop.
        "gradient-brand-fill",
        "focus-ring transition hover:brightness-110",
        className,
      )}
    >
      {label}
    </a>
  );
}
