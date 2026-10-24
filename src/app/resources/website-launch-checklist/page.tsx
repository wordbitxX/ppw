import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink, CheckList, Card } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { seoTitleAbsolute } from "@/lib/seo-title";
import type { Faq } from "@/lib/types";

const description =
  "The website launch checklist we run before any site goes live: content, speed, forms, analytics, SEO basics and legal pages — free to use on any project.";

const groups: { title: string; items: string[] }[] = [
  {
    title: "Content and pages",
    items: [
      "Every page has one clear next action — a form, a call, or a WhatsApp button, not three competing ones.",
      "Prices, timelines and contact details are real, not placeholder text. Placeholder text on a live site is a trust killer.",
      "Phone numbers and emails are clickable on mobile, and the contact form actually delivers to a monitored inbox.",
      "Images have descriptive alt text, and no image carries text that exists nowhere else on the page.",
    ],
  },
  {
    title: "Speed and mobile",
    items: [
      "The homepage loads in under 3 seconds on a mid-range phone on a 4G connection — test it on a real phone, not only on office wifi.",
      "Nothing important is hidden behind a popup that cannot be closed on mobile.",
      "Buttons and form fields are thumb-sized, and forms can be completed without pinching or zooming.",
    ],
  },
  {
    title: "Search basics",
    items: [
      "Every page has a unique title and description that say what the page is — not the company name repeated on all pages.",
      "The sitemap is submitted to Search Console and the important pages return 200, not redirects or 404s.",
      "Old URLs from a previous site redirect to their real replacements, not all to the homepage.",
      "Analytics is installed and a test visit is visible in it before launch day.",
    ],
  },
  {
    title: "Trust and legal",
    items: [
      "Privacy policy and terms pages exist and are linked from the footer.",
      "Any form that collects data says what the data is used for.",
      "The site runs on HTTPS everywhere, including the www and non-www versions.",
      "A backup exists and someone has actually restored from it once.",
    ],
  },
  {
    title: "Launch day and after",
    items: [
      "Someone owns the site after launch — updates, backups and small fixes are assigned, not assumed.",
      "Search Console is checked in the first week for crawl errors on the new URLs.",
      "The first month's job is measuring: which pages get visits, which forms get used, where people drop off.",
    ],
  },
];

const faqs: Faq[] = [
  {
    question: "Is this checklist only for WordbitX clients?",
    answer:
      "No. Use it on any project, with any developer. If your developer pushes back on an item, ask them which one and why — the answer tells you a lot.",
  },
  {
    question: "What is the single most-skipped item?",
    answer:
      "Testing the contact form end to end. A surprising number of sites launch with a form that nobody ever tested, and leads quietly vanish for weeks.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("Website Launch Checklist | Before Your Site Goes Live"),
  description,
  alternates: { canonical: "/resources/website-launch-checklist" },
  keywords: ["website launch checklist", "website go live checklist", "website pre launch checks"],
  openGraph: { url: "/resources/website-launch-checklist", title: "Website Launch Checklist | WordbitX", description },
};

export default function ChecklistPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Website launch checklist"
        description={description}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Launch checklist", href: "/resources/website-launch-checklist" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/resources/free-website-audit">Get us to check yours</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Ask a question
          </ButtonLink>
        </div>
      </PageHero>

      {groups.map((group) => (
        <Section key={group.title}>
          <SectionHeading eyebrow="Checklist" title={group.title} />
          <div className="mt-6">
            <CheckList items={group.items} />
          </div>
        </Section>
      ))}

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="FAQ" title="Checklist questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Want us to run this checklist on your site?"
        description="Request a free audit and we will return the findings in writing — what passes, what fails, and what it would take to fix."
        primaryHref="/resources/free-website-audit"
        whatsappMessage="Hello WordbitX, please audit my website against your launch checklist."
      />
      <FaqSchema faqs={faqs} />
    </>
  );
}
