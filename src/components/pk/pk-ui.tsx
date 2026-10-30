import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites, type DemoWebsite } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import {
  pkAddress,
  pkCallHref,
  pkPackages,
  pkEmail,
  pkOffices,
  pkPending,
  pkPhone,
  pkPricing,
  pkPriceRange,
  pkSamples,
  pkTrust,
  pkUpdated,
  pkUsPhone,
  pkWhatsAppHref,
  type PkFaq,
  type PkPackage,
  priceLead,
  pkr,
  usd,
  usdFrom,
} from "@/lib/pk";

export function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                    */
/* ------------------------------------------------------------------ */

/** The one card surface used across the Pakistan pages. */
export const pkCard =
  "rounded-3xl bg-white ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]";

/** Navy square behind a section icon, BrandBees-style. */
export const pkIconTile =
  "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-700 text-white";

export function PkSection({
  children,
  id,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "light" | "muted" | "navy";
  className?: string;
}) {
  const tones = {
    light: "bg-white text-ink-900",
    muted: "bg-[#F6F8FC] text-ink-900",
    navy: "bg-navy-700 text-white",
  } as const;

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-14 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function PkHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`inline-flex items-center rounded-full px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] ${
            dark ? "bg-white/10 text-brand-200 ring-1 ring-white/15" : "bg-[#EDF2FB] text-navy-700"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`mt-3 text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.4rem] lg:text-[2.8rem] ${
          dark ? "text-white" : "text-navy-700"
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={`mt-3 text-[0.98rem] leading-relaxed sm:text-[1.05rem] ${
            dark ? "text-slate-200" : "text-ink-600"
          } ${center ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                              */
/* ------------------------------------------------------------------ */

type PkButtonVariant = "primary" | "secondary" | "onNavy" | "ghost";

const buttonStyles: Record<PkButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "border border-slate-300 bg-white text-navy-700 hover:border-brand-600 hover:text-brand-700",
  onNavy: "bg-white text-navy-700 hover:bg-brand-50",
  ghost: "border border-white/35 text-white hover:bg-white/10",
};

export function PkButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: PkButtonVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${buttonStyles[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                          */
/* ------------------------------------------------------------------ */

/**
 * The four-line trust strip under the hero. Deliberately shaped like a
 * property-board: four even cells, one icon each, a rule between them. Same
 * four facts as before — nothing added that the owner has not confirmed.
 */
const trustIcons = [ClockIcon, GlobeIcon, ShieldIcon, CheckIcon];

export function PkTrustStrip() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container-page grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {pkTrust.map((item, index) => {
          const Icon = trustIcons[index % trustIcons.length];
          return (
          <div
            key={item.title}
            className={`flex items-center gap-3 py-5 sm:px-6 sm:py-6 ${
              index > 0 ? "sm:border-l sm:border-slate-200" : ""
            } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EDF2FB] text-navy-700">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="leading-snug">
              <span className="block text-[1.05rem] font-bold leading-tight tracking-[-0.01em] text-navy-700">
                {item.title}
              </span>
              <span className="mt-0.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-ink-500">
                {item.body}
              </span>
            </p>
          </div>
          );
        })}
      </div>
    </div>
  );
}

/** Where we actually sit — two Lahore offices and one in Islamabad. */
export function PkOffices({ tone = "light" }: { tone?: "light" | "muted" }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
      {pkOffices.map((office) => (
        <article
          key={office.id}
          className={`rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]`}
        >
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-brand-700">{office.role}</p>
          <h3 className="mt-1.5 flex items-center gap-2 text-[1.05rem] font-semibold text-navy-700">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-navy-700 text-white">
              <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {office.area === office.city ? office.city : `${office.area}, ${office.city}`}
          </h3>
          <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-600">
            {office.street ?? "Street address and map pin shared when your meeting is booked."}
          </p>
          <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-500">{office.note}</p>
          {office.mapUrl ? (
            <a
              href={office.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-brand-700 hover:text-brand-800"
            >
              Open in Google Maps
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-3 text-[0.74rem] font-medium text-ink-500">
              Pin coming —{" "}
              <a href={pkCallHref} className="text-brand-700 hover:text-brand-800">
                ask on {pkPhone}
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick answers (search-snippet box)                                   */
/* ------------------------------------------------------------------ */

export function PkQuickAnswers({
  items,
  title = "Quick answers",
}: {
  items: { label: string; value: string }[];
  title?: string;
}) {
  return (
    <dl className="overflow-hidden rounded-3xl bg-white text-left ring-1 ring-white/15 shadow-[0_26px_56px_-34px_rgba(0,0,0,0.75)]">
      <div className="border-b border-slate-200 bg-[#F6F8FC] px-4 py-2.5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">{title}</p>
      </div>
      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <dt className="text-[0.78rem] font-semibold text-ink-500">{item.label}</dt>
            <dd className="text-[0.85rem] font-medium leading-snug text-navy-700">{item.value}</dd>
          </div>
        ))}
      </div>
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                              */
/* ------------------------------------------------------------------ */

export function PkPriceCard({ pkg }: { pkg: PkPackage }) {
  const onNavy = pkg.popular;

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
        onNavy
          ? "bg-navy-700 text-white shadow-[0_36px_70px_-40px_rgba(5,39,103,0.85)]"
          : "bg-white text-ink-900 ring-1 ring-slate-900/[0.07] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.4)]"
      }`}
    >
      {pkg.popular ? (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
          Most popular
        </span>
      ) : null}

      <p className={`text-[0.62rem] font-bold uppercase tracking-[0.16em] ${onNavy ? "text-brand-200" : "text-ink-500"}`}>
        {pkg.popular ? "All-in-one" : "Your own domain & hosting"}
      </p>
      <h3 className={`mt-1.5 text-[1.25rem] font-bold ${onNavy ? "text-white" : "text-navy-700"}`}>{pkg.name}</h3>
      <p className={`mt-1 text-[0.88rem] ${onNavy ? "text-slate-300" : "text-ink-500"}`}>{pkg.tagline}</p>

      <div className={`mt-5 flex flex-wrap items-baseline gap-x-2 border-y py-4 ${onNavy ? "border-white/15" : "border-slate-200"}`}>
        <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${onNavy ? "text-slate-300" : "text-ink-500"}`}>
          from
        </span>
        <span className={`text-[2.1rem] font-bold leading-none tabular-nums ${onNavy ? "text-white" : "text-navy-700"}`}>
          <PriceText
            pkr={pkg.price == null ? "Fixed quote" : pkr(pkg.price)}
            usd={
              usdFrom(pkg.price, pkg.usdPrice ?? null) == null
                ? "Fixed quote in USD"
                : usd(usdFrom(pkg.price, pkg.usdPrice ?? null) as number)
            }
          />
        </span>
      </div>
      <p className={`mt-2 text-[0.78rem] leading-snug ${onNavy ? "text-slate-300" : "text-ink-500"}`}>
        <PriceText
          pkr="One-time build. Quoted in PKR, fixed in writing."
          usd="One-time build. Quoted in USD or PKR, fixed in writing."
        />
      </p>

      <ul className="mt-5 flex-1 space-y-3">
        {pkg.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-[0.88rem] leading-snug">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${onNavy ? "text-brand-300" : "text-brand-600"}`}
              aria-hidden="true"
            />
            <span className={onNavy ? "text-slate-100" : "text-ink-700"}>{bullet}</span>
          </li>
        ))}
      </ul>

      <p className={`mt-4 text-[0.76rem] leading-relaxed ${onNavy ? "text-slate-400" : "text-ink-500"}`}>
        {pkg.footnote}
      </p>

      <div className="mt-6">
        <PkButton
          href="/contact"
          variant={onNavy ? "onNavy" : "secondary"}
          className="w-full"
          ariaLabel={`Book a free call about the ${pkg.name} package`}
        >
          Book a free call
        </PkButton>
      </div>
    </article>
  );
}

function sampleDemo(id: string): DemoWebsite | undefined {
  return demoWebsites.find((demo) => demo.id === id);
}

export function PkSamples({ limit, ids }: { limit?: number; ids?: string[] }) {
  const selected = ids ? pkSamples.filter((sample) => ids.includes(sample.demoId)) : pkSamples;
  const chosen = limit ? selected.slice(0, limit) : selected;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {chosen.map((sample) => {
        const demo = sampleDemo(sample.demoId);
        if (!demo) return null;
        const preview = demoPreview(demo);

        return (
          <article
            key={sample.demoId}
            className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)] transition-shadow hover:shadow-[0_28px_60px_-34px_rgba(5,39,103,0.55)]"
          >
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${demo.name} — ${sample.type}`}
              className="relative block overflow-hidden bg-navy-950"
            >
              <ShowcaseStage
                demo={demo}
                shot={preview.src}
                isCover={preview.isCover}
                stage={demoStageSrc(demo)}
                variant="card"
              />
              {preview.isCover ? (
                <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/65 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
                  Illustration
                </span>
              ) : null}
            </a>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] ${
                    demo.kind === "live"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-ink-600 ring-1 ring-slate-200"
                  }`}
                >
                  {demo.kind === "live" ? <GlobeIcon className="h-3 w-3" aria-hidden="true" /> : null}
                  {demo.kind === "live" ? "Live product" : "Demo"}
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-500">
                  {sample.industry}
                </span>
              </div>

              <h3 className="mt-2.5 text-base font-semibold leading-snug text-navy-700">{demo.name}</h3>
              <p className="mt-0.5 text-[0.78rem] font-medium text-ink-500">{sample.type}</p>
              <p className="mt-2 flex-1 text-[0.84rem] leading-relaxed text-ink-600">{sample.built}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-[0.78rem] font-semibold">
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-700 hover:text-brand-800"
                >
                  Open live site
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <Link href={sample.project.href} className="inline-flex items-center gap-1 text-ink-600 hover:text-navy-700">
                  {sample.project.label}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs — native details, so no client JS and the text is in the HTML    */
/* ------------------------------------------------------------------ */

export function PkFaqList({ faqs }: { faqs: PkFaq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group rounded-2xl bg-white ring-1 ring-slate-900/[0.06] shadow-[0_16px_36px_-30px_rgba(5,39,103,0.5)] open:shadow-[0_22px_48px_-32px_rgba(5,39,103,0.55)]"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left marker:hidden sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[0.95rem] font-semibold leading-snug text-navy-700 sm:text-base">{faq.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF3FB] text-lg leading-none font-medium text-navy-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6">
            <p className="text-[0.9rem] leading-relaxed text-ink-600">{faq.a}</p>
            {faq.links?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {faq.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-full bg-[#EEF3FB] px-3 py-1 text-[0.74rem] font-semibold text-navy-700 hover:bg-brand-50 hover:text-brand-800"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact bar and footer details                                       */
/* ------------------------------------------------------------------ */

export function PkContactBar() {
  return (
    <div className="border-b border-white/10 bg-navy-950">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <p className="flex items-center gap-2 text-[0.7rem] font-medium text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          <span className="text-slate-300">Lahore, Pakistan</span>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">
            |
          </span>
          <span className="hidden sm:inline">SECP &amp; FBR registered</span>
        </p>

        <div className="flex items-center gap-x-4 gap-y-1 text-[0.74rem] font-medium text-slate-300 sm:gap-x-6">
          <a href={pkCallHref} className="inline-flex items-center gap-1.5 tabular-nums transition-colors hover:text-white">
            <PhoneIcon className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            {pkPhone}
          </a>
          <a
            href={pkWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={`mailto:${pkEmail}`}
            className="hidden items-center gap-1.5 transition-colors hover:text-white md:inline-flex"
          >
            <MailIcon className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            {pkEmail}
          </a>
        </div>
      </div>
    </div>
  );
}

export function PkStickyContact() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2 px-3 pr-20">
        <a
          href={pkCallHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 py-3 text-sm font-semibold text-white"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          Call now
        </a>
        <a
          href={pkWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#128C7E] px-4 py-3 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export function PkDetailsStrip() {
  const range = pkPriceRange();

  return (
    <section className="bg-[#F6F8FC] py-12">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">Company</p>
          <p className="mt-2 text-sm font-semibold leading-snug text-navy-700">WordbitX TECHNOLOGY SMC – PVT. LTD.</p>
          <ul className="mt-1 space-y-0.5 text-[0.82rem] leading-relaxed text-ink-500">
            {pkOffices.map((office) => (
              <li key={office.id}>{office.area === office.city ? office.city : `${office.area}, ${office.city}`}</li>
            ))}
          </ul>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-500">SECP &amp; FBR registered</p>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">Pakistan</p>
          <a href={pkCallHref} className="mt-2 flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-brand-700">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {pkPhone}
          </a>
          <a href={`mailto:${pkEmail}`} className="mt-1.5 flex items-center gap-2 text-sm text-ink-600 hover:text-brand-700">
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            {pkEmail}
          </a>
          <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-500">USA line, kept separate: {pkUsPhone}</p>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">Hours</p>
          <p className="mt-2 flex items-start gap-2 text-sm text-ink-600">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
            {pkPricing.hours ?? "Lahore business hours (PKT) — messages answered from this phone"}
          </p>
          <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-500">Last updated {pkUpdated.label}</p>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">Prices &amp; policies</p>
          <p className="mt-2 text-sm text-ink-600">{range ?? "PKR quotes in writing before work starts"}</p>
          <p className="mt-1 text-[0.76rem] leading-relaxed text-ink-500">
            Payment and revision terms are set out in your written scope.
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem]">
            <li>
              <Link href="/privacy-policy" className="text-ink-600 underline-offset-4 hover:text-brand-700 hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="text-ink-600 underline-offset-4 hover:text-brand-700 hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="text-ink-600 underline-offset-4 hover:text-brand-700 hover:underline">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dev-only owner checklist                                             */
/* ------------------------------------------------------------------ */

export function PkOwnerBanner() {
  /**
   * Off by default — including in the dev preview, where it was burying the
   * hero under an internal to-do list. Turn it on only when you want the
   * checklist:
   *
   *   NEXT_PUBLIC_PK_CHECKLIST=1 npm run dev
   *
   * Never renders in a production build, whatever the variable says.
   */
  if (process.env.NODE_ENV === "production") return null;
  if (process.env.NEXT_PUBLIC_PK_CHECKLIST !== "1") return null;

  return (
    <div className="border-b border-amber-300 bg-amber-50">
      <div className="container-page py-3">
        <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-amber-800">
          <ShieldIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Preview build — owner checklist before publish
        </p>
        <ul className="mt-1.5 grid gap-x-6 gap-y-1 text-[0.78rem] text-amber-900 sm:grid-cols-2">
          {pkPending.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="mt-1.5 text-[0.72rem] text-amber-800">
          This banner appears in development only. Production pages never show a placeholder.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cross-link banner for service and pricing pages                      */
/* ------------------------------------------------------------------ */

export function PkPricesBanner({ text }: { text?: string }) {
  return (
    <div className="border-b border-slate-200 bg-brand-50">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <p className="text-[0.85rem] text-navy-700">
          {text ?? "Buying from Pakistan? Two website packages are priced in PKR, with a fixed written quote before work starts."}
        </p>
        <Link
          href="/pk"
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-brand-700 hover:border-brand-600 hover:text-brand-800"
        >
          Pakistan Prices (PKR)
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reference blocks: stat bar, info cards, pill list, action row        */
/* ------------------------------------------------------------------ */

/**
 * The four-up stat bar that sits under a centered "at a glance" heading.
 * Flat navy either way — the reference uses a gradient here, our brand rules
 * say one flat colour, so this is navy-700 with a 1px white/10 rule between
 * cells. Values are the company's own checkable numbers.
 */
export function PkStatBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-navy-700 shadow-[0_30px_60px_-38px_rgba(5,39,103,0.85)]">
      <dl className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-6 py-6 text-center ${index > 0 ? "sm:border-l sm:border-white/10" : ""} ${
              index === 2 ? "sm:border-l-0 lg:border-l" : ""
            }`}
          >
            <dd className="text-[1.7rem] font-bold leading-none tracking-[-0.02em] tabular-nums text-white">
              {stat.value}
            </dd>
            <dt className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-200">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Three white info cards under the stat bar: office, languages, registration. */
export function PkInfoCards({
  items,
}: {
  items: { title: string; body: ReactNode; link?: { label: string; href: string } }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className={`${pkCard} p-6`}>
          <div className="flex items-center gap-3">
            <span className={pkIconTile}>
              <CheckIcon className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <h3 className="text-[1rem] font-bold text-navy-700">{item.title}</h3>
          </div>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-600">{item.body}</p>
          {item.link ? (
            <Link
              href={item.link.href}
              className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-semibold text-brand-700 hover:text-brand-800"
            >
              {item.link.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

/** Rounded industry chips — the reference's "industries we work with" block. */
export function PkPillList({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className={`${pkCard} px-5 py-6 sm:px-8 sm:py-8`}>
      <ul className="flex flex-wrap justify-center gap-2.5">
        {items.map((item) => {
          const chip =
            "inline-flex items-center rounded-full bg-[#F3F6FB] px-4 py-2 text-[0.85rem] font-medium text-navy-700 ring-1 ring-slate-900/[0.04]";
          return (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} className={`${chip} transition-colors hover:bg-[#E7EEF9]`}>
                  {item.label}
                </Link>
              ) : (
                <span className={chip}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The "Contact us · See packages" pair that closes most sections. */
export function PkActions({ tone = "light" }: { tone?: "light" | "dark" | "navy" }) {
  const secondary =
    tone === "light"
      ? "border-slate-300 bg-white text-navy-700 hover:border-brand-600 hover:text-brand-700"
      : "border-white/40 text-white hover:bg-white/10";

  return (
    <div className="mt-8 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
      <a
        href={pkWhatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
      >
        <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
        Contact us
      </a>
      <Link
        href="#pricing"
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors ${secondary}`}
      >
        See packages
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Prices (server-rendered, CSS-switched)                               */
/* ------------------------------------------------------------------ */

/**
 * A price that exists in both currencies at once.
 *
 * Both lines are rendered here on the server; CSS (see .pk-pkr / .pk-usd in
 * globals.css) shows the one the header switch asked for. Nothing about a
 * price is ever sent to the client as a component, so the price can never be
 * the reason hydration throws.
 */
export function PriceText({ pkr, usd }: { pkr: ReactNode; usd: ReactNode }) {
  return (
    <>
      <span className="pk-pkr">{pkr}</span>
      <span className="pk-usd">{usd}</span>
    </>
  );
}

/** The two package price tags used in the hero and on the city pages. */
export function PkPriceTags({ tone = "light" }: { tone?: "light" | "dark" }) {
  const frame =
    tone === "dark"
      ? "rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3"
      : "rounded-xl border border-slate-200 px-3 py-2";

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {pkPackages.map((pkg) => {
        const usdPrice = usdFrom(pkg.price, pkg.usdPrice ?? null);
        return (
          <div key={pkg.id} className={frame}>
            <p
              className={`text-[0.62rem] font-bold uppercase tracking-[0.12em] ${
                tone === "dark" ? "text-brand-300" : "text-ink-500"
              }`}
            >
              {pkg.name}
            </p>
            <p
              className={`text-[1rem] font-semibold leading-snug tabular-nums ${
                tone === "dark" ? "text-white" : "text-navy-700"
              }`}
            >
              <PriceText
                pkr={pkg.price == null ? "Fixed quote" : `from ${pkr(pkg.price)}`}
                usd={usdPrice == null ? "Fixed quote in USD" : `from ${usd(usdPrice)}`}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero device composition                                              */
/* ------------------------------------------------------------------ */

/**
 * The right-hand side of the /pk hero, in the shape the owner pointed at:
 * a laptop frame carrying the Properties Pak artwork, with a small white
 * fact card overlapping its corner.
 *
 * The screen is the commissioned cover illustration, not a screenshot — so
 * the frame has no browser toolbar and a plain language note sits under it.
 * `/public/demos/properties-pak.jpg` (a real capture from `npm run demo:shots`)
 * replaces the artwork the moment it exists, and the note drops the word
 * "illustration" by itself.
 */
export function PkHeroDevices() {
  const pak = demoWebsites.find((demo) => demo.id === "properties-pak");
  if (!pak) return null;
  const preview = demoPreview(pak);

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      {/* laptop */}
      <div className="rounded-[1.15rem] bg-white/10 p-2 ring-1 ring-white/20 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-sm">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.7rem] bg-navy-900">
          <Image
            src={preview.src}
            alt={
              preview.isCover
                ? "Illustration of a desktop property portal — map search, listing cards and filters"
                : "The Properties Pak property portal on a desktop screen"
            }
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* laptop base */}
      <div className="mx-auto h-2.5 w-[104%] -translate-y-px rounded-b-[0.9rem] rounded-t-sm bg-white/25" aria-hidden="true" />

      {/* floating fact card */}
      <div className="absolute -bottom-7 left-0 w-[15.5rem] rounded-2xl bg-white p-4 text-ink-900 shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)] sm:-left-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-brand-800">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          Live project
        </span>
        <p className="mt-2 text-[0.95rem] font-bold leading-tight text-navy-700">Properties Pak</p>
        <p className="mt-0.5 text-[0.74rem] leading-snug text-ink-500">propertiespak.com</p>
        <a
          href={pak.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-brand-700 hover:text-brand-800"
        >
          Open the live site
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-9 text-[0.72rem] leading-snug text-slate-400 lg:pl-1">
        {preview.isCover
          ? "The screen shows an illustration of the portal; open the site to see the real product."
          : "A capture of the live Properties Pak portal."}
      </p>
    </div>
  );
}
