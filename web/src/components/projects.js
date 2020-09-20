import React from "react";
import PropTypes from 'prop-types';
import {Section} from "./util";
import styles from "../styles/components/projects.module.scss";
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import ProjectPreviewGrid from "./project-preview-grid";

const Projects = ({projectNodes}) => {
  return <>
    <Section className={styles.sectionProjects}>
      <h1 className={responsiveTitle1}>Projects</h1>
      {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
    </Section>
  </>
}
Projects.propTypes = {
  projectNodes: PropTypes.array.isRequired,
}

export default Projects;
