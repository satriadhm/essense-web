"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BIOMETRIC_SCAN_SECONDS } from "@/lib/site-constants";

export function BiometricSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dots, setDots] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.35 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setDots((d) => (d >= 7 ? 0 : d + 1));
    }, 1200);
    return () => clearInterval(t);
  }, [active]);

  const scannerCard = (
    <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center rounded-3xl border border-[var(--border-active)] bg-[var(--bg-surface)] p-8 md:mx-0 md:w-full md:max-w-none lg:aspect-auto lg:min-h-[300px]">
      <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[var(--accent-cyan)]" />
      <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[var(--accent-cyan)]" />
      <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[var(--accent-cyan)]" />
      <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[var(--accent-cyan)]" />

      <div className="relative flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full">
        {[120, 90, 60].map((r, i) => (
          <div
            key={r}
            className="absolute rounded-full border border-[var(--accent-cyan)]"
            style={{
              width: r * 2,
              height: r * 2,
              opacity: [0.15, 0.08, 0.04][i],
              animation:
                i === 2 ? "bioPulse 2s ease-in-out infinite" : undefined,
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
          <path
            d="M 18,95 C 10,65 12,38 28,22 C 50,4 72,4 84,24 C 96,42 92,68 82,95"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 23,93 C 16,66 18,41 32,26 C 50,10 68,10 79,28 C 90,46 87,69 77,93"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 28,92 C 22,67 23,44 36,30 C 50,16 64,16 73,32 C 83,50 81,70 72,92"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 33,90 C 28,68 29,47 40,35 C 50,22 60,22 67,37 C 76,53 75,71 67,90"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 38,89 C 34,69 35,51 44,40 C 50,32 56,32 62,41 C 70,54 69,72 62,89"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 43,87 C 40,70 41,55 47,46 C 50,41 53,41 57,47 C 63,57 62,72 57,87"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 47,85 C 45,72 46,60 50,54 C 54,60 55,72 53,85"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
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
    <div className="mt-6 flex justify-center gap-1 font-mono text-[var(--accent-cyan)]">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i}>{i <= dots ? "●" : "○"}</span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="biometric"
      className="relative min-h-[100vh] bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[80px] lg:py-[120px]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(77,217,255,0.08) 0%, transparent 70%), var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
              Biometric analysis
            </p>
            <h2 className="mt-4 font-heading text-[length:var(--text-h1)] font-extrabold text-[var(--text-primary)]">
              <span className="text-[var(--accent-cyan)]">
                {BIOMETRIC_SCAN_SECONDS} seconds
              </span>{" "}
              to your perfect formula.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:mt-16 lg:grid lg:grid-cols-[1fr_220px_1fr] lg:gap-6 lg:items-stretch">
          <ScrollReveal delay={120} className="min-w-0 lg:min-w-0">
            <div className="flex flex-col">
              {scannerCard}
              {dotsRow}
            </div>
          </ScrollReveal>

          <div className="flex min-w-0 snap-x snap-mandatory flex-row gap-3 overflow-x-auto lg:snap-none lg:flex lg:w-[220px] lg:min-w-[220px] lg:flex-col lg:gap-3 lg:overflow-visible">
            <ScrollReveal>
              <GlassCard
                padding={16}
                className="h-full min-h-[112px] min-w-[200px] shrink-0 snap-center lg:min-w-0"
              >
                <div className="text-[var(--accent-cyan)]">🌡</div>
                <p className="mt-1 font-heading text-xl font-bold text-[var(--text-primary)] lg:text-2xl">
                  36.4°C
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Skin temp
                </p>
                <div className="mt-2 flex h-6 items-end gap-1">
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
                <div className="text-[var(--accent-cyan)]">〰</div>
                <p className="mt-1 font-heading text-xl font-bold text-[var(--text-primary)] lg:text-2xl">
                  Medium
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Conductance
                </p>
                <svg
                  className="mt-2 h-8 w-full"
                  viewBox="0 0 120 32"
                  preserveAspectRatio="none"
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
                <div className="text-[var(--accent-purple)]">✓</div>
                <p className="mt-1 font-heading text-xl font-bold text-[var(--accent-violet)] lg:text-2xl">
                  97%
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Match rate
                </p>
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                  Based on 847 similar profiles
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180} className="min-w-0 lg:min-w-0">
            <GlassCard className="h-full w-full max-w-xl lg:max-w-none">
              <p className="font-heading text-lg font-bold text-[var(--text-primary)]">
                YSL Y — Your Edition
              </p>
              <div className="mt-4 space-y-2">
                {[
                  ["Bergamot", 38],
                  ["Sage", 27],
                  ["Amberwood", 35],
                ].map(([n, v]) => (
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
                Tuned to you. Right now.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes bioPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bioScanLine {
          0% { top: 0; }
          100% { top: calc(100% - 2px); }
        }
        .bio-scan-line {
          animation: bioScanLine 2s linear infinite;
        }
      `}</style>
    </section>
  );
}
