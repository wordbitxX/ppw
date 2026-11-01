import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { fixedPackages, packagePages } from "@/lib/price-ladder";

/**
 * The fixed-price signpost used on commercial pages.
 *
 * Audit 30 Oct 2026: /pk and /usa had no in-content links from any page that
 * ranks for website-development terms — the only links were in the sitewide
 * footer and on `/pricing`. This strip puts the two price pages where the buyer
 * actually is: services, city pages, the hiring page and the homepage.
 *
 * `market` decides which price is quoted first; both links are always shown so
 * a visitor never lands on a price list in the wrong currency by surprise.
 */
export function FixedPriceStrip({
  market = "both",
  className = "",
}: {
  market?: "pk" | "us" | "both";
  className?: string;
}) {
  const lead =
    market === "us"
      ? `US websites start at ${fixedPackages.us.starter}`
      : `Websites start at ${fixedPackages.pk.starter}`;
  const second =
    market === "us"
      ? `(${fixedPackages.us.business} business, ${fixedPackages.us.store} store)`
      : `(${fixedPackages.pk.allInOne} with domain + 1 year hosting)`;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm leading-relaxed text-ink-600">
        <span className="font-semibold text-ink-900">{lead}</span>{" "}
        {second} — 5–10 pages, CMS, basic SEO, {fixedPackages.pk.supportMonths} months
        support.
      </p>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Link
          href={packagePages.pk.href}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          Pakistan prices (PKR)
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href={packagePages.us.href}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          USA prices (USD)
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
