"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Logo, MenuIcon, CloseIcon, ChevronDown, ArrowRight, WhatsAppIcon } from "@/components/icons";
import { MegaServiceIcon } from "@/components/mega-service-icon";
import { b2bServiceSlugs, megaMenuGroups, services } from "@/lib/services";
import { mainNav, siteConfig, whatsappLink } from "@/lib/site";

type MenuKey = "services" | "industries" | "portfolio";

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
    // the menu vanishing mid-motion.
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
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
                    panelClassName="fixed left-1/2 top-16 z-40 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 pt-2 lg:top-[72px]"
                  >
                    <div ref={megaPanelRef}>
                      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#07111f] shadow-[0_32px_80px_-32px_rgba(0,0,0,0.88)]">
                        <div className="flex max-h-[min(70vh,36rem)]">
                          {/* Left rail — the major service lines, Rex-style. The
                              hovered line opens its services in the pane. */}
                          <div className="w-[17rem] shrink-0 border-r border-white/10 bg-white/[0.02] py-2.5">
                            <ul>
                              {megaMenuGroups.map((group, index) => (
                                <li key={group.title}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActivePane(index)}
                                    onFocus={() => setActivePane(index)}
                                    className={`flex w-full items-center justify-between gap-3 px-5 py-[0.68rem] text-left text-sm transition-colors ${
                                      activePane === index
                                        ? "bg-white/[0.07] font-medium text-white"
                                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                  >
                                    {group.title}
                                    <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-50" aria-hidden="true" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                            {/* Dedicated B2B row — same spot peers give it. */}
                            <div className="mt-2 px-3">
                              <Link
                                href="/services#b2b"
                                onMouseEnter={() => setActivePane(-1)}
                                onFocus={() => setActivePane(-1)}
                                className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                                  activePane === -1
                                    ? "border-brand-400/50 bg-brand-500/20 text-white"
                                    : "border-brand-400/30 bg-brand-500/12 text-brand-200 hover:bg-brand-500/18 hover:text-white"
                                }`}
                              >
                                B2B services
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                              </Link>
                            </div>
                          </div>

                          {/* Right pane — the hovered line's services. */}
                          <div ref={megaScrollRef} className="min-w-0 flex-1 p-5 lg:p-6">
                            <div className="flex items-baseline justify-between gap-4">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-300">
                                {pane.title}
                              </p>
                              {activePane === -1 ? (
                                <Link href="/services#b2b" className="text-xs font-semibold text-arc-300 transition-colors hover:text-white">
                                  Open B2B section →
                                </Link>
                              ) : (
                                <Link href="/services" className="text-xs font-semibold text-arc-300 transition-colors hover:text-white">
                                  All services →
                                </Link>
                              )}
                            </div>
                            <ul className="mt-3.5 grid gap-1 sm:grid-cols-2">
                              {pane.items.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.06]"
                                  >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-brand-300 ring-1 ring-white/10 transition-colors group-hover:text-brand-200">
                                      <MegaServiceIcon slug={service.slug} className="h-4 w-4" />
                                    </span>
                                    <span className="truncate text-sm font-medium text-slate-100">{service.shortTitle}</span>
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
                              className="rounded-lg border border-white/12 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-brand-400/50"
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
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(30rem,92vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="rounded-2xl border border-white/12 bg-[#07111f] p-3.5 shadow-[0_28px_64px_-28px_rgba(0,0,0,0.9)]">
                      <p className="px-2.5 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-300">
                        Industries we build for
                      </p>
                      <ul className="grid gap-0.5 sm:grid-cols-2">
                        {industryLinks.map(([slug, name]) => (
                          <li key={slug}>
                            <Link
                              href={`/industries/${slug}`}
                              className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                            >
                              {name}
                              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-brand-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/industries"
                        className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:border-brand-400/50 hover:text-brand-200"
                      >
                        All {industryLinks.length} industries
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
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
                    panelClassName="absolute left-1/2 top-full z-40 w-[min(22rem,92vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="rounded-2xl border border-white/12 bg-[#07111f] p-3.5 shadow-[0_28px_64px_-28px_rgba(0,0,0,0.9)]">
                      <p className="px-2.5 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-300">
                        Flagship builds
                      </p>
                      <ul className="grid gap-0.5">
                        {portfolioMajors.map(([slug, title]) => (
                          <li key={slug}>
                            <Link
                              href={`/portfolio/${slug}`}
                              className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                            >
                              <span className="truncate">{title}</span>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/portfolio"
                        className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:border-brand-400/50 hover:text-brand-200"
                      >
                        View all portfolio
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
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
                            className="flex items-center gap-3 rounded-lg border border-brand-400/25 bg-brand-500/10 px-3 py-2.5 text-sm font-semibold text-brand-200 hover:bg-brand-500/16"
                          >
                            <span className="flex h-4 w-4 items-center justify-center text-brand-300">◆</span>
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
