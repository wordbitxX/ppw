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
 * It exists because several of these icons carry their own brand colour and
 * two of them are green — the WordbitX W mark is #34B02A and Shopify is
 * #7AB55C — so on any emerald surface (a brand-500 badge, the hive tile under
 * the cursor) they were green on green and simply disappeared. The W is a PNG
 * with a clean alpha channel, so in monochrome mode it is drawn as a CSS mask
 * filled with currentColor instead of as an <img>; that makes it behave
 * exactly like the SVG icons beside it in both the resting and hover state.
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
  if (slug === "web-development") {
    // WordbitX W mark — brand identity for Website Development
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
        alt="WordbitX"
        aria-hidden="true"
        className={`${className} scale-125 rounded-[2px] object-contain`}
      />
    );
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
