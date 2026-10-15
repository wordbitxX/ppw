"use client";

import { Children, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Horizontal hero carousel.
 *  - advances every `interval` ms, pauses on mouse hover / keyboard focus and
 *    while the hero is off screen;
 *  - swipe (touch) or drag (mouse) left/right, arrow buttons and dots;
 *  - slides that are not showing are `inert` + aria-hidden;
 *  - prefers-reduced-motion: no autoplay and no slide animation (manual only).
 */
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function HeroSlider({ children, labels, interval = 5000 }: { children: ReactNode; labels: string[]; interval?: number }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView || count < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(id);
  }, [index, reduced, paused, inView, count, interval]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="WordbitX highlights"
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-x-clip [touch-action:pan-y]"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = drag.current;
          drag.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div
          className={`flex ${reduced ? "" : "transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{ transform: `translate3d(-${index * 100}%,0,0)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${labels[i] ?? ""}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="relative basis-full shrink-0 grow-0"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-colors hover:border-arc-300/60 hover:bg-white/[0.12] lg:grid"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 6-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-colors hover:border-arc-300/60 hover:bg-white/[0.12] lg:grid"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center gap-2.5 sm:bottom-14" role="tablist" aria-label="Choose slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}: ${labels[i] ?? ""}`}
            onClick={() => go(i)}
            className="group grid h-6 place-items-center px-0.5"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-9 bg-arc-300" : "w-3 bg-white/30 group-hover:bg-white/60"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
