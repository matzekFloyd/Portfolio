import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Contact from "../components/contact";

export const query = graphql`
  query ContactPageQuery {
    contact: sanityContact(_id: {regex: "/(drafts.|)singleton-contact/"}) {
      title
      contacts {
        title
        url
        isEmail
        isSocialMedia
      }
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
        <Contact site={site}/>
      </Container>
    </Layout>
  )
}

export default ContactPage
