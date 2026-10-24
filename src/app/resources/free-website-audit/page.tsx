import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink, CheckList } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { seoTitleAbsolute } from "@/lib/seo-title";
import type { Faq } from "@/lib/types";

const description =
  "Request a free, manual website audit from WordbitX: speed, search basics, mobile experience and conversion leaks, returned as written findings — no automated score, no obligation.";

const covered = [
  "Speed on a real phone, not only on office wifi — and what is actually slowing the page down.",
  "Search basics: titles, sitemap, crawl errors and whether the pages that should rank are even indexed.",
  "Mobile experience: forms, buttons and popups tested the way a visitor actually uses them.",
  "Conversion leaks: where visitors drop off, which forms fail, and which page asks for too much too soon.",
  "Trust gaps: missing policies, broken links, placeholder text and outdated information.",
];

const faqs: Faq[] = [
  {
    question: "Is this an automated report?",
    answer:
      "No. Automated tools produce a score and a generic list. A person reviews your site against the same launch checklist we use for our own work and writes up what matters for your business specifically.",
  },
  {
    question: "How long does it take?",
    answer:
      "Usually a few working days after you send the URL and a sentence about what the site should do for you. If the site is very large, we say so up front instead of silently delaying.",
  },
  {
    question: "Is there an obligation to hire you after?",
    answer:
      "No. The findings are yours to take to any developer. If you do want us to fix them, the audit becomes the scope for a written quote — but that is your call, not a condition.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Just the website address and one sentence about what the site should achieve — sales, bookings, enquiries, or something else. Send both through the contact form with the subject 'Free audit'.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("Free Website Audit | Manual Review, Written Findings"),
  description,
  alternates: { canonical: "/resources/free-website-audit" },
  keywords: ["free website audit", "website audit Pakistan", "website review service", "website SEO audit"],
  openGraph: { url: "/resources/free-website-audit", title: "Free Website Audit | WordbitX", description },
};

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free website audit"
        description={description}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Free audit", href: "/resources/free-website-audit" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Request your audit</ButtonLink>
          <ButtonLink href="/resources/website-launch-checklist" variant="ghost">
            See the checklist we audit against
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="What the audit covers"
          title="Five areas, checked by a person"
          description="Send your URL through the contact form with the subject 'Free audit'. You get written findings — what passes, what fails, and what fixing it would take."
        />
        <div className="mt-6">
          <CheckList items={covered} />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="FAQ" title="Audit questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Send your URL and one sentence about your goal"
        description="That is all an audit needs to start. No forms to fill beyond the contact form, no call required first."
        primaryHref="/contact"
        whatsappMessage="Hello WordbitX, I would like a free audit of my website."
      />
      <FaqSchema faqs={faqs} />
    </>
  );
}
