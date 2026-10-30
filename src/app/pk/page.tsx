import type { Metadata } from "next";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { MarketLanding } from "@/components/market-landing";
import { pkMarket, pkPrices } from "@/lib/pk-landing";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Websites for Pakistani Businesses from ${pkPrices.basic} | WordbitX` },
  description:
    `Mobile-first websites for Pakistani shops and businesses from ${pkPrices.basic}, or ${pkPrices.allInOne} with domain and 1 year hosting. Lahore-based team.`,
  keywords: [
    "website design Pakistan",
    "website price in Pakistan",
    "web design company Lahore",
    "WordPress website Pakistan",
    "Shopify store development Pakistan",
    "custom website Pakistan",
    "website Rs 20,000",
    "ecommerce website Pakistan",
    "FBR POS software Pakistan",
    "cheap website Pakistan",
  ],
  alternates: { canonical: "/pk" },
  openGraph: {
    url: "/pk",
    type: "website",
    title: `Websites for Pakistani businesses from ${pkPrices.basic} | WordbitX`,
    description: `A complete business website from ${pkPrices.basic}. ${pkPrices.allInOne} with domain and 1 year hosting.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Websites for Pakistani businesses from ${pkPrices.basic} | WordbitX`,
    description: `Mobile-first websites for Pakistani businesses. ${pkPrices.basic}, or ${pkPrices.allInOne} with domain and 1 year hosting.`,
  },
};

export default function PakistanLandingPage() {
  const serviceOfferSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/pk")}#service`,
    name: "Website design and development for Pakistani businesses",
    serviceType: "Website design, WordPress and WooCommerce, Shopify and custom development",
    url: absoluteUrl("/pk"),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.streetAddress,
        addressLocality: siteConfig.addressLocality,
        addressRegion: siteConfig.addressRegion,
        addressCountry: siteConfig.addressCountry,
      },
    },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Karachi" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "City", name: "Faisalabad" },
      { "@type": "City", name: "Sialkot" },
      { "@type": "City", name: "Gujranwala" },
    ],
    offers: pkMarket.packages.items.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.price.replace(/[^0-9]/g, ""),
      priceCurrency: "PKR",
      description: pkg.features.join("; "),
      url: absoluteUrl("/pk"),
      availability: "https://schema.org/InStock",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pakistan", item: absoluteUrl("/pk") },
    ],
  };

  return (
    <>
      <MarketLanding market={pkMarket} />
      <FaqSchema faqs={pkMarket.faqs.items} />
      <JsonLd data={serviceOfferSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
