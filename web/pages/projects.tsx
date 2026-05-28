import Image from "next/image";
import Link from "next/link";

import SiteLayout from "@web/components/SiteLayout";
import { blocksToText } from "@web/lib/portableText";
import { projectsQuery, siteSettingsQuery } from "@web/lib/queries";
import { sanityClient, urlFor } from "@web/lib/sanity";
import previewStyles from "@web/styles/projectPreview.module.scss";
import pageStyles from "@web/styles/projects.module.scss";

export default function ProjectsPage({ site, projects }: { site: any; projects: any[] }) {
  return (
    <SiteLayout
      siteTitle={site?.title}
      pageTitle="Projects"
      description={site?.description}
      keywords={site?.keywords}
    >
      <section className={pageStyles.sectionProjects}>
        <h2>Projects</h2>
        <ul className={pageStyles.grid}>
          {projects.map((project) => {
            const thumb = project.previewImage
              ? urlFor(project.previewImage)?.width(800).height(520).fit("crop").url()
              : null;
            const excerptText = blocksToText(project.excerpt).trim();
            const projectAriaLabel = excerptText
              ? `${project.title} - ${excerptText}`
              : `${project.title} project details`;
            return (
              <li key={project._id}>
                <Link
                  href={`/project/${project.slug}`}
                  className={previewStyles.root}
                  aria-label={projectAriaLabel}
                >
                  {thumb ? (
                    <div className={previewStyles.thumb}>
                      <Image
                        src={thumb}
                        alt={project.title}
                        fill
                        sizes="(min-width: 980px) 33vw, (min-width: 720px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <h3 className={previewStyles.title}>{project.title}</h3>
                  <p className={previewStyles.excerpt}>{blocksToText(project.excerpt)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const [site, projects] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(projectsQuery),
  ]);
  return {
    props: {
      site: site || null,
      projects: projects || [],
    },
  };
}
