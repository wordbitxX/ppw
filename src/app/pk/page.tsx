import type { Metadata } from "next";
import { PkPageView } from "@/components/pk/pk-page";
import { pkMetaDescription, pkMetaTitle, pkPricing } from "@/lib/pk";

const title = pkMetaTitle();

export const metadata: Metadata = {
  // Absolute, because pkMetaTitle() already carries the brand once and the root
  // layout template would otherwise add "| WordbitX" a second time.
  title: { absolute: title },
  description: pkMetaDescription,
  alternates: { canonical: "/pk" },
  keywords: [
    "website design Pakistan",
    "website cost in Pakistan",
    "web design company Lahore",
    "website packages PKR",
    "ecommerce website Pakistan",
    "software company Pakistan",
  ],
  openGraph: {
    type: "website",
    url: "/pk",
    title,
    description: pkMetaDescription,
    locale: "en_PK",
    siteName: "WordbitX",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: pkMetaDescription,
  },
  other: {
    // A clear machine-readable signal of the page's price position. Only
    // emitted when the owner has actually supplied a number.
    ...(pkPricing.businessWebsite != null
      ? { "product:price:amount": String(pkPricing.businessWebsite), "product:price:currency": "PKR" }
      : {}),
  },
};

export default function PakistanPricesPage() {
  return <PkPageView />;
}
