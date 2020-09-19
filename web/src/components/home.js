import {imageUrlFor} from "../lib/image-url";
import {buildImageObj} from "../lib/helpers";
import React from "react";
import ProjectPreviewGrid from "./project-preview-grid";
import styles from '../styles/components/home.module.scss';
import PropTypes from 'prop-types';
import {ButtonRedirect, HorizontalLine} from "./util";
import {Link} from 'gatsby'


const Home = ({site, projectNodes}) => {

  return <>
    <Section className={styles.sectionDescription}>
      <Description title={site.title} subtitle={site.subtitle} description={site.description}/>
      <Portrait portrait={site.portrait}/>
    </Section>
    <HorizontalLine/>
    <Section className={styles.sectionLatestProjects}>
      {projectNodes && (
        <ProjectPreviewGrid
          title={'Latest projects'}
          nodes={projectNodes}
          browseMoreHref={'/projects/'}
        />
      )}
    </Section>
  </>
}

function Section({children, className}) {
  return <section className={className}>{children}</section>;
}

Section.propTypes = {
  className: PropTypes.string.isRequired
}

function Description({subtitle, description}) {
  return <div className={styles.description}>
    <h1>{subtitle}</h1>
    <h2>{description}</h2>
    <nav>
      <ul>
        <li>
          <ButtonRedirect to={"/about/"} text={"About me"}/>
        </li>
        <li>
          <ButtonRedirect to={"/projects/"} text={"Browse Projects"}/>
        </li>
      </ul>
    </nav>
  </div>
}

function Portrait({portrait}) {
  return <figure className={styles.portrait}>
    {portrait && portrait.asset && (
      <picture className={""}>
        <img src={imageUrlFor(buildImageObj(portrait)).url()} alt={portrait.alt}/>
      </picture>
    )}
  </figure>
}

Home.propTypes = {
  site: PropTypes.object.isRequired,
  projectNodes: PropTypes.array.isRequired
}

export default Home;
