"use client";

import {
  useCallback,
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
import { BIOMETRIC_SCAN_SECONDS } from "@/lib/site-constants";
import { profileImagesOrdered } from "@/lib/profile-images";
import Image from "next/image";

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
          <FragranceTag name="L'Oréal Homme Intense" />
          <FragranceTag name="L'Oréal Homme Sport" />
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
          Place your finger on the Essense device. In {BIOMETRIC_SCAN_SECONDS}{" "}
          seconds, it captures your skin&apos;s temperature, conductance, and sebum
          profile.
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
          {profileImagesOrdered.map((img, i) => (
            <Image
              key={img.src}
              src={img}
              alt=""
              className="h-10 w-10 rounded-full border-2 border-[var(--bg-deep)] object-cover"
              sizes="40px"
              priority={i === 0}
            />
          ))}
        </div>
        <p className="relative z-[1] mt-4 text-sm text-[var(--text-muted)]">
          Join 10,000+ fragrance enthusiasts
        </p>
      </div>
    ),
  },
];

function MobileStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const touchStartXRef = useRef(0);
  const touchDeltaRef = useRef(0);
  const isPausedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const mobileSteps = desktopSteps.slice(1);
  const MOBILE_AUTOPLAY_MS = 3200;
  const SWIPE_THRESHOLD = 48;
  const GAP = 16;

  const CARD_WIDTH = useCallback(() => window.innerWidth - 80, []);
  const getOffset = useCallback(
    (idx: number) => idx * (CARD_WIDTH() + GAP),
    [CARD_WIDTH],
  );

  const applyTrackTransform = useCallback(
    (step: number, delta = 0, withTransition = true) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = withTransition
        ? "transform 400ms cubic-bezier(0.16,1,0.3,1)"
        : "none";
      track.style.transform = `translateX(calc(40px - ${getOffset(step)}px + ${delta}px))`;
    },
    [getOffset],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev < mobileSteps.length - 1) {
          return prev + 1;
        }
        window.setTimeout(() => {
          setActiveStep(0);
        }, 150);
        return prev;
      });
    }, MOBILE_AUTOPLAY_MS);
  }, [mobileSteps.length, stopAutoplay]);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
      startAutoplay();
    }, 1200);
  }, [startAutoplay]);

  useEffect(() => {
    applyTrackTransform(activeStep);
  }, [activeStep, applyTrackTransform]);

  useEffect(() => {
    applyTrackTransform(activeStep, 0, false);
    const onResize = () => applyTrackTransform(activeStep, 0, false);
    window.addEventListener("resize", onResize);
    startAutoplay();
    return () => {
      window.removeEventListener("resize", onResize);
      stopAutoplay();
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [activeStep, applyTrackTransform, startAutoplay, stopAutoplay]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? 0;
    touchDeltaRef.current = 0;
    isPausedRef.current = true;
    stopAutoplay();
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const x = e.touches[0]?.clientX ?? touchStartXRef.current;
    const delta = x - touchStartXRef.current;
    touchDeltaRef.current = delta;
    applyTrackTransform(activeStep, delta, false);
  };

  const onTouchEnd = () => {
    const delta = touchDeltaRef.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      setActiveStep((prev) => {
        const next = delta < 0 ? prev + 1 : prev - 1;
        return Math.max(0, Math.min(mobileSteps.length - 1, next));
      });
    } else {
      applyTrackTransform(activeStep);
    }
    touchDeltaRef.current = 0;
    scheduleResume();
  };

  return (
    <div className="pb-12 pt-16 lg:hidden">
      <style>{`
        @keyframes dotFill {
          from { width: 8px; }
          to { width: 24px; }
        }
      `}</style>
      <div className="px-[max(5vw,40px)]">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
          How it works
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-[length:var(--text-h2)] font-extrabold text-[var(--text-primary)]">
          Four moments. One perfect formula.
        </h2>
      </div>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="mt-10 overflow-x-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-row gap-4 will-change-transform transition-transform duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        >
          {mobileSteps.map((s, i) => (
            <div
              key={s.key}
              className="snap-center w-[calc(100vw-80px)] flex-shrink-0"
            >
              <ScrollReveal delay={i * 60}>
                <div
                  aria-label={
                    activeStep === i
                      ? `How Essense works, step ${i + 1} of ${mobileSteps.length}`
                      : undefined
                  }
                  className={`overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-mid)] shadow-[0_8px_40px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                    activeStep === i ? "scale-100 opacity-100" : "scale-[0.93] opacity-60"
                  }`}
                >
                  {s.content}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {mobileSteps.map((s, i) => (
          <button
            key={`mobile-dot-${s.key}`}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => {
              if (resumeTimeoutRef.current !== null) {
                window.clearTimeout(resumeTimeoutRef.current);
              }
              isPausedRef.current = false;
              setActiveStep(i);
              startAutoplay();
            }}
            className={`relative overflow-hidden rounded-full ${
              activeStep === i
                ? "h-2 w-6 bg-[var(--bg-surface)]"
                : "h-2 w-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            }`}
          >
            {activeStep === i ? (
              <span
                key={`dot-fill-${activeStep}`}
                className="absolute left-0 top-0 block h-2 w-2 rounded-full bg-[var(--accent-cyan)]"
                style={{ animation: `dotFill ${MOBILE_AUTOPLAY_MS}ms linear forwards` }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

const AUTOPLAY_MS = 1000;

/** Steps s1–s4 only (panels at index 1–4; intro is index 0). */
const STEP_PANEL_START = 1;
const STEP_COUNT = 4;

export function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const panelLeftsRef = useRef<number[]>([]);
  const programmaticScrollRef = useRef(false);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const introModeRef = useRef(true);

  const [desktop, setDesktop] = useState(false);
  /** s1–s4 only: index 0 → panel 1, … index 3 → panel 4 */
  const [currentStep, setCurrentStep] = useState(0);
  /** True when horizontal position is still on the intro panel */
  const [introMode, setIntroMode] = useState(true);

  useEffect(() => {
    introModeRef.current = introMode;
  }, [introMode]);
  const [hoverTrack, setHoverTrack] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  /** Bump to reset the autoplay interval after dot click */
  const [autoplayKey, setAutoplayKey] = useState(0);
  /** False while user is wheeling/scrolling; pauses autoplay until idle debounce */
  const [scrollIdle, setScrollIdle] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    startTransition(() => setDesktop(mq.matches));
    const fn = () => startTransition(() => setDesktop(mq.matches));
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setSectionInView(e.isIntersecting),
      { threshold: 0.12, rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [desktop]);

  /** Pause autoplay while the user is actively scrolling (not our programmatic tween). */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      setScrollIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setScrollIdle(true), 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  useLayoutEffect(() => {
    if (!desktop) return;
    const section = pinRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measurePanels = () => {
      const children = Array.from(track.children) as HTMLElement[];
      panelLeftsRef.current = children.map((c) => c.offsetLeft);
    };
    measurePanels();

    const maxX = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -maxX(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () =>
          `+=${Math.max(track.scrollWidth - window.innerWidth + 500, 0)}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measurePanels();
        },
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
          if (programmaticScrollRef.current) return;

          const mx = maxX();
          if (mx <= 0) return;
          const xAmount = self.progress * mx;
          const lefts = panelLeftsRef.current;
          if (lefts.length < STEP_PANEL_START + STEP_COUNT) return;

          if (xAmount < lefts[STEP_PANEL_START] - 32) {
            setIntroMode(true);
            return;
          }
          setIntroMode(false);
          let s = 0;
          for (let i = 0; i < STEP_COUNT; i++) {
            const panelIdx = STEP_PANEL_START + i;
            if (xAmount >= lefts[panelIdx] - 24) s = i;
          }
          setCurrentStep(s);
        },
      },
    });

    stRef.current = tween.scrollTrigger ?? null;

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      stRef.current = null;
    };
  }, [desktop]);

  /**
   * Animates to s1–s4 by tweening scrollY so ScrollTrigger scrub stays authoritative
   * (same end x as gsap.to(track, { x: -offsetLeft })).
   */
  const animateToContentStep = useCallback((step: number) => {
    const track = trackRef.current;
    const st = stRef.current;
    if (!track || !st) return;
    const lefts = panelLeftsRef.current;
    const panelIdx =
      STEP_PANEL_START + Math.max(0, Math.min(STEP_COUNT - 1, step));
    const offset = lefts[panelIdx] ?? 0;
    const mx = Math.max(1, track.scrollWidth - window.innerWidth);
    const p = Math.min(1, offset / mx);
    const start = st.start as number;
    const end = st.end as number;
    const targetY = start + p * (end - start);

    scrollTweenRef.current?.kill();
    programmaticScrollRef.current = true;
    const o = { y: window.scrollY };
    scrollTweenRef.current = gsap.to(o, {
      y: targetY,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        window.scrollTo(0, o.y);
      },
      onComplete: () => {
        programmaticScrollRef.current = false;
        scrollTweenRef.current = null;
        setIntroMode(false);
        setCurrentStep(Math.max(0, Math.min(STEP_COUNT - 1, step)));
      },
    });
  }, []);

  useEffect(() => {
    if (!desktop || !sectionInView || hoverTrack || !scrollIdle) {
      return;
    }
    const id = window.setInterval(() => {
      if (introModeRef.current) {
        requestAnimationFrame(() => animateToContentStep(0));
        return;
      }
      setCurrentStep((prev) => {
        const next = (prev + 1) % STEP_COUNT;
        requestAnimationFrame(() => animateToContentStep(next));
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [
    desktop,
    sectionInView,
    hoverTrack,
    scrollIdle,
    autoplayKey,
    animateToContentStep,
  ]);

  const onDotClick = (step: number) => {
    setCurrentStep(step);
    setAutoplayKey((k) => k + 1);
    scrollTweenRef.current?.kill();
    animateToContentStep(step);
  };

  useEffect(
    () => () => {
      scrollTweenRef.current?.kill();
    },
    [],
  );

  return (
    <section id="how-it-works" className="relative bg-[var(--bg-deep)]">
      <MobileStack />
      <div ref={pinRef} className="relative hidden h-[100vh] lg:block">
        <div className="sticky top-0 flex h-[100vh] flex-col overflow-hidden">
          <div
            ref={trackRef}
            onMouseEnter={() => setHoverTrack(true)}
            onMouseLeave={() => setHoverTrack(false)}
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
          <div className="h-auto w-full px-[max(5vw,40px)] pb-2 pt-2">
            <div className="h-px w-full bg-[var(--bg-surface)]">
              <div
                ref={progressRef}
                className="h-px bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
                style={{ width: "0%" }}
              />
            </div>
            <div
              className="mt-3 hidden justify-center gap-2 lg:flex"
              role="tablist"
              aria-label="How it works steps"
            >
              {([0, 1, 2, 3] as const).map((i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={!introMode && currentStep === i}
                  aria-label={`Step ${i + 1}`}
                  onClick={() => onDotClick(i)}
                  className={`rounded-full transition-[width,background-color] ${
                    !introMode && currentStep === i
                      ? "h-2 w-6 bg-[var(--accent-cyan)]"
                      : "h-2 w-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
