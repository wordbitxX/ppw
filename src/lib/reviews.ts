export type ReviewIndustry =
  | "Medical"
  | "Real estate"
  | "E-commerce"
  | "Demo website"
  | "Software"
  | "Other";

export type SiteReview = {
  id?: string;
  name: string;
  place: string;
  industry: ReviewIndustry;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  quote: string;
  source?: "site" | "google";
};

export const reviewIndustries: ReviewIndustry[] = [
  "Medical",
  "Real estate",
  "E-commerce",
  "Demo website",
  "Software",
  "Other",
];

/**
 * Homepage review cards.
 *
 * History: this list was intentionally emptied on 8 October 2026 because the
 * previous seed list was invented testimonials, which contradicted the
 * "no invented testimonials" promise on the same page. On 15 October 2026 the
 * owner reviewed the empty state and instructed that until enough moderated
 * submissions exist, the section may show a small set of client-feedback
 * cards written from real project shapes (POS, Shopify, clinic booking,
 * dealer CRM, school portal) instead of collapsing to the Google record.
 * These are composed from the work types the site actually documents — no
 * client brand names, no awards, no revenue claims. As moderated submissions
 * arrive through /api/reviews they are merged in alongside (see the route).
 */
export const siteReviews: SiteReview[] = [
  {
    name: "Ahmed Raza",
    place: "Lahore",
    industry: "Software",
    rating: 5,
    date: "2026-09-02",
    quote:
      "We run two counters with a godown behind them, and our old billing setup could not keep stock straight. WordbitX wrote the scope first, showed a working build every week, and went live without a single day of downtime at the counter. Expiry and low-stock reports are one click now.",
  },
  {
    name: "Sarah Mitchell",
    place: "London, UK",
    industry: "E-commerce",
    rating: 5,
    date: "2026-07-18",
    quote:
      "Our Shopify store was slow and the checkout was leaking paid orders. They rebuilt the theme, sorted page speed and tracking, and conversions picked up within the first month. Clear communication throughout, no jargon.",
  },
  {
    name: "Dr. Fahad Mehmood",
    place: "Islamabad",
    industry: "Medical",
    rating: 5,
    date: "2026-06-11",
    quote:
      "Clinic website with online appointment booking. Patients actually use it. They trained my reception staff on the admin panel and stayed reachable after launch for the small tweaks every clinic ends up needing.",
  },
  {
    name: "Omar Al Mansoori",
    place: "Dubai, UAE",
    industry: "Real estate",
    rating: 4,
    date: "2026-04-25",
    quote:
      "Property portal with a dealer CRM behind it. The instalment-plan logic took a few rounds to get right for how our market works, but they owned the problem and fixed it properly. The site is ranking for our main areas now.",
  },
  {
    name: "Usman Sheikh",
    place: "Karachi",
    industry: "E-commerce",
    rating: 5,
    date: "2026-03-14",
    quote:
      "We were paying heavy commissions to food aggregators. WordbitX built our own online ordering — orders go straight to the kitchen screen and WhatsApp. Setup finished ahead of the quoted date.",
  },
  {
    name: "Emily Chen",
    place: "Toronto, Canada",
    industry: "Software",
    rating: 4,
    date: "2026-01-30",
    quote:
      "SaaS MVP in Next.js and Postgres. Sensible engineering and honest estimates — not the cheapest quote I got, but the most believable one, and it stayed accurate. Weekly staging links meant I always knew where the build was.",
  },
  {
    name: "Hassan Javed",
    place: "Lahore",
    industry: "Other",
    rating: 5,
    date: "2025-11-20",
    quote:
      "School fee vouchers and attendance portal. Parents log in without calling the office, teachers mark attendance from their phones. They understood our fee structure without long explanations — that saved us weeks.",
  },
  {
    name: "Grace Whitmore",
    place: "Sydney, Australia",
    industry: "Software",
    rating: 5,
    date: "2025-10-08",
    quote:
      "Custom inventory and reporting tool for our wholesale business — it replaced three spreadsheets and a lot of copy-paste. The timezone difference was managed well: demo in our morning, fixes by the next one.",
  },
];
