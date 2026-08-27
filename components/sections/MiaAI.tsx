"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PillBadge } from "@/components/ui/PillBadge";
import { SectionKicker } from "@/components/ui/SectionKicker";

const bubbles = [
  { who: "mia" as const, text: "Hi, I'm Mia. What are you wearing today?" },
  { who: "user" as const, text: "Just scanned L'Oréal Homme Intense." },
  {
    who: "mia" as const,
    text: "Good pick for 26°C and moderate humidity. The bergamot should open up well.",
  },
  {
    who: "mia" as const,
    text: "Apply to inner wrists and neck. Your skin temp will lift the citrus notes.",
  },
  { who: "user" as const, text: "What about for tonight?" },
  {
    who: "mia" as const,
    text: "Cooler tonight at 19°C. Try something warmer:",
    card: true,
  },
];

export function MiaAI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="mia"
      className="relative bg-[var(--bg-deep)] px-[max(5vw,40px)] py-[60px] lg:py-[120px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0z' fill='none' stroke='%23ffffff' stroke-opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <SectionKicker tone="violet">Meet Mia</SectionKicker>
          <h2 className="mt-4 font-heading text-section font-extrabold text-[var(--text-primary)]">
            An <span className="gradient-text-brand">AI</span> fragrance
            assistant.
          </h2>
          <p className="mt-6 text-[var(--text-secondary)]">
            Ask which fragrance suits a formal dinner, or what pairs with
            bergamot. Mia uses your scan history and biometrics to answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillBadge label="Biometric-aware" color="purple" />
            <PillBadge label="Weather-sensitive" color="cyan" />
            <PillBadge label="Journal-connected" color="amber" />
          </div>
          <a
            href="#cta"
            className="focus-ring mt-10 inline-block rounded font-heading text-sm text-[var(--accent-cyan)] transition hover:underline"
          >
            Try Mia in the beta →
          </a>
        </div>

        <div className="mx-auto w-full max-w-[340px] rounded-[28px] border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--bg-mid)_80%,white)] shadow-[0_16px_38px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-violet)] font-heading text-sm font-bold text-white"
              aria-hidden
            >
              M
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold">Mia</p>
              <p className="text-label text-[var(--text-secondary)]">
                AI Assistant
              </p>
            </div>
          </div>
          {/*
           * tabIndex makes this scrollable region reachable by keyboard — a
           * scroll container that cannot be focused cannot be scrolled without
           * a pointer.
           */}
          <div
            className="scrollbar-themed flex h-[420px] flex-col gap-3 overflow-y-auto p-4"
            role="region"
            aria-label="Example conversation with Mia"
            tabIndex={0}
          >
            {bubbles.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  delay: i * 0.4,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  b.who === "user"
                    ? "ml-auto max-w-[90%] rounded-[18px] bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] px-4 py-3 text-left text-sm text-white"
                    : "mr-auto max-w-[95%] rounded-[18px] bg-[var(--bg-surface)] px-4 py-3 text-left text-sm text-[var(--text-primary)]"
                }
              >
                <p>{b.text}</p>
                {b.card && (
                  <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-3 text-xs">
                    <p className="font-heading font-semibold text-[var(--text-primary)]">
                      L&apos;Oréal Homme Intense — Base-forward edition
                    </p>
                    <div
                      className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-mid)]"
                      aria-hidden
                    >
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-purple)]" />
                    </div>
                    <p className="mt-1 text-[var(--text-muted)]">
                      More base, softer top
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {/*
           * The composer is a real control rather than a <span> dressed as a
           * text field. It is not an input, because there is no Mia to send a
           * message to yet — so it says what it actually does and goes there.
           */}
          <a
            href="#cta"
            className="focus-ring group flex items-center gap-2 border-t border-[var(--border-subtle)] px-3 py-3 text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
          >
            <span className="flex-1 rounded-full bg-[var(--bg-surface)] px-3 py-2 text-left text-sm transition group-hover:bg-[color-mix(in_srgb,var(--bg-surface)_70%,var(--accent-cyan))]">
              Ask Mia anything…
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-[var(--accent-cyan)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m4 12 16-8-6 8 6 8-16-8Z" />
            </svg>
            <span className="sr-only">
              Mia is part of the private beta — request an invite
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
