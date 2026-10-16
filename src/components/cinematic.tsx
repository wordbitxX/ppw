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
 */
export function LightArcs({ className = "" }: { className?: string }) {
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
      </defs>
      <path
        d="M-20 186 Q672 484 1364 186"
        pathLength={100}
        fill="none"
        stroke="url(#cine-arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="cine-glint"
      />
      <path
        d="M-20 584 Q672 284 1364 584"
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
