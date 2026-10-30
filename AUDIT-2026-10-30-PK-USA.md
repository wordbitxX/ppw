# WordbitX — Full site audit + `/pk` & `/usa` decision (30 October 2026)

Measured against the **production build** (`next build` + `next start`) on 30 Oct 2026,
after the header fix and the new `/usa` page shipped in PR #9.

---

## 0. TL;DR (Roman Urdu)

1. **Site technically bohat saaf hai.** 263 sitemap URLs, sab 200, koi broken internal link
   nahi, duplicate title/description nahi, har page pe 1 H1 aur sahi canonical. Yeh kaam
   dobara karne ki zaroorat nahi.
2. **`/pk` aur `/usa` dono rehne chahiye — merge na karein.** Koi bhi mojooda page
   "website ki qeemat" ka jawab number ke saath nahi deta; `/pricing` ne to design se hi
   numbers dene se inkaar kiya hua hai. Inko merge karne se wohi contradiction paida hogi
   jo abhi already hai.
3. **Asli masla pages ka nahi, PRICES ka hai.** Site pe ek hi cheez ke 4 mukhtalif daam
   bataye ja rahe hain:
   - `/pk` → business website **Rs. 20,000**
   - `/tools/cost-calculator` → business website **Rs. 2,50,000 – 4,50,000** (12× zyada)
   - `/usa` → starter **$499**, business **$899**
   - `/blog/website-development-cost-pakistan` → business brochure **$800 – $2,500**
   - `/pricing` → "no fake sticker price" + FAQ "Why don't you list dollar packages?"
     (jabke `/usa` dollar packages list kar raha hai)
   Customer in dono ko parh kar bharosa nahi karega. **Yeh P0 hai — sab se pehle yahi fix karein.**
4. **`/usa` navigation mein kahin nahi hai.** Header nav mein `Pakistan` hai, `USA` nahi;
   home, services, calculator, blog, `/hire-developers/usa` — kisi ke andar `/usa` ka ek
   bhi contextual link nahi. Sirf footer (263 pages) aur `/global/usa` se milta hai.
5. Performance, thin market pages aur 7 lambe meta descriptions P1/P2 hain — neeche list.

---

## 1. What was measured

| Check | Method | Result |
|---|---|---|
| Crawl | All 263 URLs from `/sitemap.xml`, production server | **263/263 → HTTP 200** |
| Internal links | 377 unique in-site hrefs from those pages | 1 non-200 → `//www.dmca.com/...` (external, harmless) |
| Meta | title, description, canonical, H1 per page | 0 duplicates, 0 missing, 0 mismatches, 1 H1 everywhere |
| Schema | JSON-LD types per template | Organization, WebSite, Service/ProfessionalService, Offer, FAQPage, BreadcrumbList |
| Weight | HTML bytes, inline RSC, first-load JS/CSS (gzip) | home 934 KB HTML / 399 KB gzip assets |
| IA | In-content links to `/pk` / `/usa` | only `/pricing → /pk`, `/global/* → region page` |
| Prices | Every rupee/dollar figure in `src/` | **4 conflicting sources** (see §3 P0-1) |

Build: Next 16.4.0, 263 sitemap URLs across 12 sub-sitemaps
(core 25 · services 60 · industries 15 · products 7 · cities 11 · global 6 · portfolio 26 ·
blog 41 · topics 39 · legal 5 · hire 16 · geo 12).

---

## 2. Scorecard (delta vs 11 Oct audit)

| Area | Score | Change | Note |
|---|---|---|---|
| Technical SEO | **5/5** | = | titles ≤ 61 ch, descs, canonicals, 1 H1, schema, redirects |
| Indexing hygiene | **4.5/5** | = | 263 clean URLs; 85 duplicate topic pages correctly canonicalised to services and kept out of the sitemap |
| Content depth | **4.5/5** | = | services/industries/blog/topics/clusters all covered |
| Trust / E-E-A-T | **3.5/5** | = | real studio photos + honest counts; GBP reviews & PSEB still owner-side |
| Performance | **3.5/5** | ↑ 0.5 | home HTML 1.12 MB → 934 KB; first-load JS/CSS still 399 KB gzip |
| **Information architecture** | **3/5** | ↓ | the new regional price pages are not wired into the nav or into commercial pages |
| **Price consistency** | **2/5** | ↓ | 4 different price stories on one domain |
| **Total** | **21/30 (70%)** | — | technical is strong; the gaps are commercial/content |

---

## 3. Problems, by priority

### 🔴 P0-1 — One product, four prices

| Source | Business website | Store | Notes |
|---|---|---|---|
| `/pk` | **Rs. 20,000** (Rs. 25,000 all-in) | quoted | fixed package, 5–8 pages |
| `/tools/cost-calculator` | **Rs. 2,50,000 – 4,50,000** | Rs. 5,00,000 – 10,00,000 | `src/components/cost-calculator.tsx` |
| `/usa` | **$499** starter / **$899** business | **$1,499** | new page |
| `/blog/website-development-cost-pakistan` | **$800 – $2,500** brochure | $2,500 – $15,000 | `src/lib/blog-more-a.ts` |
| `/pricing` | *"no fake sticker price"* | quoted | meta description + FAQ |

Two knock-on contradictions:

- `/pricing` FAQ answers **"Why don't you list dollar packages?"** — but `/usa` lists exactly
  that, three packages with dollar prices.
- `/pricing` hero copy: *"We do not publish a high 'starting at' number…"* — `/usa` publishes
  "$499" and `/pk` publishes "Rs. 20,000".

**Why it matters:** Google sees contradictory prices on the same entity (also in `Offer`
schema), and a buyer who reads `/pk` then the calculator concludes one of them is fake.
This is the single biggest trust leak on the site right now — bigger than any SEO item.

**Fix (one source of truth):** create `src/lib/price-ladder.ts` with three tiers and reuse
it everywhere:

| Tier | What it is | PKR | USD |
|---|---|---|---|
| **T1 Starter** | 5–8 page WordPress template site, CMS, basic SEO | 20,000 – 25,000 | 499 – 699 |
| **T2 Business** | custom design, 10+ pages, integrations, copy support | 150,000 – 350,000 | 900 – 2,000 |
| **T3 Store / app** | WooCommerce/Shopify or custom web app | 4,00,000+ | 2,500+ |

Then:
1. Calculator gets a **T1 option** (`Starter website (fixed package)` base 20,000–45,000) and
   its `website` preset is relabelled **"Custom business website"**. Also move the hard-coded
   `const USD = 280` (`cost-calculator.tsx:118`) into config.
2. `/pricing` FAQ → **"Do you have fixed-price packages?"** answer: yes, T1 in PKR on `/pk`
   and in USD on `/usa`; T2/T3 quoted. Meta description loses "no fake sticker price".
3. Blog cost table gets a **T1 row** and a link to `/pk` / `/usa`.

### 🔴 P0-2 — `/usa` is orphaned

In-content links (header/footer stripped) from the 14 most relevant pages:

| Page | → `/pk` | → `/usa` |
|---|---|---|
| `/` (home) | ✗ | ✗ |
| `/pricing` | ✓ | ✗ |
| `/services/web-development` | ✗ | ✗ |
| `/services/wordpress-development` | ✗ | ✗ |
| `/services/ecommerce-shopify` | ✗ | ✗ |
| `/tools/cost-calculator` | ✗ | ✗ |
| `/blog/website-development-cost-pakistan` | ✗ | ✗ |
| `/software-house/lahore` | ✗ | ✗ |
| `/web-development-lahore` | ✗ | ✗ |
| `/hire-developers/usa` | ✗ | ✗ |
| `/global/pakistan` · `/global/usa` | ✓ | ✓ |

So both regional pages depend on a **sitewide footer link** that appears on all 263 pages —
which is weak signal (footer links are discounted) and gives `/pk` no topical context from
the pages that actually rank for website-development terms.

Also: **`/usa` has no entry in the header nav.** `Pakistan` sits in `mainNav`
(`src/lib/site.ts:132`); USA does not exist anywhere in navigation.

### 🟠 P1-1 — `/pk` and `/usa` are ~80% the same page

Same section order, same sentences ("Sharp and fast on every screen", "Scope, timeline and
price in writing", "You own everything"), same six work cards with two swapped. Only prices,
currency and phone differ. Different countries justify different pages, but the body copy
needs to be genuinely localised or Google treats them as near-duplicates.

### 🟠 P1-2 — Homepage H1 is a slogan, title says something else

- `<title>`: **"Software Development Company in Pakistan | WordbitX"**
- `<h1>`: **"Software & AI development company for B2B One Platform. Endless Possibilities."**

"B2B One Platform. Endless Possibilities." reads like an ad strapline; the actual keyword
("software development company … Pakistan") only exists in the eyebrow span and the title.
H1 and title disagree, and the H1 carries no location.

### 🟠 P1-3 — Weight

| Page | HTML | inline RSC | gzip HTML | first-load JS+CSS (gzip) |
|---|---|---|---|---|
| `/` | 934 KB | **487 KB** | 128 KB | 399 KB (16 files) |
| `/pk` | 294 KB | 167 KB | 43 KB | 399 KB |
| `/usa` | 276 KB | — | 39 KB | 399 KB |
| `/pricing` | 171 KB | 102 KB | 31 KB | 399 KB |

The 399 KB gzip first-load bundle is shared by every route (layout-level client components).
Home's HTML carries 487 KB of inline flight payload — that is 4,253 words + serialised props
for client sections (reviews, rails, showcase).

### 🟠 P1-4 — Thin market pages vs the new ones

`/global` 334 words · `/global/australia` 408 · `/global/canada` 417 · `/resources` 372 ·
`/technologies` 398 — against `/global/pakistan` 726 and `/global/usa` 546. The two thin
country pages are the ones that should support the new `/usa` page.

### 🟡 P2 — Hygiene

1. **7 meta descriptions > 165 chars** (truncated in SERPs): `/portfolio` (185),
   `/comparisons` (182), `/glossary` (175), `/resources` (186), `/resources/app-rfp-template`
   (170), `/resources/free-website-audit` (179), `/portfolio/properties-pak-property-portal` (192).
2. **One OG image for all 263 pages** (`/opengraph-image`). `/pk` and `/usa` should get their
   own price-led card — that is what gets shared into WhatsApp groups and US Slack channels.
3. **Sitemap priority 0.9** for `/pk` and `/usa` (equal to `/pricing`, higher than `/services`) —
   Google ignores priority, but the file should not claim a new page is tier-1.
4. **Footer label** "USA website packages (USD)" mixes a currency into a nav label; the
   Pakistan one says "Pakistan website packages". Make both "Pakistan prices (PKR)" /
   "USA prices (USD)".
5. `/pk` and `/usa` both appear in the footer of **all 263 pages**, i.e. 526 sitewide links —
   fine for crawling, useless for relevance.

### 🟢 Verified healthy (no action)

- 263/263 pages return 200; no soft-404s, no redirect chains found from in-content links.
- 0 duplicate `<title>`, 0 duplicate meta descriptions, 0 missing canonicals, 0 canonical
  mismatches, 1 `<h1>` on every page.
- All 85 duplicate topic pages canonicalise to the matching service page and are excluded
  from the sitemap — correct.
- `robots.txt`: `/api/`, `/admin`, `/societies/`, `/lab` blocked; AI crawlers explicitly allowed.
- `/societies` hub indexed, children noindex — consistent signals.
- Schema on `/pk`: Service + 2 Offers in **PKR** + FAQPage + BreadcrumbList + Organization.
  `/usa`: Service + 3 Offers in **USD** + the same. Both correct.
- Images: 0 missing `alt`; the only empty alts are decorative (`alt=""`), which is right.
- `/pk` 885 words / `/usa` 890 words — correct length for a price page; do **not** grow these
  back into brochures.

---

## 4. The actual question: `/pk` and `/usa` — rakhein, adjust karein, ya merge karein?

### Verdict

| Page | Verdict | Why |
|---|---|---|
| `/pk` | **Keep, keep in nav** | Only page that answers "website price in Pakistan" with a number. 885 words, PKR Offer schema, links from `/pricing` + `/global/pakistan` + footer. It is the local conversion page. |
| `/usa` | **Keep, but connect it properly** | Only page that answers "website cost in USD". Currently orphaned (§P0-2) and 80% duplicate copy (§P1-1). Needs links + localisation, not a merge. |

### Why not merge them into existing pages

**`/pk` → `/pricing`?** No. `/pricing` is built on the opposite argument — its meta
description literally says "no fake sticker price", its H1 says "quoted on your brief, not a
sticker", and one FAQ explains why it does *not* publish dollar packages. Putting Rs. 20,000
and $499 on that page either breaks the page's whole argument or makes it say both things.
It already has a `/pk` band — that is the correct relationship: **`/pricing` = how custom
work is quoted, `/pk` = the fixed package.**

**`/pk` → `/software-house/lahore`?** No. That is city/company intent ("software house in
Lahore", 1,172 words) — different query, different job. Same for `/web-development-lahore`
(778 words) which targets the service+city pair.

**`/usa` → `/global/usa`?** Tempting, but no: `/global/usa` is a 546-word *market* page
("how we work with US teams, overlap hours, client-owned code"). It has no prices, no
packages, and its intent ("software development company for US clients") is different from
"how much does a website cost in the US". Merging would give you one page trying to do two
jobs and would delete a clean Offer/USD schema.

**`/usa` → `/pricing#us` anchor?** No — anchors do not rank, and you lose the FAQ/Offer schema.

### If you ever do want fewer pages

The one defensible consolidation is: **`/usa` → 301 → `/global/usa`**, with the market page
rewritten to include the package table. Do that only if `/usa` gets ~0 impressions in GSC
after 90 days. Right now it is too early and the page is not even linked.

**What not to do:** add more price pages (`/website-price-lahore`, `/cheap-website-pakistan`,
`/website-packages-karachi`). That is pure cannibalisation of `/pk` and the city cluster.

---

## 5. Fix plan (prioritised, with the file to touch)

| # | Fix | Files | Effort | Impact |
|---|---|---|---|---|
| 1 | One price ladder used by `/pk`, `/usa`, calculator, `/pricing` FAQ, cost blog | new `src/lib/price-ladder.ts`; `pk-landing.ts`, `us-landing.ts`, `cost-calculator.tsx`, `lib/pricing.ts`, `lib/blog-more-a.ts` | ~3 h | 🔥 trust |
| 2 | Calculator: add "Starter website (fixed package)" tier + relabel custom preset + config the USD rate | `src/components/cost-calculator.tsx` | ~2 h | 🔥 |
| 3 | `/pricing`: rewrite the "dollar packages" FAQ, drop "no fake sticker price" from meta, add a USA band next to the Pakistan one | `src/app/pricing/page.tsx`, `src/lib/pricing.ts` | ~1 h | 🔥 |
| 4 | Header: replace the separate **Pricing** and **Pakistan** items with one **Pricing** dropdown → *How we quote* · *Pakistan packages (PKR)* · *USA packages (USD)* | `src/components/header.tsx`, `src/lib/site.ts` | ~2 h | 🔥 IA |
| 5 | Contextual in-content links (descriptive anchors, not "click here") | `/` home pricing band → `/pk` + `/usa`; `services/web-development` → `/pk`; `services/wordpress-development` → `/pk`; `services/ecommerce-shopify` → `/usa`; `tools/cost-calculator` result → both; `blog/website-development-cost-pakistan` table + closing → both; `software-house/lahore`, `web-development-lahore` → `/pk`; `hire-developers/usa` → `/usa` | ~2 h | 🔥 |
| 6 | Localise `/usa` copy (replace the ~8 shared sentences): DTC/SaaS site types, US payment + invoice terms, ET/PT overlap, "no local US office — one team in Lahore" honesty line, US-specific FAQs | `src/lib/us-landing.ts` | ~2 h | SEO/trust |
| 7 | Expand `/global/australia`, `/global/canada` (to ~700 words like Pakistan) or noindex them | `src/lib/markets.ts` | ~2 h | SEO |
| 8 | Trim the 7 long meta descriptions to ≤ 160 ch | 7 page/data files | ~30 min | SEO |
| 9 | Homepage H1 → "Software & AI development company in Pakistan" (+ keep the strapline as a `<p>`) | `src/app/page.tsx:257-267` | ~15 min | SEO |
| 10 | Own OG image for `/pk` and `/usa` (price on the card) | `opengraph-image` per route | ~1 h | CTR |
| 11 | Performance pass: audit layout-level client components that ship 399 KB gzip on every route | `src/app/layout.tsx`, `src/components/*` | ~1 day | Perf |

Items 1–5 are the ones that pay for themselves. Everything in this list is code-side except
GBP reviews and PSEB (owner-side, unchanged from the 11 Oct audit).

---

## 6. 30 / 60 / 90

**Next 7 days (P0):** price ladder + calculator tier + `/pricing` copy + header Pricing
dropdown + contextual links. Ship as one PR.

**30 days:** localise `/usa`, per-page OG images, trim descriptions, home H1, expand or
noindex the two thin market pages; submit `/usa` in GSC and watch impressions for 4 weeks.

**60 days:** measure `/pk` vs `/usa` in GSC (query split should be
"website price/cost pakistan" vs "website cost usa/dollars"); if `/usa` is flat, decide
whether to 301 it into `/global/usa` with the package table folded in.

**90 days:** performance pass on the shared client bundle; blog cadence 2/month targeting
"website cost in pakistan" long-tails, each linking back to `/pk` (or `/usa` for USD queries).

---

## 7. Appendix — raw numbers used above

**Word counts (main content, header/footer stripped):** home 4,253 · `/services` 2,209 ·
`/topics` 2,530 · `/blog` 2,187 · `/services/web-development` 1,212 · `/pricing` 1,175 ·
`/software-house/lahore` 1,172 · `/usa` 890 · `/pk` 885 · `/blog/website-development-cost-pakistan`
858 · `/web-development-lahore` 778 · `/global/pakistan` 726 · `/global/usa` 546 ·
`/global/canada` 417 · `/global/australia` 408 · `/global` 334.

**Sitemap groups:** core 25 · services 60 · industries 15 · products 7 · cities 11 · global 6 ·
portfolio 26 · blog 41 · topics 39 · legal 5 · hire 16 · geo 12 = **263**.

**Duplicate topics:** 124 topic links on `/topics`, 39 in the sitemap, 85 canonicalised to
service pages (spot-checked `/topics/ai-chatbot-development` → `/services/ai-solutions`,
`/topics/amazon-seller-central-guide` → `/services/amazon-store-setup`).

**Hero images (source JPEGs, optimised at request time by `next/image`):**
`/demos/cover/ecommerce.jpg` 212 KB · `/demos/cover/luxury-restaurant.jpg` 126 KB ·
`/brand/office-collaboration.jpg` 202 KB.

---

*Audit run by crawling the production build locally on 30 Oct 2026. No page was modified
while measuring; `/pk` and `/usa` figures are from the build created by PR #9.*
