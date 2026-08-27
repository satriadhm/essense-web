import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  children: React.ReactNode;
  className?: string;
  notch?: boolean;
  /**
   * Screen-reader label for the simulated screen. The mockup content is a
   * marketing illustration full of placeholder data ("9:41", "Jasmine",
   * "12-day streak") with non-functional controls, so it is exposed to
   * assistive tech as a single labelled image rather than as page content.
   */
  label: string;
};

export function PhoneMockup({
  children,
  className,
  notch = true,
  label,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[42px] border-2 border-[var(--border-active)] bg-[var(--bg-surface)] shadow-2xl",
        className,
      )}
      role="img"
      aria-label={label}
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
      {/*
       * `inert` keeps the decorative buttons inside the mockup out of the tab
       * order; aria-hidden keeps the placeholder copy out of the a11y tree.
       */}
      <div className="min-h-[420px] bg-[var(--bg-deep)] pt-8" aria-hidden inert>
        {children}
      </div>
    </div>
  );
}
