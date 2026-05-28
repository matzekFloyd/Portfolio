import ContactForm from "@web/components/ContactForm";
import SiteLayout from "@web/components/SiteLayout";
import { PortableTextContent } from "@web/lib/portableText";
import { contactQuery, siteSettingsQuery } from "@web/lib/queries";
import { sanityClient } from "@web/lib/sanity";
import styles from "@web/styles/contact.module.scss";

export default function ContactPage({ site, contact }: { site: any; contact: any }) {
  const hasBody = Array.isArray(contact?.body) && contact.body.length > 0;

  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle="Contact"
      description={site?.description}
      keywords={site?.keywords}
    >
      <h2 className={styles.title}>{contact?.title || "Contact"}</h2>

      <section className={styles.card} aria-label="Contact form">
        {hasBody ? (
          <div className={styles.body}>
            <PortableTextContent value={contact.body} />
          </div>
        ) : null}
        <ContactForm />
      </section>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const [site, contact] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(contactQuery),
  ]);

  return {
    props: {
      site: site || null,
      contact: contact || null,
    },
  };
}
