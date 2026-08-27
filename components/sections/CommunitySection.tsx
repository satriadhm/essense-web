"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { communityPosts, suggestedUsers } from "@/lib/fragrance-data";

const AUTOPLAY_MS = 3500;
/** How long to wait after a manual interaction before autoplay resumes. */
const RESUME_MS = 6000;

type CommunityPost = (typeof communityPosts)[number];

function StatIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

const ICON_HEART =
  "M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.7C19 15.6 12 20 12 20Z";
const ICON_COMMENT = "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z";
const ICON_SHARE = "M4 20 20 4M20 4h-8M20 4v8";

/**
 * One community post. Previously this markup existed twice — once for the
 * mobile slider and once for the desktop masonry — so any style change had to
 * be made in both copies.
 */
function CommunityPostCard({ post }: { post: CommunityPost }) {
  return (
    <GlassCard padding={20} className="text-left">
      <div className="flex items-center gap-3">
        <Image
          src={post.avatarSrc}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[var(--border-subtle)]"
          sizes="36px"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm font-semibold">
            {post.user}
          </p>
          <span className="text-label text-[var(--accent-cyan)]">{post.tag}</span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
        {post.text}
      </p>
      {post.formula && (
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-deep)]"
          aria-hidden
        >
          <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]" />
        </div>
      )}
      <div className="mt-4 flex gap-4 text-xs text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <StatIcon path={ICON_HEART} />
          {post.likes}
          <span className="sr-only">likes</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatIcon path={ICON_COMMENT} />
          {post.comments}
          <span className="sr-only">comments</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatIcon path={ICON_SHARE} />
          {post.shares}
          <span className="sr-only">shares</span>
        </span>
      </div>
    </GlassCard>
  );
}

export function CommunitySection() {
  const ref = useRef<HTMLElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /** Pause autoplay on interaction, then resume after a quiet period. */
  const pauseThenResume = useCallback(() => {
    setPaused(true);
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    },
    [],
  );

  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider || isDesktop || paused) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % communityPosts.length;
        slider.scrollTo({ left: next * slider.clientWidth, behavior: "smooth" });
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [isDesktop, paused]);

  const onMobileScroll = () => {
    const slider = mobileSliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / Math.max(1, slider.clientWidth));
    setActiveIndex(Math.max(0, Math.min(communityPosts.length - 1, idx)));
  };

  const goTo = (i: number) => {
    const slider = mobileSliderRef.current;
    if (!slider) return;
    pauseThenResume();
    slider.scrollTo({ left: i * slider.clientWidth, behavior: "smooth" });
    setActiveIndex(i);
  };

  return (
    <section
      ref={ref}
      id="community"
      className="relative px-[max(5vw,40px)] py-[60px] lg:py-[120px]"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-mid) 45%, var(--bg-deep) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1100px] text-center">
        <ScrollReveal>
          <SectionKicker>Community</SectionKicker>
          <h2 className="mt-4 font-heading text-section font-extrabold text-[var(--text-primary)]">
            What other people are wearing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Share your formulas, follow people whose taste you like, and earn
            Essense Club points.
          </p>
        </ScrollReveal>

        <div
          ref={mobileSliderRef}
          onScroll={onMobileScroll}
          onTouchStart={pauseThenResume}
          className="scrollbar-none mt-16 flex snap-x snap-mandatory scroll-smooth overflow-x-auto md:hidden"
        >
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="min-w-full snap-center px-[max(5vw,24px)]"
            >
              <CommunityPostCard post={post} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {communityPosts.map((post, i) => (
            <button
              key={`community-dot-${post.id}`}
              type="button"
              aria-label={`Go to community post ${i + 1}`}
              aria-current={activeIndex === i}
              onClick={() => goTo(i)}
              className={`focus-ring rounded-full transition-[width,background-color] ${
                activeIndex === i
                  ? "h-2 w-6 bg-[var(--accent-cyan)]"
                  : "h-2 w-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              }`}
            />
          ))}
        </div>

        <div className="mt-16 hidden md:block md:columns-2 md:gap-6 lg:columns-3">
          {communityPosts.map((post, i) => (
            <ParallaxColumnItem
              key={`desktop-${post.id}`}
              y={isDesktop ? (i % 2 === 0 ? yLeft : yRight) : undefined}
            >
              <CommunityPostCard post={post} />
            </ParallaxColumnItem>
          ))}
        </div>

        {/*
         * Suggested-people strip. The Follow buttons are illustrative and have
         * no behaviour yet, so the strip is presented as decoration rather than
         * as a row of controls that do nothing when activated.
         *
         * The inner track is `w-max mx-auto` instead of `justify-center`:
         * a centred flex container clips its own leading items once the
         * content overflows, putting the first card out of scroll reach.
         */}
        <div
          className="mt-16 overflow-x-auto pb-2"
          aria-hidden
          inert
        >
          <div className="mx-auto flex w-max gap-4">
            {suggestedUsers.map((u) => (
              <div
                key={u.name}
                className="w-[170px] shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-4 text-left backdrop-blur-md"
              >
                <Image
                  src={u.imageSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="mx-auto h-12 w-12 rounded-full object-cover ring-1 ring-[var(--border-subtle)]"
                  sizes="48px"
                />
                <p className="mt-3 text-center font-heading text-sm font-bold">
                  {u.name}
                </p>
                <p className="text-center text-label text-[var(--text-muted)]">
                  {u.tag}
                </p>
                <p className="mt-3 w-full rounded-full border border-[var(--border-active)] py-1.5 text-center text-xs text-[var(--accent-cyan)]">
                  Follow
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxColumnItem({
  y,
  children,
}: {
  y?: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div style={y ? { y } : undefined} className="break-inside-avoid md:mb-6">
      {children}
    </motion.div>
  );
}
