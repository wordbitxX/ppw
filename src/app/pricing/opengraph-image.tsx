import { renderOgCard, ogContentType, ogSize } from "@/lib/og-card";
import { fixedPackages, priceTiers } from "@/lib/price-ladder";

export const alt = "WordbitX — how software and website prices work";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Pricing · PKR and USD",
    title: "Fixed packages, then a written quote",
    figure: `${fixedPackages.pk.starter} / ${fixedPackages.us.starter}`,
    figureNote: "Pakistan / US entry price",
    sub: `Custom builds ${priceTiers.custom.pkrLabel} (${priceTiers.custom.usdLabel}). Apps and ERP from ${priceTiers.app.pkrLabel}.`,
  });
}
