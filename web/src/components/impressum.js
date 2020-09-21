import React from "react";
import PropTypes from 'prop-types';
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import {Section} from "./util";
import styles from "../styles/components/impressum.module.scss";

const Impressum = ({site}) => {
  return <>
    <Section className={styles.sectionImpressum}>
      <h1 className={responsiveTitle1}>{site.title}</h1>
    </Section>
  </>
}

Impressum.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Impressum;
