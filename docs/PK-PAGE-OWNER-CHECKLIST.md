# Pakistan pages — owner checklist before publish

Built from the 29 Oct 2026 brief. This file is the honest list of what the code can
prove and what only the owner can supply.

## What shipped

| Page | URL | Status |
| --- | --- | --- |
| Pakistan offer | `/pk` | Built, 17 sections, FAQPage + LocalBusiness + Breadcrumb schema |
| Lahore | `/pk/web-design-lahore` | Built, unique local content |
| Karachi | `/pk/web-design-karachi` | Built, unique local content |
| Islamabad | `/pk/web-design-islamabad` | Built, unique local content |
| Rawalpindi | `/pk/web-design-rawalpindi` | Built, unique local content |
| Faisalabad | `/pk/web-design-faisalabad` | Built, unique local content |

Also changed:

- **Header** — one new button, “Pakistan Prices (PKR)”, linking to `/pk`. It also
  appears in the mobile menu. No auto-redirect, no geo-gate: international visitors
  are never pushed off the homepage.
- **Homepage hero** — the headline is one sentence with one full stop:
  “We build software, websites and apps that grow your business.” The old
  “One Platform. / Endless Possibilities.” fragment is gone.
- **Sitemap** — `/pk` and all five city pages are in `sitemap.xml` and in the new
  `/sitemaps/pk.xml` index group. `robots.txt` already allows them.
- **Internal links** — header, homepage hero, footer, `/services` and `/pricing` all
  link to `/pk`. `/pk` links to every city page and back out to services, cost
  guides, portfolio and products.

## The one file to edit

`src/lib/pk.ts` → the `pkPricing` object at the top.

```ts
export const pkPricing = {
  businessWebsite: null,   // e.g. 45000
  allInOne: null,          // e.g. 65000
  renewalYear2: null,      // e.g. 18000
  supportMonths: null,     // e.g. 3
  maintenanceMonthly: null,// e.g. 5000 — leave null if not offered
  bookingUrl: null,        // Cal.com / Calendly URL
  hours: null,             // e.g. "Mon–Sat, 10am–7pm PKT"
};
```

Paste a number and, with no other change:

- both hero price tags switch from “Fixed quote in PKR” to “from Rs. 45,000”;
- both package cards show the real “from” price;
- the trust strip shows the support period;
- title tags switch to “… — PKR Prices”;
- `LocalBusiness` schema gains `priceRange`;
- the “Last updated” line stays consistent across all six pages.

While a value is `null` the page renders a non-numeric, honest line (“Clear PKR
pricing, fixed in writing”, “Fixed quote”, “Lahore business hours”). It never
invents a figure and never says “contact for price” as a substitute price.

A yellow **preview-only** banner at the top of `/pk` and the city pages lists every
field still missing. It is hidden by default and only renders when the dev server is
started with `NEXT_PUBLIC_PK_CHECKLIST=1`; it is also compiled out of production
(`NODE_ENV === "production"`), so it cannot reach a live visitor or a review screenshot.

## Checklist from section 10 of the brief

| Item | Status in this build |
| --- | --- |
| Starter website price (PKR, from) | **Missing** — `pkPricing.businessWebsite` |
| All-in-one price (domain + 1 year hosting) | **Missing** — `pkPricing.allInOne` |
| Renewal price year 2 | **Missing** — `pkPricing.renewalYear2` |
| Support period (months) | **Missing** — `pkPricing.supportMonths` |
| Store / app / POS approach | Page says “quoted after a free call, fixed in writing” — confirm this is the policy |
| Free-call booking link | **Missing** — buttons fall back to `/contact`, as briefed |
| Reply time + working hours | Hours **missing**; the page says “Lahore business hours (PKT)” |
| Public address | Currently published as “DHA Phase 2, Lahore, Pakistan” — confirm the public street address |
| 6 approved samples + permission | Six WordbitX-owned builds shown: Properties Pak (live product) plus five demo builds. No client project is named. Add client work only with written permission |
| Case-study numbers verified | None invented. Properties Pak uses feature facts from the live product (19 property types, 8 cities, society/phase/block inventory, map search) |
| Care plan price (PKR/month) | **Missing** — `pkPricing.maintenanceMonthly` |
| Hero headline final text | “Websites, apps and software for Pakistani businesses” |
| Preview then publish on a phone | Preview build now; publish after the fields above are filled and the phone check is signed off |

## Screenshots (important)

The sample cards use `src/lib/demo-shots.ts`, which prefers a real capture in
`public/demos/<id>.jpg`. Those captures are not committed in this repository yet, so
the cards currently fall back to the commissioned covers in
`public/demos/cover/`, which are labelled **“Illustration representing …”** and drop
the browser chrome on purpose.

To show real screenshots:

```bash
npm i -D playwright sharp
npx playwright install chromium
npm run demo:shots
git add public/demos/*.jpg
```

On Vercel this already happens automatically through the `vercel-build` script.

## Reviews, ratings and results — do not shortcut these

- No star rating, review count, client logo or testimonial appears on `/pk`.
  Nothing on this page is borrowed.
- The review cards in `src/lib/reviews.ts` are composed from real project shapes,
  not verified client statements. They are **not** used as proof on `/pk`.
- To add proof later: invite each real past client once by WhatsApp or email with
  the direct Google review link and the direct Clutch review link. Both are free.
  Never use team-member reviews and never buy reviews.
- A case study without verified numbers stays a **Project Profile** (scope,
  architecture, features), the same rule the portfolio already follows.

## SEO / technical checks completed

- One `<h1>` per page; title + meta description unique per page.
- Canonical is the `www` URL for all six pages.
- `FAQPage` schema on `/pk` (15 questions) and on every city page (5 questions),
  no duplicate questions within a page.
- `LocalBusiness` + `ProfessionalService` schema on `/pk` only — no fake office in
  the other cities. `priceRange` and `openingHours` are emitted only once supplied.
- `Service` + `BreadcrumbList` schema on each city page.
- `sitemap.xml` and `/sitemaps/pk.xml` include every new URL; `robots.txt` allows them.
- Link audit: every internal href on all six pages returns 200. No `#` placeholders.
- Mobile: sticky Call + WhatsApp bar; price, package and buttons are in the first
  screen; no animation or gradient on these pages.

## Adding another city

1. Add an entry to `pkCityPages` in `src/lib/pk-cities.ts` — with its own areas,
   industries, search phrases, local services, local SEO paragraph and FAQs.
2. That is it: the route, sitemap group and internal links are generated from the
   array. Do **not** copy another city and swap the name; Google scores the whole
   domain for thin duplicates.

## Before you tick “done”

- [ ] Fill every `null` in `pkPricing` and remove the preview banner (automatic in production).
- [ ] Confirm the published street address and working hours.
- [ ] Confirm the booking link, or accept the `/contact` fallback.
- [ ] Confirm the two sample-labelling rules (live product vs demo vs confidential).
- [ ] Run `npm run demo:shots` so sample cards show real captures.
- [ ] Open `/pk` and `/pk/web-design-lahore` on a phone, on mobile data.
- [ ] Submit `/sitemap-index.xml` in Search Console after deploy.
