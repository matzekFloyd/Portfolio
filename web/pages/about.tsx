import SiteLayout from "@web/components/SiteLayout";
import { PortableTextContent } from "@web/lib/portableText";
import { aboutQuery, siteSettingsQuery } from "@web/lib/queries";
import { sanityClient } from "@web/lib/sanity";
import styles from "@web/styles/about.module.scss";

export default function AboutPage({ site, about }: { site: any; about: any }) {
  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle="About"
      description={site?.description}
      keywords={site?.keywords}
    >
      <h2 className={styles.title}>{about?.title || "About"}</h2>
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
  );
}

export async function getStaticProps() {
  const [site, about] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(aboutQuery),
  ]);
  return {
    props: {
      site: site || null,
      about: about || null,
    },
  };
}
