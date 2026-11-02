import type { Metadata } from "next";
import Link from "next/link";
import { Questions } from "@/components/questions";
import { FaqSchema, JsonLd } from "@/components/jsonld";
import { Section, SectionHeading } from "@/components/ui";
import { questionGroups, cityQuestions, industryQuestions } from "@/lib/question-bank";
import { seoTitleAbsolute } from "@/lib/seo-title";
import { socialMetadata } from "@/lib/social-meta";
import { absoluteUrl } from "@/lib/site";

const title = "Website, Software, Hosting & AI FAQs";
const description =
  "Plain answers about Pakistan website prices, timelines, hiring, platforms, hosting, discounts and AI.";

export const metadata: Metadata = {
  title: seoTitleAbsolute(title),
  description,
  alternates: { canonical: "/faqs" },
  ...socialMetadata({ url: "/faqs", title: `${title} | WordbitX`, description }),
};

const toAnchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function FaqHub() {
  const all = [
    ...Object.values(questionGroups).flat(),
    ...cityQuestions.flatMap((x) => x.questions),
    ...industryQuestions.flatMap((x) => x.questions),
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "FAQs", item: absoluteUrl("/faqs") },
    ],
  };

  return (
    <>
      <Section className="pt-32">
        <p className="text-sm font-semibold text-brand-600">FAQ hub</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
          Questions about websites, software and AI
        </h1>
        <p className="mt-5">
          Published WordbitX prices and supplied market estimates are labelled separately. Research reviewed 1 November
          2026. Confirm current third-party terms before purchase.
        </p>
        <nav aria-label="FAQ topics" className="mt-6 flex flex-wrap gap-4">
          {Object.keys(questionGroups).map((k) => (
            <Link className="text-brand-600 underline" href={`#${toAnchorId(k)}`} key={k}>
              {k}
            </Link>
          ))}
          <Link href="#cities">Cities and near me</Link>
          <Link href="#industries">Industries</Link>
        </nav>
      </Section>
      {Object.entries(questionGroups).map(([groupTitle, items]) => (
        <div id={toAnchorId(groupTitle)} key={groupTitle}>
          <Questions title={groupTitle} items={items} schema={false} />
        </div>
      ))}
      <div id="cities">
        <Section>
          <SectionHeading title="Lahore, Karachi, Islamabad and near me" />
          <p>
            City questions use the same scope and ownership checks. We do not invent city-specific prices or local
            offices.
          </p>
        </Section>
        {cityQuestions.map((x) => (
          <Questions key={x.city} title={`Questions — ${x.city}`} items={x.questions} schema={false} />
        ))}
      </div>
      <div id="industries">
        {industryQuestions.map((x) => (
          <Questions key={x.industry} title={`${x.industry} business questions`} items={x.questions} schema={false} />
        ))}
      </div>
      <FaqSchema faqs={all.map((q) => ({ question: q.question, answer: `${q.answer} Read more: ${absoluteUrl(q.href)}` }))} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
