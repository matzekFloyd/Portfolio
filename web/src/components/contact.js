import React from "react";
import PropTypes from 'prop-types';
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import BlockContent from "./block-content";
import {Section} from "./util";
import styles from "../styles/components/contact.module.scss";

const Contact = ({site}) => {
  return <>
    <Section className={styles.sectionContact}>
      <h1 className={responsiveTitle1}>Contact</h1>
      <h2>{site.title}</h2>
      {site._rawBody && <BlockContent blocks={site._rawBody || []}/>}
    </Section>
  </>
}

Contact.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Contact;
