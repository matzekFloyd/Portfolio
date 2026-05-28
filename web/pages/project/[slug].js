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

function buildMetaImage(image, fallbackAlt) {
  if (!image) return null
  const src = urlFor(image)?.width(1200).height(675).fit('crop').url()
  if (!src) return null
  return {
    src,
    alt: image.alt || fallbackAlt,
    caption: image.caption || null
  }
}

export default function ProjectPage({site, project}) {
  const [lightboxImage, setLightboxImage] = useState(null)
  if (!project) return <SiteLayout siteTitle={site?.title} pageTitle="Project" description={site?.description}>Not found.</SiteLayout>

  const heroImage = project.mainImage || project.previewImage
  const metaImages = [
    buildMetaImage(heroImage, project.title),
    buildMetaImage(project.secondaryImage, project.title)
  ].filter(Boolean)
  const ogImageUrl = metaImages[0]?.src || null
  const tryout = project.tryout?.enabled && project.tryout?.url ? project.tryout : null
  const categories = project.categories || []
  const hasMetaColumn = metaImages.length > 0 || categories.length > 0

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={project.title}
      description={blocksToText(project.excerpt) || site?.description}
      keywords={site?.keywords}
      ogImage={ogImageUrl}
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
                rel="noopener noreferrer"
                className={styles.tryButton}
              >
                Try it
                <span className="sr-only"> (opens in new tab)</span>
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
                  const openInNewTab = Boolean(linkUrl && category.openInNewTab !== false)
                  return (
                    <li key={category._id}>
                      {linkUrl ? (
                        <a
                          href={linkUrl}
                          target={openInNewTab ? '_blank' : undefined}
                          rel={openInNewTab ? 'noopener noreferrer' : undefined}
                          className={`${styles.categoryTag} ${styles.categoryTagLink}`}
                          aria-label={openInNewTab ? `${category.title} (opens in new tab)` : category.title}
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
            {metaImages.map((image, index) => (
              <div key={index} className={styles.metaImage}>
                <button
                  type="button"
                  className={styles.imageButton}
                  onClick={() => setLightboxImage(image)}
                  aria-label={`Open larger image ${index + 1} for ${project.title}`}
                >
                  <Image src={image.src} alt={image.alt} width={1200} height={675} style={{width: '100%', height: 'auto'}} />
                </button>
                {image.caption ? <p className={styles.imageCaption}>{image.caption}</p> : null}
              </div>
            ))}
          </aside>
        ) : null}
      </div>
      {lightboxImage ? (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)} role="presentation">
          <div className={styles.lightboxInner}>
            <button type="button" className={styles.lightboxClose} onClick={() => setLightboxImage(null)} aria-label="Close image">
              Close
            </button>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
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
