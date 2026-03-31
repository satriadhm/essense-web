"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { communityPosts, suggestedUsers } from "@/lib/fragrance-data";

export function CommunitySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      id="community"
      className="px-[max(5vw,40px)] py-[120px]"
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

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {communityPosts.map((post, i) => (
            <motion.div
              key={post.id}
              style={{ y: i % 2 === 0 ? yLeft : yRight }}
              className="mb-6 break-inside-avoid"
            >
              <GlassCard padding={20} className="text-left">
                <div className="flex items-center gap-3">
                  <span
                    className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)] opacity-80"
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
                <div
                  className="mx-auto h-12 w-12 rounded-full"
                  style={{ background: u.color }}
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
