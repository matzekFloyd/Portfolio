export const TRYOUTS = {
  geomania: {
    slug: 'geomania',
    title: 'Geomania',
    description: 'Play Geomania in your browser.',
    type: 'game',
    mode: 'embedded',
    targetUrl: '/try-static/geomania/index.html',
    assetBasePath: '/try-static/geomania',
    available: true
  }
}

export function getTryoutBySlug(slug) {
  if (!slug) return null
  return TRYOUTS[slug] || null
}

export function getTryoutSlugs() {
  return Object.values(TRYOUTS)
    .filter((entry) => entry.available)
    .map((entry) => entry.slug)
}
