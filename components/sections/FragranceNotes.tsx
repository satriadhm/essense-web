"use client";

import { useState } from "react";
import { noteTierExamples, type NoteTier } from "@/lib/fragrance-data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function FragranceNotes() {
  const [hover, setHover] = useState<NoteTier | null>(null);

  return (
    <section
      id="features"
      className="bg-[var(--bg-deep)] px-[max(5vw,40px)] pb-[60px] pt-4 lg:pb-[120px] lg:pt-6"
    >
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <div className="relative w-full overflow-hidden isolate lg:w-[60%]">
          <ScrollReveal>
            <svg
              viewBox="0 0 320 280"
              className="pyramid-svg mx-auto w-full max-w-md"
              role="img"
              aria-label="Fragrance pyramid"
            >
              <defs>
                <linearGradient id="g-top-airy" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#B8F0FF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#7B5CF0" stopOpacity="0.5" />
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
              {/* Top — airy, misty top notes */}
              <polygon
                points="160,20 220,100 100,100"
                fill="url(#g-top-airy)"
                fillOpacity={0.75}
                stroke="url(#g-top-airy)"
                strokeWidth="1.25"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="tier cursor-pointer transition-all duration-300"
                style={{
                  opacity: hover && hover !== "top" ? 0.65 : 1,
                  transform:
                    hover === "top" ? "translate(0, -3px)" : undefined,
                }}
                onMouseEnter={() => setHover("top")}
                onMouseLeave={() => setHover(null)}
              />
              <circle
                cx="152"
                cy="48"
                r="2"
                fill="#4DD9FF"
                opacity={0.5}
                className="sparkle-pulse pointer-events-none"
                style={{ animationDelay: "0ms" }}
              />
              <circle
                cx="176"
                cy="62"
                r="2"
                fill="#4DD9FF"
                opacity={0.5}
                className="sparkle-pulse pointer-events-none"
                style={{ animationDelay: "400ms" }}
              />
              <circle
                cx="164"
                cy="78"
                r="2"
                fill="#4DD9FF"
                opacity={0.5}
                className="sparkle-pulse pointer-events-none"
                style={{ animationDelay: "800ms" }}
              />
              {/* Mid */}
              <polygon
                points="100,100 220,100 240,180 80,180"
                fill="url(#g-mid)"
                stroke="url(#g-mid)"
                strokeWidth="1.25"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="tier cursor-pointer transition-all duration-300"
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
                stroke="url(#g-base)"
                strokeWidth="1.25"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="tier cursor-pointer transition-all duration-300"
                style={{
                  opacity: hover && hover !== "base" ? 0.65 : 1,
                  transform:
                    hover === "base" ? "translate(0, 4px)" : undefined,
                }}
                onMouseEnter={() => setHover("base")}
                onMouseLeave={() => setHover(null)}
              />
              <text
                x="160"
                y="70"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none fill-[var(--accent-cyan)] font-heading text-[11px] font-bold uppercase tracking-[0.16em]"
              >
                TOP NOTES
              </text>
              <text
                x="160"
                y="140"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none fill-[var(--accent-amber)] font-heading text-[11px] font-bold uppercase tracking-[0.16em]"
              >
                HEART NOTES
              </text>
              <text
                x="160"
                y="220"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none fill-[var(--accent-rose)] font-heading text-[11px] font-bold uppercase tracking-[0.16em]"
              >
                BASE NOTES
              </text>
            </svg>
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
              WHY ESSENSE
            </p>
            <h2 className="mt-4 font-heading text-[length:var(--text-h2)] font-bold text-[var(--text-primary)]">
              One cap. Every fragrance. Zero guesswork.
            </h2>
            <div className="mt-8 space-y-6 text-[var(--text-secondary)]">
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-cyan)]"
                  aria-hidden
                />
                The Essense cap fits any standard perfume bottle — no refills, no
                replacements. Scan once, wear perfectly, every time.
              </p>
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-amber)]"
                  aria-hidden
                />
                Our biometric engine maps your body chemistry to the note pyramid
                in real time — so your formula shifts as you do, not just when you
                remember to change it.
              </p>
              <p className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-rose)]"
                  aria-hidden
                />
                Works with 200+ fragrances out of the box. No subscription to unlock
                your own skin.
              </p>
            </div>
            <p className="mt-10 font-heading text-lg italic text-[var(--accent-violet)]">
              Hardware that adapts. Software that remembers. A formula that&apos;s
              yours.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .pyramid-svg .tier {
          animation: tierPulse 3s ease-in-out infinite;
        }
        .pyramid-svg .tier:nth-of-type(1) { animation-delay: 0s; }
        .pyramid-svg .tier:nth-of-type(2) { animation-delay: 1s; }
        .pyramid-svg .tier:nth-of-type(3) { animation-delay: 2s; }
        @keyframes tierPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.95; }
        }
        .sparkle-pulse {
          animation: sparklePulse 2.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
