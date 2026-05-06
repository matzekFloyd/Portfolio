# Netlify Deployment Settings

This repository deploys with two independent Netlify sites.

## 1) Frontend site (`web`)

Scope: public portfolio website.

Use `web/netlify.toml` as source of truth:

- Base directory: `web`
- Build command: `npm ci && npm run build`
- Publish directory: `out`
- Node version: `20.19.5`

Notes:

- The Next.js app is configured for static export (`output: 'export'`), so Netlify must publish `out`.
- Do not publish `web/public` (legacy Gatsby output).

## 2) Studio site (`studio`)

Scope: Sanity Studio editor.

Use `studio/netlify.toml` as source of truth:

- Base directory: `studio`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Node version: `20.19.5`

Notes:

- SPA redirect is configured in `studio/netlify.toml`.

## Required environment variables

### Frontend site (`web`)

Required:

- none (defaults are embedded for project id + dataset)

Optional overrides:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

### Studio site (`studio`)

Required:

- none for standard Studio build/deploy

## Verification checklist

After config changes, run both:

1. Clear cache and deploy (preview)
2. Trigger production deploy

Expected:

- Frontend preview deploy succeeds and serves from `out`.
- Studio preview deploy succeeds and loads routes via SPA redirect.
- Production deploys succeed without manual command overrides.
