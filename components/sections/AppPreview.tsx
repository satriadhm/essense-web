"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const pills = [
  "✦ Biometric Scan",
  "✦ AI Formula",
  "✦ Weather Sync",
  "✦ Fragrance Journal",
  "✦ Community",
];

function HomeScreen() {
  return (
    <div className="space-y-4 p-4">
      <p className="font-heading text-lg font-bold">Good afternoon, Jasmine</p>
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
        <p className="text-xs text-[var(--text-muted)]">Weather</p>
        <p className="mt-1 text-2xl font-bold">26°C</p>
        <p className="text-xs text-[var(--text-secondary)]">Humid · Light breeze</p>
      </div>
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-sm text-[var(--text-secondary)]">
        Device connected · Essense v2
      </div>
      <button
        type="button"
        className="w-full rounded-2xl bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] py-4 font-heading font-bold text-white"
      >
        Start Scan
      </button>
    </div>
  );
}

function JournalScreen() {
  return (
    <div className="p-4">
      <p className="font-heading font-bold">Journal</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-[10px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex h-8 items-center justify-center rounded bg-[var(--bg-surface)] text-[var(--text-muted)]"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen() {
  return (
    <div className="p-4">
      <p className="font-heading text-sm font-bold">Your formula</p>
      <div className="relative mt-4 h-40 overflow-hidden rounded-2xl bg-[var(--bg-surface)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(77,217,255,0.2),transparent)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--accent-cyan)] opacity-40"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
        <p className="relative z-[1] p-4 text-sm text-[var(--text-primary)]">
          Bergamot · Lavender · Musk
        </p>
      </div>
    </div>
  );
}

export function AppPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="app-preview"
      className="relative overflow-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[100px]"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(123,92,240,0.12) 0%, transparent 55%), var(--bg-deep)",
      }}
    >
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <p
          className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none font-heading font-extrabold text-[rgba(255,255,255,0.04)]"
          style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
          aria-hidden
        >
          ESSENSE
        </p>
        <h2 className="relative z-[1] text-center font-heading text-[length:var(--text-h2)] font-bold text-[var(--text-primary)]">
          In the palm of your hand.
        </h2>

        <div className="relative z-[1] mt-16 flex items-center justify-center gap-0 max-lg:flex-col lg:min-h-[480px]">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[2] w-[min(88vw,280px)] origin-center -rotate-6 scale-[0.88] max-lg:hidden"
          >
            <PhoneMockup>
              <JournalScreen />
            </PhoneMockup>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[3] w-[min(92vw,300px)] max-lg:mx-auto"
          >
            <PhoneMockup>
              <HomeScreen />
            </PhoneMockup>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-[2] w-[min(88vw,280px)] origin-center rotate-6 scale-[0.88] max-lg:hidden"
          >
            <PhoneMockup>
              <ResultsScreen />
            </PhoneMockup>
          </motion.div>
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
