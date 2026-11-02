import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { adsenseClientId } from "@/lib/adsense";
import { getSitemapGroups, publishedSitemapIndexItems } from "@/lib/sitemap-data";

export function GET() {
  const adsenseConfigured = Boolean(adsenseClientId());
  const groups = getSitemapGroups();
  const published = publishedSitemapIndexItems();
  const counts = Object.fromEntries(published.map((item) => [item.key, groups[item.key].length]));
  const totalIndexableUrls = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return NextResponse.json({
    site: siteConfig.url,
    sitemapIndex: `${siteConfig.url}/sitemap-index.xml`,
    flatSitemap: `${siteConfig.url}/sitemap.xml`,
    childSitemaps: published.map((item) => `${siteConfig.url}${item.path}`),
    counts,
    totalIndexableUrls,
    robotsTxt: `${siteConfig.url}/robots.txt`,
    llmsTxt: `${siteConfig.url}/llms.txt`,
    adsTxt: `${siteConfig.url}/ads.txt`,
    adsenseConfigured,
    googleSiteVerificationConfigured: Boolean(process.env.GOOGLE_SITE_VERIFICATION),
  });
}
