import React from 'react'
import {Link} from 'gatsby';

import '../styles/layout/_layout.scss'
import styles from '../styles/components/footer.module.scss';

const Footer = ({}) => (
  <>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © 2020 Mathias Mayrhofer | <Link to={"/impressum/"}>Impressum</Link> | Built with <a
          href={"https://www.sanity.io/"} target={"_blank"}>Sanity.io</a>
        </div>
      </div>
    </footer>
  </>
)

export default Footer
