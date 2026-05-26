import SiteLayout from '../components/SiteLayout'
import {sanityClient} from '../lib/sanity'
import {impressumQuery, siteSettingsQuery} from '../lib/queries'
import {PortableTextContent} from '../lib/portableText'
import styles from '../styles/impressum.module.css'

function getWebsiteHref(value) {
  const raw = (value || '').trim()
  if (!raw) return null
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

export default function ImpressumPage({site, impressum}) {
  const emailHref = impressum?.email?.trim() ? `mailto:${impressum.email.trim()}` : null
  const websiteHref = impressum?.websiteUrl ? getWebsiteHref(impressum.websiteUrl) : null

  const hasAddressPanel = Boolean(
    impressum?.owner || impressum?.addressLineOne || impressum?.addressLineTwo
  )
  const hasContactPanel = Boolean(impressum?.email?.trim() || websiteHref)

  return (
    <SiteLayout siteTitle={site?.title} pageTitle="Impressum" description={site?.description} keywords={site?.keywords}>
      <h2 className={styles.title}>{impressum?.title || 'Impressum'}</h2>

      {impressum?.legalDisclosure ? (
        <p className={styles.legalHeading}>{impressum.legalDisclosure}</p>
      ) : null}

      {hasAddressPanel ? (
        <section className={`${styles.card} ${styles.addressPanel}`} aria-label="Name and address">
          <dl className={styles.details}>
            {impressum?.owner ? (
              <>
                <dt>Full name</dt>
                <dd>{impressum.owner}</dd>
              </>
            ) : null}

            {impressum?.addressLineOne ? (
              <>
                <dt>Street address</dt>
                <dd>{impressum.addressLineOne}</dd>
              </>
            ) : null}

            {impressum?.addressLineTwo ? (
              <>
                <dt>Address line 2</dt>
                <dd>{impressum.addressLineTwo}</dd>
              </>
            ) : null}
          </dl>
        </section>
      ) : null}

      {hasContactPanel ? (
        <section className={styles.card} aria-label="Contact details">
          <dl className={styles.details}>
            {impressum?.email?.trim() ? (
              <>
                <dt>Contact e-mail</dt>
                <dd>
                  <a href={emailHref}>{impressum.email.trim()}</a>
                </dd>
              </>
            ) : null}

            {websiteHref ? (
              <>
                <dt>Website</dt>
                <dd>
                  <a href={websiteHref} target="_blank" rel="noreferrer">
                    {impressum.websiteUrl.trim()}
                  </a>
                </dd>
              </>
            ) : null}
          </dl>
        </section>
      ) : null}

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
