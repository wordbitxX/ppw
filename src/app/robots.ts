import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Note on /societies/:
 * The /societies hub is indexable (in sitemaps/core.xml), while all 18
 * /societies/[slug] child pages carry `<meta name="robots" content="noindex, follow">`.
 * /societies/ MUST stay crawlable in robots.txt so Googlebot can fetch the child
 * pages and honour their `noindex` directive cleanly rather than flagging
 * "Indexed, though blocked by robots.txt".
 *
 * Note on /_next/data/:
 * Only internal Next.js JSON data routes (`/_next/data/`) are disallowed;
 * `/_next/static/` (CSS, JS, fonts) and `/_next/image` MUST remain crawlable
 * for Googlebot's Web Rendering Service (WRS) and Googlebot-Image.
 *
 * Per RFC 9309, a specific User-agent group overrides `User-agent: *`, so
 * `DISALLOW_COMMON` is included on every named bot group as well.
 */
const DISALLOW_COMMON = ["/api/", "/_next/data/", "/admin/", "/private/", "/lab/", "/sample"];

const AI_CRAWLERS = ["GPTBot", "ChatGPT-User", "CCBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_COMMON,
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: DISALLOW_COMMON,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap-index.xml`,
  };
}
