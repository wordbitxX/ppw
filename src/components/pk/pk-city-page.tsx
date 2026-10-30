import Link from "next/link";
import { ArrowRight, CheckIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { CurText, CurrencySwitch, PackagePriceTiles } from "@/components/pk/currency";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { siteConfig, absoluteUrl } from "@/lib/site";
import {
  pkBookingHref,
  pkCallHref,
  pkEmail,
  pkHeroPrice,
  pkPackages,
  pkPhone,
  pkQuoteLine,
  pkSteps,
  pkTimelineNote,
  pkUpdated,
  pkWhatsAppHref,
  pkr,
  pkPricing,
} from "@/lib/pk";
import type { PkCityPage } from "@/lib/pk-cities";
import {
  PkButton,
  PkContactBar,
  PkDetailsStrip,
  PkFaqList,
  PkHeading,
  PkOwnerBanner,
  PkPriceCard,
  PkQuickAnswers,
  PkSamples,
  PkSection,
  PkStickyContact,
  PkTrustStrip,
} from "@/components/pk/pk-ui";

/** Which of the six approved builds to show on each city page. */
const citySampleIds: Record<string, string[]> = {
  "web-design-lahore": ["properties-pak", "luxury-restaurant", "motor"],
  "web-design-karachi": ["properties-pak", "ecommerce", "motor"],
  "web-design-islamabad": ["properties-pak", "healthcare", "education"],
  "web-design-rawalpindi": ["properties-pak", "motor", "education"],
  "web-design-faisalabad": ["ecommerce", "motor", "education"],
};

export function PkCityView({ page }: { page: PkCityPage }) {
  const samples = citySampleIds[page.slug] ?? ["properties-pak", "motor", "ecommerce"];
  const otherCities = page.nearby
    .map((slug) => ({ slug }))
    .filter(Boolean);

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Website design in ${page.name}`,
    serviceType: "Website design and development",
    description: page.lead,
    url: absoluteUrl(`/pk/${page.slug}`),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: `${siteConfig.url}/pk`,
      telephone: siteConfig.phoneRaw,
      email: siteConfig.email,
    },
    areaServed: { "@type": "City", name: page.name },
    ...(pkPricing.businessWebsite != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "PKR",
            price: pkPricing.businessWebsite,
            description: "Business Website package, starting price",
            url: `${siteConfig.url}/pk`,
          },
        }
      : {}),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pakistan prices", item: absoluteUrl("/pk") },
      { "@type": "ListItem", position: 3, name: page.name, item: absoluteUrl(`/pk/${page.slug}`) },
    ],
  };

  return (
    <div className="bg-white pb-24 lg:pb-0">
      {/* The fixed header is dark and translucent: keeping this offset strip
          navy-950 means it blends into the masthead instead of greying out
          over a white gap, and the page opens on one continuous dark block. */}
      <div className="bg-navy-950 pt-16 lg:pt-[72px]">
        <PkOwnerBanner />
        <PkContactBar />
      </div>

      {/* HERO — same navy band as /pk so the Pakistan offer reads as one
          product, not a separate microsite. Flat colour, white price card. */}
      <section className="bg-navy-700 text-white">
        <div className="container-page grid gap-8 pb-10 pt-8 sm:pb-12 sm:pt-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-12 lg:pb-14 lg:pt-12">
          <div>
            <nav aria-label="Breadcrumb" className="text-[0.72rem] text-slate-300">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-400">/</li>
                <li>
                  <Link href="/pk" className="hover:text-white">
                    Pakistan prices
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-400">/</li>
                <li className="font-medium text-white">{page.name}</li>
              </ol>
            </nav>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {page.name} · {page.province} · Since 2021
            </p>

            <h1 className="mt-3 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.8rem] lg:text-[3.15rem]">
              {page.h1}
            </h1>

            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-200 sm:text-lg">{page.lead}</p>

            {/* Same white price card as /pk, so every city page answers
                "how much" on the first screen. */}
            <div className="mt-5 max-w-xl rounded-2xl bg-white p-4 text-ink-900 shadow-[0_26px_60px_-34px_rgba(3,8,20,0.85)] sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-700">
                  <CurText pkr="Website packages · PKR" usd="Website packages · USD" />
                </p>
                <CurrencySwitch tone="light" />
              </div>
              <p className="mt-1 text-[1.4rem] font-semibold leading-[1.1] text-navy-700 sm:text-[1.7rem]">
                <CurText pkr={pkHeroPrice.headline} usd={pkHeroPrice.headlineUsd} />
              </p>
              <div className="mt-3">
                <PackagePriceTiles packages={pkPackages} />
              </div>
              <p className="mt-2.5 text-[0.76rem] leading-snug text-ink-500">
                Same two packages across Pakistan — both prices written on your quote.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <a
                href={pkWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                Contact us on WhatsApp
              </a>
              <Link
                href="/pk#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See the two packages
                <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-3 text-[0.8rem] text-slate-300">
              Free call, no obligation · or call / WhatsApp{" "}
              <a
                href={pkCallHref}
                className="font-semibold tabular-nums text-white underline decoration-brand-400/70 underline-offset-4 transition-colors hover:text-brand-200"
              >
                {pkPhone}
              </a>
            </p>
          </div>

          <div className="lg:pt-1">
            <PkQuickAnswers
              items={[
                {
                  label: "Price",
                  value: pkPricing.businessWebsite == null ? "Fixed quote in writing, in PKR" : `Websites from ${pkr(pkPricing.businessWebsite)}`,
                },
                ...page.quick,
              ]}
              title={`Quick answers — ${page.name}`}
            />
            <p className="mt-2.5 text-[0.74rem] text-slate-300">Last updated {pkUpdated.label}</p>
          </div>
        </div>
        <div className="h-1 bg-brand-500" aria-hidden="true" />
      </section>

      {/* TRUST STRIP */}
      <PkTrustStrip />

      {/* LOCAL CONTENT — only about this city */}
      <PkSection id="local">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <PkHeading eyebrow={`${page.name}, specifically`} title={`What building websites in ${page.name} actually involves`} />
            <div className="mt-4 space-y-3.5">
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[0.94rem] leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-700">
                Areas we cover in {page.name}
              </h2>
              <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-[0.85rem] text-ink-600 sm:grid-cols-2 lg:grid-cols-1">
                {page.areas.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-700">
                Industries we build for here
              </h2>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {page.industries.map((industry) =>
                  industry.href ? (
                    <li key={industry.label}>
                      <Link
                        href={industry.href}
                        className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.76rem] font-medium text-brand-700 hover:border-brand-300 hover:bg-brand-50"
                      >
                        {industry.label}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={industry.label}
                      className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-[0.76rem] text-ink-600"
                    >
                      {industry.label}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </aside>
        </div>
      </PkSection>

      {/* HOW LOCAL BUYERS SEARCH */}
      <PkSection id="local-search" tone="muted">
        <PkHeading
          eyebrow="How buyers search"
          title={`What people type before they call a ${page.name} business`}
          lead="The phrase on the left is the search. The note on the right is what the page has to answer for that search to end in an enquiry."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.searches.map((search) => (
            <div key={search.phrase} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[0.95rem] font-semibold leading-snug text-navy-700">“{search.phrase}”</p>
              <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-600">{search.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[0.85rem] text-ink-600">
          We build the pages for these searches, then keep them current.{" "}
          <Link href="/services/local-seo" className="font-semibold text-brand-700 hover:text-brand-800">
            How local SEO works
          </Link>
          .
        </p>
      </PkSection>

      {/* LOCAL SERVICES */}
      <PkSection id="services">
        <PkHeading
          eyebrow="What we build here"
          title={`Websites and software for ${page.name} businesses`}
          lead="Each of these is the kind of scope we write for this market — not a template with the industry name changed."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.local.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-[0.95rem] font-semibold leading-snug text-navy-700">{item.title}</h3>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-600">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <PkButton href="/services" variant="secondary">
            All services
          </PkButton>
          <PkButton href="/pk" variant="secondary">
            Pakistan prices (PKR)
          </PkButton>
        </div>
      </PkSection>

      {/* SAMPLES */}
      <PkSection id="samples" tone="muted">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <PkHeading
            eyebrow="Sample work"
            title="Open the builds, not a brochure"
            lead="One live WordbitX product and two demo builds — every card opens a working site."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-brand-700 hover:text-brand-800"
          >
            Full portfolio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8">
          <PkSamples ids={samples} />
        </div>
      </PkSection>

      {/* PRICING */}
      <PkSection id="pricing">
        <PkHeading
          eyebrow="Pricing"
          title={`What a website costs for a ${page.name} business`}
          lead="Same two packages as the rest of Pakistan. The rupee figure depends on pages and scope, and it is fixed in writing."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {pkPackages.map((pkg) => (
            <PkPriceCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-[0.9rem] leading-relaxed text-ink-700">
          {pkQuoteLine}
        </p>
        <p className="mt-3 text-[0.85rem] text-ink-600">
          Read the full breakdown on{" "}
          <Link href="/pk" className="font-semibold text-brand-700 hover:text-brand-800">
            Pakistan prices
          </Link>{" "}
          or the{" "}
          <Link href="/blog/website-development-cost-pakistan" className="font-semibold text-brand-700 hover:text-brand-800">
            website cost guide for Pakistan
          </Link>
          .
        </p>
      </PkSection>

      {/* PROCESS */}
      <PkSection id="how-it-works" tone="muted">
        <PkHeading
          eyebrow="How it works"
          title="Four steps, same in every city"
          lead="A free conversation, a written quote, weekly demos, then launch and support."
        />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pkSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-[0.8rem] font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 text-[0.95rem] font-semibold text-navy-700">{step.title}</h3>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl rounded-2xl bg-brand-50 px-5 py-4 text-[0.88rem] leading-relaxed text-ink-700">
          <span className="font-semibold text-navy-700">On timelines:</span> {pkTimelineNote}
        </p>
      </PkSection>

      {/* LOCAL SEO */}
      <PkSection id="local-seo">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <PkHeading
            eyebrow="Local SEO"
            title={`Getting found in ${page.name}, area by area`}
            lead="Month-to-month, with a written report — no annual lock-in and no promised rankings."
          />
          <div className="space-y-3.5">
            {page.localSeo.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[0.92rem] leading-relaxed text-ink-600">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-1">
              <PkButton href="/services/local-seo" variant="secondary">
                Local SEO
              </PkButton>
              <PkButton href="/services/seo-services" variant="secondary">
                SEO services
              </PkButton>
            </div>
          </div>
        </div>
      </PkSection>

      {/* FAQ */}
      <PkSection id="faqs" tone="muted">
        <PkHeading
          eyebrow={`${page.name} questions`}
          title="The questions we get from this city"
          lead="Short answers, and the links go to the page with the detail."
        />
        <div className="mt-7 max-w-4xl">
          <PkFaqList faqs={page.faqs} />
        </div>
      </PkSection>

      {/* FINAL CTA */}
      <section className="bg-navy-700 py-12 text-white sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div>
            <h2 className="text-[1.7rem] font-semibold leading-tight text-white sm:text-4xl">
              {pkPricing.businessWebsite == null
                ? `A fixed written quote for your ${page.name} website`
                : `Websites from ${pkr(pkPricing.businessWebsite)}`}
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-200">
              Tell us what the business does and what the site must achieve. Same packages as everywhere in Pakistan, and
              the same written scope before work starts.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <PkButton href={pkBookingHref} variant="onNavy">
                Book a free call
              </PkButton>
              <a
                href={pkWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                WhatsApp {pkPhone}
              </a>
            </div>
          </div>

          <ul className="grid gap-3 rounded-2xl bg-white/[0.07] p-5 text-[0.88rem] ring-1 ring-white/15">
            <li className="flex items-start gap-2.5">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <span>
                <a href={pkCallHref} className="font-semibold text-white hover:text-brand-200">
                  {pkPhone}
                </a>
                <span className="block text-[0.78rem] text-slate-300">Pakistan — call or WhatsApp</span>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <span>
                <a href={`mailto:${pkEmail}`} className="font-semibold text-white hover:text-brand-200">
                  {pkEmail}
                </a>
                <span className="block text-[0.78rem] text-slate-300">Email with your brief</span>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <span className="text-slate-100">
                {pkPricing.hours ?? "Lahore business hours (PKT)"}
                <span className="block text-[0.78rem] text-slate-300">
                  Base: DHA Phase 2, Lahore — working across {page.name}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* CITY LINKS */}
      <PkSection id="more-cities">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-700">Other cities</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {otherCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/pk/${city.slug}`}
                    className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-brand-700 hover:text-brand-800"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    Web design in {city.slug.replace("web-design-", "").replace(/^\w/, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-700">Related pages</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-ink-600 hover:text-brand-700"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PkSection>

      <PkDetailsStrip />
      <PkStickyContact />

      <FaqSchema faqs={page.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
      <p className="container-page py-4 text-[0.72rem] text-ink-500">
        Last updated: {pkUpdated.label}. National questions are answered on the{" "}
        <Link href="/pk" className="underline underline-offset-2 hover:text-brand-700">
          Pakistan prices page
        </Link>
        .
      </p>
    </div>
  );
}
