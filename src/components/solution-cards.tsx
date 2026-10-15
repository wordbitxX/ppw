import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { MegaServiceIcon } from "@/components/mega-service-icon";
import { solutions } from "@/lib/solutions";

/** "Platforms we can shape to your business" — lives on /industries. */
export function SolutionCards({ limit = 6 }: { limit?: number }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {solutions.slice(0, limit).map((solution) => (
        <Link
          key={solution.id}
          href={`/services/${solution.serviceSlug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_30px_60px_-40px_rgba(5,13,33,0.6)]"
        >
          <span className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
            <Image
              src={solution.image}
              alt={solution.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <span className="absolute bottom-4 left-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                <MegaServiceIcon monochrome slug={solution.serviceSlug} className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold text-white">{solution.name}</span>
            </span>
          </span>

          <span className="flex flex-1 flex-col p-6">
            <span className="text-base font-semibold text-ink-900">{solution.headline}</span>
            <span className="mt-2.5 text-sm leading-relaxed text-ink-500">{solution.description}</span>
            <span className="mt-4 space-y-2">
              {solution.bullets.map((bullet) => (
                <span key={bullet} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{bullet}</span>
                </span>
              ))}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              View {solution.name}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
