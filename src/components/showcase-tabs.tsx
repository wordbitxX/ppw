"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

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
export function ShowcaseTabs({ items, footer }: { items: ShowcaseTabItem[]; footer?: ReactNode }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

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
    <div className="grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-8">
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Live projects"
          aria-orientation="vertical"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all lg:w-full ${
                  selected
                    ? "border-slate-200 bg-white shadow-[0_18px_40px_-24px_rgba(5,39,103,0.45)]"
                    : "border-transparent hover:border-slate-200/80 hover:bg-white/60"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 left-0 hidden w-[3px] rounded-full bg-brand-500 transition-opacity lg:block ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  className={`font-mono text-[0.7rem] font-semibold tabular-nums ${
                    selected ? "text-brand-600" : "text-slate-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block whitespace-nowrap text-sm font-semibold leading-tight lg:whitespace-normal ${
                      selected ? "text-ink-900" : "text-ink-700"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap text-[0.66rem] font-medium uppercase tracking-[0.12em] text-ink-500 lg:whitespace-normal">
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
