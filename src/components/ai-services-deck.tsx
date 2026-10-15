import type { ReactNode } from "react";
import { CineBackdrop } from "@/components/cinematic";

export function AiServicesDeck({ children }: { children: ReactNode }) {
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
