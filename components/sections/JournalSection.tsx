"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionKicker } from "@/components/ui/SectionKicker";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type Month = { year: number; month: number; entries: Record<number, string> };

/**
 * The months the journal has data for. Day counts and the starting weekday are
 * derived from the date itself rather than hardcoded — the previous version
 * hand-wrote 35 cells for a 31-day month.
 */
const MONTHS: Month[] = [
  {
    year: 2026,
    month: 0,
    entries: {
      6: "YSL Y · 14°C",
      11: "L'Oréal Homme Intense · 12°C",
      19: "L'Oréal Homme Sport · 9°C",
      27: "YSL Y · 15°C",
    },
  },
  {
    year: 2026,
    month: 1,
    entries: {
      2: "L'Oréal Homme Intense · 16°C",
      9: "YSL Y · 18°C",
      14: "L'Oréal Homme Sport · 13°C",
      21: "YSL Y · 17°C",
      25: "L'Oréal Homme Intense · 20°C",
    },
  },
  {
    year: 2026,
    month: 2,
    entries: {
      3: "YSL Y · 22°C",
      7: "L'Oréal Homme Sport · 19°C",
      12: "L'Oréal Homme Intense · 24°C",
      18: "YSL Y · 25°C",
      22: "L'Oréal Homme Sport · 21°C",
      28: "YSL Y · 27°C",
    },
  },
];

/** Both derived from the date, so they cannot disagree with the calendar. */
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const firstWeekday = (y: number, m: number) => new Date(y, m, 1).getDay();

const recent = [
  {
    date: "Mar 28",
    name: "YSL Y",
    cond: "27°C · Humid",
    border: "var(--accent-cyan)",
  },
  {
    date: "Mar 26",
    name: "L'Oréal Homme Intense",
    cond: "24°C · Clear",
    border: "var(--accent-purple)",
  },
  {
    date: "Mar 21",
    name: "L'Oréal Homme Sport",
    cond: "19°C · Dry",
    border: "var(--accent-amber)",
  },
];

const features = [
  { color: "var(--accent-cyan)", text: "Calendar view of daily scans" },
  { color: "var(--accent-violet)", text: "Weather + mood correlation" },
  { color: "var(--accent-amber)", text: "Formula evolution timeline" },
];

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0 text-[var(--accent-amber)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function JournalCalendar() {
  const [index, setIndex] = useState(MONTHS.length - 1);
  const { year, month, entries } = MONTHS[index];

  const label = `${MONTH_NAMES[month]} ${year}`;
  const total = daysInMonth(year, month);
  const offset = firstWeekday(year, month);
  const logged = Object.keys(entries).map(Number).sort((a, b) => a - b);

  return (
    <GlassCard
      padding={16}
      className="mx-auto w-full max-w-[420px] rounded-[20px] md:max-w-full"
    >
      <div className="flex items-center justify-between">
        <h3 aria-live="polite" className="font-heading text-lg font-bold">
          {label}
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous month"
            className="focus-ring flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-35"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(MONTHS.length - 1, i + 1))}
            disabled={index === MONTHS.length - 1}
            aria-label="Next month"
            className="focus-ring flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-35"
          >
            <Chevron dir="next" />
          </button>
        </div>
      </div>

      {/*
       * The grid is the visual rendering; reading 31 bare numbers aloud helps
       * nobody, so the same information is given to assistive tech as a
       * sentence that updates with the month.
       */}
      <p className="sr-only" aria-live="polite">
        {logged.length} scans logged in {label}: days{" "}
        {logged.join(", ")}.
      </p>

      <div aria-hidden>
        <div className="mt-3 grid grid-cols-7 gap-0.5 text-center text-label text-[var(--text-muted)] sm:gap-1 md:mt-4">
          {WEEKDAYS.map((d, i) => (
            <span key={`weekday-${i}`}>{d}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-0.5 sm:gap-1">
          {Array.from({ length: offset }, (_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {Array.from({ length: total }, (_, i) => i + 1).map((d) => {
            const entry = entries[d];
            return (
              <div
                key={d}
                title={entry ? `${MONTH_NAMES[month]} ${d} — ${entry}` : undefined}
                className={`relative flex aspect-square w-full min-w-0 items-center justify-center rounded-md text-label sm:text-xs ${
                  entry
                    ? "bg-[rgba(77,217,255,0.06)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {d}
                {entry && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[var(--accent-violet)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ul className="scrollbar-none mt-6 flex w-full min-w-0 list-none gap-3 overflow-x-auto pb-2">
        {recent.map((r) => (
          <li
            key={r.date}
            className="min-w-[160px] rounded-xl border-l-4 bg-[var(--bg-surface)] py-3 pl-4 pr-3"
            style={{ borderColor: r.border }}
          >
            <p className="text-label text-[var(--text-muted)]">{r.date}</p>
            <p className="font-heading text-sm font-semibold">{r.name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <SunIcon /> {r.cond}
            </p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function JournalSection() {
  return (
    <section
      id="journal"
      className="overflow-x-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[80px] lg:py-[120px]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="min-w-0">
          <SectionKicker>Fragrance journal</SectionKicker>
          <h2 className="mt-4 max-w-[18ch] font-heading text-section font-extrabold leading-[1.2] text-[var(--text-primary)] sm:max-w-none">
            A record of what you&apos;ve{" "}
            <span className="italic text-[var(--accent-violet)]">worn</span>.
          </h2>
          <p className="mt-6 text-[var(--text-secondary)]">
            Every scan and formula is logged automatically. Look back at last
            month, or spot patterns across the seasons.
          </p>
          <ul className="mt-8 space-y-3 text-[var(--text-secondary)]">
            {features.map((f) => (
              <li key={f.text}>
                <span aria-hidden style={{ color: f.color }}>
                  —
                </span>{" "}
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <ScrollReveal>
            <JournalCalendar />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
