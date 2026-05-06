import Image from 'next/image'
import SiteLayout from '../../components/SiteLayout'
import {sanityClient, urlFor} from '../../lib/sanity'
import {projectBySlugQuery, projectSlugsQuery, siteSettingsQuery} from '../../lib/queries'
import {PortableTextContent, blocksToText} from '../../lib/portableText'

export default function ProjectPage({site, project}) {
  if (!project) return <SiteLayout siteTitle={site?.title} pageTitle="Project" description={site?.description}>Not found.</SiteLayout>

  const imageUrl = urlFor(project.mainImage || project.previewImage)?.width(1200).height(675).fit('crop').url()

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle={project.title}
      description={blocksToText(project.excerpt) || site?.description}
    >
      <h2>{project.title}</h2>
      {imageUrl ? (
        <Image src={imageUrl} alt={project.title} width={1200} height={675} style={{width: '100%', height: 'auto'}} />
      ) : null}
      {(project.categories || []).length > 0 ? (
        <p className="meta">Categories: {project.categories.map((category) => category.title).join(', ')}</p>
      ) : null}
      <div className="card">
        <PortableTextContent value={project.body} />
      </div>
    </SiteLayout>
  )
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(projectSlugsQuery)
  return {
    paths: (slugs || []).map((item) => ({params: {slug: item.slug}})),
    fallback: 'blocking'
  }
}

export async function getStaticProps({params}) {
  const [site, project] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectBySlugQuery, {slug: params.slug})
  ])
  if (!project) return {notFound: true, revalidate: 60}
  return {
    props: {
      site: site || null,
      project
    },
    revalidate: 60
  }
}
