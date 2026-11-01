"use client";

import { useEffect, useState } from "react";

export type PriceShowcaseSlide = {
  id: string;
  src: string;
  alt: string;
  /** Small label over the frame — "Live demo", "Our product". */
  label: string;
  title: string;
  href: string;
  host: string;
};

const INTERVAL_MS = 4000;

/**
 * Small auto-rotating work reel inside the price block.
 *
 * Why it exists: the price panel is the first thing a visitor sees on the
 * website service page, and it was pure text. A slow, quiet rotation of three
 * things we actually built puts proof next to the price without turning the
 * page into a carousel.
 *
 * Rules: pauses on hover and on focus-within, and does not run at all under
 * `prefers-reduced-motion` (the dots remain as manual controls). Every slide is
 * rendered in the HTML, so the links stay crawlable.
 */
export function PriceShowcaseReel({ slides }: { slides: PriceShowcaseSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="A few of the builds WordbitX has shipped"
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12 bg-navy-950 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]"
      >
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <a
              key={slide.id}
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-transparent" />
              <span className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-midnight/70 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-300 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  {slide.label}
                </span>
                <span className="rounded-full bg-midnight/70 px-2.5 py-1 text-[0.62rem] font-medium text-slate-200 backdrop-blur">
                  {slide.host} ↗
                </span>
              </span>
              <span className="absolute inset-x-3 bottom-3 block">
                <span className="block text-sm font-semibold leading-snug text-white">{slide.title}</span>
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[0.7rem] font-medium text-slate-400">Work we have shipped · {active + 1} / {slides.length}</p>
        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-5 bg-brand-400" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
