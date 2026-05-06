# Portfolio - personal dev notes

Personal setup and maintenance notes for this repo.

## Runtime (important)

This project now targets modern Node LTS.
Use the pinned version from:
- `.nvmrc`
- `.node-version`

## Quick start

Using nvm-windows:

```bash
nvm install 20.19.5
nvm use 20.19.5
node -v
```

Then:

```bash
npm install
npm run dev
```

Local URLs:
- Frontend: `http://localhost:8000`
- Sanity Studio: `http://localhost:3333`

## Build

```bash
npm run build
```

## Optional: Sanity preview token

For draft/real-time content preview in local development:

1. Create a Sanity API token with read rights.
2. Copy `.env.development.template` to `.env.development`.
3. Add:

```bash
SANITY_READ_TOKEN="yourTokenHere"
```

4. Restart `npm run dev`.

Preview settings in `gatsby-config.js`:
- Disable live watch: `watchMode: false`
- Show only published content: `overlayDrafts: false`

## Deployment reminder

Netlify deploys from this repository.

For frontend deploys, configure the Netlify site to build only the `web` package:

- Base directory: `web`
- Build command: `npm ci && npm run build`
- Publish directory: `public`
- Node version: `14.21.3`

Why: the Studio package now targets modern Node for Sanity v3+, while the legacy Gatsby frontend still builds on Node 14. Building from repo root on Netlify can try to install both and fail.

## Contributing

For branch naming and the `production` deploy workflow, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Private/personal project. See [`LICENSE`](LICENSE).
