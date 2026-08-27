"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { BIOMETRIC_SCAN_SECONDS } from "@/lib/site-constants";

const SCAN_DOTS = 7;

/** Height of the scanner window; the scan-line keyframe travels this far. */
const SCANNER_PX = 180;

const FINGERPRINT_PATHS = [
  "M 18,95 C 10,65 12,38 28,22 C 50,4 72,4 84,24 C 96,42 92,68 82,95",
  "M 23,93 C 16,66 18,41 32,26 C 50,10 68,10 79,28 C 90,46 87,69 77,93",
  "M 28,92 C 22,67 23,44 36,30 C 50,16 64,16 73,32 C 83,50 81,70 72,92",
  "M 33,90 C 28,68 29,47 40,35 C 50,22 60,22 67,37 C 76,53 75,71 67,90",
  "M 38,89 C 34,69 35,51 44,40 C 50,32 56,32 62,41 C 70,54 69,72 62,89",
  "M 43,87 C 40,70 41,55 47,46 C 50,41 53,41 57,47 C 63,57 62,72 57,87",
  "M 47,85 C 45,72 46,60 50,54 C 54,60 55,72 53,85",
];

function ThermometerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[var(--accent-cyan)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9v6.5" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[var(--accent-cyan)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 3.5-3 5-1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[var(--accent-violet)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function BiometricSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dots, setDots] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.35,
    });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setDots((d) => (d >= SCAN_DOTS ? 0 : d + 1));
    }, 1200);
    return () => clearInterval(t);
  }, [active]);

  /* Decorative scanner illustration — the heading beside it carries the meaning. */
  const scannerCard = (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center rounded-3xl border border-[var(--border-active)] bg-[var(--bg-surface)] p-8 md:mx-0 md:max-w-none lg:aspect-auto lg:min-h-[300px]"
      aria-hidden
    >
      <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[var(--accent-cyan)]" />
      <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[var(--accent-cyan)]" />
      <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[var(--accent-cyan)]" />
      <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[var(--accent-cyan)]" />

      <div
        className="relative flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full"
        style={
          { "--bio-scan-travel": `${SCANNER_PX - 2}px` } as React.CSSProperties
        }
      >
        {[120, 90, 60].map((r, i) => (
          <div
            key={r}
            className="absolute rounded-full border border-[var(--accent-cyan)]"
            style={{
              width: r * 2,
              height: r * 2,
              opacity: [0.15, 0.08, 0.04][i],
              animation: i === 2 ? "bioPulse 2s ease-in-out infinite" : undefined,
            }}
          />
        ))}
        <svg
          className="absolute z-[1] h-[130px] w-[110px] opacity-45"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {FINGERPRINT_PATHS.map((d) => (
            <path
              key={d}
              d={d}
              stroke="var(--accent-cyan)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
          <ellipse
            cx="50"
            cy="62"
            rx="4.5"
            ry="6"
            stroke="var(--accent-cyan)"
            strokeWidth="1.4"
          />
        </svg>
        <div className="bio-scan-line pointer-events-none absolute left-2 right-2 top-0 z-[2] h-0.5 bg-[var(--accent-cyan)] opacity-30" />
      </div>
    </div>
  );

  const dotsRow = (
    <div
      className="mt-6 flex justify-center gap-1 font-mono text-[var(--accent-cyan)]"
      aria-hidden
    >
      {Array.from({ length: SCAN_DOTS }).map((_, i) => (
        <span key={i}>{i <= dots ? "●" : "○"}</span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="biometric"
      className="relative min-h-[100dvh] px-[max(5vw,40px)] py-[80px] lg:py-[120px]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(77,217,255,0.08) 0%, transparent 70%), var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <SectionKicker>Biometric analysis</SectionKicker>
            <h2 className="mt-4 font-heading text-h1 font-extrabold text-[var(--text-primary)]">
              <span className="text-[var(--accent-cyan)]">
                {BIOMETRIC_SCAN_SECONDS} seconds
              </span>{" "}
              from finger to formula.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:mt-16 lg:grid lg:grid-cols-[1fr_220px_1fr] lg:items-stretch lg:gap-6">
          <ScrollReveal className="min-w-0">
            <div className="flex flex-col">
              {scannerCard}
              {dotsRow}
            </div>
          </ScrollReveal>

          <div className="scrollbar-none flex min-w-0 snap-x snap-mandatory flex-row gap-3 overflow-x-auto lg:w-[220px] lg:min-w-[220px] lg:snap-none lg:flex-col lg:gap-3 lg:overflow-visible">
            <ScrollReveal>
              <GlassCard
                padding={16}
                className="h-full min-h-[112px] min-w-[200px] shrink-0 snap-center lg:min-w-0"
              >
                <ThermometerIcon />
                <p className="mt-1 font-heading text-xl font-bold text-[var(--text-primary)] lg:text-2xl">
                  36.4°C
                </p>
                <p className="text-label font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Skin temp
                </p>
                <div className="mt-2 flex h-6 items-end gap-1" aria-hidden>
                  {[40, 55, 45, 70, 50].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-sm bg-[var(--accent-cyan)] opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <GlassCard
                padding={16}
                className="h-full min-h-[112px] min-w-[200px] shrink-0 snap-center lg:min-w-0"
              >
                <WaveIcon />
                <p className="mt-1 font-heading text-xl font-bold text-[var(--text-primary)] lg:text-2xl">
                  Medium
                </p>
                <p className="text-label font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Conductance
                </p>
                <svg
                  className="mt-2 h-8 w-full"
                  viewBox="0 0 120 32"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0,16 Q15,4 30,16 T60,16 T90,8 T120,16"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    strokeOpacity="0.6"
                    strokeWidth="1.5"
                  />
                </svg>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <GlassCard
                padding={16}
                className="h-full min-h-[112px] min-w-[200px] shrink-0 snap-center lg:min-w-0"
              >
                <CheckIcon />
                <p className="mt-1 font-heading text-xl font-bold text-[var(--accent-violet)] lg:text-2xl">
                  Match
                </p>
                <p className="text-label font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Score
                </p>
                <p className="mt-1 text-label text-[var(--text-muted)]">
                  Early model · trained on 23 profiles
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180} className="min-w-0">
            <GlassCard className="h-full w-full max-w-xl lg:max-w-none">
              <p className="font-heading text-lg font-bold text-[var(--text-primary)]">
                YSL Y — Your Edition
              </p>
              <div className="mt-4 space-y-2">
                {(
                  [
                    ["Bergamot", 38],
                    ["Sage", 27],
                    ["Amberwood", 35],
                  ] as const
                ).map(([n, v]) => (
                  <div key={n} className="flex items-center gap-3 text-sm">
                    <span className="w-24 text-[var(--text-secondary)]">{n}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-deep)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                    <span className="text-[var(--text-muted)]">{v}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm italic text-[var(--text-muted)]">
                Based on this morning&apos;s scan.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
