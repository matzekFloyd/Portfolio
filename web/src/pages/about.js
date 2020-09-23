import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import About from "../components/about";

export const query = graphql`
  query AboutPageQuery {
    about: sanityAbout(_id: {regex: "/(drafts.|)singleton-about/"}) {
      title
      _rawBodyLeftCol
      _rawBodyRightCol
    }
  }
`

const AboutPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout location={props.location}>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }
  const site = (data || {}).about
  return (
    <Layout location={props.location}>
      <SEO title='About'/>
      <Container>
        <About site={site}/>
      </Container>
    </Layout>
  )
}

export default AboutPage
