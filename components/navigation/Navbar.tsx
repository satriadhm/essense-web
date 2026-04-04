"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#community", label: "Community" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = LINKS.map((l) =>
      document.querySelector(l.href.replace("#", "#")),
    ).filter(Boolean) as Element[];

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id;
            setActive(id || "home");
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: 1, pointerEvents: "auto" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-[max(env(safe-area-inset-top),0.75rem)] md:px-0 md:pt-4"
      >
        <nav
          className={cn(
            "hidden items-center gap-6 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-7 py-3 backdrop-blur-[20px] md:flex",
          )}
          aria-label="Main"
        >
          <a href="#home" className="flex items-center" data-cursor="pointer" aria-label="Essense home">
            <Image
              src="/app_logo.png"
              alt="Essense logo"
              width={34}
              height={34}
              className="h-8 w-8 rounded-[10px]"
              priority
            />
          </a>
          <div className="flex items-center gap-8">
            {LINKS.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent-cyan)]"
                  data-cursor="pointer"
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--glow-cyan)]" />
                  )}
                </a>
              );
            })}
          </div>
          <button
            type="button"
            className="relative ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--accent-cyan)] transition hover:border-[var(--border-active)]"
            aria-label="Download"
            data-cursor="pointer"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-cyan)] opacity-20" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>

        <div className="flex w-full max-w-[380px] items-center justify-between rounded-full border border-[var(--border-active)] bg-[color:color-mix(in_srgb,var(--bg-mid)_86%,black)] px-4 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-[20px] md:hidden">
          <a href="#home" className="flex items-center" aria-label="Essense home">
            <Image
              src="/app_logo.png"
              alt="Essense logo"
              width={30}
              height={30}
              className="h-7 w-7 rounded-[8px]"
              priority
            />
          </a>
          <button
            type="button"
            className="font-heading text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[var(--bg-deep)] md:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                type="button"
                className="font-heading text-sm uppercase text-[var(--text-muted)]"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-8 px-10 pt-8">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-heading text-[40px] font-bold leading-none text-[var(--text-primary)]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
