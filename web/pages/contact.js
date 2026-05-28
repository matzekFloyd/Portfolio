import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {contactQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/contact.module.scss'

function contactHref(item) {
  if (item.isEmail) return `mailto:${item.url}`
  if (item.url?.startsWith('http')) return item.url
  return `https://${item.url}`
}

function contactOpensInNewTab(item) {
  if (item.isEmail) return false
  return item.openInNewTab !== false
}

function contactAriaLabel(item) {
  if (item.isEmail) return 'Send email to Mathias'
  const title = item?.title?.trim() || 'external profile'
  if (/linkedin/i.test(title)) return 'Mathias Mayrhofer on LinkedIn'
  return `Open ${title}`
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
              {(contact?.contacts || []).map((item) => {
                const newTab = contactOpensInNewTab(item)
                return (
                  <li key={item._id}>
                    <a
                      href={contactHref(item)}
                      target={newTab ? '_blank' : '_self'}
                      rel={newTab ? 'noopener noreferrer' : undefined}
                      aria-label={contactAriaLabel(item)}
                      className={styles.link}
                    >
                      {item.title}
                      {newTab ? <span className="sr-only"> (opens in new tab)</span> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </section>
      ) : (contact?.contacts || []).length > 0 ? (
        <section className={styles.card} aria-label="Contact links">
          <ul className={styles.list}>
            {(contact?.contacts || []).map((item) => {
              const newTab = contactOpensInNewTab(item)
              return (
                <li key={item._id}>
                  <a
                    href={contactHref(item)}
                    target={newTab ? '_blank' : '_self'}
                    rel={newTab ? 'noopener noreferrer' : undefined}
                    aria-label={contactAriaLabel(item)}
                    className={styles.link}
                  >
                    {item.title}
                    {newTab ? <span className="sr-only"> (opens in new tab)</span> : null}
                  </a>
                </li>
              )
            })}
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
