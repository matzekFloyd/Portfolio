import SiteLayout from "@web/components/SiteLayout";
import { PortableTextContent } from "@web/lib/portableText";
import { impressumQuery, siteSettingsQuery } from "@web/lib/queries";
import { sanityClient } from "@web/lib/sanity";
import styles from "@web/styles/impressum.module.scss";

export default function ImpressumPage({ site, impressum }: { site: any; impressum: any }) {
  const emailTrimmed = impressum?.email?.trim() || "";
  const emailHref = emailTrimmed ? `mailto:${emailTrimmed}` : null;

  const line1 = impressum?.addressLineOne?.trim() || "";
  const line2 = impressum?.addressLineTwo?.trim() || "";
  const addressLine = [line1, line2].filter(Boolean).join(", ");
  const hasImprintPanel = Boolean(impressum?.owner || emailHref || addressLine);

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle="Impressum"
      description={site?.description}
      keywords={site?.keywords}
    >
      <h2 className={styles.title}>{impressum?.title || "Impressum"}</h2>

      {impressum?.legalDisclosure ? (
        <p className={styles.legalHeading}>{impressum.legalDisclosure}</p>
      ) : null}

      {hasImprintPanel ? (
        <section className={styles.card} aria-label="Imprint details">
          <div className={styles.imprintPanel}>
            {impressum?.owner ? <p className={styles.legalName}>{impressum.owner}</p> : null}

            {emailHref ? (
              <p className={styles.mailRow}>
                <a href={emailHref} className={styles.mailLink}>
                  {emailTrimmed}
                </a>
              </p>
            ) : null}

            {addressLine ? <p className={styles.addressLine}>{addressLine}</p> : null}
          </div>
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
  );
}

export async function getStaticProps() {
  const [site, impressum] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(impressumQuery),
  ]);
  return {
    props: {
      site: site || null,
      impressum: impressum || null,
    },
  };
}
