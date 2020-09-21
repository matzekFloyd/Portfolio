import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Impressum from "../components/impressum";

export const query = graphql`
  query ImpressumPageQuery {
    impressum: sanityImpressum(_id: {regex: "/(drafts.|)singleton-impressum/"}) {
      title
      _rawBody
      owner
      addressLineOne
      addressLineTwo
      contact
    }
  }
`

const ImpressumPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout location={props.location}>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }
  const site = (data || {}).impressum
  return (
    <Layout location={props.location}>
      <SEO title='Impressum'/>
      <Container>
        <Impressum site={site}/>
      </Container>
    </Layout>
  )
}

export default ImpressumPage
