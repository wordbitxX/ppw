"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive "connected nodes" layer for the hero, plus a light pointer
 * parallax on the art.
 *
 * Design constraints (see the brief):
 *  - Subtle. Hairline links at low alpha, in the same icy-cyan as the art, and
 *    masked out toward the copy so it never competes with the headline.
 *  - Pointer-aware: nodes near the cursor / finger connect to it and drift
 *    away gently. A click or tap sends a soft ripple through the network.
 *  - Touch-safe: the canvas never captures events (pointer-events: none) —
 *    listeners live on the hero section, are passive, and never block scroll.
 *  - Cheap: DPR capped at 1.5, node count scaled to the viewport, a single
 *    rAF loop that stops when the hero is off screen or the tab is hidden.
 *  - Graceful: reduced motion → one static frame, no loop, no parallax.
 *    Low-power hints (Save-Data, ≤2 cores, ≤2 GB) → a smaller, slower network.
 *    No canvas 2D support → renders nothing; the art underneath is complete.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number };

type Nav = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function HeroFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.closest("section") as HTMLElement | null;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nav = navigator as Nav;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowPower =
      Boolean(nav.connection?.saveData) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples: { x: number; y: number; t: number }[] = [];
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    const LINK = () => (width < 640 ? 110 : 150);
    const POINTER_R = () => (width < 640 ? 130 : 180);

    const seed = () => {
      const area = width * height;
      const density = lowPower ? 22000 : 15000;
      const count = Math.max(18, Math.min(lowPower ? 36 : 80, Math.round(area / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.7 + Math.random() * 1.2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const link = LINK();
      const pr = POINTER_R();
      const link2 = link * link;

      for (const n of nodes) {
        // Gentle repulsion so the network "breathes" around the pointer.
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < pr * pr && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / pr) * 0.05;
            n.vx += (dx / Math.sqrt(d2)) * f;
            n.vy += (dy / Math.sqrt(d2)) * f;
          }
        }
        for (const rp of ripples) {
          const age = now - rp.t;
          const radius = age * 0.35;
          const dx = n.x - rp.x;
          const dy = n.y - rp.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(d - radius) < 26 && d > 1) {
            const f = 0.12 * (1 - age / 1400);
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        // Keep a baseline drift so nodes never freeze.
        if (Math.abs(n.vx) + Math.abs(n.vy) < 0.05) {
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        else if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        else if (n.y > height + 10) n.y = -10;
      }
      while (ripples.length && now - ripples[0].t > 1400) ripples.shift();

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < link2) {
            const alpha = (1 - d2 / link2) * 0.22;
            ctx.strokeStyle = `rgba(127,220,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < pr * pr) {
            const alpha = (1 - Math.sqrt(d2) / pr) * 0.55;
            ctx.strokeStyle = `rgba(191,238,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(191,238,255,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const rp of ripples) {
        const age = now - rp.t;
        ctx.strokeStyle = `rgba(127,220,255,${(0.28 * (1 - age / 1400)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, age * 0.35, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      draw(now);
      parallax.x += (parallax.tx - parallax.x) * 0.06;
      parallax.y += (parallax.ty - parallax.y) * 0.06;
      host.style.setProperty("--hero-px", parallax.x.toFixed(3));
      host.style.setProperty("--hero-py", parallax.y.toFixed(3));
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedQuery.matches || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top, rect };
    };
    const onMove = (event: PointerEvent) => {
      const { x, y, rect } = local(event);
      pointer.x = x;
      pointer.y = y;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      parallax.tx = (x / rect.width - 0.5) * 2;
      parallax.ty = (y / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.active = false;
      parallax.tx = 0;
      parallax.ty = 0;
    };
    const onDown = (event: PointerEvent) => {
      // Ignore taps on links/buttons so the effect never competes with conversion.
      if ((event.target as HTMLElement | null)?.closest("a, button, input, textarea, select")) return;
      const { x, y } = local(event);
      ripples.push({ x, y, t: performance.now() });
      pointer.x = x;
      pointer.y = y;
      pointer.active = event.pointerType !== "touch";
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") pointer.active = false;
    };

    const onReduced = () => {
      if (reducedQuery.matches) {
        stop();
        host.style.removeProperty("--hero-px");
        host.style.removeProperty("--hero-py");
        draw(0);
      } else {
        start();
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    const ro = new ResizeObserver(() => resize());

    resize();
    io.observe(host);
    ro.observe(canvas);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    host.addEventListener("pointerdown", onDown, { passive: true });
    host.addEventListener("pointerup", onUp, { passive: true });
    host.addEventListener("pointercancel", onUp, { passive: true });
    reducedQuery.addEventListener("change", onReduced);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      reducedQuery.removeEventListener("change", onReduced);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="cine-mask-hole pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
