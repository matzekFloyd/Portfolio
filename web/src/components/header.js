import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'
import PropTypes from 'prop-types';
import styles from '../styles/components/header.module.scss';
import DevHelper from "./devHelper";

const HOME = "/";
const ABOUT = "/about/";
const PROJECTS = "/projects/";
const CONTACT = "/contact/";

function Header({onHideNav, onShowNav, showNav, siteTitle, location}) {

  let isActive = (pathname) => pathname === location.pathname;

  return <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={isActive(HOME) ? cn(styles.branding, styles.active) : styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger'/>
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li className={isActive(ABOUT) && styles.active}>
            <Link to='/about/'>About</Link>
          </li>
          <li className={isActive(PROJECTS) && styles.active}>
            <Link to='/projects/'>Projects</Link>
          </li>
          <li className={isActive(CONTACT) && styles.active}>
            <Link to='/contact/'>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
    <DevHelper/>
  </div>
}

Header.propTypes = {
  location: PropTypes.object.isRequired
}

export default Header
