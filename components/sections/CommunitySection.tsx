"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { communityPosts, suggestedUsers } from "@/lib/fragrance-data";

export function CommunitySection() {
  const ref = useRef<HTMLElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider || isDesktop) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % communityPosts.length;
        slider.scrollTo({
          left: next * slider.clientWidth,
          behavior: "smooth",
        });
        return next;
      });
    }, 3500);

    return () => window.clearInterval(id);
  }, [isDesktop]);

  const onMobileScroll = () => {
    const slider = mobileSliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / Math.max(1, slider.clientWidth));
    setActiveIndex(Math.max(0, Math.min(communityPosts.length - 1, idx)));
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
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-cyan)]">
            Community
          </p>
          <h2 className="mt-4 font-heading text-[length:var(--text-h2)] font-extrabold text-[var(--text-primary)]">
            Scent enthusiasts. One feed.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Discover what others are wearing. Share your formulas. Earn Essense
            Club points.
          </p>
        </ScrollReveal>

        <div
          ref={mobileSliderRef}
          onScroll={onMobileScroll}
          className="mt-16 flex snap-x snap-mandatory overflow-x-auto scroll-smooth md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {communityPosts.map((post, i) => (
            <motion.div
              key={post.id}
              className="min-w-full snap-center px-[max(5vw,24px)]"
            >
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
                    <span className="text-[11px] text-[var(--accent-cyan)]">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {post.text}
                </p>
                {post.formula && (
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-deep)]">
                    <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]" />
                  </div>
                )}
                <div className="mt-4 flex gap-4 text-xs text-[var(--text-muted)]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>↗️ {post.shares}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {communityPosts.map((post, i) => (
            <button
              key={`community-dot-${post.id}`}
              type="button"
              aria-label={`Go to community post ${i + 1}`}
              onClick={() => {
                const slider = mobileSliderRef.current;
                if (!slider) return;
                slider.scrollTo({
                  left: i * slider.clientWidth,
                  behavior: "smooth",
                });
                setActiveIndex(i);
              }}
              className={`rounded-full transition-[width,background-color] ${
                activeIndex === i
                  ? "h-2 w-6 bg-[var(--accent-cyan)]"
                  : "h-2 w-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              }`}
            />
          ))}
        </div>

        <div className="mt-16 hidden md:block md:columns-2 md:gap-6 lg:columns-3">
          {communityPosts.map((post, i) => (
            <motion.div
              key={`desktop-${post.id}`}
              style={isDesktop ? { y: i % 2 === 0 ? yLeft : yRight } : undefined}
              className="break-inside-avoid md:mb-6"
            >
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
                    <span className="text-[11px] text-[var(--accent-cyan)]">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {post.text}
                </p>
                {post.formula && (
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-deep)]">
                    <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]" />
                  </div>
                )}
                <div className="mt-4 flex gap-4 text-xs text-[var(--text-muted)]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>↗️ {post.shares}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-x-auto pb-2">
          <div className="flex min-w-min justify-center gap-4">
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
                <p className="text-center text-[11px] text-[var(--text-muted)]">
                  {u.tag}
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full border border-[var(--border-active)] py-1.5 text-xs text-[var(--accent-cyan)]"
                  data-cursor="pointer"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
