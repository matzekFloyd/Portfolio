/**
 * Post-build sitemap + robots generator.
 *
 * Runs after `next build` (wired via `postbuild` in package.json) and writes
 * out/sitemap.xml and out/robots.txt based on live Sanity content. Static
 * routes are hardcoded; dynamic routes are derived from the same queries the
 * pages themselves use.
 *
 * Sources of truth:
 *   - Base URL:   NEXT_PUBLIC_SITE_URL (matches web/components/SiteLayout.js)
 *   - Sanity:     NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET
 */

import {createClient} from '@sanity/client'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'

function loadDotEnv(path) {
  if (!existsSync(path)) return
  for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) process.env[key] = value
  }
}

loadDotEnv(join(process.cwd(), '.env'))

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mathiasmayrhofer.at'
).replace(/\/$/, '')
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'aartfjgc'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const OUT_DIR = join(process.cwd(), 'out')

const STATIC_ROUTES = ['/', '/about', '/projects', '/contact', '/impressum']

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-11-01',
  useCdn: false
})

const sitemapProjectsQuery = `*[_type == "sampleProject" && hidden != true && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt,
  tryout
}`

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlEntry(loc, lastmod) {
  const lines = [`  <url>`, `    <loc>${escapeXml(loc)}</loc>`]
  if (lastmod) lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
  lines.push(`  </url>`)
  return lines.join('\n')
}

function buildSitemap(projects) {
  const entries = []

  for (const route of STATIC_ROUTES) {
    const path = route === '/' ? '' : route
    entries.push(urlEntry(`${SITE_URL}${path}`))
  }

  for (const project of projects) {
    entries.push(urlEntry(`${SITE_URL}/project/${project.slug}`, project._updatedAt))

    const tryoutEnabled = project.tryout?.enabled && project.tryout?.url
    if (tryoutEnabled) {
      entries.push(urlEntry(`${SITE_URL}/try/${project.slug}`, project._updatedAt))
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}

async function main() {
  console.log('[sitemap] generating')
  console.log(`[sitemap]   base url: ${SITE_URL}`)
  console.log(`[sitemap]   sanity:   project=${PROJECT_ID} dataset=${DATASET}`)

  mkdirSync(OUT_DIR, {recursive: true})

  const projects = await client.fetch(sitemapProjectsQuery)
  const tryoutCount = projects.filter((p) => p.tryout?.enabled && p.tryout?.url).length

  console.log(`[sitemap]   ${projects.length} project route(s), ${tryoutCount} tryout route(s)`)

  writeFileSync(join(OUT_DIR, 'sitemap.xml'), buildSitemap(projects), 'utf8')
  writeFileSync(join(OUT_DIR, 'robots.txt'), buildRobots(), 'utf8')

  console.log('[sitemap] wrote out/sitemap.xml and out/robots.txt')
}

main().catch((err) => {
  console.error('[sitemap] failed:', err)
  process.exit(1)
})
