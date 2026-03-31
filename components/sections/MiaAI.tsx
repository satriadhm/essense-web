"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PillBadge } from "@/components/ui/PillBadge";

const bubbles = [
  { who: "mia" as const, text: "Hi there! 👋 I'm Mia, your AI fragrance assistant. What are you wearing today?" },
  { who: "user" as const, text: "I just scanned Dior Sauvage." },
  { who: "mia" as const, text: "Perfect choice for today's weather — 26°C, moderate humidity. Sauvage's bergamot will open beautifully." },
  { who: "mia" as const, text: "Based on your biometrics, I'd suggest applying to your inner wrists and neck. Your skin temp will amplify the citrus top notes. 🍋" },
  { who: "user" as const, text: "What about for tonight?" },
  { who: "mia" as const, text: "Tonight's cooler temps (19°C) call for something warmer. Here's what I recommend:", card: true },
];

export function MiaAI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="mia"
      className="relative bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[120px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0z' fill='none' stroke='%23ffffff' stroke-opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <div ref={ref} className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-purple)]">
            Meet Mia
          </p>
          <h2 className="mt-4 font-heading text-[length:var(--text-h2)] font-extrabold text-[var(--text-primary)]">
            Your AI fragrance guide.{" "}
            <span className="gradient-text-brand">Always</span> on.
          </h2>
          <p className="mt-6 text-[var(--text-secondary)]">
            Ask Mia anything. Which fragrance suits a formal dinner? What pairs
            with bergamot? Mia remembers your history, reads your biometrics, and
            gives answers that make sense for <em>you</em>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillBadge label="🧬 Biometric-Aware" color="purple" />
            <PillBadge label="🌦 Weather-Sensitive" color="cyan" />
            <PillBadge label="📖 Journal-Connected" color="amber" />
          </div>
          <a
            href="#cta"
            className="mt-10 inline-block font-heading text-[15px] text-[var(--accent-cyan)] transition hover:underline"
            data-cursor="pointer"
          >
            Talk to Mia →
          </a>
        </div>

        <div className="mx-auto w-full max-w-[340px] rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-mid)]">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)] font-heading text-sm font-bold">
              M
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold">Mia</p>
              <p className="text-[11px] text-[var(--text-muted)]">AI Assistant</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              online
            </span>
          </div>
          <div className="flex h-[420px] flex-col gap-3 overflow-y-auto p-4">
            {bubbles.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.4, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={
                  b.who === "user"
                    ? "ml-auto max-w-[90%] rounded-[18px] bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] px-4 py-3 text-left text-[14px] text-white"
                    : "mr-auto max-w-[95%] rounded-[18px] bg-[var(--bg-surface)] px-4 py-3 text-left text-[14px] text-[var(--text-primary)]"
                }
              >
                <p>{b.text}</p>
                {b.card && (
                  <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-3 text-xs">
                    <p className="font-heading font-semibold">Chanel Bleu — Base-forward edition</p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-mid)]">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-purple)]" />
                    </div>
                    <p className="mt-1 text-[var(--text-muted)]">More base, softer top</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--border-subtle)] px-3 py-3 text-[var(--text-muted)]">
            <span className="flex-1 rounded-full bg-[var(--bg-surface)] px-3 py-2 text-sm">
              Ask Mia anything...
            </span>
            <span className="text-[var(--accent-cyan)]">➤</span>
          </div>
        </div>
      </div>
    </section>
  );
}
