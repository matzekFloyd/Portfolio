import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query ContactPageQuery {
    contact: sanityContact(_id: {regex: "/(drafts.|)singleton-contact/"}) {
      title,
      description
    }
  }
`

const ContactPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }
  const site = (data || {}).contact
  return (
    <Layout>
      <SEO title='Contact'/>
      <Container>
        <h1 className={responsiveTitle1}>Contact</h1>
        <h2>{site.title}</h2>
        <p>{site.description}</p>
      </Container>
    </Layout>
  )
}

export default ContactPage
