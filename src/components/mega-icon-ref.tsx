import { Stroke, customBySlug } from "@/components/mega-custom-glyphs";
import { isDarkBrand, megaBrandBySlug } from "@/lib/mega-brand-map";

/**
 * Client-safe twin of <MegaServiceIcon /> for the navigation header.
 *
 * Same slugs, same look — but the brand logo paths are not in this module.
 * Each brand icon is a <use> pointing at a <symbol> that
 * src/components/mega-icon-sprite.tsx inlines once per page (server-rendered),
 * so the header can be a client component without dragging ~80 KB of logo
 * geometry into the shared JS bundle (audit 30 Oct 2026, P2).
 *
 * Brand colours come from the tiny slug→hex map; the sprite's paths are
 * painted with currentColor, so this component sets `style.color` instead of
 * shipping the path data.
 */

const MONOCHROME = "currentColor";

export function MegaServiceIconRef({
  slug,
  className = "h-4 w-4",
  monochrome = false,
}: {
  slug: string;
  className?: string;
  monochrome?: boolean;
}) {
  if (slug === "web-development") {
    // WordbitX W mark — the same PNG treatment as MegaServiceIcon, no brand path.
    if (monochrome) {
      return (
        <span
          aria-hidden="true"
          className={`${className} inline-block scale-125`}
          style={{
            backgroundColor: "currentColor",
            maskImage: "url(/brand/wordbitx-mark.png)",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: "url(/brand/wordbitx-mark.png)",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/wordbitx-mark.png"
        alt=""
        aria-hidden="true"
        className={`${className} scale-125 rounded-[2px] object-contain`}
      />
    );
  }

  const brand = megaBrandBySlug[slug];
  if (brand) {
    const color = monochrome || isDarkBrand(brand.hex) ? MONOCHROME : `#${brand.hex}`;
    return (
      <svg viewBox="0 0 24 24" className={className} style={{ color }} aria-hidden="true">
        <use href={`#mbrand-${slug}`} />
      </svg>
    );
  }

  const Custom = customBySlug[slug];
  if (Custom) return <Custom className={className} />;

  return (
    <Stroke className={className}>
      <circle cx="12" cy="12" r="8" />
    </Stroke>
  );
}
