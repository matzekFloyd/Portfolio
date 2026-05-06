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

## Deployment reminder

Netlify deploys from this repository.

Use two separate Netlify sites:

- Frontend site (`web`) for public pages
- Studio site (`studio`) for Sanity Studio

Final deployment settings are documented in [`docs/deployment/netlify.md`](docs/deployment/netlify.md).

## Contributing

For branch naming and the `production` deploy workflow, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Private/personal project. See [`LICENSE`](LICENSE).
