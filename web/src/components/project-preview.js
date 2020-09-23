import {Link} from 'gatsby'
import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import styles from '../styles/components/project-preview.module.scss';
import {responsiveTitle3} from '../styles/components/typography.module.scss';

function ProjectPreview (props) {

  let previewImage = undefined;

  if(props.previewImage && props.previewImage.asset) {
    previewImage = props.previewImage;
  } else if (props.mainImage && props.mainImage.asset) {
    previewImage = props.mainImage;
  }

  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {previewImage && (
          <img
            src={imageUrlFor(buildImageObj(previewImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={previewImage.alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default ProjectPreview
