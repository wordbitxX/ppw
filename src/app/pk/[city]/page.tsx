import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PkCityView } from "@/components/pk/pk-city-page";
import { getPkCityPage, pkCityPages } from "@/lib/pk-cities";
import { pkMetaTitle } from "@/lib/pk";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return pkCityPages.map((page) => ({ city: page.slug }));
}

export const dynamicParams = false;

type PageProps = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const page = getPkCityPage(city);
  if (!page) return { title: "Page not found" };

  const title = pkMetaTitle(page.name);

  return {
    title: { absolute: title },
    description: page.metaDescription,
    alternates: { canonical: `/pk/${page.slug}` },
    keywords: [
      `website design ${page.name}`,
      `web design company ${page.name}`,
      `website cost ${page.name}`,
      `website development ${page.name}`,
      `${page.name} web designer`,
    ],
    openGraph: {
      type: "website",
      url: `/pk/${page.slug}`,
      title,
      description: page.metaDescription,
      locale: "en_PK",
      siteName: siteConfig.name,
    },
    twitter: { card: "summary_large_image", title, description: page.metaDescription },
  };
}

export default async function PkCityRoute({ params }: PageProps) {
  const { city } = await params;
  const page = getPkCityPage(city);
  if (!page) notFound();

  return <PkCityView page={page} />;
}
