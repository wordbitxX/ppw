import Script from "next/script";
import { facebookPixelId, gaMeasurementId, gtmId } from "@/lib/tracking";

/**
 * Tag-manager snippets for the first HTML.
 *
 * These used to be raw <script> elements rendered straight into <head>. React
 * warns about that on every hydration ("Encountered a script tag while
 * rendering React component... never executed when rendering on the client"),
 * which showed up as a red error pill in the dev preview. next/script with
 * strategy="afterInteractive" still emits a real <script> in the server HTML —
 * so audit tools and Google keep seeing the snippet — but it is injected by
 * Next outside the React tree, so the warning is gone.
 */
export function TrackingHead() {
  const gaId = gaMeasurementId();
  const gtm = gtmId();
  const pixel = facebookPixelId();

  if (!gaId && !gtm && !pixel) return null;

  return (
    <>
      {/* Warm the TLS connection before the tag loads — saves ~100-300ms on mobile. */}
      {gaId || gtm ? (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        </>
      ) : null}
      {pixel ? (
        <>
          <link rel="preconnect" href="https://connect.facebook.net" />
          <link rel="dns-prefetch" href="https://connect.facebook.net" />
        </>
      ) : null}
      {gtm ? (
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
          }}
        />
      ) : null}
      {gaId ? (
        <>
          <Script
            id="ga-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="ga-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`,
            }}
          />
        </>
      ) : null}
      {pixel ? (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`,
          }}
        />
      ) : null}
    </>
  );
}

export function TrackingBody() {
  const gtm = gtmId();
  const pixel = facebookPixelId();

  if (!gtm && !pixel) return null;

  return (
    <>
      {gtm ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
            height="0"
            width="0"
            className="hidden"
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}
      {pixel ? (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={1}
            width={1}
            className="hidden"
            alt=""
            src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
          />
        </noscript>
      ) : null}
    </>
  );
}
