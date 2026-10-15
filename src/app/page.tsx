import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading, ButtonLink, Eyebrow } from "@/components/ui";
import { ServiceCard, PostCard, ProjectCard } from "@/components/cards";
import { DemosSection } from "@/components/demos-section";
import { CredibilityStrip } from "@/components/certifications-band";
import { IndustryStrip } from "@/components/industry-strip";
import { FeaturedReviews } from "@/components/featured-reviews";
import { ExploreDirectory } from "@/components/explore-directory";
import { IndustryRail } from "@/components/industry-rail";
import { FlagIcon } from "@/components/flag-icon";
import { AiServicesDeck } from "@/components/ai-services-deck";
import { HeroReel } from "@/components/hero-reel";
import { HeroFX } from "@/components/hero-fx";
import { CineBackdrop, CineImage, LightArcs } from "@/components/cinematic";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { TechGlyph, TechIconSprite } from "@/components/tech-icon";
import { FaqSchema } from "@/components/jsonld";
import {
  ArrowRight,
  CheckIcon,
  IndustryIcon,
  WhatsAppIcon,
  SearchIcon,
  ShieldIcon,
  LayersIcon,
  ClockIcon,
  SparkIcon,
  MailIcon,
} from "@/components/icons";
import { getServices, services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { industryTileMedia } from "@/lib/industry-tile-media";
import { markets } from "@/lib/markets";
import { projects } from "@/lib/portfolio";
import { sortedPosts } from "@/lib/blog";
import { marqueeTech } from "@/lib/technologies";
import { media } from "@/lib/media";
import { getHeroSlides } from "@/lib/hero-reel";
import { siteConfig, whatsappLink } from "@/lib/site";
import { processSteps } from "@/lib/process";
import type { Faq } from "@/lib/types";

export const metadata: Metadata = {
  title: {
    absolute: "Software Development Company in Pakistan | WordbitX",
  },
  description: siteConfig.seoDescription,
  alternates: { canonical: "/" },
  keywords: [
    "software development company",
    "software development company Pakistan",
    "website development company",
    "Shopify development Pakistan",
    "mobile app development Pakistan",
    "SEO services Pakistan",
    "digital marketing company Pakistan",
    "POS software Pakistan",
    "AI solutions",
  ],
  openGraph: {
    url: "/",
    title: "Software Development Company in Pakistan | WordbitX",
    description: siteConfig.seoDescription,
  },
};

const homeFaqs: Faq[] = [
  {
    question: "What services does WordbitX provide?",
    answer:
      "Custom software, websites, Shopify and WooCommerce, mobile apps, POS, CRM/ERP, SEO and digital marketing. Practical AI is available when a product needs it. Every service has its own page on /services.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We are based in Pakistan and work remotely with clients across the UK, US, UAE, Australia and Canada. Projects run with scheduled overlap hours, shared boards and weekly demo calls so time zones never become a bottleneck.",
  },
  {
    question: "How do projects usually start?",
    answer:
      "With a short discovery conversation. We clarify goals, constraints and budget, then send a written scope with milestones, deliverables and a timeline. Development only begins once that document is agreed.",
  },
  {
    question: "Do we own the code and accounts?",
    answer:
      "Yes. Source code, repositories, hosting, domains and analytics accounts are yours. We deliver into your own accounts wherever possible so there is never a dependency on us to keep operating.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Every project includes a post-launch stabilisation window. After that, monthly support and maintenance plans cover updates, monitoring, security patching, and an agreed allowance for enhancements.",
  },
  {
    question: "Can you improve an existing website or app?",
    answer:
      "Often yes. We start with an audit of the current codebase, performance and analytics, then recommend targeted improvements or a phased rebuild — whichever gives better value for your situation.",
  },
  {
    question: "Do you publish client testimonials?",
    answer:
      "Named reviews and confidential screens go public only with written permission. Until then, inspect live demo websites, the project profiles on the portfolio, and ask for a private reference from the contact page. We do not invent testimonials, client logos or results.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on pages, modules and integrations. A small first phase can be modest; a POS or marketplace is not. Exact price is a written plan after discovery — not a public sticker. How we quote is on the WordbitX software development cost page.",
  },
  {
    question: "Is WordbitX hiring?",
    answer:
      "Yes. Software jobs in Pakistan are listed on the WordbitX careers page and opened the week of 15 September 2026. Apply with work you have shipped.",
  },
];

/**
 * Replaces the old `pillars` (4 cards, shown high on the page) and `whyPoints`
 * (6 cards, shown lower). Both lists claimed "custom", "scalable" and
 * "support", so the page argued the same three points twice. Merged to six,
 * and every card keeps a link so this block still carries internal links.
 */
const whyCards = [
  {
    title: "Custom-built solutions",
    text: "Every build starts from your workflow and goals, not a purchased template adjusted to fit. You own the source code, repositories and accounts. Practical AI is added only when it removes real work.",
    href: "/services/custom-software-development",
    Icon: LayersIcon,
  },
  {
    title: "Scalable, maintainable code",
    text: "TypeScript, tested APIs, documented components and CI pipelines — with data models, caching and infrastructure planned for the traffic you expect in two years, not two weeks.",
    href: "/services/devops-cloud-solutions",
    Icon: ShieldIcon,
  },
  {
    title: "SEO & digital marketing",
    text: "Technical SEO, content, ads and conversion work so the websites and stores we ship can actually rank and sell — run by the same team that built them.",
    href: "/services/seo-services",
    Icon: SearchIcon,
  },
  {
    title: "Long-term support",
    text: "Post-launch monitoring, maintenance and a prioritised backlog so improvement never stalls once the first release is live.",
    href: "/contact",
    Icon: ClockIcon,
  },
  {
    title: "Business-focused delivery",
    text: "Requirements are tied to a commercial outcome — lead volume, order value, hours saved or cost removed — rather than to a feature list.",
    href: "/about",
    Icon: SparkIcon,
  },
  {
    title: "Clear communication",
    text: "Weekly demos, one place where decisions are recorded, and a named point of contact for the whole engagement.",
    href: "/process",
    Icon: MailIcon,
  },
];

const homeServiceSlugs = [
  "web-development",
  "ecommerce-shopify",
  "ecommerce-development",
  "mobile-app-development",
  "pos-software",
  "seo-services",
  "digital-marketing",
  "ai-solutions",
];

/** Curated highlights — the full lists live on /industries and /global. */
const featuredMarketSlugs = ["pakistan", "usa", "uk", "uae"];

export default function HomePage() {
  const homeServices = getServices(homeServiceSlugs);
  const latestPosts = sortedPosts.slice(0, 3);
  const heroSlides = getHeroSlides();
  const featuredMarkets = featuredMarketSlugs
    .map((slug) => markets.find((market) => market.slug === slug))
    .filter((market): market is NonNullable<typeof market> => Boolean(market));

  const spriteIcons = marqueeTech;

  return (
    <>
      {/* One copy of every brand icon path used on this page (see TechIconSprite). */}
      <TechIconSprite items={spriteIcons} />

      {/* HERO — cinematic. Art = the dark electric-blue arc reference
          (public/brand/cinematic/arcs-hero), kept intact in a "stage" under
          the copy so the headline never sits on the flare. All text is real
          HTML. Motion: glints travelling the arcs, a slow flare pulse, pointer
          parallax and a connected-node network (HeroFX) — all off under
          prefers-reduced-motion. */}
      <section className="cine-surface relative overflow-hidden bg-midnight pt-28 text-white sm:pt-36 lg:pt-44">
        <HeroFX />

        <div className="container-page relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="cine-rise">
              <Eyebrow tone="dark">Pakistan-based · Software, SEO &amp; marketing · Worldwide</Eyebrow>
            </div>
            <h1
              className="cine-rise mt-6 text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]"
              style={{ "--d": "0.08s" } as React.CSSProperties}
            >
              <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-arc-300 sm:text-xs">
                Software development company
              </span>
              One Platform.
              <br />
              <span className="text-gradient-arc">Endless Possibilities.</span>
            </h1>
            <p
              className="cine-rise mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl"
              style={{ "--d": "0.16s" } as React.CSSProperties}
            >
              Web, Mobile &amp; Custom Software Solutions Built to Accelerate Your Business.
            </p>
            <div
              className="cine-rise mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
              style={{ "--d": "0.3s" } as React.CSSProperties}
            >
              <ButtonLink href="/services" className="btn-cine">
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Discuss Your Project
              </ButtonLink>
            </div>

            <ul
              className="cine-rise mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-200 [text-shadow:0_1px_14px_rgba(3,8,20,0.95)] sm:text-[0.8rem]"
              style={{ "--d": "0.38s" } as React.CSSProperties}
            >
              {["You own the code, repo & hosting", "Written scope before build", "Weekly demos & staging URLs"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-3.5 w-3.5 text-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The art stage. Same viewBox + cover fit for image, arcs and flare so
            the travelling light lines up with the picture at every size. */}
        <div className="pointer-events-none relative z-0 -mt-16 h-[19rem] sm:-mt-28 sm:h-[26rem] lg:-mt-36 lg:h-[30rem]" aria-hidden="true">
          <div className="cine-hero-stage cine-mask-y absolute inset-0">
            <CineImage variant="arcs" priority />
            <LightArcs />
            <div className="cine-flare" />
          </div>
        </div>

        <div className="container-page relative z-10 -mt-6 sm:-mt-10">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
            Websites, apps, Shopify stores, POS and CRM/ERP — grown with SEO and digital marketing, with practical AI
            where it helps the workflow. Clients across the USA, UK, UAE, Canada, Australia and worldwide.
          </p>
          <nav
            aria-label="Core WordbitX software"
            className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-2 text-[0.8rem] text-slate-400 sm:gap-x-4 sm:text-sm"
          >
            {[
              ["/services/custom-software-development", "Custom software"],
              ["/services/web-development", "Web development"],
              ["/services/ecommerce-shopify", "Shopify stores"],
              ["/services/ecommerce-development", "E-commerce websites"],
              ["/services/mobile-app-development", "Mobile apps"],
              ["/services/seo-services", "SEO services"],
              ["/services/digital-marketing", "Digital marketing"],
              ["/services/ai-solutions", "AI solutions"],
              ["/services/saas-application-development", "Business software"],
              ["/industries", "Industries"],
              ["/global", "Global markets"],
              ["/portfolio", "Portfolio"],
              ["/topics", "Topics"],
              ["/pricing", "Pricing"],
              ["/process", "Process"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="transition-colors hover:text-arc-300">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hero stats — kept at the owner's request (10 Oct): these four
            counted figures read more trust-worthy right under the hero than
            further down. The duplicate ServiceRingFacts copy in the team
            section was removed instead. Same honest data: every value counted
            from the site's own records (services, industries, markets). */}
        <div className="container-page mt-10 sm:mt-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-8 sm:pt-8">
            {[
              { value: "2021", label: "Established · Lahore" },
              { value: String(services.length), label: "Services & solutions" },
              { value: String(industries.length), label: "Industries modelled" },
              { value: String(markets.length), label: "Countries served" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500">
            Numbers we can show — every service, industry and market links to its own page on this site.
          </p>
        </div>

        {/* Tech marquee sits flush at the hero's base (no bottom padding on
            the section) so its bottom hairline is the only divider before the
            "Built for" rail — the two strips read as one unit: what we build
            with, then who we build for. */}
        <div className="relative mt-10 border-y border-white/10 py-4 sm:mt-14 sm:py-5">
          <div className="marquee-mask overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-10">
              {[...marqueeTech, ...marqueeTech].map((tech, index) => (
                <span key={`${tech.name}-${index}`} className="flex items-center gap-2.5 opacity-70">
                  <TechGlyph item={tech} onDark sprite className="h-5 w-5" />
                  <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR RAIL — thirteen industry links flush against the hero's base.
          "Is this for my business?" is the first question a visitor has, and
          the block that answers it properly still sits ten screens down. This
          puts the answer, and thirteen high-intent internal links, at the top
          of the page for the cost of one line of text. */}
      <IndustryStrip />

      {/* CERTIFICATIONS — dark band under the hero, the way Lahore peers
          (Rextech) surface their SECP/FBR registration marks. */}
      <CredibilityStrip />

      {/* PRODUCT REEL — moved here from the old hero (the cinematic hero is
          pure brand/atmosphere now). Same HeroReel, same curated slides. */}
      <section className="cine-surface cine-rim defer-paint relative overflow-hidden py-14 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="ribbon" opacity={0.38} position="80% 55%" scrimLeft />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Eyebrow tone="dark">Selected work</Eyebrow>
            <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
              The products and sites we have built, <span className="text-gradient-arc">as they look today</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              One team scopes, designs, builds and stays on every product — from our flagship property marketplace to
              the showcase websites below. Each slide links to its project page.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio">View the portfolio</ButtonLink>
              <ButtonLink href="/products" variant="ghost">
                Products &amp; demos
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <div className="cine-panel relative overflow-hidden rounded-2xl p-1.5 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)] sm:rounded-3xl sm:p-2">
              <HeroReel slides={heroSlides} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY US =================
          Sits above the services grid at the owner's request. Left: the real
          seven-stage delivery process (same data as /process); right: the six
          capability cards. No stock team illustrations — fake faces under
          this headline would undercut the point. */}
      <section className="cine-surface cine-rim defer-paint relative overflow-hidden py-12 text-white sm:py-20 lg:py-24">
        <CineBackdrop variant="flow" opacity={0.55} position="0% 50%" />
        <div className="container-page relative z-10">
          <SectionHeading
            tone="dark"
            eyebrow="Inside WordbitX"
            title="The team that will actually build your product"
            description="Not a sales desk that hands your project to someone else. The engineers who scope your product are the ones who build it and stay on it — an embedded product team that questions requirements, proposes the simplest thing that works, and leaves you a system you can run and extend without us."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Studio collage (owner's company visuals, 11 Oct): four branded
                office shots — the pink-dupatta workspace shot removed and the
                reception moved first, at the owner's direction. Left column =
                the collage, right = the seven-stage process panel. */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="image-sheen relative row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.75)]">
                <Image
                  src={media.whoWeAreStudio}
                  alt="WordbitX studio, Lahore — reception with the WordbitX brand wall"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_30%] transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="image-sheen relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.75)]">
                <Image
                  src={media.teamOffice}
                  alt="WordbitX studio, Lahore — lounge with the Ideas, Code, Impact wall"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="image-sheen relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.75)]">
                <Image
                  src={media.studioMeeting}
                  alt="WordbitX studio, Lahore — sprint review in the conference room"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="image-sheen relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.75)]">
                <Image
                  src={media.wordbitxStudio}
                  alt="WordbitX studio, Lahore — team collaborating by the brand wall"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/10 bg-navy-900/80 p-6 sm:p-8">
              <p className="text-sm font-semibold text-brand-300">How we work</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Seven stages from discovery to support</h3>
              <ol className="relative mt-6 flex flex-1 flex-col justify-between gap-1">
                {/* Rail that joins the step numbers. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-brand-400/50 via-arc-300/30 to-transparent"
                />
                {processSteps.map((step) => (
                  <li
                    key={step.step}
                    className="group/step relative flex gap-4 rounded-xl px-2 py-2.5 transition-all duration-300 hover:bg-white/[0.05] hover:pl-3"
                  >
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-brand-300 ring-1 ring-brand-400/30 transition-all duration-300 group-hover/step:bg-brand-500 group-hover/step:text-white group-hover/step:ring-brand-400 group-hover/step:shadow-[0_0_0_5px_rgba(28,168,48,0.15)]">
                      {step.step}
                    </span>
                    <span className="block min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white transition-colors duration-300 group-hover/step:text-brand-200">
                        {step.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover/step:text-slate-300">
                        {step.text}
                      </span>
                    </span>
                    <ArrowRight className="mt-2.5 h-4 w-4 shrink-0 -translate-x-2 text-brand-300 opacity-0 transition-all duration-300 group-hover/step:translate-x-0 group-hover/step:opacity-100" />
                  </li>
                ))}
              </ol>
              <Link
                href="/process"
                className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
              >
                See the full process
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {whyCards.map((card, index) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="why-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_25_56/0.9),rgb(6_12_30/0.95))] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-arc-300/35 hover:shadow-[0_30px_60px_-30px_rgba(47,132,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-300/60"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -right-6 -top-8 select-none text-[6.5rem] font-bold leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-arc-300/[0.09]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-10 -bottom-16 h-40 w-40 rounded-full bg-arc-500/0 blur-[60px] transition-colors duration-700 group-hover:bg-arc-500/25"
                    />
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/25 to-arc-400/15 text-brand-200 ring-1 ring-white/15 transition-all duration-500 group-hover:scale-105 group-hover:ring-arc-300/40 group-hover:shadow-[0_0_28px_-6px_rgba(127,220,255,0.55)]">
                      <card.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-5 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-arc-200">
                      {card.title}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                      {card.text}
                    </p>
                    <span className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-sm font-semibold text-brand-300 transition-colors group-hover:text-white">
                        Explore {card.title}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 text-brand-300 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-400">
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="ghost">
                  About WordbitX
                </ButtonLink>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-400/50 hover:bg-white/[0.08]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Quick WhatsApp chat
                </a>
              </div>
        </div>
      </section>

      {/* ================= WHAT WE DO =================
          Services grid, then the 16-service ring as its navigator. The ring
          used to sit four sections lower behind its own trust heading. */}
      <AiServicesDeck>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-400/10 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              What We Do
            </span>
            <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
              Software, stores, SEO and marketing
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Custom software, websites, Shopify, e-commerce, web and mobile — then SEO and ads so those products can
              grow. Practical AI is there when a workflow needs it. Every service line has its own page on the services index.
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-400/40 hover:bg-white/[0.08] lg:self-auto"
          >
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {homeServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              premium
            />
          ))}
        </div>
      </AiServicesDeck>

      {/* ================= PROOF =================
          Order (owner-approved arrangement, 2026-10-08): live demos, then
          industries (fit) inserted between the two card blocks so the four
          back-to-back card sections get one topic change in the middle,
          then project profiles, then the mid-page CTA and reviews. */}
      <DemosSection />

      {/* ================= WHO IT'S FOR =================
          Solutions and Industries overlapped on four entries (real estate,
          healthcare, education, e-commerce) while sitting six sections
          apart. One section, two sub-blocks.

          Sub-block order is sector tiles first, platform cards second, and
          that order is load-bearing:
           - The section heading promises industries ("the industries we
             already understand") and its description is pure sector language
             — plot files, batch and expiry, jewellery pricing, fee vouchers.
             Opening with six platform cards answered a question the heading
             had not asked, and pushed the tiles 2,042px below their own H2.
           - Funnel order is broad then narrow: thirteen sectors ("is my
             business here?") before the platform we would actually hand you.
           - The tiles are dark photography, so leading with them gives this
             light section a visual opening even though #portfolio below it
             is also light. That is why neither section needed a tone change.

          Position: moved ahead of #portfolio so the flow reads
          capability → fit → proof; it still sits above #reviews, which
          matters because sector fit is a higher-intent question than
          social proof. */}
      <Section id="industries">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Industries"
            title="Software for the industries we already understand"
            description="Plot files and instalment plans, batch and expiry control, weight-based jewellery pricing, fee vouchers — workflows we have already modelled, so discovery starts shorter and launch comes sooner."
          />
          <ButtonLink href="/industries" variant="secondary" className="shrink-0">
            All {industries.length} industries
          </ButtonLink>
        </div>
        <div className="mt-8">
          <IndustryRail label="industries">
            {industries.map((industry) => {
              const media = industryTileMedia[industry.slug];
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group relative flex aspect-[4/5] w-[78%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 bg-navy-900 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_30px_60px_-34px_rgba(5,13,33,0.65)] sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-3rem)/4.25)]"
                >
                  {media ? (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/5"
                  />
                  <span className="relative p-5">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-200 ring-1 ring-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                        <IndustryIcon name={industry.slug} className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-semibold text-white">{industry.name}</h3>
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300">{industry.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 transition-colors group-hover:text-white">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </IndustryRail>
        </div>
      </Section>

      <Section id="portfolio" tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Project Profiles"
            title="POS, apps, Shopify and portal project profiles"
            description="Scope write-ups of software, mobile and e-commerce work — separate from the live demo sites above. Each profile links to a full project page."
          />
          <ButtonLink href="/portfolio" variant="secondary" className="shrink-0">
            View Full Portfolio
          </ButtonLink>
        </div>
        <div className="mt-8">
          <IndustryRail label="project profiles">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-3rem)/3.25)]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </IndustryRail>
        </div>
      </Section>

      <Section id="reviews">
        <FeaturedReviews />
      </Section>

      {/* ================= MARKETS =================
          The sphere was its own dark section titled "WordbitX is trusted to
          deliver excellence worldwide", three sections from the ring's
          "WordbitX is trusted to deliver work you can inspect". It is a globe
          with six market chips, so it belongs here as the Markets artwork. */}
      <Section id="markets" tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Global Markets"
              title="One team in Pakistan, working with clients worldwide"
              description="Pakistan is the operating base. We build for clients across the United States, United Kingdom, UAE, Canada and Australia, with scheduled overlap hours and code that stays in your accounts."
            />
            <ButtonLink href="/global" variant="ghost" className="mt-8">
              All {markets.length} markets
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredMarkets.map((market) => (
              <Link
                key={market.slug}
                href={`/global/${market.slug}`}
                className="group cine-panel relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-arc-300/40"
              >
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-arc-300">
                    <FlagIcon slug={market.slug} className="h-3.5 w-5 shrink-0" />
                    {market.country}
                  </p>
                  <ArrowRight className="h-4 w-4 text-arc-300 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">{market.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{market.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* INSIGHTS */}
      <Section id="insights">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Latest Insights"
            title="Guides on software, websites, apps and project cost"
            description="Practical articles on cost, platform choice and technology decisions — written by the team that delivers the work, and updated on the blog."
          />
          <ButtonLink href="/blog" variant="secondary" className="shrink-0">
            Visit the Blog
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we are asked before every project"
            description="If your question is not answered here, message us and you will get a direct reply — not a brochure."
          />
          <div>
            <FaqAccordion faqs={homeFaqs} />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Ask a question</ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                Software development cost
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
      <ExploreDirectory />
      <FaqSchema faqs={homeFaqs} />
    </>
  );
}
