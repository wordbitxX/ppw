import { getShowcase } from "@/lib/demos";
import { showcaseRel } from "@/lib/demos";

/**
 * Live demo links shown on industry cards and industry pages.
 *
 * Only six industries actually have a working demo site we can open. The other
 * nine (retail, pharmacy, logistics, finance, manufacturing, legal, fitness,
 * construction, travel) have none — their cards keep the normal "Explore" link
 * to the industry page and nothing else. Do not point an industry at a demo
 * that belongs to a different sector (e.g. the MOTOR automotive marketplace is
 * not a Travel & Tourism demo).
 *
 * URLs are resolved from `demos.ts` so a demo host only ever changes in one
 * place (the salon booking system moved from a vercel.app URL to
 * salon.wordbitx.pk that way).
 */

type DemoRef = {
  /** id in `demoWebsites` — the single source of truth for the URL + host. */
  id: string;
  /** Chip label on the industry card. */
  label: string;
};

const industryDemoRefs: Record<string, DemoRef[]> = {
  "real-estate": [{ id: "properties-pak", label: "View live demo" }],
  healthcare: [{ id: "healthcare", label: "View live demo" }],
  education: [{ id: "education", label: "View live demo" }],
  ecommerce: [{ id: "ecommerce", label: "View live demo" }],
  hospitality: [{ id: "luxury-restaurant", label: "View live demo" }],
  "salon-beauty": [
    { id: "salon-beauty", label: "View live demo" },
    { id: "salon-booking-system", label: "Booking system demo" },
  ],
};

export type IndustryDemoLink = {
  id: string;
  url: string;
  host: string;
  label: string;
  rel: string;
};

/** Live demos for an industry, or an empty array when the sector has none. */
export function industryDemoLinks(slug: string): IndustryDemoLink[] {
  return (industryDemoRefs[slug] ?? []).flatMap((ref) => {
    const demo = getShowcase(ref.id);
    if (!demo) return [];
    return [{ id: ref.id, url: demo.url, host: demo.host, label: ref.label, rel: showcaseRel(demo.url) }];
  });
}

/** Slugs that carry at least one live demo. */
export const industriesWithDemos = Object.keys(industryDemoRefs);
