/** The owner-provided booking link can be overridden at build time. */
export function BookingButton({ className: extraClassName = "" }: { className?: string }) {
  const value = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "https://cal.com/wordbitx-tech-hifk0v/30min";
  let url: URL | undefined;
  try {
    if (value) {
      const parsed = new URL(value);
      if (parsed.protocol === "https:") url = parsed;
    }
  } catch { /* No configured booking URL. */ }
  const className = `inline-flex items-center justify-center rounded-xl border border-arc-300/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white ${extraClassName}`;
  return url ? (
    <a href={url.href} target="_blank" rel="noopener noreferrer" className={className}>Book a free call</a>
  ) : (
    <button type="button" disabled className={`${className} cursor-not-allowed`} title="Booking link not yet available">
      Book a free call <span className="ml-1 text-xs text-slate-300">(booking link pending)</span>
    </button>
  );
}
