import React from "react";
import {Link} from 'gatsby'
import PropTypes from 'prop-types';
import styles from "../styles/components/util.module.scss";
import {cn} from "../lib/helpers";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'

export function HorizontalLine({minWidth}) {
  return <hr className={styles.horizontalLine} style={{minWidth: minWidth + "px"}}/>
}

HorizontalLine.propTypes = {
  minWidth: PropTypes.string
}

export const Section = ({children, className}) => {
  return <section className={className}>{children}</section>;
}
Section.propTypes = {
  className: PropTypes.string.isRequired
}

export const ButtonWrapper = ({children, additionalStyles}) => {
  return <div className={cn(styles.button, additionalStyles)}>
    {children}
  </div>
}

export const ButtonRedirect = ({text, to, additionalStyles}) => {
  return <ButtonWrapper additionalStyles={additionalStyles}>
    <Link to={to}>
      <FontAwesomeIcon icon={faAngleDoubleRight} style={{marginRight: 10 + "px"}}/>
      {text}</Link>
  </ButtonWrapper>
}
ButtonRedirect.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  additionalStyles: PropTypes.string
}
