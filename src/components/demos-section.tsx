import { Section, SectionHeading, ButtonLink } from "@/components/ui";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites, showcaseRel } from "@/lib/demos";
import type { DemoWebsite } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import { contactHref } from "@/lib/site";
import Link from "next/link";
import { ShowcaseTabs, type ShowcaseTabItem } from "@/components/showcase-tabs";

/**
 * "See our work live" — one large preview with a project switcher.
 *
 * The section used to stack seven tall cards; it is now a single stage on an
 * ice-white field, so the home page spends one screen on it instead of three.
 * Every panel is rendered into the HTML (only the selected one is visible), so
 * every project link stays crawlable. All figures come from `demos.ts`.
 */

const flagshipHighlights = [
  "Society, phase and block level listings",
  "Map-led search with saved filters",
  "Plot / file detail pages and enquiry routing",
  "Dealer dashboard and lead inbox",
];

function DemoPanel({ demo, priority }: { demo: DemoWebsite; priority: boolean }) {
  const rel = showcaseRel(demo.url);
  const preview = demoPreview(demo);
  const isLive = demo.kind === "live";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_40px_80px_-48px_rgba(5,39,103,0.45)]">
      <a
        href={demo.url}
        target="_blank"
        rel={rel}
        aria-label={`Open ${demo.name} — ${demo.category}`}
        className="relative block overflow-hidden bg-navy-950"
      >
        <ShowcaseStage
          demo={demo}
          shot={preview.src}
          isCover={preview.isCover}
          stage={demoStageSrc(demo)}
          variant="feature"
          priority={priority}
        />
      </a>

      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
        <div>
          {isLive ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              Flagship — a product we run
            </span>
          ) : (
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-700">{demo.category}</span>
          )}
          <h3 className="mt-3 text-xl font-semibold leading-tight text-ink-900 sm:text-2xl">
            {demo.name}
            {isLive ? <span className="text-ink-500"> — a real property portal we run</span> : null}
          </h3>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-500 sm:text-base">{demo.description}</p>

          {isLive ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {flagshipHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          ) : demo.proof ? (
            <p className="mt-4 max-w-2xl border-l-2 border-arc-400/60 pl-3 text-[0.82rem] leading-relaxed text-ink-700">
              <span className="font-semibold text-ink-900">In the build: </span>
              {demo.proof}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 md:min-w-[14rem]">
          <a
            href={demo.url}
            target="_blank"
            rel={rel}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-20px_rgba(28,168,48,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {isLive ? `Visit ${demo.host}` : "View live demo"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
          <Link
            href={contactHref(demo.relatedService?.title)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-brand-400 hover:text-brand-700"
          >
            {isLive ? "Build me a property portal" : "Get a similar site"}
          </Link>
          {demo.caseStudyHref ? (
            <Link href={demo.caseStudyHref} className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-brand-400 hover:text-brand-700">
              View case study
            </Link>
          ) : null}
          {demo.dashboardUrl ? (
            <a href={demo.dashboardUrl} target="_blank" rel={showcaseRel(demo.dashboardUrl)} className="text-center text-sm font-medium text-ink-500 underline-offset-4 hover:text-brand-700 hover:underline">
              Open owner dashboard ↗
            </a>
          ) : null}
          {demo.relatedService ? (
            <Link
              href={`/services/${demo.relatedService.slug}`}
              className="text-center text-sm font-medium text-ink-500 underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
            >
              {demo.relatedService.title}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function DemosSection({ limit }: { limit?: number }) {
  const featured = demoWebsites.find((demo) => demo.kind === "live");
  const rest = demoWebsites.filter((demo) => demo !== featured);
  const demos = typeof limit === "number" ? rest.slice(0, limit) : rest;
  const ordered = featured ? [featured, ...demos] : demos;

  const items: ShowcaseTabItem[] = ordered.map((demo, index) => ({
    id: demo.id,
    name: demo.name,
    category: demo.category,
    badge: demo.kind === "live" ? "Live" : undefined,
    panel: <DemoPanel demo={demo} priority={index === 0} />,
  }));

  const footer = (
    <ButtonLink href="/products" variant="secondary" className="w-full justify-center">
      All products
    </ButtonLink>
  );

  return (
    <Section tone="muted" id="demos" className="relative isolate overflow-hidden !bg-[#f3f6fb]">
      {/* Ice-white field: two soft washes and a faint dot grid that fades out
          toward the bottom. Static CSS, no image request. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_8%_-10%,rgb(47_132_255/0.10),transparent_65%),radial-gradient(48rem_26rem_at_100%_105%,rgb(28_168_48/0.07),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(5_39_103/0.10)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <SectionHeading
        eyebrow="Our Products"
        title={
          <>
            See our work live — software we built and <span className="text-brand-600">still run</span>
          </>
        }
        description="Every project below opens a real, working website. One is a live property marketplace we own and operate; the rest are complete platforms we built to prove a capability — search, booking, checkout, dashboards. Pick one and click through."
      />

      <div className="mt-10">
        <ShowcaseTabs items={items} footer={footer} />
      </div>
    </Section>
  );
}
