/**
 * A few service photos still show IDE / code editors. Reuse product-scene
 * photography so Shopify, stores, apps and software read as the actual product.
 */
const photoFile: Record<string, string> = {
  "android-app-development": "google-play-console",
  "ios-app-development": "app-store-publishing",
  "flutter-app-development": "mobile-app-development",
  "custom-software-development": "enterprise-software-solutions",
  "api-development": "saas-application-development",
  "firebase-integration": "mobile-app-development",
  "website-maintenance": "wordpress-development",
  "app-maintenance": "mobile-app-development",
  /* SEO and Digital Marketing were both "a person at two monitors", so next to
     Web Development and AI the four cards read as the same picture. SEO now
     uses the storefront + map-listings photo (what ranking actually looks like
     to a customer) and Digital Marketing the content-calendar flatlay (the
     campaigns and posts themselves). Both files were already in the brand set. */
  "seo-services": "local-seo",
  "digital-marketing": "facebook-instagram-ads",
  "ai-solutions": "ai-solutions",
  /* The two store cards were both "a laptop with a product grid on a counter"
     (skincare vs boutique). Shopify now shows the clothing-rail + phone
     storefront scene (a direct-to-consumer brand launch) and E-Commerce the
     jewellery counter (a custom catalogue with per-product detail). POS keeps
     the till photo — it is the only shot on the site with an actual terminal,
     printer and scanner, which is exactly what that service is. */
  "ecommerce-shopify": "facebook-instagram-shop",
  "ecommerce-development": "jewellery-store",
};

/**
 * Two services use the premium "device on a lit surface" brand renders that
 * live in /brand/home (the deck set) instead of a /brand/services photo: the
 * card and the detail page must show the same picture, and these are the
 * cleanest web/laptop and phone shots in the repo.
 */
const fullPathOverrides: Record<string, string> = {
  "web-development": "/brand/services/website-security.jpg",
  "mobile-app-development": "/brand/home/deck-mobile-app-development-v3.jpg",
};

/** Custom photography for each service card and detail page. */
export function servicePhoto(slug: string) {
  return fullPathOverrides[slug] ?? `/brand/services/${photoFile[slug] ?? slug}.jpg`;
}

export const serviceImageAlts: Record<string, string> = {
  "web-development": "Dark studio desk with a secure website admin panel glowing on screen",
  "custom-web-application-development": "Engineer working on a custom web application dashboard across dual monitors",
  "ecommerce-development": "Jewellery counter with a custom store's product page open on a laptop",
  "ecommerce-shopify": "Fashion rail with a Shopify storefront open on a phone and a laptop",
  "woocommerce-development": "Commerce studio with a storefront and shop dashboard on a desktop screen",
  "wordpress-development": "Editorial office with a content management editor and blog layout on an iMac",
  "custom-cms-development": "Team reviewing structured content blocks on a custom CMS",
  "android-app-development": "Android app listing and Play Console screens ready for store submission",
  "ios-app-development": "iPhone app listing beside an App Store publishing dashboard",
  "flutter-app-development": "Professional using a cross-platform business app in a glass office lobby",
  "mobile-app-development": "Two phones showing a mobile app dashboard, maps and profile screens",
  "game-development": "Game studio desk with a 3D engine viewport and a controller",
  "custom-software-development": "Leadership team reviewing a custom operations dashboard in a boardroom",
  "enterprise-software-solutions": "Executives reviewing an operations dashboard in a glass conference room",
  "saas-application-development": "Laptop showing a SaaS product with billing and admin charts in a loft studio",
  "api-development": "SaaS product billing and connected-systems charts on a laptop",
  "ai-solutions": "A glowing AI neural sphere held in an open hand",
  "pos-software": "Retail counter with a touchscreen POS terminal, scanner and tap-to-pay",
  "inventory-management-software": "Warehouse worker scanning pallet stock on an industrial tablet",
  "crm-erp-solutions": "Sales operations monitor showing a CRM pipeline and contact cards",
  "real-estate-portals": "Property listing portal on a laptop beside a housing-society architectural model",
  "hospital-medical-portals": "Doctor reviewing a patient records portal on a tablet in a modern clinic",
  "education-portals": "Student using a university portal on a laptop in a campus library",
  "ui-ux-design": "Product designer arranging interface frames and phone mockups on a large display",
  "graphic-design": "Graphic design desk with printed proofs, colour swatches and an iPad",
  "logo-brand-identity": "Brand identity still life with stationery, a brand book and mark sketches",
  "amazon-store-setup": "Marketplace seller packing brown shipping boxes with a product listing on a laptop",
  "ebay-store-setup": "Collectibles being photographed for an online auction listing",
  "etsy-store-setup": "Handmade ceramics on a photography sweep for a craft shop listing",
  "walmart-marketplace": "Retail aisle with a merchandiser reviewing a marketplace catalogue on a tablet",
  "tiktok-shop-setup": "Creator filming products for a live shop with a ring light and tripod",
  "facebook-instagram-shop": "Fashion studio with a phone product grid and clothing rack",
  "google-merchant-center": "Product feed spreadsheet and shopping-ad previews on a dual-monitor desk",
  "digital-marketing": "Dark desk with a live product campaign table on a laptop and a creative on a phone",
  "social-media-marketing": "Content-calendar flatlay with a camera, phone and editorial notes",
  "seo-services": "City storefront beside a phone showing the local map pack and review listings",
  "technical-seo": "Technical SEO workstation with a crawl table and HTML inspector",
  "local-seo": "City storefront with a phone showing a local map pack in the foreground",
  "website-speed-optimization": "Website performance scores and a stopwatch on a studio desk",
  "conversion-rate-optimization": "Two landing-page variants with a heatmap overlay on a large monitor",
  "google-ads": "Paid-search dashboard with graphs and search-ad previews on a widescreen",
  "facebook-instagram-ads": "Sponsored social creative on a phone beside an ads campaign grid",
  "tiktok-ads": "Vertical product video being filmed for short-form advertising",
  "linkedin-ads": "B2B professional reviewing a sponsored campaign on a laptop",
  "email-marketing": "Newsletter layout and campaign metrics on an iMac",
  "content-marketing": "Writer editing long-form drafts at an editorial desk",
  "online-reputation-management": "Tablet showing review cards while a manager writes a reply",
  "app-store-optimization": "App listing screenshots on a pinboard with keyword notes",
  "google-admob": "Mobile game on a phone with a native ad card and revenue charts",
  "app-monetization": "In-app subscription paywall on a smartphone beside a revenue graph",
  "firebase-integration": "Business mobile app in use with cloud messaging and analytics behind it",
  "google-adsense": "Publisher website with ad slots and RPM charts on dual screens",
  "google-play-console": "Android tablet showing an app-store developer listing ready to submit",
  "app-store-publishing": "iPhone app listing and a store submission form on a MacBook",
  "app-maintenance": "Business user checking a live mobile app after a maintenance release",
  "web-hosting": "Modern datacenter corridor with rows of server racks",
  "website-maintenance": "Editorial CMS and blog layout on an iMac in a content studio",
  "website-security": "Security operations desk with access logs and a lock-status dashboard",
  "it-consulting": "Consultant presenting a systems diagram on a glass whiteboard to clients",
  "devops-cloud-solutions": "Cloud operations monitors showing a CI/CD pipeline and cluster graph",
};
