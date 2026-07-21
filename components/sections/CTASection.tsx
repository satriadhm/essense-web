"use client";

export function CTASection() {
  return (
    <section
      id="cta"
      className="relative min-h-[100vh] overflow-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-24"
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-[10%] h-[60vw] max-h-[500px] w-[60vw] rounded-full bg-[rgba(123,92,240,0.25)] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[5%] h-[50vw] max-h-[420px] w-[50vw] rounded-full bg-[rgba(77,217,255,0.15)] blur-[120px]"
        aria-hidden
      />

      <p
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-extrabold text-[rgba(255,255,255,0.02)]"
        style={{ fontSize: "clamp(120px, 18vw, 240px)" }}
        aria-hidden
      >
        ESSENSE
      </p>

      <div className="relative z-[1] mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app_logo.png"
          alt="Essense"
          width={128}
          height={128}
          className="mb-10 h-24 w-24 select-none object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
          aria-hidden
        />

        <h2 className="font-heading text-[length:var(--text-h1)] font-extrabold text-[var(--text-primary)]">
          Get <span className="gradient-text-brand">Essense</span>.
        </h2>
        <p className="mt-6 max-w-[400px] text-lg text-[var(--text-secondary)]">
          In private beta. Request an invite to try it.
        </p>

        <p className="mt-10 text-sm text-[var(--accent-cyan)]">#OwnYourEssence</p>
      </div>

      <div className="pointer-events-none absolute left-8 top-24 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-[11px] text-[var(--text-muted)] backdrop-blur-md">
        Private beta · invite only
      </div>
      <div className="pointer-events-none absolute bottom-32 right-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-[11px] text-[var(--text-muted)] backdrop-blur-md max-md:hidden">
        Private beta · invite only
      </div>

      <footer className="relative z-[2] mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] md:flex-row">
        <span>© 2026 Essense. All rights reserved.</span>
        <span>Privacy · Terms · Contact</span>
      </footer>
    </section>
  );
}
