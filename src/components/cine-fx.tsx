/**
 * Ambient light layers for dark bands: two drifting blurred orbs and a slow
 * diagonal sweep. Pure CSS, decorative, pointer-events none — they sit behind
 * the copy and are disabled by prefers-reduced-motion (see globals.css).
 */
export function CineFx({ sweep = true }: { sweep?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="cine-orb cine-orb-a -left-[8%] top-[-30%] h-[22rem] w-[22rem] bg-arc-500/25" />
      <span className="cine-orb cine-orb-b -right-[6%] bottom-[-35%] h-[24rem] w-[24rem] bg-arc-300/20" />
      {sweep ? <span className="cine-sweep" /> : null}
    </div>
  );
}
