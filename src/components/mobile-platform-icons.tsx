/** Android and Apple glyphs reuse the site-wide, server-rendered icon sprite. */
export function MobilePlatformIcons({ className, monochrome = false }: { className: string; monochrome?: boolean }) {
  return (
    <svg viewBox="0 0 52 24" className={className} aria-hidden="true" focusable="false">
      <use href="#mbrand-android-app-development" width="24" height="24" style={{ color: monochrome ? "currentColor" : "#3DDC84" }} />
      <use href="#mbrand-ios-app-development" x="28" width="24" height="24" style={{ color: "currentColor" }} />
    </svg>
  );
}
