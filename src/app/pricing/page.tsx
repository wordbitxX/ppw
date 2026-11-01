import { Questions } from "@/components/questions";
import { pkQuestions } from "@/lib/question-bank";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading, ButtonLink, CheckList, Card } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { ArrowRight } from "@/components/icons";
import { pricingBands, pricingFaqs, pricingModels, retainerExcludes, retainerIncludes } from "@/lib/pricing";
import { fixedPackages, packagePages, priceTiers } from "@/lib/price-ladder";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software Development Cost | How Quotes Work",
  description:
    `How WordbitX prices: fixed website packages in PKR (from ${fixedPackages.pk.starter}) and USD (from ${fixedPackages.us.starter}), plus custom builds quoted on a written scope.`,
  alternates: { canonical: "/pricing" },
  keywords: [
    "software development cost",
    "software development cost Pakistan",
    "website development cost",
    "website price in Pakistan",
    "website cost in USA",
    "mobile app development cost",
    "hire software developers Pakistan",
    "hire a software team",
    "custom software pricing",
    "POS software cost Pakistan",
    "Shopify development cost",
    "get a software quote",
  ],
  openGraph: {
    url: "/pricing",
    title: "Software Development Cost | WordbitX",
    description:
      "No high ‘starting at’ that scares a small job, and no fake cheap ERP. Send a brief — you get a written milestone quote.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Software development cost — quoted on your brief, not a sticker"
        description="Most custom software companies do not print a public price list, for a reason: a small site and a full system are not the same job. Send pages, modules and a deadline. You get a written milestone quote — including when a tight first phase is the honest answer."
        crumbs={[{ label: "Pricing", href: "/pricing" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={contactHref()}>Get a written quote</ButtonLink>
          <ButtonLink href="/contact?intent=call" variant="ghost">
            Book a discovery call
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="How we charge"
          title="Three ways to engage a software team"
          description="Fixed milestones for builds. Monthly hours for SEO, ads and caretaking. A short discovery before any of it."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pricingModels.map((model) => (
            <Card key={model.title} className="hover-sheen">
              <h3 className="text-lg font-semibold text-ink-900">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{model.text}</p>
            </Card>
          ))}
        </div>
        {/* Fixed-price route for the small-business intent. The rest of this
            page explains why custom software is quoted; a shop owner who just
            wants a five-page site needs a number, so each market has its own
            package page — PKR for Pakistan, USD for the US. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-700">Pakistan · PKR</p>
            <h3 className="mt-2 text-base font-semibold text-ink-900">
              Website packages from {fixedPackages.pk.starter}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">
              Business website {fixedPackages.pk.starter}, or {fixedPackages.pk.allInOne} with domain and one year of
              hosting. {fixedPackages.pk.supportMonths} months support included.
            </p>
            <div className="mt-4">
              <ButtonLink href={packagePages.pk.href} className="shrink-0">
                See Pakistan prices
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-navy-500/30 bg-navy-950 p-5 text-white sm:p-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-300">USA &amp; international · USD</p>
            <h3 className="mt-2 text-base font-semibold text-white">Website packages from {fixedPackages.us.starter}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-300">
              Starter {fixedPackages.us.starter}, business {fixedPackages.us.business}, online store{" "}
              {fixedPackages.us.store}. Invoiced in USD, calls booked in ET/PT.
            </p>
            <div className="mt-4">
              <ButtonLink href={packagePages.us.href} className="shrink-0">
                See USA prices
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* One ladder, so no page can quote a different range for the same tier. */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Website and software price bands in PKR and USD</caption>
              <thead className="bg-slate-50 text-[0.62rem] uppercase tracking-[0.14em] text-ink-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">What</th>
                  <th scope="col" className="px-4 py-3 font-bold">Typical scope</th>
                  <th scope="col" className="px-4 py-3 font-bold">PKR</th>
                  <th scope="col" className="px-4 py-3 font-bold">USD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[priceTiers.fixed, priceTiers.custom, priceTiers.app].map((tier) => (
                  <tr key={tier.id}>
                    <th scope="row" className="px-4 py-3 font-semibold text-ink-900">{tier.name}</th>
                    <td className="px-4 py-3 text-ink-500">{tier.includes}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink-900">{tier.pkrLabel}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink-900">{tier.usdLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-400">
          PKR prices are the Pakistani market rates. USD prices are the US list, set for that market rather than
          converted at the exchange rate. Every band is confirmed in writing before work starts.
        </p>
      </Section>

      <Section tone="muted" id="ranges">
        <SectionHeading
          eyebrow="How we quote"
          title="What actually changes the number"
          description="Pakistan and international work can invoice in PKR or USD. The contact form already includes an under-$1,000 band. A sticker on this page would either scare a small job or cheapen a real product."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {pricingBands.map((band) => (
            <Link
              key={band.name}
              href={band.href}
              className="group hover-sheen relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand-300 hover:shadow-[0_28px_70px_-36px_rgba(28,168,48,0.42)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{band.keywords}</p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-ink-900 group-hover:text-brand-700">{band.name}</h3>
                <p className="shrink-0 text-sm font-semibold text-ink-900">{band.range}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{band.typical}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                {band.name} service page
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-200 bg-brand-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="max-w-2xl">
            <h3 className="text-base font-semibold text-ink-900">Want a number before the call?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
              The cost calculator points sliders at your project and shows an honest PKR/USD range with the weeks it
              usually takes — same model as the written quote you get afterwards.
            </p>
          </div>
          <ButtonLink href="/tools/cost-calculator" className="shrink-0">
            Open the cost calculator
          </ButtonLink>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-500">
          Longer reads:{" "}
          <Link href="/blog/website-development-cost-pakistan" className="font-medium text-brand-700 underline-offset-4 hover:underline">
            website development cost in Pakistan
          </Link>
          ,{" "}
          <Link href="/blog/saas-mvp-development-cost" className="font-medium text-brand-700 underline-offset-4 hover:underline">
            SaaS MVP development cost
          </Link>
          , and{" "}
          <Link href="/process" className="font-medium text-brand-700 underline-offset-4 hover:underline">
            how delivery actually runs
          </Link>
          .
        </p>
      </Section>

      <Section id="support">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Retainers"
              title="Software maintenance, SEO and ads after launch"
              description="Ongoing Support is a named hour-bank — not an excuse to disappear, and not a fake SLA badge."
            />
            <div className="mt-8">
              <ButtonLink href="/contact?service=Ongoing%20support%20%26%20maintenance">Ask about a retainer</ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="hover-sheen">
              <h3 className="text-base font-semibold text-ink-900">Included</h3>
              <div className="mt-4">
                <CheckList items={retainerIncludes} />
              </div>
            </Card>
            <Card className="hover-sheen">
              <h3 className="text-base font-semibold text-ink-900">Not included</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-500">
                {retainerExcludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Get a number"
          title="A 20-minute discovery call, then a scoped plan"
          description="Tell us the product, who will use it, and a deadline. Same-business-day reply is typical. WhatsApp is fastest for USA and Pakistan lines."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact?intent=call">Request a discovery call</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Send a written brief
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Software development cost questions"
            description="If a vendor promises first-page Google or a full ERP for a few hundred dollars, that is not a quote — that is bait."
          />
          <FaqAccordion faqs={pricingFaqs} />
        </div>
      </Section>

      <CtaBand
        title="Ready for a number you can take to a partner?"
        description="Send the brief. You get clarifying questions or a call, then milestones and a price — not a recycled deck."
        primaryLabel="Start a quote"
        primaryHref="/contact"
      />
      <FaqSchema faqs={[...pricingFaqs, ...pkQuestions.map(q=>({question:q.question,answer:`${q.answer} Read more: ${q.href}`}))]} />
      <Questions title="Pakistan prices, hosting and offers" items={pkQuestions} schema={false} />
    </>
  );
}
