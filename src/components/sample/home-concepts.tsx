import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import { founder } from "@/lib/team";
import { siteConfig } from "@/lib/site";

/**
 * Six complete home-page concepts for review, all built on the brand navy
 * (#052767) the owner asked for on 30 Oct 2026.
 *
 * Rules kept from the main build:
 *  - flat colour, no gradients, no heavy animation;
 *  - one accent (brand green) and white/navy as the only other tones;
 *  - every number and claim here already appears elsewhere on the site, so a
 *    concept can be chosen and shipped without inventing anything;
 *  - these are internal review pages. /sample is noindex AND disallowed in
 *    robots.txt, so nothing here competes with the live home page.
 */

const pak = demoWebsites.find((demo) => demo.id === "properties-pak");
const pakPreview = pak ? demoPreview(pak) : undefined;

const serviceRows: { title: string; body: string }[] = [
  { title: "Website design", body: "Mobile-first business sites, with an admin you can actually edit." },
  { title: "E-commerce", body: "Stores with cash on delivery, courier handoff and PKR pricing." },
  { title: "Custom software", body: "Portals, POS, CRM and the systems that run behind them." },
  { title: "Mobile apps", body: "Android and iOS builds with the admin panel included." },
  { title: "SEO and care", body: "Local search, backups, updates and small fixes each month." },
];

const navLinks = ["Services", "Industries", "Products", "Portfolio", "Pricing"];

/* ------------------------------------------------------------------ */
/* Shared shell                                                        */
/* ------------------------------------------------------------------ */

function Badge({ n, name, note }: { n: number; name: string; note: string }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-40 flex max-w-[calc(100%-1.5rem)] items-center gap-2.5 rounded-full border border-white/20 bg-navy-950/80 py-1.5 pl-1.5 pr-3.5 text-[0.7rem] backdrop-blur sm:left-5 sm:top-5">
      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 font-bold text-navy-900">
        {String(n).padStart(2, "0")}
      </span>
      <span className="font-semibold text-white">{name}</span>
      <span className="hidden truncate text-slate-300 sm:inline">· {note}</span>
    </div>
  );
}

function Concept({
  n,
  name,
  note,
  children,
}: {
  n: number;
  name: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section id={`c${String(n).padStart(2, "0")}`} className="relative scroll-mt-4">
      <Badge n={n} name={name} note={note} />
      {children}
    </section>
  );
}

function Mark({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight ${light ? "text-navy-700" : "text-white"}`}>
      Wordbit
      <span className="text-brand-500">X</span>
    </span>
  );
}

function MiniNav({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  return (
    <div className={`flex items-center justify-between gap-4 border-b px-4 py-3.5 sm:px-8 ${light ? "border-navy-700/10" : "border-white/12"}`}>
      <Mark light={light} />
      <nav className="hidden items-center gap-5 md:flex" aria-hidden="true">
        {navLinks.map((label) => (
          <span key={label} className={`text-[0.78rem] ${light ? "text-navy-700/70" : "text-slate-300"}`}>
            {label}
          </span>
        ))}
      </nav>
      <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-[0.72rem] font-semibold text-white">Book a free call</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — Column: split hero with the product card                       */
/* ------------------------------------------------------------------ */

function ConceptColumn() {
  return (
    <div className="bg-navy-700 pt-16 text-white sm:pt-20">
      <MiniNav />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-300">
            Software engineering · Lahore · Est. 2021
          </p>
          <h3 className="mt-3 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3rem]">
            Build the system your business runs on.
          </h3>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-slate-200">
            WordbitX designs, builds and maintains websites, commerce platforms and internal software for companies in
            Pakistan and their clients in the USA, UK and UAE.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold">Start a project</span>
            <span className="rounded-xl border border-white/40 px-4 py-2.5 text-sm font-semibold">See prices in PKR</span>
          </div>
          <p className="mt-3 text-[0.76rem] text-slate-300">Fixed written quote before any work starts.</p>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-[0_34px_70px_-40px_rgba(0,0,0,0.9)]">
          {pak && pakPreview ? (
            <div className="overflow-hidden rounded-xl">
              <ShowcaseStage demo={pak} shot={pakPreview.src} isCover={pakPreview.isCover} stage={demoStageSrc(pak)} variant="card" />
            </div>
          ) : null}
          <div className="px-2 pb-1 pt-3">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">Our own product</p>
            <p className="mt-1 text-[0.92rem] font-semibold text-navy-700">Properties Pak — a live property portal</p>
            <p className="mt-1 text-[0.8rem] leading-snug text-ink-600">
              Society, phase and block listings, map search and dealer enquiries. Open it and click around.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/12 bg-white py-10 text-ink-900">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-8">
          {serviceRows.slice(0, 3).map((service) => (
            <div key={service.title} className="rounded-xl border border-slate-200 p-4">
              <p className="text-[0.92rem] font-semibold text-navy-700">{service.title}</p>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-600">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Ledger: editorial, ivory card on navy                           */
/* ------------------------------------------------------------------ */

function ConceptLedger() {
  return (
    <div className="bg-navy-800 px-3 pb-8 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-[#F7F5EE] text-navy-900">
        <div className="flex items-center justify-between border-b border-navy-700/15 px-5 py-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-navy-700/70">
            WordbitX studio — Lahore
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-navy-700/70">Est. 2021</span>
        </div>

        <div className="grid gap-8 px-5 py-9 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-14">
          <div>
            <h3 className="font-serif text-[2.2rem] font-normal leading-[1.02] tracking-[-0.02em] text-navy-700 sm:text-[2.9rem]">
              Precise software, plainly priced.
            </h3>
            <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-ink-700">
              A Lahore studio, founded in 2021. Six disciplines, one engineering team, and a written scope agreed before
              the first line of code ships.
            </p>
            <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-navy-700/60">Index</p>
            <ul className="mt-2 space-y-1.5">
              {serviceRows.map((service, index) => (
                <li key={service.title} className="flex gap-3 text-[0.85rem] text-ink-700">
                  <span className="font-mono text-[0.72rem] text-navy-700/50">{String(index + 1).padStart(2, "0")}</span>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-navy-700/15 lg:pl-10">
            <div className="space-y-0">
              {serviceRows.map((service, index) => (
                <div key={service.title} className="flex items-start justify-between gap-4 border-b border-navy-700/12 py-3.5">
                  <div>
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-navy-700/50">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-[0.95rem] font-semibold text-navy-700">{service.title}</p>
                    <p className="mt-0.5 text-[0.8rem] leading-snug text-ink-600">{service.body}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-navy-700/20 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-navy-700/70">
                    Quoted
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-navy-700 p-5 text-white">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-brand-300">Website packages</p>
              <p className="mt-1.5 font-serif text-[1.5rem] leading-tight">Two prices, written down.</p>
              <p className="mt-1.5 text-[0.82rem] text-slate-200">
                Website only, or website with domain and first-year hosting. Both fixed in writing before work starts.
              </p>
              <span className="mt-3 inline-flex rounded-lg bg-brand-500 px-3.5 py-2 text-[0.8rem] font-semibold">
                See the packages
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Spotlight: full-bleed photo, centred type                       */
/* ------------------------------------------------------------------ */

function ConceptSpotlight() {
  return (
    <div className="bg-navy-900 pt-16 text-white sm:pt-20">
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/brand/office-meeting.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45"
            priority={false}
          />
          <div className="absolute inset-0 bg-navy-900/70" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-8 sm:py-24">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-300">Lahore · Since 2021</p>
          <h3 className="mt-3 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[3.2rem]">
            Your next website should pay for itself.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-slate-200">
            We build the site, the store and the system behind it — quoted in writing, delivered on schedule, and handed
            over with the code in your name.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <span className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold">Book a free call</span>
            <span className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold">
              Call / WhatsApp {siteConfig.phoneDisplay}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-5xl px-4 pb-12 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-navy-700 sm:grid-cols-4">
          {[
            ["2021", "Founded"],
            ["5", "Cities with pages"],
            ["6", "Service lines"],
            ["100%", "Code handed over"],
          ].map(([value, label]) => (
            <div key={label} className="bg-white px-4 py-5 text-center">
              <p className="text-2xl font-semibold text-navy-700">{value}</p>
              <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Grid: dense, rule-led, technical                                */
/* ------------------------------------------------------------------ */

function ConceptGrid() {
  return (
    <div className="bg-navy-700 pt-16 text-white sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/20 py-8">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-brand-300">WordbitX / 2021—2026</p>
            <h3 className="mt-2 max-w-xl text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[2.7rem]">
              Engineering studio — web, commerce, systems.
            </h3>
          </div>
          <div className="font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-slate-300">
            Lahore 31.5°N
            <br />
            <span className="text-brand-300">Available for new work</span>
          </div>
        </div>

        <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "You own the code", "Repo, hosting and logins in your accounts at handover."],
            ["02", "Written scope", "Pages, price and dates agreed before work starts."],
            ["03", "Weekly demos", "A staging link you can open, not a status email."],
            ["04", "Registered", "SECP and FBR registered in Lahore."],
          ].map(([n, title, body]) => (
            <div key={n} className="bg-navy-700 p-5">
              <p className="font-mono text-[0.66rem] text-brand-300">{n}</p>
              <p className="mt-2 text-[0.92rem] font-semibold">{title}</p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-300">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-white/20 pb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400 sm:grid-cols-[3rem_1.2fr_1fr_auto]">
            <span>No.</span>
            <span>Service</span>
            <span className="hidden sm:block">What it covers</span>
            <span>Basis</span>
          </div>
          {serviceRows.map((service, index) => (
            <div
              key={service.title}
              className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-white/12 py-3 sm:grid-cols-[3rem_1.2fr_1fr_auto]"
            >
              <span className="font-mono text-[0.7rem] text-brand-300">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[0.9rem] font-medium">{service.title}</span>
              <span className="hidden text-[0.8rem] text-slate-300 sm:block">{service.body}</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-slate-400">Fixed quote</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-8">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate-400">
            Prices in PKR · written before work starts
          </p>
          <span className="rounded bg-brand-500 px-3.5 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em]">
            Request a quote
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Showcase: product-led, big frame                                */
/* ------------------------------------------------------------------ */

function ConceptShowcase() {
  return (
    <div className="bg-navy-900 pt-16 text-white sm:pt-20">
      <div className="mx-auto max-w-5xl px-4 pt-10 text-center sm:px-8">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-300">We run what we build</p>
        <h3 className="mx-auto mt-3 max-w-2xl text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[2.9rem]">
          Before we sell you a portal, we run one.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-300">
          Properties Pak is WordbitX&apos;s own property marketplace — live, public, and still maintained by the team that
          built it.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_90px_-50px_rgba(0,0,0,1)]">
          {pak && pakPreview ? (
            <ShowcaseStage demo={pak} shot={pakPreview.src} isCover={pakPreview.isCover} stage={demoStageSrc(pak)} variant="feature" />
          ) : null}
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-px bg-white/12 px-0 py-10 sm:grid-cols-3 sm:px-8">
        {[
          ["Society, phase and block", "Inventory modelled the way Pakistani property is actually sold."],
          ["Map-led search", "Viewport filtering, saved searches and plot/file detail pages."],
          ["Dealer enquiries", "Listings moderated before they go live, leads routed to the agent."],
        ].map(([title, body]) => (
          <div key={title} className="bg-navy-900 px-5 py-4">
            <CheckIcon className="h-4 w-4 text-brand-400" aria-hidden="true" />
            <p className="mt-2 text-[0.9rem] font-semibold">{title}</p>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-slate-400">{body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/12 px-4 py-8 text-center">
        <span className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold">Build something like it</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — Warm: rounded cards, founder note, friendly                     */
/* ------------------------------------------------------------------ */

function ConceptWarm() {
  return (
    <div className="bg-[#F3EFE6] pt-16 text-navy-900 sm:pt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-navy-700 px-5 py-8 text-white sm:px-9 sm:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Mark />
            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-medium text-slate-200">
              Lahore · replies from this phone
            </span>
          </div>
          <h3 className="mt-6 max-w-xl text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[2.7rem]">
            A software team that answers the phone.
          </h3>
          <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-slate-200">
            No account managers, no ticket queue. You talk to the people building the site — and you keep the code when
            it is done.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold">Book a free call</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2.5 text-sm font-semibold">
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" /> {siteConfig.phoneDisplay}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Website", "Business site, edited by you."],
            ["02", "Store", "COD, couriers and PKR pricing."],
            ["03", "System", "POS, CRM or a portal."],
          ].map(([n, title, body]) => (
            <div key={n} className="rounded-3xl bg-white p-5 shadow-[0_20px_40px_-34px_rgba(5,39,103,0.55)]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-700 text-[0.66rem] font-bold text-white">
                {n}
              </span>
              <p className="mt-3 text-[0.95rem] font-semibold text-navy-700">{title}</p>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-white p-5 sm:p-7">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-700">From the founder</p>
          <blockquote className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-700">
            “You own what we build. Source code, repositories, hosting and documentation, in your accounts — no licence
            traps, no dependency on us to keep operating.”
          </blockquote>
          <p className="mt-2 text-[0.8rem] font-semibold text-navy-700">
            {founder.name} — {founder.designation}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl px-4 pb-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-navy-700/15 px-5 py-4">
          <p className="text-[0.85rem] text-ink-700">
            <span className="font-semibold text-navy-700">Last updated October 2026</span> · prices in PKR · fixed in
            writing
          </p>
          <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand-700">
            <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" /> Call the studio
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export const homeConcepts = [
  { n: 1, name: "Column", note: "split hero · product card", render: ConceptColumn },
  { n: 2, name: "Ledger", note: "editorial · ivory card on navy", render: ConceptLedger },
  { n: 3, name: "Spotlight", note: "photo hero · centred type", render: ConceptSpotlight },
  { n: 4, name: "Grid", note: "dense · rule-led tables", render: ConceptGrid },
  { n: 5, name: "Showcase", note: "product-led · big frame", render: ConceptShowcase },
  { n: 6, name: "Warm", note: "soft sand · rounded cards", render: ConceptWarm },
];

export function HomeConcepts() {
  return (
    <div className="divide-y divide-white/10 bg-navy-950">
      {homeConcepts.map((concept) => (
        <Concept key={concept.n} n={concept.n} name={concept.name} note={concept.note}>
          <concept.render />
        </Concept>
      ))}
    </div>
  );
}

/** Small footer used under the concept stack, so the page ends cleanly. */
export function ConceptsFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 px-4 py-8 text-center">
      <p className="text-[0.78rem] text-slate-400">
        Internal review page · <Link href="/" className="text-brand-300 underline underline-offset-2">live home page</Link> ·{" "}
        <Link href="/sample" className="text-brand-300 underline underline-offset-2">hero concepts</Link>
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] text-slate-500">
        <ArrowRight className="h-3 w-3" aria-hidden="true" /> Tell us a number — for example “6, with the Ledger type”.
      </p>
    </footer>
  );
}
