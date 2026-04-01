"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  startTransition,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/GlassCard";
import { FragranceTag } from "@/components/ui/FragranceTag";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

function StepFingerprint() {
  return (
    <div className="relative flex h-[120px] w-[120px] items-center justify-center">
      <svg className="absolute h-full w-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="40 80" />
      </svg>
      <svg className="absolute h-full w-full animate-[spin_18s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="28" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="30 60" />
      </svg>
      <div className="h-3 w-3 animate-pulse rounded-full bg-[var(--accent-cyan)]" />
    </div>
  );
}

function ScanProgressLoop() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setW((x) => (x >= 100 ? 0 : x + 2));
    }, 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[var(--bg-deep)]">
      <div
        className="h-full rounded-full bg-[var(--accent-cyan)] transition-[width] duration-100"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

function StepAI() {
  return (
    <div className="relative flex h-[120px] w-[120px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(123,92,240,0.35)_0%,transparent_70%)] blur-md" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={deg}
          className="absolute h-2 w-2 rounded-full bg-[var(--accent-purple)]"
          style={{
            transform: `rotate(${deg}deg) translateY(-36px)`,
            opacity: 0.4 + (i % 3) * 0.15,
            animation: `pulse 2.5s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }`}</style>
    </div>
  );
}

const desktopSteps = [
  {
    key: "intro",
    width: "min-w-[100vw]",
    content: (
      <div className="flex h-full flex-col justify-center px-[max(5vw,40px)]">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
          How it works
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-[length:var(--text-h1)] font-extrabold text-[var(--text-primary)]">
          Four moments. One perfect formula.
        </h2>
        <div className="mt-10 flex items-center gap-2 font-heading text-sm text-[var(--text-muted)]">
          <span>01</span>
          <span className="h-px w-8 border-t border-dashed border-[var(--border-subtle)]" />
          <span>02</span>
          <span className="h-px w-8 border-t border-dashed border-[var(--border-subtle)]" />
          <span>03</span>
          <span className="h-px w-8 border-t border-dashed border-[var(--border-subtle)]" />
          <span>04</span>
        </div>
      </div>
    ),
  },
  {
    key: "s1",
    width: "min-w-[clamp(480px,62vw,720px)]",
    content: (
      <div className="relative flex h-full flex-col justify-center bg-[var(--bg-mid)] px-[max(5vw,40px)] py-12">
        <span className="pointer-events-none absolute left-8 top-8 font-heading text-[clamp(100px,15vw,180px)] font-black text-white/[0.04]">
          01
        </span>
        <GlassCard className="relative z-[1] mx-auto flex h-[120px] w-[120px] items-center justify-center p-0">
          <svg width="64" height="80" viewBox="0 0 64 80" aria-hidden>
            <rect x="18" y="20" width="28" height="44" rx="4" fill="url(#bottle)" />
            <rect x="26" y="12" width="12" height="10" fill="var(--text-muted)" />
            <circle cx="32" cy="10" r="6" fill="var(--accent-cyan)" opacity="0.6" />
            <defs>
              <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#4DD9FF" stopOpacity="0.4" />
                <stop offset="1" stopColor="#7B5CF0" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </GlassCard>
        <h3 className="relative z-[1] mt-8 font-heading text-[28px] font-bold">
          Select Your Scent
        </h3>
        <p className="relative z-[1] mt-3 max-w-md text-[15px] text-[var(--text-secondary)]">
          Tell Essense which fragrance you&apos;re wearing — scan the barcode, or choose manually from 200+ perfumes.
        </p>
        <div className="relative z-[1] mt-6 flex flex-wrap gap-2">
          <FragranceTag name="YSL Y" />
          <FragranceTag name="Dior Sauvage" />
          <FragranceTag name="Chanel Bleu" />
        </div>
      </div>
    ),
  },
  {
    key: "s2",
    width: "min-w-[clamp(480px,62vw,720px)]",
    content: (
      <div className="relative flex h-full flex-col justify-center px-[max(5vw,40px)] py-12">
        <span className="pointer-events-none absolute right-12 top-12 font-heading text-[clamp(100px,15vw,180px)] font-black text-white/[0.04]">
          02
        </span>
        <GlassCard className="relative z-[1] mx-auto flex h-[120px] w-[120px] items-center justify-center p-0">
          <StepFingerprint />
        </GlassCard>
        <h3 className="relative z-[1] mt-8 font-heading text-[28px] font-bold">
          Read Your Biology
        </h3>
        <p className="relative z-[1] mt-3 max-w-md text-[15px] text-[var(--text-secondary)]">
          Place your finger on the Essense device. In 12 seconds, it captures your skin&apos;s temperature, conductance, and sebum profile.
        </p>
        <ScanProgressLoop />
        <div className="relative z-[1] mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border-l-2 border-[var(--accent-cyan)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
            Skin Temp: 36.2°C
          </span>
          <span className="rounded-full border-l-2 border-[var(--accent-cyan)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
            Conductance: Medium
          </span>
          <span className="rounded-full border-l-2 border-[var(--accent-cyan)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
            Sebum: Balanced
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "s3",
    width: "min-w-[clamp(480px,62vw,720px)]",
    content: (
      <div className="relative flex h-full flex-col justify-center bg-[var(--bg-mid)] px-[max(5vw,40px)] py-12">
        <span className="pointer-events-none absolute left-8 top-8 font-heading text-[clamp(100px,15vw,180px)] font-black text-white/[0.04]">
          03
        </span>
        <GlassCard className="relative z-[1] mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-visible p-0">
          <StepAI />
        </GlassCard>
        <h3 className="relative z-[1] mt-8 font-heading text-[28px] font-bold">
          AI Builds Your Formula
        </h3>
        <p className="relative z-[1] mt-3 max-w-md text-[15px] text-[var(--text-secondary)]">
          Mia, our AI fragrance engine, cross-references your biometrics with live weather and your history to build a formula tuned to today&apos;s you.
        </p>
        <div className="relative z-[1] mt-6 max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-4">
          <p className="text-xs text-[var(--text-muted)]">Formula preview</p>
          {[
            ["Bergamot", 35],
            ["Lavender", 28],
            ["Patchouli", 37],
          ].map(([n, pct]) => (
            <div key={n} className="mt-2">
              <div className="flex justify-between text-sm">
                <span>{n}</span>
                <span className="text-[var(--text-muted)]">{pct}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--bg-surface)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "s4",
    width: "min-w-[clamp(480px,62vw,720px)]",
    content: (
      <div className="relative flex h-full flex-col justify-center px-[max(5vw,40px)] py-12">
        <span className="pointer-events-none absolute right-8 top-8 z-0 font-heading text-[clamp(100px,15vw,180px)] font-black text-white/[0.04]">
          04
        </span>
        <GlassCard className="relative z-[1] mx-auto flex h-[120px] w-[120px] items-center justify-center gap-1 p-0">
          <span className="text-2xl">🧴</span>
          <span className="text-2xl">📖</span>
          <span className="text-2xl">↗</span>
        </GlassCard>
        <h3 className="relative z-[1] mt-8 font-heading text-[28px] font-bold">
          Yours. Every Day.
        </h3>
        <p className="relative z-[1] mt-3 max-w-md text-[15px] text-[var(--text-secondary)]">
          Each result is saved to your fragrance journal. Track how your formula evolves with your mood, the weather, and the seasons.
        </p>
        <div className="relative z-[1] mt-8 flex -space-x-3">
          {["#7B5CF0", "#4DD9FF", "#9D6FF5", "#F59E0B", "#F43F5E", "#3B82F6", "#A0AABF", "#7B5CF0"].map(
            (c, i) => (
              <span
                key={i}
                className="h-10 w-10 rounded-full border-2 border-[var(--bg-deep)]"
                style={{ background: c }}
              />
            ),
          )}
        </div>
        <p className="relative z-[1] mt-4 text-sm text-[var(--text-muted)]">
          Join 10,000+ fragrance enthusiasts
        </p>
      </div>
    ),
  },
];

function MobileStack() {
  return (
    <div className="flex flex-col gap-16 px-[max(5vw,40px)] pb-12 pt-24 lg:hidden">
      {desktopSteps.map((s, i) => (
        <ScrollReveal key={s.key} delay={i * 80}>
          <div>{s.content}</div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    startTransition(() => setDesktop(mq.matches));
    const fn = () => startTransition(() => setDesktop(mq.matches));
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useLayoutEffect(() => {
    if (!desktop) return;
    const section = pinRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 500, 0)}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [desktop]);

  return (
    <section id="how-it-works" className="relative bg-[var(--bg-deep)]">
      <MobileStack />
      <div ref={pinRef} className="relative hidden h-[100vh] lg:block">
        <div className="sticky top-0 flex h-[100vh] flex-col overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-[calc(100vh-48px)] w-max gap-6 will-change-transform"
          >
            {desktopSteps.map((s) => (
              <div
                key={s.key}
                className={`relative flex h-full shrink-0 ${s.width} items-stretch`}
              >
                {s.content}
              </div>
            ))}
          </div>
          <div className="h-10 w-full px-[max(5vw,40px)] pb-2 pt-2">
            <div className="h-px w-full bg-[var(--bg-surface)]">
              <div
                ref={progressRef}
                className="h-px bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
