import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import { CineImage, LightArcs } from "@/components/cinematic";
import { DotSpotCanvas, DustCanvas, NetworkCanvas, StarsCanvas, StreamsCanvas, WavesCanvas } from "@/components/sample/scenes";

/* Concept studio for the home hero. Real HTML copy over decorative art;
   every motion is CSS (transform/opacity) or a visibility-gated canvas. */

function Pic({ base, className = "", style }: { base: string; className?: string; style?: CSSProperties }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img src={`${base}.webp`} alt="" width={1376} height={768} loading="lazy" decoding="async" className={`cine-art ${className}`} style={style} />
    </picture>
  );
}

function Stage({ n, name, note, children }: { n: number; name: string; note: string; children: ReactNode }) {
  const id = `s${String(n).padStart(2, "0")}`;
  return (
    <section
      id={id}
      aria-label={`Hero concept ${n}: ${name}`}
      className="relative isolate h-[36rem] scroll-mt-20 overflow-hidden bg-midnight text-white sm:h-[40rem]"
    >
      {children}
      <div className="absolute left-4 top-4 z-30 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-full border border-white/15 bg-black/55 py-1.5 pl-1.5 pr-4 text-xs backdrop-blur-sm sm:left-6 sm:top-6">
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-white px-2 font-semibold text-midnight">{String(n).padStart(2, "0")}</span>
        <span className="truncate font-semibold">{name}</span>
        <span className="hidden truncate text-slate-400 sm:inline">· {note}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-arc-300/40 to-transparent" />
    </section>
  );
}

function Copy({ align = "center", top = false }: { align?: "center" | "left"; top?: boolean }) {
  const left = align === "left";
  return (
    <div className={`container-page relative z-20 flex h-full ${top ? "items-start pt-24 sm:pt-28" : "items-center"} ${left ? "" : "justify-center"}`}>
      <div className={`max-w-3xl ${left ? "" : "text-center"}`}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-arc-300 sm:text-xs">
          Software engineering studio · Lahore, Pakistan
        </p>
        <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Software, engineered
          <br />
          <span className="text-gradient-arc">properly.</span>
        </h2>
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-xl ${left ? "" : "mx-auto"}`}>
          Websites, commerce platforms, mobile apps and the systems behind them — scoped, priced and
          delivered by one Lahore team since 2021.
        </p>
        <div className={`mt-7 flex flex-col gap-3 sm:flex-row ${left ? "" : "items-stretch justify-center sm:items-center"}`}>
          <ButtonLink href="/pk" className="btn-cine">
            Pakistan pricing
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

const vignette = (
  <div
    className="pointer-events-none absolute inset-0 z-10"
    style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,17,40,0.72) 0%, rgba(10,17,40,0.35) 55%, transparent 100%)" }}
    aria-hidden="true"
  />
);
const leftScrim = (
  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-midnight via-midnight/70 to-transparent sm:via-midnight/40" aria-hidden="true" />
);

/* 01 — the one now live on the home page */
function S01() {
  return (
    <Stage n={1} name="Calm arcs · live light" note="current home hero (low-glow art, travelling glints)">
      <div className="cine-hero-stage cine-mask-y absolute inset-0" aria-hidden="true">
        <CineImage variant="calm" />
        <LightArcs />
        <div className="opacity-60">
          <div className="cine-flare" />
        </div>
      </div>
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 02 — breathing art AND live light in one stage: the glints are drawn on the
   same curves the art itself lights up, and both ride inside the breathing
   transform, so the light never drifts off the picture. */
function S02() {
  return (
    <Stage n={2} name="Arcs · breathing glow + live light" note="art breathes, glints ride its own curves">
      <div className="cine-mask-y absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="sm-breathe absolute inset-0">
          <CineImage variant="arcs" />
          <div
            className="sm-glow absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 46% 38% at 50% 49%, rgba(127,220,255,0.42) 0%, rgba(63,180,255,0.16) 42%, transparent 72%)",
            }}
          />
          <LightArcs glow={0.5} />
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-midnight/25" aria-hidden="true" />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 03 */
function S03() {
  return (
    <Stage n={3} name="Mesh · drift & sweep" note="blue mesh ribbon, light sweeping across">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="sm-pan absolute inset-0">
          <CineImage variant="mesh" />
        </div>
        <div className="sm-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-arc-300/15 to-transparent" />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-midnight/70 via-midnight/30 to-midnight/80" aria-hidden="true" />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 04 */
function S04() {
  return (
    <Stage n={4} name="Flow · pan + dot grid" note="flowing blue light under a quiet grid">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="sm-pan absolute inset-0">
          <CineImage variant="flow" />
        </div>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(127,220,255,0.55) 1px, transparent 1.4px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 100%)",
          }}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-midnight/45" aria-hidden="true" />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 05 */
function S05() {
  return (
    <Stage n={5} name="Ribbon · scan line" note="glass ribbon with a slow scanning pulse">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="sm-breathe absolute inset-0">
          <CineImage variant="ribbon" />
        </div>
        <div
          className="sm-scan absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 72%, rgba(127,220,255,0.1) 95%, rgba(190,240,255,0.7) 99.4%, transparent 100%)" }}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-midnight/50" aria-hidden="true" />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 06 — AI */
function S06() {
  return (
    <Stage n={6} name="Robot · applied AI" note="split layout, eyes pulse, scan pass">
      <div
        className="sm-float absolute -right-[15.6rem] top-0 h-full w-[63rem] opacity-60 sm:right-0 sm:w-[70rem] sm:opacity-100"
        style={{ maskImage: "linear-gradient(to right, transparent 0, #000 28%)", WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 28%)" }}
        aria-hidden="true"
      >
        <CineImage variant="robot" />
        <span className="sm-pulse absolute h-14 w-14 rounded-full bg-[radial-gradient(closest-side,rgba(108,229,154,0.75),transparent)] mix-blend-screen" style={{ left: "63.5%", top: "36%" }} />
        <span className="sm-scan absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 85%, rgba(108,229,154,0.12) 96%, rgba(150,255,190,0.55) 99.5%, transparent 100%)" }} />
      </div>
      {leftScrim}
      <Copy align="left" />
    </Stage>
  );
}

/* 07 — B2B */
function S07() {
  return (
    <Stage n={7} name="Cube · B2B platform" note="split layout, orbiting rings, floating core">
      <div
        className="absolute -right-[4.6rem] top-0 h-full w-[63rem] opacity-60 sm:right-0 sm:w-[70rem] sm:opacity-100"
        style={{ maskImage: "linear-gradient(to right, transparent 0, #000 28%)", WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 28%)" }}
        aria-hidden="true"
      >
        <div className="sm-float absolute inset-0">
          <CineImage variant="cube" />
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
      {leftScrim}
      <Copy align="left" />
    </Stage>
  );
}

/* 08 */
function S08() {
  return (
    <Stage n={8} name="Aurora · soft navy-cyan" note="pure CSS light, no image">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="sm-aurora-a absolute -left-[10%] top-[5%] h-[34rem] w-[34rem] rounded-full bg-[rgba(47,132,255,0.55)] blur-[110px]" />
        <div className="sm-aurora-b absolute right-[-8%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[rgba(127,220,255,0.38)] blur-[110px]" />
        <div className="sm-aurora-c absolute bottom-[-18%] left-[32%] h-[26rem] w-[26rem] rounded-full bg-[rgba(28,168,48,0.32)] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 0.8px, transparent 1.2px)", backgroundSize: "26px 26px" }}
        />
      </div>
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 09 */
function S09() {
  return (
    <Stage n={9} name="Network · interactive" note="canvas dots & lines — move the mouse or touch">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#10234a_0%,#0a1128_70%)]" aria-hidden="true" />
      <NetworkCanvas />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 10 */
function S10() {
  return (
    <Stage n={10} name="Waves · hourglass lines" note="canvas lines pinching to the centre, like the reference art">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0e2147_0%,#070d1f_75%)]" aria-hidden="true" />
      <WavesCanvas />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[40rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(127,220,255,0.28),transparent)]" aria-hidden="true" />
      <Copy />
    </Stage>
  );
}

/* 11 */
function S11() {
  return (
    <Stage n={11} name="Horizon grid · moving floor" note="perspective grid sliding toward you">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a1a] via-midnight to-[#0b1a3a]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[32%] overflow-hidden [perspective:420px] [perspective-origin:50%_0%]" aria-hidden="true">
        <div
          className="sm-grid absolute -inset-x-[80%] top-0 h-[260%] origin-top [transform:rotateX(72deg)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(127,220,255,0.55) 2px, transparent 2px), linear-gradient(90deg, rgba(127,220,255,0.45) 2px, transparent 2px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1633] via-[#0a1633]/40 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[32%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_40px_6px_rgba(127,220,255,0.55)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[29%] h-40 bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(63,180,255,0.35),transparent)]" aria-hidden="true" />
      <Copy top />
    </Stage>
  );
}

/* 12 */
function S12() {
  return (
    <Stage n={12} name="Orbit system · 3D rings" note="tilted orbits with travelling nodes">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,#10264f_0%,#0a1128_65%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-30%] top-1/2 aspect-square w-[44rem] -translate-y-1/2 sm:right-[2%] [perspective:1100px]" aria-hidden="true">
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(66deg)_rotateZ(-14deg)]">
          {[
            { size: "100%", cls: "sm-spin-3", dot: "bg-white" },
            { size: "74%", cls: "sm-spin-2", dot: "bg-arc-300" },
            { size: "48%", cls: "sm-spin-1", dot: "bg-brand-400" },
          ].map((ring) => (
            <div key={ring.size} className={`${ring.cls} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-arc-300/60`} style={{ width: ring.size, height: ring.size }}>
              <span className={`absolute -top-1 left-1/2 h-2.5 w-2.5 rounded-full ${ring.dot} shadow-[0_0_14px_currentColor]`} />
              <span className={`absolute -bottom-1 left-[22%] h-1.5 w-1.5 rounded-full ${ring.dot} opacity-70`} />
            </div>
          ))}
        </div>
        <div className="sm-pulse absolute left-1/2 top-1/2 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(190,240,255,0.9),rgba(63,180,255,0.25)_55%,transparent)]" />
      </div>
      {leftScrim}
      <Copy align="left" />
    </Stage>
  );
}

/* 13 */
function S13() {
  const beams = [
    { left: "8%", w: "5rem", delay: "0s", dur: "7s", c: "rgba(63,180,255,0.95)" },
    { left: "22%", w: "9rem", delay: "-2s", dur: "9s", c: "rgba(127,220,255,0.75)" },
    { left: "38%", w: "4rem", delay: "-4s", dur: "6s", c: "rgba(63,180,255,0.9)" },
    { left: "52%", w: "11rem", delay: "-1s", dur: "10s", c: "rgba(127,220,255,0.7)" },
    { left: "68%", w: "5rem", delay: "-5s", dur: "8s", c: "rgba(47,132,255,0.95)" },
    { left: "82%", w: "8rem", delay: "-3s", dur: "11s", c: "rgba(108,229,154,0.5)" },
  ];
  return (
    <Stage n={13} name="Light beams · stage" note="soft beams pulsing out of phase">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b1c] to-[#0a1633]" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {beams.map((b) => (
          <span
            key={b.left}
            className="sm-beam absolute -top-[20%] h-[150%] origin-top rotate-[16deg] blur-2xl"
            style={{ left: b.left, width: b.w, animationDelay: b.delay, animationDuration: b.dur, background: `linear-gradient(to bottom, ${b.c}, transparent 85%)` }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight to-transparent" />
        <div className="absolute inset-x-0 bottom-[8%] h-px bg-gradient-to-r from-transparent via-arc-300/50 to-transparent" />
      </div>
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 14 */
function S14() {
  return (
    <Stage n={14} name="Data streams · falling light" note="canvas streaks, a few in brand green">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] to-[#0a1531]" aria-hidden="true" />
      <StreamsCanvas />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 15 */
function S15() {
  return (
    <Stage n={15} name="Spotlight dot grid · interactive" note="a light roams the grid; follows mouse or touch">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0e1d40_0%,#080e22_80%)]" aria-hidden="true" />
      <DotSpotCanvas />
      <Copy />
    </Stage>
  );
}

/* 16 */
function S16() {
  return (
    <Stage n={16} name="Radar ripples · pulse" note="rings expanding from a core, text on the left">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_50%,#0f2349_0%,#0a1128_65%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[74%] top-1/2 max-sm:left-[70%]">
          {[0, -1.5, -3, -4.5, -6].map((d) => (
            <span
              key={d}
              className="sm-ripple absolute left-0 top-0 h-[52rem] w-[52rem] rounded-full border-2 border-arc-300/60"
              style={{ animationDelay: `${d}s`, transform: "translate(-50%, -50%) scale(0.5)", opacity: 0.35 }}
            />
          ))}
          <span className="sm-pulse absolute left-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(closest-side,#fff,rgba(127,220,255,0.55)_45%,transparent)]" />
        </div>
      </div>
      {leftScrim}
      <Copy align="left" />
    </Stage>
  );
}

/* 17 — AI image + stars */
function S17() {
  return (
    <Stage n={17} name="Planet limb · stars" note="generated art, twinkling star field">
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        <div className="sm-drift-y absolute inset-0">
          <Pic base="/brand/samples/planet" style={{ objectPosition: "50% 100%" }} />
        </div>
      </div>
      <StarsCanvas area={0.62} />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-midnight/50 via-transparent to-transparent" aria-hidden="true" />
      <Copy top />
    </Stage>
  );
}

/* 18 — AI image */
function S18() {
  return (
    <Stage n={18} name="Glass facets · light edges" note="generated art, slow drift and a passing glint">
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        <div className="sm-pan absolute inset-0">
          <Pic base="/brand/samples/facets" />
        </div>
        <div className="sm-sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      {leftScrim}
      <Copy align="left" />
    </Stage>
  );
}

/* 19 — AI image + dust */
function S19() {
  return (
    <Stage n={19} name="Volumetric beams · haze" note="generated art, drifting dust particles">
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        <div className="sm-drift-y absolute inset-0">
          <Pic base="/brand/samples/beams" />
        </div>
      </div>
      <DustCanvas />
      <div className="absolute inset-0 z-10 bg-midnight/30" aria-hidden="true" />
      {vignette}
      <Copy />
    </Stage>
  );
}

/* 20 — combo */
function S20() {
  return (
    <Stage n={20} name="Calm arcs + network · combo" note="the current art with an interactive node layer on top">
      <div className="cine-hero-stage cine-mask-y absolute inset-0" aria-hidden="true">
        <CineImage variant="calm" />
        <LightArcs />
      </div>
      <NetworkCanvas density={16000} />
      {vignette}
      <Copy />
    </Stage>
  );
}

export const heroConcepts = [
  { n: 1, name: "Calm arcs", kind: "image + light" },
  { n: 2, name: "Arcs breathing + light", kind: "image" },
  { n: 3, name: "Mesh drift", kind: "image" },
  { n: 4, name: "Flow + grid", kind: "image" },
  { n: 5, name: "Ribbon scan", kind: "image" },
  { n: 6, name: "Robot AI", kind: "split" },
  { n: 7, name: "Cube B2B", kind: "split" },
  { n: 8, name: "Aurora", kind: "CSS" },
  { n: 9, name: "Network", kind: "canvas" },
  { n: 10, name: "Waves", kind: "canvas" },
  { n: 11, name: "Horizon grid", kind: "CSS" },
  { n: 12, name: "Orbit system", kind: "CSS" },
  { n: 13, name: "Light beams", kind: "CSS" },
  { n: 14, name: "Data streams", kind: "canvas" },
  { n: 15, name: "Spotlight grid", kind: "canvas" },
  { n: 16, name: "Radar ripples", kind: "CSS" },
  { n: 17, name: "Planet limb", kind: "AI image" },
  { n: 18, name: "Glass facets", kind: "AI image" },
  { n: 19, name: "Volumetric beams", kind: "AI image" },
  { n: 20, name: "Arcs + network", kind: "combo" },
];

export function HeroConcepts() {
  return (
    <>
      <S01 /><S02 /><S03 /><S04 /><S05 /><S06 /><S07 /><S08 /><S09 /><S10 />
      <S11 /><S12 /><S13 /><S14 /><S15 /><S16 /><S17 /><S18 /><S19 /><S20 />
    </>
  );
}
