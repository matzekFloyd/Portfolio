import React from "react";

import styles from "../styles/components/dev-helper.module.scss";

function DevHelper() {
  return process.env.NODE_ENV === "development" ? <div className={styles.root}/> : <></>
}

export default DevHelper;
