# Portfolio - personal dev notes

Personal setup and maintenance notes for this repo.

## Runtime (important)

This project is on a legacy Gatsby/Sanity stack and requires Node `14.21.3`.
Use the pinned version from:
- `.nvmrc`
- `.node-version`

If you are on a newer Node version (for example Node 20/22), `npm install` may fail because of legacy `node-sass`.

## Quick start

Using nvm-windows:

```bash
nvm install 14.21.3
nvm use 14.21.3
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

## License

Private/personal project. See [`LICENSE`](LICENSE).
