import { Section, SectionHeading, ButtonLink } from "@/components/ui";
import { CineBackdrop } from "@/components/cinematic";
import { ArrowRight, ServiceIcon, CheckIcon } from "@/components/icons";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites, showcaseRel } from "@/lib/demos";
import type { DemoWebsite } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import { contactHref } from "@/lib/site";
import Link from "next/link";

function ShowcaseCard({ demo, priority, index = 0 }: { demo: DemoWebsite; priority: boolean; index?: number }) {
  const rel = showcaseRel(demo.url);
  const preview = demoPreview(demo);

  return (
    <article
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
      className="group animate-reveal cine-panel [background:linear-gradient(180deg,rgb(12_24_52/0.94),rgb(6_12_30/0.96))] flex h-full flex-col overflow-hidden rounded-2xl transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-arc-300/40 hover:shadow-[0_34px_70px_-40px_rgba(47,132,255,0.55)]"
    >
      <a href={demo.url} target="_blank" rel={rel} aria-label={`Open ${demo.name} — ${demo.category}`}>
        <ShowcaseStage
          demo={demo}
          shot={preview.src}
          isCover={preview.isCover}
          stage={demoStageSrc(demo)}
          priority={priority}
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-arc-400/10 text-arc-300 ring-1 ring-arc-300/20">
            <ServiceIcon name="web" className="h-4 w-4" />
          </span>
          <span>
            <h3 className="text-base font-semibold leading-tight text-white">{demo.name}</h3>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-arc-300/80">{demo.category}</span>
          </span>
        </span>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{demo.description}</p>

        {/* The one checkable fact about the build. A buyer skimming nine cards
            reads these before they read any prose — counts are what make
            "we built this" land as engineering rather than marketing. */}
        {demo.proof ? (
          <p className="mt-3 flex-1 rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-[0.78rem] leading-relaxed text-slate-300 ring-1 ring-white/10">
            <span className="font-semibold text-white">In the build: </span>
            {demo.proof}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={demo.url}
            target="_blank"
            rel={rel}
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4.5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {demo.kind === "live" ? "Visit live site" : "View live demo"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
          <Link
            href={contactHref(demo.relatedService?.title)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4.5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-arc-300/60 hover:bg-white/[0.08]"
          >
            Get a similar site
          </Link>
          {demo.relatedService ? (
            <Link
              href={`/services/${demo.relatedService.slug}`}
              className="inline-flex items-center gap-2 rounded-xl px-2.5 py-2.5 text-sm font-semibold text-arc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {demo.relatedService.title}
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-[0.68rem] leading-relaxed text-slate-500">
          {demo.kind === "live"
            ? "Live product designed, built and maintained by WordbitX."
            : "Live demo designed and developed by WordbitX."}
        </p>
      </div>
    </article>
  );
}

/** Wide hero treatment for the flagship live product. */
function FeaturedShowcase({ demo }: { demo: DemoWebsite }) {
  const rel = showcaseRel(demo.url);
  const preview = demoPreview(demo);
  const highlights = [
    "Society, phase and block level listings",
    "Map-led search with saved filters",
    "Plot / file detail pages and enquiry routing",
    "Dealer dashboard and lead inbox",
  ];

  return (
    <article className="group animate-reveal relative overflow-hidden cine-surface cine-rim rounded-3xl border border-arc-300/15 text-white shadow-[0_60px_120px_-60px_rgba(47,132,255,0.5)]">
      <span aria-hidden="true" className="absolute inset-0 grid-pattern opacity-25" />
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-arc-500/25 blur-[130px]"
      />
      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:p-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-400/10 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            Flagship live product
          </span>
          <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl">
            {demo.name} — <span className="text-gradient-arc">a real property portal we run</span>
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{demo.description}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={demo.url}
              target="_blank"
              rel={rel}
              className="group/btn inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(28,168,48,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Visit {demo.host}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
            <Link
              href={contactHref(demo.relatedService?.title)}
              className="inline-flex items-center gap-2 rounded-xl border border-arc-300/25 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-arc-300/60 hover:bg-white/[0.09]"
            >
              Build me a property portal
            </Link>
            {demo.relatedService ? (
              <Link
                href={`/services/${demo.relatedService.slug}`}
                className="inline-flex items-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold text-arc-300 underline-offset-4 hover:underline"
              >
                {demo.relatedService.title}
              </Link>
            ) : null}
          </div>
        </div>

        <a
          href={demo.url}
          target="_blank"
          rel={rel}
          aria-label={`Open ${demo.name}`}
          className="block overflow-hidden rounded-2xl border border-arc-300/15 bg-navy-900 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_90px_-40px_rgba(0,0,0,0.95),0_0_80px_-30px_rgba(47,132,255,0.45)] transition-transform duration-500 hover:-translate-y-1"
        >
          <ShowcaseStage
            demo={demo}
            shot={preview.src}
            isCover={preview.isCover}
            stage={demoStageSrc(demo)}
            variant="feature"
            priority
          />
        </a>
      </div>
    </article>
  );
}

export function DemosSection({ limit }: { limit?: number }) {
  const featured = demoWebsites.find((demo) => demo.kind === "live");
  const rest = demoWebsites.filter((demo) => demo !== featured);
  const demos = typeof limit === "number" ? rest.slice(0, limit) : rest;
  const total = demoWebsites.length;

  return (
    <Section tone="dark" id="demos" className="overflow-hidden">
      <CineBackdrop variant="ribbon" opacity={0.3} position="60% 40%" mask="radial" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          tone="dark"
          eyebrow="Our Products"
          title={
            <>
              See our work live — software we built and <span className="text-gradient-arc">still run</span>
            </>
          }
          description="Every card below opens a real, working website. One is a live property marketplace we own and operate; the rest are complete platforms we built to prove a capability — search, booking, checkout, dashboards. Click through and use them."
        />
        <ButtonLink href="/products" variant="ghost" className="self-start lg:self-auto">
          All products
        </ButtonLink>
      </div>

      {/* Facts only — every item is derived from data on the page or is a
          plain description of how the cards behave. */}
      <ul className="mt-8 flex flex-wrap gap-2.5 text-xs font-medium text-slate-300">
        {[`${total} live sites to open`, "Real, working websites — not mock-ups", "Designed, built and maintained by WordbitX"].map((item) => (
          <li key={item} className="cine-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {item}
          </li>
        ))}
      </ul>

      {featured ? (
        <div className="mt-10">
          <FeaturedShowcase demo={featured} />
        </div>
      ) : null}

      <div className="mt-14 flex items-center gap-4">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-arc-300">More live platforms</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-arc-300/40 to-transparent" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <ShowcaseCard key={demo.id} demo={demo} index={index} priority={index < 3} />
        ))}
      </div>

      {typeof limit === "number" && rest.length > limit ? (
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/products" variant="ghost">
            See all products
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}
