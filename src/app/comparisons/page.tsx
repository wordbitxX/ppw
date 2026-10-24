import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink } from "@/components/ui";
import { PostCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/accordion";
import { FaqSchema } from "@/components/jsonld";
import { seoTitleAbsolute } from "@/lib/seo-title";
import { getPosts } from "@/lib/blog";
import type { Faq } from "@/lib/types";

/**
 * Comparison hub.
 *
 * The comparison articles themselves already exist as blog posts; this page
 * collects them in one place instead of duplicating them. Adding a new
 * comparison means adding its slug here — nothing else changes.
 */
const comparisonSlugs = [
  "shopify-vs-woocommerce",
  "shopify-vs-custom-ecommerce-website",
  "wordpress-vs-custom-website",
  "flutter-vs-react-native",
  "android-vs-ios-which-to-build-first",
  "custom-software-vs-ready-made-software",
  "crm-vs-erp-which-one-does-your-business-need",
  "seo-vs-google-ads",
];

const description =
  "Honest comparisons before you choose: Shopify vs WooCommerce, Flutter vs React Native, WordPress vs custom, agency-style custom software vs ready-made, CRM vs ERP, SEO vs Google Ads.";

const faqs: Faq[] = [
  {
    question: "Are these comparisons neutral?",
    answer:
      "They are written to help a buyer decide, not to steer every reader to our most expensive option. Each one names where the cheaper or simpler option wins — because a client who picks the right small tool comes back for the big one.",
  },
  {
    question: "I still cannot decide after reading one. What then?",
    answer:
      "That is normal — the last 20% of a technology decision depends on your exact catalogue, team and deadline, which no article knows. Send the brief and we will give a direct recommendation with reasons.",
  },
  {
    question: "Will you add more comparisons?",
    answer:
      "Yes, when a question keeps coming up in real enquiries. Suggest one on the contact form and it goes on the list.",
  },
];

export const metadata: Metadata = {
  title: seoTitleAbsolute("Comparisons | Shopify vs WooCommerce, Flutter vs React Native"),
  description,
  alternates: { canonical: "/comparisons" },
  keywords: ["shopify vs woocommerce", "flutter vs react native", "wordpress vs custom website", "crm vs erp", "seo vs google ads", "custom vs ready made software"],
  openGraph: { url: "/comparisons", title: "Comparisons | WordbitX", description },
};

export default function ComparisonsPage() {
  const posts = getPosts(comparisonSlugs);
  return (
    <>
      <PageHero
        eyebrow="Comparisons"
        title="Compare before you choose"
        description={description}
        crumbs={[{ label: "Comparisons", href: "/comparisons" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Ask us to recommend</ButtonLink>
          <ButtonLink href="/glossary" variant="ghost">
            Confused by a term? Glossary
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="All comparisons"
          title="Eight decisions, each in one article"
          description="Read the one that matches your decision. Each article ends with who should pick which option — not with a generic 'contact us'."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="FAQ" title="How to use these comparisons" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Read one, still stuck between two options?"
        description="Tell us the two options and your deadline. You will get a recommendation with reasons, not a pitch for the dearer one."
        primaryHref="/contact"
        whatsappMessage="Hello WordbitX, I read your comparisons and need a recommendation."
      />
      <FaqSchema faqs={faqs} />
    </>
  );
}
