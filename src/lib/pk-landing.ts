import type { IconName } from "@/lib/types";
import type { Faq } from "@/lib/types";
import type { PkIconName } from "@/components/pk-icons";

/**
 * /pk — the Pakistan landing page.
 *
 * Modelled on the structure of a competitor's country page (price first,
 * everything on one scroll) but with WordbitX's own facts and brand: founded
 * 2021 in Lahore, SECP + FBR registered, Rs. 20,000 / Rs. 25,000 packages.
 *
 * Every number here is either a price the owner has published or a fact that
 * already appears elsewhere on this site. Nothing is copied across from the
 * reference page: no "since 2011", no Gujranwala office, no chamber memberships
 * the company does not hold.
 */

export const pkPrices = {
  basic: "Rs. 20,000",
  allInOne: "Rs. 25,000",
  renewal: "Rs. 10,000",
  supportMonths: 3,
} as const;

export const pkHeroStats = [
  { value: "Since 2021", label: "Building websites" },
  { value: "Lahore", label: "Based in Pakistan" },
  { value: pkPrices.basic, label: "Websites from" },
  { value: "3 months", label: "Support on every package" },
] as const;

export const pkGlanceStats = [
  { value: "Since 2021", label: "Building websites" },
  { value: "6", label: "Markets served" },
  { value: pkPrices.basic, label: "Websites from", highlight: true },
  { value: "3 months", label: "Support included" },
] as const;

/** What the team actually builds on. The Rs. 20,000 package is WordPress; the
 *  rest is quoted per project, so the price cards stay honest. */
export const pkPlatforms = ["WordPress", "WooCommerce", "Shopify", "Custom Next.js builds"] as const;

export const pkIncluded: { title: string; text: string }[] = [
  {
    title: "Mobile-first WordPress website",
    text: "Looks sharp and loads fast on every phone, tablet and desktop.",
  },
  {
    title: "Contact & WhatsApp buttons",
    text: "On every page, so a customer reaches you in one tap.",
  },
  {
    title: "Google-ready setup",
    text: "Basic SEO, sitemap, analytics and Search Console set up for you.",
  },
  {
    title: "Training to edit it yourself",
    text: "Update text, photos and prices without paying a developer.",
  },
  {
    title: "3 months ongoing support",
    text: "Fixes, plugin updates and small changes after launch.",
  },
  {
    title: "Fixed written quote",
    text: "Scope, timeline and price agreed before any work starts.",
  },
];

export type PkPackage = {
  id: string;
  eyebrow: string;
  name: string;
  price: string;
  note: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  /** Prefilled WhatsApp message for this package. */
  message: string;
};

export const pkPackages: PkPackage[] = [
  {
    id: "business-website",
    eyebrow: "Your own domain & hosting",
    name: "Business Website",
    price: pkPrices.basic,
    note: "Use your existing domain and hosting.",
    features: [
      "Mobile-first WordPress website",
      "Contact & WhatsApp buttons on every page",
      "Google-ready setup and basic SEO",
      "Training so you can edit it yourself",
      "3 months ongoing support",
    ],
    message: "Hello WordbitX, I want the Rs. 20,000 Business Website package. Here is my business:",
  },
  {
    id: "all-in-one",
    eyebrow: "All-in-one",
    name: "Website + Domain + Hosting",
    price: pkPrices.allInOne,
    note: "Everything in Business Website, plus:",
    features: [
      "Domain registration included",
      "1 year hosting free",
      "Setup of email-ready DNS",
      `Renewal from ${pkPrices.renewal}/year`,
      "3 months ongoing support",
    ],
    featured: true,
    badge: "Most popular",
    message:
      "Hello WordbitX, I want the Rs. 25,000 Website + Domain + Hosting package. Here is my business:",
  },
];

export const pkServices: { slug: string; title: string; text: string; icon: IconName }[] = [
  {
    slug: "web-development",
    title: "Website design",
    text: "Mobile-first business websites with clear pages and fast loading.",
    icon: "design",
  },
  {
    slug: "wordpress-development",
    title: "WordPress development",
    text: "Custom themes, catalogues and portals your team can edit.",
    icon: "wordpress",
  },
  {
    slug: "ecommerce-shopify",
    title: "Shopify & ecommerce",
    text: "Shopify and WooCommerce stores with PKR pricing, COD and courier-ready orders.",
    icon: "ecommerce",
  },
  {
    slug: "seo-services",
    title: "SEO",
    text: "Local, national and international SEO for Pakistani businesses.",
    icon: "seo",
  },
  {
    slug: "website-maintenance",
    title: "Website maintenance",
    text: "Monthly updates, backups, security checks and small fixes.",
    icon: "devops",
  },
  {
    slug: "pos-software",
    title: "FBR-ready POS software",
    text: "Custom POS and invoicing software that emits FBR-compliant invoice data.",
    icon: "pos",
  },
];

export const pkWhy: { title: string; text: string; icon: PkIconName }[] = [
  {
    title: "Building since 2021",
    text: "Websites and business software for clients in Pakistan, the Gulf, UK and US.",
    icon: "badge",
  },
  {
    title: "Fixed written quote",
    text: "Scope, timeline and price agreed in writing before work starts.",
    icon: "doc",
  },
  {
    title: "You own everything",
    text: "Domain, hosting, code and every admin login handed over at launch.",
    icon: "lock",
  },
  {
    title: "Mobile-first and fast",
    text: "Built for phones and quick on Pakistani mobile networks.",
    icon: "mobile",
  },
  {
    title: "Urdu and English",
    text: "Bilingual sites, so every customer understands exactly what you offer.",
    icon: "language",
  },
  {
    title: "Registered and local",
    text: "A SECP- and FBR-registered private limited company with an office in Lahore.",
    icon: "pin",
  },
];

export const pkCityCards: { slug: string; name: string; blurb: string; mapKey: string; province: string }[] = [
  {
    slug: "lahore",
    name: "Lahore",
    blurb: "Our home city, with an office in DHA Phase 2.",
    mapKey: "lahore",
    province: "Punjab",
  },
  {
    slug: "gujranwala",
    name: "Gujranwala",
    blurb: "Sites for manufacturers with dealer networks, an hour away.",
    mapKey: "gujranwala",
    province: "Punjab",
  },
  {
    slug: "sialkot",
    name: "Sialkot",
    blurb: "Export-ready catalogue and B2B sites for Sialkot exporters.",
    mapKey: "sialkot",
    province: "Punjab",
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    blurb: "Websites and software for the capital's businesses.",
    mapKey: "islamabad",
    province: "Islamabad",
  },
];

/**
 * Sector chips. Only the ones with a real industry page get a link — the rest
 * are plain names, because an anchor onto a 404 is worse than no anchor.
 */
export const pkSectors: { label: string; href?: string }[] = [
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Exporters" },
  { label: "Textiles & garments" },
  { label: "Sports goods" },
  { label: "Surgical instruments" },
  { label: "Leather goods" },
  { label: "Real estate", href: "/industries/real-estate" },
  { label: "Construction", href: "/industries/construction" },
  { label: "Schools & academies", href: "/industries/education" },
  { label: "Clinics & hospitals", href: "/industries/healthcare" },
  { label: "Pharmacies", href: "/industries/pharmacy" },
  { label: "Restaurants & cafés", href: "/industries/hospitality" },
  { label: "Retail & fashion", href: "/industries/retail" },
  { label: "E-commerce brands", href: "/industries/ecommerce" },
  { label: "Logistics & couriers", href: "/industries/logistics" },
  { label: "Travel & tourism", href: "/industries/travel" },
  { label: "Automotive & dealers" },
  { label: "Agriculture" },
  { label: "Law firms", href: "/industries/legal" },
  { label: "Accountants" },
  { label: "NGOs" },
  { label: "IT & software houses" },
  { label: "Salons", href: "/industries/salon-beauty" },
  { label: "Gyms & fitness", href: "/industries/fitness" },
  { label: "Jewellers" },
  { label: "Furniture" },
  { label: "Electronics" },
  { label: "Hotels" },
];

export const pkCitiesServed: { name: string; slug: string }[] = [
  { name: "Lahore", slug: "lahore" },
  { name: "Karachi", slug: "karachi" },
  { name: "Islamabad", slug: "islamabad" },
  { name: "Rawalpindi", slug: "rawalpindi" },
  { name: "Faisalabad", slug: "faisalabad" },
  { name: "Sialkot", slug: "sialkot" },
  { name: "Gujranwala", slug: "gujranwala" },
  { name: "Multan", slug: "multan" },
  { name: "Peshawar", slug: "peshawar" },
  { name: "Quetta", slug: "quetta" },
  { name: "Hyderabad", slug: "hyderabad" },
];

export const pkSteps = [
  {
    step: "01",
    title: "Free chat or call",
    text: "Tell us about your business, the pages you need and your goals.",
  },
  {
    step: "02",
    title: "Fixed written quote",
    text: "Clear scope, timeline and price in rupees — before any work begins.",
  },
  {
    step: "03",
    title: "Design and build",
    text: "Mobile-first design, shared with you on a live staging link for review.",
  },
  {
    step: "04",
    title: "Launch and support",
    text: "We launch, train you on editing, and support you for 3 months.",
  },
] as const;

/**
 * Demo / live showcase cards, in the order the /pk page shows them.
 *
 * The blurb is written here rather than pulled from `demo.proof`, because the
 * proof line is a full sentence about the build and gets clamped mid-word in a
 * three-column card. These are one line each.
 */
export const pkWork: { id: string; blurb: string }[] = [
  { id: "properties-pak", blurb: "Property portal with map-led search and dealer enquiries." },
  { id: "ecommerce", blurb: "Fashion store with 8 currencies and a full checkout." },
  { id: "luxury-restaurant", blurb: "Restaurant site with menu, online ordering and reservations." },
  { id: "healthcare", blurb: "Clinic site with departments and appointment booking." },
  { id: "education", blurb: "School platform with programmes, faculty and admissions." },
  { id: "motor", blurb: "Automotive marketplace with listings, filters and finance." },
];

export type PkPakistanFeatureIcon = "cash" | "wallet" | "receipt" | "courier" | "language" | "pos";

export const pkPakistanFeatures: { title: string; text: string; icon: PkPakistanFeatureIcon }[] = [
  {
    title: "Cash on delivery",
    text: "COD checkout, so customers anywhere in Pakistan can order with confidence.",
    icon: "cash",
  },
  {
    title: "JazzCash, Easypaisa & cards",
    text: "Wallet and card payments, wherever your payment provider supports them.",
    icon: "wallet",
  },
  {
    title: "PKR pricing & invoices",
    text: "Prices, totals and invoices in rupees, so customers see exactly what they pay.",
    icon: "receipt",
  },
  {
    title: "Courier-ready orders",
    text: "Courier-ready order details in every order email, ready for dispatch.",
    icon: "courier",
  },
  {
    title: "Urdu & English content",
    text: "Bilingual pages, so every customer understands exactly what you offer.",
    icon: "language",
  },
  {
    title: "FBR-ready POS integration",
    text: "A POS or store that emits FBR-compliant invoice data, linked through your integrator.",
    icon: "pos",
  },
];

export const pkFaqs: Faq[] = [
  {
    question: "How much does a website cost in Pakistan?",
    answer:
      "Rs. 20,000 for a complete business website on your own domain and hosting, or Rs. 25,000 with domain registration and one year of hosting included. Larger sites, online stores, FBR POS software and SEO are quoted after a short call — and you always get the scope, timeline and price in writing before any work starts.",
  },
  {
    question: "What does the renewal cost after the first year?",
    answer:
      "Domain and hosting renew from Rs. 10,000 per year after the first year. If you use your own hosting, you simply keep paying your own provider. We remind you before anything expires, and nothing renews without your approval.",
  },
  {
    question: "Is support included?",
    answer:
      "Yes. Every package includes three months of support after launch: fixes, security and plugin updates, small text and image changes, and help editing the site yourself. After that you can continue on an optional monthly care plan, quoted on the size of the site.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes. The domain, hosting, WordPress admin, database and code are in your name, and every login is handed over at launch. You can move hosts or hand the site to another developer at any time.",
  },
  {
    question: "Do you build FBR POS integrated software?",
    answer:
      "Yes. We build custom POS and invoicing software that emits FBR-compliant invoice data — invoice number, QR fields and the right totals — plus inventory, multi-branch reporting and offline billing. The fiscal transmission itself runs through PRAL or the licensed integrator you appoint; WordbitX is not an FBR-licensed integrator. Scope is quoted after a short call.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We are based in Lahore and work with businesses across Pakistan — Lahore, Gujranwala, Sialkot, Islamabad, Rawalpindi, Faisalabad, Multan, Karachi, Peshawar, Quetta and Hyderabad. Most work runs over WhatsApp and video calls, with in-person meetings in Lahore when they help.",
  },
  {
    question: "How long does a website take?",
    answer:
      "A 5–8 page business website is usually ready in 2–3 weeks once the content and written quote are approved. Bigger catalogues and online stores typically take 4–6 weeks. Your timeline is agreed in writing before work starts.",
  },
  {
    question: "Can you build websites in Urdu?",
    answer:
      "Yes. We build bilingual Urdu and English websites with right-to-left layouts, proper Urdu fonts and real Urdu content, so customers understand exactly what you offer.",
  },
  {
    question: "Is WordbitX a registered company?",
    answer:
      "Yes. WordbitX TECHNOLOGY SMC – PVT. LTD. is a private limited company registered with the Securities and Exchange Commission of Pakistan (SECP) and the Federal Board of Revenue (FBR), based in Lahore, Pakistan. The registration details are on the About page.",
  },
  {
    question: "Which platform do you build on?",
    answer:
      "Most business websites run on WordPress, and online stores on WooCommerce — easy for your team to edit and cheap to host. We build on Shopify when you want Shopify's checkout, apps and inventory across channels. Portals, POS software and web apps are custom Next.js and Node applications. We recommend the platform that fits the workflow, not a favourite stack.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We start with an audit of speed, SEO, security and content, then quote a redesign that keeps your URLs and redirects so existing rankings survive. If the current platform is fine, a focused improvement can be cheaper than a full rebuild.",
  },
];
