import type { ReactNode } from "react";

/**
 * Cinematic art layers.
 *
 * The files in /public/brand/cinematic are processed from the owner's
 * reference art (dark electric-blue arcs, flowing blue light, mesh ribbons).
 * They are served as AVIF → WebP, are a few KB each, and are decorative: they
 * never contain text (all copy is real HTML) and carry empty alt text.
 */
export type CineVariant = "arcs" | "flow" | "mesh" | "ribbon" | "robot" | "cube" | "calm";

const ART: Record<CineVariant, { base: string; width: number; height: number }> = {
  arcs: { base: "/brand/cinematic/arcs-hero", width: 1344, height: 768 },
  flow: { base: "/brand/cinematic/flow", width: 1920, height: 1080 },
  mesh: { base: "/brand/cinematic/mesh", width: 1344, height: 768 },
  ribbon: { base: "/brand/cinematic/ribbon", width: 1344, height: 768 },
  calm: { base: "/brand/cinematic/arcs-calm", width: 1344, height: 768 },
  robot: { base: "/brand/cinematic/ai-robot", width: 1344, height: 768 },
  cube: { base: "/brand/cinematic/b2b-cube", width: 1344, height: 768 },
};

export function CineImage({
  variant,
  priority = false,
  className = "",
  style,
}: {
  variant: CineVariant;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const art = ART[variant];
  return (
    <picture>
      <source type="image/avif" srcSet={`${art.base}.avif`} />
      <source type="image/webp" srcSet={`${art.base}.webp`} />
      {/* Plain <img>: pre-optimised static art; next/image would re-encode it. */}
      <img
        src={`${art.base}.webp`}
        alt=""
        width={art.width}
        height={art.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={`cine-art ${className}`}
        style={style}
      />
    </picture>
  );
}

/**
 * Atmosphere for a dark band: art + scrim. The art is capped at a low opacity
 * so it lights the section without competing with the copy on top of it.
 */
export function CineBackdrop({
  variant = "flow",
  opacity = 0.55,
  mask = "radial",
  position = "center",
  scrimLeft = false,
  children,
}: {
  variant?: CineVariant;
  opacity?: number;
  mask?: "radial" | "y" | "b" | "none";
  position?: string;
  /** Darken the left side so left-aligned copy never sits on bright art. */
  scrimLeft?: boolean;
  children?: ReactNode;
}) {
  const maskClass =
    mask === "radial" ? "cine-mask-radial" : mask === "y" ? "cine-mask-y" : mask === "b" ? "cine-mask-b" : "";
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${maskClass}`} style={{ opacity }}>
        <CineImage variant={variant} style={{ objectPosition: position }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-transparent to-midnight/80" />
      {scrimLeft ? <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/60 to-transparent" /> : null}
      {children}
    </div>
  );
}

/**
 * Two light arcs drawn to match the hero art (same 1344×768 viewBox, same
 * `slice` fit as the image's object-fit: cover), with a short glint travelling
 * along each. Pure SVG + CSS, no JS.
 *
 * The path geometry is traced from the art itself: brightness peaks were
 * sampled per column on /brand/cinematic/arcs-hero.webp (the two bands meet at
 * x≈672, y≈381 and run out to y≈197 / 569 at the edges), then run through a
 * Catmull-Rom → cubic conversion. So the glint rides the painted arc instead
 * of floating near it. `glow` adds a blurred copy of each curve underneath —
 * used where the art should breathe (see the /sample studio).
 */
const ARC_TOP =
  "M -20 197 C 16.7 207.2, 130 237.5, 200 258 C 270 278.5, 321.3 299.5, 400 320 C 478.7 340.5, 581.3 380.8, 672 381 C 762.7 381.2, 865.3 341.7, 944 321 C 1022.7 300.3, 1074 277.7, 1144 257 C 1214 236.3, 1327.3 207, 1364 197";
const ARC_BOTTOM =
  "M -20 569 C 16.7 558.8, 130 527.5, 200 508 C 270 488.5, 321.3 473.2, 400 452 C 478.7 430.8, 581.3 382.8, 672 381 C 762.7 379.2, 865.3 419.7, 944 441 C 1022.7 462.3, 1074 487.7, 1144 509 C 1214 530.3, 1327.3 559, 1364 569";

export function LightArcs({ className = "", glow = 0 }: { className?: string; glow?: number }) {
  return (
    <svg
      viewBox="0 0 1344 768"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cine-arc-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3fb4ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#d8f6ff" stopOpacity="1" />
          <stop offset="1" stopColor="#3fb4ff" stopOpacity="0" />
        </linearGradient>
        <filter id="cine-arc-soft" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {glow > 0 ? (
        <g filter="url(#cine-arc-soft)" opacity={glow} aria-hidden="true">
          <path d={ARC_TOP} fill="none" stroke="url(#cine-arc-grad)" strokeWidth="12" strokeLinecap="round" />
          <path d={ARC_BOTTOM} fill="none" stroke="url(#cine-arc-grad)" strokeWidth="12" strokeLinecap="round" />
        </g>
      ) : null}

      <path
        d={ARC_TOP}
        pathLength={100}
        fill="none"
        stroke="url(#cine-arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="cine-glint"
      />
      <path
        d={ARC_BOTTOM}
        pathLength={100}
        fill="none"
        stroke="url(#cine-arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="cine-glint cine-glint-rev"
      />
    </svg>
  );
}
