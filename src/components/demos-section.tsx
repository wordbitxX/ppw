import { Section, SectionHeading, ButtonLink } from "@/components/ui";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { ShowcaseStage } from "@/components/showcase-stage";
import { demoWebsites, showcaseRel } from "@/lib/demos";
import type { DemoWebsite } from "@/lib/demos";
import { demoPreview, demoStageSrc } from "@/lib/demo-shots";
import { contactHref } from "@/lib/site";
import Link from "next/link";

/**
 * "See our work live" — a bento grid on a light, ice-white field.
 *
 * One dark flagship tile (the property portal we actually run) anchors the
 * grid; the demo sites sit around it in tiles of two sizes. The dark tile is
 * the only dark surface in the section, so it reads as the hero of the grid
 * without any decoration. Every figure shown comes from `demos.ts`.
 */

type Size = "sm" | "md" | "wide";

const sizeClass: Record<Size, string> = {
  sm: "lg:col-span-2",
  md: "lg:col-span-3",
  wide: "sm:col-span-2 lg:col-span-6",
};

const tileShell =
  "group animate-reveal relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_22px_44px_-30px_rgba(5,39,103,0.28)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-arc-400/50 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_34px_60px_-30px_rgba(47,132,255,0.38)]";

function BentoTile({
  demo,
  size,
  index,
  priority,
}: {
  demo: DemoWebsite;
  size: Size;
  index: number;
  priority: boolean;
}) {
  const rel = showcaseRel(demo.url);
  const preview = demoPreview(demo);
  const roomy = size !== "sm";

  return (
    <article
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
      className={`${tileShell} ${sizeClass[size]}`}
    >
      <a
        href={demo.url}
        target="_blank"
        rel={rel}
        aria-label={`Open ${demo.name} — ${demo.category}`}
        className={`block ${roomy ? "[&_.showcase-stage]:!aspect-[2/1]" : ""}`}
      >
        <ShowcaseStage
          demo={demo}
          shot={preview.src}
          isCover={preview.isCover}
          stage={demoStageSrc(demo)}
          priority={priority}
        />
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Cover mode already prints the name over the picture. */}
        {preview.isCover ? null : (
          <>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-700">{demo.category}</span>
            <h3 className="mt-1 text-lg font-semibold leading-tight text-ink-900">{demo.name}</h3>
          </>
        )}

        <p className={`mt-2.5 text-sm leading-relaxed text-ink-500 ${roomy ? "line-clamp-3" : "line-clamp-2"}`}>
          {demo.description}
        </p>

        {roomy && demo.proof ? (
          <p className="mt-3 line-clamp-2 border-l-2 border-arc-400/60 pl-3 text-[0.78rem] leading-relaxed text-ink-700">
            <span className="font-semibold text-ink-900">In the build: </span>
            {demo.proof}
          </p>
        ) : null}

        <span className="flex-1" />

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={demo.url}
            target="_blank"
            rel={rel}
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {demo.kind === "live" ? "Visit live site" : "View live demo"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
          <Link
            href={contactHref(demo.relatedService?.title)}
            className="text-sm font-semibold text-navy-800 underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
          >
            Get a similar site
          </Link>
          {roomy && demo.relatedService ? (
            <Link
              href={`/services/${demo.relatedService.slug}`}
              className="text-sm font-medium text-ink-500 underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
            >
              {demo.relatedService.title}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** The flagship: the one dark tile, spanning two rows on desktop. */
function FlagshipTile({ demo }: { demo: DemoWebsite }) {
  const rel = showcaseRel(demo.url);
  const preview = demoPreview(demo);
  const highlights = [
    "Society, phase and block level listings",
    "Map-led search with saved filters",
    "Plot / file detail pages and enquiry routing",
    "Dealer dashboard and lead inbox",
  ];

  return (
    <article className="group animate-reveal cine-surface cine-rim relative flex flex-col overflow-hidden rounded-3xl border border-arc-300/15 text-white shadow-[0_50px_100px_-50px_rgba(5,17,48,0.75)] sm:col-span-2 lg:col-span-4 lg:row-span-2">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-arc-500/25 blur-[120px]"
      />
      <a
        href={demo.url}
        target="_blank"
        rel={rel}
        aria-label={`Open ${demo.name}`}
        className="relative block overflow-hidden border-b border-white/10"
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

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-400/40 bg-brand-400/10 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
          </span>
          Flagship live product
        </span>
        <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
          {demo.name} — <span className="text-gradient-arc">a real property portal we run</span>
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{demo.description}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              {item}
            </li>
          ))}
        </ul>

        <span className="flex-1" />

        <div className="mt-7 flex flex-wrap items-center gap-3">
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
              className="px-2 py-3 text-sm font-semibold text-arc-300 underline-offset-4 hover:underline"
            >
              {demo.relatedService.title}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Two small tiles sit beside the flagship; the rest are medium, and a lone
 *  last tile stretches so the grid never ends on a hole. */
function sizeFor(index: number, count: number): Size {
  if (index < 2) return "sm";
  const remaining = count - 2;
  return remaining % 2 === 1 && index === count - 1 ? "wide" : "md";
}

export function DemosSection({ limit }: { limit?: number }) {
  const featured = demoWebsites.find((demo) => demo.kind === "live");
  const rest = demoWebsites.filter((demo) => demo !== featured);
  const demos = typeof limit === "number" ? rest.slice(0, limit) : rest;
  const total = demoWebsites.length;

  return (
    <Section tone="muted" id="demos" className="relative isolate overflow-hidden !bg-[#f3f6fb]">
      {/* Ice-white field: two soft washes and a faint dot grid that fades out
          toward the bottom. Static CSS, no image request. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_8%_-10%,rgb(47_132_255/0.10),transparent_65%),radial-gradient(48rem_26rem_at_100%_105%,rgb(28_168_48/0.07),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(5_39_103/0.10)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Our Products"
          title={
            <>
              See our work live — software we built and <span className="text-brand-600">still run</span>
            </>
          }
          description="Every card below opens a real, working website. One is a live property marketplace we own and operate; the rest are complete platforms we built to prove a capability — search, booking, checkout, dashboards. Click through and use them."
        />
        <ButtonLink href="/products" variant="secondary" className="self-start lg:self-auto">
          All products
        </ButtonLink>
      </div>

      {/* Facts only — the count is derived; the other two describe the cards. */}
      <ul className="mt-8 flex flex-wrap gap-2.5 text-xs font-medium text-ink-700">
        {[`${total} live sites to open`, "Real, working websites — not mock-ups", "Designed, built and maintained by WordbitX"].map(
          (item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {item}
            </li>
          ),
        )}
      </ul>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {featured ? <FlagshipTile demo={featured} /> : null}
        {demos.map((demo, index) => (
          <BentoTile
            key={demo.id}
            demo={demo}
            size={featured ? sizeFor(index, demos.length) : "md"}
            index={index}
            priority={index < 3}
          />
        ))}
      </div>

      {typeof limit === "number" && rest.length > limit ? (
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/products" variant="secondary">
            See all products
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}
