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
  pkEmail,
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
} from "@/lib/pk";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                    */
/* ------------------------------------------------------------------ */

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
    muted: "bg-slate-50 text-ink-900",
    navy: "bg-navy-700 text-white",
  } as const;

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-slate-200/80 py-12 sm:py-16 lg:py-20 ${tones[tone]} ${className}`}
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
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
            tone === "dark" ? "text-brand-300" : "text-brand-700"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`mt-2 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[2.6rem] ${
          tone === "dark" ? "text-white" : "text-navy-700"
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p className={`mt-3 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-slate-200" : "text-ink-600"}`}>
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

export function PkTrustStrip() {
  return (
    <div className="border-y border-slate-200 bg-slate-50">
      <div className="container-page grid gap-x-6 gap-y-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {pkTrust.map((item) => (
          <div key={item.title} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            <p className="text-sm leading-snug text-ink-700">
              <span className="font-semibold text-navy-700">{item.title}</span>
              <span className="block text-[0.8rem] text-ink-500">{item.body}</span>
            </p>
          </div>
        ))}
      </div>
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
    <dl className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_18px_40px_-32px_rgba(5,39,103,0.45)]">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
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
          ? "bg-navy-700 text-white shadow-[0_30px_60px_-40px_rgba(5,39,103,0.9)] ring-1 ring-navy-700"
          : "border border-slate-200 bg-white text-ink-900"
      }`}
    >
      {pkg.popular ? (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white">
          Most popular
        </span>
      ) : null}

      <h3 className={`text-xl font-semibold ${onNavy ? "text-white" : "text-navy-700"}`}>{pkg.name}</h3>
      <p className={`mt-1 text-sm ${onNavy ? "text-slate-200" : "text-ink-500"}`}>{pkg.tagline}</p>

      <div className={`mt-5 rounded-2xl px-4 py-4 ${onNavy ? "bg-white/10" : "bg-brand-50"}`}>
        <p className={`text-[0.66rem] font-bold uppercase tracking-[0.16em] ${onNavy ? "text-brand-200" : "text-brand-700"}`}>
          {pkg.price == null ? "Package price" : "Starting price"}
        </p>
        <p className={`mt-1 text-[1.65rem] font-semibold leading-tight ${onNavy ? "text-white" : "text-navy-700"}`}>
          {priceLead(pkg.price)}
        </p>
        <p className={`mt-1 text-[0.78rem] leading-snug ${onNavy ? "text-slate-200" : "text-ink-600"}`}>
          {pkg.price == null ? "In PKR, written before work starts" : "One-time build. Quoted in PKR, fixed in writing"}
        </p>
        {process.env.NODE_ENV !== "production" && pkg.price == null ? (
          <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-[0.62rem] font-semibold text-amber-800">
            Owner: add the price in src/lib/pk.ts
          </p>
        ) : null}
      </div>

      <ul className="mt-5 space-y-2.5">
        {pkg.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-[0.86rem] leading-snug">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${onNavy ? "text-brand-300" : "text-brand-600"}`}
              aria-hidden="true"
            />
            <span className={onNavy ? "text-slate-100" : "text-ink-700"}>{bullet}</span>
          </li>
        ))}
      </ul>

      <p className={`mt-4 text-[0.76rem] leading-relaxed ${onNavy ? "text-slate-300" : "text-ink-500"}`}>
        {pkg.footnote}
      </p>

      <div className="mt-6 pt-1">
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

/* ------------------------------------------------------------------ */
/* Samples                                                              */
/* ------------------------------------------------------------------ */

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
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
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
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left marker:hidden hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[0.95rem] font-semibold leading-snug text-navy-700">{faq.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-ink-500 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5">
            <p className="text-[0.88rem] leading-relaxed text-ink-600">{faq.a}</p>
            {faq.links?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {faq.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.74rem] font-semibold text-brand-700 hover:border-brand-300 hover:bg-brand-50"
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
    <div className="border-b border-slate-200 bg-brand-50/80">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2.5">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-800">
          Pakistan Prices (PKR)
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.8rem] font-medium text-navy-700">
          <a href={pkCallHref} className="inline-flex items-center gap-1.5 hover:text-brand-700">
            <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {pkPhone}
          </a>
          <a
            href={pkWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-700"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp
          </a>
          <a href={`mailto:${pkEmail}`} className="hidden items-center gap-1.5 hover:text-brand-700 sm:inline-flex">
            <MailIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
    <section className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">Company</p>
          <p className="mt-2 text-sm font-semibold leading-snug text-navy-700">WordbitX TECHNOLOGY SMC – PVT. LTD.</p>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-500">{pkAddress}</p>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-500">SECP &amp; FBR registered</p>
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
  if (process.env.NODE_ENV === "production") return null;

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
