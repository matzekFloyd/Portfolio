# Portfolio

![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)

Personal portfolio website for Mathias Mayrhofer, live at [mathiasmayrhofer.at](https://mathiasmayrhofer.at). The site lists projects plus about, contact, and impressum pages. All content is editor-managed in a headless CMS.

The repository is a monorepo with two packages:

- `web/` — Next.js static-export frontend, the public site
- `studio/` — Sanity Studio v5, the editor where all content (project metadata, tryout URLs, about/contact/impressum text, site settings) lives

Both are deployed independently as Netlify sites.

## Runtime

Canonical Node version:

- `22.22.2` (Node 22 LTS "Jod" — maintenance support until April 2027)

Version files:

- root: `.nvmrc`, `.node-version`
- studio: `studio/.nvmrc`, `studio/.node-version`

If you use nvm-windows:

```bash
nvm install 22.22.2
nvm use 22.22.2
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

## Brand assets

The favicon is regenerated from a single high-resolution master:

- Source: `assets/brand/favicon-master.png`
- Output: `web/public/favicon.ico` and `studio/static/favicon.ico` (multi-resolution: 16/32/48/64 px)

```bash
npm run build:favicon
```

Generated `.ico` files are committed so production builds don't have to install
`sharp`. Re-run the command whenever the master PNG changes.

## Deployment

Netlify deploy settings are documented in:

- [`docs/deployment/netlify.md`](docs/deployment/netlify.md)

Migration summary, caveats, and rollback pointer:

- [`docs/migration/final-stack-notes.md`](docs/migration/final-stack-notes.md)

## Contributing

For branch naming and workflow conventions, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Repository usage policy is defined in [`LICENSE`](LICENSE) (all rights reserved / proprietary).
