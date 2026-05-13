import SiteLayout from '../../components/SiteLayout'
import Link from 'next/link'
import {sanityClient} from '../../lib/sanity'
import {projectTryoutBySlugQuery, siteSettingsQuery, tryoutSlugsQuery} from '../../lib/queries'
import styles from '../../styles/tryPage.module.css'

const ASPECT_RATIO_CLASSES = {
  '16:9': styles.aspect16x9,
  '4:3': styles.aspect4x3,
  auto: styles.aspectAuto
}

export default function TryoutPage({site, tryout}) {
  if (!tryout) {
    return (
      <SiteLayout siteTitle={site?.title} pageTitle="Try it" description={site?.description}>
        <h2 className={styles.title}>Tryout not found</h2>
        <p className={styles.note}>This interactive experience is not available yet.</p>
      </SiteLayout>
    )
  }

  const aspectClass = ASPECT_RATIO_CLASSES[tryout.aspectRatio] || ASPECT_RATIO_CLASSES['16:9']
  const allowFullscreen = tryout.allowFullscreen !== false

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={`Try: ${tryout.title}`}
      description={tryout.description || site?.description}
      keywords={site?.keywords}
    >
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{tryout.title}</h2>
        <p className={styles.backCta}>
          <Link href={`/project/${tryout.slug}`} className={styles.backButton}>
            Back to project
          </Link>
        </p>
      </div>
      {tryout.description ? <p className={styles.note}>{tryout.description}</p> : null}
      {tryout.mode === 'external' ? (
        <p className={styles.note}>
          <a href={tryout.url} target="_blank" rel="noreferrer">
            Open {tryout.title}
          </a>
        </p>
      ) : (
        <div className={`${styles.embedWrap} ${aspectClass}`}>
          <iframe
            src={tryout.url}
            title={tryout.title}
            className={styles.embed}
            allow={allowFullscreen ? 'fullscreen' : ''}
            allowFullScreen={allowFullscreen}
            tabIndex={0}
          />
        </div>
      )}
    </SiteLayout>
  )
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(tryoutSlugsQuery)

  return {
    paths: (slugs || [])
      .filter((item) => item?.slug)
      .map((item) => ({params: {slug: item.slug}})),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const [site, project] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectTryoutBySlugQuery, {slug: params.slug})
  ])

  if (!project?.tryout?.enabled || !project?.tryout?.url) {
    return {notFound: true}
  }

  const tryout = {
    title: project.title,
    slug: project.slug,
    url: project.tryout.url,
    mode: project.tryout.mode === 'external' ? 'external' : 'embedded',
    description: project.tryout.description || null,
    aspectRatio: project.tryout.aspectRatio || '16:9',
    allowFullscreen: project.tryout.allowFullscreen !== false
  }

  return {
    props: {
      site: site || null,
      tryout
    }
  }
}
