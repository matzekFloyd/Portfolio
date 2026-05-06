# PF-13 Regression QA Report

Date: 2026-05-06  
Branch: `mm/PF-13--regression-qa-visuals-functionality-seo`

## Scope

Validate migrated frontend (Next.js) for:

- visual parity on core routes
- functional navigation/content behavior
- SEO-critical metadata
- baseline performance sanity check status

## Routes checked

- `/`
- `/about`
- `/projects`
- `/project/[slug]` (sampled from generated paths)
- `/contact`
- `/impressum`
- `/404`

## Visual checks

- **Home**: hero/intro section, project grid, spacing/colors aligned with migrated design baseline.
- **Projects list**: responsive card grid restored.
- **Project detail**: title/media/body/category section styled and readable.
- **Contact/About/Impressum**: content sections and cards render consistently.

Result: no critical visual regressions detected in static build output.

## Functional checks

- Header navigation links present to all primary routes.
- Dynamic project pages generated for known slugs during static export.
- Contact links use `mailto:` for email entries and external links open in new tab.
- Portable Text custom blocks:
  - `figure` renders image and optional caption
  - `youtube` renders embedded iframe

Result: no critical functional regressions detected.

## Content checks

- Published Sanity content loads for page and project routes in build output.
- Rich content blocks (`figure`, `youtube`) no longer emit unknown-type warnings in build.

Result: content rendering is stable for checked routes.

## SEO checks

Implemented/verified:

- Title and title-template behavior (`<page> | <site>`, no duplicate on homepage).
- `meta description` present.
- `meta keywords` present when available.
- Canonical URL link added.
- Open Graph defaults added (`og:title`, `og:description`, `og:type`, `og:url`, optional `og:image`).
- Twitter meta defaults added (`twitter:card`, `twitter:title`, `twitter:description`, optional `twitter:image`).
- `robots.txt` added.
- `sitemap.xml` added.

Result: SEO-critical metadata parity improved and in place.

## Performance comparison vs baseline

Status: pending numeric comparison.

Reason:

- prior environment limitations prevented reliable Lighthouse execution inside agent runtime.

Action:

- run Lighthouse for `/` and one `/project/<slug>` in CI or local Chrome-backed environment and attach results to ticket.

## Regression summary

- Critical regressions: **none found**
- Minor follow-ups:
  1. Replace static `sitemap.xml` with generated sitemap that includes dynamic project URLs.
  2. Attach Lighthouse numeric comparison to baseline ticket evidence.
