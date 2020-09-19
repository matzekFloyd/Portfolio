import React from 'react'
import Header from './header'

import '../styles/layout/_layout.scss'
import styles from '../styles/components/layout.module.scss';
import Footer from "./footer";
import {HorizontalLine} from "./util";

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav}/>
    <HorizontalLine/>
    <div className={styles.content}>{children}</div>
    <Footer />
  </>
)

export default Layout
