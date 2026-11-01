import { MobilePlatformIcons } from "@/components/mobile-platform-icons";
import { Stroke, customBySlug } from "@/components/mega-custom-glyphs";
import { brandIconData, type SimpleIconData } from "@/lib/brand-icon-data";
import { isDarkBrand, megaBrandBySlug } from "@/lib/mega-brand-map";

/**
 * Only the brand glyphs this component maps are bundled — see
 * src/lib/brand-icon-data.ts for why. The slug → glyph map lives in
 * src/lib/mega-brand-map.ts (and is duplicated as <symbol> ids in the page
 * sprite); hand-drawn glyphs live in mega-custom-glyphs.tsx.
 *
 * IMPORTANT: this module imports ~80 KB of path data. Client components must
 * use <MegaServiceIconRef /> from mega-icon-ref.tsx instead, or the paths land
 * in the shared JS bundle (that was the P2 bundle finding of 30 Oct 2026).
 */
const iconRegistry: Record<string, SimpleIconData | undefined> = brandIconData;

/**
 * `monochrome` makes every icon render in `currentColor`, whatever it is.
 *
 * This keeps brand glyphs visible on coloured badges and hover surfaces.
 */
export function MegaServiceIcon({
  slug,
  className = "h-4 w-4",
  monochrome = false,
}: {
  slug: string;
  className?: string;
  monochrome?: boolean;
}) {
  if (slug === "mobile-app-development") {
    return <MobilePlatformIcons className={className} monochrome={monochrome} />;
  }


  const brandKey = megaBrandBySlug[slug]?.key;
  const brand = brandKey ? iconRegistry[brandKey] : undefined;
  if (brand) {
    const color = monochrome || isDarkBrand(brand.hex) ? "currentColor" : `#${brand.hex}`;
    return (
      <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden="true">
        <path d={brand.path} />
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
