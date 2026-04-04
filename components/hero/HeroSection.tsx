"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParticleField } from "./ParticleField";
import { ScentRing } from "@/components/ui/ScentRing";
import { NoteOrb } from "@/components/ui/NoteOrb";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-x-hidden overflow-y-clip bg-[var(--bg-deep)]"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-site-gradient opacity-0 animate-[fadeHero_600ms_ease_forwards]" />
      <style>{`
        @keyframes fadeHero { to { opacity: 1; } }
      `}</style>

      <motion.div
        className="pointer-events-none absolute -left-[15%] top-[10%] h-[70vw] max-h-[700px] w-[70vw] rounded-full bg-[rgba(123,92,240,0.25)] blur-[120px]"
        style={{ y: glowY }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-[10%] top-[20%] h-[70vw] max-h-[700px] w-[70vw] rounded-full bg-[rgba(77,217,255,0.15)] blur-[120px]"
        style={{
          y: glowY,
          animation: "glowDrift 20s ease-in-out infinite",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <ParticleField />
      </div>

      <div className="relative z-[2] grid min-h-0 flex-1 grid-cols-1 items-center gap-10 overflow-x-hidden pb-24 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4 lg:pb-16 lg:pt-20">
        <div
          className="flex max-w-xl flex-col justify-center px-[max(5vw,40px)] lg:pr-8"
          style={{ paddingLeft: "max(5vw, 40px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex w-fit rounded-full border border-[var(--border-active)] px-4 py-1.5"
          >
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
              Your perfume companion
            </span>
          </motion.div>

          <motion.h1
            className="font-heading font-extrabold leading-[0.95] tracking-[-0.02em] text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-hero)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            OWN YOUR
          </motion.h1>
          <motion.h1
            className="isolation isolate font-heading font-extrabold leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "var(--text-hero)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Split E / SSENCE: nested spans break gradient text in WebKit; each chunk needs its own gradient fill */}
            <span className="inline-flex items-baseline gap-0">
              <span className="gradient-text-brand relative inline-block translate-x-[-0.02em] text-[1.1em] leading-none">
                E
              </span>
              <span className="gradient-text-brand">SSENCE</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[420px] text-lg text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Biometric-powered fragrance intelligence that knows you better than
            you know yourself.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <MagneticButton />
            <a
              href="#community"
              className="group inline-flex items-center gap-2 text-[var(--text-secondary)] transition hover:text-[var(--accent-cyan)]"
              data-cursor="pointer"
            >
              <span aria-hidden>★</span>
              <span className="border-b border-transparent text-sm group-hover:border-[var(--accent-cyan)]">
                Read Reviews
              </span>
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-stretch gap-0 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            role="group"
            aria-label="Essense statistics"
          >
            <div className="flex flex-col py-1 pr-6">
              <span className="text-lg text-[var(--text-primary)]">10K+</span>
              <span className="text-[11px] tracking-wide text-[var(--text-muted)]">Scans</span>
            </div>
            <div className="flex flex-col border-l border-[var(--border-subtle)] py-1 px-6">
              <span className="text-lg text-[var(--text-primary)]">97%</span>
              <span className="text-[11px] tracking-wide text-[var(--text-muted)]">
                Match rate
              </span>
            </div>
            <div className="flex flex-col border-l border-[var(--border-subtle)] py-1 pl-6">
              <span className="text-lg text-[var(--text-primary)]">200+</span>
              <span className="text-[11px] tracking-wide text-[var(--text-muted)]">
                Fragrances
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex min-h-[min(82vh,720px)] items-center justify-center overflow-hidden max-lg:mx-auto max-lg:min-h-[460px] max-lg:w-[94vw] lg:absolute lg:right-0 lg:top-1/2 lg:max-h-[min(92vh,900px)] lg:min-h-0 lg:w-[50%] lg:max-w-[760px] lg:-translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex h-[min(82vh,640px)] w-full max-w-[min(100vw,760px)] shrink-0 items-center justify-center overflow-hidden lg:h-[min(88vh,780px)] lg:max-w-[780px]">
            <ScentRing />
            <motion.img
              src="/givenchy_perfume.png"
              alt="Givenchy L'Interdit perfume bottle"
              width={520}
              height={832}
              className="pointer-events-none absolute left-[35%] top-[55%] z-[1] hidden h-auto max-h-[min(62vh,480px)] w-[min(50vw,340px)] max-w-[340px] -translate-x-1/2 -translate-y-1/2 -rotate-[11deg] object-contain drop-shadow-[0_14px_40px_rgba(0,0,0,0.4)] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.img
              src="/ysl_perfume.png"
              alt="Yves Saint Laurent Y Eau de Parfum bottle"
              width={720}
              height={1080}
              className="pointer-events-none absolute left-[52%] top-[52%] z-[2] hidden h-auto max-h-[min(74vh,600px)] w-[min(58vw,440px)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.img
              src="/chanel_perfume.png"
              alt="Chanel fragrance bottle"
              width={520}
              height={832}
              className="pointer-events-none absolute left-[68%] top-[50%] z-[1] hidden h-auto max-h-[min(58vh,440px)] w-[min(46vw,300px)] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rotate-[10deg] object-contain drop-shadow-[0_14px_40px_rgba(0,0,0,0.4)] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center">
              <div className="orbit-note-1 absolute flex items-center justify-center">
                <NoteOrb noteType="top" size={48} />
              </div>
              <div className="orbit-note-2 absolute flex items-center justify-center">
                <NoteOrb noteType="mid" size={56} />
              </div>
              <div className="orbit-note-3 absolute flex items-center justify-center">
                <NoteOrb noteType="base" size={48} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2">
        <div
          className="h-10 w-0.5 rounded-full bg-[var(--accent-cyan)]"
          style={{ animation: "scrollLinePulse 2.2s ease-in-out infinite" }}
        />
        <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Scroll
        </span>
      </div>
    </section>
  );
}
