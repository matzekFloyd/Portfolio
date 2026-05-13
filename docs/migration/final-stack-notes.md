# Final Stack Notes

This document summarizes the post-migration stack and operational caveats.

## Final stack

- Frontend: Next.js static export (`web`)
- CMS/editor: Sanity Studio v3 (`studio`)
- Canonical runtime: Node `20.19.5`

## Key migration changes

- Replaced legacy Gatsby frontend with Next.js pages-based implementation.
- Removed `node-sass` legacy blocker in favor of modern `sass`.
- Updated Netlify configuration to deploy:
  - frontend from `web/out`
  - studio from `studio/dist`
- Added SEO parity support (canonical, OG, Twitter metadata) in shared layout.
- Added `robots.txt` and `sitemap.xml` for crawl/index baseline.
- Migrated the Inter web font from a `<link>` in `next/head` to
  `next/font/google`, applied via a CSS variable injected on `<html>`. No
  external request to `fonts.googleapis.com` at runtime.
- Made project tryouts URL-driven via Sanity (`tryout` field on
  `sampleProject`) so editors can configure the `/try/<slug>` iframe without
  shipping static bundles in the repo.
- Added a Sanity Studio dashboard tool (`@sanity/dashboard`) configured as the
  default tool. `/` on the studio now lands on `/dashboard` with widgets for
  project info, recently edited documents, and latest projects, instead of the
  empty `/structure` pane.

## Local dataset isolation

- The Sanity project (`aartfjgc`) has two datasets: `production` (live) and
  `development` (local QA).
- `studio/sanity.config.ts` and `studio/sanity.cli.ts` read
  `SANITY_STUDIO_DATASET`, falling back to `production`.
- `web/lib/sanity.js` reads `NEXT_PUBLIC_SANITY_DATASET`, falling back to
  `production`.
- The committed `.env.example` files document the keys. Local-only `.env`
  files (gitignored) override the dataset to `development`.
- Netlify deploys ship without a `.env` file, so production builds always use
  the embedded `production` defaults. No env vars are strictly required on
  Netlify; see `docs/deployment/netlify.md` for optional overrides.

### Create the `development` dataset (one-time setup)

If `npx sanity dataset list` shows only `production`, create the dev dataset:

```bash
cd studio
npx sanity dataset create development --visibility private
```

Optional: copy live content into it for realistic local testing.

```bash
npx sanity dataset copy production development
```

## Operational caveats

- Frontend uses static export mode. Avoid ISR-specific settings (`revalidate`, `fallback: "blocking"`).
- If local Studio `:3333` is occupied, run Studio on another port:
  - `npm run dev -- --port 3334`
- Keep Node version pinned to `20.19.5` across root and studio.
- After creating or recreating a dataset, the Sanity CDN may serve a cached
  404 on the new dataset name for up to ~60 seconds. If `next dev` reports
  `Dataset not found` right after `dataset create`, give it a minute and
  hard-refresh.
- `web/lib/sanity.js` keeps `useCdn: true`. Locally that means edits in the
  studio can take a few seconds to appear on `localhost:8000`. Flip to
  `useCdn: false` only when you specifically need instant feedback; do not
  commit that change.

## Rollback pointer

If a production regression occurs, use the rollback path documented in:

- [`docs/PF-5-baseline-and-migration-target.md`](../PF-5-baseline-and-migration-target.md), section "Rollback path"
