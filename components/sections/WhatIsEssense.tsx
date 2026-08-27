"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SectionKicker } from "@/components/ui/SectionKicker";
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
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      setP((prev) => (Math.abs(prev - prog) < 0.001 ? prev : prog));
    };

    /*
     * Coalesce to one measurement per frame. This previously read layout and
     * set state on every scroll event, forcing a reflow and a React render
     * many times per frame.
     */
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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

const MOODS = [
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

const LINE_ROTATE_MS = 3800;

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-[var(--accent-amber)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-[var(--accent-cyan)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5M3 16h7" />
    </svg>
  );
}

/** Rotates an index through `length` on a fixed interval. */
function useRotatingLine(length: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % length),
      LINE_ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [length]);
  return index;
}

function EvolvingFormulaWidget() {
  const lineIndex = useRotatingLine(evolvingStatLines.length);
  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <p className="font-heading text-xs font-bold text-[var(--text-primary)]">
        Your evolving formula
      </p>
      {/*
       * Keyed so the node remounts on change, and animated rather than
       * transitioned: a freshly mounted element has no previous value to
       * transition from, so the old `transition-opacity` here never ran.
       */}
      <p
        key={lineIndex}
        className="animate-fade-in mt-1.5 min-h-[1.25rem] font-heading text-label tracking-wide text-[var(--text-muted)] opacity-0"
      >
        {evolvingStatLines[lineIndex]}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2 text-[var(--text-secondary)]">
        <SunIcon />
        <div className="text-right text-sm">
          <div>26°C</div>
          <div className="text-[var(--text-muted)]">Humid 68%</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1">
          <WindIcon /> 12 km/h
        </span>
        <span>UV 4</span>
      </div>
    </div>
  );
}

function AdaptiveSkinWidget() {
  const lineIndex = useRotatingLine(adaptiveSkinLines.length);
  const activeMood = lineIndex % MOODS.length;

  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <p className="font-heading text-xs font-bold text-[var(--text-primary)]">
        Skin response monitor
      </p>
      <p className="mt-1.5 text-label tracking-wide text-[var(--text-muted)]">
        Neutral, calm, and energy states update in real time.
      </p>

      <div className="mt-4 flex items-start justify-between gap-2">
        {MOODS.map((mood, i) => (
          <div key={mood.label} className="flex w-[30%] flex-col items-center gap-2">
            <span
              className={cn(
                "h-10 w-10 rounded-full border transition-colors",
                i === activeMood
                  ? "border-[var(--accent-cyan)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent-cyan)_40%,transparent)]"
                  : "border-[var(--border-subtle)]",
              )}
              style={{ background: mood.gradient }}
            />
            <span className="text-label text-[var(--text-muted)]">{mood.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-3">
        <p
          key={lineIndex}
          className="animate-fade-in min-h-[1.25rem] font-heading text-label tracking-wide text-[var(--text-muted)] opacity-0"
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
        "relative grid gap-10 pb-12 transition-[opacity,transform] duration-700 lg:grid-cols-[1fr_280px] lg:pb-24",
        active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
    >
      <div className="text-center lg:text-left">
        <SectionKicker>{label}</SectionKicker>
        <h2 className="mt-4 font-heading text-statement font-extrabold leading-tight text-[var(--text-primary)]">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-[500px] text-[var(--text-secondary)] lg:mx-0">
          {body}
        </p>
      </div>
      <div className="relative flex justify-center lg:absolute lg:right-0 lg:top-8 lg:w-[280px] lg:justify-end">
        {right}
      </div>
    </div>
  );
}

export function WhatIsEssense() {
  const { ref, p, visible } = useSectionProgress();

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
        label="Adaptive"
        headline="Your skin chemistry shifts through the day."
        body="Temperature, humidity, and stress all change how a fragrance develops on your skin. Essense measures them and adjusts the recommendation."
        active={visible}
        right={<AdaptiveSkinWidget />}
      />

      <Block
        label="Personal"
        headline={
          <>
            A formula built around{" "}
            <span className="whitespace-nowrap">
              <span className="text-[var(--accent-violet)]">your</span> body.
            </span>
          </>
        }
        body="The scanner reads your skin chemistry and matches it against the 8 fragrance profiles in our beta catalog to suggest a formula."
        active={p > 0.35}
        right={
          <Image
            src={deviceIllustration}
            alt="Essense device — personalized fragrance formula"
            className="h-auto w-full max-w-[240px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:max-w-[280px]"
            sizes="(min-width: 1024px) 280px, 240px"
          />
        }
      />

      <Block
        label="Circular"
        headline="It gets better the more you use it."
        body="Each scan trains the recommendations. Over time, the formulas reflect your patterns across moods, weather, and seasons."
        active={p > 0.65}
        right={<EvolvingFormulaWidget />}
      />
    </section>
  );
}
