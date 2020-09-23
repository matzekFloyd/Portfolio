import React from 'react'
import ProjectPreview from './project-preview'
import PropTypes from 'prop-types';

import styles from '../styles/components/project-preview-grid.module.scss';
import {ButtonRedirect} from "./util";

function ProjectPreviewGrid(props) {
  return (
    <div className={styles.root}>
      {props.title && <h1>{props.title}</h1>}
      <ul className={styles.grid}>
        {props.nodes &&
        props.nodes.map(node => (
          <li key={node.id}>
            <ProjectPreview {...node} />
          </li>
        ))}
      </ul>
      {props.browseMoreHref && (
          <ButtonRedirect to={props.browseMoreHref} text={"Browse more"} additionalStyles={styles.browseMoreNav}/>
      )}
    </div>
  )
}

ProjectPreviewGrid.propTypes = {
  title: PropTypes.string.isRequired,
  nodes: PropTypes.array,
  browseMoreHref: PropTypes.string.isRequired
};

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
