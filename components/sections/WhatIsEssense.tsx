"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import deviceIllustration from "@/assets/illustrations/device.png";

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

const evolvingStatLines = [
  "34 scans · 3 formulas refined",
  "Season-aware · tuned to today",
] as const;

const adaptiveSkinLines = [
  "Conductance stable · baseline trend",
  "Calm response · low heat variance",
  "Energy rise · sebum +2.1%",
] as const;

function EvolvingFormulaWidget() {
  const [lineIndex, setLineIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setLineIndex((i) => (i + 1) % evolvingStatLines.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <p className="font-heading text-xs font-bold text-[var(--text-primary)]">
        Your evolving formula
      </p>
      <p
        className="mt-1.5 min-h-[1.25rem] font-heading text-[10px] tracking-wide text-[var(--text-muted)] transition-opacity duration-300"
        key={lineIndex}
      >
        {evolvingStatLines[lineIndex]}
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
  );
}

function AdaptiveSkinWidget() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLineIndex((i) => (i + 1) % adaptiveSkinLines.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const activeMood = lineIndex % 3;
  const moods = [
    {
      label: "Neutral",
      gradient:
        "radial-gradient(circle at 35% 35%, rgba(224,231,255,0.75), rgba(160,170,191,0.28) 42%, rgba(20,24,54,0.14) 100%)",
    },
    {
      label: "Calm",
      gradient:
        "radial-gradient(circle at 35% 35%, rgba(77,217,255,0.78), rgba(123,92,240,0.36) 45%, rgba(20,24,54,0.16) 100%)",
    },
    {
      label: "Energy",
      gradient:
        "radial-gradient(circle at 35% 35%, rgba(245,158,11,0.82), rgba(244,63,94,0.4) 45%, rgba(20,24,54,0.16) 100%)",
    },
  ] as const;

  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <p className="font-heading text-xs font-bold text-[var(--text-primary)]">
        Skin response monitor
      </p>
      <p className="mt-1.5 text-[10px] tracking-wide text-[var(--text-muted)]">
        Neutral, calm, and energy states update in real time.
      </p>

      <div className="mt-4 flex items-start justify-between gap-2">
        {moods.map((mood, i) => (
          <div key={mood.label} className="flex w-[30%] flex-col items-center gap-2">
            <span
              className={`h-10 w-10 rounded-full border transition ${
                i === activeMood
                  ? "border-[var(--accent-cyan)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent-cyan)_40%,transparent)]"
                  : "border-[var(--border-subtle)]"
              }`}
              style={{ background: mood.gradient }}
            />
            <span className="text-[10px] text-[var(--text-muted)]">{mood.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-3">
        <p
          className="min-h-[1.25rem] font-heading text-[10px] tracking-wide text-[var(--text-muted)] transition-opacity duration-300"
          key={lineIndex}
        >
          {adaptiveSkinLines[lineIndex]}
        </p>
        <svg
          className="mt-2 h-10 w-full"
          viewBox="0 0 220 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <polyline
            points="0,24 18,24 30,12 44,28 64,10 82,30 100,16 120,20 138,11 156,27 178,15 196,21 220,19"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </svg>
      </div>
    </div>
  );
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
        "relative grid gap-10 pb-12 transition-all duration-700 lg:grid-cols-[1fr_280px] lg:pb-24",
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
      className="relative bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[80px] lg:py-[140px]"
    >
      <div
        className="mb-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--border-active)] to-transparent"
        aria-hidden
      />

      <Block
        label="ADAPTIVE"
        headline="Your skin changes. Your scent should too."
        body="Temperature, stress, humidity — every factor shifts how a fragrance develops on you. Essense reads these signals in real time."
        active={b1}
        right={<AdaptiveSkinWidget />}
      />

      <Block
        label="PERSONAL"
        headline={
          <>
            Not one-size perfume.{" "}
            <span className="whitespace-nowrap">
              <span className="text-[var(--accent-violet)]">Your</span> formula.
            </span>
          </>
        }
        body="Biometric scanning cross-references your body chemistry with 200+ fragrance profiles to build a formula tuned to you and only you."
        active={b2}
        right={
          <Image
            src={deviceIllustration}
            alt="Essense device — personalized fragrance formula"
            className="h-auto w-full max-w-[240px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:max-w-[280px]"
            sizes="(min-width: 1024px) 280px, 240px"
            priority={false}
          />
        }
      />

      <Block
        label="CIRCULAR"
        headline="A scent that grows with you."
        body="Every scan, every formula, every season — Essense learns. The more you use it, the more personal your formula becomes. Your fragrance evolves as you do."
        active={b3}
        right={<EvolvingFormulaWidget />}
      />
    </section>
  );
}
