"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScentRing } from "@/components/ui/ScentRing";
import { CtaButton } from "@/components/ui/CtaButton";

const MotionImage = motion.create(Image);

const BOTTLES = [
  {
    src: "/giorgio_perfume.png",
    width: 520,
    height: 832,
    delay: 1.15,
    className:
      "left-[35%] top-[55%] z-[1] max-h-[min(62vh,480px)] w-[min(50vw,340px)] max-w-[340px] -rotate-[11deg] drop-shadow-[0_14px_40px_rgba(0,0,0,0.4)]",
    sizes: "340px",
  },
  {
    src: "/ysl_perfume.png",
    width: 720,
    height: 1080,
    delay: 1.25,
    className:
      "left-[52%] top-[52%] z-[2] max-h-[min(74vh,600px)] w-[min(58vw,440px)] max-w-[440px] drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]",
    sizes: "440px",
  },
  {
    src: "/polo_perfume.png",
    width: 520,
    height: 832,
    delay: 1.35,
    className:
      "left-[68%] top-[50%] z-[1] max-h-[min(58vh,440px)] w-[min(46vw,300px)] max-w-[300px] rotate-[10deg] drop-shadow-[0_14px_40px_rgba(0,0,0,0.4)]",
    sizes: "300px",
  },
];

const STATS = [
  { value: "v0.1", label: "Build" },
  { value: "23", label: "Beta testers" },
  { value: "8", label: "Fragrances" },
];

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
      <div className="bg-site-gradient animate-fade-in pointer-events-none absolute inset-0 z-[1] opacity-0" />

      <motion.div
        className="pointer-events-none absolute -left-[15%] top-[10%] h-[70vw] max-h-[700px] w-[70vw] rounded-full bg-[rgba(123,92,240,0.25)] blur-[120px]"
        style={{ y: glowY }}
        aria-hidden
      />
      <motion.div
        className="animate-glow-drift pointer-events-none absolute -right-[10%] top-[20%] h-[70vw] max-h-[700px] w-[70vw] rounded-full bg-[rgba(77,217,255,0.15)] blur-[120px]"
        style={{ y: glowY }}
        aria-hidden
      />

      <div className="relative z-[2] grid min-h-0 flex-1 grid-cols-1 items-center gap-10 overflow-x-hidden px-[max(5vw,40px)] pb-24 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4 lg:pb-16 lg:pt-20">
        <div className="flex max-w-xl flex-col justify-center lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex w-fit rounded-full border border-[var(--border-active)] px-4 py-1.5"
          >
            <span className="font-heading text-label font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
              Your perfume companion
            </span>
          </motion.div>

          {/*
           * One <h1> for one heading. This was previously two sibling <h1>
           * elements, which reads as two separate page titles.
           */}
          <h1 className="font-heading text-hero font-extrabold leading-[0.95] tracking-[-0.02em] text-[var(--text-primary)]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              OWN YOUR
            </motion.span>
            <motion.span
              className="isolate block"
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
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-[420px] text-lg text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            A biometric scanner and app that picks fragrance formulas for your
            skin, the weather, and the day.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <CtaButton />
            <a
              href="#community"
              className="focus-ring group inline-flex items-center gap-2 rounded-full px-1 text-[var(--text-secondary)] transition hover:text-[var(--accent-cyan)]"
            >
              <span aria-hidden>★</span>
              <span className="border-b border-transparent text-sm group-hover:border-[var(--accent-cyan)]">
                Read Reviews
              </span>
            </a>
          </motion.div>

          <motion.dl
            className="mt-10 flex flex-wrap items-stretch gap-0 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            aria-label="Essense statistics"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                /* col-reverse: <dt> must precede <dd> in the DOM, but the
                   value reads above the label. */
                className={`flex flex-col-reverse justify-end py-1 ${
                  i === 0
                    ? "pr-6"
                    : `border-l border-[var(--border-subtle)] pl-6 ${
                        i < STATS.length - 1 ? "pr-6" : ""
                      }`
                }`}
              >
                <dt className="text-label tracking-wide text-[var(--text-muted)]">
                  {stat.label}
                </dt>
                <dd className="text-h3 text-[var(--text-primary)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative hidden min-h-[min(82vh,720px)] items-center justify-center overflow-hidden lg:absolute lg:right-0 lg:top-1/2 lg:flex lg:max-h-[min(92vh,900px)] lg:min-h-0 lg:w-[50%] lg:max-w-[760px] lg:-translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <div className="relative flex h-[min(82vh,640px)] w-full max-w-[min(100vw,760px)] shrink-0 items-center justify-center overflow-hidden lg:h-[min(88vh,780px)] lg:max-w-[780px]">
            <ScentRing />
            {BOTTLES.map((bottle) => (
              <MotionImage
                key={bottle.src}
                src={bottle.src}
                alt=""
                width={bottle.width}
                height={bottle.height}
                sizes={bottle.sizes}
                className={`pointer-events-none absolute hidden h-auto -translate-x-1/2 -translate-y-1/2 object-contain lg:block ${bottle.className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: bottle.delay,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="animate-scroll-line h-10 w-0.5 rounded-full bg-[var(--accent-cyan)]" />
        <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Scroll
        </span>
      </div>
    </section>
  );
}
