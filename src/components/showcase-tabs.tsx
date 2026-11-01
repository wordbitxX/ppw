"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type ShowcaseTabItem = {
  id: string;
  name: string;
  category: string;
  /** "Live" marks the product we run ourselves. */
  badge?: string;
  /** Server-rendered panel. Every panel is in the HTML, so every link on it is
   *  crawlable even while its tab is not the selected one. */
  panel: ReactNode;
};

/**
 * Project switcher: a list on the left, one large preview on the right.
 * Below `lg`, both the chip list and full previews scroll horizontally.
 * Desktop keeps the original single-panel layout; previews can also auto-advance.
 */

const AUTO_ADVANCE_MS = 6000;

export function ShowcaseTabs({ items, footer }: { items: ShowcaseTabItem[]; footer?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [motionOverride, setMotionOverride] = useState(false);
  /* True only after the visitor presses "Play auto-rotation". An explicit play
     wins over the hover pause — otherwise the timer could never run, because
     the pointer is still sitting on the button that started it. */
  const [explicitPlay, setExplicitPlay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const visibility = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", visibility);
    query.addEventListener("change", sync);
    return () => { document.removeEventListener("visibilitychange", visibility); query.removeEventListener("change", sync); };
  }, []);

  const playing = !manualPause && (!reduced || motionOverride);
  const pauseOnHover = hovered && !explicitPlay;
  useEffect(() => {
    if (!playing || !inView || !visible || pauseOnHover || focused || items.length < 2) return;
    const timer = window.setTimeout(() => {
      const next = (active + 1) % items.length;
      const track = panelsRef.current;
      if (track && window.matchMedia("(max-width: 1023px)").matches) {
        track.scrollTo({ left: next * (track.clientWidth + 16), behavior: "instant" });
      }
      setActive(next);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, inView, visible, pauseOnHover, focused, items.length]);

  // Each mobile preview has its own height; do not leave a tall empty area
  // below shorter cards just because another slide has more content.
  useEffect(() => {
    const track = panelsRef.current;
    const panel = track?.children[active];
    if (!track || !(panel instanceof HTMLElement)) return;
    const measure = () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        track.style.setProperty("--preview-height", `${panel.offsetHeight + 20}px`);
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // Keep the selected chip in view on phones, where the list scrolls sideways.
  useEffect(() => {
    const button = refs.current[active];
    const list = button?.parentElement;
    if (!button || !list || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const select = (index: number, focus = false) => {
    setExplicitPlay(false);
    const next = (index + items.length) % items.length;
    setActive(next);
    const track = panelsRef.current;
    if (track && window.matchMedia("(max-width: 1023px)").matches) {
      track.scrollTo({ left: next * (track.clientWidth + 16), behavior: "smooth" });
    }
    if (focus) refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1, true);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(items.length - 1, true);
    }
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8"
    >
      <div className="min-w-0">
        {/* Focus pause lives here and on the panel below, not on the whole
            block: the rotate button must not pause the rotation it started. */}
        <div
          role="tablist"
          aria-label="Live projects"
          aria-orientation="vertical"
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          className="relative flex gap-2 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                id={`showcase-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`showcase-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`group relative flex shrink-0 items-center gap-3.5 overflow-hidden rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 lg:w-full ${
                  selected
                    ? "border-brand-500/30 bg-white shadow-[0_22px_44px_-26px_rgba(5,39,103,0.55)]"
                    : "border-slate-200/90 bg-white/60 hover:-translate-y-px hover:border-slate-300 hover:bg-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[0.8rem] font-bold tabular-nums transition-all duration-300 ${
                    selected
                      ? "bg-brand-500 text-white shadow-[0_8px_18px_-8px_rgba(28,168,48,0.9)]"
                      : "bg-navy-900 text-white/90 group-hover:bg-navy-800"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-sm font-semibold leading-tight text-ink-900 lg:whitespace-normal">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink-500 lg:whitespace-normal">
                    {item.category}
                  </span>
                </span>
                {item.badge ? (
                  <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-500/20 lg:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => {
            if (playing) {
              setManualPause(true);
              setExplicitPlay(false);
            } else {
              setManualPause(false);
              setMotionOverride(true);
              setExplicitPlay(true);
            }
          }}
          className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          {playing ? "Pause auto-rotation" : "Play auto-rotation"}
        </button>
        {footer ? <div className="mt-4 hidden lg:block">{footer}</div> : null}
      </div>

      <div className="min-w-0">
        <div
          ref={panelsRef}
          role="region"
          aria-label="Live project previews — swipe to explore"
          tabIndex={0}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          onScroll={(event) => {
            const track = event.currentTarget;
            if (!window.matchMedia("(max-width: 1023px)").matches) return;
            const next = Math.round(track.scrollLeft / (track.clientWidth + 16));
            setActive(Math.max(0, Math.min(items.length - 1, next)));
          }}
          className="flex h-[var(--preview-height,auto)] snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:thin] lg:block lg:h-auto lg:overflow-visible lg:pb-0"
        >
          {items.map((item, index) => (
            /* `.showcase-panel-fade` is a plain CSS class scoped to >=1024px
               (see globals.css): going from display:none to visible restarts
               the animation, so the new panel fades in instead of snapping. */
            <div
              key={item.id}
              id={`showcase-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`showcase-tab-${item.id}`}
              className={`w-full min-w-0 shrink-0 snap-start snap-always ${index === active ? "showcase-panel-fade" : "lg:hidden"}`}
            >
              {item.panel}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
          <span className="text-xs font-medium text-ink-500">Swipe previews · {active + 1} / {items.length}</span>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous project preview" disabled={active === 0} onClick={() => select(active - 1)} className="h-11 w-11 rounded-full border border-slate-200 bg-white text-ink-900 disabled:opacity-35">←</button>
            <button type="button" aria-label="Next project preview" disabled={active === items.length - 1} onClick={() => select(active + 1)} className="h-11 w-11 rounded-full border border-slate-200 bg-white text-ink-900 disabled:opacity-35">→</button>
          </div>
        </div>
        {footer ? <div className="mt-6 lg:hidden">{footer}</div> : null}
      </div>
    </div>
  );
}
