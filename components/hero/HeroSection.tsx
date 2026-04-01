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
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-x-hidden overflow-y-visible bg-[var(--bg-deep)]"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-site-gradient opacity-0 animate-[fadeHero_600ms_ease_forwards]" />
      <style>{`
        @keyframes fadeHero { to { opacity: 1; } }
        @keyframes heroPerfumeFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-5px); }
        }
        @keyframes heroGivenchyFloat {
          0%, 100% { transform: translate(-50%, -50%) rotate(-11deg) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(-11deg) translateY(-4px); }
        }
        .hero-perfume-float {
          animation: heroPerfumeFloat 5.5s ease-in-out infinite;
          animation-delay: 1.9s;
        }
        .hero-perfume-float-givenchy {
          animation: heroGivenchyFloat 6s ease-in-out infinite;
          animation-delay: 2.05s;
        }
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

      <div className="relative z-[2] grid flex-1 grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4 lg:pb-16 lg:pt-20">
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
            className="font-heading font-extrabold leading-[0.95] tracking-[-0.02em]"
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
              href="#how-it-works"
              className="group inline-flex items-center gap-2 text-[var(--text-secondary)] transition hover:text-[var(--accent-cyan)]"
              data-cursor="pointer"
            >
              <span aria-hidden>▷</span>
              <span className="border-b border-transparent text-sm group-hover:border-[var(--accent-cyan)]">
                Watch the Story
              </span>
            </a>
          </motion.div>

          <motion.p
            className="mt-10 font-heading text-[11px] tracking-wide text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            10K+ Scans &nbsp;|&nbsp; 97% Match Rate &nbsp;|&nbsp; 200+ Fragrances
          </motion.p>
        </div>

        <motion.div
          className="relative flex min-h-[min(78vh,640px)] items-center justify-center max-lg:mx-auto max-lg:min-h-[420px] max-lg:w-[92vw] lg:absolute lg:right-0 lg:top-1/2 lg:h-[min(92vh,820px)] lg:min-h-0 lg:w-[48%] lg:max-w-[640px] lg:-translate-y-1/2"
          style={{ y: orbY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex h-[min(72vh,500px)] w-full max-w-[min(96vw,520px)] shrink-0 items-center justify-center lg:h-[min(76vh,560px)] lg:max-w-[560px]">
            <ScentRing />
            <motion.img
              src="/givenchy_perfume.png"
              alt="Givenchy L'Interdit perfume bottle"
              width={400}
              height={640}
              className="hero-perfume-float-givenchy pointer-events-none absolute left-[30%] top-[52%] z-[1] h-auto max-h-[min(44vh,300px)] w-[min(34vw,200px)] max-w-[200px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_14px_40px_rgba(0,0,0,0.4)] max-lg:left-[24%] max-lg:top-[53%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.img
              src="/ysl_perfume.png"
              alt="Yves Saint Laurent Y Eau de Parfum bottle"
              width={560}
              height={840}
              className="hero-perfume-float pointer-events-none absolute left-1/2 top-1/2 z-[2] h-auto max-h-[min(52vh,380px)] w-[min(42vw,260px)] max-w-[260px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center">
              <div className="orbit-note-1 absolute flex items-center justify-center">
                <NoteOrb noteType="top" label="TOP" size={40} />
              </div>
              <div className="orbit-note-2 absolute flex items-center justify-center">
                <NoteOrb noteType="mid" label="HEART" size={44} />
              </div>
              <div className="orbit-note-3 absolute flex items-center justify-center">
                <NoteOrb noteType="base" label="BASE" size={40} />
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
