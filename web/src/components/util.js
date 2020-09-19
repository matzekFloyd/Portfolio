import React from "react";
import {Link} from 'gatsby'
import PropTypes from 'prop-types';
import styles from "../styles/components/util.module.scss";
import {cn} from "../lib/helpers";

export const HorizontalLine = () => (
  <hr className={styles.horizontalLine}/>
);

export const ButtonWrapper = ({children, additionalStyles}) => {
  return <div className={cn(styles.button, additionalStyles)}>
    {children}
  </div>
}

export const ButtonRedirect = ({text, to, additionalStyles}) => {
  return <ButtonWrapper additionalStyles={additionalStyles}>
    <Link to={to}>{text}</Link>
  </ButtonWrapper>
}
ButtonRedirect.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  additionalStyles: PropTypes.string
}
