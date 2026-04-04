"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const days = Array.from({ length: 35 }, (_, i) => i + 1);
const logged = new Set([3, 7, 12, 18, 22, 28]);

const recent = [
  { date: "Mar 28", name: "YSL Y", cond: "27°C · Humid", border: "var(--accent-cyan)" },
  { date: "Mar 26", name: "Dior Sauvage", cond: "24°C · Clear", border: "var(--accent-purple)" },
  { date: "Mar 21", name: "Givenchy Gentleman", cond: "19°C · Dry", border: "var(--accent-amber)" },
];

export function JournalSection() {
  return (
    <section
      id="journal"
      className="overflow-x-hidden bg-[var(--bg-deep)] px-5 py-[80px] sm:px-6 lg:px-[max(5vw,40px)] lg:py-[120px]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div className="min-w-0">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
            Fragrance journal
          </p>
          <h2 className="mt-4 max-w-[18ch] font-heading text-[length:var(--text-h2)] font-bold leading-[1.2] text-[var(--text-primary)] sm:max-w-none">
            Your scent <span className="italic text-[var(--accent-violet)]">story</span>. Written in data.
          </h2>
          <p className="mt-6 text-[var(--text-secondary)]">
            Every scan, every formula, every day — logged automatically. Revisit
            what you wore last month. Discover patterns in your scent choices.
            Own your fragrance history.
          </p>
          <ul className="mt-8 space-y-3 text-[var(--text-secondary)]">
            <li>
              <span className="text-[var(--accent-cyan)]">—</span> Calendar view
              of daily scans
            </li>
            <li>
              <span className="text-[var(--accent-violet)]">—</span> Weather +
              mood correlation
            </li>
            <li>
              <span className="text-[var(--accent-amber)]">—</span> Formula
              evolution timeline
            </li>
          </ul>
          <a
            href="#journal"
            className="mt-10 inline-block text-[var(--accent-cyan)]"
            data-cursor="pointer"
          >
            Explore Journal →
          </a>
        </div>

        <div className="min-w-0">
          <ScrollReveal>
            <GlassCard
              padding={16}
              className="mx-auto w-full max-w-[420px] rounded-[20px] md:max-w-full"
            >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold">March 2026</h3>
              <div className="flex gap-2 text-[var(--text-muted)]">
                <button type="button" aria-label="Previous month">
                  &lt;
                </button>
                <button type="button" aria-label="Next month">
                  &gt;
                </button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-0.5 text-center text-[9px] text-[var(--text-muted)] sm:gap-1 md:mt-4 md:text-[10px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={`weekday-${i}`}>{d}</span>
              ))}
            </div>
              <div className="mt-2 grid grid-cols-7 gap-0.5 sm:gap-1">
                {days.map((d) => {
                  const isLog = logged.has(d);
                  return (
                    <div
                      key={d}
                      title={
                        isLog
                          ? "Mar 12 — Dior Sauvage + 24°C"
                          : undefined
                      }
                      className={`relative flex aspect-square w-full min-w-0 items-center justify-center rounded-md text-[10px] sm:text-xs ${
                        isLog
                          ? "bg-[rgba(77,217,255,0.06)] text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {d}
                      {isLog && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[var(--accent-purple)]" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex w-full min-w-0 gap-3 overflow-x-auto pb-2">
                {recent.map((r) => (
                  <div
                    key={r.date}
                    className="min-w-[160px] rounded-xl border-l-4 bg-[var(--bg-surface)] py-3 pl-4 pr-3"
                    style={{ borderColor: r.border }}
                  >
                    <p className="text-[11px] text-[var(--text-muted)]">{r.date}</p>
                    <p className="font-heading text-[14px] font-semibold">{r.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      ☀ {r.cond}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
