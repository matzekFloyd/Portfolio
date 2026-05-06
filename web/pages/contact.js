import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {contactQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'

function contactHref(item) {
  if (item.isEmail) return `mailto:${item.url}`
  if (item.url?.startsWith('http')) return item.url
  return `https://${item.url}`
}

export default function ContactPage({site, contact}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Contact" description={site?.description}>
      <h2>{contact?.title || 'Contact'}</h2>
      <div className="card">
        <PortableTextContent value={contact?.body} />
      </div>
      {(contact?.contacts || []).map((item) => (
        <p key={item._id}>
          <a href={contactHref(item)} target={item.isEmail ? '_self' : '_blank'} rel="noreferrer">
            {item.title}
          </a>
        </p>
      ))}
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const [site, contact] = await Promise.all([sanityClient.fetch(siteSettingsQuery), sanityClient.fetch(contactQuery)])
  return {
    props: {
      site: site || null,
      contact: contact || null
    }
  }
}
