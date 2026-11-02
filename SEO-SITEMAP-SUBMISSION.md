# WordbitX — Sitemap & Google Search Console Guide

## Canonical host

`https://wordbitx.pk/` redirects (308 permanent) to `https://www.wordbitx.pk/`.

Submit sitemaps on the **URL-prefix property `https://www.wordbitx.pk/`** or the **Domain property `wordbitx.pk`** (never on `http://` or non-`www` URL-prefix properties, which will show `0 discovered pages` because every `<loc>` uses `https://www.wordbitx.pk/...`).

## Submit this one file

```text
https://www.wordbitx.pk/sitemap-index.xml
```

Do **not** also submit `/sitemap.xml` alongside `/sitemap-index.xml` — both list the same 278 canonical URLs, so submitting both duplicates GSC sitemap counts. `robots.txt` points solely to `https://www.wordbitx.pk/sitemap-index.xml`.

## Child sitemaps (12 files referenced by `sitemap-index.xml` — 278 URLs total)

| File | URLs | What it lists |
| --- | ---: | --- |
| `/sitemaps/core.xml` | 26 | Home, About, Services, Products, Software House, Societies hub, Industries, Global, Technologies hub, Portfolio, Blog, Topics hub, Contact, Pricing, PK, USA, Process, Careers, FAQs, Cost Calculator, Comparisons, Glossary, Resources + 3 templates |
| `/sitemaps/services.xml` | 60 | Dedicated service pages (`/services/[slug]`) |
| `/sitemaps/products.xml` | 8 | Owned product & showcase pages (`/products/[slug]`) |
| `/sitemaps/cities.xml` | 11 | Pakistan city pages (`/software-house/[slug]`) |
| `/sitemaps/geo.xml` | 12 | City-specific service landing pages (`/web-development-lahore`, etc.) |
| `/sitemaps/hire.xml` | 16 | `/hire-developers` hub + 15 technology/market hiring pages |
| `/sitemaps/industries.xml` | 15 | Industry vertical pages (`/industries/[slug]`) |
| `/sitemaps/global.xml` | 6 | Country delivery pages (`/global/[slug]`) |
| `/sitemaps/portfolio.xml` | 27 | Case studies & project profiles (`/portfolio/[slug]`) |
| `/sitemaps/blog.xml` | 53 | Blog articles & Pakistan cost guides (`/blog/[slug]`) |
| `/sitemaps/topics.xml` | 39 | Indexable software topic guides (`/topics/[slug]`) |
| `/sitemaps/legal.xml` | 5 | Privacy, terms, cookies, disclaimer, editorial policy |

`/sitemap.xml` still exists as a flat combined feed for debugging, but is intentionally omitted from `robots.txt` and `sitemap-index.xml`.

## Intentionally excluded from XML sitemaps

- `/societies/[slug]` (18 pages) — `<meta name="robots" content="noindex, follow">` (crawlable in `robots.txt` so Googlebot can read `noindex`; `/societies` hub remains indexable)
- `/technologies/[slug]` (6 pages) — `<meta name="robots" content="noindex, follow">`
- `/topics/[slug]` duplicate subset (85 pages) — `<meta name="robots" content="noindex, follow">`
- `/sitemap` HTML sitemap, `/admin/reviews`, `/lab/service-nav`, `/sample` — `noindex`
- Demo subdomains (`dha.wordbitx.pk`, `salon.wordbitx.pk`, etc.) — separate hosts
- Legacy slugs that 308-redirect in `next.config.ts`

## After deploy

1. Search Console → Property `https://www.wordbitx.pk/` (or Domain property `wordbitx.pk`) → Sitemaps → keep **only** `sitemap-index.xml`.
2. Remove any stale submissions for `sitemap.xml`, `sitemaps/technologies.xml`, or `sitemaps/societies.xml`.
3. Use URL Inspection → **Request Indexing** only on priority `200 OK` canonical URLs, never on redirected or `noindex` URLs.
