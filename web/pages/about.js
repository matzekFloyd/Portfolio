import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {aboutQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'

export default function AboutPage({site, about}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="About" description={site?.description} keywords={site?.keywords}>
      <h2>{about?.title || 'About'}</h2>
      <div className="card">
        <PortableTextContent value={about?.bodyLeftCol} />
      </div>
      <div className="card">
        <PortableTextContent value={about?.bodyRightCol} />
      </div>
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
