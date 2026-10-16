"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal rail with snap points and prev/next controls. The tiles are
 * server-rendered and passed in as children, so every link is in the HTML.
 * Native touch / trackpad scrolling works without the buttons.
 */
export function IndustryRail({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdge({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    return () => resize.disconnect();
  }, [measure]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-ink-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-500 hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button type="button" aria-label={`Previous ${label}`} disabled={edge.start} onClick={() => scrollBy(-1)} className={buttonClass}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" aria-label={`Next ${label}`} disabled={edge.end} onClick={() => scrollBy(1)} className={buttonClass}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={measure}
          tabIndex={0}
          role="region"
          aria-label={label}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
