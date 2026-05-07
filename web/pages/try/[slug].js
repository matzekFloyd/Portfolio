import SiteLayout from '../../components/SiteLayout'
import Link from 'next/link'
import {useRef} from 'react'
import {sanityClient} from '../../lib/sanity'
import {projectAvailabilityBySlugQuery, projectSlugsQuery, siteSettingsQuery} from '../../lib/queries'
import {getTryoutBySlug, getTryoutSlugs} from '../../lib/tryouts'
import styles from '../../styles/tryPage.module.css'

function normalizeAssetUrl(value, basePath) {
  if (typeof value !== 'string') return value
  if (!value.startsWith('/')) return value
  if (value.startsWith(`${basePath}/`)) return value
  return `${basePath}${value}`
}

function installIframePatches(iframe, tryout) {
  const frameWindow = iframe?.contentWindow
  if (!frameWindow || !tryout?.assetBasePath || frameWindow.__tryoutPatchesInstalled) return

  const basePath = tryout.assetBasePath
  frameWindow.__tryoutPatchesInstalled = true

  const imageProto = frameWindow.HTMLImageElement?.prototype
  const srcDescriptor = imageProto ? Object.getOwnPropertyDescriptor(imageProto, 'src') : null
  if (imageProto && srcDescriptor?.set) {
    Object.defineProperty(imageProto, 'src', {
      configurable: true,
      enumerable: srcDescriptor.enumerable,
      get: srcDescriptor.get,
      set(value) {
        srcDescriptor.set.call(this, normalizeAssetUrl(value, basePath))
      }
    })

    const originalSetAttribute = imageProto.setAttribute
    imageProto.setAttribute = function (name, value) {
      if (name === 'src') {
        return originalSetAttribute.call(this, name, normalizeAssetUrl(value, basePath))
      }
      return originalSetAttribute.call(this, name, value)
    }
  }

  if (frameWindow.fetch) {
    const originalFetch = frameWindow.fetch.bind(frameWindow)
    frameWindow.fetch = (input, init) => {
      if (typeof input === 'string') return originalFetch(normalizeAssetUrl(input, basePath), init)
      if (input instanceof frameWindow.Request) {
        return originalFetch(new frameWindow.Request(normalizeAssetUrl(input.url, basePath), input), init)
      }
      return originalFetch(input, init)
    }
  }

  const xhrProto = frameWindow.XMLHttpRequest?.prototype
  if (xhrProto?.open) {
    const originalOpen = xhrProto.open
    xhrProto.open = function (method, url, ...rest) {
      return originalOpen.call(this, method, normalizeAssetUrl(url, basePath), ...rest)
    }
  }

  const focusGame = () => {
    const body = frameWindow.document?.body
    if (body && body.tabIndex < 0) body.tabIndex = 0
    body?.focus()
    frameWindow.focus()
  }

  iframe.addEventListener('load', focusGame)
  frameWindow.document?.addEventListener('click', focusGame)
}

export default function TryoutPage({site, tryout}) {
  const frameRef = useRef(null)

  const focusFrame = () => {
    if (!frameRef.current) return
    installIframePatches(frameRef.current, tryout)
    frameRef.current.focus()
    try {
      frameRef.current.contentWindow?.focus()
    } catch {
      // Ignore focus errors for cross-origin content.
    }
  }

  if (!tryout) {
    return (
      <SiteLayout siteTitle={site?.title} pageTitle="Try it" description={site?.description}>
        <h2 className={styles.title}>Tryout not found</h2>
        <p className={styles.note}>This interactive experience is not available yet.</p>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={`Try: ${tryout.title}`}
      description={tryout.description || site?.description}
      keywords={site?.keywords}
    >
      <h2 className={styles.title}>{tryout.title}</h2>
      <p className={styles.backWrap}>
        <Link href={`/project/${tryout.slug}`} className={styles.backLink}>
          Back to project
        </Link>
      </p>
      {tryout.mode === 'embedded' ? (
        <div className={styles.embedWrap}>
          <iframe
            ref={frameRef}
            src={tryout.targetUrl}
            title={tryout.title}
            className={styles.embed}
            allow="fullscreen"
            allowFullScreen
            tabIndex={0}
            onLoad={focusFrame}
            onMouseDown={focusFrame}
            onFocus={focusFrame}
          />
        </div>
      ) : (
        <p className={styles.note}>
          <a href={tryout.targetUrl} target="_blank" rel="noreferrer">
            Open {tryout.title}
          </a>
        </p>
      )}
    </SiteLayout>
  )
}

export async function getStaticPaths() {
  const projectSlugs = await sanityClient.fetch(projectSlugsQuery)
  const projectSlugSet = new Set((projectSlugs || []).map((item) => item.slug))
  const activeTryoutSlugs = getTryoutSlugs().filter((slug) => projectSlugSet.has(slug))

  return {
    paths: activeTryoutSlugs.map((slug) => ({params: {slug}})),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const [site, projectAvailability] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectAvailabilityBySlugQuery, {slug: params.slug})
  ])
  const tryout = getTryoutBySlug(params.slug)

  if (!tryout || !tryout.available || !projectAvailability?._id) {
    return {notFound: true}
  }

  return {
    props: {
      site: site || null,
      tryout
    }
  }
}
