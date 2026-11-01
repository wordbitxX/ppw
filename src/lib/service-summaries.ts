import { fixedPackages, priceTiers, storePrices } from "@/lib/price-ladder";

/**
 * The plain-language summary box at the top of every service page.
 *
 * Why: a service page opens with a long h1 and a tagline written for search,
 * and a first-time visitor still cannot answer the two questions they came
 * with — "what do I actually get?" and "what does it cost?". This box answers
 * both in two or three lines, in words a shop owner can read once, before all
 * the technical detail below it. The existing page content is untouched.
 *
 * Price strings are interpolated from `price-ladder.ts`, the site's single
 * source of truth for published numbers, so a price change lands in one file.
 * Where the site publishes no starting price (design, marketplace set-up,
 * retainers without a public rate) the box says so plainly rather than
 * inventing a number.
 */

const PRICE = {
  web: `from ${fixedPackages.pk.starter} for a standard 5–10 page site, or ${fixedPackages.us.starter} for US clients`,
  store: `from ${storePrices.pkr.label} in Pakistan, or ${storePrices.usd.label} for US clients`,
  custom: `from ${priceTiers.custom.pkrLabel} in Pakistan, or ${priceTiers.custom.usdLabel} for US clients`,
  app: `from ${priceTiers.app.pkrLabel} in Pakistan, or ${priceTiers.app.usdLabel} for US clients`,
  seo: `a monthly retainer — ${fixedPackages.us.seo} for US clients, PKR agreed on scope`,
  care: `a monthly care plan — ${fixedPackages.us.care} for US clients, PKR agreed on scope`,
  ads: "a monthly retainer, quoted on the ad budget you want managed — the platform spend stays in your own account",
  quote: "a written quote after a short brief; there is no public sticker price",
} as const;

type ServiceSummary = {
  /** What the client gets, in plain words. Two lines maximum. */
  plain: string;
  /** What it costs from. One line. */
  from: string;
};

export const serviceSummaries: Record<string, ServiceSummary> = {
  "web-development": {
    plain:
      "A fast, mobile-first website that says what you do and makes it easy to call, message or buy — and that Google can actually find.",
    from: PRICE.web,
  },
  "mobile-app-development": {
    plain:
      "One app for Android and iPhone, built for your customers or your own staff, including the admin side that runs it.",
    from: PRICE.app,
  },
  "custom-software-development": {
    plain:
      "Software shaped around the way your team already works — billing, stock, bookings or approvals — instead of a generic tool you bend to fit.",
    from: PRICE.app,
  },
  "ai-solutions": {
    plain:
      "AI added where it saves real hours: reading documents, answering questions from your own files, or drafting the next step for a person to approve.",
    from: PRICE.custom,
  },
  "ecommerce-shopify": {
    plain:
      "A Shopify store that looks like your brand: products, payments, delivery charges and the apps it needs, set up in your own account.",
    from: PRICE.store,
  },
  "pos-software": {
    plain:
      "A till system for the counter: quick billing, barcode scanning, stock that updates itself and a report the owner can read on a phone.",
    from: PRICE.app,
  },
  "ui-ux-design": {
    plain:
      "Screens designed and agreed before anything is coded, so you can see and test the product early and developers stop guessing.",
    from: PRICE.quote,
  },
  "digital-marketing": {
    plain:
      "One team running the ads, content and follow-up that bring enquiries, reported on leads rather than likes.",
    from: PRICE.ads,
  },
  "seo-services": {
    plain:
      "Work that helps your pages rank for what customers actually type — technical fixes, useful content and local listings.",
    from: PRICE.seo,
  },
  "app-store-optimization": {
    plain:
      "Making your app findable in Google Play and the App Store: name, screenshots, keywords and rating prompts.",
    from: PRICE.quote,
  },
  "wordpress-development": {
    plain:
      "A WordPress site you can edit yourself — pages, blog and updates kept simple, fast and secure.",
    from: PRICE.web,
  },
  "crm-erp-solutions": {
    plain:
      "One place for leads, customers, stock and invoices, so sales and accounts stop keeping separate spreadsheets.",
    from: PRICE.app,
  },
  "game-development": {
    plain:
      "A playable game for mobile, web or desktop — concept, art direction, build and store release.",
    from: PRICE.custom,
  },
  "devops-cloud-solutions": {
    plain:
      "Servers, backups, deploy pipelines and monitoring set up properly, so releases are boring and outages are short.",
    from: PRICE.custom,
  },
  "inventory-management-software": {
    plain:
      "Accurate stock across shops and warehouses: purchases, transfers, stock counts and low-stock alerts in one system.",
    from: PRICE.app,
  },
  "real-estate-portals": {
    plain:
      "A property portal with societies, plots and files, map search, instalment plans and dealer enquiries.",
    from: PRICE.app,
  },
  "hospital-medical-portals": {
    plain:
      "A clinic or hospital site with services, doctor schedules, appointment booking and patient records.",
    from: PRICE.app,
  },
  "education-portals": {
    plain:
      "A school system for admissions, fees, attendance and results, with portals for parents, teachers and admin.",
    from: PRICE.app,
  },
  "ecommerce-development": {
    plain:
      "A custom online store — catalogue, cart, checkout, delivery charges and payments — built for your products and your market.",
    from: PRICE.custom,
  },
  "android-app-development": {
    plain:
      "An Android app published on Google Play, built for the phones your customers actually carry.",
    from: PRICE.app,
  },
  "ios-app-development": {
    plain:
      "An iPhone and iPad app published to the App Store, built to Apple's review rules.",
    from: PRICE.app,
  },
  "social-media-marketing": {
    plain:
      "A posting plan, the posts themselves and paid boosts that keep your pages active and bring in enquiries.",
    from: PRICE.ads,
  },
  "google-admob": {
    plain:
      "Ad placements inside your app that earn without wrecking the experience people came for.",
    from: PRICE.quote,
  },
  "google-adsense": {
    plain:
      "Ad slots on your website, placed so they earn something without slowing the site down.",
    from: PRICE.quote,
  },
  "google-play-console": {
    plain:
      "Your Play Console set up properly — listing, releases, test tracks and policy checks — so the app is not rejected.",
    from: PRICE.quote,
  },
  "app-store-publishing": {
    plain:
      "The release checklist handled for you: store assets, listing text, review notes and a clean first publish.",
    from: PRICE.quote,
  },
  "custom-web-application-development": {
    plain:
      "A web app your team logs into — dashboards, roles and the workflow you actually run the business on.",
    from: PRICE.app,
  },
  "woocommerce-development": {
    plain:
      "An online store on WordPress and WooCommerce that you can run and edit without calling a developer.",
    from: PRICE.store,
  },
  "custom-cms-development": {
    plain:
      "A simple admin panel built around your content, so updating the site takes minutes.",
    from: PRICE.custom,
  },
  "flutter-app-development": {
    plain:
      "One codebase that ships to both Android and iPhone, so the app costs less to build and less to maintain.",
    from: PRICE.app,
  },
  "enterprise-software-solutions": {
    plain:
      "Internal software for teams with roles and approvals — audit trails, integrations and reports management trusts.",
    from: PRICE.app,
  },
  "saas-application-development": {
    plain:
      "A subscription product: accounts, plans, billing, admin and the dashboards your customers log into.",
    from: PRICE.app,
  },
  "api-development": {
    plain:
      "A clean, documented API so your systems, apps or partners can talk to each other safely.",
    from: PRICE.custom,
  },
  "graphic-design": {
    plain:
      "Marketing graphics, social posts and print pieces that look consistent with the rest of your brand.",
    from: PRICE.quote,
  },
  "logo-brand-identity": {
    plain:
      "A logo plus the rules around it — colours, fonts and templates — so everything you publish looks like one brand.",
    from: PRICE.quote,
  },
  "amazon-store-setup": {
    plain:
      "A seller account, listings and brand store on Amazon, with images, keywords and pricing set up to sell.",
    from: PRICE.quote,
  },
  "ebay-store-setup": {
    plain:
      "An eBay shop with clean listings, templates and policies that protect your seller feedback.",
    from: PRICE.quote,
  },
  "etsy-store-setup": {
    plain:
      "An Etsy shop built for craft buyers: photographs, titles, tags and sections that get found in search.",
    from: PRICE.quote,
  },
  "walmart-marketplace": {
    plain:
      "Walmart Marketplace approval, a catalogue feed and listings that meet their requirements.",
    from: PRICE.quote,
  },
  "tiktok-shop-setup": {
    plain:
      "TikTok Shop set up with your catalogue, shipping rules and the product links creators can sell from.",
    from: PRICE.quote,
  },
  "facebook-instagram-shop": {
    plain:
      "Instagram and Facebook shops joined to your catalogue, so people can buy without leaving the app.",
    from: PRICE.quote,
  },
  "google-merchant-center": {
    plain:
      "Your product feed inside Merchant Center — approved, error-free and ready for Shopping ads.",
    from: PRICE.quote,
  },
  "local-seo": {
    plain:
      "Getting found in \"near me\" searches: Google Business Profile, city pages, directory listings and reviews.",
    from: PRICE.seo,
  },
  "technical-seo": {
    plain:
      "Fixing what search engines trip over — speed, indexing, broken links, structured data and mobile problems.",
    from: PRICE.seo,
  },
  "website-speed-optimization": {
    plain:
      "Making your site load in a couple of seconds on a phone, which lifts both rankings and sales.",
    from: PRICE.care,
  },
  "conversion-rate-optimization": {
    plain:
      "Changes to pages and forms that turn more of the visitors you already have into enquiries and orders.",
    from: PRICE.care,
  },
  "app-maintenance": {
    plain:
      "Updates, crash fixes and phone-OS changes handled, so your app keeps working long after launch.",
    from: PRICE.care,
  },
  "app-monetization": {
    plain:
      "A plan for earning from the app — ads, in-app purchases or subscriptions — set up and measured.",
    from: PRICE.quote,
  },
  "firebase-integration": {
    plain:
      "Login, push notifications, live data and crash reports wired into your app.",
    from: PRICE.custom,
  },
  "google-ads": {
    plain:
      "Search and Shopping ads run by people who read the enquiry, not just the click, with a monthly report.",
    from: PRICE.ads,
  },
  "facebook-instagram-ads": {
    plain:
      "Meta campaigns built around a real offer, with audiences, creatives and follow-up that produce enquiries.",
    from: PRICE.ads,
  },
  "tiktok-ads": {
    plain:
      "Short-video ads made for TikTok, tested on small budgets before anything is scaled.",
    from: PRICE.ads,
  },
  "linkedin-ads": {
    plain:
      "Business-to-business campaigns aimed at job titles and industries, with lead forms that land in your CRM.",
    from: PRICE.ads,
  },
  "email-marketing": {
    plain:
      "A mailing list you own, with newsletters and follow-up sequences that bring repeat business.",
    from: PRICE.ads,
  },
  "content-marketing": {
    plain:
      "Useful articles and guides written for your buyers, published on a schedule you can keep.",
    from: PRICE.seo,
  },
  "online-reputation-management": {
    plain:
      "Reviews and search results for your name handled honestly — ask, reply and publish the proof.",
    from: PRICE.ads,
  },
  "web-hosting": {
    plain:
      "Fast hosting in your own account, with SSL, backups and email records set up correctly.",
    from: PRICE.care,
  },
  "website-maintenance": {
    plain:
      "Monthly updates, backups, security patches and small changes, so the site never quietly breaks.",
    from: PRICE.care,
  },
  "website-security": {
    plain:
      "Hardening and monitoring — firewall, login protection, malware clean-up — plus a plan for the day something goes wrong.",
    from: PRICE.care,
  },
  "it-consulting": {
    plain:
      "An experienced second opinion on what to build, buy or fix, before you spend on the wrong thing.",
    from: PRICE.quote,
  },
};

export function getServiceSummary(slug: string): ServiceSummary | undefined {
  return serviceSummaries[slug];
}
