import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalDocs } from "@/lib/legal";
import { seoTitleAbsolute, seoTitle } from "@/lib/seo-title";
import { socialMetadata } from "@/lib/social-meta";

const doc = legalDocs["privacy-policy"];

export const metadata: Metadata = {
  title: seoTitleAbsolute(doc.metaTitle),
  description: doc.metaDescription,
  alternates: { canonical: "/privacy-policy" },
  ...socialMetadata({ url: "/privacy-policy", title: seoTitle(doc.metaTitle), description: doc.metaDescription }),
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={doc} />;
}
