import { renderOgCard, ogContentType, ogSize } from "@/lib/og-card";
import { fixedPackages } from "@/lib/price-ladder";

export const alt = `WordbitX — websites for Pakistani businesses from ${fixedPackages.pk.starter}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Pakistan · Prices in rupees",
    title: "A complete business website, fixed price",
    figure: fixedPackages.pk.starter,
    figureNote: `fixed package · ${fixedPackages.pk.supportMonths} months support`,
    sub: `${fixedPackages.pk.allInOne} with domain + 1 year hosting. 5–10 pages, mobile-first, 2–3 weeks.`,
  });
}
