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

## Operational caveats

- Frontend uses static export mode. Avoid ISR-specific settings (`revalidate`, `fallback: "blocking"`).
- If local Studio `:3333` is occupied, run Studio on another port:
  - `npm run dev -- --port 3334`
- Keep Node version pinned to `20.19.5` across root and studio.

## Rollback pointer

If a production regression occurs, use the rollback path documented in:

- [`docs/PF-5-baseline-and-migration-target.md`](../PF-5-baseline-and-migration-target.md), section "Rollback path"
