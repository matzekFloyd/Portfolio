import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import {sanityClient, urlFor} from '../lib/sanity'
import {siteSettingsQuery, latestProjectsQuery} from '../lib/queries'
import {blocksToText} from '../lib/portableText'
import pageStyles from '../styles/home.module.css'
import previewStyles from '../styles/projectPreview.module.css'

export default function HomePage({site, projects}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle={site?.title} description={site?.description}>
      <section className={pageStyles.sectionDescription}>
        <div className={pageStyles.description}>
          <h2>{site?.subtitle || 'Software Developer from Vienna, Austria.'}</h2>
          <p>{site?.description}</p>
        </div>
        {site?.portrait?.asset ? (
          <div className={pageStyles.portrait}>
            <Image
              src={urlFor(site.portrait).width(560).height(560).fit('crop').url()}
              alt={site.title || 'Portrait'}
              width={560}
              height={560}
              style={{width: '100%', height: 'auto'}}
            />
          </div>
        ) : null}
      </section>
      <section className={pageStyles.sectionLatestProjects}>
        <h3>Latest projects</h3>
        <ul className={pageStyles.grid}>
          {projects.map((project) => {
            const thumb = project.previewImage ? urlFor(project.previewImage).width(800).height(520).fit('crop').url() : null
            return (
              <li key={project._id}>
                <Link href={`/project/${project.slug}`} className={previewStyles.root}>
                  {thumb ? (
                    <div className={previewStyles.thumb}>
                      <Image src={thumb} alt={project.title} fill sizes="(min-width: 980px) 33vw, (min-width: 720px) 50vw, 100vw" />
                    </div>
                  ) : null}
                  <h4 className={previewStyles.title}>{project.title}</h4>
                  <p className={previewStyles.excerpt}>{blocksToText(project.excerpt)}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
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
    }
  }
}
