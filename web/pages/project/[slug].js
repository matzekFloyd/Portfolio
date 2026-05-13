import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import SiteLayout from '../../components/SiteLayout'
import {sanityClient, urlFor} from '../../lib/sanity'
import {projectBySlugQuery, projectSlugsQuery, siteSettingsQuery} from '../../lib/queries'
import {PortableTextContent, blocksToText} from '../../lib/portableText'
import styles from '../../styles/projectDetail.module.css'

function isExternalHttpUrl(value) {
  if (typeof value !== 'string' || !value) return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export default function ProjectPage({site, project}) {
  const [isImageOpen, setIsImageOpen] = useState(false)
  if (!project) return <SiteLayout siteTitle={site?.title} pageTitle="Project" description={site?.description}>Not found.</SiteLayout>

  const heroImage = project.mainImage || project.previewImage
  const imageUrl = urlFor(heroImage)?.width(1200).height(675).fit('crop').url()
  const imageAlt = heroImage?.alt || project.title
  const imageCaption = heroImage?.caption
  const tryout = project.tryout?.enabled && project.tryout?.url ? project.tryout : null
  const categories = project.categories || []
  const hasMetaColumn = Boolean(imageUrl || categories.length > 0)

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={project.title}
      description={blocksToText(project.excerpt) || site?.description}
      keywords={site?.keywords}
      ogImage={imageUrl}
      ogType="article"
    >
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{project.title}</h2>
        {tryout ? (
          <p className={styles.tryCta}>
            {tryout.mode === 'external' ? (
              <a
                href={tryout.url}
                target="_blank"
                rel="noreferrer"
                className={styles.tryButton}
              >
                Try it
              </a>
            ) : (
              <Link href={`/try/${project.slug}`} className={styles.tryButton}>
                Try it
              </Link>
            )}
          </p>
        ) : null}
      </div>
      <div className={`${styles.contentGrid}${!hasMetaColumn ? ` ${styles.contentGridSingle}` : ''}`}>
        <div className={styles.body}>
          {categories.length > 0 ? (
            <div className={styles.categoriesTop}>
              <ul className={styles.categoryTags}>
                {categories.map((category) => {
                  const linkUrl = isExternalHttpUrl(category.url) ? category.url : null
                  return (
                    <li key={category._id}>
                      {linkUrl ? (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`${styles.categoryTag} ${styles.categoryTagLink}`}
                          aria-label={`${category.title} (opens in new tab)`}
                        >
                          {category.title}
                        </a>
                      ) : (
                        <span className={styles.categoryTag}>{category.title}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
          <PortableTextContent value={project.body} />
        </div>
        {hasMetaColumn ? (
          <aside className={styles.metaColumn}>
            {imageUrl ? (
              <div className={styles.mainImage}>
                <button
                  type="button"
                  className={styles.imageButton}
                  onClick={() => setIsImageOpen(true)}
                  aria-label={`Open larger image for ${project.title}`}
                >
                  <Image src={imageUrl} alt={imageAlt} width={1200} height={675} style={{width: '100%', height: 'auto'}} />
                </button>
                {imageCaption ? <p className={styles.imageCaption}>{imageCaption}</p> : null}
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>
      {isImageOpen && imageUrl ? (
        <div className={styles.lightbox} onClick={() => setIsImageOpen(false)} role="presentation">
          <div className={styles.lightboxInner}>
            <button type="button" className={styles.lightboxClose} onClick={() => setIsImageOpen(false)} aria-label="Close image">
              Close
            </button>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1800}
              height={1012}
              className={styles.lightboxImage}
              style={{width: '100%', height: 'auto'}}
            />
          </div>
        </div>
      ) : null}
    </SiteLayout>
  )
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(projectSlugsQuery)
  return {
    paths: (slugs || []).map((item) => ({params: {slug: item.slug}})),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const [site, project] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectBySlugQuery, {slug: params.slug})
  ])
  if (!project) return {notFound: true}
  return {
    props: {
      site: site || null,
      project
    }
  }
}
