import type { MarketContent } from "@/lib/market-landing";
import { fixedPackages, priceTiers } from "@/lib/price-ladder";
import { siteConfig, whatsappLink } from "@/lib/site";

/**
 * /pk — the Pakistan shop-front page.
 *
 * Price first, everything else in one line per idea. The numbers are the
 * owner's published prices (Rs. 20,000 / Rs. 25,000, renewal from Rs. 10,000)
 * and the facts already stated elsewhere on the site.
 */

/** Rupee prices come from the shared ladder (src/lib/price-ladder.ts) so /pk,
 *  the cost calculator and /pricing can never drift apart again. */
export const pkPrices = {
  basic: fixedPackages.pk.starter,
  allInOne: fixedPackages.pk.allInOne,
  renewal: fixedPackages.pk.renewal,
  supportMonths: fixedPackages.pk.supportMonths,
} as const;

export const pkMarket: MarketContent = {
  key: "pk",
  currencyNote: "Prices in PKR.",
  hero: {
    eyebrow: "Pakistan · Since 2021",
    title: "Websites for your shop, clinic or business",
    priceLabel: "Websites from",
    price: pkPrices.basic,
    sub: `${pkPrices.allInOne} with domain + 1 year hosting. Built in 2–3 weeks. ${pkPrices.supportMonths} months support.`,
    chips: ["Fixed written quote", `${pkPrices.supportMonths} months support`, "You own it all"],
    demoId: "ecommerce",
    image: "/demos/cover/ecommerce.jpg",
    imageAlt: "Illustration of a boutique counter with the Veranne online store WordbitX built, shown on a laptop",
    priceCardLabel: "Complete business website",
    priceCardNote: `Or ${pkPrices.allInOne} with domain + 1 year hosting.`,
    priceCardChip: `${pkPrices.supportMonths} months support`,
    stats: [
      { value: "Since 2021", label: "Building websites" },
      { value: "Lahore", label: "Our base" },
      { value: pkPrices.basic, label: "Websites from" },
      { value: "2–3 weeks", label: "Typical build" },
    ],
  },
  contact: {
    whatsapp: (message) =>
      whatsappLink(
        message ??
          "Hello WordbitX, I saw your Pakistan website packages (Rs. 20,000 / Rs. 25,000). I would like to discuss my business website.",
      ),
    phoneDisplay: siteConfig.phoneDisplay,
    phoneRaw: siteConfig.phoneRaw,
    hours: "Mon–Sat, 9:00–19:00 PKT",
  },
  regionSwitch: { href: "/usa", label: "US pricing in dollars" },
  packages: {
    eyebrow: "Pricing",
    title: "Two packages, one price",
    description: "Pick one. Pay in rupees. No hourly billing.",
    items: [
      {
        id: "business-website",
        eyebrow: "Your own domain & hosting",
        name: "Business Website",
        price: pkPrices.basic,
        note: "Use your existing domain and hosting.",
        features: [
          "Mobile-first WordPress website",
          "Contact & WhatsApp buttons",
          "Google setup + basic SEO",
          "Training to edit it yourself",
          `${pkPrices.supportMonths} months support`,
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
          "1 year hosting included",
          "Email-ready DNS setup",
          `Renewal from ${pkPrices.renewal}/year`,
          `${pkPrices.supportMonths} months support`,
        ],
        featured: true,
        badge: "Most popular",
        message:
          "Hello WordbitX, I want the Rs. 25,000 Website + Domain + Hosting package. Here is my business:",
      },
    ],
    note: `Custom stores and software start around ${priceTiers.custom.pkrLabel.split(" – ")[0]} — quoted after a free call. FBR POS and SEO are quoted the same way.`,
  },
  included: {
    eyebrow: "Included",
    title: `What you get for ${pkPrices.basic}`,
    intro: "One fixed price. Nothing extra to pay for these.",
    chips: ["Fixed written quote", `${pkPrices.supportMonths} months support`, "You own it all"],
    items: [
      { title: "Mobile-first website", text: "Sharp and fast on every phone." },
      { title: "Contact & WhatsApp buttons", text: "One tap to call or message you." },
      { title: "Google-ready setup", text: "SEO basics, sitemap, Search Console." },
      { title: "Training to edit it yourself", text: "Change text, photos and prices." },
      { title: `${pkPrices.supportMonths} months support`, text: "Fixes and updates after launch." },
      { title: "Fixed written quote", text: "Scope, timeline and price agreed first." },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "What we do",
    description: "Everything you need to get online, from one team.",
    items: [
      { slug: "web-development", title: "Website design", text: "Clean, mobile-first business websites.", icon: "design" },
      { slug: "wordpress-development", title: "WordPress", text: "Themes and catalogues you can edit.", icon: "wordpress" },
      { slug: "ecommerce-shopify", title: "Shopify & ecommerce", text: "PKR pricing, COD, courier-ready orders.", icon: "ecommerce" },
      { slug: "seo-services", title: "SEO", text: "Local and national search rankings.", icon: "seo" },
      { slug: "website-maintenance", title: "Maintenance", text: "Monthly updates, backups and fixes.", icon: "devops" },
      { slug: "pos-software", title: "FBR-ready POS", text: "Billing and stock, offline-friendly.", icon: "pos" },
    ],
  },
  why: {
    eyebrow: "Why WordbitX",
    title: "Why businesses pick us",
    description: "Lahore-based, priced in rupees, no surprises.",
    items: [
      { title: "Building since 2021", text: "Clients in Pakistan, the Gulf, UK and US.", icon: "badge" },
      { title: "Fixed written quote", text: "Scope, timeline and price in writing.", icon: "doc" },
      { title: "You own everything", text: "Domain, hosting, code and every login.", icon: "lock" },
      { title: "Mobile-first and fast", text: "Built for phones and local networks.", icon: "mobile" },
      { title: "Urdu and English", text: "Bilingual pages your customers understand.", icon: "language" },
      { title: "Registered and local", text: "SECP/FBR-registered company in Lahore.", icon: "pin" },
    ],
  },
  cities: {
    eyebrow: "Cities",
    title: "Web design in your city",
    description: "Local pages for the cities we work with most.",
    items: [
      { slug: "lahore", name: "Lahore", blurb: "Our home city — office in DHA Phase 2.", mapKey: "lahore", province: "Punjab" },
      { slug: "gujranwala", name: "Gujranwala", blurb: "Dealer and factory websites, an hour away.", mapKey: "gujranwala", province: "Punjab" },
      { slug: "sialkot", name: "Sialkot", blurb: "Catalogue and B2B sites for exporters.", mapKey: "sialkot", province: "Punjab" },
      { slug: "islamabad", name: "Islamabad", blurb: "Websites and software for the capital.", mapKey: "islamabad", province: "Islamabad" },
    ],
  },
  work: {
    eyebrow: "Our work",
    title: "Recent builds",
    description: "Live products and demos — open a card to browse the real site.",
    items: [
      { id: "properties-pak", blurb: "Property portal with map search." },
      { id: "ecommerce", blurb: "Fashion store with 8 currencies." },
      { id: "luxury-restaurant", blurb: "Restaurant site with online ordering." },
      { id: "healthcare", blurb: "Clinic site with appointment booking." },
      { id: "education", blurb: "School site with programmes and admissions." },
      { id: "motor", blurb: "Car marketplace with listings and filters." },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "Four steps to launch",
    description: "One written quote. No surprise invoices.",
    items: [
      { step: "01", title: "Free chat", text: "Tell us your business and pages." },
      { step: "02", title: "Written quote", text: "Scope, timeline and price in rupees." },
      { step: "03", title: "Build", text: "Mobile-first, on a live staging link." },
      { step: "04", title: "Launch", text: "We launch, train you, support 3 months." },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Quick answers",
    intro: "Still unsure? Ask on WhatsApp — a person replies, not a bot.",
    items: [
      {
        question: "How much does a website cost in Pakistan?",
        answer:
          "Rs. 20,000 for a complete business website, or Rs. 25,000 with a domain and 1 year of hosting. Online stores, POS software and SEO are quoted after a free call — always in writing.",
      },
      {
        question: "What does renewal cost?",
        answer: `Domain and hosting renew from ${pkPrices.renewal} a year. Nothing renews without your approval.`,
      },
      {
        question: "Is support included?",
        answer: `Yes — ${pkPrices.supportMonths} months of fixes, updates and small changes after launch. A monthly care plan is optional after that.`,
      },
      {
        question: "Do I own my website?",
        answer: "Yes. Domain, hosting, code and every admin login are in your name at launch.",
      },
      {
        question: "How long does it take?",
        answer: "2–3 weeks for a 5–10 page website once content is ready. Online stores take 4–6 weeks.",
      },
      {
        question: "Do you build FBR POS software?",
        answer:
          "Yes — POS and invoicing that emits FBR-compliant invoice data (invoice number, QR fields, totals). Transmission runs through your licensed integrator.",
      },
      {
        question: "Can you build websites in Urdu?",
        answer: "Yes. Bilingual Urdu/English sites with right-to-left layouts and real Urdu fonts.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Get started",
    title: "Ready for your new website?",
    text: `Websites from ${pkPrices.basic}, or ${pkPrices.allInOne} with domain + 1 year hosting. ${pkPrices.supportMonths} months support included.`,
    cities: [
      { name: "Lahore", slug: "lahore" },
      { name: "Karachi", slug: "karachi" },
      { name: "Islamabad", slug: "islamabad" },
      { name: "Faisalabad", slug: "faisalabad" },
      { name: "Sialkot", slug: "sialkot" },
      { name: "Gujranwala", slug: "gujranwala" },
      { name: "Multan", slug: "multan" },
      { name: "Peshawar", slug: "peshawar" },
    ],
  },
};
