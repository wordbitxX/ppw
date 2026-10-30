import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading, Eyebrow } from "@/components/ui";
import { FaqAccordion } from "@/components/accordion";
import { CineBackdrop } from "@/components/cinematic";
import { ArrowRight, CheckIcon, ServiceIcon, WhatsAppIcon } from "@/components/icons";
import { PkIcon } from "@/components/pk-icons";
import { MiniCityMap } from "@/components/pk-map";
import { demoWebsites, showcaseRel } from "@/lib/demos";
import { demoPreview } from "@/lib/demo-shots";
import type { MarketContent } from "@/lib/market-landing";

/**
 * The shop-front layout shared by /pk and /usa.
 *
 * Design brief (owner, 30 Oct 2026): short text, price first, one line per
 * idea — a shop window rather than a brochure. Every string comes from the
 * market content object, so the two pages can never drift apart structurally
 * and the only differences between them are prices, currency and contact line.
 */

/** The single navy tile used for every icon on these pages. */
const iconTile =
  "flex items-center justify-center rounded-xl bg-navy-700 text-white ring-1 ring-navy-500/40 shadow-[0_14px_28px_-16px_rgba(26,58,104,0.95)]";

const cardLight =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(5,13,33,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_32px_60px_-40px_rgba(5,39,103,0.45)]";

const cardGlass =
  "rounded-2xl border border-white/12 bg-midnight/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-midnight/45";

const cardDark =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]";

/** WhatsApp button — module scope so React never remounts it (the hook lint
 *  rule forbids components created during render). */
function WhatsAppCta({
  href,
  children = "WhatsApp us",
  variant = "brand",
  className = "",
}: {
  href: string;
  children?: React.ReactNode;
  variant?: "brand" | "outline" | "light";
  className?: string;
}) {
  const styles = {
    brand:
      "bg-brand-500 text-white shadow-[0_18px_40px_-20px_rgba(28,168,48,0.9)] hover:-translate-y-0.5 hover:bg-brand-600",
    outline:
      "border border-white/25 bg-white/[0.04] text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10",
    light:
      "border border-slate-300 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${styles} ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </a>
  );
}

export function MarketLanding({ market }: { market: MarketContent }) {
  const heroDemo = demoWebsites.find((entry) => entry.id === market.hero.demoId);

  const work = market.work.items
    .map((item) => {
      const demo = demoWebsites.find((entry) => entry.id === item.id);
      return demo ? { demo, blurb: item.blurb } : null;
    })
    .filter((item): item is { demo: (typeof demoWebsites)[number]; blurb: string } => Boolean(item));

  const packagesGrid =
    market.packages.items.length > 2
      ? "mx-auto mt-8 grid max-w-5xl gap-5 sm:gap-4 lg:grid-cols-3"
      : "mx-auto mt-8 grid max-w-4xl gap-8 sm:gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-6";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="cine-surface relative overflow-hidden bg-midnight pt-24 text-white sm:pt-28 lg:pt-32">
        <CineBackdrop variant="calm" opacity={0.5} mask="b" position="72% 30%" scrimLeft />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.16]" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-14">
            <div>
              <Eyebrow tone="dark">{market.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.2rem]">
                {market.hero.title}
              </h1>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2.5 text-xl font-semibold text-white sm:text-2xl">
                <span className="text-sm font-medium text-slate-400">{market.hero.priceLabel}</span>
                <span className="text-brand-300">{market.hero.price}</span>
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">{market.hero.sub}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {market.hero.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.7rem] font-semibold text-slate-200 backdrop-blur-sm"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCta href={market.contact.whatsapp()} />
                <Link
                  href="#packages"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10"
                >
                  See prices
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
                <a
                  href={`tel:${market.contact.phoneRaw}`}
                  className="font-medium text-slate-200 transition-colors hover:text-white"
                >
                  {market.contact.phoneDisplay}
                </a>
                <span aria-hidden="true">·</span>
                <span>{market.contact.hours}</span>
                <span aria-hidden="true">·</span>
                <Link
                  href={market.regionSwitch.href}
                  className="font-semibold text-brand-300 underline decoration-brand-400/50 decoration-2 underline-offset-4 transition-colors hover:text-white"
                >
                  {market.regionSwitch.label}
                </Link>
              </p>
            </div>

            {/* Real WordbitX build, shown on a real device scene. */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-500/12 blur-3xl"
                aria-hidden="true"
              />
              <a
                href={heroDemo?.url ?? "/portfolio"}
                {...(heroDemo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`Open the ${heroDemo?.name ?? "WordbitX"} live demo${heroDemo ? " in a new tab" : ""}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/12 bg-navy-900 shadow-[0_50px_110px_-45px_rgba(3,8,20,0.9)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
              >
                <Image
                  src={market.hero.image}
                  alt={market.hero.imageAlt}
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/75 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
                  </span>
                  Live demo · {heroDemo?.name ?? "WordbitX"}
                  <ArrowRight className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-x-4 bottom-4 hidden rounded-2xl border border-white/15 bg-navy-950/80 p-4 backdrop-blur-md transition-colors duration-300 group-hover:border-brand-400/35 sm:block">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-brand-300">
                        {market.hero.priceCardLabel}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white sm:text-xl">{market.hero.price}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-500/20 px-2.5 py-1 text-[0.62rem] font-semibold text-brand-200 ring-1 ring-brand-400/30">
                      {market.hero.priceCardChip}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{market.hero.priceCardNote}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/[0.03]">
          <div className="container-page grid grid-cols-2 gap-y-6 py-6 lg:grid-cols-4">
            {market.hero.stats.map((stat) => (
              <div key={stat.label} className="px-1 text-center">
                <p className="text-base font-semibold text-white sm:text-lg">{stat.value}</p>
                <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[0.68rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────────── */}
      <Section id="packages" padding="tight-bottom">
        <SectionHeading
          align="center"
          eyebrow={market.packages.eyebrow}
          title={market.packages.title}
          description={market.packages.description}
        />

        <div className={packagesGrid}>
          {market.packages.items.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                pkg.featured
                  ? "border border-brand-500/30 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 text-white shadow-[0_45px_90px_-45px_rgba(5,39,103,0.85)] ring-1 ring-brand-500/20"
                  : "border border-slate-200 bg-white text-ink-900 shadow-[0_30px_70px_-50px_rgba(5,13,33,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-navy-600 hover:shadow-[0_40px_80px_-50px_rgba(5,39,103,0.55)] focus-within:border-navy-600 focus-within:ring-2 focus-within:ring-navy-500/25"
              }`}
            >
              {pkg.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_25px_-12px_rgba(28,168,48,0.9)]">
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
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{pkg.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className={`text-xs font-medium ${pkg.featured ? "text-slate-400" : "text-ink-400"}`}>from</span>
                <span
                  className={`text-[2.1rem] font-semibold tracking-tight ${
                    pkg.featured ? "text-brand-300" : "text-ink-900"
                  }`}
                >
                  {pkg.price}
                </span>
              </p>
              <p className={`mt-2 text-sm ${pkg.featured ? "text-slate-400" : "text-ink-500"}`}>{pkg.note}</p>

              <ul
                className={`mt-5 space-y-3 border-t pt-5 text-sm ${
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

              <div className="mt-7 pt-1">
                <a
                  href={market.contact.whatsapp(pkg.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    pkg.featured
                      ? "bg-brand-500 text-white shadow-[0_18px_40px_-20px_rgba(28,168,48,0.9)] hover:bg-brand-600"
                      : "border border-slate-300 bg-white text-ink-900 hover:border-brand-400 hover:text-brand-700"
                  }`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Get started
                </a>
              </div>
            </div>
          ))}
        </div>

        {market.packages.addOns ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-400">
              Add-ons
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {market.packages.addOns.map((addOn) => (
                <li
                  key={addOn.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink-700"
                >
                  <span>{addOn.label}</span>
                  <span className="font-semibold text-ink-900">{addOn.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
          {market.packages.note} {market.currencyNote}
        </p>
        <p className="mt-2 text-center text-xs text-ink-400">
          Prefer to talk first?{" "}
          <Link href="/contact?intent=call" className="font-semibold text-brand-700 hover:text-brand-600">
            Book a free call
          </Link>
        </p>
      </Section>

      {/* ── INCLUDED ─────────────────────────────────────────────────────── */}
      <Section id="included" padding="tight">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_45px_110px_-80px_rgba(5,13,33,0.85)]">
          <div className="h-1 bg-gradient-to-r from-navy-900 via-brand-500 to-navy-900" aria-hidden="true" />
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-6 text-white sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.14]" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-center">
                <Eyebrow tone="dark">{market.included.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.1rem] lg:text-[2.3rem]">
                  {market.included.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">{market.included.intro}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {market.included.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.7rem] font-semibold text-slate-200 backdrop-blur-sm"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppCta href={market.contact.whatsapp()} className="w-full sm:w-auto" />
                  <Link
                    href="#packages"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10"
                  >
                    See prices
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-slate-200/70 sm:grid-cols-2">
              {market.included.items.map((item) => (
                <div key={item.title} className="group bg-white p-5 transition-colors duration-300 hover:bg-slate-50/80">
                  <span className={`${iconTile} h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5`}>
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <Section tone="muted" id="services">
        <SectionHeading
          eyebrow={market.services.eyebrow}
          title={market.services.title}
          description={market.services.description}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {market.services.items.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={`group ${cardLight}`}>
              <span className={`${iconTile} h-10 w-10`}>
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-3.5 text-base font-semibold text-ink-900 group-hover:text-brand-700">
                {service.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{service.text}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── WHY ──────────────────────────────────────────────────────────── */}
      <section id="why" className="relative isolate overflow-hidden bg-midnight py-12 text-white sm:py-20 lg:py-24">
        <Image
          src="/brand/office-collaboration.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          aria-hidden="true"
          className="pointer-events-none scale-105 object-cover object-[55%_35%] opacity-60 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/88 via-midnight/55 to-midnight/92" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_45%,transparent_0%,rgba(3,8,20,0.28)_72%,rgba(3,8,20,0.72)_100%)]"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow={market.why.eyebrow}
            title={market.why.title}
            description={market.why.description}
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {market.why.items.map((item) => (
              <div key={item.title} className={cardGlass}>
                <span className={`${iconTile} h-10 w-10`}>
                  <PkIcon name={item.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3.5 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta href={market.contact.whatsapp()} className="w-full sm:w-auto" />
            <Link
              href="#packages"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10 sm:w-auto"
            >
              See prices
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CITIES (Pakistan only) ───────────────────────────────────────── */}
      {market.cities ? (
        <Section id="cities">
          <SectionHeading
            eyebrow={market.cities.eyebrow}
            title={market.cities.title}
            description={market.cities.description}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {market.cities.items.map((city) => (
              <Link
                key={city.slug}
                href={`/software-house/${city.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-44px_rgba(5,13,33,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_32px_60px_-40px_rgba(5,39,103,0.4)]"
              >
                <MiniCityMap cityKey={city.mapKey} province={city.province} />
                <div className="p-4">
                  <h3 className="text-base font-semibold text-ink-900 group-hover:text-brand-700">{city.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{city.blurb}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    View page
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── WORK ─────────────────────────────────────────────────────────── */}
      <Section tone={market.cities ? "muted" : "light"} id="work">
        <SectionHeading eyebrow={market.work.eyebrow} title={market.work.title} description={market.work.description} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map(({ demo, blurb }) => {
            const preview = demoPreview(demo);
            const isLive = demo.kind === "live";
            return (
              <a
                key={demo.id}
                href={demo.url}
                target="_blank"
                rel={showcaseRel(demo.url)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-46px_rgba(5,13,33,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_36px_70px_-42px_rgba(5,39,103,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={preview.src}
                    alt={`${demo.name} — ${demo.category} website designed and built by WordbitX`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  <span
                    className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] ring-1 ${
                      isLive ? "bg-brand-500/90 text-white ring-white/30" : "bg-navy-950/80 text-slate-200 ring-white/15"
                    }`}
                  >
                    {isLive ? "Live project" : "Demo build"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-700">{demo.category}</p>
                  <h3 className="mt-1 text-base font-semibold text-ink-900 group-hover:text-brand-700">{demo.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-700">
                    {isLive ? "Visit live site" : "Open demo site"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppCta href={market.contact.whatsapp()} className="w-full sm:w-auto" />
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700"
          >
            See all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" className="cine-surface cine-rim relative overflow-hidden py-12 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="flow" opacity={0.5} mask="none" position="20% 60%" />
        <div className="container-page relative">
          <SectionHeading
            tone="dark"
            eyebrow={market.process.eyebrow}
            title={market.process.title}
            description={market.process.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {market.process.items.map((step) => (
              <div key={step.step} className={cardDark}>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-300">{step.step}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section id="faqs">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow>{market.faqs.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.15] text-ink-900 sm:text-4xl lg:text-[2.5rem]">
              {market.faqs.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">{market.faqs.intro}</p>
            <div className="mt-6 hidden lg:block">
              <WhatsAppCta href={market.contact.whatsapp()} variant="light" />
            </div>
          </div>
          <FaqAccordion faqs={market.faqs.items} />
        </div>
      </Section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section id="start" className="cine-surface cine-rim relative overflow-hidden py-14 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="arcs" opacity={0.65} mask="radial" position="50% 65%" />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="dark">{market.finalCta.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[2.9rem]">
              {market.finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {market.finalCta.text}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppCta href={market.contact.whatsapp()} className="w-full sm:w-auto" />
              <Link
                href="/contact?intent=call"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-arc-300/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-arc-300/60 hover:bg-white/10 sm:w-auto"
              >
                Book a free call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-400">
              <a href={`tel:${market.contact.phoneRaw}`} className="font-medium text-slate-200 hover:text-white">
                {market.contact.phoneDisplay}
              </a>
              <span aria-hidden="true">·</span>
              <a href="mailto:info@wordbitx.pk" className="font-medium text-slate-200 hover:text-white">
                info@wordbitx.pk
              </a>
              <span aria-hidden="true">·</span>
              <span>{market.contact.hours}</span>
            </p>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7">
            <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              Also serving
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
              {market.finalCta.cities.map((city) =>
                market.key === "pk" ? (
                  <li key={city.slug}>
                    <Link href={`/software-house/${city.slug}`} className="transition-colors hover:text-brand-300">
                      {city.name}
                    </Link>
                  </li>
                ) : (
                  <li key={city.slug}>{city.name}</li>
                ),
              )}
              <li className="text-slate-600">and worldwide</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
