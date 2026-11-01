# Content expansion — 1 November 2026

## Scope
- 16 requested canonical guide URLs: four existing matching URLs updated, twelve added. Existing matching publication dates retained; modified dates are 2026-11-01.
- Every guide has 1,200–1,800 words including its four topic-specific FAQ answers, a local screenshot, primary service link, /pk, /pricing, related-guide links and three related cards.
- New /faqs hub includes topic groups, explicit Lahore/Karachi/Islamabad/near-me variants and questions for all twelve requested industries.
- Additional price FAQs on /pk and /pricing; service FAQs and guide backlinks; hub links in FAQ blocks and footer.
- Six additive homepage blocks; existing hero, colours and existing homepage copy retained.

## Factual boundaries
Live /pk, /services/ai-solutions and /blog were read before editing. Own prices match the live packages. Other market figures and Shopify offer terms come from the owner's 1 November 2026 brief, not independently verified live vendor research. Readers are told to confirm third-party eligibility, billing and current terms.

No standalone WordbitX hosting plans, coupon codes, invented customer results, testimonials, dedicated developer prices or maintenance subscription prices were added. Hosting is included only in the Rs. 25,000 package, not the Rs. 20,000 package. No promotional offer is published in the homepage offers block.

Standalone hosting and accepted JazzCash/Easypaisa payments remain owner-to-confirm. Dedicated developers and ongoing maintenance remain quoted services.

## Images
`guide-image-provenance.json` records each screenshot. They are actual Chromium captures of the site's package interface or AI offering interface, not stock photography, generated imagery, mocked dashboards or evidence of client outcomes. The same truthful source section is reused where appropriate. Capture script needs optional `playwright-core` and `@sparticuz/chromium`; neither was added to production dependencies.

## Checks
- `node scripts/check-guides.mjs`: article lengths, four FAQs, local image existence, primary service links, package links, related links/card counts.
- `npm run typecheck`: passes.
- `npm run build`: passes (414 generated routes at first build).
- Changed-file ESLint: passes.
- Production HTTP/schema/link/sitemap smoke checks: pass; FAQ hub has 233 unique questions matching visible answers.
- Full repository lint: existing errors in `hire-developers/page.tsx`, `tools/cost-calculator/page.tsx`, `review-admin.tsx`, `review-slider.tsx`, plus analytics warning. Left untouched to respect scope.

## Publishing
Changes are in the working branch, not deployed to the production domain. Core and services sitemap lastmod use deployment date; guide lastmod uses the content's updatedAt/publishedAt. /faqs is included in the core sitemap.

## Owner-requested revision (same day)
The owner clarified that the desktop header's literal **Home** navigation link should be removed; the logo's home link remains accessible. The owner explicitly replaced the original no-AI-images restriction by selecting **AI images now allowed**.

Ten individually generated, topic-specific premium editorial covers replace repeated screenshots for the first ten requested guides. They are compressed 1600×900 WebP assets (roughly 65–148 KB each), with descriptive alt text and visible AI-illustration disclosure on each article. The six remaining guides still use their original screenshots because the image tool's ten-image-per-turn limit was reached. Their replacement remains pending; do not describe all sixteen as completed.

Every guide now has a deliberately written complete meta description rather than a raw truncated excerpt. Canonicals, BlogPosting/FAQPage data, internal links, city questions and sitemap entries remain in place. These are indexing and relevance provisions, not proof of indexing or a ranking guarantee; no Search Console submission or production deployment was performed. The broader editorial rewrite requested by the owner is not represented as completed in this image/header revision.

`src/lib/guide-editorial.json` records generated-image status and descriptions. The content builder and screenshot capture script preserve the generated assets instead of reverting them on regeneration.

## Remaining six covers completed
Replaced the six remaining screenshots with individually generated editorial covers: domain ownership/violet hosting, cloud server infrastructure, honest cost/scope comparison, document-grounded chatbot, human-approved automation and developer-assisted AI website building. All 16 guides now use distinct compressed WebP covers, with accurate alt text, provenance and AI disclosure. Hosting imagery is conceptual; it is not a Hostinger screenshot, offer or endorsement. No provider price, product claim or partnership was added. Article copy, site colours and layout were not changed in this revision.

Validation: article checks, TypeScript, production build, HTTP/schema/sitemap smoke tests, and uniqueness/HTTP checks for all 16 WebP files pass. Preview restarted with the updated production build; production domain deployment remains pending.
