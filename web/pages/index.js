import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {siteSettingsQuery, latestProjectsQuery} from '../lib/queries'
import {blocksToText} from '../lib/portableText'

export default function HomePage({site, projects}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle={site?.title} description={site?.description}>
      <h2>{site?.subtitle || 'Software Developer from Vienna, Austria.'}</h2>
      <p>{site?.description}</p>
      <h3>Latest projects</h3>
      {projects.map((project) => (
        <article className="card" key={project._id}>
          <h4>
            <Link href={`/project/${project.slug}`}>{project.title}</Link>
          </h4>
          <p className="meta">{blocksToText(project.excerpt)}</p>
        </article>
      ))}
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const [site, projects] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(latestProjectsQuery)
  ])
  return {
    props: {
      site: site || null,
      projects: projects || []
    },
    revalidate: 60
  }
}
