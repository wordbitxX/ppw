"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal pill rail with prev/next arrow controls.
 *
 * Below `lg` the track is one scrollable line and the two round arrow
 * buttons flank it, so it is obvious the row continues sideways (owner
 * request, 16 Oct — used by the hero service pills and the "Built for"
 * sector rail). At `lg` and up the track switches to wrapping (pass
 * `lg:flex-wrap` in `trackClassName`), every item stays visible at once,
 * and the arrows plus edge fades drop out.
 *
 * Children are server-rendered links passed in as `children`, so every
 * link stays in the HTML for crawlers. Native touch / trackpad scrolling
 * works alongside the buttons; edge detection disables the button you
 * cannot move towards and fades the matching side gradient out.
 */
export function ScrollRail({
  label,
  className = "",
  trackClassName = "",
  fadeClassName = "from-midnight via-midnight/75 to-transparent",
  children,
}: {
  /** Accessible name for the scrollable track. */
  label: string;
  /** Classes for the outer row (sizing / centering of the whole rail). */
  className?: string;
  /** Classes for the scrollable track itself (flex, wrap, text, snap…). */
  trackClassName?: string;
  /** Gradient stops for the left/right edge fades (Tailwind from-/via-/to-). */
  fadeClassName?: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.scrollLeft <= 4;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    // Self-hosted webfonts change pill widths once they swap in without the
    // track itself resizing — re-measure so the arrow enabled/disabled states
    // never go stale (a wrongly-disabled arrow would swallow the click).
    void document.fonts?.ready.then(() => measure());
    return () => resize.disconnect();
  }, [measure]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const delta = direction * Math.max(track.clientWidth * 0.85, 120);
    const before = track.scrollLeft;
    try {
      track.scrollBy({ left: delta, behavior: "smooth" });
    } catch {
      // Engines that reject the options object — fall back to instant scroll.
      track.scrollLeft = before + delta;
      measure();
      return;
    }
    // Engines that silently ignore the options object never move; give the
    // smooth animation a beat, then force the jump if nothing happened and
    // re-measure so the edge fades / button states catch up.
    window.setTimeout(() => {
      const t = trackRef.current;
      if (!t) return;
      if (t.scrollLeft === before) t.scrollLeft = before + delta;
      measure();
    }, 350);
  };

  const arrowClass =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-slate-300 backdrop-blur-sm transition hover:border-arc-300/60 hover:bg-white/[0.12] hover:text-arc-300 active:scale-90 disabled:pointer-events-none disabled:opacity-30 lg:hidden";

  const chevron = (d: string) => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );

  return (
    <div className={`flex min-w-0 items-center gap-1.5 ${className}`}>
      <button
        type="button"
        aria-label={`Scroll ${label} backwards`}
        disabled={edge.start}
        onClick={() => scrollBy(-1)}
        className={arrowClass}
      >
        {chevron("M15 5l-7 7 7 7")}
      </button>

      <div className="relative min-w-0 flex-1">
        <div
          ref={trackRef}
          onScroll={measure}
          tabIndex={0}
          role="region"
          aria-label={label}
          className={trackClassName}
        >
          {children}
        </div>

        {/* Edge fades — only while there is something left to scroll to
            that side; both hide at lg+ where the track wraps instead. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r transition-opacity duration-200 lg:hidden ${fadeClassName} ${
            edge.start ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l transition-opacity duration-200 lg:hidden ${fadeClassName} ${
            edge.end ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <button
        type="button"
        aria-label={`Scroll ${label} forwards`}
        disabled={edge.end}
        onClick={() => scrollBy(1)}
        className={arrowClass}
      >
        {chevron("M9 5l7 7-7 7")}
      </button>
    </div>
  );
}
