"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const pills = [
  "✦ Biometric Scan",
  "✦ AI Formula",
  "✦ Weather Sync",
  "✦ Fragrance Journal",
  "✦ Community",
];

const CAROUSEL_INTERVAL_MS = 3000;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir < 0 ? 48 : -48,
    opacity: 0,
  }),
};

function StatusBar() {
  return (
    <div className="mb-3 flex items-center justify-between px-1 text-[10px] font-medium text-[var(--text-muted)]">
      <span className="tracking-wide">9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2 w-3 rounded-sm border border-[var(--text-muted)]/50" />
        <span className="text-[9px]">5G</span>
        <span className="h-2.5 w-4 rounded-sm border border-[var(--text-muted)]/40 bg-[var(--text-muted)]/20" />
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="space-y-3 p-4 pb-5">
      <StatusBar />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Good afternoon
          </p>
          <p className="font-heading text-lg font-bold leading-tight text-[var(--text-primary)]">Jasmine</p>
        </div>
        <div
          className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)] p-[2px] shadow-lg shadow-[var(--glow-purple)]/25"
          aria-hidden
        >
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[var(--bg-surface)] text-xs font-bold text-[var(--text-primary)]">
            JR
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 p-3.5 shadow-inner">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Live weather</p>
            <p className="mt-0.5 font-heading text-3xl font-bold tabular-nums text-[var(--text-primary)]">26°C</p>
          </div>
          <span className="rounded-full bg-[var(--accent-cyan)]/15 px-2 py-0.5 text-[9px] font-semibold text-[var(--accent-cyan)]">
            Humid
          </span>
        </div>
        <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
          Heat index <span className="font-semibold text-[var(--accent-amber)]">29°C</span>
          <span className="text-[var(--text-muted)]"> · </span>
          Light breeze from SE
        </p>
      </div>

      <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3.5 py-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-cyan)] opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-cyan)]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-[var(--text-primary)]">Device connected</p>
          <p className="text-[10px] text-[var(--text-muted)]">Essense v2 · Bluetooth LE</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Skin temp", value: "36.2°", unit: "C" },
          { label: "Conductance", value: "4.1", unit: "µS" },
          { label: "Mood index", value: "0.82", unit: "" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/[0.06] bg-[var(--bg-deep)]/80 px-2 py-2 text-center"
          >
            <p className="text-[8px] uppercase tracking-wide text-[var(--text-muted)]">{s.label}</p>
            <p className="mt-1 font-heading text-sm font-bold tabular-nums text-[var(--text-primary)]">
              {s.value}
              {s.unit ? <span className="text-[10px] font-normal text-[var(--text-muted)]">{s.unit}</span> : null}
            </p>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <button
          type="button"
          className="relative z-[2] w-full rounded-2xl bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-violet)] to-[var(--accent-cyan)] py-3.5 font-heading text-sm font-bold text-white shadow-lg shadow-[var(--glow-purple)]/30"
        >
          Start biometric scan
        </button>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-[var(--border-active)]/40 bg-[var(--bg-glass)] px-3 py-2 backdrop-blur-sm">
        <span className="mt-0.5 text-sm" aria-hidden>
          ✦
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">Mia</p>
          <p className="text-[11px] leading-snug text-[var(--text-secondary)]">
            Your skin is warmer than usual — a fresher top layer may feel more balanced today.
          </p>
        </div>
      </div>
    </div>
  );
}

const JOURNAL_WEEKS: { day: number; wear?: "fresh" | "woody" | "oriental" }[][] = [
  [
    { day: 1 },
    { day: 2, wear: "fresh" },
    { day: 3 },
    { day: 4, wear: "woody" },
    { day: 5 },
    { day: 6, wear: "oriental" },
    { day: 7 },
  ],
  [
    { day: 8, wear: "fresh" },
    { day: 9 },
    { day: 10 },
    { day: 11, wear: "woody" },
    { day: 12 },
    { day: 13 },
    { day: 14, wear: "fresh" },
  ],
  [
    { day: 15 },
    { day: 16 },
    { day: 17, wear: "oriental" },
    { day: 18 },
    { day: 19, wear: "woody" },
    { day: 20 },
    { day: 21 },
  ],
  [
    { day: 22 },
    { day: 23, wear: "fresh" },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27, wear: "oriental" },
    { day: 28 },
  ],
];

function wearDotClass(wear?: "fresh" | "woody" | "oriental") {
  if (!wear) return "";
  if (wear === "fresh") return "bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(77,217,255,0.6)]";
  if (wear === "woody") return "bg-[var(--accent-purple)] shadow-[0_0_6px_rgba(123,92,240,0.5)]";
  return "bg-[var(--accent-amber)] shadow-[0_0_6px_rgba(245,158,11,0.45)]";
}

function JournalScreen() {
  return (
    <div className="space-y-3 p-4 pb-5">
      <StatusBar />
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-heading text-base font-bold text-[var(--text-primary)]">Journal</p>
          <p className="text-[10px] text-[var(--text-muted)]">April 2026</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-[var(--accent-purple)]/30 to-[var(--accent-cyan)]/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[var(--text-primary)]">
          12-day streak
        </span>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-[8px] font-semibold uppercase text-[var(--text-muted)]">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="space-y-1">
        {JOURNAL_WEEKS.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-0.5">
            {week.map(({ day, wear }) => {
              const isToday = day === 6;
              return (
                <div
                  key={day}
                  className={`relative flex h-8 flex-col items-center justify-center rounded-lg text-[10px] font-medium tabular-nums ${
                    isToday
                      ? "ring-2 ring-[var(--accent-cyan)] ring-offset-2 ring-offset-[var(--bg-deep)]"
                      : "bg-[var(--bg-surface)]/60 text-[var(--text-secondary)]"
                  }`}
                >
                  {day}
                  {wear ? (
                    <span
                      className={`absolute bottom-0.5 h-1 w-1 rounded-full ${wearDotClass(wear)}`}
                      title={wear}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-[8px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" /> Fresh
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)]" /> Woody
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)]" /> Oriental
        </span>
      </div>

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 p-3">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Latest entry</p>
        <p className="mt-1 font-heading text-sm font-bold text-[var(--text-primary)]">Evening woody layer</p>
        <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">Sat · 7:40 PM · 18°C outside</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {["Sandalwood", "Low humidity", "Long wear"].map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-2 py-0.5 text-[9px] text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-active)]/35 bg-[var(--bg-glass)] px-3 py-2 backdrop-blur-sm">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">Mia · Pattern</p>
        <p className="text-[11px] leading-snug text-[var(--text-secondary)]">
          You reach for fresher accords on humid weekdays — consider a citrus top on Tuesday&apos;s forecast.
        </p>
      </div>
    </div>
  );
}

function ResultsScreen() {
  return (
    <div className="space-y-3 p-4 pb-5">
      <StatusBar />
      <div className="flex items-center justify-between gap-2">
        <p className="font-heading text-base font-bold text-[var(--text-primary)]">Your formula</p>
        <span className="rounded-full bg-[var(--accent-cyan)]/15 px-2 py-0.5 font-heading text-[11px] font-bold tabular-nums text-[var(--accent-cyan)]">
          97% match
        </span>
      </div>

      <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(123,92,240,0.35),transparent_70%)]" />
        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(77,217,255,0.2),transparent_65%)]" />
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--accent-cyan)] opacity-50"
            style={{
              left: `${48 + 38 * Math.cos((i / 28) * Math.PI * 2)}%`,
              top: `${48 + 38 * Math.sin((i / 28) * Math.PI * 2)}%`,
            }}
          />
        ))}
        <div className="relative z-[1] h-16 w-16 rounded-full bg-gradient-to-br from-[var(--accent-purple)]/40 to-[var(--accent-cyan)]/30 blur-[2px]" />
        <span className="absolute z-[2] text-[10px] font-semibold text-[var(--text-primary)]">ESSENSE</span>
      </div>

      <div className="space-y-2.5">
        {[
          { tier: "Top", name: "Bergamot", pct: 92, color: "from-[var(--accent-cyan)] to-[var(--accent-blue)]" },
          { tier: "Heart", name: "Lavender", pct: 78, color: "from-[var(--accent-purple)] to-[var(--accent-violet)]" },
          { tier: "Base", name: "Musk", pct: 88, color: "from-[var(--accent-amber)] to-[var(--accent-rose)]" },
        ].map((row) => (
          <div key={row.tier}>
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="font-semibold text-[var(--text-muted)]">{row.tier}</span>
              <span className="text-[var(--text-secondary)]">
                {row.name} · {row.pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-surface)]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Application guide
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { zone: "Neck & pulse", sprays: 2 },
            { zone: "Wrists", sprays: 1 },
            { zone: "Chest (light)", sprays: 1 },
            { zone: "Hair mist", sprays: 1 },
          ].map((cell) => (
            <div
              key={cell.zone}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-2.5 py-2 text-center"
            >
              <p className="text-[10px] font-medium text-[var(--text-primary)]">{cell.zone}</p>
              <p className="mt-0.5 text-[9px] tabular-nums text-[var(--text-muted)]">{cell.sprays} spray{cell.sprays > 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[9px] leading-relaxed text-[var(--text-muted)]">
        In high humidity, molecules lift faster — reapply or refresh after ~6h for consistent projection.
      </p>
    </div>
  );
}

/** Order matches desktop fan: left → center → right */
const CAROUSEL_SCREENS = [
  { id: "journal" as const, label: "Journal", content: <JournalScreen /> },
  { id: "home" as const, label: "Home", content: <HomeScreen /> },
  { id: "results" as const, label: "Results", content: <ResultsScreen /> },
];

export function AppPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActive((a) => (a + newDirection + CAROUSEL_SCREENS.length) % CAROUSEL_SCREENS.length);
  }, []);

  const goTo = useCallback((index: number) => {
    if (index === active) return;
    setPaused(true);
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const next = useCallback(() => {
    setPaused(true);
    paginate(1);
  }, [paginate]);

  const prev = useCallback(() => {
    setPaused(true);
    paginate(-1);
  }, [paginate]);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % CAROUSEL_SCREENS.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    setPaused(true);
    if (delta < 0) paginate(1);
    else paginate(-1);
  };

  return (
    <section
      id="app-preview"
      className="relative overflow-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[60px] lg:py-[100px]"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(123,92,240,0.12) 0%, transparent 55%), var(--bg-deep)",
      }}
    >
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <h2 className="relative z-[1] text-center font-heading text-[length:var(--text-h2)] font-bold text-[var(--text-primary)]">
          Your scent. Always with you.
        </h2>

        {/* Desktop: three fanned phones */}
        <div className="relative z-[1] mt-16 hidden items-center justify-center gap-0 lg:flex lg:min-h-[480px]">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[2] w-[min(88vw,280px)] origin-center -rotate-6 scale-[0.88]"
          >
            <PhoneMockup>
              <JournalScreen />
            </PhoneMockup>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[3] w-[min(92vw,300px)]"
          >
            <PhoneMockup>
              <HomeScreen />
            </PhoneMockup>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[2] w-[min(88vw,280px)] origin-center rotate-6 scale-[0.88]"
          >
            <PhoneMockup>
              <ResultsScreen />
            </PhoneMockup>
          </motion.div>
        </div>

        {/* Mobile: carousel */}
        <div className="relative z-[1] mt-12 lg:hidden">
          <div className="mx-auto flex max-w-[min(92vw,300px)] flex-col items-center">
            <div className="mb-4 flex w-full items-center justify-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] text-lg text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--border-active)]"
                aria-label="Previous screen"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 text-sm backdrop-blur-sm transition hover:border-[var(--border-active)]"
                aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
              >
                {paused ? "▶" : "⏸"}
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] text-lg text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--border-active)]"
                aria-label="Next screen"
              >
                ›
              </button>
            </div>

            <div
              className="relative w-full touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={CAROUSEL_SCREENS[active].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <PhoneMockup>{CAROUSEL_SCREENS[active].content}</PhoneMockup>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2">
                {CAROUSEL_SCREENS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-8 bg-[var(--accent-cyan)]" : "w-2 bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)]/70"
                    }`}
                    aria-label={`Go to ${s.label}`}
                    aria-current={i === active}
                  />
                ))}
              </div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                {CAROUSEL_SCREENS[active].label}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-[18px] py-2 text-[13px] text-[var(--text-secondary)] backdrop-blur-[8px] transition hover:border-[var(--border-active)] hover:text-[var(--text-primary)]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
