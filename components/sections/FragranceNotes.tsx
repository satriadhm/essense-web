"use client";

import { useState } from "react";
import { noteTierExamples, type NoteTier } from "@/lib/fragrance-data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function FragranceNotes() {
  const [hover, setHover] = useState<NoteTier | null>(null);

  return (
    <section
      id="features"
      className="bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[120px]"
    >
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <div className="relative w-full lg:w-[60%]">
          <ScrollReveal>
            <svg
              viewBox="0 0 320 280"
              className="mx-auto w-full max-w-md"
              role="img"
              aria-label="Fragrance pyramid"
            >
              <defs>
                <linearGradient id="g-top" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#4DD9FF" />
                  <stop offset="1" stopColor="#7B5CF0" />
                </linearGradient>
                <linearGradient id="g-mid" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#9D6FF5" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="g-base" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#7B5CF0" />
                </linearGradient>
              </defs>
              {/* Top */}
              <polygon
                points="160,20 220,100 100,100"
                fill="url(#g-top)"
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: hover && hover !== "top" ? 0.65 : 1,
                  transform:
                    hover === "top" ? "translate(0, -3px)" : undefined,
                }}
                onMouseEnter={() => setHover("top")}
                onMouseLeave={() => setHover(null)}
              />
              {/* Mid */}
              <polygon
                points="100,100 220,100 240,180 80,180"
                fill="url(#g-mid)"
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: hover && hover !== "heart" ? 0.65 : 1,
                  transform:
                    hover === "heart" ? "translate(0, 3px)" : undefined,
                }}
                onMouseEnter={() => setHover("heart")}
                onMouseLeave={() => setHover(null)}
              />
              {/* Base */}
              <polygon
                points="80,180 240,180 280,260 40,260"
                fill="url(#g-base)"
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: hover && hover !== "base" ? 0.65 : 1,
                  transform:
                    hover === "base" ? "translate(0, 4px)" : undefined,
                }}
                onMouseEnter={() => setHover("base")}
                onMouseLeave={() => setHover(null)}
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center pt-6 text-center text-[10px] font-heading font-bold uppercase">
              <span className="text-[var(--accent-cyan)]">Top notes</span>
            </div>
          </ScrollReveal>
          {hover && (
            <div className="absolute right-0 top-1/2 z-10 hidden w-48 -translate-y-1/2 translate-x-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-xs text-[var(--text-secondary)] lg:block">
              <p className="font-heading text-[10px] uppercase text-[var(--accent-cyan)]">
                {noteTierExamples[hover].label}
              </p>
              <p className="mt-1 text-[var(--text-muted)]">
                {noteTierExamples[hover].timeline}
              </p>
              <ul className="mt-2 space-y-1">
                {noteTierExamples[hover].examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[40%] lg:pl-8">
          <ScrollReveal delay={80}>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
              The architecture of scent
            </p>
            <h2 className="mt-4 font-heading text-[length:var(--text-h2)] font-bold text-[var(--text-primary)]">
              Every great fragrance is a story told in three acts.
            </h2>
            <div className="mt-8 space-y-6 text-[var(--text-secondary)]">
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-cyan)]"
                  aria-hidden
                />
                Top notes are what you smell first — bright, light, and gone
                within 20 minutes. They&apos;re the handshake.
              </p>
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-amber)]"
                  aria-hidden
                />
                Heart notes emerge as top notes fade. Floral, spice, or herbal —
                they carry the character of the fragrance for hours.
              </p>
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-rose)]"
                  aria-hidden
                />
                Base notes are the foundation. Rich, deep, and lasting,
                they&apos;re what lingers on your clothes the next morning.
              </p>
            </div>
            <p className="mt-10 font-heading text-lg italic text-[var(--accent-violet)]">
              Essense builds your formula around all three — balanced for your
              body, your weather, your day.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        svg polygon {
          animation: tierPulse 3s ease-in-out infinite;
        }
        svg polygon:nth-of-type(1) { animation-delay: 0s; }
        svg polygon:nth-of-type(2) { animation-delay: 1s; }
        svg polygon:nth-of-type(3) { animation-delay: 2s; }
        @keyframes tierPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
