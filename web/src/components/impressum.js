import React from "react";
import PropTypes from 'prop-types';
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import {Section} from "./util";
import styles from "../styles/components/impressum.module.scss";
import BlockContent from "./block-content";

const Impressum = ({site}) => {
  return <>
    <Section className={styles.sectionImpressum}>
      <h1 className={responsiveTitle1}>{site.title}</h1>
      {site._rawBody && <BlockContent blocks={site._rawBody || []}/>}
      <h2>Owner</h2>
      <ul>
        <li>{site.owner}</li>
        <li>{site.addressLineOne}</li>
        <li>{site.addressLineTwo}</li>
      </ul>
      <h2>Contact</h2>
      <ul>
        <li>{site.contact}</li>
      </ul>
    </Section>
  </>
}

Impressum.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Impressum;
