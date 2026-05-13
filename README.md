# Portfolio

![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)

Post-migration developer guide for the Next.js frontend and Sanity Studio v3 stack.

## Runtime

Canonical Node version:

- `20.19.5`

Version files:

- root: `.nvmrc`, `.node-version`
- studio: `studio/.nvmrc`, `studio/.node-version`

If you use nvm-windows:

```bash
nvm install 20.19.5
nvm use 20.19.5
node -v
```

## Local setup

From repository root:

```bash
npm install
```

### Configuration

Both packages read their Sanity dataset from environment files. The repo ships
`.env.example` files in each package — copy them once on a fresh clone:

```bash
cp web/.env.example web/.env
cp studio/.env.example studio/.env
```

`.env` is gitignored. Production values come from Netlify (or fall back to
sensible defaults baked into the code). Local dev points at a separate Sanity
dataset called `development` so editor changes can't accidentally leak to the
live site.

If the `development` dataset doesn't exist yet on the Sanity project, create it
once (see `docs/migration/final-stack-notes.md`).

### Frontend (`web`)

```bash
cd web
npm install
npm run dev
```

Default URL: `http://localhost:8000`

### Studio (`studio`)

```bash
cd studio
npm install
npm run dev -- --port 3334
```

Default URL: `http://localhost:3334`

When the studio is pointing at the `development` dataset, the browser tab and
top-left title display `MM - Portfolio (development)` — that's the visual
confirmation you're not on production.

## Build commands

Frontend:

```bash
cd web
npm run build
```

Studio:

```bash
cd studio
npm run build
```

Monorepo build:

```bash
npm run build
```

## Deployment

Netlify deploy settings are documented in:

- [`docs/deployment/netlify.md`](docs/deployment/netlify.md)

Migration summary, caveats, and rollback pointer:

- [`docs/migration/final-stack-notes.md`](docs/migration/final-stack-notes.md)

## Contributing

For branch naming and workflow conventions, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Repository usage policy is defined in [`LICENSE`](LICENSE) (all rights reserved / proprietary).
