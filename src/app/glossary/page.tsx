import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading, ButtonLink, Card } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { seoTitleAbsolute } from "@/lib/seo-title";
import { glossaryTerms } from "@/lib/glossary";
import type { Faq } from "@/lib/types";

const description =
  "Plain-language definitions of the terms in our proposals: API, CRM, ERP, MVP, PWA, SaaS, SEO and more — each linked to the service that delivers it.";

const faqs: Faq[] = [
  {
    question: "Why does this glossary exist?",
    answer:
      "Because proposals full of jargon are how bad scopes get signed. If a term in a quote is unclear, this page is the reference — and if it is still unclear after reading it, ask us before signing anything.",
  },
  {
    question: "Do you use these exact terms in quotes?",
    answer:
      "Yes. When a quote says 'PWA' or 'headless commerce', it means what this page says it means. If a quote ever uses a term differently, the quote's own scope note wins and we will explain the difference.",
  },
  {
    question: "Is a term missing?",
    answer:
      "Tell us on the contact form and we will add it. The glossary grows from real questions clients ask, not from a dictionary dump.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("Software Glossary | API, CRM, ERP, MVP, SaaS Explained"),
  description,
  alternates: { canonical: "/glossary" },
  keywords: ["software glossary", "what is ERP", "what is CRM", "what is API", "MVP meaning", "PWA meaning", "SaaS meaning"],
  openGraph: { url: "/glossary", title: "Software Glossary | WordbitX", description },
};

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Glossary"
        title="Software terms, in plain language"
        description={description}
        crumbs={[{ label: "Glossary", href: "/glossary" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Ask about a term</ButtonLink>
          <ButtonLink href="/comparisons" variant="ghost">
            Compare your options
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Definitions"
          title="Every term we use in a proposal"
          description="Alphabetical. Each definition says what the thing is, when it helps, and where it does not — plus the service page that delivers it."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {glossaryTerms.map((item) => (
            <div key={item.term} id={item.term.toLowerCase()}>
            <Card>
              <h3 className="text-base font-semibold text-ink-900">
                {item.term} <span className="font-normal text-ink-500">— {item.short}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.definition}</p>
              {item.service ? (
                <p className="mt-3 text-sm">
                  <Link href={`/services/${item.service}`} className="font-semibold text-brand-700 hover:text-brand-800">
                    Related service →
                  </Link>
                </p>
              ) : null}
            </Card>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="FAQ" title="Glossary questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Still deciding what you actually need?"
        description="Describe the workflow, not the technology. We will tell you which of these terms apply to your project — and which do not."
        primaryHref="/contact"
        whatsappMessage="Hello WordbitX, I read your glossary and want to discuss my project."
      />
      <FaqSchema faqs={faqs} />
    </>
  );
}
