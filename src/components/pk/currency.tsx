"use client";

/**
 * PKR / USD price switch.
 *
 * The header carries the switch; everything that prints a price inside the
 * /pk pages reads it from here. Default is PKR (the offer is a Pakistan
 * offer); a visitor who picks USD keeps that choice on the next page load via
 * localStorage.
 *
 * No exchange rate is invented: a USD figure appears only when the owner has
 * either pasted an explicit dollar price or a rate in `pkUsdPricing`.
 */

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { moneyIn, usdFrom, type PkCurrency, type PkPackage, type PkPrice } from "@/lib/pk";

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

type CurrencyContextValue = {
  currency: PkCurrency;
  setCurrency: (next: PkCurrency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "PKR",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribeCurrency, readCurrency, () => "PKR" as PkCurrency);
  const setCurrency = useCallback((next: PkCurrency) => writeCurrency(next), []);
  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/** Segmented PKR | USD control. Used in the header and inside the /pk price card. */
export function CurrencySwitch({
  tone = "dark",
  size = "sm",
  label = "Show prices in",
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md";
  label?: string;
}) {
  const { currency, setCurrency } = useCurrency();
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
            onClick={() => setCurrency(option)}
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

/**
 * A price that follows the switch. Renders nothing when no number exists in
 * either currency, so callers keep their own honest fallback line.
 */
export function PriceLine({
  value,
  usdValue,
  prefix = "from ",
  className = "",
}: {
  value: PkPrice;
  usdValue?: PkPrice;
  prefix?: string;
  className?: string;
}) {
  const { currency } = useCurrency();
  const text = moneyIn(currency, value, usdValue ?? null);
  if (text == null) return null;
  return <span className={className}>{`${prefix}${text}`}</span>;
}

/** True once a real figure exists in the active currency. */
export function useHasPrice(value: PkPrice, usdValue?: PkPrice): boolean {
  const { currency } = useCurrency();
  return moneyIn(currency, value, usdValue ?? null) != null;
}

/**
 * Text that names a currency ("PKR", "Rs.", "$") follows the switch here.
 * Both variants are written out; this never converts a sentence.
 */
export function CurText({ pkr, usd }: { pkr: ReactNode; usd: ReactNode }) {
  const { currency } = useCurrency();
  return <>{currency === "USD" ? usd : pkr}</>;
}

export { usdFrom };

/**
 * The two package price tiles — used in the hero card (light) and on navy.
 * Reads the switch, so it must stay a client component.
 */
export function PackagePriceTiles({
  packages,
  tone = "light",
}: {
  packages: PkPackage[];
  tone?: "light" | "dark";
}) {
  const { currency } = useCurrency();
  const frame =
    tone === "dark"
      ? "rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3"
      : "rounded-xl border border-slate-200 px-3 py-2";
  const name = tone === "dark" ? "text-brand-300" : "text-ink-500";
  const value = tone === "dark" ? "text-white" : "text-navy-700";

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {packages.map((pkg) => {
        const price = moneyIn(currency, pkg.price, pkg.usdPrice);
        return (
          <div key={pkg.id} className={frame}>
            <p className={`text-[0.62rem] font-bold uppercase tracking-[0.12em] ${name}`}>{pkg.name}</p>
            <p className={`text-[1rem] font-semibold leading-snug tabular-nums ${value}`}>
              {price ? `from ${price}` : <CurText pkr="Fixed quote" usd="Fixed quote in USD" />}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** Just the figure ("Rs. 45,000" / "$160") — the caller prints its own "from". */
export function PriceAmount({ value, usdValue, fallback = "Fixed quote" }: { value: PkPrice; usdValue?: PkPrice; fallback?: ReactNode }) {
  const { currency } = useCurrency();
  const text = moneyIn(currency, value, usdValue ?? null);
  return <>{text ?? fallback}</>;
}

/** "from Rs. 45,000" (or "from $160") with a caller-supplied fallback. */
export function PriceLead({ value, usdValue, fallback = "Fixed quote" }: { value: PkPrice; usdValue?: PkPrice; fallback?: ReactNode }) {
  const { currency } = useCurrency();
  const text = moneyIn(currency, value, usdValue ?? null);
  return <>{text ? `from ${text}` : fallback}</>;
}
