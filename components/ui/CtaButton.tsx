import { cn } from "@/lib/cn";

const DOWNLOAD_URL =
  "https://drive.google.com/file/d/1iw6MdGUq8CYv2GR6OB3m8GXkFheshu_Z/view?usp=drive_link";

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
        "inline-flex items-center justify-center rounded-full px-8 py-3.5 font-heading text-sm font-bold text-white",
        "bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)]",
        "transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)]",
        className,
      )}
    >
      {label}
    </a>
  );
}
