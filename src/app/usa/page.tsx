import type { Metadata } from "next";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { MarketLanding } from "@/components/market-landing";
import { usMarket, usPrices } from "@/lib/us-landing";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Websites for US Businesses from ${usPrices.starter} | WordbitX` },
  description:
    `Mobile-first websites for US businesses from ${usPrices.starter}: starter ${usPrices.starter}, business ${usPrices.business}, online store ${usPrices.store}. Fixed USD quotes, calls in ET/PT.`,
  keywords: [
    "website design USA",
    "website price in USA",
    "website cost in dollars",
    "small business website $150",
    "WordPress website USA",
    "Shopify store development USA",
    "custom website United States",
    "US web design agency",
    "ecommerce website USA",
  ],
  alternates: { canonical: "/usa" },
  openGraph: {
    url: "/usa",
    type: "website",
    title: `Websites for US businesses from ${usPrices.starter} | WordbitX`,
    description: `Starter website ${usPrices.starter}. Business website ${usPrices.business}. Online store ${usPrices.store}. Fixed USD quotes.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Websites for US businesses from ${usPrices.starter} | WordbitX`,
    description: `Starter ${usPrices.starter}, business site ${usPrices.business}, online store ${usPrices.store}. Fixed USD quotes.`,
  },
};

export default function UsaLandingPage() {
  const serviceOfferSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/usa")}#service`,
    name: "Website design and development for US businesses",
    serviceType: "Website design, WordPress, Shopify and custom web development",
    url: absoluteUrl("/usa"),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.usPhoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.streetAddress,
        addressLocality: siteConfig.addressLocality,
        addressRegion: siteConfig.addressRegion,
        addressCountry: siteConfig.addressCountry,
      },
    },
    areaServed: [{ "@type": "Country", name: "United States" }],
    offers: usMarket.packages.items.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.price.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      description: pkg.features.join("; "),
      url: absoluteUrl("/usa"),
      availability: "https://schema.org/InStock",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "USA", item: absoluteUrl("/usa") },
    ],
  };

  return (
    <>
      <MarketLanding market={usMarket} />
      <FaqSchema faqs={usMarket.faqs.items} />
      <JsonLd data={serviceOfferSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
