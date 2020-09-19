import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {responsiveTitle1} from '../styles/components/typography.module.scss';
import BlockContent from "../components/block-content";

export const query = graphql`
  query ContactPageQuery {
    contact: sanityContact(_id: {regex: "/(drafts.|)singleton-contact/"}) {
      title
      _rawBody
    }
  }
`

const ContactPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout location={props.location}>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }
  const site = (data || {}).contact
  return (
    <Layout location={props.location}>
      <SEO title='Contact'/>
      <Container>
        <h1 className={responsiveTitle1}>Contact</h1>
        <h2>{site.title}</h2>
        {site._rawBody && <BlockContent blocks={site._rawBody || []} />}
      </Container>
    </Layout>
  )
}

export default ContactPage
