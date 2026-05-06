import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {impressumQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'

export default function ImpressumPage({site, impressum}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Impressum" description={site?.description}>
      <h2>{impressum?.title || 'Impressum'}</h2>
      <div className="card">
        {impressum?.owner ? <p>{impressum.owner}</p> : null}
        {impressum?.addressLineOne ? <p>{impressum.addressLineOne}</p> : null}
        {impressum?.addressLineTwo ? <p>{impressum.addressLineTwo}</p> : null}
        {impressum?.contact ? <p>{impressum.contact}</p> : null}
      </div>
      <div className="card">
        <PortableTextContent value={impressum?.body} />
      </div>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const [site, impressum] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(impressumQuery)
  ])
  return {
    props: {
      site: site || null,
      impressum: impressum || null
    },
    revalidate: 60
  }
}
