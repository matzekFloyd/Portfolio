import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {aboutQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/about.module.css'

export default function AboutPage({site, about}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="About" description={site?.description} keywords={site?.keywords}>
      <section className={styles.about}>
        <header className={styles.header}>
          <h2>{about?.title || 'About'}</h2>
        </header>
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
