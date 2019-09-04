import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PeopleGrid from '../components/people-grid'
import SEO from '../components/seo'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import PageCard from '../components/page-card'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      id
      _id
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          metadata {
            lqip
          }
        }
        alt
      }
      title
      _rawBody
    }
    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
              metadata {
                lqip
              }
            }
          }
          name
          _rawBio
        }
      }
    }
  }
`

const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const {
    page: { mainImage, title, _rawBody }
  } = data && data
  const personNodes =
    data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

  if (!data.page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={title} />
      <Container>
        <PageCard image={mainImage} title={title}>
          <BlockContent blocks={_rawBody || []} />
        </PageCard>
      </Container>
    </>
  )
}

export default ContactPage
