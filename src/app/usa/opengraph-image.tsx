import { renderOgCard, ogContentType, ogSize } from "@/lib/og-card";
import { usPrices } from "@/lib/us-landing";

export const alt = `WordbitX — websites for US businesses from ${usPrices.starter}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "US & international · Prices in USD",
    title: "Fixed-price websites for US businesses",
    figure: usPrices.starter,
    figureNote: "starter · 3 months support",
    sub: `Business site ${usPrices.business}. Online store ${usPrices.store}. Calls booked in ET / PT.`,
  });
}
