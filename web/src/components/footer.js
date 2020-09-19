import React from 'react'

import '../styles/layout/_layout.scss'
import styles from '../styles/components/footer.module.scss';

const Footer = ({}) => (
  <>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © 2020 Mathias Mayrhofer
        </div>
      </div>
    </footer>
  </>
)

export default Footer
