"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

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

  return (
    <section
      ref={sectionRef}
      id="biometric"
      className="relative min-h-[100vh] bg-[var(--bg-deep)] px-[max(5vw,40px)] py-24"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(77,217,255,0.08) 0%, transparent 70%), var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
            Biometric analysis
          </p>
          <h2 className="mt-4 font-heading text-[length:var(--text-h1)] font-extrabold text-[var(--text-primary)]">
            <span className="text-[var(--accent-cyan)]">12 seconds</span> to your
            perfect formula.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-16">
          <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center rounded-3xl border border-[var(--border-active)] bg-[var(--bg-surface)] p-8 md:w-[500px]">
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
                      i === 2
                        ? "bioPulse 2s ease-in-out infinite"
                        : undefined,
                  }}
                />
              ))}
              <div className="bio-scan-line pointer-events-none absolute left-2 right-2 top-0 h-0.5 bg-[var(--accent-cyan)] opacity-30" />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-1 font-mono text-[var(--accent-cyan)]">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i}>{i <= dots ? "●" : "○"}</span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <ScrollReveal>
            <GlassCard padding={20} className="h-full min-h-[160px]">
              <div className="text-[var(--accent-cyan)]">🌡</div>
              <p className="mt-2 font-heading text-[28px] font-bold text-[var(--text-primary)]">
                36.4°C
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Skin temp
              </p>
              <div className="mt-3 flex h-8 items-end gap-1">
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
            <GlassCard padding={20} className="h-full min-h-[160px]">
              <div className="text-[var(--accent-cyan)]">〰</div>
              <p className="mt-2 font-heading text-[28px] font-bold text-[var(--text-primary)]">
                Medium
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Conductance
              </p>
              <svg className="mt-3 h-10 w-full" viewBox="0 0 120 32" preserveAspectRatio="none">
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
            <GlassCard padding={20} className="h-full min-h-[160px]">
              <div className="text-[var(--accent-purple)]">✓</div>
              <p className="mt-2 font-heading text-[28px] font-bold text-[var(--accent-violet)]">
                97%
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Match rate
              </p>
              <p className="mt-2 text-[10px] text-[var(--text-muted)]">
                Based on 847 similar profiles
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12">
          <GlassCard className="mx-auto max-w-xl">
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
