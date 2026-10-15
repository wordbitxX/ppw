import Link from "next/link";
import { CineImage, type CineVariant } from "@/components/cinematic";
import { ArrowRight } from "@/components/icons";

type Panel = {
  id: string;
  variant: CineVariant;
  position: string;
  eyebrow: string;
  title: string;
  text: string;
  points: { label: string; href: string }[];
  cta: { label: string; href: string };
};

/* Copy mirrors the service pages it links to (ai-solutions, enterprise
   software, CRM & ERP, API development, SaaS) — nothing invented. */
const panels: Panel[] = [
  {
    id: "ai",
    variant: "robot",
    position: "62% 18%",
    eyebrow: "Artificial intelligence",
    title: "AI that removes repetitive work",
    text: "Applied AI for business: systems that read documents, answer questions from your own knowledge base and trigger the next step — with human review where accuracy matters.",
    points: [
      { label: "AI assistants & chat", href: "/services/ai-solutions" },
      { label: "Document intelligence", href: "/services/ai-solutions" },
      { label: "Predictive analytics", href: "/services/ai-solutions" },
      { label: "Workflow automation", href: "/services/ai-solutions" },
    ],
    cta: { label: "Explore AI solutions", href: "/services/ai-solutions" },
  },
  {
    id: "b2b",
    variant: "cube",
    position: "75% 40%",
    eyebrow: "B2B platforms",
    title: "Software built for business operations",
    text: "Internal platforms, portals and integrations for companies with multiple teams, roles and systems — designed around access control, audit trails and your existing tools.",
    points: [
      { label: "Enterprise software", href: "/services/enterprise-software-solutions" },
      { label: "CRM & ERP solutions", href: "/services/crm-erp-solutions" },
      { label: "API development & integration", href: "/services/api-development" },
      { label: "SaaS applications", href: "/services/saas-application-development" },
    ],
    cta: { label: "Explore enterprise software", href: "/services/enterprise-software-solutions" },
  },
];

export function AiB2bBand() {
  return (
    <section
      id="ai-b2b"
      aria-labelledby="ai-b2b-heading"
      className="cine-surface cine-rim defer-paint relative overflow-hidden py-12 text-white sm:py-20"
    >
      <div className="container-page relative z-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-400/10 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            AI &amp; B2B
          </span>
          <h2 id="ai-b2b-heading" className="mt-4 text-[1.65rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.5rem]">
            AI and B2B software, built into how your business already works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            We build for companies, not just consumers: automation that saves your team hours, and business platforms
            that connect your departments, data and partners.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {panels.map((panel) => (
            <article
              key={panel.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050a18]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <CineImage
                  variant={panel.variant}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: panel.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a18] via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-3 sm:p-7 sm:pt-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-arc-300">{panel.eyebrow}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{panel.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{panel.text}</p>
                <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                  {panel.points.map((point) => (
                    <li key={point.label}>
                      <Link
                        href={point.href}
                        className="inline-flex items-center gap-2 text-slate-100 transition-colors hover:text-brand-300"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {point.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={panel.cta.href}
                  className="group/cta mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-300"
                >
                  {panel.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
