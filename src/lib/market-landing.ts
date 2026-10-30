import type { Faq, IconName } from "@/lib/types";
import type { PkIconName } from "@/components/pk-icons";

/**
 * Shared content shape for the price-led country pages (/pk and /usa).
 *
 * Both pages are the same shop-front: a price, what you get, what it costs to
 * add things, a few examples, four steps and short answers. Only the numbers,
 * the currency and the contact channel change — so the copy lives in one typed
 * object per market and one component renders it.
 *
 * Copy rule for these pages (owner request, 30 Oct 2026): one line per idea.
 * A visitor should be able to scan the whole page like a shop window — no
 * paragraphs to wade through.
 */

export type MarketStat = { value: string; label: string; highlight?: boolean };

export type MarketPackage = {
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

export type MarketIncluded = { title: string; text: string };

export type MarketService = { slug: string; title: string; text: string; icon: IconName };

export type MarketReason = { title: string; text: string; icon: PkIconName };

export type MarketCity = { slug: string; name: string; blurb: string; mapKey: string; province: string };

export type MarketStep = { step: string; title: string; text: string };

export type MarketWork = { id: string; blurb: string };

export type MarketAddOn = { label: string; price: string };

export type MarketContent = {
  key: "pk" | "us";
  /** "Prices in PKR" / "Prices in USD" — one line under the price cards. */
  currencyNote: string;
  hero: {
    eyebrow: string;
    title: string;
    priceLabel: string;
    price: string;
    sub: string;
    chips: string[];
    /** Demo used for the hero mock-up (id from src/lib/demos.ts). */
    demoId: string;
    image: string;
    imageAlt: string;
    priceCardLabel: string;
    priceCardNote: string;
    priceCardChip: string;
    stats: MarketStat[];
  };
  contact: {
    /** Builds a prefilled WhatsApp link for the market's own number. */
    whatsapp: (message?: string) => string;
    phoneDisplay: string;
    phoneRaw: string;
    hours: string;
  };
  regionSwitch: { href: string; label: string };
  packages: {
    eyebrow: string;
    title: string;
    description: string;
    items: MarketPackage[];
    addOns?: MarketAddOn[];
    note: string;
  };
  included: {
    eyebrow: string;
    title: string;
    intro: string;
    chips: string[];
    items: MarketIncluded[];
  };
  services: { eyebrow: string; title: string; description: string; items: MarketService[] };
  why: { eyebrow: string; title: string; description: string; items: MarketReason[] };
  cities?: { eyebrow: string; title: string; description: string; items: MarketCity[] };
  work: { eyebrow: string; title: string; description: string; items: MarketWork[] };
  process: { eyebrow: string; title: string; description: string; items: MarketStep[] };
  faqs: { eyebrow: string; title: string; intro: string; items: Faq[] };
  finalCta: { eyebrow: string; title: string; text: string; cities: { name: string; slug: string }[] };
};
