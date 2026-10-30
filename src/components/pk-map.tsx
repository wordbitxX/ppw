import type { ReactNode } from "react";

/**
 * A quiet, illustrated map of Pakistan.
 *
 * The outline is the Natural Earth country boundary (public domain), projected
 * equirectangular with a cos(lat) correction and rounded to one decimal — 65
 * points, inlined, no map tiles and no third-party requests at runtime. City
 * pins use the same projection, so they sit where the cities actually are.
 *
 * It is deliberately a *diagram*, not a street map: no labels other than the
 * cities we work in, no claim of cartographic accuracy. It exists so the
 * "across Pakistan" section has a real geography instead of a stock photo.
 */
const PAK_PATH =
  "M821.5 30L862.5 60L878.9 109.3L970 135.3L916.5 189.3L854.7 198.9L770.7 183.2L743.5 210.9L763.1 267.2" +
  "L782.4 310.7L827.1 342.4L779.8 379.6L780.7 425.4L726.9 489.9L692.2 555.1L634.2 622.4L569.9 617.5L508.8 684.9" +
  "L545.1 713.8L551.4 763.2L582.5 795.8L593.5 851L471.6 850.8L434.7 893.7L394 877.4L377.5 831.2L334.7 782.3" +
  "L232.6 794.4L142.6 795.6L64.5 804.6L85.4 729.9L165.3 696.7L160.8 667.2L134.2 656.8L132.7 600.2L79.7 571.9" +
  "L57.4 533.1L30 499.3L122.9 532.1L178.3 522.5L211.4 530.7L222.6 516.6L261.2 522.3L333.2 495.5L335.2 440.9" +
  "L366.1 404.5L407.3 404.6L413.4 386.6L455.7 378.2L476.2 384.2L497.9 366.2L494.8 327.6L518.4 288.8L553.6 272.5" +
  "L531.8 230L584.6 232L599.8 208.9L597.5 184.2L625.1 157.2L618.7 125.3L605.6 98L638 70L697.5 56.5L761.1 49.1" +
  "L789.3 37.2L821.5 30Z";

const MAP_W = 1000;
const MAP_H = 924;

export type MapCity = {
  key: string;
  name: string;
  x: number;
  y: number;
  /** Show the name next to the pin on the large map. */
  label?: boolean;
  /** Which side of the pin the name sits on. Defaults to below. */
  labelSide?: "below" | "left" | "right";
  /** The pin we make a fuss about — the office city. */
  hq?: boolean;
};

/** Projected from real coordinates: x = lon, y = lat (inverted). */
export const mapCities: Record<string, MapCity> = {
  lahore: { key: "lahore", name: "Lahore", x: 777.2, y: 390.6, label: true, hq: true },
  karachi: { key: "karachi", name: "Karachi", x: 369.5, y: 818.6, label: true },
  islamabad: { key: "islamabad", name: "Islamabad", x: 704.6, y: 251.6, label: true },
  rawalpindi: { key: "rawalpindi", name: "Rawalpindi", x: 705.7, y: 259.3 },
  faisalabad: { key: "faisalabad", name: "Faisalabad", x: 709.4, y: 395.1 },
  multan: { key: "multan", name: "Multan", x: 620.2, y: 478.2, label: true },
  peshawar: { key: "peshawar", name: "Peshawar", x: 620.2, y: 230.3, label: true, labelSide: "left" },
  quetta: { key: "quetta", name: "Quetta", x: 368.1, y: 476.8, label: true },
  sialkot: { key: "sialkot", name: "Sialkot", x: 786.3, y: 328.1 },
  gujranwala: { key: "gujranwala", name: "Gujranwala", x: 768.1, y: 347.8 },
  hyderabad: { key: "hyderabad", name: "Hyderabad", x: 444.7, y: 784.2 },
};

const pct = (value: number, total: number) => `${((value / total) * 100).toFixed(2)}%`;

function CountryShape({ tone, idSuffix = "main" }: { tone: "dark" | "light"; idSuffix?: string }) {
  const gradientId = `pk-fill-${tone}-${idSuffix}`;
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          {tone === "dark" ? (
            <>
              <stop offset="0%" stopColor="#0a1c3f" />
              <stop offset="55%" stopColor="#123a7a" />
              <stop offset="100%" stopColor="#1a4f8f" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#e8f0fb" />
              <stop offset="100%" stopColor="#cfdff5" />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        d={PAK_PATH}
        fill={`url(#${gradientId})`}
        stroke={tone === "dark" ? "rgba(127, 220, 255, 0.55)" : "rgba(96, 130, 180, 0.45)"}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pin({
  city,
  tone,
  showLabel = true,
  size = "sm",
}: {
  city: MapCity;
  tone: "dark" | "light";
  showLabel?: boolean;
  size?: "sm" | "lg";
}) {
  const dot = size === "lg" ? "h-3 w-3" : "h-2 w-2";
  const ring = size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(city.x, MAP_W), top: pct(city.y, MAP_H) }}
    >
      <span className="relative flex items-center justify-center">
        {city.hq ? (
          <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-brand-400/40 motion-reduce:hidden" />
        ) : null}
        <span
          className={`relative flex items-center justify-center rounded-full ${
            tone === "dark" ? "bg-brand-400/15" : "bg-brand-500/15"
          } ${ring}`}
        >
          <span
            className={`${dot} rounded-full ${
              city.hq ? "bg-brand-300 ring-2 ring-white/70" : tone === "dark" ? "bg-brand-300" : "bg-brand-600"
            }`}
          />
        </span>
      </span>
      {showLabel ? (
        <span
          className={`absolute whitespace-nowrap text-[10px] font-semibold leading-none sm:text-[11px] ${
            (city.labelSide ?? "below") === "left"
              ? "right-full top-1/2 mr-2 -translate-y-1/2"
              : (city.labelSide ?? "below") === "right"
                ? "left-full top-1/2 ml-2 -translate-y-1/2"
                : "left-1/2 top-full mt-0.5 -translate-x-1/2"
          } ${tone === "dark" ? "text-slate-100" : "text-ink-700"}`}
        >
          {city.name}
          {city.hq ? (
            <span className="ml-1 rounded-full bg-brand-500/25 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-brand-200">
              HQ
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}

/** The large map used in "Working with businesses across Pakistan". */
export function PakistanMap({ className = "" }: { className?: string }) {
  const labelled = Object.values(mapCities).filter((city) => city.label || city.hq);
  const dots = Object.values(mapCities).filter((city) => !labelled.includes(city));

  return (
    <div className={`relative ${className}`}>
      <div className="cine-surface cine-rim relative overflow-hidden rounded-3xl border border-white/10 p-4 shadow-[0_50px_100px_-60px_rgba(5,13,33,0.9)] sm:p-6">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-10 top-1/4 h-40 w-40 rounded-full bg-brand-500/20 blur-[70px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto aspect-[1000/924] w-full max-w-[30rem]">
          <CountryShape tone="dark" />
          {dots.map((city) => (
            <Pin key={city.key} city={city} tone="dark" size="sm" showLabel={false} />
          ))}
          {labelled.map((city) => (
            <Pin key={city.key} city={city} tone="dark" size={city.hq ? "lg" : "sm"} />
          ))}
        </div>
        <p className="relative mt-3 text-center text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
          Office in Lahore · clients across Pakistan
        </p>
      </div>
    </div>
  );
}

/**
 * A small city tile: the whole country as a stamp, one pin lit up, and the
 * province named in the corner. Deliberately a diagram — there are no map
 * tiles here, so no third-party request and no implication of street accuracy.
 */
export function MiniCityMap({
  cityKey,
  province,
  children,
}: {
  cityKey: string;
  province: string;
  children?: ReactNode;
}) {
  const city = mapCities[cityKey] ?? mapCities.lahore;

  return (
    <div className="relative h-36 overflow-hidden rounded-t-2xl border-b border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center py-3">
        <div className="relative aspect-[1000/924] h-full w-auto">
          <CountryShape tone="light" idSuffix={cityKey} />
          <Pin city={{ ...city, label: false }} tone="light" size="lg" showLabel={false} />
        </div>
      </div>
      <span className="absolute left-3 top-2.5 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-ink-400">
        {province}
      </span>
      {children}
    </div>
  );
}

