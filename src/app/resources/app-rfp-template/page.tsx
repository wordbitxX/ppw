import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink, Card } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { seoTitleAbsolute } from "@/lib/seo-title";
import type { Faq } from "@/lib/types";

const description =
  "A copy-ready app RFP template: the sections that make software companies reply with comparable quotes — goals, scope, integrations, timeline, budget.";

const sections: { title: string; text: string; prompt: string }[] = [
  {
    title: "1. About your business",
    text: "Two or three sentences: what you sell, who buys it, and where you operate. A quote without this context is a guess about your market.",
    prompt: "We are a [retail chain / clinic / agency] in [city], serving [customers]. Our current system is [spreadsheets / an old app / nothing].",
  },
  {
    title: "2. The problem, not the feature list",
    text: "Start with the pain: what costs time or money today? Vendors who understand the problem propose better features than a raw feature list ever gets you.",
    prompt: "Today, [process] takes [time] and fails when [situation]. We need it to take [target] and work even when [condition].",
  },
  {
    title: "3. Scope: must-have, later, never",
    text: "Split features into three lists. 'Must-have' is the first release. 'Later' is phase two. 'Never' stops scope creep in the reply itself — vendors respect a client who says no in advance.",
    prompt: "Must-have: [login, catalogue, checkout]. Later: [loyalty, multi-branch]. Never: [we do not need a marketplace].",
  },
  {
    title: "4. Platforms and integrations",
    text: "Name the systems the app must talk to: payment gateway, SMS provider, existing POS or accounting tool, app stores. Integrations are where hidden costs live, so naming them early keeps quotes comparable.",
    prompt: "Must integrate with: [JazzCash / Stripe / existing POS]. Must publish to: [Android / iOS / both].",
  },
  {
    title: "5. Timeline and budget band",
    text: "Give a launch window and a budget band (for example: under $1,000, $1,000–5,000, $5,000+). Vendors who cannot work inside the band will say so, which saves everyone a week of calls. A quote without a budget band is priced for the vendor's imagination, not your wallet.",
    prompt: "We want to launch by [month]. Our budget band is [band]. We can start with a smaller first phase if the full scope exceeds it.",
  },
  {
    title: "6. How you will decide",
    text: "Say what matters: live examples in the same industry, a written milestone plan, support after launch, or the lowest price. When vendors know the criteria, their replies actually answer them.",
    prompt: "We will decide on: [live example in our industry], [milestone plan], [post-launch support terms], [total price].",
  },
];

const faqs: Faq[] = [
  {
    question: "Should I send this RFP to many companies at once?",
    answer:
      "Three to five is the useful range. Fewer and you cannot compare; more and every reply becomes generic because no vendor invests in a 20-way contest.",
  },
  {
    question: "Is a budget band not a weakness in negotiation?",
    answer:
      "No — it is the opposite. It stops vendors quoting a $50,000 enterprise build for a $3,000 shop app, and it stops you wasting a week on a vendor who cannot work at your scale.",
  },
  {
    question: "Can I send this RFP to WordbitX as it is?",
    answer:
      "Yes. Fill in the brackets, send it through the contact form, and you will get a scoped reply against exactly these sections.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("App RFP Template | Get Comparable Software Quotes"),
  description,
  alternates: { canonical: "/resources/app-rfp-template" },
  keywords: ["app RFP template", "software RFP template", "request for proposal app development", "how to hire app developer"],
  openGraph: { url: "/resources/app-rfp-template", title: "App RFP Template | WordbitX", description },
};

export default function RfpTemplatePage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="App RFP template"
        description={description}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "RFP template", href: "/resources/app-rfp-template" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Send this RFP to us</ButtonLink>
          <ButtonLink href="/tools/cost-calculator" variant="ghost">
            Estimate the budget band first
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Template"
          title="Copy these six sections into your RFP"
          description="Each section has a prompt in brackets. Replace the brackets with your facts and you have a request that serious vendors can answer properly."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.text}</p>
              <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-ink-700">{item.prompt}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="FAQ" title="RFP questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Filled it in? Send it to us."
        description="You will get a scoped reply against exactly these sections — milestones, timeline and a written price, not a sales call."
        primaryHref="/contact"
        whatsappMessage="Hello WordbitX, I filled in your RFP template and want a quote."
      />
      <FaqSchema faqs={faqs} />
    </>
  );
}
