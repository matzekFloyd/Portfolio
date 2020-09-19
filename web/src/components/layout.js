import React from 'react'
import Header from './header'
import PropTypes from 'prop-types';
import '../styles/layout/_layout.scss'
import styles from '../styles/components/layout.module.scss';
import Footer from "./footer";
import {HorizontalLine} from "./util";

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, location}) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} location={location}/>
    <HorizontalLine/>
    <div className={styles.content}>{children}</div>
    <Footer />
  </>
)
Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default Layout
