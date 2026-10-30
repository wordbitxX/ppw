import Link from "next/link";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { usd, usdFrom } from "@/lib/pk";
import {
  pkAbout,
  pkBookingHref,
  pkCallHref,
  pkCities,
  pkEmail,
  pkFacts,
  pkFaqs,
  pkFaqsForSchema,
  pkHeroPrice,
  pkIncluded,
  pkIndustries,
  pkMetaDescription,
  pkPackages,
  pkPakistan,
  pkPricePaths,
  pkPhone,
  pkPriceRange,
  pkQuoteLine,
  pkReasons,
  pkSampleDisclosure,
  pkServices,
  pkSteps,
  pkTimelineNote,
  pkUpdated,
  pkUsdPricing,
  moneyIn,
  pkUsPhone,
  pkWhatsAppHref,
  pkr,
  pkPricing,
  priceLead,
  type PkFaq,
} from "@/lib/pk";
import {
  PkButton,
  PkContactBar,
  PkDetailsStrip,
  PkFaqList,
  PkHeading,
  PkHeroDevices,
  PkOffices,
  PkOwnerBanner,
  PkPriceCard,
  PkSamples,
  PkSection,
  PkStickyContact,
  PriceText,
  PkTrustStrip,
} from "@/components/pk/pk-ui";

const propertiesPak = demoWebsites.find((demo) => demo.id === "properties-pak");

const costGuides = [
  { label: "Website cost in Pakistan", href: "/blog/website-development-cost-pakistan" },
  { label: "E-commerce store cost", href: "/blog/ecommerce-website-cost-pakistan" },
  { label: "POS software price", href: "/blog/pos-software-price-in-pakistan" },
  { label: "Mobile app cost", href: "/blog/mobile-app-development-cost-pakistan" },
];

export function PkPageView() {
  const preview = propertiesPak ? demoPreview(propertiesPak) : null;
  const priceRange = pkPriceRange();

  // The hero price line, written once for each currency. Both are rendered on
  // the server; the header switch only picks which one is visible.
  const heroUsdAmount = usdFrom(pkPricing.businessWebsite, pkUsdPricing.businessWebsite);
  const heroPkr =
    pkPricing.businessWebsite == null ? (
      <>
        Websites priced in <span className="text-brand-300">rupees</span>
      </>
    ) : (
      <>
        Websites from <span className="text-brand-300">{pkr(pkPricing.businessWebsite)}</span>
      </>
    );
  const heroUsd =
    heroUsdAmount == null ? (
      <>
        Websites priced in <span className="text-brand-300">dollars or rupees</span>
      </>
    ) : (
      <>
        Websites from <span className="text-brand-300">{usd(heroUsdAmount)}</span>
      </>
    );

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": absoluteUrl("/pk") + "#business",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/pk"),
    description: pkMetaDescription,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    foundingDate: String(siteConfig.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    areaServed: [
      "Lahore",
      "Karachi",
      "Islamabad",
      "Rawalpindi",
      "Faisalabad",
      "Gujranwala",
      "Sialkot",
      "Multan",
      "Pakistan",
    ].map((name) => ({ "@type": "City", name })),
    knowsAbout: [
      "Website design",
      "E-commerce development",
      "Custom software",
      "POS software",
      "Mobile apps",
      "Search engine optimisation",
    ],
    ...(priceRange ? { priceRange } : {}),
    ...(pkPricing.hours ? { openingHours: pkPricing.hours } : {}),
    sameAs: siteConfig.socials.map((social) => social.href),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pakistan prices", item: absoluteUrl("/pk") },
    ],
  };

  return (
    <div className="bg-white pb-24 lg:pb-0">
      {/* 0 — the page's own bar, offset below the fixed global header. The
          fixed header is dark and translucent: keeping this offset strip
          navy-950 means it blends into the masthead instead of greying out
          over a white gap, and the page opens on one continuous dark block. */}
      <div className="bg-navy-950 pt-16 lg:pt-[72px]">
        <PkOwnerBanner />
        <PkContactBar />
      </div>

      {/* 1 — HERO: the reference layout. Eyebrow pill, one big headline, the
          price as a large line under it (not buried in a card), a short
          paragraph, two buttons, one phone line, and the product composition
          on the right. Flat navy, no gradients, no animation. */}
      <section className="relative overflow-hidden bg-navy-700 text-white">
        <div className="container-page grid items-center gap-14 pb-16 pt-9 sm:pt-11 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-20 lg:pt-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              Pakistan-based software company · Since 2021
            </p>

            <h1 className="mt-5 text-[2.2rem] font-bold leading-[1.03] tracking-[-0.035em] text-white sm:text-[3rem] lg:text-[3.5rem]">
              Professional websites
              <br className="hidden sm:block" /> for Pakistani businesses
            </h1>

            {/* The price, in the same slot the reference uses: a big line
                straight under the headline, the figure in the accent colour. */}
            <p className="mt-5 text-[1.35rem] font-semibold leading-tight sm:text-[1.6rem]">
              <PriceText pkr={heroPkr} usd={heroUsd} />
            </p>

            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-200 sm:text-[1rem]">
              Mobile-first websites, online stores, apps and POS systems. Two packages — website only, or with
              domain and hosting — both quoted in writing before any work starts.{" "}
              <span className="text-slate-300">
                WordbitX TECHNOLOGY SMC – PVT. LTD. is a registered Pakistani software company in Lahore.
              </span>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={pkWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-brand-600"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" aria-hidden="true" />
                Contact us
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
              >
                See packages
              </a>
            </div>

            <p className="mt-4 text-[0.85rem] text-slate-300">
              <Link href="/contact" className="font-semibold text-white underline decoration-brand-400/70 underline-offset-4 hover:text-brand-200">
                Book a free call
              </Link>{" "}
              · or call{" "}
              <a href={pkCallHref} className="font-semibold tabular-nums text-white hover:text-brand-200">
                {pkPhone}
              </a>
            </p>
          </div>

          <PkHeroDevices />
        </div>
        <div className="h-1 bg-brand-500" aria-hidden="true" />
      </section>

      {/* 2 — trust strip */}
      <PkTrustStrip />

      {/* 3 — pricing */}
      <PkSection id="pricing">
        <PkHeading
          center
          eyebrow="Pricing"
          title="Two website packages, one honest quote"
          lead={
            pkPricing.businessWebsite == null
              ? "Prices are in PKR. Nothing is hidden in a second invoice, and each package lists exactly what is included."
              : "Prices are in PKR. Nothing is hidden in a second invoice, and neither package says “contact for price”."
          }
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {pkPackages.map((pkg) => (
            <PkPriceCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <p className="mt-6 rounded-2xl bg-[#F6F8FC] px-5 py-4 text-[0.9rem] leading-relaxed text-ink-700 ring-1 ring-slate-900/[0.04]">
          {pkQuoteLine}
        </p>

        {/* One price list for everything that is not a package — scannable
            like a shop board, no paragraph per row. */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]">
          <p className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-500">
            How everything else is priced
          </p>
          <dl>
            {pkPricePaths.map((path, index) => (
              <div
                key={path.title}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5 ${
                  index > 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <dt className="text-[0.92rem] font-semibold text-navy-700">{path.title}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.86rem] text-ink-600">
                  <span>{path.price}</span>
                  <Link
                    href={path.href}
                    className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {path.hrefLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem]">
          <span className="font-semibold text-navy-700">Cost guides:</span>
          {costGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="inline-flex items-center gap-1 text-brand-700 hover:text-brand-800"
            >
              {guide.label}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </PkSection>

      {/* 4 — what you get */}
      <PkSection id="what-you-get" tone="muted">
        <PkHeading
          center
          eyebrow="What you get"
          title="Everything a small business site needs, in one list"
          lead="No mystery line items. This is the build, the handover and the support that come with a website package."
        />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkIncluded.map((item) => (
            <li key={item.title} className="rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]">
              <CheckIcon className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <h3 className="mt-2.5 text-[0.95rem] font-semibold text-navy-700">{item.title}</h3>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-600">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[0.85rem] text-ink-600">
          Want updates, backups and small fixes handled after launch?{" "}
          <Link href="/services/website-maintenance" className="font-semibold text-brand-700 hover:text-brand-800">
            Read about monthly care plans
          </Link>
          .
        </p>
      </PkSection>

      {/* 5 — about */}
      <PkSection id="about">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <div>
            <PkHeading eyebrow="About WordbitX in Pakistan" title="A software company, not a freelancer with a theme" />
            <div className="mt-4 space-y-3.5">
              {pkAbout.map((paragraph) => (
                <p key={paragraph} className="text-[0.95rem] leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-600">
              You own the code, the repository and the hosting. Weekly demos and a written scope are part of how the
              company works, not a favour.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PkButton href="/about" variant="secondary">
                About the company
              </PkButton>
              <PkButton href="/process" variant="secondary">
                How we work
              </PkButton>
            </div>
          </div>

          <dl className="rounded-3xl bg-[#F6F8FC] p-6 ring-1 ring-slate-900/[0.04]">
            {pkFacts.map((fact) => (
              <div key={fact.label} className="border-b border-slate-200 py-2.5 first:pt-0 last:border-0 last:pb-0">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-500">{fact.label}</dt>
                <dd className="mt-0.5 text-[0.9rem] font-medium leading-snug text-navy-700">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PkSection>

      {/* 6 — services (six, not sixty) */}
      <PkSection id="services" tone="muted">
        <PkHeading
          eyebrow="Services"
          title="Six things we do for Pakistani businesses"
          lead="Each card shows how it is priced, so you can size the job before you call."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkServices.map((service, index) => (
            <article key={service.title} className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EDF2FB] text-[0.72rem] font-bold text-navy-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.02rem] font-bold leading-snug text-navy-700">{service.title}</h3>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-600">{service.body}</p>
              <p className="mt-3 rounded-xl bg-[#F6F8FC] px-3 py-2 text-[0.82rem] font-semibold text-navy-700">
                {service.price}
                <span className="mt-0.5 block text-[0.72rem] font-normal leading-snug text-ink-500">{service.priceNote}</span>
              </p>
              <Link
                href={service.href}
                className="mt-3 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-brand-700 hover:text-brand-800"
              >
                {service.hrefLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-5 text-[0.85rem] text-ink-600">
          Need something not on this list?{" "}
          <Link href="/services" className="font-semibold text-brand-700 hover:text-brand-800">
            See all services
          </Link>
          .
        </p>
      </PkSection>

      {/* 7 — why us */}
      <PkSection id="why-wordbitx">
        <PkHeading eyebrow="Why WordbitX" title="Reasons a Pakistani business picks us" />
        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pkReasons.map((reason) => (
            <li key={reason.title} className="rounded-3xl bg-[#F6F8FC] p-6 ring-1 ring-slate-900/[0.04]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 text-white">
                <CheckIcon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-[1rem] font-bold text-navy-700">{reason.title}</h3>
              <p className="mt-1.5 text-[0.87rem] leading-relaxed text-ink-600">{reason.body}</p>
            </li>
          ))}
        </ul>
      </PkSection>

      {/* 8 — proof: our own live product */}
      <PkSection tone="navy">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-300">
              Proof you can click
            </p>
            <h2 className="mt-2 text-[1.7rem] font-semibold leading-tight text-white sm:text-4xl">
              We built a property portal for ourselves, and it is live
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-200">
              Properties Pak is WordbitX&apos;s own product — a real marketplace with real listings, not a slide in a
              pitch deck. It is the fastest way to judge how we build.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["19 property types", "8 cities", "Society, phase and block inventory", "Map-led search"].map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-white/25 px-3 py-1 text-[0.72rem] font-medium text-white"
                >
                  {fact}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <PkButton href="https://propertiespak.com" variant="onNavy" external>
                Open Properties Pak
              </PkButton>
              <PkButton href="/portfolio/properties-pak-property-portal" variant="ghost">
                Read the project profile
              </PkButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-300">The problem</p>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slate-100">
                Pakistani property is sold by society, phase, block and plot file. A generic listings template cannot
                hold that, so buyers cannot search it and dealers cannot manage it.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-300">What we built</p>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slate-100">
                Configurable society inventory, map search, plot/file detail pages, a moderation queue before a listing
                goes live, and dealer enquiries routed to the right agent.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-300">Where it stands</p>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slate-100">
                Live and public. No borrowed client numbers and no invented performance scores appear on this page —
                open the site and judge the software itself.
              </p>
            </div>
          </div>
        </div>
      </PkSection>

      {/* 9 — samples */}
      <PkSection id="samples">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <PkHeading
            eyebrow="Recent work"
            title="Six builds you can open right now"
            lead="One live product and five demo builds WordbitX made. Every card and button opens the real, running site."
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
          <PkSamples />
        </div>

        <p className="mt-5 max-w-4xl text-[0.8rem] leading-relaxed text-ink-500">{pkSampleDisclosure}</p>
      </PkSection>

      {/* 10 — industries */}
      <PkSection id="industries" tone="muted">
        <PkHeading
          center
          eyebrow="Industries"
          title="The businesses we normally build for"
          lead="Industry pages open where we have written one. The rest are industries we take on, with a page still to come."
        />
        <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {pkIndustries.map((industry) => (
            <li key={industry.label} className="text-[0.9rem]">
              {industry.href ? (
                <Link
                  href={industry.href}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-700 hover:text-brand-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {industry.label}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-ink-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" aria-hidden="true" />
                  {industry.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </PkSection>

      {/* 11 — offices + cities */}
      <PkSection id="offices">
        <PkHeading
          eyebrow="Where we are"
          title="Two offices in Lahore, one in Islamabad"
          lead="Meetings are by appointment. Everything else — scoping, design reviews, demos — runs over chat, calls and screen shares."
        />

        <div className="mt-7">
          <PkOffices />
        </div>

        <h3 className="mt-10 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-500">City pages</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkCities.linked.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="group rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)] transition-shadow hover:shadow-[0_28px_60px_-34px_rgba(5,39,103,0.55)]"
            >
              <p className="flex items-center justify-between text-base font-semibold text-navy-700">
                {city.name}
                <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
              <p className="mt-1 text-[0.82rem] text-ink-500">{city.note}</p>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-[0.88rem] leading-relaxed text-ink-600">
          Also working with businesses in {pkCities.plain.join(", ")} and beyond.{" "}
          <Link href="/software-house" className="font-semibold text-brand-700 hover:text-brand-800">
            See every city page
          </Link>
          .
        </p>
      </PkSection>

      {/* 12 — selling in Pakistan */}
      <PkSection id="pakistan" tone="muted">
        <PkHeading
          center
          eyebrow="Built for selling in Pakistan"
          title="The local details that decide whether a site works here"
          lead="These are the parts foreign templates skip. They are scoped into the build, not added later at extra cost."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkPakistan.map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]">
              <h3 className="text-[0.95rem] font-semibold text-navy-700">{item.title}</h3>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-600">{item.body}</p>
            </div>
          ))}
        </div>
      </PkSection>

      {/* 13 — process */}
      <PkSection id="how-it-works">
        <PkHeading
          eyebrow="How it works"
          title="From first message to launch, in four steps"
          lead="No discovery invoice, no mystery phase. You always know what happens next and what it costs."
        />

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pkSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06] shadow-[0_22px_48px_-32px_rgba(5,39,103,0.45)]">
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

      {/* 14 — FAQs: title on the left, the questions as cards on the right */}
      <PkSection id="faqs" tone="muted">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PkHeading
              eyebrow="Questions"
              title="Answers to what Pakistani buyers actually ask"
              lead="Prices, ownership, timelines and the local details. If a question is missing, ask it on the phone."
            />
            <p className="mt-4 text-[0.85rem] text-ink-600">
              Still unsure?{" "}
              <a href={pkCallHref} className="font-semibold text-brand-700 hover:text-brand-800">
                Call or WhatsApp {pkPhone}
              </a>
              .
            </p>
          </div>
          <PkFaqList faqs={pkFaqs} />
        </div>
      </PkSection>

      {/* 15 — final CTA */}
      <section className="relative overflow-hidden bg-navy-700 py-16 text-white sm:py-20">
        <div className="container-page text-center">
          <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-brand-200 ring-1 ring-white/15">
            Get started
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.7rem]">
            Ready for a website your customers can actually find?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-slate-200 sm:text-[1.05rem]">
            {pkPricing.businessWebsite == null
              ? "Tell us what the business does and what the site must achieve. You get a fixed quote in PKR with scope and dates before any work starts."
              : `Websites from ${pkr(pkPricing.businessWebsite)}, with domain and hosting in the second package. Fixed in writing before any work starts.`}
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={pkWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              Contact us on WhatsApp
            </a>
            <PkButton href={pkBookingHref} variant="ghost">
              Book a free call
            </PkButton>
          </div>

          <ul className="mx-auto mt-9 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            <li className="rounded-2xl bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/12">
              <PhoneIcon className="h-4 w-4 text-brand-300" aria-hidden="true" />
              <a href={pkCallHref} className="mt-1.5 block text-[0.9rem] font-semibold text-white hover:text-brand-200">
                {pkPhone}
              </a>
              <span className="block text-[0.74rem] text-slate-300">Pakistan — call or WhatsApp</span>
            </li>
            <li className="rounded-2xl bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/12">
              <MailIcon className="h-4 w-4 text-brand-300" aria-hidden="true" />
              <a href={`mailto:${pkEmail}`} className="mt-1.5 block text-[0.9rem] font-semibold text-white hover:text-brand-200">
                {pkEmail}
              </a>
              <span className="block text-[0.74rem] text-slate-300">Email with your brief</span>
            </li>
            <li className="rounded-2xl bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/12">
              <ClockIcon className="h-4 w-4 text-brand-300" aria-hidden="true" />
              <span className="mt-1.5 block text-[0.9rem] font-semibold text-white">
                {pkPricing.hours ?? "Lahore business hours (PKT)"}
              </span>
              <span className="block text-[0.74rem] text-slate-300">Messages answered from this phone</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 16 — local footer details */}
      <PkDetailsStrip />

      {/* 17 — mobile sticky contact */}
      <PkStickyContact />

      <FaqSchema faqs={pkFaqsForSchema} />
      <JsonLd data={localBusiness} />
      <JsonLd data={breadcrumbs} />

      <p className="container-page py-4 text-[0.72rem] text-ink-500">
        Last updated: {pkUpdated.label}. Prices and package contents are reviewed whenever they change.
      </p>
    </div>
  );
}
