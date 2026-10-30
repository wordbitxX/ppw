import { fixedPackages } from "@/lib/price-ladder";
import type { Faq } from "@/lib/types";

export type Market = {
  slug: string;
  name: string;
  country: string;
  h1: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  overview: string[];
  needs: string[];
  delivery: string[];
  industries: string[];
  services: string[];
  faqs: Faq[];
};

export const markets: Market[] = [
  {
    slug: "pakistan",
    name: "Pakistan",
    country: "Pakistan",
    h1: "Software Development Company Serving Pakistan and Exporting Globally",
    tagline:
      "Pakistan is our operating base and a core market — not the limit of who we build for.",
    metaTitle: "Software Development in Pakistan — Lahore Team | WordbitX",
    metaDescription:
      "Pakistan-based software company building websites, mobile apps, custom software and industry portals for Pakistani businesses and international clients.",
    overview: [
      "WordbitX is incorporated in Pakistan and delivers from here to clients at home and abroad. Local work is shaped by how business actually runs here: COD checkouts, plot files and instalments, offline-first POS, Urdu/English receipts, and WhatsApp as a real channel — not a novelty.",
      "The same engineering standards apply to export work. Pakistani delivery capacity is the reason international clients get senior attention at a sustainable cost, not a reason to position the brand as a city-only shop.",
    ],
    needs: [
      "Retail and restaurant POS that survives power and connectivity drops",
      "Property portals modelled on societies, files and instalment plans",
      "Pharmacy and hospital systems with batch, expiry and tax invoices",
      "Shopify and custom stores that handle jazzcash, easypaisa and couriers",
      "School and campus portals with fee vouchers and parent access",
    ],
    delivery: [
      "On-site workshops in major cities when the project needs them",
      "Urdu and English project communication",
      "PKT working hours with evening overlap for US/UK calls when booked",
      "Code and accounts owned by the client from day one",
    ],
    industries: ["retail", "real-estate", "pharmacy", "healthcare", "education", "ecommerce"],
    services: ["web-development", "ecommerce-shopify", "pos-software", "real-estate-portals", "android-app-development"],
    faqs: [
      { question: "Are you only a Lahore software house?", answer: "No. We operate from Pakistan (Lahore is where the team is based) and serve clients across the country and internationally. Pages and proposals are written for the market you sell in, not only for one city." },
      { question: "Do you work with overseas Pakistanis?", answer: "Yes. Many property, retail and brand projects are commissioned remotely with PKT overlap calls." },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    country: "United States",
    h1: "Software Development Partner for US Product and Operations Teams",
    tagline: "A dedicated remote squad with scheduled US overlap hours and US-owned repositories.",
    metaTitle: "Software Development Company for US Clients | WordbitX",
    metaDescription:
      "WordbitX works with US startups and operations teams on web apps, mobile products, AI automation and custom software, on US overlap hours.",
    overview: [
      "US clients typically hire us as an embedded product squad: discovery on their clock, weekly demos, and delivery into their GitHub, Vercel, AWS or GCP accounts. We do not hold the product hostage in our own hosting.",
      "Engagements are scoped in writing. We will decline work that needs onshore licensed professions we do not hold (for example, practising US healthcare billing as a covered entity).",
    ],
    needs: [
      "MVP and v1 products that need to ship in a quarter, not a year",
      "Internal tools that replace spreadsheet operations",
      "AI assistants grounded in the company's own documents",
      "Storefronts and subscription apps with Stripe and analytics wired correctly",
    ],
    delivery: [
      "Overlap windows for EST / PST stand-ups when the project needs them",
      "English-first communication, written decisions in one channel",
      "US-based accounts for Git, cloud and app stores whenever you provide them",
      "Invoices in USD with milestone billing",
    ],
    industries: ["ecommerce", "finance", "logistics", "healthcare"],
    services: ["custom-software-development", "web-development", "mobile-app-development", "ai-solutions"],
    faqs: [
      { question: "What time zone do you work in?", answer: "The team is in PKT (UTC+5). We book recurring overlap for US time zones so design reviews and stand-ups happen while you are at the desk." },
      { question: "Who owns the IP?", answer: "You do, on full payment, as stated in the proposal. Repositories live in your organisation." },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    country: "United Kingdom",
    h1: "Software Development Partner for UK Businesses",
    tagline: "Remote delivery with comfortable UK afternoon overlap and GDPR-aware builds.",
    metaTitle: "Software Development Company for UK Clients | WordbitX",
    metaDescription:
      "WordbitX delivers websites, mobile apps and custom software for UK businesses with UK-hours overlap, GDPR-aware data handling and client-owned infrastructure.",
    overview: [
      "UK work is usually product sites, operational software and eCommerce. We treat privacy as a build requirement: consent, retention and subprocessors agreed before anything goes live.",
      "Collaboration sits in UK afternoon / PKT evening, which is a practical overlap for most teams without forcing late-night calls.",
    ],
    needs: [
      "Service-business websites that need to rank and convert",
      "Shopify or custom stores with UK shipping and tax rules",
      "Internal portals with role-based access",
      "Content and SEO programmes tied to commercial pages",
    ],
    delivery: [
      "Overlap with UK business hours for reviews",
      "English proposals, tickets and documentation",
      "Hosting and analytics in regions you specify",
      "Milestone billing in GBP or USD",
    ],
    industries: ["ecommerce", "education", "finance", "healthcare"],
    services: ["web-development", "seo-services", "ecommerce-shopify", "custom-software-development"],
    faqs: [
      { question: "Can you work under a UK NDA?", answer: "Yes. We sign client NDAs before discovery when asked." },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    country: "United Arab Emirates",
    h1: "Software Development Partner for UAE Companies",
    tagline: "Near-timezone delivery for Gulf businesses that need bilingual, mobile-first products.",
    metaTitle: "Software Development Company for UAE Clients | WordbitX",
    metaDescription:
      "WordbitX builds websites, apps and business software for UAE companies with near-timezone collaboration, bilingual interfaces and mobile-first delivery.",
    overview: [
      "The UAE sits close to PKT, which makes collaboration simpler than US work: same-day reviews without heroic hours. Products are usually bilingual, mobile-first and designed for a mixed expat and local audience.",
      "We do not claim local trade licences we do not hold. Delivery is remote software work for your UAE entity.",
    ],
    needs: [
      "Bilingual marketing sites and portals",
      "Property and hospitality systems",
      "Retail POS and inventory for multi-branch groups",
      "App Store and Play launches for regional products",
    ],
    delivery: [
      "Same-day overlap with Gulf business hours",
      "English project language; Arabic UI when the product needs it",
      "Payment and invoice arrangements agreed in the proposal",
    ],
    industries: ["real-estate", "hospitality", "retail", "ecommerce"],
    services: ["web-development", "mobile-app-development", "pos-software", "real-estate-portals"],
    faqs: [
      { question: "Do you travel to Dubai or Abu Dhabi?", answer: "Kick-offs can be remote. On-site workshops are scoped separately when the project justifies the travel." },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    country: "Canada",
    h1: "Software Development Partner for Canadian Teams",
    tagline: "Remote product engineering with scheduled Canada overlap and client-owned cloud accounts.",
    metaTitle: "Software Development Company for Canadian Clients | WordbitX",
    metaDescription:
      "WordbitX works with Canadian businesses on custom software, web and mobile products, with overlap hours and repositories hosted in your organisation.",
    overview: [
      "Canadian engagements look similar to US product work: written scope, weekly demos, and infrastructure in your AWS, GCP or Azure organisation. We schedule overlap for Eastern or Pacific time as the project requires.",
      "What changes north of the border is usually the paperwork and the polish. Security questionnaires, a mutual NDA before the first technical call, and IP assignment on final payment are normal asks, and we sign them rather than negotiating them away. French-Canadian (FR-CA) copy and layout are treated as a second design pass, not a translation plugin bolted on at launch.",
      "Payments are province-aware: Interac where a store needs it, Stripe or Shopify Payments for cards, GST/HST lines on invoices when your accountant wants them shown. For content-led businesses we build the blog, schema and landing-page architecture in the same project, because most Canadian service firms compete on organic search rather than ad spend.",
      "Delivery runs from Lahore with a 6–9 hour overlap against Eastern Canada. You get a named engineer on the project, not a ticket queue: decisions go into one channel, demos are recorded if you cannot attend, and the repo is yours from the first commit.",
    ],
    needs: [
      "Bilingual (EN/FR) interfaces when the product requires it",
      "SaaS MVPs and internal operations tools",
      "Stores and booking products with Canadian payments and tax",
      "Service-business websites that win local search in the GTA, Montreal and Vancouver",
      "Client portals for clinics, dental and professional-services firms",
      "Migration off a legacy CMS that nobody on the team can safely update",
    ],
    delivery: [
      "Overlap with ET / PT by agreement (6–9 hours against Eastern Canada)",
      "English delivery; French UI when scoped, reviewed by a francophone writer",
      "Code in your Git organisation, deployed to your cloud account",
      "NDA before discovery, IP assigned to you on final payment",
      "Invoices in USD, milestone-based, receipts your bookkeeper can file",
    ],
    industries: ["ecommerce", "education", "finance", "healthcare"],
    services: ["custom-software-development", "web-development", "mobile-app-development", "ai-solutions"],
    faqs: [
      { question: "Can you invoice a Canadian company?", answer: "Yes. Billing currency and tax treatment are set in the proposal — we invoice in USD by default and show GST/HST lines if your bookkeeper needs them." },
      { question: "How much does a website cost for a Canadian client?", answer: `Website packages run ${fixedPackages.us.starter} for a 5-page starter site, ${fixedPackages.us.business} for a business site and ${fixedPackages.us.store} for an online store, all in USD. Custom platforms are quoted after a short call — the numbers are published on our US and international pricing page.` },
      { question: "Do you sign NDAs and assign IP?", answer: "Yes. A mutual NDA before the first technical call, and full IP assignment to you on final payment. The code lives in your repository from the first commit, so there is nothing to hand over at the end." },
      { question: "Can you build in French as well as English?", answer: "Yes. Bilingual builds are a second content and layout pass with FR-CA review, not a machine-translated page. If you only need French on a few pages, that is scoped and priced as a smaller add-on." },
      { question: "What are meetings like across the time zones?", answer: "Calls are booked in ET or PT, usually 8–11am Eastern. Every demo is recorded, decisions are written down, and you are not asked to attend at 3am because a developer is awake." },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    country: "Australia",
    h1: "Software Development Partner for Australian Businesses",
    tagline: "A practical timezone neighbour for Australian product and operations work.",
    metaTitle: "Software Development Company for Australian Clients | WordbitX",
    metaDescription:
      "WordbitX delivers custom software, websites and mobile apps for Australian businesses with convenient timezone overlap and client-owned infrastructure.",
    overview: [
      "Australia and Pakistan share a workable overlap. Morning AEST lines up with Pakistani afternoon, which makes stand-ups and reviews easier than trans-Atlantic work. Delivery is remote into your accounts.",
      "The biggest practical difference is the shape of the work. Australian small business runs on service booking — trades, clinics, salons, tutoring, migration and accounting practices — so availability calendars, quote requests and mobile-first contact beat a brochure. For retail and hospitality the demand is a fast storefront that survives a Boxing Day spike, not a bespoke design system.",
      "We build in the stack your team can keep: WordPress or Next.js for sites, Shopify or WooCommerce for stores, Flutter for apps that must ship to both stores at once. Hosting is deployed to an Australian region (usually ap-southeast-2) when latency or data-handling policy calls for it, otherwise to the region you already pay for.",
      "Time-zone coverage is the reason clients here stay: a 6–8 hour overlap with AEST means a question asked at 9am in Sydney is answered the same working day, and a launch-night incident is handled by an engineer who is awake.",
    ],
    needs: [
      "Service-business websites and booking products",
      "Retail and field-service apps",
      "Internal tools and light ERP modules",
      "Trades and home-services sites with quote forms and suburb landing pages",
      "Shopify and WooCommerce stores that stay fast on a sale weekend",
      "Multi-site operations that need one dashboard across locations",
    ],
    delivery: [
      "Overlap with AEST / AEDT mornings (6–8 hours)",
      "English communication and documentation, written decisions in one channel",
      "Hosting region chosen with you (often ap-southeast-2)",
      "NDA before discovery, code handed over in your repository",
      "Invoices in USD, milestone-based, with a written scope before any build",
    ],
    industries: ["retail", "logistics", "education", "ecommerce"],
    services: ["web-development", "mobile-app-development", "custom-software-development", "pos-software"],
    faqs: [
      { question: "Do you support after go-live?", answer: "Yes. Support windows are agreed so Australian business hours are covered for incidents — typically a morning AEST slot where a real engineer responds, not an overnight queue." },
      { question: "How much does a website cost for an Australian client?", answer: `Website packages run ${fixedPackages.us.starter} for a 5-page starter site, ${fixedPackages.us.business} for a business site and ${fixedPackages.us.store} for an online store, all in USD. Custom platforms are quoted after a short call — the numbers are published on our US and international pricing page.` },
      { question: "Can you work with an Australian agency?", answer: "Yes. White-label delivery is common: your brand on the client-facing calls, our engineers in the build, work committed to your repository. NDAs and subcontractor paperwork are signed before discovery." },
      { question: "Where is the site hosted?", answer: "Wherever makes sense for your audience and policy — an Australian region such as ap-southeast-2 for latency or data-handling requirements, or the account you already run." },
      { question: "How do you handle accessibility?", answer: "Semantic HTML, keyboard navigation and contrast are checked as part of the build, with a WCAG 2.2 AA pass on public pages. Retrofitting accessibility after launch costs several times more, which is why it is in scope from the start." },
    ],
  },
];

export function getMarket(slug: string) {
  return markets.find((item) => item.slug === slug);
}
