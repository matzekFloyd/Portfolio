import React from 'react'

import '../styles/layout.css'
import styles from './footer.module.css'

const Footer = ({}) => (
  <>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          {/* © 2020 Mathias Mayrhofer */}
        </div>
      </div>
    </footer>
  </>
)

export default Footer
