import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";
import { seoTitleAbsolute, seoTitle } from "@/lib/seo-title";
import { socialMetadata } from "@/lib/social-meta";

const doc = legalDocs["terms-conditions"];

export const metadata: Metadata = {
  title: seoTitleAbsolute(doc.metaTitle),
  description: doc.metaDescription,
  alternates: { canonical: "/terms-conditions" },
  ...socialMetadata({ url: "/terms-conditions", title: seoTitle(doc.metaTitle), description: doc.metaDescription }),
};

export default function TermsConditionsPage() {
  return <LegalPage doc={doc} />;
}
