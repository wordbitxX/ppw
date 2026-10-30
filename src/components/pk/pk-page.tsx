import Link from "next/link";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  LayersIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { demoWebsites } from "@/lib/demos";
import { demoPreview } from "@/lib/demo-shots";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { usd, usdFrom } from "@/lib/pk";
import {
  pkAbout,
  pkBookingHref,
  pkCallHref,
  pkCities,
  pkEmail,
  pkFaqs,
  pkFaqsForSchema,
  pkIncluded,
  pkIndustries,
  pkMetaDescription,
  pkOffices,
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
  type PkFaq,
} from "@/lib/pk";
import {
  MapPinIcon,
  PkActions,
  PkButton,
  PkContactBar,
  PkInfoCards,
  PkPillList,
  PkStatBar,
  PkDetailsStrip,
  PkFaqList,
  PkHeading,
  PkHeroDevices,
  PkOwnerBanner,
  PkPriceCard,
  PkSamples,
  PkSection,
  PkStickyContact,
  PriceText,
  PkTrustStrip,
  pkCard,
  pkIconTile,
} from "@/components/pk/pk-ui";

const propertiesPak = demoWebsites.find((demo) => demo.id === "properties-pak");

/* Decorative icons, in the order of pkServices / pkPakistan. They carry no
   meaning a reader would miss — every card keeps its own heading. */
const serviceIcons = [GlobeIcon, LayersIcon, SparkIcon, PhoneIcon, ShieldIcon, SearchIcon];
const pakistanIcons = [LayersIcon, PhoneIcon, CheckIcon, ArrowRight, GlobeIcon, ShieldIcon];

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

      {/* 1 — HERO. Eyebrow pill, one headline, the price as a large line under
          it, a short paragraph, two actions, one phone line, and the product
          composition on the right. Flat navy, no gradients, no animation. */}
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

            <p className="mt-5 text-[1.35rem] font-semibold leading-tight sm:text-[1.6rem]">
              <PriceText pkr={heroPkr} usd={heroUsd} />
            </p>

            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-200 sm:text-[1rem]">
              Mobile-first websites, online stores, apps and POS systems. Two packages — website only, or with
              domain and hosting — both quoted in writing before any work starts.
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

      {/* 3 — what you get. Centered, and the price goes into the heading the
          moment the owner supplies it (the reference's "What you get for …"). */}
      <PkSection id="what-you-get">
        <PkHeading
          center
          eyebrow="Included"
          title={
            pkPricing.businessWebsite == null ? (
              <>What you get in every website package</>
            ) : (
              <>
                What you get for <span className="text-brand-600">{pkr(pkPricing.businessWebsite)}</span>
              </>
            )
          }
          lead="A complete business website, not a template drop."
        />

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkIncluded.map((item) => (
            <li key={item.title} className={`${pkCard} flex items-start gap-3 p-5`}>
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-700 text-white">
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[0.95rem] font-bold leading-snug text-navy-700">{item.title}</h3>
                <p className="mt-1 text-[0.84rem] leading-relaxed text-ink-600">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <PkActions />
      </PkSection>

      {/* 4 — at a glance: the four numbers, then who we are, then the three
          facts a buyer checks before calling. */}
      <PkSection id="about" tone="muted">
        <PkHeading
          center
          eyebrow="WordbitX at a glance"
          title="A software company in Lahore since 2021"
        />

        <div className="mt-8">
          <PkStatBar
            stats={[
              { value: "2021", label: "Building since" },
              { value: "3", label: "Offices in Pakistan" },
              { value: "6", label: "Service lines" },
              { value: "100%", label: "Code handed over" },
            ]}
          />
        </div>

        <div className="mx-auto mt-9 max-w-3xl space-y-3.5 text-center">
          {pkAbout.map((paragraph) => (
            <p key={paragraph} className="text-[0.95rem] leading-relaxed text-ink-600">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-9">
          <PkInfoCards
            items={[
              {
                title: "Office",
                body: "DHA Phase 2, Lahore — with a second Lahore office in Johar Town and one in Islamabad. Meetings by appointment.",
                link: { label: "See the offices", href: "#cities" },
              },
              {
                title: "Languages",
                body: "Urdu and English. Bilingual pages where they help, and the Urdu is checked by someone who reads it.",
              },
              {
                title: "Registered",
                body: "WordbitX TECHNOLOGY SMC – PVT. LTD., registered with SECP and FBR, founded 2021. Pakistan clients are invoiced in PKR.",
              },
            ]}
          />
        </div>
      </PkSection>

      {/* 5 — services */}
      <PkSection id="services">
        <PkHeading eyebrow="Services" title="What we do" lead="Everything a business needs to get online and stay there — from one team." />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <article key={service.title} className={`${pkCard} flex h-full flex-col p-6`}>
                <span className={pkIconTile}>
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[1.02rem] font-bold leading-snug text-navy-700">{service.title}</h3>
                <p className="mt-1.5 flex-1 text-[0.86rem] leading-relaxed text-ink-600">{service.body}</p>
                <p className="mt-4 rounded-xl bg-[#F6F8FC] px-3 py-2 text-[0.82rem] font-semibold text-navy-700">
                  {service.price}
                  <span className="mt-0.5 block text-[0.72rem] font-normal leading-snug text-ink-500">
                    {service.priceNote}
                  </span>
                </p>
                <Link
                  href={service.href}
                  className="mt-3 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-brand-700 hover:text-brand-800"
                >
                  {service.hrefLabel}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </PkSection>

      {/* 6 — why us, on navy like the reference */}
      <PkSection id="why-wordbitx" tone="navy">
        <PkHeading
          center
          tone="dark"
          eyebrow="Why WordbitX"
          title="Why Pakistani businesses choose us"
          lead="A Pakistan-based team with international experience, clear pricing and no surprises."
        />

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkReasons.map((reason) => (
            <li key={reason.title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-300">
                <CheckIcon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-[1rem] font-bold text-white">{reason.title}</h3>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slate-300">{reason.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[0.86rem] text-slate-200">
            <span className="font-semibold text-white">Properties Pak</span> — our own property portal, live and
            maintained by the team that built it.
          </p>
          <Link
            href="#work"
            className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-brand-300 hover:text-white"
          >
            See it
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <PkActions tone="dark" />
      </PkSection>

      {/* 7 — recent work */}
      <PkSection id="work" tone="muted">
        <PkHeading
          eyebrow="Our work"
          title="Recent websites we built"
          lead="Real builds. Open any of them and click around."
        />
        <div className="mt-8">
          <PkSamples limit={6} />
        </div>
        <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-500">{pkSampleDisclosure}</p>
        <PkActions />
      </PkSection>

      {/* 8 — cities */}
      <PkSection id="cities">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <div>
            <PkHeading
              eyebrow="Cities we serve"
              title="Working with businesses across Pakistan"
              lead="Based in Lahore, we work across Punjab and the rest of Pakistan — mostly over chat and video calls, with in-person meetings when they help."
            />

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {pkCities.linked.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="group flex items-center justify-between gap-2 rounded-xl bg-[#F3F6FB] px-4 py-3 text-[0.88rem] font-semibold text-navy-700 ring-1 ring-slate-900/[0.04] transition-colors hover:bg-[#E7EEF9]"
                  >
                    {city.name}
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-600">
              and beyond — {pkCities.plain.join(", ")}.{" "}
              <Link href="/software-house" className="font-semibold text-brand-700 hover:text-brand-800">
                See every city
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {pkOffices.map((office) => (
              <article key={office.id} className={`${pkCard} p-5 sm:last:col-span-2`}>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-700">{office.role}</p>
                <h3 className="mt-1.5 flex items-center gap-2 text-[1rem] font-bold text-navy-700">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-navy-700 text-white">
                    <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {office.area === office.city ? office.city : `${office.area}, ${office.city}`}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-600">
                  {office.street ?? "Street address and map pin shared when your meeting is booked."}
                </p>
                <p className="mt-1.5 text-[0.76rem] leading-relaxed text-ink-500">{office.note}</p>
              </article>
            ))}
          </div>
        </div>
      </PkSection>

      {/* 10 — built for selling in Pakistan */}
      <PkSection id="pakistan" tone="muted">
        <PkHeading
          center
          eyebrow="Built for Pakistan"
          title="Built for selling in Pakistan"
          lead="Payments, delivery and language, set up the way Pakistani customers buy."
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkPakistan.map((item, index) => {
            const Icon = pakistanIcons[index % pakistanIcons.length];
            return (
              <article key={item.title} className={`${pkCard} p-6`}>
                <span className={pkIconTile}>
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[1rem] font-bold text-navy-700">{item.title}</h3>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-600">{item.body}</p>
              </article>
            );
          })}
        </div>
      </PkSection>

      {/* 11 — how it works, on navy */}
      <PkSection id="how-it-works" tone="navy">
        <PkHeading
          center
          tone="dark"
          eyebrow="How it works"
          title="From first message to launch"
          lead="Four steps, no mystery in between."
        />

        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pkSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[0.8rem] font-bold text-brand-300">
                {index + 1}
              </span>
              <h3 className="mt-3.5 text-[0.98rem] font-bold leading-snug text-white">{step.title}</h3>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-slate-300">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-[0.85rem] leading-relaxed text-slate-200">
          <span className="font-semibold text-white">On timelines:</span> {pkTimelineNote}
        </p>
      </PkSection>

      {/* 12 — packages */}
      <PkSection id="pricing">
        <PkHeading
          center
          eyebrow="Pricing"
          title="Simple website packages"
          lead="Clear prices, with a fixed written quote before any work starts."
        />

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {pkPackages.map((pkg) => (
            <PkPriceCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <p className="mt-6 text-center text-[0.9rem] leading-relaxed text-ink-600">{pkQuoteLine}</p>

        {/* Everything that is not a package, as a scannable price list. */}
        <div className={`${pkCard} mx-auto mt-8 max-w-3xl overflow-hidden`}>
          <p className="border-b border-slate-200 bg-[#F6F8FC] px-5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ink-500">
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

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.82rem]">
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

      {/* 13 — industries */}
      <PkSection id="industries" tone="muted">
        <PkHeading
          eyebrow="Industries"
          title="Industries we work with"
          lead="Websites, online stores and software for businesses across Pakistan's key sectors."
        />
        <div className="mt-7">
          <PkPillList items={pkIndustries} />
        </div>
      </PkSection>

      {/* 14 — FAQs: title on the left, the questions as cards on the right */}
      <PkSection id="faqs">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PkHeading
              eyebrow="FAQs"
              title="Website questions"
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
            Ready for your new website?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-slate-200 sm:text-[1.05rem]">
            {pkPricing.businessWebsite == null
              ? "Tell us what the business does and what the site must achieve. You get a fixed quote in PKR with scope and dates before any work starts."
              : `Websites from ${pkr(pkPricing.businessWebsite)}, or with domain and hosting in the second package. Fixed in writing before any work starts.`}
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

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">Also serving</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {pkCities.linked.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[0.8rem] font-medium text-slate-200 ring-1 ring-white/12 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <MapPinIcon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
