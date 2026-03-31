"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function useSectionProgress() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      setP(prog);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, p, visible };
}

function Block({
  label,
  headline,
  body,
  right,
  active,
}: {
  label: string;
  headline: React.ReactNode;
  body: string;
  right: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative grid gap-10 pb-24 transition-all duration-700 lg:grid-cols-[1fr_280px]",
        active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
    >
      <div>
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
          {label}
        </p>
        <h2 className="mt-4 font-heading text-[length:var(--text-h1)] font-extrabold leading-tight text-[var(--text-primary)]">
          {headline}
        </h2>
        <p className="mt-6 max-w-[500px] text-[var(--text-secondary)]">{body}</p>
      </div>
      <div className="relative flex justify-end lg:absolute lg:right-0 lg:top-8 lg:w-[280px]">
        {right}
      </div>
    </div>
  );
}

export function WhatIsEssense() {
  const { ref, p, visible } = useSectionProgress();
  const b1 = visible;
  const b2 = p > 0.35;
  const b3 = p > 0.65;

  return (
    <section
      ref={ref}
      id="what-is-essense"
      className="relative bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[140px]"
    >
      <div
        className="mb-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--border-active)] to-transparent"
        aria-hidden
      />

      <Block
        label="INTELLIGENCE"
        headline="Your skin changes."
        body="Temperature, stress, humidity — every factor shifts how a fragrance develops on you. Essense reads these signals in real time."
        active={b1}
        right={
          <svg width="200" height="240" viewBox="0 0 200 240" className="opacity-90">
            <path
              d="M100 20 C130 40 150 80 150 120 C150 180 130 220 100 240"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeOpacity="0.15"
              strokeWidth="2"
            />
            <circle cx="100" cy="90" r="40" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.12" />
            <circle cx="100" cy="90" r="60" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.08" />
            <circle cx="100" cy="90" r="80" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.05" />
          </svg>
        }
      />

      <Block
        label="PRECISION"
        headline={
          <>
            Not one-size perfume.{" "}
            <span className="text-[var(--accent-violet)]">Your</span> formula.
          </>
        }
        body="Biometric scanning cross-references your body chemistry with 200+ fragrance profiles to build a formula tuned to you and only you."
        active={b2}
        right={
          <svg width="200" height="220" viewBox="0 0 200 220" aria-hidden>
            <polygon
              points="100,10 180,200 20,200"
              fill="url(#pyr)"
              stroke="var(--border-subtle)"
            />
            <defs>
              <linearGradient id="pyr" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4DD9FF" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#9D6FF5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <line x1="100" y1="10" x2="100" y2="200" stroke="var(--border-subtle)" />
            <line x1="20" y1="200" x2="180" y2="200" stroke="var(--border-subtle)" />
          </svg>
        }
      />

      <Block
        label="INTELLIGENCE × WEATHER"
        headline={
          <>
            The forecast shapes your{" "}
            <span className="gradient-text-brand">scent</span>.
          </>
        }
        body="Essense reads weather and humidity at your location. Hot days call for lighter top notes. Cold nights for deeper base accords. You always wear the right version."
        active={b3}
        right={
          <div className="w-full max-w-[260px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <p className="font-heading text-xs font-bold text-[var(--text-primary)]">
              Today
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-[var(--text-secondary)]">
              <span className="text-2xl">☀</span>
              <div className="text-right text-sm">
                <div>26°C</div>
                <div className="text-[var(--text-muted)]">Humid 68%</div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 text-xs text-[var(--text-muted)]">
              <span>💨 12 km/h</span>
              <span>UV 4</span>
            </div>
          </div>
        }
      />
    </section>
  );
}
