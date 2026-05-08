import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {impressumQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/impressum.module.css'

function getContactHref(value) {
  const raw = (value || '').trim()
  if (!raw) return null

  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  if (raw.includes('@') && !raw.includes(' ')) return `mailto:${raw}`

  const digitsOnly = raw.replace(/[^+\d]/g, '')
  if (digitsOnly.length >= 6) return `tel:${digitsOnly}`

  return null
}

export default function ImpressumPage({site, impressum}) {
  const contactHref = getContactHref(impressum?.contact)

  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Impressum" description={site?.description} keywords={site?.keywords}>
      <h2 className={styles.title}>{impressum?.title || 'Impressum'}</h2>

      <section className={styles.card} aria-label="Impressum contact details">
        <dl className={styles.details}>
          {impressum?.owner ? (
            <>
              <dt>Owner</dt>
              <dd>{impressum.owner}</dd>
            </>
          ) : null}

          {impressum?.addressLineOne || impressum?.addressLineTwo ? (
            <>
              <dt>Address</dt>
              <dd>
                {impressum?.addressLineOne ? <span>{impressum.addressLineOne}</span> : null}
                {impressum?.addressLineOne && impressum?.addressLineTwo ? <br /> : null}
                {impressum?.addressLineTwo ? <span>{impressum.addressLineTwo}</span> : null}
              </dd>
            </>
          ) : null}

          {impressum?.contact ? (
            <>
              <dt>Contact</dt>
              <dd>
                {contactHref ? (
                  <a href={contactHref} target={contactHref.startsWith('http') ? '_blank' : undefined} rel={contactHref.startsWith('http') ? 'noreferrer' : undefined}>
                    {impressum.contact}
                  </a>
                ) : (
                  impressum.contact
                )}
              </dd>
            </>
          ) : null}
        </dl>
      </section>

      {Array.isArray(impressum?.body) && impressum.body.length > 0 ? (
        <section className={styles.card} aria-label="Impressum legal text">
          <div className={styles.body}>
            <PortableTextContent value={impressum.body} />
          </div>
        </section>
      ) : null}
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
    }
  }
}
