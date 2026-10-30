import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading, Eyebrow } from "@/components/ui";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { CineBackdrop } from "@/components/cinematic";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  ServiceIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { PkIcon } from "@/components/pk-icons";
import { MiniCityMap, PakistanMap } from "@/components/pk-map";
import { demoWebsites, showcaseRel } from "@/lib/demos";
import { demoPreview } from "@/lib/demo-shots";
import { absoluteUrl, siteConfig, whatsappLink } from "@/lib/site";
import {
  pkFaqs,
  pkCityCards,
  pkCitiesServed,
  pkGlanceStats,
  pkHeroStats,
  pkIncluded,
  pkPackages,
  pkPlatforms,
  pkPakistanFeatures,
  pkPrices,
  pkSectors,
  pkServices,
  pkSteps,
  pkWhy,
  pkWork,
} from "@/lib/pk-landing";

export const metadata: Metadata = {
  title: { absolute: "Websites for Pakistani Businesses from Rs. 20,000 | WordbitX" },
  description:
    "Mobile-first WordPress, Shopify and custom websites for Pakistani businesses from Rs. 20,000 — or Rs. 25,000 with domain and 1 year hosting. 3 months support. Lahore-based team.",
  keywords: [
    "website design Pakistan",
    "website price in Pakistan",
    "web design company Lahore",
    "WordPress website Pakistan",
    "Shopify store development Pakistan",
    "custom website Pakistan",
    "website Rs 20,000",
    "ecommerce website Pakistan",
    "FBR POS software Pakistan",
    "cheap website Pakistan",
  ],
  alternates: { canonical: "/pk" },
  openGraph: {
    url: "/pk",
    type: "website",
    title: "Websites for Pakistani businesses from Rs. 20,000 | WordbitX",
    description:
      "A complete business website from Rs. 20,000. Rs. 25,000 with domain and 1 year hosting, 3 months support, fixed written quote.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "WordbitX — websites for Pakistani businesses from Rs. 20,000",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites for Pakistani businesses from Rs. 20,000 | WordbitX",
    description:
      "Mobile-first websites for Pakistani businesses. Rs. 20,000, or Rs. 25,000 with domain and 1 year hosting.",
    images: [siteConfig.ogImage],
  },
};

const cardLight =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-44px_rgba(5,13,33,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_32px_60px_-40px_rgba(5,39,103,0.45)]";
const cardDark =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]";

const defaultMessage =
  "Hello WordbitX, I saw your Pakistan website packages (Rs. 20,000 / Rs. 25,000). I would like to discuss my business website.";

function WhatsAppCta({
  message = defaultMessage,
  children = "Contact us",
  variant = "brand",
  className = "",
}: {
  message?: string;
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
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${styles} ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </a>
  );
}

function PackagesLink({ variant = "outline" }: { variant?: "outline" | "light" }) {
  const styles =
    variant === "outline"
      ? "border border-white/25 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white/10"
      : "border border-slate-300 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700";
  return (
    <Link
      href="#packages"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ${styles}`}
    >
      See packages
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export default function PakistanLandingPage() {
  const work = pkWork
    .map((item) => {
      const demo = demoWebsites.find((entry) => entry.id === item.id);
      return demo ? { demo, blurb: item.blurb } : null;
    })
    .filter((item): item is { demo: (typeof demoWebsites)[number]; blurb: string } => Boolean(item));

  const serviceOfferSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/pk")}#service`,
    name: "Website design and development for Pakistani businesses",
    serviceType: "Website design, WordPress and WooCommerce, Shopify and custom development",
    url: absoluteUrl("/pk"),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.streetAddress,
        addressLocality: siteConfig.addressLocality,
        addressRegion: siteConfig.addressRegion,
        addressCountry: siteConfig.addressCountry,
      },
    },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Karachi" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "City", name: "Sialkot" },
      { "@type": "City", name: "Gujranwala" },
      { "@type": "City", name: "Faisalabad" },
    ],
    offers: pkPackages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.price.replace(/[^0-9]/g, ""),
      priceCurrency: "PKR",
      description: pkg.features.join("; "),
      url: absoluteUrl("/pk"),
      availability: "https://schema.org/InStock",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pakistan", item: absoluteUrl("/pk") },
    ],
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="cine-surface relative overflow-hidden bg-midnight pt-24 text-white sm:pt-28 lg:pt-32">
        <CineBackdrop variant="calm" opacity={0.5} mask="b" position="72% 30%" scrimLeft />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.16]" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-16">
            <div>
              <Eyebrow tone="dark">Pakistan-based web agency · Since 2021</Eyebrow>
              <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.35rem]">
                Professional websites for Pakistani businesses
              </h1>
              <p className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                Websites from <span className="text-brand-300">{pkPrices.basic}</span>
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
                Mobile-first WordPress sites, Shopify stores and custom builds, built by a Lahore team. Add your domain
                and 1 year of hosting for {pkPrices.allInOne}. {pkPrices.supportMonths} months of support included.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCta />
                <PackagesLink />
              </div>
              <p className="mt-5 text-sm text-slate-400">
                <Link
                  href="/contact?intent=call"
                  className="font-semibold text-white underline decoration-brand-400/60 decoration-2 underline-offset-4 transition-colors hover:text-brand-300"
                >
                  Book a free call
                </Link>{" "}
                or call{" "}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="font-medium text-slate-200 transition-colors hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
            </div>

            {/* A real WordbitX storefront scene — the laptop is the demo, the
                floating card states the offer rather than faking a screenshot. */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-500/12 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-navy-900 shadow-[0_50px_110px_-45px_rgba(3,8,20,0.9)]">
                <Image
                  src="/demos/cover/ecommerce.jpg"
                  alt="Illustration of a boutique counter with the Veranne online store WordbitX designed, shown on a laptop"
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="h-auto w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4 hidden rounded-2xl border border-white/15 bg-navy-950/80 p-4 backdrop-blur-md sm:block">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-brand-300">
                        Complete business website
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                        {pkPrices.basic}
                        <span className="ml-2 text-xs font-medium text-slate-400">on your hosting</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-500/20 px-2.5 py-1 text-[0.62rem] font-semibold text-brand-200 ring-1 ring-brand-400/30">
                      {pkPrices.supportMonths} months support
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Or {pkPrices.allInOne} with domain + 1 year hosting included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="relative border-t border-white/10 bg-white/[0.03]">
          <div className="container-page grid grid-cols-2 gap-y-6 py-6 lg:grid-cols-4">
            {pkHeroStats.map((stat) => (
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

      {/* ── WHAT YOU GET ─────────────────────────────────────────────────── */}
      <Section id="included">
        <SectionHeading
          align="center"
          eyebrow="Included"
          title={
            <>
              What you get for <span className="text-brand-600">{pkPrices.basic}</span>
            </>
          }
          description="A complete business website, not a template drop."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkIncluded.map((item) => (
            <div key={item.title} className={cardLight}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <h3 className="pt-1 text-base font-semibold leading-snug text-ink-900">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppCta className="w-full sm:w-auto" />
          <PackagesLink variant="light" />
        </div>
      </Section>

      {/* ── AT A GLANCE ──────────────────────────────────────────────────── */}
      <Section tone="muted">
        <div className="text-center">
          <Eyebrow>WordbitX at a glance</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-[1.65rem] font-semibold leading-[1.15] text-ink-900 sm:text-4xl lg:text-[2.6rem]">
            Pakistan’s website partner since 2021
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-700 shadow-[0_45px_90px_-55px_rgba(5,39,103,0.9)]">
          <div className="grid grid-cols-2 gap-y-7 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:items-center lg:gap-y-0 lg:py-9">
            {pkGlanceStats.map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <p
                  className={`text-2xl font-semibold tracking-tight sm:text-[2rem] ${
                    "highlight" in stat && stat.highlight ? "text-brand-300" : "text-white"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-slate-300 sm:text-[0.66rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-3xl text-center text-base leading-relaxed text-ink-600">
          WordbitX is a web design and development company in Lahore, Pakistan, building since 2021. We build fast,
          mobile-first WordPress websites, Shopify and WooCommerce stores, custom web apps and FBR-ready POS
          software for businesses across Pakistan — and handle SEO and maintenance after launch.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className={cardLight}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                <PkIcon name="pin" className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-sm font-semibold text-ink-900">Office</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">{siteConfig.addressDisplay}</p>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-600"
            >
              Open in Google Maps
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className={cardLight}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                <PkIcon name="language" className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-sm font-semibold text-ink-900">Languages</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">Urdu and English</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              Bilingual sites with right-to-left Urdu support
            </p>
          </div>

          <div className={cardLight}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                <ClockIcon className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-sm font-semibold text-ink-900">Reply time</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">Same business day</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">Mon–Sat, 9:00–19:00 PKT</p>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="mt-1 inline-block text-sm font-semibold text-brand-700 hover:text-brand-600"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          Last updated{" "}
          <time dateTime="2026-10-30">October 30, 2026</time>
        </p>
      </Section>

      {/* ── PACKAGES ─────────────────────────────────────────────────────── */}
      <Section id="packages">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Simple website packages"
          description="Clear prices in rupees, with a fixed written quote before any work starts."
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          {pkPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                pkg.featured
                  ? "border border-brand-500/30 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 text-white shadow-[0_45px_90px_-45px_rgba(5,39,103,0.85)] ring-1 ring-brand-500/20"
                  : "border border-slate-200 bg-white text-ink-900 shadow-[0_30px_70px_-50px_rgba(5,13,33,0.8)]"
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
                <span className={`text-xs font-medium ${pkg.featured ? "text-slate-400" : "text-ink-400"}`}>
                  from
                </span>
                <span className={`text-[2.1rem] font-semibold tracking-tight ${pkg.featured ? "text-brand-300" : "text-ink-900"}`}>
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
                      className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-brand-300" : "text-brand-600"}`}
                    />
                    <span className={pkg.featured ? "text-slate-200" : "text-ink-700"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-1">
                <a
                  href={whatsappLink(pkg.message)}
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

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
          <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-400">
            More than WordPress
          </p>
          <p className="mt-2 text-center text-sm leading-relaxed text-ink-600">
            The {pkPrices.basic} package runs on WordPress. We also build Shopify and WooCommerce stores and fully
            custom Next.js websites — each quoted in writing.
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {pkPlatforms.map((platform) => (
              <li
                key={platform}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-ink-600"
              >
                {platform}
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
          Prices in PKR, quoted in writing before work starts. Online stores (WooCommerce or Shopify), custom builds,
          FBR POS software and SEO are quoted after a free call.
        </p>
        <p className="mt-2 text-center text-xs text-ink-400">
          Prefer to talk first?{" "}
          <Link href="/contact?intent=call" className="font-semibold text-brand-700 hover:text-brand-600">
            Book a free call
          </Link>
        </p>
      </Section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <Section tone="muted" id="services">
        <SectionHeading
          eyebrow="Services"
          title="What we do"
          description="Everything you need to get online and grow, from one team."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={`group ${cardLight}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900 group-hover:text-brand-700">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── WHY WORDBITX ─────────────────────────────────────────────────── */}
      <section id="why" className="cine-surface cine-rim relative overflow-hidden py-12 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="mesh" opacity={0.6} mask="none" position="80% 55%" />
        <div className="container-page relative">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Why WordbitX"
            title="Why Pakistani businesses choose WordbitX"
            description="A Lahore-based team with international clients, clear pricing in rupees and no surprises."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pkWhy.map((item) => (
              <div key={item.title} className={cardDark}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/12 text-brand-300 ring-1 ring-brand-400/25">
                  <PkIcon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-400/12 text-brand-300 ring-1 ring-brand-400/25">
                <PkIcon name="badge" className="h-4.5 w-4.5" />
              </span>
              <p className="text-sm leading-relaxed text-slate-200">
                We designed, built and run <strong className="font-semibold text-white">Properties Pak</strong> — a
                live Pakistan property portal with map-led search and dealer enquiries.
              </p>
            </div>
            <Link
              href="/products/properties-pak"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
            >
              Read the project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta className="w-full sm:w-auto" />
            <PackagesLink />
          </div>
        </div>
      </section>

      {/* ── CITIES ───────────────────────────────────────────────────────── */}
      <Section id="cities">
        <SectionHeading
          eyebrow="Cities"
          title="Web design in your city"
          description="Local pages covering the sectors and business districts each city actually has."
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pkCityCards.map((city) => (
            <Link
              key={city.slug}
              href={`/software-house/${city.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-44px_rgba(5,13,33,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_32px_60px_-40px_rgba(5,39,103,0.4)]"
            >
              <MiniCityMap cityKey={city.mapKey} province={city.province} />
              <div className="p-5">
                <h3 className="text-base font-semibold text-ink-900 group-hover:text-brand-700">{city.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{city.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  View page
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Map is an illustration of the country with each city pinned, not a street map or a claim of a local office.
        </p>
      </Section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <Section tone="muted" id="industries">
        <SectionHeading
          eyebrow="Industries"
          title="Industries we work with"
          description="Websites, online stores and software for businesses across Pakistan’s key sectors."
        />
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_30px_70px_-60px_rgba(5,13,33,0.7)] sm:p-7">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {pkSectors.map((sector) => (
              <li key={sector.label}>
                {sector.href ? (
                  <Link
                    href={sector.href}
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[0.8rem] font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {sector.label}
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[0.8rem] font-medium text-ink-700">
                    {sector.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── ACROSS PAKISTAN ──────────────────────────────────────────────── */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Cities we serve"
              title="Working with businesses across Pakistan"
              description="Based in Lahore, we work across Punjab and the rest of Pakistan — mostly over WhatsApp and video calls, with in-person meetings when they help."
            />
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {pkCitiesServed.map((city) => (
                <Link
                  key={city.slug}
                  href={`/software-house/${city.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {city.name}
                  <ArrowRight className="h-3.5 w-3.5 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-500">
              and beyond —{" "}
              <Link href="/global" className="font-semibold text-brand-700 hover:text-brand-600">
                clients in the UK, US, UAE and Australia
              </Link>
              .
            </p>
          </div>
          <PakistanMap />
        </div>
      </Section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        id="process"
        className="cine-surface cine-rim relative overflow-hidden py-12 text-white sm:py-20 lg:py-24"
      >
        <CineBackdrop variant="flow" opacity={0.5} mask="none" position="20% 60%" />
        <div className="container-page relative">
          <SectionHeading
            tone="dark"
            eyebrow="How it works"
            title="From first message to launch"
            description="Four steps, one written quote, no surprise invoices."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pkSteps.map((step) => (
              <div key={step.step} className={cardDark}>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-300">{step.step}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR WORK ─────────────────────────────────────────────────────── */}
      <Section id="work">
        <SectionHeading
          eyebrow="Our work"
          title="Recent websites we built"
          description="Live products and demo builds — open a card to browse the real site."
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                      isLive
                        ? "bg-brand-500/90 text-white ring-white/30"
                        : "bg-navy-950/80 text-slate-200 ring-white/15"
                    }`}
                  >
                    {isLive ? "Live project" : "Demo build"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-700">{demo.category}</p>
                  <h3 className="mt-1.5 text-base font-semibold text-ink-900 group-hover:text-brand-700">
                    {demo.name}
                  </h3>
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
        <p className="mt-4 max-w-4xl text-xs leading-relaxed text-ink-400">
          “Live project” is a real, publicly available product designed and built by WordbitX. “Demo build” is a
          sample website we created to show design and development capability — not a client case study, and no client
          name, revenue or result is implied. Images are commissioned scenes of the kind of business each site serves.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppCta className="w-full sm:w-auto" />
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700"
          >
            See all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ── BUILT FOR PAKISTAN ───────────────────────────────────────────── */}
      <Section tone="muted" id="pakistan">
        <SectionHeading
          align="center"
          eyebrow="Built for Pakistan"
          title="Built for selling in Pakistan"
          description="Payments, delivery and language, set up the way Pakistani customers buy."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkPakistanFeatures.map((item) => (
            <div key={item.title} className={cardLight}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-500/15">
                  <PkIcon name={item.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="pt-1.5 text-base font-semibold leading-snug text-ink-900">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section id="faqs">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.15] text-ink-900 sm:text-4xl lg:text-[2.6rem]">
              Website questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Prices, ownership, timelines and what happens after launch — answered plainly. Still unsure? Ask on
              WhatsApp; a person replies, not a bot.
            </p>
            <div className="mt-6 hidden lg:block">
              <WhatsAppCta variant="light" message="Hello WordbitX, I have a question about a website for my business." />
            </div>
          </div>
          <FaqAccordion faqs={pkFaqs} />
        </div>
      </Section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section id="start" className="cine-surface cine-rim relative overflow-hidden py-14 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="arcs" opacity={0.65} mask="radial" position="50% 65%" />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="dark">Get started</Eyebrow>
            <h2 className="mt-5 text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[3rem]">
              Ready for your new website?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Websites from {pkPrices.basic}, or {pkPrices.allInOne} with domain and 1 year hosting.{" "}
              {pkPrices.supportMonths} months support included.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppCta className="w-full sm:w-auto" />
              <Link
                href="/contact?intent=call"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-arc-300/25 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-arc-300/60 hover:bg-white/10 sm:w-auto"
              >
                Book a free call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-400">
              WhatsApp replies Mon–Sat, 9:00–19:00 PKT ·{" "}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="whitespace-nowrap font-medium text-slate-200 hover:text-white"
              >
                {siteConfig.phoneDisplay}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-slate-200 hover:text-white">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7">
            <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              Also serving
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
              {pkCitiesServed.map((city) => (
                <li key={city.slug}>
                  <Link href={`/software-house/${city.slug}`} className="transition-colors hover:text-brand-300">
                    {city.name}
                  </Link>
                </li>
              ))}
              <li className="text-slate-600">and worldwide</li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSchema faqs={pkFaqs} />
      <JsonLd data={serviceOfferSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
