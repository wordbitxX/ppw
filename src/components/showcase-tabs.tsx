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
 * Below `lg` the list becomes a horizontally scrolling chip row. Only the
 * selected panel is visible; the rest are `hidden` but stay in the markup.
 */
/** How long each project stays on screen before the next one is shown. */
const AUTO_ADVANCE_MS = 7000;

export function ShowcaseTabs({ items, footer }: { items: ShowcaseTabItem[]; footer?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // Auto-advance only while the block is on screen; hover / focus pauses it.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const paused = hovered || keyboardFocus || !inView;

  // Keep the selected chip in view on phones, where the list scrolls sideways.
  useEffect(() => {
    const button = refs.current[active];
    const list = button?.parentElement;
    if (!button || !list || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const select = (index: number, focus = false) => {
    const next = (index + items.length) % items.length;
    setActive(next);
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
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => setKeyboardFocus(event.target.matches(":focus-visible"))}
      onBlurCapture={() => setKeyboardFocus(false)}
      className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8"
    >
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Live projects"
          aria-orientation="vertical"
          className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                {selected ? (
                  <span aria-hidden="true" className="absolute inset-x-3.5 bottom-0 h-[3px] overflow-hidden rounded-full bg-slate-200">
                    <span
                      key={active}
                      data-paused={paused}
                      onAnimationEnd={() => setActive((current) => (current + 1) % items.length)}
                      style={{ ["--tab-ms" as string]: `${AUTO_ADVANCE_MS}ms` }}
                      className="tab-progress block h-full w-full bg-brand-500"
                    />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {footer ? <div className="mt-4 hidden lg:block">{footer}</div> : null}
      </div>

      <div className="min-w-0">
        {items.map((item, index) => (
          <div
            key={item.id}
            id={`showcase-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`showcase-tab-${item.id}`}
            hidden={index !== active}
            className={index === active ? "animate-reveal" : undefined}
          >
            {item.panel}
          </div>
        ))}
        {footer ? <div className="mt-6 lg:hidden">{footer}</div> : null}
      </div>
    </div>
  );
}
