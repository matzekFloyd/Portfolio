import {imageUrlFor} from "../lib/image-url";
import {buildImageObj} from "../lib/helpers";
import React, {useState} from "react";
import ProjectPreviewGrid from "./project-preview-grid";
import styles from '../styles/components/home.module.scss';
import PropTypes from 'prop-types';

const Home = ({site, projectNodes}) => {

  const [showLatestProjects, toggleLatestProjects] = useState(false);

  return <>
    <div className={styles.container + (!showLatestProjects ? "" : " " + styles.hide)}>
      <Introduction title={site.title} subtitle={site.subtitle} description={site.description}
                    toggleLatestProjects={() => toggleLatestProjects(!showLatestProjects)}/>
      <Portrait portrait={site.portrait}/>
    </div>
    <div className={styles.container + (showLatestProjects ? "" : " " + styles.hide)}>
      {projectNodes && (
        <ProjectPreviewGrid
          title='Latest projects'
          nodes={projectNodes}
          browseMoreHref='/projects/'
        />
      )}
    </div>
  </>
}

function Introduction({title, subtitle, description, toggleLatestProjects}) {

  return <div className={styles.introduction}>
    <h1 hidden>Welcome to {title}</h1>
    <h2>{subtitle}</h2>
    <p>{description}</p>
    <ul>
      <li><a href={"/about/"}>About me</a></li>
      <li><a onClick={toggleLatestProjects}>Latest Projects</a></li>
    </ul>
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
