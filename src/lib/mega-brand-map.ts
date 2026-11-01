/**
 * slug → brand glyph, for the service icons in the navigation mega-menu.
 *
 * The path data itself is NOT here: it lives in src/lib/brand-icon-data.ts and
 * is inlined once per page as an SVG <symbol> sprite by
 * src/components/mega-icon-sprite.tsx (a server component). The header — the
 * only client component that draws these icons — needs nothing but the slug and
 * the brand colour, so ~80 KB of glyph paths stays out of the JS bundle.
 *
 * Audit 30 Oct 2026 (P2): header.tsx imported the path data directly, which put
 * a 34 KB gzip chunk of logo paths on every page of the site.
 *
 * Keep this in sync with `npm run icons` output when a brand changes.
 */

export type MegaBrand = { key: string; hex: string };

export const megaBrandBySlug: Record<string, MegaBrand> = {
  "web-development": { key: "siWordpress", hex: "21759B" },
  "ecommerce-shopify": { key: "siShopify", hex: "7AB55C" },
  "woocommerce-development": { key: "siWoocommerce", hex: "96588A" },
  "wordpress-development": { key: "siWordpress", hex: "21759B" },
  "android-app-development": { key: "siAndroid", hex: "3DDC84" },
  "ios-app-development": { key: "siApple", hex: "000000" },
  "flutter-app-development": { key: "siFlutter", hex: "02569B" },
  "game-development": { key: "siUnity", hex: "FFFFFF" },
  "firebase-integration": { key: "siFirebase", hex: "DD2C00" },
  "ui-ux-design": { key: "siFigma", hex: "F24E1E" },
  "ebay-store-setup": { key: "siEbay", hex: "E53238" },
  "etsy-store-setup": { key: "siEtsy", hex: "F16521" },
  "tiktok-shop-setup": { key: "siTiktok", hex: "000000" },
  "facebook-instagram-shop": { key: "siInstagram", hex: "FF0069" },
  "google-merchant-center": { key: "siGoogle", hex: "4285F4" },
  "google-adsense": { key: "siGoogleadsense", hex: "4285F4" },
  "google-ads": { key: "siGoogleads", hex: "4285F4" },
  "facebook-instagram-ads": { key: "siFacebook", hex: "0866FF" },
  "google-admob": { key: "siGoogleadmob", hex: "EA4335" },
  "google-play-console": { key: "siGoogleplay", hex: "414141" },
  "app-store-publishing": { key: "siAppstore", hex: "0D96F6" },
  "email-marketing": { key: "siMailchimp", hex: "FFE01B" },
  "devops-cloud-solutions": { key: "siCloudflare", hex: "F38020" },
};

/** True for brand colours dark enough that they should inherit text colour. */
export function isDarkBrand(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.28;
}
