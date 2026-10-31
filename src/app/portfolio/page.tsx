import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section, SectionHeading, ButtonLink } from "@/components/ui";
import { PortfolioExplorer } from "@/components/portfolio-explorer";
import { DemosSection } from "@/components/demos-section";
import { CtaBand } from "@/components/cta-band";
import { projects, projectCategories, portfolioDisclosure } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Case Studies | Web, Mobile & eCommerce Projects",
  description:
    "WordbitX case studies: custom POS platforms, delivery apps, Shopify storefronts, booking portals and AI tools — with the decisions behind each build.",
  alternates: { canonical: "/portfolio" },
  keywords: [
    "software development case studies",
    "web development projects",
    "mobile app case studies",
    "WordbitX portfolio",
    "software development portfolio",
  ],
  openGraph: {
    url: "/portfolio",
    title: "WordbitX Case Studies | Project Profiles",
    description:
      "Project profiles covering software platforms, mobile applications, eCommerce storefronts, AI automation and marketplace websites.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Case Studies Across Software, Web, Mobile and Commerce"
        description="Start with the live demo websites — open any one, then tell us if you want something similar. Written project profiles sit below."
        crumbs={[{ label: "Case Studies", href: "/portfolio" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#demos">See live demos</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Start a Similar Project
          </ButtonLink>
        </div>
      </PageHero>

      <Section padding="compact" deferPaint={false}>
        <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-navy-950 text-white shadow-card lg:grid-cols-2">
          <div className="relative min-h-64 overflow-hidden lg:min-h-full">
            <Image src="/brand/portfolio/salon-booking-dark.webp" alt="Illustrative dark salon workspace with a booking dashboard" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/80 px-3 py-1 text-[0.65rem] text-slate-200">Illustrative image</span>
          </div>
          <div className="flex flex-col items-start justify-center p-6 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">Featured case study · WordbitX demo</span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Salon Booking &amp; Management System</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">A salon appointment system for Pakistan and worldwide, with chair schedules, staff and an owner dashboard. Explore the interactive demo with simulated WhatsApp conversations and sample data.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio/salon-whatsapp-booking-recovery-dashboard">View case study</ButtonLink>
              <Link href="/products/salon-booking-system" className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore the product</Link>
            </div>
          </div>
        </article>
      </Section>

      <DemosSection />

      <Section>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-ink-900">A note on confidentiality</h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-ink-500">{portfolioDisclosure}</p>
        </div>

        <div className="mt-10">
          <PortfolioExplorer
            categories={projectCategories as unknown as string[]}
            projects={projects.map((project) => ({
              slug: project.slug,
              title: project.title,
              summary: project.summary,
              category: project.category,
              industry: project.industry,
              image: project.image,
              imageAlt: project.imageAlt,
              technologies: project.technologies,
              clientLabel: project.clientLabel,
            }))}
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How We Document Work"
          title="What you will find in every project profile"
          description="We publish the parts that help you evaluate capability, and keep commercially sensitive detail private."
          align="center"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Context", text: "Industry, engagement type and the operational problem behind the build." },
            { title: "Architecture", text: "The technical decisions and why they suited the constraints." },
            { title: "Features", text: "The functionality actually delivered, not a wish list." },
            { title: "Outcomes", text: "Observable changes in how the business operates after launch." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a project like these in mind?"
        description="Send us the problem you are solving. We will outline an approach, the likely architecture and a milestone plan."
      />
    </>
  );
}
