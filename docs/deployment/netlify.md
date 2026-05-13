# Netlify Deployment Settings

This repository deploys with two independent Netlify sites.

## 1) Frontend site (`web`)

Scope: public portfolio website.

Use `web/netlify.toml` as source of truth:

- Base directory: `web`
- Build command: `npm ci && npm run build`
- Publish directory: `out`
- Node version: `22.22.2`

Notes:

- The Next.js app is configured for static export (`output: 'export'`), so Netlify must publish `out`.
- Do not publish `web/public` (legacy Gatsby output).

## 2) Studio site (`studio`)

Scope: Sanity Studio editor.

Use `studio/netlify.toml` as source of truth:

- Base directory: `studio`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Node version: `22.22.2`

Notes:

- SPA redirect is configured in `studio/netlify.toml`.

## Required environment variables

No env vars are strictly required. Both sites have safe production defaults
embedded in code (`projectId: 'aartfjgc'`, `dataset: 'production'`). Netlify
builds run without any `.env` file in the repo, so the fallbacks apply.

Setting the values in the Netlify dashboard anyway makes the deployment
self-documenting and lets you point an individual site at a non-default
dataset (e.g. a staging deploy that reads from `development`).

### Frontend site (`web`)

Optional (recommended for self-documentation):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `aartfjgc`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`

### Studio site (`studio`)

Optional (recommended for self-documentation):

- `SANITY_STUDIO_DATASET` — `production`

When `SANITY_STUDIO_DATASET` is set to something other than `production`, the
studio title automatically suffixes the dataset name (e.g.
`MM - Portfolio (development)`) so a non-prod deploy can't be confused with
the live editor.

### Legacy variables to remove

If any of these are still configured in the Netlify dashboard from the Gatsby
era, delete them — no code reads them anymore:

- `GATSBY_SANITY_PROJECT_ID`
- `GATSBY_SANITY_DATASET`
- `SANITY_READ_TOKEN`, `SANITY_API_TOKEN` (Gatsby Sanity source plugin)

## Verification checklist

After config changes, run both:

1. Clear cache and deploy (preview)
2. Trigger production deploy

Expected:

- Frontend preview deploy succeeds and serves from `out`.
- Studio preview deploy succeeds and loads routes via SPA redirect.
- Production deploys succeed without manual command overrides.
