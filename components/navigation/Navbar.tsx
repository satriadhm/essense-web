"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DOWNLOAD_URL } from "@/lib/site-constants";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#mia", label: "Mia" },
  { href: "#community", label: "Community" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[];

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id || "home");
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /*
   * Modal behaviour for the mobile menu: lock the page behind it, close on
   * Escape, and keep Tab inside the panel. Without this the menu covered the
   * page while focus and scrolling stayed on the content underneath it.
   */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = menuRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-[max(env(safe-area-inset-top),0.75rem)] md:px-0 md:pt-4">
        <nav
          className="hidden items-center gap-6 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-7 py-3 backdrop-blur-[20px] md:flex"
          aria-label="Main"
        >
          <a
            href="#home"
            className="focus-ring flex items-center rounded-[10px]"
            aria-label="Essense home"
          >
            <Image
              src="/app_logo.png"
              alt="Essense logo"
              width={34}
              height={34}
              className="h-8 w-8 rounded-[10px]"
              loading="eager"
            />
          </a>
          <div className="flex items-center gap-8">
            {LINKS.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`focus-ring group relative rounded font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[var(--accent-cyan)] ${
                    isActive
                      ? "text-[var(--accent-cyan)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--glow-cyan)]" />
                  )}
                </a>
              );
            })}
          </div>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--accent-cyan)] transition hover:border-[var(--border-active)]"
            aria-label="Download the beta build"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </nav>

        <div className="flex w-full max-w-[380px] items-center justify-between rounded-full border border-[var(--border-active)] bg-[rgba(13,17,40,0.88)] px-4 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-[20px] md:hidden">
          <a
            href="#home"
            className="focus-ring flex items-center rounded-[8px]"
            aria-label="Essense home"
          >
            <Image
              src="/app_logo.png"
              alt="Essense logo"
              width={30}
              height={30}
              className="h-7 w-7 rounded-[8px]"
              loading="eager"
            />
          </a>
          <button
            ref={triggerRef}
            type="button"
            className="focus-ring rounded px-1 font-heading text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[var(--bg-deep)] md:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                type="button"
                data-autofocus
                className="focus-ring rounded px-1 font-heading text-sm uppercase text-[var(--text-secondary)]"
                onClick={close}
              >
                Close
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-8 px-10 pt-8">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="focus-ring rounded font-heading text-[40px] font-bold leading-none text-[var(--text-primary)]"
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
