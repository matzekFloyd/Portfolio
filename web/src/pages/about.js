import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query AboutPageQuery {
    about: sanityAbout(_id: {regex: "/(drafts.|)singleton-about/"}) {
      title,
      description
    }
  }
`

const AboutPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }
  const site = (data || {}).about
  return (
    <Layout>
      <SEO title='Archive'/>
      <Container>
        <h1 className={responsiveTitle1}>About</h1>
        <h2>{site.title}</h2>
        <p>{site.description}</p>
      </Container>
    </Layout>
  )
}

export default AboutPage
