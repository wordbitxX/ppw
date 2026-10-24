/**
 * Glossary terms.
 *
 * These are plain-language definitions of the words that appear in our
 * proposals, quotes and service pages. Each term links to the service that
 * actually delivers it, where one exists — no term links to a page that
 * does not exist.
 */
export type GlossaryTerm = {
  term: string;
  short: string;
  definition: string;
  /** A verified service slug, or null when no service page matches. */
  service: string | null;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "API",
    short: "Application Programming Interface",
    definition:
      "A documented way for two systems to talk to each other — for example, your website asking a payment gateway to charge a card, or your app asking your inventory system for live stock. When a quote mentions 'API integration', it means connecting systems that were not built to share data.",
    service: "api-development",
  },
  {
    term: "CMS",
    short: "Content Management System",
    definition:
      "Software that lets non-developers edit a website's pages, images and posts without touching code — WordPress is the best-known example. A custom CMS is built for one business's exact content types instead of every business's.",
    service: "custom-cms-development",
  },
  {
    term: "CRM",
    short: "Customer Relationship Management",
    definition:
      "A system that records every lead, customer, conversation and deal in one place, so nothing lives only in someone's phone or inbox. For a property dealer it tracks plots and follow-ups; for a retailer it tracks customers and repeat orders.",
    service: "crm-erp-solutions",
  },
  {
    term: "ERP",
    short: "Enterprise Resource Planning",
    definition:
      "One system joining stock, purchases, accounts, HR and production, instead of five spreadsheets that disagree. Small businesses usually need one or two ERP modules, not a full enterprise suite — that distinction is most of the price difference.",
    service: "crm-erp-solutions",
  },
  {
    term: "Flutter",
    short: "Google's cross-platform app framework",
    definition:
      "A framework for building one app codebase that runs on both Android and iOS. It suits most business apps — booking, ordering, dashboards — and is usually cheaper than building two separate native apps. It is not the right call for every app: heavy games and deep device features still favour native.",
    service: "flutter-app-development",
  },
  {
    term: "Headless commerce",
    short: "Storefront separated from the store engine",
    definition:
      "Running the shopfront (what customers see) separately from the commerce engine (products, cart, checkout). It gives full design freedom and speed, at the cost of more development work than a standard Shopify or WooCommerce theme.",
    service: "ecommerce-development",
  },
  {
    term: "KOT",
    short: "Kitchen Order Ticket",
    definition:
      "The ticket a restaurant kitchen works from after a waiter takes an order — what was ordered, which table, any modifiers, and in what sequence. A restaurant POS that prints or displays KOTs correctly is the difference between a smooth rush and a confused kitchen.",
    service: "pos-software",
  },
  {
    term: "MVP",
    short: "Minimum Viable Product",
    definition:
      "The smallest version of a product that real users can actually use — not a demo, and not the full vision. An MVP exists to test whether people want the thing before the full budget is spent. Most first releases we build are MVPs, even when nobody calls them that.",
    service: "saas-application-development",
  },
  {
    term: "POS",
    short: "Point of Sale",
    definition:
      "The system that takes payment at the counter — and, in a good setup, also deducts stock, records the sale by branch and staff member, and prints or emails the receipt. A POS that stops working without internet is a known failure mode; offline-first billing is a requirement, not a feature.",
    service: "pos-software",
  },
  {
    term: "PWA",
    short: "Progressive Web App",
    definition:
      "A website that behaves like an app: installable on a phone, usable offline for cached content, and able to send notifications — without going through an app store. It suits content and ordering use cases; it cannot do everything a native app can.",
    service: "web-development",
  },
  {
    term: "React Native",
    short: "Meta's cross-platform app framework",
    definition:
      "A framework for building Android and iOS apps from one JavaScript codebase. The trade-off against Flutter is mostly about the team's existing skills and the libraries a project needs, not about one being universally 'better'.",
    service: "mobile-app-development",
  },
  {
    term: "SaaS",
    short: "Software as a Service",
    definition:
      "Software sold as a subscription and run by its maker — you pay monthly and never install or maintain it. Properties Pak's dealer tools and a clinic's booking portal are SaaS-shaped products: the customer uses them, we run them.",
    service: "saas-application-development",
  },
  {
    term: "SEO",
    short: "Search Engine Optimisation",
    definition:
      "The work of making pages rank in search results: pages that answer the query, load fast, are easy to crawl, and earn links and mentions from real sites. It compounds slowly — months, not days — and anyone promising page one next week is selling something else.",
    service: "seo-services",
  },
  {
    term: "Shopify",
    short: "Hosted e-commerce platform",
    definition:
      "A hosted platform for running an online store: products, checkout, payments and shipping without managing servers. It is the fastest route to a working store for most retailers; its limits show up when a business needs workflows Shopify was not designed for.",
    service: "ecommerce-shopify",
  },
  {
    term: "UI",
    short: "User Interface",
    definition:
      "What the user actually sees and taps: layout, buttons, forms, colours, type. Good UI is invisible — the user completes the task without noticing the design. Bad UI is the reason a working product still loses customers.",
    service: "ui-ux-design",
  },
  {
    term: "UX",
    short: "User Experience",
    definition:
      "The whole journey, not just the screen: how a visitor finds the product, understands the price, completes checkout, and gets help when stuck. UI is one screen; UX is whether the customer ever comes back.",
    service: "ui-ux-design",
  },
  {
    term: "WooCommerce",
    short: "WordPress e-commerce plugin",
    definition:
      "The plugin that turns a WordPress site into a store. It suits businesses already on WordPress and owners who want full control of their data and hosting. It needs more maintenance than Shopify — updates, backups and security are the owner's job.",
    service: "woocommerce-development",
  },
];
