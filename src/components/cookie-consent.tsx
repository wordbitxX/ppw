"use client";

import { useEffect, useState } from "react";

const KEY = "wordbitx-cookie-consent";
type Choice = "accepted" | "rejected";

function readChoice(): Choice | null {
  try {
    const choice = localStorage.getItem(KEY);
    return choice === "accepted" || choice === "rejected" ? choice : null;
  } catch { return null; }
}

function addScript(id: string, src?: string, code?: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  if (src) { script.src = src; script.async = true; if (id === "consent-adsense") script.crossOrigin = "anonymous"; }
  if (code) script.textContent = code;
  document.head.appendChild(script);
}

function loadTracking({ ga, gtm, pixel, adsense }: TrackingIds) {
  if (gtm) addScript("consent-gtm", undefined, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtm)});`);
  if (ga) {
    addScript("consent-ga-init", undefined, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(ga)},{anonymize_ip:true});`);
    addScript("consent-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`);
  }
  if (pixel) addScript("consent-fb", undefined, `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixel)});fbq('track','PageView');`);
  if (adsense) addScript("consent-adsense", `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsense)}`);
}

type TrackingIds = { ga: string | null; gtm: string | null; pixel: string | null; adsense: string | null };

export function CookieSettingsLink() {
  return <button type="button" className="text-slate-500 transition-colors hover:text-brand-300" onClick={() => window.dispatchEvent(new Event("wordbitx-cookie-settings"))}>Cookie settings</button>;
}

export function CookieConsent({ ga, gtm, pixel, adsense }: TrackingIds) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const choice = readChoice();
    // Restore the saved preference after hydration; first-time visitors see the banner.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (choice) setOpen(false);
    if (choice === "accepted") loadTracking({ ga, gtm, pixel, adsense });
    const reopen = () => setOpen(true);
    const sync = (event: StorageEvent) => {
      if (event.key === KEY) window.location.reload();
    };
    window.addEventListener("wordbitx-cookie-settings", reopen);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("wordbitx-cookie-settings", reopen); window.removeEventListener("storage", sync); };
  }, [ga, gtm, pixel, adsense]);

  function choose(choice: Choice) {
    const previous = readChoice();
    try { localStorage.setItem(KEY, choice); } catch { /* Default deny on the next load if storage is unavailable. */ }
    setOpen(false);
    if (choice === "accepted") loadTracking({ ga, gtm, pixel, adsense });
    // A loaded tag cannot be reliably unloaded. Reload with consent denied.
    if (choice === "rejected" && (previous === "accepted" || document.getElementById("consent-ga") || document.getElementById("consent-gtm") || document.getElementById("consent-fb") || document.getElementById("consent-adsense"))) window.location.reload();
  }

  if (!open) return null;
  return (
    <section aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 text-ink-900 shadow-2xl sm:flex sm:items-center sm:gap-5 sm:p-5">
      <p className="flex-1 text-sm leading-relaxed">We use non-essential cookies for analytics and marketing only with your permission. <a href="/cookie-policy" className="underline">Cookie policy</a></p>
      <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
        <button type="button" onClick={() => choose("accepted")} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Accept all</button>
        <button type="button" onClick={() => choose("rejected")} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Reject non-essential</button>
      </div>
    </section>
  );
}
