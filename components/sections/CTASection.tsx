"use client";

import { GlassCard } from "@/components/ui/GlassCard";

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
          src="/favicon.ico"
          alt="Essense"
          width={128}
          height={128}
          className="mb-10 h-24 w-24 select-none object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
          aria-hidden
        />

        <h2 className="font-heading text-[length:var(--text-h1)] font-extrabold text-[var(--text-primary)]">
          Your essence. Finally{" "}
          <span className="gradient-text-brand">understood</span>.
        </h2>
        <p className="mt-6 max-w-[400px] text-lg text-[var(--text-secondary)]">
          Free to download. No subscription needed. Your first formula is
          waiting.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlassCard
            padding="14px 28px"
            className="flex cursor-pointer items-center gap-2 rounded-full border-[var(--border-active)] transition hover:bg-[var(--bg-surface)] hover:shadow-[0_0_20px_var(--glow-purple)]"
            data-cursor="pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              />
            </svg>
            <span className="font-heading text-sm font-semibold">App Store</span>
          </GlassCard>
          <GlassCard
            padding="14px 28px"
            className="flex cursor-pointer items-center gap-2 rounded-full border-[var(--border-active)] transition hover:bg-[var(--bg-surface)] hover:shadow-[0_0_20px_var(--glow-purple)]"
            data-cursor="pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M3 20.5v-17l18.5 8.5L3 20.5z" />
            </svg>
            <span className="font-heading text-sm font-semibold">Google Play</span>
          </GlassCard>
        </div>

        <p className="mt-10 text-sm text-[var(--accent-cyan)]">#OwnYourEssence</p>
      </div>

      <div className="pointer-events-none absolute left-8 top-24 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-[11px] text-[var(--text-muted)] backdrop-blur-md">
        ★ 4.9 · 10,000+ downloads
      </div>
      <div className="pointer-events-none absolute bottom-32 right-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-[11px] text-[var(--text-muted)] backdrop-blur-md max-md:hidden">
        ★ 4.9 · 10,000+ downloads
      </div>

      <footer className="relative z-[2] mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] md:flex-row">
        <span>© 2026 Essense. All rights reserved.</span>
        <span>Privacy · Terms · Contact</span>
      </footer>
    </section>
  );
}
