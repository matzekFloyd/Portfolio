# Netlify Deployment Settings

This repository deploys with two independent Netlify sites.

## 1) Frontend site (`web`)

Scope: public portfolio website.

Live URL: [mathiasmayrhofer.at](https://mathiasmayrhofer.at)

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

Live URL: [studio.mathiasmayrhofer.at](https://studio.mathiasmayrhofer.at) (login required)

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

Contact form (server-side only — Netlify **Site configuration → Environment**):

- `RESEND_API_KEY` — API key from [Resend](https://resend.com)
- `CONTACT_FROM_EMAIL` — verified sender, e.g. `Portfolio <contact@mathiasmayrhofer.at>`
- `CONTACT_TO_EMAIL` — inbox that receives submissions

The form posts to `/api/contact`, handled by `web/netlify/functions/contact.ts`.
Static pages still export to `out`; only this function runs on the server.
Test locally with `netlify dev` from the `web` directory (not `next dev` alone).

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

### Node.js version (builds and Agent Runners)

Each site should run **Node.js 22** (currently pinned to `22.22.2` in repo).

Version is declared in:

- `web/.nvmrc` / `web/.node-version` (frontend base directory)
- `studio/.nvmrc` / `studio/.node-version` (studio base directory)
- `web/netlify.toml` and `studio/netlify.toml` (`NODE_VERSION = "22.22.2"`)
- Root, `web/package.json`, and `studio/package.json` (`engines.node`: `>=22.12.0`)

If Netlify shows **“Your project uses Node.js 12”** for Agent Runners:

1. Open **Site configuration → Build & deploy → Environment** for **each** site
   (frontend and studio).
2. Remove or update any `NODE_VERSION` variable set to `12`, `12.x`, or an old
   Gatsby-era value. Either delete it (repo config wins) or set it to `22.22.2`.
3. Confirm **Base directory** matches this doc (`web` or `studio`). Wrong base
   directory can hide `.nvmrc` and fall back to legacy defaults.
4. **Clear cache and deploy** after changing env vars.

## Verification checklist

After config changes, run both:

1. Clear cache and deploy (preview)
2. Trigger production deploy

Expected:

- Frontend preview deploy succeeds and serves from `out`.
- Studio preview deploy succeeds and loads routes via SPA redirect.
- Production deploys succeed without manual command overrides.

## See also

- [`webhooks.md`](./webhooks.md) — how to trigger a frontend rebuild
  automatically when content is published in Sanity Studio.
