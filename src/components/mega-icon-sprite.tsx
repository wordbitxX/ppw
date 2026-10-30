import { brandIconData } from "@/lib/brand-icon-data";
import { megaBrandBySlug } from "@/lib/mega-brand-map";

/**
 * One <symbol> per brand logo used by the navigation, inlined into the page a
 * single time. The client header then draws each icon with a <use> reference
 * (see mega-icon-ref.tsx).
 *
 * Rendered from the root layout, so it costs one hidden SVG per page instead of
 * an 80 KB module in the JS bundle that every page used to download and parse.
 * Audit 30 Oct 2026 (P2).
 */
export function MegaIconSprite() {
  const icons = Object.entries(megaBrandBySlug)
    .map(([slug, brand]) => ({ slug, icon: brandIconData[brand.key] }))
    .filter((entry): entry is { slug: string; icon: NonNullable<typeof entry.icon> } => Boolean(entry.icon));

  if (icons.length === 0) return null;

  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute h-0 w-0 overflow-hidden">
      {icons.map(({ slug, icon }) => (
        <symbol key={slug} id={`mbrand-${slug}`} viewBox="0 0 24 24">
          <path d={icon.path} fill="currentColor" />
        </symbol>
      ))}
    </svg>
  );
}
