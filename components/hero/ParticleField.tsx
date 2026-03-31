"use client";

import { useEffect, useRef } from "react";

const N = 80;
const COLORS = ["#7B5CF0", "#4DD9FF"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
  c: string;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particles = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.2 - Math.random() * 0.4,
        r: 1 + Math.random() * 2,
        o: 0.1 + Math.random() * 0.3,
        c: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = h + Math.random() * 40;
          p.x = Math.random() * w;
        }
        ctx.globalAlpha = p.o;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
