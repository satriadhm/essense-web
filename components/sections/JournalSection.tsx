import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionKicker } from "@/components/ui/SectionKicker";

/** March 2026 has 31 days and starts on a Sunday, so the grid needs no offset. */
const MONTH_LABEL = "March 2026";
const DAYS_IN_MONTH = 31;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** Logged entries keyed by day, so each cell describes its own scan. */
const ENTRIES: Record<number, string> = {
  3: "Mar 3 — YSL Y · 22°C",
  7: "Mar 7 — L'Oréal Homme Sport · 19°C",
  12: "Mar 12 — L'Oréal Homme Intense · 24°C",
  18: "Mar 18 — YSL Y · 25°C",
  22: "Mar 22 — L'Oréal Homme Sport · 21°C",
  28: "Mar 28 — YSL Y · 27°C",
};

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

export function JournalSection() {
  return (
    <section
      id="journal"
      className="overflow-x-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[80px] lg:py-[120px]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="min-w-0">
          <SectionKicker>Fragrance journal</SectionKicker>
          <h2 className="mt-4 max-w-[18ch] font-heading text-h2 font-extrabold leading-[1.2] text-[var(--text-primary)] sm:max-w-none">
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
            {/*
             * Product mockup: the month arrows and day cells are illustrative
             * and have no behaviour, so the card is presented as a single
             * decorative image instead of a set of dead controls.
             */}
            <GlassCard
              padding={16}
              className="mx-auto w-full max-w-[420px] rounded-[20px] md:max-w-full"
              role="img"
              aria-label={`Journal calendar for ${MONTH_LABEL}, showing ${
                Object.keys(ENTRIES).length
              } logged scans and the three most recent entries`}
            >
              <div aria-hidden inert>
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    {MONTH_LABEL}
                  </h3>
                  <div className="flex gap-2 text-[var(--text-muted)]">
                    <span>&lt;</span>
                    <span>&gt;</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-7 gap-0.5 text-center text-label text-[var(--text-muted)] sm:gap-1 md:mt-4">
                  {WEEKDAYS.map((d, i) => (
                    <span key={`weekday-${i}`}>{d}</span>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-0.5 sm:gap-1">
                  {Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1).map(
                    (d) => {
                      const entry = ENTRIES[d];
                      return (
                        <div
                          key={d}
                          title={entry}
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
                    },
                  )}
                </div>

                <div className="scrollbar-none mt-6 flex w-full min-w-0 gap-3 overflow-x-auto pb-2">
                  {recent.map((r) => (
                    <div
                      key={r.date}
                      className="min-w-[160px] rounded-xl border-l-4 bg-[var(--bg-surface)] py-3 pl-4 pr-3"
                      style={{ borderColor: r.border }}
                    >
                      <p className="text-label text-[var(--text-muted)]">
                        {r.date}
                      </p>
                      <p className="font-heading text-sm font-semibold">
                        {r.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <SunIcon /> {r.cond}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
