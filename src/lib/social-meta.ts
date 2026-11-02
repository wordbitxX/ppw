import type { Metadata } from "next";
import { siteConfig } from "./site";

const DEFAULT_OG_IMAGE = "/opengraph-image";
const DEFAULT_OG_ALT = "WordbitX — Software, Web, Mobile App & AI Development Company";

type SocialMetaOptions = {
  url: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/**
 * Builds complete OpenGraph + Twitter card metadata so child routes never lose
 * `og:image`, `og:site_name`, `og:locale`, or inherit the homepage's `og:url`
 * and `twitter:title` / `twitter:description` when Next.js shallow-merges
 * route metadata over the root layout.
 */
export function socialMetadata({
  url,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SocialMetaOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const imageEntry = image.endsWith("/opengraph-image")
    ? { url: image, width: 1200, height: 630, alt: imageAlt }
    : { url: image, alt: imageAlt };

  return {
    openGraph: {
      type,
      locale: "en_US",
      siteName: siteConfig.name,
      url,
      title,
      description,
      images: [imageEntry],
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors ? { authors } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [image],
    },
  };
}
