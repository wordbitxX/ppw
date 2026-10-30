import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading, ButtonLink, Card } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { seoTitleAbsolute } from "@/lib/seo-title";

const description =
  "Free resources from WordbitX: a website launch checklist, a copy-ready app RFP template and a free website audit — plus the cost calculator and glossary.";

const resources = [
  {
    href: "/resources/website-launch-checklist",
    title: "Website launch checklist",
    text: "The checks we run before any site goes live: content, speed, forms, analytics, SEO basics and legal pages. Print it, hand it to your developer, and hold them to it.",
  },
  {
    href: "/resources/app-rfp-template",
    title: "App RFP template",
    text: "Copy this structure into your request for proposal and you will get comparable, serious quotes instead of five unrelated guesses. Includes the budget-band question that filters out guesswork.",
  },
  {
    href: "/resources/free-website-audit",
    title: "Free website audit",
    text: "Request a manual review of your current site — speed, search basics, mobile experience and conversion leaks — returned as written findings, not an automated score.",
  },
  {
    href: "/tools/cost-calculator",
    title: "Cost calculator",
    text: "Point the sliders at your project and get an honest PKR/USD range, timeline and what is included. Built from the same model as our written quotes.",
  },
  {
    href: "/comparisons",
    title: "Comparisons",
    text: "Shopify vs WooCommerce, Flutter vs React Native, WordPress vs custom and more — each ending with who should pick which option.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    text: "API, CRM, ERP, MVP, PWA, SaaS and the rest, in plain language — the reference for any term in our proposals.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("Free Resources | Launch Checklist, RFP Template, Audit"),
  description,
  alternates: { canonical: "/resources" },
  keywords: ["website launch checklist", "app RFP template", "free website audit", "software development resources"],
  openGraph: { url: "/resources", title: "Free Resources | WordbitX", description },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free things that are actually useful"
        description={description}
        crumbs={[{ label: "Resources", href: "/resources" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Ask us a question</ButtonLink>
          <ButtonLink href="/tools/cost-calculator" variant="ghost">
            Try the cost calculator
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="All resources"
          title="Take them, use them, even if you never hire us"
          description="No email gate, no download form. The full content is on the page — if it helps you buy software more wisely, it has done its job."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => (
            <Card key={item.href}>
              <h3 className="text-base font-semibold text-ink-900">
                <Link href={item.href} className="hover:text-brand-700">
                  {item.title} →
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want a resource we have not made yet?"
        description="Tell us the decision you are stuck on. If it is a question we hear twice, we will publish the resource for it."
        primaryHref="/contact"
        whatsappMessage="Hello WordbitX, I would like a resource on a topic."
      />
    </>
  );
}
