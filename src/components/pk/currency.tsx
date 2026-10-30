"use client";

/**
 * PKR / USD price switch.
 *
 * This file is the ONLY client component involved in pricing, and it holds no
 * price text at all: it just writes `data-currency` on <html>. Every price on
 * the /pk pages is rendered on the server twice (.pk-pkr and .pk-usd) and CSS
 * shows the chosen one (see globals.css).
 *
 * Why it is built this way: passing price components across the
 * server → client boundary produced "Element type is invalid. Received a
 * promise that resolves to undefined" in the dev preview, for a plain numeric
 * prop as well as for a JSX one. Keeping price markup entirely on the server
 * removes that whole class of failure — and it means a crawler, a first paint
 * and a JS-free browser all see the rupee price.
 *
 * Default is PKR (this is a Pakistan offer); a visitor who picks USD keeps the
 * choice on the next load via localStorage. No exchange rate is invented: a USD
 * figure appears only when the owner has pasted one, or a rate, in
 * `pkUsdPricing`.
 */

import { useEffect, useSyncExternalStore } from "react";
import type { PkCurrency } from "@/lib/pk";

const STORAGE_KEY = "wbx-pk-currency";

/**
 * The choice lives outside React so the switch can be read through
 * useSyncExternalStore: the server (and the first client paint) always render
 * PKR, then the saved choice is picked up without a hydration mismatch and
 * without a setState-in-effect.
 */
let cached: PkCurrency | null = null;
const listeners = new Set<() => void>();

function readCurrency(): PkCurrency {
  if (cached) return cached;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "USD" || saved === "PKR") {
      cached = saved;
      return cached;
    }
  } catch {
    /* storage blocked — PKR is a fine default */
  }
  cached = "PKR";
  return cached;
}

function subscribeCurrency(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cached = null;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeCurrency(next: PkCurrency) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

/**
 * Everything the client needs to know about the switch lives in this one
 * component, so the module is imported by the header (a client component) and
 * nowhere else. A provider in the root layout was tried first; it worked, but
 * it meant a server layout imported a client module for no reason, and the
 * whole point of this file is to keep the price boundary as small as possible.
 */
export function CurrencySwitch({
  tone = "dark",
  size = "sm",
  label = "Show prices in",
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md";
  label?: string;
}) {
  const currency = useSyncExternalStore(subscribeCurrency, readCurrency, () => "PKR" as PkCurrency);

  // Prices are rendered on the server in both currencies and switched by CSS;
  // this attribute is the only thing the client has to change.
  useEffect(() => {
    document.documentElement.dataset.currency = currency;
  }, [currency]);

  const options: PkCurrency[] = ["PKR", "USD"];
  const onDark = tone === "dark";
  const pad = size === "md" ? "px-3 py-1.5 text-[0.8rem]" : "px-2.5 py-1 text-[0.72rem]";

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center gap-0.5 rounded-lg p-0.5 ${
        onDark ? "bg-white/10 ring-1 ring-white/15" : "bg-slate-100 ring-1 ring-slate-200"
      }`}
    >
      {options.map((option) => {
        const active = currency === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => writeCurrency(option)}
            aria-pressed={active}
            className={`rounded-md font-semibold tabular-nums transition-colors ${pad} ${
              active
                ? onDark
                  ? "bg-white text-navy-700"
                  : "bg-navy-700 text-white"
                : onDark
                  ? "text-slate-200 hover:text-white"
                  : "text-ink-500 hover:text-navy-700"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
