import type { MarketContent } from "@/lib/market-landing";
import { fixedPackages, usdRatePkr } from "@/lib/price-ladder";
import { siteConfig, usWhatsappLink } from "@/lib/site";

/**
 * /usa — the dollar-priced shop-front page for US and international clients.
 *
 * Same structure as /pk (price first, one line per idea) with every number in
 * USD and the US phone/WhatsApp line from siteConfig. The prices are the
 * dollar equivalents of the published rupee packages, rounded up for the extra
 * sales and timezone work a US engagement carries — the owner can change the
 * numbers here without touching the layout.
 */

/** Dollar prices come from the shared ladder (src/lib/price-ladder.ts). */
export const usPrices = {
  starter: fixedPackages.us.starter,
  business: fixedPackages.us.business,
  store: fixedPackages.us.store,
  domainHosting: fixedPackages.us.domainHosting,
  care: fixedPackages.us.care,
  seo: fixedPackages.us.seo,
  customApp: fixedPackages.us.customApp,
  supportMonths: fixedPackages.us.supportMonths,
} as const;

/** Reminder for the copy: these are market prices, not rupee conversions. */
export const usConversionNote = `$1 is roughly Rs. ${usdRatePkr} at the time of writing — but US prices are set for the US market, not converted.`;

export const usMarket: MarketContent = {
  key: "us",
  currencyNote: "Prices in USD, invoiced in USD.",
  hero: {
    eyebrow: "US & international · Since 2021",
    title: "Websites for US businesses, priced in dollars",
    priceLabel: "Websites from",
    price: usPrices.starter,
    sub: `Business site ${usPrices.business}. Online store ${usPrices.store}. Fixed price in USD, 2–3 weeks, ${usPrices.supportMonths} months support.`,
    chips: ["Fixed USD quote", `${usPrices.supportMonths} months support`, "You own it all"],
    demoId: "luxury-restaurant",
    image: "/demos/cover/luxury-restaurant.jpg",
    imageAlt: "Illustration of a restaurant dining room with the Maison Noor website WordbitX built, shown on a tablet",
    priceCardLabel: "Business website",
    priceCardNote: "Online stores from $1,499. Every quote in USD.",
    priceCardChip: `${usPrices.supportMonths} months support`,
    stats: [
      { value: "Since 2021", label: "Building websites" },
      { value: usPrices.starter, label: "Websites from" },
      { value: "USD", label: "Fixed written quotes" },
      { value: "2–3 weeks", label: "Typical build" },
    ],
  },
  contact: {
    whatsapp: (message) =>
      usWhatsappLink(
        message ??
          "Hello WordbitX, I saw your US website packages ($499 / $899 / $1,499). I would like to discuss my business website.",
      ),
    phoneDisplay: siteConfig.usPhoneDisplay,
    phoneRaw: siteConfig.usPhoneRaw,
    hours: "Calls booked in ET / PT",
  },
  regionSwitch: { href: "/pk", label: "Pakistan pricing in rupees" },
  packages: {
    eyebrow: "Pricing",
    title: "Three packages in dollars",
    description: "Fixed price, fixed scope. Pay in USD.",
    items: [
      {
        id: "starter",
        eyebrow: "Starter",
        name: "Starter Website",
        price: usPrices.starter,
        note: "A clean 5-page site for a small business.",
        features: [
          "5 mobile-first pages",
          "Contact form + WhatsApp button",
          "SEO basics, sitemap, Search Console",
          "Google Analytics setup",
          `${usPrices.supportMonths} months support`,
        ],
        message: "Hello WordbitX, I want the $499 Starter Website package. Here is my business:",
      },
      {
        id: "business",
        eyebrow: "Most businesses",
        name: "Business Website",
        price: usPrices.business,
        note: "Up to 10 pages you can edit yourself.",
        features: [
          "Up to 10 pages",
          "WordPress CMS you can edit",
          "Google Business + analytics setup",
          "Speed and mobile optimisation",
          "30 days of design revisions",
          `${usPrices.supportMonths} months support`,
        ],
        featured: true,
        badge: "Most popular",
        message: "Hello WordbitX, I want the $899 Business Website package. Here is my business:",
      },
      {
        id: "store",
        eyebrow: "Selling online",
        name: "Online Store",
        price: usPrices.store,
        note: "Shopify or WooCommerce, ready to sell.",
        features: [
          "Up to 50 products",
          "Card payments and checkout",
          "Shipping and tax setup",
          "Order emails + inventory",
          `${usPrices.supportMonths} months support`,
        ],
        message: "Hello WordbitX, I want the $1,499 Online Store package. Here is my store:",
      },
    ],
    addOns: [
      { label: "Domain + 1 year hosting", price: usPrices.domainHosting },
      { label: "Website care plan", price: usPrices.care },
      { label: "SEO retainer", price: usPrices.seo },
      { label: "Custom web app", price: usPrices.customApp },
    ],
    note: "Custom apps, CRM/ERP and AI work are quoted after a free call — always in writing.",
  },
  included: {
    eyebrow: "Included",
    title: `What you get from ${usPrices.starter}`,
    intro: "One fixed price. These are in every package.",
    chips: ["Fixed USD quote", `${usPrices.supportMonths} months support`, "You own it all"],
    items: [
      { title: "Mobile-first build", text: "Sharp and fast on every screen." },
      { title: "Enquiry forms", text: "Calls, email and WhatsApp in one tap." },
      { title: "SEO basics", text: "Titles, sitemap and Search Console." },
      { title: "Analytics", text: "GA4 and conversion tracking wired up." },
      { title: "Training call", text: "Edit text, photos and prices yourself." },
      { title: `${usPrices.supportMonths} months support`, text: "Fixes and small changes after launch." },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "What we build",
    description: "Websites, stores, apps and software — one team.",
    items: [
      { slug: "web-development", title: "Website design", text: "Fast, mobile-first business sites.", icon: "design" },
      { slug: "wordpress-development", title: "WordPress", text: "Custom themes you can edit.", icon: "wordpress" },
      { slug: "ecommerce-shopify", title: "Shopify", text: "Stores with payments and shipping.", icon: "ecommerce" },
      { slug: "seo-services", title: "SEO", text: "Technical and local search work.", icon: "seo" },
      { slug: "custom-software-development", title: "Custom software", text: "Portals, dashboards and tools.", icon: "software" },
      { slug: "mobile-app-development", title: "Mobile apps", text: "iOS and Android from one codebase.", icon: "mobile" },
    ],
  },
  why: {
    eyebrow: "Why WordbitX",
    title: "Why US businesses work with us",
    description: "Senior build quality, dollar pricing, direct communication.",
    items: [
      { title: "US hours overlap", text: "Calls booked in ET/PT, replies next business day.", icon: "chat" },
      { title: "Fixed USD quote", text: "Scope, timeline and price in writing.", icon: "doc" },
      { title: "You own everything", text: "Domain, hosting, code and every login.", icon: "lock" },
      { title: "Direct with the builders", text: "You talk to the people writing the code.", icon: "badge" },
      { title: "Fast by default", text: "Core Web Vitals and mobile taken seriously.", icon: "mobile" },
      { title: "Since 2021", text: "A registered company in Lahore, Pakistan.", icon: "pin" },
    ],
  },
  work: {
    eyebrow: "Our work",
    title: "Recent builds",
    description: "Live products and demos — open a card to browse the real site.",
    items: [
      { id: "luxury-restaurant", blurb: "Restaurant site with online ordering." },
      { id: "ecommerce", blurb: "Fashion store with 8 currencies." },
      { id: "properties-pak", blurb: "Property portal with map search." },
      { id: "healthcare", blurb: "Clinic site with appointment booking." },
      { id: "education", blurb: "School site with programmes and admissions." },
      { id: "salon-beauty", blurb: "Salon site with online booking." },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "Four steps to launch",
    description: "One written quote. No surprise invoices.",
    items: [
      { step: "01", title: "Free call", text: "15 minutes on what the site must do." },
      { step: "02", title: "Written quote", text: "Scope, timeline and price in USD." },
      { step: "03", title: "Build", text: "Mobile-first, on a live preview link." },
      { step: "04", title: "Launch", text: "We launch, train you, support 3 months." },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Quick answers",
    intro: "Still unsure? Message the US line — a person replies, not a bot.",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Starter website $499, business website $899, online store $1,499. Custom apps and platforms are quoted after a short call — always in writing.",
      },
      {
        question: "Are prices really in dollars?",
        answer:
          "Yes. Every US quote and invoice is in USD. Pakistan clients are quoted in rupees on the Pakistan pricing page.",
      },
      {
        question: "What about time zones?",
        answer:
          "We book calls in ET/PT, usually between 8am and 11am Eastern, and reply within one business day.",
      },
      {
        question: "Do I own the website?",
        answer: "Yes. Domain, hosting, code and every admin login are in your name at launch.",
      },
      {
        question: "How long does it take?",
        answer: "2–3 weeks for a 5–10 page website. An online store usually takes 4–6 weeks.",
      },
      {
        question: "Is support included?",
        answer: `Yes — ${usPrices.supportMonths} months of fixes and small changes after launch. A care plan (${usPrices.care}) is optional after that.`,
      },
      {
        question: "Who builds the site?",
        answer:
          "A senior team based in Lahore, Pakistan — the same people who quote, design and ship it. You talk to them directly.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Get started",
    title: "Ready for your new website?",
    text: `Websites from ${usPrices.starter}, business site ${usPrices.business}, online store ${usPrices.store}. ${usPrices.supportMonths} months support included.`,
    cities: [
      { name: "New York", slug: "new-york" },
      { name: "Austin", slug: "austin" },
      { name: "Chicago", slug: "chicago" },
      { name: "Houston", slug: "houston" },
      { name: "Los Angeles", slug: "los-angeles" },
      { name: "Miami", slug: "miami" },
      { name: "Seattle", slug: "seattle" },
      { name: "Toronto", slug: "toronto" },
    ],
  },
};
