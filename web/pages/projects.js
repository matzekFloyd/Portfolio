import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {projectsQuery, siteSettingsQuery} from '../lib/queries'
import {blocksToText} from '../lib/portableText'

export default function ProjectsPage({site, projects}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Projects" description={site?.description}>
      <h2>Projects</h2>
      {projects.map((project) => (
        <article className="card" key={project._id}>
          <h3>
            <Link href={`/project/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="meta">{blocksToText(project.excerpt)}</p>
        </article>
      ))}
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const [site, projects] = await Promise.all([sanityClient.fetch(siteSettingsQuery), sanityClient.fetch(projectsQuery)])
  return {
    props: {
      site: site || null,
      projects: projects || []
    },
    revalidate: 60
  }
}
