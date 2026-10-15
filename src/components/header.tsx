"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Logo, MenuIcon, CloseIcon, ChevronDown, ArrowRight, WhatsAppIcon } from "@/components/icons";
import { MegaServiceIcon } from "@/components/mega-service-icon";
import { b2bServiceSlugs, megaMenuGroups, services } from "@/lib/services";
import { mainNav, siteConfig, whatsappLink } from "@/lib/site";

type MenuKey = "services" | "industries" | "products" | "portfolio";

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

/** Portfolio popup — the flagship project profiles (slugs from src/lib/portfolio.ts). */
const portfolioMajors: [string, string][] = [
  ["real-estate-listing-marketplace", "Real Estate Listing Marketplace"],
  ["multi-branch-retail-pos-platform", "Multi-Branch Retail POS Platform"],
  ["clinic-appointment-booking-portal", "Clinic Appointment Booking Portal"],
  ["ai-document-processing-assistant", "AI Document Processing Assistant"],
  ["fashion-shopify-storefront", "Fashion Shopify Storefront"],
  ["logistics-fleet-tracking-app", "Logistics Fleet & Delivery App"],
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
    // strip (the trigger bottoms out ~14-18px above the fixed services
    // container) plus slow diagonal mouse paths — a shorter delay made the
    // panel close and instantly reopen, which read as constant "blinking"
    // (owner report, 15 Oct). 300ms keeps crossing safe without lagging.
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
    setMobileServicesOpen(false);
    setOpenMenu(null);
  }
  useEffect(() => {
    document.body.classList.remove("hide-site-cursor");
  }, [pathname]);

  useEffect(() => {
    const lock = mobileOpen || openMenu === "services";
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
  }, [mobileOpen, openMenu]);

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

  /** Desktop nav item with a hover/focus dropdown panel. */
  function NavDrop({
    menuKey,
    href,
    label,
    panelClassName,
    children,
  }: {
    menuKey: MenuKey;
    href: string;
    label: string;
    panelClassName: string;
    children: React.ReactNode;
  }) {
    const isOpen = openMenu === menuKey;
    return (
      <div
        className="relative"
        onMouseEnter={() => open(menuKey)}
        onMouseLeave={scheduleClose}
        onFocus={() => open(menuKey)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            scheduleClose();
          }
        }}
      >
        <Link
          href={href}
          onClick={backToTopIfCurrent(href)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
            isActive(href) ? "text-brand-300" : "text-slate-200 hover:text-white"
          }`}
        >
          {label}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </Link>
        {isOpen && (
          <div className={panelClassName} onMouseEnter={() => open(menuKey)} onMouseLeave={scheduleClose}>
            {children}
          </div>
        )}
      </div>
    );
  }

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
        <div className="flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-4">
          <Link
            href="/"
            onClick={backToTopIfCurrent("/")}
            className="min-w-0 shrink text-white"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo />
            <span className="sr-only">{siteConfig.name} home</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              if (item.label === "Services") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="services"
                    href={item.href}
                    label={item.label}
                    panelClassName="fixed left-1/2 top-12 z-40 w-[min(66rem,calc(100vw-2rem))] -translate-x-1/2 pt-6"
                  >
                    <div ref={megaPanelRef}>
                      <div className="nav-pop overflow-hidden rounded-2xl bg-white shadow-[0_42px_88px_-28px_rgba(4,10,30,0.55),0_14px_34px_-14px_rgba(4,10,30,0.28)] ring-1 ring-slate-900/[0.08]">
                        <div className="flex max-h-[min(72vh,38rem)] items-stretch">
                          <MenuIntro
                            title="Our expertise"
                            desc="Design, engineering and growth — from a landing page to a full platform."
                            cta="All services"
                            ctaHref="/services"
                          />
                          {/* Majors rail — the top-level lines, Rex-style; the
                              hovered line opens its services in the white pane. */}
                          <div className="w-[13.5rem] shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 py-2.5">
                            <ul>
                              {megaMenuGroups.map((group, index) => (
                                <li key={group.title}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActivePane(index)}
                                    onFocus={() => setActivePane(index)}
                                    className={`flex w-full items-center justify-between gap-2 px-4 py-[0.62rem] text-left text-[0.83rem] transition-all duration-200 ${
                                      activePane === index
                                        ? "bg-white font-semibold text-ink-900 shadow-[inset_2px_0_0_#1ca830,0_10px_20px_-16px_rgba(5,13,33,0.45)]"
                                        : "text-slate-600 hover:bg-white/70 hover:text-ink-900"
                                    }`}
                                  >
                                    {group.title}
                                    <ChevronDown
                                      className={`h-3 w-3 -rotate-90 transition-all duration-200 ${
                                        activePane === index ? "translate-x-0.5 text-brand-600 opacity-100" : "opacity-40"
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
                                  className={`flex w-full items-center justify-between gap-2 px-4 py-[0.62rem] text-left text-[0.83rem] transition-all duration-200 ${
                                    activePane === -1
                                      ? "bg-white font-semibold text-ink-900 shadow-[inset_2px_0_0_#1ca830,0_10px_20px_-16px_rgba(5,13,33,0.45)]"
                                      : "text-slate-600 hover:bg-white/70 hover:text-ink-900"
                                  }`}
                                >
                                  B2B services
                                  <ChevronDown
                                    className={`h-3 w-3 -rotate-90 transition-all duration-200 ${
                                      activePane === -1 ? "translate-x-0.5 text-brand-600 opacity-100" : "opacity-40"
                                    }`}
                                    aria-hidden="true"
                                  />
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* White pane — the hovered line's services. key=activePane
                              remounts the block on rail switches so the pane-in
                              animation replays per group (the premium "swap"). */}
                          <div ref={megaScrollRef} className="min-w-0 flex-1 overflow-y-auto bg-white p-6">
                            <div key={activePane} className="menu-pane-in">
                              <div className="flex items-baseline justify-between gap-4">
                                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                                  {pane.title}
                                </p>
                                {activePane === -1 ? (
                                  <Link href="/services#b2b" className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition-colors hover:text-brand-800">
                                    Open B2B section
                                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                                  </Link>
                                ) : (
                                  <Link href="/services" className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition-colors hover:text-brand-800">
                                    All services
                                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                                  </Link>
                                )}
                              </div>
                              <ul className="mt-3 grid gap-0.5 sm:grid-cols-2">
                                {pane.items.map((service, index) => (
                                  <li key={service.slug} className="menu-row" style={{ animationDelay: `${Math.min(index, 7) * 26}ms` }}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[0.92rem] font-semibold text-slate-800 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
                                    >
                                      <span className="truncate transition-transform duration-200 group-hover:translate-x-0.5">
                                        {service.shortTitle}
                                      </span>
                                      <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3">
                          <p className="text-sm text-slate-500">Not sure which service fits? We will map it on a call.</p>
                          <div className="flex gap-2">
                            <Link
                              href="/services"
                              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-brand-500 hover:text-brand-700"
                            >
                              All services
                            </Link>
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
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
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(36rem,94vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-white shadow-[0_34px_76px_-26px_rgba(4,10,30,0.5),0_12px_30px_-14px_rgba(4,10,30,0.25)] ring-1 ring-slate-900/[0.08]">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Industries"
                          desc="Sectors whose workflows we already model — POS to portals."
                          cta="All 13 industries"
                          ctaHref="/industries"
                          className="w-56"
                        />
                        <ul className="grid flex-1 content-start gap-0.5 p-4 sm:grid-cols-2">
                          {industryLinks.map(([slug, name], index) => (
                            <li key={slug} className="menu-row" style={{ animationDelay: `${Math.min(index, 9) * 20}ms` }}>
                              <Link
                                href={`/industries/${slug}`}
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[0.92rem] font-semibold text-slate-800 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
                              >
                                {name}
                                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
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
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(34rem,94vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-white shadow-[0_34px_76px_-26px_rgba(4,10,30,0.5),0_12px_30px_-14px_rgba(4,10,30,0.25)] ring-1 ring-slate-900/[0.08]">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Our ecosystem"
                          desc="Ready-to-deploy products — each one opens live."
                          cta="All products"
                          ctaHref="/products"
                          className="w-56"
                        />
                        <ul className="grid flex-1 content-start gap-0.5 p-4">
                          {productLinks.map(([slug, name], index) => (
                            <li key={slug} className="menu-row" style={{ animationDelay: `${Math.min(index, 6) * 26}ms` }}>
                              <Link
                                href={`/products/${slug}`}
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[0.92rem] font-semibold text-slate-800 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
                              >
                                <span className="flex items-center gap-2">
                                  {name}
                                  {slug === "properties-pak" && (
                                    <span className="rounded-full bg-brand-500/10 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-brand-700">
                                      Live
                                    </span>
                                  )}
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavDrop>
                );
              }

              if (item.label === "Portfolio") {
                return (
                  <NavDrop
                    key={item.href}
                    menuKey="portfolio"
                    href={item.href}
                    label={item.label}
                    panelClassName="absolute right-0 top-full z-40 w-[min(33rem,94vw)] pt-2"
                  >
                    <div className="nav-pop overflow-hidden rounded-2xl bg-white shadow-[0_34px_76px_-26px_rgba(4,10,30,0.5),0_12px_30px_-14px_rgba(4,10,30,0.25)] ring-1 ring-slate-900/[0.08]">
                      <div className="flex items-stretch">
                        <MenuIntro
                          title="Selected work"
                          desc="Platforms we designed, built and still run."
                          cta="All portfolio"
                          ctaHref="/portfolio"
                          className="w-56"
                        />
                        <ul className="grid flex-1 content-start gap-0.5 p-4">
                          {portfolioMajors.map(([slug, title], index) => (
                            <li key={slug} className="menu-row" style={{ animationDelay: `${Math.min(index, 5) * 26}ms` }}>
                              <Link
                                href={`/portfolio/${slug}`}
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[0.92rem] font-semibold text-slate-800 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
                              >
                                <span className="truncate">{title}</span>
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
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
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-brand-300" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Halo lives on a wrapper: the button itself clips its light sweep.
                Surface styling lives in .cta-surface, which is a deep emerald
                ramp so the white label clears AA. */}
            <span
              className="cta-halo relative inline-flex rounded-xl"
              style={{ "--cta-halo-color": "rgba(28, 168, 48, 0.5)" } as CSSProperties}
            >
              <Link
                href="/contact"
                className="cta-live cta-surface group inline-flex items-center gap-2 rounded-xl px-4.5 py-2.5 text-sm font-bold tracking-tight transition-all hover:-translate-y-0.5"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_7px_rgba(28,168,48,0.9)]" />
                </span>
                <span>Discuss Your Project</span>
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
                  <div key={item.href} className="rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/services"
                        onClick={backToTopIfCurrent("/services")}
                        className="flex-1 px-4 py-3 text-base font-medium text-white"
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((open) => !open)}
                        className="px-4 py-3 text-slate-300"
                        aria-expanded={mobileServicesOpen}
                        aria-label="Toggle services list"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <ul className="border-t border-white/10 p-2">
                        <li>
                          <Link
                            href="/services#b2b"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                          >
                            <MegaServiceIcon slug="enterprise-software-solutions" className="h-4 w-4" />
                            B2B business services
                          </Link>
                        </li>
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                            >
                              <MegaServiceIcon slug={service.slug} className="h-4 w-4" />
                              {service.shortTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={backToTopIfCurrent(item.href)}
                  className={`block rounded-xl border border-white/10 px-4 py-3 text-base font-medium ${
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
