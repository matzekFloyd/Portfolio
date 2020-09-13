import React from 'react'
import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'
import Footer from "./footer";

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav}/>
    <div className={styles.content}>{children}</div>
    <Footer />
  </>
)

export default Layout
