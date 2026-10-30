"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Logo, MenuIcon, CloseIcon, ChevronDown, ArrowRight, WhatsAppIcon } from "@/components/icons";
import { MegaServiceIconRef as MegaServiceIcon } from "@/components/mega-icon-ref";
import { b2bServiceSlugs, megaMenuGroups, services } from "@/lib/services";
import { fixedPackages } from "@/lib/price-ladder";
import { mainNav, siteConfig, whatsappLink } from "@/lib/site";

type MenuKey = "services" | "industries" | "products" | "portfolio" | "pricing";

/** The three price surfaces. The two regional pages had no navigation entry
 *  before the 30 Oct audit — one was in the bar, the other was footer-only. */
const pricingLinks: { href: string; title: string; sub: string }[] = [
  { href: "/pricing", title: "How we quote", sub: "Custom builds, retainers, discovery" },
  { href: "/pk", title: `Pakistan prices — ${fixedPackages.pk.starter}`, sub: "Website packages in PKR" },
  { href: "/usa", title: `USA prices — ${fixedPackages.us.starter}`, sub: "Website packages in USD" },
];

/** Industries popup — name/slug pairs copied from src/lib/industries.ts so the
    header bundle does not import the full industry content files. */
const industryLinks: [string, string][] = [
  ["retail", "Retail"],
  ["real-estate", "Real Estate"],
  ["healthcare", "Healthcare"],
  ["pharmacy", "Pharmacy"],
  ["education", "Education"],
  ["logistics", "Logistics"],
  ["ecommerce", "E-Commerce"],
  ["hospitality", "Hospitality"],
  ["finance", "Finance"],
  ["manufacturing", "Manufacturing"],
  ["legal", "Legal & Professional"],
  ["fitness", "Fitness"],
  ["construction", "Construction"],
];

/** Products popup — the seven ecosystem products (names/slugs from src/lib/products.ts). */
const productLinks: [string, string][] = [
  ["properties-pak", "Properties Pak"],
  ["motor", "MOTOR Pakistan"],
  ["healthcare", "Medicare Plus"],
  ["education", "WordbitX Education Platform"],
  ["ecommerce", "Veranne"],
  ["luxury-restaurant", "Maison Noor"],
  ["salon-beauty", "ÉLAN Beauty Studio"],
];

/** One-line descriptors shown in the cursor preview tile per menu item. */
const industryBlurbs: Record<string, string> = {
  retail: "POS, inventory & loyalty",
  "real-estate": "Listings & lead capture",
  healthcare: "Clinics & appointments",
  pharmacy: "POS with expiry tracking",
  education: "School & academy ERP",
  logistics: "Fleet & COD tracking",
  ecommerce: "Storefronts & checkout",
  hospitality: "Hotels & reservations",
  finance: "Fintech & ledgers",
  manufacturing: "Production & stock",
  legal: "Practice & case portals",
  fitness: "Gyms & memberships",
  construction: "Projects & estimates",
};
const productBlurbs: Record<string, string> = {
  "properties-pak": "Pakistan's property marketplace",
  motor: "Cars, bikes, EVs & rentals",
  healthcare: "Clinic platform & booking",
  education: "School, academy & college ERP",
  ecommerce: "Premium multi-currency storefront",
  "luxury-restaurant": "Ordering & reservations",
  "salon-beauty": "Salon booking platform",
};
const portfolioBlurbs: Record<string, string> = {
  "real-estate-listing-marketplace": "2025 · Marketplace build",
  "multi-branch-retail-pos-platform": "2024 · POS platform",
  "clinic-appointment-booking-portal": "2025 · Healthcare portal",
  "ai-document-processing-assistant": "2025 · AI assistant",
  "fashion-shopify-storefront": "2025 · Shopify storefront",
  "logistics-fleet-tracking-app": "2024 · Mobile & maps",
};

/** Navy intro column shared by the desktop mega panels — the two-tone
    bitlogicx-style layout the owner referenced (15 Oct): a dark brand column
    with icon, title, description and a bottom CTA beside a white link area. */
function MenuIntro({
  title,
  desc,
  cta,
  ctaHref,
  className = "w-60",
}: {
  title: string;
  desc: string;
  cta: string;
  ctaHref: string;
  className?: string;
}) {
  return (
    <div className={`relative flex shrink-0 flex-col overflow-hidden bg-gradient-to-b from-navy-950 via-navy-950/95 to-midnight p-6 ${className}`}>
      {/* Soft brand halo — a premium light bloom behind the icon tile. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl"
      />
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      </span>
      <p className="mt-4 text-lg font-semibold tracking-tight text-white">{title}</p>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-400">{desc}</p>
      <Link
        href={ctaHref}
        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-300 transition-colors hover:text-white"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/** Case studies popup — the flagship project profiles (slugs from src/lib/portfolio.ts). */
const portfolioMajors: [string, string][] = [
  ["real-estate-listing-marketplace", "Real Estate Listing Marketplace"],
  ["multi-branch-retail-pos-platform", "Multi-Branch Retail POS Platform"],
  ["clinic-appointment-booking-portal", "Clinic Appointment Booking Portal"],
  ["ai-document-processing-assistant", "AI Document Processing Assistant"],
  ["fashion-shopify-storefront", "Fashion Shopify Storefront"],
  ["logistics-fleet-tracking-app", "Logistics Fleet & Delivery App"],
];

/** Desktop nav item with a hover/focus dropdown panel.
    CRITICAL: this lives at module scope, NOT inside Header. When it was a
    nested component every Header render (each services-rail hover included)
    produced a new component type, React unmounted+remounted the whole panel,
    and the nav-pop open animation replayed on every rail switch — exactly
    the "closes and opens again" blink the owner reported (16-17 Oct). */
function NavDrop({
  menuKey,
  href,
  label,
  panelClassName,
  isOpen,
  activeRoute,
  onOpenMenu,
  onScheduleClose,
  onLinkClick,
  children,
}: {
  menuKey: MenuKey;
  href: string;
  label: string;
  panelClassName: string;
  isOpen: boolean;
  activeRoute: boolean;
  onOpenMenu: (menu: MenuKey) => void;
  onScheduleClose: () => void;
  onLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenMenu(menuKey)}
      onMouseLeave={onScheduleClose}
      onFocus={() => onOpenMenu(menuKey)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          onScheduleClose();
        }
      }}
    >
      <Link
        href={href}
        onClick={onLinkClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-1.5 py-2 text-[0.8rem] font-medium transition-colors xl:gap-1.5 xl:px-2.5 xl:text-sm ${
          activeRoute ? "text-brand-300" : "text-slate-200 hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 shrink-0 transition-transform duration-300 xl:h-3.5 xl:w-3.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Link>
      {isOpen && (
        <div className={panelClassName} onMouseEnter={() => onOpenMenu(menuKey)} onMouseLeave={onScheduleClose}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Mobile drawer accordion section — mirrors the desktop dropdown structure
    (same group headings and items) so phone visitors get the same premium nav
    (owner request, 17 Oct). Module scope, like NavDrop, so its identity stays
    stable across Header renders. */
function MobileDrop({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-base font-medium text-white"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180 text-brand-300" : "text-slate-400"}`}
        />
      </button>
      {expanded ? <div className="border-t border-white/10 px-2.5 py-2.5">{children}</div> : null}
    </div>
  );
}

/** One tappable row inside a mobile dropdown — name plus one-line descriptor,
    same information hierarchy as the desktop two-line rows. */
function MobileNavRow({
  href,
  title,
  sub,
  onNavigate,
}: {
  href: string;
  title: string;
  sub?: string;
  onNavigate: () => void;
}) {
  return (
    <Link href={href} onClick={onNavigate} className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-white/[0.05]">
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-slate-200">{title}</span>
        {sub ? <span className="block truncate text-[0.7rem] text-slate-500">{sub}</span> : null}
      </span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Mobile drawer: which desktop-mirroring dropdown section is open. */
  const [mobileDrop, setMobileDrop] = useState<MenuKey | null>(null);
  /** Mobile drawer: which service line inside Services is expanded (-1 = B2B). */
  const [mobileLine, setMobileLine] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  /** Which service group the services panel shows. -1 = the B2B pane. */
  const [activePane, setActivePane] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const megaScrollRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const open = (menu: MenuKey) => {
    cancelClose();
    setOpenMenu(menu);
  };
  const scheduleClose = () => {
    cancelClose();
    // Grace period so users can move from the trigger into the panel without
    // the menu vanishing mid-motion. This needs to cover the header's dead
    // strip plus slow diagonal mouse paths — a shorter delay made the panel
    // close and instantly reopen, which read as constant "blinking".
    closeTimer.current = setTimeout(() => setOpenMenu(null), 300);
  };

  useEffect(() => () => cancelClose(), []);

  /**
   * Next's router treats a link to the route you are already on as a no-op, so
   * clicking the logo or the current nav item after scrolling left the page
   * exactly where it was. From the visitor's side the header looked broken.
   * Take the click over ourselves and return to the top.
   */
  const backToTopIfCurrent = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href !== pathname) return;
    event.preventDefault();
    setMobileOpen(false);
    setOpenMenu(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Route-change reset done during render (the React-endorsed "derived state"
   * pattern) so the menus close the moment the URL changes, without an effect
   * cascade. Only the DOM class removal lives in an effect.
   */
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMobileOpen(false);
    setMobileDrop(null);
    setMobileLine(null);
    setOpenMenu(null);
  }
  useEffect(() => {
    document.body.classList.remove("hide-site-cursor");
  }, [pathname]);

  useEffect(() => {
    // Only the mobile drawer locks scroll now. Locking for desktop dropdowns
    // removed the scrollbar and shifted the whole page a few pixels on every
    // open/close — that jump was part of the "popup blinks" complaint.
    const lock = mobileOpen;
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflowY;
    if (lock) {
      document.body.style.overflow = "hidden";
      html.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflow = prevBody;
      html.style.overflowY = prevHtml;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (openMenu !== "services") return;
    const panel = megaPanelRef.current;
    const scroller = megaScrollRef.current;
    if (!panel || !scroller) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      scroller.scrollTop += event.deltaY;
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => panel.removeEventListener("wheel", onWheel);
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const paneServices = (slugs: string[]) =>
    slugs
      .map((slug) => services.find((entry) => entry.slug === slug))
      .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const pane =
    activePane === -1
      ? { title: "B2B business services", items: paneServices(b2bServiceSlugs) }
      : { title: megaMenuGroups[activePane]?.title ?? "", items: paneServices(megaMenuGroups[activePane]?.slugs ?? []) };

  return (
    <header
      onMouseEnter={() => document.body.classList.add("hide-site-cursor")}
      onMouseLeave={() => document.body.classList.remove("hide-site-cursor")}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-midnight/90 backdrop-blur-xl"
          : "border-b border-transparent bg-midnight/40 backdrop-blur-sm"
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-2 lg:h-[68px] lg:gap-3 xl:h-[72px] xl:gap-4">
          <Link
            href="/"
            onClick={backToTopIfCurrent("/")}
            className="min-w-0 shrink text-white"
            aria-label={`${siteConfig.name} home`}
          >
            {/* Nav carries nine items — the legal tagline lives in the footer. */}
            <Logo secondaryTagline="" />
            <span className="sr-only">{siteConfig.name} home</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {mainNav.map((item) => {
              if (item.label === "Services") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="services"
                    href={item.href}
                    label={item.label}
                    isOpen={openMenu === "services"}
                    activeRoute={isActive(item.href)}
                    onOpenMenu={open}
                    onScheduleClose={scheduleClose}
                    onLinkClick={backToTopIfCurrent(item.href)}
                    panelClassName="fixed left-1/2 top-12 z-40 w-[min(66rem,calc(100vw-2rem))] -translate-x-1/2 pt-6"
                  >
                    <div ref={megaPanelRef}>
                      <div className="nav-pop overflow-hidden rounded-2xl bg-navy-950 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-xl">
                        <div className="flex max-h-[min(72vh,38rem)] items-stretch">
                          <MenuIntro
                            title="Our expertise"
                            desc="Design, engineering and growth — from a landing page to a full platform."
                            cta="All services"
                            ctaHref="/services"
                          />
                          {/* Majors rail — the top-level lines; the hovered
                              line swaps its services in the pane instantly
                              (zero animation on swap: animation here was the
                              "blink" the owner kept seeing). */}
                          <div className="w-[13.75rem] shrink-0 overflow-y-auto border-x border-white/10 bg-white/[0.02] py-2.5">
                            <p className="px-4 pb-1 pt-0.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                              Service lines
                            </p>
                            <ul>
                              {megaMenuGroups.map((group, index) => (
                                <li key={group.title}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActivePane(index)}
                                    onFocus={() => setActivePane(index)}
                                    className={`flex w-full items-center justify-between gap-2 px-4 py-[0.62rem] text-left text-[0.83rem] transition-colors duration-150 ${
                                      activePane === index
                                        ? "bg-white/[0.07] font-semibold text-white shadow-[inset_2px_0_0_#1ca830]"
                                        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                                    }`}
                                  >
                                    {group.title}
                                    <ChevronDown
                                      className={`h-3 w-3 -rotate-90 transition-colors duration-150 ${
                                        activePane === index ? "text-brand-400" : "opacity-30"
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </button>
                                </li>
                              ))}
                              {/* B2B as a plain line with the majors (no
                                  highlight — owner note, 15 Oct). */}
                              <li>
                                <Link
                                  href="/services#b2b"
                                  onMouseEnter={() => setActivePane(-1)}
                                  onFocus={() => setActivePane(-1)}
                                  className={`flex w-full items-center justify-between gap-2 px-4 py-[0.62rem] text-left text-[0.83rem] transition-colors duration-150 ${
                                    activePane === -1
                                      ? "bg-white/[0.07] font-semibold text-white shadow-[inset_2px_0_0_#1ca830]"
                                      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                                  }`}
                                >
                                  B2B services
                                  <ChevronDown
                                    className={`h-3 w-3 -rotate-90 transition-colors duration-150 ${
                                      activePane === -1 ? "text-brand-400" : "opacity-30"
                                    }`}
                                    aria-hidden="true"
                                  />
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* Services pane for the hovered line. */}
                          <div ref={megaScrollRef} className="min-w-0 flex-1 overflow-y-auto p-6">
                            <div className="flex items-baseline justify-between gap-4">
                              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                                {pane.title}
                              </p>
                              {activePane === -1 ? (
                                <Link
                                  href="/services#b2b"
                                  className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-300 transition-colors hover:text-brand-200"
                                >
                                  Open B2B section
                                  <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                              ) : (
                                <Link
                                  href="/services"
                                  className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-300 transition-colors hover:text-brand-200"
                                >
                                  All services
                                  <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                              )}
                            </div>
                            <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                              {pane.items.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.05]"
                                  >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 ring-1 ring-white/10 transition-colors duration-150 group-hover:bg-brand-500/15 group-hover:text-brand-300 group-hover:ring-brand-400/30">
                                      <MegaServiceIcon slug={service.slug} className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-[0.88rem] font-medium text-slate-200 transition-colors duration-150 group-hover:text-white">
                                      {service.shortTitle}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-6 py-3">
                          <p className="text-sm text-slate-400">Not sure which service fits? We will map it on a call.</p>
                          <div className="flex gap-2">
                            <Link
                              href="/services"
                              className="rounded-lg border border-white/15 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-brand-400/60 hover:text-brand-300"
                            >
                              All services
                            </Link>
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-400"
                            >
                              Get a quote <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavDrop>
                );
              }

              if (item.label === "Industries") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="industries"
                    href={item.href}
                    label={item.label}
                    isOpen={openMenu === "industries"}
                    activeRoute={isActive(item.href)}
                    onOpenMenu={open}
                    onScheduleClose={scheduleClose}
                    onLinkClick={backToTopIfCurrent(item.href)}
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(39rem,94vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-navy-950 shadow-[0_32px_84px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-xl">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Industries"
                          desc="Sectors whose workflows we already model — POS to portals."
                          cta="All 13 industries"
                          ctaHref="/industries"
                          className="w-52"
                        />
                        <div className="flex-1 border-l border-white/10 p-4">
                          <p className="px-2.5 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                            13 sectors we build for
                          </p>
                          <ul className="grid content-start gap-x-2 sm:grid-cols-2">
                            {industryLinks.map(([slug, name]) => (
                              <li key={slug}>
                                <Link
                                  href={`/industries/${slug}`}
                                  className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.05]"
                                >
                                  <span className="min-w-0">
                                    <span className="block truncate text-[0.88rem] font-medium text-slate-200 transition-colors duration-150 group-hover:text-white">
                                      {name}
                                    </span>
                                    <span className="block truncate text-[0.7rem] text-slate-500">
                                      {industryBlurbs[slug] ?? "Sector-specific builds"}
                                    </span>
                                  </span>
                                  <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavDrop>
                );
              }

              if (item.label === "Products") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="products"
                    href={item.href}
                    label={item.label}
                    isOpen={openMenu === "products"}
                    activeRoute={isActive(item.href)}
                    onOpenMenu={open}
                    onScheduleClose={scheduleClose}
                    onLinkClick={backToTopIfCurrent(item.href)}
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(35rem,94vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-navy-950 shadow-[0_32px_84px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-xl">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Our ecosystem"
                          desc="Ready-to-deploy products — each one opens live."
                          cta="All products"
                          ctaHref="/products"
                          className="w-56"
                        />
                        <div className="flex-1 border-l border-white/10 p-4">
                          {[
                            { heading: "Live now", items: productLinks.filter(([slug]) => slug === "properties-pak") },
                            { heading: "In rollout", items: productLinks.filter(([slug]) => slug !== "properties-pak") },
                          ].map((group) => (
                            <div key={group.heading} className="[&+&]:mt-3 [&+&]:border-t [&+&]:border-white/10 [&+&]:pt-3">
                              <p className="px-2.5 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                                {group.heading}
                              </p>
                              <ul className="grid content-start">
                                {group.items.map(([slug, name]) => (
                                  <li key={slug}>
                                    <Link
                                      href={`/products/${slug}`}
                                      className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.05]"
                                    >
                                      <span className="min-w-0">
                                        <span className="flex items-center gap-2 text-[0.88rem] font-medium text-slate-200 transition-colors duration-150 group-hover:text-white">
                                          <span className="truncate">{name}</span>
                                          {slug === "properties-pak" && (
                                            <span className="rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-brand-300 ring-1 ring-brand-400/25">
                                              Live
                                            </span>
                                          )}
                                        </span>
                                        <span className="block truncate text-[0.7rem] text-slate-500">
                                          {productBlurbs[slug] ?? "WordbitX ecosystem product"}
                                        </span>
                                      </span>
                                      <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavDrop>
                );
              }

              if (item.label === "Pricing") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="pricing"
                    href={item.href}
                    label={item.label}
                    isOpen={openMenu === "pricing"}
                    activeRoute={
                      isActive(item.href) || pathname === "/pk" || pathname === "/usa"
                    }
                    onOpenMenu={open}
                    onScheduleClose={scheduleClose}
                    onLinkClick={backToTopIfCurrent(item.href)}
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(23rem,94vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-navy-950 shadow-[0_32px_84px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-xl">
                      <p className="border-b border-white/10 px-4 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Prices by market
                      </p>
                      <ul className="p-2">
                        {pricingLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.05]"
                            >
                              <span className="min-w-0">
                                <span className="block truncate text-[0.88rem] font-medium text-slate-200 transition-colors duration-150 group-hover:text-white">
                                  {link.title}
                                </span>
                                <span className="block truncate text-[0.7rem] text-slate-500">{link.sub}</span>
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavDrop>
                );
              }

              if (item.href === "/portfolio") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="portfolio"
                    href={item.href}
                    label={item.label}
                    isOpen={openMenu === "portfolio"}
                    activeRoute={isActive(item.href)}
                    onOpenMenu={open}
                    onScheduleClose={scheduleClose}
                    onLinkClick={backToTopIfCurrent(item.href)}
                    panelClassName="absolute right-0 top-full z-40 w-[min(34rem,94vw)] pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-navy-950 shadow-[0_32px_84px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-xl">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Case studies"
                          desc="Platforms we designed, built and still run."
                          cta="All case studies"
                          ctaHref="/portfolio"
                          className="w-56"
                        />
                        <div className="flex-1 border-l border-white/10 p-4">
                          <p className="px-2.5 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Flagship case profiles
                          </p>
                          <ul className="grid content-start">
                            {portfolioMajors.map(([slug, title]) => (
                              <li key={slug}>
                                <Link
                                  href={`/portfolio/${slug}`}
                                  className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.05]"
                                >
                                  <span className="min-w-0">
                                    <span className="block truncate text-[0.88rem] font-medium text-slate-200 transition-colors duration-150 group-hover:text-white">
                                      {title}
                                    </span>
                                    <span className="block truncate text-[0.7rem] text-slate-500">
                                      {portfolioBlurbs[slug] ?? "Case profile"}
                                    </span>
                                  </span>
                                  <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavDrop>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={backToTopIfCurrent(item.href)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-1.5 py-2 text-[0.8rem] font-medium transition-colors xl:px-2.5 xl:text-sm ${
                    isActive(item.href) ? "text-brand-300" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            {/* Halo lives on a wrapper: the button itself clips its light sweep.
                Surface styling lives in .cta-surface, which is a deep emerald
                ramp so the white label clears AA. */}
            <span
              className="cta-halo relative inline-flex rounded-xl"
              style={{ "--cta-halo-color": "rgba(28, 168, 48, 0.5)" } as CSSProperties}
            >
              <Link
                href="/contact"
                className="cta-live cta-surface group inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-[0.8rem] font-bold tracking-tight transition-all hover:-translate-y-0.5 xl:px-4.5 xl:text-sm"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_7px_rgba(28,168,48,0.9)]" />
                </span>
                {/* Laptop widths (1024-1279) only have room for the short label;
                    the full label returns at xl where the bar is wider. */}
                <span className="xl:hidden">Contact</span>
                <span className="hidden xl:inline">Discuss Your Project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2 lg:hidden">
            {/* Primary CTA replaces the WhatsApp shortcut that used to sit here.
                The label and the ornaments are responsive because this bar is
                tight: on a 375px screen only about 169px is left once the
                wordmark and the menu button are placed, so below sm the dot
                and arrow are dropped and the label is shortened. WhatsApp is
                still available inside the mobile menu.
                2026-10-09: the old 0.7rem / tracking-tight label looked
                squeezed inside a 40px-tall button. Label is now 0.8rem with
                normal tracking, the button is pinned to h-10 so it lines up
                with the menu button, and the arrow returns from 400px up. */}
            <span
              className="cta-halo relative inline-flex shrink-0 rounded-xl"
              style={{ "--cta-halo-color": "rgba(28, 168, 48, 0.5)" } as CSSProperties}
            >
              <Link
                href="/contact"
                className="cta-live cta-surface group inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 text-[0.8rem] font-semibold sm:gap-2 sm:px-4 sm:text-sm"
              >
                <span className="relative hidden h-2 w-2 sm:flex" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_7px_rgba(28,168,48,0.9)]" />
                </span>
                <span className="sm:hidden">Discuss Project</span>
                <span className="hidden sm:inline">Discuss Your Project</span>
                <ArrowRight className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 min-[400px]:block sm:h-4 sm:w-4" />
              </Link>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-transparent text-white"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="min-h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-midnight lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="container-page space-y-1 py-5">
            {mainNav.map((item) => {
              if (item.label === "Services") {
                return (
                  <MobileDrop
                    key={item.href}
                    label="Services"
                    expanded={mobileDrop === "services"}
                    onToggle={() => {
                      setMobileDrop(mobileDrop === "services" ? null : "services");
                      setMobileLine(null);
                    }}
                  >
                    <p className="px-2.5 pb-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Service lines
                    </p>
                    <ul className="space-y-0.5">
                      {megaMenuGroups.map((group, index) => (
                        <li key={group.title}>
                          <button
                            type="button"
                            onClick={() => setMobileLine(mobileLine === index ? null : index)}
                            aria-expanded={mobileLine === index}
                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm font-medium transition-colors ${
                              mobileLine === index ? "bg-white/[0.06] text-white" : "text-slate-200 hover:bg-white/[0.05]"
                            }`}
                          >
                            {group.title}
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                mobileLine === index ? "rotate-180 text-brand-300" : "text-slate-500"
                              }`}
                            />
                          </button>
                          {mobileLine === index ? (
                            <ul className="mb-1 ml-3 space-y-0.5 border-l border-white/10 pl-2.5 pt-0.5">
                              {paneServices(group.slugs).map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05]"
                                  >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-slate-400 ring-1 ring-white/10">
                                      <MegaServiceIcon slug={service.slug} className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-[0.83rem] text-slate-300">
                                      {service.shortTitle}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                      {/* B2B — plain line like the desktop rail; expands the
                          same B2B services list the desktop pane shows. */}
                      <li>
                        <button
                          type="button"
                          onClick={() => setMobileLine(mobileLine === -1 ? null : -1)}
                          aria-expanded={mobileLine === -1}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm font-medium transition-colors ${
                            mobileLine === -1 ? "bg-white/[0.06] text-white" : "text-slate-200 hover:bg-white/[0.05]"
                          }`}
                        >
                          B2B services
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              mobileLine === -1 ? "rotate-180 text-brand-300" : "text-slate-500"
                            }`}
                          />
                        </button>
                        {mobileLine === -1 ? (
                          <ul className="mb-1 ml-3 space-y-0.5 border-l border-white/10 pl-2.5 pt-0.5">
                            {paneServices(b2bServiceSlugs).map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05]"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-slate-400 ring-1 ring-white/10">
                                    <MegaServiceIcon slug={service.slug} className="h-3.5 w-3.5" />
                                  </span>
                                  <span className="min-w-0 flex-1 truncate text-[0.83rem] text-slate-300">
                                    {service.shortTitle}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    </ul>
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="group mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/[0.05]"
                    >
                      All services
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </MobileDrop>
                );
              }

              if (item.label === "Industries") {
                return (
                  <MobileDrop
                    key={item.href}
                    label="Industries"
                    expanded={mobileDrop === "industries"}
                    onToggle={() => setMobileDrop(mobileDrop === "industries" ? null : "industries")}
                  >
                    <p className="px-2.5 pb-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                      13 sectors we build for
                    </p>
                    <ul className="space-y-0.5">
                      {industryLinks.map(([slug, name]) => (
                        <li key={slug}>
                          <MobileNavRow
                            href={`/industries/${slug}`}
                            title={name}
                            sub={industryBlurbs[slug] ?? "Sector-specific builds"}
                            onNavigate={() => setMobileOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/industries"
                      onClick={() => setMobileOpen(false)}
                      className="group mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/[0.05]"
                    >
                      All 13 industries
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </MobileDrop>
                );
              }

              if (item.label === "Products") {
                return (
                  <MobileDrop
                    key={item.href}
                    label="Products"
                    expanded={mobileDrop === "products"}
                    onToggle={() => setMobileDrop(mobileDrop === "products" ? null : "products")}
                  >
                    {[
                      { heading: "Live now", items: productLinks.filter(([slug]) => slug === "properties-pak") },
                      { heading: "In rollout", items: productLinks.filter(([slug]) => slug !== "properties-pak") },
                    ].map((group) => (
                      <div key={group.heading} className="[&+&]:mt-2.5 [&+&]:border-t [&+&]:border-white/10 [&+&]:pt-2.5">
                        <p className="px-2.5 pb-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                          {group.heading}
                        </p>
                        <ul className="space-y-0.5">
                          {group.items.map(([slug, name]) => (
                            <li key={slug}>
                              <MobileNavRow
                                href={`/products/${slug}`}
                                title={slug === "properties-pak" ? `${name} · Live` : name}
                                sub={productBlurbs[slug] ?? "WordbitX ecosystem product"}
                                onNavigate={() => setMobileOpen(false)}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className="group mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/[0.05]"
                    >
                      All products
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </MobileDrop>
                );
              }

              if (item.label === "Pricing") {
                return (
                  <MobileDrop
                    key={item.href}
                    label="Pricing"
                    expanded={mobileDrop === "pricing"}
                    onToggle={() => setMobileDrop(mobileDrop === "pricing" ? null : "pricing")}
                  >
                    <p className="px-2.5 pb-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Prices by market
                    </p>
                    <ul className="space-y-0.5">
                      {pricingLinks.map((link) => (
                        <li key={link.href}>
                          <MobileNavRow
                            href={link.href}
                            title={link.title}
                            sub={link.sub}
                            onNavigate={() => setMobileOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileOpen(false)}
                      className="group mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/[0.05]"
                    >
                      All pricing
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </MobileDrop>
                );
              }

              if (item.href === "/portfolio") {
                return (
                  <MobileDrop
                    key={item.href}
                    label="Case Studies"
                    expanded={mobileDrop === "portfolio"}
                    onToggle={() => setMobileDrop(mobileDrop === "portfolio" ? null : "portfolio")}
                  >
                    <p className="px-2.5 pb-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Flagship case profiles
                    </p>
                    <ul className="space-y-0.5">
                      {portfolioMajors.map(([slug, title]) => (
                        <li key={slug}>
                          <MobileNavRow
                            href={`/portfolio/${slug}`}
                            title={title}
                            sub={portfolioBlurbs[slug] ?? "Case profile"}
                            onNavigate={() => setMobileOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/portfolio"
                      onClick={() => setMobileOpen(false)}
                      className="group mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/[0.05]"
                    >
                      All portfolio
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </MobileDrop>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={backToTopIfCurrent(item.href)}
                  className={`block rounded-2xl border border-white/10 px-4 py-3.5 text-base font-medium transition-colors hover:bg-white/[0.04] ${
                    isActive(item.href) ? "text-brand-300" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              <Link
                href="/contact"
                className="cta-live cta-surface inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold tracking-tight"
              >
                <span>Discuss Your Project</span> <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <p className="pt-3 text-center text-xs text-slate-400">
              {siteConfig.email} · {siteConfig.phoneDisplay}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
