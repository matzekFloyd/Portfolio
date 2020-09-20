import React from "react";
import PropTypes from 'prop-types';
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import BlockContent from "./block-content";
import {Section} from "./util";
import styles from "../styles/components/about.module.scss";

const About = ({site}) => {
  return <>
    <Section className={styles.sectionAbout}>
      <h1 className={responsiveTitle1}>About</h1>
      <h2>{site.title}</h2>
      <TwoColumnLayout>
        <Column className={styles.leftCol}>
          {site._rawBodyLeftCol && <BlockContent blocks={site._rawBodyLeftCol || []}/>}
        </Column>
        <Column className={styles.rightCol}>
          {site._rawBodyRightCol && <BlockContent blocks={site._rawBodyRightCol || []}/>}
        </Column>
      </TwoColumnLayout>

    </Section>
  </>
}

function TwoColumnLayout({children}) {
  return <div className={styles.twoColLayout}>
    {children[0]}
    {children[1]}
  </div>;
}

function Column({children, className}) {
  return <div className={className}>
    {children}
  </div>
}

About.propTypes = {
  site: PropTypes.object.isRequired,
}

export default About;
