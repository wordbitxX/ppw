# Cinematic design system (Oct 2026 redesign)

Direction: near-black **midnight `#0A1128`**, white type, **electric-blue / icy-cyan light** for atmosphere,
**brand green `#1CA830`** kept only for actions and markers (see `BRAND.md`).

## Reference art → assets
Processed from the owner's reference images (originals are not committed; the 8K source was 5.4 MB).
All served as AVIF → WebP from `public/brand/cinematic/` (≈10–60 KB each), decorative, no baked-in text.

| File | Source | Used in |
| --- | --- | --- |
| `arcs-hero` | Blue light-arc / flare render (primary reference) | Home hero stage, CTA band, 404 |
| `flow` | Smooth blue gradient curves (8K) | `PageHero` on every inner page, blog hero, "Inside WordbitX", footer |
| `mesh` | Cyan mesh-wave render | Home services deck |
| `ribbon` | Teal dotted ribbon render | Home "Selected work" (product reel) |

## Code
- `src/components/cinematic.tsx` — `CineImage`, `CineBackdrop` (art + scrim + masks), `LightArcs` (SVG glints aligned to the hero art).
- `src/components/hero-fx.tsx` — client canvas: connected-node network + pointer parallax. Pointer/touch aware (never captures events),
  DPR ≤ 1.5, pauses off-screen / hidden tab, static frame under `prefers-reduced-motion`, smaller network on Save-Data / ≤2 cores / ≤2 GB.
- `globals.css` — `@theme` tokens (`midnight`, `arc-*`) and the `.cine-*` utilities. All motion is transform/opacity and disabled for reduced motion.
- `ui.tsx` — `Section tone="dark"`, `PageHero` (new optional `art` prop), `ButtonLink variant="ghost"` use the system, so every route inherits it.

## Not changed
Routes/URLs, metadata, sitemaps, JSON-LD, forms and `/api/*` handlers, analytics, AdSense, redirects, env variables.
