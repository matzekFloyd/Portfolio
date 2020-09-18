import React from 'react'

import styles from '../styles/components/container.module.scss';

const Container = ({children}) => {
  return <div className={styles.root}>{children}</div>
}

export default Container
