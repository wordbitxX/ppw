/**
 * The site's single source of truth for what a website costs.
 *
 * Why this file exists (audit 30 Oct 2026): the same product was priced five
 * different ways on one domain — Rs. 20,000 on /pk, Rs. 2,50,000–4,50,000 in the
 * cost calculator, $499 on /usa, $800–2,500 in the cost blog post, and /pricing
 * said "no sticker price" while listing none. Every page that shows a number
 * must read it from here.
 *
 * Two price lists, on purpose:
 *  - PKR is the Pakistani market price (what /pk publishes).
 *  - USD is a separate list for US/international clients, set for that market —
 *    it is NOT a rupee conversion. Do not "convert" one from the other.
 *
 * Bands:
 *  - `fixed`  → template WordPress packages with a fixed scope (5–10 pages).
 *                USD starts at $150 so a small US business is not priced out.
 *  - `custom` → custom design/build: business sites, stores, portals.
 *  - `app`    → custom web apps, ERP/CRM, POS platforms.
 * The calculator models `custom` and `app`; `fixed` is the packaged route.
 */

export type PriceTier = {
  id: "fixed" | "custom" | "app";
  name: string;
  includes: string;
  pkr: { from: number; to?: number };
  usd: { from: number; to?: number };
  /** Pre-formatted labels — the only strings pages should print. */
  pkrLabel: string;
  usdLabel: string;
};

export const priceTiers: Record<PriceTier["id"], PriceTier> = {
  fixed: {
    id: "fixed",
    name: "Fixed website package",
    includes: "Template WordPress site, 5–10 pages, CMS, basic SEO",
    pkr: { from: 20_000, to: 25_000 },
    usd: { from: 150, to: 499 },
    pkrLabel: "Rs. 20,000 – 25,000",
    usdLabel: "$150 – $499",
  },
  custom: {
    id: "custom",
    name: "Custom website or store",
    includes: "Custom design, integrations, catalogue or multi-language",
    pkr: { from: 250_000, to: 1_000_000 },
    usd: { from: 600, to: 2_500 },
    pkrLabel: "Rs. 2,50,000 – 10,00,000",
    usdLabel: "$600 – $2,500",
  },
  app: {
    id: "app",
    name: "Custom app, ERP or POS",
    includes: "Accounts, roles, workflows, reporting, integrations",
    pkr: { from: 900_000 },
    usd: { from: 2_500 },
    pkrLabel: "Rs. 9,00,000+",
    usdLabel: "$2,500+",
  },
};

/** The three fixed packages each market actually sells. */
export const fixedPackages = {
  pk: {
    starter: "Rs. 20,000",
    allInOne: "Rs. 25,000",
    renewal: "Rs. 10,000",
    supportMonths: 3,
  },
  us: {
    starter: "$150",
    business: "$299",
    store: "$499",
    domainHosting: "$50",
    care: "from $49/mo",
    seo: "from $149/mo",
    customApp: "from $2,500",
    supportMonths: 3,
  },
} as const;

/**
 * Rupee-per-dollar rate used only to show an approximate USD figure beside a
 * PKR estimate in the calculator. Not a quote and not an invoice rate.
 */
export const usdRatePkr = 280;

/** Where each market's packages live. Used for internal linking. */
export const packagePages = {
  pk: { href: "/pk", label: "Pakistan prices (PKR)" },
  us: { href: "/usa", label: "USA prices (USD)" },
  pricing: { href: "/pricing", label: "How we quote" },
} as const;

export function pkrLabel(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

/** Approximate USD label for a PKR range — always prefixed with "≈". */
export function approxUsd(pkr: number): string {
  return `≈ $${Math.round(pkr / usdRatePkr / 10) * 10}`;
}

export const priceLadderNote =
  "Fixed packages are priced in PKR for Pakistan and in USD for US clients. Custom builds are quoted on scope, in writing.";
