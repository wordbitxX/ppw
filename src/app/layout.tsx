import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DeferredWidgets } from "@/components/deferred-widgets";
import { OrganizationSchema, WebsiteSchema } from "@/components/jsonld";
import { TrackingBody, TrackingHead } from "@/components/analytics";
import { adsenseClientId } from "@/lib/adsense";
import { siteConfig } from "@/lib/site";

// Self-host the brand face. Previously the CSS only *named* Inter in
// --font-sans without ever loading it, so every visitor fell back to their
// OS font (Segoe UI / Roboto / DejaVu) and the brand typography never
// rendered. @fontsource ships the woff2 files from node_modules (no runtime
// third-party request), and --font-sans in globals.css already lists
// "Inter" first, so the whole Tailwind stack now resolves to it.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Software Development Company in Pakistan",
    template: "%s | WordbitX",
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  keywords: [
    "software development company",
    "software development company Pakistan",
    "website development company",
    "mobile app development",
    "Shopify development Pakistan",
    "SEO services Pakistan",
    "digital marketing company",
    "POS software Pakistan",
    "AI solutions",
    "WordbitX",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Software Development Company in Pakistan | WordbitX",
    description: siteConfig.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "WordbitX | Software Development Company in Pakistan",
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    ...(adsenseClientId() ? { "google-adsense-account": adsenseClientId() as string } : {}),
    "fb:page_id": siteConfig.facebookPageId,
    "dmca-site-verification": siteConfig.dmcaSiteVerification,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1128",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const adsense = adsenseClientId();
  return (
    <html lang="en">
      <head>
        {/* AdSense loader moved to <Script afterInteractive> in the body
            (16 Oct): as a native async <head> script, adsbygoogle.js could
            execute BEFORE React hydrated (especially in dev), inject its own
            managed pagead/managed/js/adsense script into <head>, and make
            hydration report a head mismatch — the "1 issue" in the dev
            overlay. afterInteractive loads it from useEffect, i.e. strictly
            after hydration, so the injection can never race. Verification is
            unaffected: the google-adsense-account meta tag above still ships
            in the first HTML. GTM/GA/FB stay native in TrackingHead below —
            audit tools need those first-HTML snippets (see analytics.tsx). */}
        <TrackingHead />
      </head>
      <body className="bg-white text-ink-900 antialiased">
        {adsense ? (
          <Script
            id="adsense-loader"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
        <TrackingBody />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {/* The PKR / USD switch lives in the header and needs no provider:
            prices are rendered on the server in both currencies and switched
            by CSS, so the client never holds price markup. */}
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <DeferredWidgets />
        <OrganizationSchema />
        <WebsiteSchema />
      </body>
    </html>
  );
}
