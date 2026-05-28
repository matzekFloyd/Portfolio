import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {aboutQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/about.module.scss'

export default function AboutPage({site, about}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="About" description={site?.description} keywords={site?.keywords}>
      <h2 className={styles.title}>{about?.title || 'About'}</h2>
      <section className={styles.card} aria-label="About content">
        <div className={styles.columns}>
          <article className={styles.column}>
            <PortableTextContent value={about?.bodyLeftCol} />
          </article>
          <article className={styles.column}>
            <PortableTextContent value={about?.bodyRightCol} />
          </article>
        </div>
      </section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const [site, about] = await Promise.all([sanityClient.fetch(siteSettingsQuery), sanityClient.fetch(aboutQuery)])
  return {
    props: {
      site: site || null,
      about: about || null
    }
  }
}
