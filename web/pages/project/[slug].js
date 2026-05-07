import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '../../components/SiteLayout'
import {sanityClient, urlFor} from '../../lib/sanity'
import {projectBySlugQuery, projectSlugsQuery, siteSettingsQuery} from '../../lib/queries'
import {PortableTextContent, blocksToText} from '../../lib/portableText'
import {getTryoutBySlug} from '../../lib/tryouts'
import styles from '../../styles/projectDetail.module.css'

export default function ProjectPage({site, project}) {
  if (!project) return <SiteLayout siteTitle={site?.title} pageTitle="Project" description={site?.description}>Not found.</SiteLayout>

  const imageUrl = urlFor(project.mainImage || project.previewImage)?.width(1200).height(675).fit('crop').url()
  const tryout = getTryoutBySlug(project.slug)

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={project.title}
      description={blocksToText(project.excerpt) || site?.description}
      keywords={site?.keywords}
      ogImage={imageUrl}
      ogType="article"
    >
      <h2 className={styles.title}>{project.title}</h2>
      {tryout?.available ? (
        <p className={styles.tryCta}>
          <Link href={`/try/${tryout.slug}`} className={styles.tryButton}>
            Try it
          </Link>
        </p>
      ) : null}
      {imageUrl ? (
        <div className={styles.mainImage}>
          <Image src={imageUrl} alt={project.title} width={1200} height={675} style={{width: '100%', height: 'auto'}} />
        </div>
      ) : null}
      {(project.categories || []).length > 0 ? (
        <div className={styles.categories}>
          <p className={styles.categoriesTitle}>Categories</p>
          <ul className={styles.categoriesList}>
            {project.categories.map((category) => (
              <li key={category._id}>{category.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className={styles.body}>
        <PortableTextContent value={project.body} />
      </div>
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
