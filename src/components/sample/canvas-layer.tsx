"use client";

import { useEffect, useRef } from "react";

export type Frame = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** seconds since the layer started */
  t: number;
  /** seconds since the previous frame (clamped) */
  dt: number;
  pointer: { x: number; y: number; active: boolean };
};

/**
 * A small canvas runner for the hero concepts.
 *  - draws only while the section is on screen (IntersectionObserver);
 *  - caps DPR at 2 and resizes with its parent (ResizeObserver);
 *  - tracks mouse AND touch through pointer events on the enclosing <section>
 *    (the canvas itself is pointer-events-none, so it never blocks links);
 *  - with prefers-reduced-motion it paints a single still frame.
 */
export function CanvasLayer<S>({
  init,
  draw,
  className = "",
}: {
  init?: (w: number, h: number) => S;
  draw: (frame: Frame, state: S) => void;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const section = canvas.closest("section") ?? host;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let state = undefined as S;
    let raf = 0;
    let visible = false;
    let last = 0;
    let t = 0;
    const pointer = { x: 0.5, y: 0.5, active: false };

    const paint = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      draw({ ctx, w, h, t, dt, pointer: { x: pointer.x * w, y: pointer.y * h, active: pointer.active } }, state);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state = init ? init(w, h) : (undefined as S);
      if (reduce) {
        t = 2.5;
        paint(performance.now());
      }
    };

    const loop = (now: number) => {
      if (!visible) return;
      paint(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (event: Event) => {
      const e = event as PointerEvent;
      const rect = host.getBoundingClientRect();
      pointer.x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      pointer.y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          cancelAnimationFrame(raf);
          if (visible) {
            last = performance.now();
            raf = requestAnimationFrame(loop);
          }
        },
        { rootMargin: "80px" },
      );
      io.observe(host);
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerdown", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave, { passive: true });
      section.addEventListener("pointerup", onLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerup", onLeave);
    };
    // The draw/init closures are static per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
