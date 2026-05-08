import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {contactQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/contact.module.css'

function contactHref(item) {
  if (item.isEmail) return `mailto:${item.url}`
  if (item.url?.startsWith('http')) return item.url
  return `https://${item.url}`
}

export default function ContactPage({site, contact}) {
  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Contact" description={site?.description} keywords={site?.keywords}>
      <h2 className={styles.title}>{contact?.title || 'Contact'}</h2>

      {Array.isArray(contact?.body) && contact.body.length > 0 ? (
        <section className={styles.card} aria-label="Contact intro">
          <div className={styles.body}>
            <PortableTextContent value={contact.body} />
          </div>
          {(contact?.contacts || []).length > 0 ? (
            <ul className={styles.list}>
              {(contact?.contacts || []).map((item) => (
                <li key={item._id}>
                  <a href={contactHref(item)} target={item.isEmail ? '_self' : '_blank'} rel="noreferrer" className={styles.link}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : (contact?.contacts || []).length > 0 ? (
        <section className={styles.card} aria-label="Contact links">
          <ul className={styles.list}>
            {(contact?.contacts || []).map((item) => (
              <li key={item._id}>
                <a href={contactHref(item)} target={item.isEmail ? '_self' : '_blank'} rel="noreferrer" className={styles.link}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
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
