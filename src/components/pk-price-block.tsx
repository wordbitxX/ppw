import Link from "next/link";
import { ArrowRight, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { PriceShowcaseReel, type PriceShowcaseSlide } from "@/components/price-showcase-reel";
import { pkMarket, pkPrices } from "@/lib/pk-landing";
import { demoPreview } from "@/lib/demo-shots";
import { demoWebsites, showcaseRel } from "@/lib/demos";

/**
 * The Pakistan price block from /pk, reused at the top of the website-building
 * service pages.
 *
 * Why: /pk is the page that converts on price ("Websites from Rs. 20,000"), but
 * a visitor who lands on /services/web-development — the page that ranks for
 * the service itself — had to leave it to find a number. This block puts the
 * same price, the same two packages and the same WhatsApp/phone route directly
 * under the page hero, where the client sees it first, with a small rotating
 * reel of real builds beside it.
 *
 * Every string and number comes from `pk-landing.ts` (which reads
 * `price-ladder.ts`), so /pk and this block can never disagree.
 */

const showcaseIds = ["ecommerce", "properties-pak", "luxury-restaurant"];

function buildSlides(): PriceShowcaseSlide[] {
  return showcaseIds.flatMap((id) => {
    const demo = demoWebsites.find((entry) => entry.id === id);
    if (!demo) return [];
    const preview = demoPreview(demo);
    return [
      {
        id: demo.id,
        src: preview.src,
        alt: preview.isCover
          ? `Illustration representing ${demo.name}, built by WordbitX`
          : `${demo.name} — built by WordbitX`,
        label: demo.kind === "live" ? "Live product" : "Live demo",
        title: demo.name,
        href: demo.url,
        host: demo.host,
      },
    ];
  });
}

export function PkPriceBlock({
  heading = pkMarket.hero.title,
  eyebrow = "Pakistan pricing · PKR",
}: {
  heading?: string;
  eyebrow?: string;
}) {
  const slides = buildSlides();

  return (
    <div>
      {/* ── PRICE FIRST ─────────────────────────────────────────────────── */}
      <section
        id="price"
        aria-labelledby="pk-price-heading"
        className="relative isolate overflow-hidden rounded-3xl bg-midnight p-6 text-white ring-1 ring-white/10 sm:p-8 lg:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-arc-500/15 blur-3xl"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.14]" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-300">{eyebrow}</p>
            <h2
              id="pk-price-heading"
              className="mt-3 max-w-xl text-[1.7rem] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[2.15rem]"
            >
              {heading}
            </h2>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-2.5">
              <span className="text-sm font-medium text-slate-400">{pkMarket.hero.priceLabel}</span>
              <span className="text-gradient-arc text-[2.1rem] font-semibold tracking-tight sm:text-[2.6rem]">
                {pkPrices.basic}
              </span>
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{pkMarket.hero.sub}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {pkMarket.hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.7rem] font-semibold text-slate-200 backdrop-blur-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={pkMarket.contact.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(28,168,48,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </a>
              <a
                href="#packages"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10"
              >
                See packages
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
              <a
                href={`tel:${pkMarket.contact.phoneRaw}`}
                className="font-medium text-slate-200 transition-colors hover:text-white"
              >
                {pkMarket.contact.phoneDisplay}
              </a>
              <span aria-hidden="true">·</span>
              <span>{pkMarket.contact.hours}</span>
              <span aria-hidden="true">·</span>
              <Link
                href={pkMarket.regionSwitch.href}
                className="font-semibold text-brand-300 underline decoration-brand-400/50 decoration-2 underline-offset-4 transition-colors hover:text-white"
              >
                {pkMarket.regionSwitch.label}
              </Link>
            </p>
          </div>

          {/* Real builds, rotating — proof sits next to the price. */}
          <PriceShowcaseReel slides={slides} />
        </div>
      </section>

      {/* ── THE TWO PACKAGES ────────────────────────────────────────────── */}
      <div id="packages" className="mt-10 scroll-mt-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-ink-900 sm:text-2xl">{pkMarket.packages.title}</h3>
            <p className="mt-1.5 text-sm text-ink-500">{pkMarket.packages.description}</p>
          </div>
          <Link
            href="/pk#packages"
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Full Pakistan pricing
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:gap-4 lg:grid-cols-2">
          {pkMarket.packages.items.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                pkg.featured
                  ? "border border-brand-500/30 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 text-white shadow-[0_40px_80px_-45px_rgba(5,39,103,0.85)] ring-1 ring-brand-500/20"
                  : "border border-slate-200 bg-white text-ink-900 shadow-[0_28px_60px_-50px_rgba(5,13,33,0.8)]"
              }`}
            >
              {pkg.badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-500 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white">
                  {pkg.badge}
                </span>
              ) : null}
              <p
                className={`text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
                  pkg.featured ? "text-brand-300" : "text-brand-700"
                }`}
              >
                {pkg.eyebrow}
              </p>
              <h4 className="mt-2 text-lg font-semibold sm:text-xl">{pkg.name}</h4>
              <p className="mt-3 flex items-baseline gap-2">
                <span className={`text-xs font-medium ${pkg.featured ? "text-slate-400" : "text-ink-400"}`}>from</span>
                <span
                  className={`text-[2rem] font-semibold tracking-tight ${
                    pkg.featured ? "text-brand-300" : "text-ink-900"
                  }`}
                >
                  {pkg.price}
                </span>
              </p>
              <p className={`mt-2 text-sm ${pkg.featured ? "text-slate-400" : "text-ink-500"}`}>{pkg.note}</p>
              <ul
                className={`mt-4 space-y-2.5 border-t pt-4 text-sm ${
                  pkg.featured ? "border-white/10" : "border-slate-200"
                }`}
              >
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-white/85" : "text-navy-700"}`}
                    />
                    <span className={pkg.featured ? "text-slate-200" : "text-ink-700"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={pkMarket.contact.whatsapp(pkg.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  pkg.featured
                    ? "bg-brand-500 text-white shadow-[0_18px_40px_-20px_rgba(28,168,48,0.9)] hover:bg-brand-600"
                    : "border border-slate-300 bg-white text-ink-900 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                <WhatsAppIcon className="h-4 w-4" /> Get started
              </a>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-500">{pkMarket.packages.note}</p>
      </div>
    </div>
  );
}
