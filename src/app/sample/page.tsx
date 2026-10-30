import type { Metadata } from "next";
import { HeroConcepts, heroConcepts } from "@/components/sample/heroes";

export const metadata: Metadata = {
  title: "Hero concepts (internal sample)",
  description: "Internal review page: 20 hero background concepts for the WordbitX home page.",
  alternates: { canonical: "/sample" },
  robots: { index: false, follow: false },
};

export default function SamplePage() {
  return (
    <>
      <header className="cine-surface bg-midnight pb-8 pt-28 text-white sm:pt-36">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-arc-300">Internal · not indexed</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">Hero concepts</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Twenty directions for the home hero, same copy on each. Move the mouse (or touch) on the interactive ones. Tell us the
            numbers you like — we can mix, for example 6 + 15.
          </p>
          <p className="mt-4">
            <a
              href="/sample/homepages"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-400/40 bg-brand-500/10 px-4 py-2.5 text-sm font-semibold text-brand-200 transition-colors hover:border-brand-300/80 hover:text-white"
            >
              New: six full home-page concepts in the navy palette
              <span aria-hidden="true">→</span>
            </a>
          </p>

          <nav aria-label="Jump to concept" className="mt-6 flex flex-wrap gap-2">
            {heroConcepts.map((c) => (
              <a
                key={c.n}
                href={`#s${String(c.n).padStart(2, "0")}`}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-arc-300/60 hover:text-white"
              >
                <span className="font-semibold text-arc-300">{String(c.n).padStart(2, "0")}</span> {c.name}
                <span className="ml-1.5 text-slate-500">{c.kind}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>
      <HeroConcepts />
    </>
  );
}
