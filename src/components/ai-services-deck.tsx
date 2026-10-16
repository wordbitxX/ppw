import type { ReactNode } from "react";
import { CineBackdrop } from "@/components/cinematic";

export function AiServicesDeck({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  /** "light" = white editorial band with a soft brand-tinted wash (home page);
   *  "dark" = the original cine navy surface. */
  tone?: "dark" | "light";
}) {
  if (tone === "light") {
    return (
      <section
        id="services"
        className="defer-paint relative overflow-hidden py-12 text-ink-900 sm:py-20 lg:py-24"
      >
        {/* Calm light backdrop: layered soft washes so the band feels premium
            rather than flat white — no motion, matching the site's calm-arc rule. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52rem 30rem at 8% 0%, rgba(28,168,48,0.06), transparent 60%), radial-gradient(48rem 28rem at 96% 12%, rgba(5,13,33,0.05), transparent 62%), linear-gradient(180deg, #ffffff 0%, #f8fbf8 55%, #ffffff 100%)",
          }}
        />
        <div className="container-page relative z-10">{children}</div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="cine-surface cine-rim defer-paint relative overflow-hidden py-12 text-white sm:py-20 lg:py-24"
    >
      <CineBackdrop variant="mesh" opacity={0.4} position="50% 40%" />
      <div className="container-page relative z-10">{children}</div>
    </section>
  );
}
