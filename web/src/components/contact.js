import React from "react";
import PropTypes from 'prop-types';
import {responsiveTitle1} from "../styles/components/typography.module.scss";
import BlockContent from "./block-content";
import {Section} from "./util";
import styles from "../styles/components/contact.module.scss";

function Contact({site}) {
  let contacts = site.contacts || [];

  let sortAlphabetically = (a, b) => {

    if (a.isEmail && b.isEmail) {

      if (a.url < b.url) {
        return -1;
      }

      if (a.url > b.url) {
        return 1;
      }
    }

    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }
  }
  contacts.sort(sortAlphabetically);

  let email = [];
  let social = [];
  let other = [];

  contacts.map((el, idx) => {
    let listElement = <li key={`contact_${idx}`}><a href={el.url} target={"_blank"}>{el.title}</a></li>;

    if ((el.isEmail && el.isSocialMedia) || (el.isEmail !== true && el.isSocialMedia !== true)) {
      other.push(listElement)
    } else if (el.isSocialMedia === true) {
      social.push(listElement);
    } else if (el.isEmail === true) {
      listElement = <li key={`contact_${idx}`}><a href={`mailto:${el.url}`}>{el.url}</a></li>;
      email.push(listElement);
    }
  });

  return <>
    <Section className={styles.sectionContact}>
      <h1 className={responsiveTitle1}>{site.title}</h1>
      {site._rawBody && <BlockContent blocks={site._rawBody || []}/>}
      <ContactsList title={"E-Mail"} contacts={email}/>
      <ContactsList title={"Social"} contacts={social}/>
      <ContactsList title={"Other"} contacts={other}/>
    </Section>
  </>
}

function ContactsList({title, contacts}) {
  return <div className={styles.contactsList}>
    <h2>{title}</h2>
    <ul>
      {contacts}
    </ul>
  </div>;
}

ContactsList.propTypes = {
  title: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired
}

Contact.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Contact;
