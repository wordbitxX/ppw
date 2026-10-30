import type { MarketContent } from "@/lib/market-landing";
import { fixedPackages, priceTiers, usdRatePkr } from "@/lib/price-ladder";
import { siteConfig, usWhatsappLink } from "@/lib/site";

/**
 * /usa — the dollar-priced shop-front page for US and international clients.
 *
 * Same structure as /pk (price first, one line per idea) with every number in
 * USD and the US phone/WhatsApp line from siteConfig.
 *
 * Prices come from the shared ladder (src/lib/price-ladder.ts) and start at
 * $150 so a one-location US business is not priced out — the owner's call,
 * 30 Oct 2026. Every price string is interpolated, so changing the ladder
 * changes this page, the calculator, /pricing and the blog together.
 *
 * Copy note: this page must not read like /pk with the currency swapped. The
 * sentences below talk about stateside hours, USD invoices and US site types
 * (DTC store, service business, SaaS marketing site) rather than reusing the
 * Pakistani wording.
 */

/** Dollar prices come from the shared ladder. */
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
    sub: `Fixed USD price: ${usPrices.starter} for a 5-page site, ${usPrices.business} for up to 10 pages, ${usPrices.store} for a store. Live in 2–3 weeks.`,
    chips: ["Fixed USD quote", `${usPrices.supportMonths} months support`, "You own it all"],
    demoId: "luxury-restaurant",
    image: "/demos/cover/luxury-restaurant.jpg",
    imageAlt: "Illustration of a restaurant dining room with the Maison Noor website WordbitX built, shown on a tablet",
    priceCardLabel: "Business website",
    priceCardNote: `Online stores from ${usPrices.store}. Every quote and invoice in USD.`,
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
          `Hello WordbitX, I saw your US website packages (${usPrices.starter} / ${usPrices.business} / ${usPrices.store}). I would like to discuss my business website.`,
      ),
    phoneDisplay: siteConfig.usPhoneDisplay,
    phoneRaw: siteConfig.usPhoneRaw,
    hours: "Calls booked to your time zone (ET / PT / CT)",
  },
  regionSwitch: { href: "/pk", label: "Pakistan pricing in rupees" },
  packages: {
    eyebrow: "Pricing",
    title: "Three packages in dollars",
    description: "Fixed price, fixed scope, no hourly surprises.",
    items: [
      {
        id: "starter",
        eyebrow: "Starter",
        name: "Starter Website",
        price: usPrices.starter,
        note: "A clean 5-page site for a small business.",
        features: [
          "5 mobile-first pages",
          "Contact form + click-to-call",
          "SEO basics, sitemap, Search Console",
          "Google Analytics 4 setup",
          `${usPrices.supportMonths} months support`,
        ],
        message: `Hello WordbitX, I want the ${usPrices.starter} Starter Website package. Here is my business:`,
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
          "Google Business Profile + analytics",
          "Speed and mobile optimisation",
          "30 days of design revisions",
          `${usPrices.supportMonths} months support`,
        ],
        featured: true,
        badge: "Most popular",
        message: `Hello WordbitX, I want the ${usPrices.business} Business Website package. Here is my business:`,
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
          "Shipping and sales-tax setup",
          "Order emails + inventory",
          `${usPrices.supportMonths} months support`,
        ],
        message: `Hello WordbitX, I want the ${usPrices.store} Online Store package. Here is my store:`,
      },
    ],
    addOns: [
      { label: "Domain + 1 year hosting", price: usPrices.domainHosting },
      { label: "Website care plan", price: usPrices.care },
      { label: "SEO retainer", price: usPrices.seo },
      { label: "Custom web app", price: usPrices.customApp },
    ],
    note: `Anything past a fixed package — ${priceTiers.custom.usdLabel} for custom builds — is quoted after a short call, in writing.`,
  },
  included: {
    eyebrow: "Included",
    title: `What comes with every US package`,
    intro: "In all three packages, from the starter up.",
    chips: ["Fixed USD quote", `${usPrices.supportMonths} months support`, "You own it all"],
    items: [
      { title: "Mobile-first build", text: "Readable and fast on a phone, first." },
      { title: "Lead forms", text: "Click-to-call, email and contact forms." },
      { title: "Search basics", text: "Titles, sitemap, Search Console." },
      { title: "GA4 + events", text: "Traffic and conversions measured." },
      { title: "Handover call", text: "A recorded walkthrough, not a PDF." },
      { title: `${usPrices.supportMonths} months support`, text: "Fixes and small edits after launch." },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "What we build",
    description: "Websites, stores, apps and software — one team, one invoice.",
    items: [
      { slug: "web-development", title: "Website design", text: "Fast, mobile-first business sites.", icon: "design" },
      { slug: "wordpress-development", title: "WordPress", text: "Themes your marketing team can edit.", icon: "wordpress" },
      { slug: "ecommerce-shopify", title: "Shopify", text: "DTC stores with payments and shipping.", icon: "ecommerce" },
      { slug: "seo-services", title: "SEO", text: "Technical fixes and local search.", icon: "seo" },
      { slug: "custom-software-development", title: "Custom software", text: "Portals, dashboards and internal tools.", icon: "software" },
      { slug: "mobile-app-development", title: "Mobile apps", text: "iOS and Android from one codebase.", icon: "mobile" },
    ],
  },
  why: {
    eyebrow: "Why WordbitX",
    title: "Why US businesses work with us",
    description: "One team in Lahore, US-friendly hours, USD prices.",
    items: [
      { title: "Calls in your time zone", text: "Booked in ET, CT or PT.", icon: "chat" },
      { title: "Flat USD price", text: "Quoted in writing before work starts.", icon: "doc" },
      { title: "You own everything", text: "Domain, hosting, code and every login.", icon: "lock" },
      { title: "No account manager", text: "You talk to the builders.", icon: "badge" },
      { title: "Built for speed", text: "Core Web Vitals checked before launch.", icon: "mobile" },
      { title: "Since 2021", text: "Registered in Lahore — no fake US office.", icon: "pin" },
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
      { step: "01", title: "15-minute call", text: "Booked in ET / PT." },
      { step: "02", title: "Fixed quote", text: "Scope, timeline and price in USD." },
      { step: "03", title: "Build", text: "You watch it on a live preview link." },
      { step: "04", title: "Handover", text: "Launch, walkthrough, 3 months support." },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Quick answers",
    intro: "Still unsure? Message the US line — a person replies, not a bot.",
    items: [
      {
        question: "How much does a website cost?",
        answer: `Starter website ${usPrices.starter}, business website ${usPrices.business}, online store ${usPrices.store}. Custom builds run ${priceTiers.custom.usdLabel} and are quoted after a short call — always in writing.`,
      },
      {
        question: "Is there anything cheaper?",
        answer: `No — ${usPrices.starter} is the floor, and it is a real site: 5 pages, mobile-first, forms and ${usPrices.supportMonths} months of support.`,
      },
      {
        question: "Are prices really in dollars?",
        answer:
          "Yes. Every US quote and invoice is in USD. Pakistan clients are quoted in rupees on the Pakistan pricing page.",
      },
      {
        question: "What about time zones?",
        answer:
          "Calls are booked in ET, CT or PT, usually 8–11am Eastern. Replies land within one business day.",
      },
      {
        question: "Do I own the website?",
        answer: "Yes. Domain, hosting, code and every admin login are in your name at launch.",
      },
      {
        question: "How long does it take?",
        answer: `2–3 weeks for a 5–10 page site. An online store usually takes 4–6 weeks.`,
      },
      {
        question: "Who actually builds it?",
        answer:
          "A senior team in Lahore, Pakistan — the people who quote, design and ship it. No US office, and we do not pretend otherwise.",
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
