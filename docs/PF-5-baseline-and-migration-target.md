# PF-5: Baseline current production behavior and define migration target

Status: Draft complete, pending explicit approval in issue `#5`.

## 1) Current production page inventory baseline

Static routes (from `web/src/pages`):

- `/` (home)
- `/about`
- `/projects`
- `/contact`
- `/impressum`
- `/404` (fallback page)

Dynamic routes (from `web/gatsby-node.js`):

- `/project/<slug>/`
- Slugs are generated from `sanitySampleProject.slug.current`.

Observed production examples:

- `/project/visonboarding`
- `/project/guided-vis`
- `/project/stoctopus`

## 2) SEO-critical behavior baseline

Source of truth: `web/src/components/seo.js` and page/template usage.

Current defaults:

- `title` is set per page using the `SEO` component.
- `titleTemplate` is `%s | <siteTitle>` except when page title equals site title.
- `description` falls back to Sanity site settings description when not provided.
- Open Graph tags present:
  - `og:title`
  - `og:description`
  - `og:type=website`
- Twitter tags present:
  - `twitter:card=summary`
  - `twitter:creator`
  - `twitter:title`
  - `twitter:description`
- `keywords` meta is only included when `keywords` are passed.

Current gaps/risks:

- No canonical link tag is set.
- No explicit OG image default is set.
- `og:type` is always `website` (including project detail pages).
- Project detail pages set only title by default; description/keywords are not explicitly passed from template.

## 3) Performance baseline (Lighthouse)

Target URLs:

- Home: `https://mm-sanity-portfolio.netlify.app/`
- Project sample: `https://mm-sanity-portfolio.netlify.app/project/visonboarding`

Execution status:

- Lighthouse could not be executed in this environment because no runnable Chrome/Edge binary was available to the CLI.
- As a result, numeric baseline metrics (score, LCP, CLS, TBT) are still required before implementation starts.

Run locally to complete baseline:

```bash
npx lighthouse https://mm-sanity-portfolio.netlify.app/ \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --output=json \
  --output-path=./docs/lighthouse-home.json

npx lighthouse https://mm-sanity-portfolio.netlify.app/project/visonboarding \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --output=json \
  --output-path=./docs/lighthouse-project-visonboarding.json
```

## 4) Current deploy/build settings baseline (Netlify + repo)

Repository build scripts (root `package.json`):

- `npm run build` -> `lerna run build --parallel`
- `npm run build-web` -> bootstrap, deploy Sanity GraphQL, then Gatsby build

Web app build script (`web/package.json`):

- `npm run build` -> `gatsby build`
- `npm run dev` -> clean cache + `gatsby develop`

Netlify references from Studio dashboard config (`studio/dashboardConfig.js`):

- Frontend site: `mm-sanity-portfolio`
- Frontend URL: `https://mm-sanity-portfolio.netlify.app`
- Frontend build hook id: `5f56559e9e0e974c9c4f3b75`
- Studio site: `mm-sanity-portfolio-studio`
- Studio build hook id: `5f56559ee700ee9b2d5ea295`

Other deployment-related signals:

- Studio contains `studio/netlify.toml` SPA-style redirect (`/* -> /`).
- Sanity project id: `aartfjgc`, dataset: `production` (`studio/sanity.json`, `web/client-config.js`).

## 5) Migration target decision

Decision proposal for explicit approval in issue `#5`:

- Frontend target: replatform from Gatsby v2 to Next.js (App Router).
- CMS target: upgrade from Sanity Studio v2 to Sanity Studio v3+.

Rationale:

- Gatsby v2 stack is legacy and tied to older dependency/runtime constraints.
- Next.js has stronger long-term ecosystem support and simpler modern deployment path.
- Sanity Studio v3+ aligns with current Sanity tooling and maintenance.

Alternative considered:

- Gatsby in-place upgrade was considered higher risk for incremental dependency churn with less long-term upside.

## 6) Rollback path

If migration deployment regresses production:

1. Re-publish the last known good deploy in Netlify UI for `mm-sanity-portfolio`.
2. Revert migration commit(s) in git and redeploy from `production`.
3. Keep Sanity dataset unchanged (`production`) to avoid content rollback complexity.
4. Validate smoke routes after rollback:
   - `/`
   - `/projects`
   - `/project/<known-slug>`
   - `/contact`
   - `/impressum`

## 7) Acceptance criteria mapping

- Baseline doc exists: yes (this document).
- Linked in ticket comments: pending manual issue comment by assignee.
- Migration target explicitly approved: pending approval comment in issue `#5`.
- Rollback path documented: yes (section 6).

## 8) Ticket comment snippet

Suggested issue comment text:

> Baseline + migration target draft is documented in `docs/PF-5-baseline-and-migration-target.md`.
> Proposed target: Next.js frontend + Sanity Studio v3+.
> Rollback path is documented.
> Remaining blocker before implementation start: attach Lighthouse numeric baseline for home + one project page.
