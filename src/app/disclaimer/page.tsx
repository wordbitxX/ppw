import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";
import { seoTitleAbsolute, seoTitle } from "@/lib/seo-title";
import { socialMetadata } from "@/lib/social-meta";

const doc = legalDocs.disclaimer;

export const metadata: Metadata = {
  title: seoTitleAbsolute(doc.metaTitle),
  description: doc.metaDescription,
  alternates: { canonical: "/disclaimer" },
  ...socialMetadata({ url: "/disclaimer", title: seoTitle(doc.metaTitle), description: doc.metaDescription }),
};

export default function DisclaimerPage() {
  return <LegalPage doc={doc} />;
}
