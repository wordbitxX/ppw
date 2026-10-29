/**
 * Pakistan pages — /pk and /pk/web-design-<city>.
 *
 * House rules for this file, taken from the owner's brief:
 *  1. Never invent a price, a client, a result, a review, a timeline or a link.
 *  2. Anything the owner has not confirmed lives in `pkPricing` as `null`.
 *     Those slots render an honest, non-numeric line and are listed in the
 *     dev-only checklist banner at the top of the page. Paste a number here
 *     and every price slot on /pk and on all five city pages updates at once.
 *  3. Every link below points at a page that already exists in this app.
 *
 * Prices are integers in PKR. Example: businessWebsite: 45000.
 */
import type { Faq } from "@/lib/types";
import { siteConfig, whatsappLink } from "@/lib/site";

export type PkFaq = {
  q: string;
  a: string;
  /** Real destinations rendered as link chips under the answer. */
  links?: { label: string; href: string }[];
};

export type PkPrice = number | null;

/** Do not change these to a guess. They are the owner's numbers to give. */
export const pkPricing: {
  /** Section 10 of the brief — Business Website, from price. */
  businessWebsite: PkPrice;
  /** Website + domain + 1 year hosting, from price. */
  allInOne: PkPrice;
  /** Year-2 renewal (domain + hosting). */
  renewalYear2: PkPrice;
  /** Post-launch support window, in months. */
  supportMonths: PkPrice;
  /** Monthly care plan, if offered. */
  maintenanceMonthly: PkPrice;
  /** Cal.com / Calendly link. Null falls back to /contact, as briefed. */
  bookingUrl: string | null;
  /** Published working hours, e.g. "Mon–Sat, 10am–7pm PKT". */
  hours: string | null;
} = {
  businessWebsite: null,
  allInOne: null,
  renewalYear2: null,
  supportMonths: null,
  maintenanceMonthly: null,
  bookingUrl: null,
  hours: null,
};

/** Update this whenever prices, packages or copy on the Pakistan pages change. */
export const pkUpdated = { iso: "2026-10-29", label: "October 2026" };

export const pkCallHref = `tel:${siteConfig.phoneRaw}`;

export const pkWhatsAppHref = whatsappLink(
  "Hello WordbitX, I saw the Pakistan prices page and would like a quote for a website.",
);

export const pkBookingHref = pkPricing.bookingUrl ?? "/contact";

export const pkAddress = siteConfig.addressDisplay;
export const pkEmail = siteConfig.email;
export const pkPhone = siteConfig.phoneDisplay;
export const pkUsPhone = siteConfig.usPhoneDisplay;

/** 45000 → "Rs. 45,000". No locale surprises between build machines. */
export function pkr(value: number): string {
  return `Rs. ${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/** "from Rs. 45,000" — or an honest line while the owner's number is pending. */
export function fromPrice(value: PkPrice): string {
  return value == null ? "Fixed in writing" : `from ${pkr(value)}`;
}

/** Compact price used inside cards. */
export function priceLead(value: PkPrice): string {
  return value == null ? "Fixed quote" : `from ${pkr(value)}`;
}

/** Only emit a schema price range when both ends are real numbers. */
export function pkPriceRange(): string | null {
  if (pkPricing.businessWebsite == null || pkPricing.allInOne == null) return null;
  return `${pkr(pkPricing.businessWebsite)} – ${pkr(pkPricing.allInOne)}`;
}

/** Hero price block. Large type, no invented digits. */
export const pkHeroPrice = {
  eyebrow: "Website packages",
  headline:
    pkPricing.businessWebsite == null
      ? "Clear PKR pricing, fixed in writing"
      : `Websites from ${pkr(pkPricing.businessWebsite)}`,
  detail:
    pkPricing.businessWebsite == null
      ? "Two packages below — website only, or website with domain and hosting."
      : "Two packages below. Scope, price and dates are agreed in writing before work starts.",
};

/**
 * The owner checklist. Rendered only in development, so the preview shows what
 * is still missing while production pages never display a placeholder.
 */
export const pkPending: string[] = [
  ...(pkPricing.businessWebsite == null ? ["Business Website — from price (PKR)"] : []),
  ...(pkPricing.allInOne == null ? ["Website + Domain + Hosting — from price (PKR)"] : []),
  ...(pkPricing.renewalYear2 == null ? ["Year-2 renewal price (PKR/year)"] : []),
  ...(pkPricing.supportMonths == null ? ["Support period (months)"] : []),
  ...(pkPricing.maintenanceMonthly == null ? ["Care plan price (PKR/month), if offered"] : []),
  ...(pkPricing.bookingUrl == null ? ["Free-call booking link (button falls back to /contact)"] : []),
  ...(pkPricing.hours == null ? ["Published working hours"] : []),
  "Confirm the public street address (currently shown as DHA Phase 2, Lahore)",
  "Confirm sample permissions and any verified case-study numbers",
];

export const pkTrust = [
  { title: "Since 2021", body: "Lahore, Pakistan" },
  { title: "You own everything", body: "Code, repo, hosting and logins, yours at handover" },
  { title: "Written scope", body: "Before any build starts" },
  {
    title: pkPricing.supportMonths == null ? "Support after launch" : `Support: ${pkPricing.supportMonths} months`,
    body:
      pkPricing.supportMonths == null
        ? "Included — length on your written quote"
        : "Post-launch window included",
  },
];

export type PkPackage = {
  id: string;
  name: string;
  tagline: string;
  price: PkPrice;
  popular: boolean;
  bullets: string[];
  footnote: string;
};

export const pkPackages: PkPackage[] = [
  {
    id: "business-website",
    name: "Business Website",
    tagline: "A website that makes the phone ring.",
    price: pkPricing.businessWebsite,
    popular: false,
    bullets: [
      "Mobile-first website, built for phones and Pakistani mobile data",
      "Contact form and WhatsApp button on every page",
      "Google-ready setup: page titles, sitemap, Search Console, basic SEO",
      "Training session so you can edit text and images yourself",
      "Post-launch support window — stated on your written quote",
    ],
    footnote: "Extra pages, copywriting and Urdu translation are quoted in writing, not added silently.",
  },
  {
    id: "all-in-one",
    name: "Website + Domain + Hosting",
    tagline: "The one most businesses take.",
    price: pkPricing.allInOne,
    popular: true,
    bullets: [
      "Everything in the Business Website package",
      "Domain registered in your own name, included",
      "1 year of hosting included",
      "Email-ready DNS setup — your mailbox stays yours",
      "Year-2 renewal written on your quote before you start",
      "Support window stated on your written quote",
    ],
    footnote: "Renewal after year one is agreed up front, so there is no surprise in month 13.",
  },
];

export const pkQuoteLine =
  "Online stores, apps, POS/CRM and custom software are quoted after a free call — you get a fixed written quote before any work starts.";

export const pkIncluded = [
  { title: "Mobile-first website", body: "Designed for the phone your customer is holding, not a desktop mockup." },
  { title: "Contact and chat buttons", body: "Call, WhatsApp and an enquiry form on every page, going to your phone." },
  { title: "Google-ready setup", body: "Titles, sitemap, Search Console and a Google Business Profile check." },
  { title: "Training to edit it yourself", body: "A short session plus a written guide, recorded on your own site." },
  { title: "Post-launch support", body: "A fixed support window after launch, stated on your quote." },
  { title: "Fixed written quote", body: "Scope, pages, price in rupees and dates before work starts." },
];

export const pkFacts = [
  { label: "Legal name", value: siteConfig.legalName },
  { label: "Founded", value: "2021, Lahore, Pakistan" },
  { label: "Registered", value: "SECP and FBR" },
  { label: "Base", value: "DHA Phase 2, Lahore — work across Pakistan" },
  { label: "Own product", value: "Properties Pak, a live property portal" },
  { label: "Last updated", value: pkUpdated.label },
];

export const pkAbout = [
  "WordbitX is a software company in Lahore. We build websites, online stores, mobile apps, POS and CRM systems, and custom software for businesses across Pakistan — and we run our own product, Properties Pak, a property portal that is live and open to the public today.",
  "Most work runs over WhatsApp, calls and screen sharing. If you are in Lahore, an in-person scoping meeting is a short drive rather than a video call.",
];

export const pkServices = [
  {
    title: "Website design",
    body: "Business websites, landing pages and redesigns. Mobile-first, fast on Pakistani mobile networks, with an admin you can use.",
    href: "/services/web-development",
    hrefLabel: "Website development",
  },
  {
    title: "Custom website and web apps",
    body: "Portals, dashboards and marketplaces built around your actual workflow instead of squeezed into a theme.",
    href: "/services/custom-web-application-development",
    hrefLabel: "Custom web applications",
  },
  {
    title: "E-commerce, Shopify and WooCommerce",
    body: "Stores with cash on delivery, courier handoff, documented payment options and an order screen your team can run.",
    href: "/services/ecommerce-shopify",
    hrefLabel: "Shopify development",
  },
  {
    title: "Mobile apps",
    body: "Android and iOS apps in Flutter or native, with the admin panel and API behind them, published on your developer accounts.",
    href: "/services/mobile-app-development",
    hrefLabel: "Mobile app development",
  },
  {
    title: "POS and business software",
    body: "Retail and pharmacy POS, inventory, school and clinic systems. Offline-capable billing where the counter needs it.",
    href: "/services/pos-software",
    hrefLabel: "POS software",
  },
  {
    title: "SEO and maintenance",
    body: "Local SEO on a monthly allowance, plus updates, backups, security and small fixes on a care plan.",
    href: "/services/seo-services",
    hrefLabel: "SEO services",
  },
];

export const pkReasons = [
  { title: "Experience since 2021", body: "Five years of shipping real systems, not a first project on a template." },
  { title: "Fixed written quote", body: "Scope, price in rupees and dates agreed before work starts." },
  { title: "You own everything", body: "Code, repository, hosting, domain and admin logins in your accounts at handover." },
  { title: "Built for Pakistani networks", body: "Tested on mobile data, not just office wifi." },
  { title: "Urdu and English", body: "Bilingual pages where they help, set by someone who reads Urdu." },
  { title: "Registered company", body: "SECP and FBR registered in Lahore. Invoices in PKR." },
];

/** Live, clickable WordbitX builds. Demo work is labelled Demo everywhere. */
export const pkSamples = [
  {
    demoId: "properties-pak",
    type: "Property portal",
    industry: "Real estate",
    built: "Society, phase and block listings, map-led search, plot/file pages and dealer enquiries.",
    project: { href: "/portfolio/properties-pak-property-portal", label: "View project profile" },
  },
  {
    demoId: "motor",
    type: "Marketplace website",
    industry: "Automotive",
    built: "21 brands with EV and hybrid filters, listing and showroom pages, English and Urdu.",
    project: { href: "/products/motor", label: "View project page" },
  },
  {
    demoId: "healthcare",
    type: "Clinic website",
    industry: "Healthcare",
    built: "Filterable service catalogue with PKR fees, slot booking and WhatsApp handoff.",
    project: { href: "/products/healthcare", label: "View project page" },
  },
  {
    demoId: "education",
    type: "School and academy platform",
    industry: "Education",
    built: "37 modules across 5 role portals, with fee collection wired to JazzCash and Easypaisa.",
    project: { href: "/products/education", label: "View project page" },
  },
  {
    demoId: "ecommerce",
    type: "Online store",
    industry: "Retail and e-commerce",
    built: "9 departments, 8 currencies, product detail pages and a full cart and checkout flow.",
    project: { href: "/products/ecommerce", label: "View project page" },
  },
  {
    demoId: "luxury-restaurant",
    type: "Restaurant website",
    industry: "Restaurants and cafés",
    built: "40-dish menu with dietary filters, online ordering and table reservation flows.",
    project: { href: "/products/luxury-restaurant", label: "View project page" },
  },
];

export const pkSampleDisclosure =
  "Properties Pak is WordbitX's own live product. The other five are real WordbitX demo builds, hosted and clickable, and they are labelled Demo — they are not presented as client projects. Confidential client work is shown as scope only, never with an invented client name, logo or screenshot.";

/** Only rows with a real destination are links. Everything else is plain text. */
export const pkIndustries: { label: string; href?: string }[] = [
  { label: "Real estate", href: "/industries/real-estate" },
  { label: "Retail and fashion", href: "/industries/retail" },
  { label: "Restaurants and cafés", href: "/industries/hospitality" },
  { label: "Clinics and hospitals", href: "/industries/healthcare" },
  { label: "Schools and academies", href: "/industries/education" },
  { label: "Manufacturers and exporters", href: "/industries/manufacturing" },
  { label: "Travel and tourism", href: "/industries/travel" },
  { label: "Salons", href: "/industries/salon-beauty" },
  { label: "Gyms", href: "/industries/fitness" },
  { label: "Law firms", href: "/industries/legal" },
  { label: "Construction", href: "/industries/construction" },
  { label: "E-commerce brands", href: "/industries/ecommerce" },
  { label: "Logistics", href: "/industries/logistics" },
  { label: "Pharmacies", href: "/industries/pharmacy" },
  { label: "Finance", href: "/industries/finance" },
  { label: "Hotels", href: "/industries/hospitality" },
  { label: "Furniture" },
  { label: "Electronics" },
  { label: "NGOs" },
  { label: "IT and software" },
];

export const pkCities = {
  linked: [
    { name: "Lahore", href: "/pk/web-design-lahore", note: "Our base — in-person meetings" },
    { name: "Karachi", href: "/pk/web-design-karachi", note: "Trade, logistics and services" },
    { name: "Islamabad", href: "/pk/web-design-islamabad", note: "Consultancies and institutions" },
    { name: "Rawalpindi", href: "/pk/web-design-rawalpindi", note: "Wholesale, property and academies" },
    { name: "Faisalabad", href: "/pk/web-design-faisalabad", note: "Textiles and exporters" },
  ],
  plain: ["Gujranwala", "Sialkot", "Gujrat", "Multan", "Peshawar", "Quetta", "Hyderabad"],
};

export const pkPakistan = [
  {
    title: "Cash on delivery",
    body: "COD checkout with order confirmation, a courier-ready packing list and admin screens built for it.",
  },
  {
    title: "JazzCash, Easypaisa and cards",
    body: "Wired where the provider's API supports your business type, then tested end to end before launch.",
  },
  {
    title: "PKR pricing and invoices",
    body: "Quotes, invoices and receipts in rupees, with the tax fields your accountant asks for.",
  },
  {
    title: "Courier-ready orders",
    body: "Order exports and tracking numbers that match how Leopards, TCS and local riders actually work.",
  },
  {
    title: "Urdu and English content",
    body: "Bilingual pages and right-to-left layout where it helps, with the Urdu checked by a reader.",
  },
  {
    title: "FBR-ready POS",
    body: "POS builds carry the invoice fields Pakistani retail needs; FBR integration is scoped per business.",
  },
];

export const pkSteps = [
  {
    title: "Free chat or call",
    body: "Tell us what the business does, the pages you need and what the site must achieve. No charge, no obligation.",
  },
  {
    title: "Fixed written quote",
    body: "Scope, timeline and price in rupees, in writing, before any work starts.",
  },
  {
    title: "Design and build",
    body: "Mobile-first, on a staging link you can open, with weekly demos as the work moves.",
  },
  {
    title: "Launch and support",
    body: "Launch on your domain, a training session for your team, then the support window from your quote.",
  },
];

export const pkTimelineNote =
  "A small business website is measured in weeks, not months. A custom build is scoped in phases and the dates go on paper. We do not promise a week for a custom site.";

export const pkFaqs: PkFaq[] = [
  {
    q: "How much does a website cost in Pakistan?",
    a: "The two website packages and exactly what each includes are on this page. The rupee figure depends on page count, content and any extras, and it is fixed in writing before work starts. If you want the market context first, read our website cost guide for Pakistan.",
    links: [
      { label: "Website cost in Pakistan", href: "/blog/website-development-cost-pakistan" },
      { label: "How we quote", href: "/pricing" },
    ],
  },
  {
    q: "What does the renewal cost after the first year?",
    a: "The year-2 renewal is written on your quote before you pay anything, so there is no surprise in month 13. The domain stays in your name and hosting renews at the figure on that quote.",
    links: [
      { label: "Hosting", href: "/services/web-hosting" },
      { label: "Ask for a quote", href: "/contact" },
    ],
  },
  {
    q: "Is support included? For how long?",
    a: "Yes. Every website package includes a post-launch support window, and the length is stated on your written quote rather than left vague. After that window, a monthly care plan covers updates, backups, security and small fixes.",
    links: [{ label: "Website maintenance plans", href: "/services/website-maintenance" }],
  },
  {
    q: "Do I own my website, code and domain?",
    a: "Yes. On final payment, the domain, hosting, repository and admin logins sit in your accounts and the code is handed over. You are not renting your own website from us.",
    links: [{ label: "About WordbitX", href: "/about" }],
  },
  {
    q: "How long does a website take?",
    a: "A small business website is measured in weeks, not months. A custom build is scoped in phases, and the dates are agreed in writing. We do not promise one week for a custom site.",
    links: [{ label: "Our process", href: "/process" }],
  },
  {
    q: "Can you build a website in Urdu or bilingual Urdu and English?",
    a: "Yes. We build Urdu pages, bilingual sites and right-to-left layouts where the design needs it, and the Urdu is checked by someone who reads it. English-first sites with an Urdu section are the most common request.",
    links: [{ label: "Website development", href: "/services/web-development" }],
  },
  {
    q: "Do you build online stores with cash on delivery?",
    a: "Yes. COD is the default checkout in Pakistan, so it is built in: order confirmation, a packing list, courier handoff and admin screens your team can run. Advance payment, bank transfer and cards can sit beside it.",
    links: [
      { label: "E-commerce development", href: "/services/ecommerce-development" },
      { label: "E-commerce cost guide", href: "/blog/ecommerce-website-cost-pakistan" },
    ],
  },
  {
    q: "Can you add JazzCash or Easypaisa to my store?",
    a: "Where the provider's API supports your business type, yes — we wire the checkout, confirm each payment on your side and test it end to end before launch. Some accounts need a registered business and merchant approval first, and we will say so before you pay us.",
    links: [{ label: "Shopify and store builds", href: "/services/ecommerce-shopify" }],
  },
  {
    q: "Do you build FBR POS integrated software?",
    a: "We build POS for retail, pharmacy and restaurants with the invoice fields Pakistani businesses need. FBR integration is scoped per business, because the requirement depends on your registration and the current rules — it is confirmed in writing before we quote.",
    links: [{ label: "POS software", href: "/services/pos-software" }],
  },
  {
    q: "Which cities do you serve? Do you work outside Lahore?",
    a: "We are based in Lahore and work across Pakistan — Karachi, Islamabad, Rawalpindi, Faisalabad, Gujranwala, Sialkot, Multan and beyond. Most work runs over WhatsApp, calls and screen sharing.",
    links: [
      { label: "Karachi", href: "/pk/web-design-karachi" },
      { label: "Islamabad", href: "/pk/web-design-islamabad" },
      { label: "All cities", href: "/software-house" },
    ],
  },
  {
    q: "Can you redesign my existing website without losing Google rankings?",
    a: "Usually yes, and the first step is an audit: what the site ranks for now, which URLs bring traffic, and what has to be redirected. We keep or redirect the URLs that matter instead of starting from a blank page.",
    links: [
      { label: "SEO services", href: "/services/seo-services" },
      { label: "Technical SEO", href: "/services/technical-seo" },
    ],
  },
  {
    q: "Do you offer monthly SEO? Is it month-to-month?",
    a: "Yes — monthly SEO on a written allowance, month to month, with a short monthly report of what ran and what is next. No ranking guarantees, because nobody can honestly promise a position.",
    links: [
      { label: "SEO services", href: "/services/seo-services" },
      { label: "Local SEO", href: "/services/local-seo" },
    ],
  },
  {
    q: "Is WordbitX a registered company?",
    a: "Yes. WordbitX TECHNOLOGY SMC – PVT. LTD. is registered with SECP and FBR, founded in 2021 and based in Lahore. Pakistan clients are invoiced in PKR.",
    links: [{ label: "About the company", href: "/about" }],
  },
  {
    q: "Which platform do you build on — WordPress, Shopify or custom?",
    a: "Whichever fits the job. WordPress for content-led sites you edit yourself, Shopify for retail brands that want the retail stack, and custom builds for portals, marketplaces and anything with real logic. We will tell you when the cheaper option is the right one.",
    links: [
      { label: "WordPress", href: "/services/wordpress-development" },
      { label: "Shopify", href: "/services/ecommerce-shopify" },
      { label: "Custom web apps", href: "/services/custom-web-application-development" },
    ],
  },
  {
    q: "How do I start? What happens after I message you?",
    a: "Message us on WhatsApp or book a free call and tell us what the business does and what the site must achieve. You get a short reply, a few questions, then a fixed written quote with scope, price in rupees and dates. Work starts only when you approve it.",
    links: [
      { label: "Book a free call", href: pkBookingHref },
      { label: "Contact page", href: "/contact" },
    ],
  },
];

/** Schema needs plain question/answer pairs; links stay visible in the UI. */
export const pkFaqsForSchema: Faq[] = pkFaqs.map((faq) => ({ question: faq.q, answer: faq.a }));

export function pkMetaTitle(city?: string): string {
  const priced = pkPricing.businessWebsite != null;
  if (city) {
    return priced ? `Web Design in ${city} — PKR Prices | WordbitX` : `Web Design in ${city} | WordbitX`;
  }
  return priced ? "Website Design in Pakistan — PKR Prices | WordbitX" : "Website Design in Pakistan | WordbitX";
}

export const pkMetaDescription =
  "Pakistan-based software company in Lahore. Website packages in PKR with domain and hosting options, live samples, and a fixed written quote before work starts.";
