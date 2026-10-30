import type { Metadata } from "next";
import Link from "next/link";
import { HomeConcepts, homeConcepts, ConceptsFooter } from "@/components/sample/home-concepts";

export const metadata: Metadata = {
  title: "Home page concepts (internal sample)",
  description: "Internal review page: six home-page directions in the WordbitX navy palette.",
  alternates: { canonical: "/sample/homepages" },
  robots: { index: false, follow: false },
};

export default function SampleHomepagesPage() {
  return (
    <>
      <header className="bg-navy-950 pb-8 pt-24 text-white sm:pt-28">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Internal · not indexed</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">Home page concepts</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Six directions for the home page, all on the brand navy (#052767) — the colour you asked to carry over from
            the Pakistan page. Same offer on each; the layout, type and density change. Pick a number and we will build
            the live page on it.
          </p>

          <nav aria-label="Jump to concept" className="mt-6 flex flex-wrap gap-2">
            {homeConcepts.map((concept) => (
              <a
                key={concept.n}
                href={`#c${String(concept.n).padStart(2, "0")}`}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-brand-400/60 hover:text-white"
              >
                <span className="font-semibold text-brand-300">{String(concept.n).padStart(2, "0")}</span>{" "}
                {concept.name}
                <span className="ml-1.5 text-slate-500">{concept.note}</span>
              </a>
            ))}
          </nav>

          <p className="mt-5 text-xs text-slate-500">
            Nothing here is indexed, and no number or claim appears that does not already exist on the live site.{" "}
            <Link href="/sample" className="text-brand-300 underline underline-offset-2">
              See the hero-only concepts too
            </Link>
            .
          </p>
        </div>
      </header>
      <HomeConcepts />
      <ConceptsFooter />
    </>
  );
}
