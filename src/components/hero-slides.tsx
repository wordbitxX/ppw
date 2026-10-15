import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui";
import { CineImage } from "@/components/cinematic";
import { contactHref } from "@/lib/site";

/* Hero slides 2 and 3. Same animation vocabulary as the first slide (float,
   pulse, orbit, scan), real HTML copy, decorative art. Copy mirrors the
   service pages they link to. */

const bleedTop = "-top-28 sm:-top-36 lg:-top-44";
const fadeY: CSSProperties = {
  maskImage: "linear-gradient(to bottom, transparent 0, #000 16%, #000 68%, transparent 95%)",
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 16%, #000 68%, transparent 95%)",
};
const featherLeft: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent 0, #000 30%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 30%)",
};
const artImg: CSSProperties = { position: "relative", width: "auto", height: "100%", maxWidth: "none", display: "block" };
/* The cube illustration sits in the lower half of its own canvas, so render it
   taller than the art box: the extra height stays anchored to the bottom and
   lifts the cube up behind the header instead of leaving a black gap above. */
const artImgCube: CSSProperties = { ...artImg, height: "114%" };

function SlideCopy({ eyebrow, title, text, primary, secondary }: { eyebrow: string; title: string; text: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <div className="container-page relative z-10 flex h-full items-center pb-24 pt-8 sm:pb-32">
      <div className="max-w-xl lg:ml-12 lg:max-w-2xl">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-arc-300 sm:text-xs">{eyebrow}</p>
        <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-100 sm:text-xl">{text}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={primary.href} className="btn-cine">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary?.href ?? "/contact"} variant="ghost">
            {secondary?.label ?? "Discuss Your Project"}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

const scrim = (
  <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-midnight via-midnight/70 to-transparent sm:via-midnight/35" aria-hidden="true" />
);

export function HeroSlideAi() {
  return (
    <div className="relative h-full min-h-[34rem] sm:min-h-[36rem]">
      <div
        className={`pointer-events-none absolute bottom-0 right-0 ${bleedTop} translate-x-[27%] opacity-60 sm:translate-x-[10%] sm:opacity-100 lg:translate-x-[6%]`}
        style={fadeY}
        aria-hidden="true"
      >
        <div className="h-full" style={featherLeft}>
        <div className="sm-float relative h-full">
          <CineImage variant="robot" style={artImg} />
          <span className="sm-pulse absolute h-14 w-14 rounded-full bg-[radial-gradient(closest-side,rgba(108,229,154,0.75),transparent)] mix-blend-screen" style={{ left: "63.5%", top: "36%" }} />
          <span
            className="sm-scan absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 85%, rgba(108,229,154,0.12) 96%, rgba(150,255,190,0.55) 99.5%, transparent 100%)" }}
          />
        </div>
        </div>
      </div>
      {scrim}
      <SlideCopy
        eyebrow="Artificial intelligence · for business"
        title="AI That Removes Repetitive Work"
        text="Assistants, document intelligence, predictive analytics and workflow automation — built into the tools your team already uses."
        primary={{ label: "Explore AI Solutions", href: "/services/ai-solutions" }}
        secondary={{ label: "Discuss Your Project", href: contactHref("AI Solutions") }}
      />
    </div>
  );
}

export function HeroSlideB2b() {
  return (
    <div className="relative h-full min-h-[34rem] sm:min-h-[36rem]">
      <div
        className={`pointer-events-none absolute bottom-0 right-0 ${bleedTop} translate-x-[17%] opacity-60 sm:translate-x-[6%] sm:opacity-100 lg:translate-x-[3%]`}
        style={fadeY}
        aria-hidden="true"
      >
        <div className="relative h-full" style={featherLeft}>
          <div className="sm-float relative h-full">
            <CineImage variant="cube" style={artImgCube} />
          </div>
          <div className="absolute" style={{ left: "72.7%", top: "49%" }}>
            <div className="sm-spin-1 absolute -left-36 -top-36 h-72 w-72 rounded-full border border-arc-300/30 [border-style:dashed]" />
            <div className="sm-spin-2 absolute -left-52 -top-52 h-[26rem] w-[26rem] rounded-full border border-arc-300/20">
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-arc-300 shadow-[0_0_12px_#7fdcff]" />
            </div>
            <div className="sm-spin-1 absolute -left-36 -top-36 h-72 w-72 rounded-full">
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#fff]" />
            </div>
          </div>
        </div>
      </div>
      {scrim}
      <SlideCopy
        eyebrow="B2B platforms"
        title="Business Software Built for Your Operations"
        text="Enterprise platforms, CRM & ERP, APIs and SaaS — with roles, audit trails and integrations for companies with multiple teams and systems."
        primary={{ label: "Explore B2B Services", href: "/services#b2b" }}
        secondary={{ label: "Discuss Your Project", href: contactHref("Enterprise Software Solutions") }}
      />
    </div>
  );
}
