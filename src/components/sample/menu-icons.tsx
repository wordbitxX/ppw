import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";
import styles from "./menu-icons.module.css";

/**
 * Four premium directions for the mobile menu button (the "three lines").
 *
 * Review page only (/sample) — nothing here ships to the header until one is
 * picked, so the variants can be judged side by side at the size they are
 * actually seen: a 40px button in a dark bar holding a 20px glyph.
 *
 * The bars are drawn with elements (not SVG paths) so hover/focus can animate
 * width, opacity and the brand dot independently.
 */

type Variant = {
  n: string;
  name: string;
  note: string;
  icon: React.ReactNode;
  buttonClass: string;
};

const barBase = "block h-[1.5px] rounded-full";

const variants: Variant[] = [
  {
    n: "01",
    name: "Arc fade",
    note: "Three bars, widest to narrowest, fading left to right. Reads as a stack of light rather than a menu glyph.",
    icon: (
      <span className="flex w-5 flex-col items-start gap-[4.5px]">
        <span className={`${styles.arcBar} ${barBase} w-5 bg-gradient-to-r from-white via-white to-arc-300`} />
        <span className={`${styles.arcBar} ${styles.delay1} ${barBase} w-[0.9rem] bg-gradient-to-r from-white via-white/90 to-arc-300/80`} />
        <span className={`${styles.arcBar} ${styles.delay2} ${barBase} w-[0.6rem] bg-gradient-to-r from-white/80 to-arc-300/60`} />
      </span>
    ),
    buttonClass: "border-white/15 bg-white/[0.04] hover:border-arc-300/50 hover:bg-white/[0.08]",
  },
  {
    n: "02",
    name: "Brand dot",
    note: "Two hairlines and the green dot that already signals 'live' in the header — the third line becomes the brand mark.",
    icon: (
      <span className="flex w-5 flex-col gap-[5px]">
        <span className={`${styles.slideLeft} ${barBase} w-5 bg-white/85`} />
        <span className={`${styles.slideRight} ${barBase} w-5 bg-white/85`} />
        <span className="flex items-center gap-1">
          <span className="block h-[1.5px] w-3 rounded-full bg-white/50" />
          <span className="block h-[5px] w-[5px] rounded-full bg-brand-500 shadow-[0_0_8px_rgba(28,168,48,0.95)]" />
        </span>
      </span>
    ),
    buttonClass: "border-brand-500/25 bg-brand-500/[0.06] hover:border-brand-400/60 hover:bg-brand-500/[0.12]",
  },
  {
    n: "03",
    name: "Glass capsule",
    note: "A heavier, more product-like button: translucent capsule, hairline gradient ring, bars that compress on hover.",
    icon: (
      <span className={`${styles.capsule} flex h-6 w-6 flex-col items-center justify-center gap-[3.5px] rounded-[9px] border border-white/20 bg-white/[0.06] backdrop-blur`}>
        <span className={`${styles.capsTop} ${barBase} w-3.5 bg-white`} />
        <span className={`${styles.capsMid} ${barBase} w-3.5 bg-white/80`} />
        <span className={`${styles.capsTop} ${barBase} w-2.5 bg-arc-300`} />
      </span>
    ),
    buttonClass: "border-white/10 bg-transparent hover:bg-white/[0.05]",
  },
  {
    n: "04",
    name: "Hairline rules",
    note: "The quietest option: three 1px rules, the middle one offset short. Premium via restraint, not weight.",
    icon: (
      <span className={`${styles.rules} flex w-5 flex-col gap-[4px]`}>
        <span className="block h-px w-5 bg-white/70" />
        <span className="block h-px w-3.5 bg-white/70" />
        <span className="block h-px w-5 bg-white/40" />
      </span>
    ),
    buttonClass: "border-white/[0.08] bg-transparent hover:border-white/25",
  },
];

function Button({ variant }: { variant: Variant }) {
  return (
    <button
      type="button"
      aria-label={`${variant.name} menu design`}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-white transition-colors duration-300 ${variant.buttonClass}`}
    >
      {variant.icon}
    </button>
  );
}

export function MenuIconConcepts() {
  return (
    <section id="menu-icons" className="cine-surface bg-midnight py-16 text-white sm:py-20">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-arc-300">Mobile header · menu button</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Four premium takes on the three lines</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          All four are drawn at the real size — a 40px button with a 20px glyph — on the actual header surface. Hover or tap
          them to see the motion. Pick a number and it replaces the current menu icon site-wide.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {variants.map((variant) => (
            <div
              key={variant.n}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{variant.n}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-[-0.01em]">{variant.name}</h3>
                </div>
                <Button variant={variant} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{variant.note}</p>
            </div>
          ))}
        </div>

        {/* How the winner sits next to the new transparent WhatsApp CTA. */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-midnight/60 p-4 sm:p-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">In the bar, next to the WhatsApp CTA</p>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#0a1128]/95 px-3 py-2 ring-1 ring-white/10">
            <span className="text-sm font-semibold tracking-tight text-white">
              WordbitX<span className="text-brand-400">.</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/20 bg-transparent px-3 text-[0.8rem] font-semibold text-white">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </span>
              <span className="flex gap-2">
                {variants.map((variant) => (
                  <Button key={variant.n} variant={variant} />
                ))}
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Mock-up only — the live bar shows one button. The WhatsApp link above is the real destination (
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-arc-300 underline">
              wa.me
            </a>
            ).
          </p>
        </div>
      </div>
    </section>
  );
}
